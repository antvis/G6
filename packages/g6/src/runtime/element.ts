/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-param */
import type { DisplayObject, IAnimation } from '@antv/g';
import { Group } from '@antv/g';
import type { ID } from '@antv/graphlib';
import { groupBy } from '@antv/util';
import { executor as animationExecutor } from '../animations';
import { ChangeTypeEnum } from '../constants';
import type { BaseShape } from '../elements/shapes';
import { getPlugin } from '../registry';
import type { ComboData, DataOptions, EdgeData, NodeData } from '../spec';
import type { AnimationStage } from '../spec/element/animation';
import type { EdgeStyle } from '../spec/element/edge';
import type { NodeLikeStyle } from '../spec/element/node';
import type { DataChange, ElementData, ElementDatum, ElementType, State, StyleIterationContext } from '../types';
import { reduceDataChanges } from '../utils/change';
import { idOf } from '../utils/id';
import { assignColorByPalette, parsePalette } from '../utils/palette';
import { computeElementCallbackStyle } from '../utils/style';
import type { RuntimeContext } from './types';

type AnimationExecutor = (id: ID, shape: DisplayObject, originalStyle: Record<string, unknown>) => IAnimation | null;

export class ElementController {
  private context: RuntimeContext;

  private container!: {
    node: Group;
    edge: Group;
    combo: Group;
  };

  public init: Promise<void>;

  private elementMap: Record<ID, DisplayObject> = {};

  private animationMap: Record<ID, IAnimation | null | undefined> = {};

  constructor(context: RuntimeContext) {
    this.context = context;

    this.initElementStates();

    const { canvas } = context;

    this.init = new Promise<void>((resolve) => {
      canvas.init().then(() => {
        this.container = {
          node: canvas.appendChild(new Group({ style: { zIndex: 2 } })),
          edge: canvas.appendChild(new Group({ style: { zIndex: 1 } })),
          combo: canvas.appendChild(new Group({ style: { zIndex: 0 } })),
        };
        resolve();
      });
    });
  }

