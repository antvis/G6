const Util = require('../util');
const Behavior = {};

Behavior.registerBehavior = function(type, behavior) {
  if (!behavior) {
    throw new Error('please specify handler for this behavior:' + type);
  }
  const base = function(cfg) {
    Util.mix(this, this.getDefaultCfg(), cfg);
    this.initEvents();
  };
  Util.augment(base, {
    shouldBegin() {
      return true;
    },
    shouldUpdate() {
      return true;
    },
    shouldEnd() {
      return true;
    },
    bind(graph) {
      const events = this.events;
      this.graph = graph;
      Util.each(events, (handler, event) => {
        graph.on(event, handler);
      });
    },
    unbind(graph) {
      const events = this.events;
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
    initEvents() {
      this.events = {};
    },
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

