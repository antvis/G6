import './preset';

export const version = '5.0.0';
export { BaseBehavior } from './behaviors';
export { getPlugin, getPlugins, register } from './registry';
export { Graph } from './runtime/graph';
export { treeToGraphData } from './utils/tree';

export type { BaseBehaviorOptions } from './behaviors';
export type * from './spec';
