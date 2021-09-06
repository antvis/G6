import G, { Circle, Canvas, Group, Rect } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

const div = document.createElement('div');
div.id = 'view-spec';
document.body.appendChild(div);

const canvasRenderer = new CanvasRenderer();

// create a canvas
const canvasCfg: any = {
  container: div,
  width: 500,
  height: 500,
};
const canvas = new Canvas({
  ...{ renderer: canvasRenderer },
  ...canvasCfg,
});

canvas.getRoot().removeChildren(true)

const rootGroup = new Group()
canvas.appendChild(rootGroup);

const nodeRootGroup = new Group();
rootGroup.appendChild(nodeRootGroup);
const edgeRootGroup = new Group();
rootGroup.appendChild(edgeRootGroup);

const nodeGroup = new Group();
const keyShape = new Rect({
  style: {
    x: 0,
    y: 0,
    width: 150,
    height: 100,
    lineWidth: 0,
    radius: 0,
    fill: '#ccc'
  },
  className: "node-shape",
  draggable: true,
  interactive: undefined,
  isKeyShape: true,
  name: "simple-rect-keyShape"
});
nodeGroup.setPosition([100, 100, 0])
nodeGroup.appendChild(keyShape);
nodeRootGroup.appendChild(nodeGroup);

keyShape.attr({
  ...keyShape.attr(),
  'fill': '#f00'
});
nodeGroup.setPosition([200, 100, 0])

canvas.getRoot().removeChildren(true)