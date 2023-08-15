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
    graph.clearItemState([1, 2], 'selected');
  });
  parentEle.appendChild(clearStateButton);

  // add new node/edge on the map
  const addNodeButton = document.createElement('button');
  addNodeButton.innerText = 'add node and related edge';
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
      source: 2,
      target: 'node3',
      data: {
        type: 'line-edge',
      },
    });
    graph.stopBatch();
  });
  parentEle.appendChild(addNodeButton);

  // show/hide node
  const visibilityButton = document.createElement('button');
  visibilityButton.innerText = 'show/hide node';
  visibilityButton.addEventListener('click', () => {
    const visible = graph.getItemVisible(4);
    if (visible) {
      graph.hideItem(4);
    } else {
      graph.showItem(4);
    }
  });
  parentEle.appendChild(visibilityButton);

  // to front/back
  const frontButton = document.createElement('button');
  frontButton.innerText = 'front node 4';
  frontButton.addEventListener('click', () => {
    graph.frontItem(4);
  });
  parentEle.appendChild(frontButton);

  const backButton = document.createElement('button');
  backButton.innerText = 'back node 4';
  backButton.addEventListener('click', () => {
    graph.backItem(4);
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
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 4,
        data: {
          x: 200,
          y: 200,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'quadratic-edge',
        },
      },
    ],
  };

  const edge: (data: any) => any = (edgeInnerModel: any) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        ...data,
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
      default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    node: (nodeInnerModel: any) => {
      const { id, data } = nodeInnerModel;
      if (id === 4) {
        return {
          id,
          data: {
            ...data,
            keyShape: {
              r: 16,
              fill: 'orange',
            },
          },
        };
      }
      return {
        id,
        data: {
          ...data,
          keyShape: {
            r: 16,
          },
        },
      };
    },
    edge,
  });

  const { undoButton, redoButton } = createOperations(graph);

  // graph.on('afteritemchange', () => {
  //   console.log('trigger afteritemchange', !graph.canUndo());

  //   undoButton.disabled = !graph.canUndo();
  //   redoButton.disabled = !graph.canRedo();
  // });

  // graph.on('afteritemstatechange', () => {
  //   undoButton.disabled = !graph.canUndo();
  //   redoButton.disabled = !graph.canRedo();
  // });

  // graph.on('afteritemvisibilitychange', () => {
  //   undoButton.disabled = !graph.canUndo();
  //   redoButton.disabled = !graph.canRedo();
  // });

  return graph;
};
