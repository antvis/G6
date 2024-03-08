/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps, DisplayObject, IAnimation } from '@antv/g';
import { Group } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { groupBy, isUndefined, pick } from '@antv/util';
import { executor as animationExecutor } from '../animations';
import type { AnimationContext } from '../animations/types';
import { AnimationType, ChangeTypeEnum, GraphEvent } from '../constants';
import type { BaseNode } from '../elements/nodes';
import type { BaseShape } from '../elements/shapes';
import { getExtension } from '../registry';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type { EdgeStyle } from '../spec/element/edge';
import type { NodeLikeStyle } from '../spec/element/node';
import type {
  AnimatableTask,
  Combo,
  DataChange,
  Edge,
  ElementData,
  ElementDatum,
  ElementType,
  LayoutResult,
  Node,
  Positions,
  State,
  States,
  StyleIterationContext,
  ZIndex,
} from '../types';
import { executeAnimatableTasks, inferDefaultValue, withAnimationCallbacks } from '../utils/animation';
import { cacheStyle, getCachedStyle, setCacheStyle } from '../utils/cache';
import { reduceDataChanges } from '../utils/change';
import { updateStyle } from '../utils/element';
import type { BaseEvent } from '../utils/event';
import {
  AnimateEvent,
  ElementStateChangeEvent,
  ElementTranslateEvent,
  ElementVisibilityChangeEvent,
  ElementZIndexChangeEvent,
  GraphLifeCycleEvent,
} from '../utils/event';
import { idOf, parentIdOf } from '../utils/id';
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { computeElementCallbackStyle } from '../utils/style';
import { setVisibility } from '../utils/visibility';
import type { RuntimeContext } from './types';

export class ElementController {
  private context: RuntimeContext;

  private container!: {
    node: Group;
    edge: Group;
    combo: Group;
  };

  private elementMap: Record<ID, DisplayObject> = {};

  private shapeTypeMap: Record<ID, string> = {};

  constructor(context: RuntimeContext) {
    this.context = context;
    this.initElementState(toProcedureData(context.options.data));
  }

  public init() {
    const { canvas } = this.context;
    if (!this.container) {
      this.container = {
        node: canvas.appendChild(new Group({ style: { zIndex: 2 } })),
        edge: canvas.appendChild(new Group({ style: { zIndex: 1 } })),
        combo: canvas.appendChild(new Group({ style: { zIndex: 0 } })),
      };
    }
  }

  private emit(event: BaseEvent) {
    const { graph } = this.context;
    graph.emit(event.type, event);
  }

  private getElementData(elementType: ElementType, ids?: ID[]) {
    const { model } = this.context;

    switch (elementType) {
      case 'node':
        return model.getNodeData(ids);
      case 'edge':
        return model.getEdgeData(ids);
      case 'combo':
        return model.getComboData(ids);
      default:
        return [];
    }
  }

  private forEachElementData(callback: (elementType: ElementType, elementData: ElementData) => void) {
    const elementTypes: ElementType[] = ['node', 'edge', 'combo'];
    elementTypes.forEach((elementType) => {
      const elementData = this.getElementData(elementType);
      callback(elementType, elementData);
    });
  }

  private runtimeStyle: Record<ID, Record<string, unknown>> = {};

  private getRuntimeStyle(id: ID) {
    return this.runtimeStyle[id] || {};
  }

  private setRuntimeStyle(id: ID, style: Record<string, unknown>) {
    if (!this.runtimeStyle[id]) this.runtimeStyle[id] = { ...style };
    else Object.assign(this.runtimeStyle[id], style);
  }

  private getTheme(elementType: ElementType) {
    const { theme } = this.context.options;
    if (!theme) return {};

    const themeConfig = getExtension('theme', theme);
    return themeConfig?.[elementType] || {};
  }

  public getThemeStyle(elementType: ElementType) {
    return this.getTheme(elementType).style || {};
  }

  public getThemeStateStyle(elementType: ElementType, states: State[]) {
    const { state = {} } = this.getTheme(elementType);
    return Object.assign({}, ...states.map((name) => state[name] || {}));
  }

  private paletteStyle: Record<ID, string> = {};

