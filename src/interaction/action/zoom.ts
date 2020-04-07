import ActionBase from './base';
import { isNil } from '@antv/util';

/**
 * 缩放的 Action
 */
export default class Zoom extends ActionBase {
  // 缩放的比例
  private zoomRatio = 0.1;
  // 获取缩放的中心点
  private getCenter(graph) {
    const point = this.getCurrentPoint();
    if (isNil(point.canvasX)) {
      const dx = graph.get('width') / 2;
      const dy = graph.get('height') / 2;
      return graph.getPointByCanvas(dx, dy);
    }
    return {
      x: point.canvasX,
      y: point.canvasY
    };
  }

  // 缩放
  private zoom(ratio) {
    const graph = this.getGraph();
    const center = this.getCenter(graph);
    graph.zoom(ratio, center);
  }

  /**
   * 缩小
   */
  zoomIn() {
    this.zoom(1 - this.zoomRatio);
  }

  /**
   * 放大，需要保证 zoom 的对称
   */
  zoomOut() {
    this.zoom( 1 / (1 - this.zoomRatio));
  }

  /**
   * 恢复原始状态
   */
  reset() {
    const graph = this.getGraph();
    const center = this.getCenter(graph);
    graph.zoomTo(1, center);
  }
}