import each from '@antv/util/lib/each';
import { G6Event, IG6GraphEvent } from '../types';

const DEFAULT_TRIGGER = 'shift';
const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

export default {
  getDefaultCfg(): object {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER,
      selectedState: 'selected',
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
        'combo:click': 'onClick',
        'canvas:click': 'onCanvasClick',
      };
    }
    return {
      'node:click': 'onClick',
      'combo:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
    };
  },
  onClick(evt: IG6GraphEvent) {
    const { item } = evt;
    if (!item || item.destroyed) {
      return;
    }

    const type = item.getType();
    const { graph, keydown, multiple, shouldUpdate, shouldBegin } = this;
    if (!shouldBegin.call(this, evt)) {
      return;
    }

    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
    if (!keydown || !multiple) {
      const selected = graph.findAllByState(type, this.selectedState);
      each(selected, (combo) => {
        if (combo !== item) {
          graph.setItemState(combo, this.selectedState, false);
        }
      });
    }

    if (item.hasState(this.selectedState)) {
      if (shouldUpdate.call(this, evt)) {
        graph.setItemState(item, this.selectedState, false);
      }
      const selectedNodes = graph.findAllByState('node', this.selectedState);
      const selectedCombos = graph.findAllByState('combo', this.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          combos: selectedCombos,
        },
        select: false,
      });
    } else {
      if (shouldUpdate.call(this, evt)) {
        graph.setItemState(item, this.selectedState, true);
      }
      const selectedNodes = graph.findAllByState('node', this.selectedState);
      const selectedCombos = graph.findAllByState('combo', this.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          combos: selectedCombos,
        },
        select: true,
      });
    }
  },
  onCanvasClick() {
    const { graph } = this;
    const selected = graph.findAllByState('node', this.selectedState);
    each(selected, (node) => {
      graph.setItemState(node, this.selectedState, false);
    });

    const selectedCombos = graph.findAllByState('combo', this.selectedState);
    each(selectedCombos, (combo) => {
      graph.setItemState(combo, this.selectedState, false);
    });
    graph.emit('nodeselectchange', {
      selectedItems: { nodes: [], edges: [], combos: [] },
      select: false,
    });
  },
  onKeyDown(e: IG6GraphEvent) {
    const code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === this.trigger.toLowerCase() || code.toLowerCase() === 'control') {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp() {
    (this as any).keydown = false;
  },
};
