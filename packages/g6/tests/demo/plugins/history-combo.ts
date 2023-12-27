import { Extensions, Graph, extend } from '../../../src/index';

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

  // add combo
  const addComboButton = document.createElement('button');
  addComboButton.innerText = 'add combo';
  addComboButton.addEventListener('click', () => {
    graph.addCombo(
      {
        id: 'combo2',
        data: {
          x: 200,
          y: 100,
          keyShape: {
            padding: [10, 20, 30, 40],
            r: 50,
            fill: '#0f0',
          },
        },
      },
      [],
    );
  });
  parentEle.appendChild(addComboButton);

  // update combo position
  const updateComboButton = document.createElement('button');
  updateComboButton.innerText = 'move combo';
  updateComboButton.addEventListener('click', () => {
    graph.updateComboPosition(
      {
        id: 'combo1',
        data: {
          x: 300,
          y: 100,
        },
      },
      [],
    );
  });
  parentEle.appendChild(updateComboButton);

  // collapse combo
  const collapseComboButton = document.createElement('button');
  collapseComboButton.innerText = 'collapse combo';
  collapseComboButton.addEventListener('click', () => {
    graph.collapseCombo('combo1');
  });
  parentEle.appendChild(collapseComboButton);

  // expand combo
  const expandComboButton = document.createElement('button');
  expandComboButton.innerText = 'expand combo';
  expandComboButton.addEventListener('click', () => {
    graph.expandCombo('combo1');
  });
  parentEle.appendChild(expandComboButton);

  return { undoButton, redoButton };
};

export default (context) => {
  const { container } = context;

  // 1.create operation container
  createOperationContainer(container!);

  const data = {
    nodes: [],
    edges: [],
    combos: [{ id: 'combo1', data: { x: 150, y: 100 } }],
  };

  const ExtGraph = extend(Graph, {
    behaviors: {
      'hover-activate': Extensions.HoverActivate,
    },
  });
  const graph = new ExtGraph({
    ...context,
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
        {
          type: 'hover-activate',
          itemTypes: ['node', 'edge', 'combo'],
        },
        'drag-combo',
      ],
    },
    combo: (model) => {
      return {
        id: model.id,
        data: {
          keyShape: {
            padding: [10, 20, 30, 40],
            r: 50,
            fill: '#f00',
          },
          labelShape: {
            text: model.id,
          },
          ...model.data,
        },
      };
    },
    stackCfg: {
      stackSize: 0,
      ignoreStateChange: true,
    },
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
