import { PluginObj, PluginPass } from '@babel/core'
import * as t from '@babel/types'
import { name } from '../package.json'
import { resolveJSXTagName, shouldExtract } from './utils'
import parseSrcSet from 'srcset-parse'

type VisitorState = PluginPass & {
  opts: {
    // 是否提取绝对路径
    includeAbsolute?: boolean
    // 需要提取的标签和属性
    tags?: Record<string, string[]>
  }
}

// @see https://github.com/webpack-contrib/html-loader#sources
const defaultTags: Record<string, string[]> = {
  audio: ['src'],
  embed: ['src'],
  img: ['src', 'srcSet'],
  input: ['src'],
  object: ['data'],
  source: ['src', 'srcSet'],
  track: ['src'],
  video: ['poster', 'src'],
  image: ['xlinkHref', 'href'],
  use: ['xlinkHref', 'href'],
}

export default function (): PluginObj<VisitorState> {
  // 需要插入的 import, 以资源路径为 key
  const importsMap = new Map<string, t.Identifier>()

  let includeAbsolute = false
  let tags = defaultTags

  return {
    name: name,
    visitor: {
      Program: {
        enter (path, state) {
          includeAbsolute = !!state.opts.includeAbsolute
          tags = { ...tags, ...state.opts.tags }

          importsMap.clear()
        },
        exit (path) {
          importsMap.forEach((identifier, source) => {
            const specifier = t.importDefaultSpecifier(identifier)
            const importDeclaration = t.importDeclaration([specifier], t.stringLiteral(source))
            path.node.body.unshift(importDeclaration)
          })
        },
      },
      JSXAttribute (path) {
        const { node, parent } = path

        // 属性值必须是静态字符串且在 JSX 开始标签上
        if (!t.isStringLiteral(node.value) || !t.isJSXOpeningElement(parent)) {
          return
        }

        // 跳过 JSXNamespacedName, React JSX 不会产生这种节点
        if (t.isJSXNamespacedName(parent.name) || t.isJSXNamespacedName(node.name)) {
          return
        }

        const tagName = resolveJSXTagName(parent.name)
        const attrName = node.name.name
        const attrValue = node.value.value

        // 检查标签名称和属性名称
        if (!tags[tagName] || !tags[tagName].includes(attrName)) {
          return
        }

        // img 和 source 的 srcSet 属性可能包含多个 URL, 需要特殊处理
        if (attrName === 'srcSet') {
          const result = parseSrcSet(attrValue)
          const quasis: t.TemplateElement[] = [t.templateElement({ raw: '' })]
          const expressions: t.Expression[] = []

          for (const item of result) {
            const raw: string[] = []
            let identifier: t.Identifier | undefined

            // 每个 URL 都需要单独检查, 不需要提取的应保持原样
            if (shouldExtract(item.url, includeAbsolute)) {
              identifier = importsMap.get(item.url)

              if (!identifier) {
                identifier = path.scope.generateUidIdentifier('import_assets')
                importsMap.set(item.url, identifier)
              }
            } else {
              raw.push(item.url)
            }

            // 处理固有宽度标识与分隔符
            item.width && raw.push(` ${item.width}w`)
            item.density && raw.push(` ${item.density}x`)
            item !== result.at(-1) && raw.push(', ')

            // 如果进行了提取, 则应产生新的模板片段. 否则应将其追加到上一个模板片段上
            if (identifier) {
              expressions.push(identifier)
              quasis.push(t.templateElement({ raw: raw.join('') }))
            } else {
              const prev = quasis[quasis.length - 1]
              prev.value.raw += raw.join('')
            }
          }

          const templateLiteral = t.templateLiteral(quasis, expressions)
          node.value = t.jsxExpressionContainer(templateLiteral)
          return
        }

        // 跳过不需要提取的资源路径
        if (!shouldExtract(attrValue, includeAbsolute)) {
          return
        }

        // 相同的资源路径复用导入声明
        let identifier = importsMap.get(attrValue)

        if (!identifier) {
          identifier = path.scope.generateUidIdentifier(`${tagName}_${attrName}`)
          importsMap.set(attrValue, identifier)
        }

        node.value = t.jsxExpressionContainer(identifier)
      },
    },
  }
}
