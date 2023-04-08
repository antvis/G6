/**
 * 基于 G 的时间轴组件
 */
import { Canvas as GCanvas } from '@antv/g-canvas';
import { Canvas as GSVGCanvas } from '@antv/g-svg';
import { ICanvas } from '@antv/g-base';
import { createDom, modifyCSS } from '@antv/dom-util';
import Base, { IPluginBaseConfig } from '../base';
import TrendTimeBar, { TickCfg, SliderOption } from './trendTimeBar';
import TimeBarSlice, { TimeBarSliceOption } from './timeBarSlice';
import { VALUE_CHANGE } from './constant';
import {
  GraphData,
  IG6GraphEvent,
  TimeBarType,
  IAbstractGraph as IGraph,
  ShapeStyle,
} from '@antv/g6-core';
import { Interval } from './trend';
import { ControllerCfg } from './controllerBtn';
import { isString, throttle } from '@antv/util';

// simple 版本默认高度
const DEFAULT_SIMPLE_HEIGHT = 4;

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

  // tick 类型配置项，或 trend 和 simple 类型的时间刻度配置项
  readonly tick?: TimeBarSliceOption | TickCfg;

  // 控制按钮
  readonly controllerCfg?: ControllerCfg;

  // 是否过滤边，若为 true，则需要配合边数据上有 date 字段，过滤节点同时将不满足 date 在选中范围内的边也过滤出去
  // 若为 false，则仅过滤节点以及两端节点都被过滤出去的边
  //【deprecate】，由 filterItemTypes 替代
  readonly filterEdge?: boolean;

  // 过滤的类型, ['node', 'edge'], 默认为 ['node']
  readonly filterItemTypes?: string[];

  // 容器的 CSS 样式
  readonly containerCSS?: Object;

  // 是否通过 changeData 来进行筛选，false 则使用 hideItem
  readonly changeData?: boolean;

  // 当时间轴范围发生变化时的回调函数
  rangeChange?: (graph: IGraph, minValue: string, maxValue: string) => void;

  // 用户根据节点/边数据返回对应时间值的方法
  getDate?: (d: any) => number;

  // 用户根据节点/边数据返回对应 value 的方法。value 用于在 type 为 trend 的时间轴上显示趋势线
  getValue?: (d: any) => number;

  // 在过滤图元素时是否要忽略某些元素，范围 true，则忽略。否则按照正常过滤逻辑处理
  shouldIgnore?: (itemType: 'node' | 'edge', model: any, dateRage: { min: number, max: number }) => boolean;
}

export default class TimeBar extends Base {
  constructor(config?: TimeBarConfig) {
    super(config);
  }
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
        speed: 1,
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
      textStyle: {},
      filterEdge: false, // deprecate，由 filterItemTypes 替代
      filterItemTypes: ['node'],
      containerCSS: {}
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
    // 根据传入的参数修改容器 CSS 样式
    if (this.get('containerCSS')) modifyCSS(timeBarContainer, this.get('containerCSS'));
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

