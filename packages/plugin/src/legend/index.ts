import { modifyCSS, createDom } from '@antv/dom-util';
import { IAbstractGraph as IGraph, ViewPortEventParam, GraphData, ShapeStyle, INode } from '@antv/g6-core';
import Base from '../base';
import { isArray, isNumber, uniqueId } from '_@antv_util@2.0.13@@antv/util';
import G6 from '@antv/g6';
import { Util } from '@antv/g6-core';

const ALLOW_EVENTS = ['click', 'mouseenter'];

interface LegendConfig {
  data: GraphData;
  position?: 'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom' | 'bottom' | 'bottom-left' | 'bottom-right';
  padding?: number | number[];
  margin?: number | number[];
  offsetX?: number;
  offsetY?: number;
  containerStyle?: ShapeStyle;
  flipPage?: boolean;
  horiSep?: number;
  vertiSep?: number;
  layout?: 'vertical' | 'horizontal';
  width?: number | 'fit-content';
  height?: number | 'fit-content';
  align?: 'center' | 'right' | 'left';
  legend?: string;
  filter?: {
    enable?: boolean,
    multiple?: boolean;
    trigger?: 'click' | 'mouseenter',
    legendStateStyles?: {
      active?: ShapeStyle,
      Inactive?: ShapeStyle
    },
    graphActiveState?: string,
    graphInactiveState?: string,
    filterFunctions?: {
      [key: string]: (d) => boolean;
    }
  };
}

export default class Legend extends Base {
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
      legend: undefined,
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

    this.registerLegendItem();

    const size = this.render();

    modifyCSS(container, this.getContainerPos(size));

