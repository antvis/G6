import each from '@antv/util/lib/each'
import { G6Event, IG6GraphEvent } from "@g6/types";

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = [ 'shift', 'ctrl', 'alt' ];

export default {
  getDefaultCfg(): object {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER
    };
  },
  getEvents(): { [key in G6Event]?: string } {
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
  onClick(e: IG6GraphEvent) {
    const self = this;
    const item = e.item;
    const graph = self.graph;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    if (!self.keydown || !self.multiple) {
      const selected = graph.findAllByState('node', 'selected');
      each(selected, node => {
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
    each(selected, node => {
      graph.setItemState(node, 'selected', false);
    });

    const selectedEdges = graph.findAllByState('edge', 'selected');
    each(selectedEdges, edge => graph.setItemState(edge, 'selected', false));

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code.toLowerCase()) > -1) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
};
