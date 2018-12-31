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
    this.event = Util.wrapBehavior(this, 'onClick');
    graph.on('node:click', this.event);
  },
  unbind(graph) {
    graph.on('node:click', this.event);
  },
  onClick(e) {
    const item = e.target;
    if (item.getStates().indexOf('selected') >= 0) {
      if (this.onDeselect.call(this, e)) {
        // todo
      }
    }
  }
};
