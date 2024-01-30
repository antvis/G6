import { Circle, Group } from '@antv/g';
import { Custom } from '../../../src/animations/custom';
import type { BaseShapeStyleProps } from '../../../src/elements/shapes/base-shape';
import { BaseShape } from '../../../src/elements/shapes/base-shape';
import type { ConfigurableAnimationOptions } from '../../../src/spec/element/animation';
import type { AnimationTestCase } from '../types';

type ShapeStyleProps = BaseShapeStyleProps & { size: number; color: string };

class Shape extends BaseShape<ShapeStyleProps> {
  private getKeyStyle({ size, color }: any = this.attributes) {
    return {
      r: size / 2,
      fill: color,
    };
  }

  private getHaloStyle({ size, color }: any = this.attributes) {
    return {
      r: size / 2 + 2,
      fill: 'transparent',
      stroke: color,
      lineWidth: 4,
      strokeOpacity: 0.6,
    };
  }

  public render(attributes: any, container: Group): void {
    this.upsert('key', Circle, this.getKeyStyle(attributes), container);
    this.upsert('halo', Circle, this.getHaloStyle(attributes), container);
  }
}

export const animationCustomFadeIn: AnimationTestCase = async ({ canvas }) => {
  const animation: ConfigurableAnimationOptions[] = [
    {
      fields: ['opacity'],
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
        color: 'red',
        opacity: 0.8,
      },
    }),
  );

  return factor(shape, {
    effectTiming: { duration: 1000, easing: 'linear', iterations: Infinity, direction: 'alternate' },
    originalStyle: { ...shape.attributes, opacity: 0 },
    states: [],
  });
};

animationCustomFadeIn.times = [0, 500, 1000];
