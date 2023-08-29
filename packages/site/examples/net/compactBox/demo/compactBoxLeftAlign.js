import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const descriptionDiv = document.createElement('div');
descriptionDiv.innerHTML = 'The nodes of a subtree is aligned to the left.';
container.appendChild(descriptionDiv);

const fontSize = 15;

class CustomNode extends Extensions.CircleNode {
  defaultStyles = {
    keyShape: {},
  };
  drawKeyShape(model, shapeMap, diffData) {
    const { keyShape: keyShapeStyle } = model.data;
    const width = model.id.length * 9;
    return this.upsertShape(
      'rect',
      'keyShape',
      {
        ...this.defaultStyles.keyShape,
        ...keyShapeStyle,
        x: 0,
        y: -10,
        width,
        height: 20,
        lineWidth: 0,
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
        text: model.id,
        fill: 'rgba(0,0,0,0.85)',
        fontSize,
        x: 0,
        y: 0,
      },
      shapeMap,
    );
  }
  drawOtherShapes(model, shapeMap, diffData) {
    const labelBBox = shapeMap.labelShape?.getRenderBounds();
    const bboxWidth = labelBBox.max[0] - labelBBox.min[0];
    shapeMap.keyShape.style.width = bboxWidth;
    return {
      extraShape: this.upsertShape(
        'circle',
        'extraShape',
        {
          cx: labelBBox.min[0] - 8,
          cy: labelBBox.center[1],
          r: 3,
          stroke: '#637088',
        },
        shapeMap,
      ),
      bottomLineShape: this.upsertShape(
        'path',
        'bottomLineShape',
        {
          lineWidth: 1,
          stroke: '#637088',
          path: [
            ['M', 0, 0],
            ['L', bboxWidth, 0],
          ],
        },
        shapeMap,
      ),
    };
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'crect-node': CustomNode,
  },
  edges: {
    'cubic-horizontal-edge': Extensions.CubicHorizontalEdge,
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new ExtGraph({
      container: 'container',
      width,
      height,
      transform: ['transform-v4-data'],
      modes: {
        default: ['collapse-expand-tree', 'drag-canvas', 'zoom-canvas'],
      },
      node: {
        type: 'crect-node',
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
        otherShapes: {},
      },
      edge: {
        type: 'cubic-horizontal-edge',
        sourceAnchor: 1,
        targetAnchor: 0,
      },
      layout: {
        type: 'compactBox',
        direction: 'LR',
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getVGap: function getVGap() {
          return 10;
        },
        getHGap: function getHGap() {
          return 100;
        },
        getWidth: function getWidth(d) {
          return d.id.length + 20;
        },
      },
      autoFit: 'view',
      data: {
        type: 'treeData',
        value: data,
      },
    });

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.destroyed) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.setSize([container.scrollWidth, container.scrollHeight]);
      };
  });
