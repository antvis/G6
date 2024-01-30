import { Theme } from './types';

export const LIGHT_THEME: Theme = {
  node: {
    style: {
      fill: '#f8f8f8',
      stroke: '#8b9baf',
    },
    state: {
      selected: {
        lineWidth: 2,
        stroke: '#34d058',
      },
      active: {
        lineWidth: 2,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
    },
  },
  edge: {
    style: {
      fill: '#ffea7f',
    },
    state: {
      selected: {
        lineWidth: 2,
        stroke: '##79b8ff',
      },
      active: {
        lineWidth: 2,
      },
    },
  },
  combo: {
    style: {
      fill: 'rgba(170, 174, 178, 0.2)',
      stroke: '#aaaeb2',
      lineWidth: 1,
    },
    state: {
      selected: {
        lineWidth: 2,
        stroke: '#34d058',
      },
      active: {
        stroke: '#7b464e',
      },
    },
  },
};