  private computePaletteStyle() {
    const { options } = this.context;

    this.paletteStyle = {};

    this.forEachElementData((elementType, elementData) => {
      const palette = parsePalette(this.getTheme(elementType)?.palette || options[elementType]?.palette);
      if (palette) {
        Object.assign(this.paletteStyle, assignColorByPalette(elementData, palette));
      }
    });
  }

  public getPaletteStyle(id: ID) {
    return {
      color: this.paletteStyle[id],
    };
  }

  public getDataStyle(elementType: ElementType, id: ID): NodeLikeStyle | EdgeStyle {
    const datum = this.getElementData(elementType, [id])?.[0];
    return datum?.style || {};
  }

  private defaultStyle: Record<ID, Record<string, unknown>> = {};

  /**
   * <zh/> 计算单个元素的默认样式
   *
   * <en/> compute default style of single element
   */
  private computedElementDefaultStyle(elementType: ElementType, context: StyleIterationContext) {
    const { options } = this.context;
    const defaultStyle = options[elementType]?.style || {};
    this.defaultStyle[idOf(context.datum)] = computeElementCallbackStyle(defaultStyle, context);
  }

  private computeElementsDefaultStyle(ids?: ID[]) {
    this.forEachElementData((elementType, elementData) => {
      elementData
        .filter((datum) => ids === undefined || ids.includes(idOf(datum)))
        .forEach((datum, index) => {
          this.computedElementDefaultStyle(elementType, { datum, index, elementData });
        });
    });
  }

  public getDefaultStyle(id: ID) {
    return this.defaultStyle[id] || {};
  }

  public elementState: Record<ID, State[]> = {};

  /**
   * <zh/> 从数据中初始化元素状态
   *
   * <en/> Initialize element state from data
   */
  private initElementState(data: ProcedureData) {
    Object.values(data).forEach((collect) => {
      collect.forEach((datum, id) => {
        const states = datum.style?.states || [];
        this.elementState[id] = states;
      });
    });
  }

