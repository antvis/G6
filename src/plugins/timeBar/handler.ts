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
  type: 'trend' | 'simple';
  // position size
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  // style
  readonly style?: IStyle;
}

const DEFAULT_STYLE = {
  fill: '#1890ff',
  stroke: '#1890ff',
  type: 'trend',
  radius: 2,
  opacity: 1,
  cursor: 'ew-resize',
  // 高亮的颜色
  highLightFill: '#0050b3',
};

const SIMPLE_DEFAULT_STYLE = {
  fill: '#fff',
  stroke: '#1890ff',
  radius: 2,
  opacity: 1,
  cursor: 'ew-resize',
}

export default class Handler {

  // handle容器
  private group: IGroup;
  private name: string;

  private x: number;
  private y: number;
  private width: number;
  private height: number;

  private style: IStyle;
  private handleType: 'trend' | 'simple';

  // 组件
  private background: IShape;
  private handleGroup: IGroup;

  constructor(cfg: HandlerCfg) {

    const { group, name, type, x = 0, y = 0, width = 2, height = 24, style = {} } = cfg;

    this.group = group
    this.name = name
    this.handleType = type
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    if (type === 'trend') {
      this.style = { ...DEFAULT_STYLE, ...style };
    } else if (type === 'simple') {
      this.style = { ...SIMPLE_DEFAULT_STYLE, ...style }
    }

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

    this.handleGroup = this.group.addGroup()

    // 趋势图时的 handle
    if (this.handleType === 'trend') {

      // 垂直框
      this.background = this.handleGroup.addShape('rect', {
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
        name: `${name}-handler`
      });
  
      this.handleGroup.addShape('circle', {
        attrs: {
          x: width / 2,
          y: 0,
          r: 2 * width,
          fill,
          stroke,
          radius,
          opacity,
          cursor
        },
        name: `${name}-handler`
      })
  
      this.handleGroup.addShape('circle', {
        attrs: {
          x: width / 2,
          y: height,
          r: 2 * width,
          fill,
          stroke,
          radius,
          opacity,
          cursor
        },
        name: `${name}-handler`
      })
    } else if (this.handleType === 'simple') {
      this.handleGroup.addShape('circle', {
        attrs: {
          x: width / 2,
          y: height / 2,
          r: 2 * width,
          fill,
          stroke,
          radius,
          opacity,
          cursor
        },
        name: `${name}-handler`
      })
  
      this.handleGroup.addShape('circle', {
        attrs: {
          x: width / 2,
          y: height / 2,
          r: 2 * width,
          fill,
          stroke,
          radius,
          opacity,
          cursor
        },
        name: `${name}-handler`
      })
    }


    // 移动到对应的位置
    this.updateXY();

    if (this.handleType === 'trend') {
      this.bindEvents();
    }
  }

  private bindEvents() {
    const { name } = this;
    this.handleGroup.on(`${name}-handler:mouseenter`, () => {
      const { highLightFill } = this.style;
      this.background.attr('fill', highLightFill);
    });

    this.handleGroup.on(`${name}-handler:mouseleave`, () => {
      const { fill } = this.style;
      this.background.attr('fill', fill);
    });
  }

  public show() {
    this.handleGroup.show()
  }

  public hide() {
    this.handleGroup.hide()
  }

  private updateXY() {
    this.handleGroup.setMatrix([1, 0, 0, 0, 1, 0, this.x, this.y, 1])
  }
}
