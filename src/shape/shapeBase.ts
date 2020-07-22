/**
 * @fileOverview 自定义节点和边的过程中，发现大量重复代码
 * @author dxq613@gmail.com
 */
import GGroup from '@antv/g-canvas/lib/group';
import { IShape, IElement } from '@antv/g-canvas/lib/interfaces';
import { ShapeOptions, ILabelConfig } from '../interface/shape';
import { IPoint, Item, LabelStyle, ShapeStyle, ModelConfig, EdgeConfig } from '../types';
import Global from '../global';
import { mat3, transform } from '@antv/matrix-util';
import { deepMix, each, mix, isBoolean, isPlainObject, clone } from '@antv/util';

const CLS_SHAPE_SUFFIX = '-shape';
const CLS_LABEL_SUFFIX = '-label';
export const CLS_LABEL_BG_SUFFIX = '-label-bg';

// 单个 shape 带有一个 label，共用这段代码
export const shapeBase: ShapeOptions = {
  // 默认样式及配置
  options: {},
  itemType: '', // node, edge, combo 等
  /**
   * 形状的类型，例如 circle，ellipse，polyline...
   */
  type: '',
  getCustomConfig(cfg: ModelConfig): ModelConfig {
    return {};
  },
  getOptions(cfg: ModelConfig): ModelConfig {
    return deepMix({}, this.options, this.getCustomConfig(cfg) || {}, cfg);
  },
  /**
   * 绘制节点/边，包含文本
   * @override
   * @param  {Object} cfg 节点的配置项
   * @param  {G.Group} group 节点的容器
   * @return {IShape} 绘制的图形
   */
  draw(cfg: ModelConfig, group: GGroup): IShape {
    const shape: IShape = this.drawShape!(cfg, group);
    shape.set('className', this.itemType + CLS_SHAPE_SUFFIX);
    if (cfg.label) {
      const label = this.drawLabel!(cfg, group);
      label.set('className', this.itemType + CLS_LABEL_SUFFIX);
    }
    return shape;
  },
  /**
   * 绘制完成后的操作，便于用户继承现有的节点、边
   * @param cfg
   * @param group
   * @param keyShape
   */
  afterDraw(cfg?: ModelConfig, group?: GGroup, keyShape?: IShape) { },
  drawShape(cfg?: ModelConfig, group?: GGroup): IShape {
    return null as any;
  },
  drawLabel(cfg: ModelConfig, group: GGroup): IShape {
    const { labelCfg: defaultLabelCfg } = this.getOptions(cfg) as ModelConfig;
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
    });
    if (rotate) {
      const labelBBox = label.getBBox();
      let labelMatrix = label.getMatrix();
      if (!labelMatrix) {
        labelMatrix = mat3.create();
      }
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
      label.toFront();
    }
    return label;
  },
  drawLabelBg(cfg: ModelConfig, group: GGroup, label: IElement) {
    const { labelCfg: defaultLabelCfg } = this.options as ModelConfig;
    const labelCfg = mix({}, defaultLabelCfg, cfg.labelCfg) as ILabelConfig;
    const style = this.getLabelBgStyleByPosition(label, cfg, labelCfg, group);
    const rect = group.addShape('rect', { name: 'text-bg-shape', attrs: style });
    return rect;
  },
  getLabelStyleByPosition(cfg: ModelConfig, labelCfg?: ILabelConfig, group?: GGroup): LabelStyle {
    return { text: cfg.label as string };
  },
  getLabelBgStyleByPosition(
    label: IElement,
    cfg: ModelConfig,
    labelCfg?: ILabelConfig,
    group?: GGroup,
  ): LabelStyle {
    return {};
  },

  /**
   * 获取文本的配置项
   * @param cfg 节点的配置项
   * @param labelCfg 文本的配置项
   * @param group 父容器，label 的定位可能与图形相关
   */
  getLabelStyle(cfg: ModelConfig, labelCfg: ILabelConfig, group: GGroup): LabelStyle {
    const calculateStyle = this.getLabelStyleByPosition!(cfg, labelCfg, group);
    const attrName = `${this.itemType}Label`; // 取 nodeLabel，edgeLabel 的配置项
    const defaultStyle = (Global as any)[attrName] ? (Global as any)[attrName].style : null;
    const labelStyle = Object.assign({}, defaultStyle, calculateStyle, labelCfg.style);
    return labelStyle;
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
  update(cfg: ModelConfig, item: Item) {
    (this as any).updateShapeStyle(cfg, item);
    (this as any).updateLabel(cfg, item);
  },
  updateShapeStyle(cfg: ModelConfig, item: Item) {
    const group = item.getContainer();
    const shape = item.getKeyShape();
    const shapeStyle = mix({}, shape.attr(), cfg.style);
    for (const key in shapeStyle) {
      const style = shapeStyle[key];
      if (isPlainObject(style)) {
        // 更新图元素样式，支持更新子元素
        const subShape = group.find((element) => element.get('name') === key);
        if (subShape) {
          subShape.attr(style);
        }
      } else {
        shape.attr({
          [key]: style,
        });
      }
    }
  },

  updateLabel(cfg: ModelConfig, item: Item) {
    const group = item.getContainer();
    const { labelCfg: defaultLabelCfg } = this.getOptions({}) as ModelConfig;
    const labelClassName = this.itemType + CLS_LABEL_SUFFIX;
    const label = group.find((element) => element.get('className') === labelClassName);
    const labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
    let labelBg = group.find((element) => element.get('classname') === labelBgClassname);
    // 防止 cfg.label = "" 的情况
    if (cfg.label || cfg.label === '') {
      // 若传入的新配置中有 label，（用户没传入但原先有 label，label 也会有值）
      if (!label) {
        // 若原先不存在 label，则绘制一个新的 label
        const newLabel = this.drawLabel!(cfg, group);
        newLabel.set('className', labelClassName);
      } else {
        // 若原先存在 label，则更新样式。与 getLabelStyle 不同在于这里需要融合当前 label 的样式
        // 用于融合 style 以外的属性：position, offset, ...
        let currentLabelCfg = {} as any;
        if (item.getModel) {
          currentLabelCfg = item.getModel().labelCfg;
        }
        // 这里不能去掉
        const labelCfg = deepMix({}, defaultLabelCfg, currentLabelCfg, cfg.labelCfg);

        // 获取位置信息
        const calculateStyle = (this as any).getLabelStyleByPosition(cfg, labelCfg, group);

        // 取 nodeLabel，edgeLabel 的配置项
        const cfgStyle = cfg.labelCfg ? cfg.labelCfg.style : undefined;
        const cfgBgStyle = labelCfg.style && labelCfg.style.background;

        // 需要融合当前 label 的样式 label.attr()。不再需要全局/默认样式，因为已经应用在当前的 label 上
        const labelStyle = Object.assign({}, label.attr(), calculateStyle, cfgStyle);
        const rotate = labelStyle.rotate;
        delete labelStyle.rotate;

        // 计算 label 的旋转矩阵
        if (rotate) {
          // if G 4.x define the rotateAtStart, use it directly instead of using the following codes
          let rotateMatrix = mat3.create();
          rotateMatrix = transform(rotateMatrix, [
            ['t', -labelStyle.x, -labelStyle.y],
            ['r', rotate],
            ['t', labelStyle.x, labelStyle.y],
          ]);
          label.resetMatrix();
          label.attr({ ...labelStyle, matrix: rotateMatrix });
        } else {
          label.resetMatrix();
          label.attr(labelStyle);
        }

        if (!labelBg) {
          if (labelStyle.background) {
            labelBg = this.drawLabelBg(cfg, group, label);
            labelBg.set('classname', labelBgClassname);
            label.toFront();
          }
        } else if (labelStyle.background) {
          const calculateBgStyle = (this as any).getLabelBgStyleByPosition(
            label,
            cfg,
            labelCfg,
            group,
          );
          // const labelBgStyle = Object.assign({}, labelBg.attr(), calculateBgStyle, cfgBgStyle);
          const labelBgStyle = Object.assign({}, calculateBgStyle, cfgBgStyle);
          labelBg.resetMatrix();
          if (rotate) {
            labelBg.rotateAtStart(rotate);
          }
          labelBg.attr(labelBgStyle);
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
    if (!shape) {
      return;
    }

    const type = item.getType();

    const stateName = isBoolean(value) ? name : `${name}:${value}`;
    const shapeStateStyle = this.getStateStyle(stateName, item);
    const itemStateStyle = item.getStateStyle(stateName);

    // 不允许设置一个不存在的状态
    if (!itemStateStyle && !shapeStateStyle) {
      return;
    }

    // 要设置或取消的状态的样式
    // 当没有 state 状态时，默认使用 model.stateStyles 中的样式
    const styles = mix({}, itemStateStyle || shapeStateStyle);

    const group = item.getContainer();

    if (value) {
      // style 为要设置的状态的样式
      for (const key in styles) {
        const style = styles[key];
        if (isPlainObject(style)) {
          const subShape = group.find((element) => element.get('name') === key);


          if (subShape) {
            subShape.attr(style);
          }
        } else {
          // 非纯对象，则认为是设置到 keyShape 上面的
          shape.attr({
            [key]: style,
          });
        }
      }
    } else {
      // 所有生效的 state 的样式
      const enableStatesStyle = clone(item.getCurrentStatesStyle());

      const model = item.getModel()
      // 原始样式
      // const originStyle = clone(item.getOriginStyle());
      const originStyle = mix({}, model.style, clone(item.getOriginStyle()))


      const keyShapeName = shape.get('name');
      const keyShapeStyles = shape.attr();

      // 已有样式 - 要取消的状态的样式
      const filtetDisableStatesStyle = {};

      // style 为要取消的状态的样式
      for (const p in styles) {
        const style = styles[p];
        if (isPlainObject(style)) {
          const subShape = group.find((element) => element.get('name') === p);
          if (subShape) {
            const subShapeStyles = subShape.attr();
            // const current = subShapeStyles[p]
            each(style, (v, key) => {
              if (subShapeStyles[key]) {
                delete subShapeStyles[key];
              }
            });
            filtetDisableStatesStyle[p] = subShapeStyles;
          }
        } else {
          // 从图元素现有的样式中删除本次要取消的 states 中存在的属性值
          const keptAttrs = ['x', 'y', 'cx', 'cy'];
          if (keyShapeStyles[p] && !(keptAttrs.indexOf(p) > -1)) {
            delete keyShapeStyles[p];
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
        const enableStyle = enableStatesStyle[key];
        if (!isPlainObject(enableStyle)) {
          // 把样式属性merge到keyShape中
          if (!keyShapeName) {
            mix(originStyle, {
              [key]: enableStyle,
            });
          } else {
            mix(originStyle[keyShapeName], {
              [key]: enableStyle,
            });
            delete originStyle[key]
          }
          delete enableStatesStyle[key];
        }
      }

      const originstyles = {};
      deepMix(originstyles, originStyle, filtetDisableStatesStyle, enableStatesStyle);

      for (const originKey in originstyles) {
        const style = originstyles[originKey];
        if (isPlainObject(style)) {
          const subShape = group.find((element) => element.get('name') === originKey);
          if (subShape) {
            subShape.attr(style);
          }
        } else {
          // 当更新 combo 状态时，当不存在 keyShapeName 时候，则认为是设置到 keyShape 上面的
          if (type === 'combo') {
            !keyShapeName &&
              shape.attr({
                [originKey]: style,
              });
          } else {
            shape.attr({
              [originKey]: style,
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
      return mix({}, modelStateStyle);
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
    const { anchorPoints } = this.getOptions(cfg) as ModelConfig;
    return anchorPoints;
  },
};
