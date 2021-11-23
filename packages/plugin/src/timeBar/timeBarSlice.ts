/**
 * 基于 G 的刻度时间轴组件
 */
import { ext } from '@antv/matrix-util';
import { ICanvas, IGroup } from '@antv/g-base';
import { isNumber, isString } from '@antv/util';
import { ShapeStyle, IAbstractGraph as IGraph } from '@antv/g6-core';
import TimeBarTooltip from './timeBarTooltip';
import ControllerBtn from './controllerBtn';
import {
  VALUE_CHANGE,
  TIMELINE_START,
  TIMELINE_END,
  PLAY_PAUSE_BTN,
  NEXT_STEP_BTN,
  PRE_STEP_BTN,
  TIMEBAR_CONFIG_CHANGE,
} from './constant';

const transform = ext.transform;

const DEFAULT_SELECTEDTICK_STYLE = {
  fill: '#5B8FF9',
};

const DEFAULT_UNSELECTEDTICK_STYLE = {
  fill: '#e6e8e9',
};

export interface TimeBarSliceOption {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  // styles
  readonly selectedTickStyle?: ShapeStyle;
  readonly unselectedTickStyle?: ShapeStyle;
  readonly tooltipBackgroundColor?: string;

  readonly start?: number;
  readonly end?: number;

  // 数据
  readonly data: {
    date: string;
    value: string;
  }[];

  // 自定义标签格式化函数
  readonly tickLabelFormatter?: (d: any) => string | boolean;
  // 自定义 tooltip 内容格式化函数
  readonly tooltipFomatter?: (d: any) => string;
}

export interface TimeBarSliceConfig extends TimeBarSliceOption {
  readonly graph: IGraph;
  readonly group: IGroup;
  readonly canvas: ICanvas;
  // style
  readonly x: number;
  readonly y: number;
  readonly tickLabelStyle?: Object;
}

export default class TimeBarSlice {
  private graph: IGraph;

  private canvas: ICanvas;

  private group: IGroup;

  private sliceGroup: IGroup;

  private width: number;

  private height: number;

  private padding: number;

  private data: {
    date: string;
    value: string;
  }[];

  private start: number;

  private end: number;

  // style
  public x: number;

  public y: number;

  private selectedTickStyle: ShapeStyle;

  private unselectedTickStyle: ShapeStyle;

  private tickLabelFormatter: (d: any) => string | boolean;

  private tickLabelStyle?: ShapeStyle;

  private tickRects: any[];

  private tickWidth: number;

  private startTickRectId: number;

  private endTickRectId: number;

  private tooltipBackgroundColor: string;

  private tooltipFomatter: (d: any) => string;

  private dragging: boolean;

  // play controller
  private controllerBtnGroup: ControllerBtn;

  /** 是否处于播放状态 */
  private isPlay: boolean;

  // 调整后的播放速度
  private currentSpeed: number;

  /** 动画 id */
  private playHandler: number;

  private frameCount: number = 0;

  private fontFamily: string = 'Arial, sans-serif';

  constructor(cfgs?: TimeBarSliceConfig) {
    const {
      graph,
      canvas,
      group,
      width,
      height,
      padding,
      data,
      start,
      end,
      x = 0,
      y = 0,
      tickLabelFormatter,
      selectedTickStyle = DEFAULT_SELECTEDTICK_STYLE,
      unselectedTickStyle = DEFAULT_UNSELECTEDTICK_STYLE,
      tooltipBackgroundColor,
      tooltipFomatter,
      tickLabelStyle
    } = cfgs;

    this.graph = graph;
    this.group = group;
    this.sliceGroup = group.addGroup({
      name: 'slice-group',
    });
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.data = data;
    this.start = start;
    this.end = end;
    this.tickLabelFormatter = tickLabelFormatter;
    this.tickLabelStyle = tickLabelStyle || {};
    this.selectedTickStyle = selectedTickStyle;
    this.unselectedTickStyle = unselectedTickStyle;

    this.x = x;
    this.y = y;

    this.tooltipBackgroundColor = tooltipBackgroundColor;
    this.tooltipFomatter = tooltipFomatter;

    // 初始化 fontFamily，如果有浏览器，取 body 上的字体，防止文字更新时局部渲染造成的重影
    this.fontFamily =
      typeof window !== 'undefined'
        ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
          'Arial, sans-serif'
        : 'Arial, sans-serif';

    this.renderSlices();
    this.initEvent();
  }

