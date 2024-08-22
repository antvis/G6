import data from '@@/dataset/algorithm-category.json';
import type {
  BaseStyleProps,
  DisplayObject,
  DisplayObjectConfig,
  Group,
  RectStyleProps,
  TextStyleProps,
} from '@antv/g';
import { Text as GText, Rect } from '@antv/g';
import type {
  BadgeStyleProps,
  BaseBehaviorOptions,
  BaseNodeStyleProps,
  Element,
  ID,
  IElementDragEvent,
  IPointerEvent,
  LabelStyleProps,
  Node,
  NodeData,
  Point,
  PolylineStyleProps,
  Prefix,
  RuntimeContext,
  Vector2,
} from '@antv/g6';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  CommonEvent,
  ExtensionCategory,
  Graph,
  NodeEvent,
  Polyline,
  idOf,
  register,
  subStyleProps,
  treeToGraphData,
} from '@antv/g6';

export const caseIndentedTree: TestCase = async (context) => {
  const rootId = data.id;
  const COLORS = [
    '#5B8FF9',
    '#F6BD16',
    '#5AD8A6',
    '#945FB9',
    '#E86452',
    '#6DC8EC',
    '#FF99C3',
    '#1E9493',
    '#FF9845',
    '#5D7092',
  ];

  let textShape: GText | null;
  const measureText = (text: TextStyleProps) => {
    if (!textShape) textShape = new GText({ style: text });
    textShape.attr(text);
    return textShape.getBBox().width;
  };

  interface IndentedNodeStyleProps extends BaseNodeStyleProps {
    showIcon: boolean;
    color: string;
  }

  const TreeEvent = {
    COLLAPSE_EXPAND: 'collapse-expand',
    ADD_CHILD: 'add-child',
  };

  class IndentedNode extends BaseNode<IndentedNodeStyleProps> {
    static defaultStyleProps: Partial<IndentedNodeStyleProps> = {
      ports: [
        {
          key: 'in',
          placement: 'right-bottom',
        },
        {
          key: 'out',
          placement: 'left-bottom',
        },
      ],
    };

    constructor(options: DisplayObjectConfig<IndentedNodeStyleProps>) {
      Object.assign(options.style!, IndentedNode.defaultStyleProps);
      super(options);
    }

    protected get childrenData() {
      return this.context!.model.getChildrenData(this.id);
    }

    protected getKeyStyle(attributes: Required<IndentedNodeStyleProps>): RectStyleProps {
      const [width, height] = this.getSize(attributes);
      const keyStyle = super.getKeyStyle(attributes);
      return {
        width,
        height,
        ...keyStyle,
        fill: 'transparent',
      };
    }

    protected drawKeyShape(attributes: Required<IndentedNodeStyleProps>, container: Group): Rect | undefined {
      const keyStyle = this.getKeyStyle(attributes);
      return this.upsert('key', Rect, keyStyle, container);
    }

    protected getLabelStyle(attributes: Required<IndentedNodeStyleProps>): false | LabelStyleProps {
      if (attributes.label === false || !attributes.labelText) return false;
      return subStyleProps<LabelStyleProps>(this.getGraphicStyle(attributes), 'label');
    }

    private drawIconArea(attributes: Required<IndentedNodeStyleProps>, container: Group) {
      const [, h] = this.getSize(attributes);
      const iconAreaStyle = {
        fill: 'transparent',
        height: 30,
        width: 12,
        x: -6,
        y: h,
        zIndex: -1,
      };
      this.upsert('icon-area', Rect, iconAreaStyle, container);
    }

    private forwardEvent(target: DisplayObject | undefined, type: string, listener: (event: any) => void) {
      if (target && !Reflect.has(target, '__bind__')) {
        Reflect.set(target, '__bind__', true);
        target.addEventListener(type, listener);
      }
    }

    private getCountStyle(attributes: Required<IndentedNodeStyleProps>): false | BadgeStyleProps {
      const { collapsed, color } = attributes;
      if (collapsed) {
        const [, height] = this.getSize(attributes);
        return {
          backgroundFill: color,
          cursor: 'pointer',
          fill: '#fff',
          fontSize: 8,
          padding: [0, 10],
          text: `${this.childrenData.length}`,
          textAlign: 'center',
          y: height + 8,
        };
      }

      return false;
    }

    private drawCountShape(attributes: Required<IndentedNodeStyleProps>, container: Group) {
      const countStyle = this.getCountStyle(attributes);
      const btn = this.upsert('count', Badge, countStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
          id: this.id,
          collapsed: false,
        });
      });
    }

    private isShowCollapse(attributes: Required<IndentedNodeStyleProps>) {
      return !attributes.collapsed && this.childrenData.length > 0;
    }

    private getCollapseStyle(attributes: Required<IndentedNodeStyleProps>): false | BadgeStyleProps {
      const { showIcon, color } = attributes;
      if (!this.isShowCollapse(attributes)) return false;
      const [, height] = this.getSize(attributes);
      return {
        visibility: showIcon ? 'visible' : 'hidden',
        backgroundFill: color,
        backgroundHeight: 12,
        backgroundWidth: 12,
        cursor: 'pointer',
        fill: '#fff',
        fontFamily: 'iconfont',
        fontSize: 8,
        text: '\ue6e4',
        textAlign: 'center',
        x: -1, // half of edge line width
        y: height + 8,
      };
    }

    private drawCollapseShape(attributes: Required<IndentedNodeStyleProps>, container: Group) {
      const iconStyle = this.getCollapseStyle(attributes);
      const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
          id: this.id,
          collapsed: !attributes.collapsed,
        });
      });
    }

    private getAddStyle(attributes: Required<IndentedNodeStyleProps>): false | BadgeStyleProps {
      const { collapsed, showIcon } = attributes;
      if (collapsed) return false;
      const [, height] = this.getSize(attributes);
      const color = '#ddd';
      const lineWidth = 1;

      return {
        visibility: showIcon ? 'visible' : 'hidden',
        backgroundFill: '#fff',
        backgroundHeight: 12,
        backgroundLineWidth: lineWidth,
        backgroundStroke: color,
        backgroundWidth: 12,
        cursor: 'pointer',
        fill: color,
        fontFamily: 'iconfont',
        text: '\ue664',
        textAlign: 'center',
        x: -1,
        y: height + (this.isShowCollapse(attributes) ? 22 : 8),
      };
    }

    private drawAddShape(attributes: Required<IndentedNodeStyleProps>, container: Group) {
      const addStyle = this.getAddStyle(attributes);
      const btn = this.upsert('add', Badge, addStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id });
      });
    }

    public render(attributes: Required<IndentedNodeStyleProps> = this.parsedAttributes, container: Group = this): void {
      super.render(attributes, container);

      this.drawCountShape(attributes, container);

      this.drawIconArea(attributes, container);
      this.drawCollapseShape(attributes, container);
      this.drawAddShape(attributes, container);
    }
  }

  class IndentedEdge extends Polyline {
    protected getControlPoints(attributes: Required<PolylineStyleProps>) {
      const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);
      const [sx] = sourcePoint;
      const [, ty] = targetPoint;
      return [[sx, ty]] as Point[];
    }
  }

  interface CollapseExpandTreeOptions extends BaseBehaviorOptions {
    onCreateChild?: (parent: ID) => NodeData;
  }

  class CollapseExpandTree extends BaseBehavior<CollapseExpandTreeOptions> {
    constructor(context: RuntimeContext, options: CollapseExpandTreeOptions) {
      super(context, options);
      this.bindEvents();
    }

    public update(options: Partial<CollapseExpandTreeOptions>) {
      this.unbindEvents();
      super.update(options);
      this.bindEvents();
    }

    private bindEvents() {
      const { graph } = this.context;

      graph.on(NodeEvent.POINTER_ENTER, this.showIcon);
      graph.on(NodeEvent.POINTER_LEAVE, this.hideIcon);
      graph.on(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
      graph.on(TreeEvent.ADD_CHILD, this.addChild);
    }

    private unbindEvents() {
      const { graph } = this.context;

      graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
      graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
      graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
      graph.off(TreeEvent.ADD_CHILD, this.addChild);
    }

    private status = 'idle';

    private showIcon = (event: IPointerEvent<Node>) => {
      this.setIcon(event, true);
    };

    private hideIcon = (event: IPointerEvent<Node>) => {
      this.setIcon(event, false);
    };

    private setIcon = (event: IPointerEvent<Node>, show: boolean) => {
      if (this.status !== 'idle') return;
      const { target } = event;
      const id = target.id;
      const { graph, element } = this.context;
      graph.updateNodeData([{ id, style: { showIcon: show } }]);
      element!.draw({ animation: false, silence: true });
    };

    private onCollapseExpand = async (event: any) => {
      this.status = 'busy';
      const { id, collapsed } = event;
      const { graph } = this.context;
      await graph.frontElement(id);
      if (collapsed) await graph.collapseElement(id);
      else await graph.expandElement(id);
      this.status = 'idle';
    };

    private addChild = async (event: any) => {
      this.status = 'busy';
      const {
        onCreateChild = (id) => {
          const parent = this.context.graph.getNodeData(id);
          const { x = 0, y = 0 } = parent.style || {};
          return { id: `${Date.now()}`, style: { x, y, labelText: 'new node' } };
        },
      } = this.options;
      const { graph } = this.context;
      const datum = onCreateChild(event.id);
      const parent = graph.getNodeData(event.id);

      graph.addNodeData([datum]);
      graph.addEdgeData([{ source: event.id, target: datum.id }]);
      graph.updateNodeData([
        { id: event.id, children: [...(parent.children || []), datum.id], style: { collapsed: false } },
      ]);
      await graph.render();
      this.status = 'idle';
    };
  }

  interface DragBranchOptions extends BaseBehaviorOptions, Prefix<'shadow', BaseStyleProps> {
    enable?: boolean | ((event: IElementDragEvent) => boolean);
  }

  /**
   * <zh/> 支持拖拽节点到其他节点下作为子节点
   *
   * <en/> Support dragging nodes to other nodes as child nodes
   */
  class DragBranch extends BaseBehavior<DragBranchOptions> {
    constructor(context: RuntimeContext, options: DragBranchOptions) {
      super(context, options);
      this.bindEvents();
    }

    public update(options: Partial<DragBranchOptions>) {
      this.unbindEvents();
      super.update(options);
      this.bindEvents();
    }

    private bindEvents() {
      const { graph } = this.context;

      graph.on(NodeEvent.DRAG_START, this.onDragStart);
      graph.on(NodeEvent.DRAG, this.onDrag);
      graph.on(NodeEvent.DRAG_END, this.onDragEnd);
      graph.on(NodeEvent.DRAG_ENTER, this.onDragEnter);
      graph.on(NodeEvent.DRAG_LEAVE, this.onDragLeave);
    }

    private unbindEvents() {
      const { graph } = this.context;

      graph.off(NodeEvent.DRAG_START, this.onDragStart);
      graph.off(NodeEvent.DRAG, this.onDrag);
      graph.off(NodeEvent.DRAG_END, this.onDragEnd);
      graph.off(NodeEvent.DRAG_ENTER, this.onDragEnter);
      graph.off(NodeEvent.DRAG_LEAVE, this.onDragLeave);
    }

    private enable = true;

    private validate(event: IElementDragEvent) {
      if (this.destroyed) return false;
      const { enable = (evt) => evt.target.id !== rootId } = this.options;
      if (typeof enable === 'function') return enable(event);
      return !!enable;
    }

    private shadow?: Rect;

    private createShadow(target: Element) {
      const shadowStyle = subStyleProps<RectStyleProps>(this.options, 'shadow');
      const positionStyle = target.getShape('label').getBBox();

      this.shadow = new Rect({
        style: {
          pointerEvents: 'none',
          fill: '#F3F9FF',
          fillOpacity: 0.5,
          stroke: '#1890FF',
          strokeOpacity: 0.9,
          lineDash: [5, 5],
          ...shadowStyle,
          ...positionStyle,
        },
      });
      this.context.canvas.appendChild(this.shadow);
    }

    private moveShadow(offset: Vector2) {
      if (!this.shadow) return;
      const [dx, dy] = offset;
      this.shadow.translate(dx, dy);
    }

    private destroyShadow() {
      this.shadow?.remove();
      this.shadow = undefined;
    }

    private child?: Node;

    private parent?: Node;

    private onDragStart = (event: IElementDragEvent) => {
      this.enable = this.validate(event);
      if (!this.enable) return;

      const { target } = event;
      this.child = target as Node;
      this.createShadow(target);
    };

    private getDelta(event: IElementDragEvent): Vector2 {
      const zoom = this.context.graph.getZoom();
      return [event.dx / zoom, event.dy / zoom];
    }

    private onDrag = (event: IElementDragEvent) => {
      if (!this.enable) return;

      const delta = this.getDelta(event);
      this.moveShadow(delta);
    };

    private onDragEnd = () => {
      this.destroyShadow();
      if (this.child === undefined || this.parent === undefined) return;

      const { graph } = this.context;
      const childId = this.child.id;
      const parentId = this.parent.id;

      const originalParent = graph.getParentData(childId, 'tree') as NodeData;

      // 前后父节点不应该相同
      // The previous and current parent nodes should not be the same
      if (idOf(originalParent) === parentId) return;

      // 新的父节点不应该是当前节点的子节点
      // The new parent node should not be a child node of the current node
      const ancestors = graph.getAncestorsData(parentId, 'tree');
      if (ancestors.some((ancestor) => ancestor.id === childId)) return;

      const edges = graph
        .getEdgeData()
        .filter((edge) => edge.target === childId)
        .map(idOf);
      graph.removeEdgeData(edges);
      graph.updateNodeData([
        { id: idOf(originalParent), children: originalParent?.children?.filter((child) => child !== childId) },
      ]);
      const modifiedParent = graph.getNodeData(parentId);
      graph.updateNodeData([{ id: parentId, children: [...(modifiedParent.children || []), childId] }]);
      graph.addEdgeData([{ source: parentId, target: childId }]);
      graph.render();
    };

    private onDragEnter = (event: IElementDragEvent) => {
      const { graph, element } = this.context;
      const targetId = event.target.id;
      if (targetId === this.child?.id || targetId === rootId) {
        if (targetId === rootId) this.parent = event.target as Node;
        return;
      }

      this.parent = event.target as Node;
      graph.updateNodeData([{ id: targetId, states: ['selected'] }]);
      element!.draw({ animation: false, silence: true });
    };

    private onDragLeave = (event: IElementDragEvent) => {
      const { graph, element } = this.context;
      const targetId = event.target.id;

      this.parent = undefined;
      graph.updateNodeData([{ id: targetId, states: [] }]);
      element!.draw({ animation: false, silence: true });
    };
  }

  register(ExtensionCategory.NODE, 'indented', IndentedNode);
  register(ExtensionCategory.EDGE, 'indented', IndentedEdge);
  register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
  register(ExtensionCategory.BEHAVIOR, 'drag-branch', DragBranch);

  const graph: Graph = new Graph({
    ...context,
    data: treeToGraphData(data),
    x: 100,
    y: 100,
    node: {
      type: 'indented',
      style: {
        size: (d) => [measureText({ text: d.id, fontSize: 12 }) + 6, 20],
        labelBackground: true,
        labelBackgroundRadius: 0,
        labelBackgroundFill: (d) => (d.id === rootId ? '#576286' : '#fff'),
        labelFill: (d) => (d.id === rootId ? '#fff' : '#666'),
        labelText: (d) => d.style?.labelText || d.id,
        labelTextAlign: (d) => (d.id === rootId ? 'center' : 'left'),
        labelTextBaseline: 'top',
        color: (datum: NodeData) => {
          const depth = graph.getAncestorsData(datum.id, 'tree').length - 1;
          return COLORS[depth % COLORS.length] || '#576286';
        },
      },
      state: {
        selected: {
          lineWidth: 0,
          labelFill: '#40A8FF',
          labelBackground: true,
          labelFontWeight: 'normal',
          labelBackgroundFill: '#e8f7ff',
          labelBackgroundRadius: 10,
        },
      },
    },
    edge: {
      type: 'indented',
      style: {
        radius: 16,
        lineWidth: 2,
        sourcePort: 'out',
        targetPort: 'in',
        stroke: (datum) => {
          const depth = graph.getAncestorsData(datum.source, 'tree').length;
          return COLORS[depth % COLORS.length];
        },
      },
    },
    layout: {
      type: 'indented',
      direction: 'LR',
      isHorizontal: true,
      indent: 40,
      getHeight: () => 20,
      getVGap: () => 10,
    },
    behaviors: [
      'scroll-canvas',
      'drag-branch',
      'collapse-expand-tree',
      {
        type: 'click-select',
        enable: (event: IPointerEvent<Node>) => event.targetType === 'node' && event.target.id !== rootId,
      },
    ],
  });

  await graph.render();

  return graph;
};
