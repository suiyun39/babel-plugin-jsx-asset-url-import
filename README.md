# babel-plugin-jsx-asset-url-import

Transform static url to import in JSX

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
import img_src_1 from './logo.png';

const App: React.FC = () => {
  return <img src={img_src_1} alt="" />
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

todo...

## Reference & Thanks

- [vue-compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) - The source of inspiration for this project
- [babel-handbook](https://github.com/jamiebuilds/babel-handbook) - Thanks for providing the Chinese handbook
- [babel-plugin-transform-jsx-url](https://github.com/xyyjk/babel-plugin-transform-jsx-url)
- [babel-plugin-transform-react-jsx-img-import](https://github.com/gvelo/babel-plugin-transform-react-jsx-img-import)

