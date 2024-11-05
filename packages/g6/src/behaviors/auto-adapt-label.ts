import { AABB } from '@antv/g';
import { groupBy, isFunction, throttle } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { ComboData, EdgeData, NodeData } from '../spec';
import type { Element, ElementDatum, ID, IEvent, Node, NodeCentralityOptions, Padding } from '../types';
import { getExpandedBBox } from '../utils/bbox';
import { getNodeCentralities } from '../utils/centrality';
import { arrayDiff } from '../utils/diff';
import { setVisibility } from '../utils/visibility';
import type { BaseBehaviorOptions } from './base-behavior';
import { BaseBehavior } from './base-behavior';

/**
 * <zh/> 标签自适应显示配置项
 *
 * <en/> Auto Adapt Label Options
 */
export interface AutoAdaptLabelOptions extends BaseBehaviorOptions {
  /**
   * <zh/> 是否启用
   *
   * <en/> Whether to enable
   * @defaultValue `true`
   */
  enable?: boolean | ((event: IEvent) => boolean);
  /**
   * <zh/> 根据元素的重要性从高到低排序，重要性越高的元素其标签显示优先级越高。一般情况下 combo > node > edge
   *
   * <en/> Sort elements by their importance in descending order; elements with higher importance have higher label display priority; usually combo > node > edge
   */
  sort?: (elementA: ElementDatum, elementB: ElementDatum) => -1 | 0 | 1;
  /**
   * <zh/> 根据节点的重要性从高到低排序，重要性越高的节点其标签显示优先级越高。内置几种中心性算法，也可以自定义排序函数。需要注意，如果设置了 `sort`，则 `sortNode` 不会生效
   *
   * <en/> Sort nodes by importance in descending order; nodes with higher importance have higher label display priority. Several centrality algorithms are built in, and custom sorting functions can also be defined. It should be noted that if `sort` is set, `sortNode` will not take effect
   * @defaultValue { type: 'degree' }
   */
  sortNode?: NodeCentralityOptions | ((nodeA: NodeData, nodeB: NodeData) => -1 | 0 | 1);
  /**
   * <zh/> 根据边的重要性从高到低排序，重要性越高的边其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortEdge` 不会生效
   *
   * <en/> Sort edges by importance in descending order; edges with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sort` is set, `sortEdge` will not take effect
   */
  sortEdge?: (edgeA: EdgeData, edgeB: EdgeData) => -1 | 0 | 1;
  /**
   * <zh/> 根据群组的重要性从高到低排序，重要性越高的群组其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sort`，则 `sortCombo` 不会生效
   *
   * <en/> Sort combos by importance in descending order; combos with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sort` is set, `sortCombo` will not take effect
   */
  sortCombo?: (comboA: ComboData, comboB: ComboData) => -1 | 0 | 1;
  /**
   * <zh/> 设置标签的内边距，用于判断标签是否重叠，以避免标签显示过于密集
   *
   * <en/> Set the padding of the label to determine whether the label overlaps to avoid the label being displayed too densely
   * @defaultValue 0
   */
  padding?: Padding;
  /**
   * <zh/> 节流时间
   *
   * <en/> Throttle time
   * @defaultValue 32
   */
  throttle?: number;
}

/**
 * <zh/> 标签自适应显示
 *
 * <en/> Auto Adapt Label
 * @remarks
 * <zh/> 标签自适应显示是一种动态标签管理策略，旨在根据当前可视范围的空间分配、节点重要性等因素，智能调整哪些标签应显示或隐藏。通过对可视区域的实时分析，确保用户在不同的交互场景下获得最相关最清晰的信息展示，同时避免视觉过载和信息冗余。
 *
 * <en/ >Label Adaptive Display is a dynamic label management strategy designed to intelligently adjust which labels should be shown or hidden based on factors such as the spatial allocation of the current viewport and node importance. By analyzing the visible area in real-time, it ensures that users receive the most relevant and clear information display in various interactive scenarios, while avoiding visual overload and information redundancy.
 */
