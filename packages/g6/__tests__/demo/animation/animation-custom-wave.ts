import { Circle, Group } from '@antv/g';
import { Custom } from '../../../src/animations/custom';
import type { BaseShapeStyleProps } from '../../../src/elements/shapes/base-shape';
import { BaseShape } from '../../../src/elements/shapes/base-shape';
import type { ConfigurableAnimationOptions } from '../../../src/spec/element/animation';
import type { AnimationTestCase } from '../types';

type ShapeStyleProps = BaseShapeStyleProps & { size: number; color: string };

class Shape extends BaseShape<ShapeStyleProps> {
  private getInnerStyle({ size, color, opacity }: any = this.attributes) {
    return {
      r: size / 2,
      fill: color,
      opacity,
    };
  }

  private getMiddleStyle({ size, color, opacity }: any = this.attributes) {
    return {
      r: size / 2,
      fill: color,
      opacity,
    };
  }

  private getOuterStyle({ size, color, opacity }: any = this.attributes) {
    return {
      r: size / 2,
      fill: color,
      opacity,
    };
  }

  public render(attributes: any, container: Group): void {
    this.upsert('inner', Circle, this.getInnerStyle(attributes), container);
    this.upsert('middle', Circle, this.getMiddleStyle(attributes), container);
    this.upsert('outer', Circle, this.getOuterStyle(attributes), container);
  }
}

export const animationCustomWave: AnimationTestCase = async ({ canvas }) => {
  const animation: ConfigurableAnimationOptions[] = [
    {
      fields: ['r'],
      shape: 'inner',
    },
    {
      fields: ['r'],
      shape: 'middle',
      delay: 500,
    },
    {
      fields: ['r'],
      shape: 'outer',
      delay: 1000,
    },
  ];

  const factor = Custom({
    config: animation,
    options: {},
  });

  const shape = canvas.appendChild(
    new Shape({
      style: {
        x: 100,
        y: 100,
        size: 50,
        color: '#5393f4',
        opacity: 0.5,
      },
    }),
  );

  return factor(shape, {
    effectTiming: { duration: 3000, easing: 'linear', iterations: Infinity },
    originalStyle: { ...shape.attributes, opacity: 0.5, size: 0, color: 'blue' },
    states: [],
  });
};

animationCustomWave.times = [0, 500, 1000, 1500, 2000, 3000];
