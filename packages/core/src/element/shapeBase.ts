/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
import { IGroup, IShape, IElement } from '@antv/g-base';
import { ShapeOptions, ILabelConfig } from '../interface/shape';
import { IPoint, Item, LabelStyle, ShapeStyle, ModelConfig, EdgeConfig, UpdateType } from '../types';
import Global from '../global';
import { ext } from '@antv/matrix-util';
import { deepMix, each, mix, isBoolean, isPlainObject, clone } from '@antv/util';
import { cloneBesidesImg } from '../util/graphic';

const transform = ext.transform;

const CLS_SHAPE_SUFFIX = '-shape';
const CLS_LABEL_SUFFIX = '-label';
const ARROWS = ['startArrow', 'endArrow'];
const SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: undefined,
  fill: undefined,
  lineAppendWidth: 1,
  opacity: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  x: 0,
  y: 0,
  r: 10,
  width: 20,
  height: 20,
  shadowColor: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};
const PATH_SHAPE_DEFAULT_ATTRS = {
  lineWidth: 1,
  stroke: '#000',
  lineDash: undefined,
  startArrow: false,
  endArrow: false,
  opacity: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  shadowColor: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};
const SHAPES_DEFAULT_ATTRS = {
  edge: PATH_SHAPE_DEFAULT_ATTRS,
  node: SHAPE_DEFAULT_ATTRS,
  combo: SHAPE_DEFAULT_ATTRS,
};

export const CLS_LABEL_BG_SUFFIX = '-label-bg';