    const fontFamily =
      typeof window !== 'undefined'
        ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
        'Arial, sans-serif'
        : 'Arial, sans-serif';
    this.set('fontFamily', fontFamily);
  }

  /**
   * 触发时间轴播放
   */
  public play() {
    this.togglePlay(true);
  }
  /**
   * 触发时间轴暂停
   */
  public pause() {
    this.togglePlay(false);
  }

  /**
   * 时间轴播放状态（播放/暂停）的切换
   */
  private togglePlay(play) {
    const timebar = this.get('timebar');
    if (!timebar) return;
    timebar.isPlay = !!play;
    timebar.changePlayStatus();
  }

  private renderTrend() {
    const {
      width,
      x,
      y,
      padding,
      type,
      trend,
      slider,
      controllerCfg,
      textStyle,
      tick,
      backgroundStyle,
      foregroundStyle,
    } = this._cfgs;
    const { data, ...other } = trend;

    const realWidth = width - 2 * padding;
    const defaultHeight = type === 'trend' ? DEFAULT_TREND_HEIGHT : DEFAULT_SIMPLE_HEIGHT;

    const graph = this.get('graph');
    const group = this.get('timeBarGroup');
    const canvas = this.get('canvas');

    let timebar = null;
    if (type === 'trend' || type === 'simple') {
      const getValue = this.get('getValue');
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
        backgroundStyle,
        foregroundStyle,
        trendCfg: {
          ...other,
          data: data.map((d) => (getValue?.(d) || d.value)),
        },
        ...slider,
        tick: {
          ticks: data,
          tickLabelFormatter: tick.tickLabelFormatter,
          tickLabelStyle: tick.tickLabelStyle,
          tickLineStyle: tick.tickLineStyle,
        },
        handlerStyle: {
          ...slider.handlerStyle,
          height: slider.height || defaultHeight,
        },
        controllerCfg,
        textStyle,
      });
    } else if (type === 'tick') {
      // 刻度时间轴
      timebar = new TimeBarSlice({
        graph,
        canvas,
        group,
        x: x + padding,
        y: y + padding,
        width,
        height: 42,
        padding: 2,
        controllerCfg,
        ...tick,
      });
    }
    // 鼠标按下左/右滑块或范围条后在任意地方释放，都触发暂停播放
    const handleMouseUp = () => {
      const timebarInstance = this.get('timebar');
      timebarInstance.draggingHandler = false;
      if (timebarInstance.isPlay) {
        timebarInstance.isPlay = false;
        timebarInstance.currentHandler = timebarInstance.maxHandlerShape;
        timebarInstance.changePlayStatus();
      }
      document.removeEventListener('mouseup', handleMouseUp)
    }
    canvas.on('mousedown', e => {
      if (e.target.get('name') === 'maxHandlerShape-handler' ||
        e.target.get('name') === 'minHandlerShape-handler' ||
        e.target === timebar.foregroundShape) {
        document.addEventListener('mouseup', handleMouseUp);
      }
    });

    this.set('timebar', timebar);
  }

  private filterData(evt) {
    let { value } = evt;
    if (!value) {
      value = [];
      const type = this._cfgs.type;
      if (!type || type === 'trend' || type === 'simple') {
        value[0] = this._cfgs.slider.start;
        value[1] = this._cfgs.slider.end;
      } else if (type === 'tick') {
        value[0] = this._cfgs.tick.start;
        value[1] = this._cfgs.tick.end;
      }
    }

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

    let min = Math.round(trendData.length * value[0]);
    let max = Math.round(trendData.length * value[1]);
    max = max >= trendData.length ? trendData.length - 1 : max;
    min = min >= trendData.length ? trendData.length - 1 : min;

    const tickLabelFormatter = this._cfgs.tick?.tickLabelFormatter;
    const minText = tickLabelFormatter ? tickLabelFormatter(trendData[min]) : trendData[min].date;
    const maxText = tickLabelFormatter ? tickLabelFormatter(trendData[max]) : trendData[max].date;

    if (type !== 'tick') {
      const timebar = this.get('timebar');
      timebar.setText(minText, maxText);
    }

    if (rangeChange) {
      rangeChange(graph, minText, maxText);
    } else {
      // 自动过滤数据，并渲染 graph
      if (
        !this.cacheGraphData ||
        (this.cacheGraphData.nodes && this.cacheGraphData.nodes.length === 0)
      ) {
        this.cacheGraphData = graph.get('data'); // graph.save() as GraphData;
      }

      const filterItemTypes = this.get('filterItemTypes');

      const changeData = this.get('changeData');

      // 过滤不在 min 和 max 范围内的节点
      const getDate = this.get('getDate');
      const shouldIgnore = this.get('shouldIgnore');
      const minDate = trendData[min].date, maxDate = trendData[max].date;
      if (changeData || changeData === undefined) {
        let originNodes = this.cacheGraphData.nodes;
        let originEdges = this.cacheGraphData.edges;
        const currentNodeExistMap = {};
        const currentEdgeExistMap = {};
        graph.getNodes().forEach(node => currentNodeExistMap[node.getID()] = true);
        graph.getEdges().forEach(edge => currentEdgeExistMap[edge.getID()] = true);

        if (filterItemTypes.includes('node')) {
          originNodes?.forEach((node: any) => {
            const date = +(getDate?.(node) || node.date);
            const hitRange = (date >= minDate && date <= maxDate) || shouldIgnore?.('node', node, { min: minDate, max: maxDate });
            const exist = currentNodeExistMap[node.id];
            if (exist && !hitRange) {
              graph.removeItem(node.id);
              currentNodeExistMap[node.id] = false;
            } else if (!exist && hitRange) {
              graph.addItem('node', node);
              currentNodeExistMap[node.id] = true;
            }
          });
          // 过滤 source 或 target 不在 min 和 max 范围内的边
          originEdges?.forEach((edge) => {
            const shouldShow = (currentNodeExistMap[edge.source] && currentNodeExistMap[edge.target]) || shouldIgnore?.('edge', edge, { min: minDate, max: maxDate });
            const exist = !!graph.findById(edge.id);
            if (exist && !shouldShow) {
              graph.removeItem(edge.id);
              currentEdgeExistMap[edge.id] = false;
            } else if (!exist && shouldShow) {
              graph.addItem('edge', edge);
              currentEdgeExistMap[edge.id] = true;
            } else if (!exist) {
              currentEdgeExistMap[edge.id] = false;
            }
          });
        }

        if (this.get('filterEdge') || filterItemTypes.includes('edge')) {
          originEdges?.filter((edge) => {
            const date = +(getDate?.(edge) || edge.date);
            const hitRange = (date >= minDate && date <= maxDate) || shouldIgnore?.('edge', edge, { min: minDate, max: maxDate });
            const endsExist = currentNodeExistMap[edge.source] && currentNodeExistMap[edge.target];
            const shouldShow = hitRange && endsExist;
            const exist = currentEdgeExistMap[edge.id];
            if (exist && !shouldShow) {
              currentEdgeExistMap[edge.id] = false;
              graph.removeItem(edge.id);
            } else if (!exist && shouldShow) {
              currentEdgeExistMap[edge.id] = true;
              graph.addItem('edge', edge);
            }
          });
        }
      } else {
        if (filterItemTypes.includes('node')) {
          graph.getNodes().forEach(node => {
            const model = node.getModel();
            if (shouldIgnore?.('node', model, { min: minDate, max: maxDate })) return;
            const date = +(getDate?.(model) || model.date);
            if (date < minDate || date > maxDate) {
              graph.hideItem(node);
            } else {
              graph.showItem(node);
            }
          });
        }
        if (this.get('filterEdge') || filterItemTypes.includes('edge')) {
          graph.getEdges().forEach(edge => {
            const model = edge.getModel();
            if (shouldIgnore?.('edge', model, { min: trendData[min].date, max: trendData[max].date })) return;
            const date = +(getDate?.(model) || model.date);
            if (date < trendData[min].date || date > trendData[max].date) {
              graph.hideItem(edge);
            } else {
              const sourceVisible = edge.getSource().isVisible();
              const targetVisible = edge.getTarget().isVisible();
              if (sourceVisible && targetVisible) graph.showItem(edge);
            }
          });
        }
      }
    }
  }

  private afterrenderListener = e => this.filterData({});
  private valueChangeListener = throttle(
    e => this.filterData(e), // 不可简写，否则 filterData 中 this 指针不对
    200,
    {
      trailing: true,
      leading: true,
    },
  ) as any;

  public changeData = e => {
    const graph: IGraph = this.get('graph');
    this.cacheGraphData = graph.get('data');
    this.filterData({});
  }

  private initEvent() {
    const graph: IGraph = this.get('graph');
    // 图数据变化，更新时间轴的原始数据
    graph.on('afterchangedata', this.changeData);
    // 图渲染，触发时间轴筛选
    graph.on('afterrender', this.afterrenderListener);
    // 时间轴的值发生改变的事件，触发筛选
    graph.on(
      VALUE_CHANGE,
      this.valueChangeListener
    );
  }

  public destroy() {
    const graph: IGraph = this.get('graph');
    graph.off('afterchangedata', this.changeData);
    graph.off('afterrender', this.afterrenderListener);
    graph.off(VALUE_CHANGE, this.valueChangeListener);
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
