import { Graph, Extensions, extend } from '@antv/g6';

const ExtGraph = extend(Graph, {
  layouts: {
    mds: Extensions.MDSLayout,
  },
  behaviors: {
    'brush-select': Extensions.BrushSelect,
  },
});

const width = container.scrollWidth;
const height = (container.scrollHeight || 500) - 20;

const layoutConfigs = {
  Circular: {
    type: 'circular',
  },
  Grid: {
    type: 'grid',
  },
  Force: {
    type: 'force',
    preventOverlap: true,
  },
  Radial: {
    type: 'radial',
    preventOverlap: true,
  },
  Concentric: {
    type: 'concentric',
  },
  MDS: {
    type: 'mds',
    linkDistance: 100,
  },
};

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transform: ['transform-v4-data'],
      layout: layoutConfigs.Circular,
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select', 'brush-select'],
      },
      node: (model) => {
        return {
          id: model.id,
          data: {
            ...model.data,
            labelShape: {
              text: model.id,
            },
            labelBackgroundShape: {},
            animates: {
              update: [
                {
                  fields: ['x', 'y'],
                  shapeId: 'group',
                },
                {
                  fields: ['opacity'],
                  shapeId: 'haloShape',
                },
                {
                  fields: ['lineWidth'],
                  shapeId: 'keyShape',
                },
              ],
            },
          },
        };
      },
      data,
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight - 20]);
      };

    const btnContainer = document.createElement('div');
    btnContainer.style.position = 'absolute';
    container.appendChild(btnContainer);
    const tip = document.createElement('span');
    tip.innerHTML = '👉 Change layoutConfigs:';
    btnContainer.appendChild(tip);

    Object.keys(layoutConfigs).forEach((name, i) => {
      const btn = document.createElement('a');
      btn.innerHTML = name;
      btn.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      btn.style.padding = '4px';
      btn.style.marginLeft = i > 0 ? '24px' : '8px';
      btnContainer.appendChild(btn);
      btn.addEventListener('click', () => {
        graph.layout(layoutConfigs[name]);
      });
    });
  });
