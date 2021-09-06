import { Path, Canvas, Group } from '@antv/g';
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

const edgeGroup = new Group();
const keyShape = new Path({
  style: {
    x: 0,
    y: 0,
    lineWidth: 1,
    stroke: '#000',
    path: [
      ['M', 10, 10],
      ['L', 50, 50],
    ]
  },
  className: "edge-shape",
  draggable: true,
  interactive: undefined,
  isKeyShape: true,
  name: "simple-path-keyShape"
});
edgeGroup.appendChild(keyShape);
edgeRootGroup.appendChild(edgeGroup);

canvas.getCamera().setPosition([0, 0, 500]);
canvas.getCamera().setZoom(1.1)

let attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 150, 50],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 10, 50],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 88.123, 50],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 88.123, 10],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 88.123, 510],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 188.123, 350],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 0, 0],
  ]
})
attrs = keyShape.attr();
delete attrs.x;
delete attrs.y;
keyShape.attr({
  ...keyShape.attr(),
  path: [
    ['M', 10, 10],
    ['L', 88.123, 150],
  ]
})
attrs = keyShape.attr();
// delete attrs.x;
// delete attrs.y;
keyShape.attr({
  ...attrs,
  // ...keyShape.attr(),
  path: [
    ['M', 20, -10],
    ['L', 20.123, 150], // 58 -> 38 终点位置移动异常, 逐渐变短,到达20完全消失
  ]
})

console.log('keyShape', keyShape.style.path, keyShape.attr('path'))