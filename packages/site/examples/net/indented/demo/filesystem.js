import { Extensions, Graph, extend, stdLib } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const data = {
  id: '1',
  name: 'src',
  children: [
    {
      id: '1-1',
      name: 'behavior',
      children: [],
    },
    {
      id: '1-3',
      name: 'graph',
      children: [
        {
          id: '1-3-1',
          name: 'controller',
          children: [],
        },
      ],
    },
    {
      id: '1-5',
      name: 'item',
      children: [],
    },
    {
      id: '1-6',
      name: 'shape',
      children: [
        {
          id: '1-6-2',
          name: 'extend',
          children: [],
        },
      ],
    },
    {
      id: '1-7',
      name: 'util',
      children: [],
    },
  ],
};

class FileNode extends Extensions.CircleNode {
  defaultStyles = {
    keyShape: {},
  };
  drawKeyShape(model, shapeMap, diffData) {
    const { keyShape: keyShapeStyle } = model.data;
    return this.upsertShape(
      'rect',
      'keyShape',
      {
        ...this.defaultStyles.keyShape,
        ...keyShapeStyle,
        width: 50,
        height: 10,
        x: 10,
        y: -12,
        opacity: 0,
      },
      shapeMap,
    );
  }
  drawLabelShape(model, shapeMap, diffData) {
    const { labelShape: propsLabelStyle } = model.data;
    return this.upsertShape(
      'text',
      'labelShape',
      {
        ...this.defaultStyles.labelShape,
        ...propsLabelStyle,
        x: 20,
        y: -8,
        fill: '#666',
        fontSize: 12,
        textAlign: 'left',
        textBaseline: 'bottom',
      },
      shapeMap,
    );
  }
  drawOtherShapes(model, shapeMap, diffData) {
    const { childrenIds, collapsed } = model.data;
    const otherShapes = {};
    if (childrenIds?.length) {
      otherShapes.collapseMarkerShape = this.upsertShape(
        'path',
        'collapseMarkerShape',
        {
          cursor: 'pointer',
          fill: '#666',
          path: collapsed ? stdLib.markers.upTriangle(20, -8, 4) : stdLib.markers.downTriangle(14, -16, 4),
        },
        shapeMap,
      );
    }
    return otherShapes;
  }
  balanceShapeSize() {}
}

class StepEdge extends Extensions.PolylineEdge {
  defaultStyles = {
    keyShape: {},
  };

  getControlPoints(model, startPoint, endPoint) {
    return [
      startPoint,
      {
        x: startPoint.x,
        y: endPoint.y,
      },
      endPoint,
    ];
  }
  balanceShapeSize() {}
}

const ExtGraph = extend(Graph, {
  nodes: {
    'file-node': FileNode,
  },
  edges: {
    'step-edge': StepEdge,
  },
});
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['collapse-expand-tree', 'drag-canvas', 'zoom-canvas'],
  },
  layout: {
    type: 'indented',
    isHorizontal: true,
    direction: 'LR',
    indent: 30,
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
  },
  node: (model) => ({
    id: model.id,
    data: {
      type: 'file-node',
      ...model.data,
      otherShapes: {},
      labelShape: {
        text: model.data.name,
      },
      anchorPoints: [
        [0, 0.5],
        [0.5, 0.5],
      ],
      animates: {
        update: [
          {
            fields: ['x', 'y'],
            duration: 500,
            shapeId: 'group',
            order: 0,
          },
        ],
      },
    },
  }),
  edge: {
    type: 'step-edge',
  },
  data: {
    type: 'treeData',
    value: data,
  },
  autoFit: 'center',
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
