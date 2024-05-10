/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps, DisplayObject, IAnimation } from '@antv/g';
import { Group } from '@antv/g';
import { get, groupBy, isEmpty, isString } from '@antv/util';
import { executor as animationExecutor } from '../animations';
import type { AnimationContext } from '../animations/types';
import { AnimationType, ChangeType, GraphEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import { getExtension } from '../registry';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type { DrawData, ProcedureData } from '../transforms/types';
import type {
  AnimatableTask,
  Combo,
  DataChange,
  Edge,
  Element,
  ElementData,
  ElementDatum,
  ElementType,
  ID,
  Node,
  State,
  StyleIterationContext,
} from '../types';
import { executeAnimatableTasks, inferDefaultValue, withAnimationCallbacks } from '../utils/animation';
import { cacheStyle, getCachedStyle, hasCachedStyle } from '../utils/cache';
import { reduceDataChanges } from '../utils/change';
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

  private elementMap: Record<ID, Element> = {};

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

  private emit(event: BaseEvent, context: DrawContext) {
    if (context.silence) return;
    emit(this.context.graph, event);
  }

  private forEachElementData(callback: (elementType: ElementType, elementData: ElementData) => void) {
    ELEMENT_TYPES.forEach((elementType) => {
      const elementData = this.context.model.getElementData(elementType);
      callback(elementType, elementData);
    });
  }

  public getElementType(elementType: ElementType, datum: ElementDatum) {
    const { options } = this.context;
    const userDefinedType = options[elementType]?.type || datum.type;

    if (!userDefinedType) {
      return { node: 'circle', edge: 'line', combo: 'circle' }[elementType];
    }
    if (isString(userDefinedType)) return userDefinedType;
    return userDefinedType(datum as any);
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

  public getPaletteStyle(elementType: ElementType, id: ID): BaseStyleProps {
    const color = this.paletteStyle[id];
    if (!color) return {};

    if (elementType === 'edge') return { stroke: color };
    return { fill: color };
  }

  private defaultStyle: Record<ID, Record<string, unknown>> = {};

  /**
   * <zh/> 计算单个元素的默认样式
   *
   * <en/> compute default style of single element
   */
  private computeElementDefaultStyle(elementType: ElementType, context: StyleIterationContext) {
    const { options } = this.context;
    const defaultStyle = options[elementType]?.style || {};
    this.defaultStyle[idOf(context.datum)] = computeElementCallbackStyle(defaultStyle as any, context);
  }

  private computeElementsDefaultStyle(ids?: ID[]) {
    this.forEachElementData((elementType, elementData) => {
      elementData
        .filter((datum) => ids === undefined || ids.includes(idOf(datum)))
        .forEach((datum) => {
          this.computeElementDefaultStyle(elementType, { datum });
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
        .forEach((datum) => {
          const states = this.getElementState(idOf(datum));
          this.computeElementStatesStyle(elementType, states, { datum });
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

  public getElement<T extends Element>(id: ID): T | undefined {
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
    const stageAnimation = get(options, [elementType, 'animation', stage], true);

    if (options.animation === false || stageAnimation === false || !animation) return () => null;

    return (
      id: ID,
      shape: Element,
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
   * @remarks
   * <zh/> 只提供了最基本的节点示例和连接点位置信息，更多的上下文信息需要在边元素中计算
   *
   * <en/> Only the most basic node instances and connection point position information are provided, and more context information needs to be calculated in the edge element
   */
  private getEdgeEndsContext(datum: EdgeData) {
    const { source, target } = datum;
    const sourceNode = this.getElement<Node>(source);
    const targetNode = this.getElement<Node>(target);

    return { sourceNode, targetNode };
  }

  public getElementComputedStyle(elementType: ElementType, datum: ElementDatum) {
    const id = idOf(datum);
    // 优先级(从低到高) Priority (from low to high):
    const themeStyle = this.getThemeStyle(elementType);
    const paletteStyle = this.getPaletteStyle(elementType, id);
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
        : (childrenData.map((child) => this.getElement(idOf(child))).filter(Boolean) as (Node | Combo)[]);
      Object.assign(style, { childrenNode, childrenData });
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

    const data = this.computeChangesAndDrawData();
    if (!data) return;
    const { dataChanges, drawData } = data;
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
            before: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW, { dataChanges, animation: drawContext.animation }),
                drawContext,
              ),
            beforeAnimate: (animation) =>
              this.emit(
                new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.DRAW, animation, drawData),
                drawContext,
              ),
            afterAnimate: (animation) =>
              this.emit(
                new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.DRAW, animation, drawData),
                drawContext,
              ),
            after: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW, { dataChanges, animation: drawContext.animation }),
                drawContext,
              ),
          },
    )?.finished;
  }

  private computeChangesAndDrawData() {
    const { model } = this.context;
    const dataChanges = model.getChanges();
    const tasks = reduceDataChanges(dataChanges);
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
    } = groupBy(tasks, (change) => change.type) as unknown as Record<`${ChangeType}`, DataChange[]>;

    const dataOf = <T extends DataChange['value']>(data: DataChange[]) =>
      new Map(
        data.map((datum) => {
          const data = datum.value;
          return [idOf(data), data] as [ID, T];
        }),
      );

    const input: DrawData = {
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
    const drawData = this.transformData(input);

    // 清空变更 / Clear changes
    model.clearChanges();

    return { dataChanges, drawData };
  }

  private transformData(input: DrawData): DrawData {
    const transforms = this.context.transform.getTransformInstance();

    return Object.values(transforms).reduce((data, transform) => transform.beforeDraw(data), input);
  }

  private createElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const id = idOf(datum);
    const currentElement = this.getElement(id);
    if (currentElement) return () => null;
    const type = this.getElementType(elementType, datum);
    const style = this.getElementComputedStyle(elementType, datum);

    // get shape constructor
    const Ctor = getExtension(elementType, type);
    if (!Ctor) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_CREATE, elementType, datum), context);

    const element = this.container[elementType].appendChild(
      new Ctor({
        id,
        style: {
          context: this.context,
          ...style,
        },
      }),
    ) as Element;

    this.shapeTypeMap[id] = type;
    this.elementMap[id] = element;

    const { animation, animator } = context;
    return () =>
      withAnimationCallbacks(animation ? animator?.(id, element, { ...element.attributes, opacity: 0 }) : null, {
        after: () => {
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_CREATE, elementType, datum), context);
          element.onCreate();
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
    const element = this.getElement(id);
    if (!element) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_UPDATE, elementType, datum), context);
    const afterUpdate = () => {
      this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_UPDATE, elementType, datum), context);
      element.onUpdate();
    };

    const type = this.getElementType(elementType, datum);
    const style = this.getElementComputedStyle(elementType, datum);

    // 如果类型不同，需要先销毁原有元素，再创建新元素
    // If the type is different, you need to destroy the original element first, and then create a new element
    if (this.shapeTypeMap[id] !== type) {
      this.destroyElement(elementType, datum, { animation: false, silence: true })();
      this.createElement(elementType, datum, { animation: false, silence: true })();
      return () => {
        afterUpdate();
        return null;
      };
    }

    // 如果是可见性更新 / If it is a visibility update
    if (context.stage === 'visibility' && 'visibility' in style) {
      // 缓存原始透明度 / Cache original opacity
      if (!hasCachedStyle(element, 'opacity')) cacheStyle(element, 'opacity');

      const originalOpacity = getCachedStyle(element, 'opacity') ?? inferDefaultValue('opacity');
      this.latestElementVisibilityMap.set(element, style.visibility);

      // show
      if (style.visibility !== 'hidden') {
        updateStyle(element, { visibility: 'visible' });
        return () =>
          withAnimationCallbacks(
            animator?.(id, element, { ...element.attributes, opacity: 0 }, { opacity: originalOpacity }),
            { after: afterUpdate },
          );
      }
      // hide
      else if (style.visibility === 'hidden') {
        return () =>
          withAnimationCallbacks(
            animator?.(id, element, { ...element.attributes, opacity: originalOpacity }, { opacity: 0 }),
            {
              after: () => {
                updateStyle(element, { visibility: this.latestElementVisibilityMap.get(element) });
                afterUpdate();
              },
            },
          );
      }
    }

    const originalStyle = { ...element.attributes };
    updateStyle(element, style);

    // 如果边的端点节点已经销毁，则更新端点节点
    // If the endpoint node of the edge has been destroyed, update the endpoint node
    if (elementType === 'edge') {
      if (originalStyle.sourceNode.destroyed) {
        originalStyle.sourceNode = style.sourceNode;
      }
      if (originalStyle.targetNode.destroyed) {
        originalStyle.targetNode = style.targetNode;
      }
    }

    return () =>
      withAnimationCallbacks(animator?.(id, element, originalStyle), {
        after: afterUpdate,
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

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_DESTROY, elementType, datum), context);

    return () =>
      withAnimationCallbacks(animator?.(id, element, { ...element.attributes }, { opacity: 0 }), {
        after: () => {
          this.clearElement(id);
          element.destroy();
          element.onDestroy();
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_DESTROY, elementType, datum), context);
        },
      });
  }

  private getDestroyTasks(data: ProcedureData, context: Omit<DrawContext, 'animator'>): AnimatableTask[] {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    const { animation, stage = 'exit' } = context;
    const tasks: AnimatableTask[] = [];
    iteration.forEach(([elementType, elementData]) => {
      if (elementData.size === 0) return [];
      const animator = this.getAnimationExecutor(elementType, stage, animation);
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
  shape: Element,
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
