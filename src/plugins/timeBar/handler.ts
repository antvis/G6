import { IGroup, IShape } from '@antv/g-base';
import { isNumber } from '@antv/util'

interface IStyle {
  fill?: string;
  stroke?: string;
  radius?: number;
  opacity?: number;
  cursor?: string;
  highLightFill?: string;
}

export interface HandlerCfg {
  group: IGroup;
  name: string;
  // position size
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  // style
  readonly style?: IStyle;
}

const DEFAULT_STYLE = {
  fill: '#F7F7F7',
  stroke: '#BFBFBF',
  radius: 2,
  opacity: 1,
  cursor: 'ew-resize',
  // 高亮的颜色
  highLightFill: '#FFF',
};

export default class Handler {

  // handle容器
  private group: IGroup;
  private name: string;

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private style: IStyle;

  // 组件
  private background: IShape;

  constructor(cfg: HandlerCfg) {

    const { group, name, x = 0, y = 0, width = 10, height = 24, style = {} } = cfg;

    this.group = group
    this.name = name
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.style = { ...DEFAULT_STYLE, ...style };

    this.renderHandle();
  }

  /**
   * 设置位置 x
   * @param x
   */
  public setX(x: number) {
    this.setXY(x, undefined);
  }

  /**
   * 设置位置 y
   * @param y
   */
  public setY(y: number) {
    this.setXY(undefined, y);
  }

  public setXY(x: number, y: number) {
    if (isNumber(x)) { this.x = x; }
    if (isNumber(y)) { this.y = y; }

    this.updateXY();
  }

  /**
   * 初始化组件
   * @private
   */
  private renderHandle() {

    const { width, height, style, name } = this;
    const { fill, stroke, radius, opacity, cursor } = style;

    // 按钮框框
    this.background = this.group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width,
        height,
        fill,
        stroke,
        radius,
        opacity,
        cursor,
      },
      name: `${name}-rect`
    });

    // 两根竖线
    const x1 = 1 / 3 * width;
    const x2 = 2 / 3 * width;

    const y1 = 1 / 4 * height;
    const y2 = 3 / 4 * height;

    this.group.addShape('line', {
      attrs: {
        x1,
        y1,
        x2: x1,
        y2,
        stroke,
        cursor,
      },
      capture: false
      // name
    });

    this.group.addShape('line', {
      attrs: {
        x1: x2,
        y1,
        x2,
        y2,
        stroke,
        cursor,
      },
      capture: false
      // name
    });

    // 移动到对应的位置
    this.updateXY();

    this.bindEvents();
  }

  private bindEvents() {
    const { name } = this;
    this.group.on(`${name}-rect:mouseenter`, () => {
      const { highLightFill } = this.style;
      this.background.attr('fill', highLightFill);
    });

    this.group.on(`${name}-rect:mouseleave`, () => {
      const { fill } = this.style;
      this.background.attr('fill', fill);
    });
  }

  private updateXY() {
    this.group.setMatrix([1, 0, 0, 0, 1, 0, this.x, this.y, 1])
  }
}
