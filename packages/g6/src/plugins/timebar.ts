import { Timebar as TimebarComponent } from '@antv/component';
import { Canvas } from '@antv/g';
import { isArray, isDate, isNumber } from '@antv/util';
import { idOf } from '../utils/id';
import { parsePadding } from '../utils/padding';
import { BasePlugin } from './base-plugin';

import type { TimebarStyleProps as TimebarComponentStyleProps } from '@antv/component';
import type { RuntimeContext } from '../runtime/types';
import type { GraphData } from '../spec';
import type { ElementDatum, ElementType, ID, Padding } from '../types';
import type { BasePluginOptions } from './base-plugin';
import { createPluginCanvas } from './utils/canvas';

const prospectiveTimeKeys = ['timestamp', 'time', 'date', 'datetime'];

/**
 * <zh/> Timebar 时间条的配置项。
 * <en/> The options of the Timebar.
 */
export interface TimebarOptions extends BasePluginOptions {
  /**
   * <zh/> 给工具栏的 DOM 追加的类名，便于自定义样式
   *
   * <en/> The class name appended to the menu DOM for custom styles
   * @defaultValue 'g6-timebar'
   */
  className?: string;
  /**
   * <zh/> X 位置
   *
   * <en/> X position
   * @remarks
   * <zh/> 设置后 `position` 会失效
   *
   * <en/> `position` will be invalidated after setting `x`
   */
  x?: number;
  /**
   * <zh/> Y 位置
   *
   * <en/> Y position
   * @remarks
   * <zh/> 设置后 `position` 会失效
   *
   * <en/> `position` will be invalidated after setting `y`
   */
  y?: number;
  /**
   * <zh/> 时间条宽度
   *
   * <en/> Timebar width
   * @defaultValue 450
   */
  width?: number;
  /**
   * <zh/> 时间条高度
   *
   * <en/> Timebar height
   * @defaultValue 60
   */
  height?: number;
  /**
   * <zh/> Timebar 的位置
   *
   * <en/> Timebar location
   * @defaultValue 'bottom'
   */
  position?: 'bottom' | 'top';
  /**
   * <zh/> 边距
   *
   * <en/> Padding
   */
  padding?: Padding;
  /**
   * <zh/> 获取元素时间
   *
   * <en/> Get element time
   */
  getTime?: (datum: ElementDatum) => number;
  /**
   * <zh/> 时间数据
   *
   * <en/> Time data
   * @remarks
   * <zh/> `timebarType` 为 `'chart'` 时，需要额外传入 `value` 字段作为图表数据
   *
   * <en/> When `timebarType` is `'chart'`, you need to pass in the `value` field as chart data
   */
  data: number[] | { time: number; value: number }[];
  /**
   * <zh/> Timebar 展示类型
   * - `'time'`: 显示为时间轴
   * - `'chart'`: 显示为趋势图
   *
   * <en/> Timebar Displays the type
   * - `'time'`: Display as a timeline
   * - `'chart'`: Display as a trend chart
   * @defaultValue 'time'
   */
  timebarType?: 'time' | 'chart';
  /**
   * <zh/> 筛选类型
   *
   * <en/> Filter element types
   */
  elementTypes?: ElementType[];
  /**
   * <zh/> 筛选模式
   *  - `'modify'`: 通过修改图数据进行筛选
   *  - `'visibility'`: 通过修改元素可见性进行筛选
   *
   * <en/> Filter mode
   *  - `'modify'`: Filter by modifying the graph data.
   *  - `'visibility'`: Filter by modifying element visibility
   * @defaultValue 'modify'
   */
  mode?: 'modify' | 'visibility';
  /**
   * <zh/> 当前时间值
   *
   * <en/> Current time value
   */
  values?: number | [number, number] | Date | [Date, Date];
  /**
   * <zh/> 图表模式下自定义时间格式化
   *
   * <en/> Custom time formatting in chart mode
   */
  labelFormatter?: (time: number | Date) => string;
  /**
   * <zh/> 是否循环播放
   *
   * <en/> Whether to loop
   * @defaultValue false
   */
  loop?: boolean;
  /**
   * <zh/> 时间区间变化时执行的回调
   *
   * <en/> Callback executed when the time interval changes
   */
  onChange?: (values: number | [number, number]) => void;
  /**
   * <zh/> 重置时执行的回调
   *
   * <en/> Callback executed when reset
   */
  onReset?: () => void;
  /**
   * <zh/> 播放速度变化时执行的回调
   *
   * <en/> Callback executed when the playback speed changes
   */
  onSpeedChange?: (speed: number) => void;
  /**
   * <zh/> 开始播放时执行的回调
   *
   * <en/> Callback executed when playback starts
   */
  onPlay?: () => void;
  /**
   * <zh/> 暂停时执行的回调
   *
   * <en/> Callback executed when paused
   */
  onPause?: () => void;
  /**
   * <zh/> 后退时执行的回调
   *
   * <en/> Callback executed when backward
   */
  onBackward?: () => void;
  /**
   * <zh/> 前进时执行的回调
   *
   * <en/> Callback executed when forward
   */
  onForward?: () => void;
}

/**
 * <zh/> 时间组件
 *
 * <en/> Timebar
 */
export class Timebar extends BasePlugin<TimebarOptions> {
  static defaultOptions: Partial<TimebarOptions> = {
    position: 'bottom',
    enable: true,
    timebarType: 'time',
    className: 'g6-timebar',
    width: 450,
    height: 60,
    zIndex: 3,
    elementTypes: ['node'],
    padding: 10,
    mode: 'modify',
    getTime: (datum) => inferTime(datum, prospectiveTimeKeys, undefined),
    loop: false,
  };

  private timebar?: TimebarComponent;

