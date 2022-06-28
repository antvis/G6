import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node1',
      x: 250,
      y: 150,
      comboId: 'combo',
    },
    {
      id: 'node2',
      x: 350,
      y: 150,
      comboId: 'combo',
    },
    {
      id: 'node3',
      x: 250,
      y: 300,
      comboId: 'combo2',
    },
    {
      id: 'node4',
      x: 450,
      y: 300,
      comboId: 'combo2',
    },
  ],
  combos: [
    {
      id: 'combo',
      label: 'Combo',
    },
    {
      id: 'combo2',
      label: 'with substitute icon while collapsed',
      collapsed: true,
      collapsedSubstituteIcon: {
        show: true,
        img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IEQFS5VtXX8AAAAAAAAAAABkARQnAQ',
        width: 72,
        height: 72
      }
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center, support by v3.5.1
  fitCenter: true,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  modes: {
    default: ['drag-canvas', 'drag-node', 'drag-combo', 'collapse-expand-combo'],
  },
  defaultCombo: {
    type: 'circle',
    /* style for the keyShape */
    // style: {
    //   lineWidth: 1,
    // },
    labelCfg: {
      /* label's offset to the keyShape */
      // refY: 10,
      /* label's position, options: center, top, bottom, left, right */
      position: 'top',
      /* label's style */
      // style: {
      //   fontSize: 18,
      // },
    },
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  /* you can extend it or override it as you want */
  // comboStateStyles: {
  //   active: {
  //     fill: '#f00',
  //     opacity: 0.5
  //   },
  // },
});

graph.data(data);
graph.render();

graph.on('combo:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', true);
});

graph.on('combo:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', false);
});
graph.on('combo:click', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
graph.on('canvas:click', (evt) => {
  graph.getCombos().forEach((combo) => {
    graph.clearItemStates(combo);
  });
});
