import type { IAnimation } from '@antv/g';

export type Keyframe = {
  [key: string]: any;
};

export type AnimatableTask = () => AnimationTask;

export type AnimationTask = () => IAnimation | null;
