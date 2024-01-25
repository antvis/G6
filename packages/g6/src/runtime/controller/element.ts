/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { DisplayObject } from '@antv/g';
import { Group } from '@antv/g';
import type { GraphChange, ID } from '@antv/graphlib';
import { Graph as GraphLib } from '@antv/graphlib';
import { groupBy, isFunction } from '@antv/util';
import type { AnimationExecutor } from '../../animation/types';
import type { BaseElement } from '../../plugin/element/base';
import type { BaseNode } from '../../plugin/element/node/base';
import { getPlugin } from '../../plugin/register';
import { DataOptions, EdgeData, NodeData } from '../../spec/data';
import type { AnimationStage } from '../../types/animate';
import type { CallableObject } from '../../types/callable';
import type { ItemType, State } from '../../types/item';
import type { GroupedChanges } from '../../utils/event';
import { invariant } from '../../utils/invariant';
import { assignColorByPalette, parsePalette } from '../../utils/palette';
import { createPromise } from '../../utils/promise';
import type { Graph } from '../graph';
import type { ElementUpdateParams, RenderParams, RuntimeContext } from '../hooks';
import { ElementData, ElementDatum, ElementOptions } from './element/manager/types';

type Change = GraphChange<NodeData, EdgeData>;

export class ElementController {
  #ready: Promise<void>;

  public get ready() {
    return this.#ready;
  }

  protected graph: Graph;

  #context: RuntimeContext;

