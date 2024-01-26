import type { IAnimation } from '@antv/g';
import { createAnimationsProxy } from '../../../src/utils/animation';

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
});
