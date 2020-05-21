import { ICombo, INode } from '../interface/item';
import Group from '@antv/g-canvas/lib/group';
import Node from './node';
import { ComboConfig, IBBox, IShapeBase } from '../types';
import Global from '../global';
import { getBBox } from '../util/graphic';


const CACHE_BBOX = 'bboxCache';
const CACHE_CANVAS_BBOX = 'bboxCanvasCache';
const CACHE_SIZE = 'sizeCache';

export default class Combo extends Node implements ICombo {
  public getDefaultCfg() {
    return {
      type: 'combo',
      nodes: [],
      edges: [],
      combos: []
    }
  }

  public getShapeCfg(model: ComboConfig): ComboConfig {
    const styles = this.get('styles');
    const bbox = this.get('bbox');
    if (styles) {
      // merge graph的item样式与数据模型中的样式
      const newModel = model;
      const itemType = this.getType();
      const size = {
        r: Math.hypot(bbox.height, bbox.width) / 2 || Global.defaultCombo.size[0] / 2,
        width: bbox.width || Global.defaultCombo.size[0],
        height: bbox.height || Global.defaultCombo.size[1]
      };
      this.set(CACHE_SIZE, size);
      newModel.style = Object.assign({}, styles, model.style, size);
      return newModel;
    }
    return model;
  }


  /**
   * 根据 keyshape 计算包围盒
   */
  public calculateCanvasBBox(): IBBox {
    const keyShape: IShapeBase = this.get('keyShape');
    const group: Group = this.get('group');
    // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒
    const bbox = getBBox(keyShape, group);
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.centerX = (bbox.minX + bbox.maxX) / 2;
    bbox.centerY = (bbox.minY + bbox.maxY) / 2;
    const cacheSize = this.get(CACHE_SIZE);
    if (cacheSize) {
      const keyShape: IShapeBase = this.get('keyShape');
      const type: string = keyShape.get('type');
      if (type === 'circle') {
        bbox.width = cacheSize.r * 2;
        bbox.height = cacheSize.r * 2;
      } else {
        bbox.width = cacheSize.width;
        bbox.height = cacheSize.height;
      }
      bbox.minX = bbox.centerX - bbox.width / 2;
      bbox.minY = bbox.centerY - bbox.height / 2;
      bbox.maxX = bbox.centerX + bbox.width / 2;
      bbox.maxY = bbox.centerY + bbox.height / 2;
    } else {
      bbox.width = bbox.maxX - bbox.minX;
      bbox.height = bbox.maxY - bbox.minY;
    }
    return bbox;
  }

  /**
   * 获取 Combo 中所有的子元素，包括 Combo、Node 及 Edge
   */
  public getChildren(): { nodes: INode[], combos: ICombo[]} {
    const self = this;
    return {
      nodes: self.getNodes(),
      combos: self.getCombos()
    }
  }

  /**
   * 获取 Combo 中所有子节点
   */
  getNodes(): INode[] {
    const self = this;
    return self.get('nodes');
  }

  /**
   * 获取 Combo 中所有子 combo
   */
  getCombos(): ICombo[] {
    const self = this;
    return self.get('combos');
  }

  /**
   * 向 Combo 中增加子 combo 或 node
   * @param item Combo 或节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addChild(item: ICombo | INode): boolean {
    const self = this;
    const itemType = item.getType();
    switch(itemType) {
      case 'node':
        self.addNode(item);
        break;
      case 'combo':
        self.addCombo(item as ICombo);
        break;
      default: 
        console.warn('Only node or combo items are allowed to be added into a combo');
        return false;
    }
    return true;
  }
  

  /**
   * 向 Combo 中增加 combo
   * @param combo Combo 实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addCombo(combo: ICombo): boolean {
    const self = this;
    self.get('combos').push(combo);
    return true;
  }

  /**
   * 向 Combo 中添加节点
   * @param node 节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addNode(node: string | INode): boolean {
    const self = this;
    self.get('nodes').push(node);
    return true;
  }

  /**
   * 向 Combo 中增加子 combo 或 node
   * @param item Combo 或节点实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  removeChild(item: ICombo | INode): boolean {
    const self = this;
    const itemType = item.getType();
    switch(itemType) {
      case 'node':
        self.removeNode(item);
        break;
      case 'combo':
        self.removeCombo(item as ICombo);
        break;
      default: 
        console.warn('Only node or combo items are allowed to be added into a combo');
        return false;
    }
    return true
  }


  /**
   * 从 Combo 中移除指定的 combo
   * @param combo Combo 实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeCombo(combo: ICombo): boolean {
    const combos = this.getCombos();
    const index = combos.indexOf(combo);
    if (index > -1) {
      combos.splice(index, 1);
      return true;
    }
    return false;
  }

   /**
   * 向 Combo 中移除指定的节点
   * @param node 节点实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeNode(node: INode): boolean {
    const nodes = this.getNodes();
    const index = nodes.indexOf(node);
    if (index > -1) {
      nodes.splice(index, 1);
      return true;
    }
    return false;
  }

  public isOnlyMove(cfg?: ComboConfig): boolean {
    return false;
  }
 

  public clearCache() {
    this.set(CACHE_BBOX, null); // 清理缓存的 bbox
    this.set(CACHE_CANVAS_BBOX, null);
  }
}