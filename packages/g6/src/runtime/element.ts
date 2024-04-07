/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps, DisplayObject, IAnimation } from '@antv/g';
import { Group } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { groupBy, isEmpty } from '@antv/util';
import { executor as animationExecutor } from '../animations';
import type { AnimationContext } from '../animations/types';
import { AnimationType, ChangeTypeEnum, GraphEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import type { BaseNode } from '../elements/nodes';
import type { BaseShape } from '../elements/shapes';
import { getExtension } from '../registry';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type {
  AnimatableTask,
  Combo,
  DataChange,
  Edge,
  ElementData,
  ElementDatum,
  ElementType,
  Node,
  NodeLike,
  NodeLikeData,
  State,
  StyleIterationContext,
} from '../types';
import { executeAnimatableTasks, inferDefaultValue, withAnimationCallbacks } from '../utils/animation';
import { cacheStyle, getCachedStyle, hasCachedStyle } from '../utils/cache';
import { reduceDataChanges } from '../utils/change';
import { getSubgraphRelatedEdges } from '../utils/edge';
import { updateStyle } from '../utils/element';
import type { BaseEvent } from '../utils/event';
import { AnimateEvent, ElementLifeCycleEvent, GraphLifeCycleEvent, emit } from '../utils/event';
import { idOf } from '../utils/id';
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { computeElementCallbackStyle } from '../utils/style';
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
  }

  public init() {
    if (!this.container) {
      const { canvas } = this.context;
      this.container = {
        node: canvas.appendChild(new Group({ style: { zIndex: 2 } })),
        edge: canvas.appendChild(new Group({ style: { zIndex: 1 } })),
        combo: canvas.appendChild(new Group({ style: { zIndex: 0 } })),
      };
    }
  }

  private emit(event: BaseEvent) {
    emit(this.context.graph, event);
  }

  private forEachElementData(callback: (elementType: ElementType, elementData: ElementData) => void) {
    ELEMENT_TYPES.forEach((elementType) => {
      const elementData = this.context.model.getElementData(elementType);
      callback(elementType, elementData);
    });
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
      const palette = Object.assign(
        {},
        parsePalette(this.getTheme(elementType)?.palette),
        parsePalette(options[elementType]?.palette),
      );
      if (!isEmpty(palette) && palette?.field) {
        Object.assign(this.paletteStyle, assignColorByPalette(elementData, palette));
      }
    });
  }

  public getPaletteStyle(id: ID) {
    const color = this.paletteStyle[id];
    if (!color) return {};

    return { color };
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
    this.defaultStyle[idOf(context.datum)] = computeElementCallbackStyle(defaultStyle as any, context);
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

  private getElementState(id: ID) {
    try {
      const { model } = this.context;
      return model.getElementState(id);
    } catch {
      return [];
    }
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
    return computeElementCallbackStyle(stateStyle as any, context);
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
          const states = this.getElementState(idOf(datum));
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
          states: this.getElementState(id),
          ...context,
        },
      );
    };
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
  private getEdgeEndsContext(datum: EdgeData) {
    const { source, target } = datum;
    const sourceNode = this.getElement<BaseNode>(source);
    const targetNode = this.getElement<BaseNode>(target);

    return { sourceNode, targetNode };
  }

  public getElementComputedStyle(elementType: ElementType, datum: ElementDatum) {
    const id = idOf(datum);
    // 优先级(从低到高) Priority (from low to high):
    const themeStyle = this.getThemeStyle(elementType);
    const paletteStyle = this.getPaletteStyle(id);
    const dataStyle = datum.style || {};
    const defaultStyle = this.getDefaultStyle(id);
    const themeStateStyle = this.getThemeStateStyle(elementType, this.getElementState(id));
    const stateStyle = this.getStateStyle(id);

    const style = Object.assign({}, themeStyle, paletteStyle, dataStyle, defaultStyle, themeStateStyle, stateStyle);

    if (elementType === 'edge') {
      Object.assign(style, this.getEdgeEndsContext(datum as EdgeData));
    } else if (elementType === 'combo') {
      const childrenData = this.context.model.getChildrenData(id);
      const isCollapsed = !!style.collapsed;
      const childrenNode = isCollapsed
        ? []
        : (childrenData.map((child) => this.getElement(idOf(child))).filter(Boolean) as NodeLike[]);
      Object.assign(style, { childrenNode, childrenData });
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
  public async draw(drawContext: DrawContext = { animation: true }) {
    this.init();

    const drawData = this.computeDrawData();
    if (!drawData) return;

    // 计算样式 / Calculate style
    this.computeStyle();

    // 创建渲染任务 / Create render task
    const { add, update, remove } = drawData;
    const destroyTasks = this.getDestroyTasks(remove, drawContext);
    const createTasks = this.getCreateTasks(add, drawContext);
    const updateTasks = this.getUpdateTasks(update, drawContext);

    await executeAnimatableTasks(
      [...destroyTasks, ...createTasks, ...updateTasks],
      drawContext.silence
        ? {}
        : {
            before: () => this.emit(new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW)),
            beforeAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.DRAW, animation, drawData)),
            afterAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.DRAW, animation, drawData)),
            after: () => this.emit(new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW)),
          },
    )?.finished;
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

    const flows: Flow[] = [this.updateRelatedEdgeFlow, this.arrangeDrawOrderFlow, this.collapseExpandFlow];
    const output = flows.reduce((data, flow) => flow(data), input);
    return output;
  }

  /**
   * 如果更新了节点 / combo，需要更新连接的边
   * If the node / combo is updated, the connected edge and the combo it is in need to be updated
   */
  private updateRelatedEdgeFlow: Flow = (input) => {
    const { model } = this.context;
    const {
      update: { nodes, edges, combos },
    } = input;

    const addRelatedEdges = (_: NodeLikeData, id: ID) => {
      const relatedEdgesData = model.getRelatedEdgesData(id);
      relatedEdgesData.forEach((edge) => edges.set(idOf(edge), edge));
    };

    nodes.forEach(addRelatedEdges);
    combos.forEach(addRelatedEdges);

    return input;
  };

  /**
   * <zh/> 调整元素绘制顺序
   *
   * <en/> Adjust the drawing order of elements
   */
  private arrangeDrawOrderFlow: Flow = (input) => {
    const { model } = this.context;

    const combosToAdd = input.add.combos;

    const order: [ID, ComboData, number][] = [];
    combosToAdd.forEach((combo, id) => {
      const ancestors = model.getAncestorsData(id, 'combo');
      const path = ancestors.map((ancestor) => idOf(ancestor)).reverse();
      // combo 的 zIndex 为距离根 combo 的深度
      // The zIndex of the combo is the depth from the root combo
      order.push([id, combo, path.length]);
    });

    input.add.combos = new Map(
      order
        // 基于 zIndex 降序排序，优先绘制子 combo / Sort based on zIndex in descending order, draw child combo first
        .sort(([, , zIndex1], [, , zIndex2]) => zIndex2 - zIndex1)
        .map(([id, datum]) => [id, datum]),
    );

    return input;
  };

  /**
   * <zh/> 处理元素的收起和展开
   *
   * <en/> Process the collapse and expand of elements
   */
  private collapseExpandFlow: Flow = (input) => {
    const { model } = this.context;
    const { add, update } = input;
    /**
     * <zh/> 重新分配绘制任务
     *
     * <en/> Reassign drawing tasks
     */
    const reassignTo = (type: 'add' | 'update' | 'remove', elementType: ElementType, datum: ElementDatum) => {
      const typeName = `${elementType}s` as keyof ProcedureData;
      Object.entries(input).forEach(([_type, value]) => {
        if (type === _type) value[typeName].set(idOf(datum), datum as any);
        else value[typeName].delete(idOf(datum));
      });
    };

    // combo 添加和更新的顺序为先子后父，因此采用倒序遍历
    // The order of adding and updating combos is first child and then parent, so reverse traversal is used
    const combos = [...input.update.combos.entries(), ...input.add.combos.entries()];
    while (combos.length) {
      const [id, combo] = combos.pop()!;

      const isCollapsed = !!combo.style?.collapsed;
      if (isCollapsed) {
        const descendants = model.getDescendantsData(id);
        const descendantIds = descendants.map(idOf);
        const { internal, external } = getSubgraphRelatedEdges(descendantIds, (id) => model.getRelatedEdgesData(id));

        // 移除所有后代元素 / Remove all descendant elements
        descendants.forEach((descendant) => {
          const descendantId = idOf(descendant);
          // 不再处理当前 combo 的后代 combo
          // No longer process the descendant combo of the current combo
          const comboIndex = combos.findIndex(([id]) => id === descendantId);
          if (comboIndex !== -1) combos.splice(comboIndex, 1);

          const elementType = model.getElementType(descendantId);
          reassignTo('remove', elementType, descendant);
        });

        // 如果是内部边/节点 销毁
        // If it is an internal edge/node, destroy it
        internal.forEach((edge) => reassignTo('remove', 'edge', edge));

        // 如果是外部边，连接到收起对象上
        // If it is an external edge, connect to the collapsed object
        external.forEach((edge) => {
          const id = idOf(edge);
          const type = descendantIds.includes(edge.source) ? 'source' : 'target';
          const datum = { ...edge, [type]: idOf(combo) };
          if (add.edges.has(id)) add.edges.set(id, datum);
          if (update.edges.has(id)) update.edges.set(id, datum);
        });
      } else {
        const children = model.getChildrenData(id);
        const childrenIds = children.map(idOf);
        const { edges } = getSubgraphRelatedEdges(childrenIds, (id) => model.getRelatedEdgesData(id));

        [...children, ...edges].forEach((descendant) => {
          const id = idOf(descendant);
          const elementType = model.getElementType(id);

          const element = this.getElement(id);
          // 如果节点不存在，则添加到新增列表，如果存在，添加到更新列表
          // If the node does not exist, add it to the new list, if it exists, add it to the update list
          if (element) reassignTo('update', elementType, descendant);
          else reassignTo('add', elementType, descendant);

          // 继续展开子节点 / Continue to expand child nodes
          if (elementType === 'combo') combos.push([id, descendant as ComboData]);
        });
      }
    }

    return input;
  };

  private createElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const { animator } = context;
    const id = idOf(datum);
    const currentShape = this.getElement(id);
    if (currentShape) return () => null;
    const { type, ...style } = this.getElementComputedStyle(elementType, datum);

    // get shape constructor
    const Ctor = getExtension(elementType, type);
    if (!Ctor) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_CREATE, elementType, datum));

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

    return () =>
      withAnimationCallbacks(animator?.(id, shape, { ...shape.attributes, opacity: 0 }) || null, {
        after: () => {
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_CREATE, elementType, datum));
        },
      });
  }

  private getCreateTasks(data: ProcedureData, context: Omit<DrawContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['combo', combos],
      ['edge', edges],
    ];

    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return;
      const animator = this.getAnimationExecutor(elementType, 'enter', context.animation);
      elementData.forEach((datum) =>
        tasks.push(() => this.createElement(elementType, datum, { ...context, animator })),
      );
    });

    return tasks;
  }

  /**
   * <zh/> 由于 show 和 hide 的时序存在差异
   * - show： 立即将元素显示出来，然后执行动画
   * - hide： 先执行动画，然后隐藏元素
   *
   * 如果在调用 hide 后立即调用 show，hide 动画完成后会将元素隐藏
   *
   * 因此需要缓存元素最新的可见性
   *
   * <en/> Due to the difference in the timing of show and hide
   * - show: immediately shows the element and then executes the animation
   * - hide: executes the animation first, and then hides the element
   *
   * If show is called immediately after hide,it hide the element after hide animation completed
   *
   * Therefore, the latest visibility of the element needs to be cached
   */
  private latestElementVisibilityMap: WeakMap<DisplayObject, BaseStyleProps['visibility']> = new WeakMap();

  private updateElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const { animator } = context;

    const id = idOf(datum);
    const shape = this.getElement(id);
    if (!shape) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_UPDATE, elementType, datum));
    const emitAfterUpdate = () =>
      this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_UPDATE, elementType, datum));

    const { type, ...style } = this.getElementComputedStyle(elementType, datum);

    // 如果类型不同，需要先销毁原有元素，再创建新元素
    // If the type is different, you need to destroy the original element first, and then create a new element
    if (this.shapeTypeMap[id] !== type) {
      return () => {
        this.destroyElement(elementType, datum, { ...context, animation: false })();
        this.createElement(elementType, datum, { ...context, animation: false })();
        emitAfterUpdate();
        return null;
      };
    }

    // 如果是可见性更新 / If it is a visibility update
    if (context.stage === 'visibility' && 'visibility' in style) {
      // 缓存原始透明度 / Cache original opacity
      if (!hasCachedStyle(shape, 'opacity')) cacheStyle(shape, 'opacity');

      const originalOpacity = getCachedStyle(shape, 'opacity') ?? inferDefaultValue('opacity');
      this.latestElementVisibilityMap.set(shape, style.visibility);

      // show
      if (style.visibility !== 'hidden') {
        updateStyle(shape, { visibility: 'visible' });
        return () =>
          withAnimationCallbacks(
            animator?.(id, shape, { ...shape.attributes, opacity: 0 }, { opacity: originalOpacity }) || null,
            { after: emitAfterUpdate },
          );
      }
      // hide
      else if (style.visibility === 'hidden') {
        return () =>
          withAnimationCallbacks(
            animator?.(id, shape, { ...shape.attributes, opacity: originalOpacity }, { opacity: 0 }) || null,
            {
              after: () => {
                updateStyle(shape, { visibility: this.latestElementVisibilityMap.get(shape) });
                emitAfterUpdate();
              },
            },
          );
      }
    }

    const originalStyle = { ...shape.attributes };
    updateStyle(shape, style);

    return () =>
      withAnimationCallbacks(animator?.(id, shape, originalStyle) || null, {
        after: emitAfterUpdate,
      });
  }

  private getUpdateTasks(data: ProcedureData, context: Omit<DrawContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['combo', combos],
      ['edge', edges],
    ];

    const { animation, stage } = context;
    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return [];
      const animator = this.getAnimationExecutor(elementType, stage || 'update', animation);
      elementData.forEach((datum) =>
        tasks.push(() => this.updateElement(elementType, datum, { ...context, animator })),
      );
    });

    return tasks;
  }

  private destroyElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const { animator } = context;
    const id = idOf(datum);
    const element = this.elementMap[id];
    if (!element) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_DESTROY, elementType, datum));

    return () => {
      const result = animator?.(id, element, { ...element.attributes }, { opacity: 0 }) || null;
      withAnimationCallbacks(result, {
        after: () => {
          this.clearElement(id);
          element.destroy();
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_DESTROY, elementType, datum));
        },
      });
      return result;
    };
  }

  private getDestroyTasks(data: ProcedureData, context: Omit<DrawContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    const { animation, stage } = context;
    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return [];
      const animator = this.getAnimationExecutor(elementType, stage || 'exit', animation);
      elementData.forEach((datum) =>
        tasks.push(() => this.destroyElement(elementType, datum, { ...context, animator })),
      );
    });

    // TODO 重新计算色板样式，如果是分组色板，则不需要重新计算

    return tasks;
  }

  private clearElement(id: ID) {
    delete this.paletteStyle[id];
    delete this.defaultStyle[id];
    delete this.stateStyle[id];
    delete this.elementMap[id];
    delete this.shapeTypeMap[id];
  }

  public destroy() {
    Object.values(this.elementMap).forEach((element) => element.destroy());
    Object.values(this.container).forEach((container) => container.destroy());
    // @ts-expect-error force delete
    this.container = {};
    this.elementMap = {};
    this.shapeTypeMap = {};
    this.defaultStyle = {};
    this.stateStyle = {};
    this.paletteStyle = {};
    // @ts-expect-error force delete
    this.context = {};
    // @ts-expect-error force delete
    this.latestElementVisibilityMap = undefined;
  }
}

type AnimationExecutor = (
  id: ID,
  shape: DisplayObject,
  originalStyle: Record<string, unknown>,
  modifiedStyle?: Record<string, unknown>,
) => IAnimation | null;

type DrawContext = {
  animator?: AnimationExecutor;
  /** <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true */
  animation: boolean;
  /** <zh/> 当前绘制阶段 | <en/> Current draw stage */
  stage?: AnimationStage;
  /** <zh/> 是否不抛出事件 | <en/> Whether not to throw events */
  silence?: boolean;
};

/**
 * <zh/> 在 Element Controller 中，为了提高查询性能，统一使用 Map 存储数据
 *
 * <en/> In Element Controller, in order to improve query performance, use Map to store data uniformly
 */
class ProcedureData {
  nodes: Map<ID, NodeData> = new Map();
  edges: Map<ID, EdgeData> = new Map();
  combos: Map<ID, ComboData> = new Map();
}

type FlowData = {
  add: ProcedureData;
  update: ProcedureData;
  remove: ProcedureData;
};

type Flow = (input: FlowData) => FlowData;
