/**
 * @fileOverview layout base file
 * @author shiwu.wyy@antfin.com
 */

const Util = require('../util/layout');
const Layout = {};

/**
 * 注册布局的方法
 * @param {string} type 布局类型，外部引用指定必须，不要与已有布局类型重名
 * @param {object} layout 布局方法
 */
Layout.registerLayout = function(type, layout) {
  if (!layout) {
    throw new Error('please specify handler for this layout:' + type);
  }
  const base = function(cfg) {
    const self = this;
    Util.mix(self, self.getDefaultCfg(), cfg);
  };
  Util.augment(base, {
    /**
     * 初始化
     * @param {object} data 数据
     */
    init(data) {
      const self = this;
      self.nodes = data.nodes;
      self.edges = data.edges;
    },
    /**
     * 执行布局
     */
    execute() {
    },
    /**
     * 根据传入的数据进行布局
     * @param {object} data 数据
     */
    layout(data) {
      const self = this;
      self.init(data);
      self.execute();
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
