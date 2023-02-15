import {
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

export type LayoutOptions = (
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
  workerEnabled?: boolean;
};

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
