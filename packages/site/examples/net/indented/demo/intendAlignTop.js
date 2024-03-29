import { Graph, Extensions, extend, stdLib } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class CustomNode extends Extensions.CircleNode {
  defaultStyles = {
    keyShape: {},
  };
  drawKeyShape(model, shapeMap, diffData, diffState) {
    const { keyShape: keyShapeStyle } = model.data;
    return this.upsertShape(
      'rect',
      'keyShape',
      {
        ...this.defaultStyles.keyShape,
        ...keyShapeStyle,
        x: -100,
        y: -30,
        width: 200,
        height: 60,
        stroke: '#4089FF',
        lineWidth: 1,
        radius: 4,
        fill: '#fff',
        opacity: 1,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
  }
  drawLabelShape(model, shapeMap, diffData, diffState) {
    const { labelShape: propsLabelStyle } = model.data;
    return this.upsertShape(
      'text',
      'labelShape',
      {
        ...this.defaultStyles.labelShape,
        ...propsLabelStyle,
        textBaseline: 'top',
        x: -100 + 8,
        y: -30 + 2,
        lineHeight: 20,
        text: model.id,
        fill: '#fff',
        zIndex: 10,
        wordWrap: true,
        maxLines: 1,
        textOverflow: 'ellipsis',
        wordWrapWidth: 180,
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
  }
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const { childrenIds, collapsed } = model.data;
    const bbox = shapeMap.keyShape.getRenderBounds();
    const otherShapes = {
      titleBoxShape: this.upsertShape(
        'rect',
        'titleBoxShape',
        {
          x: -100,
          y: -30,
          width: 200,
          height: 30,
          fill: '#4089FF',
          radius: [4, 4, 0, 0],
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
      descriptionShape: this.upsertShape(
        'text',
        'descriptionShape',
        {
          textBaseline: 'top',
          x: -100 + 8,
          y: 2,
          lineHeight: 20,
          text: 'description',
          fill: 'rgba(0,0,0, 1)',
          zIndex: 10,
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      ),
    };
    if (childrenIds?.length) {
      otherShapes.collapseMarkerShape = this.upsertShape(
        'path',
        'collapseMarkerShape',
        {
          cursor: 'pointer',
          stroke: '#666',
          lineWidth: 1,
          fill: '#fff',
          path: collapsed
            ? stdLib.markers.expand(bbox.max[0], bbox.center[1], 6)
            : stdLib.markers.collapse(bbox.max[0], bbox.center[1], 6),
        },
        {
          model,
          shapeMap,
          diffData,
          diffState,
        },
      );
    }
    return otherShapes;
  }
  balanceShapeSize() {}
}

const ExtGraph = extend(Graph, {
  nodes: {
    'tree-card-node': CustomNode,
  },
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new ExtGraph({
      container,
      width,
      height,
      transforms: [
        {
          type: 'transform-v4-data',
          activeLifecycle: ['read'],
        },
      ],
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'collapse-expand-tree'],
      },
      node: (model) => {
        return {
          id: model.id,
          data: {
            ...model.data,
            anchorPoints: [
              [0, 0.5],
              [1, 0.5],
            ],
            type: 'tree-card-node',
            otherShapes: {},
            animates: {
              update: [
                {
                  fields: ['x', 'y'],
                  duration: 500,
                  shapeId: 'group',
                  order: 0,
                },
              ],
              hide: [
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'keyShape',
                },
                {
                  fields: ['opacity'],
                  duration: 200,
                  shapeId: 'labelShape',
                },
              ],
              show: [
                {
                  fields: ['opacity'],
                  duration: 1000,
                  shapeId: 'keyShape',
                },
                {
                  fields: ['opacity'],
                  duration: 1000,
                  shapeId: 'labelShape',
                },
              ],
            },
          },
        };
      },
      edge: {
        type: 'cubic-horizontal-edge',
      },
      layout: {
        type: 'indented',
        direction: 'LR',
        dropCap: false,
        indent: 500,
        getHeight: () => {
          return 60;
        },
      },
      autoFit: 'view',
      data: {
        type: 'treeData',
        value: data,
      },
    });

    window.graph = graph;
  });
