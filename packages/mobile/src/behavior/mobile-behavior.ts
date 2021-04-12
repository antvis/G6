import { each } from '@antv/util';
import { IAbstractGraph, G6Event } from '@antv/g6-core';

export default {
  /**
   * auto bind events when register behavior
   * @param graph Graph instance
   */
  bind(graph: IAbstractGraph) {
    if (this.type === 'drag-canvas') {
      graph.get('canvas').set('draggable', true);
    }
    const { events } = this;
    this.graph = graph;
    each(events, (handler: () => void, event: G6Event) => {
      graph.on(event, handler);
    });
  },

  unbind(graph: IAbstractGraph) {
    const { events } = this;
    if (this.type === 'drag-canvas') {
      graph.get('canvas').set('draggable', false);
    }
    this.graph = null;
    each(events, (handler: () => void, event: G6Event) => {
      graph.off(event, handler);
    });
  },
};
