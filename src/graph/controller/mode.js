/**
 * @fileOverview mode
 * @author wuyue.lwy <wyueliu@gmail.com>
 */
const Util = require('../../util');
const Behavior = require('../../behavior');

function mergeBehaviors(modeBehaviors, behaviors) {
  Util.each(behaviors, behavior => {
    if (modeBehaviors.indexOf(behavior) < 0) {
      if (Util.isString(behavior)) {
        behavior = { type: behavior };
      }
      modeBehaviors.push(behavior);
    }
  });
  return modeBehaviors;
}

function filterBehaviors(modeBehaviors, behaviors) {
  const result = [];
  modeBehaviors.forEach(behavior => {
    if (behaviors.indexOf(behavior.type) < 0) {
      result.push(behavior);
    }
  });
  return result;
}

class Mode {
  constructor(graph) {
    this.graph = graph;
    this.modes = graph.get('modes') || {
      default: []
    };
    this._formatModes();
    this.mode = graph.get('defaultMode') || 'default';
    this.currentBehaves = [];
    this.setMode(this.mode);
  }
  _formatModes() {
    const modes = this.modes;
    Util.each(modes, mode => {
      Util.each(mode, (behavior, i) => {
        if (Util.isString(behavior)) {
          mode[i] = { type: behavior };
        }
      });
    });
  }
  setMode(mode) {
    const modes = this.modes;
    const graph = this.graph;
    const behaviors = modes[mode];
    if (!behaviors) {
      return;
    }
    graph.emit('beforemodechange', { mode });
    Util.each(this.currentBehaves, behave => {
      behave.unbind(graph);
    });
    this._setBehaviors(mode);
    graph.emit('aftermodechange', { mode });
    this.mode = mode;
    return this;
  }
  manipulateBehaviors(behaviors, modes, add) {
    const self = this;
    if (!Util.isArray(behaviors)) {
      behaviors = [ behaviors ];
    }
    if (Util.isArray(modes)) {
      Util.each(modes, mode => {
        if (!self.modes[mode]) {
          if (add) {
            self.modes[mode] = [].concat(behaviors);
          }
        } else {
          if (add) {
            self.modes[mode] = mergeBehaviors(self.modes[mode], behaviors);
          } else {
            self.modes[mode] = filterBehaviors(self.modes[mode], behaviors);
          }
        }
      });
      return this;
    }
    if (!modes) {
      modes = this.mode;
    }
    if (add) {
      self.modes[modes] = mergeBehaviors(self.modes[modes], behaviors);
    } else {
      self.modes[modes] = filterBehaviors(self.modes[modes], behaviors);
    }
    self.setMode(this.mode);
    return this;
  }
  _setBehaviors(mode) {
    const graph = this.graph;
    const behaviors = this.modes[mode];
    const behaves = [];
    let behave;
    Util.each(behaviors, behavior => {
      if (!Behavior.getBehavior(behavior.type)) {
        return;
      }
      behave = new (Behavior.getBehavior(behavior.type))(behavior);
      behave && behave.bind(graph);
      behaves.push(behave);
    });
    this.currentBehaves = behaves;
  }
  destroy() {
    this.graph = null;
    this.modes = null;
    this.currentBehaves = null;
    this.destroyed = true;
  }
}

module.exports = Mode;
