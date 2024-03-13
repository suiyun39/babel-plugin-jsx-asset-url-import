import { type NodePath, type Node, types as t } from '@babel/core'

/**
 * 解析 JSX 标签名, 返回标签名的字符串表示
 * @param node 名称节点
 */
export function resolveJSXTagName(node: t.JSXIdentifier | t.JSXMemberExpression): string {
  if (t.isJSXIdentifier(node)) {
    return node.name
  }

  const members: string[] = []
  let target = node

  while (true) {
    members.push(target.property.name)

    if (t.isJSXIdentifier(target.object)) {
      members.push(target.object.name)
      break
    } else {
      target = target.object
    }
  }

  return members.reverse().join('.')
}

/**
 * 检查 URL 是否应该提取
 * @param url 需要检查的 URL
 * @param includeAbsolute 是否包含绝对路径
 */
export function shouldExtract(url: string, includeAbsolute: boolean): boolean {
  // 空路径, 外部路径和 Data URL
  if (!url || url.startsWith('http') || url.startsWith('//') || url.startsWith('data:')) {
    return false
  }

  // 绝对路径
  return !(!includeAbsolute && url.startsWith('/'))
}

/**
 * 获取唯一标识符
 * @param path 节点路径
 */
export function getUidIdentifier(path: NodePath<Node>): t.Identifier {
  return path.scope.generateUidIdentifier('import_assets')
}
