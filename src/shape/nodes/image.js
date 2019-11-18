const Shape = require('../shape');
const Util = require('../../util');
const G = require('@antv/g');

/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */
Shape.registerNode('image', {
  options: {
    img: 'https://img2.bosszhipin.com/boss/avatar/avatar_13.png',
    size: 200,
    clipCfg: {
      show: false,
      type: 'circle',
      // circle
      r: 50,
      // ellipse
      rx: 50,
      ry: 35,
      // rect
      width: 50,
      height: 35,
      // polygon
      points: [
        [ 30, 12 ],
        [ 12, 30 ],
        [ 30, 48 ],
        [ 48, 30 ]
      ],
      // path
      path: [
        [ 'M', 25, 25 ],
        [ 'L', 50, 25 ],
        [ 'A', 25 / 2, 25 / 2, 0, 1, 1, 50, 50 ],
        [ 'A', 25 / 2, 25 / 2, 0, 1, 0, 50, 50 ],
        [ 'L', 25, 75 ],
        [ 'Z' ]
      ],
      // 坐标
      x: 0,
      y: 0,
      // clip 的属性样式
      style: {
        lineWidth: 1
      }
    }
  },
  shapeType: 'image',
  labelPosition: 'bottom',
  drawShape(cfg, group) {
    const shapeType = this.shapeType; // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle(cfg);
    const shape = group.addShape(shapeType, {
      attrs: style
    });
    this.drawClip(cfg, shape);
    return shape;
  },
  drawClip(cfg, shape) {
    const clip = Util.mix({}, this.options.clipCfg, cfg.clipCfg);

    if (!clip.show) {
      return;
    }
    // 支持circle、rect、ellipse、Polygon及自定义path clip
    const { type, x, y, style } = clip;
    let clipShape = null;
    if (type === 'circle') {
      const { r } = clip;
      clipShape = new G.Circle({
        attrs: {
          r,
          x,
          y,
          ...style
        }
      });
    } else if (type === 'rect') {
      const { width, height } = clip;
      clipShape = new G.Rect({
        attrs: {
          x,
          y,
          width,
          height,
          ...style
        }
      });
    } else if (type === 'ellipse') {
      const { rx, ry } = clip;
      clipShape = new G.Ellipse({
        attrs: {
          x,
          y,
          rx,
          ry,
          ...style
        }
      });
    } else if (type === 'polygon') {
      const { points } = clip;
      clipShape = new G.Polygon({
        attrs: {
          points,
          ...style
        }
      });
    } else if (type === 'path') {
      const { path } = clip;
      clipShape = new G.Path({
        attrs: {
          path,
          ...style
        }
      });
    }
    if (clipShape) {
      shape.attr('clip', clipShape);
    }
  },
  getShapeStyle(cfg) {
    const size = this.getSize(cfg);
    const img = cfg.img || this.options.img;
    const width = size[0];
    const height = size[1];
    const style = Util.mix({}, {
      x: 0 - width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
      y: 0 - height / 2,
      width,
      height,
      img
    }, cfg.style);
    return style;
  }
}, 'single-shape');
