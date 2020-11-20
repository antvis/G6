import G6 from '@antv/g6';

const tipDiv = document.createElement('div');
tipDiv.innerHTML = `Press 'shift' and click two nodes to select begin and end nodes. 按住 'shift' 并点选两个节点作为起点和终点。`;
document.getElementById('container').appendChild(tipDiv);

const button = document.createElement('button');
button.innerHTML = `查看最短路径`;
document.getElementById('container').appendChild(button);


const container = document.getElementById('container');
const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 40;

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  modes: {
    default: ['click-select', 'drag-canvas', 'drag-node', 'zoom-canvas'],
  },
  fitView: true,
});
fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then((data) => {

    const clearStates = () => {
      graph.getNodes().forEach(node => {
        graph.clearItemStates(node);
      });
      graph.getEdges().forEach(edge => {
        graph.clearItemStates(edge);
      });
    }

    graph.on('canvas:click', e => {
      clearStates();
    });

    graph.data(data);
    graph.render();

    button.addEventListener('click', e => {
      const selectedNodes = graph.findAllByState('node', 'selected');
      if (selectedNodes.length !== 2) {
        alert('Please select TWO nodes!\n\r请选择有且两个节点！');
        return;
      }
      clearStates();
      const { findShortestPath } = G6.Algorithm;
      const { path } = findShortestPath(graph, selectedNodes[0].getID(), selectedNodes[1].getID());
      const pathNodeMap = {};
      path.forEach(id => {
        const pathNode = graph.findById(id);
        pathNode.toFront();
        graph.setItemState(pathNode, 'highlight', true);
        pathNodeMap[id] = true;
      });
      graph.getEdges().forEach(edge => {
        const edgeModel = edge.getModel();
        const source = edgeModel.source;
        const target = edgeModel.target;
        const sourceInPathIdx = path.indexOf(source);
        const targetInPathIdx = path.indexOf(target);
        if (sourceInPathIdx === -1 || targetInPathIdx === -1) return;
        if (Math.abs(sourceInPathIdx - targetInPathIdx) === 1) {
          graph.setItemState(edge, 'highlight', true);
        } else {
          graph.setItemState(edge, 'inactive', true);
        }
      });
      graph.getNodes().forEach(node => {
        if (!pathNodeMap[node.getID()]) {
          graph.setItemState(node, 'inactive', true);
        }
      });
    });

  });

if (window && typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight - 40);
  };
