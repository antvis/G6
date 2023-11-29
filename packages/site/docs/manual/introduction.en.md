---
title: Introduction
order: 0
---

![](https://user-images.githubusercontent.com/6113694/45008751-ea465300-b036-11e8-8e2a-166cbb338ce2.png)

[![travis-ci](https://img.shields.io/travis/antvis/g6/master.svg)](https://travis-ci.org/antvis/g6) [![codecov](https://codecov.io/gh/antvis/G6/branch/master/graph/badge.svg)](https://codecov.io/gh/antvis/G6) ![typescript](https://img.shields.io/badge/language-typescript-red.svg) ![MIT](https://img.shields.io/badge/license-MIT-000000.svg) [![npm package](https://img.shields.io/npm/v/@antv/g6.svg)](https://www.npmjs.com/package/@antv/g6) [![NPM downloads](http://img.shields.io/npm/dm/@antv/g6.svg)](https://npmjs.org/package/@antv/g6) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/g6.svg)](http://isitmaintained.com/project/antvis/g6 'Percentage of issues still open')

[中文 README](README.md)

[G6](https://github.com/antvis/g6) is a graph visualization engine. It provides a set of basic mechanisms, help developers to build your own graph visualization analysis application or graph visualization modeling application.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zTjwQaXokeQAAAAAAAAAAABkARQnAQ' width=550 alt='' />

## 🎉 New G6 5.0

G6 is a professional graph visualization engine with the following features:

- Easy to extend, support custom elements, interactions, layouts, renderers, etc.

  - Rich elements: built-in rich node and edge elements, free configuration, support custom
  - Convenient components: optimize the built-in component functions and performance
  - Support TreeShaking to reduce package size

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*x7NTT5_baKYAAAAAAAAAAAAADmJ7AQ/original" width=400 height=218 alt='' />

- New style and animation design specifications, support information layer display

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*tPPGSokdSYsAAAAAAAAAAAAADmJ7AQ/original" width=600 height=367 alt='' />

> Animation specification and information layer display [View original image](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*1BFvQ4r3P7UAAAAAAAAAAAAADmJ7AQ/original)

- Provide built-in light and dark themes, themes can be customized, and animation configuration is simple

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QjJoSbD7GTwAAAAAAAAAAAAADmJ7AQ/original" width=800 height=226 alt='' />

> Built-in theme and custom theme

- High-performance layout, built-in 10+ commonly used graph layouts, support GPU, Rust parallel computing, and customizable layout
- Customizable interaction, built-in 10+ interactive behaviors, support custom interaction
- Developer friendly, providing complete TypeScript type support
- Runtime renderer switching, support Canvas, SVG, WebGL multiple rendering methods
- Support 3D large graph display

<img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*IUOnSbLisyoAAAAAAAAAAAAADmJ7AQ/original" width=600 height=334 alt='' />

> 3D large graph [View original image](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*qPrmQrdV77gAAAAAAAAAAAAADmJ7AQ/original)

Furthermore, elements, interactions, and layouts all have a highly scalable custom mechanism.

## Contributing

Please let us know what is your contribution and what problem you want to solve. Before submitting a PR, please make sure that you have submitted an [issue](https://github.com/antvis/g6/issues) and describe the bug or feature request.

```bash
# Install dependencies

$ pnpm install

# Enter the g6 package directory from the project root directory
$ cd packages/g6

# Build
$ npm run build

# Start the integration test demo
$ npm run dev

# Lint
$ npm run lint

# Lint fix
$ npm run fix

# Run all unit tests
$ npm run test:integration

# Run a single unit test: Modify the test file directory specified by the test:integration_one command in package.json, and then execute:
$ npm run test:integration_one
```

### Issue Hunt

See [Issue Hunt Plan Document](https://github.com/antvis/G6/blob/v5-readme/ISSUEHUNT.md).

## License

[MIT license](./LICENSE).
