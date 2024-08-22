import { Text as GText, Rect } from '@antv/g';
import {
  Badge,
  BaseBehavior,
  BaseNode,
  CommonEvent,
  ExtensionCategory,
  Graph,
  NodeEvent,
  Polyline,
  iconfont,
  idOf,
  register,
  subStyleProps,
  treeToGraphData,
} from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

const rootId = 'Modeling Methods';

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

const TreeEvent = {
  COLLAPSE_EXPAND: 'collapse-expand',
  ADD_CHILD: 'add-child',
};

let textShape;
const measureText = (text) => {
  if (!textShape) textShape = new GText({ style: text });
  textShape.attr(text);
  return textShape.getBBox().width;
};

class IndentedNode extends BaseNode {
  static defaultStyleProps = {
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

  constructor(options) {
    Object.assign(options.style, IndentedNode.defaultStyleProps);
    super(options);
  }

  get childrenData() {
    return this.attributes.context.model.getChildrenData(this.id);
  }

  getKeyStyle(attributes) {
    const [width, height] = this.getSize(attributes);
    const keyStyle = super.getKeyStyle(attributes);
    return {
      width,
      height,
      ...keyStyle,
      fill: 'transparent',
    };
  }

  drawKeyShape(attributes, container) {
    const keyStyle = this.getKeyStyle(attributes);
    return this.upsert('key', Rect, keyStyle, container);
  }

  getLabelStyle(attributes) {
    if (attributes.label === false || !attributes.labelText) return false;
    return subStyleProps(this.getGraphicStyle(attributes), 'label');
  }

  drawIconArea(attributes, container) {
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

  forwardEvent(target, type, listener) {
    if (target && !Reflect.has(target, '__bind__')) {
      Reflect.set(target, '__bind__', true);
      target.addEventListener(type, listener);
    }
  }

  getCountStyle(attributes) {
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

  drawCountShape(attributes, container) {
    const countStyle = this.getCountStyle(attributes);
    const btn = this.upsert('count', Badge, countStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: false,
      });
    });
  }

  isShowCollapse(attributes) {
    return !attributes.collapsed && this.childrenData.length > 0;
  }

  getCollapseStyle(attributes) {
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

  drawCollapseShape(attributes, container) {
    const iconStyle = this.getCollapseStyle(attributes);
    const btn = this.upsert('collapse-expand', Badge, iconStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.COLLAPSE_EXPAND, {
        id: this.id,
        collapsed: !attributes.collapsed,
      });
    });
  }

  getAddStyle(attributes) {
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

  drawAddShape(attributes, container) {
    const addStyle = this.getAddStyle(attributes);
    const btn = this.upsert('add', Badge, addStyle, container);

    this.forwardEvent(btn, CommonEvent.CLICK, (event) => {
      event.stopPropagation();
      attributes.context.graph.emit(TreeEvent.ADD_CHILD, { id: this.id });
    });
  }

  render(attributes = this.parsedAttributes, container = this) {
    super.render(attributes, container);

    this.drawCountShape(attributes, container);

    this.drawIconArea(attributes, container);
    this.drawCollapseShape(attributes, container);
    this.drawAddShape(attributes, container);
  }
}

class IndentedEdge extends Polyline {
  getControlPoints(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);
    const [sx] = sourcePoint;
    const [, ty] = targetPoint;
    return [[sx, ty]];
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
    if (collapsed) await graph.collapseElement(id);
    else await graph.expandElement(id);
    this.status = 'idle';
  };

  addChild(event) {
    const { onCreateChild = () => ({ id: `${Date.now()}`, style: { labelText: 'new node' } }) } = this.options;
    const { graph } = this.context;
    const datum = onCreateChild(event.id);
    graph.addNodeData([datum]);
    graph.addEdgeData([{ source: event.id, target: datum.id }]);
    const parent = graph.getNodeData(event.id);
    graph.updateNodeData([
      { id: event.id, children: [...(parent.children || []), datum.id], style: { collapsed: false } },
    ]);
    graph.render();
  }
}

