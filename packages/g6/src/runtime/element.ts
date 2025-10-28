/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps } from '@antv/g';
import { Group } from '@antv/g';
import { groupBy } from '@antv/util';
import { AnimationType, COMBO_KEY, ChangeType, GraphEvent, TREE_KEY } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import { getExtension } from '../registry/get';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type { STDLayoutOptions } from '../spec/layout';
import type { DrawData, ProcedureData } from '../transforms/types';
import type {
  Combo,
  DataChange,
  Edge,
  Element,
  ElementData,
  ElementDatum,
  ElementType,
  ID,
  Node,
  NodeLikeData,
  Point,
  State,
  StyleIterationContext,
} from '../types';
import { cacheStyle, hasCachedStyle } from '../utils/cache';
import { reduceDataChanges } from '../utils/change';
import { isCollapsed } from '../utils/collapsibility';
import { markToBeDestroyed, updateStyle } from '../utils/element';
import type { BaseEvent } from '../utils/event';
import { AnimateEvent, ElementLifeCycleEvent, GraphLifeCycleEvent, emit } from '../utils/event';
import { idOf } from '../utils/id';
import { isTreeLayout } from '../utils/layout';
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { positionOf } from '../utils/position';
import { print } from '../utils/print';
import { computeElementCallbackStyle } from '../utils/style';
import { themeOf } from '../utils/theme';
import { subtract } from '../utils/vector';
import { setVisibility } from '../utils/visibility';
import type { RuntimeContext } from './types';

export class ElementController {
  private context: RuntimeContext;

  private container!: Group;

  private elementMap: Record<ID, Element> = {};

  private shapeTypeMap: Record<ID, string> = {};

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  public init() {
    this.initContainer();
  }

  private initContainer() {
    if (!this.container || this.container.destroyed) {
      const { canvas } = this.context;
      this.container = canvas.appendChild(new Group({ className: 'elements' }));
    }
  }

  private emit(event: BaseEvent, context: DrawContext) {
    if (context.silence) return;
    emit(this.context.graph, event);
  }

  private forEachElementData(callback: (elementType: ElementType, elementData: ElementData) => void) {
    ELEMENT_TYPES.forEach((elementType) => {
      const elementData = this.context.model.getElementsDataByType(elementType);
      callback(elementType, elementData);
    });
  }

  public getElementType(elementType: ElementType, datum: ElementDatum) {
    const { options, graph } = this.context;
    const userDefinedType = options[elementType]?.type || datum.type;

    if (!userDefinedType) {
      if (elementType === 'edge') return 'line';
      // node / combo
      else return 'circle';
    }
    if (typeof userDefinedType === 'string') return userDefinedType;
    // @ts-expect-error skip type check
    return userDefinedType.call(graph, datum);
  }

