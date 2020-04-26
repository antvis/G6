import MaskBase from './base'
import { each } from '@antv/util';

export default class MaskPath extends MaskBase {
  protected maskType = 'path'
  /**
   * 获取 Mask 的 Path
   */
  protected getMaskPath() {
    const points = this.points
    const path = []
    if (points.length) {
      each(points, (point, index) => {
        if (index === 0) {
          path.push(['M', point.x, point.y])
        } else {
          path.push(['L', point.x, point.y])
        }
      })

      path.push(['L', points[0].x, points[0].y])
    }
    return path
  }

  /**
   * 获取 Mask 的属性
   */
  protected getMaskAttrs() {
    return {
      path: this.getMaskPath()
    }
  }

  /**
   * 在 path 上增加一个点
   */
  public addPoint() {
    this.resize()
  }
}