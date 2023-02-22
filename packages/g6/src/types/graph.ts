import EventEmitter from '@antv/event-emitter';
import { Canvas } from '@antv/g';
import { ID } from '@antv/graphlib';
import { Hooks } from '../types/hook';
import { AnimateCfg } from './animate';
import { BehaviorObjectOptionsOf, BehaviorOptionsOf, BehaviorRegistry } from './behavior';
import { ComboModel, ComboUserModel } from './combo';
import { Padding, Point } from './common';
import { DataChangeType, GraphData } from './data';
import { EdgeModel, EdgeUserModel } from './edge';
import { ITEM_TYPE } from './item';
import { LayoutCommonConfig } from './layout';
import { NodeModel, NodeUserModel } from './node';
import { Specification } from './spec';
import { FitViewRules, GraphAlignment } from './view';

export interface IGraph<B extends BehaviorRegistry = BehaviorRegistry> extends EventEmitter {
  hooks: Hooks;
  canvas: Canvas;
  destroyed: boolean;

  // ===== graph instance ===
  /**
   * Destroy the graph instance and remove the related canvases.
   * @returns
   * @group Graph Instance
   */
  destroy: () => void;
  /**
   * Update the specs(configurations).
   */
  updateSpecification: (spec: Specification<B>) => void;
  /**
   * Get the copy of specs(configurations).
   * @returns graph specs
   */
  getSpecification: () => Specification<B>;

