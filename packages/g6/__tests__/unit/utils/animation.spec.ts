import { DEFAULT_ANIMATION_OPTIONS } from '@/src/constants';
import { AnimatableTask } from '@/src/types';
import {
  createAnimationsProxy,
  executeAnimatableTasks,
  getAnimation,
  inferDefaultValue,
  preprocessKeyframes,
  withAnimationCallbacks,
} from '@/src/utils/animation';
import type { IAnimation } from '@antv/g';

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

    expect(createAnimationsProxy([])).toBe(null);

    const proxy2 = createAnimationsProxy([source, ...targets])!;
    proxy2.currentTime = 200;
    expect(proxy2.currentTime).toBe(200);
    expect(source.currentTime).toBe(200);
    expect(targets[0].currentTime).toBe(200);
    expect(targets[1].currentTime).toBe(200);

    proxy2.pause();
    expect(sourcePause).toHaveBeenCalledTimes(2);
    expect(targetPause).toHaveBeenCalledTimes(4);
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

  it('inferDefaultValue', () => {
    expect(inferDefaultValue('x')).toBe(0);
    expect(inferDefaultValue('y')).toBe(0);
    expect(inferDefaultValue('z')).toBe(0);
    expect(inferDefaultValue('opacity')).toBe(1);
    expect(inferDefaultValue('stroke')).toBe(undefined);
    expect(inferDefaultValue('visibility')).toBe('visible');
    expect(inferDefaultValue('collapsed')).toBe(false);
    expect(inferDefaultValue('states')).toEqual([]);
  });

  it('withAnimationCallbacks', async () => {
    const before = jest.fn();
    const beforeAnimate = jest.fn();
    const afterAnimate = jest.fn();
    const after = jest.fn();

    const callbacks = {
      before: before,
      beforeAnimate: beforeAnimate,
      afterAnimate: afterAnimate,
      after: after,
    };

    const animation = {
      finished: Promise.resolve(),
    } as unknown as IAnimation;

    await withAnimationCallbacks(animation, callbacks)?.finished;

    expect(callbacks.before).toHaveBeenCalledTimes(1);
    expect(callbacks.beforeAnimate).toHaveBeenCalledTimes(1);
    expect(callbacks.afterAnimate).toHaveBeenCalledTimes(1);
    expect(callbacks.after).toHaveBeenCalledTimes(1);

    await withAnimationCallbacks(null, callbacks)?.finished;

    expect(callbacks.before).toHaveBeenCalledTimes(2);
    expect(callbacks.beforeAnimate).toHaveBeenCalledTimes(1);
    expect(callbacks.afterAnimate).toHaveBeenCalledTimes(1);
    expect(callbacks.after).toHaveBeenCalledTimes(2);
  });

  it('executeAnimatableTasks', async () => {
    const before = jest.fn();
    const after = jest.fn();

    const task = jest.fn(() => () => {
      return {
        finished: Promise.resolve(),
      } as unknown as IAnimation;
    });

    const tasks: AnimatableTask[] = [task];

    await executeAnimatableTasks(tasks, { before, after })?.finished;

    expect(before).toHaveBeenCalledTimes(1);
    expect(task).toHaveBeenCalledTimes(1);
    expect(after).toHaveBeenCalledTimes(1);
  });

  it('getAnimation', () => {
    expect(getAnimation({ animation: true }, false)).toBe(false);
    expect(getAnimation({ animation: false }, true)).toBe(false);
    expect(getAnimation({ animation: true }, true)).toEqual(DEFAULT_ANIMATION_OPTIONS);

    expect(getAnimation({ animation: { duration: 1000 } }, true)).toEqual({
      ...DEFAULT_ANIMATION_OPTIONS,
      duration: 1000,
    });

    expect(getAnimation({ animation: { duration: 1000 } }, { duration: 500, easing: 'linear' })).toEqual({
      ...DEFAULT_ANIMATION_OPTIONS,
      duration: 500,
      easing: 'linear',
    });
  });
});
