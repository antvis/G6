import { each } from '@antv/util';
import { G6Event, IG6GraphEvent } from '@antv/g6-core';

export default {
  getDefaultCfg(): object {
    return {
      multiple: true,
      selectedState: 'selected',
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const self = this as any;

    return {
      'node:tap': 'onClick',
      'combo:tap': 'onClick',
      'canvas:tap': 'onCanvasClick',
    };
  },
  onClick(evt: IG6GraphEvent) {
    const self = this;
    const { item } = evt;
    if (!item || item.destroyed) {
      return;
    }

    const type = item.getType();
    const { graph, multiple, shouldUpdate, shouldBegin } = self;
    if (!shouldBegin.call(self, evt)) {
      return;
    }

    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
    if (!multiple) {
      const selected = graph.findAllByState(type, self.selectedState);
      each(selected, (combo) => {
        if (combo !== item) {
          graph.setItemState(combo, self.selectedState, false);
        }
      });
    }

    if (item.hasState(self.selectedState)) {
      if (shouldUpdate.call(self, evt)) {
        graph.setItemState(item, self.selectedState, false);
      }
      const selectedNodes = graph.findAllByState('node', self.selectedState);
      const selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          combos: selectedCombos,
        },
        select: false,
      });
    } else {
      if (shouldUpdate.call(self, evt)) {
        graph.setItemState(item, self.selectedState, true);
      }
      const selectedNodes = graph.findAllByState('node', self.selectedState);
      const selectedCombos = graph.findAllByState('combo', self.selectedState);
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
};
