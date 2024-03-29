export { executor } from './executor';

/**
 * <zh/> 内置的动画元素。
 * <en/> Built-in animations.
 */
export const fade = [
  {
    fields: ['opacity'],
  },
];

export const translate = [
  {
    fields: ['x', 'y'],
  },
];

export const comboCollapseExpand = [{ fields: ['x', 'y'] }, { fields: ['r', 'width', 'height'], shape: 'key' }];
