---
title: Bundle Project
order: 6
---

In general, if you are using modern build tools such as Webpack, Rollup, or ESBuild, you can easily build projects that depend on `@antv/g6`.

Some build tools, such as Vite, use ESBuild as the underlying tool, so you can refer to ESBuild's configuration.

Below are some example configurations that you can refer to when building your project. If you find that these configurations do not work properly, make sure that your build tool version is up to date.

## Bundle Project with Webpack

1. Make sure that `webpack` and `webpack-cli` are installed in your project:

```bash
npm install webpack webpack-cli --save-dev
```

2. Refer to the following `webpack.config.js` for configuration:

```js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'production',
};
```

3. Run the build command:

```bash
npx webpack
```

> The above configuration works with `"webpack": "^5.94.0"`, `"webpack-cli": "^5.1.4"`.

:::error{title=Webpack4}
⚠️ It is strongly recommended that projects use Webpack 5. If you are using Webpack 4, follow the steps below to configure:

1. Install the necessary dependencies: `babel-loader` (<9), `@babel/preset-env`, `@open-wc/webpack-import-meta-loader`

> If you are using TypeScript, you also need to install `ts-loader`.

```bash
npm install babel-loader@8 @babel/preset-env @open-wc/webpack-import-meta-loader --save-dev
```

2. Modify the `webpack.config.js` configuration:

<embed src="@/common/manual/feature/webpack4.md"></embed>
:::

## Bundle Project with Rollup

1. First, make sure that `rollup` and the necessary plugins are installed in your project:

- `@rollup/plugin-commonjs`: Used to load CommonJS modules
- `@rollup/plugin-node-resolve`: Used to load Node.js modules

```bash
npm install rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve --save-dev
```

2. Refer to the following `rollup.config.js` for configuration:

```js
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'project',
  },
  plugins: [resolve(), commonjs()],
};
```

3. Run the build command:

```bash
npx rollup -c
```

## Bundle Project with ESBuild

1. First, make sure that `esbuild` is installed in your project:

```bash
npm install esbuild --save-dev
```

2. Run the build command:

```bash
npx esbuild src/index.ts --bundle --outfile=dist/index.js
```
