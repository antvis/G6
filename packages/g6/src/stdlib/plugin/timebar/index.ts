import { Canvas } from '@antv/g';
import type { TimebarStyleProps } from '@antv/gui';
import { Timebar as GUITimebar } from '@antv/gui';
import { deepMix } from '@antv/util';
import type { EdgeModel, NodeModel } from '../../../types';
import { GraphData, IGraph } from '../../../types';
import type { Padding } from '../../../types/common';
import type { ITEM_TYPE } from '../../../types/item';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { createCanvas } from '../../../util/canvas';
import { createDOM } from '../../../util/dom';
import { formatPadding } from '../../../util/shape';

// -- start -- Adapt to GUI -- start --
type SubStyleProps<T, Prefix extends string> = {
  [K in keyof T as K extends `${Prefix}${infer Rest}` ? Uncapitalize<Rest> : never]: T[K];
};

const prefixStyleProps = (style: Record<string, any>, prefix: string) => {
  const result: Record<string, any> = {};
  Object.entries(style).forEach(([key, val]) => {
    const newKey = `${prefix}${key[0].toUpperCase()}${key.slice(1)}`;
    result[newKey] = val;
  });
  return result;
};
// -- end -- Adapt to GUI -- end --

type Model = NodeModel | EdgeModel;
type ItemType = Extract<ITEM_TYPE, 'node' | 'edge'>;

type STATE = {
  nodes: { enter: Model[]; exit: Model[] };
  edges: { enter: Model[]; exit: Model[] };
};

type Datum = Record<string, any>;

export interface TimebarConfig
  extends IPluginBaseConfig,
    Pick<
      TimebarStyleProps,
      | 'playMode'
      | 'values'
      | 'labelFormatter'
      | 'interval'
      | 'loop'
      | 'onChange'
      | 'onBackward'
      | 'onPause'
      | 'onPlay'
      | 'onForward'
      | 'onSelectionTypeChange'
      | 'onChartTypeChange'
    > {
  /** specific the x pos of timebar manually */
  x?: number;
  /** specific the y pos of timebar manually */
  y?: number;
  /** width of timebar */
  width?: number;
  /** height of timebar */
  height?: number;
  /** padding of timebar */
  padding?: Padding;
  /** data of timebar */
  data: Datum[];
  /**
   * position of the timebar relative to graph
   * @description it will be failure if x or y is specified
   */
  position?: 'bottom';
  timebarType: TimebarStyleProps['type'];
  /**
   * how to filter the graph data, default is modify
   * @description modify: the graph data will be changed by addItem or removeItem
   * @description visibility:  the graph item will be hidden or shown
   */
  filterType?: 'modify' | 'visibility';
  /** filter item by specific types */
  filterItemTypes?: ItemType[];
  /** describe how to get time from item */
  getTimeFromItem?: (model: Model, itemType: ItemType) => number | Date;
  /** describe how to get time from timebar data */
  getTimeFromData?: (datum: Datum) => number | Date;
  /** describe how to get value from timebar data */
  getValueFromData?: (datum: Datum) => number;
  /** determines whether an item should be ignored during the filtering process */
  shouldIgnore?: (
    model: Model,
    itemType: ItemType,
    dateRange: number | Date | [number, number] | [Date, Date],
  ) => boolean;
  /**
   * manage graph manually when timebar range/value change
   * @description if it is not specified, the graph will be filtered by default
   */
  filter?: (graph: IGraph, values: Parameters<TimebarStyleProps['onChange']>) => void;
  axisStyle?: SubStyleProps<TimebarStyleProps, 'axis'>;
  chartStyle?: SubStyleProps<TimebarStyleProps, 'chart'>;
  controllerStyle?: SubStyleProps<TimebarStyleProps, 'controller'>;
}

const prospectiveTimeKeys = ['timestamp', 'time', 'date', 'datetime'];
const prospectiveValueKeys = ['value', 'date'];

const tryToGet = <T = any>(datum: Datum, optionsKeys: string[], defaultValue?: T) => {
  for (let i = 0; i < optionsKeys.length; i++) {
    const key = optionsKeys[i];
    const val = datum?.[key] as T;
    if (val) return val;
  }
  return defaultValue;
};

export class Timebar extends Base {
  private wrapper: HTMLElement;
  private canvas: Canvas;
  private timebar: GUITimebar;
  private graphDataCache: GraphData;
  private itemTypes: ItemType[] = ['node', 'edge'];