/**
 * <zh/> 支持拖拽节点到其他节点下作为子节点
 *
 * <en/> Support dragging nodes to other nodes as child nodes
 */
class DragBranch extends BaseBehavior {
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

    graph.on(NodeEvent.DRAG_START, this.onDragStart);
    graph.on(NodeEvent.DRAG, this.onDrag);
    graph.on(NodeEvent.DRAG_END, this.onDragEnd);
    graph.on(NodeEvent.DRAG_ENTER, this.onDragEnter);
    graph.on(NodeEvent.DRAG_LEAVE, this.onDragLeave);
  }

  unbindEvents() {
    const { graph } = this.context;

    graph.off(NodeEvent.DRAG_START, this.onDragStart);
    graph.off(NodeEvent.DRAG, this.onDrag);
    graph.off(NodeEvent.DRAG_END, this.onDragEnd);
    graph.off(NodeEvent.DRAG_ENTER, this.onDragEnter);
    graph.off(NodeEvent.DRAG_LEAVE, this.onDragLeave);
  }

  enable = true;

  validate(event) {
    if (this.destroyed) return false;
    const { enable = (evt) => evt.target.id !== rootId } = this.options;
    if (typeof enable === 'function') return enable(event);
    return !!enable;
  }

  createShadow(target) {
    const shadowStyle = subStyleProps(this.options, 'shadow');
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

  moveShadow(offset) {
    if (!this.shadow) return;
    const [dx, dy] = offset;
    this.shadow.translate(dx, dy);
  }

  destroyShadow() {
    this.shadow?.remove();
    this.shadow = undefined;
  }

  onDragStart = (event) => {
    this.enable = this.validate(event);
    if (!this.enable) return;

    const { target } = event;
    this.child = target;
    this.createShadow(target);
  };

  getDelta(event) {
    const zoom = this.context.graph.getZoom();
    return [event.dx / zoom, event.dy / zoom];
  }

  onDrag = (event) => {
    if (!this.enable) return;

    const delta = this.getDelta(event);
    this.moveShadow(delta);
  };

  onDragEnd = () => {
    this.destroyShadow();
    if (this.child === undefined || this.parent === undefined) return;

    const { graph } = this.context;
    const childId = this.child.id;
    const parentId = this.parent.id;

    const originalParent = graph.getParentData(childId, 'tree');

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

  onDragEnter = (event) => {
    const { graph, element } = this.context;
    const targetId = event.target.id;
    if (targetId === this.child?.id || targetId === rootId) {
      if (targetId === rootId) this.parent = event.target;
      return;
    }

    this.parent = event.target;
    graph.updateNodeData([{ id: targetId, states: ['selected'] }]);
    element.draw({ animation: false, silence: true });
  };

  onDragLeave = (event) => {
    const { graph, element } = this.context;
    const targetId = event.target.id;

    this.parent = undefined;
    graph.updateNodeData([{ id: targetId, states: [] }]);
    element.draw({ animation: false, silence: true });
  };
}

register(ExtensionCategory.NODE, 'indented', IndentedNode);
register(ExtensionCategory.EDGE, 'indented', IndentedEdge);
register(ExtensionCategory.BEHAVIOR, 'collapse-expand-tree', CollapseExpandTree);
register(ExtensionCategory.BEHAVIOR, 'drag-branch', DragBranch);

fetch('https://assets.antv.antgroup.com/g6/algorithm-category.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      x: 60,
      data: treeToGraphData(data),
      node: {
        type: 'indented',
        style: {
          size: (d) => [measureText({ text: d.id, fontSize: 12 }) + 6, 20],
          labelBackground: (datum) => datum.id === rootId,
          labelBackgroundRadius: 0,
          labelBackgroundFill: '#576286',
          labelFill: (datum) => (datum.id === rootId ? '#fff' : '#666'),
          labelText: (d) => d.style?.labelText || d.id,
          labelTextAlign: (datum) => (datum.id === rootId ? 'center' : 'left'),
          labelTextBaseline: 'top',
          color: (datum) => {
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
        { type: 'click-select', enable: (event) => event.targetType === 'node' && event.target.id !== rootId },
      ],
    });

    graph.render();
  });
