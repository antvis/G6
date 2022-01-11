import { modifyCSS, createDom } from '@antv/dom-util';
import { IAbstractGraph as IGraph, GraphData, ShapeStyle } from '@antv/g6-core';
import Base from '../base';
import { isArray, isNumber, uniqueId } from '@antv/util';
import { Util } from '@antv/g6-core';
import { Canvas } from '@antv/g-canvas';

const ALLOW_EVENTS = ['click', 'mouseenter'];

interface LegendConfig {
  data: GraphData;
  position?: 'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom' | 'bottom' | 'bottom-left' | 'bottom-right';
  padding?: number | number[];
  margin?: number | number[];
  offsetX?: number;
  offsetY?: number;
  containerStyle?: ShapeStyle;
  flipPage?: boolean; // TODO
  horiSep?: number;
  vertiSep?: number;
  layout?: 'vertical' | 'horizontal';
  width?: number | 'fit-content'; // TODO
  height?: number | 'fit-content'; // TODO
  align?: 'center' | 'right' | 'left';
  title?: string;
  titleConfig?: {
    position?: 'center' | 'right' | 'left';
    offsetX?: number,
    offsetY?: number,
    [key: string]: unknown
  },
  filter?: {
    enable?: boolean,
    multiple?: boolean;
    trigger?: 'click' | 'mouseenter',
    legendStateStyles?: {
      active?: ShapeStyle,
      inactive?: ShapeStyle
    },
    graphActiveState?: string,
    graphInactiveState?: string,
    filterFunctions?: {
      [key: string]: (d) => boolean;
    }
  };
}

export default class Legend extends Base {
  constructor(config?: LegendConfig) {
    super(config);
  }
  public getDefaultCfgs(): LegendConfig {
    return {
      data: {},
      position: 'top',
      padding: 8,
      margin: 8,
      offsetX: 0,
      offsetY: 0,
      layout: 'horizontal',
      flipPage: false,
      containerStyle: {},
      align: undefined,
      horiSep: 8,
      vertiSep: 8,
      filter: {
        enable: false,
        trigger: 'click'
      }
    };
  }

  public init() {
    this.formatArray('padding');
    this.formatArray('margin');
    const filter = this.get('filter') || {};
    const multiple = filter.multiple;
    if (multiple && filter.trigger === 'mouseenter') this.set('multiple', false);
    let align = this.get('align');
    if (!align) {
      const positions = this.get('position').split('-');
      if (positions.includes('left')) align = 'left';
      if (positions.includes('right')) align = 'right';
      else align = 'center';
      this.set('align', align);
    }
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const container: HTMLDivElement = createDom(
      `<div class='g6-legend-container' style="position: absolute;"></div>`,
    );

    graphContainer.appendChild(container);
    this.set('container', container);

    const size = this.render();

    modifyCSS(container, this.getContainerPos(size));

    this.bindEvents();
  }

  protected getContainerPos(size: number[] = [0, 0]) {
    const self = this;
    const graph: IGraph = self.get('graph');
    const offsetX = this.get('offsetX');
    const offsetY = this.get('offsetY');
    const margin = this.get('margin');
    const positions = this.get('position').split('-');
    const posIdxMap = { 'top': 0, 'right': 1, 'bottom': 2, 'left': 3 };

    const x = 0, y = 0;
    const containerCSS: any = {
      left: (graph.getWidth() - size[0]) / 2 + x,
      top: (graph.getHeight() - size[1]) / 2 + y,
    };
    positions.forEach(pos => {
      let marginValue = margin[posIdxMap[pos]];
      let key = pos;
      switch (pos) {
        case 'top':
          marginValue += y;
          break;
        case 'left':
          marginValue += x;
          break;
        case 'bottom':
          marginValue = graph.getHeight() - size[1] - marginValue + y;
          key = 'top';
          break;
        default:
          marginValue = graph.getWidth() - size[0] - marginValue + x;
          key = 'left';
          break;
      }
      containerCSS[key] = marginValue;
    });
    containerCSS.top += (offsetY + graph.getContainer().offsetTop);
    containerCSS.left += (offsetX + graph.getContainer().offsetLeft);

    Object.keys(containerCSS).forEach(key => {
      containerCSS[key] = `${containerCSS[key]}px`;
    })

    return containerCSS;
  }

