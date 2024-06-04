/**
 * 最短路径
 */
import { findShortestPath } from '@antv/algorithm';
import { CanvasEvent, Graph, NodeEvent, idOf } from '@antv/g6';

const arrayToObject = (array, value) => {
  return array.reduce((obj, key) => {
    obj[key] = value;
    return obj;
  }, {});
};

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

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then((mockData) => {
    const data = formatData(mockData);
    const graph = new Graph({
      container: 'container',
      data: formatData(mockData),
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', 'click-select'],
      autoFit: 'view',
    });

    graph.render();

    const clearStates = () => {
      graph.setElementState(
        Object.fromEntries([...graph.getNodeData(), ...graph.getEdgeData()].map((element) => [idOf(element), []])),
      );
    };

    graph.on(CanvasEvent.CLICK, (e) => {
      clearStates();
    });

    // store the selected nodes according to the clicked order
    let selectedNodeIds = [];
    graph.on(NodeEvent.CLICK, (event) => {
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

    graph.on(CanvasEvent.CLICK, (e) => {
      selectedNodeIds = [];
    });

    button.addEventListener('click', (e) => {
      if (selectedNodeIds.length !== 2) {
        alert('Please select TWO nodes!\n\r请选择有且两个节点！');
        return;
      }
      clearStates();
      const { path } = findShortestPath(data, selectedNodeIds[0], selectedNodeIds[1], true);
      selectedNodeIds = [];

      if (path?.length) {
        const pathNodeMap = {};
        path.forEach((id) => {
          pathNodeMap[id] = true;
        });
        graph.frontElement(path);
        graph.setElementState(arrayToObject(path, 'highlight'));

        let highlightEdges = [];
        let inactiveEdges = [];
        let inactiveNodes = [];

        graph.getEdgeData().forEach((edge) => {
          const { source, target } = edge;
          const sourceInPathIdx = path.indexOf(source);
          const targetInPathIdx = path.indexOf(target);
          if (sourceInPathIdx === -1 || targetInPathIdx === -1) return;
          if (Math.abs(sourceInPathIdx - targetInPathIdx) === 1) {
            highlightEdges.push(edge.id);
          } else {
            inactiveEdges.push(edge.id);
          }
        });

        graph.getNodeData().forEach((node) => {
          if (!pathNodeMap[node.id]) {
            inactiveNodes.push(node.id);
          }
        });

        graph.setElementState(arrayToObject(highlightEdges, 'highlight'));
        graph.setElementState(arrayToObject(inactiveEdges, 'inactive'));
        graph.setElementState(arrayToObject(inactiveNodes, 'inactive'));
      }
    });
  });
