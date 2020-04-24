import ActionBase from '../base'
import { IGraph } from '../../../interface/graph'
import { INode } from '../../../interface/item'
import { NodeConfig, IPoint } from '../../../types'

export default class MoveNode extends ActionBase {
  protected origin = null
  protected starting = false
  protected point = {}
  protected targets: INode[] = []

  /**
   *  开始拖动指定节点
   *
   * @memberof DragNode
   */
  start() {
    const event = this.context.event
    const { target, item } = event

    // 如果拖动的target 是linkPoints / anchorPoints 则不允许拖动
    if (target) {
      const isAnchorPoint = target.get('isAnchorPoint');
      if (isAnchorPoint) {
        return;
      }
    }

    this.starting = true
    this.origin = this.getCurrentPoint()

    const group = item.getContainer()
    group.set('capture', false)

    const graph: IGraph = this.getGraph()

    // 获取所有选中的元素
    const nodes = graph.findAllByState('node', 'selected')

    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter(node => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 只拖动当前节点
    if (dragNodes.length === 0) {
      this.targets.push(item);
    } else if (nodes.length > 1) {
      // 拖动多个节点
      nodes.forEach((node: INode) => {
        const locked = node.hasLocked();
        if (!locked) {
          this.targets.push(node);
        }
      });
    } else {
      this.targets.push(item);
    }
  }
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
    
  }

  protected update(item: INode) {
    const { origin } = this;
    const evt = this.context.event
    const graph: IGraph = this.getGraph()

    const model: NodeConfig = item.get('model');
    const nodeId: string = item.get('id');

    if (!this.point[nodeId]) {
      this.point[nodeId] = {
        x: model.x,
        y: model.y,
      };
    }

    const x: number = evt.x - origin.x + this.point[nodeId].x;
    const y: number = evt.y - origin.y + this.point[nodeId].y;

    const pos: IPoint = { x, y };

    graph.updateItem(item, pos);
  }
}