  private get padding() {
    return formatPadding(this.options.padding);
  }

  private get containerShape() {
    const { width, height } = this.options;
    const [top, right, bottom, left] = this.padding;
    /** extra height for speed select to avoid being cut */
    const extraHeightForSpeedSelect = 30;

    return {
      x: left,
      y: top,
      width: width + left + right,
      height: height + top + bottom + extraHeightForSpeedSelect,
    };
  }

  private get data() {
    const { graph } = this;
    return { nodes: graph.getAllNodesData(), edges: graph.getAllEdgesData() };
  }

  constructor(options?: TimebarConfig) {
    super(options);
  }

  public getDefaultCfgs(): TimebarConfig {
    // @ts-ignore
    const configuration: TimebarConfig = {
      axisStyle: {},
      className: 'g6-component-timebar',
      controllerStyle: {},
      data: [],
      filterItemTypes: ['node'],
      filterType: 'modify',
      getTimeFromItem: (model) => tryToGet<number | Date>(model.data, prospectiveTimeKeys, undefined),
      getTimeFromData: (datum) => tryToGet<number | Date>(datum, prospectiveTimeKeys, undefined),
      getValueFromItem: (datum) => tryToGet(datum, prospectiveValueKeys, 0),
      height: 60,
      padding: 10,
      position: 'bottom',
      timebarType: 'time',
      width: 200,
    };
    return configuration;
  }

  public getEvents() {
    return {
      afterrender: this.updateTimebar,
      afterchangedata: this.handleDataChange,
    };
  }

  public init(graph: IGraph) {
    super.init(graph);
  }

  /** reset */
  public reset() {
    this.timebar.reset();
  }

  /** backward */
  public backward() {
    this.timebar.backward();
  }

  /** play */
  public play() {
    this.timebar.play();
  }

  /** pause */
  public pause() {
    this.timebar.pause();
  }

  /** forward */
  public forward() {
    this.timebar.forward();
  }

  public destroy() {
    this.canvas.destroy();
    super.destroy();
  }

  /** Get the container of timebar */
  private get container(): HTMLElement {
    const { container } = this.options;
    if (container instanceof HTMLElement) return container;
    const element = document.getElementById(container);
    if (element) return element;
    return this.graph.container;
  }

  /** Create a wrapper div for timebar */
  private createWrapper() {
    const { options } = this;
    const { className } = options;
    const { width, height } = this.containerShape;

    const wrapper = createDOM(`<div class="${className}" style="width: ${width}px;height: ${height}"></div>`);
    this.container.appendChild(wrapper);
    return wrapper;
  }

  private createCanvas() {
    const { width, height } = this.containerShape;
    const canvas = createCanvas('canvas', this.wrapper, width, height, undefined, { background: '#fff' });
    return canvas;
  }

  private updateTimebar() {
    if (!this.wrapper) this.wrapper = this.createWrapper();
    if (!this.canvas) this.canvas = this.createCanvas();

    this.canvas.ready.then(() => {
      this.renderTimebar();
    });
  }

  private updatePosition() {
    const { graph } = this;
    const { x, y } = this.options;
    const { width } = this.containerShape;
    const { position } = this.options;
    const [graphWidth, graphHeight] = graph.getSize();

    // if x or y is not specified, calculate the position
    if (!x && !y) {
      switch (position) {
        case 'bottom':
          this.wrapper.style.top = graphHeight + 'px';
          this.wrapper.style.left = (graphWidth - width) / 2 + 'px';
          break;
      }
    }
  }

  private renderTimebar() {
    const { x, y } = this.containerShape;
    const {
      x: ignoreX,
      y: ignoreY,
      axisStyle = {},
      chartStyle = {},
      className,
      container,
      controllerStyle = {},
      data: userDefinedData,
      filter,
      filterItemTypes,
      filterType,
      getTimeFromData,
      getTimeFromItem,
      getValueFromData,
      onChange,
      padding,
      position,
      shouldIgnore,
      timebarType,
      type,
      ...userDefinedOptions
    } = this.options;

    const data = userDefinedData.map((datum) => ({
      time: getTimeFromData?.(datum) || datum?.time,
      value: getValueFromData?.(datum) || datum?.value,
    }));

    const style: TimebarStyleProps = {
      x,
      y,
      data,
      type: timebarType,
      onChange: (values) => {
        this.handleValuesChange(values);
        onChange?.(values);
      },
      ...prefixStyleProps(axisStyle, 'axis'),
      ...prefixStyleProps(controllerStyle, 'controller'),
      ...prefixStyleProps(chartStyle, 'chart'),
      ...userDefinedOptions,
    };

    if (!this.timebar) this.timebar = this.canvas.appendChild(new GUITimebar({ style }));
    else this.timebar.update(style);
    this.updatePosition();
  }

