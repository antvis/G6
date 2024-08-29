import type { DisplayObject, Group } from '@antv/g';
import type { BaseComboStyleProps, GraphData, HTMLStyleProps, IElementEvent, NodeData } from '@antv/g6';
import { BaseCombo, ExtensionCategory, Graph, HTML, isCollapsed, register } from '@antv/g6';
import { isEqual } from '@antv/util';

export const elementHTMLSubGraph: TestCase = async (context) => {
  interface CardNodeData {
    type: 'card';
    status: 'expanded' | 'collapsed';
    data: { name: string; value: number }[];
    children: CardNodeData[] | [GraphNodeData];
  }
  interface GraphNodeData {
    type: 'graph';
    data: GraphData;
  }
  type Data = CardNodeData | GraphNodeData;

  const getSize = (d: NodeData) => {
    const data = d.data as unknown as Data;
    if (data.type === 'card') return data.status === 'expanded' ? [200, 100 * data.children.length] : [200, 100];
    else return [200, 200];
  };

  class SubGraph extends HTML {
    public connectedCallback(): void {
      super.connectedCallback();
      this.drawSubGraph();
    }

    public render(attributes?: Required<HTMLStyleProps>, container?: Group): void {
      super.render(attributes, container);
      this.drawSubGraph();
    }

    private get data() {
      return this.context.graph.getElementData(this.id).data;
    }

    private graph?: Graph;

    private previousData?: Record<string, unknown>;

    private drawSubGraph() {
      if (!this.isConnected) return;
      const data = this.data;
      if (isEqual(this.previousData, data)) return;
      this.previousData = data;

      this.drawGraphNode(data!.data as GraphData);
    }

    private drawGraphNode(data: GraphData) {
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
        behaviors: ['zoom-canvas', { type: 'drag-canvas', enable: (event: MouseEvent) => event.shiftKey === true }],
        autoFit: 'view',
      });

      subGraph.render();

      this.graph = subGraph;
    }

    public destroy(): void {
      this.graph?.destroy();
      super.destroy();
    }
  }

  class CardCombo extends BaseCombo {
    protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
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

    protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group): DisplayObject | undefined {
      const { collapsed } = attributes;
      const outer = this.upsert('key', 'rect', this.getKeyStyle(attributes), container);
      if (!outer || !collapsed) {
        this.removeCardShape();
        return outer;
      }

      this.drawCardShape(attributes, container);

      return outer;
    }

    protected drawCardShape(attributes: Required<BaseComboStyleProps>, container: Group) {
      const [width, height] = this.getCollapsedKeySize(attributes);
      const data = this.context.graph.getComboData(this.id).data as unknown as CardNodeData;

      const baseX = -width / 2;
      const baseY = -height / 2;

      this.upsert(
        'card-title',
        'text',
        {
          x: baseX,
          y: baseY,
          text: '点分组: ' + this.id,
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

    protected removeCardShape() {
      Object.entries(this.shapeMap).forEach(([key, shape]) => {
        if (key.startsWith('card-')) {
          delete this.shapeMap[key];
          shape.destroy();
        }
      });
    }
  }

  register(ExtensionCategory.NODE, 'sub-graph', SubGraph);
  register(ExtensionCategory.COMBO, 'card', CardCombo);

  const graph = new Graph({
    ...context,
    animation: false,
    zoom: 0.8,
    data: {
      nodes: [
        {
          id: 'node-1',
          combo: 'combo-1-1',
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
          id: 'node-2',
          combo: 'combo-1-2',
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
          id: 'node-3',
          combo: 'combo-1-3-1',
          style: { x: 120, y: 220 },
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
          combo: 'combo-1-3-2',
          style: { x: 120, y: 370 },
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
          id: 'combo-1',
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
          },
        },
        {
          id: 'combo-1-1',
          combo: 'combo-1',
          style: { collapsed: true },
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
          },
        },
        {
          id: 'combo-1-2',
          combo: 'combo-1',
          style: { collapsed: true },
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
          },
        },
        {
          id: 'combo-1-3',
          combo: 'combo-1',
          style: { collapsed: true },
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
          },
        },
        {
          id: 'combo-1-3-1',
          combo: 'combo-1-3',
          style: { collapsed: true },
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
          },
        },
        {
          id: 'combo-1-3-2',
          combo: 'combo-1-3',
          style: { collapsed: true },
          data: {
            data: [
              { name: '指标名1', value: 33 },
              { name: '指标名2', value: 44 },
              { name: '指标名3', value: 55 },
            ],
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
      { type: 'drag-element', enable: (event: MouseEvent) => event.shiftKey !== true },
      'collapse-expand',
      'zoom-canvas',
      'drag-canvas',
    ],
    plugins: [
      {
        type: 'contextmenu',
        getItems: (event: IElementEvent) => {
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
        onClick: (value: CardNodeData['status'], target: HTMLElement, current: SubGraph) => {
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

  await graph.render();

  return graph;
};
