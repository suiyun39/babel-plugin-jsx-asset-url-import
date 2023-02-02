import { PluginObj } from '@babel/core'
import * as t from '@babel/types'
import { name } from '../package.json'

// ------ 插件入口 ------
export default function (): PluginObj {
  // 需要插入的 import, 以资源路径为 key
  const importsMap = new Map<string, t.Identifier>()

  return {
    name: name,
    visitor: {
      Program: {
        enter () {
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
         * 2. 必须在 JSX 开始元素上
         * 3. 必须能从元素上获取到元素名称
         */
        if (!t.isStringLiteral(node.value) || !t.isJSXOpeningElement(parent) || !t.isJSXIdentifier(parent.name)) {
          return
        }

        const elementName = parent.name.name
        const attrName = node.name.name
        const attrValue = node.value.value

        // 检查元素名称和属性名称, 应只处理白名单中的元素和属性
        // todo: 需要插件选项
        if (elementName !== 'img' || attrName !== 'src') {
          return
        }

        // 检查属性值是否是相对路径, 绝对路径和 base64 应保持原样
        // todo: 此处检查不完善
        if (!attrValue.startsWith('.')) {
          return
        }

        // 相同的资源路径复用导入声明
        let identifier = importsMap.get(attrValue)

        if (!identifier) {
          identifier = path.scope.generateUidIdentifier(`${elementName}_${attrName}`)
          importsMap.set(attrValue, identifier)
        }

        node.value = t.jsxExpressionContainer(identifier)
      },
    },
  }
}