export class AutoAdaptLabel extends BaseBehavior<AutoAdaptLabelOptions> {
  static defaultOptions: Partial<AutoAdaptLabelOptions> = {
    enable: true,
    throttle: 100,
    padding: 0,
    sortNode: { type: 'degree' },
  };

  constructor(context: RuntimeContext, options: AutoAdaptLabelOptions) {
    super(context, Object.assign({}, AutoAdaptLabel.defaultOptions, options));
    this.bindEvents();
  }

  public update(options: Partial<AutoAdaptLabelOptions>): void {
    this.unbindEvents();
    super.update(options);
    this.bindEvents();
    this.onToggleVisibility({} as IEvent);
  }

  /**
   * <zh/> 检查当前包围盒是否有足够的空间进行展示；如果与已经展示的包围盒有重叠，则不会展示
   *
   * <en/> Check whether the current bounding box has enough space to display; if it overlaps with the displayed bounding box, it will not be displayed
   * @param bbox - bbox
   * @param bboxes - occupied bboxes which are already shown
   * @returns whether the bbox is overlapping with the bboxes or outside the viewpointBounds
   */
  private isOverlapping = (bbox: AABB, bboxes: AABB[]) => {
    return bboxes.some((b) => bbox.intersects(b));
  };

  private occupiedBounds: AABB[] = [];

  private detectLabelCollision = (elements: Element[]): { show: Element[]; hide: Element[] } => {
    const viewport = this.context.viewport!;
    const res: { show: Element[]; hide: Element[] } = { show: [], hide: [] };
    this.occupiedBounds = [];

    elements.forEach((element) => {
      const labelBounds = element.getShape('label').getRenderBounds();
      if (viewport.isInViewport(labelBounds, true) && !this.isOverlapping(labelBounds, this.occupiedBounds)) {
        res.show.push(element);
        this.occupiedBounds.push(getExpandedBBox(labelBounds, this.options.padding));
      } else {
        res.hide.push(element);
      }
    });
    return res;
  };

  private getLabelElements(): Element[] {
    // @ts-expect-error access private property
    const { elementMap } = this.context.element;
    const elements: Element[] = [];

    for (const key in elementMap) {
      const element = elementMap[key];
      if (element.isVisible() && element.getShape('label')) {
        elements.push(element);
      }
    }

    return elements;
  }

  private getLabelElementsInView(): Element[] {
    const viewport = this.context.viewport!;
    return this.getLabelElements().filter((node) => viewport.isInViewport(node.getShape('key').getRenderBounds()));
  }

  private hideLabelIfExceedViewport = (prevElementsInView: Element[], currentElementsInView: Element[]) => {
    const { exit } = arrayDiff<Element>(prevElementsInView, currentElementsInView, (d) => d.id);
    exit?.forEach(this.hideLabel);
  };

  private nodeCentralities: Map<ID, number> = new Map();

  private sortNodesByCentrality = (nodes: Node[], centrality: NodeCentralityOptions) => {
    const { model } = this.context;
    const graphData = model.getData();
    const getRelatedEdgesData = model.getRelatedEdgesData.bind(model);

    const nodesWithCentrality = nodes.map((node) => {
      if (!this.nodeCentralities.has(node.id)) {
        this.nodeCentralities = getNodeCentralities(graphData, getRelatedEdgesData, centrality);
      }
      return { node, centrality: this.nodeCentralities.get(node.id)! };
    });
    return nodesWithCentrality.sort((a, b) => b.centrality - a.centrality).map((item) => item.node);
  };

