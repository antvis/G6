/**
 * 基于 G 的时间轴组件
 */
import GCanvas from '@antv/g-canvas/lib/canvas';
import GSVGCanvas from '@antv/g-svg/lib/canvas';
import { ICanvas, IGroup } from '@antv/g-base';
import createDOM from '@antv/dom-util/lib/create-dom'
import { isString } from '@antv/util'
import TimeBarTooltip from './timeBarTooltip';
import ControllerBtn from './controllerBtn'
import { IGraph } from '../../interface/graph';
import { GraphData, ShapeStyle } from '../../types';

export const VALUE_CHANGE = 'valueChange';

const DEFAULT_SELECTEDTICK_STYLE = {
  fill: '#5B8FF9'
}

const DEFAULT_UNSELECTEDTICK_STYLE = {
  fill: '#e6e8e9'
}

interface TickStyle {
  fill?: string,
  stroke?: string,
  lineWidth?: number,
  opacity?: number,
  fillOpacity?: number,
  strokeOpacity?: number
}

export interface TimeBarSliceConfig extends TimeBarSliceOption {
  readonly graph: IGraph;
  readonly group: IGroup;
  readonly canvas: ICanvas;
}
export interface TimeBarSliceOption {
  // position size
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  readonly padding?: number;

  // styles
  readonly selectedTickStyle?: TickStyle;
  readonly unselectedTickStyle?: TickStyle
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

export default class TimeBarSlice {
  private graph: IGraph;
  private canvas: ICanvas;
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
  private selectedTickStyle: ShapeStyle;
  private unselectedTickStyle: ShapeStyle;
  private tickLabelFormatter: (d: any) => string | boolean;

  private tickRects: any[];
  private tickWidth: number;
  private startTickRectId: number;
  private endickRectId: number;

  private tooltipBackgroundColor: string;
  private tooltipFomatter: (d: any) => string;

  private dragging: boolean;

  public getDefaultCfgs(): TimeBarSliceConfig {
    return {
      canvas: null,
      graph: null,
      group: null,
      padding: 2,
      data: [],
      start: 0.1,
      end: 0.9,
      selectedTickStyle: {
        fill: '#5B8FF9'
      },
      unselectedTickStyle: {
        fill: '#e6e8e9'
      }
    };
  }

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
      tickLabelFormatter, 
      selectedTickStyle = DEFAULT_SELECTEDTICK_STYLE, 
      unselectedTickStyle = DEFAULT_UNSELECTEDTICK_STYLE,
      tooltipBackgroundColor,
      tooltipFomatter
    } = cfgs

    this.graph = graph
    this.sliceGroup = group.addGroup({
      name: 'slice-group'
    })
    this.canvas = canvas
    this.width = width
    this.height = height
    this.padding = padding
    this.data = data
    this.start = start
    this.end = end
    this.tickLabelFormatter = tickLabelFormatter
    this.selectedTickStyle = selectedTickStyle
    this.unselectedTickStyle = unselectedTickStyle

    this.tooltipBackgroundColor = tooltipBackgroundColor
    this.tooltipFomatter = tooltipFomatter

