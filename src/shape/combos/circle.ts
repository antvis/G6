import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { Item, ComboConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ShapeOptions } from '../../interface/shape';
import { isNumber, clone, mix, isArray } from '@antv/util';

// 圆形 Combo
Shape.registerCombo(
  'circle',
  {
    // 自定义节点时的配置
    options: {
      size: [Global.defaultCombo.size[0], Global.defaultCombo.size[0]],
      padding: Global.defaultCombo.padding[0],
      animate: true,
      style: {
        stroke: Global.defaultCombo.style.stroke,
        fill: Global.defaultCombo.style.fill,
        lineWidth: Global.defaultCombo.style.lineWidth,
        opacity: 0.8,
      },
      labelCfg: {
        style: {
          fill: '#595959',
        },
        refX: 0,
        refY: 0,
      },
    },
    shapeType: 'circle',
    // 文本位置
    labelPosition: 'top',
    drawShape(cfg: ComboConfig, group: GGroup): IShape {
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
    getShapeStyle(cfg: ComboConfig): ShapeStyle {
      const { style: defaultStyle } = this.options as ComboConfig;
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isArray(padding)) padding = padding[0];
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };

      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      let r: number;
      if (!isNumber(style.r) || isNaN(style.r)) r = size[0] / 2 || Global.defaultCombo.style.r;
      else r = Math.max(style.r, size[0] / 2) || size[0] / 2;
      style.r = r + padding;
      const styles = {
        x: 0,
        y: 0,
        ...style,
      };
      if (cfg.style) cfg.style.r = r;
      else {
        cfg.style = { r };
      }
      return styles;
    },
    update(cfg: ComboConfig, item: Item) {
      const size = (this as ShapeOptions).getSize!(cfg);
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isArray(padding)) padding = padding[0];
      const cfgStyle = clone(cfg.style);
      const r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;
      cfgStyle.r = r + padding;

      const itemCacheSize = item.get('sizeCache');
      if (itemCacheSize) {
        itemCacheSize.r = cfgStyle.r;
      }

      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      const style = mix({}, keyShape.attr(), strokeStyle, cfgStyle);

      if (cfg.style) cfg.style.r = r;
      else {
        cfg.style = { r };
      }

      (this as any).updateShape(cfg, item, style, true);
    },
  },
  'single-combo',
);