  public setElementsState(states: States) {
    const procedureData: ProcedureData = toProcedureData();

    Object.entries(states).forEach(([id, state]) => {
      this.elementState[id] = state;
      const elementType = this.context.model.getElementType(id);
      const datum = this.context.model.getElementsData([id])[0];
      this.computeElementStatesStyle(elementType, state, { datum, index: 0, elementData: [datum] as ElementData });
      procedureData[`${elementType}s`].set(id, datum as any);
    });

    const tasks = this.getUpdateTasks(procedureData, { animation: false });

    executeAnimatableTasks(tasks, {
      before: () => this.emit(new ElementStateChangeEvent(GraphEvent.BEFORE_ELEMENT_STATE_CHANGE, states)),
      beforeAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.ELEMENT_STATE_CHANGE, animation, states)),
      afterAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.ELEMENT_STATE_CHANGE, animation, states)),
      after: () => this.emit(new ElementStateChangeEvent(GraphEvent.AFTER_ELEMENT_STATE_CHANGE, states)),
    });
  }

  /**
   * <zh/> 获取指定元素的状态
   *
   * <en/> Get the state of the specified element
   * @param id - <zh/> 元素 id | <en/> element id
   * @returns <zh/> 元素状态数组 | <en/> element state array
   */
  public getElementStates(id: ID): State[] {
    return this.elementState[id] || [];
  }

  private stateStyle: Record<ID, Record<string, unknown>> = {};

  /**
   * <zh/> 获取单个元素的单个状态的样式
   *
   * <en/> get single state style of single element
   */
  private getElementStateStyle(elementType: ElementType, state: State, context: StyleIterationContext) {
    const { options } = this.context;
    const stateStyle = options[elementType]?.state?.[state] || {};
    return computeElementCallbackStyle(stateStyle, context);
  }

  /**
   * <zh/> 计算单个元素的合并状态样式
   *
   * <en/> compute merged state style of single element
   */
  private computeElementStatesStyle(elementType: ElementType, states: State[], context: StyleIterationContext) {
    this.stateStyle[idOf(context.datum)] = Object.assign(
      {},
      ...states.map((state) => this.getElementStateStyle(elementType, state, context)),
    );
  }

  /**
   * <zh/> 计算全部元素的状态样式
   *
   * <en/> compute state style of all elements
   * @param ids - <zh/> 计算指定元素的状态样式 | <en/> compute state style of specified elements
   */
  private computeElementsStatesStyle(ids?: ID[]) {
    this.forEachElementData((elementType, elementData) => {
      elementData
        .filter((datum) => ids === undefined || ids.includes(idOf(datum)))
        .forEach((datum, index) => {
          const states = this.getElementStates(idOf(datum));
          this.computeElementStatesStyle(elementType, states, { datum, index, elementData });
        });
    });
  }

  public getStateStyle(id: ID) {
    return this.stateStyle[id] || {};
  }

  private computeStyle(ids?: ID[]) {
    this.computePaletteStyle();
    this.computeElementsDefaultStyle(ids);
    this.computeElementsStatesStyle(ids);
  }

  public getElement<T extends DisplayObject = BaseShape<any>>(id: ID): T | undefined {
    return this.elementMap[id] as T;
  }

  public getNodes() {
    return this.container.node.children as Node[];
  }

  public getEdges() {
    return this.container.edge.children as Edge[];
  }

  public getCombos() {
    return this.container.combo.children as Combo[];
  }

  private getAnimation(elementType: ElementType, stage: AnimationStage) {
    const { options } = this.context;

    const userDefined = options?.[elementType]?.animation;
    if (userDefined === false) return false;
    const userDefinedStage = userDefined?.[stage];
    if (userDefinedStage) return userDefinedStage;

    const themeDefined = this.getTheme(elementType)?.animation;
    if (themeDefined === false) return false;
    const themeDefinedStage = themeDefined?.[stage];

    return themeDefinedStage ?? false;
  }

  private getAnimationExecutor(
    elementType: ElementType,
    stage: AnimationStage,
    animation: boolean = true,
    context?: Partial<AnimationContext>,
  ): AnimationExecutor {
    const { options } = this.context;

    if (options.animation === false || !animation) return () => null;

    return (
      id: ID,
      shape: DisplayObject,
      originalStyle: Record<string, unknown>,
      modifiedStyle?: Record<string, unknown>,
    ) => {
      return animationExecutor(
        shape,
        this.getAnimation(elementType, stage),
        {},
        {
          originalStyle,
          modifiedStyle,
          states: this.getElementStates(id),
          ...context,
        },
      );
    };
  }

  /**
   * <zh/> 获取状态为指定状态的元素
   *
   * <en/> Get elements with the specified state
   * @param state - <zh/> 状态或状态数组 | <en/> state or state array
   * @returns <zh/> 元素 id 与元素实例的键值对 | <en/> key-value pairs of element id and element instance
   */
  public getElementsByState(state: State | State[]): Record<string, DisplayObject> {
    return Object.fromEntries(
      Object.entries(this.elementState)
        .filter(([, states]) => {
          return (Array.isArray(state) ? state : [state]).every((s) => states.includes(s));
        })
        .map(([id]) => [id, this.elementMap[id]]),
    );
  }

  /**
   * <zh/> 获取边端点连接上下文
   *
   * <en/> Get edge end context
   * @param id - <zh/> 边 id | <en/> edge id
   * @returns <zh/> 边端点连接上下文 | <en/> edge end context
   * @description
   * <zh/> 只提供了最基本的节点示例和连接点位置信息，更多的上下文信息需要在边元素中计算
   *
   * <en/> Only the most basic node instances and connection point position information are provided, and more context information needs to be calculated in the edge element
   */
  private getEdgeEndsContext(id: ID) {
    const { model } = this.context;

    const data = model.getEdgeData([id])?.[0];
    if (!data) return {};

    const { source, target } = data;
    const sourceNode = this.getElement<BaseNode>(source);
    const targetNode = this.getElement<BaseNode>(target);

    return {
      sourceNode,
      targetNode,
    };
  }

  private getComboChildren(id: ID) {
    const { model } = this.context;

    return model.getComboChildrenData(id).map((datum) => this.getElement(idOf(datum))!);
  }

  public getElementComputedStyle(elementType: ElementType, id: ID) {
    // 优先级(从低到高) Priority (from low to high):
    const themeStyle = this.getThemeStyle(elementType);
    const paletteStyle = this.getPaletteStyle(id);
    const dataStyle = this.getDataStyle(elementType, id);
    const defaultStyle = this.getDefaultStyle(id);
    const themeStateStyle = this.getThemeStateStyle(elementType, this.getElementStates(id));
    const stateStyle = this.getStateStyle(id);
    const runtimeStyle = this.getRuntimeStyle(id);

    const style = Object.assign(
      {},
      themeStyle,
      paletteStyle,
      dataStyle,
      defaultStyle,
      themeStateStyle,
      stateStyle,
      runtimeStyle,
    );

    if (elementType === 'edge') {
      Object.assign(style, this.getEdgeEndsContext(id));
    } else if (elementType === 'combo') {
      Object.assign(style, {
        children: this.getComboChildren(id),
      });
    }

    if (!style.type) {
      style.type = { node: 'circle', edge: 'line', combo: 'circle' }[elementType];
    }

    return style;
  }

  /**
   * <zh/> 开始绘制流程
   *
   * <en/> start render process
   */
  public async draw() {
    const drawData = this.computeDrawData();
    if (!drawData) return;
    this.init();

    // 计算样式 / Calculate style
    this.computeStyle();

    // 创建渲染任务 / Create render task
    const { add, update, remove } = drawData;
    const renderContext = { animation: true };
    const destroyTasks = this.getDestroyTasks(remove, renderContext);
    const createTasks = this.getCreateTasks(add, renderContext);
    const updateTasks = this.getUpdateTasks(update, renderContext);

    return executeAnimatableTasks([...destroyTasks, ...createTasks, ...updateTasks], {
      before: () => this.emit(new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW)),
      beforeAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.DRAW, animation, drawData)),
      afterAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.DRAW, animation, drawData)),
      after: () => this.emit(new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW)),
    })?.finished.then(() => {});
  }

  private computeDrawData() {
    const { model } = this.context;

    const tasks = reduceDataChanges(model.getChanges());
    if (tasks.length === 0) return null;

    const {
      NodeAdded = [],
      NodeUpdated = [],
      NodeRemoved = [],
      EdgeAdded = [],
      EdgeUpdated = [],
      EdgeRemoved = [],
      ComboAdded = [],
      ComboUpdated = [],
      ComboRemoved = [],
    } = groupBy(tasks, (change) => change.type) as unknown as Record<`${ChangeTypeEnum}`, DataChange[]>;

    const dataOf = <T extends DataChange['value']>(data: DataChange[]) =>
      new Map(
        data.map((datum) => {
          const data = datum.value;
          return [idOf(data), data] as [ID, T];
        }),
      );

    const input: FlowData = {
      add: {
        nodes: dataOf<NodeData>(NodeAdded),
        edges: dataOf<EdgeData>(EdgeAdded),
        combos: dataOf<ComboData>(ComboAdded),
      },
      update: {
        nodes: dataOf<NodeData>(NodeUpdated),
        edges: dataOf<EdgeData>(EdgeUpdated),
        combos: dataOf<ComboData>(ComboUpdated),
      },
      remove: {
        nodes: dataOf<NodeData>(NodeRemoved),
        edges: dataOf<EdgeData>(EdgeRemoved),
        combos: dataOf<ComboData>(ComboRemoved),
      },
    };

    const output = [this.updateRelatedEdgeFlow, this.updateRelatedComboFlow].reduce((data, flow) => flow(data), input);

    this.initElementState(output.update);

    return output;
  }

  /**
   * 如果更新了节点，需要更新连接的边
   * If the node is updated, the connected edge and the combo it is in need to be updated
   */
  private updateRelatedEdgeFlow: Flow = (input) => {
    const { model } = this.context;
    const {
      update: { nodes, edges },
    } = input;

    nodes.forEach((_, id) => {
      const relatedEdgesData = model.getRelatedEdgesData(id);
      relatedEdgesData.forEach((edge) => edges.set(idOf(edge), edge));
    });

    return input;
  };

  /**
   * 如果操作（新增/更新/移除）了节点或 combo，需要更新相对应的 combo
   * If nodes or combos are operated (added/updated/removed), the related combo needs to be updated
   */
  private updateRelatedComboFlow: Flow = (input) => {
    const { add, update, remove } = input;
    const { model } = this.context;

    const comboIds = [add.nodes, update.nodes, remove.nodes, add.combos, update.combos, remove.combos].reduce(
      (acc, data) => {
        data.forEach((datum) => {
          const parentId = parentIdOf(datum);
          if (parentId !== undefined) acc.push(parentId);
        });
        return acc;
      },
      [] as ID[],
    );

    model.getComboData(comboIds).forEach((combo, index) => update.combos.set(comboIds[index], combo));

    return input;
  };

  private createElement(elementType: ElementType, datum: ElementDatum, context: RenderContext) {
    const { animator } = context;
    const id = idOf(datum);
    const currentShape = this.getElement(id);
    if (currentShape) return () => null;
    const { type, ...style } = this.getElementComputedStyle(elementType, id);

    // get shape constructor
    const Ctor = getExtension(elementType, type);
    if (!Ctor) return () => null;
    const shape = this.container[elementType].appendChild(
      new Ctor({
        id,
        style: {
          context: this.context,
          ...style,
        },
      }),
    ) as DisplayObject;

    this.shapeTypeMap[id] = type;
    this.elementMap[id] = shape;

    return () => animator?.(id, shape, { ...shape.attributes, opacity: 0 }) || null;
  }

  private getCreateTasks(data: ProcedureData, context: Omit<RenderContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return;
      const animator = this.getAnimationExecutor(elementType, 'enter');
      elementData.forEach((datum) =>
        tasks.push(() => this.createElement(elementType, datum, { ...context, animator })),
      );
    });

    return tasks;
  }

  private updateElement(elementType: ElementType, datum: ElementDatum, context: RenderContext) {
    const { animator } = context;

    const id = idOf(datum);
    const shape = this.getElement(id);
    if (!shape) return () => null;
    const { type, ...style } = this.getElementComputedStyle(elementType, id);

    // 如果类型不同，需要先销毁原有元素，再创建新元素
    // If the type is different, you need to destroy the original element first, and then create a new element
    if (this.shapeTypeMap[id] !== type) {
      return () => {
        this.destroyElement(datum, { ...context, animation: false })();
        this.createElement(elementType, datum, { ...context, animation: false })();
        return null;
      };
    }

    const originalStyle = { ...shape.attributes };

    updateStyle(shape, style);

    return () => animator?.(id, shape, originalStyle) || null;
  }

  public updateNodeLikePosition(positions: Positions, animation: boolean = true, edgeIds: ID[] = []) {
    if (Object.keys(positions).length === 0) return null;
    const { model } = this.context;

    const animationsFilter: AnimationContext['animationsFilter'] = (animation) => !animation.shape;
    const nodeAnimator = this.getAnimationExecutor('node', 'update', animation, { animationsFilter });
    const comboAnimator = this.getAnimationExecutor('combo', 'update', animation, { animationsFilter });

    const nodeTasks: AnimatableTask[] = [];
    Object.entries(positions).forEach(([id, [x, y, z]]) => {
      const element = this.getElement(id);
      const elementType = this.context.model.isCombo(id) ? 'combo' : 'node';
      if (!element) return;
      // 更新原生位置属性，避免执行 render 以及 animation 调用 getXxxStyle 流程 / Update the native position attribute to avoid executing the render and animation calls to getXxxStyle
      const animator = elementType === 'combo' ? comboAnimator : nodeAnimator;
      const originalPosition = pick(element.attributes, ['x', 'y', 'z']);
      const modifiedPosition = { x, y, z };

      nodeTasks.push(() => {
        this.setRuntimeStyle(id, modifiedPosition);
        element.attr({ x, y, z });
        return () => animator(id, element, originalPosition);
      });
    });

    const edgeTasks = this.getUpdateTasks(
      toProcedureData({
        edges: model.getEdgeData(
          Object.keys(positions).reduce(
            (acc, id) => {
              if (!model.isCombo(id)) {
                model.getRelatedEdgesData(id).forEach((edge) => acc.push(idOf(edge)));
              }
              return acc;
            },
            [...edgeIds],
          ),
        ),
      }),
      { animation },
    );

    return executeAnimatableTasks([...nodeTasks, ...edgeTasks], {
      before: () => this.emit(new ElementTranslateEvent(GraphEvent.BEFORE_ELEMENT_TRANSLATE, positions)),
      beforeAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.ELEMENT_TRANSLATE, animation, positions)),
      afterAnimate: (animation) =>
        this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.ELEMENT_TRANSLATE, animation, positions)),
      after: () => this.emit(new ElementTranslateEvent(GraphEvent.AFTER_ELEMENT_TRANSLATE, positions)),
    });
  }

  /**
   * <zh/> 基于布局结果进行更新
   *
   * <en/> Update based on layout results
   */
  public updateByLayoutResult(layoutResult: LayoutResult, animation: boolean = true) {
    const { nodes: nodeLikeResults, edges: edgeResults } = layoutResult;
    if (Object.keys(nodeLikeResults).length === 0 && Object.keys(edgeResults).length === 0) return null;

    Object.entries(edgeResults).forEach(([id, style]) => {
      this.setRuntimeStyle(id, style);
    });

    this.updateNodeLikePosition(nodeLikeResults, animation, Object.keys(edgeResults));
  }

  private getUpdateTasks(data: ProcedureData, context: Omit<RenderContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    const { animation } = context;
    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return [];
      const animator = this.getAnimationExecutor(elementType, 'update', animation);
      elementData.forEach((datum) =>
        tasks.push(() => this.updateElement(elementType, datum, { ...context, animator })),
      );
    });

    return tasks;
  }

  private destroyElement(datum: ElementDatum, context: RenderContext) {
    const { animator } = context;
    const id = idOf(datum);
    const element = this.elementMap[id];
    if (!element) return () => null;

    return () => {
      const result = animator?.(id, element, { ...element.attributes }, { opacity: 0 }) || null;
      withAnimationCallbacks(result, {
        after: () => {
          this.clearElement(id);
          element.destroy();
        },
      });
      return result;
    };
  }

  private getDestroyTasks(data: ProcedureData, context: Omit<RenderContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return [];
      const animator = this.getAnimationExecutor(elementType, 'exit');
      elementData.forEach((datum) => tasks.push(() => this.destroyElement(datum, { ...context, animator })));
    });

    // TODO 重新计算色板样式，如果是分组色板，则不需要重新计算

    return tasks;
  }

  private clearElement(id: ID) {
    delete this.paletteStyle[id];
    delete this.defaultStyle[id];
    delete this.stateStyle[id];
    delete this.elementState[id];
    delete this.elementMap[id];
    delete this.shapeTypeMap[id];
    delete this.runtimeStyle[id];
  }

  public async setElementsVisibility(ids: ID[], visibility: BaseStyleProps['visibility'], animation?: boolean) {
    if (ids.length === 0) return null;

    const isHide = visibility === 'hidden';
    const nodes: ID[] = [];
    const edges: ID[] = [];
    const combos: ID[] = [];

    ids.forEach((id) => {
      const elementType = this.context.model.getElementType(id);
      if (elementType === 'node') nodes.push(id);
      if (elementType === 'edge') edges.push(id);
      if (elementType === 'combo') combos.push(id);
    });

    const iteration: [ElementType, ID[]][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    const cacheOpacity = (element: DisplayObject) => {
      if (isUndefined(getCachedStyle(element, 'opacity'))) cacheStyle(element, 'opacity');
    };

    const show = (id: ID, element: DisplayObject, animator: AnimationExecutor) => {
      const originalOpacity =
        getCachedStyle(element, 'opacity') ?? element.style.opacity ?? inferDefaultValue('opacity');
      cacheOpacity(element);
      // 由于 show 和 hide 的时序存在差异
      // - show： 立即将元素显示出来，然后执行动画
      // - hide： 先执行动画，然后隐藏元素
      // 如果在调用 hide 后立即调用 show，hide 动画完成后会将元素隐藏
      // 因此需要缓存元素最新的可见性
      //
      // Due to the difference in the timing of show and hide
      // - show: immediately shows the element and then executes the animation
      // - hide: executes the animation first, and then hides the element
      // If show is called immediately after hide,it hide the element after hide animation completed
      // Therefore, the latest visibility of the element needs to be cached
      setCacheStyle(element, 'visibility', visibility);
      setVisibility(element, visibility);
      return animator(id, element, { ...element.attributes, opacity: 0 }, { opacity: originalOpacity });
    };

    const hide = (id: ID, element: DisplayObject, animator: AnimationExecutor) => {
      const originalOpacity =
        getCachedStyle(element, 'opacity') ?? element.style.opacity ?? inferDefaultValue('opacity');

      cacheOpacity(element);
      setCacheStyle(element, 'visibility', visibility);
      const animation = animator(id, element, { ...element.attributes, opacity: originalOpacity }, { opacity: 0 });
      return withAnimationCallbacks(animation, {
        after: () => setVisibility(element, getCachedStyle(element, 'visibility')),
      });
    };

    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementIds]) => {
      if (elementIds.length === 0) return;
      const animator = this.getAnimationExecutor(elementType, isHide ? 'hide' : 'show', animation);
      elementIds.forEach((id) => {
        const element = this.getElement(id);
        if (element) {
          tasks.push(() => () => (isHide ? hide : show)(id, element, animator));
        }
      });
    });

    return executeAnimatableTasks(tasks, {
      before: () =>
        this.emit(new ElementVisibilityChangeEvent(GraphEvent.BEFORE_ELEMENT_VISIBILITY_CHANGE, ids, visibility)),
      beforeAnimate: (animation) =>
        this.emit(
          new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.ELEMENT_VISIBILITY_CHANGE, animation, {
            ids,
            visibility,
          }),
        ),
      afterAnimate: (animation) =>
        this.emit(
          new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.ELEMENT_VISIBILITY_CHANGE, animation, {
            ids,
            visibility,
          }),
        ),
      after: () =>
        this.emit(new ElementVisibilityChangeEvent(GraphEvent.AFTER_ELEMENT_VISIBILITY_CHANGE, ids, visibility)),
    });
  }

  public setElementZIndex(id: ID, zIndex: ZIndex) {
    const element = this.getElement(id);
    if (!element) return;

    this.emit(new ElementZIndexChangeEvent(GraphEvent.BEFORE_ELEMENT_Z_INDEX_CHANGE, id, zIndex));
    if (typeof zIndex === 'number') element.attr({ zIndex });
    else {
      const elementType = this.context.model.getElementType(id);
      const childNodes = this.container[elementType].childNodes as DisplayObject[];
      const delta = zIndex === 'front' ? 1 : -1;
      const parsedZIndex =
        Math[zIndex === 'front' ? 'max' : 'min'](
          ...childNodes.map((node) => node.attributes.zIndex ?? inferDefaultValue('zIndex')),
        ) + delta;
      element.attr({ zIndex: parsedZIndex });
    }
    this.emit(new ElementZIndexChangeEvent(GraphEvent.AFTER_ELEMENT_Z_INDEX_CHANGE, id, zIndex));
  }

  public destroy() {
    Object.values(this.container).forEach((container) => container.destroy());
    this.elementMap = {};
    this.shapeTypeMap = {};
    this.runtimeStyle = {};
    this.defaultStyle = {};
    this.elementState = {};
    this.stateStyle = {};
    this.paletteStyle = {};
    // @ts-expect-error force delete
    delete this.context;
  }
}