  // class-methods-use-this
  public bindEvents() {
    const self = this;
    const filter = self.get('filter');
    if (!filter || !filter.enable) return;
    let trigger = filter.trigger || 'click';
    if (!ALLOW_EVENTS.includes(trigger)) {
      console.warn('Trigger for legend filterling must be \'click\' or \'mouseenter\', \'click\' will take effect by default.');
      trigger = 'click';
    }
    const lc = self.get('legendCanvas');
    if (trigger === 'mouseenter') {
      lc.on('node-container:mouseenter', (e) => self.filterData(e));
      lc.on('node-container:mouseleave', (e) => {
        self.clearFilter();
        self.clearActiveLegend();
      });
    }
    else {
      lc.on('node-container:click', (e) => self.filterData(e));
      lc.on('click', (e) => {
        if (e.target && e.target.isCanvas && e.target.isCanvas()) {
          self.clearFilter();
          self.clearActiveLegend();
        }
      });
    }
  }

  /**
   * 更新 legend 数据，开放给用户控制
   * @param param
   */
  public changeData(data: GraphData) {
    this.set('data', data);
    const size = this.render();
    modifyCSS(this.get('container'), this.getContainerPos(size));
  }

  public activateLegend(shape) {
    const filter = this.get('filter');
    const multiple = filter?.multiple;
    if (!multiple) this.clearActiveLegend();
    const shapeGroup = shape.get('parent');
    // 若被高亮元素已经处于 active 状态，则取消它的 active 状态
    // 并根据目前是否有其他 active 状态的元素决定是否要设置为 inactive 状态
    if (shapeGroup.get('active')) {
      shapeGroup.set('active', false);
      if (this.findLegendItemsByState('active').length) shapeGroup.set('inactive', true);
    } else {
      shapeGroup.set('inactive', false);
      shapeGroup.set('active', true);
    }
    // 当目前有元素为 active 状态时，将非 active 的元素设置为 inactive
    if (this.findLegendItemsByState('active').length) {
      this.findLegendItemsByState('active', 'all', false).forEach(subGroup => {
        subGroup.set('inactive', true);
      });
    } else {
      this.clearActiveLegend();
    }

    // 设置样式
    const stateStyles = filter?.lengedStateStyles || {};

    const legendInactive = stateStyles?.inactive || {
      opacity: 0.5,
      'text-shape': {
        opacity: 0.5,
      }
    };
    const legendTextInactive = legendInactive['text-shape'] || {}
    this.findLegendItemsByState('inactive').forEach(subGroup => {
      const [keyShape, text] = subGroup.get('children');
      keyShape.attr({ ...keyShape.get('oriAttrs'), ...legendInactive });
      text.attr({ ...text.get('oriAttrs'), ...legendTextInactive });
    });

    const legendActive = stateStyles?.active || {
      stroke: '#000',
      lineWidth: 2,
      'text-shape': {
        fontWeight: 'bold',
      }
    };
    const legendTextActive = legendActive['text-shape'] || {}
    this.findLegendItemsByState('active').forEach(subGroup => {
      const [keyShape, text] = subGroup.get('children');
      keyShape.attr({ ...keyShape.get('oriAttrs'), ...legendActive });
      text.attr({ ...text.get('oriAttrs'), ...legendTextActive });
    })
  }

