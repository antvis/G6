import G6 from '../../../src/index';

const createOperationContainer = (container: HTMLElement) => {
  const operationContainer = document.createElement('div');
  operationContainer.id = 'ctrl-container';
  operationContainer.style.width = '100%';
  operationContainer.style.height = '50px';
  operationContainer.style.lineHeight = '50px';
  operationContainer.style.backgroundColor = '#eee';

  container.appendChild(operationContainer);
};

const createOperations = (graph): any => {
  const parentEle = document.getElementById('ctrl-container');
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

  // set item's state
  const setStateButton = document.createElement('button');
  setStateButton.innerText = 'set node 1 selected state';
  setStateButton.addEventListener('click', () => {
    graph.setItemState('node1', 'selected', true);
  });
  parentEle.appendChild(setStateButton);

  // clear item's state
  const clearStateButton = document.createElement('button');
  clearStateButton.innerText = 'clear node 1 selected state';
  clearStateButton.addEventListener('click', () => {
    graph.clearItemState('node1', 'selected');
  });
  parentEle.appendChild(clearStateButton);

  // add new node/edge on the map
  const addNodeButton = document.createElement('button');
  addNodeButton.innerText = 'add data';
  addNodeButton.addEventListener('click', () => {
    graph.startHistoryBatch();
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
    graph.stopHistoryBatch();
  });
  parentEle.appendChild(addNodeButton);

  // remove new node/edge on the map
  const removeButton = document.createElement('button');
  removeButton.innerText = 'remove data';
  removeButton.addEventListener('click', () => {
    graph.startHistoryBatch();
    graph.removeData('edge', 'edge2');
    graph.removeData('node', 'node3');
    graph.stopHistoryBatch();
  });
  parentEle.appendChild(removeButton);

  // update node/edge
  const updateButton = document.createElement('button');
  updateButton.innerText = 'update data';
  updateButton.addEventListener('click', () => {
    graph.historyBatch(() => {
      graph.updateData('node', [
        {
          id: 'node1',
          data: {
            x: 350,
            y: 200,
          },
        },
        {
          id: 'node4',
          data: {
            x: 200,
            y: 110,
          },
        },
      ]);
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
    ...context,
    data,
    type: 'graph',
    modes: {
      default: ['drag-canvas', 'drag-node', 'click-select'],
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
    // enableStack: false,
    // stackCfg: {
    //   stackSize: 0,
    //   stackActive: true,
    //   ignoreStateChange: true,
    // },
  });

  const { undoButton, redoButton } = createOperations(graph);

  const updateButtonStatus = () => {
    undoButton.disabled = !graph.canUndo();
    redoButton.disabled = !graph.canRedo();
  };

  updateButtonStatus();

  graph.on('history:change', () => {
    updateButtonStatus();
  });

  return graph;
};