type AnimationExecutor = (
  id: ID,
  shape: DisplayObject,
  originalStyle: Record<string, unknown>,
  modifiedStyle?: Record<string, unknown>,
) => IAnimation | null;

type RenderContext = {
  animator?: AnimationExecutor;
  /** <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true */
  animation: boolean;
};

/**
 * <zh/> 在 Element Controller 中，为了提高查询性能，统一使用 Map 存储数据
 *
 * <en/> In Element Controller, in order to improve query performance, use Map to store data uniformly
 */
type ProcedureData = {
  nodes: Map<ID, NodeData>;
  edges: Map<ID, EdgeData>;
  combos: Map<ID, ComboData>;
};

type FlowData = {
  add: ProcedureData;
  update: ProcedureData;
  remove: ProcedureData;
};

type Flow = (input: FlowData) => FlowData;

/**
 * <zh/> 将 GraphData 转换为 ProcedureData
 *
 * <en/> Convert GraphData to ProcedureData
 * @param graphData - <zh/> 图数据 | <en/> graph data
 * @returns <zh/> 过程数据 | <en/> procedure data
 */
function toProcedureData(graphData: GraphData = {}): ProcedureData {
  const { nodes, edges, combos } = graphData;
  return {
    nodes: toProcedureDatum<NodeData>(nodes),
    edges: toProcedureDatum<EdgeData>(edges),
    combos: toProcedureDatum<ComboData>(combos),
  };
}

/**
 * <zh/> 将 ElementData 转换为 ProcedureDatum
 *
 * <en/> Convert ElementData to ProcedureDatum
 * @param datum - <zh/> 元素数据 | <en/> element data
 * @returns <zh/> 过程数据 | <en/> procedure data
 */
function toProcedureDatum<T extends ElementDatum>(datum: T[] = []) {
  return new Map(datum.map((datum) => [idOf(datum), datum as any])) as Map<ID, T>;
}
