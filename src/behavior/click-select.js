const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      multiple: true,
      onSelect() { return true; },
      onDeselect() { return true; }
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
    const item = e.target;
    const selected = this.selected;
    if (!this.multiple && selected.length > 0) {
      return;
    }
    if (!this.keydown) {
      this.selected = [];
    }
    if (item.getStates().indexOf('selected') >= 0) {
      if (this.onDeselect.call(this, e)) {
        item.setState('selected', false);
        const index = selected.indexOf(item);
        selected.splice(index, 1);
      }
    } else {
      if (this.onSelect.call(this, e)) {
        item.setState('selected', true);
        selected.push(item);
      }
    }
    this.graph.paint();
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
