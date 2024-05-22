import type { IAnimation } from '@antv/g';
import { executor } from '../animations/executor';
import type { AnimationContext, AnimationEffectTiming } from '../animations/types';
import type { ID, Point } from '../types';
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

  public animate(
    localAnimation?: AnimationEffectTiming | boolean,
    callbacks?: AnimationCallbacks,
    extendOptions?: ExtendOptions,
  ) {
    callbacks?.before?.();

    const animations = this.getTasks()
      .map(([context, cb]) => {
        const { element, elementType, stage } = context;
        const options = getElementAnimationOptions(this.context.options, elementType, stage, localAnimation);
        cb?.before?.();
        const animation = executor(element, this.inferStyle(context, extendOptions), options);

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
   * @param context - <zh/> 动画上下文 | <en/> Animation context
   * @param options - <zh/> 扩展选项 | <en/> Extend options
   * @returns <zh/> 始态样式与终态样式 | <en/> Initial style and final style
   */
  public inferStyle(context: AnimationContext, options?: ExtendOptions) {
    const { element, elementType, stage, originalStyle, modifiedStyle } = context;

    const fromStyle = { ...originalStyle };
    const toStyle = { ...modifiedStyle };
    const getCacheOpacity = () => getCachedStyle(element, 'opacity') ?? inferDefaultValue('opacity');

    if (stage === 'enter') {
      Object.assign(fromStyle, { opacity: 0 });
    } else if (stage === 'exit') {
      Object.assign(toStyle, { opacity: 0 });
    } else if (stage === 'show') {
      Object.assign(fromStyle, { opacity: 0 });
      Object.assign(toStyle, { opacity: getCacheOpacity() });
    } else if (stage === 'hide') {
      Object.assign(fromStyle, { opacity: getCacheOpacity() });
      Object.assign(toStyle, { opacity: 0 });
    } else if (stage === 'collapse') {
      const { collapse } = options || {};
      const { target, descendants, position } = collapse!;
      if (elementType === 'node') {
        // 为即将被删除的元素设置目标位置
        // Set the target position for the element to be deleted
        if (descendants.includes(element.id)) {
          const [x, y, z] = position;
          Object.assign(toStyle, { x, y, z });
        }
      } else if (elementType === 'combo') {
        if (element.id === target || descendants.includes(element.id)) {
          const [x, y] = position;
          Object.assign(toStyle, { x, y, childrenNode: fromStyle.childrenNode });
        }
      } else if (elementType === 'edge') {
        Object.assign(toStyle, { sourceNode: fromStyle.sourceNode, targetNode: fromStyle.targetNode });
      }
    } else if (stage === 'expand') {
      const { expand } = options || {};
      const { target, descendants, position } = expand!;
      if (elementType === 'node') {
        // 设置展开节点的起点位置
        // Set the starting position of the expanded node
        if (element.id === target || descendants.includes(element.id)) {
          const [x, y, z] = position;
          Object.assign(fromStyle, { x, y, z });
        }
      } else if (elementType === 'combo') {
        // 设置展开后的组合子元素
        // Set the child elements of the expanded combo
        if (element.id === target || descendants.includes(element.id)) {
          const [x, y, z] = position;
          Object.assign(fromStyle, { x, y, z, childrenNode: toStyle.childrenNode });
        }
      } else if (elementType === 'edge') {
        // 设置展开后的边的起点和终点
        // Set the starting point and end point of the edge after expansion
        Object.assign(fromStyle, { sourceNode: toStyle.sourceNode, targetNode: toStyle.targetNode });
      }
    }

    return [fromStyle, toStyle] as [Record<string, unknown>, Record<string, unknown>];
  }

  public stop() {
    this.animations.forEach((animation) => animation.cancel());
  }

  public clear() {
    this.tasks = [];
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

interface ExtendOptions {
  /**
   * <zh/> stage 为 collapse 时，指定当前展开/收起的目标元素及其后代元素
   *
   * <en/> When the stage is collapse, specify the target element and its descendants to expand/collapse
   */
  collapse?: {
    target: ID;
    descendants: ID[];
    position: Point;
  };

  /**
   * <zh/> stage 为 expand 时，指定当前展开/收起的目标元素及其后代元素
   *
   * <en/> When the stage is expand, specify the target element and its descendants to expand/collapse
   */
  expand?: {
    target: ID;
    descendants: ID[];
    position: Point;
  };
}
