/**
 * 基于 G 的时间轴组件
 */
import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import { IGroup, ICanvas } from '@antv/g-base';
import createDOM from '@antv/dom-util/lib/create-dom'
import { isString } from '@antv/util'
import Base, { IPluginBaseConfig } from '../base';
import TrendTimeBar, { SliderOption, VALUE_CHANGE, ControllerCfg } from './trendTimeBar'
import { IGraph } from '../../interface/graph';
import { GraphData, ShapeStyle } from '../../types';
import { Interval } from './trend';

// simple 版本默认高度
const DEFAULT_SIMPLE_HEIGHT = 8

// trend 版本默认高度
const DEFAULT_TREND_HEIGHT = 26

interface Callback {
  originValue: number[];
  value: number[];
  target: IGroup;
}

interface TrendConfig {
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
  readonly backgroundStyle?: ShapeStyle;
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
  readonly interval?: Interval;
}

interface TimeBarConfig extends IPluginBaseConfig {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  readonly type?: 'trend' | 'simple';
  // 趋势图配置项
  readonly trend?: TrendConfig;
  // 滑块、及前后背景的配置
  readonly slider?: SliderOption;

  // 控制按钮
  readonly controllerCfg?: ControllerCfg;

  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;
  valueChange?: (graph: IGraph, value: string) => void;
}

export default class TimeBar extends Base {
  private cacheGraphData: GraphData;

  public getDefaultCfgs(): TimeBarConfig {
    return {
      container: null,
      className: 'g6-component-timebar',
      padding: 10,
      type: 'trend',
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
        // minLimit: 0,
        // maxLimit: 1,
        start: 0.1,
        end: 0.9,
        minText: 'min',
        maxText: 'max',
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
      `<div class='${className}' style='position: absolute; width: ${width}px; height: ${height}px; overflow: hidden'></div>`,
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
    if (renderer !== 'SVG') {
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

    this.renderTrend()
    // this.renderTimeLine()
    this.initEvent()
  }

  private renderTrend() {
    const { width, x, y, padding, type, trend, slider, controllerCfg } = this._cfgs
    const { data, ...other } = trend

    const realWidth = width - 2 * padding
    const defaultHeight = type === 'trend' ? DEFAULT_TREND_HEIGHT : DEFAULT_SIMPLE_HEIGHT
    const trendTimeBar = new TrendTimeBar({
      graph: this.get('graph'),
      canvas: this.get('canvas'),
      group: this.get('timeBarGroup'),
      type,
      x: x + padding,
      y: type === 'trend' ? y + padding : y + padding + 15,
      width: realWidth,
      height: defaultHeight,
      padding,
      trendCfg: {
        ...other,
        data: data.map(d => d.value)
      },
      ...slider,
      ticks: data.map(d => d.date),
      handlerStyle: {
        ...slider.handlerStyle,
        height: slider.height || defaultHeight
      },
      controllerCfg
    })

    this.set('trendTimeBar', trendTimeBar)
  }

  private filterData(evt) {
    const { value } = evt;
    const { data: trendData } = this._cfgs.trend
    const rangeChange = this.get('rangeChange');
    const graph: IGraph = this.get('graph');
    const trendTimeBar = this.get('trendTimeBar');
    
    const min = Math.round(trendData.length * value[0]);
    let max = Math.round(trendData.length * value[1]);
    max = max >= trendData.length ? trendData.length - 1 : max;

    const minText = trendData[min].date;
    const maxText = trendData[max].date;

    trendTimeBar.setText(minText, maxText)

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

      // 过滤不在 min 和 max 范围内的节点
      const filterData = this.cacheGraphData.nodes.filter(
        (d: any) => d.date >= minText && d.date <= maxText,
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
    const { start, end } = this._cfgs.slider;
    const type = this._cfgs.type
    const graph: IGraph = this.get('graph');
    graph.on('afterrender', () => {
      this.filterData({ value: [start, end] });
    });

    // 时间轴的值发生改变的事件
    graph.on(VALUE_CHANGE, (evt: Callback) => {
      // 范围变化
      if (type === 'trend') {
        // this.filterData(evt);
      } else if (type === 'simple') {
        // 单个值变化
        // this.renderCurrentData('')
      }
      console.log(evt)
    });
  }

  public destroy() {
    super.destroy();
    const group = this.get('timeBarGroup')
    group.off('playPauseBtn:click')
  }
}
