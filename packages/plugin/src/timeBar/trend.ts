import { IGroup } from '@antv/g-base';
import { dataToPath, linePathToAreaPath, dataToRectPath } from './path';
import { ShapeStyle } from '@antv/g6-core';

export const LINE_STYLE = {
  stroke: '#C5C5C5',
  strokeOpacity: 0.85,
};

export const AREA_STYLE = {
  fill: '#CACED4',
  opacity: 0.85,
};

export interface Interval {
  data: number[];
  style: ShapeStyle;
}

export interface TrendCfg {
  readonly group: IGroup;
  // 位置大小
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  // 数据
  readonly data?: number[];
  // 样式
  readonly smooth?: boolean;
  readonly isArea?: boolean;
  
  readonly lineStyle?: ShapeStyle;
  readonly areaStyle?: ShapeStyle;
  readonly interval?: Interval;
}

/**
 * 缩略趋势图
 */
export default class Trend {
  private group: IGroup;

  // 位置大小配置
  private x: number;

  private y: number;

  private width: number;

  private height: number;

  private barWidth: number; // 柱状图一根柱子的宽度

  private data: number[];

  private smooth: boolean;

  private isArea: boolean;

  private lineStyle: ShapeStyle;

  private areaStyle: ShapeStyle;

  private intervalConfig: Interval;

  constructor(cfg: TrendCfg) {
    const {
      x = 0,
      y = 0,
      width = 200,
      height = 26,
      smooth = true,
      isArea = false,
      data = [],
      lineStyle,
      areaStyle,
      group,
      interval = null,
    } = cfg;

    this.group = group;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.data = data;

    this.smooth = smooth;
    this.isArea = isArea;
    this.lineStyle = Object.assign({} as any, LINE_STYLE, lineStyle);
    this.areaStyle = Object.assign({} as any, AREA_STYLE, areaStyle);
    this.intervalConfig = interval;

    this.renderLine();
  }

  /**
   * 构造
   * @private
   */
  private renderLine() {
    const {
      x,
      y,
      width,
      height,
      barWidth,
      data,
      smooth,
      isArea,
      lineStyle,
      areaStyle,
    } = this;
    const trendGroup = this.group.addGroup({
      name: 'trend-group',
    });

    if (data) {
      const path = dataToPath(data, width, height, smooth);
      // 线
      trendGroup.addShape('path', {
        attrs: {
          path,
          ...lineStyle,
        },
        name: 'trend-line'
      });
      // 在 line 的基础上，绘制面积图
      if (isArea) {
        const areaPath = linePathToAreaPath(path, width, height, data);
        trendGroup.addShape('path', {
          attrs: {
            path: areaPath,
            ...areaStyle,
          },
          name: 'trend-area'
        });
      }
    }

    // 绘制柱状图📊
    if (this.intervalConfig) {
      trendGroup.addShape('path', {
        attrs: {
          path: dataToRectPath(this.intervalConfig.data, width, height, this.intervalConfig.style.barWidth),
          ...this.intervalConfig.style,
        },
        name: 'trend-interval'
      });
    }

    // 统一移动到对应的位置
    trendGroup.move(x, y);
  }

  public destory() {
    this.group.destroy();
  }
}
