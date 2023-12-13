import { LayoutAttrs } from '../../Layout/LayoutEnums';
import type { Properties as CSSProperties } from 'csstype';

export interface GShapeProps extends Partial<LayoutAttrs> {
  /**
   * @description.en-US the color used to fill the shape, support rgb(a)/hex/gradient
   * @description.zh-CN 填充图形的颜色，支持 rgb(a)/hex/G渐变色
   */
  fill?: string;
  /**
   * @description.en-US the color used to stroke the border of shape, support rgb(a)/hex/gradient
   * @description.zh-CN 图形描边的颜色，支持 rgb(a)/hex/G渐变色
   */
  stroke?: string;
  /**
   * @description.en-US width of the stroke line
   * @description.zh-CN 图形描边线的宽度
   */
  lineWidth?: string;
  /**
   * @description.en-US The lineDash of the stroke. If its type is Number[], the elements in the array are the lengths of the lineDash.
   * @description.zh-CN 描边虚线参数，数字为虚线段长度，数组时候是每一段虚线的长度。
   */
  lineDash?: number | number[];
  /**
   * @description.en-US The color of the shadow.
   * @description.zh-CN 阴影颜色
   */
  shadowColor?: string;
  /**
   * @description.en-US The blur level for shadow.
   * @description.zh-CN 阴影扩散大小
   */
  shadowBlur?: number;
  /**
   * @description.en-US The horizontal offset of the shadow.
   * @description.zh-CN 阴影的水平位移
   */
  shadowOffsetX?: number;
  /**
   * @description.en-US The vertical offset of the shadow.
   * @description.zh-CN 阴影的垂直位移
   */
  shadowOffsetY?: number;
  /**
   * @description.en-US The filling opacity (alpha value) of the shape. The priority is higher than opacity.
   * @description.zh-CN 填充颜色透明度，优先于图形透明度
   */
  fillOpacity?: number;
  /**
   * @description.en-US The stroke opacity (alpha value) of the shape. The priority is higher than opacity.
   * @description.zh-CN 描边颜色透明度，优先于图形透明度
   */
  strokeOpacity?: number;
  /**
   * @description.en-US The opacity (alpha value) of the shape.
   * @description.zh-CN 图形透明度
   */
  opacity?: number;
  /**
   * @description.en-US Cursor shape when hover on it
   * @description.zh-CN 图形上鼠标指针
   */
  cursor?: CSSProperties['cursor'];
}

export interface CommonShapeProps extends GShapeProps {
  /**
   * @description.en-US The x of the center of the Shape.
   * @description.zh-CN 图形的x坐标，定义后x绝对计算
   */
  x?: number;
  /**
   * @description.en-US The y of the center of the Shape.
   * @description.zh-CN 图形的y坐标，定义后y绝对计算
   */
  y?: number;
  /**
   * @description.en-US left margin of shape
   * @description.zh-CN 图形距离上一个元素的左间距
   */
  marginLeft?: number;
  /**
   * @description.en-US top margin of shape
   * @description.zh-CN 图形距离上一个元素的上间距
   */
  marginTop?: number;
  /**
   * @description.en-US make next shape follow inline
   * @description.zh-CN 下一个图形的定位模式，目前只能设置跟随
   */
  next?: 'inline';
}

export type GPath =
  | ['Z']
  | ['H' | 'h' | 'V' | 'v' | 'T' | 't', number]
  | ['M' | 'm' | 'L' | 'l', number, number]
  | ['S' | 's' | 'Q' | 'q', number, number, number, number]
  | ['C' | 'c', number, number, number, number, number, number]
  | ['A' | 'a', number, number, number, number, number, number, number];

export type Arrow =
  | boolean
  | {
    /**
     * SVG path string of arrow
     */
    path: string;
    /**
     * @description.en-US offset distance of the arrow
     */
    d: number;
  };
