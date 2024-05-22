/**
 * <zh/> 内置的动画元素。
 * <en/> Built-in animations.
 */
export { executor } from './executor';

export const Fade = [{ fields: ['opacity'] }];

export const Translate = [{ fields: ['x', 'y'] }];

export const NodeCollapse = [{ fields: ['x', 'y'] }];

export const NodeExpand = NodeCollapse;

export const PathIn = [{ fields: ['sourceNode', 'targetNode'] }];

export const PathOut = PathIn;

export const ComboCollapse = [{ fields: ['childrenNode', 'x', 'y'] }];

export const ComboExpand = ComboCollapse;

export const ComboCollapseExpand = [{ fields: ['childrenNode', 'x', 'y'] }];
