const Util = require('../util');
const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = [ 'shift', 'ctrl', 'alt' ];

module.exports = {
  getDefaultCfg() {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER
    };
  },
  getEvents() {
    if (!this.multiple) {
      return {
        'node:click': 'onClick',
        'canvas:click': 'onCanvasClick'
      };
    }
    return {
      'node:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onClick(e) {
    const self = this;
    const item = e.item;
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
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', false);
      }
      graph.emit('nodeselectchange', { target: item, select: false });
    } else {
      if (self.shouldUpdate.call(self, e)) {
        graph.setItemState(item, 'selected', true);
      }
      graph.emit('nodeselectchange', { target: item, select: true });
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

    const selectedEdges = graph.findAllByState('edge', 'selected');
    Util.each(selectedEdges, edge => graph.setItemState(edge, 'selected', false));

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onKeyDown(e) {
    const code = e.key;
    if (ALLOW_EVENTS.indexOf(code.toLowerCase() > -1)) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
};