  private getElementData(elementType: ElementType, ids?: ID[]) {
    const { dataController } = this.context;

    switch (elementType) {
      case 'node':
        return dataController.getNodeData(ids);
      case 'edge':
        return dataController.getEdgeData(ids);
      case 'combo':
        return dataController.getComboData(ids);
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

  private getTheme(elementType: ElementType) {
    const { theme } = this.context.options;
    if (!theme) return {};

    const themeConfig = getPlugin('theme', theme);
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
      keyShapeColor: this.paletteStyle[id],
    };
  }

  public getDataStyle(elementType: ElementType, id: ID): NodeLikeStyle | EdgeStyle {
    const datum = this.getElementData(elementType, [id])?.[0];
    if (!datum) return {};

    // `data.style` 中一些样式例如 parentId, collapsed, type 并非直接给元素使用，因此需要过滤掉这些字段
    // Some styles in `data.style`, such as parentId, collapsed, type, are not directly used by the element, so these fields need to be filtered out
    const { parentId, collapsed, type, states, ...style } = datum.style || {};
    return style;
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

  private computeElementsDefaultStyle() {
    this.forEachElementData((elementType, elementData) => {
      elementData.forEach((datum, index) => {
        this.computedElementDefaultStyle(elementType, { datum, index, elementData });
      });
    });
  }

  public getDefaultStyle(id: ID) {
    return this.defaultStyle[id] || {};
  }

  private elementState: Record<ID, State[]> = {};

  private initElementStates() {
    const { options } = this.context;
    const { data } = options;
    const { nodes = [], edges = [], combos = [] } = data || {};
    [...nodes, ...edges, ...combos].forEach((elementData) => {
      if (elementData?.style?.states?.length) {
        const id = idOf(elementData);
        this.elementState[id] = elementData.style.states;
      }
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
      elementData.forEach((datum, index) => {
        const id = idOf(datum);

        if ((ids && ids.includes(id)) || ids === undefined) {
          const states = this.getElementStates(id);
          this.computeElementStatesStyle(elementType, states, { datum, index, elementData });
        }
      });
    });
  }

  public getStateStyle(id: ID) {
    return this.stateStyle[id] || {};
  }

  private computeStyle() {
    this.computePaletteStyle();
    this.computeElementsDefaultStyle();
    this.computeElementsStatesStyle();
  }

  private getElement<T extends DisplayObject = BaseShape<any>>(id: ID): T | undefined {
    return this.elementMap[id] as T;
  }

  private getAnimationExecutor(elementType: ElementType, stage: AnimationStage): AnimationExecutor {
    const { options } = this.context;
    const animation = options?.[elementType]?.animation?.[stage];

    return (id: ID, shape: DisplayObject, originalStyle: Record<string, unknown>) => {
      return animationExecutor(
        shape,
        animation,
        {},
        {
          originalStyle,
          states: this.getElementStates(id),
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
   */
  private getEdgeEndsContext(id: ID) {
    // 如果节点存在连接桩，选取最近的连接桩
    // 如果不存在连接桩，调用节点 getIntersectPoint 计算交点
    // 如果都不存在，直接使用节点中心点

    const { dataController } = this.context;

    const data = dataController.getEdgeData([id])?.[0];
    if (!data) return {};

    const { source, target, style = {} } = data;
    const { sourceAnchor, targetAnchor } = style;

    const sourceNode = this.getElement<any>(source);
    const targetNode = this.getElement<any>(target);

    // const sourceAnchors: Record<string, DisplayObject> = sourceNode?.getPorts?.() || {};
    // const targetAnchors: Record<string, DisplayObject> = targetNode?.getPorts?.() || {};

    const sourcePoint = sourceNode?.getPosition() || [0, 0, 0];
    const targetPoint = targetNode?.getPosition() || [0, 0, 0];

    // let sourcePoint!: Point;
    // let targetPoint!: Point;

    // TODO 下面的逻辑没有考虑到边的一端连接到连接桩，另一端连接到交点的情况
    // TODO The logic below does not consider the case where one end of the edge is connected to the port and the other end is connected to the intersection

    // 优先使用 sourceAnchor、targetAnchor / Use sourceAnchor and targetAnchor first
    // if (sourceAnchor && sourceAnchors[sourceAnchor] && targetAnchor && targetAnchors[targetAnchor]) {
    //   sourcePoint = sourceAnchors[sourceAnchor].getPosition();
    //   targetPoint = targetAnchors[targetAnchor].getPosition();
    // }
    // 如果不存在 sourceAnchor、targetAnchor，且存在 sourceAnchors、targetAnchors，选取最近的连接桩
    // If sourceAnchor and targetAnchor do not exist, and sourceAnchors and targetAnchors exist, select the nearest port
    // else if (Object.keys(sourceAnchors).length > 0 && Object.keys(targetAnchors).length > 0) {
    //   // TODO 实现算法用于选取最近的连接桩 / Implement the algorithm to select the nearest port
    // }
    // 如果不存在 sourceAnchor、targetAnchor，调用 getIntersectPoint 计算交点
    // If sourceAnchor and targetAnchor do not exist, call getIntersectPoint to calculate the intersection
    // else if (Object.keys(sourceAnchors).length === 0 && Object.keys(targetAnchors).length === 0) {
    //   // TODO 待实现 / To be implemented
    // }
    // 如果都不存在，直接使用节点中心点
    // If none of them exist, use the center point of the node directly
    // else {
    //    sourcePoint = sourceNode?.getPosition() || [0, 0, 0];
    //    targetPoint = targetNode?.getPosition() || [0, 0, 0];
    // }

    return {
      sourcePoint,
      targetPoint,
      sourceNode,
      targetNode,
    };
  }

  private getComboChildren(id: ID) {
    const { dataController } = this.context;
    return Object.fromEntries(
      dataController.getComboChildrenData(id).map((datum) => [idOf(datum), this.getElement(idOf(datum))]),
    );
  }

  public getElementComputedStyle(elementType: ElementType, id: ID) {
    // 优先级(从低到高) Priority (from low to high):
    const themeStyle = this.getThemeStyle(elementType);
    const paletteStyle = this.getPaletteStyle(id);
    const dataStyle = this.getDataStyle(elementType, id);
    const defaultStyle = this.getDefaultStyle(id);
    const themeStateStyle = this.getThemeStateStyle(elementType, this.getElementStates(id));
    const stateStyle = this.getStateStyle(id);

    const style = Object.assign({}, themeStyle, paletteStyle, dataStyle, defaultStyle, themeStateStyle, stateStyle);

    if (elementType === 'edge') {
      Object.assign(style, this.getEdgeEndsContext(id));
    } else if (elementType === 'combo') {
      Object.assign(style, {
        children: this.getComboChildren(id),
      });
    }

    return style;
  }

  // ---------- Render API ----------

  /**
   * <zh/> 开始绘制流程
   *
   * <en/> start render process
   */
  public async render(context: RuntimeContext) {
    await this.init;
    this.context = context;
    const { dataController } = context;

    const tasks = reduceDataChanges(dataController.getChanges());
    if (tasks.length === 0) return;

    this.stopAnimation();

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

    // 重新计算样式 / Recalculate style
    this.computeStyle();

    const dataOf = <T extends DataChange['value']>(data: DataChange[]) => data.map((datum) => datum.value) as T[];

    // 计算要新增的元素
    // compute elements to add
    const nodesToAdd = dataOf<NodeData>(NodeAdded);
    const edgesToAdd = dataOf<EdgeData>(EdgeAdded);
    const combosToAdd = dataOf<ComboData>(ComboAdded);

    // 计算要更新的元素
    // compute elements to update
    const nodesToUpdate = dataOf<NodeData>(NodeUpdated);
    const edgesToUpdate = dataOf<EdgeData>(EdgeUpdated);
    const combosToUpdate = dataOf<ComboData>(ComboUpdated);

    // 计算要删除的元素
    // compute elements to remove
    const nodesToRemove = dataOf<NodeData>(NodeRemoved);
    const edgesToRemove = dataOf<EdgeData>(EdgeRemoved);
    const combosToRemove = dataOf<ComboData>(ComboRemoved);

    // 如果更新了节点，需要更新连接的边和所处的 combo
    // If the node is updated, the connected edge and the combo it is in need to be updated
    nodesToUpdate
      .map((node) => dataController.getRelatedEdgesData(idOf(node)))
      .flat()
      .forEach((edge) => {
        if (!edgesToUpdate.find((item) => idOf(item) === idOf(edge))) edgesToUpdate.push(edge);
      });

    dataController
      .getComboData(
        [...nodesToUpdate, ...nodesToRemove, ...combosToUpdate, ...combosToRemove].reduce((acc, curr) => {
          const parentId = curr?.style?.parentId;
          if (parentId) acc.push(parentId);
          return acc;
        }, [] as ID[]),
      )
      .forEach((combo) => {
        if (!combosToUpdate.find((item) => item.id === combo.id)) combosToUpdate.push(combo);
      });

    // execute changes
    this.destroyElements({ nodes: nodesToRemove, edges: edgesToRemove, combos: combosToRemove });
    this.createElements({ nodes: nodesToAdd, edges: edgesToAdd, combos: combosToAdd });
    this.updateElements({ nodes: nodesToUpdate, edges: edgesToUpdate, combos: combosToUpdate });

    this.postRender();
  }

  private postRenderTasks: (() => void)[] = [];

  private postRender() {
    this.postRenderTasks.forEach((callback) => callback());
    this.postRenderTasks = [];
  }

  private shapeTypeMap: Record<ID, string> = {};

  private getShapeType(elementType: ElementType, datum: ElementDatum) {
    const type = datum?.style?.type;
    if (type) return type;
    // 推断默认类型 / Infer default type

    return {
      node: 'circle',
      edge: 'line',
      combo: 'circle',
    }[elementType];
  }

  private createElement(elementType: ElementType, datum: ElementDatum, animate?: AnimationExecutor) {
    const id = idOf(datum);
    const currentShape = this.getElement(id);
    if (currentShape) return;

    // get shape constructor
    const shapeType = this.getShapeType(elementType, datum);
    const Ctor = getPlugin(elementType, shapeType);
    if (!Ctor) return;

    const { context } = this;
    const shape = this.container[elementType].appendChild(
      // @ts-expect-error TODO fix type
      new Ctor({
        style: {
          context,
          ...this.getElementComputedStyle(elementType, id),
        },
      }),
    ) as DisplayObject;

    this.shapeTypeMap[id] = shapeType;

    this.postRenderTasks.push(() => {
      this.animationMap[id] = animate?.(id, shape, { ...shape.attributes });
    });

    this.elementMap[id] = shape;
  }

  private createElements(data: DataOptions) {
    // 新增相应的元素数据
    // 重新计算色板样式

    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ElementType, ElementData][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    iteration.forEach(([elementType, elementData]) => {
      const animation = this.getAnimationExecutor(elementType, 'enter');
      elementData.forEach((datum) => this.createElement(elementType, datum, animation));
    });
  }

  private async updateElement(elementType: ElementType, datum: ElementDatum, animate?: AnimationExecutor) {
    this.handleTypeChange(elementType, datum);

    const id = idOf(datum);
    const shape = this.getElement(id);
    if (!shape) return;

    const style = this.getElementComputedStyle(elementType, id);

    if ('update' in shape) shape.update(style);
    else (shape as DisplayObject).attr(style);

    this.postRenderTasks.push(() => {
      this.animationMap[id] = animate?.(id, shape, { ...shape.attributes });
    });
  }

  private updateElements(data: DataOptions) {
    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ElementType, ElementData][] = [
      ['node', nodes],
      ['edge', edges],
      ['combo', combos],
    ];

    iteration.forEach(([elementType, elementData]) => {
      const animate = this.getAnimationExecutor(elementType, 'update');
      elementData.forEach((datum) => this.updateElement(elementType, datum, animate));
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
  private handleTypeChange(elementType: ElementType, datum: ElementDatum) {
    const id = idOf(datum);
    const originalShapeType = this.shapeTypeMap[id];
    const modifiedShapeType = this.getShapeType(elementType, datum);
    if (originalShapeType && originalShapeType !== modifiedShapeType) {
      this.destroyElement(datum);
      this.createElement(elementType, datum);
    }
  }

  protected destroyElement(datum: ElementDatum, animate?: AnimationExecutor) {
    const id = idOf(datum);
    const element = this.elementMap[id];
    if (!element) return;

    const animateResult = animate?.(id, element, { ...element.attributes });

    const handleDestroy = () => {
      element.destroy();
    };

    if (animateResult) animateResult.onfinish = () => handleDestroy();
    else handleDestroy();
  }

  protected destroyElements(data: DataOptions) {
    const { nodes = [], edges = [], combos = [] } = data;

    const iteration: [ElementType, ElementData][] = [
      ['combo', combos],
      ['edge', edges],
      ['node', nodes],
    ];

    // 移除相应的元素数据
    // 重新计算色板样式，如果是分组色板，则不需要重新计算
    iteration.forEach(([elementType, elementData]) => {
      const animate = this.getAnimationExecutor(elementType, 'exit');
      elementData.forEach((datum) => this.destroyElement(datum, animate));
      this.clearElement(elementData.map(idOf));
    });
  }

  public stopAnimation() {
    Object.values(this.animationMap).forEach((animation) => animation?.finish());
    this.animationMap = {};
  }

  private clearElement(ids: ID[]) {
    ids.forEach((id) => {
      delete this.paletteStyle[id];
      delete this.defaultStyle[id];
      delete this.stateStyle[id];
      delete this.elementState[id];
      delete this.elementMap[id];
    });
  }
}
