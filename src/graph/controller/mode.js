/**
 * @fileOverview mode
 * @author wuyue.lwy <wyueliu@gmail.com>
 */
const Util = require('../../util');
const Behaviors = require('../../behavior');

function mergeBehaviors(modeBehaviors, behaviors) {
  Util.each(behaviors, behavior => {
    if (modeBehaviors.indexOf(behavior) < 0) {
      modeBehaviors.push(behavior);
    }
  });
  return modeBehaviors;
}

function filterBehaviors(modeBehaviors, behaviors) {
  return modeBehaviors.filter(behavior => {
    return behaviors.indexOf(behavior) < 0;
  });
}

class Mode {
  constructor(graph) {
    const self = this;
    this.graph = graph;
    const modes = graph.get('modes');
    if (modes) {
      self.modes = {};
      Util.each(modes, mode => {
        self.modes[mode] = [];
      });
    } else {
      self.modes = {
        default: []
      };
    }
    this.mode = 'default';
  }
  setMode(mode) {
    const modes = this.modes;
    const graph = this.graph;
    const behaviors = modes[mode];
    let behavior;
    if (!behaviors) {
      return;
    }
    graph.emit('beforemodechange', { mode });
    Util.each(modes[this.mode], name => {
      behavior = Behaviors.getBehavior(name);
      behavior && behavior.unbind && behavior.unbind(graph);
    });
    Util.each(modes[mode], name => {
      behavior = Behaviors.getBehavior(name);
      behavior && behavior.bind && behavior.bind(graph);
    });
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
}

module.exports = Mode;
