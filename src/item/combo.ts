import { ICombo, INode, IEdge } from '../interface/item'
import Node from './node'
import { IBBox } from '../types';

export default class Combo extends Node implements ICombo {
  public getDefaultCfg() {
    return {
      type: 'combo',
      nodes: [],
      edges: []
    }
  }

  /**
   * 获取 Combo 中所有的子元素，包括 Combo、Node 及 Edge
   */
  public getChildrens(): ICombo[] | IEdge[] {
    return []
  }

  /**
   * 获取 Combo 中所有节点
   */
  getComboNodes(): INode[] {
    return []
  }

  /**
   * 获取 Combo 的 BBox
   */
  getBBox(): IBBox {
    return 
  }

  /**
   * 向 Combo 中增加 combo
   * @param combo Combo ID 或 Combo实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addCombo(combo: string | ICombo): boolean {
    return true
  }

  /**
   * 从 Combo 中移除指定的 combo
   * @param combo Combo ID 或 Combo实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeCombo(combo: string | ICombo): boolean {
    return true
  }

  /**
   * 向 Combo 中添加节点
   * @param node 节点ID或实例
   * @return boolean 添加成功返回 true，否则返回 false
   */
  addNode(node: string | INode): boolean {
    return true
  }

   /**
   * 向 Combo 中移除指定的节点
   * @param node 节点ID或实例
   * @return boolean 移除成功返回 true，否则返回 false
   */
  removeNode(node: string | INode): boolean {
    return true
  }
}