import { PluginObj, PluginPass } from '@babel/core'
import * as t from '@babel/types'
import { name } from '../package.json'

type VisitorState = PluginPass & {
  opts: {
    // 是否转换绝对路径
    includeAbsolute?: boolean
    // 需要转换的标签和属性
    tags?: Record<string, string[]>
  }
}

// todo: 目前不支持处理 img 和 source 的 srcSet 属性
// ref: https://github.com/webpack-contrib/html-loader#sources
const defaultTags: Record<string, string[]> = {
  audio: ['src'],
  embed: ['src'],
  img: ['src'],
  input: ['src'],
  object: ['data'],
  source: ['src'],
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

        /*
         * 插件处理的属性必须满足如下条件:
         * 1. 属性值必须是静态字符串
         * 2. 必须在 JSX 开始标签上
         * 3. 必须能获取到标签名称
         */
        if (!t.isStringLiteral(node.value) || !t.isJSXOpeningElement(parent) || !t.isJSXIdentifier(parent.name)) {
          return
        }

        const tagName = parent.name.name
        const attrName = node.name.name
        const attrValue = node.value.value

        // 未知原因, attrName 的类型是 string 和 JSXIdentifier 的联合. 为了安全考虑跳过处理
        if (typeof attrName !== 'string') {
          return
        }

        // 检查标签名称和属性名称
        if (!tags[tagName] || !tags[tagName].includes(attrName)) {
          return
        }

        // 跳过空路径, 外部路径和 Data URL
        if (!attrValue || attrValue.startsWith('http') || attrValue.startsWith('//') || attrValue.startsWith('data:')) {
          return
        }

        // 跳过绝对路径
        if (!includeAbsolute && attrValue.startsWith('/')) {
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
