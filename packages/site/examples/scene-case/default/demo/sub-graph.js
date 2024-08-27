import { BaseCombo, ExtensionCategory, Graph, HTML, isCollapsed, register } from '@antv/g6';
import { isEqual } from '@antv/util';

class SubGraphNode extends HTML {
  connectedCallback() {
    super.connectedCallback();
    this.drawSubGraph();
  }

  render(attributes, container) {
    super.render(attributes, container);
    this.drawSubGraph();
  }

  get data() {
    return this.context.graph.getElementData(this.id).data;
  }

  drawSubGraph() {
    if (!this.isConnected) return;
    if (isEqual(this.previousData, this.data)) return;
    this.previousData = this.data;

    const data = this.data;
    this.drawGraphNode(data.data);
  }

  drawGraphNode(data) {
    const [width, height] = this.getSize();
    const container = this.getDomElement();
    container.innerHTML = '';

    const subGraph = new Graph({
      container,
      width,
      height,
      animation: false,
      data: data,
      node: {
        style: {
          labelText: (d) => d.id,
          iconFontFamily: 'iconfont',
          iconText: '\ue6e5',
        },
      },
      layout: {
        type: 'force',
        linkDistance: 50,
      },
      behaviors: ['zoom-canvas', { type: 'drag-canvas', enable: (event) => event.shiftKey === true }],
      autoFit: 'view',
    });

    subGraph.render();

    this.graph = subGraph;
  }

  destroy() {
    this.graph?.destroy();
    super.destroy();
  }
}

class CardCombo extends BaseCombo {
  getKeyStyle(attributes) {
    const keyStyle = super.getKeyStyle(attributes);
    const [width, height] = this.getKeySize(attributes);
    return {
      ...keyStyle,
      width,
      height,
      x: -width / 2,
      y: -height / 2,
    };
  }

  drawKeyShape(attributes, container) {
    const { collapsed } = attributes;
    const outer = this.upsert('key', 'rect', this.getKeyStyle(attributes), container);
    if (!outer || !collapsed) {
      this.removeCardShape();
      return outer;
    }

    this.drawCardShape(attributes, container);

    return outer;
  }

  drawCardShape(attributes, container) {
    const [width, height] = this.getCollapsedKeySize(attributes);
    const data = this.context.graph.getComboData(this.id).data;

    const baseX = -width / 2;
    const baseY = -height / 2;

    this.upsert(
      'card-title',
      'text',
      {
        x: baseX,
        y: baseY,
        text: 'Group: ' + this.id,
        textAlign: 'left',
        textBaseline: 'top',
        fontSize: 16,
        fontWeight: 'bold',
        fill: '#4083f7',
      },
      container,
    );

    const gap = 10;
    const sep = (width + gap) / data.data.length;
    data.data.forEach(({ name, value }, index) => {
      this.upsert(
        `card-item-name-${index}`,
        'text',
        {
          x: baseX + index * sep,
          y: baseY + 40,
          text: name,
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 12,
          fill: 'gray',
        },
        container,
      );
      this.upsert(
        `card-item-value-${index}`,
        'text',
        {
          x: baseX + index * sep,
          y: baseY + 60,
          text: value + '%',
          textAlign: 'left',
          textBaseline: 'top',
          fontSize: 24,
        },
        container,
      );
    });
  }

  removeCardShape() {
    Object.entries(this.shapeMap).forEach(([key, shape]) => {
      if (key.startsWith('card-')) {
        delete this.shapeMap[key];
        shape.destroy();
      }
    });
  }
}

register(ExtensionCategory.NODE, 'sub-graph', SubGraphNode);
register(ExtensionCategory.COMBO, 'card', CardCombo);

const getSize = (d) => {
  const data = d.data;
  if (data.type === 'card') return data.status === 'expanded' ? [200, 100 * data.children.length] : [200, 100];
  else return [200, 200];
};

const graph = new Graph({
  container: 'container',
  animation: false,
  zoom: 0.8,
  data: {
    nodes: [
      {
        id: '1',
        combo: 'A',
        style: { x: 120, y: 70 },
        data: {
          data: {
            nodes: [
              { id: 'node-1' },
              { id: 'node-2' },
              { id: 'node-3' },
              { id: 'node-4' },
              { id: 'node-5' },
              { id: 'node-6' },
              { id: 'node-7' },
              { id: 'node-8' },
            ],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
              { source: 'node-1', target: 'node-5' },
              { source: 'node-1', target: 'node-6' },
              { source: 'node-1', target: 'node-7' },
              { source: 'node-1', target: 'node-8' },
            ],
          },
        },
      },
      {
        id: '2',
        combo: 'C',
        style: { x: 370, y: 70 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
      {
        id: 'node-4',
        combo: 'D',
        style: { x: 370, y: 200 },
        data: {
          data: {
            nodes: [{ id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }, { id: 'node-4' }],
            edges: [
              { source: 'node-1', target: 'node-2' },
              { source: 'node-1', target: 'node-3' },
              { source: 'node-1', target: 'node-4' },
            ],
          },
        },
      },
    ],
    edges: [],
    combos: [
      {
        id: 'root',
        data: {
          data: [
            { name: 'percent', value: 50 },
            { name: 'percent', value: 45 },
            { name: 'percent', value: 70 },
          ],
        },
      },
      {
        id: 'A',
        combo: 'root',
        data: {
          data: [
            { name: 'percent', value: 30 },
            { name: 'percent', value: 90 },
          ],
        },
      },
      {
        id: 'B',
        combo: 'root',
        style: { collapsed: true },
        data: {
          data: [
            { name: 'percent', value: 60 },
            { name: 'percent', value: 80 },
          ],
        },
      },
      {
        id: 'C',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 60 }],
        },
      },
      {
        id: 'D',
        combo: 'B',
        style: { collapsed: true },
        data: {
          data: [{ name: 'percent', value: 80 }],
        },
      },
    ],
  },
  node: {
    type: 'sub-graph',
    style: {
      dx: -100,
      dy: -50,
      size: getSize,
    },
  },
  combo: {
    type: 'card',
    style: {
      collapsedSize: [200, 100],
      collapsedMarker: false,
      radius: 10,
    },
  },
  behaviors: [
    { type: 'drag-element', enable: (event) => event.shiftKey !== true },
    'collapse-expand',
    'zoom-canvas',
    'drag-canvas',
  ],
  plugins: [
    {
      type: 'contextmenu',
      getItems: (event) => {
        const { targetType, target } = event;
        if (!['node', 'combo'].includes(targetType)) return [];
        const id = target.id;

        if (targetType === 'combo') {
          const data = graph.getComboData(id);
          if (isCollapsed(data)) {
            return [{ name: '展开', value: 'expanded' }];
          } else return [{ name: '收起', value: 'collapsed' }];
        }
        return [{ name: '收起', value: 'collapsed' }];
      },
      onClick: (value, target, current) => {
        const id = current.id;
        const elementType = graph.getElementType(id);

        if (elementType === 'node') {
          const parent = graph.getParentData(id, 'combo');
          if (parent) return graph.collapseElement(parent.id, false);
        }

        if (value === 'expanded') graph.expandElement(id, false);
        else graph.collapseElement(id, false);
      },
    },
  ],
});

graph.render();
