import MaskBase from './base'
import { distance } from '../../../util/math'

export default class MaskCircle extends MaskBase {
  protected maskType = 'circle'

  /**
   * 获取mask的属性
   */
  protected getMaskAttrs(): {[key: string]: any} {
    const currentPoint = this.getCurrentPoint()
    const r = distance(this.startPoint, currentPoint) / 2;
    const x = (currentPoint.x + this.startPoint.x) / 2;
    const y = (currentPoint.y + this.startPoint.y) / 2;
    return {
      x,
      y,
      r
    };
  }
}