  private renderSlices() {
    const {
      width,
      height,
      padding,
      data,
      start,
      end,
      tickLabelFormatter,
      selectedTickStyle,
      unselectedTickStyle,
      tickLabelStyle
    } = this;

    const realWidth = width - 2 * padding;
    const fontSize = 10;
    const labelLineHeight = 4;
    const labelAreaHeight = 3 * padding + labelLineHeight + fontSize;
    const ticksAreaHeight = height - labelAreaHeight - 2 * padding;

    const gap = 2;
    const ticksLength = data.length;
    const tickWidth = (realWidth - gap * (ticksLength - 1)) / ticksLength;

    this.tickWidth = tickWidth;

    const sliceGroup = this.sliceGroup;

    const tickRects = [];
    const labels = [];

    const startTickId = Math.round(ticksLength * start);
    const endTickId = Math.round(ticksLength * end);

    this.startTickRectId = startTickId;
    this.endTickRectId = endTickId;

    const rotate = tickLabelStyle.rotate;
    delete tickLabelStyle.rotate;
    data.forEach((d, i) => {
      // draw the tick rects
      const selected = i >= startTickId && i <= endTickId;
      const tickStyle = selected ? selectedTickStyle : unselectedTickStyle;
      const rect = sliceGroup.addShape('rect', {
        attrs: {
          x: padding + i * (tickWidth + gap),
          y: padding,
          width: tickWidth,
          height: ticksAreaHeight,
          ...tickStyle,
        },
        draggable: true,
        name: `tick-rect-${i}`,
      });
      // draw the pick tick rects
      const pickRect = sliceGroup.addShape('rect', {
        attrs: {
          x: padding + i * tickWidth + (gap * (2 * i - 1)) / 2,
          y: padding,
          width: i === 0 || i === ticksLength - 1 ? tickWidth + gap / 2 : tickWidth + gap,
          height: ticksAreaHeight,
          fill: '#fff',
          opacity: 0,
        },
        draggable: true,
        name: `pick-rect-${i}`,
      });
      pickRect.toFront();

      const rectBBox = rect.getBBox();
      const centerX = (rectBBox.minX + rectBBox.maxX) / 2;
      tickRects.push({
        rect,
        pickRect,
        value: d.date,
        x: centerX,
        y: rectBBox.minY,
      });

      let label;
      if (tickLabelFormatter) {
        label = tickLabelFormatter(d);
        if (!isString(label) && label) {
          // return true
          label = d.date;
        }
      } else if (i % Math.round(ticksLength / 10) === 0) {
        label = d.date;
      }
      if (label) {
        labels.push(label);

        // draw tick lines
        const lineStartY = rectBBox.maxY + padding * 2;
        sliceGroup.addShape('line', {
          attrs: {
            stroke: '#BFBFBF',
            x1: centerX,
            y1: lineStartY,
            x2: centerX,
            y2: lineStartY + labelLineHeight,
          },
          name: 'tick-line'
        });

        const labelStartY = lineStartY + labelLineHeight + padding;
        const text = sliceGroup.addShape('text', {
          attrs: {
            fill: '#8c8c8c',
            stroke: '#fff',
            lineWidth: 1,
            x: centerX,
            y: labelStartY,
            textAlign: 'center',
            text: label,
            textBaseline: 'top',
            fontSize: 10,
            fontFamily: this.fontFamily || 'Arial, sans-serif',
            ...tickLabelStyle
          },
          capture: false,
          name: 'tick-label'
        });
        const textBBox = text.getBBox();
        if (textBBox.maxX > width) {
          text.attr('textAlign', 'right');
        } else if (textBBox.minX < 0) {
          text.attr('textAlign', 'left');
        }
        if (isNumber(rotate) && labels.length !== 10) {
          const matrix = transform(
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [
              ['t', -centerX!, -labelStartY!],
              ['r', rotate],
              ['t', centerX - 5, labelStartY + 2],
            ],
          );
          text.attr({
            textAlign: 'left',
            matrix,
          });
        }
        if (labels.length === 1) {
          text.attr({
            textAlign: 'left',
          });
        } else if (labels.length === 10) {
          text.attr({
            textAlign: 'right',
          });
        }
        // draw tick labels
      }
    });

    this.tickRects = tickRects;

    // 渲染播放、快进和后退的控制按钮
    const group = this.group;
    this.currentSpeed = 1;
    this.controllerBtnGroup = new ControllerBtn({
      group,
      x: this.x,
      y: this.y + height + 5,
      width,
      height: 40,
      hideTimeTypeController: true,
      speed: this.currentSpeed,
      fontFamily: this.fontFamily || 'Arial, sans-serif',
    });
  }

