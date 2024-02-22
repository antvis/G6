import type { Theme } from './types';

export const dark: Theme = {
  node: {
    style: {
      fill: '#444',
      stroke: '#f8f8f8',
    },
    state: {},
    animation: {
      enter: 'fade',
      update: [{ fields: ['x', 'y', 'fill', 'stroke'] }],
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
    },
  },
  edge: {
    style: {
      lineWidth: 1,
      stroke: '#8b9baf',
    },
    state: {},
    animation: {
      enter: 'fade',
      update: [{ fields: ['stroke'] }, { fields: ['path'], shape: 'key' }],
      exit: 'fade',
      show: 'fade',
      hide: 'fade',
    },
  },
  combo: {
    style: {
      fill: 'rgba(170, 174, 178, 0.2)',
      stroke: '#aaaeb2',
      lineWidth: 1,
    },
    state: {},
  },
};
