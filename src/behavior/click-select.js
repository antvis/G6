const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  initEvents() {
    this.events = {
      'node:click': Util.wrapBehavior(this, 'onClick'),
      keyup: Util.wrapBehavior(this, 'onKeyUp'),
      keydown: Util.wrapBehavior(this, 'onKeyDown')
    };
    this.selected = [];
  },
  onClick(e) {
    const self = this;
    const item = e.target;
    const graph = self.graph;
    const selected = this.selected;
    if (!self.multiple && selected.length > 0) {
      return;
    }
    if (!self.keydown) {
      self.selected = [];
    }
    if (item.hasState('selected')) {
      e.type = 'select';
      if (self.shouldUpdate.call(self, e)) {
        graph.setState(item, 'selected', false);
        const index = selected.indexOf(item);
        selected.splice(index, 1);
      }
    } else {
      e.type = 'deselect';
      if (self.shouldUpdate.call(self, e)) {
        graph.setState(item, 'selected', true);
        selected.push(item);
      }
    }
    graph.paint();
  },
  onKeyDown(e) {
    const code = e.keyCode || e.which;
    if (code === 16) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
};
