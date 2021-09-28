import { IGroup, IShape } from '@antv/g-base';
import { mix, isNumber, clone, isNil } from '@antv/util';
import { LabelStyle, Item, ComboConfig, ShapeStyle } from '../../types';
import Global from '../../global';
import Shape from '../shape';
import { ILabelConfig, ShapeOptions } from '../../interface/shape';

Shape.registerCombo(
  'rect',
  {
    // 自定义 Combo 时的配置
    options: {
      size: [40, 5],
      padding: [25, 20, 15, 20],
      animate: true,
      style: {
        radius: 0,
        stroke: Global.defaultCombo.style.stroke,
        fill: Global.defaultCombo.style.fill,
        lineWidth: Global.defaultCombo.style.lineWidth,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: Global.comboLabel.style.fill,
          fontSize: Global.comboLabel.style.fontSize,
          fontFamily: Global.windowFontFamily
        },
      },
      // 连接点，默认为左右
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
      stateStyles: {
        ...Global.comboStateStyles,
      },
    },
    shapeType: 'rect',
    labelPosition: 'top',
    drawShape(cfg: ComboConfig, group: IGroup): IShape {
      const style = this.getShapeStyle!(cfg);
      const keyShape = group.addShape('rect', {
        attrs: style,
        className: 'rect-combo',
        name: 'rect-combo',
        draggable: true,
      });
      return keyShape;
    },
    // 私有方法，不希望扩展的 Combo 复写这个方法
    getLabelStyleByPosition(cfg: ComboConfig, labelCfg: ILabelConfig): LabelStyle {
      const labelPosition = labelCfg.position || this.labelPosition;
      const { style: cfgStyle } = cfg;
      let padding = cfg.padding || this.options.padding;
      if (isNumber(padding)) padding = [padding, padding, padding, padding];

      let { refX, refY } = labelCfg;
      // 考虑 refX 和 refY = 0 的场景，不用用 labelCfg.refX || Global.nodeLabel.refY
      if (isNil(refX)) {
        refX = this.refX as number; // 不居中时的偏移量
      }
      if (isNil(refY)) {
        refY = this.refY as number; // 不居中时的偏移量
      }

      const leftDis = cfgStyle.width / 2 + padding[3];
      const topDis = cfgStyle.height / 2 + padding[0];

      let style: any;
      switch (labelPosition) {
        case 'top':
          style = {
            x: 0 - leftDis + refX,
            y: 0 - topDis + refY,
            textBaseline: 'top', // 文本在图形的上方
            textAlign: 'left',
          };
          break;
        case 'bottom':
          style = {
            x: 0,
            y: topDis + refY,
            textBaseline: 'bottom',
            textAlign: 'center',
          };
          break;
        case 'left':
          style = {
            x: 0 - leftDis + refY,
            y: 0,
            textAlign: 'left',
          };
          break;
        case 'center':
          style = {
            x: 0,
            y: 0,
            text: cfg!.label,
            textAlign: 'center',
          };
          break;
        default:
          style = {
            x: leftDis + refX,
            y: 0,
            textAlign: 'right',
          };
          break;
      }
      style.text = cfg.label;
      return style;
    },
    /**
     * 获取节点的样式，供基于该节点自定义时使用
     * @param {Object} cfg 节点数据模型
     * @return {Object} 节点的样式
     */
    getShapeStyle(cfg: ComboConfig) {
      const { style: defaultStyle } = this.options as ComboConfig;
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isNumber(padding)) padding = [padding, padding, padding, padding];
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };

      // 如果设置了color，则覆盖默认的stroke属性
      const style = mix({}, defaultStyle, strokeStyle, cfg.style);
      const size = (this as ShapeOptions).getSize!(cfg);
      let width: number;
      let height: number;
      const fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;
      if (fixSize) {
        if (isNumber(fixSize)) {
          width = fixSize;
          height = fixSize;
        } else {
          width = fixSize[0];
          height = fixSize[1];
        }
      } else {
        if (!isNumber(style.width) || isNaN(style.width))
          width = size[0] || Global.defaultCombo.style.width;
        else width = Math.max(style.width, size[0]) || size[0];
        if (!isNumber(style.height) || isNaN(style.height))
          height = size[1] || Global.defaultCombo.style.height;
        else height = Math.max(style.height, size[1]) || size[1];
      }

      const x = -width / 2 - padding[3];
      const y = -height / 2 - padding[0];

      style.width = width + padding[1] + padding[3];
      style.height = height + padding[0] + padding[2];

      const styles = {
        x,
        y,
        ...style,
      };
      if (!cfg.style) {
        cfg.style = {
          width,
          height,
        };
      } else {
        cfg.style.width = width;
        cfg.style.height = height;
      }
      return styles;
    },
    update(cfg: ComboConfig, item: Item) {
      const size = (this as ShapeOptions).getSize!(cfg);
      let padding: number | number[] = cfg.padding || this.options.padding;
      if (isNumber(padding)) padding = [padding, padding, padding, padding];
      const cfgStyle = clone(cfg.style);
      let width, height;
      const fixSize = cfg.collapsed && cfg.fixCollapseSize ? cfg.fixCollapseSize : cfg.fixSize;
      if (fixSize) {
        if (isNumber(fixSize)) {
          width = fixSize;
          height = fixSize;
        } else {
          width = fixSize[0];
          height = fixSize[1];
        }
      } else {
        width = Math.max(cfgStyle.width, size[0]) || size[0];
        height = Math.max(cfgStyle.height, size[1]) || size[1];
      }

      cfgStyle.width = width + padding[1] + padding[3];
      cfgStyle.height = height + padding[0] + padding[2];

      const itemCacheSize = item.get('sizeCache');
      if (itemCacheSize) {
        itemCacheSize.width = cfgStyle.width;
        itemCacheSize.height = cfgStyle.height;
      }

      cfgStyle.x = -width / 2 - padding[3];
      cfgStyle.y = -height / 2 - padding[0];
      // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
      const strokeStyle = {
        stroke: cfg.color,
      };
      // 与 getShapeStyle 不同在于，update 时需要获取到当前的 style 进行融合。即新传入的配置项中没有涉及的属性，保留当前的配置。
      const keyShape = item.get('keyShape');
      const style = mix({}, keyShape.attr(), strokeStyle, cfgStyle);

      if (cfg.style) {
        cfg.style.width = width;
        cfg.style.height = height;
      } else {
        cfg.style = { width, height };
      }

      (this as any).updateShape(cfg, item, style, false);
    },
    updateShape(cfg: ComboConfig, item: Item, keyShapeStyle: object) {
      const keyShape = item.get('keyShape');
      const animate = cfg.animate === undefined ? this.options.animate : cfg.animate;
      if (animate && keyShape.animate) {
        keyShape.animate(keyShapeStyle, {
          duration: 200,
          easing: 'easeLinear',
        });
      } else {
        keyShape.attr({
          ...keyShapeStyle,
        });
      }

      (this as any).updateLabel(cfg, item);
    },
  },
  'single-combo',
);
