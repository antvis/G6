import { Event, IGroup, ICanvas, IShape } from '@antv/g-base';
import { get, size, assign, each } from '@antv/util';
import Trend, { TrendCfg } from './trend';
import Handler from './handler';
import ControllerBtn from './controllerBtn'
import { IGraph } from '../../interface/graph';
import { ShapeStyle } from '../../types';

/**
 * 一些默认的样式配置
 */

export const BACKGROUND_STYLE = {
  fill: '#416180',
  opacity: 0.05,
};

export const FOREGROUND_STYLE = {
  fill: 'red',
  opacity: 0.15,
  cursor: 'move',
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

export const TIMELINE_START = 'timelinestart';
export const TIMELINE_CHANGE = 'timelinechange';
export const TIMELINE_END = 'timelineend';

export const VALUE_CHANGE = 'valueChange';

export type ControllerCfg = Partial<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly padding: number;
  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 是否循环播放 */
  readonly loop?: boolean;

  readonly fill: string;
  readonly stroke: string;
  readonly preBtnStyle: ShapeStyle;
  readonly nextBtnStyle: ShapeStyle;
  readonly playBtnStyle: ShapeStyle;
}>

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
  // 允许滑动位置
  readonly minLimit?: number;
  readonly maxLimit?: number;
  // 初始位置
  readonly start: number;
  readonly end: number;
  // 滑块文本
  readonly minText: string;
  readonly maxText: string;
}>;

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

  readonly ticks?: string[];

  readonly controllerCfg: ControllerCfg;
}

export default class TrendTimeBar{
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

  private ticks: string[];

  /** 是否处于播放状态 */
  private isPlay: boolean;

  /** 动画 id */
  private playHandler: number;

  private controllerBtnGroup: ControllerBtn;

