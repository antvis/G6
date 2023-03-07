import { IAnimationEffectTiming } from '@antv/g';
import {
  CircularLayoutOptions,
  ConcentricLayoutOptions,
  D3ForceLayoutOptions,
  ForceAtlas2LayoutOptions,
  ForceLayoutOptions,
  FruchtermanLayoutOptions,
  GridLayoutOptions,
  LayoutMapping,
  MDSLayoutOptions,
  RadialLayoutOptions,
  RandomLayoutOptions,
} from '@antv/layout';
import { GraphCore } from './data';

type Animatable = {
  /**
   * Make layout animated. For layouts with iterations, transitions will happen between ticks.
   */
  animated?: boolean;

  /**
   * Effect timing of animation for layouts without iterations.
   * @see https://g.antv.antgroup.com/api/animation/waapi#effecttiming
   */
  animationEffectTiming?: Partial<IAnimationEffectTiming>;
};

export type LayoutOptions =
  | ({
      /**
       * like an IIFE.
       */
      execute: (graph: GraphCore, options?: any) => Promise<LayoutMapping>;
    } & Animatable)
  | (((
      | CircularLayout
      | RandomLayout
      | ConcentricLayout
      | GridLayout
      | MDSLayout
      | RadialLayout
      | FruchtermanLayout
      | D3ForceLayout
      | ForceLayout
      | ForceAtlas2
    ) & {
      /**
       * Make layout running in WebWorker.
       */
      workerEnabled?: boolean;

      /**
       * Iterations for iteratable layouts such as Force.
       */
      iterations?: number;
    }) &
      Animatable);

interface CircularLayout extends CircularLayoutOptions {
  type: 'circular';
}

interface RandomLayout extends RandomLayoutOptions {
  type: 'random';
}

interface GridLayout extends GridLayoutOptions {
  type: 'grid';
}

interface MDSLayout extends MDSLayoutOptions {
  type: 'mds';
}

interface ConcentricLayout extends ConcentricLayoutOptions {
  type: 'concentric';
}

interface RadialLayout extends RadialLayoutOptions {
  type: 'radial';
}

interface FruchtermanLayout extends FruchtermanLayoutOptions {
  type: 'fruchterman' | 'fruchtermanGPU';
}

interface D3ForceLayout extends D3ForceLayoutOptions {
  type: 'd3force';
}

interface ForceLayout extends ForceLayoutOptions {
  type: 'force' | 'gforce';
}

interface ForceAtlas2 extends ForceAtlas2LayoutOptions {
  type: 'forceAtlas2';
}
