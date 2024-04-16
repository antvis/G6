import { Path } from '@antv/g';
import { deepMix, get, isNumber } from '@antv/util';
import { getPaletteColors } from '../../utils/palette';
import { subStyleProps } from '../../utils/prefix';
import { Circle } from './circle';

import type { DisplayObjectConfig, Group } from '@antv/g';
import type { CategoricalPalette } from '../../palettes/types';
import type { CircleStyleProps } from './circle';

type Round = {
  /**
   * <zh/> 数值，用于计算比例
   *
   * <en/> Numerical value used to calculate the scale.
   */
  value?: number;
  /**
   * <zh/> 颜色
   *
   * <en/> Color.
   */
  color?: string;
  /**
   * <zh/> 其他圆弧(path)样式配置
   *
   * <en/> Other arc style configurations.
   */
  [key: string]: any;
};

export interface DonutStyleProps extends CircleStyleProps {
  innerRadius?: number;
  donuts?: Array<Round | number>[];
  palette?: string | CategoricalPalette;
}

export class Donut extends Circle {
  static defaultStyleProps: Partial<DonutStyleProps> = {
    innerRadius: 0.5,
    donuts: [],
  };

  constructor(options: DisplayObjectConfig<DonutStyleProps>) {
    super(deepMix({}, { style: Donut.defaultStyleProps }, options));
  }

  protected drawDonutShape(attributes: Required<DonutStyleProps>, container: Group): void {
    const { donuts, innerRadius, size } = attributes;

    if (!isNumber(size) || size === 0 || !donuts?.length) return;
    const { palette: defaultPalette, ...style } = subStyleProps<Required<DonutStyleProps>>(
      this.getGraphicStyle(attributes),
      'donut',
    );

    const palette = getPaletteColors(attributes?.palette || defaultPalette);
    if (!palette) return;

    // 总值
    let sum = 0;
    // 起点角度
    let angelStart = 0;

    donuts.forEach((round) => (sum += isNumber(round) ? round : get(round, ['value'], 0)));

    donuts.forEach((round, index) => {
      const {
        value = 0,
        color = palette[index % palette.length],
        ...roundStyle
      } = (isNumber(round) ? { value: round } : round) as Round;

      const r = size / 2;

      // 内径
      const radiusR = r * Math.max(0, Math.min(1, Number(innerRadius) || 0));

      // 比例
      const ratio = sum === 0 ? 1 / donuts.length : value / sum;

      // 角度
      const angel = ratio * Math.PI * 2;

      const startPoint = calculateArcEndpoint(r, angelStart);
      const innerStartPoint = calculateArcEndpoint(radiusR, angelStart);

      angelStart += angel;

      const endPoint = calculateArcEndpoint(r, angelStart);
      const innerEndPoint = calculateArcEndpoint(radiusR, angelStart);

      const isObtuse = angel > Math.PI;

      const path = [];

      // 360 度， 直接画圆
      if (angel === Math.PI * 2) {
        path.push(
          ['M', ...startPoint],
          ['A', r, r, 0, 1, 1, startPoint[0], -startPoint[1]],
          ['A', r, r, 0, 1, 1, ...startPoint],
          ['M', ...innerStartPoint],
          ['A', radiusR, radiusR, 0, 1, 0, innerStartPoint[0], -innerStartPoint[1]],
          ['A', radiusR, radiusR, 0, 1, 0, ...innerStartPoint],
          ['Z'],
        );
      } else {
        path.push(
          ['M', ...startPoint],
          ['A', r, r, 1, isObtuse ? 1 : 0, 1, ...endPoint],
          ['L', ...innerEndPoint],
          ['A', radiusR, radiusR, -1, isObtuse ? 0 : -1, -1, ...innerStartPoint],
          ['Z'],
        );
      }

      const cfg = {
        ...style,
        path,
        fill: color,
        ...roundStyle,
      };

      this.upsert(`round${index}`, Path, cfg, container);
    });
  }

  public render(attributes: Required<DonutStyleProps>, container: Group = this) {
    super.render(attributes, container);
    this.drawDonutShape(attributes, container);
  }
}

/**
 * <zh> 获得给定弧度和半径后的弧度结束点
 *
 * <en> Obtain the end point of the radian with a given radian and radius.
 * @param arcR  number
 * @param angle 弧度 [0, Math.PI*2] number
 * @returns Point
 */
const calculateArcEndpoint = (arcR: number, angle: number): number[] => [
  arcR * Math.sin(angle % (Math.PI * 2)),
  -arcR * Math.cos(angle % (Math.PI * 2)),
];
