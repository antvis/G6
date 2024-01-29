import type { IAnimation } from '@antv/g';
import { createAnimationsProxy, parseAnimation, preprocessKeyframes } from '../../../src/utils/animation';

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

  it('parseAnimation', () => {
    expect(parseAnimation('fadeIn')).toEqual({ type: 'fadeIn' });
    expect(parseAnimation({ type: 'fadeOut', duration: 100 })).toEqual({ type: 'fadeOut', duration: 100 });
    expect(
      parseAnimation([
        { fields: ['opacity', 'size'], shape: 'key', duration: 500 },
        { fields: ['opacity'], shape: 'halo', duration: 500 },
      ]),
    ).toEqual({ type: 'specification' });
  });

  it('preprocessKeyframes', () => {
    expect(
      preprocessKeyframes([
        { fill: 'red', opacity: 0, stroke: 1, lineWidth: 0, lineDash: undefined },
        { fill: 'blue', opacity: 1, lineWidth: 0, lineDash: undefined },
      ]),
    ).toEqual([
      { fill: 'red', opacity: 0 },
      { fill: 'blue', opacity: 1 },
    ]);
  });
});
