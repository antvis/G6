import { findShortestPath } from '@antv/algorithm';
import { CanvasEvent, Graph } from '@antv/g6';

const format = ({ nodes, edges }) => {
  return {
    nodes: nodes.map((node) => ({
      ...node,
      style: {
        x: node.x,
        y: node.y,
      },
    })),
    edges,
  };
};

fetch('https://gw.alipayobjects.com/os/bmw-prod/b0ca4b15-bd0c-43ec-ae41-c810374a1d55.json')
  .then((res) => res.json())
  .then(format)
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      animation: false,
      data,
      node: {
        style: {
          size: 12,
        },
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element', { type: 'click-select', multiple: true }],
      autoFit: 'view',
    });

    graph.render();

    const resetStates = () => {
      graph.setElementState(Object.fromEntries([...data.nodes, ...data.edges].map((element) => [element.id, []])));
    };

    graph.on(CanvasEvent.CLICK, () => {
      resetStates();
    });

    window.addPanel((gui) => {
      gui.add(
        {
          Help: () => {
            alert("Press 'shift' to select source and target nodes \n按住 'shift' 选取起点和终点");
          },
        },
        'Help',
      );
      gui.add(
        {
          Search: () => {
            const nodes = graph.getElementDataByState('node', 'selected');
            if (nodes.length !== 2) {
              alert('Please select 2 nodes!\n请选择两个节点！');
              return;
            }
            const [source, target] = nodes;
            const { length, path } = findShortestPath(data, source.id, target.id);
            if (length === Infinity) {
              alert('No path found!\n未找到路径！');
              return;
            }

            const states = {};
            data.nodes.forEach(({ id }) => {
              if (path.includes(id)) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            data.edges.forEach(({ id, source, target }) => {
              const sourceIndex = path.indexOf(source);
              const targetIndex = path.indexOf(target);
              if (sourceIndex === -1 || targetIndex === -1) return;
              if (Math.abs(sourceIndex - targetIndex) === 1) states[id] = 'highlight';
              else states[id] = 'inactive';
            });

            graph.setElementState(states);
            graph.frontElement(path);
          },
        },
        'Search',
      );
    });
  });
