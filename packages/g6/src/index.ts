import './preset';

export const version = '5.0.0';

export { getPlugin, getPlugins, register } from './registry';
export * from './spec';

export { transformGraphDataToTreeData, transformTreeDataToGraphData } from './utils/tree';
