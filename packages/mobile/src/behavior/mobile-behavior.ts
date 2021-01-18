import { each } from '@antv/util';
import { IAbstractGraph, G6Event } from '@antv/g6-core';

export default {
  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  bind(graph: IAbstractGraph) {
    const { events } = this;
    each(events, (handler: () => void, event: G6Event) => {
      graph.on(event, handler);
    });
  },

  unbind(graph: IAbstractGraph) {
    const { events } = this;
    each(events, (handler: () => void, event: G6Event) => {
      graph.off(event, handler);
    });
  },
};
