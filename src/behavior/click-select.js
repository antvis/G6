const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  bind(graph) {
    this.selected = [];
    this.click = Util.wrapBehavior(this, 'onClick');
    this.keydown = Util.wrapBehavior(this, 'onKeyDown');
    this.keyup = Util.wrapBehavior(this, 'onKeyUp');
    this.graph = graph;
    graph.on('node:click', this.click);
    graph.on('keydown', this.keydown);
    graph.on('keyup', this.keyup);
  },
  unbind(graph) {
    graph.off('node:click', this.click);
    graph.off('keydown', this.keydown);
    graph.off('keyup', this.keyup);
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