  private initEvent() {
    const sliceGroup = this.sliceGroup;

    sliceGroup.on('click', (e) => {
      const targetRect = e.target;
      if (targetRect.get('type') !== 'rect' || !targetRect.get('name')) return;
      const id = parseInt(targetRect.get('name').split('-')[2], 10);

      if (!isNaN(id)) {
        const tickRects = this.tickRects;
        // cancel the selected ticks
        const unselectedTickStyle = this.unselectedTickStyle;
        tickRects.forEach((tickRect) => {
          tickRect.rect.attr(unselectedTickStyle);
        });

        const selectedTickStyle = this.selectedTickStyle;
        tickRects[id].rect.attr(selectedTickStyle);
        this.startTickRectId = id;
        this.endTickRectId = id;

        const ticksLength = tickRects.length;
        const start = id / ticksLength;
        this.graph.emit(VALUE_CHANGE, { value: [start, start] });
      }
    });
    sliceGroup.on('dragstart', (e) => {
      const tickRects = this.tickRects;
      // cancel the selected ticks
      const unselectedTickStyle = this.unselectedTickStyle;
      tickRects.forEach((tickRect) => {
        tickRect.rect.attr(unselectedTickStyle);
      });
      const targetRect = e.target;
      const id = parseInt(targetRect.get('name').split('-')[2], 10);
      const selectedTickStyle = this.selectedTickStyle;
      tickRects[id].rect.attr(selectedTickStyle);
      this.startTickRectId = id;

      const ticksLength = tickRects.length;
      const start = id / ticksLength;
      this.graph.emit(VALUE_CHANGE, { value: [start, start] });

      this.dragging = true;
    });
    sliceGroup.on('dragover', (e) => {
      if (!this.dragging) return;
      if (e.target.get('type') !== 'rect') return;

      const id = parseInt(e.target.get('name').split('-')[2], 10);
      const startTickRectId = this.startTickRectId;
      const tickRects = this.tickRects;
      const selectedTickStyle = this.selectedTickStyle;
      const unselectedTickStyle = this.unselectedTickStyle;
      for (let i = 0; i < tickRects.length; i++) {
        const style = i >= startTickRectId && i <= id ? selectedTickStyle : unselectedTickStyle;
        tickRects[i].rect.attr(style);
      }
      const ticksLength = tickRects.length;
      this.endTickRectId = id;

      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      this.graph.emit(VALUE_CHANGE, { value: [start, end] });
    });

    sliceGroup.on('drop', (e) => {
      if (!this.dragging) return;

      this.dragging = false;

      if (e.target.get('type') !== 'rect') return;
      const startTickRectId = this.startTickRectId;
      const id = parseInt(e.target.get('name').split('-')[2], 10);
      if (id < startTickRectId) return;

      const selectedTickStyle = this.selectedTickStyle;
      const tickRects = this.tickRects;
      tickRects[id].rect.attr(selectedTickStyle);

      this.endTickRectId = id;
      const ticksLength = tickRects.length;
      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      this.graph.emit(VALUE_CHANGE, { value: [start, end] });
    });

    // tooltip
    const { tooltipBackgroundColor, tooltipFomatter, canvas } = this;
    const tooltip = new TimeBarTooltip({
      container: canvas.get('container') as HTMLElement,
      backgroundColor: tooltipBackgroundColor,
    });
    const tickRects = this.tickRects;
    tickRects.forEach((tickRect) => {
      const pickRect = tickRect.pickRect;
      pickRect.on('mouseenter', (e) => {
        const rect = e.target;
        if (rect.get('type') !== 'rect') return;
        const id = parseInt(rect.get('name').split('-')[2], 10);
        const clientPoint = canvas.getClientByPoint(tickRects[id].x, tickRects[id].y);
        tooltip.show({
          x: tickRects[id].x,
          y: tickRects[id].y,
          clientX: clientPoint.x,
          clientY: clientPoint.y,
          text: tooltipFomatter ? tooltipFomatter(tickRects[id].value) : tickRects[id].value,
        });
      });
      pickRect.on('mouseleave', (e) => {
        tooltip.hide();
      });
    });

    // play controller events
    const group = this.group;
    // 播放区按钮控制
    /** 播放/暂停事件 */
    group.on(`${PLAY_PAUSE_BTN}:click`, () => {
      this.isPlay = !this.isPlay;
      this.changePlayStatus();
    });

    // 处理前进一步的事件
    group.on(`${NEXT_STEP_BTN}:click`, () => {
      this.updateStartEnd(1);
    });

    // 处理后退一步的事件
    group.on(`${PRE_STEP_BTN}:click`, () => {
      this.updateStartEnd(-1);
    });

    group.on(TIMEBAR_CONFIG_CHANGE, ({ type, speed }) => {
      this.currentSpeed = speed;
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
        if (typeof window !== 'undefined') window.cancelAnimationFrame(this.playHandler);
        if (isSync) {
          this.graph.emit(TIMELINE_END, null);
        }
      }
    }
  }

