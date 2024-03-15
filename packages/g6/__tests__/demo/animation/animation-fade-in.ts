import { executor } from '@/src/animations';
import type { Animation } from '@/src/animations/types';
import type { BaseShapeStyleProps } from '@/src/elements/shapes/base-shape';
import { BaseShape } from '@/src/elements/shapes/base-shape';
import { Circle, Group } from '@antv/g';
import type { AnimationTestCase } from '../types';

type ShapeStyleProps = BaseShapeStyleProps & { size: number; color: string };

class Shape extends BaseShape<ShapeStyleProps> {
  private getKeyStyle({ size, color } = this.attributes) {
    return {
      r: size / 2,
      fill: color,
    };
  }

  private getHaloStyle({ size, color } = this.attributes) {
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

export const animationFadeIn: AnimationTestCase = async ({ container }) => {
  const animation: Animation = [
    {
      fields: ['opacity'],
    },
  ];

  const shape = container.appendChild(
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

  return executor(
    shape,
    animation,
    { duration: 1000, easing: 'linear', iterations: Infinity, direction: 'alternate' },
    {
      originalStyle: { ...shape.attributes, opacity: 0 },
      states: [],
    },
  );
};

animationFadeIn.times = [0, 500, 1000];
