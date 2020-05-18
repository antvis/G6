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

G6.registerCombo('cRect', {
  drawShape: function drawShape(cfg, group) {
    const self = this;
    // Get the padding from the configuration
    cfg.padding = cfg.padding || [50, 20, 20, 20];
    // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
    const style = self.getShapeStyle(cfg);
    // Add a rect shape as the keyShape which is the same as the extended rect Combo
    const rect = group.addShape('rect', {
      attrs: {
        ...style,
        x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
        y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
        width: style.width,
        height: style.height
      },
      draggable: true,
      name: 'combo-keyShape'
    });
    // Add the circle on the right
    group.addShape('marker', {
      attrs: {
        ...style,
        fill: '#fff',
        opacity: 1,
        // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
        x: cfg.style.width / 2 + cfg.padding[1],
        y: (cfg.padding[2] - cfg.padding[0]) / 2,
        r: 10,
        symbol: collapseIcon
      },
      draggable: true,
      name: 'combo-marker-shape'
    });
    return rect;
  },
  // Define the updating logic of the right circle
  afterUpdate: function afterUpdate(cfg, combo) {
    const group = combo.get('group');
    // Find the circle shape in the graphics group of the Combo by name
    const marker = group.find(ele => ele.get('name') === 'combo-marker-shape');
    // Update the position of the right circle
    marker.attr({
      // cfg.style.width and cfg.style.heigth correspond to the innerWidth and innerHeight in the figure of Illustration of Built-in Rect Combo
      x: cfg.style.width / 2 + cfg.padding[1],
      y: (cfg.padding[2] - cfg.padding[0]) / 2,
      // The property 'collapsed' in the combo data represents the collapsing state of the Combo
      // Update the symbol according to 'collapsed'
      symbol: cfg.collapsed ? expandIcon : collapseIcon
    });
  }
}, 'rect');

const data = {
  nodes: [
    { id: 'node1', x: 250, y: 200, comboId: 'combo1' },
    { id: 'node2', x: 300, y: 200, comboId: 'combo1' }
  ],
  combos: [
    { id: 'combo1', label: 'Combo 1', parentId: 'combo2' },
    { id: 'combo2', label: 'Combo 2' },
    { id: 'combo3', label: 'Combo 3' },
  ]
};

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML =
  'Click the right marker to collapse/expand the combo.';
const graphDiv = document.getElementById('container');
graphDiv.appendChild(descriptionDiv)

const width = document.getElementById('container').scrollWidth;
const height = (document.getElementById('container').scrollHeight || 500) - 20;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // Configure the combos globally
  defaultCombo: {
    // The type of the combos. You can also assign type in the data of combos
    type: 'cRect',
    // ... Other global configurations for combos
  },
  modes: {
    default: [
      'drag-combo',
      'drag-node',
      'drag-canvas'
    ]
  }
});
graph.data(data);
graph.render();

// collapse/expand when click the marker
graph.on('combo:click', e => {
  if (e.target.get('name') === 'combo-marker-shape') {
    // graph.collapseExpandCombo(e.item.getModel().id);
    graph.collapseExpandCombo(e.item);
    if (graph.get('layout')) graph.layout();
    else graph.refreshPositions();
  }
});
