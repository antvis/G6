import base from './tooltip-base';
import { G6Event, EdgeConfig } from '../types';

export default {
  getDefaultCfg(): object {
    return {
      item: 'edge',
      offset: 12,
      formatText(model: EdgeConfig) {
        return `source: ${model.source} target: ${model.target}`;
      },
    };
  },
  getEvents(): { [key in G6Event | 'afterremoveitem']?: string } {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave',
    };
  },
  ...base,
};
