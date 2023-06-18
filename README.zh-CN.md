# babel-plugin-jsx-asset-url-import

提取 JSX 中的静态资源路径并转换为 import

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/babel-plugin-jsx-asset-url-import?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/suiyun39/babel-plugin-jsx-asset-url-import/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/suiyun39/babel-plugin-jsx-asset-url-import?logo=codecov&style=for-the-badge)

## 示例

### Input

```tsx
import React from 'react';

const App: React.FC = () => {
  return <img src="./logo.png" alt="" />
}
```

### Output

```tsx
import React from 'react';
import _import_assets from './logo.png';

const App: React.FC = () => {
  return <img src={_import_assets} alt="" />
}
```

## 安装与使用

```bash
pnpm add -D babel-plugin-jsx-asset-url-import
```

**babel.config.js**

```js
export default {
  plugins: ['jsx-asset-url-import'],
};
```

## 选项

### includeAbsolute

- 类型: `boolean`
- 默认值: `false`

提取时包含绝对路径

### tags

- 类型: `Record<string, string[]>`

- 默认值:

  ```javascript
  {
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
  ```

配置需要提取和转换的标签及属性, 如果你想提取自定义组件的属性, 请在这里添加. 插件内部将与默认配置合并

如果你的组件包含在一个对象中, 类似于 `<Foo.Bar src="./logo.png" />` , 你需要配置为:  `'Foo.Bar': ['src']`

如果你想要禁用默认配置中的规则, 你需要配置为: `img: []`

## 参考与感谢

- [vue-compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) - 这是本项目的灵感来源
- [babel-handbook](https://github.com/jamiebuilds/babel-handbook) - 感谢提供中文手册
- [srcset-parse](https://github.com/molefrog/srcset-parse) - 感谢 **[@molefrog](https://github.com/molefrog)**, 处理 srcset 让我感到头疼
- [babel-plugin-transform-jsx-url](https://github.com/xyyjk/babel-plugin-transform-jsx-url)
- [babel-plugin-transform-react-jsx-img-import](https://github.com/gvelo/babel-plugin-transform-react-jsx-img-import)

