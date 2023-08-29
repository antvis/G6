import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  behaviors: {
    'brush-select': Extensions.BrushSelect,
    'activate-relations': Extensions.ActivateRelations,
  },
});

const container = document.getElementById('container') as HTMLElement;
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = `正在渲染大规模数据，请稍等……`;
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
  node: {
    keyShape: {
      r: 8,
    },
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/da5a1b47-37d6-44d7-8d10-f3e046dabf82.json')
  .then((res) => res.json())
  .then((res) => {
    const nodes = res.nodes.map((node) => {
      return {
        id: node.id,
        data: {
          x: node.x,
          y: node.y,
        },
      };
    });
    const edges = res.edges.map((edge, index) => {
      const { source, target } = edge;
      return {
        id: `${index}_${source}_to_${target}`,
        source,
        target,
        data: {},
      };
    });

    const data = { nodes, edges };
    console.log(data);
    graph.read(data);

    descriptionDiv.innerHTML = `节点数量：${nodes.length}, 边数量：${edges.length}, 图元数量：${
      nodes.length * 2 + edges.length
    }`;
  });
