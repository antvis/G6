import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import deepMix from '@antv/util/lib/deep-mix';
import { Item, NodeConfig, ShapeStyle, ModelConfig } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';
import { isNumber, clone } from '@antv/util';


// 圆形 Combo
Shape.registerCombo(
  'circle',
  {
    // 自定义节点时的配置
    options: {
      size: [Global.defaultCombo.size[0], Global.defaultCombo.size[0]],
      padding: 20,
      style: {
        x: 0,
        y: 0,
        r: Global.defaultCombo.style.r,
        stroke: Global.defaultCombo.style.stroke,
        fill: Global.defaultCombo.style.fill,
        lineWidth: Global.defaultCombo.style.lineWidth,
        opacity: 0.8
      },
      labelCfg: {
        style: {
          fill: '#595959',
        },
        refX: 0,
        refY: 0
      }
    },
    shapeType: 'circle',
    // 文本位置
    labelPosition: 'top',
    drawShape(cfg: NodeConfig, group: GGroup): IShape {
      const style = this.getShapeStyle!(cfg);
      delete style.height;
      delete style.width;
      const keyShape: IShape = group.addShape('circle', {
        attrs: style,
        className: 'circle-combo',
        name: 'circle-combo',
        draggable: true,
      });

      return keyShape;
    },
    /**
     * 获取 Combo 的样式，供基于该 Combo 自定义时使用
     * @param {Object} cfg Combo 数据模型
     * @return {Object} Combo 的样式
     */
    getShapeStyle(cfg: NodeConfig): ShapeStyle {
      const { style: defaultStyle } = this.options as ModelConfig;
      const padding: number = this.options.padding;
      const strokeStyle = {
        stroke: cfg.color,
      };

      // 如果设置了color，则覆盖默认的stroke属性
      const style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
      
      const size = (this as ShapeOptions).getSize!(cfg);
      if (!isNumber(style.r) || isNaN(style.r)) style.r = size[0] / 2;
      else style.r = Math.max(style.r + padding, size[0]/2);
      const styles = Object.assign(
        {},
        {
          x: 0,
          y: 0
        },
        style,
      );
      return styles;
    },
    update(cfg: NodeConfig, item: Item) {
      // if (cfg.id === 'B') debugger
      const size = (this as ShapeOptions).getSize!(cfg);
      const padding: number = this.options.padding;
      const cfgStyle = clone(cfg.style);
      cfgStyle.r = Math.max(cfgStyle.r + padding, size[0] / 2);
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
        r: size[0] / 2
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      const style = deepMix({}, keyShape.attr(), strokeStyle, cfgStyle);

      (this as any).updateShape(cfg, item, style, true);
    }
  },
  'single-combo',
);
