import { PluginObj } from '@babel/core'
import { name } from '../package.json'

// ------ 插件入口 ------
export default function (): PluginObj {
  return {
    name: name,
    visitor: {},
  }
}
