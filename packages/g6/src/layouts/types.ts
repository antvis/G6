import type {
  AntVDagreLayoutOptions,
  LayoutWithIterations as AntVIterativeLayout,
  Layout as AntVNonIterativeLayout,
  CircularLayoutOptions,
  ConcentricLayoutOptions,
  D3Force3DLayoutOptions,
  D3ForceLayoutOptions,
  DagreLayoutOptions,
  ForceAtlas2LayoutOptions,
  ForceLayoutOptions,
  FruchtermanLayoutOptions,
  GridLayoutOptions,
  MDSLayoutOptions,
  RadialLayoutOptions,
  RandomLayoutOptions,
} from '@antv/layout';
import type { NodeData } from '../spec/data';
import type { BaseLayout } from './base-layout';

export type BuiltInLayoutOptions =
  | AntVDagreLayout
  | CircularLayout
  | ConcentricLayout
  | D3ForceLayout
  | D3Force3DLayout
  | DagreLayout
  | ForceAtlas2
  | ForceLayout
  | FruchtermanLayout
  | GridLayout
  | MDSLayout
  | RadialLayout
  | RandomLayout;

export interface BaseLayoutOptions extends AnimationOptions, WebWorkerLayoutOptions, Record<string, any> {
  /**
   * <zh/> 布局类型
   *
   * <en/> Layout type
   */
  type: string;
  /**
   * <zh/> 参与该布局的节点
   *
   * <en/> Nodes involved in the layout
   * @param node - <zh/> 节点数据 | <en/> node data
   * @returns <zh/> 是否参与布局 | <en/> Whether to participate in the layout
   */
  nodeFilter?: (node: NodeData) => boolean;
}

interface CircularLayout extends BaseLayoutOptions, CircularLayoutOptions {
  type: 'circular';
}

interface RandomLayout extends BaseLayoutOptions, RandomLayoutOptions {
  type: 'random';
}

interface GridLayout extends BaseLayoutOptions, GridLayoutOptions {
  type: 'grid';
}

interface MDSLayout extends BaseLayoutOptions, MDSLayoutOptions {
  type: 'mds';
}

interface ConcentricLayout extends BaseLayoutOptions, ConcentricLayoutOptions {
  type: 'concentric';
}

interface RadialLayout extends BaseLayoutOptions, RadialLayoutOptions {
  type: 'radial';
}

interface FruchtermanLayout extends BaseLayoutOptions, FruchtermanLayoutOptions {
  type: 'fruchterman' | 'fruchtermanGPU';
}

interface D3ForceLayout extends BaseLayoutOptions, D3ForceLayoutOptions {
  type: 'd3-force';
}

interface D3Force3DLayout extends BaseLayoutOptions, D3Force3DLayoutOptions {
  type: 'd3-force3d';
}

interface ForceLayout extends BaseLayoutOptions, ForceLayoutOptions {
  type: 'force' | 'gforce';
}

interface ForceAtlas2 extends BaseLayoutOptions, ForceAtlas2LayoutOptions {
  type: 'forceAtlas2';
}

interface AntVDagreLayout extends BaseLayoutOptions, AntVDagreLayoutOptions {
  type: 'antv-dagre';
}

interface DagreLayout extends BaseLayoutOptions, DagreLayoutOptions {
  type: 'dagre';
}

interface AnimationOptions {
  /**
   * <zh/> 启用布局动画，对于迭代布局，会在两次迭代之间进行动画过渡
   *
   * <en/> Enable layout animation, for iterative layout, animation transition will be performed between two iterations
   */
  animation?: boolean;
}

export interface WebWorkerLayoutOptions {
  /**
   * <zh/> 是否在 WebWorker 中运行布局
   *
   * <en/> Whether to run the layout in WebWorker
   */
  enableWorker?: boolean;
  /**
   * <zh/> 迭代布局的迭代次数
   *
   * <en/> Iterations for iterable layouts
   */
  iterations?: number;
}

export type AntVLayout = AntVNonIterativeLayout<any> | AntVIterativeLayout<any>;

export type Layout = BaseLayout | AntVLayout;
