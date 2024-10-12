import { AABB } from '@antv/g';
import { groupBy, isFunction, throttle } from '@antv/util';
import { GraphEvent } from '../constants';
import type { RuntimeContext } from '../runtime/types';
import type { Combo, Edge, Element, ID, IEvent, Node, NodeCentralityOptions, Padding } from '../types';
import { getExpandedBBox, isBBoxInside } from '../utils/bbox';
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
  sorter?: (labelElementsInViewport: Element[]) => Element[];
  /**
   * <zh/> 根据节点的重要性从高到低排序，重要性越高的节点其标签显示优先级越高。内置几种中心性算法，也可以自定义排序函数。需要注意，如果设置了 `sorter`，则 `nodeSorter` 不会生效
   *
   * <en/> Sort nodes by importance in descending order; nodes with higher importance have higher label display priority. Several centrality algorithms are built in, and custom sorting functions can also be defined. It should be noted that if `sorter` is set, `nodeSorter` will not take effect
   * @defaultValue { type: 'degree' }
   */
  nodeSorter?: NodeCentralityOptions | ((labeledNodesInViewport: Node[]) => Node[]);
  /**
   * <zh/> 根据边的重要性从高到低排序，重要性越高的边其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sorter`，则 `edgeSorter` 不会生效
   *
   * <en/> Sort edges by importance in descending order; edges with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sorter` is set, `edgeSorter` will not take effect
   */
  edgeSorter?: (labeledEdgesInViewport: Edge[]) => Edge[];
  /**
   * <zh/> 根据群组的重要性从高到低排序，重要性越高的群组其标签显示优先级越高。默认按照数据先后进行排序。需要注意，如果设置了 `sorter`，则 `comboSorter` 不会生效
   *
   * <en/> Sort combos by importance in descending order; combos with higher importance have higher label display priority. By default, they are sorted according to the data. It should be noted that if `sorter` is set, `comboSorter` will not take effect
   */
  comboSorter?: (labeledCombosInViewport: Combo[]) => Combo[];
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
    nodeSorter: { type: 'degree' },
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
   * <zh/> 检查当前包围盒是否有足够的空间进行展示；如果与已经展示的包围盒有重叠，或者超出视窗范围，则不会展示
   *
   * <en/> Check whether the current bounding box has enough space to display; if it overlaps with the displayed bounding box or exceeds the viewport range, it will not be displayed
   * @param bbox - bbox
   * @param bboxes - occupied bboxes which are already shown
   * @returns whether the bbox is overlapping with the bboxes or outside the viewpointBounds
   */
  private isOverlapping = (bbox: AABB, bboxes: AABB[]) => {
    return !isBBoxInside(bbox, this.viewpointBounds) || bboxes.some((b) => bbox.intersects(b));
  };

  private get viewpointBounds(): AABB {
    const { canvas } = this.context;

    const [minX, minY] = canvas.getCanvasByViewport([0, 0]);
    const [maxX, maxY] = canvas.getCanvasByViewport(canvas.getSize());
    const viewpointBounds = new AABB();
    viewpointBounds.setMinMax([minX, minY, 0], [maxX, maxY, 0]);

    return getExpandedBBox(viewpointBounds, 2);
  }

  private occupiedBounds: AABB[] = [];

  private detectLabelCollision = (elements: Element[]): { show: Element[]; hide: Element[] } => {
    const res: { show: Element[]; hide: Element[] } = { show: [], hide: [] };
    this.occupiedBounds = [];

    elements.forEach((element) => {
      const labelBounds = element.getShape('label').getRenderBounds();
      if (!this.isOverlapping(labelBounds, this.occupiedBounds)) {
        res.show.push(element);
        this.occupiedBounds.push(getExpandedBBox(labelBounds, this.options.padding));
      } else {
        res.hide.push(element);
      }
    });
    return res;
  };

  private get labelElements(): Record<ID, Element> {
    // @ts-expect-error access private property
    const elements = Object.values(this.context.element.elementMap);
    const labelElements = elements.filter((el: Element) => el.isVisible() && el.getShape('label'));
    return Object.fromEntries(labelElements.map((el) => [el.id, el]));
  }

  private getLabelElementsInView(): Element[] {
    const viewport = this.context.viewport!;
    return Object.values(this.labelElements).filter((node) =>
      viewport.isInViewport(node.getShape('key').getRenderBounds()),
    );
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
    const { sorter, nodeSorter, comboSorter, edgeSorter } = this.options;

    if (isFunction(this.options.sorter)) return sorter(labelElements);

    const { node: nodes = [], edge: edges = [], combo: combos = [] } = groupBy(labelElements, (el) => (el as any).type);

    const sortedCombos = isFunction(comboSorter) ? comboSorter(combos as Combo[]) : combos;

    const sortedNodes = isFunction(nodeSorter)
      ? nodeSorter(nodes as Node[])
      : this.sortNodesByCentrality(nodes as Node[], nodeSorter!);

    const sortedEdges = isFunction(edgeSorter) ? edgeSorter(edges as Edge[]) : edges;

    return [...sortedCombos, ...sortedNodes, ...sortedEdges];
  };

  private labelElementsInView: Element[] = [];

  protected onToggleVisibility = (event: IEvent) => {
    if (!this.validate(event)) {
      if (this.hiddenElements.size > 0) {
        this.hiddenElements.forEach(this.showLabel);
        this.hiddenElements.clear();
      }
      return;
    }

    const labelElementsInView = this.getLabelElementsInView();
    this.hideLabelIfExceedViewport(this.labelElementsInView, labelElementsInView);
    this.labelElementsInView = labelElementsInView;

    // 根据元素的重要性从高到低排序，重要性越高的元素其标签显示优先级越高；通常 combo > node > edge
    // Sort elements by their importance in descending order; elements with higher importance have higher label display priority; usually combo > node > edge
    const sortedElements = this.sortLabelElementsInView(this.labelElementsInView);
    const { show, hide } = this.detectLabelCollision(sortedElements);

    show.forEach(this.showLabel);
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
    this.hiddenElements.delete(element.id);
  };

  protected onTransform = throttle(this.onToggleVisibility, this.options.throttle, { leading: true }) as () => void;

  private bindEvents() {
    const { graph } = this.context;
    graph.once(GraphEvent.AFTER_RENDER, this.onToggleVisibility);
    graph.on(GraphEvent.AFTER_TRANSFORM, this.onTransform);
  }

  private unbindEvents() {
    const { graph } = this.context;
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
