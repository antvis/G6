import base from './tooltip-base';
import { G6Event } from '../../types';

export default Object.assign({
  getDefaultCfg(): object {
    return {
      item: 'edge',
      formatText(model) { return 'source:' + model.source + ' target:' + model.target; }
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove'
    };
  }
}, base);
