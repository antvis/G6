import { G6Event, IG6GraphEvent } from '../types';

export default {
  getDefaultCfg(): object {
    return {
      trigger: 'mouseenter', // 可选 mouseenter || click
      activeState: 'active',
      inactiveState: 'inactive',
      resetSelected: false,
      shouldUpdate() {
        return true;
      },
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    if ((this as any).get('trigger') === 'mouseenter') {
      return {
        'node:mouseenter': 'setAllItemStates',
        'node:mouseleave': 'clearAllItemStates',
      };
    }
    return {
      'node:click': 'setAllItemStates',
      'canvas:click': 'clearAllItemStates',
    };
  },
  setAllItemStates(e: IG6GraphEvent) {
    const { item } = e;
    const graph = this.get('graph');
    this.set('item', item);
    if (!this.shouldUpdate(e.item, { event: e, action: 'activate' })) {
      return;
    }
    const self = this;
    const activeState = this.get('activeState');
    const inactiveState = this.get('inactiveState');
    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    graph.getNodes().forEach(node => {
      const hasSelected = node.hasState('selected');
      if (self.resetSelected) {
        if (hasSelected) {
          graph.setItemState(node, 'selected', false);
        }
      }
      graph.setItemState(node, activeState, false);
      if (inactiveState) {
        graph.setItemState(node, inactiveState, true);
      }
    });
    graph.getEdges().forEach(edge => {
      graph.setItemState(edge, activeState, false);
      if (inactiveState) {
        graph.setItemState(edge, inactiveState, true);
      }
    });
    if (inactiveState) {
      graph.setItemState(item, inactiveState, false);
    }
    graph.setItemState(item, activeState, true);
    graph.getEdges().forEach(edge => {
      if (edge.getSource() === item) {
        const target = edge.getTarget();
        if (inactiveState) {
          graph.setItemState(target, inactiveState, false);
        }
        graph.setItemState(target, activeState, true);
        graph.setItemState(edge, inactiveState, false);
        graph.setItemState(edge, activeState, true);
        edge.toFront();
      } else if (edge.getTarget() === item) {
        const source = edge.getSource();
        if (inactiveState) {
          graph.setItemState(source, inactiveState, false);
        }
        graph.setItemState(source, activeState, true);
        graph.setItemState(edge, inactiveState, false);
        graph.setItemState(edge, activeState, true);
        edge.toFront();
      }
    });
    graph.setAutoPaint(autoPaint);
    graph.autoPaint();
    graph.emit('afteractivaterelations', { item: e.item, action: 'activate' });
  },
  clearAllItemStates(e: any) {
    const self = this;
    const graph = self.get('graph');
    if (!self.shouldUpdate(e.item, { event: e, action: 'deactivate' })) {
      return;
    }

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    graph.getNodes().forEach(node => {
      const hasSelected = node.hasState('selected');
      graph.clearItemStates(node);
      if (hasSelected) {
        graph.setItemState(node, 'selected', !self.resetSelected);
      }
    });
    graph.getEdges().forEach(edge => {
      graph.clearItemStates(edge);
    });
    graph.paint();
    graph.setAutoPaint(autoPaint);
    graph.emit('afteractivaterelations', {
      item: e.item || self.get('item'),
      action: 'deactivate',
    });
  },
};