  private findLegendItemsByState(stateName: string, type: 'node' | 'edge' | 'all' = 'all', value: boolean = true) {
    const group = this.get('legendCanvas').find(e => e.get('name') === 'root');
    const nodeGroup = group.find(e => e.get('name') === 'node-group');
    const edgeGroup = group.find(e => e.get('name') === 'edge-group');
    if (type === 'node') return nodeGroup.get('children').filter(g => !!g.get(stateName) === value);
    if (type === 'edge') return edgeGroup.get('children').filter(g => !!g.get(stateName) === value);
    return nodeGroup.get('children').filter(g => !!g.get(stateName) === value)
      .concat(edgeGroup.get('children').filter(g => !!g.get(stateName) === value));
  }

  public clearActiveLegend() {
    const lg = this.get('legendCanvas');
    const group = lg.find(e => e.get('name') === 'root');
    const groups = [
      group.find(e => e.get('name') === 'node-group'),
      group.find(e => e.get('name') === 'edge-group')
    ];
    groups.forEach(itemGroup => {
      itemGroup.get('children').forEach(subGroup => {
        subGroup.set('active', false);
        subGroup.set('inactive', false);
        const [keyShape, text] = subGroup.get('children');
        keyShape.attr(keyShape.get('oriAttrs'));
        text.attr(text.get('oriAttrs'));
      })
    });
  }

  /**
   * 高亮和置灰图例，并过滤主图元素
   * @param param
   */
  public filterData(e) {
    const filter = this.get('filter');
    const filterFunctions = filter?.filterFunctions;
    if (!filter || !filterFunctions) return;
    const lc = this.get('legendCanvas');
    const graph = this.get('graph');
    const activeState = filter.graphActiveState || 'active';
    const inactiveState = filter.graphInactiveState || 'inactive';
    const multiple = filter.multiple;
    this.clearFilter()
    if (!multiple) this.clearActiveLegend()
    // 设置 legend 的高亮状态
    this.activateLegend(e.target);
    const group = lc.find(e => e.get('name') === 'root');
    const nodeGroup = group.find(e => e.get('name') === 'node-group');
    const edgeGroup = group.find(e => e.get('name') === 'edge-group');
    const activeNodeLegend = nodeGroup.get('children').filter(e => e.get('active'));
    const activeEdgeLegend = edgeGroup.get('children').filter(e => e.get('active'));

    let activeCount = 0;
    const typeFuncs = ['getNodes', 'getEdges'];
    typeFuncs.forEach(typeFunc => {
      graph[typeFunc]().forEach(graphItem => {
        let active = false;
        const activeLegend = typeFunc === 'getNodes' ? activeNodeLegend : activeEdgeLegend;
        activeLegend.forEach(itemGroup => {
          const func = filterFunctions[itemGroup.get('id')];
          active = active || func(graphItem.getModel());
        })
        if (active) {
          graph.setItemState(graphItem, inactiveState, false);
          graph.setItemState(graphItem, activeState, true);
          activeCount++;
        } else {
          graph.setItemState(graphItem, activeState, false);
          graph.setItemState(graphItem, inactiveState, true);
        }
      });
    });
    if (!activeCount)
      typeFuncs.forEach(typeFunc => {
        graph[typeFunc]().forEach(graphItem => {
          graph.clearItemStates(graphItem, [inactiveState])
        });
      });
  }

  /**
   * 清除主图相关状态
   * @param param
   */
  public clearFilter() {
    // 清除 legend 的高亮状态
    const graph = this.get('graph');
    const filter = this.get('filter');
    if (!filter) return;
    const activeState = filter.graphActiveState || 'active';
    const inactiveState = filter.graphInactiveState || 'inactive';
    graph.getNodes().forEach(node => {
      graph.clearItemStates(node, [activeState, inactiveState]);
    });
    graph.getEdges().forEach(edge => {
      graph.clearItemStates(edge, [activeState, inactiveState]);
    });
  }

