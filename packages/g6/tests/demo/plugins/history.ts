import G6 from '../../../src/index';
import { height, width } from '../../datasets/const';

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

  // clear item's state
  const clearStateButton = document.createElement('button');
  clearStateButton.innerText = 'clear nodes selected state';
  clearStateButton.addEventListener('click', () => {
    graph.clearItemState('node1', 'selected');
  });
  parentEle.appendChild(clearStateButton);

  // add new node/edge on the map
  const addNodeButton = document.createElement('button');
  addNodeButton.innerText = 'add data';
  addNodeButton.addEventListener('click', () => {
    graph.startBatch();
    graph.addData('node', {
      id: 'node3',
      data: {
        x: 300,
        y: 100,
      },
    });
    graph.addData('edge', {
      id: 'edge2',
      source: 'node2',
      target: 'node3',
      data: {
        type: 'line-edge',
      },
    });
    graph.stopBatch();
  });
  parentEle.appendChild(addNodeButton);

  // remove new node/edge on the map
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove data';
  removeButton.addEventListener('click', () => {
    graph.startBatch();
    graph.removeData('edge', 'edge2');
    graph.removeData('node', 'node3');
    graph.stopBatch();
  });
  parentEle.appendChild(removeButton);

  // update node/edge
  const updateButton = document.createElement('button');
  updateButton.innerText = 'update data';
  updateButton.addEventListener('click', () => {
    graph.batch(() => {
      graph.updateData('node', {
        id: 'node1',
        data: {
          x: 350,
          y: 200,
        },
      });
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          labelShape: {
            text: '',
          },
        },
      });
    });
  });
  parentEle.appendChild(updateButton);

  // show/hide node
  const visibilityButton = document.createElement('button');
  visibilityButton.innerText = 'show/hide node';
  visibilityButton.addEventListener('click', () => {
    const visible = graph.getItemVisible('node4');
    if (visible) {
      graph.hideItem('node4');
    } else {
      graph.showItem('node4');
    }
  });
  parentEle.appendChild(visibilityButton);

  // to front/back
  const frontButton = document.createElement('button');
  frontButton.innerText = 'front node 4';
  frontButton.addEventListener('click', () => {
    graph.frontItem('node4');
  });
  parentEle.appendChild(frontButton);

  const backButton = document.createElement('button');
  backButton.innerText = 'back node 4';
  backButton.addEventListener('click', () => {
    graph.backItem('node4');
  });
  parentEle.appendChild(backButton);

  // // add combo
  // const addComboButton = document.createElement('button');
  // addComboButton.innerText = 'add combo';
  // addComboButton.addEventListener('click', () => {
  //   graph.addCombo(
  //     {
  //       id: 'combo2',
  //       data: {
  //         x: 550,
  //         y: 100,
  //       },
  //     },
  //     [],
  //   );
  // });
  // parentEle.appendChild(addComboButton);

  // // update combo
  // const updateComboButton = document.createElement('button');
  // updateComboButton.innerText = 'update combo position';
  // updateComboButton.addEventListener('click', () => {
  //   graph.updateComboPosition(
  //     {
  //       id: 'combo2',
  //       data: {
  //         x: 550,
  //         y: 200,
  //       },
  //     },
  //     [],
  //   );
  // });
  // parentEle.appendChild(updateComboButton);

  return { undoButton, redoButton };
};

export default (context) => {
  const { container } = context;

  // 1.create operation container
  createOperationContainer(container!);

  const data = {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 'node2',
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 'node4',
        data: {
          x: 200,
          y: 200,
          type: 'circle-node',
          keyShape: {
            fill: 'orange',
          },
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          type: 'line-edge',
        },
      },
    ],
    // combos: [{ id: 'combo1', data: { x: 400, y: 100 } }],
  };

  const edge: (data: any) => any = (edgeInnerModel: any) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        keyShape: {
          controlPoints: [150, 100],
          // curvePosition: 0.5,
          curveOffset: [0, 20],
          stroke: 'blue',
        },
        // iconShape: {
        //    // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        //     text: 'label',
        //     fill: 'blue'
        // },
        labelShape: {
          text: 'label',
          position: 'middle',
          fill: 'blue',
        },
        labelBackgroundShape: {
          fill: 'white',
        },
        ...data,
      },
    };
  };

  const graph = new G6.Graph({
    container,
    width,
    height,
    data,
    type: 'graph',
    modes: {
      default: [
        'collapse-expand-combo',
        'drag-canvas',
        'drag-node',
        {
          type: 'click-select',
          itemTypes: ['node', 'edge', 'combo'],
        },
        // {
        //   type: 'hover-activate',
        //   itemTypes: ['node', 'edge', 'combo'],
        // },
        'drag-combo',
      ],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      return {
        id,
        data: {
          keyShape: {
            r: 16,
          },
          ...data,
        },
      };
    },
    edge,
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
    // enableStack: false,
    stackCfg: {
      stackSize: 0,
      // ignoreStateChange: true,
    },
  });

  const { undoButton, redoButton } = createOperations(graph);

  graph.on('afteritemchange', () => {
    undoButton.disabled = !graph.canUndo();
    redoButton.disabled = !graph.canRedo();
  });

  graph.on('afteritemstatechange', () => {
    undoButton.disabled = !graph.canUndo();
    redoButton.disabled = !graph.canRedo();
  });

  graph.on('afteritemvisibilitychange', () => {
    undoButton.disabled = !graph.canUndo();
    redoButton.disabled = !graph.canRedo();
  });

  return graph;
};
