/**
 * @fileOverview layout base file
 * @author shiwu.wyy@antfin.com
 */

const Util = require('../util');
const Layout = {};

/**
 * 注册布局的方法
 * @param {string} type 布局类型，外部引用指定必须，不要与已有布局类型重名
 * @param {object} layout 行为内容
 */
Layout.registerLayout = function(type, layout) {
  if (!layout) {
    throw new Error('please specify handler for this layout:' + type);
  }
  const base = function(nodes, edges, cfg) {
    const self = this;
    self.nodes = nodes;
    self.edges = edges;
    Util.mix(self, self.getDefaultCfg(), cfg);
    self.init();
  };
  Util.augment(base, {
    /**
     * 初始化
     */
    init() {
      // const self = this;
    },
    /**
     * 执行布局，不改变原数据模型位置，只返回布局后但结果位置
     */
    excute() {
    },
    /**
     * 更新布局配置，但不执行布局
     * @param {object} cfg 需要更新的配置项
     */
    updateCfg(cfg) {
      const self = this;
      Util.mix(self, cfg);
    },
    /**
     * 销毁
     */
    destroy() {
      const self = this;
      self.positions = null;
      self.nodes = null;
      self.edges = null;
      self.destroyed = true;
    },
    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg() {}
  }, layout);
  Layout[type] = base;
};

module.exports = Layout;
