import { isString, isPlainObject, isNil, mix, each, isArray, deepMix, indexOf } from '@antv/util';
import { IEdge, INode, ICombo } from '../interface/item';
import { IGroup } from '@antv/g-base';
import {
  IShapeBase,
  ModelConfig,
  ShapeStyle,
  EdgeConfig,
  IPoint,
  NodeConfig,
  SourceTarget,
  Indexable,
} from '../types';
import Shape from '../shape/shape';
import Item from './item';
import Node from './node';
import Global from '../global';

const END_MAP: Indexable<string> = { source: 'start', target: 'end' };
const ITEM_NAME_SUFFIX = 'Node'; // 端点的后缀，如 sourceNode, targetNode
const POINT_NAME_SUFFIX = 'Point'; // 起点或者结束点的后缀，如 startPoint, endPoint
const ANCHOR_NAME_SUFFIX = 'Anchor';
const ARROWS = ['startArrow', 'endArrow'];

export default class Edge extends Item implements IEdge {
  protected getDefaultCfg() {
    return {
      type: 'edge',
      sourceNode: null,
      targetNode: null,
      startPoint: null,
      endPoint: null,
      linkCenter: false,
    };
  }

  private setEnd(name: SourceTarget, value: INode) {
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const itemName = name + ITEM_NAME_SUFFIX;
    const preItem = this.get(itemName);
    if (preItem && !preItem.destroyed) {
      // 如果之前存在节点，则移除掉边
      preItem.removeEdge(this);
    }

    if (isPlainObject(value)) {
      // 如果设置成具体的点，则清理节点
      this.set(pointName, value);
      this.set(itemName, null);
    } else {
      value!.addEdge(this);
      this.set(itemName, value);
      this.set(pointName, null);
    }
  }

  /**
   * 获取连接点的坐标
   * @param name source | target
   * @param model 边的数据模型
   * @param controlPoints 控制点
   */
  private getLinkPoint(name: SourceTarget, model: EdgeConfig, controlPoints: IPoint[]): IPoint {
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const itemName = name + ITEM_NAME_SUFFIX;
    let point = this.get(pointName);
    if (!point) {
      const item = this.get(itemName);
      const anchorName = name + ANCHOR_NAME_SUFFIX;
      const prePoint = this.getPrePoint(name, controlPoints);
      const anchorIndex = model[anchorName];
      if (!isNil(anchorIndex)) {
        // 如果有锚点，则使用锚点索引获取连接点
        point = item.getLinkPointByAnchor(anchorIndex);
      }
      // 如果锚点没有对应的点或者没有锚点，则直接计算连接点
      point = point || item.getLinkPoint(prePoint);
      if (!isNil(point.index)) {
        this.set(`${name}AnchorIndex`, point.index);
      }
    }
    return point;
  }

  /**
   * 获取同端点进行连接的点，计算交汇点
   * @param name
   * @param controlPoints
   */
  private getPrePoint(name: SourceTarget, controlPoints: IPoint[]): NodeConfig | IPoint {
    if (controlPoints && controlPoints.length) {
      const index = name === 'source' ? 0 : controlPoints.length - 1;
      return controlPoints[index];
    }
    const oppositeName = name === 'source' ? 'target' : 'source'; // 取另一个节点的位置
    return this.getEndPoint(oppositeName);
  }

  /**
   * 获取端点的位置
   * @param name
   */
  private getEndPoint(name: SourceTarget): NodeConfig | IPoint {
    const itemName = name + ITEM_NAME_SUFFIX;
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const item = this.get(itemName);
    // 如果有端点，直接使用 model
    if (item) {
      return item.get('model');
    } // 否则直接使用点
    return this.get(pointName);
  }

  /**
   * 通过端点的中心获取控制点
   * @param model
   */
  private getControlPointsByCenter(model: EdgeConfig) {
    const sourcePoint = this.getEndPoint('source');
    const targetPoint = this.getEndPoint('target');
    const shapeFactory = this.get('shapeFactory');
    const type = model.type;
    return shapeFactory.getControlPoints(type, {
      startPoint: sourcePoint,
      endPoint: targetPoint,
    });
  }

  private getEndCenter(name: SourceTarget): IPoint {
    const itemName = name + ITEM_NAME_SUFFIX;
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const item = this.get(itemName);
    // 如果有端点，直接使用 model
    if (item) {
      const bbox = item.getBBox();
      return {
        x: bbox.centerX,
        y: bbox.centerY,
      };
    } // 否则直接使用点
    return this.get(pointName);
  }

  protected init() {
    super.init();
    // 初始化两个端点
    this.setSource(this.get('source'));
    this.setTarget(this.get('target'));
  }

  public getShapeCfg(model: EdgeConfig): EdgeConfig {
    const self = this;
    const linkCenter: boolean = self.get('linkCenter'); // 如果连接到中心，忽视锚点、忽视控制点
    const cfg = super.getShapeCfg(model) as EdgeConfig;

    if (linkCenter) {
      cfg.startPoint = self.getEndCenter('source');
      cfg.endPoint = self.getEndCenter('target');
    } else {
      const controlPoints = cfg.controlPoints || self.getControlPointsByCenter(cfg);
      cfg.startPoint = self.getLinkPoint('source', model, controlPoints);
      cfg.endPoint = self.getLinkPoint('target', model, controlPoints);
    }
    cfg.sourceNode = self.get('sourceNode');
    cfg.targetNode = self.get('targetNode');
    return cfg;
  }