  /**
   * 渲染 legend 图
   * @param param
   */
  protected render(): number[] {
    this.processData();
    let lc = this.get('legendCanvas');
    if (!lc) {
      lc = new Canvas({
        container: this.get('container'),
        width: 200,
        height: 200,
      });
      const rootGroup = lc.addGroup({ name: 'root' });
      rootGroup.addGroup({ name: 'node-group' });
      rootGroup.addGroup({ name: 'edge-group' });
      // nodeStateStyles: {
      //   legendActive,
      //   legendInactive
      // }
      this.set('legendCanvas', lc);
    }
    const group = lc.find(e => e.get('name') === 'root');
    const nodeGroup = group.find(e => e.get('name') === 'node-group');
    const edgeGroup = group.find(e => e.get('name') === 'edge-group')
    const itemsData = this.get('itemsData');
    const itemTypes = ['nodes', 'edges'];
    const itemGroup = [nodeGroup, edgeGroup];
    itemTypes.forEach((itemType, i) => {
      itemsData[itemType].forEach(data => {
        const subGroup = itemGroup[i].addGroup({ id: data.id, name: 'node-container' });
        let attrs;
        let shapeType = data.type;
        const { width, height, r } = this.getShapeSize(data);
        const style = this.getStyle(itemType.substr(0, 4), data);
        switch (data.type) {
          case 'circle':
            attrs = { r, x: 0, y: 0 };
            break;
          case 'rect':
            attrs = { width, height, x: -width / 2, y: -height / 2 };
            break;
          case 'ellipse':
            attrs = { r1: width, r2: height, x: 0, y: 0 };
            break;
          case 'line':
            attrs = { x1: -width / 2, y1: 0, x2: width / 2, y2: 0 };
            shapeType = 'line';
            break;
          case 'quadratic':
            attrs = {
              path: [
                ['M', -width / 2, 0],
                ['Q', 0, width / 2, width / 2, 0]
              ],
            };
            shapeType = 'path';
            break;
          case 'cubic':
            attrs = {
              path: [
                ['M', -width / 2, 0],
                ['C', -width / 6, width / 2, width / 6, -width / 2, width / 2, 0]
              ],
            };
            shapeType = 'path';
            break;
          default:
            attrs = { r, x: 0, y: 0 };
            break;

        }
        const keyShape = subGroup.addShape(shapeType, {
          attrs: { ...attrs, ...style },
          name: `${data.type}-node-keyShape`,
          oriAttrs: { opacity: 1, ...style }
        });
        if (data.label) {
          const keyShapeBBox = keyShape.getBBox();
          const labelStyle = data.labelCfg?.style || {};
          const attrs = {
            textAlign: 'begin',
            fontSize: 12,
            textBaseline: 'middle',
            fill: '#000',
            opacity: 1,
            fontWeight: 'normal',
            ...labelStyle
          }
          subGroup.addShape('text', {
            attrs: {
              x: keyShapeBBox.maxX + 4,
              y: 0,
              text: data.label,
              ...attrs
            },
            className: 'legend-label',
            name: `${data.type}-node-text`,
            oriAttrs: attrs
          });
        }
      });
    })
    const padding = this.get('padding')

    let titleShape;
    let titleGroup = group.find(e => e.get('name') === 'title-container');
    let titleGroupBBox = { height: 0, maxY: 0, width: 0 };
    if (this.get('title')) {
      if (!titleGroup) {
        titleGroup = group.addGroup({
          name: 'title-container'
        })
      }
      const defaultTitleStyle = {
        fontSize: 20,
        fontFamily: 'Arial',
        fontWeight: 300,
        textBaseline: 'top',
        textAlign: 'center',
        fill: "#000",
        x: 0,
        y: padding[0]
      }
      const titleConfig = this.get('titleConfig') || {};
      const style = Object.assign(defaultTitleStyle, titleConfig.style || {})
      titleShape = titleGroup.addShape('text', {
        attrs: {
          text: this.get('title'),
          ...style
        }
      });
      titleGroupBBox = titleGroup.getCanvasBBox();
      titleGroup.setMatrix([1, 0, 0, 0, 1, 0, titleConfig.offsetX, titleConfig.offsetY, 1]);
    }

    this.layoutItems();
    let lcBBox = group.getCanvasBBox();

    let nodeGroupBBox = nodeGroup.getCanvasBBox();
    // 若有图形超过边界的情况，平移回来
    let nodeGroupBeginX = nodeGroupBBox.minX < 0 ? Math.abs(nodeGroupBBox.minX) + padding[3] : padding[3];
    let nodeGroupBeginY = titleGroupBBox.maxY < nodeGroupBBox.minY ? Math.abs(titleGroupBBox.maxY - nodeGroupBBox.minY) + padding[0] : titleGroupBBox.maxY + padding[0];
    let nodeGroupMatrix = [1, 0, 0, 0, 1, 0, nodeGroupBeginX, nodeGroupBeginY, 1];
    nodeGroup.setMatrix(nodeGroupMatrix);
    lcBBox = group.getCanvasBBox();
    let size = [
      lcBBox.minX + lcBBox.width + padding[1],
      lcBBox.minY + lcBBox.height + padding[2]
    ];
    // 根据 size 和 titleConfig 调整 title 位置，再调整 nodeGroup 位置
    if (titleShape) {
      const titleConfig = {
        position: 'center',
        offsetX: 0,
        offsetY: 0,
        ...this.get('titleConfig')
      };
      titleGroupBBox = titleGroup.getCanvasBBox();
      const titleGroupMatrix = titleGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (titleConfig.position === 'center') {
        titleGroupMatrix[6] = size[0] / 2 + titleConfig.offsetX;
      } else if (titleConfig.position === 'right') {
        titleGroupMatrix[6] = size[0] - padding[3] + titleConfig.offsetX
        titleShape.attr({ textAlign: 'right' });
      } else {
        titleGroupMatrix[6] = padding[3] + titleConfig.offsetX
        titleShape.attr({ textAlign: 'left' });
      }
      titleGroup.setMatrix(titleGroupMatrix);
      titleGroupBBox = titleGroup.getCanvasBBox();
      // 若有图形超过边界的情况，平移回来
      nodeGroupBeginX = nodeGroupBBox.minX < 0 ? Math.abs(nodeGroupBBox.minX) + padding[3] : padding[3];
      nodeGroupBeginY = nodeGroupBBox.minY < titleGroupBBox.maxY ? Math.abs(titleGroupBBox.maxY - nodeGroupBBox.minY) + padding[0] : titleGroupBBox.maxY + padding[0];
      nodeGroupMatrix = [1, 0, 0, 0, 1, 0, nodeGroupBeginX, nodeGroupBeginY, 1];
      nodeGroup.setMatrix(nodeGroupMatrix);

      const edgeGroupMatrix = [1, 0, 0, 0, 1, 0, nodeGroupBeginX, nodeGroupBeginY, 1];
      if (this.get('layout') === 'vertical') edgeGroupMatrix[6] += nodeGroupBBox.maxX + this.get('horiSep');
      else edgeGroupMatrix[7] += nodeGroupBBox.maxY + this.get('vertiSep');
      edgeGroup.setMatrix(edgeGroupMatrix);
    } else {
      // 没有 title，也需要平移 edgeGroup
      nodeGroupBBox = nodeGroup.getCanvasBBox();
      const edgeGroupMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
      if (this.get('layout') === 'vertical') edgeGroupMatrix[6] += (nodeGroupMatrix[6] + nodeGroupBBox.maxX + this.get('horiSep'));
      else edgeGroupMatrix[7] += (nodeGroupMatrix[7] + nodeGroupBBox.maxY + this.get('vertiSep'));
      edgeGroup.setMatrix(edgeGroupMatrix);
    }
    lcBBox = group.getCanvasBBox();
    nodeGroupBBox = nodeGroup.getCanvasBBox();
    nodeGroupMatrix = nodeGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const edgeGroupMatrix = edgeGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const edgeGroupBBox = edgeGroup.getCanvasBBox();
    size = [
      Math.max(nodeGroupBBox.width + nodeGroupMatrix[6], edgeGroupBBox.width + edgeGroupMatrix[6]) + padding[1],
      Math.max(nodeGroupBBox.height + nodeGroupMatrix[7], edgeGroupBBox.height + edgeGroupMatrix[7]) + padding[2],
    ];
    lc.changeSize(size[0], size[1]);

    // 更新容器背景样式
    const containerStyle = this.get('containerStyle');
    const viewportMatrix = group.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    const beginPos = Util.invertMatrix({ x: 0, y: 0 }, viewportMatrix);
    const backRect = group.addShape('rect', {
      attrs: {
        x: beginPos.x + (containerStyle.lineWidth || 1),
        y: beginPos.y + (containerStyle.lineWidth || 1),
        width: size[0] - 2 * (containerStyle.lineWidth || 1),
        height: size[1] - 2 * (containerStyle.lineWidth || 1),
        fill: "#f00",
        stroke: '#000',
        lineWidth: 1,
        opacity: 0.5,
        ...containerStyle
      },
      name: 'legend-back-rect',
      capture: false
    });
    backRect.toBack();
    return size;
  }

