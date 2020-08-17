import { G6Event } from '../types';
import base from './tooltip-base';

export default {
  getDefaultCfg(): object {
    return {
      item: 'node',
      offset: 12,
      formatText(model) {
        return model.label;
      },
    };
  },
  getEvents(): { [key in G6Event | 'afterremoveitem']?: string } {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave',
    };
  },
  ...base,
};
