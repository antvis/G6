/**
 * @file 基于 G 的播放轴组件
 */
import { Event, IGroup, IShape, ICanvas } from '@antv/g-base';
import { deepMix, findIndex, get } from '@antv/util'
import Button from './timeButton';
import { IGraph } from '../../interface/graph';
import { ShapeStyle } from '../../types';

export const TIMELINE_START = 'timelinestart';
export const TIMELINE_CHANGE = 'timelinechange';
export const TIMELINE_END = 'timelineend';

const DEFAULT_RECT_FILL = '#ccc'
const DEFAULT_RECT_STROKE = 'green'
const DEFAULT_PLAYBTN_STYLE = {
  fill: '#607889'
}

const DEFAULT_PREBTN_STYLE = {
  fill: 'red'
}

const DEFAULT_NEXTBTN_STYLE = {
  fill: 'green'
}

const PADDING_LEFT = 20;
const PADDING_RIGHT = 20;

export type ControllerCfg = Partial<{
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly fill: string;
  readonly stroke: string;
  readonly preBtnStyle: ShapeStyle;
  readonly nextBtnStyle: ShapeStyle;
  readonly playBtnStyle: ShapeStyle;
}>

export type AxisCfg = Partial<{
  fill: string;
  stroke: string;
  ratio: number;
  textStyle: ShapeStyle;
}>;

/** 播放轴配置项 */
export interface TimeLineCfg {
  readonly graph: IGraph;
  readonly canvas: ICanvas;
  readonly group: IGroup;
  // readonly rangeChange?: (graph: IGraph, min: number, max: number) => void;

  /** 播放轴位置数据 */
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  /** 刻度值 */
  readonly ticks: string[];
  /** 播放速度，1 个 tick 花费时间 */
  readonly speed?: number;
  /** 默认当前刻度值 */
  readonly defaultCurrentTick?: string;
  /** 是否循环播放 */
  readonly loop?: boolean;
  readonly controllerCfg?: ControllerCfg;
  readonly axisCfg?: AxisCfg;
}

/**
 * 参考示例
 * https://www.gapminder.org/tools/#$state$time$value=1870&delay:100;;&chart-type=bubbles
 */
export default class TimeLine {
  /** 是否处于播放状态 */
  private isPlay: boolean;
  /** 当前处于刻度值 */
  private currentTick: string;
  /** 刻度位置预处理 */
  private tickPosList: number[];

  /** 组件 */
  private timeLineButton: Button;
  private preStepButton: IShape;
  private nextStepButton: IShape;

  private timeLine: {
    x: number;
    y: number;
    width: number;
    height: number;
    shape: IShape;
    textList: IShape[];

      /** 刻度值 */
    readonly ticks: string[];
    /** 播放速度，1 个 tick 花费时间 */
    readonly speed?: number;
    /** 默认当前刻度值 */
    readonly defaultCurrentTick?: string;
    /** 是否循环播放 */
    readonly loop?: boolean;
    readonly controllerCfg?: ControllerCfg;
    readonly axisCfg: AxisCfg;
  };
  private timeSelect: IShape;
  private timeSelectText: IShape;

  /** 偏移量 */
  private prevX: number;

  /** 动画 id */
  private playHandler: number;

  private canvas: ICanvas;
  private graph: IGraph;
  private group: IGroup;

  constructor(cfg: TimeLineCfg) {
    this.timeLine = deepMix(
      {},
      {
        speed: 1,
        loop: false,
      },
      cfg
    );
    this.canvas = cfg.canvas
    this.graph = cfg.graph
    this.group = cfg.group
    this.init()
    // this.timeLine
  }

  // 更新配置
  public update(cfg: Partial<TimeLineCfg>) {
    this.timeLine = deepMix({}, this.timeLine, cfg)
    const { ticks } = this.timeLine;
    this.currentTick = ticks.includes(this.currentTick) ? this.currentTick : ticks[0];
    this.renderPlayButton();
    this.renderTimeLine();
    this.renderTimeSelect(this.currentTick);
  }

