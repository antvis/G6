/**
 * 基于 G 的时间轴组件
 */
import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import { ICanvas } from '@antv/g-base';
import createDOM from '@antv/dom-util/lib/create-dom'
import { isString } from '@antv/util'
import Base, { IPluginBaseConfig } from '../base';
import TimeBarTooltip from './timeBarTooltip';
import { SliderOption, ControllerCfg } from './trendTimeBar'
import { IGraph } from '../../interface/graph';
import { GraphData } from '../../types';

interface TrendConfig {
  readonly slider?: SliderOption;
  // 数据
  readonly data: {
    date: string;
    value: string;
  }[];
  // 位置大小
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly backgroundStyle?: object;
  readonly lineStyle?: object;
  readonly areaStyle?: object;
}

interface TickStyle {
  fill?: string,
  stroke?: string,
  lineWidth?: number,
  opacity?: number,
  fillOpacity?: number,
  strokeOpacity?: number
}

interface TimeBarConfig extends IPluginBaseConfig {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  // styles
  readonly selectedTickStyle?: TickStyle;
  readonly unselectedTickStyle?: TickStyle
  readonly tooltipBackgroundColor?: string;

  // 趋势图配置项
  readonly trend?: TrendConfig;
  // 滑块、及前后背景的配置
  readonly slider?: SliderOption;
  // 自定义标签格式化函数
  readonly tickLabelFormatter?: (d: any) => string | boolean;
  // 自定义 tooltip 内容格式化函数
  readonly tooltipFomatter?: (d: any) => string;

  // 控制按钮
  readonly controllerCfg?: ControllerCfg;

  // readonly opti
  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;
  valueChange?: (graph: IGraph, value: string) => void;
}

export default class TimeBarSlice extends Base {
  private cacheGraphData: GraphData;

  public getDefaultCfgs(): TimeBarConfig {
    return {
      container: null,
      className: 'g6-component-timebar',
      padding: 2,
      trend: {
        data: [],
        isArea: false,
        smooth: true
      },
      controllerCfg: {
        speed: 2,
        loop: false,
      },
      slider: {
        minLimit: 0,
        maxLimit: 1,
        start: 0.1,
        end: 0.9,
        minText: 'min',
        maxText: 'max',
      },
      selectedTickStyle: {
        fill: '#5B8FF9'
      },
      unselectedTickStyle: {
        fill: '#e6e8e9'
      }
    };
  }

  constructor(cfgs?: TimeBarConfig) {
    super(cfgs)
  }

