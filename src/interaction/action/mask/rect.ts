import MaskBase from './base'

export default class MaskRect extends MaskBase {
  protected maskType = 'rect'

  /**
   * 获取mask的属性
   */
  protected getMaskAttrs(): {[key: string]: any} {
    const currentPoint = this.getCurrentPoint()
    const x = Math.min(this.origin.x, currentPoint.x);
    const y = Math.min(this.origin.y, currentPoint.y);
    const width = Math.abs(currentPoint.x - this.origin.x);
    const height = Math.abs(currentPoint.y - this.origin.y);
    return {
      x,
      y,
      width,
      height
    }
  }
}