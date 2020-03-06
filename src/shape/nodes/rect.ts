import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { mix } from '@antv/util';
import { Item, NodeConfig, ModelConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';

Shape.registerNode(
  'rect',
  {
    // 自定义节点时的配置
    options: {
      size: [100, 30],
      style: {
        radius: 0,
        stroke: Global.defaultShapeStrokeColor,
        fill: Global.defaultShapeFillColor,
        lineWidth: Global.defaultNode.style.lineWidth,
        fillOpacity: 1,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
          fontSize: 12,
        },
      },
      // 节点上左右上下四个方向上的链接circle配置
      linkPoints: {
        top: false,
        right: false,
        bottom: false,
        left: false,
        // circle的大小
        size: 3,
        lineWidth: 1,
        fill: '#72CC4A',
        stroke: '#72CC4A',
      },
      // 连接点，默认为左右
      // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    shapeType: 'rect',
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const style = this.getShapeStyle!(cfg);

      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-keyShape',
        name: 'rect-keyShape',
        draggable: true,
      });

      (this as any).drawLinkPoints(cfg, group);
      return keyShape;
    },
    /**
     * 绘制节点上的LinkPoints
     * @param {Object} cfg data数据配置项
     * @param {Group} group Group实例
     */
    drawLinkPoints(cfg: NodeConfig, group: GGroup) {
      const { linkPoints: defaultLinkPoints } = this.options as ModelConfig;
      const linkPoints = mix({}, defaultLinkPoints, cfg.linkPoints);

      const { top, left, right, bottom, size: markSize, ...markStyle } = linkPoints;
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = size[0];
      const height = size[1];

      if (left) {
        // left circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: -width / 2,
            y: 0,
            r: markSize,
          },
          className: 'link-point-left',
          name: 'link-point-left',
          isAnchorPoint: true,
        });
      }

      if (right) {
        // right circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: width / 2,
            y: 0,
            r: markSize,
          },
          className: 'link-point-right',
          name: 'link-point-right',
          isAnchorPoint: true,
        });
      }

      if (top) {
        // top circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: -height / 2,
            r: markSize,
          },
          className: 'link-point-top',
          name: 'link-point-top',
          isAnchorPoint: true,
        });
      }

      if (bottom) {
        // bottom circle
        group.addShape('circle', {
          attrs: {
            ...markStyle,
            x: 0,
            y: height / 2,
            r: markSize,
          },
          className: 'link-point-bottom',
          name: 'link-point-bottom',
          isAnchorPoint: true,
        });
      }
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.options as ModelConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = style.width || size[0];
      const height = style.height || size[1];
      const styles = Object.assign(
        {},
        {
          x: -width / 2,
          y: -height / 2,
          width,
          height,
        },
        style,
      );
      return styles;
    },
    update(cfg: NodeConfig, item: Item) {
      const group = item.getContainer();
      const { style: defaultStyle } = this.options as ModelConfig;
      const size = (this as ShapeOptions).getSize!(cfg);
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        x: -size[0] / 2,
        y: -size[1] / 2,
        width: size[0],
        height: size[1],
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      (this as any).updateShape(cfg, item, style, false);
      (this as any).updateLinkPoints(cfg, group);
    },
  },
  'single-node',
);