  public init() {

    const { ticks, defaultCurrentTick } = this.timeLine;

    if (ticks && ticks.length) {
      this.currentTick = ticks.includes(defaultCurrentTick) ? defaultCurrentTick : ticks[0];
      this.renderPlayButton();
      this.renderTimeLine();
      this.renderTimeSelect(this.currentTick);
      this.initEvent();
    }
  }

  /** 获取播放键 marker path */
  private getNextMarkerPath(x, y, len) {
    // const len = r * 0.5;
    // return [
    //   ['M', x - len / Math.sqrt(2) / 2, y - len / 2],
    //   ['L', x + len / Math.sqrt(2), y],
    //   ['L', x - len / Math.sqrt(2) / 2, y + len / 2],
    // ];
    return [
      ['M', x, y - len],
      ['L', x + len, y],
      ['L', x, y + len],
    ];
  }

  private getPreMarkerPath(x, y, len) {
    return [
      ['M', x, y - len],
      ['L', x - len, y],
      ['L', x, y + len],
    ];
  }

  private renderPlayButton() {
    const { controllerCfg } = this.timeLine;
    const { width, height, x, y, 
      fill = DEFAULT_RECT_FILL, stroke = DEFAULT_RECT_STROKE, 
      playBtnStyle = DEFAULT_PLAYBTN_STYLE, 
      preBtnStyle = DEFAULT_PREBTN_STYLE, 
      nextBtnStyle = DEFAULT_NEXTBTN_STYLE } = controllerCfg
    const r = height / 2 - 5;
    const realY = y + 10

    // 绘制最外层的矩形包围框
    this.group.addShape('rect', {
      attrs: {
        x,
        y: realY,
        width,
        height,
        stroke,
        fill
      }
    })

    if (this.timeLineButton) {
      this.timeLineButton.update({
        x: width / 2,
        y: realY,
        r,
      });
    } else {
      this.timeLineButton = new Button({
        group: this.group,
        x: width / 2,
        y: realY + r + 5,
        r,
        isPlay: this.isPlay,
        style: playBtnStyle
      });
    }

    // 点击前进按钮
    this.preStepButton = this.group.addShape('circle', {
      attrs: {
        x: width / 2 - 5 * r,
        y: realY + r + 5,
        r,
        ...preBtnStyle
      },
      name: 'preStepBtn'
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 5 * r, realY + r + 5, r * 0.5),
        fill: '#fff'
      },
      capture: false
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getPreMarkerPath(width / 2 - 4.5 * r, realY + r + 5, r * 0.5),
        fill: '#fff'
      },
      capture: false
    })

    // 点击后退按钮
    this.nextStepButton = this.group.addShape('circle', {
      attrs: {
        x: width / 2 + 5 * r,
        y: realY + r + 5,
        r,
        ...nextBtnStyle
      },
      name: 'nextStepBtn'
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 5 * r, realY + r + 5, r * 0.5),
        fill: '#fff'
      },
      capture: false
    })
    this.group.addShape('path', {
      attrs: {
        path: this.getNextMarkerPath(width / 2 + 4.5 * r, realY + r + 5, r * 0.5),
        fill: '#fff'
      },
      capture: false
    })
  }

  private getTimeLinePath() {
    const { x, y, width, height } = this.timeLine;
    const r = height / 2;

    if (width > 0) {
      return (
        `M${x}, ${y}` +
        `A${r},${r} 90 0,0 ${x},${y + height}` +
        `L${x + width}, ${y + height}` +
        `A${r},${r} 90 0,0 ${x + width},${y}` +
        `L${x}, ${y}`
      );
    }

    return [];
  }

  private renderTimeLine() {
    const { width, height, ticks, x, y } = this.timeLine;

    if (!this.timeLine) {
      this.timeLine = {} as any;
    }

    /** 默认高度是真实高度 15% */
    this.timeLine.height = height * 0.15;
    this.timeLine.x = x + height / 2;
    this.timeLine.y = y + this.timeLine.height + 10
    this.timeLine.width = width - this.timeLine.x - PADDING_RIGHT;

    if (this.timeLine && this.timeLine.shape) {
      this.timeLine.shape.attr('path', this.getTimeLinePath());
    } else {
      this.timeLine.shape = this.group.addShape('path', {
        attrs: {
          path: this.getTimeLinePath(),
          fill: '#607889',
          opacity: 0.2,
          stroke: 'red'
        },
      });
    }

    const interval = this.timeLine.width / (ticks.length - 1);
    this.tickPosList = [];
    if (this.timeLine.textList && this.timeLine.textList.length) {
      this.timeLine.textList.forEach((text) => {
        text.destroy();
      });
    }
    let lastX = -Infinity;
    this.timeLine.textList = ticks.map((tick, index) => {
      this.tickPosList.push(this.timeLine.x + index * interval);

      const text = this.group.addShape('text', {
        attrs: {
          x: this.timeLine.x + index * interval,
          y: this.timeLine.y + this.timeLine.height + 5,
          text: tick,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#607889',
          opacity: 0.35,
        },
      });

      const bbox = text.getBBox();

      // 抽样，标签与标签间距不小于 10
      if (bbox.minX > lastX) {
        text.show();
        lastX = bbox.minX + bbox.width + 10;
      } else {
        text.hide();
      }

      return text;
    });
  }

  private renderTimeSelect(tickValue: string) {
    const { ticks, height } = this.timeLine;
    const interval = this.timeLine.width / (ticks.length - 1);
    const index = findIndex(ticks, (tick) => tick === tickValue);
    const x = this.timeLine.x + index * interval;
    const r = height
    const y = this.timeLine.y + r / 2 /// 2 + height;

    if (this.timeSelect) {
      this.timeSelect.attr('x', x);
      this.timeSelect.attr('y', y);
      this.timeSelect.attr('r', r);
    } else {
      this.timeSelect = this.group.addShape('circle', {
        attrs: {
          x,
          y,
          r,
          fill: '#607889',
        },
      });
    }

    if (this.timeSelectText) {
      this.timeSelectText.attr('x', x);
      this.timeSelectText.attr('y', y - height * 0.15 - 14);
      this.timeSelectText.attr('text', this.currentTick);
    } else {
      this.timeSelectText = this.group.addShape('text', {
        attrs: {
          x,
          y: y - height - 14,
          text: this.currentTick,
          textAlign: 'center',
          textBaseline: 'top',
          fill: '#607889',
        },
      });
    }
  }

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

  /** 拖动或自动播放过程中，设置 TimeSelect 的位置 */
  private setTimeSelectX(offsetX: number) {
    let timeSelectX = this.timeSelect.attr('x') + offsetX;
    // 防止左右溢出
    if (timeSelectX < this.timeLine.x) {
      timeSelectX = this.timeLine.x;
    }
    if (timeSelectX > this.timeLine.x + this.timeLine.width) {
      timeSelectX = this.timeLine.x + this.timeLine.width;
      // 正在播放场景
      if (this.isPlay) {
        // 如果是循环
        if (this.timeLine.loop) {
          // 当前滑动点已经处于最后一个 tick 上，才能重置回去，继续循环
          if (this.timeSelect.attr('x') === this.timeLine.x + this.timeLine.width) {
            timeSelectX = this.timeLine.x;
          }
        } else {
          this.isPlay = false;
          this.changePlayStatus();
        }
      }
    }
    this.timeSelect.attr('x', timeSelectX);
    this.timeSelectText.attr('x', timeSelectX);

    const index = this.adjustTickIndex(timeSelectX);
    if (this.currentTick !== this.timeLine.ticks[index]) {
      this.currentTick = this.timeLine.ticks[index];
      this.timeSelectText.attr('text', this.currentTick);
      this.graph.emit(TIMELINE_CHANGE, this.currentTick);
    }
  }

  /** 同步圆点到 currnentTick */
  private syncCurrnentTick() {
    const { ticks } = this.timeLine;
    const interval = this.timeLine.width / (ticks.length - 1);
    const index = findIndex(ticks, (tick) => tick === this.currentTick);
    const x = this.timeLine.x + index * interval;
    this.timeSelect.attr('x', x);
    this.timeSelectText.attr('x', x);
  }

  private onTimeSelectMouseMove = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const x = get(e, 'touches.0.pageX', e.pageX);
    const offsetX = x - this.prevX;

    this.setTimeSelectX(offsetX);

    this.prevX = x;
  };

  private onTimeSelectMouseUp = (e: Event) => {
    this.syncCurrnentTick();

    this.graph.emit(TIMELINE_END, null);

    // 取消事件
    const containerDOM = this.canvas.get('container');
    if (containerDOM) {
      containerDOM.removeEventListener('mousemove', this.onTimeSelectMouseMove);
      containerDOM.removeEventListener('mouseup', this.onTimeSelectMouseUp);
      // 防止滑动到 canvas 外部之后，状态丢失
      containerDOM.removeEventListener('mouseleave', this.onTimeSelectMouseUp);
      // 移动端事件
      containerDOM.removeEventListener('touchmove', this.onTimeSelectMouseMove);
      containerDOM.removeEventListener('touchend', this.onTimeSelectMouseUp);
      containerDOM.removeEventListener('touchcancel', this.onTimeSelectMouseUp);
    }
  };

  private onTimeSelectMouseDown = (e: Event) => {
    // const { event } = e;
    e.stopPropagation();
    e.preventDefault();

    if (this.isPlay === false) {
      this.graph.emit(TIMELINE_START, null);
    } else {
      // 取消播放状态
      this.isPlay = false;
      // 拖动过程中的播放暂停不需要调整 tick 位置，防止偏移
      this.changePlayStatus(false);
    }

    this.prevX = get(e, 'touches.0.pageX', e.clientX);

    // 开始滑动的时候，绑定 move 和 up 事件
    const containerDOM = this.canvas.get('container');
    containerDOM.addEventListener('mousemove', this.onTimeSelectMouseMove);
    containerDOM.addEventListener('mouseup', this.onTimeSelectMouseUp);
    containerDOM.addEventListener('mouseleave', this.onTimeSelectMouseUp);
    // 移动端事件
    containerDOM.addEventListener('touchmove', this.onTimeSelectMouseMove);
    containerDOM.addEventListener('touchend', this.onTimeSelectMouseUp);
    containerDOM.addEventListener('touchcancel', this.onTimeSelectMouseUp);
  };

  private startPlay() {
    return window.requestAnimationFrame(() => {
      const { speed, ticks, width } = this.timeLine

      const tickInterval = width / ticks.length;
      const offsetX = tickInterval / ((speed * 1000) / 60);

      this.setTimeSelectX(offsetX);

      if (this.isPlay) {
        this.playHandler = this.startPlay();
      }
    });
  }

  private changePlayStatus(isSync = true) {
    this.timeLineButton.update({
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
          this.syncCurrnentTick();
          this.graph.emit(TIMELINE_END, null);
        }
      }
    }
  }

  private initEvent() {
    /** 播放/暂停事件 */
    this.group.on('playPauseBtn:click', () => {
      this.isPlay = !this.isPlay;
      this.changePlayStatus();
    })

    // 处理前进一步的事件
    this.group.on('nextStepBtn:click', () => {
      this.nextStepButton.attr('fill', 'green')
      const { width, ticks } = this.timeLine;
      const index = findIndex(ticks, (tick) => tick === this.currentTick);
      const offsetX = width / (ticks.length - 1);
      this.setTimeSelectX(offsetX);

      if (index === ticks.length - 2) {
        this.preStepButton.attr('fill', '#ccc')
      }
    })

    // 处理后退一步的事件
    this.group.on('preStepBtn:click', () => {
      this.preStepButton.attr('fill', 'red')
      const { width, ticks } = this.timeLine;
      const index = findIndex(ticks, (tick) => tick === this.currentTick);
      
      const offsetX = width / (ticks.length - 1);
      this.setTimeSelectX(-offsetX);

      if (index === 1) {
        this.nextStepButton.attr('fill', '#ccc')
      }
    })

    /** 播放轴上圆点滑动事件 */
    this.timeSelect.on('mousedown', this.onTimeSelectMouseDown);
  }

  public destroy() {
    this.group.off('playPauseBtn:click')
    this.timeSelect.off();
  }
}
