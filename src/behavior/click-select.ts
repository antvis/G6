import each from '@antv/util/lib/each'
import { G6Event, IG6GraphEvent } from "@g6/types";
import { isString } from '@antv/util';

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = [ 'shift', 16, 'ctrl', 17, 'alt', 18 ];

export default {
  getDefaultCfg(): object {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn('Behavior brush-select 的 trigger 参数不合法，请输入 \'drag\'、\'shift\'、\'ctrl\' 或 \'alt\'');
    }
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
    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
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

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onKeyDown(e: IG6GraphEvent) {
    let code = e.key;
    if (!code) {
      return;
    }
    code = code.toLowerCase();
    if (code === this.trigger) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    this.keydown = false;
  }
};
