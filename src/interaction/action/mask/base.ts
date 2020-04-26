import ActionBase from '../base'
import { IGraph } from '../../../interface/graph';
import { IGroup } from '@antv/g-base';
import Global from '../../../global'
import { each } from '_@antv_util@2.0.8@@antv/util/lib';

export default abstract class MaskBase extends ActionBase {
  protected maskShape = null
  protected origin = null
  protected points = []
  protected starting = false
  protected moving = false
  protected maskType = 'rect'

  /**
   * 触发 mask 的事件
   * @param type 事件类型
   */
  protected emitEvent(type) {
    const eventName = `mask:${type}`
    const event = this.context.event
    const graph = this.getGraph()

    graph.emit(eventName, {
      target: this.maskShape,
      shape: this.maskShape,
      points: this.points,
      x: event.x,
      y: event.y
    })
  }

  /**
   * 创建 mask
   */
  private create() {
    const event = this.context.event

    this.origin = {
      x: event.x,
      y: event.y
    }

    const currentPoint = this.getCurrentPoint()
    this.points.push(currentPoint)

    const graph: IGraph = this.getGraph()
    const group: IGroup = graph.get('group')
    const attrs = this.getMaskAttrs()
    const maskShape = group.addShape(this.maskType, {
      attrs: {
        ...Global.delegateStyle,
        ...attrs
      },
      name: 'mask-shape'
    })

    return maskShape
  }

  protected abstract getMaskAttrs(): {[key: string]: any};

  protected getMaskPath() {
    return []
  }

  protected update() {
    const attrs = this.getMaskAttrs()
    console.log(attrs)
    this.maskShape.attr(attrs)
  }

  public start() {
    this.starting = true

    if (!this.maskShape) {
      this.maskShape = this.create()
      this.maskShape.set('capture',false)
    }

    this.update()
    this.emitEvent('start')
  }

  /**
   * 开始移动 mask
   */
  public moveStart() {
    this.moving = true
    this.origin = this.getCurrentPoint()
  }

  /**
   * 移动 mask
   */
  public move() {
    if (!this.maskShape || !this.starting) {
      return
    }

    const currentPoint = this.getCurrentPoint()

    const dx = currentPoint.x - this.origin.x
    const dy = currentPoint.y - this.origin.y
    const points = this.points

    each(points, point => {
      point.x += dx
      point.y += dy
    })
    this.update()
    this.emitEvent('change')
    this.origin = currentPoint
  }

  public moveEnd() {
    this.moving = false
    this.origin = null
  }

  /**
   * 显示 mask
   */
  public show() {
    if (this.maskShape) {
      this.maskShape.show()
      this.emitEvent('show')
    }
  }

  public hide() {
    if (this.maskShape) {
      this.maskShape.hide()
      this.emitEvent('hide')
    }
  }

  public end() {
    this.starting = false
    this.emitEvent('end')
    if (this.maskShape) {
      this.maskShape.set('capture', true)
    }
  }

  public resize() {
    if (this.starting && this.maskShape) {
      this.points.push(this.getCurrentPoint())
      console.log('新做的', this.points)
      this.update()
      this.emitEvent('change')
    }
  }

  public clear() {
    this.points = []
    if (this.maskShape) {
      this.maskShape.remove()
    }

    this.maskShape = null
    this.origin = null
    this.starting = false
  }
}