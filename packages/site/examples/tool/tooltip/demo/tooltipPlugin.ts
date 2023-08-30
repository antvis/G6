import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    tooltip: Extensions.Tooltip,
  },
});

const container = document.getElementById('container') as HTMLElement;
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const data = Util.mock(6).circle();
const graph = new Graph({
  container,
  width,
  height,
  data,
  modes: {
    default: ['drag-node'],
  },
});

const tooltip = {
  key: 'my-tooltip',
  type: 'tooltip',
  getContent: (e) => {
    const { itemId, itemType } = e;
    const model = graph.getNodeData(itemId);
    console.log('model', model);
    return `
      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${e.itemType}</li>
      </ul>
      <ul>
        <li>Label: ${e.itemId}</li>
      </ul>`;
  },
};

graph.addPlugins([tooltip]);