  #container: {
    node: Group;
    edge: Group;
    combo: Group;
  };

  protected get container() {
    return this.#container;
  }

  constructor(graph: Graph) {
    this.graph = graph;

    this.init();
  }

  protected init() {
    this.initContainer();
  }

  protected initContainer() {
    const { promise, resolve } = createPromise<void>();
    this.#ready = promise;

    const canvas = this.graph.canvas;
    canvas.ready.then(() => {
      this.#container = {
        node: canvas.appendChild(new Group({ style: { zIndex: 2 } })),
        edge: canvas.appendChild(new Group({ style: { zIndex: 1 } })),
        combo: canvas.appendChild(new Group({ style: { zIndex: 0 } })),
      };
      resolve();
    });
  }

  #tasks: Change[] = [];

  protected get tasks() {
    const graphlib = new GraphLib<NodeData, EdgeData>();
    return graphlib.reduceChanges(this.#tasks);
  }

  protected each(callback: (itemType: ItemType, elementData: ElementData) => void) {
    ['node', 'edge', 'combo'].forEach((itemType: ItemType) => {
      const data = this.getElementData(itemType);
      callback(itemType, data);
    });
  }

  protected getPresetStyle(itemType: ItemType, id: ID) {
    return {};
  }

  protected get theme() {
    const { theme } = this.graph.getOptions();

    const themeConfig = getPlugin('theme', theme);
    if (!themeConfig) invariant(`The theme: ${theme} is not registered`);

    return themeConfig;
  }

  protected getThemeStyle(itemType: ItemType, states: State[]) {
    const { style = {}, state = {} } = this.theme[itemType] || {};
    return Object.assign({}, style, ...states.map((name) => state[name]));
  }

  #paletteStyle: Record<ID, string> = {};

  protected getPaletteStyleById(id: ID) {
    return { keyShapeColor: this.#paletteStyle[id] };
  }

  protected computePaletteStyle() {
    const { options } = this.#context;

    // TODO cache when palette and data is not changed

    // clear palette style
    this.#paletteStyle = {};

    this.each((itemType, data) => {
      const palette = parsePalette((this.theme[itemType] || options[itemType])?.palette);
      Object.assign(this.#paletteStyle, assignColorByPalette(data, palette));
    });
  }

  protected getDataStyleById(id: ID) {
    const { controller } = this.#context;
    const datum = controller.data.getElementData(id);
    // `data.style` 中一些样式例如 parentId, collapsed, type 并非直接给元素使用，因此需要过滤掉这些字段
    // Some styles in `data.style`, such as parentId, collapsed, type, are not directly used by the element, so these fields need to be filtered out
    const { parentId, collapsed, type, states, ...style } = datum.style || {};
    return style;
  }

  protected computeElementStyle(id: ID, callableStyle: ElementOptions['style']) {
    const { controller } = this.#context;
    const datum = controller.data.getElementData(id);

    Object.fromEntries(
      Object.entries(callableStyle).map(([key, style]) => {
        if (isFunction(style)) return [key, style(datum)];
        return [key, style];
      }),
    );
  }

  #defaultStyle: Record<ID, Record<string, unknown>> = {};

  protected getDefaultStyleById(id: ID) {
    return this.#defaultStyle[id] || {};
  }

  /**
   * <zh/> 计算单个元素的默认样式
   *
   * <en/> compute default style of single element
   */
  protected computeElementDefaultStyle(itemType: ItemType, datum: ElementDatum) {
    const options = this.graph.getOptions();
    const rawStyle = options[itemType]?.style || {};
    this.#defaultStyle[datum.id] = computeElementCallbackStyle(datum, rawStyle);
  }

  /**
   * <zh/> 计算全部元素的默认样式
   *
   * <en/> compute default style of all elements
   */
  protected computeElementsDefaultStyle() {
    this.each((itemType, data) => {
      data.forEach((datum) => {
        this.computeElementDefaultStyle(itemType, datum);
      });
    });
  }

  #elementState = new Map();

  #statesStyle: Record<ID, Record<string, unknown>> = {};

  protected getStateStyleById(id: ID) {
    return this.#statesStyle[id] || {};
  }

  /**
   * <zh/> 获取单个元素的单个状态的样式
   *
   * <en/> get single state style of single element
   */
  protected getElementStateStyle(itemType: ItemType, state: string, datum: ElementDatum) {
    const options = this.graph.getOptions();
    const rawStateStyle = options[itemType]?.state?.[state] || {};
    return computeElementCallbackStyle(datum, rawStateStyle);
  }

  /**
   * <zh/> 计算单个元素的合并状态样式
   *
   * <en/> compute merged state style of single element
   */
  protected computeElementStatesStyle(itemType: ItemType, states: string[], datum: ElementDatum) {
    this.#statesStyle[datum.id] = Object.assign(
      {},
      ...states.map((state) => this.getElementStateStyle(itemType, state, datum)),
    );
  }

  /**
   * <zh/> 计算全部元素的状态样式
   *
   * <en/> compute state style of all elements
   */
  protected computeElementsStatesStyle(ids?: ID[]) {
    this.each((itemType, data) => {
      data.forEach((datum) => {
        const { id } = datum;
        if ((ids && ids.includes(id)) || ids === undefined) {
          const states = this.getElementStateById(id);
          this.computeElementStatesStyle(itemType, states, datum);
        }
      });
    });
  }

  /**
   * <zh/> 计算边的端点
   *
   * <en/> compute edge endpoints
   */
  protected getEdgeEnds(id: ID) {
    // 如果节点存在锚点，选取最近的锚点
    // 如果不存在锚点，调用节点 getIntersectPoint 计算交点
    // 如果都不存在，直接使用节点中心点
    const { controller } = this.#context;

    const [data] = controller.data.getEdgeData([id]);

    const { source, target, style } = data;
    const { sourcePort, targetPort } = style;

    const sourceShape = this.getElementById<BaseNode>(source);

    // const sourcePorts = sourceShape.getPorts();

    // 如果存在 sourcePort，优先使用 sourcePort
    // 如果不存在 sourcePort，且存在 sourcePorts，从 sourcePorts 中选取最近的锚点
    // 如果不存在 sourcePort，且不存在 sourcePorts，调用 sourceShape.getIntersectPoint 计算交点
    // 如果都不存在，直接使用 sourceShape 中心点

    const targetShape = this.getElementById<BaseNode>(target);

    return {
      sourcePoint: sourceShape.getPosition(),
      targetPoint: targetShape.getPosition(),
    };
  }

  protected getComboChildren(id: ID) {
    const { controller } = this.#context;
    return {
      children: controller.data.getComboChildrenData(id).map((datum) => this.getElementById(datum.id)),
    };
  }

  protected getElementAnimation(itemType: ItemType, stage: AnimationStage) {
    const options = this.graph.getOptions();

    const animationType = options?.[itemType]?.animate?.[stage] || false;
    const animationOptions = options?.[itemType]?.animate?.[stage];
    if (!animationType) return;

    // TODO 待处理 onCancel, onFinish
    const { type, onCancel, onFinish, ...restOptions } = animationOptions;
    const factor = getPlugin('animate', type);
    if (!factor) invariant(`Unknown animate type: ${type}`);

    return factor({ options: restOptions });
  }

  protected computeStyle() {
    this.computePaletteStyle();
    this.computeElementsDefaultStyle();
    this.computeElementsStatesStyle();
  }

  /**
   * <zh/> 清除元素的计算样式、状态、图形实例
   *
   * <en/> clear computed style, state and shape instance of element
   * @description
   * <zh/> 通常是在元素被销毁时调用
   *
   * <en/> Usually called when the element is destroyed
   */
  protected clearElement(ids: ID[]) {
    ids.forEach((id) => {
      delete this.#paletteStyle[id];
      delete this.#defaultStyle[id];
      delete this.#statesStyle[id];
      this.#elementState.delete(id);
      this.#elementMap.delete(id);
    });
  }

  protected getElementComputedStyle(itemType: ItemType, id: ID) {
    const states = this.getElementStateById(id);

    // 优先级(从低到高) Priority (from low to high):
    // preset style
    const presetStyle = this.getPresetStyle(itemType, id);
    // theme style
    const themeStyle = this.getThemeStyle(itemType, states);
    // palette style
    const paletteStyle = this.getPaletteStyleById(id);
    // data style
    const dataStyle = this.getDataStyleById(id);
    // mapper.style
    const defaultStyle = this.getDefaultStyleById(id);
    // mapper.state.style
    const statesStyle = this.getStateStyleById(id);

    const style = Object.assign({}, presetStyle, themeStyle, paletteStyle, dataStyle, defaultStyle, statesStyle);

    if (itemType === 'edge') {
      Object.assign(style, this.getEdgeEnds(id));
    }

    if (itemType === 'combo') {
      Object.assign(style, this.getComboChildren(id));
    }

    return style;
  }

  #elementMap = new Map<ID, DisplayObject>();

  protected getElementById<T extends DisplayObject = BaseElement<any>>(id: ID) {
    return this.#elementMap.get(id) as T;
  }

  protected getElementData(itemType: ItemType) {
    const { controller } = this.#context;
    switch (itemType) {
      case 'node':
        return controller.data.getNodeData();
      case 'edge':
        return controller.data.getEdgeData();
      case 'combo':
        return controller.data.getComboData();
      default:
        return [];
    }
  }

  public getElementStateById(id: ID) {
    return this.#elementState.get(id) || [];
  }

  public getElementsIdByState(state: string) {
    const ids: ID[] = [];
    for (const [id, states] of this.#elementState.entries()) {
      if (states.includes(state)) ids.push(id);
    }
  }

  /**
   * <zh/> 开始绘制流程
   *
   * <en/> start render process
   */
  public async render(params: RenderParams) {
    return this.ready.then(() => {
      const { context } = params;
      this.#context = context;

      const tasks = this.tasks;

      if (tasks.length === 0) return;
      const {
        NodeAdded = [],
        NodeRemoved = [],
        NodeDataUpdated = [],
        EdgeAdded = [],
        EdgeRemoved = [],
        EdgeUpdated = [],
        EdgeDataUpdated = [],
        // TreeStructureChanged,
      } = groupBy(tasks, (change) => change.type) as GroupedChanges;

      // 重新计算样式
      this.computeStyle();

      const dataController = this.#context.controller.data;

      // 计算要新增的元素
      // compute elements to add
      const nodeLikeToAdd = dataController.getNodeLikeData(NodeAdded.map((datum) => datum.value.id));
      const { nodes: nodesToAdd, combos: combosToAdd } = dataController.divideNodeLikeData(nodeLikeToAdd);

      const edgesToAdd = dataController.getEdgeData(EdgeAdded.map((datum) => datum.value.id));

      // 计算要更新的元素
      // compute elements to update

      const nodeLikeToUpdate = dataController.getNodeLikeData(NodeDataUpdated.map((datum) => datum.id));
      const { nodes: nodesToUpdate, combos: combosToUpdate } = dataController.divideNodeLikeData(nodeLikeToUpdate);

      const edgesToUpdate = dataController.getEdgeData(
        Array.from(new Set([...EdgeUpdated, ...EdgeDataUpdated].map((datum) => datum.id))),
      );

      // 计算要删除的元素
      // compute elements to remove
      const nodeLikeToRemove = NodeRemoved.map((datum) => datum.value.data);
      const { nodes: nodesToRemove, combos: combosToRemove } = dataController.divideNodeLikeData(nodeLikeToRemove);

      const edgesToRemove = EdgeRemoved.map((datum) => datum.value.data);

      // 如果更新了节点，需要更新连接的边和所处的 combo
      // If the node is updated, the connected edge and the combo it is in need to be updated
      nodesToUpdate
        .map((node) => dataController.getRelatedEdgesData(node.id))
        .flat()
        .forEach((edge) => {
          if (!edgesToUpdate.find((item) => item.id === edge.id)) edgesToUpdate.push(edge);
        });

      dataController
        .getComboData(
          [...nodesToUpdate, ...nodesToRemove, ...combosToUpdate, ...combosToRemove]
            .map((node) => node?.style?.parentId)
            .filter((id) => id !== undefined),
        )
        .forEach((combo) => {
          if (!combosToUpdate.find((item) => item.id === combo.id)) combosToUpdate.push(combo);
        });

      console.log(groupBy(tasks, (change) => change.type));

      // 执行变更
      // execute changes
      this.destroyElements({ nodes: nodesToRemove, edges: edgesToRemove, combos: combosToRemove });
      this.createElements({ nodes: nodesToAdd, edges: edgesToAdd, combos: combosToAdd });
      this.updateElements({ nodes: nodesToUpdate, edges: edgesToUpdate, combos: combosToUpdate });

      this.postRender();
      this.#tasks = [];
    });
  }

  #postRenderStack: (() => void)[] = [];
  protected pushPostRenderStack(callback: () => void) {
    this.#postRenderStack.push(callback);
  }

  protected postRender() {
    this.#postRenderStack.forEach((task) => task());
    this.#postRenderStack = [];
  }

  public update(params: ElementUpdateParams) {
    const { changes } = params;
    this.#tasks.push(...changes);
  }

  public setState(ids: ID[], state: string[]) {
    ids.forEach((id) => {
      this.#elementState.set(id, [...state]);
    });
    this.computeElementsStatesStyle(ids);
  }

  public getState(id: ID) {
    return this.getElementStateById(id);
  }

  protected onMapperChange() {}

  public setVisibility() {}

  public getVisibility() {}

  public setZIndex() {}

  public getZIndex() {}

  protected onThemeChange() {}

  protected getShapeType(itemType: ItemType, datum: ElementDatum) {
    const type = datum?.style?.type;
    if (type) return type;
    return itemType === 'edge' ? 'line-edge' : `circle-${itemType}`;
  }

  protected createElement(itemType: ItemType, datum: ElementDatum, animate?: AnimationExecutor) {
    const { id } = datum;
    const currentShape = this.getElementById(id);
    if (currentShape) invariant(`Element ${id} already exists.`);

    // get shape constructor
    const shapeType = this.getShapeType(itemType, datum);
    const Ctor = getPlugin(itemType, shapeType);
    if (!Ctor) invariant(`Unknown element type: ${shapeType}.`);

    const shape = this.container[itemType].appendChild(
      new Ctor({
        style: {
          graph: this.graph,
          ...this.getElementComputedStyle(itemType, id),
        },
      }),
    );

    assignType(shape, shapeType);

    this.pushPostRenderStack(() => {
      animate?.(shape);
    });

    this.#elementMap.set(id, shape);
  }

  protected createElements(data: DataOptions) {
    // 新增相应的元素数据
    // 重新计算色板样式

    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ItemType, ElementData][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    iteration.forEach(([itemType, elementData]) => {
      const animate = this.getElementAnimation(itemType, 'enter');
      elementData.forEach((datum) => this.createElement(itemType, datum, animate));
    });
  }

  /**
   * <zh/> 处理元素类型变更
   *
   * <en/> handle element type change
   * @description
   * <zh/> 销毁原有的图形实例，重新创建图形实例
   *
   * <en/> Destroy the original shape instance and recreate the shape instance
   */
  protected handleTypeChange(itemType: ItemType, datum: ElementDatum) {
    const { id } = datum;
    const originalShapeType = typeOf(this.getElementById(id));
    const modifiedShapeType = this.getShapeType(itemType, datum);
    if (originalShapeType && originalShapeType !== modifiedShapeType) {
      this.destroyElement(datum);
      this.createElement(itemType, datum);
    }
  }

  protected async updateElement(itemType: ItemType, datum: ElementDatum, animate?: AnimationExecutor) {
    this.handleTypeChange(itemType, datum);

    const { id } = datum;
    const shape = this.getElementById(id);
    const style = this.getElementComputedStyle(itemType, id);
    const sourceStyle = { ...shape.attributes };

    if ('update' in shape) {
      shape.update(style);
    } else {
      (shape as DisplayObject).attr(style);
    }

    this.pushPostRenderStack(() => animate?.(shape, {}, sourceStyle));
  }

  protected updateElements(data: DataOptions) {
    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ItemType, ElementData][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    iteration.forEach(([itemType, elementData]) => {
      const animate = this.getElementAnimation(itemType, 'update');
      elementData.forEach((datum) => this.updateElement(itemType, datum, animate));
    });
  }

  protected destroyElement(datum: ElementDatum, animate?: AnimationExecutor) {
    const { id } = datum;
    const element = this.#elementMap.get(id);
    if (!element) return;

    const animateResult = animate?.(element);

    const handleDestroy = () => {
      element.destroy();
    };

    if (animateResult) animateResult.onfinish = () => handleDestroy();
    else handleDestroy();
  }

  protected destroyElements(data: DataOptions) {
    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ItemType, ElementData][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    // 移除相应的元素数据
    // 重新计算色板样式，如果是分组色板，则不需要重新计算
    iteration.forEach(([itemType, elementData]) => {
      const animate = this.getElementAnimation(itemType, 'exit');
      elementData.forEach((datum) => this.destroyElement(datum, animate));
      this.clearElement(elementData.map((datum) => datum.id));
    });
  }

  public expandNodeLike() {}

  public collapseNodeLike() {}
}

/**
 * <zh/> 计算支持回调的动态样式
 *
 * <en/> compute dynamic style that supports callback
 * @param datum - <zh/> 元素数据 | <en/> element data
 * @param callableStyle - <zh/> 动态样式 | <en/> dynamic style
 * @returns <zh/> 静态样式 | <en/> static style
 */
function computeElementCallbackStyle(
  datum: ElementDatum,
  callableStyle: CallableObject<Record<string, unknown>, [ElementData]>,
) {
  return Object.fromEntries(
    Object.entries(callableStyle).map(([key, style]) => {
      if (isFunction(style)) return [key, style(datum)];
      return [key, style];
    }),
  );
}

const TYPE_KEY = '__TYPE__';

/**
 * <zh/> 给元素添加非标类型属性
 *
 * <en/> add non-standard type properties to the element
 */
function assignType(shape: DisplayObject, type: string) {
  Object.assign(shape, { [TYPE_KEY]: type });
}

/**
 * <zh/> 获取元素的非标类型属性
 *
 * <en/> get non-standard type properties of the element
 * @param shape - <zh/> 元素 | <en/> element
 * @returns <zh/> 元素类型 | <en/> element type
 */
function typeOf(shape: DisplayObject): string {
  return shape[TYPE_KEY];
}
