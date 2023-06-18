# babel-plugin-jsx-asset-url-import

Extract and transform static url to import in JSX

[English](./README.md) | [简体中文](./README.zh-CN.md)

![npm](https://img.shields.io/npm/v/babel-plugin-jsx-asset-url-import?logo=npm&style=for-the-badge)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/suiyun39/babel-plugin-jsx-asset-url-import/ci.yml?label=CI&logo=github-actions&logoColor=white&style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/suiyun39/babel-plugin-jsx-asset-url-import?logo=codecov&style=for-the-badge)

## Example

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

## Installation & Usage

```bash
pnpm add -D babel-plugin-jsx-asset-url-import
```

**babel.config.js**

```js
export default {
  plugins: ['jsx-asset-url-import'],
};
```

## Options

### includeAbsolute

- type: `boolean`
- default: `false`

Include absolute paths when extracting

### tags

- type: `Record<string, string[]>`

- default:

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

Configure tags and attributes for extraction. If you want to extract the attributes of custom components. Please add it here. Plugin internals will be merged with the default configuration

If your component is contained in object, similar to `<Foo.Bar src="./logo.png" />` . Please configure as `'Foo.Bar': ['src']`

If you want to disable default rules. Please configure as `img: []`

## Reference & Thanks

- [vue-compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) - The source of inspiration for this project
- [babel-handbook](https://github.com/jamiebuilds/babel-handbook) - Thanks for providing the Chinese handbook
- [srcset-parse](https://github.com/molefrog/srcset-parse) - Thanks for **[@molefrog](https://github.com/molefrog)**, Dealing with srcset is giving me headaches
- [babel-plugin-transform-jsx-url](https://github.com/xyyjk/babel-plugin-transform-jsx-url)
- [babel-plugin-transform-react-jsx-img-import](https://github.com/gvelo/babel-plugin-transform-react-jsx-img-import)

