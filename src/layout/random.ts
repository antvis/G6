/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { IPointTuple } from '@g6/types';
import { BaseLayout } from './layout';

/**
 * 随机布局
 */
export default class RandomLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple;
  /** 宽度 */
  public width: number;
  /** 高度 */
  public height: number;

  public getDefaultCfg() {
    return {
      center: [0, 0],
      width: 300,
      height: 300,
    };
  }
  /**
   * 执行布局
   */
  public execute() {
    const self = this;
    const nodes = self.nodes;
    const layoutScale = 0.9;
    const center = self.center;
    const width = self.width || window.innerHeight;
    const height = self.height || window.innerWidth;
    nodes.forEach((node) => {
      node.x = (Math.random() - 0.5) * layoutScale * width + center[0];
      node.y = (Math.random() - 0.5) * layoutScale * height + center[1];
    });
  }
}