  /**
   * 获取边的数据模型
   */
  public getModel(): EdgeConfig {
    const out: EdgeConfig = this.get('model');
    const sourceItem = this.get(`source${ITEM_NAME_SUFFIX}`);
    const targetItem = this.get(`target${ITEM_NAME_SUFFIX}`);
    if (sourceItem) {
      delete out[`source${ITEM_NAME_SUFFIX}`];
    } else {
      out.source = this.get(`start${POINT_NAME_SUFFIX}`);
    }

    if (targetItem) {
      delete out[`target${ITEM_NAME_SUFFIX}`];
    } else {
      out.target = this.get(`end${POINT_NAME_SUFFIX}`);
    }

    if (!isString(out.source) && !isPlainObject(out.source)) {
      out.source = (out.source as any).getID();
    }

    if (!isString(out.target) && !isPlainObject(out.target)) {
      out.target = (out.target as any).getID();
    }

    return out;
  }

  public setSource(source: INode | ICombo) {
    this.setEnd('source', source);
    this.set('source', source);
  }

  public setTarget(target: INode | ICombo) {
    this.setEnd('target', target);
    this.set('target', target);
  }

  public getSource(): INode | ICombo {
    return this.get('source');
  }

  public getTarget(): INode | ICombo {
    return this.get('target');
  }

  public updatePosition() {}

  /**
   * 边不需要重计算容器位置，直接重新计算 path 位置
   * @param {object} cfg 待更新数据
   */
  public update(cfg: EdgeConfig, onlyMove: boolean = false) {
    const model: EdgeConfig = this.get('model');
    const oriVisible = model.visible;
    const cfgVisible = cfg.visible;
    if (oriVisible !== cfgVisible && cfgVisible !== undefined) this.changeVisibility(cfgVisible);

    const styles = this.get('styles');
    if (cfg.stateStyles) {
      // 更新 item 时更新 this.get('styles') 中的值
      const { stateStyles } = cfg;
      mix(styles, stateStyles);
      delete cfg.stateStyles;
    }

    Object.assign(model, cfg);
    this.updateShape();
    this.afterUpdate();
    this.clearCache();
  }

  /**
   * 设置图元素原始样式
   * @param keyShape 图元素 keyShape
   * @param group Group 容器
   */
  public setOriginStyle(cfg?: ModelConfig) {
    const group: IGroup = this.get('group');
    const children = group.get('children');
    const keyShape: IShapeBase = this.getKeyShape();
    const self = this;
    const keyShapeName = keyShape.get('name');

    if (!this.get('originStyle')) {
      // 第一次 set originStyle，直接拿首次渲染所有图形的 attrs
      const originStyles = {};
      each(children, (child) => {
        const shapeType = child.get('type');
        const name = child.get('name');
        if (name && name !== keyShapeName) {
          originStyles[name] =
            shapeType !== 'image' ? child.attr() : self.getShapeStyleByName(name);
        } else {
          const keyShapeStyle: ShapeStyle = self.getShapeStyleByName(); // 可优化，需要去除 child.attr 中其他 shape 名的对象
          if (keyShapeStyle.path) delete keyShapeStyle.path;
          if (keyShapeStyle.matrix) delete keyShapeStyle.matrix;
          if (!keyShapeName) {
            Object.assign(originStyles, keyShapeStyle);
          } else {
            originStyles[keyShapeName] = keyShapeStyle;
          }
        }
      });
      self.set('originStyle', originStyles);
    } else {
      // 第二次 set originStyles，需要找到不是 stateStyles 的样式，更新到 originStyles 中

      // 上一次设置的 originStyle，是初始的 shape attrs
      let styles: ShapeStyle = this.getOriginStyle();
      // let styles: ShapeStyle = {};
      if (keyShapeName && !styles[keyShapeName]) styles[keyShapeName] = {};

      // 获取当前状态样式
      const currentStatesStyle = this.getCurrentStatesStyle();

      // 遍历当前所有图形的 attrs，找到不是 stateStyles 的样式更新到 originStyles 中
      each(children, (child) => {
        const name = child.get('name');
        const shapeAttrs = child.attr();
        if (name && name !== keyShapeName) {
          // 有 name 的非 keyShape 图形
          const shapeStateStyle = currentStatesStyle[name];
          if (!styles[name]) styles[name] = {};
          shapeStateStyle &&
            Object.keys(shapeAttrs).forEach((key) => {
              const value = shapeAttrs[key];
              if (value !== shapeStateStyle[key]) styles[name][key] = value;
            });
        } else {
          const shapeAttrs = child.attr();
          const keyShapeStateStyles = Object.assign(
            {},
            currentStatesStyle,
            currentStatesStyle[keyShapeName],
          );
          Object.keys(shapeAttrs).forEach((key) => {
            const value = shapeAttrs[key];
            // 如果是对象且不是 arrow，则是其他 shape 的样式
            if (isPlainObject(value) && ARROWS.indexOf(name) === -1) return;
            if (keyShapeStateStyles[key] !== value) {
              if (keyShapeName) styles[keyShapeName][key] = value;
              else styles[key] = value;
            }
          });
        }
      });

      if (styles.path) delete styles.path;
      if (styles.matrix) delete styles.matrix;
      self.set('originStyle', styles);
    }
  }

  public destroy() {
    const sourceItem: Node = this.get(`source${ITEM_NAME_SUFFIX}`);
    const targetItem: Node = this.get(`target${ITEM_NAME_SUFFIX}`);
    if (sourceItem && !sourceItem.destroyed) {
      sourceItem.removeEdge(this);
    }

    if (targetItem && !targetItem.destroyed) {
      targetItem.removeEdge(this);
    }
    super.destroy();
  }
}
