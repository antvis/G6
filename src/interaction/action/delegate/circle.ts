import DelagateBase from './base'
import { IGraph } from '../../../interface/graph';
import { IGroup } from '@antv/g-base';
import Global from '../../../global'

export default class DelagateCircle extends DelagateBase {

  /**
   * 创建 delegate
   */
  public create() {
    this.type = 'circle'
    this.origin = this.getCurrentPoint()

    const graph: IGraph = this.getGraph()
    const group: IGroup = graph.get('group')
    const { x: cx, y: cy, width, height, minX, minY } = this.calculationGroupPosition()

    this.originDelegate = { x: cx, y: cy, width, height, minX, minY }

    this.delegateShape = group.addShape('circle', {
      attrs: {
        r: width > height ? width / 2 : height / 2,
        x: cx + width / 2,
        y: cy + height / 2,
        ...Global.delegateStyle
      },
      name: 'circle-delegate-shape',
      capture: false
    })
  }
}