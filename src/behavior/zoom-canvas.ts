import { G6Event, IG6GraphEvent } from '../types';

const DELTA = 0.05;

export default {
  getDefaultCfg(): object {
    return {
      sensitivity: 2,
      minZoom: 0.2,
      maxZoom: 10,
      enableOptimize: false,
      optimizeZoom: 0.7
    };
  },
  getEvents(): { [key in G6Event]?: string } {
    return {
      wheel: 'onWheel',
    };
  },
  onWheel(e: IG6GraphEvent) {
    const { graph } = this;
    if (!this.shouldUpdate.call(this, e)) {
      return;
    }
    e.preventDefault();
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

    const enableOptimize = this.get('enableOptimize')
    if(enableOptimize) {
      const optimizeZoom = this.get('optimizeZoom')

      const currentZoom = graph.getZoom()
      if(currentZoom < optimizeZoom) {
        const nodes = graph.getNodes()
        const edges = graph.getEdges()
        nodes.map(node => {
          if(!node.destroyed) {
            const children = node.getContainer().get('children')
            children.map(shape => {
              if(!shape.destoryed && !shape.get('isKeyShape')) {
                shape.hide()
              }
            })
          }
        })
  
        edges.map(edge => {
          const children = edge.getContainer().get('children')
          children.map(shape => {
            if(!shape.get('isKeyShape')) {
              shape.hide()
            }
          })
        })
      } else {
        const nodes = graph.getNodes()
        const edges = graph.getEdges()
        nodes.map(node => {
          const children = node.getContainer().get('children')
          children.map(shape => {
            if(!shape.get('visible')) {
              shape.show()
            }
          })
        })
  
        edges.map(edge => {
          const children = edge.getContainer().get('children')
          children.map(shape => {
            if(!shape.get('visible')) {
              shape.show()
            }
          })
        })
      }
    }
    
    graph.zoom(ratio, { x: point.x, y: point.y });
    graph.emit('wheelzoom', e);
  },
};