    this.bindEvents();
  }

  protected registerLegendItem() {
    const drawLabel = (config, pos, group) => {
      const labelStyle = config.labelCfg?.style || {};
      return group.addShape('text', {
        attrs: {
          x: pos[0],
          y: pos[1],
          text: config.label,
          textAlign: 'begin',
          fontSize: 12,
          textBaseline: 'middle',
          fill: '#000',
          ...labelStyle
        },
        className: 'legend-label'
      })
    };
    const legendActiveState = 'legendActive';
    const legendInactiveState = 'legendInactive';
    const setState = (name, value, item) => {
      const keyShape = item.getKeyShape();
      const group = item.getContainer();
      const label = group.find(e => e.get('className') === 'legend-label')
      if (name === legendActiveState) {
        if (value) {
          keyShape.attr('lineWidth', 2);
          if (label) label.attr('fontWeight', 'bold');
        } else {
          keyShape.attr('lineWidth', 1);
          if (label) label.attr('fontWeight', 'normal');
        }
      } else if (name === legendInactiveState) {
        group.attr('opacity', value ? 0.5 : 1);
      }
    };

    G6.registerNode('legend-line-node', {
      draw: (cfg: any, group) => {
        const length = cfg.length || 8;
        const line = group.addShape('line', {
          attrs: {
            x1: -length / 2, y1: 0,
            x2: length / 2, y2: 0,
            lineWidth: cfg.lineWidth || 1,
            stroke: cfg.stroke || '000'
          },
          name: 'line-node-keyShape'
        });
        if (cfg.label) {
          const keyShapeBBox = line.getBBox();
          const label = drawLabel(cfg, [keyShapeBBox.maxX + 4, 0], group);
          label.set('name', 'line-node-text');
        }
        return line;
      },
      setState,
    });
    G6.registerNode('legend-cubic-node', {
      draw: (cfg: any, group) => {
        const length = cfg.length || 8;
        const begin = {x: 0, y: -length / 2};
        const end = {x: 0, y: length / 2};
        const controlPoints = [
          Util.getControlPoint(begin, end, 0.5, length),
          Util.getControlPoint(begin, end, 0.5, -length)
        ];
        const path = [
          ['M', begin.x, begin.y],
          ['C',controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, end.x, end.y],
        ];
        const cubic = group.addShape('path', {
          attrs: {
            path,
            lineWidth: cfg.lineWidth || 1,
            stroke: cfg.stroke || '000'
          },
          name: 'cubic-node-keyShape'
        });
        if (cfg.label) {
          const keyShapeBBox = cubic.getBBox();
          const label = drawLabel(cfg, [keyShapeBBox.maxX + 4, 0], group);
          label.set('cubic', 'cubic-node-text');
        }
        return cubic;
      },
      setState
    });
    G6.registerNode('legend-cubic-vertical-node', {
      draw: (cfg: any, group) => {
        const length = cfg.length || 8;
        const begin = {x: 0, y: -length / 2};
        const end = {x: 0, y: length / 2};
        const controlPoints = [
          Util.getControlPoint(begin, end, 0.5, length),
          Util.getControlPoint(begin, end, 0.5, -length)
        ];
        const path = [
          ['M', begin.x, begin.y],
          ['C',controlPoints[0].x, controlPoints[0].y, controlPoints[1].x, controlPoints[1].y, end.x, end.y],
        ];
        const cubic = group.addShape('path', {
          attrs: {
            path,
            lineWidth: cfg.lineWidth || 1,
            stroke: cfg.stroke || '000'
          },
          name: 'cubic-vertical-node-keyShape'
        });
        if (cfg.label) {
          const keyShapeBBox = cubic.getBBox();
          const label = drawLabel(cfg, [keyShapeBBox.maxX + 4, 0], group);
          label.set('cubic', 'cubic-vertical-node-text');
        }
        return cubic;
      },
      setState
    });
    G6.registerNode('legend-quadratic-node', {
      draw: (cfg: any, group) => {
        const length = cfg.length || 8;
        const begin = {x: -length / 2, y: 0};
        const end = {x: length / 2, y: 0};
        const controlPoint = Util.getControlPoint(begin, end, 0.5, length)
        const path = [
          ['M', begin.x, begin.y],
          ['Q', controlPoint.x, controlPoint.y, end.x, end.y],
        ];
        const quadratic = group.addShape('path', {
          attrs: {
            path,
            lineWidth: cfg.lineWidth || 1,
            stroke: cfg.stroke || '000'
          },
          name: 'quadratic-node-keyShape'
        });
        if (cfg.label) {
          const keyShapeBBox = quadratic.getBBox();
          const label = drawLabel(cfg, [keyShapeBBox.maxX + 4, 0], group);
          label.set('name', 'quadratic-node-text');
        }
        return quadratic;
      },
      setState
    });
  }

  protected getContainerPos(size: number[] = [0, 0]) {
    const self = this;
    const graph: IGraph = self.get('graph');
    const offsetX = this.get('offsetX');
    const offsetY = this.get('offsetY');
    const margin = this.get('margin');
    const positions = this.get('position').split('-');
    const posIdxMap = { 'top': 0, 'right': 1, 'bottom': 2, 'left': 3 };

    const { x: x1, y: y1 } = graph.getPointByCanvas(0, 0)
    const { x, y } = graph.getClientByPoint(x1, y1);
    const containerCSS: any = {
      left: (graph.getWidth() - size[0]) / 2 + x,
      top: (graph.getHeight() - size[1]) / 2 + y,
    };
    positions.forEach(pos => {
      let marginValue = margin[posIdxMap[pos]];
      let key = pos;
      switch(pos) {
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
        default: // right
          marginValue = graph.getWidth() - size[0] - marginValue + x;
          key = 'left';
          break;
      }
      containerCSS[key] = marginValue;
    });
    containerCSS.top += offsetY;
    containerCSS.left += offsetX;

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
    const lg = self.get('legendGraph');
    if (trigger === 'mouseenter') {
      lg.on('node:mouseenter', (e) => self.filterData(e));
      lg.on('node:mouseleave', (e) => self.clearFilter());
    }
    else {
      lg.on('node:click', (e) => self.filterData(e));
      lg.on('canvas:click', (e) => self.clearFilter());
    }
  }

  /**
   * 更新 legend 数据，开放给用户控制
   * @param param
   */
  public changeData() {

  }

  public activateLegend(item: INode) {
    const lg = this.get('legendGraph');
    const filter = this.get('filter');
    const multiple = filter?.multiple;
    if (!multiple) this.clearActiveLegend();
    // 若被高亮元素已经处于 active 状态，则取消它的 active 状态
    // 并根据目前是否有其他 active 状态的元素决定是否要设置为 inactive 状态
    if (item.hasState('legendActive')) {
      lg.setItemState(item, 'legendActive', false);
      if (lg.findAllByState('node', 'legendActive').length) lg.setItemState(item, 'legendInactive', true);
    } else {
      lg.setItemState(item, 'legendInactive', false);
      lg.setItemState(item, 'legendActive', true);
    }
    // 将非 active 的元素设置为 inactive
    lg.getNodes().forEach(node => {
      if (!node.hasState('legendActive')) lg.setItemState(node, 'legendInactive', true);
    })
  }

  public clearActiveLegend() {
    const lg = this.get('legendGraph');
    lg.getNodes().forEach(node => {
      lg.clearItemStates(node, ['legendActive', 'legendInactive']);
    })
  }

  /**
   * 高亮和置灰图例，并过滤主图元素
   * @param param
   */
  public filterData(e) {
    // 设置 legend 的高亮状态
    this.activateLegend(e.item);
    const filter = this.get('filter');
    const filterFunctions = filter?.filterFunctions;
    if (!filter || !filterFunctions) return;
    const lg = this.get('legendGraph');
    const activeLegend = lg.findAllByState('node', 'legendActive');
    const graph = this.get('graph');
    const activeState = filter.graphActiveState || 'active';
    const inactiveState = filter.graphInactiveState || 'inactive';
    const multiple = filter.multiple;
    this.clearFilter()

    const typeFuncs = ['getNodes', 'getEdges'];
    typeFuncs.forEach(typeFunc => {
      graph[typeFunc]().forEach(graphItem => {
        let active = false;
        activeLegend.forEach(legend => {
          const func = filterFunctions[legend.getID()];
          active = active || func(graphItem.getModel());
        })
        if (active) {
          graph.setItemState(graphItem, inactiveState, false);
          graph.setItemState(graphItem, activeState, true);
        } else if(!multiple) {
          graph.setItemState(graphItem, activeState, false);
          graph.setItemState(graphItem, inactiveState, true);
        }
      });
    })
  }

  /**
   * 清除主图相关状态
   * @param param
   */
  public clearFilter() {
    // 清除 legend 的高亮状态
    this.clearActiveLegend()
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
    let lg = this.get('legendGraph');
    if (!lg) {
      const filter = this.get('filter');
      const stateStyles = filter?.lengedStateStyles || {};
      const legendActive = stateStyles?.active || {
        stroke: '#000',
        lineWidth: 2,
        'text-shape': {
          fontWeight: 'bold',
        }
      };
      const legendInactive = stateStyles?.inactive || {
        lineWidth: 0,
        opacity: 0.5,
        'text-shape': {
          opacity: 0.5,
        }
      };
      lg = new G6.Graph({
        container: this.get('container'),
        width: 200,
        height: 200,
        nodeStateStyles: {
          legendActive,
          legendInactive
        }
      });
      this.set('legendGraph', lg);
    }
    const itemsData = this.get('itemsData');
    lg.read({
      nodes: itemsData.nodes.concat(itemsData.edges)
    });

    const padding = this.get('padding')
    const group = lg.getGroup();

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

    this.layoutItems(this.get('itemsData'));
    let lgBBox = group.getCanvasBBox();

    const nodeGroup = group.find(e => e.get('className') === 'node-container');
    let nodeGroupBBox = nodeGroup.getCanvasBBox();
    // 若有图形超过边界的情况，平移回来
    let nodeGroupBeginX = nodeGroupBBox.minX < 0 ? Math.abs(nodeGroupBBox.minX) + padding[3] : padding[3];
    let nodeGroupBeginY = titleGroupBBox.maxY < nodeGroupBBox.minY ? Math.abs(titleGroupBBox.maxY - nodeGroupBBox.minY) + padding[0] : titleGroupBBox.maxY + padding[0];
    let nodeGroupMatrix = [1, 0, 0, 0, 1, 0, nodeGroupBeginX, nodeGroupBeginY, 1];
    nodeGroup.setMatrix(nodeGroupMatrix);
    lgBBox = group.getCanvasBBox();
    let size = [
      Math.max(nodeGroupBBox.width, titleGroupBBox.width) + padding[1] + padding[3],
      lgBBox.height + padding[0] + padding[2]
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
    }
    lgBBox = group.getCanvasBBox();
    nodeGroupMatrix = nodeGroup.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    nodeGroupBBox = nodeGroup.getCanvasBBox();
    size = [
      Math.max(nodeGroupBBox.width, titleGroupBBox.width) + padding[1] + padding[3],
      nodeGroupBBox.height + padding[2] + padding[0]
    ];
    if (titleGroup) size[1] += titleGroup.getCanvasBBox().height;
    lg.changeSize(size[0], size[1]);

    // 更新容器背景样式
    const containerStyle = this.get('containerStyle');
    const beginPos = lg.getPointByCanvas(0, 0);
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

  protected layoutItems(itemsData) {
    const lg = this.get('legendGraph');
    const horiSep = this.get('horiSep');
    const vertiSep = this.get('vertiSep');
    const layout = this.get('layout');
    const align = this.get('align');
    const begin = [0, 0];

    const nodeLegendSize = {
      min: 0,
      max: -Infinity,
    }
    let rowMaxY = -Infinity;
    itemsData.nodes.forEach((node, i) => {
      if (i === 0) nodeLegendSize.min = begin[0];
      const item = lg.findById(node.id);
      const model = item.getModel();
      const bbox = item.getContainer().getCanvasBBox(); // 直接用 item.getBBox 会只有 keyShape
      const { width: keyShapeWidth, height: keyShapeHeight } = item.getBBox();
      let curHeight = 0;
      if (layout === 'vertical') {
        model.x = begin[1];
        model.y = begin[0] + keyShapeWidth / 2;
        begin[0] = model.y + bbox.height + vertiSep;
        curHeight = bbox.maxX + model.x + keyShapeWidth / 2
      } else {
        model.x = begin[0] + keyShapeWidth / 2;
        model.y = begin[1];
        begin[0] = model.x + bbox.width + horiSep;
        curHeight = bbox.maxY + model.y + keyShapeHeight / 2
      }
      if (begin[0] > nodeLegendSize.max) nodeLegendSize.max = begin[0]
      if (curHeight > rowMaxY) rowMaxY = curHeight;

    });
    const nw = nodeLegendSize.max - nodeLegendSize.min;

    const edgeLegendSize = {
      min: 0,
      max: -Infinity,
    }
    begin[0] = 0;
    begin[1] = layout === 'vertical' ? rowMaxY + horiSep : rowMaxY + vertiSep;
    itemsData.edges.forEach((edge, i) => {
      if (i === 0) edgeLegendSize.min = begin[0]
      const item = lg.findById(edge.id);
      const model = item.getModel();
      const bbox = item.getContainer().getBBox();
      if (layout === 'vertical') {
        model.x = begin[1];
        model.y = begin[0];
        begin[0] = model.y + bbox.height + vertiSep;
      } else {
        model.x = begin[0];
        model.y = begin[1];
        begin[0] = model.x + bbox.width + horiSep;
      }
      if (begin[0] > edgeLegendSize.max) edgeLegendSize.max = begin[0]
    });
    const ew = edgeLegendSize.max - edgeLegendSize.min;

    if (align && align !== '' && align !== 'left') {
      const widthDiff = nw - ew;
      const movement = (align === 'center' ? Math.abs(widthDiff) / 2 : Math.abs(widthDiff));
      itemsData[widthDiff < 0 ? 'nodes' : 'edges'].forEach(data => {
        if (layout === 'vertical') lg.findById(data.id).getModel().y += movement;
        else lg.findById(data.id).getModel().x += movement;
      })
    }
    lg.refreshPositions();
  }

  protected processData() {
    const data = this.get('data');
    const itemsData = {nodes: [], edges: []};
    data.nodes.sort((a, b) => a.order - b.order);
    data.edges.sort((a, b) => a.order - b.order);
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

    data.edges.forEach(edge => {
      let type = 'legend-line-node';
      if (edge.type === 'cubic' || edge.type === 'cubic-horizontal') type = 'legend-cubic-node';
      else if (edge.type === 'quadratic' || edge.type === 'cubic-vertical') type = `legend-${edge.type}-node`;
      const labelStyle = edge.labelCfg?.style || {};

      itemsData.edges.push({
        id: edge.id || uniqueId(),
        type,
        style: {
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
      })

    });
    this.set('itemsData', itemsData);
  }

  public getContainer(): HTMLDivElement {
    return this.get('container');
  }

  protected formatArray(key: string) {
    const value = this.get(key);
    if (isNumber(value)) this.set(key, [value, value, value, value]);
    else if (isArray(value)) {
      switch(value.length) {
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

  public destroy() {
    const graph: IGraph = this.get('graph');
    const graphContainer = graph.get<HTMLDivElement>('container');
    const container: HTMLDivElement = this.get('container');
    graphContainer.removeChild(container);
  }
}