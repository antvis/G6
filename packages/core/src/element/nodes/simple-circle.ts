import { IGroup, IShape } from '@antv/g-base';
import { deepMix } from '@antv/util';
import { Item, NodeConfig, ShapeStyle, UpdateType } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';

// 带有图标的圆，可用于拓扑图中
Shape.registerNode(
  'simple-circle',
  {
    // 自定义节点时的配置
    options: {
      size: Global.defaultNode.size,
      style: {
        x: 0,
        y: 0,
        stroke: Global.defaultNode.style.stroke,
        fill: Global.defaultNode.style.fill,
        lineWidth: Global.defaultNode.style.lineWidth,
      },
      labelCfg: {
        style: {
          fill: Global.nodeLabel.style.fill,
          fontSize: Global.nodeLabel.style.fontSize,
          fontFamily: Global.windowFontFamily
        },
      },
      stateStyles: {
        ...Global.nodeStateStyles,
      },
    },
    shapeType: 'simple-circle',
    // 文本位置
    labelPosition: 'center',
    shapeMap: {},
    drawShape(cfg: NodeConfig, group: IGroup): IShape {

      const style = this.getShapeStyle!(cfg);
      const name = `${this.type}-keyShape`;
      const keyShape: IShape = group.addShape('circle', {
        attrs: style,
        className: `${this.type}-keyShape`,
        name,
        draggable: true,
      });
      group['shapeMap'][name] = keyShape;

      return keyShape;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: NodeConfig): ShapeStyle {
      const { style: defaultStyle } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
      const strokeStyle = {
        stroke: cfg.color,
      };
      // 如果设置了color，则覆盖默认的stroke属性
      const style = deepMix({}, defaultStyle, strokeStyle);
      const size = (this as ShapeOptions).getSize!(cfg);
      const r = size[0] / 2;
      const styles = {
        x: 0,
        y: 0,
        r,
        ...style,
      };
      return styles;
    },
    update(cfg: NodeConfig, item: Item, updateType?: UpdateType) {
      const size = (this as ShapeOptions).getSize!(cfg);
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        r: size[0] / 2,
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      const style = deepMix({}, keyShape.attr(), strokeStyle, cfg.style);

      (this as any).updateShape(cfg, item, style, true, updateType);
    },
  },
  'single-node',
);
