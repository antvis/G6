const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      multiple: true
    };
  },
  getEvents() {
    return {
      'node:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onClick(e) {
    const self = this;
    const item = e.target;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    if (!self.keydown || !self.multiple) {
      const selected = graph.findAllByState('node', 'selected');
      Util.each(selected, node => {
        if (node !== item) {
          graph.setItemState(node, 'selected', false);
        }
      });
    }
    if (item.hasState('selected')) {
      e.type = 'deselect';
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', false);
      }
    } else {
      e.type = 'select';
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', true);
      }
    }
    graph.setAutoPaint(autoPaint);
    graph.paint();
  },
  onCanvasClick() {
    const graph = this.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const selected = graph.findAllByState('node', 'selected');
    Util.each(selected, node => {
      graph.setItemState(node, 'selected', false);
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
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
