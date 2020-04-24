import MoveNodeBase from './move-node-base'
import { INode } from '../../interface/item'

export default class MoveNode extends MoveNodeBase {
  /**
   * 拖动指定节点
   *
   * @memberof DragNode
   */
  move() {
    if (!this.starting) {
      return
    }

    this.targets.map(target => this.update(target))
  }

  /**
   * 拖动结束
   *
   * @memberof DragNode
   */
  end() {
    if (!this.starting) {
      return
    }
    
    const evt = this.context.event
    const item: INode = evt.item
    const group = item.getContainer()
    group.set('capture', true)

    this.origin = null;
    this.targets.length = 0;
    this.point = {}
  }
}