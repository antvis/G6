import ActionBase from './base';
import {allowMove} from './util';
/**
 * 移动画布的 Action
 */
export default class Move extends ActionBase {
  private starting = false;
  private prePoint = null;

  /**
   * 开始
   */
  start() {
    this.starting = true;
    this.prePoint = this.getCurrentPoint();
  }

  /**
   * 移动
   */
  move() {
    // 如果没开始移动则返回
    if (!this.starting) {
      return;
    }
    const prePoint = this.prePoint;
    const currentPoint = this.getCurrentPoint();
    if (allowMove(prePoint, currentPoint)) {
      const dx = currentPoint.canvasX - prePoint.canvasX;
      const dy = currentPoint.canvasY - prePoint.canvasY;
      const graph = this.getGraph();
      graph.translate(dx, dy);
      this.prePoint = currentPoint;
    }
  }

  /**
   * 结束
   */
  end() {
    this.starting = false;
    this.prePoint = null;
  }

  /**
   * 恢复到左上角
   */
  reset() {
    const graph = this.getGraph();
    const matrix = graph.get('group').getMatrix();
    if (matrix) {
      graph.translate(matrix[6] * -1, matrix[7] * -1);
    }
  }
}