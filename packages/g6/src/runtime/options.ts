import type { GraphOptions } from '../spec';

/**
 * <zh/> 基于用户传入的配置，推断出最终的配置
 *
 * <en/> Infer the final configuration based on the configuration passed by the user
 * @param options - <zh/> 用户传入的配置 | <en/> Configuration passed by the user
 * @returns <zh/> 最终的配置 | <en/> Final configuration
 */
export function inferOptions(options: GraphOptions): GraphOptions {
  const flow = [inferLayoutOptions];
  return flow.reduce((acc, infer) => infer(acc), options);
}

/**
 * <zh/> 推断布局配置
 *
 * <en/> Infer layout configuration
 * @param options - <zh/> 用户传入的配置 | <en/> Configuration passed by the user
 * @returns <zh/> 最终的配置 | <en/> Final configuration
 */
function inferLayoutOptions(options: GraphOptions): GraphOptions {
  if (!options.layout) return options;
  if (Array.isArray(options.layout)) return options;
  if ('preLayout' in options.layout) return options;

  if (
    [
      'antv-dagre',
      'combo-combined',
      'compact-box',
      'circular',
      'concentric',
      'dagre',
      'fishbone',
      'grid',
      'indented',
      'mds',
      'radial',
      'random',
      'snake',
      // <zh/> 下列布局的标签位置待适配，需要手动配置 preLayout false
      // <en/> The label position of the following layouts needs to be adapted, and preLayout needs to be manually configured as false
      'dendrogram',
      'mindmap',
    ].includes(options.layout.type)
  ) {
    options.layout.preLayout = true;
  }

  return options;
}
