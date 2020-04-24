import ActionBase from './base'
import { IGraph } from '../../interface/graph'
import { INode } from '../../interface/item'
import { NodeConfig, IPoint } from '../../types'
import { G6GraphEvent } from '../../interface/behavior';
import { IShape } from '@antv/g-base/lib/interfaces';
import { IGroup } from '_@antv_g-svg@0.4.4@@antv/g-svg/lib/interfaces';

export default class MoveNodeWithDelegate extends ActionBase {
  private origin = null
  private starting = false
  private point = {}
  private targets: INode[] = []
  private delegateShape: IShape = null

  /**
   *  开始拖动指定节点
   *
   * @memberof DragNode
   */
  start() {
    const event = (this as any).context.event
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

  private update(item: INode) {
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

  private updateDelegate(evt: G6GraphEvent, x, y) {
    const { item } = evt
    const bbox = item.get('keyShape').getBBox()

    const graph: IGraph = this.getGraph()
    if (!this.delegateShape) {
      const group: IGroup = graph.get('group')
      
    }
  }
}