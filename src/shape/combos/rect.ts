import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { mix } from '@antv/util';
import { Item, NodeConfig, ModelConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';

Shape.registerCombo(
  'rect',
  {
    // 自定义 Combo 时的配置
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
      // 连接点，默认为左右
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    shapeType: 'rect',
    labelPosition: 'top',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const style = this.getShapeStyle!(cfg);
      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-combo',
        name: 'rect-combo',
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
      const { style: defaultStyle } = this.options as ModelConfig;
      let size = (this as ShapeOptions).getSize!(cfg);
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

      (this as any).updateShape(cfg, item, style, false);
    },
  },
  'single-combo',
);
