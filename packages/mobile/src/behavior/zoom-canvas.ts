import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { mat3 } from '@antv/matrix-util';
import { clone } from '@antv/util';

const DELTA = 0.05;

export default {
  getDefaultCfg(): object {
    return {
      originScale: 1,
      sensitivity: 2,
      minZoom: undefined,
      maxZoom: undefined,
      enableOptimize: false,
      optimizeZoom: 0.1,
      fixSelectedItems: {
        fixAll: false,
        fixLineWidth: false,
        fixLabel: false,
        fixState: 'selected',
      },
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    const { fixSelectedItems } = this;

    if (!fixSelectedItems.fixState) fixSelectedItems.fixState = 'selected';
    if (fixSelectedItems.fixAll) {
      fixSelectedItems.fixLineWidth = true;
      fixSelectedItems.fixLabel = true;
    }

    return {
      pinchstart: 'onPinch',
      pinchmove: 'onPinch',
    };
  },
  onPinch(evt) {
    evt.preventDefault || evt.preventDefault();
    evt.originalEvent.preventDefault || evt.originalEvent.preventDefault();
    const scale = evt.originalEvent.scale || evt.originalEvent.srcEvent.extra.scale;
    // 应用到画布上的缩放比例
    const zoom = scale;

    // 缓存当前的缩放比例
    this.currentScale = zoom;

    const minZoom = this.get('minZoom') || this.graph.get('minZoom');
    const maxZoom = this.get('maxZoom') || this.graph.get('maxZoom');
    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }

    const canvas = this.graph.get('canvas');
    const point = canvas.getPointByClient(evt.clientX, evt.clientY);
    this.graph.zoomTo(zoom, { x: point.x, y: point.y });
    this.graph.emit('wheelzoom', evt);
  },
};
