/**
 * 基于 G 的时间轴组件
 */
import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas as GSVGCanvas } from '@antv/g-svg';
import { ICanvas } from '@antv/g-base';
import { createDom, modifyCSS } from '@antv/dom-util';
import Base, { IPluginBaseConfig } from '../base';
import TrendTimeBar, { SliderOption } from './trendTimeBar';
import TimeBarSlice, { TimeBarSliceOption } from './timeBarSlice';
import { VALUE_CHANGE } from './constant';
import {
  GraphData,
  IG6GraphEvent,
  ShapeStyle,
  TimeBarType,
  IAbstractGraph as IGraph,
} from '@antv/g6-core';
import { Interval } from './trend';
import { ControllerCfg } from './controllerBtn';
import { isString } from '@antv/util';

// simple 版本默认高度
const DEFAULT_SIMPLE_HEIGHT = 8;

// trend 版本默认高度
const DEFAULT_TREND_HEIGHT = 26;

export interface Callback extends IG6GraphEvent {
  originValue: number[];
  value: number[];
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
  // readonly backgroundStyle?: ShapeStyle;
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

  readonly type?: TimeBarType;
  // 趋势图配置项
  readonly trend?: TrendConfig;
  // 滑块、及前后背景的配置
  readonly slider?: SliderOption;

  // 刻度时间轴配置项
  readonly tick?: TimeBarSliceOption;

  // 控制按钮
  readonly controllerCfg?: ControllerCfg;

  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;
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
        smooth: true,
      },
      controllerCfg: {
        speed: 2,
        loop: false,
      },
      slider: {
        start: 0.1,
        end: 0.9,
        minText: 'min',
        maxText: 'max',
      },
      tick: {
        start: 0.1,
        end: 0.9,
        data: [],
      },
      textStyle: {}
    };
  }

  /**
   * 初始化 TimeBar 的容器
   */
  public initContainer() {
    const graph: IGraph = this.get('graph');
    const { width, height } = this._cfgs;
    const className: string = this.get('className') || 'g6-component-timebar';

    let container: HTMLDivElement | null | string = this.get('container');

    const graphContainer = this.get('graph').get('container');

    let timeBarContainer;
    if (!container) {
      timeBarContainer = createDom(`<div class='${className}'></div>`);
      modifyCSS(timeBarContainer, { position: 'relative' });
    } else {
      if (isString(container)) {
        container = document.getElementById(container) as HTMLDivElement;
      }
      timeBarContainer = container;
    }

    graphContainer.appendChild(timeBarContainer);

    this.set('timeBarContainer', timeBarContainer);

    let canvas;
    const renderer = graph.get('renderer');
    if (renderer === 'SVG') {
      canvas = new GSVGCanvas({
        container: timeBarContainer,
        width,
        height,
      });
    } else {
      canvas = new GCanvas({
        container: timeBarContainer,
        width,
        height,
      });
    }
    this.set('canvas', canvas);
  }

  public init() {
    this.initContainer();
    const canvas: ICanvas = this.get('canvas');
    const timeBarGroup = canvas.addGroup({
      name: 'timebar-group',
    });

    this.set('timeBarGroup', timeBarGroup);

    this.renderTrend();
    this.initEvent();

    const fontFamily = typeof window !== 'undefined'
      ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
      'Arial, sans-serif'
      : 'Arial, sans-serif'
    this.set('fontFamily', fontFamily);
  }

  private renderTrend() {
    const { width, x, y, padding, type, trend, slider, controllerCfg, textStyle } = this._cfgs;
    const { data, ...other } = trend;

    const realWidth = width - 2 * padding;
    const defaultHeight = type === 'trend' ? DEFAULT_TREND_HEIGHT : DEFAULT_SIMPLE_HEIGHT;

    const graph = this.get('graph');
    const group = this.get('timeBarGroup');
    const canvas = this.get('canvas');

    let timebar = null;
    if (type === 'trend' || type === 'simple') {
      timebar = new TrendTimeBar({
        graph,
        canvas,
        group,
        type,
        x: x + padding,
        y: type === 'trend' ? y + padding : y + padding + 15,
        width: realWidth,
        height: defaultHeight,
        padding,
        trendCfg: {
          ...other,
          data: data.map((d) => d.value),
        },
        ...slider,
        ticks: data.map((d) => d.date),
        handlerStyle: {
          ...slider.handlerStyle,
          height: slider.height || defaultHeight,
        },
        controllerCfg,
        textStyle
      });
    } else if (type === 'tick') {
      const { tick } = this._cfgs;
      // 刻度时间轴
      timebar = new TimeBarSlice({
        graph,
        canvas,
        group,
        x: x + padding,
        y: y + padding,
        ...tick,
      });
    }

    this.set('timebar', timebar);
  }

  private filterData(evt) {
    const { value } = evt;

    let trendData = null;
    const type = this._cfgs.type;
    if (type === 'trend' || type === 'simple') {
      trendData = this._cfgs.trend.data;
    } else if (type === 'tick') {
      trendData = this._cfgs.tick.data;
    }

    if (!trendData || trendData.length === 0) {
      console.warn('请配置 TimeBar 组件的数据');
      return;
    }

    const rangeChange = this.get('rangeChange');
    const graph: IGraph = this.get('graph');

    const min = Math.round(trendData.length * value[0]);
    let max = Math.round(trendData.length * value[1]);
    max = max >= trendData.length ? trendData.length - 1 : max;

    const minText = trendData[min].date;
    const maxText = trendData[max].date;

    if (type !== 'tick') {
      const timebar = this.get('timebar');
      timebar.setText(minText, maxText);
    }

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

  private initEvent() {
    let start = 0;
    let end = 0;
    const type = this._cfgs.type;
    if (!type || type === 'trend' || type === 'simple') {
      start = this._cfgs.slider.start;
      end = this._cfgs.slider.end;
    } else if (type === 'tick') {
      start = this._cfgs.tick.start;
      end = this._cfgs.tick.end;
    }

    const graph: IGraph = this.get('graph');
    graph.on('afterrender', () => {
      this.filterData({ value: [start, end] });
    });

    // 时间轴的值发生改变的事件
    graph.on(VALUE_CHANGE, (e: Partial<Callback>) => {
      // 范围变化
      this.filterData(e);
    });
  }

  public destroy() {
    const timebar = this.get('timebar');
    if (timebar && timebar.destory) {
      timebar.destory();
    }

    super.destroy();

    const timeBarContainer = this.get('timeBarContainer');
    if (timeBarContainer) {
      let container: HTMLDivElement | null = this.get('container');
      if (!container) {
        container = this.get('graph').get('container');
      }
      if (isString(container)) {
        container = document.getElementById(container) as HTMLDivElement;
      }
      container.removeChild(timeBarContainer);
    }
  }
}
