import DelagateBase from './base'
import { IGraph } from '../../../interface/graph';
import { IGroup } from '@antv/g-base';
import Global from '../../../global'

export default class DelegateReact extends DelagateBase {
  /**
   * 创建 delegate
   */
  public create() {
    this.type = 'rect'
    this.origin = this.getCurrentPoint()

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
  }
}