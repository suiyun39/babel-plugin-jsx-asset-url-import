import * as t from '@babel/types'

/**
 * 解析 JSX 标签名, 返回标签名的字符串表示
 * @param node 名称节点
 */
export function resolveJSXTagName (node: t.JSXIdentifier | t.JSXMemberExpression): string {
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
