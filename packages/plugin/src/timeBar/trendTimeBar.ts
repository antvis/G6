import { Event, IGroup, ICanvas, IShape } from '@antv/g-base';
import { get, size, assign, each, isNumber } from '@antv/util';
import { ext } from '@antv/matrix-util';
import Trend, { TrendCfg } from './trend';
import Handler from './handler';
import { isString } from '@antv/util';
import ControllerBtn, { ControllerCfg } from './controllerBtn';
import { ShapeStyle, IAbstractGraph as IGraph } from '@antv/g6-core';
import {
  VALUE_CHANGE,
  TIMELINE_START,
  TIMEBAR_CONFIG_CHANGE,
  PLAY_PAUSE_BTN,
  NEXT_STEP_BTN,
  PRE_STEP_BTN,
  TIMELINE_END,
} from './constant';

const transform = ext.transform;

/**
 * 一些默认的样式配置
 */

export const BACKGROUND_STYLE = {
  fill: '#416180',
  opacity: 0.05,
};

const SIMPLE_BACKGROUND_STYLE = {
  fill: '#416180',
  opacity: 0.15,
  radius: 5,
};

export const FOREGROUND_STYLE = {
  fill: '#5B8FF9',
  opacity: 0.3,
  cursor: 'grab',
};

export const DEFAULT_HANDLER_WIDTH = 2;

export const HANDLER_STYLE = {
  width: DEFAULT_HANDLER_WIDTH,
  height: 24,
};

export const TEXT_STYLE = {
  textBaseline: 'middle',
  fill: '#000',
  opacity: 0.45,
};

export const TICK_LABEL_STYLE = {
  textAlign: 'center',
  textBaseline: 'top',
  fill: '#607889',
  opacity: 0.35,
}
export const TICK_LINE_STYLE = {
  lineWidth: 1,
  stroke: '#ccc',
}

export type SliderOption = Partial<{
  readonly width?: number;
  readonly height?: number;
  readonly backgroundStyle?: ShapeStyle;
  readonly foregroundStyle?: ShapeStyle;
  // 滑块样式
  readonly handlerStyle?: {
    width?: number;
    height?: number;
    style?: ShapeStyle;
  };
  readonly textStyle?: ShapeStyle;
  // 初始位置
  readonly start: number;
  readonly end: number;
  // 滑块文本
  readonly minText: string;
  readonly maxText: string;
}>;

export type TickCfg = {
  readonly ticks?: {
    date: string;
    value: string;
  }[];
  readonly tickLabelFormatter?: (d: any) => string | undefined;
  readonly tickLabelStyle?: ShapeStyle;
  readonly tickLineStyle?: ShapeStyle;
};

interface TrendTimeBarConfig extends SliderOption {
  readonly graph: IGraph;
  readonly canvas: ICanvas;
  readonly group: IGroup;
  // position size
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly padding: number;
  readonly type: 'trend' | 'simple';
  // style
  readonly trendCfg?: TrendCfg;
  readonly backgroundStyle?: ShapeStyle;
  readonly foregroundStyle?: ShapeStyle;
  readonly tick?: TickCfg;

  readonly controllerCfg: ControllerCfg;

  // 自定义标签格式化函数
}

export default class TrendTimeBar {
  private group: IGroup;

  private graph: IGraph;

  private canvas: ICanvas;

  // 位置大小配置
  public x: number;

  public y: number;

  public width: number;

  public height: number;

  private padding: number;

  private trendCfg: TrendCfg;

  private timeBarType: 'trend' | 'simple';

  private controllerCfg: ControllerCfg;

  // 样式配置
  private backgroundStyle: any;

  private foregroundStyle: any;

  private handlerStyle: any;

  private textStyle: any;

  /* 前景框，选中的区域 */
  private foregroundShape: IShape;

  /* 左侧(上侧)的按钮 */
  private minHandlerShape: Handler;

  /* 左侧文本 */
  private minTextShape: IShape;

  /* 由侧(下侧)的按钮 */
  private maxHandlerShape: Handler;

  /* 右侧文本 */
  private maxTextShape: IShape;

