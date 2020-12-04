/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

import { IPointTuple } from '../types';
import { BaseLayout } from './layout';

/**
 * 随机布局
 */
export default class RandomLayout extends BaseLayout {
  /** 布局中心 */
  public center: IPointTuple = [0, 0];

  /** 宽度 */
  public width: number = 300;

  /** 高度 */
  public height: number = 300;

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
    if (!self.width && typeof window !== 'undefined') {
      self.width = window.innerWidth;
    }
    if (!self.height && typeof window !== 'undefined') {
      self.height = window.innerHeight;
    }

    if (nodes) {
      nodes.forEach((node) => {
        node.x = (Math.random() - 0.5) * layoutScale * self.width + center[0];
        node.y = (Math.random() - 0.5) * layoutScale * self.height + center[1];
      });
    }
  }
}
