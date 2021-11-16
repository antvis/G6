/**
 * @fileOverview common combo shape
 * @author shiwu.wyy@antfin.com
 */
import { IGroup, IShape } from '@antv/g-base';
import { isArray, isNil, clone } from '@antv/util';
import { ILabelConfig, ShapeOptions } from '../interface/shape';
import { Item, LabelStyle, NodeConfig, ModelConfig, ShapeStyle } from '../types';
import Global from '../global';
import Shape from './shape';
import { shapeBase } from './shapeBase';

const singleCombo: ShapeOptions = {
  itemType: 'combo',
  // 单个图形的类型
  shapeType: 'single-combo',
  /**
   * Combo 标题文本相对图形的位置，默认为 top
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'top',
  /**
   * 标题文本相对偏移，当 labelPosition 不为 center 时有效
   * @type {Number}
   */
  refX: Global.comboLabel.refX,
  refY: Global.comboLabel.refY,

  options: {
    style: {
      stroke: Global.defaultCombo.style.stroke,
      fill: Global.defaultCombo.style.fill,
      lineWidth: Global.defaultCombo.style.lineWidth,
    },
    labelCfg: {
      style: {
        fill: Global.comboLabel.style.fill,
        fontSize: Global.comboLabel.style.fontSize,
        fontFamily: Global.windowFontFamily
      },
    },
    stateStyles: {
      ...Global.comboStateStyles,
    },
  },
  /**
   * 获取 Combo 宽高
   * @internal 返回 Combo 的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg Combo 的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: ModelConfig): number[] {
    let size: number | number[] = clone(cfg.size || this.options!.size || Global.defaultCombo.size);

    // size 是数组，若长度为 1，则补长度为 2
    if (isArray(size) && size.length === 1) {
      size = [size[0], size[0]];
    }

    // size 为数字，则转换为数组
    if (!isArray(size)) {
      size = [size, size];
    }
    return size;
  },
  // 私有方法，不希望扩展的 Combo 复写这个方法
  getLabelStyleByPosition(cfg: NodeConfig, labelCfg: ILabelConfig): LabelStyle {
    const labelPosition = labelCfg.position || this.labelPosition;
    const { style: cfgStyle } = cfg;
    let padding: number | number[] = cfg.padding || this.options.padding;
    if (isArray(padding)) padding = padding[0];

    let { refX, refY } = labelCfg;
    // 考虑 refX 和 refY = 0 的场景，不用用 labelCfg.refX || Global.nodeLabel.refX
    if (isNil(refX)) {
      refX = this.refX as number; // 不居中时的偏移量
    }
    if (isNil(refY)) {
      refY = this.refY as number; // 不居中时的偏移量
    }

    const size = this.getSize!(cfg as ModelConfig);

    const r = Math.max(cfgStyle.r, size[0] / 2) || size[0] / 2;

    const dis = r + padding;

    let style: any;
    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: -dis - (refY as number),
          textBaseline: 'bottom', // 文本在图形的上方
          textAlign: 'center',
        };
        break;
      case 'bottom':
        style = {
          x: 0,
          y: dis + (refY as number),
          textBaseline: 'bottom',
          textAlign: 'center',
        };
        break;
      case 'left':
        style = {
          x: -dis + (refX as number),
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
          x: dis + (refX as number),
          y: 0,
          textAlign: 'right',
        };
        break;
    }
    style.text = cfg.label;
    return style;
  },
  drawShape(cfg: NodeConfig, group: IGroup): IShape {
    const { shapeType } = this; // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle!(cfg);
    const shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'combo-shape',
    });
    return shape;
  },
  updateShape(cfg: NodeConfig, item: Item, keyShapeStyle: ShapeStyle) {
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
    // special for some types of nodes
  },
};

const singleComboDef = { ...shapeBase, ...singleCombo };
Shape.registerCombo('single-combo', singleComboDef);
