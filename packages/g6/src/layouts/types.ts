import type {
  CircularLayoutOptions,
  ConcentricLayoutOptions,
  D3ForceLayoutOptions,
  ForceAtlas2LayoutOptions,
  ForceLayoutOptions,
  FruchtermanLayoutOptions,
  GridLayoutOptions,
  MDSLayoutOptions,
  RadialLayoutOptions,
  RandomLayoutOptions,
} from '@antv/layout';
import type { AnimationEffectTiming } from '../animations/types';

export type BuiltInLayoutOptions =
  | CircularLayout
  | RandomLayout
  | ConcentricLayout
  | GridLayout
  | MDSLayout
  | RadialLayout
  | FruchtermanLayout
  | D3ForceLayout
  | ForceLayout
  | ForceAtlas2;

interface CircularLayout extends CircularLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'circular';
}

interface RandomLayout extends RandomLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'random';
}

interface GridLayout extends GridLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'grid';
}

interface MDSLayout extends MDSLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'mds';
}

interface ConcentricLayout
  extends ConcentricLayoutOptions,
    AnimationOptions,
    WebWorkerLayoutOptions,
    PresetLayoutOptions {
  type: 'concentric';
}

interface RadialLayout extends RadialLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'radial';
}

interface FruchtermanLayout
  extends FruchtermanLayoutOptions,
    AnimationOptions,
    WebWorkerLayoutOptions,
    PresetLayoutOptions {
  type: 'fruchterman' | 'fruchtermanGPU';
}

interface D3ForceLayout extends D3ForceLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'd3force';
}

interface ForceLayout extends ForceLayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'force' | 'gforce';
}

interface ForceAtlas2 extends ForceAtlas2LayoutOptions, AnimationOptions, WebWorkerLayoutOptions, PresetLayoutOptions {
  type: 'forceAtlas2';
}

interface PresetLayoutOptions {
  presetLayout?: Partial<BuiltInLayoutOptions>;
}

interface AnimationOptions {
  /**
   * <zh/> 启用布局动画，对于迭代布局，会在两次迭代之间进行动画过渡
   *
   * <en/> Enable layout animation, for iterative layout, animation transition will be performed between two iterations
   */
  animated?: boolean;

  /**
   * <zh/> 布局动画的配置项
   *
   * <en/> Layout animation options
   */
  animationEffectTiming?: AnimationEffectTiming;
}

export interface WebWorkerLayoutOptions {
  /**
   * <zh/> 是否在 WebWorker 中运行布局
   *
   * <en/> Whether to run the layout in WebWorker
   */
  workerEnabled?: boolean;

  /**
   * <zh/> 迭代布局的迭代次数
   *
   * <en/> Iterations for iterable layouts
   */
  iterations?: number;
}
