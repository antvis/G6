const Util = require('../util');
const Behavior = {};

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
    shouldBegin() {
      return true;
    },
    shouldUpdate() {
      return true;
    },
    shouldEnd() {
      return true;
    },
    getEvents() {},
    bind(graph) {
      const events = this._events;
      this.graph = graph;
      Util.each(events, (handler, event) => {
        graph.on(event, handler);
      });
    },
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

