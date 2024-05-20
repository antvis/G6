/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { BaseStyleProps } from '@antv/g';
import { Group } from '@antv/g';
import { groupBy, isEmpty, isString } from '@antv/util';
import { AnimationType, ChangeType, GraphEvent } from '../constants';
import { ELEMENT_TYPES } from '../constants/element';
import { getExtension } from '../registry';
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
  State,
  StyleIterationContext,
} from '../types';
import { cacheStyle, getCachedStyle, hasCachedStyle, setCacheStyle } from '../utils/cache';
import { reduceDataChanges } from '../utils/change';
import { updateStyle } from '../utils/element';
import type { BaseEvent } from '../utils/event';
import { AnimateEvent, ElementLifeCycleEvent, GraphLifeCycleEvent, emit } from '../utils/event';
import { idOf } from '../utils/id';
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { computeElementCallbackStyle } from '../utils/style';
import { themeOf } from '../utils/theme';
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
      const elementData = this.context.model.getElementsDataByType(elementType);
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

    const { dataChanges, drawData } = data;
    // 计算样式 / Calculate style
    this.computeStyle();
    // 创建渲染任务 / Create render task
    const { add, update, remove } = drawData;
    this.destroyElements(remove, context);
    this.createElements(add, context);
    this.updateElements(update, context);

    const { animation, silence } = context;

    return this.context.animation!.animate(
      animation,
      silence
        ? {}
        : {
            before: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.BEFORE_DRAW, { dataChanges, animation: context.animation }),
                context,
              ),
            beforeAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.BEFORE_ANIMATE, AnimationType.DRAW, animation, drawData), context),
            afterAnimate: (animation) =>
              this.emit(new AnimateEvent(GraphEvent.AFTER_ANIMATE, AnimationType.DRAW, animation, drawData), context),
            after: () =>
              this.emit(
                new GraphLifeCycleEvent(GraphEvent.AFTER_DRAW, { dataChanges, animation: context.animation }),
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
    if (!Ctor) return;

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

    const { stage = 'enter' } = context;

    this.context.animation?.add(
      {
        element,
        elementType,
        stage,
        originalStyle: { ...element.attributes },
        modifiedStyle: style,
      },
      {
        after: () => {
          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_CREATE, elementType, datum), context);
          element.onCreate();
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

  private updateElement(elementType: ElementType, datum: ElementDatum, context: DrawContext) {
    const id = idOf(datum);

    const element = this.getElement(id);
    if (!element) return () => null;

    this.emit(new ElementLifeCycleEvent(GraphEvent.BEFORE_ELEMENT_UPDATE, elementType, datum), context);

    const type = this.getElementType(elementType, datum);
    const style = this.getElementComputedStyle(elementType, datum);

    // 如果类型不同，需要先销毁原有元素，再创建新元素
    // If the type is different, you need to destroy the original element first, and then create a new element
    if (this.shapeTypeMap[id] !== type) {
      element.destroy();
      delete this.shapeTypeMap[id];
      delete this.elementMap[id];

      this.createElement(elementType, datum, { animation: false, silence: true });
    }

    const { stage = 'update' } = context;

    const exactStage = stage !== 'visibility' ? stage : style.visibility === 'hidden' ? 'hide' : 'show';

    this.context.animation?.add(
      {
        element,
        elementType,
        stage: exactStage,
        originalStyle: element.attributes,
        modifiedStyle: { ...element.attributes, ...style },
      },
      {
        before: () => {
          updateStyle(element, style);

          if (stage === 'visibility') {
            // 缓存原始透明度 / Cache original opacity
            // 会在 animation controller 中访问该缓存值 / The cached value will be accessed in the animation controller
            if (!hasCachedStyle(element, 'opacity')) cacheStyle(element, 'opacity');
            setCacheStyle(element, 'visibility', exactStage === 'show' ? 'visible' : 'hidden');
            if (exactStage === 'show') updateStyle(element, { visibility: 'visible' });
          }
        },
        after: () => {
          if (exactStage === 'hide') updateStyle(element, { visibility: getCachedStyle(element, 'visibility') });

          this.emit(new ElementLifeCycleEvent(GraphEvent.AFTER_ELEMENT_UPDATE, elementType, datum), context);
          element.onUpdate();
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
        originalStyle: element.attributes,
        modifiedStyle: element.attributes,
      },
      {
        after: () => {
          this.clearElement(id);
          element.destroy();
          element.onDestroy();
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

  public destroy() {
    // @ts-expect-error force delete
    this.container = {};
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
  animation: boolean;
  /** <zh/> 当前绘制阶段 | <en/> Current draw stage */
  stage?: AnimationStage;
  /** <zh/> 是否不抛出事件 | <en/> Whether not to throw events */
  silence?: boolean;
}
