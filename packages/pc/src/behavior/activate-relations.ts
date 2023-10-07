import { G6Event, ICombo, IEdge, IG6GraphEvent, INode } from '@antv/g6-core';
import { throttle } from '@antv/util';

let clickNodeId = null;
export default {
  getDefaultCfg(): object {
    return {
      // 可选 mouseenter || click
      // 选择 click 会监听 touch，mouseenter 不会监听
      trigger: 'mouseenter',
      activeState: 'active',
      inactiveState: 'inactive',
      resetSelected: false,
      shouldClearStatusOnSecond: false,
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
    clearTimeout(this.timer);
    this.throttleSetAllItemStates(e, this);
  },
  clearActiveState(e: any) {
    // avoid clear state frequently, it costs a lot since all the items' states on the graph need to be cleared
    const shouldClearStatusOnSecond = this.shouldClearStatusOnSecond;
    if (shouldClearStatusOnSecond) {
      clickNodeId = null;
    }
    this.timer = setTimeout(() => {
      this.throttleClearActiveState(e, this);
    }, 50);
  },
  throttleSetAllItemStates: throttle(
    (e, self) => {
      const item: INode = e.item as INode;
      const graph = self.graph;
      if (!graph || graph.destroyed) return;
      self.item = item;
      if (!self.shouldUpdate(e.item, { event: e, action: 'activate' }, self)) {
        return;
      }

      var shouldClearStatusOnSecond = self.shouldClearStatusOnSecond;
      var currentNodeId = item.getModel().id;
      if (clickNodeId === currentNodeId && shouldClearStatusOnSecond) {
        self.throttleClearActiveState(e, self);
        clickNodeId = null;
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
        const nodeId = node.getID();
        const hasSelected = node.hasState('selected');
        if (self.resetSelected) {
          if (hasSelected) {
            graph.setItemState(node, 'selected', false);
          }
        }
        if (activeItems[nodeId]) {
          graph.setItemState(node, activeState, false);
          delete activeItems[nodeId];
        }
        if (inactiveState && !inactiveItems[nodeId]) {
          graph.setItemState(node, inactiveState, true);
          inactiveItems[nodeId] = node;
        }
      }
      for (let i = 0; i < comboLength; i++) {
        const combo = combos[i];
        const comboId = combo.getID();
        const hasSelected = combo.hasState('selected');
        if (self.resetSelected) {
          if (hasSelected) {
            graph.setItemState(combo, 'selected', false);
          }
        }
        if (activeItems[comboId]) {
          graph.setItemState(combo, activeState, false);
          delete activeItems[comboId];
        }
        if (inactiveState && !inactiveItems[comboId]) {
          graph.setItemState(combo, inactiveState, true);
          inactiveItems[comboId] = combo;
        }
      }

      for (let i = 0; i < edgeLength; i++) {
        const edge = edges[i];
        const edgeId = edge.getID();
        if (activeItems[edgeId]) {
          graph.setItemState(edge, activeState, false);
          delete activeItems[edgeId];
        }
        if (inactiveState && !inactiveItems[edgeId]) {
          graph.setItemState(edge, inactiveState, true);
          inactiveItems[edgeId] = edge;
        }
      }

      for (let i = 0; i < vEdgeLength; i++) {
        const vEdge = vEdges[i];
        const vEdgeId = vEdge.getID();
        if (activeItems[vEdgeId]) {
          graph.setItemState(vEdge, activeState, false);
          delete activeItems[vEdgeId];
        }
        if (inactiveState && !inactiveItems[vEdgeId]) {
          graph.setItemState(vEdge, inactiveState, true);
          inactiveItems[vEdgeId] = vEdge;
        }
      }

      if (item && !item.destroyed) {
        if (inactiveState) {
          graph.setItemState(item, inactiveState, false);
          delete inactiveItems[item.getID()];
        }
        if (!activeItems[item.getID()]) {
          graph.setItemState(item, activeState, true);
          activeItems[item.getID()] = item;
        }

        const rEdges = item.getEdges();
        const rEdgeLegnth = rEdges.length;
        for (let i = 0; i < rEdgeLegnth; i++) {
          const edge = rEdges[i];
          const edgeId = edge.getID();
          let otherEnd: INode;
          if (edge.getSource() === item) {
            otherEnd = edge.getTarget();
          } else {
            otherEnd = edge.getSource();
          }
          const otherEndId = otherEnd.getID();
          if (inactiveState && inactiveItems[otherEndId]) {
            graph.setItemState(otherEnd, inactiveState, false);
            delete inactiveItems[otherEndId];
          }
          if (!activeItems[otherEndId]) {
            graph.setItemState(otherEnd, activeState, true);
            activeItems[otherEndId] = otherEnd;
          }
          if (inactiveItems[edgeId]) {
            graph.setItemState(edge, inactiveState, false);
            delete inactiveItems[edgeId];
          }
          if (!activeItems[edgeId]) {
            graph.setItemState(edge, activeState, true);
            activeItems[edgeId] = edge;
          }
          edge.toFront();
        }
      }
      self.activeItems = activeItems;
      self.inactiveItems = inactiveItems;

      if (shouldClearStatusOnSecond) {
        clickNodeId = item.getModel().id;
      }

      graph.emit('afteractivaterelations', { item: e.item, action: 'activate' });
    },
    50,
    {
      trailing: true,
      leading: true,
    },
  ),
  throttleClearActiveState: throttle(
    (e, self) => {
      const graph = self.get('graph');
      if (!graph || graph.destroyed) return;
      if (!self.shouldUpdate(e.item, { event: e, action: 'deactivate' }, self)) return;

      const activeState = self.activeState;
      const inactiveState = self.inactiveState;

      const activeItems = self.activeItems || {};
      const inactiveItems = self.inactiveItems || {};

      Object.values(activeItems)
        .filter((item: INode | IEdge | ICombo) => !item.destroyed)
        .forEach((item) => {
          graph.clearItemStates(item, activeState);
        });
      Object.values(inactiveItems)
        .filter((item: INode | IEdge | ICombo) => !item.destroyed)
        .forEach((item) => {
          graph.clearItemStates(item, inactiveState);
        });
      self.activeItems = {};
      self.inactiveItems = {};
      graph.emit('afteractivaterelations', {
        item: e.item || self.get('item'),
        action: 'deactivate',
      });
    },
    50,
    {
      trailing: true,
      leading: true,
    },
  ),
};
