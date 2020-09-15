import G6 from '@antv/g6';

/**
 * The demo shows customing a combo type by extending the built-in circle combo
 * by Shiwu
 *
 */

// The symbols for the marker inside the combo
const collapseIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
  ];
};
const expandIcon = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x - r + 2 * r - 4, y],
    ['M', x - r + r, y - r + 4],
    ['L', x, y + r - 4],
  ];
};

G6.registerCombo(
  'cCircle',
  {
    drawShape: function draw(cfg, group) {
      const self = this;
      // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      // Add a circle shape as keyShape which is the same as the extended 'circle' type Combo
      const circle = group.addShape('circle', {
        attrs: {
          ...style,
          x: 0,
          y: 0,
          r: style.r,
        },
        draggable: true,
        name: 'combo-keyShape',
      });
      // Add the marker on the bottom
      const marker = group.addShape('marker', {
        attrs: {
          ...style,
          fill: '#fff',
          opacity: 1,
          x: 0,
          y: style.r,
          r: 10,
          symbol: collapseIcon,
        },
        draggable: true,
        name: 'combo-marker-shape',
      });

      return circle;
    },
    // Define the updating logic for the marker
    afterUpdate: function afterUpdate(cfg, combo) {
      const self = this;
      // Get the shape style, where the style.r corresponds to the R in the Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg);
      const group = combo.get('group');
      // Find the marker shape in the graphics group of the Combo
      const marker = group.find((ele) => ele.get('name') === 'combo-marker-shape');
      // Update the marker shape
      marker.attr({
        x: 0,
        y: style.r,
        // The property 'collapsed' in the combo data represents the collapsing state of the Combo
        // Update the symbol according to 'collapsed'
        symbol: cfg.collapsed ? expandIcon : collapseIcon,
      });
    },
  },
  'circle',
);

const data = {
  nodes: [
    { id: 'node1', x: 250, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 200, comboId: 'combo1' },
    { id: 'node3', x: 100, y: 200, comboId: 'combo3' },
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3', collapsed: true },
  ],
};

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Click the bottom marker to collapse/expand the combo.';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv);

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // Set groupByTypes to false to get rendering result with reasonable visual zIndex for combos
  groupByTypes: false,
  // Configure the combos globally
  defaultCombo: {
    // The type of the combos. You can also assign type in the data of combos
    type: 'cCircle',
    labelCfg: {
      refY: 2,
    },
    // ... Other global configurations for combos
  },
  comboStateStyles: {
    dragenter: {
      lineWidth: 4,
      stroke: '#FE9797',
    },
  },
  modes: {
    default: ['drag-combo', 'drag-node', 'drag-canvas'],
  },
});
graph.data(data);
graph.render();

// collapse/expand when click the marker
graph.on('combo:click', (e) => {
  if (e.target.get('name') === 'combo-marker-shape') {
    // graph.collapseExpandCombo(e.item.getModel().id);
    graph.collapseExpandCombo(e.item);
    if (graph.get('layout')) graph.layout();
    else graph.refreshPositions();
  }
});

graph.on('combo:dragend', (e) => {
  graph.getCombos().forEach((combo) => {
    graph.setItemState(combo, 'dragenter', false);
  });
});
graph.on('node:dragend', (e) => {
  graph.getCombos().forEach((combo) => {
    graph.setItemState(combo, 'dragenter', false);
  });
});

graph.on('combo:dragenter', (e) => {
  graph.setItemState(e.item, 'dragenter', true);
});
graph.on('combo:dragleave', (e) => {
  graph.setItemState(e.item, 'dragenter', false);
});
