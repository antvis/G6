---
title: 项目打包
order: 6
---

通常情况下，如果你使用的现代构建工具，如 Webpack、Rollup 或 ESBuild，你可以很容易地构建依赖于 `@antv/g6` 的项目。

一些构建工具例如 Vite，其底层是使用 ESBuild，因此你可以参考 ESBuild 的配置。

下面是一些示例配置，你可以参考这些配置来构建你的项目。如果你发现这些配置无法正常工作，请确保你的构建工具版本较新。

## 使用 Webpack 打包项目

1. 确保你的项目中已经安装了 `webpack` 和 `webpack-cli`：

```bash
npm install webpack webpack-cli --save-dev
```

2. 参考下面的 `webpack.config.js` 进行配置：

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

3. 执行构建命令：

```bash
npx webpack
```

> 上述配置在："webpack": "^5.94.0"，"webpack-cli": "^5.1.4" 可以正常工作。

:::error{title=Webpack4}
⚠️ 强烈建议项目使用 Webpack 5，如果你使用的是 Webpack 4，按以下步骤配置：

1. 安装相关依赖：babel-loader(<9)、@babel/preset-env、@open-wc/webpack-import-meta-loader

> 如果你使用的 typescript，还需要安装 ts-loader

```bash
npm install babel-loader@8 @babel/preset-env @open-wc/webpack-import-meta-loader --save-dev
```

2. 修改 `webpack.config.js` 配置：

<embed src="../feature-common/webpack4.md"></embed>
:::

## 使用 Rollup 打包项目

1. 首先，确保你的项目中已经安装了 `rollup` 及必要的插件：

- `@rollup/plugin-commonjs`：用于加载 CommonJS 模块
- `@rollup/plugin-node-resolve`：用于加载 Node.js 模块

```bash
npm install rollup @rollup/plugin-commonjs @rollup/plugin-node-resolve --save-dev
```

2. 参考下面的 `rollup.config.js` 进行配置：

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

3. 执行构建命令：

```bash
npx rollup -c
```

## 使用 ESBuild 打包项目

1. 首先，确保你的项目中已经安装了 `esbuild`：

```bash
npm install esbuild --save-dev
```

2. 执行构建命令：

```bash
npx esbuild src/index.ts --bundle --outfile=dist/index.js
```