    this.renderSlices()
    this.initEvent()
  }

  private renderSlices() {
    const { width, height, padding, data, start, end , 
      tickLabelFormatter, selectedTickStyle, unselectedTickStyle } = this

    const realWidth = width - 2 * padding
    const fontSize = 10;
    const labelLineHeight = 4;
    const labelAreaHeight = 3 * padding + labelLineHeight + fontSize;
    const ticksAreaHeight = height - labelAreaHeight - 2 * padding;

    const gap = 2;
    const ticksLength = data.length;
    const tickWidth = (realWidth - gap * (ticksLength - 1)) / ticksLength;
    
    this.tickWidth = tickWidth

    const group = this.sliceGroup

    const tickRects = [];
    const labels = [];

    const startTickId = Math.round(ticksLength * start);
    const endTickId = Math.round(ticksLength * end);

    this.startTickRectId = startTickId
    this.endickRectId = endTickId

    data.forEach((d, i) => {
      // draw the tick rects
      const selected = i >= startTickId && i <= endTickId;
      const tickStyle = selected ? selectedTickStyle : unselectedTickStyle
      const rect = group.addShape('rect', {
        attrs: {
          x: padding + i * (tickWidth + gap),
          y: padding,
          width: tickWidth,
          height: ticksAreaHeight,
          ...tickStyle
        },
        draggable: true,
        name: `tick-rect-${i}`
      });
      // draw the pick tick rects
      const pickRect = group.addShape('rect', {
        attrs: {
          x: padding + i * tickWidth + gap * (2 * i - 1) / 2,
          y: padding,
          width: (i === 0 || i === ticksLength - 1) ? (tickWidth + gap / 2) : (tickWidth + gap),
          height: ticksAreaHeight,
          fill: '#fff',
          opacity: 0
        },
        draggable: true,
        name: `pick-rect-${i}`
      });

      const rectBBox = rect.getBBox();
      const centerX = (rectBBox.minX + rectBBox.maxX) / 2;
      tickRects.push({
        rect,
        pickRect,
        value: d.date,
        x: centerX,
        y: rectBBox.minY
      });

      let label = undefined;
      if (tickLabelFormatter) {
        label = tickLabelFormatter(d);
        if (!isString(label) && label) { // return true
          label = d.date;
        }
      } else if (i % Math.round(ticksLength / 10) === 0) {
        label = d.date;
      }
      if (label) {
        labels.push(label);

        // draw tick lines
        const lineStartY = rectBBox.maxY + padding * 2;
        group.addShape('line', {
          attrs: {
            stroke: '#BFBFBF',
            x1: centerX,
            y1: lineStartY,
            x2: centerX,
            y2: lineStartY + labelLineHeight
          }
        });

        const labelStartY = lineStartY + labelLineHeight + padding;
        const text = group.addShape('text', {
          attrs: {
            fill: '#8c8c8c',
            stroke: '#fff',
            lineWidth: 1,
            x: centerX,
            y: labelStartY,
            textAlign: 'center',
            text: label,
            textBaseline: 'top',
            fontSize: 10
          },
          capture: false
        });
        const textBBox = text.getBBox();
        if (textBBox.maxX > width) {
          text.attr('textAlign', 'right');
        } else if (textBBox.minX < 0) {
          text.attr('textAlign', 'left');
        }
        // draw tick labels
      }
    });

    this.tickRects = tickRects

    // 渲染播放、快进和后退的控制按钮
    new ControllerBtn({
      group: this.sliceGroup,
      x: 0,
      y: height,
      width,
      height: 35,
      hiddleToggle: true,
    })
  }

  private initEvent() {

    const group = this.sliceGroup;

    group.on('click', e => {
      const targetRect = e.target;
      if (targetRect.get('type') !== 'rect' || !targetRect.get('name')) return;
      const id = parseInt(targetRect.get('name').split('-')[2]);
      
      if (!isNaN(id)) {
        const tickRects = this.tickRects
        // cancel the selected ticks
        const unselectedTickStyle = this.unselectedTickStyle
        tickRects.forEach(tickRect => {
          tickRect.rect.attr(unselectedTickStyle);
        })

        const selectedTickStyle = this.selectedTickStyle
        tickRects[id].rect.attr(selectedTickStyle);
        this.startTickRectId = id
        this.endickRectId = id
        
        const ticksLength = tickRects.length;
        const start = id / ticksLength;
        // this.filterData({ value: [start, start] });
        this.graph.emit(VALUE_CHANGE, { value: [start, start] })
      }
    });
    group.on('dragstart', e => {
      const tickRects = this.tickRects
      // cancel the selected ticks
      const unselectedTickStyle = this.unselectedTickStyle
      tickRects.forEach(tickRect => {
        tickRect.rect.attr(unselectedTickStyle);
      })
      const targetRect = e.target;
      const id = parseInt(targetRect.get('name').split('-')[2]);
      const selectedTickStyle = this.selectedTickStyle
      tickRects[id].rect.attr(selectedTickStyle);
      
      this.startTickRectId = id

      const ticksLength = tickRects.length;
      const start = id / ticksLength;
      // this.filterData({ value: [start, start] });
      this.graph.emit(VALUE_CHANGE, { value: [start, start] })

      this.dragging = true
    });
    group.on('dragover', e => {
      if (!this.dragging) return;
      if (e.target.get('type') !== 'rect') return;

      const id = parseInt(e.target.get('name').split('-')[2]);
      const startTickRectId = this.startTickRectId
      const tickRects = this.tickRects
      const selectedTickStyle = this.selectedTickStyle
      const unselectedTickStyle = this.unselectedTickStyle
      for (let i = 0; i < tickRects.length; i++) {
        const style = i >= startTickRectId && i <= id ? selectedTickStyle : unselectedTickStyle;
        tickRects[i].rect.attr(style);
      }
      const ticksLength = tickRects.length;
      this.endickRectId = id
      
      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      // this.filterData({ value: [start, end] });
      this.graph.emit(VALUE_CHANGE, { value: [start, end] })
    });

    group.on('drop', e => {
      if (!this.dragging) return;
      
      this.dragging = false

      if (e.target.get('type') !== 'rect') return;
      const startTickRectId = this.startTickRectId
      const id = parseInt(e.target.get('name').split('-')[2]);
      if (id < startTickRectId) return;

      const selectedTickStyle = this.selectedTickStyle
      const tickRects = this.tickRects
      tickRects[id].rect.attr(selectedTickStyle);
      
      this.endickRectId = id
      const ticksLength = tickRects.length;
      const start = startTickRectId / ticksLength;
      const end = id / ticksLength;
      // this.filterData({ value: [start, end] });
      this.graph.emit(VALUE_CHANGE, { value: [start, end] })
    });

    // tooltip
    const { tooltipBackgroundColor, tooltipFomatter, canvas } = this
    const tooltip = new TimeBarTooltip({
      container: canvas.get('container') as HTMLElement,
      backgroundColor: tooltipBackgroundColor
    });
    const tickRects = this.tickRects
    tickRects.forEach(tickRect => {
      const pickRect = tickRect.pickRect;
      pickRect.on('mouseenter', e => {
        const rect = e.target;
        if (rect.get('type') !== 'rect') return;
        const id = parseInt(rect.get('name').split('-')[2]);
        const clientPoint = canvas.getClientByPoint(tickRects[id].x, tickRects[id].y)
        tooltip.show({
          x: tickRects[id].x,
          y: tickRects[id].y,
          clientX: clientPoint.x,
          clientY: clientPoint.y,
          text: tooltipFomatter ? tooltipFomatter(tickRects[id].value) : tickRects[id].value
        })
      });
      pickRect.on('mouseleave', e => {
        tooltip.hide();
      })
    })
  }
}