  private textList: IShape[];

  // 交互相关的数据信息
  private start: number;

  private end: number;

  private minText: string;

  private maxText: string;

  private currentHandler: Handler | IShape;

  private prevX: number = 0;

  /** 刻度位置预处理 */
  private tickPosList: number[];

  private ticks: {
    date: string;
    value: string;
  }[];

  /** 是否处于播放状态 */
  private isPlay: boolean;

  // 调整后的播放速度
  private currentSpeed: number;

  private currentMode: 'single' | 'range';

  /** 动画 id */
  private playHandler: number;

  private controllerBtnGroup: ControllerBtn;

  private trendComponent: Trend;

  private fontFamily: string;

  private tickLabelFormatter: (d: any) => string | undefined;

  private tickLabelStyle: ShapeStyle;

  private tickLineStyle: ShapeStyle;

  constructor(cfg: TrendTimeBarConfig) {
    const {
      x = 0,
      y = 0,
      width = 100,
      height,
      padding = 10,
      trendCfg,
      controllerCfg = {
        speed: 1,
      },
      backgroundStyle = {},
      foregroundStyle = {},
      handlerStyle = {},
      textStyle = {},
      // 缩略轴的初始位置
      start = 0,
      end = 1,
      minText = '',
      maxText = '',
      group,
      graph,
      canvas,
      tick = {
        tickLabelStyle: {},
        tickLineStyle: {},
        tickLabelFormatter: (d: string) => { return d; },
        ticks: []
      } as TickCfg,
      type,
    } = cfg;

    this.graph = graph;
    this.canvas = canvas;
    this.group = group;
    this.timeBarType = type;
    // position size
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.ticks = tick.ticks;
    this.trendCfg = trendCfg;
    this.controllerCfg = controllerCfg;
    this.currentSpeed = controllerCfg.speed || 1;
    this.tickLabelFormatter = tick.tickLabelFormatter;
    // style
    if (type === 'trend') {
      this.backgroundStyle = { ...BACKGROUND_STYLE, ...backgroundStyle };
    } else if (type === 'simple') {
      this.backgroundStyle = { ...SIMPLE_BACKGROUND_STYLE, ...backgroundStyle };
    }
    this.foregroundStyle = { ...FOREGROUND_STYLE, ...foregroundStyle };
    this.handlerStyle = { ...HANDLER_STYLE, ...handlerStyle };
    this.textStyle = { ...TEXT_STYLE, ...textStyle };
    this.tickLabelStyle = { ...TICK_LABEL_STYLE, ...tick.tickLabelStyle };
    this.tickLineStyle = { ...TICK_LINE_STYLE, ...tick.tickLineStyle };

    this.currentMode = 'range';
    // 初始信息
    this.start = start;
    this.end = end;
    this.minText = minText;
    this.maxText = maxText;

    // 初始化 fontFamily，如果有浏览器，取 body 上的字体，防止文字更新时局部渲染造成的重影
    this.fontFamily =
      typeof window !== 'undefined'
        ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
        'Arial, sans-serif'
        : 'Arial, sans-serif';

    this.renderSlider();
  }

  /**
   * 更新配置
   * @param cfg
   */
  public update(cfg: Partial<TrendTimeBarConfig>) {
    const { x, y, width, height, minText, maxText, start, end } = cfg;

    // start、end 只能是 0~1 范围
    this.start = Math.min(1, Math.max(start, 0));
    this.end = Math.min(1, Math.max(end, 0));

    // 如果传了则更新，没有传则不更新
    // @ts-ignore
    assign(this, {
      x,
      y,
      width,
      height,
      minText,
      maxText,
    });

    // 更新 ui，不自动绘制
    this.updateUI();
  }

  public setText(minText: string, maxText: string) {
    this.minTextShape.attr('text', minText);
    this.maxTextShape.attr('text', maxText);
  }

