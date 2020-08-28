import { IGroup, IShape } from '@antv/g-base';
import { dataToPath, linePathToAreaPath } from './path';

export const BACKGROUND_STYLE = {
  opacity: 0.5,
};

export const LINE_STYLE = {
  stroke: '#C5C5C5',
  strokeOpacity: 0.85,
};

export const AREA_STYLE = {
  fill: '#CACED4',
  opacity: 0.85,
};

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
  readonly backgroundStyle?: object;
  readonly lineStyle?: object;
  readonly areaStyle?: object;
}

/**
 * 缩略趋势图
 */
export default class Trend {
  private group: IGroup;
  // 生成的 shape
  public backgroundShape: IShape;
  public lineShape: IShape;
  public areaShape: IShape;
  // 位置大小配置
  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private data: number[];

  private smooth: boolean;
  private isArea: boolean;
  private backgroundStyle: object;
  private lineStyle: object;
  private areaStyle: object;

  constructor(cfg: TrendCfg) {
    const {
      x = 0,
      y = 0,
      width = 200,
      height = 16,
      smooth = true,
      isArea = false,
      data = [],
      backgroundStyle,
      lineStyle,
      areaStyle,
      group
    } = cfg;

    this.group = group

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.data = data;

    this.smooth = smooth;
    this.isArea = isArea;
    this.backgroundStyle = Object.assign({} as any, BACKGROUND_STYLE, backgroundStyle);
    this.lineStyle = Object.assign({} as any, LINE_STYLE, lineStyle);
    this.areaStyle = Object.assign({} as any, AREA_STYLE, areaStyle);

    this.renderLine();
  }

  /**
   * 构造
   * @private
   */
  private renderLine() {
    debugger
    const { x, y, width, height, data, smooth, isArea, backgroundStyle, lineStyle, areaStyle } = this;
    const trendGroup = this.group.addGroup({
      name: 'trend-group'
    })
    debugger
    // 背景
    this.backgroundShape = trendGroup.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        ...backgroundStyle,
      },
    });

    const path = dataToPath(data, width, height, smooth);
    // 线
    this.lineShape = trendGroup.addShape('path', {
      attrs: {
        path,
        ...lineStyle,
      },
    });

    // area
    // 在 path 的基础上，增加两个坐标点
    const areaPath = linePathToAreaPath(path, width, height, data);
    if (isArea) {
      this.areaShape = trendGroup.addShape('path', {
        attrs: {
          path: areaPath,
          ...areaStyle,
        },
      });
    }

    // 统一移动到对应的位置
    trendGroup.move(x, y);
  }
}
