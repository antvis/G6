import data from '@@/dataset/algorithm-category.json';
import type { DisplayObject, DisplayObjectConfig, Group, RectStyleProps, TextStyleProps } from '@antv/g';
import { Rect, Text } from '@antv/g';
import type {
  BadgeStyleProps,
  BaseBehaviorOptions,
  BaseNodeStyleProps,
  CubicStyleProps,
  IPointerEvent,
  NodeData,
  PathArray,
  RuntimeContext,
} from '@antv/g6';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  CommonEvent,
  CubicHorizontal,
  ExtensionCategory,
  Graph,
  GraphEvent,
  ID,
  Node,
  NodeEvent,
  register,
  treeToGraphData,
} from '@antv/g6';

export const caseMindmap: TestCase = async (context) => {
  const COLORS = [
    '#1783FF',
    '#00C9C9',
    '#F08F56',
    '#D580FF',
    '#7863FF',
    '#DB9D0D',
    '#60C42D',
    '#FF80CA',
    '#2491B3',
    '#17C76F',
  ];

  const RootNodeStyle = {
    fill: '#EFF0F0',
    labelFill: '#262626',
    labelFontSize: 16,
    labelFontWeight: 600,
    labelPlacement: 'center',
    ports: [{ placement: 'right' }, { placement: 'left' }],
    radius: 4,
  };

  const NodeStyle = {
    fill: 'transparent',
    labelPlacement: 'center',
    labelFontSize: 12,
    ports: [
      { placement: 'right-bottom', key: 'right-bottom' },
      { placement: 'left-bottom', key: 'left-bottom' },
    ],
  };

  const TreeEvent = {
    COLLAPSE_EXPAND: 'collapse-expand',
    ADD_CHILD: 'add-child',
  };

  const ancestorsOf = (graph: Graph, nodeId: ID) => {
    const ancestors: ID[] = [];
    const data = graph.getNodeData();

    const findAncestors = (data: NodeData[], nodeId: ID) => {
      for (const child of data) {
        if (
          child.id === nodeId ||
          (child.children &&
            findAncestors(
              child.children.map((child) => graph.getNodeData(child)),
              nodeId,
            ))
        ) {
          ancestors.push(String(child.id));
          return true;
        }
      }

      return false;
    };

    findAncestors(data, nodeId);
    return ancestors.reverse();
  };

  const rootChildOf = (graph: Graph, nodeId: ID) => {
    return ancestorsOf(graph, nodeId)[1];
  };

  const findRootNode = (graph: Graph) => {
    const data = graph.getNodeData();
    for (const node of data) {
      const ancestors = ancestorsOf(graph, node.id);
      if (ancestors.length === 1) return node;
    }
    return undefined;
  };

  const getColor = (graph: Graph, nodeId: ID) => {
    const rootNode = findRootNode(graph);
    if (!rootNode) return null;

    const oneLevelNodeIds = rootNode.children || [];
    const ancestorNode = rootChildOf(graph, nodeId) || nodeId;

    const order = oneLevelNodeIds.findIndex((id) => ancestorNode === id);
    return COLORS[order % COLORS.length];
  };

  const getDirection = (graph: Graph, nodeId: ID) => {
    const rootNode = findRootNode(graph);
    if (!rootNode) return null;

    const rootId = rootNode.id;
    if (nodeId === rootId) return 'right';

    const ancestorNode = rootChildOf(graph, nodeId) || nodeId;
    return ancestorNode.charCodeAt(ancestorNode.length - 1) % 2 === 0 ? 'right' : 'left';
  };

  let textShape: Text | null;
  const measureText = (text: TextStyleProps) => {
    if (!textShape) textShape = new Text({ style: text });
    textShape.attr(text);
    return textShape.getBBox().width;
  };

  const getNodeWidth = (nodeId: ID, isRoot: boolean) => {
    return isRoot
      ? measureText({ text: nodeId, fontSize: RootNodeStyle.labelFontSize }) + 20
      : measureText({ text: nodeId, fontSize: NodeStyle.labelFontSize });
  };

  interface MindmapNodeStyleProps extends BaseNodeStyleProps {
    color: string;
    showIcon: boolean;
    direction: 'left' | 'right';
  }

  class MindmapNode extends BaseNode<MindmapNodeStyleProps> {
    static defaultStyleProps: Partial<MindmapNodeStyleProps> = {
      showIcon: false,
    };

    constructor(options: DisplayObjectConfig<MindmapNodeStyleProps>) {
      Object.assign(options.style!, MindmapNode.defaultStyleProps);
      super(options);
    }

    get childrenData() {
      return this.context.model.getChildrenData(this.id);
    }

    get rootId() {
      return findRootNode(this.context.graph)!.id;
    }

    private isShowCollapse(attributes: Required<MindmapNodeStyleProps>) {
      return !attributes.collapsed && this.childrenData.length > 0;
    }

    protected getCollapseStyle(attributes: Required<MindmapNodeStyleProps>): BadgeStyleProps | false {
      const { showIcon, color, direction } = attributes;
      if (!this.isShowCollapse(attributes)) return false;
      const [width, height] = this.getSize(attributes);
      return {
        backgroundFill: color,
        backgroundHeight: 12,
        backgroundWidth: 12,
        cursor: 'pointer',
        fill: '#fff',
        fontFamily: 'iconfont',
        fontSize: 8,
        text: '\ue6e4',
        textAlign: 'center',
        transform: direction === 'left' ? 'rotate(90deg)' : 'rotate(-90deg)',
        visibility: showIcon ? 'visible' : 'hidden',
        x: direction === 'left' ? -6 : width + 6,
        y: height,
      };
    }

    protected drawCollapseShape(attributes: Required<MindmapNodeStyleProps>, container: Group) {
      const iconStyle = this.getCollapseStyle(attributes);
      const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent<Node>) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
          id: this.id,
          collapsed: !attributes.collapsed,
        });
      });
    }

    protected getCountStyle(attributes: Required<MindmapNodeStyleProps>): BadgeStyleProps | false {
      const { collapsed, color, direction } = attributes;
      const count = this.context.model.getDescendantsData(this.id).length;
      if (!collapsed || count === 0) return false;
      const [width, height] = this.getSize(attributes);
      return {
        backgroundFill: color,
        backgroundHeight: 12,
        backgroundWidth: 12,
        cursor: 'pointer',
        fill: '#fff',
        fontSize: 8,
        text: count.toString(),
        textAlign: 'center',
        x: direction === 'left' ? -6 : width + 6,
        y: height,
      };
    }

    protected drawCountShape(attributes: Required<MindmapNodeStyleProps>, container: Group) {
      const countStyle = this.getCountStyle(attributes);
      const btn = this.upsert('count', Badge, countStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent<Node>) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
          id: this.id,
          collapsed: false,
        });
      });
    }

    protected getAddStyle(attributes: Required<MindmapNodeStyleProps>): BadgeStyleProps | false {
      const { collapsed, showIcon, direction } = attributes;
      if (collapsed || !showIcon) return false;
      const [width, height] = this.getSize(attributes);
      const color = '#ddd';

      const offsetX = this.isShowCollapse(attributes) ? 24 : 12;
      const isRoot = this.id === this.rootId;

      return {
        backgroundFill: '#fff',
        backgroundHeight: 12,
        backgroundLineWidth: 1,
        backgroundStroke: color,
        backgroundWidth: 12,
        cursor: 'pointer',
        fill: color,
        fontFamily: 'iconfont',
        fontSize: 8,
        text: '\ue664',
        textAlign: 'center',
        x: isRoot ? width + 12 : direction === 'left' ? -offsetX : width + offsetX,
        y: isRoot ? height / 2 : height,
      };
    }

    protected getAddBarStyle(attributes: Required<MindmapNodeStyleProps>): RectStyleProps | false {
      const { collapsed, showIcon, direction, color = COLORS[0] } = attributes;
      if (collapsed || !showIcon) return false;
      const [width, height] = this.getSize(attributes);

      const offsetX = this.isShowCollapse(attributes) ? 12 : 0;
      const isRoot = this.id === this.rootId;

      const HEIGHT = 2;
      const WIDTH = 6;

      return {
        cursor: 'pointer',
        fill:
          direction === 'left'
            ? `linear-gradient(180deg, #fff 20%, ${color})`
            : `linear-gradient(0deg, #fff 20%, ${color})`,
        height: HEIGHT,
        width: WIDTH,
        x: isRoot ? width : direction === 'left' ? -offsetX - WIDTH : width + offsetX,
        y: isRoot ? height / 2 - HEIGHT / 2 : height - HEIGHT / 2,
        zIndex: -1,
      };
    }

    protected drawAddShape(attributes: Required<MindmapNodeStyleProps>, container: Group) {
      const addStyle = this.getAddStyle(attributes);
      const addBarStyle = this.getAddBarStyle(attributes);
      this.upsert('add-bar', Rect, addBarStyle, container);
      const btn = this.upsert('add', Badge, addStyle, container);

      this.forwardEvent(btn, CommonEvent.CLICK, (event: IPointerEvent<Node>) => {
        event.stopPropagation();
        this.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id, direction: attributes.direction });
      });
    }

    private forwardEvent(target: DisplayObject | undefined, type: string, listener: (event: any) => void) {
      if (target && !Reflect.has(target, '__bind__')) {
        Reflect.set(target, '__bind__', true);
        target.addEventListener(type, listener);
      }
    }

    protected getKeyStyle(attributes: Required<MindmapNodeStyleProps>): RectStyleProps {
      const [width, height] = this.getSize(attributes);
      const keyShape = super.getKeyStyle(attributes);
      return { width, height, ...keyShape };
    }

    protected drawKeyShape(attributes: Required<MindmapNodeStyleProps>, container: Group) {
      const keyStyle = this.getKeyStyle(attributes);
      return this.upsert('key', Rect, keyStyle, container);
    }

    public render(attributes: Required<MindmapNodeStyleProps> = this.parsedAttributes, container: Group = this) {
      super.render(attributes, container);

      this.drawCollapseShape(attributes, container);
      this.drawAddShape(attributes, container);

      this.drawCountShape(attributes, container);
    }
  }

  class MindmapEdge extends CubicHorizontal {
    get rootId() {
      return findRootNode(this.context.graph)!.id;
    }

    protected getKeyPath(attributes: Required<CubicStyleProps>): PathArray {
      const path = super.getKeyPath(attributes);
      const isRoot = this.targetNode.id === this.rootId;
      const labelWidth = getNodeWidth(this.targetNode.id, isRoot);

      const [, tp] = this.getEndpoints(attributes);
      const sign = this.sourceNode.getCenter()[0] < this.targetNode.getCenter()[0] ? 1 : -1;
      return [...path, ['L', tp[0] + labelWidth * sign, tp[1]]] as PathArray;
    }
  }

  interface CollapseExpandTreeOptions extends BaseBehaviorOptions {
    onCreateChild?: (parent: ID) => NodeData;
  }

  class CollapseExpandTree extends BaseBehavior<CollapseExpandTreeOptions> {
    constructor(context: RuntimeContext, options: Partial<CollapseExpandTreeOptions>) {
      super(context, options);
      this.bindEvents();
    }

    update(options: Partial<CollapseExpandTreeOptions>) {
      this.unbindEvents();
      super.update(options);
      this.bindEvents();
    }

    bindEvents() {
      const { graph } = this.context;

      graph.on(NodeEvent.POINTER_ENTER, this.showIcon);
      graph.on(NodeEvent.POINTER_LEAVE, this.hideIcon);
      graph.on(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
      graph.on(TreeEvent.ADD_CHILD, this.addChild);
    }

    unbindEvents() {
      const { graph } = this.context;

      graph.off(NodeEvent.POINTER_ENTER, this.showIcon);
      graph.off(NodeEvent.POINTER_LEAVE, this.hideIcon);
      graph.off(TreeEvent.COLLAPSE_EXPAND, this.onCollapseExpand);
      graph.off(TreeEvent.ADD_CHILD, this.addChild);
    }

    status = 'idle';

    showIcon = (event: IPointerEvent<Node>) => {
      this.setIcon(event, true);
    };

    hideIcon = (event: IPointerEvent<Node>) => {
      this.setIcon(event, false);
    };

    setIcon = (event: IPointerEvent<Node>, show: boolean) => {
      if (this.status !== 'idle') return;
      const { target } = event;
      const id = target.id;
      const { graph, element } = this.context;
      graph.updateNodeData([{ id, style: { showIcon: show } }]);
      element!.draw({ animation: false, silence: true });
    };

    onCollapseExpand = async (event: any) => {
      this.status = 'busy';
      const { id, collapsed } = event;
      const { graph } = this.context;
      await graph.frontElement(id);
      if (collapsed) await graph.collapseElement(id);
      else await graph.expandElement(id);
      this.status = 'idle';
    };

    addChild = async (event: any) => {
      this.status = 'busy';
      const {
        onCreateChild = () => {
          const currentTime = new Date(Date.now()).toLocaleString();
          return { id: `New Node in ${currentTime}` };
        },
      } = this.options;
      const { graph } = this.context;
      const datum = onCreateChild(event.id);
      const parent = graph.getNodeData(event.id);

      graph.addNodeData([datum]);
      graph.addEdgeData([{ source: event.id, target: datum.id }]);
      graph.updateNodeData([
        {
          id: event.id,
          children: [...(parent.children || []), datum.id],
          style: { collapsed: false, showIcon: false },
        },
      ]);
      await graph.render();
      await graph.focusElement(datum.id);
      this.status = 'idle';
    };
  }

  register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
  register(ExtensionCategory.EDGE, 'mindmap', MindmapEdge);
  register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);

  const rootId = data.id;

  const graph = new Graph({
    ...context,
    data: treeToGraphData(data),
    node: {
      type: 'mindmap',
      style: function (this, d) {
        const direction = getDirection(this, d.id);
        const labelPadding = direction === 'right' ? [2, 40, 10, 0] : [2, 0, 10, 40];
        const isRoot = d.id === rootId;
        return {
          color: getColor(this, d.id),
          direction,
          labelText: d.id,
          size: [getNodeWidth(d.id, isRoot), 30],
          // 通过设置节点标签背景来扩大节点的交互区域
          // Enlarge the interactive area of the node by setting label background
          labelBackground: true,
          labelBackgroundFill: 'transparent',
          labelPadding,
          ...(isRoot ? RootNodeStyle : NodeStyle),
        };
      },
    },
    edge: {
      type: 'mindmap',
      style: {
        sourcePort: function (d) {
          if (d.source === rootId) return undefined;
          const direction = getDirection(this, d.target);
          return direction === 'right' ? 'right-bottom' : 'left-bottom';
        },
        targetPort: function (d) {
          const direction = getDirection(this, d.target);
          return direction === 'right' ? 'left-bottom' : 'right-bottom';
        },
        lineWidth: 2,
        stroke: function (d) {
          return getColor(this, d.target);
        },
      },
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: () => 16,
      getWidth: (node: NodeData) => getNodeWidth(node.id, node.id === rootId),
      getVGap: () => 10,
      getHGap: () => 60,
      getSide: (node: NodeData) => getDirection(graph, node.id),
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree'],
  });

  graph.once(GraphEvent.AFTER_RENDER, () => {
    graph.fitView();
  });

  await graph.render();

  return graph;
};
