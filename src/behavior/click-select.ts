import each from '@antv/util/lib/each';
import { G6Event, IG6GraphEvent } from '../types';

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = ['shift', 16, 'ctrl', 17, 'alt', 18];

export default {
  getDefaultCfg(): object {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER,
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const self = this as any;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn(
        "Behavior brush-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'",
      );
    }
    if (!self.multiple) {
      return {
        'node:click': 'onClick',
        'canvas:click': 'onCanvasClick',
      };
    }
    return {
      'node:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onClick(e: IG6GraphEvent) {
    const { item } = e;
    const { graph, keydown, multiple, shouldUpdate } = this;

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
    if (!keydown || !multiple) {
      const selected = graph.findAllByState('node', 'selected');
      each(selected, node => {
        if (node !== item) {
          graph.setItemState(node, 'selected', false);
        }
      });
    }
    if (item.hasState('selected')) {
      if (shouldUpdate.call(this, e)) {
        graph.setItemState(item, 'selected', false);
      }
      const selectedNodes = graph.findAllByState('node', 'selected');
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: { nodes: selectedNodes },
        select: false,
      });
    } else {
      if (shouldUpdate.call(this, e)) {
        graph.setItemState(item, 'selected', true);
      }
      const selectedNodes = graph.findAllByState('node', 'selected');
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: { nodes: selectedNodes },
        select: true,
      });
    }
    graph.setAutoPaint(autoPaint);
    graph.autoPaint();
  },
  onCanvasClick() {
    const { graph } = this;
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const selected = graph.findAllByState('node', 'selected');
    each(selected, node => {
      graph.setItemState(node, 'selected', false);
    });
    graph.emit('nodeselectchange', { selectedItems: { nodes: [], edges: [] }, select: false });

    graph.paint();
    graph.setAutoPaint(autoPaint);
  },
  onKeyDown(e: IG6GraphEvent) {
    const self = this as any;
    let code = e.key;
    if (!code) {
      return;
    }
    code = code.toLowerCase();
    if (code === self.trigger) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp() {
    (this as any).keydown = false;
  },
};
