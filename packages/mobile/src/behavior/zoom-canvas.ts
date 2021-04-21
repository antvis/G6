import { G6Event, IG6GraphEvent } from '@antv/g6-core';
import { mat3 } from '@antv/matrix-util';
import { clone } from '@antv/util';

const DELTA = 0.05;

export default {
  firstScale: null,
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

    const pointers = evt.originalEvent.pointers;
    if (pointers.length < 2) return;

    if (evt.type === 'pinchstart')  {
      this.firstScale = this.graph.getZoom();
    }

    const scale = evt.originalEvent.scale || evt.originalEvent.srcEvent.extra.scale;
    
    // 应用到画布上的缩放比例
    const zoom = this.firstScale * scale;

    // 缓存当前的缩放比例
    this.currentScale = zoom;

    const minZoom = this.get('minZoom') || this.graph.get('minZoom');
    const maxZoom = this.get('maxZoom') || this.graph.get('maxZoom');

    if (zoom > maxZoom || zoom < minZoom) {
      return;
    }
    const canvas = this.graph.get('canvas');

    const posA = {x: pointers[0].clientX, y: pointers[0].clientY};
    const posB = {x: pointers[1].clientX, y: pointers[1].clientY};
    // 缩放点放中间
    const point = canvas.getPointByClient((posA.x + posB.x)/2, (posA.y + posB.y)/2);
    this.graph.zoomTo(zoom, { x: point.x, y: point.y });
  },
};