  protected layoutItems() {
    const lc = this.get('legendCanvas');
    const horiSep = this.get('horiSep');
    const vertiSep = this.get('vertiSep');
    const layout = this.get('layout');
    const align = this.get('align');
    const begin = [0, 0];

    const group = lc.find(e => e.get('name') === 'root');
    const nodeGroup = group.find(e => e.get('name') === 'node-group');
    const edgeGroup = group.find(e => e.get('name') === 'edge-group');

    const nodeLegendSize = {
      min: 0,
      max: -Infinity,
    }
    let rowMaxY = -Infinity;
    nodeGroup.get('children').forEach((cNodeGroup, i) => {
      if (i === 0) nodeLegendSize.min = begin[0];
      const keyShape = cNodeGroup.get('children')[0];
      const bbox = cNodeGroup.getCanvasBBox();
      const { width: keyShapeWidth, height: keyShapeHeight } = keyShape.getBBox();
      let curHeight = 0, x = 0, y = 0;
      if (layout === 'vertical') {
        x = begin[1];
        y = begin[0] + keyShapeWidth / 2;
        begin[0] = y + bbox.height + vertiSep;
        curHeight = bbox.maxX + x + keyShapeWidth / 2
      } else {
        x = begin[0] + keyShapeWidth / 2;
        y = begin[1];
        begin[0] = x + bbox.width + horiSep;
        curHeight = bbox.maxY + y + keyShapeHeight / 2
      }
      if (begin[0] > nodeLegendSize.max) nodeLegendSize.max = begin[0]
      if (curHeight > rowMaxY) rowMaxY = curHeight;
      cNodeGroup.setMatrix([1, 0, 0, 0, 1, 0, x, y, 1]);
    });
    const nw = nodeLegendSize.max - nodeLegendSize.min;

    const edgeLegendSize = {
      min: 0,
      max: -Infinity,
    }
    const nodeGroupBBox = nodeGroup.getCanvasBBox();
    begin[0] = 0;
    begin[1] = layout === 'vertical' ? nodeGroupBBox.maxX + horiSep : nodeGroupBBox.maxY + vertiSep;
    edgeGroup.get('children').forEach((subGroup, i) => {
      if (i === 0) edgeLegendSize.min = begin[0]
      const keyShape = subGroup.get('children')[0];
      const bbox = subGroup.getCanvasBBox();
      const { width: keyShapeWidth, height: keyShapeHeight } = keyShape.getBBox();
      let x = 0, y = 0;
      if (layout === 'vertical') {
        x = begin[1];
        y = begin[0];
        begin[0] = y + bbox.height + vertiSep;
        subGroup.setMatrix([1, 0, 0, 0, 1, 0, 0, y + keyShapeHeight / 2, 1]);
      } else {
        x = begin[0];
        y = begin[1];
        begin[0] = x + bbox.width + horiSep;
        subGroup.setMatrix([1, 0, 0, 0, 1, 0, x + keyShapeWidth / 2, 0, 1]);
      }
      if (begin[0] > edgeLegendSize.max) edgeLegendSize.max = begin[0]
    });
    const ew = edgeLegendSize.max - edgeLegendSize.min;

    if (align && align !== '' && align !== 'left') {
      const widthDiff = nw - ew;
      const movement = (align === 'center' ? Math.abs(widthDiff) / 2 : Math.abs(widthDiff));
      const shouldAdjustGroup = widthDiff < 0 ? nodeGroup : edgeGroup;
      shouldAdjustGroup.get('children').forEach(subGroup => {
        const matrix = subGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
        if (layout === 'vertical') matrix[7] += movement;
        else matrix[6] += movement;
        subGroup.setMatrix(matrix);
      })
    }
  }

