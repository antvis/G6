/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps } from '@antv/g';
import { Group } from '@antv/g';
import { groupBy } from '@antv/util';
import { AnimationType, COMBO_KEY, ChangeType, GraphEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import { getExtension } from '../registry/get';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
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
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { positionOf } from '../utils/position';
import { print } from '../utils/print';
import { computeElementCallbackStyle } from '../utils/style';
import { themeOf } from '../utils/theme';
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
    if (!this.container) {
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

  /**
   * <zh/> 开始绘制流程
   *
   * <en/> start render process
   */
  public draw(context: DrawContext = { animation: true }) {
    this.init();

    const data = this.computeChangesAndDrawData(context);
    if (!data) return null;

    const { type = 'draw', stage = type, animation, silence } = context;
    const { dataChanges, drawData } = data;
    this.markDestroyElement(drawData);
    // 计算样式 / Calculate style
    this.computeStyle(stage);
    // 创建渲染任务 / Create render task
    const { add, update, remove } = drawData;
    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

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
        style: {
          ...style,
        },
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
   * <zh/> 收起节点
   *
   * <en/> collapse node
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true
   */
  public async collapseNode(id: ID, animation: boolean): Promise<void> {
    const { model, layout } = this.context;

    const preLayoutData = this.computeChangesAndDrawData({ stage: 'collapse', animation });
    if (!preLayoutData) return;

    this.markDestroyElement(preLayoutData.drawData);

    // 进行预布局，计算出所有元素的位置
    // Perform pre-layout to calculate the position of all elements
    const result = await layout!.simulate();
    model.updateData(result);

    // 重新计算数据 / Recalculate data
    const data = this.computeChangesAndDrawData({ stage: 'collapse', animation });
    if (!data) return;
    const { drawData } = data;
    const { add, remove, update } = drawData;
    this.markDestroyElement(drawData);
    const context = { animation, stage: 'collapse', data: drawData } as const;

    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

    await this.context.animation!.animate(
      animation,
      {
        beforeAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.COLLAPSE, animation, drawData), context),
        afterAnimate: (animation) =>
          this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.COLLAPSE, animation, drawData), context),
      },
      {
        collapse: {
          target: id,
          descendants: Array.from(remove.nodes).map(([, node]) => idOf(node)),
          position: positionOf(update.nodes.get(id)!),
        },
      },
    )?.finished;
  }

  /**
   * <zh/> 展开节点
   *
   * <en/> expand node
   * @param id - <zh/> 元素 ID | <en/> element ID
   * @param animation - <zh/> 是否使用动画，默认为 true | <en/> Whether to use animation, default is true
   */
  public async expandNode(id: ID, animation: boolean): Promise<void> {
    const { model, layout } = this.context;
    if (!model.getAncestorsData(id, COMBO_KEY).every((datum) => isCollapsed(datum))) return;

    const position = positionOf(model.getNodeData([id])[0]);

    const preLayoutData = this.computeChangesAndDrawData({ stage: 'expand', animation });
    if (!preLayoutData) return;

    // 首先创建展开的元素，然后进行预布局
    // First create the expanded element, then perform pre-layout
    const {
      drawData: { add },
    } = preLayoutData;
    this.createElements(add, { animation: false, stage: 'expand', target: id });
    // 重置动画 / Reset animation
    this.context.animation!.clear();

    const result = await layout!.simulate();
    model.updateData(result);

    // 重新计算数据 / Recalculate data
    this.computeStyle('expand');
    const data = this.computeChangesAndDrawData({ stage: 'collapse', animation });
    if (!data) return;
    const { drawData } = data;
    const { update } = drawData;

    const context = { animation, stage: 'expand', data: drawData } as const;

    // 将新增节点/边添加到更新列表 / Add new nodes/edges to the update list
    add.edges.forEach((edge) => update.edges.set(idOf(edge), edge));
    add.nodes.forEach((node) => update.nodes.set(idOf(node), node));

    this.updateElements(update, context);

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

  public destroy() {
    this.container.destroy();
    this.elementMap = {};
    this.shapeTypeMap = {};
    this.defaultStyle = {};
    this.stateStyle = {};
    this.paletteStyle = {};
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
