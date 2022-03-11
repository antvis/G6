import { G6Event, IG6GraphEvent } from '@antv/g6-core';

const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control', 'meta'];

export default {
  getDefaultCfg(): object {
    return {
      direction: 'both',
      enableOptimize: false,
      zoomKey: 'ctrl',
      // scroll-canvas 可滚动的扩展范围，默认为 0，即最多可以滚动一屏的位置
      // 当设置的值大于 0 时，即滚动可以超过一屏
      // 当设置的值小于 0 时，相当于缩小了可滚动范围
      // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
      scalableRange: 0,
    };
  },

  getEvents(): { [key in G6Event]?: string } {
    if (!this.zoomKey || ALLOW_EVENTS.indexOf(this.zoomKey) === -1) this.zoomKey = 'ctrl';
    return {
      wheel: 'onWheel',
    };
  },

  onWheel(ev: IG6GraphEvent) {
    const graph = this.graph;
    const zoomKeys = Array.isArray(this.zoomKey) ? [].concat(this.zoomKey) : [this.zoomKey];
    if (zoomKeys.includes('control')) zoomKeys.push('ctrl');
    let keyDown = zoomKeys.some(ele => ev[`${ele}Key`]);
    if (keyDown) {
      const canvas = graph.get('canvas');
      const point = canvas.getPointByClient(ev.clientX, ev.clientY);
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
    } else {
      let dx = (ev.deltaX || ev.movementX) as number;
      let dy = (ev.deltaY || ev.movementY) as number;
      if (!dy && navigator.userAgent.indexOf('Firefox') > -1) dy = (-ev.wheelDelta * 125) / 3

      const width = this.graph.get('width');
      const height = this.graph.get('height');
      const graphCanvasBBox = this.graph.get('canvas').getCanvasBBox();

      let expandWidth = this.scalableRange as number;
      let expandHeight = this.scalableRange as number;
      // 若 scalableRange 是 0~1 的小数，则作为比例考虑
      if (expandWidth < 1 && expandWidth > -1) {
        expandWidth = width * expandWidth;
        expandHeight = height * expandHeight;
      }
      const { minX, maxX, minY, maxY } = graphCanvasBBox;


      if (dx > 0) {
        if (maxX < -expandWidth) {
          dx = 0
        } else if (maxX - dx < -expandWidth) {
          dx = maxX + expandWidth
        }
      } else if (dx < 0) {
        if (minX > width + expandWidth) {
          dx = 0
        } else if (minX - dx > width + expandWidth) {
          dx = minX - (width + expandWidth)
        }
      }

      if (dy > 0) {
        if (maxY < -expandHeight) {
          dy = 0
        } else if (maxY - dy < -expandHeight) {
          dy = maxY + expandHeight
        }
      } else if (dy < 0) {
        if (minY > height + expandHeight) {
          dy = 0
        } else if (minY - dy > height + expandHeight) {
          dy = minY - (height + expandHeight)
        }
      }

      if (this.get('direction') === 'x') {
        dy = 0;
      } else if (this.get('direction') === 'y') {
        dx = 0;
      }

      graph.translate(-dx, -dy);
    }
    ev.preventDefault();


    // hide the shapes when the zoom ratio is smaller than optimizeZoom
    // hide the shapes when zoomming
    const enableOptimize = this.get('enableOptimize');
    if (enableOptimize) {
      const optimizeZoom = this.get('optimizeZoom');
      const optimized = this.get('optimized');
      const nodes = graph.getNodes();
      const edges = graph.getEdges();
      const nodesLength = nodes.length;
      const edgesLength = edges.length;

      // hiding
      if (!optimized) {
        for (let n = 0; n < nodesLength; n++) {
          const node = nodes[n];
          if (!node.destroyed) {
            const children = node.get('group').get('children');
            const childrenLength = children.length;
            for (let c = 0; c < childrenLength; c++) {
              const shape = children[c];
              if (!shape.destoryed && !shape.get('isKeyShape')) {
                shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
                shape.hide();
              }
            }
          }
        }

        for (let edgeIndex = 0; edgeIndex < edgesLength; edgeIndex++) {
          const edge = edges[edgeIndex];
          const children = edge.get('group').get('children');
          const childrenLength = children.length;
          for (let c = 0; c < childrenLength; c++) {
            const shape = children[c];
            shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
            shape.hide();
          }
        }
        this.set('optimized', true);
      }

      // showing after 100ms
      clearTimeout(this.get('timeout'));
      const timeout = setTimeout(() => {
        const currentZoom = graph.getZoom();
        const curOptimized = this.get('optimized');
        if (curOptimized) {
          this.set('optimized', false);
          for (let n = 0; n < nodesLength; n++) {
            const node = nodes[n];
            const children = node.get('group').get('children');
            const childrenLength = children.length;
            if (currentZoom < optimizeZoom) {
              const keyShape = node.getKeyShape();
              const oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                const oriVis = shape.get('ori-visibility');
                if (!shape.get('visible') && oriVis) {
                  if (oriVis) shape.show();
                }
              }
            }
          }

          for (let edgeIndex = 0; edgeIndex < edgesLength; edgeIndex++) {
            const edge = edges[edgeIndex];
            const children = edge.get('group').get('children');
            const childrenLength = children.length;
            if (currentZoom < optimizeZoom) {
              const keyShape = edge.getKeyShape();
              const oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (let c = 0; c < childrenLength; c++) {
                const shape = children[c];
                if (!shape.get('visible')) {
                  const oriVis = shape.get('ori-visibility');
                  if (oriVis) shape.show();
                }
              }
            }
          }
        }
      }, 100);
      this.set('timeout', timeout);
    }
  },
};