  private getTheme(elementType: ElementType) {
    return themeOf(this.context.options)[elementType] || {};
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
      if (palette?.field) {
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
    if ('transform' in defaultStyle && Array.isArray(defaultStyle.transform)) {
      defaultStyle.transform = [...defaultStyle.transform];
    }
    this.defaultStyle[idOf(context.datum)] = computeElementCallbackStyle(defaultStyle as any, context);
  }

  private computeElementsDefaultStyle(ids?: ID[]) {
    const { graph } = this.context;
    this.forEachElementData((elementType, elementData) => {
      const length = elementData.length;
      for (let i = 0; i < length; i++) {
        const datum = elementData[i];
        if (ids === undefined || ids.includes(idOf(datum))) {
          this.computeElementDefaultStyle(elementType, { datum, graph });
        }
      }
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
    const { graph } = this.context;
    this.forEachElementData((elementType, elementData) => {
      const length = elementData.length;
      for (let i = 0; i < length; i++) {
        const datum = elementData[i];
        if (ids === undefined || ids.includes(idOf(datum))) {
          const states = this.getElementState(idOf(datum));
          this.computeElementStatesStyle(elementType, states, { datum, graph });
        }
      }
    });
  }

  public getStateStyle(id: ID) {
    return this.stateStyle[id] || {};
  }

  private computeStyle(stage?: string, ids?: ID[]) {
    const skip = ['translate', 'zIndex'];
    if (stage && skip.includes(stage)) return;

    this.computePaletteStyle();
    this.computeElementsDefaultStyle(ids);
    this.computeElementsStatesStyle(ids);
  }

  public getElement<T extends Element>(id: ID): T | undefined {
    return this.elementMap[id] as T;
  }

  public getNodes() {
    return this.context.model.getNodeData().map(({ id }) => this.elementMap[id]) as Node[];
  }

  public getEdges() {
    return this.context.model.getEdgeData().map((edge) => this.elementMap[idOf(edge)]) as Edge[];
  }

  public getCombos() {
    return this.context.model.getComboData().map(({ id }) => this.elementMap[id]) as Combo[];
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

    if (elementType === 'combo') {
      const childrenData = this.context.model.getChildrenData(id);
      const isCollapsed = !!style.collapsed;
      const childrenNode = isCollapsed ? [] : childrenData.map(idOf).filter((id) => this.getElement(id));
      Object.assign(style, { childrenNode, childrenData });
    }
    return style;
  }

  private getDrawData(context: DrawContext): DrawPayload | null {
    this.init();

    const data = this.computeChangesAndDrawData(context);
    if (!data) return null;

    const { type = 'draw', stage = type } = context;
    this.markDestroyElement(data.drawData);
    // 计算样式 / Calculate style
    this.computeStyle(stage);

    return { type, stage, data };
  }

  /**
   * <zh/> 开始绘制流程
   *
   * <en/> start render process
   */
  public draw(context: DrawContext = { animation: true }) {
    const drawData = this.getDrawData(context);
    if (!drawData) return;

    const {
      data: {
        drawData: { add, update, remove },
      },
    } = drawData;

    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

    return this.setAnimationTask(context, drawData);
  }

  public async preLayoutDraw(context: DrawContext = { animation: true }) {
    const preResult = this.getDrawData(context);
    if (!preResult) return;

    const {
      data: { drawData },
    } = preResult;

    await this.context.layout?.preLayout?.(drawData);

    const { add, update, remove } = drawData;
    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

    // <zh/> 对于树形布局，需要再次更新位置到最终位置以触发动画
    // For tree layout, need to update positions to final positions to trigger animation
    const { layout } = this.context;
    if (layout && this.isTreeLayoutType()) {
      // <zh/> 优先使用缓存的 simulate 结果，避免重复计算 | <en/> Prefer cached simulate result to avoid redundant calculation
      let finalPositions = layout.getCachedSimulation();

      // <zh/> 如果没有缓存，则执行 simulate | <en/> Execute simulate if no cache available
      if (!finalPositions) {
        finalPositions = await layout.simulate();
      }

      if (finalPositions?.nodes) {
        const { model } = this.context;
        // 更新模型数据到最终位置
        // Update model data to final positions
        model.updateData(finalPositions);

        // <zh/> 收集需要更新的节点 | <en/> Collect nodes that need to be updated
        const nodesToUpdate = new Map<ID, NodeData>();
        finalPositions.nodes.forEach((node) => {
          const id = idOf(node);
          const element = this.getElement(id);
          if (element) {
            nodesToUpdate.set(id, node);
          }
        });

        // 执行更新动画
        // Execute update animation
        if (nodesToUpdate.size > 0) {
          this.updateElements(
            { nodes: nodesToUpdate, edges: new Map(), combos: new Map() },
            { ...context, stage: 'translate' },
          );
        }
      }

      // <zh/> 清除缓存，确保下次更新时重新计算 | <en/> Clear cache to ensure recalculation on next update
      layout.clearSimulationCache();
    }

    return this.setAnimationTask(context, preResult);
  }

  private setAnimationTask(context: DrawContext, data: DrawPayload) {
    const { animation, silence } = context;
    const {
      data: { dataChanges, drawData },
      stage,
      type,
    } = data;

    return this.context.animation!.animate(
      animation,
      silence
        ? {}
        : {
            before: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW, {
                  dataChanges,
                  animation,
                  stage,
                  render: type === 'render',
                }),
                context,
              ),
            beforeAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.DRAW, animation, drawData), context),
            afterAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.DRAW, animation, drawData), context),
            after: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW, {
                  dataChanges,
                  animation,
                  stage,
                  render: type === 'render',
                  firstRender: this.context.graph.rendered === false,
                }),
                context,
              ),
          },
    );
  }

  private computeChangesAndDrawData(context: DrawContext) {
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
    const drawData = this.transformData(input, context);

    // 清空变更 / Clear changes
    model.clearChanges();

    return { dataChanges, drawData };
  }

  private transformData(input: DrawData, context: DrawContext): DrawData {
    const transforms = this.context.transform.getTransformInstance();

    return Object.values(transforms).reduce((data, transform) => transform.beforeDraw(data, context), input);
  }

  private createElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const id = idOf(datum);
    const currentElement = this.getElement(id);
    if (currentElement) return;
    const type = this.getElementType(elementType, datum);
    const style = this.getElementComputedStyle(elementType, datum);

    // get shape constructor
    const Ctor = getExtension(elementType, type);
    if (!Ctor) return print.warn(`The element ${type} of ${elementType} is not registered.`);

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_CREATE, elementType, datum), context);

    const element = this.container.appendChild(
      new Ctor({
        id,
        context: this.context,
        style,
      }),
    ) as Element;

    this.shapeTypeMap[id] = type;
    this.elementMap[id] = element;

    const { stage = 'enter' } = context;

    this.context.animation?.add(
      {
        element,
        elementType,
        stage,
        originalStyle: { ...element.attributes },
        updatedStyle: style,
      },
      {
        after: () => {
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_CREATE, elementType, datum), context);
          element.onCreate?.();
        },
      },
    );
  }

  private createElements(data: ProcedureData, context: DrawContext) {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['combo', combos],
      ['edge', edges],
    ];

    iteration.forEach(([elementType, elementData]) => {
      elementData.forEach((datum) => this.createElement(elementType, datum, context));
    });
  }

  private getUpdateStageStyle(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const { stage = 'update' } = context;

    // 优化 translate 阶段，直接返回 x, y, z，避免计算样式
    // Optimize the translate stage, return x, y, z directly to avoid calculating style
    if (stage === 'translate') {
      if (elementType === 'node' || elementType === 'combo') {
        const { style: { x = 0, y = 0, z = 0 } = {} } = datum as NodeLikeData;
        return { x, y, z };
      } else return {};
    }

    return this.getElementComputedStyle(elementType, datum);
  }

  private updateElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const id = idOf(datum);
    const { stage = 'update' } = context;

    const element = this.getElement(id);
    if (!element) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_UPDATE, elementType, datum), context);

    const type = this.getElementType(elementType, datum);
    const style = this.getUpdateStageStyle(elementType, datum, context);

    // 如果类型不同，需要先销毁原有元素，再创建新元素
    // If the type is different, you need to destroy the original element first, and then create a new element
    if (this.shapeTypeMap[id] !== type) {
      element.destroy();
      delete this.shapeTypeMap[id];
      delete this.elementMap[id];

      this.createElement(elementType, datum, { animation: false, silence: true });
    }

    const exactStage = stage !== 'visibility' ? stage : style.visibility === 'hidden' ? 'hide' : 'show';

    // 避免立即将 visibility 设置为 hidden，导致元素不可见，而是在 after 阶段再设置
    // Avoid setting visibility to hidden immediately, causing the element to be invisible, but set it in the after phase
    if (exactStage === 'hide') delete style['visibility'];

    this.context.animation?.add(
      {
        element,
        elementType,
        stage: exactStage,
        originalStyle: { ...element.attributes },
        updatedStyle: style,
      },
      {
        before: () => {
          // 通过 elementMap[id] 访问最新的 element，防止 type 不同导致的 element 丢失
          // Access the latest element through elementMap[id] to prevent the loss of element caused by different types
          const element = this.elementMap[id];
          if (stage !== 'collapse') updateStyle(element, style);

          if (stage === 'visibility') {
            // 缓存原始透明度 / Cache original opacity
            // 会在 animation controller 中访问该缓存值 / The cached value will be accessed in the animation controller
            if (!hasCachedStyle(element, 'opacity')) cacheStyle(element, 'opacity');
            this.visibilityCache.set(element, exactStage === 'show' ? 'visible' : 'hidden');
            if (exactStage === 'show') setVisibility(element, 'visible');
          }
        },
        after: () => {
          const element = this.elementMap[id];
          if (stage === 'collapse') updateStyle(element, style);
          if (exactStage === 'hide') setVisibility(element, this.visibilityCache.get(element));
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_UPDATE, elementType, datum), context);
          element.onUpdate?.();
        },
      },
    );
  }

  private updateElements(data: ProcedureData, context: DrawContext) {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['node', nodes],
      ['combo', combos],
      ['edge', edges],
    ];

    iteration.forEach(([elementType, elementData]) => {
      elementData.forEach((datum) => this.updateElement(elementType, datum, context));
    });
  }

  private visibilityCache = new WeakMap<Element, BaseStyleProps['visibility']>();

  /**
   * <zh/> 标记销毁元素
   *
   * <en/> mark destroy element
   * @param data - <zh/> 绘制数据 | <en/> draw data
   */
  private markDestroyElement(data: DrawData) {
    Object.values(data.remove).forEach((elementData) => {
      elementData.forEach((datum) => {
        const id = idOf(datum);
        const element = this.getElement(id);
        if (element) markToBeDestroyed(element);
      });
    });
  }

  private destroyElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const { stage = 'exit' } = context;
    const id = idOf(datum);
    const element = this.elementMap[id];
    if (!element) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_DESTROY, elementType, datum), context);

    this.context.animation?.add(
      {
        element,
        elementType,
        stage,
        originalStyle: { ...element.attributes },
        updatedStyle: {},
      },
      {
        after: () => {
          this.clearElement(id);
          element.destroy();
          element.onDestroy?.();
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_DESTROY, elementType, datum), context);
        },
      },
    );
  }

  private destroyElements(data: ProcedureData, context: DrawContext) {
    const { nodes, edges, combos } = data;
    const iteration: [ElementType, Map<ID, ElementDatum>][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    iteration.forEach(([elementType, elementData]) => {
      elementData.forEach((datum) => this.destroyElement(elementType, datum, context));
    });

    // TODO 重新计算色板样式，如果是分组色板，则不需要重新计算
  }

  private clearElement(id: ID) {
    delete this.paletteStyle[id];
    delete this.defaultStyle[id];
    delete this.stateStyle[id];
    delete this.elementMap[id];
    delete this.shapeTypeMap[id];
  }

  /**
   * <zh/> 获取布局配置
   *
   * <en/> Get layout options
   */
  /**
   * <zh/> 判断当前布局是否为树形布局
   *
   * <en/> Check if current layout is tree layout
   * @returns <zh/> 是否为树形布局 | <en/> Whether it is tree layout
   */
  private isTreeLayoutType(): boolean {
    const layoutOptions = this.getLayoutOptions();
    return isTreeLayout(layoutOptions);
  }

  /**
   * <zh/> 获取布局配置项
   *
   * <en/> Get layout options
   * @returns <zh/> 布局配置项 | <en/> Layout options
   */
  private getLayoutOptions(): STDLayoutOptions {
    const { layout } = this.context;
    if (!layout) {
      return { type: 'grid', animation: false };
    }

    // <zh/> 通过 LayoutController 的公共方法获取配置 | <en/> Get configuration through LayoutController's public method
    return layout.getEffectiveLayoutOptions();
  }

  /**
   * <zh/> 设置节点位置
   *
   * <en/> Set node position
   */
  private setNodePosition(
    element: Element,
    position: { x: number; y: number; z?: number },
    skipRender: boolean = false,
    extraStyle?: Record<string, unknown>,
  ): void {
    const { x, y, z = 0 } = position;
    const style = { x, y, z, ...extraStyle };

    if (skipRender) {
      // <zh/> 直接赋值避免触发渲染 | <en/> Assign directly to skip rendering
      Object.assign(element.attributes, style);
    } else {
      element.update(style);
    }
  }

  /**
   * <zh/> 对齐布局结果，避免视图偏移
   *
   * <en/> Align layout result to avoid view offset
   * @param layoutResult - <zh/> 布局结果 | <en/> layout result
   * @param id - <zh/> 元素 ID | <en/> element ID
   */
  private alignLayoutResultToElement(layoutResult: GraphData, id: ID) {
    const target = layoutResult.nodes?.find((node) => idOf(node) === id);

    if (target) {
      const originalPosition = positionOf(this.context.model.getNodeLikeDatum(id));
      const modifiedPosition = positionOf(target);
      const delta = subtract(originalPosition, modifiedPosition);
      layoutResult.nodes?.forEach((node) => {
        if (node.style?.x) node.style.x += delta[0];
        if (node.style?.y) node.style.y += delta[1];
        if (node.style?.z) node.style.z += delta[2] || 0;
      });
    }
  }

  /**
   * <zh/> 合并布局结果与原始数据
   *
   * <en/> Merge layout result with original data
   */
  private mergeLayoutResult(layoutResult: GraphData, targetNodeId: ID, collapsedState: boolean): GraphData {
    const { model } = this.context;

    return {
      nodes: layoutResult.nodes?.map((layoutNode) => {
        const nodeId = idOf(layoutNode);
        const originalNode = model.getNodeData([nodeId])[0];
        const element = this.getElement(nodeId);

        const isTargetNode = nodeId === targetNodeId;
        const baseStyle = element ? { ...element.attributes } : { ...originalNode?.style };

        return {
          id: nodeId,
          data: originalNode?.data,
          style: {
            ...baseStyle,
            ...layoutNode.style,
            collapsed: isTargetNode ? collapsedState : baseStyle.collapsed || false,
          },
        } as NodeData;
      }),
      edges: layoutResult.edges,
      combos: layoutResult.combos,
    };
  }

  /**
   * <zh/> 计算布局偏移量
   *
   * <en/> Calculate layout offset
   * @param layoutResult - <zh/> 布局结果 | <en/> layout result
   * @param targetId - <zh/> 目标节点 | <en/> target node
   * @param currentPosition - <zh/> 当前位置 | <en/> current position
   * @returns <zh/> 偏移量 | <en/> offset
   */
  private calculateLayoutOffset(
    layoutResult: GraphData,
    targetId: ID,
    currentPosition: [number, number, number],
  ): [number, number, number] {
    const targetNodeStyle = layoutResult.nodes?.find((n) => idOf(n) === targetId)?.style;
    const layoutPosition: [number, number, number] = targetNodeStyle
      ? [targetNodeStyle.x || 0, targetNodeStyle.y || 0, targetNodeStyle.z || 0]
      : currentPosition;

    return [
      currentPosition[0] - layoutPosition[0],
      currentPosition[1] - layoutPosition[1],
      (currentPosition[2] || 0) - (layoutPosition[2] || 0),
    ];
  }

  /**
   * <zh/> 应用布局偏移量
   *
   * <en/> Apply layout offset
   * @param layoutResult - <zh/> 布局结果 | <en/> layout result
   * @param offset - <zh/> 偏移量 | <en/> offset
   */
  private applyLayoutOffset(layoutResult: GraphData, offset: [number, number, number]): void {
    layoutResult.nodes?.forEach((node) => {
      if (node.style) {
        node.style.x = (node.style.x || 0) + offset[0];
        node.style.y = (node.style.y || 0) + offset[1];
        node.style.z = (node.style.z || 0) + offset[2];
      }
    });
  }

  /**
   * <zh/> 边跟随节点动画
   *
   * <en/> Animate edges following nodes
   */
  private animateEdges(excludeEdges: Map<ID, EdgeData>, context: DrawContext): void {
    const { model } = this.context;
    const allEdges = model.getEdgeData();
    const edgesToUpdate = new Map<ID, EdgeData>();

    allEdges.forEach((edgeData) => {
      const edgeId = idOf(edgeData);
      if (excludeEdges.has(edgeId)) return;
      edgesToUpdate.set(edgeId, edgeData);
    });

    this.updateElements({ nodes: new Map(), edges: edgesToUpdate, combos: new Map() }, context);
  }

  /**
   * <zh/> 执行动画
   *
   * <en/> Execute animation
   */
  private async executeAnimation(
    animation: boolean | undefined,
    animationType: AnimationType,
    drawData: DrawData,
    context: DrawContext,
    animationParams: {
      expand?: { target: ID; descendants: ID[]; position: Point };
      collapse?: { target: ID; descendants: ID[]; position: Point };
    },
  ): Promise<void> {
    await this.context.animation!.animate(
      animation,
      {
        beforeAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, animationType, animation, drawData), context),
        afterAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, animationType, animation, drawData), context),
      },
      animationParams,
    )?.finished;
  }

  /**
   * <zh/> 过滤布局数据
   *
   * <en/> Filter layout data
   */
  private filterLayoutData(layoutData: GraphData, nodesToRemove: Set<ID>, edgesToRemove: Map<ID, EdgeData>): GraphData {
    return {
      ...layoutData,
      nodes: layoutData.nodes?.filter((n) => !nodesToRemove.has(idOf(n))),
      edges: layoutData.edges?.filter((e) => !edgesToRemove.has(idOf(e))),
    };
  }

  /**
   * <zh/> 收集待更新节点
   *
   * <en/> Collect nodes to update
   */
  private collectNodesToUpdate(layoutResult: GraphData, excludeIds: Set<ID> = new Set()): Map<ID, NodeData> {
    const { model } = this.context;
    const updateNodes = new Map<ID, NodeData>();

    layoutResult.nodes?.forEach((node) => {
      const nodeId = idOf(node);
      if (excludeIds.has(nodeId)) return;

      const existingNode = model.getNodeData([nodeId])[0];
      if (existingNode) {
        updateNodes.set(nodeId, {
          ...existingNode,
          style: { ...existingNode.style, ...node.style },
        });
      }
    });

    return updateNodes;
  }

  /**
   * <zh/> 处理树布局收起
   *
   * <en/> Handle tree layout collapse
   */
  private async handleTreeLayoutCollapse(
    id: ID,
    animation: boolean | undefined,
    drawData: DrawData,
    remove: ProcedureData,
  ): Promise<void> {
    const { model, layout } = this.context;

    // <zh/> 记录当前位置 | <en/> Record current position
    const currentPosition = positionOf(model.getNodeData([id])[0]) as [number, number, number];

    // <zh/> 过滤并重新计算布局 | <en/> Filter and recalculate layout
    const removedNodeIds = new Set(remove.nodes.keys());
    const layoutData = layout!.getLayoutData(this.getLayoutOptions());
    const filteredLayoutData = this.filterLayoutData(layoutData, removedNodeIds, remove.edges);

    const layoutResult = await layout!.stepLayout(filteredLayoutData, this.getLayoutOptions(), 0);

    // <zh/> 应用偏移量保持位置 | <en/> Apply offset to keep position
    const offset = this.calculateLayoutOffset(layoutResult, id, currentPosition);
    this.applyLayoutOffset(layoutResult, offset);

    // <zh/> 收集待更新节点 | <en/> Collect nodes to update
    const updateNodes = this.collectNodesToUpdate(layoutResult);

    // <zh/> 更新模型数据 | <en/> Update model data
    const mergedLayoutResult = this.mergeLayoutResult(layoutResult, id, true);
    model.updateData(mergedLayoutResult);

    // <zh/> 执行动画 | <en/> Execute animation
    this.markDestroyElement(drawData);
    const context = { animation, stage: 'collapse', data: drawData } as const;

    this.destroyElements(remove, context);
    this.createElements(drawData.add, context);
    this.updateElements({ nodes: updateNodes, edges: new Map(), combos: new Map() }, context);
    this.animateEdges(remove.edges, context);

    await this.executeAnimation(animation, AnimationType.COLLAPSE, drawData, context, {
      collapse: {
        target: id,
        descendants: Array.from(remove.nodes).map(([, node]) => idOf(node)),
        position: currentPosition as [number, number, number],
      },
    });
  }

  /**
   * <zh/> 初始化新节点位置
   *
   * <en/> Initialize new node positions
   */
  private initializeNewNodePositions(nodeIds: Map<ID, NodeData>, originPosition: [number, number, number]): void {
    nodeIds.forEach((node, nodeId) => {
      const element = this.getElement(nodeId);
      if (element) {
        this.setNodePosition(element, {
          x: originPosition[0],
          y: originPosition[1],
          z: originPosition[2],
        });
      }
    });
  }

  /**
   * <zh/> 应用布局到节点
   *
   * <en/> Apply layout to nodes
   */
  private applyLayoutToElements(layoutResult: GraphData, targetId: ID): void {
    layoutResult.nodes?.forEach((node) => {
      const nodeId = idOf(node);
      const element = this.getElement(nodeId);
      if (!element || !node.style) return;

      const { x = 0, y = 0, z = 0 } = node.style;
      const isTargetNode = nodeId === targetId;

      // <zh/> 非目标节点跳过渲染 | <en/> Skip rendering for non-target nodes
      this.setNodePosition(element, { x, y, z }, !isTargetNode, isTargetNode ? { collapsed: false } : undefined);
    });
  }

  /**
   * <zh/> 处理树布局展开
   *
   * <en/> Handle tree layout expand
   */
  private async handleTreeLayoutExpand(
    id: ID,
    animation: boolean | undefined,
    drawData: DrawData,
    add: ProcedureData,
    position: [number, number, number],
  ): Promise<void> {
    const { model, layout } = this.context;

    // <zh/> 创建新节点 | <en/> Create new nodes
    const nodesToCreate = { nodes: add.nodes, edges: new Map(), combos: add.combos };
    this.createElements(nodesToCreate, { animation: false, stage: 'expand', target: id, silence: true });

    // <zh/> 重置动画队列 | <en/> Clear animation queue
    this.context.animation!.clear();
    this.computeStyle('expand');

    // <zh/> 记录当前位置 | <en/> Record current position
    const currentPosition = positionOf(model.getNodeData([id])[0]) as [number, number, number];

    // <zh/> 计算新布局 | <en/> Calculate new layout
    const layoutData = layout!.getLayoutData(this.getLayoutOptions());
    const layoutResult = await layout!.stepLayout(layoutData, this.getLayoutOptions(), 0);

    // <zh/> 应用偏移量保持位置 | <en/> Apply offset to keep position
    const offset = this.calculateLayoutOffset(layoutResult, id, currentPosition);
    this.applyLayoutOffset(layoutResult, offset);

    // <zh/> 设置新节点初始位置 | <en/> Set initial position for new nodes
    this.initializeNewNodePositions(add.nodes, currentPosition);

    // <zh/> 收集待更新节点 | <en/> Collect nodes to update
    const newNodeIds = new Set(add.nodes.keys());
    const updateNodes = this.collectNodesToUpdate(layoutResult, newNodeIds);

    // <zh/> 更新模型数据 | <en/> Update model data
    const mergedLayoutResult = this.mergeLayoutResult(layoutResult, id, false);
    model.updateData(mergedLayoutResult);

    // <zh/> 更新节点到最终位置 | <en/> Update nodes to final position
    this.applyLayoutToElements(layoutResult, id);

    // <zh/> 创建新边 | <en/> Create new edges
    const edgesToCreate = { nodes: new Map(), edges: add.edges, combos: new Map() };
    this.createElements(edgesToCreate, { animation: false, stage: 'expand', target: id });

    // <zh/> 执行动画 | <en/> Execute animation
    const context = { animation, stage: 'expand', data: drawData } as const;

    // <zh/> 收集待动画节点 | <en/> Collect nodes to animate
    const nodesToAnimate = new Map<ID, NodeData>();
    updateNodes.forEach((nodeData, nodeId) => {
      if (nodeId !== id) nodesToAnimate.set(nodeId, nodeData);
    });
    add.nodes.forEach((nodeData, nodeId) => {
      nodesToAnimate.set(nodeId, nodeData);
    });

    this.updateElements({ nodes: nodesToAnimate, edges: new Map(), combos: new Map() }, context);
    this.animateEdges(new Map(), context);

    await this.executeAnimation(animation, AnimationType.EXPAND, drawData, context, {
      expand: {
        target: id,
        descendants: Array.from(add.nodes).map(([, node]) => idOf(node)),
        position,
      },
    });
  }

  /**
   * <zh/> 收起节点
   *
   * <en/> collapse node
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param options - <zh/> 选项 | <en/> options
   */
  public async collapseNode(id: ID, options: CollapseExpandNodeOptions): Promise<void> {
    const { animation } = options;
    const { model, layout } = this.context;

    const data = this.computeChangesAndDrawData({ stage: 'collapse', animation });
    if (!data) return;
    const { drawData } = data;
    const { add, remove, update } = drawData;

    // 对于树形布局，先计算布局，然后执行动画收起
    if (remove.nodes.size > 0 && layout && model.model.hasTreeStructure(TREE_KEY)) {
      await this.handleTreeLayoutCollapse(id, animation, drawData, remove);
      return;
    }

    // 非树形布局的默认逻辑
    this.markDestroyElement(drawData);
    const context = { animation, stage: 'collapse', data: drawData } as const;

    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

    await this.executeAnimation(animation, AnimationType.COLLAPSE, drawData, context, {
      collapse: {
        target: id,
        descendants: Array.from(remove.nodes).map(([, node]) => idOf(node)),
        position: positionOf(update.nodes.get(id)!),
      },
    });
  }

  /**
   * <zh/> 展开节点
   *
   * <en/> expand node
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true
   */
  public async expandNode(id: ID, options: CollapseExpandNodeOptions): Promise<void> {
    const { model, layout } = this.context;
    const { animation } = options;
    const position = positionOf(model.getNodeData([id])[0]) as [number, number, number];

    // 重新计算数据 / Recalculate data
    const data = this.computeChangesAndDrawData({ stage: 'expand', animation });
    if (!data) return;
    const { drawData } = data;
    const { add } = drawData;

    // 对于树形布局，先创建新节点，然后重新计算整体布局
    if (add.nodes.size > 0 && layout && model.model.hasTreeStructure(TREE_KEY)) {
      await this.handleTreeLayoutExpand(id, animation, drawData, add, position);
      return;
    }

    // 非树形布局的默认逻辑
    this.context.animation!.clear();
    this.computeStyle('expand');

    const context = { animation, stage: 'expand', data: drawData } as const;
    this.createElements(add, context);
    this.updateElements(drawData.update, context);

    await this.context.animation!.animate(
      animation,
      {
        beforeAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.EXPAND, animation, drawData), context),
        afterAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.EXPAND, animation, drawData), context),
      },
      {
        expand: {
          target: id,
          descendants: Array.from(add.nodes).map(([, node]) => idOf(node)),
          position,
        },
      },
    )?.finished;
  }

  public async collapseCombo(id: ID, animation: boolean): Promise<void> {
    const { model, element } = this.context;
    if (model.getAncestorsData(id, COMBO_KEY).some((datum) => isCollapsed(datum))) return;

    const combo = element!.getElement<Combo>(id)!;

    const position = combo.getComboPosition({
      ...combo.attributes,
      collapsed: true,
    });

    const data = this.computeChangesAndDrawData({ stage: 'collapse', animation });
    if (!data) return;

    const { dataChanges, drawData } = data;
    this.markDestroyElement(drawData);
    const { update, remove } = drawData;
    const context = { animation, stage: 'collapse', data: drawData } as const;

    this.destroyElements(remove, context);
    this.updateElements(update, context);

    const idsOf = (data: Map<ID, ElementDatum>) => Array.from(data).map(([, node]) => idOf(node));

    await this.context.animation!.animate(
      animation,
      {
        before: () => this.emit(new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW, { dataChanges, animation }), context),
        beforeAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.COLLAPSE, animation, drawData), context),
        afterAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.COLLAPSE, animation, drawData), context),
        after: () => this.emit(new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW, { dataChanges, animation }), context),
      },
      {
        collapse: {
          target: id,
          descendants: [...idsOf(remove.nodes), ...idsOf(remove.combos)],
          position,
        },
      },
    )?.finished;
  }

  public async expandCombo(id: ID, animation: boolean): Promise<void> {
    const { model } = this.context;
    const position = positionOf(model.getComboData([id])[0]);

    // 重新计算数据 / Recalculate data
    this.computeStyle('expand');
    const data = this.computeChangesAndDrawData({ stage: 'expand', animation });
    if (!data) return;

    const { dataChanges, drawData } = data;
    const { add, update } = drawData;
    const context = { animation, stage: 'expand', data: drawData, target: id } as const;

    this.createElements(add, context);
    this.updateElements(update, context);

    const idsOf = (data: Map<ID, ElementDatum>) => Array.from(data).map(([, node]) => idOf(node));

    await this.context.animation!.animate(
      animation,
      {
        before: () => this.emit(new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW, { dataChanges, animation }), context),
        beforeAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.EXPAND, animation, drawData), context),
        afterAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.EXPAND, animation, drawData), context),
        after: () => this.emit(new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW, { dataChanges, animation }), context),
      },
      {
        expand: {
          target: id,
          descendants: [...idsOf(add.nodes), ...idsOf(add.combos)],
          position,
        },
      },
    )?.finished;
  }

  /**
   * <zh/> 清空所有元素
   *
   * <en/> clear all elements
   */
  public clear() {
    this.container.destroy();
    this.initContainer();
    this.elementMap = {};
    this.shapeTypeMap = {};
    this.defaultStyle = {};
    this.stateStyle = {};
    this.paletteStyle = {};
  }

  public destroy() {
    this.clear();
    this.container.destroy();
    // @ts-expect-error force delete
    this.context = {};
  }
}

