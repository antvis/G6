## SSR extension for G6 5.0

This extension package provides SSR support for G6 5.0, which supports canvas rendering in server side.

## Usage

### Install

```bash
npm install @antv/g6-ssr
```

### Render in JavaScript API

> For complete options, please refer to [G6 Graph Options](https://g6.antv.antgroup.com/api/graph/option)

```js
import { createGraph } from '@antv/g6-ssr';

const graph = await createGraph({
  width: 500,
  height: 500,
  data: {
    // data
  },
  // other options
});

graph.exportToFile('image');
// -> image.png
```

### Render in CLI

```bash
npx g6-ssr export -i [graph-options].json -o ./image
```

### Export SVG / PDF

When render in JavaScript API, you can pass `outputType` option to export SVG or PDF.

```js
const graph = await createGraph({
  width: 500,
  height: 500,
  data: {
    // data
  },
  outputType: 'svg', // or 'pdf'
  // other options
});
```

When render in CLI, you can pass `-t` or `--type` option to export SVG or PDF.

```bash
npx g6-ssr export -i [graph-options].json -o ./file -t pdf
```

## License

MIT
