const Util = require('../../util');
const TIME_OUT = 16;
let timer = null;

class State {
  constructor(graph) {
    this.graph = graph;
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  }
  updateState(item, state, enabled) {
    if (item.destroyed) {
      return;
    }
    const self = this;
    const cachedStates = self.cachedStates;
    const enabledStates = cachedStates.enabled;
    const disabledStates = cachedStates.disabled;
    if (enabled) {
      self._checkCache(item, state, disabledStates);
      self._cacheState(item, state, enabledStates);
    } else {
      self._checkCache(item, state, enabledStates);
      self._cacheState(item, state, disabledStates);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      self.updateGraphStates();
    }, TIME_OUT);
  }
  updateStates(item, states, enabled) {
    const self = this;
    if (Util.isString(states)) {
      self.updateState(item, states, enabled);
    } else {
      states.forEach(state => {
        self.updateState(item, state, enabled);
      });
    }
  }
  _checkCache(item, state, cache) {
    if (!cache[state]) {
      return;
    }
    const index = cache[state].indexOf(item);
    if (index >= 0) {
      cache[state].splice(index, 1);
    }
  }
  _cacheState(item, state, states) {
    if (!states[state]) {
      states[state] = [];
    }
    states[state].push(item);
  }
  updateGraphStates() {
    const states = this.graph.get('states');
    const cachedStates = this.cachedStates;
    Util.each(cachedStates.disabled, (val, key) => {
      if (states[key]) {
        states[key] = states[key].filter(item => {
          return val.indexOf(item) < 0 && !val.destroyed;
        });
      }
    });
    Util.each(cachedStates.enabled, (val, key) => {
      if (!states[key]) {
        states[key] = val;
      } else {
        const map = {};
        states[key].forEach(item => {
          if (!item.destroyed) {
            map[item.get('id')] = true;
          }
        });
        val.forEach(item => {
          const id = item.get('id');
          if (!map[id] && !item.destroyed) {
            map[id] = true;
            states[key].push(item);
          }
        });
      }
    });
    this.graph.emit('graphstatechange', { states });
    this.cachedStates = {
      enabled: {},
      disabled: {}
    };
  }
  destroy() {
    this.graph = null;
    this.cachedStates = null;
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    this.destroyed = true;
  }
}

module.exports = State;
