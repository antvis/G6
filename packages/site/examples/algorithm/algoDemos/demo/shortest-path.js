/**
 * 最短路径
 */
import { findShortestPath } from '@antv/algorithm';
import { Graph } from '@antv/g6';

const formatData = (data) => {
  const newData = data;
  const { nodes } = newData;
  const newNodes = nodes.map((node) => ({
    ...node,
    style: {
      x: node.x,
      y: node.y,
    },
  }));
  newData.nodes = newNodes;
  return newData;
};

const tipDiv = document.createElement('div');
tipDiv.innerHTML = `Press 'shift' and click two nodes to select begin and end nodes. 按住 'shift' 并点选两个节点作为起点和终点。`;
document.getElementById('container').appendChild(tipDiv);

const button = document.createElement('button');
button.innerHTML = `查看最短路径`;
document.getElementById('container').appendChild(button);

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 40;

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then((mockData) => {
    const data = formatData(mockData);
    const graph = new Graph({
      container: 'container',
      width,
      height,
      data,
      linkCenter: true,
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'],
      fitView: true,
    });

    graph.render();

    const clearStates = () => {
      graph.getNodeData().forEach((node) => {
        graph.setElementState(node.id, []);
      });
      graph.getEdgeData().forEach((edge) => {
        graph.setElementState(edge.id, []);
      });
    };

    graph.on('canvas:click', (e) => {
      clearStates();
    });

    // store the selected nodes according to the clicked order
    let selectedNodeIds = [];
    graph.on('node:click', (event) => {
      const {
        target: { id },
      } = event;
      const index = selectedNodeIds.indexOf(id);

      if (graph.getElementState(id).includes('selected')) {
        graph.setElementState(id, []);
        selectedNodeIds.splice(index, 1);
      } else if (!graph.getElementState(id).includes('selected')) {
        graph.setElementState(id, 'selected');
        selectedNodeIds.push(id);
      }
    });

    graph.on('canvas:click', (e) => {
      selectedNodeIds = [];
    });

    button.addEventListener('click', (e) => {
      if (selectedNodeIds.length !== 2) {
        alert('Please select TWO nodes!\n\r请选择有且两个节点！');
        return;
      }
      clearStates();
      // path 为其中一条最短路径，allPath 为所有的最短路径
      const { path, allPath } = findShortestPath(data, selectedNodeIds[0], selectedNodeIds[1], true);
      selectedNodeIds = [];

      if (path?.length) {
        const pathNodeMap = {};
        path.forEach((id) => {
          const pathNode = graph.getNodeData(id);
          graph.frontElement(pathNode.id);
          graph.setElementState(pathNode.id, 'highlight', true);
          pathNodeMap[id] = true;
        });
        graph.getEdgeData().forEach((edge) => {
          const { source, target } = edge;
          const sourceInPathIdx = path.indexOf(source);
          const targetInPathIdx = path.indexOf(target);
          if (sourceInPathIdx === -1 || targetInPathIdx === -1) return;
          if (Math.abs(sourceInPathIdx - targetInPathIdx) === 1) {
            graph.setElementState(edge.id, 'highlight', true);
          } else {
            graph.setElementState(edge.id, 'inactive', true);
          }
        });
        graph.getNodeData().forEach((node) => {
          if (!pathNodeMap[node.id]) {
            graph.setElementState(node.id, 'inactive', true);
          }
        });
      }
    });
  });
