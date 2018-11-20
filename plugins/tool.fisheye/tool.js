/**
 * @fileOverview fisheye tool
 * @author shiwu.wyy@antfin.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;

class Tool {
  constructor(options) {
    Util.mix(this, {
      /**
       * radius
       * @type  {number}
       */
      radius: 200,

      /**
       * defualt zoom center
       * @type  {array}
       */
      center: [ 0, 0 ],

      /**
       * defualt magnification factor
       * @type  {number}
       */
      d: 1.0
    }, options);
  }
  zoom(centerx, centery) {
    const {
      graph,
      radius,
      d
    } = this;
    const center = [ centerx, centery ];
    const nodes = graph.getNodes();
    const size = nodes.length;
    const moveNodes = [];
    // pick out the nodes inside the radius
    for (let i = 0; i < size; i += 1) {
      const node = nodes[i].getModel();
      const dist = Math.hypot(node.x - center[0], node.y - center[1]);
      if (dist < radius) {
        // take the center as the origin
        const movedCoords = [ node.x - center[0], node.y - center[1] ];
        // transform to polar coordinates
        const { p, theta } = Rect2Polar(movedCoords[0], movedCoords[1]);
        const pf = radius * (((d + 1) * (p / radius)) / (d * (p / radius) + 1)); // after fisheye zooming
        // transform to rect coordinates
        const { x, y } = Polar2Rect(pf, theta);
        // move back to the original origin
        const model = nodes[i].getModel();
        model.x = x + center[0];
        model.y = y + center[1];
        moveNodes.push(nodes[i]);
      }
    }
    graph.preventAnimate(() => {
      graph.updateNodePosition(moveNodes);
    });
    return moveNodes;
  }
}

function Rect2Polar(x, y) {
  const p = Math.hypot(x, y);
  let theta;
  if (y >= 0) {
    if (x === 0) {
      theta = Math.PI / 2; // 90°
    } else {
      theta = Math.acos(x / p);
    }
  } else if (y < 0) {
    if (x === 0) {
      theta = 3 * Math.PI / 2; // 270°
    } else {
      theta = 2 * Math.PI - Math.acos(x / p);
    }
  }
  return { p, theta };
}
function Polar2Rect(p, theta) {
  const x = p * Math.cos(theta);
  const y = p * Math.sin(theta);
  return { x, y };
}
module.exports = Tool;
