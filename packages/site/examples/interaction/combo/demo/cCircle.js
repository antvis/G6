import { Extensions, Graph, stdLib, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'Click the bottom marker to collapse/expand the combo.';
container.appendChild(descriptionDiv);

class CCircleCombo extends Extensions.CircleCombo {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { data } = model;
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    const otherShapes = {
      markerShape: this.upsertShape(
        'path',
        'markerShape',
        {
          cursor: 'pointer',
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff',
          path: data.collapsed
            ? stdLib.markers.expand(keyShapeBBox.center[0], keyShapeBBox.max[1], 8)
            : stdLib.markers.collapse(keyShapeBBox.center[0], keyShapeBBox.max[1], 8),
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
    };
    return otherShapes;
  }
}

const ExtGraph = extend(Graph, {
  combos: {
    'c-circle-combo': CCircleCombo,
  },
  behaviors: {
    'hover-activate': Extensions.HoverActivate,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  stackCfg: {
    ignoreStateChange: true,
  },
  plugins: [
    {
      // lod-controller will be automatically assigned to graph with `disableLod: false` to graph if it is not configured as following
      type: 'lod-controller',
      disableLod: true,
    },
  ],
  node: {
    labelShape: {
      position: 'center',
      text: {
        fields: ['id'],
        formatter: (model) => model.id,
      },
    },
    animates: {
      update: [
        {
          fields: ['opacity'],
          shapeId: 'haloShape',
        },
      ],
    },
  },
  combo: (model) => {
    return {
      id: model.id,
      data: {
        type: 'c-circle-combo',
        ...model.data,
        keyShape: {
          padding: [10, 20, 30, 40],
          r: 50,
        },
        labelShape: {
          text: model.data.label,
          position: 'top',
        },
        otherShapes: {},
        animates: {
          buildIn: [
            {
              fields: ['opacity'],
              duration: 500,
              delay: 500 + Math.random() * 500,
            },
          ],
          buildOut: [
            {
              fields: ['opacity'],
              duration: 200,
            },
          ],
          update: [
            {
              fields: ['lineWidth', 'r'],
              shapeId: 'keyShape',
            },
            {
              fields: ['opacity'],
              shapeId: 'haloShape',
            },
          ],
        },
      },
    };
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 350,
          y: 200,
          parentId: 'combo1',
        },
      },
      { id: 'node2', data: { x: 350, y: 250, parentId: 'combo1' } },
      { id: 'node3', data: { x: 100, y: 200, parentId: 'combo3' } },
    ],
    edges: [
      { id: 'edge1', source: 'node1', target: 'node2' },
      { id: 'edge2', source: 'node1', target: 'node3' },
      { id: 'edge3', source: 'combo1', target: 'node3' },
    ],
    combos: [
      { id: 'combo1', data: { label: 'Combo 1', parentId: 'combo2' } },
      { id: 'combo2', data: { label: 'Combo 2' } },
      { id: 'combo3', data: { label: 'Combo 3', collapsed: true } },
    ],
  },
  modes: {
    default: [
      {
        type: 'drag-node',
        enableTransient: false,
        updateComboStructure: false,
      },
      'drag-canvas',
      {
        type: 'click-select',
        itemTypes: ['node', 'edge', 'combo'],
      },
      {
        type: 'drag-combo',
        enableTransient: true,
        updateComboStructure: true,
      },
    ],
  },
});

/** Click the bottom marker to collapse/expand the combo. */
graph.on('combo:click', (event) => {
  const { itemId, target } = event;
  if (target.id === 'markerShape') {
    const model = graph.getComboData(itemId);
    if (model.data.collapsed) {
      graph.expandCombo(itemId);
    } else {
      graph.collapseCombo(itemId);
    }
  }
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