export interface DrawContext {
  /** <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true */
  animation?: boolean;
  /** <zh/> 当前绘制阶段 | <en/> Current draw stage */
  stage?: AnimationStage;
  /** <zh/> 是否不抛出事件 | <en/> Whether not to dispatch events */
  silence?: boolean;
  /** <zh/> 收起/展开的对象 ID | <en/> ID of the object to collapse/expand */
  collapseExpandTarget?: ID;
  /** <zh/> 绘制类型 | <en/> Draw type */
  type?: 'render' | 'draw';
  /** <zh/> 展开阶段的目标元素 id | <en/> ID of the target element in the expand stage */
  target?: ID;
}

interface DrawPayload {
  data: {
    dataChanges: DataChange[];
    drawData: DrawData;
  };
  stage: AnimationStage;
  type: 'render' | 'draw';
}

/**
 * <zh/> 展开/收起节点选项
 *
 * <en/> Expand / collapse node options
 */
export interface CollapseExpandNodeOptions {
  /**
   * <zh/> 是否使用动画
   *
   * <en/> Whether to use animation
   */
  animation?: boolean;
  /**
   * <zh/> 保证展开/收起的节点位置不变
   *
   * <en/> Ensure that the position of the expanded/collapsed node remains unchanged
   */
  align?: boolean;
}
