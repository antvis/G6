# @antv/g6-react-node

[![NPM version](https://img.shields.io/npm/v/@antv/g6-react-node.svg?style=flat)](https://npmjs.org/package/@antv/g6-react-node)
[![NPM downloads](http://img.shields.io/npm/dm/@antv/g6-react-node.svg?style=flat)](https://npmjs.org/package/@antv/g6-react-node)

Using React Component to Define Your G6 Graph Node

## Usage

```bash
pnpm install @antv/g6-react-node@2.0.0-beta.1
```

```jsx
import { createReactNode, createReactGNode } from '@antv/g6-react-node';

const ReactNode = createReactNode({
  // ... React Component
});

const ReactGNode = createReactGNode({
  // ... JSX Component
});
```


## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch
```

## LICENSE

MIT