  private handleDataChange() {
    this.graphDataCache = deepMix({}, this.data);
    this.updateTimebar();
    this.processValuesChange();
  }

  private handleValuesChange(values: Parameters<TimebarStyleProps['onChange']>[0]) {
    this.processValuesChange(values);
  }

  private processValuesChange(values: Parameters<TimebarStyleProps['onChange']>[0] = this.timebar.values) {
    const { filter } = this.options;
    if (filter) filter(values);
    else this.filter(values);
  }

  private filter(values: Parameters<TimebarStyleProps['onChange']>[0]) {
    // cache data
    if (!this.graphDataCache || (this.graphDataCache.nodes.length === 0 && this.graphDataCache.edges.length === 0)) {
      this.graphDataCache = deepMix({}, this.data);
    }

    const { filterType, filterItemTypes, shouldIgnore, getTimeFromItem } = this.options;

    const isTimeInValues = (time: number | Date) => {
      if (Array.isArray(values)) {
        return time >= values[0] && time <= values[1];
      }
      return time === values;
    };

    /**
     * store which items to be existed and exited
     * if modify, enter item will be added, exit item will be removed
     * if visibility, enter item will be shown, exit item will be hidden
     */
    const state: STATE = {
      nodes: { enter: [], exit: [] },
      edges: { enter: [], exit: [] },
    };

    const filterByType = (type: ItemType) => {
      const key = `${type}s`;
      if (!(key in this.data)) return;

      const items = this.graphDataCache[key];
      items.forEach((item) => {
        const queryItem = type === 'node' ? this.graph.getNodeData(item.id) : this.graph.getEdgeData(item.id);
        const time = getTimeFromItem(item, type);
        const isItemExists = queryItem !== undefined;
        const isItemVisible = queryItem && this.graph.getItemVisible(item.id);

        const isEdgeDangling = () => {
          if (type !== 'edge') return false;
          const { source, target } = item as EdgeModel;
          // enter nodes and current nodes
          const nodes = [...state.nodes.enter, ...this.data.nodes];
          const isSourceExists = nodes.find((n) => n.id === source);
          const isTargetExists = nodes.find((n) => n.id === target);
          return !isSourceExists || !isTargetExists;
        };

        const addItem = () => {
          if (filterType === 'modify' && !isItemExists) {
            state[key].enter.push(item);
          } else if (filterType === 'visibility' && !isItemVisible) {
            state[key].enter.push(item);
          }
        };

        const removeItem = () => {
          if (filterType === 'modify' && isItemExists) {
            state[key].exit.push(item);
          } else if (filterType === 'visibility' && isItemVisible) {
            state[key].exit.push(item);
          }
        };

        if (isEdgeDangling()) return;
        if (!filterItemTypes.includes(type)) addItem();
        // if time is undefined, always enter
        else if (time === undefined) addItem();
        // ignore, push to enter
        else if (shouldIgnore?.(item, type, values)) addItem();
        // time in range, push to enter
        else if (isTimeInValues(time)) addItem();
        // push to exit
        else if (this.data[key].find(({ id }) => id === item.id)) removeItem();
      });
    };

    this.itemTypes.forEach((type) => filterByType(type));

    this.mutateGraph(state);
  }

  private mutateGraph(state: STATE) {
    const { filterType } = this.options;
    const mutateByType = (type: ItemType) => {
      const { enter, exit } = state[`${type}s`];

      if (filterType === 'modify') {
        this.graph.addData(type, enter);
        this.graph.removeData(
          type,
          exit.map((n) => n.id),
        );
      } else {
        this.graph.showItem(enter.map((e) => e.id));
        this.graph.hideItem(exit.map((e) => e.id));
      }
    };

    const preventConsoleError = (callback: () => void) => {
      const originError = console.error;
      console.error = () => {};
      callback?.();
      console.error = originError;
    };

    preventConsoleError(() => {
      this.itemTypes.forEach((type) => mutateByType(type));
    });
  }
}
