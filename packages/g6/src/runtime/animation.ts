import type { IAnimation } from '@antv/g';
import { executor } from '../animations/executor';
import type { AnimationContext, AnimationEffectTiming } from '../animations/types';
import type { AnimationStage } from '../spec/element/animation';
import type { Element } from '../types';
import { createAnimationsProxy, getElementAnimationOptions, inferDefaultValue } from '../utils/animation';
import { getCachedStyle } from '../utils/cache';
import type { RuntimeContext } from './types';

export class Animation {
  private context: RuntimeContext;

  constructor(context: RuntimeContext) {
    this.context = context;
  }

  private tasks: [AnimationContext, AnimationCallbacks | undefined][] = [];

  private animations: Set<IAnimation> = new Set();

  private getTasks() {
    const tasks = [...this.tasks];
    this.tasks = [];
    return tasks;
  }

  public add(context: AnimationContext, callbacks?: AnimationCallbacks) {
    this.tasks.push([context, callbacks]);
  }

  public animate(localAnimation?: AnimationEffectTiming | boolean, callbacks?: AnimationCallbacks) {
    callbacks?.before?.();

    const animations = this.getTasks()
      .map(([{ element, elementType, originalStyle, modifiedStyle, stage }, cb]) => {
        const options = getElementAnimationOptions(this.context.options, elementType, stage, localAnimation);
        cb?.before?.();

        const [inferredOriginalStyle, inferredModifiedStyle] = this.inferStyle(element, stage);
        const animation = executor(
          element,
          [
            { ...originalStyle, ...inferredOriginalStyle },
            { ...modifiedStyle, ...inferredModifiedStyle },
          ],
          options,
        );

        if (animation) {
          cb?.beforeAnimate?.(animation);
          animation.finished.then(() => {
            cb?.afterAnimate?.(animation);
            cb?.after?.();
          });
        } else cb?.after?.();

        return animation;
      })
      .filter(Boolean) as IAnimation[];

    animations.forEach((animation) => this.animations.add(animation));

    const animation = createAnimationsProxy(animations);

    if (animation) {
      callbacks?.beforeAnimate?.(animation);

      animation.finished.then(() => {
        callbacks?.afterAnimate?.(animation);
        callbacks?.after?.();
      });
    } else callbacks?.after?.();

    return animation;
  }

  /**
   * <zh/> 推断额外的动画样式
   *
   * <en/> Infer additional animation styles
   * @param element - <zh/> 元素 | <en/> element
   * @param stage - <zh/> 动画阶段 | <en/> animation stage
   * @returns <zh/> 始态样式与终态样式 | <en/> Initial style and final style
   */
  public inferStyle(element: Element, stage: AnimationStage) {
    if (stage === 'enter') return [{ opacity: 0 }, {}];
    if (stage === 'exit') return [{}, { opacity: 0 }];

    const getCacheOpacity = () => getCachedStyle(element, 'opacity') ?? inferDefaultValue('opacity');
    if (stage === 'show') return [{ opacity: 0 }, { opacity: getCacheOpacity() }];
    if (stage === 'hide') return [{ opacity: getCacheOpacity() }, { opacity: 0 }];
    return [{}, {}];
  }

  public stop() {
    this.animations.forEach((animation) => animation.cancel());
  }

  public destroy() {
    this.stop();
    this.animations.clear();
    this.tasks = [];
  }
}

interface AnimationCallbacks {
  before?: () => void;
  beforeAnimate?: (animation: IAnimation) => void;
  afterAnimate?: (animation: IAnimation) => void;
  after?: () => void;
}
