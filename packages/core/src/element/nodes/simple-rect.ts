import { IGroup, IShape } from '@antv/g-base';
import { mix } from '@antv/util';
import { Item, NodeConfig, ShapeStyle, UpdateType } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';

Shape.registerNode(
  'simple-rect',
  {
    // 自定义节点时的配置
    options: {
      size: [100, 30],
      style: {
        radius: 0,
        stroke: Global.defaultNode.style.stroke,
        fill: Global.defaultNode.style.fill,
        lineWidth: Global.defaultNode.style.lineWidth,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: Global.nodeLabel.style.fill,
          fontSize: Global.nodeLabel.style.fontSize,
          fontFamily: Global.windowFontFamily
        },
      },
      // 连接点，默认为左右
      // anchorPoints: [{ x: 0, y: 0.5 }, { x: 1, y: 0.5 }]
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'simple-rect',
    labelPosition: 'center',
    drawShape(cfg: NodeConfig, group: IGroup): IShape {
      const style = this.getShapeStyle!(cfg);

      const keyShape = group.addShape('rect', {
        attrs: style,
        className: `${this.type}-keyShape`,
        name: `${this.type}-keyShape`,
        draggable: true,
      });

      return keyShape;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig) {
      const { style: defaultStyle } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle);
      const size = (this as ShapeOptions).getSize!(cfg);
      const width = style.width || size[0];
      const height = style.height || size[1];
      const styles = {
        x: -width / 2,
        y: -height / 2,
        width,
        height,
        ...style,
      };
      return styles;
    },
    update(cfg: NodeConfig, item: Item, updateType?: UpdateType) {
      const group = item.getContainer();
      // 这里不传 cfg 参数是因为 cfg.style 需要最后覆盖样式
      const { style: defaultStyle } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      const size = (this as ShapeOptions).getSize!(cfg);
      const keyShape = item.get('keyShape');
      if (!cfg.size) {
        size[0] = keyShape.attr('width') || defaultStyle.width;
        size[1] = keyShape.attr('height') || defaultStyle.height;
      }
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        x: -size[0] / 2,
        y: -size[1] / 2,
        width: size[0],
        height: size[1],
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      let style = mix({}, defaultStyle, keyShape.attr(), strokeStyle);
      style = mix(style, cfg.style);

      (this as any).updateShape(cfg, item, style, false, updateType);
    },
  },
  'single-node',
);
