import type { GraphOptions } from '@/src';
import { AnimationEffectTiming } from '@/src';
import { STDAnimation } from '@/src/animations/types';
import { DEFAULT_ANIMATION_OPTIONS, DEFAULT_ELEMENTS_ANIMATION_OPTIONS } from '@/src/constants';
import { register } from '@/src/registry/register';
import {
  createAnimationsProxy,
  getAnimationOptions,
  getElementAnimationOptions,
  inferDefaultValue,
  preprocessKeyframes,
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

  it('getAnimation', () => {
    expect(getAnimationOptions({}, false)).toBe(false);
    expect(getAnimationOptions({ animation: false }, true)).toBe(false);
    expect(getAnimationOptions({}, true)).toEqual(DEFAULT_ANIMATION_OPTIONS);

    expect(getAnimationOptions({ animation: { duration: 1000 } }, true)).toEqual({
      ...DEFAULT_ANIMATION_OPTIONS,
      duration: 1000,
    });

    expect(getAnimationOptions({ animation: { duration: 1000 } }, { duration: 500, easing: 'linear' })).toEqual({
      ...DEFAULT_ANIMATION_OPTIONS,
      duration: 500,
      easing: 'linear',
    });
  });

  it('getElementAnimationOptions', () => {
    // global, element, local => result
    // total 2 * 3 * 3 = 18 cases
    const animations: [
      GraphOptions['animation'],
      undefined | false | AnimationEffectTiming,
      undefined | false | AnimationEffectTiming,
      false | STDAnimation,
    ][] = [
      [false, false, false, []],
      [false, false, undefined, []],
      [false, undefined, false, []],
      [false, undefined, undefined, []],
      [undefined, false, false, []],
      [undefined, false, undefined, []],
      [undefined, undefined, false, []],
      [undefined, undefined, undefined, []],
      [{ duration: 1000 }, undefined, undefined, []],
      [false, undefined, undefined, []],
      [undefined, { duration: 1000 }, undefined, [{ ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, fields: [] }]],
      [
        { duration: 1000 },
        { duration: 500 },
        undefined,
        [{ ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, duration: 500, fields: [] }],
      ],
      [
        { duration: 1000 },
        { duration: 500 },
        { duration: 200 },
        [{ ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, duration: 200, fields: [] }],
      ],
      [{ duration: 1000 }, { duration: 500 }, false, []],
      [{ duration: 1000 }, false, { duration: 200 }, []],
      [false, { duration: 500 }, { duration: 200 }, []],
      [false, { duration: 500 }, false, []],
      [{ duration: 1000 }, false, false, []],
      [true, undefined, undefined, []],
      [true, { duration: 500 }, undefined, [{ ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, duration: 500, fields: [] }]],
      [
        true,
        { duration: 500 },
        { duration: 200 },
        [{ ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, duration: 200, fields: [] }],
      ],
      [true, false, { duration: 200 }, []],
    ];

    const stage = 'update' as const;
    const elementType = 'node' as const;
    for (const [global, element, local, result] of animations) {
      expect(
        getElementAnimationOptions(
          {
            animation: global,
            [elementType]: {
              animation: {
                ...(element === false
                  ? { [stage]: false }
                  : element === undefined
                    ? {}
                    : { [stage]: [{ ...element, fields: [] }] }),
              },
            },
          },
          elementType,
          stage,
          local,
        ),
      ).toEqual(result);
    }
  });

  it('getElementAnimationOptions in theme', () => {
    const stage = 'update' as const;

    register('theme', 'test-element-animation', {
      node: { animation: { [stage]: false } },
      edge: { animation: false },
      combo: {
        animation: { [stage]: [{ fields: ['d', 'stroke'], shape: 'key', duration: 2000 }] },
      },
    });

    expect(getElementAnimationOptions({ theme: 'test-element-animation' }, 'node', stage)).toEqual([]);
    expect(getElementAnimationOptions({ theme: 'test-element-animation' }, 'edge', stage)).toEqual([]);
    expect(getElementAnimationOptions({ theme: 'test-element-animation' }, 'combo', stage)).toEqual([
      { ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, fields: ['d', 'stroke'], shape: 'key', duration: 2000 },
    ]);
  });

  it('getElementAnimationOptions mixin', () => {
    const stage = 'update' as const;

    register('theme', 'test-element-animation-mixin', {
      node: { animation: { [stage]: false } },
      edge: { animation: false },
      combo: {
        animation: { [stage]: [{ fields: ['d', 'stroke'], shape: 'key', duration: 2000 }] },
      },
    });

    const options = {
      theme: 'test-element-animation-mixin',
      node: {
        animation: {
          enter: [{ fields: ['x', 'y'], duration: 1000 }],
        },
      },
    };

    expect(getElementAnimationOptions(options, 'node', stage)).toEqual([]);
    expect(getElementAnimationOptions(options, 'node', 'enter')).toEqual([
      { ...DEFAULT_ELEMENTS_ANIMATION_OPTIONS, fields: ['x', 'y'], duration: 1000 },
    ]);
  });
});
