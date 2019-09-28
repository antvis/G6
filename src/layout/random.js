/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */

const Layout = require('./layout');

/**
 * 随机布局
 */
Layout.registerLayout('random', {
  getDefaultCfg() {
    return {
      center: [ 0, 0 ],           // 布局中心
      height: 300,
      width: 300
    };
  },
  /**
   * 执行布局
   */
  execute() {
    const self = this;
    const nodes = self.nodes;
    const layoutScale = 0.9;
    const center = self.center;
    const width = self.width;
    const height = self.height;
    nodes.forEach(node => {
      node.x = (Math.random() - 0.5) * layoutScale * width + center[0];
      node.y = (Math.random() - 0.5) * layoutScale * height + center[1];
    });
  }
});
