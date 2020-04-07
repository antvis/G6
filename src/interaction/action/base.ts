
import {Action} from '@antv/interaction';
import {IGraph} from '../../interface/graph';
import { Point } from '../../types/index';
/**
 * G6 Action 的基类
 */
export default class ActionBase extends Action {

  /**
   * 当前的 graph
   */
  protected getGraph() {
    return this.context.source as IGraph;
  }

  /**
   * 触发事件的位置
   */
  protected getCurrentPoint(): Point {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
      canvasX: event.canvasX,
      canvasY: event.canvasY
    };
  }

  /**
   * 触发事件的图形
   */
  protected getCurrentShape() {
    return this.context.event.shape;
  }
}