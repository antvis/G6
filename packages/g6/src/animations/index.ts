/**
 * <zh/> 内置的动画元素。
 * <en/> Built-in animations.
 */
export { executor } from './executor';

export const Fade = [{ fields: ['opacity'] }];

export const Translate = [{ fields: ['x', 'y'] }];

export const ComboCollapseExpand = [{ fields: ['x', 'y', 'width', 'height', 'r'], shape: 'key' }];

export const MoveIn = [{ fields: ['x', 'y'] }];

export const MoveOut = MoveIn;

export const PathIn = [{ fields: ['sourceNode', 'targetNode'] }];

export const PathOut = PathIn;

export const comboCollapseExpand = [{ fields: ['childrenNode', 'opacity'] }];