// 单个 shape 带有一个 label，共用这段代码
export const shapeBase: ShapeOptions = {
  // 默认样式及配置
  options: {
    labelCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      },
    },
    descriptionCfg: {
      style: {
        fontFamily: Global.windowFontFamily
      },
    },
  },
  itemType: '', // node, edge, combo 等
  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: '',
  getCustomConfig(cfg: ModelConfig): ModelConfig {
    return {};
  },
  getOptions(cfg: ModelConfig, updateType?: UpdateType): ModelConfig {
    if (updateType === 'move' || updateType?.includes('bbox')) {
      return {};
    }
    return deepMix(
      {},
      this.options,
      this.getCustomConfig(cfg) || {},
      cfg,
    );
  },
  /**
   * 绘制节点/边，包含文本
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 节点的容器
   * @return {IShape} 绘制的图形
   */
  draw(cfg: ModelConfig, group: IGroup): IShape {
    group['shapeMap'] = {};
    this.mergeStyle = this.getOptions(cfg);
    const shape: IShape = this.drawShape!(cfg, group);
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);
    group['shapeMap'][this.itemType + CLS_SHAPE_SUFFIX] = shape;
    if (cfg.label) {
      const label = this.drawLabel!(cfg, group);
      label.set('className', this.itemType + CLS_LABEL_SUFFIX);
      group['shapeMap'][this.itemType + CLS_LABEL_SUFFIX] = label;
    }
    return shape;
  },
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   * @param cfg
   * @param group
   * @param keyShape
   */
  afterDraw(cfg?: ModelConfig, group?: IGroup, keyShape?: IShape) { },
  drawShape(cfg?: ModelConfig, group?: IGroup): IShape {
    return null as any;
  },
  drawLabel(cfg: ModelConfig, group: IGroup): IShape {
    const { labelCfg: defaultLabelCfg } = this.mergeStyle || this.getOptions(cfg) as ModelConfig || {};
    // image的情况下有可能为null
    const labelCfg = (defaultLabelCfg || {}) as ILabelConfig;
    const labelStyle = this.getLabelStyle!(cfg, labelCfg, group);
    const rotate = labelStyle.rotate;
    delete labelStyle.rotate;
    const label = group.addShape('text', {
      attrs: labelStyle,
      draggable: true,
      className: 'text-shape',
      name: 'text-shape',
      labelRelated: true
    });
    group['shapeMap']['text-shape'] = label;
    if (!isNaN(rotate) && rotate !== '') {
      const labelBBox = label.getBBox();
      let labelMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (labelStyle.rotateCenter) {
        switch (labelStyle.rotateCenter) {
          case 'center':
            labelMatrix = transform(labelMatrix, [
              ['t', -labelBBox.width / 2, -labelBBox.height / 2],
              ['r', rotate],
              ['t', labelBBox.width / 2, labelBBox.height / 2],
            ]);
            break;
          case 'lefttop':
            labelMatrix = transform(labelMatrix, [
              ['t', -labelStyle.x!, -labelStyle.y!],
              ['r', rotate],
              ['t', labelStyle.x, labelStyle.y],
            ]);
            break;
          case 'leftcenter':
            labelMatrix = transform(labelMatrix, [
              ['t', -labelStyle.x!, -labelStyle.y! - labelBBox.height / 2],
              ['r', rotate],
              ['t', labelStyle.x, labelStyle.y! + labelBBox.height / 2],
            ]);
            break;
          default:
            labelMatrix = transform(labelMatrix, [
              ['t', -labelBBox.width / 2, -labelBBox.height / 2],
              ['r', rotate],
              ['t', labelBBox.width / 2, labelBBox.height / 2],
            ]);
            break;
        }
      } else {
        labelMatrix = transform(labelMatrix, [
          ['t', -labelStyle.x!, -labelStyle.y! - labelBBox.height / 2],
          ['r', rotate],
          ['t', labelStyle.x, labelStyle.y! + labelBBox.height / 2],
        ]);
      }
      label.setMatrix(labelMatrix);
    }
    if (labelStyle.background) {
      const rect = this.drawLabelBg(cfg, group, label);
      const labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      rect.set('classname', labelBgClassname);
      group['shapeMap'][labelBgClassname] = rect;
      label.toFront();
    }
    return label;
  },
  drawLabelBg(cfg: ModelConfig, group: IGroup, label: IElement) {
    const { labelCfg: defaultLabelCfg } = this.options as ModelConfig;
    const labelCfg = mix({}, defaultLabelCfg, cfg.labelCfg) as ILabelConfig;
    const style = this.getLabelBgStyleByPosition(label, labelCfg);
    const rect = group.addShape('rect', { name: 'text-bg-shape', attrs: style, labelRelated: true });
    group['shapeMap']['text-bg-shape'] = rect;
    return rect;
  },
  getLabelStyleByPosition(cfg: ModelConfig, labelCfg?: ILabelConfig, group?: IGroup): LabelStyle {
    return { text: cfg.label as string };
  },
  getLabelBgStyleByPosition(
    label: IElement,
    labelCfg?: ILabelConfig,
  ): LabelStyle {
    return {};
  },

  /**
   * 获取文本的配置项
   * @param cfg 节点的配置项
   * @param labelCfg 文本的配置项
   * @param group 父容器，label 的定位可能与图形相关
   */
  getLabelStyle(cfg: ModelConfig, labelCfg: ILabelConfig, group: IGroup): LabelStyle {
    const calculateStyle = this.getLabelStyleByPosition!(cfg, labelCfg, group);
    const attrName = `${this.itemType}Label`; // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = (Global as any)[attrName] ? (Global as any)[attrName].style : null;
    return { ...defaultStyle, ...calculateStyle, ...labelCfg.style };
  },

  /**
   * 获取图形的配置项
   * @param cfg
   */
  getShapeStyle(cfg: ModelConfig): ShapeStyle {
    return cfg.style!;
  },
  /**
   * 更新节点，包含文本
   * @override
   * @param  {Object} cfg 节点/边的配置项
   * @param  {G6.Item} item 节点/边
   */
  update(cfg: ModelConfig, item: Item, updateType?: UpdateType) {
    (this as any).updateShapeStyle(cfg, item, updateType);
    (this as any).updateLabel(cfg, item, updateType);
  },
  updateShapeStyle(cfg: ModelConfig, item: Item, updateType?: UpdateType) {
    const group = item.getContainer();
    const shape = item.getKeyShape();
    const shapeStyle = mix({}, shape.attr(), cfg.style);
    for (const key in shapeStyle) {
      const style = shapeStyle[key];
      if (isPlainObject(style)) {
        // 更新图元素样式，支持更新子元素
        const subShape = group['shapeMap']?.[key] || group.find((element) => element.get('name') === key)
        subShape?.attr(style);
      } else {
        shape.attr({
          [key]: style,
        });
      }
    }
  },

  updateLabel(cfg: ModelConfig, item: Item, updateType?: UpdateType) {
    // 防止 cfg.label = "" 的情况
    if (cfg.label || cfg.label === '') {
      const group = item.getContainer();
      let { labelCfg = {} } = this.mergeStyle || this.getOptions({}, updateType) as ModelConfig || {};
      const labelClassName = this.itemType + CLS_LABEL_SUFFIX;
      const label = group['shapeMap'][labelClassName] || group.find(ele => ele.get('className') === labelClassName);
      const labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      let labelBg = group['shapeMap'][labelBgClassname] || group.find(ele => ele.get('className') === labelBgClassname);
      // 若传入的新配置中有 label，（用户没传入但原先有 label，label 也会有值）
      if (!label) {
        // 若原先不存在 label，则绘制一个新的 label
        const newLabel = this.drawLabel!(cfg, group);
        newLabel.set('className', labelClassName);
        group['shapeMap'][labelClassName] = newLabel;
      } else {
        // 若原先存在 label，则更新样式。与 getLabelStyle 不同在于这里需要融合当前 label 的样式
        // 融合 style 以外的属性：position, offset, ...
        if (!updateType || updateType === 'bbox|label' || (this.itemType === 'edge' && updateType !== 'style')) {
          labelCfg = deepMix(labelCfg, cfg.labelCfg);
        }

        // 获取位置信息
        const calculateStyle = (this as any).getLabelStyleByPosition(cfg, labelCfg, group);

        // 取 nodeLabel，edgeLabel 的配置项
        const cfgStyle = cfg.labelCfg?.style;
        // const cfgBgStyle = labelCfg.style?.background;

        // 需要融合当前 label 的样式 label.attr()。不再需要全局/默认样式，因为已经应用在当前的 label 上
        const labelStyle = { ...calculateStyle, ...cfgStyle };
        const rotate = labelStyle.rotate;
        delete labelStyle.rotate;

        // 计算 label 的旋转矩阵
        if (!isNaN(rotate) && rotate !== '') {
          // if G 4.x define the rotateAtStart, use it directly instead of using the following codes
          let rotateMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
          rotateMatrix = transform(rotateMatrix, [
            ['t', -labelStyle.x, -labelStyle.y],
            ['r', rotate],
            ['t', labelStyle.x, labelStyle.y],
          ]);
          labelStyle.matrix = rotateMatrix;
          label.attr(labelStyle);
        } else {
          if (label.getMatrix()?.[4] !== 1) {
            label.resetMatrix();
          }
          label.attr(labelStyle);
        }

        if (!labelBg) {
          if (labelStyle.background) {
            labelBg = this.drawLabelBg(cfg, group, label);
            labelBg.set('classname', labelBgClassname);
            group['shapeMap'][labelBgClassname] = labelBg;
            label.toFront();
          }
        } else if (labelStyle.background) {
          const calculateBgStyle = (this as any).getLabelBgStyleByPosition(
            label,
            labelCfg,
          );
          labelBg.attr(calculateBgStyle);
        } else {
          group.removeChild(labelBg);
        }
      }
    }
  },

  // update(cfg, item) // 默认不定义
  afterUpdate(cfg?: ModelConfig, item?: Item) { },
  /**
   * 设置节点的状态，主要是交互状态，业务状态请在 draw 方法中实现
   * 单图形的节点仅考虑 selected、active 状态，有其他状态需求的用户自己复写这个方法
   * @override
   * @param  {String} name 状态名称
   * @param  {String | Boolean} value 状态值
   * @param  {G6.Item} item 节点
   */
  setState(name: string, value: string | boolean, item: Item) {
    const shape: IShape = item.get('keyShape');
    if (!shape || shape.destroyed) return;

    const type = item.getType();

    const stateName = isBoolean(value) ? name : `${name}:${value}`;
    const shapeStateStyle = this.getStateStyle(stateName, item);
    const itemStateStyle = item.getStateStyle(stateName);
    // const originStyle = item.getOriginStyle();

    // 不允许设置一个不存在的状态
    if (!itemStateStyle && !shapeStateStyle) {
      return;
    }

    // 要设置或取消的状态的样式
    // 当没有 state 状态时，默认使用 model.stateStyles 中的样式
    const styles = mix({}, itemStateStyle || shapeStateStyle);

    const group = item.getContainer();

    // 从图元素现有的样式中删除本次要取消的 states 中存在的属性值。使用对象检索更快
    const keptAttrs: any = { x: 1, y: 1, cx: 1, cy: 1, matrix: 1 };
    if (type === 'combo') {
      keptAttrs.r = 1;
      keptAttrs.width = 1;
      keptAttrs.height = 1;
    }

    if (value) {
      // style 为要设置的状态的样式
      for (const key in styles) {
        const style = styles[key];
        if (isPlainObject(style) && !ARROWS.includes(key)) {
          const subShape = group['shapeMap']?.[key] || group.find((element) => element.get('name') === key)
          subShape?.attr(style);
        } else {
          // 非纯对象，则认为是设置到 keyShape 上面的
          shape.attr({
            [key]: style,
          });
        }
      }
    } else {
      // 所有生效的 state 的样式
      const enableStatesStyle = cloneBesidesImg(item.getCurrentStatesStyle());

      const model = item.getModel();
      // 原始样式
      const originStyle = mix({}, model.style, cloneBesidesImg(item.getOriginStyle()));

      const keyShapeName = shape.get('name');

      // cloning  shape.attr(), keys.forEach to avoid cloning the img attr, which leads to maximum clone heap #2383
      // const keyShapeStyles = clone(shape.attr())
      const shapeAttrs = shape.attr();
      const keyShapeStyles = {};
      Object.keys(shapeAttrs).forEach((key) => {
        if (key === 'img') return;
        const attr = shapeAttrs[key];
        if (attr && typeof attr === 'object') {
          keyShapeStyles[key] = clone(attr);
        } else {
          keyShapeStyles[key] = attr;
        }
      });

      // 已有样式 - 要取消的状态的样式
      const filtetDisableStatesStyle: any = {};

      // styles 为要取消的状态的样式
      for (const p in styles) {
        const style = styles[p];
        if (isPlainObject(style) && !ARROWS.includes(p)) {
          const subShape = group['shapeMap'][p] || group.find(ele => ele.get('name') === p);
          if (subShape) {
            const subShapeStyles = cloneBesidesImg(subShape.attr());
            each(style, (v, key) => {
              if (p === keyShapeName && keyShapeStyles[key] && !keptAttrs[key]) {
                delete keyShapeStyles[key];
                const value = originStyle[p][key] || SHAPES_DEFAULT_ATTRS[type][key];
                shape.attr(key, value);
              } else if (subShapeStyles[key] || subShapeStyles[key] === 0) {
                delete subShapeStyles[key];
                const value = originStyle[p][key] || SHAPES_DEFAULT_ATTRS[type][key];
                subShape.attr(key, value);
              }
            });
            filtetDisableStatesStyle[p] = subShapeStyles;
          }
        } else {
          if (keyShapeStyles[p] && !keptAttrs[p]) {
            delete keyShapeStyles[p];
            const value =
              originStyle[p] ||
              (originStyle[keyShapeName] ? originStyle[keyShapeName][p] : undefined) ||
              SHAPES_DEFAULT_ATTRS[type][p];
            shape.attr(p, value);
          }
        }
      }

      // 从图元素现有的样式中删除本次要取消的 states 中存在的属性值后，
      // 如果 keyShape 有 name 属性，则 filtetDisableStatesStyle 的格式为 { keyShapeName: {} }
      // 否则为普通对象
      if (!keyShapeName) {
        mix(filtetDisableStatesStyle, keyShapeStyles);
      } else {
        filtetDisableStatesStyle[keyShapeName] = keyShapeStyles;
      }
      for (const key in enableStatesStyle) {
        if (keptAttrs[key]) continue;
        const enableStyle = enableStatesStyle[key];
        if (!isPlainObject(enableStyle) || ARROWS.includes(key)) {
          // 把样式属性merge到keyShape中
          if (!keyShapeName) {
            mix(originStyle, {
              [key]: enableStyle,
            });
          } else {
            mix(originStyle[keyShapeName], {
              [key]: enableStyle,
            });
            delete originStyle[key];
          }
          delete enableStatesStyle[key];
        }
      }

      const originstyles = {};
      deepMix(originstyles, originStyle, filtetDisableStatesStyle, enableStatesStyle);
      let keyShapeSetted = false;

      for (const originKey in originstyles) {
        const style = originstyles[originKey];
        if (isPlainObject(style) && !ARROWS.includes(originKey)) {
          const subShape = group['shapeMap'][originKey] || group.find(ele => ele.get('name') === originKey);
          if (subShape) {
            // The text's position and matrix is not allowed to be affected by states
            if (subShape.get('type') === 'text' || subShape.get('labelRelated')) {
              delete (style as any).x;
              delete (style as any).y;
              delete (style as any).matrix;
            }
            if (originKey === keyShapeName) {
              if (type === 'combo') {
                delete (style as any).r;
                delete (style as any).width;
                delete (style as any).height;
              }
              keyShapeSetted = true;
            }
            subShape.attr(style);
          }
        } else if (!keyShapeSetted) {
          const value = style || SHAPES_DEFAULT_ATTRS[type][originKey];
          // 当更新 combo 状态时，当不存在 keyShapeName 时候，则认为是设置到 keyShape 上面的
          if (type === 'combo') {
            if (!keyShapeName) {
              shape.attr({
                [originKey]: value,
              });
            }
          } else {
            shape.attr({
              [originKey]: value,
            });
          }
        }
      }
    }
  },

  /**
   * 获取不同状态下的样式
   *
   * @param {string} name 状态名称
   * @param {Item} item Node或Edge的实例
   * @return {object} 样式
   */
  getStateStyle(name: string, item: Item): ShapeStyle {
    const model = item.getModel();
    const type = item.getType();
    const { stateStyles, style = {} } = this.getOptions(model);

    const modelStateStyle = model.stateStyles
      ? model.stateStyles[name]
      : stateStyles && stateStyles[name];

    if (type === 'combo') {
      return clone(modelStateStyle);
    }
    return mix({}, style, modelStateStyle);
  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
   */
  getControlPoints(cfg: EdgeConfig): IPoint[] | undefined {
    return cfg.controlPoints;
  },
  /**
   * 获取控制点
   * @param  {Object} cfg 节点、边的配置项
   * @return {Array|null} 锚点的数组,如果为 null，则没有锚点
   */
  getAnchorPoints(cfg: ModelConfig): number[][] | undefined {
    const anchorPoints = cfg?.anchorPoints || this.getCustomConfig(cfg)?.anchorPoints || this.options?.anchorPoints;
    return anchorPoints;
  },
};
