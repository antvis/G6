import type { ID, IG6GraphEvent } from '../../types';
import { Behavior } from '../../types/behavior';

const KEYBOARD_TRIGGERS = ['shift', 'ctrl', 'alt', 'meta'] as const;
const MOUSE_TRIGGERS = ['mouseenter', 'click'] as const;

type Trigger = (typeof MOUSE_TRIGGERS)[number];

const compare = (prev: ID[], curr: ID[]) => {
  const inactive = prev.filter((v) => !curr.includes(v));
  const active = curr.filter((v) => !prev.includes(v));
  return {
    active,
    inactive,
  };
};

export interface ActivateRelationsOptions {
  /**
   * Whether to allow multiple selection.
   * Defaults to true.
   * If set to false, `trigger` options will be ignored.
   */
  multiple?: boolean;
  /**
   * The key to pressed with mouse click to apply multiple selection.
   * Defaults to `"click"`.
   * Could be "click", "mouseenter".
   */
  trigger?: Trigger;

  /**
   *
   * Defaults to `"selected"`.
   *
   */
  activeState?: 'selected';

  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
  /**
   * Whether to update item state.
   * If it returns false, you may probably listen to `eventName` and
   * manage states or data manually
   */
  shouldUpdate?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: ActivateRelationsOptions = {
  multiple: true,
  shouldBegin: () => true,
  shouldUpdate: () => true,
  trigger: 'click',

  activeState: 'selected',
};

export class ActivateRelations extends Behavior {
  timer: number;
  inactiveItems: {};
  prevNodeIds: ID[];
  prevEdgeIds: ID[];

  constructor(options: Partial<ActivateRelationsOptions>) {
    super(Object.assign({}, DEFAULT_OPTIONS, options));
    // Validate options
    if (options.trigger && !MOUSE_TRIGGERS.includes(options.trigger)) {
      console.warn(
        `G6: Invalid trigger option "${options.trigger}" for activate-relations behavior!`,
      );
      this.options.trigger = DEFAULT_OPTIONS.trigger;
    }
    this.prevEdgeIds = [];
    this.prevNodeIds = [];
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
    };
  };

  public setAllItemStates(e: IG6GraphEvent) {
    const { itemId } = e;
    const { graph } = this;
    const { activeState: ACTIVE_STATE } = this.options;
    if (!graph || graph.destroyed) return;
    if (!this.options.shouldBegin(e)) return;

    const ids = graph
      .getNeighborNodesData(itemId, 'both')
      .map((item) => item.id);
    const edgeIds = graph
      .getRelatedEdgesData(itemId, 'both')
      .map((item) => item.id);
    const nodeIds = [itemId, ...ids];
    /** 数据对比，处理得到最小改动的高亮和非高亮的数据 */
    const { active: activeNodeIds, inactive: inactiveNodeIds } = compare(
      this.prevNodeIds,
      nodeIds,
    );
    const { active: activeEdgeIds, inactive: inactiveEdgeIds } = compare(
      this.prevEdgeIds,
      edgeIds,
    );

    graph.batch(() => {
      /** 节点 */
      graph.setItemState(activeNodeIds, ACTIVE_STATE, true);
      graph.setItemState(inactiveNodeIds, ACTIVE_STATE, false);
      /** 边 */
      graph.setItemState(activeEdgeIds, ACTIVE_STATE, true);
      graph.setItemState(inactiveEdgeIds, ACTIVE_STATE, false);
    });

    this.prevNodeIds = nodeIds;
    this.prevEdgeIds = edgeIds;
  }
  public clearActiveState(e: any) {
    const { activeState: ACTIVE_STATE } = this.options;
    this.graph.batch(() => {
      this.graph.setItemState(this.prevNodeIds, ACTIVE_STATE, false);
      this.graph.setItemState(this.prevEdgeIds, ACTIVE_STATE, false);
    });
    this.prevNodeIds = [];
    this.prevEdgeIds = [];
  }
}