  /**
   * 初始化组件结构
   * @private
   */
  private renderSlider() {
    const { width, height, timeBarType } = this;
    // 趋势图数据
    if (timeBarType === 'trend' && size(get(this.trendCfg, 'data'))) {
      const trendComponent = new Trend({
        x: this.x,
        y: this.y,
        width,
        height,
        ...this.trendCfg,
        group: this.group,
      });

      this.trendComponent = trendComponent;
    }

    const sliderGroup = this.group.addGroup({
      name: 'slider-group',
    });

    // 1. 背景
    sliderGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        ...this.backgroundStyle,
      },
      name: 'background'
    });

    const textGroup = this.group.addGroup();

    // 2. 左右文字
    if (timeBarType === 'trend') {
      this.minTextShape = textGroup.addShape('text', {
        attrs: {
          x: 0,
          y: height / 2 + this.y,
          textAlign: 'right',
          text: this.minText,
          silent: false,
          fontFamily: this.fontFamily || 'Arial, sans-serif',
          stroke: '#fff',
          lineWidth: 5,
          ...this.textStyle,
        },
        capture: false,
        name: 'min-text-shape'
      });

      this.maxTextShape = textGroup.addShape('text', {
        attrs: {
          y: height / 2 + this.y,
          textAlign: 'left',
          text: this.maxText,
          silent: false,
          fontFamily: this.fontFamily || 'Arial, sans-serif',
          stroke: '#fff',
          lineWidth: 5,
          ...this.textStyle,
        },
        capture: false,
        name: 'max-text-shape'
      });
    } else {
      this.minTextShape = textGroup.addShape('text', {
        attrs: {
          x: 0,
          y: this.y - 10,
          textAlign: 'center',
          text: this.minText,
          silent: false,
          fontFamily: this.fontFamily || 'Arial, sans-serif',
          stroke: '#fff',
          lineWidth: 5,
          ...this.textStyle,
        },
        capture: false,
        name: 'min-text-shape'
      });
      this.maxTextShape = textGroup.addShape('text', {
        attrs: {
          y: this.y - 10,
          textAlign: 'center',
          text: this.maxText,
          silent: false,
          fontFamily: this.fontFamily || 'Arial, sans-serif',
          stroke: '#fff',
          lineWidth: 5,
          ...this.textStyle,
        },
        capture: false,
        name: 'max-text-shape'
      });
    }

    // 3. 前景 选中背景框
    this.foregroundShape = this.group.addGroup().addShape('rect', {
      attrs: {
        x: 0,
        y: this.y,
        height,
        ...this.foregroundStyle,
      },
      name: 'foreground-shape'
    });
    this.foregroundShape.on('mousedown', (e) => {
      e.target.attr('cursor', 'grabbing');
    });
    this.foregroundShape.on('mouseup', (e) => {
      e.target.attr('cursor', this.foregroundStyle.cursor || 'grab');
    });

    // 滑块相关的大小信息
    const handlerWidth = get(this.handlerStyle, 'width', 2);
    const handlerHeight = get(this.handlerStyle, 'height', 24);

    const minHandleGroup = this.group.addGroup({
      name: 'minHandlerShape',
    });
    // 4. 左右滑块
    this.minHandlerShape = new Handler({
      name: 'minHandlerShape',
      group: minHandleGroup,
      type: timeBarType,
      x: this.x,
      y: this.y,
      width: handlerWidth,
      height: handlerHeight,
      style: this.handlerStyle,
    });

    const maxHandleGroup = this.group.addGroup({
      name: 'maxHandlerShape',
    });
    this.maxHandlerShape = new Handler({
      name: 'maxHandlerShape',
      group: maxHandleGroup,
      type: timeBarType,
      x: this.x,
      y: this.y,
      width: handlerWidth,
      height: handlerHeight,
      style: this.handlerStyle,
    });

    // 缩略图下面的时间刻度
    const tickData = this.ticks;
    const interval = width / (tickData.length - 1);
    this.tickPosList = [];
    if (this.textList && this.textList.length) {
      this.textList.forEach((text) => {
        text.destroy();
      });
    }
    let lastX = -Infinity;
    const rotate = this.tickLabelStyle.rotate;
    delete this.tickLabelStyle.rotate;
    this.textList = tickData.map((data, index) => {
      this.tickPosList.push(this.x + index * interval);

      let label;
      if (this.tickLabelFormatter) {
        label = this.tickLabelFormatter(data);
        if (!isString(label) && label) {
          // return true
          label = data.date;
        }
      } else {
        label = data.date;
      }

      // 文本刻度
      const textX = this.x + index * interval, textY = this.y + height + 5;
      const text = this.group.addShape('text', {
        attrs: {
          x: textX,
          y: textY,
          text: label,
          fontFamily: this.fontFamily || 'Arial, sans-serif',
          ...this.tickLabelStyle
        },
        name: 'tick-label'
      });
      if (isNumber(rotate) && index !== tickData.length - 1) {
        const matrix = transform(
          [1, 0, 0, 0, 1, 0, 0, 0, 1],
          [
            ['t', -textX!, -textY!],
            ['r', rotate],
            ['t', textX - 5, textY + 2],
          ],
        );
        text.attr({
          textAlign: 'left',
          matrix,
        });
      }
      if (index === 0) {
        text.attr({
          textAlign: 'left',
        });
      } else if (index !== tickData.length - 1) {
        text.attr({
          textAlign: 'right',
        });
      }

      // 文本刻度上面的竖线
      const line = this.group.addShape('line', {
        attrs: {
          x1: this.x + index * interval,
          y1: this.y + height + 2,
          x2: this.x + index * interval,
          y2: this.y + height + 6,
          ...this.tickLineStyle
        },
        name: 'tick-line'
      });
      line.toBack();

      const bbox = text.getBBox();

      // 抽样，标签与标签间距不小于 10
      if (bbox.minX > lastX) {
        text.show();
        line.show();
        lastX = bbox.minX + bbox.width + 10;
      } else {
        text.hide();
        line.hide();
      }

      return text;
    });

    // 渲染播放、快进和后退的控制按钮
    this.controllerBtnGroup = new ControllerBtn({
      group: this.group,
      x: this.x,
      y: this.y + height + 25,
      width,
      height: 35,
      ...this.controllerCfg,
    });

    // 初始化 minText 和 maxText，方便计算它们的 bbox
    this.updateStartEnd(0);

    // 根据 start end 更新 ui 的位置信息
    this.updateUI();

    // 移动到对应的位置
    sliderGroup.move(this.x, this.y);

    // 绑定事件鼠标事件
    this.bindEvents();
  }

  /**
   * 绑定事件：
   *  - 点击
   *  - 滑动
   *  - 拖拽
   *  - 滚动
   * @private
   */
  private bindEvents() {
    // 1. 左滑块的滑动
    const minHandleShapeGroup = this.group.find((group) => group.get('name') === 'minHandlerShape');
    if (minHandleShapeGroup) {
      minHandleShapeGroup.on(
        'minHandlerShape-handler:mousedown',
        this.onMouseDown(this.minHandlerShape),
      );
      minHandleShapeGroup.on(
        'minHandlerShape-handler:touchstart',
        this.onMouseDown(this.minHandlerShape),
      );
    }

    const maxHandleShapeGroup = this.group.find((group) => group.get('name') === 'maxHandlerShape');
    // 2. 右滑块的滑动
    if (maxHandleShapeGroup) {
      maxHandleShapeGroup.on(
        'maxHandlerShape-handler:mousedown',
        this.onMouseDown(this.maxHandlerShape),
      );
      maxHandleShapeGroup.on(
        'maxHandlerShape-handler:touchstart',
        this.onMouseDown(this.maxHandlerShape),
      );
    }

    // 3. 前景选中区域
    this.foregroundShape.on('mousedown', this.onMouseDown(this.foregroundShape));
    this.foregroundShape.on('touchstart', this.onMouseDown(this.foregroundShape));

    // 播放区按钮控制
    /** 播放/暂停事件 */
    this.group.on(`${PLAY_PAUSE_BTN}:click`, () => {
      this.isPlay = !this.isPlay;
      this.currentHandler = this.maxHandlerShape;
      this.changePlayStatus();
    });

    // 处理前进一步的事件
    this.group.on(`${NEXT_STEP_BTN}:click`, () => {
      this.currentHandler = this.maxHandlerShape;
      this.updateStartEnd(0.01);
      this.updateUI();
    });

    // 处理后退一步的事件
    this.group.on(`${PRE_STEP_BTN}:click`, () => {
      this.currentHandler = this.maxHandlerShape;
      this.updateStartEnd(-0.01);
      this.updateUI();
    });

    this.group.on(TIMEBAR_CONFIG_CHANGE, ({ type, speed }) => {
      this.currentSpeed = speed;
      this.currentMode = type;
      if (type === 'single') {
        this.minHandlerShape.hide();
        this.foregroundShape.hide();
        this.minTextShape.hide();
      } else if (type === 'range') {
        this.minHandlerShape.show();
        this.foregroundShape.show();
        this.minTextShape.show();
      }
    });
  }

  private onMouseDown = (handler: Handler | IShape) => (e: Event) => {
    // 1. 记录点击的滑块
    this.currentHandler = handler;

    const event = e.originalEvent as MouseEvent;

    // 2. 存储当前点击位置
    event.stopPropagation();
    event.preventDefault();

    // 兼容移动端获取数据
    this.prevX = get(event, 'touches.0.pageX', event.pageX);

    // 3. 开始滑动的时候，绑定 move 和 up 事件
    const containerDOM = this.canvas.get('container');

    containerDOM.addEventListener('mousemove', this.onMouseMove);
    containerDOM.addEventListener('mouseup', this.onMouseUp);
    containerDOM.addEventListener('mouseleave', this.onMouseUp);

    // 移动端事件
    containerDOM.addEventListener('touchmove', this.onMouseMove);
    containerDOM.addEventListener('touchend', this.onMouseUp);
    containerDOM.addEventListener('touchcancel', this.onMouseUp);
  };

  private onMouseMove = (e: MouseEvent) => {
    // 滑动过程中，计算偏移，更新滑块，然后 emit 数据出去
    e.stopPropagation();
    e.preventDefault();

    const x = get(e, 'touches.0.pageX', e.pageX);

    // 横向的 slider 只处理 x
    const offsetX = x - this.prevX;

    const offsetXRange = this.adjustOffsetRange(offsetX / this.width);

    // 更新 start end range 范围
    this.updateStartEnd(offsetXRange);
    // 更新 ui
    this.updateUI();

    this.prevX = x;
  };

  private onMouseUp = () => {
    // 结束之后，取消绑定的事件
    if (this.currentHandler) {
      this.currentHandler = undefined;
    }

    const containerDOM = this.canvas.get('container');
    if (containerDOM) {
      containerDOM.removeEventListener('mousemove', this.onMouseMove);
      containerDOM.removeEventListener('mouseup', this.onMouseUp);
      // 防止滑动到 canvas 外部之后，状态丢失
      containerDOM.removeEventListener('mouseleave', this.onMouseUp);

      // 移动端事件
      containerDOM.removeEventListener('touchmove', this.onMouseMove);
      containerDOM.removeEventListener('touchend', this.onMouseUp);
      containerDOM.removeEventListener('touchcancel', this.onMouseUp);
    }
  };

  /** 输入当前圆点位置，输出离哪个 tick 的位置最近 */
  private adjustTickIndex(timeSelectX: number) {
    for (let i = 0; i < this.tickPosList.length - 1; i++) {
      if (this.tickPosList[i] <= timeSelectX && timeSelectX <= this.tickPosList[i + 1]) {
        return Math.abs(this.tickPosList[i] - timeSelectX) <
          Math.abs(timeSelectX - this.tickPosList[i + 1])
          ? i
          : i + 1;
      }
    }
    return 0;
  }

  /**
   * 调整 offsetRange，因为一些范围的限制
   * @param offsetRange
   */
  private adjustOffsetRange(offsetRange: number): number {
    // 针对不同的滑动组件，处理的方式不同
    switch (this.currentHandler) {
      case this.minHandlerShape: {
        const min = 0 - this.start;
        const max = 1 - this.start;

        return Math.min(max, Math.max(min, offsetRange));
      }
      case this.maxHandlerShape: {
        const min = 0 - this.end;
        const max = 1 - this.end;

        return Math.min(max, Math.max(min, offsetRange));
      }
      case this.foregroundShape: {
        const min = 0 - this.start;
        const max = 1 - this.end;

        return Math.min(max, Math.max(min, offsetRange));
      }
      default:
        return 0;
    }
  }

  /**
   * 更新起始、结束的控制块位置、文本、范围值（原始值）
   * @param offsetRange
   */
  private updateStartEnd(offsetRange: number) {
    const minData = this.ticks[this.adjustTickIndex(this.start * this.width)];
    const maxData = this.ticks[this.adjustTickIndex(this.end * this.width)];
    if (!this.currentHandler) {
      this.minText = this.tickLabelFormatter ? this.tickLabelFormatter(minData) : minData?.date;
      this.maxText = this.tickLabelFormatter ? this.tickLabelFormatter(maxData) : maxData?.date;
      return;
    }
    // 操作不同的组件，反馈不一样
    switch (this.currentHandler) {
      case this.minHandlerShape:
        // 拖动最小滑块时使用当前最大值设置最大值的文本，以便恢复到默认值
        this.maxText = this.maxTextShape.attr('text');
        this.start += offsetRange;
        this.minText = this.tickLabelFormatter ? this.tickLabelFormatter(minData) : minData.date;
        break;
      case this.maxHandlerShape:
        // 拖动最大滑块时使用当前最小值设置最小值的文本，以便恢复到默认值
        this.minText = this.minTextShape.attr('text');
        this.end += offsetRange;
        this.maxText = this.tickLabelFormatter ? this.tickLabelFormatter(maxData) : maxData.date;
        break;
      case this.foregroundShape:
        this.start += offsetRange;
        this.end += offsetRange;
        this.minText = this.tickLabelFormatter ? this.tickLabelFormatter(minData) : minData.date;
        this.maxText = this.tickLabelFormatter ? this.tickLabelFormatter(maxData) : maxData.date;
        break;
      default:
        break;
    }
  }

  /**
   * 根据移动的比例来更新 ui，更新范围（0-1 范围的比例值）
   * @private
   */
  private updateUI() {
    if (this.start < 0) {
      this.start = 0;
    }

    if (this.end > 1) {
      this.end = 1;
    }
    const min = this.x + this.start * this.width;
    const max = this.x + this.end * this.width;

    // 1. foreground
    this.foregroundShape.attr('x', min);
    this.foregroundShape.attr('width', max - min);

    // 滑块相关的大小信息
    const handlerWidth = get(this.handlerStyle, 'width', DEFAULT_HANDLER_WIDTH);

    // 设置文本
    this.setText(this.minText, this.maxText);

    const [minAttrs, maxAttrs] = this.dodgeText([min, max]);

    // 2. 左侧滑块和文字位置
    this.minHandlerShape.setX(min - handlerWidth / 2);
    each(minAttrs, (v, k) => this.minTextShape.attr(k, v));

    // 3. 右侧滑块和文字位置
    this.maxHandlerShape.setX(max - handlerWidth / 2);
    each(maxAttrs, (v, k) => this.maxTextShape.attr(k, v));

    if (this.currentMode === 'range') {
      // 因为存储的 start、end 可能不一定是按大小存储的，所以排序一下，对外是 end >= start
      this.graph.emit(VALUE_CHANGE, { value: [this.start, this.end].sort() });
    } else if (this.currentMode === 'single') {
      this.graph.emit(VALUE_CHANGE, { value: [this.end, this.end] });
    }
  }

  /**
   * 调整 text 的位置，自动躲避
   * 根据位置，调整返回新的位置
   * @param range
   */
  private dodgeText(range: [number, number]): [object, object] {
    const TEXTPADDING = 2;
    const handlerWidth = get(this.handlerStyle, 'width', DEFAULT_HANDLER_WIDTH);
    let minTextShape = this.minTextShape;
    let maxTextShape = this.maxTextShape;

    let [min, max] = range;
    let sorted = false;

    // 如果交换了位置，则对应的 min max 也交换
    if (min > max) {
      [min, max] = [max, min];
      [minTextShape, maxTextShape] = [maxTextShape, minTextShape];
      sorted = true;
    }

    // 避让规则，优先显示在两侧，只有显示不下的时候，才显示在中间
    const minBBox = minTextShape.getBBox();
    const maxBBox = maxTextShape.getBBox();
    let minAttrs = null;
    let maxAttrs = null;
    if (this.timeBarType === 'trend') {
      minAttrs =
        min - minBBox.width < this.x + TEXTPADDING
          ? { x: min + handlerWidth / 2 + TEXTPADDING, textAlign: 'left' }
          : { x: min - handlerWidth / 2 - TEXTPADDING, textAlign: 'right' };
      maxAttrs =
        max + maxBBox.width > this.x + this.width
          ? { x: max - handlerWidth / 2 - TEXTPADDING, textAlign: 'right' }
          : { x: max + handlerWidth / 2 + TEXTPADDING, textAlign: 'left' };
    } else if (this.timeBarType === 'simple') {
      minAttrs =
        minTextShape.attr('x') > minBBox.width // 左边滑块文本位置小于其宽度代表文字超过左边届
          ? { x: min, textAlign: 'center' }
          : { x: min, textAlign: 'left' };

      maxAttrs =
        maxTextShape.attr('x') > this.width - maxBBox.width // 有边滑块文本位置大于宽度代表文字超过右边界
          ? { x: max, textAlign: 'right' }
          : { x: max, textAlign: 'center' };
    }

    return !sorted ? [minAttrs, maxAttrs] : [maxAttrs, minAttrs];
  }

  private startPlay() {
    return typeof window !== 'undefined'
      ? window.requestAnimationFrame(() => {
        const { ticks, width } = this;
        const speed = this.currentSpeed;

        const tickInterval = width / ticks.length;
        const offsetX = tickInterval / (((10 - speed) * 1000) / 60);

        const offsetXRange = this.adjustOffsetRange(offsetX / this.width);

        this.updateStartEnd(offsetXRange);
        this.updateUI();

        if (this.isPlay) {
          this.playHandler = this.startPlay();
        }
      })
      : undefined;
  }

  private changePlayStatus(isSync = true) {
    this.controllerBtnGroup.playButton.update({
      isPlay: this.isPlay,
    });
    if (this.isPlay) {
      // 开始播放
      this.playHandler = this.startPlay();
      this.graph.emit(TIMELINE_START, null);
    } else {
      // 结束播放
      if (this.playHandler) {
        if (typeof window !== 'undefined') window.cancelAnimationFrame(this.playHandler);
        if (isSync) {
          this.graph.emit(TIMELINE_END, null);
        }
      }
    }
  }

  public destory() {
    this.graph.off(VALUE_CHANGE);

    const group = this.group;

    const minHandleShapeGroup = group.find((g) => g.get('name') === 'minHandlerShape');
    if (minHandleShapeGroup) {
      minHandleShapeGroup.off('minHandlerShape-handler:mousedown');
      minHandleShapeGroup.off('minHandlerShape-handler:touchstart');
      minHandleShapeGroup.destroy();
    }

    const maxHandleShapeGroup = group.find((g) => g.get('name') === 'maxHandlerShape');
    // 2. 右滑块的滑动
    if (maxHandleShapeGroup) {
      maxHandleShapeGroup.off('maxHandlerShape-handler:mousedown');
      maxHandleShapeGroup.off('maxHandlerShape-handler:touchstart');
      maxHandleShapeGroup.destroy();
    }

    // 3. 前景选中区域
    this.foregroundShape.off('mousedown');
    this.foregroundShape.off('touchstart');
    this.foregroundShape.destroy();

    group.off(`${PLAY_PAUSE_BTN}:click`);
    group.off(`${NEXT_STEP_BTN}:click`);
    group.off(`${PRE_STEP_BTN}:click`);
    group.off(TIMEBAR_CONFIG_CHANGE);
    group.destroy();

    if (this.trendComponent) {
      this.trendComponent.destory();
    }
  }
}
