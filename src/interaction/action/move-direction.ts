import ActionBase from './base';

/**
 * 指定方向移动画布
 */
export default class MoveDirection extends ActionBase {
  // 移动的距离
  private moveDistance = 10;  
  private move(dx, dy) {
    const graph = this.getGraph();
    graph.translate(dx, dy);
  }
  /**
   * 向上移动
   */
  up() {
    this.move(0, -this.moveDistance);
  }

  /**
   * 向下移动
   */
  down() {
    this.move(0, this.moveDistance);
  }

  /**
   * 向左移动
   */
  left() {
    this.move(-this.moveDistance, 0);
  }

  /**
   * 向右移动
   */
  right() {
    this.move(this.moveDistance, 0);
  }

  reset() {

  }
}