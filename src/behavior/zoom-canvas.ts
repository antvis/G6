import { G6Event, IG6GraphEvent } from '../types';

const DELTA = 0.05;

export default {
  getDefaultCfg(): object {
    return {
      sensitivity: 2,
      minZoom: 0.1,
      maxZoom: 10,
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      wheel: 'onWheel',
    };
  },
  onWheel(e: IG6GraphEvent) {
    const { graph } = this;
    e.preventDefault();
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    const canvas = graph.get('canvas');
    const point = canvas.getPointByClient(e.clientX, e.clientY);
    const sensitivity = this.get('sensitivity');
    let ratio = graph.getZoom();
    // 兼容IE、Firefox及Chrome
    if (e.wheelDelta < 0) {
      ratio = 1 - DELTA * sensitivity;
    } else {
      ratio = 1 + DELTA * sensitivity;
    }
    const zoom = ratio * graph.getZoom();
    if (zoom > this.get('maxZoom') || zoom < this.get('minZoom')) {
      return;
    }
    graph.zoom(ratio, { x: point.x, y: point.y });
    graph.emit('wheelzoom', e);
  },
};
