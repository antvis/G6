import { Graph } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new Graph({
  container: 'container',
  width,
  height,
  theme: {
    type: 'spec',
    specification: {
      node: {
        dataTypeField: 'cluster',
      },
    },
  },
  node: {
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
        type: 'circle-combo',
        ...model.data,
        keyShape: {
          padding: [10, 20, 30, 40],
          r: 50,
        },
        labelShape: {
          text: model.id,
        },
      },
    };
  },
  data: {
    nodes: [
      { id: '1', data: { x: 250, y: 300, parentId: 'combo1' } },
      { id: '2', data: { x: 350, y: 300, parentId: 'combo1' } },
      { id: '3', data: { x: 250, y: 450, parentId: 'combo2' } },
    ],
    edges: [
      { id: 'edge1', source: '1', target: '2', data: {} },
    ],
    combos: [
      { id: 'combo1', data: { parentId: 'combo2' } }, // collapsed: true
      { id: 'combo2', data: {} },
    ],
  },
  modes: {
    default: [
      'collapse-expand-combo',
      {
        type: 'drag-node',
        // enableTransient: false,
        // updateComboStructure: false,
      },
      'drag-canvas',
      {
        type: 'click-select',
        itemTypes: ['node', 'edge', 'combo'],
      },
      {
        type: 'drag-combo',
        enableTransient: true,
        // updateComboStructure: true,
      },
    ],
  },
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const simulate = () => {
  // Add elements
  // Batch update, also supports `historyBatch`
  graph.startHistoryBatch(); // start batch
  graph.addData('node', {
    id: '4',
    data: {
      x: 300,
      y: 370,
      parentId: 'combo1',
    },
  });
  graph.addData('edge', {
    id: 'edge3',
    source: '1',
    target: '4',
  });
  graph.stopHistoryBatch(); // end batch
  // Update Node Color (no stack)
  delay(300).then(() => {
    // Method 1: No stack
    graph.executeWithNoStack(() => {
      graph.updateData(
        'node',
        {
          id: '1',
          data: {
            cluster: Math.random(),
          },
        }
      );
    });
    // Method 2: No stack
    graph.pauseStack();
    graph.updateData(
      'node',
      {
        id: '2',
        data: {
          cluster: Math.random(),
        },
      }
    );
    graph.resumeStack();
  });
  // set states
  delay(600).then(() => {
    graph.historyBatch(() => {
      graph.setItemState(['1', '2', '3', '4'], 'selected', true);
    });
  });
  // move
  delay(1200).then(() => {
    graph.moveCombo('combo2', 50, 0);
  });
  // collpase combo
  delay(1800).then(() => {
    graph.collapseCombo('combo1');
  });
};

/** Create operations and tips */
const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tipButton = document.createElement('a');
tipButton.innerText = 'Simulate interaction';
tipButton.addEventListener('click', simulate);
btnContainer.appendChild(tipButton);
const tip = document.createElement('span');
tip.innerHTML = `:<br/> Add Elements (🌟 batch processing) 👉 Update Node Color (⛳️ No stack) 👉 Update States 👉 Move Combo  👉 Collapse Combo<br/>`;
btnContainer.appendChild(tip);
const undoButton = document.createElement('button');
undoButton.innerText = '⬅️ undo';
undoButton.addEventListener('click', () => {
  graph.undo();
});
btnContainer.appendChild(undoButton);
const redoButton = document.createElement('button');
redoButton.innerText = '➡️ redo';
redoButton.style.margin = '10px 5px';
redoButton.addEventListener('click', () => {
  graph.redo();
});
btnContainer.appendChild(redoButton);

/** Update redo/undo status */
const updateButtonStatus = () => {
  undoButton.disabled = !graph.canUndo();
  redoButton.disabled = !graph.canRedo();
};

updateButtonStatus();

graph.on('history:change', () => {
  updateButtonStatus();
});

window.graph = graph;