  // ====== data operations ====
  /**
   * Find a node's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result node's inner data
   * @group Data
   */
  getNodeData: (condition: string | Function) => NodeModel | undefined;
  /**
   * Find an edge's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result edge's inner data
   * @group Data
   */
  getEdgeData: (condition: string | Function) => EdgeModel | undefined;
  /**
   * Find a combo's inner data according to id or function.
   * @param { string | Function} condition id or condition function
   * @returns result combo's inner data
   * @group Data
   */
  getComboData: (condition: string | Function) => ComboModel | undefined;
  /**
   * Get all the nodes' inner data
   * @returns all nodes' inner data on the graph
   * @group Data
   */
  getAllNodesData: () => NodeModel[];
  /**
   * Get all the edges' inner data
   * @returns all edges' inner data on the graph
   * @group Data
   */
  getAllEdgesData: () => EdgeModel[];
  /**
   * Get all the combos' inner data
   * @returns all combos' inner data on the graph
   * @group Data
   */
  getAllCombosData: () => ComboModel[];
  /**
   * Input data and render the graph.
   * If there is old data, diffs and changes it.
   * @param data
   * @returns
   * @group Data
   */
  read: (data: GraphData) => void;
  /**
   * Change graph data.
   * @param data new data
   * @param type the way to change data, 'replace' means discard the old data and use the new one; 'mergeReplace' means merge the common part, remove (old - new), add (new - old)
   * @returns
   * @group Data
   */
  changeData: (data: GraphData, type: 'replace' | 'mergeReplace') => void;
  /**
   * Clear the graph, means remove all the items on the graph.
   * @returns
   */
  clear: () => void;
  /**
   * Find items which has the state.
   * @param itemType item type
   * @param state state name
   * @param additionalFilter additional filter function
   * @returns items that is the type and has the state
   * @group Item
   */
  findIdByState: (
    itemType: ITEM_TYPE,
    state: string,
    additionalFilter?: (model: NodeModel | EdgeModel | ComboModel) => boolean,
  ) => ID[];
  /**
   * Add one or more node/edge/combo data to the graph.
   * @param itemType item type
   * @param model user data
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Data
   */
  addData: (
    itemType: ITEM_TYPE,
    model:
      | NodeUserModel
      | EdgeUserModel
      | ComboUserModel
      | NodeUserModel[]
      | EdgeUserModel[]
      | ComboUserModel[],
    stack?: boolean,
  ) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];
  /**
   * Remove one or more node/edge/combo data from the graph.
   * @param item the item to be removed
   * @param stack whether push this operation to stack
   * @returns whehter success
   * @group Data
   */
  removeData: (itemType: ITEM_TYPE, id: ID | ID[], stack?: boolean) => void;
  /**
   * Update one or more node/edge/combo data on the graph.
   * @param item the item to be updated
   * @param model update configs
   * @param {boolean} stack whether push this operation to stack
   * @group Data
   */
  updateData: (
    itemType: ITEM_TYPE,
    model:
      | Partial<NodeUserModel>
      | Partial<EdgeUserModel>
      | Partial<
          | ComboUserModel
          | Partial<NodeUserModel>[]
          | Partial<EdgeUserModel>[]
          | Partial<ComboUserModel>[]
        >,
    stack?: boolean,
  ) => NodeModel | EdgeModel | ComboModel | NodeModel[] | EdgeModel[] | ComboModel[];

  // ===== view operations =====

  /**
   * Move the graph with a relative vector.
   * @param dx x of the relative vector
   * @param dy y of the relative vector
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  move: (dx: number, dy: number, animateCfg?: AnimateCfg) => void;
  /**
   * Move the graph and align to a point.
   * @param x position on the canvas to align
   * @param y position on the canvas to align
   * @param alignment alignment of the graph content
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  moveTo: (x: number, y: number, alignment: GraphAlignment, animateCfg?: AnimateCfg) => void;
  /**
   * Zoom the graph with a relative ratio.
   * @param ratio relative ratio to zoom
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  zoom: (ratio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * Zoom the graph to a specified ratio.
   * @param toRatio specified ratio
   * @param center zoom center
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  zoomTo: (toRatio: number, center?: Point, animateCfg?: AnimateCfg) => void;
  /**
   * Fit the graph content to the view.
   * @param padding padding while fitting
   * @param rules rules for fitting
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  fitView: (padding?: Padding, rules?: FitViewRules, animateCfg?: AnimateCfg) => void;
  /**
   * Fit the graph center to the view center.
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  fitCenter: (animateCfg?: AnimateCfg) => void;
  /**
   * Move the graph to make the item align the view center.
   * @param item node/edge/combo item or its id
   * @param animateCfg animation configurations
   * @returns
   * @group View
   */
  focusItem: (ids: ID | ID[], animateCfg?: AnimateCfg) => void;

  // ===== item operations =====
  /**
   * Show the item(s).
   * @param ids the item id(s) to be shown
   * @returns
   * @group Data
   */
  showItem: (ids: ID | ID[]) => void;
  /**
   * Hide the item(s).
   * @param ids the item id(s) to be hidden
   * @returns
   * @group Item
   */
  hideItem: (ids: ID | ID[]) => void;
  /**
   * Set state for the item(s).
   * @param ids the id(s) for the item(s) to be set
   * @param state the state name
   * @param value state value
   * @returns
   * @group Item
   */
  setItemState: (ids: ID | ID[], state: string, value: boolean) => void;
  /**
   * Clear all the states for item(s).
   * @param ids the id(s) for the item(s) to be clear
   * @param states the states' names, all the states wil be cleared if states is not assigned
   * @returns
   * @group Item
   */
  clearItemState: (ids: ID | ID[], states?: string[]) => void;

  // ===== combo operations =====
  /**
   * Create a new combo with existing child nodes and combos.
   * @param combo combo ID or Combo model
   * @param childrenIds id array of children of the new combo
   * @group Combo
   */
  createCombo: (combo: string | ComboUserModel, childrenIds: string[], stack?: boolean) => void;
  /**
   * dissolve combo
   * @param {String | ICombo} item combo item or id to be dissolve
   */
  uncombo: (comboId: ID, stack?: boolean) => void;
  /**
   * Collapse a combo.
   * @param comboId combo id or item
   * @group Combo
   */
  collapseCombo: (comboId: ID, stack?: boolean) => void;
  /**
   * Expand a combo.
   * @group Combo
   * @param combo combo ID 或 combo 实例
   * @group Combo
   */
  expandCombo: (comboId: ID, stack?: boolean) => void;

  // ===== layout =====
  /**
   * Layout the graph (with current configurations if cfg is not assigned).
   * @param {LayoutCommonConfig} cfg layout configurations. if assigned, the layout spec of the graph will be updated in the same time
   * @param {GraphAlignment} align align the result
   * @param {Point} canvasPoint align the result
   * @param {boolean} stack push it into stack
   * @group Layout
   */
  layout: (
    cfg?: LayoutCommonConfig,
    align?: GraphAlignment,
    canvasPoint?: Point,
    stack?: boolean,
  ) => void;

  // ===== interaction =====
  /**
   * Switch mode.
   * @param mode mode name
   * @returns
   * @group Interaction
   */
  setMode: (mode: string) => void;
  /**
   * Add behavior(s) to mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns
   */
  addBehaviors: (behaviors: BehaviorOptionsOf<B>[], modes: string | string[]) => void;
  /**
   * Remove behavior(s) from mode(s).
   * @param behaviors behavior names or configs
   * @param modes mode names
   * @returns
   * @group Interaction
   */
  removeBehaviors: (behaviorKeys: string[], modes: string | string[]) => void;
  /**
   * Update a behavior on a mode.
   * @param behavior behavior configs, whose name indicates the behavior to be updated
   * @param mode mode name
   * @returns
   * @group Interaction
   */
  updateBehavior: (behavior: BehaviorObjectOptionsOf<B>, mode?: string) => void;
}
