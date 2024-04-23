/**
 * Custom Bar chart with @antv/g2
 */
import { Graph, Extensions, extend } from '@antv/g6';
import { stdlib, renderToMountedElement } from '@antv/g2';

const G2Library = { ...stdlib() };
const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class G2BarChartNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { data } = model;
    const {
      size: [width, height],
      value,
    } = data;
    const group = this.upsertShape(
      'group',
      'g2-lattice-chart-group',
      {
        x: -width / 2,
        y: -height / 2,
        zIndex: 10,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );

    // to make group trigger DOMNodeInsertedIntoDocument event
    group.isMutationObserved = true;
    group.addEventListener('DOMNodeInsertedIntoDocument', () => {
      renderToMountedElement(
        // @antv/g2 Specification
        // https://g2.antv.antgroup.com/examples/animation/group/#point
        {
          width,
          height,
          margin: 0,
          padding: 10,
          type: 'view',
          autoFit: true,
          style: { plotFill: '#000' },
          children: [
            {
              type: 'point',
              padding: 0,
              data: { value },
              encode: { x: 'x', y: 'y', color: 'value', shape: 'point' },
              transform: [
                {
                  type: 'stackEnter',
                  groupBy: ['x', 'y'],
                  orderBy: 'color',
                  duration: 10000,
                },
              ],
              scale: {
                y: { range: [0, 1] },
                color: {
                  type: 'sqrt',
                  range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
                },
              },
              axis: false,
              legend: { color: false },
            },
          ],
        },
        {
          group,
          library: G2Library,
        },
      );
    });

    return {
      'g2-lattice-chart-group': group,
    };
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'g2-bar-chart': G2BarChartNode,
  },
});

const generateValue = () => {
  const xRange = [0, 100];
  const yRange = [0, 100];
  // create random lattice data
  const positions = {};
  const data = [];
  for (let i = 0; i < 100; i++) {
    let x = Math.round(Math.random() * (xRange[1] - xRange[0]) + xRange[0]);
    let y = Math.round(Math.random() * (yRange[1] - yRange[0]) + yRange[0]);
    const key = `${x}-${y}`;
    if (positions[key]) {
      i--;
      continue;
    }
    positions[key] = true;
    data.push({ x, y, value: Math.round(Math.random() * 10) });
  }
  return data;
};

const dataLength = 5;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  layout: {
    type: 'force',
    preventOverlap: true,
    animated: true,
    linkDistance: (d) => {
      if (d.source === 'node0' || d.target === 'node0') {
        return 200;
      }
      return 80;
    },
  },
  modes: {
    default: [
      {
        type: 'drag-node',
        // prevent hide the node when dragging
        enableTransient: false,
      },
      'zoom-canvas',
    ],
  },
  data: {
    nodes: Array.from({ length: dataLength }).map((_, i) => ({
      id: `Area${i}`,
      data: { value: generateValue(), size: [150, 100] },
    })),
    edges: Array.from({ length: dataLength }).map((_, i) => {
      return {
        id: `Edge${i}`,
        source: `Area${i}`,
        target: `Area${(i + 1) % 5}`,
      };
    }),
  },
  node: {
    type: 'g2-bar-chart',
    otherShapes: {},
    keyShape: {
      width: {
        fields: ['size'],
        formatter: (model) => model.data.size[0],
      },
      height: {
        fields: ['size'],
        formatter: (model) => model.data.size[1],
      },
    },
  },
});

window.graph = graph;
const btnContainer = document.createElement('div');
btnContainer.style.position = 'absolute';
container.appendChild(btnContainer);
const tip = document.createElement('span');
tip.innerHTML = '👉 Try to:';
btnContainer.appendChild(tip);

['Refresh Data'].forEach((name, i) => {
  const btn = document.createElement('a');
  btn.innerHTML = name;
  btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  btn.style.padding = '4px';
  btn.style.marginLeft = i > 0 ? '24px' : '8px';
  btnContainer.appendChild(btn);
  btn.addEventListener('click', () => {
    Array.from({ length: dataLength }).forEach((_, i) => {
      graph.updateData('node', {
        id: `Area${i}`,
        data: { value: generateValue() },
      });
    });
  });
});
