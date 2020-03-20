/**
 * @fileOverview common combo shape
 * @author shiwu.wyy@antfin.com
 */
import GGroup from '@antv/g-canvas/lib/group';
import { IShape } from '@antv/g-canvas/lib/interfaces';
import { isArray, isNil } from '@antv/util';
import { ILabelConfig, ShapeOptions } from '../interface/shape';
import { Item, LabelStyle, NodeConfig, ModelConfig } from '../types';
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
  offset: Global.comboLabel.offset,
  /**
   * 获取 Combo 宽高
   * @internal 返回 Combo 的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg Combo 的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: ModelConfig): number[] {
    let size: number | number[] = cfg.size || this.options!.size || Global.defaultNode.size;

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

    let { offset } = labelCfg;
    if (isNil(offset)) {
      // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = this.offset as number; // 不居中时的偏移量
    }

    const size = this.getSize!(cfg as ModelConfig);

    const width = size[0];
    const height = size[1];

    let style: any;
    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: 0 - height / 2 - (offset as number),
          textBaseline: 'top', // 文本在图形的上面
          textAlign: 'center',
        };
        break;
      case 'bottom':
        style = {
          x: 0,
          y: height / 2 + (offset as number),
          textBaseline: 'bottom',
          textAlign: 'center',
        };
        break;
      case 'left':
        style = {
          x: 0 - width / 2 - (offset as number),
          y: 0,
          textAlign: 'left',
        };
        break;
      case 'center':
        style = {
          x: 0, y: 0, text: cfg!.label,
          textAlign: 'center',
        };
        break;
      default:
        style = {
          x: width / 2 + (offset as number),
          y: 0,
          textAlign: 'right',
        };
        break;
    }
    style.text = cfg.label;
    return style;
  },
  drawShape(cfg: NodeConfig, group: GGroup): IShape {
    const { shapeType } = this; // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle!(cfg);
    const shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'combo-shape',
    });
    return shape;
  },
  updateShape(cfg: NodeConfig, item: Item, keyShapeStyle: object) {
    const keyShape = item.get('keyShape');
    keyShape.attr({
      ...keyShapeStyle,
    });

    (this as any).updateLabel(cfg, item);
    // special for some types of nodes
  }
};

const singleComboDef = Object.assign({}, shapeBase, singleCombo);
Shape.registerCombo('single-combo', singleComboDef);
