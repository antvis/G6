import { Path } from '@antv/g';
import { isNumber, isString } from '@antv/util';
import { getPaletteColors } from '../../utils/palette';
import { subStyleProps } from '../../utils/prefix';
import { parseSize } from '../../utils/size';
import { mergeOptions } from '../../utils/style';
import { Circle } from './circle';

import type { BaseStyleProps, DisplayObjectConfig, Group } from '@antv/g';
import type { PathArray } from '@antv/util';
import type { CategoricalPalette } from '../../palettes/types';
import type { DonutRound, Prefix } from '../../types';
import type { CircleStyleProps } from './circle';

/**
 * <zh/> 甜甜圈节点样式配置项
 *
 * <en/> Donut node style props
 */
export interface DonutStyleProps extends CircleStyleProps, Prefix<'donut', BaseStyleProps> {
  /**
   * <zh/> 内环半径，使用百分比或者像素值
   *
   * <en/> Inner ring radius, using percentage or pixel value.
   * @defaultValue '50%'
   */
  innerR?: string | number;
  /**
   * <zh/> 圆环数据
   *
   * <en/> Donut data.
   */
  donuts?: number[] | DonutRound[];
  /**
   * <zh/> 颜色或者色板名
   *
   * <en/> Color or palette.
   * @defaultValue 'tableau'
   */
  donutPalette?: string | CategoricalPalette;
}

/**
 * <zh/> 甜甜圈节点
 *
 * <en/> Donut node
 */
export class Donut extends Circle {
  static defaultStyleProps: Partial<DonutStyleProps> = {
    innerR: '50%',
    donuts: [],
    donutPalette: 'tableau',
  };

  constructor(options: DisplayObjectConfig<DonutStyleProps>) {
    super(mergeOptions({ style: Donut.defaultStyleProps }, options));
  }

  private parseOuterR() {
    const { size } = this.parsedAttributes as Required<DonutStyleProps>;
    return Math.min(...parseSize(size)) / 2;
  }

  private parseInnerR() {
    const { innerR } = this.parsedAttributes as Required<DonutStyleProps>;
    return isString(innerR) ? (parseInt(innerR) / 100) * this.parseOuterR() : innerR;
  }

  protected drawDonutShape(attributes: Required<DonutStyleProps>, container: Group): void {
    const { donuts } = attributes;
    if (!donuts?.length) return;

    const parsedDonuts = donuts.map((round) => (isNumber(round) ? { value: round } : round) as DonutRound);

    const style = subStyleProps<BaseStyleProps>(this.getGraphicStyle(attributes), 'donut');

    const colors = getPaletteColors(attributes.donutPalette);
    if (!colors) return;

    const sum = parsedDonuts.reduce((acc, cur) => acc + (cur.value ?? 0), 0);
    const outerR = this.parseOuterR();
    const innerR = this.parseInnerR();

    let start = 0;
    parsedDonuts.forEach((round, index) => {
      const { value = 0, color = colors[index % colors.length], ...roundStyle } = round;
      const angle = (sum === 0 ? 1 / parsedDonuts.length : value / sum) * 360;

      this.upsert(
        `round${index}`,
        Path,
        {
          ...style,
          d: arc(outerR, innerR, start, start + angle),
          fill: color,
          ...roundStyle,
        },
        container,
      );

      start += angle;
    });
  }

  public render(attributes: Required<DonutStyleProps>, container: Group = this) {
    super.render(attributes, container);
    this.drawDonutShape(attributes, container);
  }
}

const point = (x: number, y: number, r: number, angel: number) => [x + Math.sin(angel) * r, y - Math.cos(angel) * r];

const full = (x: number, y: number, R: number, r: number): PathArray => {
  if (r <= 0 || R <= r) {
    return [['M', x - R, y], ['A', R, R, 0, 1, 1, x + R, y], ['A', R, R, 0, 1, 1, x - R, y], ['Z']];
  }
  return [
    ['M', x - R, y],
    ['A', R, R, 0, 1, 1, x + R, y],
    ['A', R, R, 0, 1, 1, x - R, y],
    ['Z'],
    ['M', x + r, y],
    ['A', r, r, 0, 1, 0, x - r, y],
    ['A', r, r, 0, 1, 0, x + r, y],
    ['Z'],
  ];
};

const part = (x: number, y: number, R: number, r: number, start: number, end: number): PathArray => {
  const [s, e] = [(start / 360) * 2 * Math.PI, (end / 360) * 2 * Math.PI];
  const P = [point(x, y, r, s), point(x, y, R, s), point(x, y, R, e), point(x, y, r, e)];
  const flag = e - s > Math.PI ? 1 : 0;
  return [
    ['M', P[0][0], P[0][1]],
    ['L', P[1][0], P[1][1]],
    ['A', R, R, 0, flag, 1, P[2][0], P[2][1]],
    ['L', P[3][0], P[3][1]],
    ['A', r, r, 0, flag, 0, P[0][0], P[0][1]],
    ['Z'],
  ];
};

const arc = (R = 0, r = 0, start: number, end: number): PathArray => {
  const [x, y] = [0, 0];
  if (Math.abs(start - end) % 360 < 0.000001) return full(x, y, R, r);
  return part(x, y, R, r, start, end);
};
