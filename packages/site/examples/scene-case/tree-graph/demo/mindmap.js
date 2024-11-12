import { Rect, Text } from '@antv/g';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  BaseTransform,
  CommonEvent,
  CubicHorizontal,
  ExtensionCategory,
  Graph,
  GraphEvent,
  iconfont,
  idOf,
  NodeEvent,
  positionOf,
  register,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const RootNodeStyle = {
  fill: '#EFF0F0',
  labelFill: '#262626',
  labelFontSize: 24,
  labelFontWeight: 600,
  labelOffsetY: 8,
  labelPlacement: 'center',
  ports: [{ placement: 'right' }, { placement: 'left' }],
  radius: 8,
};

const NodeStyle = {
  fill: 'transparent',
  labelPlacement: 'center',
  labelFontSize: 16,
  ports: [{ placement: 'right-bottom' }, { placement: 'left-bottom' }],
};

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
  ADD_CHILD: 'add-child',
};

let textShape;
const measureText = (text) => {
  if (!textShape) textShape = new Text({ style: text });
  textShape.attr(text);
  return textShape.getBBox().width;
};

const getNodeWidth = (nodeId, isRoot) => {
  const padding = isRoot ? 40 : 30;
  const nodeStyle = isRoot ? RootNodeStyle : NodeStyle;
  return measureText({ text: nodeId, fontSize: nodeStyle.labelFontSize, fontFamily: 'Gill Sans' }) + padding;
};

const getNodeSize = (nodeId, isRoot) => {
  const width = getNodeWidth(nodeId, isRoot);
  const height = isRoot ? 48 : 32;
  return [width, height];
};

class MindmapNode extends BaseNode {
  static defaultStyleProps = {
    showIcon: false,
  };

  constructor(options) {
    Object.assign(options.style, MindmapNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.context.model.getChildrenData(this.id);
  }

  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  isShowCollapse(attributes) {
    const { collapsed, showIcon } = attributes;
    return !collapsed && showIcon && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes) {
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
      transform: direction === 'left' ? [['rotate', 90]] : [['rotate', -90]],
      visibility: showIcon ? 'visible' : 'hidden',
      x: direction === 'left' ? -6 : width + 6,
      y: height,
    };
  }

  drawCollapseShape(attributes, container) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  getCountStyle(attributes) {
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

  drawCountShape(attributes, container) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: false,
      });
    });
  }

  getAddStyle(attributes) {
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

  getAddBarStyle(attributes) {
    const { collapsed, showIcon, direction, color = '#1783FF' } = attributes;
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

  drawAddShape(attributes, container) {
    const addStyle = this.getAddStyle(attributes);
    const addBarStyle = this.getAddBarStyle(attributes);
    this.upsert('add-bar', Rect, addBarStyle, container);
    const btn = this.upsert('add', Badge, addStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      this.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id, direction: attributes.direction });
    });
  }

  forwardEvent(target, type, listener) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getKeyStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const keyShape = super.getKeyStyle(attributes);
    return { width, height, ...keyShape };
  }

  drawKeyShape(attributes, container) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', Rect, keyStyle, container);
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawCollapseShape(attributes, container);
    this.drawAddShape(attributes, container);

    this.drawCountShape(attributes, container);
  }
}

class MindmapEdge extends CubicHorizontal {
  get rootId() {
    return idOf(this.context.model.getRootsData()[0]);
  }

  getKeyPath(attributes) {
    const path = super.getKeyPath(attributes);
    const isRoot = this.targetNode.id === this.rootId;
    const labelWidth = getNodeWidth(this.targetNode.id, isRoot);

    const [, tp] = this.getEndpoints(attributes);
    const sign = this.sourceNode.getCenter()[0] < this.targetNode.getCenter()[0] ? 1 : -1;
    return [...path, ['L', tp[0] + labelWidth * sign, tp[1]]];
  }
}

class CollapseExpandTree extends BaseBehavior {
  constructor(context, options) {
    super(context, options);
    this.bindEvents();
  }

  update(options) {
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

  showIcon = (event) => {
    this.setIcon(event, true);
  };

  hideIcon = (event) => {
    this.setIcon(event, false);
  };

  setIcon = (event, show) => {
    if (this.status !== 'idle') return;
    const { target } = event;
    const id = target.id;
    const { graph, element } = this.context;
    graph.updateNodeData([{ id, style: { showIcon: show } }]);
    element.draw({ animation: false, silence: true });
  };

  onCollapseExpand = async (event) => {
    this.status = 'busy';
    const { id, collapsed } = event;
    const { graph } = this.context;
    await graph.frontElement(id);
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };

  addChild = async (event) => {
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

class AssignColorByBranch extends BaseTransform {
  static defaultOptions = {
    colors: [
      '#1783FF',
      '#F08F56',
      '#D580FF',
      '#00C9C9',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
  };

  constructor(context, options) {
    super(context, Object.assign({}, AssignColorByBranch.defaultOptions, options));
  }

  beforeDraw(input) {
    const nodes = this.context.model.getNodeData();

    if (nodes.length === 0) return input;

    let colorIndex = 0;
    const dfs = (nodeId, color) => {
      const node = nodes.find((datum) => datum.id == nodeId);
      if (!node) return;

      node.style ||= {};
      node.style.color = color || this.options.colors[colorIndex++ % this.options.colors.length];
      node.children?.forEach((childId) => dfs(childId, node.style?.color));
    };

    nodes.filter((node) => node.depth === 1).forEach((rootNode) => dfs(rootNode.id));

    return input;
  }
}

register(ExtensionCategory.NODE, 'mindmap', MindmapNode);
register(ExtensionCategory.EDGE, 'mindmap', MindmapEdge);
register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
register(ExtensionCategory.TRANSFORM, 'assign-color-by-branch', AssignColorByBranch);

const getNodeSide = (nodeData, parentData) => {
  if (!parentData) return 'center';

  const nodePositionX = positionOf(nodeData)[0];
  const parentPositionX = positionOf(parentData)[0];
  return parentPositionX > nodePositionX ? 'left' : 'right';
};

fetch('https://assets.antv.antgroup.com/g6/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const rootId = data.id;

    const graph = new Graph({
      data: treeToGraphData(data),
      node: {
        type: 'mindmap',
        style: function (d) {
          const direction = getNodeSide(d, this.getParentData(idOf(d), 'tree'));
          const isRoot = idOf(d) === rootId;

          return {
            direction,
            labelText: idOf(d),
            size: getNodeSize(idOf(d), isRoot),
            labelFontFamily: 'Gill Sans',
            // 通过设置节点标签背景来扩大交互区域 | Expand the interaction area by setting the node label background
            labelBackground: true,
            labelBackgroundFill: 'transparent',
            labelPadding: direction === 'left' ? [2, 0, 10, 40] : [2, 40, 10, 0],
            ...(isRoot ? RootNodeStyle : NodeStyle),
          };
        },
      },
      edge: {
        type: 'mindmap',
        style: {
          lineWidth: 3,
          stroke: function (data) {
            return this.getNodeData(data.target).style.color || '#99ADD1';
          },
        },
      },
      layout: {
        type: 'mindmap',
        direction: 'H',
        getHeight: () => 30,
        getWidth: (node) => getNodeWidth(node.id, node.id === rootId),
        getVGap: () => 6,
        getHGap: () => 60,
        animation: false,
      },
      behaviors: ['drag-canvas', 'zoom-canvas', 'collapse-expand-tree'],
      transforms: ['assign-color-by-branch'],
      animation: false,
    });

    graph.once(GraphEvent.AFTER_RENDER, () => {
      graph.fitView();
    });

    graph.render();
  });
