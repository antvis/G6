/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */
import { IGroup, IShape, IElement } from '@antv/g-base';
import { isArray, isNil, mix } from '@antv/util';
import { ILabelConfig, ShapeOptions } from '../interface/shape';
import { Item, LabelStyle, NodeConfig, ModelConfig, UpdateType } from '../types';
import { formatPadding } from '../util/base';
import Global from '../global';
import Shape from './shape';
import { shapeBase } from './shapeBase';
import { truncateLabelByLength } from '../util/graphic';

const singleNode: ShapeOptions = {
  itemType: 'node',
  // 单个图形的类型
  shapeType: 'single-node',
  /**
   * 文本相对图形的位置，默认以中心点
   * 位置包括： top, bottom, left, right, center
   * @type {String}
   */
  labelPosition: 'center',
  /**
   * 文本相对偏移，当 labelPosition 不为 center 时有效
   * @type {Number}
   */
  offset: Global.nodeLabel.offset,
  /**
   * 获取节点宽高
   * @internal 返回节点的大小，以 [width, height] 的方式维护
   * @param  {Object} cfg 节点的配置项
   * @return {Array} 宽高
   */
  getSize(cfg: ModelConfig): number[] {
    let size: number | number[] = this.mergeStyle?.size || cfg.size || this.getOptions({})!.size || Global.defaultNode.size; // Global.defaultNode.size; //

    // size 是数组，但长度为1，则补长度为2
    if (isArray(size) && size.length === 1) {
      size = [size[0], size[0]];
    }

    // size 为数字，则转换为数组
    if (!isArray(size)) {
      size = [size, size];
    }
    return size;
  },
  // 私有方法，不希望扩展的节点复写这个方法
  getLabelStyleByPosition(cfg: NodeConfig, labelCfg: ILabelConfig): LabelStyle {
    const labelMaxLength = labelCfg.maxLength;

    let text = cfg!.label as string;

    if (labelMaxLength) {
      text = truncateLabelByLength(text, labelMaxLength);
    }

    const labelPosition = labelCfg.position || this.labelPosition;

    // 默认的位置（最可能的情形），所以放在最上面
    if (labelPosition === 'center') {
      return { x: 0, y: 0, text, textBaseline: 'middle', textAlign: 'center' };
    }

    let { offset } = labelCfg;
    if (isNil(offset)) {
      // 考虑 offset = 0 的场景，不用用 labelCfg.offset || Global.nodeLabel.offset
      offset = this.offset as number; // 不居中时的偏移量
    }

    const size = this.getSize!(cfg as ModelConfig);

    let style: any;
    switch (labelPosition) {
      case 'top':
        style = {
          x: 0,
          y: -size[1] / 2 - (offset as number),
          textBaseline: 'bottom', // 文本在图形的上面
          textAlign: 'center',
        };
        break;
      case 'bottom':
        style = {
          x: 0,
          y: size[1] / 2 + (offset as number),
          textBaseline: 'top',
          textAlign: 'center',
        };
        break;
      case 'left':
        style = {
          x: -size[0] / 2 - (offset as number),
          y: 0,
          textBaseline: 'middle',
          textAlign: 'right',
        };
        break;
      default:
        style = {
          x: size[0] / 2 + (offset as number),
          y: 0,
          textBaseline: 'middle',
          textAlign: 'left',
        };
        break;
    }
    style.text = text;
    return style;
  },
  getLabelBgStyleByPosition(
    label: IElement,
    labelCfg?: ILabelConfig,
  ) {
    if (!label) return {};
    const backgroundStyle = labelCfg.style?.background;
    if (!backgroundStyle) return {};

    const bbox = label.getBBox();
    const padding = formatPadding(backgroundStyle.padding);
    const backgroundWidth = bbox.width + padding[1] + padding[3];
    const backgroundHeight = bbox.height + padding[0] + padding[2];

    return {
      x: bbox.minX - padding[3],
      y: bbox.minY - padding[0],
      ...backgroundStyle,
      width: backgroundWidth,
      height: backgroundHeight,
    };
  },
  drawShape(cfg: NodeConfig, group: IGroup): IShape {
    const { shapeType } = this; // || this.type，都已经加了 shapeType
    const style = this.getShapeStyle!(cfg);
    const shape = group.addShape(shapeType, {
      attrs: style,
      draggable: true,
      name: 'node-shape',
    });
    group['shapeMap']['node-shape'] = shape;
    return shape;
  },

  /**
   * 更新linkPoints
   * @param {Object} cfg 节点数据配置项
   * @param {Group} group Item所在的group
   */
  updateLinkPoints(cfg: NodeConfig, group: IGroup) {
    const { linkPoints: defaultLinkPoints } = this.mergeStyle || this.getOptions(cfg) as ModelConfig;

    const markLeft = group['shapeMap']['link-point-left'] || group.find((element) => element.get('className') === 'link-point-left');
    const markRight = group['shapeMap']['link-point-right'] || group.find((element) => element.get('className') === 'link-point-right');
    const markTop = group['shapeMap']['link-point-top'] || group.find((element) => element.get('className') === 'link-point-top');
    const markBottom = group['shapeMap']['link-point-bottom'] || group.find((element) => element.get('className') === 'link-point-bottom');

    let currentLinkPoints;
    if (markLeft) {
      currentLinkPoints = markLeft.attr();
    }
    if (markRight && !currentLinkPoints) {
      currentLinkPoints = markRight.attr();
    }
    if (markTop && !currentLinkPoints) {
      currentLinkPoints = markTop.attr();
    }
    if (markBottom && !currentLinkPoints) {
      currentLinkPoints = markBottom.attr();
    }
    if (!currentLinkPoints) currentLinkPoints = defaultLinkPoints;

    const linkPoints = mix({}, currentLinkPoints, cfg.linkPoints);

    const { fill: markFill, stroke: markStroke, lineWidth: borderWidth } = linkPoints;
    let markSize = linkPoints.size / 2;
    if (!markSize) markSize = linkPoints.r;
    const { left, right, top, bottom } = cfg.linkPoints
      ? cfg.linkPoints
      : { left: undefined, right: undefined, top: undefined, bottom: undefined };

    const size = this.getSize!(cfg);
    const width = size[0];
    const height = size[1];
    const styles = {
      r: markSize,
      fill: markFill,
      stroke: markStroke,
      lineWidth: borderWidth,
    };

    if (markLeft) {
      if (!left && left !== undefined) {
        markLeft.remove();
        delete group['shapeMap']['link-point-left'];
      } else {
        markLeft.attr({
          ...styles,
          x: -width / 2,
          y: 0,
        });
      }
    } else if (left) {
      const name = 'link-point-left';
      group['shapeMap'][name] = group.addShape('circle', {
        attrs: {
          ...styles,
          x: -width / 2,
          y: 0,
        },
        className: name,
        name,
        isAnchorPoint: true,
      });
    }

    if (markRight) {
      if (!right && right !== undefined) {
        markRight.remove();
        delete group['shapeMap']['link-point-right'];
      }
      markRight.attr({
        ...styles,
        x: width / 2,
        y: 0,
      });
    } else if (right) {
      const name = 'link-point-right';
      group['shapeMap'][name] = group.addShape('circle', {
        attrs: {
          ...styles,
          x: width / 2,
          y: 0,
        },
        className: name,
        name,
        isAnchorPoint: true,
      });
    }

    if (markTop) {
      if (!top && top !== undefined) {
        markTop.remove();
        delete group['shapeMap']['link-point-top'];
      }
      markTop.attr({
        ...styles,
        x: 0,
        y: -height / 2,
      });
    } else if (top) {
      const name = 'link-point-top';
      group['shapeMap'][name] = group.addShape('circle', {
        attrs: {
          ...styles,
          x: 0,
          y: -height / 2,
        },
        className: name,
        name,
        isAnchorPoint: true,
      });
    }

    if (markBottom) {
      if (!bottom && bottom !== undefined) {
        markBottom.remove();
        delete group['shapeMap']['link-point-bottom'];
      } else {
        markBottom.attr({
          ...styles,
          x: 0,
          y: height / 2,
        });
      }
    } else if (bottom) {
      const name = 'link-point-bottom';
      group['shapeMap'][name] = group.addShape('circle', {
        attrs: {
          ...styles,
          x: 0,
          y: height / 2,
        },
        className: name,
        name,
        isAnchorPoint: true,
      });
    }
  },
  updateShape(cfg: NodeConfig, item: Item, keyShapeStyle: object, hasIcon: boolean, updateType: UpdateType) {
    const keyShape = item.get('keyShape');
    keyShape.attr({
      ...keyShapeStyle,
    });

    if (!undefined || updateType?.includes('label')) {
      (this as any).updateLabel(cfg, item, updateType);
    }

    if (hasIcon) {
      (this as any).updateIcon(cfg, item);
    }
  },
  updateIcon(cfg: NodeConfig, item: Item) {
    const group = item.getContainer();
    const { icon } = this.mergeStyle || this.getOptions(cfg) as NodeConfig;
    const { show, text } = cfg.icon ? cfg.icon : { show: undefined, text: undefined };
    const iconShape = group['shapeMap'][`${this.type}-icon`] || group.find(ele => ele.get('name') === `${this.type}-icon`);
    if (iconShape) {
      // 若原先存在 icon
      if (show || show === undefined) {
        // 若传入 show: true, 或没有设置，则更新原有的 icon 样式
        const iconConfig = mix({}, iconShape.attr(), icon);
        let { width: w = 20, height: h = 20 } = iconConfig;
        if (iconConfig.fontFamily === 'iconfont' || iconConfig.hasOwnProperty('text')) {
          w = 0;
          h = 0;
        }
        iconShape.attr({
          ...iconConfig,
          x: -w / 2,
          y: -h / 2,
        });
      } else {
        // 若传入了 show: false 则删除原先的 icon
        iconShape.remove();
        delete group['shapeMap'][`${this.type}-icon`];
      }
    } else if (show) {
      // 如果原先不存在 icon，但传入了 show: true，则新增 icon
      const name = `${this.type}-icon`;
      if (text) {
        group['shapeMap'][name] = group.addShape('text', {
          attrs: {
            x: 0,
            y: 0,
            fontSize: 12,
            fill: '#000',
            stroke: '#000',
            textBaseline: 'middle',
            textAlign: 'center',
            ...icon,
          },
          className: name,
          name,
        });
      } else {
        const { width: w, height: h } = icon;
        group['shapeMap'][name] = group.addShape('image', {
          attrs: {
            ...icon,
            x: -w! / 2,
            y: -h! / 2,
          },
          className: name,
          name,
        });
      }
      // to ensure the label is on the top of all the shapes
      const labelShape = group['shapeMap']['node-label'] || group.find(ele => ele.get('name') === 'node-label');
      if (labelShape) {
        labelShape.toFront();
      }
    }
  },
};

const singleNodeDef = { ...shapeBase, ...singleNode };
Shape.registerNode('single-node', singleNodeDef);