  private canvas?: Canvas;

  private container?: HTMLElement;

  private originalData?: GraphData;

  private get padding() {
    return parsePadding(this.options.padding);
  }

  constructor(context: RuntimeContext, options: TimebarOptions) {
    super(context, Object.assign({}, Timebar.defaultOptions, options));
    this.backup();
    this.upsertTimebar();
  }

  /**
   * <zh/> 播放
   *
   * <en/> Play
   */
  public play() {
    this.timebar?.play();
  }

  /**
   * <zh/> 暂停
   *
   * <en/> Pause
   */
  public pause() {
    this.timebar?.pause();
  }

  /**
   * <zh/> 前进
   *
   * <en/> Forward
   */
  public forward() {
    this.timebar?.forward();
  }

  /**
   * <zh/> 后退
   *
   * <en/> Backward
   */
  public backward() {
    this.timebar?.backward();
  }

  /**
   * <zh/> 重置
   *
   * <en/> Reset
   */
  public reset() {
    this.timebar?.reset();
  }

  /**
   * <zh/> 更新时间条配置项
   *
   * <en/> Update timebar configuration options
   * @param options - <zh/> 配置项 | <en/> Options
   * @internal
   */
  public update(options: Partial<TimebarOptions>) {
    super.update(options);
    this.backup();

    this.upsertTimebar();
  }

  /**
   * <zh/> 备份数据
   *
   * <en/> Backup data
   */
  private backup() {
    this.originalData = shallowCopy(this.context.graph.getData());
  }

  private upsertTimebar() {
    const { canvas } = this.context;
    const { onChange, timebarType, data, x, y, width, height, mode, ...restOptions } = this.options;
    const canvasSize = canvas.getSize();
    const [top] = this.padding;

    this.upsertCanvas().ready.then(() => {
      const style: TimebarComponentStyleProps = {
        x: canvasSize[0] / 2 - width / 2,
        y: top,
        onChange: (value) => {
          const range = (isArray(value) ? value : [value, value]).map((time) =>
            isDate(time) ? time.getTime() : time,
          ) as [number, number];

          if (this.options.mode === 'modify') this.filterElements(range);
          else this.hiddenElements(range);

          onChange?.(range);
        },
        ...restOptions,
        data: data.map((datum) => (isNumber(datum) ? { time: datum, value: 0 } : datum)),
        width,
        height,
        type: timebarType,
      };

      if (!this.timebar) {
        this.timebar = new TimebarComponent({ style });
        this.canvas?.appendChild(this.timebar);
      } else {
        this.timebar.update(style);
      }
    });
  }

  private upsertCanvas() {
    if (this.canvas) return this.canvas;

    const { className, height, position } = this.options;
    const graphCanvas = this.context.canvas;
    const [width] = graphCanvas.getSize();
    const [top, , bottom] = this.padding;

    const [$container, canvas] = createPluginCanvas({
      width,
      height: height + top + bottom,
      graphCanvas,
      className: 'timebar',
      placement: position,
    });

    this.container = $container;
    if (className) $container.classList.add(className);
    this.canvas = canvas;

    return this.canvas;
  }

  private async filterElements(range: number | [number, number]) {
    if (!this.originalData) return;
    const { elementTypes, getTime } = this.options;
    const { graph, element } = this.context;

    const newData = shallowCopy(this.originalData);

    elementTypes.forEach((type) => {
      const key = `${type}s` as const;
      newData[key] = (this.originalData![key] || []).filter((datum) => {
        const time = getTime(datum);
        if (match(time, range)) return true;
        return false;
      }) as any;
    });

    const nodeLikeIds = [...newData.nodes, ...newData.combos].map((datum) => idOf(datum));
    newData.edges = newData.edges!.filter((edge) => {
      const source = edge.source;
      const target = edge.target;
      return nodeLikeIds.includes(source) && nodeLikeIds.includes(target);
    });

    graph.setData(newData);
    await element!.draw({ animation: false, silence: true })?.finished;
  }

  private hiddenElements(range: number | [number, number]) {
    const { graph } = this.context;
    const { elementTypes, getTime } = this.options;
    const hideElementId: ID[] = [];
    const showElementId: ID[] = [];

    elementTypes.forEach((elementType) => {
      const key = `${elementType}s` as const;
      const elementData = this.originalData?.[key] || [];

      elementData.forEach((elementDatum) => {
        const id = idOf(elementDatum);
        const time = getTime(elementDatum);
        if (match(time, range)) showElementId.push(id);
        else hideElementId.push(id);
      });
    });

    graph.hideElement(hideElementId, false);
    graph.showElement(showElementId, false);
  }

  /**
   * <zh/> 销毁时间条
   *
   * <en/> Destroy the timebar
   * @internal
   */
  public destroy(): void {
    const { graph } = this.context;
    this.originalData && graph.setData({ ...this.originalData });
    this.timebar?.destroy();
    this.canvas?.destroy();
    this.container?.remove();
    this.originalData = undefined;
    this.container = undefined;
    this.timebar = undefined;
    this.canvas = undefined;

    super.destroy();
  }
}

const shallowCopy = (data: GraphData) => {
  const { nodes = [], edges = [], combos = [] } = data;
  return {
    nodes: [...nodes],
    edges: [...edges],
    combos: [...combos],
  };
};

const match = (time: number, range: number | [number, number]) => {
  if (isNumber(range)) return time === range;
  const [start, end] = range;
  return time >= start && time <= end;
};

const inferTime = (datum: ElementDatum, optionsKeys: string[], defaultValue?: any): number => {
  for (let i = 0; i < optionsKeys.length; i++) {
    const key = optionsKeys[i];
    const val = datum.data?.[key];
    if (val) return val as number;
  }
  return defaultValue;
};
