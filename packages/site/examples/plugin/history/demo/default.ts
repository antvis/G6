import { Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node-0',
      style: {
        x: 200,
        y: 150,
      },
    },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'rect',
      size: [80, 40],
      labelText: 'Drag Me!',
      labelPlacement: 'middle',
      labelFill: '#fff',
      radius: 5,
    },
  },
  behaviors: ['drag-element'],
  plugins: [
    {
      type: 'history',
      key: 'history',
    },
  ],
});

(async () => {
  await graph.render();

  const history = graph.getPluginInstance('history');
  /** Create operations and tips */
  const container = document.getElementById('container');
  const btnContainer = document.createElement('div');
  btnContainer.style.position = 'absolute';
  container.appendChild(btnContainer);
  const undoButton = document.createElement('button');
  undoButton.innerText = '⬅️ undo';
  undoButton.addEventListener('click', () => {
    history.undo();
  });
  btnContainer.appendChild(undoButton);
  const redoButton = document.createElement('button');
  redoButton.innerText = '➡️ redo';
  redoButton.style.margin = '10px 5px';
  redoButton.addEventListener('click', () => {
    history.redo();
  });
  btnContainer.appendChild(redoButton);

  /** Update redo/undo status */
  const updateButtonStatus = () => {
    undoButton.disabled = !history.canUndo();
    redoButton.disabled = !history.canRedo();
  };

  updateButtonStatus();

  history.on('change', () => {
    updateButtonStatus();
  });
})();
