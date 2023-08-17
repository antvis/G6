import G6 from '../../../src/index';
import { container, height, width } from '../../datasets/const';

const createOperationContainer = (container: HTMLElement) => {
  const operationContainer = document.createElement('div');
  operationContainer.id = 'operation-bar';
  operationContainer.style.width = '100%';
  operationContainer.style.height = '50px';
  operationContainer.style.lineHeight = '50px';
  operationContainer.style.backgroundColor = '#eee';

  container.appendChild(operationContainer);
};

const createOperations = (graph): any => {
  const parentEle = document.getElementById('operation-bar');
  if (!parentEle) return;

  // undo/redo
  const undoButton = document.createElement('button');
  undoButton.innerText = 'undo';
  undoButton.addEventListener('click', () => {
    graph.undo();
  });
  const redoButton = document.createElement('button');
  redoButton.innerText = 'redo';
  redoButton.addEventListener('click', () => {
    graph.redo();
  });

  undoButton.disabled = graph.canUndo();
  redoButton.disabled = graph.canRedo();

  parentEle.appendChild(undoButton);
  parentEle.appendChild(redoButton);

  return { undoButton, redoButton };
};

export default (context) => {
  const { container } = context;

  createOperationContainer(container);

  const graph = new G6.Graph({
    container,
    width,
    height,
    type: 'graph',
    layout: {
      type: 'grid',
    },
    stackCfg: {
      ignoreStateChange: true,
    },
    node: {
      labelShape: {
        position: 'center',
        text: {
          fields: ['id'],
          formatter: (model) => model.id,
        },
      },
      animates: {
        update: [
          {
            fields: ['opacity'],
            shapeId: 'haloShape',
          },
        ],
      },
    },
    combo: (model) => {
      return {
        id: model.id,
        data: {
          ...model.data,
          keyShape: {
            padding: [10, 20, 30, 40],
            r: 50,
          },
          labelShape: {
            text: model.id,
          },

          animates: {
            buildIn: [
              {
                fields: ['opacity'],
                duration: 500,
                delay: 500 + Math.random() * 500,
              },
            ],
            buildOut: [
              {
                fields: ['opacity'],
                duration: 200,
              },
            ],
            update: [
              {
                fields: ['lineWidth', 'r'],
                shapeId: 'keyShape',
              },
              {
                fields: ['opacity'],
                shapeId: 'haloShape',
              },
            ],
          },
        },
      };
    },
    data: {
      nodes: [
        // { id: 'node1', data: {} },
        // { id: 'node2', data: {} },
        // { id: 'node3', data: {} },
        { id: 'node1', data: { parentId: 'combo1' } },
        { id: 'node2', data: { parentId: 'combo1' } },
        { id: 'node3', data: { parentId: 'combo2' } },
        { id: 'node4', data: { parentId: 'combo1' } },
        { id: 'node5', data: {} },
      ],
      edges: [
        { id: 'edge1', source: 'node1', target: 'node2', data: {} },
        { id: 'edge2', source: 'node1', target: 'node3', data: {} },
        { id: 'edge3', source: 'node1', target: 'node4', data: {} },
        { id: 'edge4', source: 'node2', target: 'node3', data: {} },
        { id: 'edge5', source: 'node3', target: 'node4', data: {} },
        { id: 'edge6', source: 'node4', target: 'node5', data: {} },
        // { id: 'edge7', source: 'node5', target: 'combo1', data: {} },
      ],
      combos: [
        { id: 'combo1', data: { parentId: 'combo2' } }, // collapsed: true
        { id: 'combo2', data: {} },
        { id: 'combo3', data: {} },
      ],
    },
    modes: {
      default: [
        'collapse-expand-combo',
        'drag-node',
        'drag-canvas',
        {
          type: 'click-select',
          itemTypes: ['node', 'edge', 'combo'],
        },
        {
          type: 'hover-activate',
          itemTypes: ['node', 'edge', 'combo'],
        },
        'drag-combo',
      ],
    },
  });
  graph.on('canvas:click', (e) => {
    console.log('graph', graph);
    /** modify node's parent to another combo */
    // graph.updateData('node', {
    //   id: 'node1',
    //   data: {
    //     parentId: 'combo2',
    //   },
    // });
    /** invalid modification (to its succeeds) */
    // graph.updateData('combo', {
    //   id: 'combo2',
    //   data: {
    //     parentId: 'combo1',
    //   },
    // });
    /** add combo */
    // graph.addCombo(
    //   {
    //     id: 'newcombo',
    //     data: {
    //       parentId: 'combo2',
    //     },
    //   },
    //   ['node1', 'combo1', 'node4'],
    // );
    /** collapse combo */
    // if (!graph.getComboData('combo1')?.data.collapsed) {
    //   graph.collapseCombo(['combo1']);
    //   setTimeout(() => {
    //     graph.collapseCombo(['combo2']);
    //   }, 1000);
    // } else {
    //   graph.expandCombo(['combo2']);
    //   setTimeout(() => {
    //     graph.expandCombo(['combo1']);
    //   }, 1000);
    // }
    /** remove combo = uncombo */
    // graph.removeData('combo', 'combo1');
    /** move an empty combo */
    // graph.updateData('combo', {
    //   id: 'combo3',
    //   data: {
    //     x: 100,
    //     y: 200,
    //   },
    // });
    // graph.moveCombo('combo3', 100, 200);
  });

  const { undoButton, redoButton } = createOperations(graph);

  graph.on('afteritemchange', () => {
    undoButton.disabled = !graph.canUndo();
    redoButton.disabled = !graph.canRedo();
  });

  return graph;
};