  constructor(cfg: TrendTimeBarConfig) {

    const {
      x = 0,
      y = 0,
      width = 100,
      height,
      padding = 10,
      trendCfg,
      controllerCfg = {
        speed: 1
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
      ticks,
      type
    } = cfg;

    this.graph = graph
    this.canvas = canvas
    this.group = group
    this.timeBarType = type
    // position size
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding
    this.ticks = ticks
    this.trendCfg = trendCfg;
    this.controllerCfg = controllerCfg;
    // style
    this.backgroundStyle = { ...BACKGROUND_STYLE, ...backgroundStyle };
    this.foregroundStyle = { ...FOREGROUND_STYLE, ...foregroundStyle };
    this.handlerStyle = { ...HANDLER_STYLE, ...handlerStyle };
    this.textStyle = { ...TEXT_STYLE, ...textStyle };

    // 初始信息
    this.start = start;
    this.end = end;

    this.minText = minText;
    this.maxText = maxText;

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
    this.minTextShape.attr('text', minText)
    this.maxTextShape.attr('text', maxText)
  }

  /**
   * 初始化组件结构
   * @private
   */
  private renderSlider() {
    const { width, height, timeBarType } = this
    // 趋势图数据
    if (timeBarType === 'trend' && size(get(this.trendCfg, 'data'))) {
      new Trend({
        x: this.x,
        y: this.y,
        width,
        height,
        ...this.trendCfg,
        group: this.group
      });
    }

    const sliderGroup = this.group.addGroup({
      name: 'slider-group'
    })

    // 1. 背景
    sliderGroup.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        ...this.backgroundStyle,
      },
    });

    const textGroup = this.group.addGroup()

    // 2. 左右文字
    if (timeBarType === 'trend') {
      this.minTextShape = textGroup.addShape('text', {
        attrs: {
          x: 0,
          y: height / 2 + this.y,
          textAlign: 'right',
          text: this.minText,
          silent: false,
          ...this.textStyle,
        },
        capture: false
      });
  
      this.maxTextShape = textGroup.addShape('text', {
        attrs: {
          y: height / 2 + this.y,
          textAlign: 'left',
          text: this.maxText,
          silent: false,
  
          ...this.textStyle,
        },
        capture: false
      });
    } else {
      this.minTextShape = textGroup.addShape('text', {
        attrs: {
          x: 0,
          y: this.y - 10,
          textAlign: 'center',
          text: this.minText,
          silent: false,
          ...this.textStyle,
        },
        capture: false
      });
  
      this.maxTextShape = textGroup.addShape('text', {
        attrs: {
          y: this.y - 10,
          textAlign: 'center',
          text: this.maxText,
          silent: false,
  
          ...this.textStyle,
        },
        capture: false
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
    });

    // 滑块相关的大小信息
    const handlerWidth = get(this.handlerStyle, 'width', 2);
    const handlerHeight = get(this.handlerStyle, 'height', 24);

    const minHandleGroup = this.group.addGroup({
      name: 'minHandlerShape'
    })
    // 4. 左右滑块
    this.minHandlerShape = new Handler({
      name: 'minHandlerShape',
      group: minHandleGroup,
      type: timeBarType,
      x: this.x,
      y: this.y,
      width: handlerWidth,
      height: handlerHeight,
      cursor: 'ew-resize',
      ...this.handlerStyle,
    });

    const maxHandleGroup = this.group.addGroup({
      name: 'maxHandlerShape'
    })
    this.maxHandlerShape = new Handler({
      name: 'maxHandlerShape',
      group: maxHandleGroup,
      type: timeBarType,
      x: this.x,
      y: this.y,
      width: handlerWidth,
      height: handlerHeight,
      cursor: 'ew-resize',
      ...this.handlerStyle,
    });

    // 缩略图下面的时间刻度
    const tickData = this.ticks
    const interval = width / (tickData.length - 1);
    this.tickPosList = [];
    if (this.textList && this.textList.length) {
      this.textList.forEach((text) => {
        text.destroy();
      });
    }
    let lastX = -Infinity;
    this.textList = tickData.map((tick, index) => {
      this.tickPosList.push(this.x + index * interval);

      // 文本刻度
      const text = this.group.addShape('text', {
        attrs: {
          x: this.x + index * interval,
          y: this.y + height + 5,
          text: tick,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#607889',
          opacity: 0.35,
        },
      });

      // 文本刻度上面的竖线
      const line = this.group.addShape('line', {
        attrs: {
          x1: this.x + index * interval,
          y1: this.y + height + 2,
          x2: this.x + index * interval,
          y2: this.y + height + 6,
          lineWidth: 1,
          stroke: '#ccc'
        }
      })

      const bbox = text.getBBox();

      // 抽样，标签与标签间距不小于 10
      if (bbox.minX > lastX) {
        text.show();
        line.show()
        lastX = bbox.minX + bbox.width + 10;
      } else {
        text.hide();
        line.hide()
      }

      return text;
    });

    // 渲染播放、快进和后退的控制按钮
    this.controllerBtnGroup = new ControllerBtn({
      group: this.group,
      x: this.x,
      y: this.y + height + 25,
      width,
      height: 40
    })

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
    const minHandleShapeGroup = this.group.find(group => group.get('name') === 'minHandlerShape')
    if (minHandleShapeGroup) {
      minHandleShapeGroup.on('minHandlerShape-handler:mousedown', this.onMouseDown(this.minHandlerShape))
      minHandleShapeGroup.on('minHandlerShape-handler:touchstart', this.onMouseDown(this.minHandlerShape));
    }
    
    const maxHandleShapeGroup = this.group.find(group => group.get('name') === 'maxHandlerShape')
    // 2. 右滑块的滑动
    if (maxHandleShapeGroup) {
      maxHandleShapeGroup.on('maxHandlerShape-handler:mousedown', this.onMouseDown(this.maxHandlerShape));
      maxHandleShapeGroup.on('maxHandlerShape-handler:touchstart', this.onMouseDown(this.maxHandlerShape));
    }

    // 3. 前景选中区域
    this.foregroundShape.on('mousedown', this.onMouseDown(this.foregroundShape));
    this.foregroundShape.on('touchstart', this.onMouseDown(this.foregroundShape));

    // 播放区按钮控制
    /** 播放/暂停事件 */
    this.group.on('playPauseBtn:click', () => {
      this.isPlay = !this.isPlay;
      this.currentHandler = this.maxHandlerShape
      this.changePlayStatus();
    })

    // 处理前进一步的事件
    this.group.on('nextStepBtn:click', () => {
      this.currentHandler = this.maxHandlerShape
      this.updateStartEnd(0.01);
      this.updateUI()
    })

    // 处理后退一步的事件
    this.group.on('preStepBtn:click', () => {
      this.currentHandler = this.maxHandlerShape
      this.updateStartEnd(-0.01);
      this.updateUI()

    })

    this.group.on('timebarConfigChanged', ({ type, speed }) => {
      console.log('timebarConfigChanged', type, speed)
      if(type === 'signle') {
        this.minHandlerShape.hide()
        this.foregroundShape.hide()
        this.minTextShape.hide()
      } else if (type === 'range') {
        debugger
        this.minHandlerShape.show()
        this.foregroundShape.show()
        this.minTextShape.show()
      }
    })

    /** 播放轴上圆点滑动事件 */
    // this.timeSelect.on('mousedown', this.onTimeSelectMouseDown);
  }

  private onMouseDown = (handler: Handler | IShape) => (event: Event) => {
    // 1. 记录点击的滑块
    this.currentHandler = handler;

    // 2. 存储当前点击位置
    // const { event } = e;
    event.stopPropagation();
    event.preventDefault();

    // 兼容移动端获取数据
    this.prevX = get(event, 'touches.0.pageX', event.x);

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

    // 因为存储的 start、end 可能不一定是按大小存储的，所以排序一下，对外是 end >= start
    this.graph.emit(VALUE_CHANGE, {value: [this.start, this.end].sort()});
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
        return Math.abs(this.tickPosList[i] - timeSelectX) < Math.abs(timeSelectX - this.tickPosList[i + 1])
          ? i
          : i + 1;
      }
    }
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

  private updateStartEnd(offsetRange: number) {
    // 操作不同的组件，反馈不一样
    switch (this.currentHandler) {
      case this.minHandlerShape:
        this.start += offsetRange;
        const minTick = this.adjustTickIndex(this.start * this.width)
        this.minText = this.ticks[minTick]
        break;
      case this.maxHandlerShape:
        this.end += offsetRange;
        const maxTick = this.adjustTickIndex(this.end * this.width)
        this.maxText = this.ticks[maxTick]
        break;
      case this.foregroundShape:
        this.start += offsetRange;
        this.end += offsetRange;
        const minRangeTick = this.adjustTickIndex(this.start * this.width)
        const maxRangeTick = this.adjustTickIndex(this.end * this.width)
        this.minText = this.ticks[minRangeTick]
        this.maxText = this.ticks[maxRangeTick]
        break;
    }
  }

  /**
   * 根据移动的比例来更新 ui
   * @private
   */
  private updateUI() {
    if (this.start < 0) {
      this.start = 0
    }

    if (this.end > 1) {
      this.end = 1
    }
    const timeBarType = this.timeBarType
    const min = this.start * this.width;
    const max = this.end * this.width;
    // 1. foreground
    this.foregroundShape.attr('x', min);
    this.foregroundShape.attr('width', max - min);

    // 滑块相关的大小信息
    const handlerWidth = get(this.handlerStyle, 'width', DEFAULT_HANDLER_WIDTH);

    // 设置文本
    this.setText(this.minText, this.maxText)
    // this.minTextShape.attr('text', this.minText);
    // this.maxTextShape.attr('text', this.maxText);

    const [minAttrs, maxAttrs] = this.dodgeText([min, max]);
    // 2. 左侧滑块和文字位置
    this.minHandlerShape.setX(min - handlerWidth / 2);
    // this.minText.attr('x', min);
    each(minAttrs, (v, k) => this.minTextShape.attr(k, v));

    // 3. 右侧滑块和文字位置
    this.maxHandlerShape.setX(max - handlerWidth / 2);
    // this.maxText.attr('x', max);
    each(maxAttrs, (v, k) => this.maxTextShape.attr(k, v));
  }

  /**
   * 调整 text 的位置，自动躲避
   * 根据位置，调整返回新的位置
   * @param range
   */
  private dodgeText(range: [number, number]): [object, object] {
    const PADDING = 2;
    const handlerWidth = get(this.handlerStyle, 'width', DEFAULT_HANDLER_WIDTH);
    let minTextShape = this.minTextShape;
    let maxTextShape = this.maxTextShape;

    let [min, max] = range;
    let sorted = false;

    // 如果交换了位置，则对应的 min max 也交互
    if (min > max) {
      [min, max] = [max, min];
      [minTextShape, maxTextShape] = [maxTextShape, minTextShape];
      sorted = true;
    }

    // 避让规则，优先显示在两侧，只有显示不下的时候，才显示在中间
    const minBBox = minTextShape.getBBox();
    const maxBBox = maxTextShape.getBBox();

    let minAttrs = null
    let maxAttrs = null
    if (this.timeBarType === 'trend') {
      minAttrs =
        minBBox.width > min - PADDING
          ? { x: min + handlerWidth / 2 + PADDING, textAlign: 'left' }
          : { x: min - handlerWidth / 2 - PADDING, textAlign: 'right' };

      maxAttrs =
        maxBBox.width > this.width - max - PADDING
          ? { x: max - handlerWidth / 2 - PADDING, textAlign: 'right' }
          : { x: max + handlerWidth / 2 + PADDING, textAlign: 'left' };
    } else if (this.timeBarType === 'simple') {
      minAttrs =
        minBBox.width > min - PADDING
          ? { x: min + handlerWidth / 2 + PADDING, textAlign: 'center' }
          : { x: min - handlerWidth / 2 - PADDING, textAlign: 'center' };

      maxAttrs =
        maxBBox.width > this.width - max - PADDING
          ? { x: max - handlerWidth / 2 - PADDING, textAlign: 'center' }
          : { x: max + handlerWidth / 2 + PADDING, textAlign: 'center' };
    }

    return !sorted ? [minAttrs, maxAttrs] : [maxAttrs, minAttrs];
  }

  private startPlay() {
    return window.requestAnimationFrame(() => {
      const { controllerCfg, ticks, width } = this
      const { speed } = controllerCfg
      

      const tickInterval = width / ticks.length;
      const offsetX = tickInterval / ((speed * 1000) / 60);

      const offsetXRange = this.adjustOffsetRange(offsetX / this.width);

      this.updateStartEnd(offsetXRange)
      this.updateUI()
      // this.setTimeSelectX(offsetX);

      if (this.isPlay) {
        this.playHandler = this.startPlay();
      }
    });
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
        window.cancelAnimationFrame(this.playHandler);
        if (isSync) {
          // this.syncCurrnentTick();
          this.graph.emit(TIMELINE_END, null);
        }
      }
    }
  }
}
