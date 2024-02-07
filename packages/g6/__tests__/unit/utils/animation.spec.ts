import type { IAnimation } from '@antv/g';
import {
  createAnimationsProxy,
  executeAnimation,
  inferDefaultValue,
  preprocessKeyframes,
} from '../../../src/utils/animation';

describe('animation', () => {
  it('createAnimationsProxy', () => {
    const sourcePause = jest.fn();
    const targetPause = jest.fn();
    const source = {
      currentTime: 0,
      pause: () => sourcePause(),
    } as IAnimation;
    const targets = [
      { currentTime: 0, pause: () => targetPause() },
      { currentTime: 0, pause: () => targetPause() },
    ] as IAnimation[];

    const proxy = createAnimationsProxy(source, targets);

    expect(proxy.currentTime).toBe(0);
    proxy.currentTime = 100;

    expect(source.currentTime).toBe(100);
    expect(targets[0].currentTime).toBe(100);
    expect(targets[1].currentTime).toBe(100);

    proxy.pause();

    expect(sourcePause).toHaveBeenCalledTimes(1);
    expect(targetPause).toHaveBeenCalledTimes(2);
  });

  it('preprocessKeyframes', () => {
    expect(
      preprocessKeyframes([
        { fill: 'red', opacity: 0, stroke: 1, lineWidth: 0, lineDash: undefined, startPoint: [0, 0, 0] },
        { fill: 'blue', opacity: 1, lineWidth: 0, lineDash: undefined, startPoint: [0, 0, 0] },
      ]),
    ).toEqual([
      { fill: 'red', opacity: 0 },
      { fill: 'blue', opacity: 1 },
    ]);
  });

  it('executeAnimation', () => {
    class Shape {
      children: Shape[] = [];

      appendChild(shape: Shape) {
        this.children.push(shape);
        return shape;
      }

      animate(keyframes: Keyframe[], options: any) {
        this.record.push({ keyframes, options });
        return { keyframes, options };
      }

      record: any = [];
    }
    const node: any = new Shape();
    const key = new Shape();
    const halo = new Shape();
    const label = new Shape();

    node.appendChild(key);
    node.appendChild(halo);
    node.appendChild(label);

    const keyframes = [
      { opacity: 0, x: 100 },
      { opacity: 1, y: 100 },
    ];

    const options: KeyframeAnimationOptions = { duration: 1000, fill: 'both' };

    executeAnimation(node, keyframes, options);

    expect(node.record).toEqual([{ keyframes, options }]);

    const subKeyframes = [{ opacity: 0 }, { opacity: 1 }];
    expect(key.record).toEqual([
      {
        keyframes: subKeyframes,
        options,
      },
    ]);

    expect(halo.record).toEqual([
      {
        keyframes: subKeyframes,
        options,
      },
    ]);

    expect(label.record).toEqual([
      {
        keyframes: subKeyframes,
        options,
      },
    ]);
  });

  it('inferDefaultValue', () => {
    expect(inferDefaultValue('opacity')).toBe(1);
    expect(inferDefaultValue('stroke')).toBe(undefined);
  });
});
