// ref: https://whydocatsanddogs.com/cats
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as PluginRoughCanvasRenderer } from '@antv/g-plugin-rough-canvas-renderer';
import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';
import { hierarchy, pack } from 'd3-hierarchy';

const style = document.createElement('style');
style.innerHTML = `
@font-face {
font-family: 'handwriting';
src: url('https://mass-office.alipay.com/huamei_koqzbu/afts/file/sgUeRbI3d-IAAAAAAAAAABAADnV5AQBr/font.woff2')
  format('woff2');
}`;
document.head.appendChild(style);

function getColor(id) {
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

class BubbleLayout extends BaseLayout {
  id = 'bubble-layout';

  async execute(model, options) {
    const { nodes = [] } = model;

    const { width = 0, height = 0 } = { ...this.options, ...options };

    const root = hierarchy({ id: 'root' }, (datum) => {
      const { id } = datum;
      if (id === 'root') return nodes.filter((node) => node.depth === 1);
      else if (datum.depth === 2) return [];
      else return nodes.filter((node) => node.actualParentId === id);
    });

    root.sum((d) => (+d.index_value || 0.01) ** 0.5 * 100);

    pack()
      .size([width, height])
      .padding((node) => {
        return node.depth === 0 ? 20 : 2;
      })(root);

    const result = { nodes: [] };

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

fetch('https://assets.antv.antgroup.com/g6/cat-hierarchy.json')
  .then((res) => res.json())
  .then((rawData) => {
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
      { nodes: [] },
    );

    const graph = new Graph({
      container: 'container',
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
          const { id, depth, id_num } = d;
          const color = getColor(id_num);

          if (depth === 1) {
            return {
              fill: 'none',
              stroke: color,
              labelFontFamily: 'handwriting',
              labelFontSize: 20,
              labelText: id.replace('cat.', '').replace(/\.|_/g, ' '),
              labelTextTransform: 'capitalize',
              lineWidth: 1,
              zIndex: -1,
            };
          }

          const {
            text,
            style: { size: diameter },
          } = d;

          return {
            fill: color,
            fillOpacity: 0.7,
            stroke: color,
            fillStyle: 'cross-hatch',
            hachureGap: 1.5,
            iconFontFamily: 'handwriting',
            iconFontSize: (diameter / text.length) * 2,
            iconText: diameter > 20 ? text : '',
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
          getContent: (event, items) => {
            return `<span style="text-transform: capitalize; font-family: handwriting; font-size: 20px;">${items[0].id.replace(/\.|_/g, ' ')}</span>`;
          },
        },
      ],
      behaviors: [{ type: 'drag-canvas', enable: true }, 'zoom-canvas'],
    });

    graph.render();
  });
