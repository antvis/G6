import ModeNodeBase from './move-node-base'
import { IGraph } from '../../../interface/graph'
import { INode } from '../../../interface/item'
import { G6GraphEvent } from '../../../interface/behavior';
import { IShape } from '@antv/g-base/lib/interfaces';
import { IGroup } from '@antv/g-base/lib/interfaces';
import Global from '../../../global';

export default class MoveNodeWithDelegate extends ModeNodeBase {
  private originDelegate = {}
  private delegateShape: IShape = null

  /**
   * 拖动指定节点
   *
   * @memberof DragNode
   */
  move() {
    if (!this.starting) {
      return
    }

    this.updateDelegate()
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

    // 拖动结束后，清除 delegate 图形
    if (this.delegateShape) {
      this.delegateShape.remove()
      this.delegateShape = null
    }

    this.targets.map(node => this.update(node))

    this.origin = null;
    this.targets.length = 0;
    this.point = {}
    this.originDelegate = {}
  }

  /**
   * 计算delegate位置，包括左上角左边及宽度和高度
   * @memberof ItemGroup
   * @return {object} 计算出来的delegate坐标信息及宽高
   */
  private calculationGroupPosition() {
    const evt = this.context.event as G6GraphEvent
    const graph: IGraph = this.getGraph()
    const { item } = evt

    const nodes = graph.findAllByState('node', 'selected');

    const currentNodeId = item.get('id');

    // 当前拖动的节点是否是选中的节点
    const dragNodes = nodes.filter(node => {
      const nodeId = node.get('id');
      return currentNodeId === nodeId;
    });

    // 如果当前拖动的元素不是选中的元素，则说明只拖动当前一个元素
    if (dragNodes.length === 0) {
      nodes.length = 0
      nodes.push(item)
    }

    let minx = Infinity;
    let maxx = -Infinity;
    let miny = Infinity;
    let maxy = -Infinity;

    // 获取已节点的所有最大最小x y值
    for (let i = 0; i < nodes.length; i++) {
      const element = nodes[i];
      const bbox = element.getBBox();
      const { minX, minY, maxX, maxY } = bbox;
      if (minX < minx) {
        minx = minX;
      }

      if (minY < miny) {
        miny = minY;
      }

      if (maxX > maxx) {
        maxx = maxX;
      }

      if (maxY > maxy) {
        maxy = maxY;
      }
    }

    const x = Math.floor(minx);
    const y = Math.floor(miny);
    const width = Math.ceil(maxx) - Math.floor(minx);
    const height = Math.ceil(maxy) - Math.floor(miny);

    return {
      x,
      y,
      width,
      height,
      minX: minx,
      minY: miny,
    };
  } 

  private updateDelegate() {
    const evt = this.context.event as G6GraphEvent

    if (!this.delegateShape) {
      const graph: IGraph = this.getGraph()
      const group: IGroup = graph.get('group')
      const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition()

      this.originDelegate = { x: cx, y: cy, width, height, minX, minY }

      this.delegateShape = group.addShape('rect', {
        attrs: {
          width,
          height,
          x: cx,
          y: cy,
          ...Global.delegateStyle
        },
        name: 'rect-delegate-shape',
        capture: false
      })
    } else {
      const clientX = evt.x - this.origin.x + this.originDelegate.minX;
      const clientY = evt.y - this.origin.y + this.originDelegate.minY;

      this.delegateShape.attr({
        x: clientX,
        y: clientY
      })
    }
  }
}