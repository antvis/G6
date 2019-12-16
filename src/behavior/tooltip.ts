import { G6Event } from "@g6/types";
import base from './tooltip-base';

export default Object.assign({
  getDefaultCfg(): object {
    return {
      item: 'node',
      formatText(model) { return model.label; }
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove'
    };
  }
}, base);
