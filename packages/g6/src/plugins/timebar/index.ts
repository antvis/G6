import { Timebar as GUITimebar } from '@antv/gui';
import { createDOM, get, isArray, isDate, isFunction, isNumber, set } from '@antv/util';
import { BasePlugin } from '../base-plugin';
import { createCanvas, parseLevelPositionToStyle, tryToGet } from './util';

import type { Canvas } from '@antv/g';
import type { TimebarStyleProps } from '@antv/gui';
import type { RuntimeContext } from '../../runtime/types';
import type { EdgeData, GraphData, NodeData } from '../../spec';
import type { ElementType, ID } from '../../types';
import type { BasePluginOptions } from '../base-plugin';
import type { Datum } from './util';

const prospectiveTimeKeys = ['timestamp', 'time', 'date', 'datetime'];
const prospectiveValueKeys = ['value', 'date', 'data'];

type TimebarChangeData = number | [number, number] | Date | [Date, Date];

/**
 * <zh/> Timebar 时间条的配置项。
 * <en/> The configuration item of the Timebar.
 */
export type TimebarOptions = BasePluginOptions &
  Partial<TimebarStyleProps> & {
    /**
     * <zh/> 给工具栏的 DOM 追加的 classname，便于自定义样式。默认是包含 `g6-timebar`。
     * <en/> The classname appended to the menu DOM for custom styles. The default is `g6-timebar`.
     */
    className?: string;
    /**
     * <zh/> 插件是否可用，默认 `true`。
     * <en/> Whether the plugin is available, default is `true`.
     */
    enable?: boolean;
    /**
     * <zh/> Timebar 的位置, 当前可配置 'bottom' | 'top'。
     * <en/> Timebar location, currently configurable 'bottom' | 'top'.
     */
    position?: 'bottom' | 'top';
    /**
     * <zh/> Timebar 展示类型。
     * <en/> Timebar Displays the type.
     */
    timebarType?: 'time' | 'chart';
    /**
     * <zh/> 筛选类型。
     * <en/> Filter element types.
     */
    itemTypes?: ElementType[];
    /**
     * <zh/> 筛选模式 modify: 数据修改 visibility: 可见性修改 。
     * <en/> Filter mode modify: data modification visibility: visibility modification.
     */
    mode?: 'modify' | 'visibility';
  };