  protected processData() {
    const data = this.get('data');
    const itemsData = { nodes: [], edges: [] };
    if (data.nodes) {
      data.nodes.sort((a, b) => a.order - b.order);
      data.nodes.forEach(node => {
        const size = node.size || [node.style?.width || node.style?.r || 8, node.style?.height || node.style?.r || 8];
        const labelStyle = node.labelCfg?.style || {};
        itemsData.nodes.push({
          id: node.id || uniqueId(),
          type: node.type || 'circle',
          style: {
            ...node.style
          },
          order: node.order,
          label: node.label,
          itemType: 'node',
          size,
          labelCfg: {
            position: 'right',
            style: {
              fontFamily: "Arial",
              ...labelStyle
            },
          }
        })
      });
    }
    if (data.edges) {
      data.edges.sort((a, b) => a.order - b.order);
      data.edges.forEach(edge => {
        let type = edge.type || 'line';
        if (edge.type === 'cubic-horizontal') type = 'cubic';
        const labelStyle = edge.labelCfg?.style || {};
        const size = edge.size || [edge.style?.width || 8, 1];

        itemsData.edges.push({
          id: edge.id || uniqueId(),
          type,
          size,
          style: {
            lineWidth: isArray(size) ? size[1] : 1,
            ...edge.style
          },
          order: edge.order,
          label: edge.label,
          itemType: 'edge',
          labelCfg: {
            position: 'right',
            style: {
              fontFamily: "Arial",
              ...labelStyle
            },
          }
        });
      });
    }

    this.set('itemsData', itemsData);
  }

