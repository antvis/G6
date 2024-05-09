/**
 * LP 自动聚类
 */
import { labelPropagation } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const button = document.createElement('button');
button.innerHTML = `Click Here to Clustering 点此自动聚类`;
document.getElementById('container').appendChild(button);

const subjectColors = [
  '#5F95FF', // blue
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      data,
      width,
      height,
      linkCenter: true,
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
      layout: {
        type: 'force',
        linkDistance: 50,
        minMovement: 0.1,
      },
    });
    graph.render();

    button.addEventListener('click', (e) => {
      const clusteredData = labelPropagation(data, false);
      let newNodeData = [];
      clusteredData.clusters.forEach((cluster, i) => {
        const colors = subjectColors[i % subjectColors.length];
        cluster.nodes.forEach((node) => {
          node.style = {
            fill: colors,
          };
        });
        newNodeData.push(...cluster.nodes);
      });
      graph.updateNodeData(newNodeData);
      graph.draw();
    });
  });
