import Shape from '../shape';
import { NodeConfig, Item } from '../../types';
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { Circle, Rect, Ellipse, Polygon, Path } from '@antv/g-canvas/lib/shape';
import { ShapeOptions } from '../../interface/shape';

/**
 * 基本的图片，可以添加文本，默认文本在图片的下面
 */
Shape.registerNode(
  'image',
  {
    options: {
      img: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
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
          [30, 12],
          [12, 30],
          [30, 48],
          [48, 30],
        ],
        // path
        path: [
          ['M', 25, 25],
          ['L', 50, 25],
          ['A', 12.5, 12.5, 0, 1, 1, 50, 50],
          ['A', 12.5, 12.5, 0, 1, 0, 50, 50],
          ['L', 25, 75],
          ['Z'],
        ],
        // 坐标
        x: 0,
        y: 0,
        // clip 的属性样式
        style: {
          lineWidth: 1,
        },
      },
    },
    shapeType: 'image',
    labelPosition: 'bottom',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const { shapeType } = this; // || this.type，都已经加了 shapeType
      const style = this.getShapeStyle!(cfg);
      delete style.fill;
      const shape = group.addShape(shapeType, {
        attrs: style,
        className: 'image-keyShape',
        name: 'image-keyShape',
        draggable: true,
      });
      (this as any).drawClip(cfg, shape);
      return shape;
    },
    drawClip(cfg: NodeConfig, shape: IShape) {
      const clip = Object.assign({}, this.options!.clipCfg, cfg.clipCfg);

      if (!clip.show) {
        return;
      }
      // 支持circle、rect、ellipse、Polygon及自定义path clip
      const { type, x, y, style } = clip;
      let clipShape = null;
      if (type === 'circle') {
        const { r } = clip;
        clipShape = new Circle({
          attrs: {
            r,
            x,
            y,
            ...style,
          },
        });
      } else if (type === 'rect') {
        const { width, height } = clip;
        clipShape = new Rect({
          attrs: {
            x,
            y,
            width,
            height,
            ...style,
          },
        });
      } else if (type === 'ellipse') {
        const { rx, ry } = clip;
        clipShape = new Ellipse({
          attrs: {
            x,
            y,
            rx,
            ry,
            ...style,
          },
        });
      } else if (type === 'polygon') {
        const { points } = clip;
        clipShape = new Polygon({
          attrs: {
            points,
            ...style,
          },
        });
      } else if (type === 'path') {
        const { path } = clip;
        clipShape = new Path({
          attrs: {
            path,
            ...style,
          },
        });
      }
      if (clipShape) {
        shape.set('clipShape', clipShape);
      }
    },
    getShapeStyle(cfg: NodeConfig) {
      const size = this.getSize!(cfg);
      const img = cfg.img || this.options!.img;
      let width = size[0];
      let height = size[1];
      if (cfg.style) {
        width = cfg.style.width || size[0];
        height = cfg.style.height || size[1];
      }
      const style = Object.assign(
        {},
        {
          x: -width / 2, // 节点的位置在上层确定，所以这里仅使用相对位置即可
          y: -height / 2,
          width,
          height,
          img,
        },
        cfg.style,
      );
      return style;
    },
    updateShapeStyle(cfg: NodeConfig, item: Item) {
      const group = item.getContainer();
      const shapeClassName = `${this.itemType}-shape`;
      const shape = group.find(element => element.get('className') === shapeClassName) || item.getKeyShape();
      const shapeStyle = this.getShapeStyle!(cfg);
      if (shape) {
        shape.attr(shapeStyle);
      }
    },
  },
  'single-node',
);
