import { G6Event, IG6GraphEvent, INode } from '@antv/g6-core';
import { throttle } from '@antv/util';

export default {
  getDefaultCfg(): object {
    return {
      // 可选 mouseenter || click
      // 选择 click 会监听 touch，mouseenter 不会监听
      trigger: 'mouseenter',
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
      'node:touchstart': 'setOnTouchStart',
      'combo:touchstart': 'setOnTouchStart',
      'canvas:touchstart': 'clearOnTouchStart',
    };
  },
  setOnTouchStart(e: IG6GraphEvent) {
    const self = this;
    try {
      const touches = (e.originalEvent as TouchEvent).touches;
      const event1 = touches[0];
      const event2 = touches[1];

      if (event1 && event2) {
        return;
      }

      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.setAllItemStates(e);
  },
  clearOnTouchStart(e: IG6GraphEvent) {
    const self = this;
    try {
      const touches = (e.originalEvent as TouchEvent).touches;
      const event1 = touches[0];
      const event2 = touches[1];

      if (event1 && event2) {
        return;
      }

      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.clearActiveState(e);
  },
  setAllItemStates(e: IG6GraphEvent) {
    this.throttleSetAllItemStates(e, this);
  },
  clearActiveState(e: any) {
    this.throttleClearActiveState(e, this);
  },
  throttleSetAllItemStates: throttle(
    (e, self) => {
      const item: INode = e.item as INode;
      const graph = self.graph;
      if (!graph || graph.destroyed) return;
      self.item = item;
      if (!self.shouldUpdate(e.item, { event: e, action: 'activate' })) {
        return;
      }
      const activeState = self.activeState;
      const inactiveState = self.inactiveState;
      const nodes = graph.getNodes();
      const combos = graph.getCombos();
      const edges = graph.getEdges();
      const vEdges = graph.get('vedges');
      const nodeLength = nodes.length;
      const comboLength = combos.length;
      const edgeLength = edges.length;
      const vEdgeLength = vEdges.length;
      const inactiveItems = self.inactiveItems || {};
      const activeItems = self.activeItems || {};

      for (let i = 0; i < nodeLength; i++) {
        const node = nodes[i];
        const hasSelected = node.hasState('selected');
        if (self.resetSelected) {
          if (hasSelected) {
            graph.setItemState(node, 'selected', false);
          }
        }
        graph.setItemState(node, activeState, false);
        delete activeItems[node.getID()];
        if (inactiveState) {
          graph.setItemState(node, inactiveState, true);
          inactiveItems[node.getID()] = node;
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
        delete activeItems[combo.getID()];
        if (inactiveState) {
          graph.setItemState(combo, inactiveState, true);
          inactiveItems[combo.getID()] = combo;
        }
      }

      for (let i = 0; i < edgeLength; i++) {
        const edge = edges[i];
        graph.setItemState(edge, activeState, false);
        delete activeItems[edge.getID()];
        if (inactiveState) {
          graph.setItemState(edge, inactiveState, true);
          inactiveItems[edge.getID()] = edge;
        }
      }

      for (let i = 0; i < vEdgeLength; i++) {
        const vEdge = vEdges[i];
        graph.setItemState(vEdge, activeState, false);
        delete activeItems[vEdge.getID()];
        if (inactiveState) {
          graph.setItemState(vEdge, inactiveState, true);
          inactiveItems[vEdge.getID()] = vEdge;
        }
      }

      if (inactiveState) {
        graph.setItemState(item, inactiveState, false);
        delete inactiveItems[item.getID()];
      }
      graph.setItemState(item, activeState, true);
      activeItems[item.getID()] = item;

      const rEdges = item.getEdges();
      const rEdgeLegnth = rEdges.length;
      for (let i = 0; i < rEdgeLegnth; i++) {
        const edge = rEdges[i];
        let otherEnd: INode;
        if (edge.getSource() === item) {
          otherEnd = edge.getTarget();
        } else {
          otherEnd = edge.getSource();
        }
        if (inactiveState) {
          graph.setItemState(otherEnd, inactiveState, false);
          delete inactiveItems[otherEnd.getID()];
        }
        graph.setItemState(otherEnd, activeState, true);
        graph.setItemState(edge, inactiveState, false);
        graph.setItemState(edge, activeState, true);
        activeItems[otherEnd.getID()] = otherEnd;
        delete inactiveItems[edge.getID()];
        activeItems[edge.getID()] = edge;
        edge.toFront();
      }
      self.activeItems = activeItems;
      self.inactiveItems = inactiveItems;
      graph.emit('afteractivaterelations', { item: e.item, action: 'activate' });
    },
    50,
    {
      trailing: true,
      leading: true
    }
  ),
  throttleClearActiveState: throttle(
    (e, self) => {
      const graph = self.get('graph');
      if (!graph || graph.destroyed) return;
      if (!self.shouldUpdate(e.item, { event: e, action: 'deactivate' })) return;

      const activeState = self.activeState;
      const inactiveState = self.inactiveState;

      const activeItems = self.activeItems || {};
      const inactiveItems = self.inactiveItems || {};

      Object.values(activeItems).forEach(item => {
        graph.clearItemStates(item, activeState);
      });
      Object.values(inactiveItems).forEach(item => {
        graph.clearItemStates(item, inactiveState);
      });
      graph.emit('afteractivaterelations', {
        item: e.item || self.get('item'),
        action: 'deactivate',
      });
    },
    50,
    {
      trailing: true,
      leading: true
    }
  )
};
