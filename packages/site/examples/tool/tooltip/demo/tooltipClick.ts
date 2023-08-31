import { Graph as BaseGraph, Extensions, Util, extend } from '@antv/g6';

const Graph = extend(BaseGraph, {
  plugins: {
    tooltip: Extensions.Tooltip,
  },
});

import insertCss from 'insert-css';

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
  type: 'tooltip',
  key: 'my-tooltip',
  trigger: 'click',
  // custom the tooltip's content
  getContent: (e) => {
    const { itemId, itemType } = e;
    const getModel = itemType === 'node' ? graph.getNodeData.bind(graph) : graph.getEdgeData.bind(graph);
    const model = getModel(itemId);
    console.log(model);
    return `
      <h4>Custom Content</h4>
      <ul>
        <li>Type: ${itemType}</li>
      </ul>
      <ul>
        <li>Label: ${itemId}</li>
      </ul>`;
  },
};

graph.addPlugins([tooltip]);

insertCss(`
  .g6-component-tooltip {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0px 10px 24px 10px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
`);
