import { Circle, Path } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { CircleCombo, ExtensionCategory, Graph, register } from '@antv/g6';

const collapse = (x, y, r) => {
  return [
    ['M', x - r, y],
    ['a', r, r, 0, 1, 0, r * 2, 0],
    ['a', r, r, 0, 1, 0, -r * 2, 0],
    ['M', x - r + 4, y],
    ['L', x + r - 4, y],
  ];
};

const expand = (x, y, r) => {
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

class CircleComboWithExtraButton extends CircleCombo {
  render(attributes, container) {
    super.render(attributes, container);
    this.drawButton(attributes);
  }

  drawButton(attributes) {
    const { collapsed } = attributes;
    const [, height] = this.getKeySize(attributes);
    const btnR = 8;
    const y = height / 2 + btnR;
    const d = collapsed ? expand(0, y, btnR) : collapse(0, y, btnR);

    const hitArea = this.upsert('hit-area', Circle, { cy: y, r: 10, fill: '#fff', cursor: 'pointer' }, this);
    this.upsert('button', Path, { stroke: '#3d81f7', d, cursor: 'pointer' }, hitArea);
  }

  onCreate() {
    this.shapeMap['hit-area'].addEventListener('click', () => {
      const id = this.id;
      const collapsed = !this.attributes.collapsed;
      const { graph } = this.context;
      if (collapsed) graph.collapseElement(id);
      else graph.expandElement(id);
    });
  }
}

register(ExtensionCategory.COMBO, 'circle-combo-with-extra-button', CircleComboWithExtraButton);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', combo: 'combo-0', style: { x: 100, y: 100 } },
      { id: 'node-1', combo: 'combo-0', style: { x: 150, y: 100 } },
      { id: 'node-2', style: { x: 250, y: 100 } },
    ],
    edges: [{ source: 'node-1', target: 'node-2' }],
    combos: [{ id: 'combo-0' }],
  },
  combo: {
    type: 'circle-combo-with-extra-button',
  },
  behaviors: ['drag-element'],
});

graph.render();
