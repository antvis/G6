const Util = require('../util');
const Behavior = {};

/**
 * 注册行为的方法
 * @param {string} type 行为类型，外部引用指定必须，不要与已有行为类型重名
 * @param {object} behavior 行为内容,包含元素详见augment内容
 */
Behavior.registerBehavior = function(type, behavior) {
  if (!behavior) {
    throw new Error('please specify handler for this behavior:' + type);
  }
  const base = function(cfg) {
    const self = this;
    Util.mix(self, self.getDefaultCfg(), cfg);
    const events = self.getEvents();
    if (events) {
      const eventsToBind = {};
      Util.each(events, (handler, event) => {
        eventsToBind[event] = Util.wrapBehavior(self, handler);
      });
      this._events = eventsToBind;
    }
  };
  Util.augment(base, {
    /**
     * 是否阻止行为发生，默认不阻止
     * @return {boolean} 返回false时不触发行为
     */
    shouldBegin() {
      return true;
    },
    /**
     * 是否阻止行为更新数据，更改视图
     * @return {boolean} 返回false时更新数据
     */
    shouldUpdate() {
      return true;
    },
    /**
     * 是否阻止行为进入终止态
     * @return {boolean} 返回false时阻止
     */
    shouldEnd() {
      return true;
    },
    /**
     * 定义行为的事件监听handler，behavior内部会自动绑定事件。
     * 例如： return { click: 'onClick' }, 内部会监听graph的click事件，触发this.onClick
     */
    getEvents() {},
    /**
     * 绑定事件，默认绑定getEvents返回事件，不需要复写
     * @param {object} graph 画布实例
     */
    bind(graph) {
      const events = this._events;
      this.graph = graph;
      Util.each(events, (handler, event) => {
        graph.on(event, handler);
      });
    },
    /**
     * 解绑事件，多用于切换行为模式，默认解绑getEvents返回事件，复写bind时需要同时复写unbind
     * @param {object} graph 画布实例
     */
    unbind(graph) {
      const events = this._events;
      Util.each(events, (handler, event) => {
        graph.off(event, handler);
      });
    },
    get(val) {
      return this[val];
    },
    set(key, val) {
      this[key] = val;
      return this;
    },
    /**
     * 定义自定义行为的默认参数，会与用户传入的参数进行合并
     */
    getDefaultCfg() {}
  }, behavior);
  Behavior[type] = base;
};

Behavior.hasBehavior = function(type) {
  return !!Behavior[type];
};

Behavior.getBehavior = function(type) {
  return Behavior[type];
};

module.exports = Behavior;

