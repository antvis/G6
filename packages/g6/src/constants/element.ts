/**
 * <zh/> 根据不同的 node，自动计算 icon 的大小之后，乘以一下缩放系数，防止贴的太紧密
 *
 * <en/> According to the different nodes, the size of the icon is automatically calculated, and then multiplied by the following scaling factor to prevent it from being too close
 */
export const ICON_SIZE_RATIO = 0.8;

export const ELEMENT_TYPES = ['node', 'edge', 'combo'] as const;
