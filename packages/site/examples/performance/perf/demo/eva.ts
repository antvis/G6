import { Graph } from '@antv/g6';

const container = document.getElementById('container') as HTMLElement;
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = `正在渲染大规模数据，请稍等……`;
container.appendChild(descriptionDiv);

const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['brush-select', 'zoom-canvas', 'activate-relations', 'drag-canvas', 'drag-node'],
  },
  // layout: {
  //   type: 'grid',
  //   // animated: true,
  // },
  node: {
    keyShape: {
      r: 1,
    },
  },
});

fetch('https://gw.alipayobjects.com/os/basement_prod/0b9730ff-0850-46ff-84d0-1d4afecd43e6.json')
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

    const nodeLen = graph.getAllNodesData().length;
    const edgeLen = graph.getAllEdgesData().length;
    descriptionDiv.innerHTML = `节点数量：${nodeLen}, 边数量：${edgeLen}, 图元数量：${nodeLen * 2 + edgeLen}`;
  });