  protected sortLabelElementsInView = (labelElements: Element[]): Element[] => {
    const { sort, sortNode, sortCombo, sortEdge } = this.options;
    const { model } = this.context;

    if (isFunction(sort))
      return labelElements.sort((a, b) => sort(model.getElementDataById(a.id), model.getElementDataById(b.id)));

    const { node: nodes = [], edge: edges = [], combo: combos = [] } = groupBy(labelElements, (el) => (el as any).type);

    const sortedCombos = isFunction(sortCombo)
      ? combos.sort((a, b) => sortCombo(...(model.getComboData([a.id, b.id]) as [ComboData, ComboData])))
      : combos;

    const sortedNodes = isFunction(sortNode)
      ? nodes.sort((a, b) => sortNode(...(model.getNodeData([a.id, b.id]) as [NodeData, NodeData])))
      : this.sortNodesByCentrality(nodes as Node[], sortNode);

    const sortedEdges = isFunction(sortEdge)
      ? edges.sort((a, b) => sortEdge(...(model.getEdgeData([a.id, b.id]) as [EdgeData, EdgeData])))
      : edges;

    return [...sortedCombos, ...sortedNodes, ...sortedEdges];
  };

  private labelElementsInView: Element[] = [];

  private isFirstRender = true;

  protected onToggleVisibility = (event: IEvent) => {
    // @ts-expect-error missing type
    if (event.data?.stage === 'zIndex') return;

    if (!this.validate(event)) {
      if (this.hiddenElements.size > 0) {
        this.hiddenElements.forEach(this.showLabel);
        this.hiddenElements.clear();
      }
      return;
    }

    const labelElementsInView = this.isFirstRender ? this.getLabelElements() : this.getLabelElementsInView();
    this.hideLabelIfExceedViewport(this.labelElementsInView, labelElementsInView);
    this.labelElementsInView = labelElementsInView;

    // 根据元素的重要性从高到低排序，重要性越高的元素其标签显示优先级越高；通常 combo > node > edge
    // Sort elements by their importance in descending order; elements with higher importance have higher label display priority; usually combo > node > edge
    const sortedElements = this.sortLabelElementsInView(this.labelElementsInView);
    const { show, hide } = this.detectLabelCollision(sortedElements);

    for (let i = show.length - 1; i >= 0; i--) {
      this.showLabel(show[i]);
    }
    hide.forEach(this.hideLabel);
  };

  private hiddenElements: Map<ID, Element> = new Map();

  private hideLabel = (element: Element) => {
    const label = element.getShape('label');
    if (label) setVisibility(label, 'hidden');
    this.hiddenElements.set(element.id, element);
  };

  private showLabel = (element: Element) => {
    const label = element.getShape('label');
    if (label) setVisibility(label, 'visible');
    element.toFront();
    this.hiddenElements.delete(element.id);
  };

  protected onTransform = throttle(this.onToggleVisibility, this.options.throttle, { leading: true }) as () => void;

  private enableToggle = true;

  private toggle = (event: IEvent) => {
    if (!this.enableToggle) return;
    this.onToggleVisibility(event);
  };

  private onBeforeRender = () => {
    this.enableToggle = false;
  };

  private onAfterRender = (event: IEvent) => {
    this.onToggleVisibility(event);
    this.enableToggle = true;
  };

  private bindEvents() {
    const { graph } = this.context;
    graph.on(GraphEvent.BEFORE_RENDER, this.onBeforeRender);
    graph.on(GraphEvent.AFTER_RENDER, this.onAfterRender);
    graph.on(GraphEvent.AFTER_DRAW, this.toggle);
    graph.on(GraphEvent.AFTER_LAYOUT, this.toggle);
    graph.on(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private unbindEvents() {
    const { graph } = this.context;
    graph.off(GraphEvent.BEFORE_RENDER, this.onBeforeRender);
    graph.off(GraphEvent.AFTER_RENDER, this.onAfterRender);
    graph.off(GraphEvent.AFTER_DRAW, this.toggle);
    graph.off(GraphEvent.AFTER_LAYOUT, this.toggle);
    graph.off(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private validate(event: IEvent): boolean {
    if (this.destroyed) return false;
    const { enable } = this.options;
    if (isFunction(enable)) return enable(event);
    return !!enable;
  }

  public destroy(): void {
    this.unbindEvents();
    super.destroy();
  }
}
