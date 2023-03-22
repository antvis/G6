import { throttle } from '@antv/util';
import type { ICombo, IEdge, IG6GraphEvent, INode } from '../../types';
import { Behavior } from '../../types/behavior';

const KEYBOARD_TRIGGERS = ['shift', 'ctrl', 'alt', 'meta'] as const;
const MOUSE_TRIGGERS = ['mouseenter', 'click'] as const;

type Trigger = (typeof MOUSE_TRIGGERS)[number];

interface ActivateRelationsOptions {
  /**
   * Whether to allow multiple selection.
   * Defaults to true.
   * If set to false, `trigger` options will be ignored.
   */
  multiple: boolean;
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"shift"`.
   * Could be "shift", "ctrl", "alt", or "meta".
   */
  trigger: Trigger;
  /**
   * Item types to be able to select.
   * Defaults to `["nodes"]`.
   * Should be an array of "node", "edge", or "combo".
   */
  itemTypes: Array<'node' | 'edge' | 'combo'>;
  /**
   *
   * Defaults to `"active"`.
   *
   */
  activeState: 'active';
  /**
   * Defaults to `"inactive"`.
   */
  inactiveState: 'inactive';
  /**
   *
   */
  resetSelected: boolean;
  /**
   * The event name to trigger when select/unselect an item.
   */
  eventName: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin: (event: IG6GraphEvent) => boolean;
  /**
   * Whether to update item state.
   * If it returns false, you may probably listen to `eventName` and
   * manage states or data manually
   */
  shouldUpdate: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: ActivateRelationsOptions = {
  multiple: true,
  itemTypes: ['node'],
  eventName: '',
  shouldBegin: () => true,
  shouldUpdate: () => true,
  trigger: 'mouseenter',
  activeState: 'active',
  inactiveState: 'inactive',
  resetSelected: false,
};

export default class ActivateRelations extends Behavior {
  options: ActivateRelationsOptions;
  timer: number;

  constructor(options: Partial<ActivateRelationsOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !MOUSE_TRIGGERS.includes(options.trigger)) {
      console.warn(
        `G6: Invalid trigger option "${options.trigger}" for activate-relations behavior!`,
      );
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
  }

  getEvents = () => {
    const { trigger } = this.options;
    if (trigger === 'mouseenter') {
      return {
        'node:mouseenter': this.setAllItemStates,
        'combo:mouseenter': this.setAllItemStates,
        'node:mouseleave': this.clearActiveState,
        'combo:mouseleave': this.clearActiveState,
      };
    }
    return {
      'node:click': this.setAllItemStates,
      'combo:click': this.setAllItemStates,
      'canvas:click': this.clearActiveState,
      'node:touchstart': this.setOnTouchStart,
      'combo:touchstart': this.setOnTouchStart,
      'canvas:touchstart': this.clearOnTouchStart,
    };
  };
  setOnTouchStart = (e: IG6GraphEvent) => {
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
    this.setAllItemStates(e);
  };
  clearOnTouchStart = (e: IG6GraphEvent) => {
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
    this.clearActiveState(e);
  };
  setAllItemStates = (e: IG6GraphEvent) => {
    clearTimeout(this.timer);
    // this.throttleSetAllItemStates(e, this);
  };
  clearActiveState = (e: any) => {
    // avoid clear state frequently, it costs a lot since all the items' states on the graph need to be cleared
    this.timer = setTimeout(() => {
      // this.throttleClearActiveState(e, this);
    }, 50);
  };
  throttleSetAllItemStates = () =>
    throttle(
      (e, self) => {
        const item: INode = e.item as INode;
        const graph = self.graph;
        if (!graph || graph.destroyed) return;
        self.item = item;
        if (!self.shouldUpdate(e.item, { event: e, action: 'activate' }, self)) {
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
        graph.emit('afteractivaterelations', { item: e.item, action: 'activate' });
      },
      50,
      {
        trailing: true,
        leading: true,
      },
    );
  throttleClearActiveState = () =>
    throttle(
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
    );
}