  private startPlay() {
    return typeof window !== 'undefined'
      ? window.requestAnimationFrame(() => {
          const speed = this.currentSpeed;

          // 一分钟刷新一次
          if (this.frameCount % (60 / speed) === 0) {
            this.frameCount = 0;
            this.updateStartEnd(1);
          }
          this.frameCount++;

          if (this.isPlay) {
            this.playHandler = this.startPlay();
          }
        })
      : undefined;
  }

  private updateStartEnd(sign) {
    const self = this;
    const tickRects = this.tickRects;
    const ticksLength = tickRects.length;
    const unselectedTickStyle = this.unselectedTickStyle;
    const selectedTickStyle = this.selectedTickStyle;

    const previousEndTickRectId = self.endTickRectId;

    if (sign > 0) {
      self.endTickRectId++;
    } else {
      tickRects[self.endTickRectId].rect.attr(unselectedTickStyle);
      self.endTickRectId--;
    }

    // 若此时 start 与 end 不同，范围前进/后退/播放
    if (previousEndTickRectId !== self.startTickRectId) {
      if (self.endTickRectId < self.startTickRectId) {
        self.startTickRectId = self.endTickRectId;
      }
    } else {
      // 否则是单帧的前进/后退/播放
      for (let i = self.startTickRectId; i <= self.endTickRectId - 1; i++) {
        tickRects[i].rect.attr(unselectedTickStyle);
      }
      self.startTickRectId = self.endTickRectId;
    }
    if (tickRects[self.endTickRectId]) {
      tickRects[self.endTickRectId].rect.attr(selectedTickStyle);
      const start = self.startTickRectId / ticksLength;
      const end = self.endTickRectId / ticksLength;
      this.graph.emit(VALUE_CHANGE, { value: [start, end] });
    }
  }

  public destory() {
    this.graph.off(VALUE_CHANGE);

    const group = this.sliceGroup;

    group.off('click');
    group.off('dragstart');
    group.off('dragover');
    group.off('drop');

    this.tickRects.forEach((tickRect) => {
      const pickRect = tickRect.pickRect;
      pickRect.off('mouseenter');
      pickRect.off('mouseleave');
    });

    this.tickRects.length = 0;

    group.off(`${PLAY_PAUSE_BTN}:click`);
    group.off(`${NEXT_STEP_BTN}:click`);
    group.off(`${PRE_STEP_BTN}:click`);
    group.off(TIMEBAR_CONFIG_CHANGE);

    this.sliceGroup.destroy();
  }
}
