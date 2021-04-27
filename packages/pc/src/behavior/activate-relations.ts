import { G6Event, IG6GraphEvent, INode } from '@antv/g6-core';

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
        'combo:mouseenter': 'setAllItemStates',
        'node:mouseleave': 'clearActiveState',
        'combo:mouseleave': 'clearActiveState',
      };
    }
    return {
      'node:click': 'setAllItemStates',
      'combo:click': 'setAllItemStates',
      'canvas:click': 'clearActiveState',
    };
  },
  setAllItemStates(e: IG6GraphEvent) {
    const item: INode = e.item as INode;
    const graph = this.graph;
    this.item = item;
    if (!this.shouldUpdate(e.item, { event: e, action: 'activate' })) {
      return;
    }
    const self = this;
    const activeState = this.activeState;
    const inactiveState = this.inactiveState;
    const nodes = graph.getNodes();
    const combos = graph.getCombos();
    const edges = graph.getEdges();
    const vEdges = graph.get('vedges');
    const nodeLength = nodes.length;
    const comboLength = combos.length;
    const edgeLength = edges.length;
    const vEdgeLength = vEdges.length;

    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
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
    }
    for (let i = 0; i < comboLength; i++) {
      const combo = combos[i];
      const hasSelected = combo.hasState('selected');
      if (self.resetSelected) {
        if (hasSelected) {
          graph.setItemState(combo, 'selected', false);
        }
      }
      graph.setItemState(combo, activeState, false);
      if (inactiveState) {
        graph.setItemState(combo, inactiveState, true);
      }
    }

    for (let i = 0; i < edgeLength; i++) {
      const edge = edges[i];
      graph.setItemState(edge, activeState, false);
      if (inactiveState) {
        graph.setItemState(edge, inactiveState, true);
      }
    }

    for (let i = 0; i < vEdgeLength; i++) {
      const vEdge = vEdges[i];
      graph.setItemState(vEdge, activeState, false);
      if (inactiveState) {
        graph.setItemState(vEdge, inactiveState, true);
      }
    }

    if (inactiveState) {
      graph.setItemState(item, inactiveState, false);
    }
    graph.setItemState(item, activeState, true);

    const rEdges = item.getEdges();
    const rEdgeLegnth = rEdges.length;
    for (let i = 0; i < rEdgeLegnth; i++) {
      const edge = rEdges[i];
      let otherEnd;
      if (edge.getSource() === item) {
        otherEnd = edge.getTarget();
      } else {
        otherEnd = edge.getSource();
      }
      if (inactiveState) {
        graph.setItemState(otherEnd, inactiveState, false);
      }
      graph.setItemState(otherEnd, activeState, true);
      graph.setItemState(edge, inactiveState, false);
      graph.setItemState(edge, activeState, true);
      edge.toFront();
    }
    graph.emit('afteractivaterelations', { item: e.item, action: 'activate' });
  },
  clearActiveState(e: any) {
    const self = this;
    const graph = self.get('graph');
    if (!self.shouldUpdate(e.item, { event: e, action: 'deactivate' })) {
      return;
    }

    const activeState = this.activeState;
    const inactiveState = this.inactiveState;

    const autoPaint = graph.get('autoPaint');
    graph.setAutoPaint(false);
    const nodes = graph.getNodes() || [];
    const combos = graph.getCombos() || [];
    const edges = graph.getEdges() || [];
    const vEdges = graph.get('vedges') || [];
    const nodeLength = nodes.length;
    const comboLength = combos.length;
    const edgeLength = edges.length;
    const vEdgeLength = vEdges.length;

    for (let i = 0; i < nodeLength; i++) {
      const node = nodes[i];
      graph.clearItemStates(node, [activeState, inactiveState]);
    }
    for (let i = 0; i < comboLength; i++) {
      const combo = combos[i];
      graph.clearItemStates(combo, [activeState, inactiveState]);
    }
    for (let i = 0; i < edgeLength; i++) {
      const edge = edges[i];
      graph.clearItemStates(edge, [activeState, inactiveState, 'deactivate']);
    }
    for (let i = 0; i < vEdgeLength; i++) {
      const vEdge = vEdges[i];
      graph.clearItemStates(vEdge, [activeState, inactiveState, 'deactivate']);
    }
    graph.paint();
    graph.setAutoPaint(autoPaint);
    graph.emit('afteractivaterelations', {
      item: e.item || self.get('item'),
      action: 'deactivate',
    });
  },
};