/**
 * <zh/> 时间组件
 *
 * <en/> Timebar.
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
    padding: 4,
    itemTypes: ['node'],
    mode: 'modify',
    getTimeFromData: (datum: Datum) => tryToGet<number | Date>(datum, prospectiveTimeKeys, undefined),
    getValueFromData: (datum: Datum) => tryToGet<number | Date>(datum, prospectiveValueKeys, undefined),
  };

  private timebar?: GUITimebar;
  private timeBarCanvas?: Canvas;
  private wrapper?: HTMLElement;
  private originalData?: GraphData;

  constructor(context: RuntimeContext, options: TimebarOptions) {
    super(context, Object.assign({}, Timebar.defaultOptions, options));
    this.update(options);
  }

  public async update(options: Partial<TimebarOptions>) {
    super.update(options);
    this.createTimebar();
    this.originalData = { ...this.context.graph.getData() };
  }

  private createTimebar() {
    const { canvas, graph } = this.context;
    const { onChange, timebarType, x, y, width, height, mode, padding, ...style } = this.options;

    const data = this.getTimeData();

    const bound = canvas.getSize();

    this.createTimeBarCanvas();
    if (!this.timeBarCanvas) return;

    this.timeBarCanvas.ready.then(() => {
      this.timebar = new GUITimebar({
        style: {
          onChange: (v) => {
            const timestamps = this.getTimestamps(v);
            if (mode === 'modify') {
              this.filterElements(timestamps);
            } else {
              this.hiddenElments(timestamps);
            }
            onChange?.(v);
          },
          x: isNumber(x) ? x : (bound[0] - Number(width)) / 2,
          y: isNumber(y) ? y : padding,
          ...style,
          data,
          width,
          height,
          type: timebarType,
        },
      });

      this.timeBarCanvas?.appendChild(this.timebar);
      graph.on('timebar:handle', this.timebarHandle);
    });
  }

  private timebarHandle = (ev: any) => {
    if (!this.timebar || !ev) return;
    const handle = ev.handle as 'play' | 'pause' | 'reset' | 'backward';

    if (isFunction(this.timebar[handle])) {
      this.timebar[handle]();
    }
  };

  private getTimeData() {
    const { data, getTimeFromData, getValueFromData } = this.options;
    return data.map((datum: Datum) => ({
      time: getTimeFromData?.(datum) || datum?.time,
      value: getValueFromData?.(datum) || datum?.value,
    }));
  }

  private createTimeBarCanvas() {
    const { canvas } = this.context;
    const { className, height, padding, position } = this.options;
    const container = canvas.getContainer();

    const bound = canvas.getSize();

    this.wrapper = createDOM(
      `<div class="${className || ''}" style="${parseLevelPositionToStyle(position, bound)}" />`,
    );
    container?.appendChild(this.wrapper);

    this.timeBarCanvas = createCanvas(this.wrapper, bound[0], Number(height) + padding * 2, undefined, {
      background: '#fff',
    });
  }

  private getTimestamps = (changeTime: TimebarChangeData) =>
    (isArray(changeTime) ? changeTime : [changeTime, changeTime]).map((v) => (isDate(v) ? v.getTime() : v));

  private async filterElements(timestamps: number[]) {
    if (!this.originalData) return;
    const { itemTypes, getTimeFromData } = this.options;
    const { graph, element } = this.context;

    const filterId = [] as ID[];

    const newData = { ...this.originalData };

    itemTypes.forEach((type) => {
      const key = `${type}s`;
      const data = get(newData, [key]) as NodeData[];
      if (data) {
        set(
          newData,
          [key],
          data.filter(({ id, data }) => {
            if (!id) return true;
            const timestamp = getTimeFromData(data);
            if (timestamp && (timestamps[0] > timestamp || timestamps[1] < timestamp)) {
              filterId.push(id);
              return false;
            }
            return true;
          }),
        );
      }
    });

    set(
      newData,
      ['edges'],
      get(newData, ['edges'], []).filter(({ id, target, source }: EdgeData) => {
        if (!id) return true;
        return !filterId.includes(target) && !filterId.includes(source);
      }),
    );

    graph.setData(newData);
    await element!.draw({ animation: false, silence: true });
  }

  private hiddenElments(timestamps: number[]) {
    const { graph } = this.context;
    const { itemTypes } = this.options;
    const hideElementId: ID[] = [];
    const showElementId: ID[] = [];

    const edgeData = this.originalData?.edges || [];

    const filterElements = [];

    if (itemTypes.includes('node')) {
      const nodeData = this.originalData?.nodes || [];
      filterElements.push(...nodeData);
    }
    if (itemTypes.includes('combo')) {
      const comboData = this.originalData?.combos || [];
      filterElements.push(...comboData);
    }

    filterElements.forEach(({ id, data }) => {
      const timestamp = get(data, ['timestamp']);
      if (!id) return;
      if (!timestamp || timestamps[0] > timestamp || timestamps[1] < timestamp) {
        hideElementId.push(id);
      } else {
        showElementId.push(id);
      }
    });

    edgeData.forEach(({ id, target, source }) => {
      if (!id) return;
      if (hideElementId.includes(target) || hideElementId.includes(source)) {
        hideElementId.push(id);
      } else {
        showElementId.push(id);
      }
    });

    graph.hideElement(hideElementId, false);
    graph.showElement(showElementId, false);
  }

  /**
   * <zh/> 销毁工具栏。
   * <en/> Destroy the toolbar.
   */
  public destroy(): void {
    const { graph } = this.context;
    graph.off('timebar:handle', this.timebarHandle);
    this.originalData && graph.setData({ ...this.originalData });
    this.timebar?.destroy();
    this.wrapper?.remove();
    this.originalData = undefined;
    this.wrapper = undefined;
    this.timebar = undefined;
    this.timeBarCanvas = undefined;

    super.destroy();
  }
}