  public getContainer(): HTMLDivElement {
    return this.get('container');
  }

  protected formatArray(key: string) {
    const value = this.get(key);
    if (isNumber(value)) this.set(key, [value, value, value, value]);
    else if (isArray(value)) {
      switch (value.length) {
        case 0:
          this.set(key, [0, 0, 0, 0]);
          break;
        case 1:
          this.set(key, [value[0], value[0], value[0], value[0]])
          break;
        case 2:
          this.set(key, [value[0], value[1], value[0], value[1]])
          break;
        case 3:
          this.set(key, [value[0], value[1], value[2], value[1]])
          break;
        default:
          break;
      }
    }
    return this.get(key);
  }

  private getShapeSize(data) {
    let width, height, r;
    if (data.size) {
      if (isArray(data.size)) {
        width = data.size[0];
        height = data.size[1] || data.size[0];
        r = data.size[0] / 2;
      } else if (isNumber(data.size)) {
        width = data.size;
        height = data.size;
        r = data.size / 2;
      }
    }
    if (data.style) {
      if (data.style.width) width = data.style.width;
      if (data.style.height) height = data.style.height;
      if (data.style.r) r = data.style.r;
    }

    if (!r) r = 5;
    if (!width) width = r;
    if (!height) height = r;

    return { width, height, r };
  }

  private getStyle(type, data) {
    const defaultStyle = type === 'node' ? {
      fill: '#ccc',
      lineWidth: 0,
    } : {
      stroke: '#000',
      lineWidth: 1
    }
    return {
      ...defaultStyle,
      ...(data.style || {})
    }
  }

  public destroy() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const container: HTMLDivElement = this.get('container');
    graphContainer.removeChild(container);
  }
}
