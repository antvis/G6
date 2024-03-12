import type { Animation } from '../../animations/types';

export type AnimationOptions =
  | false
  | ({
      [STAGE in AnimationStage]?: Animation;
    } & {
      [key: string]: Animation;
    });

/**
 * <zh/> 动画阶段
 *
 * <en/> Animation stage
 */
export type AnimationStage = 'enter' | 'update' | 'exit' | 'visibility';