  /**
   * 初始化 TimeBar 的容器
   */
  public initContainer() {
    const graph: IGraph = this.get('graph');
    const { width, height } = this._cfgs
    const className: string = this.get('className') || 'g6-component-timebar';
    let parentNode: string | HTMLElement = this.get('container');
    const container: HTMLElement = createDOM(
      `<div class='${className}' style='position: absolute; width: ${width}px; height: ${height}px;'></div>`,
    );

    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode) as HTMLElement;
    }

    if (parentNode) {
      parentNode.appendChild(container);
    } else {
      graph.get('container').appendChild(container);
    }

    this.set('container', container);

    let canvas;
    const renderer = graph.get('renderer');
    if (renderer === 'SVG') {
      canvas = new GSVGCanvas({
        container: container,
        width,
        height,
      });
    } else {
      canvas = new GCanvas({
        container: container,
        width,
        height,
      });
    }
    this.set('canvas', canvas);
  }

  public init() {
    this.initContainer()
    const canvas: ICanvas = this.get('canvas')
    const timeBarGroup = canvas.addGroup({
      name: 'timebar-group'
    })

    this.set('timeBarGroup', timeBarGroup)

    this.renderSlices()
    // this.renderTimeLine()
    this.initEvent()
  }

  private renderSlices() {
    const self = this;
    const ratio = 0.6
    const { width, height, x, y, padding, trend, slider, tickLabelFormatter } = self._cfgs
    const { data, ...other } = trend
    const { start, end } = slider;

    // const realHeight = height - 2 * padding
    const realWidth = width - 2 * padding
    const fontSize = 10;
    const labelLineHeight = 4;
    const labelAreaHeight = 3 * padding + labelLineHeight + fontSize;
    const ticksAreaHeight = height - labelAreaHeight - 2 * padding;

    // styles
    const selectedTickStyle = self.get('selectedTickStyle');
    const unselectedTickStyle = self.get('unselectedTickStyle');

    const gap = 2;
    const ticksLength = data.length;
    const tickWidth = (realWidth - gap * (ticksLength - 1)) / ticksLength;
    self.set('tickWidth', tickWidth);
    const group = self.get('timeBarGroup');
    const tickRects = [];
    const labels = [];

    const startTickId = Math.round(ticksLength * start);
    const endTickId = Math.round(ticksLength * end);
    self.set('startTickRectId', startTickId);
    self.set('endickRectId', endTickId);

    data.forEach((d, i) => {
      // draw the tick rects
      const selected = i >= startTickId && i <= endTickId;
      const tickStyle = selected ? selectedTickStyle : unselectedTickStyle
      const rect = group.addShape('rect', {
        attrs: {
          x: padding + i * (tickWidth + gap),
          y: padding,
          width: tickWidth,
          height: ticksAreaHeight,
          ...tickStyle
        },
        draggable: true,
        name: `tick-rect-${i}`
      });
      // draw the pick tick rects
      const pickRect = group.addShape('rect', {
        attrs: {
          x: padding + i * tickWidth + gap * (2 * i - 1) / 2,
          y: padding,
          width: (i === 0 || i === ticksLength - 1) ? (tickWidth + gap / 2) : (tickWidth + gap),
          height: ticksAreaHeight,
          fill: '#fff',
          opacity: 0
        },
        draggable: true,
        name: `pick-rect-${i}`
      });

      const rectBBox = rect.getBBox();
      const centerX = (rectBBox.minX + rectBBox.maxX) / 2;
      tickRects.push({
        rect,
        pickRect,
        value: d.date,
        x: centerX,
        y: rectBBox.minY
      });

      let label = undefined;
      if (tickLabelFormatter) {
        label = tickLabelFormatter(d);
        if (!isString(label) && label) { // return true
          label = d.date;
        }
      } else if (i % Math.round(ticksLength / 10) === 0) {
        label = d.date;
      }
      if (label) {
        labels.push(label);

        // draw tick lines
        const lineStartY = rectBBox.maxY + padding * 2;
        group.addShape('line', {
          attrs: {
            stroke: '#BFBFBF',
            x1: centerX,
            y1: lineStartY,
            x2: centerX,
            y2: lineStartY + labelLineHeight
          }
        });

        const labelStartY = lineStartY + labelLineHeight + padding;
        const text = group.addShape('text', {
          attrs: {
            fill: '#8c8c8c',
            stroke: '#fff',
            lineWidth: 1,
            x: centerX,
            y: labelStartY,
            textAlign: 'center',
            text: label,
            textBaseline: 'top',
            fontSize: 10
          },
          capture: false
        });
        const textBBox = text.getBBox();
        if (textBBox.maxX > width) {
          text.attr('textAlign', 'right');
        } else if (textBBox.minX < 0) {
          text.attr('textAlign', 'left');
        }
        // draw tick labels
      }
    });
    self.set('tickRects', tickRects);
  }


  private filterData(evt) {
    const { value } = evt;
    const { data: trendData } = this._cfgs.trend
    const rangeChange = this.get('rangeChange');
    const graph: IGraph = this.get('graph');

    const min = Math.round(trendData.length * value[0]);
    let max = Math.round(trendData.length * value[1]);
    max = max >= trendData.length ? trendData.length - 1 : max;

    const minText = trendData[min].date;
    const maxText = trendData[max].date;

    if (rangeChange) {
      rangeChange(graph, minText, maxText);
    } else {
      // 自动过滤数据，并渲染 graph
      const graphData = graph.save() as GraphData;

      if (
        !this.cacheGraphData ||
        (this.cacheGraphData.nodes && this.cacheGraphData.nodes.length === 0)
      ) {
        this.cacheGraphData = graphData;
      }

      // 过滤掉不在 min 和 max 范围内的节点
      const filterData = this.cacheGraphData.nodes.filter(
        (d: any) => (d.date >= minText && d.date <= maxText),
      );

      const nodeIds = filterData.map((node) => node.id);

      // 过滤 source 或 target 不在 min 和 max 范围内的边
      const fileterEdges = this.cacheGraphData.edges.filter(
        (edge) => nodeIds.includes(edge.source) && nodeIds.includes(edge.target),
      );

      graph.changeData({
        nodes: filterData,
        edges: fileterEdges,
      });
    }
  }

  private renderCurrentData(value: string) {
    const valueChange = this.get('valueChange');
    const graph: IGraph = this.get('graph');

    if (valueChange) {
      valueChange(graph, value);
    } else {
      // 自动过滤数据，并渲染 graph
      const graphData = graph.save() as GraphData;

      if (
        !this.cacheGraphData ||
        (this.cacheGraphData.nodes && this.cacheGraphData.nodes.length === 0)
      ) {
        this.cacheGraphData = graphData;
      }

      // 过滤当前的节点
      const filterData = this.cacheGraphData.nodes.filter(
        (d: any) => d.date === value,
      );

      const nodeIds = filterData.map((node) => node.id);

      // 过滤 source 或 target
      const fileterEdges = this.cacheGraphData.edges.filter(
        (edge) => nodeIds.includes(edge.source) && nodeIds.includes(edge.target),
      );

      graph.changeData({
        nodes: filterData,
        edges: fileterEdges,
      });
    }
  }

  private initEvent() {
    const self = this;
    const { start, end } = self._cfgs.slider;
    const graph: IGraph = self.get('graph');
    graph.on('afterrender', () => {
      self.filterData({ value: [start, end] });
    });

    const group = self.get('timeBarGroup');

    group.on('click', e => {
      const tickRects = self.get('tickRects');
      // cancel the selected ticks
      const unselectedTickStyle = self.get('unselectedTickStyle');
      tickRects.forEach(tickRect => {
        tickRect.rect.attr(unselectedTickStyle);
      })
      const targetRect = e.target;
      if (targetRect.get('type') !== 'rect') return;
      const id = parseInt(targetRect.get('name').split('-')[2]);
      const selectedTickStyle = self.get('selectedTickStyle');
      tickRects[id].rect.attr(selectedTickStyle);
      self.set('startTickRectId', id);
      self.set('endTickRectId', id);
      const ticksLength = tickRects.length;
      const start = id / ticksLength;
      this.filterData({ value: [start, start] });
    });
    group.on('dragstart', e => {
      const tickRects = self.get('tickRects');
      // cancel the selected ticks
      const unselectedTickStyle = self.get('unselectedTickStyle');
      tickRects.forEach(tickRect => {
        tickRect.rect.attr(unselectedTickStyle);
      })
      const targetRect = e.target;
      const id = parseInt(targetRect.get('name').split('-')[2]);
      const selectedTickStyle = self.get('selectedTickStyle');
      tickRects[id].rect.attr(selectedTickStyle);
      self.set('startTickRectId', id);
      const ticksLength = tickRects.length;
      const start = id / ticksLength;
      this.filterData({ value: [start, start] });
      self.set('dragging', true);
    });
    group.on('dragover', e => {
      if (!self.get('dragging')) return;
      if (e.target.get('type') !== 'rect') return;
      const id = parseInt(e.target.get('name').split('-')[2]);
      const startTickRectId = self.get('startTickRectId');
      const tickRects = self.get('tickRects');
      const selectedTickStyle = self.get('selectedTickStyle');
      const unselectedTickStyle = self.get('unselectedTickStyle');
      for (let i = 0; i < tickRects.length; i++) {
        const style = i >= startTickRectId && i <= id ? selectedTickStyle : unselectedTickStyle;
        tickRects[i].rect.attr(style);
      }
      const ticksLength = tickRects.length;
      self.set('endTickRectId', id);
      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      this.filterData({ value: [start, end] });
    });

    group.on('drop', e => {
      if (!self.get('dragging')) return;
      self.set('dragging', false);
      if (e.target.get('type') !== 'rect') return;
      const startTickRectId = self.get('startTickRectId');
      const id = parseInt(e.target.get('name').split('-')[2]);
      if (id < startTickRectId) return;
      const selectedTickStyle = self.get('selectedTickStyle');
      const tickRects = self.get('tickRects');
      tickRects[id].rect.attr(selectedTickStyle);
      self.set('endTickRectId', id);
      const ticksLength = tickRects.length;
      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      this.filterData({ value: [start, end] });
    });

    // tooltip
    const { tooltipBackgroundColor, tooltipFomatter } = self._cfgs;
    const tooltip = new TimeBarTooltip({
      container: self.get('container') as HTMLElement,
      backgroundColor: tooltipBackgroundColor
    });
    const tickRects = self.get('tickRects');
    const canvas = self.get('canvas');
    tickRects.forEach(tickRect => {
      const pickRect = tickRect.pickRect;
      pickRect.on('mouseenter', e => {
        const rect = e.target;
        if (rect.get('type') !== 'rect') return;
        const id = parseInt(rect.get('name').split('-')[2]);
        const clientPoint = canvas.getClientByPoint(tickRects[id].x, tickRects[id].y)
        tooltip.show({
          x: tickRects[id].x,
          y: tickRects[id].y,
          clientX: clientPoint.x,
          clientY: clientPoint.y,
          text: tooltipFomatter ? tooltipFomatter(tickRects[id].value) : tickRects[id].value
        })
      });
      pickRect.on('mouseleave', e => {
        tooltip.hide();
      })
    })
  }

  public destroy() {
    super.destroy();
    const group = this.get('timeBarGroup')
    group.off('playPauseBtn:click')
  }
}
