import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDOM from '@antv/dom-util/lib/create-dom';
import { IGroup } from '@antv/g-base';
import { Canvas } from '@antv/g-canvas';
import { Slider } from '@antv/component';
import { ShapeStyle, GraphData } from '../../types';
import Base, { IPluginBaseConfig } from '../base';
import { IGraph } from '../../interface/graph';

interface Data {
  date: string;
  value: number;
}

interface Callback {
  originValue: number[];
  value: number[];
  target: IGroup;
}

interface TrendConfig {
  readonly data: Data[];
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly backgroundStyle?: ShapeStyle;
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
}

interface ExtendedTrendConfig {
  readonly data: number[];
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  readonly backgroundStyle?: ShapeStyle;
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
}

type TimeBarOption = Partial<{
  // position size
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  readonly backgroundStyle: ShapeStyle;
  readonly foregroundStyle: ShapeStyle;
  // 滑块样式
  readonly handlerStyle: {
    width: number;
    height: number;
    style: ShapeStyle;
  };
  readonly textStyle: ShapeStyle;
  // 允许滑动位置
  readonly minLimit: number;
  readonly maxLimit: number;
  // 初始位置
  readonly start: number;
  readonly end: number;
  // 滑块文本
  readonly minText: string;
  readonly maxText: string;

  readonly trend: TrendConfig;

  readonly trendCfg: ExtendedTrendConfig;
}>;

interface TimeBarConfig extends IPluginBaseConfig {
  width?: number;
  height?: number;
  timebar: TimeBarOption;
  rangeChange?: (graph: IGraph, min: number, max: number) => void;
}

export default class TimeBar extends Base {
  private cacheGraphData: GraphData;

  public getDefaultCfgs(): TimeBarConfig {
    return {
      width: 400,
      height: 50,
      rangeChange: null,
      timebar: {
        x: 10,
        y: 10,
        width: 380,
        height: 26,
        minLimit: 0,
        maxLimit: 1,
        start: 0.1,
        end: 0.9,
      },
    };
  }

  public init() {
    const timeBarConfig: TimeBarOption = this.get('timebar');
    const { trend = {} as TrendConfig } = timeBarConfig;
    const { data = [] } = trend;

    if (!data || data.length === 0) {
      console.warn('TimeBar 中没有传入数据');
      return;
    }

    const container: HTMLDivElement | null = this.get('container');

    const graphContainer = this.get('graph').get('container');

    let timebar;
    if (!container) {
      timebar = createDOM(`<div class='g6-component-timebar'></div>`);
      modifyCSS(timebar, { position: 'absolute' });
    } else {
      timebar = container;
    }
    graphContainer.appendChild(timebar);

    this.set('timeBarContainer', timebar);

    this.initTimeBar(timebar);
  }

  private initTimeBar(container: HTMLDivElement) {
    const width = this.get('width');
    const height = this.get('height');
    const canvas = new Canvas({
      container,
      width,
      height,
    });

    const group = canvas.addGroup({
      id: 'timebar-plugin',
    });

    const timeBarConfig: TimeBarOption = this.get('timebar');
    const { trend = {} as TrendConfig, ...option } = timeBarConfig;

    const config = {
      container: group,
      minText: option.start,
      maxText: option.end,
      ...option,
    };

    // 是否显示 TimeBar 根据是否传入了数据来确定
    const { data = [], ...trendOption } = trend;

    const trendData = data.map((d) => d.value);

    config.trendCfg = {
      ...trendOption,
      data: trendData,
    };

    const min = Math.round(data.length * option.start);
    let max = Math.round(data.length * option.end);
    max = max >= data.length ? data.length - 1 : max;

    config.minText = data[min].date;
    config.maxText = data[max].date;

    this.set('trendData', data);

    const slider = new Slider(config);

    slider.init();
    slider.render();

    this.set('slider', slider);

    this.bindEvent();
  }

  /**
   * 当滑动时，最小值和最大值会变化，变化以后触发相应事件
   */
  private bindEvent() {
    const slider = this.get('slider');
    const { start, end } = this.get('timebar');
    const graph: IGraph = this.get('graph');
    graph.on('afterrender', (e) => {
      this.filterData({ value: [start, end] });
    });

    slider.on('valuechanged', (evt: Callback) => {
      this.filterData(evt);
    });
  }

  private filterData(evt) {
    const { value } = evt;

    const trendData: Data[] = this.get('trendData');
    const rangeChange = this.get('rangeChange');
    const graph: IGraph = this.get('graph');
    const slider = this.get('slider');
    const min = Math.round(trendData.length * value[0]);
    let max = Math.round(trendData.length * value[1]);
    max = max >= trendData.length ? trendData.length - 1 : max;

    const minText = trendData[min].date;
    const maxText = trendData[max].date;

    slider.set('minText', minText);
    slider.set('maxText', maxText);

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

  public show() {
    const slider = this.get('slider');
    slider.show();
  }

  public hide() {
    const slider = this.get('slider');
    slider.hide();
  }

  public destroy() {
    this.cacheGraphData = null;

    const slider = this.get('slider');

    if (slider) {
      slider.off('valuechanged');
      slider.destroy();
    }

    const timeBarContainer = this.get('timeBarContainer');
    if (timeBarContainer) {
      let container: HTMLDivElement | null = this.get('container');
      if (!container) {
        container = this.get('graph').get('container');
      }
      container.removeChild(timeBarContainer);
    }
  }
}
