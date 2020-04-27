import ActionBase from '../base'
import { IGraph } from '../../../interface/graph';
import { each } from '@antv/util';
import { INode } from '../../../interface/item';
import { isMask, getMaskedElements, getIntersectElements } from '../util';
import { Item } from '../../../types';

export default class StateBase extends ActionBase {
  protected stateName = ''
  protected startPoint = null
  protected endPoint = null
  protected isStarted = false

  /**
   * 获取所有选中的元素
   */
  private getIntersectElements() {
    this
    let elements = null
    if (isMask(this.context)) {
      elements = getMaskedElements(this.context, 10)
    } else {
      const startPoint = this.startPoint
      const endPoint = this.isStarted ? this.getCurrentPoint() : this.endPoint

      if (!startPoint || !endPoint) {
        return
      }

      // 计算框选范围
      const box = {
        minX: Math.min(startPoint.x, endPoint.x),
        minY: Math.min(startPoint.y, endPoint.y),
        maxX: Math.max(startPoint.x, endPoint.x),
        maxY: Math.max(startPoint.y, endPoint.y),
      };

      const graph = this.getGraph()
      elements = getIntersectElements(graph, box)
    }
    return elements
  }

  public start() {
    this.clear()
    this.startPoint = this.getCurrentPoint()
    this.isStarted = true
  }

  public end() {
    this.isStarted = false
    this.endPoint = this.getCurrentPoint()
  }

  public highlight() {
    if (!this.isStarted) {
      return
    }
    const elements = this.getIntersectElements()
    const graph = this.getGraph()
    console.log('选中的元素', elements)
    each(elements, (element: Item) => {
      graph.setItemState(element, 'selected', true)
    })
  }

  public clear() {
    const graph: IGraph = this.getGraph()
    const elements = graph.findAllByState('node', this.stateName)
    each(elements, (element: INode) => {
      graph.clearItemStates(element, this.stateName)
    })

    this.isStarted = false
    this.startPoint = null
    this.endPoint = null
  }
}