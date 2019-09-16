/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');

/**
 * 随机布局
 */
Layout.registerLayout('random', {
  layoutType: 'random',
  getDefaultCfg() {
    return {
      center: [ 0, 0 ]           // 布局中心
    };
  },
  /**
   * 执行布局
   */
  excute() {
    const self = this;
    const nodes = self.nodes;
    const layoutScale = 0.9;
    const center = self.center;
    const semiWidth = (self.width - center[0]) > center[0] ? center[0] : (self.width - center[0]);
    const semiHeight = (self.height - center[1]) > center[1] ? center[1] : (self.height - center[1]);
    nodes.forEach(node => {
      node.x = (Math.random() - 0.5) * layoutScale * semiWidth + center[0];
      node.y = (Math.random() - 0.5) * layoutScale * semiHeight + center[1];
    });
  }
});
