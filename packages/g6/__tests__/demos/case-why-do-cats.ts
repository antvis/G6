import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';
import type { ComboData, GraphData, NodeData } from '@antv/g6';
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';
import { hierarchy, pack } from 'd3-hierarchy';

export const caseWhyDoCats: TestCase = async (context) => {
  const style = document.createElement('style');
  style.innerHTML = `
  @font-face {
  font-family: 'handwriting';
  src: url('https://mass-office.alipay.com/huamei_koqzbu/afts/file/sgUeRbI3d-IAAAAAAAAAABAADnV5AQBr/font.woff2')
    format('woff2');
}`;
  document.head.appendChild(style);

  function getColor(id: string) {
    const colors = [
      '#8dd3c7',
      '#bebada',
      '#fb8072',
      '#80b1d3',
      '#fdb462',
      '#b3de69',
      '#fccde5',
      '#d9d9d9',
      '#bc80bd',
      '#ccebc5',
      '#ffed6f',
    ];
    const index = parseInt(id);
    return colors[index % colors.length];
  }

  type RowDatum = {
    animal: string;
    id: string;
    id_num: string;
    index_value: string;
    leaf: string;
    parentId: string;
    remainder: string;
    start_sentence: string;
    sum_index_value: string;
    text: string;
  };

  const rawData: RowDatum[] = await fetch('https://assets.antv.antgroup.com/g6/cat-hierarchy.json').then((res) =>
    res.json(),
  );

  const topics = [
    'cat.like',
    'cat.hate',
    'cat.love',
    'cat.not.like',
    'cat.afraid_of',
    'cat.want.to',
    'cat.scared.of',
    'cat.not.want_to',
  ];

  const graphData = rawData.reduce(
    (acc, row) => {
      const { id } = row;
      topics.forEach((topic) => {
        if (id.startsWith(topic)) {
          if (id === topic) {
            acc.nodes.push({ ...row, depth: 1 });
          } else {
            acc.nodes.push({ ...row, depth: 2, actualParentId: topic });
          }
        }
      });

      return acc;
    },
    { nodes: [], edges: [], combos: [] } as Required<GraphData>,
  );

  class BubbleLayout extends BaseLayout {
    id = 'bubble-layout';

    public async execute(model: GraphData, options?: any): Promise<GraphData> {
      const { nodes = [] } = model;

      const { width = 0, height = 0 } = { ...this.options, ...options };

      const root = hierarchy<NodeData | ComboData>({ id: 'root' }, (datum) => {
        const { id } = datum;
        if (id === 'root') return nodes.filter((node) => node.depth === 1);
        else if (datum.depth === 2) return [];
        else return nodes.filter((node) => node.actualParentId === id);
      });

      root.sum((d: any) => (+d.index_value || 0.01) ** 0.5 * 100);

      pack<NodeData | ComboData>()
        .size([width, height])
        .padding((node) => {
          return node.depth === 0 ? 20 : 2;
        })(root);

      const result: Required<GraphData> = { nodes: [], edges: [], combos: [] };

      root.descendants().forEach((node) => {
        const {
          data: { id },
          x,
          y,
          // @ts-expect-error r is exist
          r,
        } = node;

        if (node.depth >= 1) result.nodes.push({ id, style: { x, y, size: r * 2 } });
      });

      return result;
    }
  }

  register(ExtensionCategory.LAYOUT, 'bubble-layout', BubbleLayout);

  const graph = new Graph({
    ...context,
    animation: false,
    data: graphData,
    renderer: (layer) => {
      const renderer = new CanvasRenderer();
      if (layer === 'main') {
        renderer.registerPlugin(new PluginRoughCanvasRenderer());
      }
      return renderer;
    },
    node: {
      style: (d) => {
        const id_num = d.id_num as string;
        const color = getColor(id_num);

        if (d.depth === 1) {
          return {
            fill: 'none',
            stroke: color,
            labelFontFamily: 'handwriting',
            labelFontSize: 20,
            labelText: d.id.replace('cat.', '').replace(/\.|_/g, ' '),
            labelTextTransform: 'capitalize',
            lineWidth: 1,
            zIndex: -1,
          };
        }

        const text = d.text as string;
        const diameter = d.style!.size as number;

        return {
          fill: color,
          fillOpacity: 0.7,
          stroke: color,
          fillStyle: 'cross-hatch',
          hachureGap: 1.5,
          iconFontFamily: 'handwriting',
          iconFontSize: (diameter / text.length) * 2,
          iconText: diameter > 20 ? d.text : '',
          iconFontWeight: 'bold',
          iconStroke: color,
          iconLineWidth: 2,
          lineWidth: (diameter || 20) ** 0.5 / 5,
        };
      },
    },
    layout: {
      type: 'bubble-layout',
    },
    plugins: [
      {
        type: 'tooltip',
        getContent: (event: any, items: NodeData[]) => {
          return `<span style="text-transform: capitalize; font-family: handwriting; font-size: 20px;">${items[0].id.replace(/\.|_/g, ' ')}</span>`;
        },
      },
    ],
    behaviors: [{ type: 'drag-canvas', enable: true }, 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
