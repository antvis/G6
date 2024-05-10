import { Circle } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { CubicHorizontal, ExtensionCategory, Graph, register, subStyleProps } from '@antv/g6';

class FlyMarkerCubic extends CubicHorizontal {
  getMarkerStyle(attributes) {
    return { r: 5, fill: '#c3d5f9', offsetPath: this.shapeMap.key, ...subStyleProps(attributes, 'marker') };
  }

  onCreate() {
    const marker = this.upsert('marker', Circle, this.getMarkerStyle(this.attributes), this);
    marker.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
      duration: 3000,
      iterations: Infinity,
    });
  }
}

register(ExtensionCategory.EDGE, 'fly-marker-cubic', FlyMarkerCubic);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [
      { id: 'node-0', style: { x: 50, y: 50 } },
      { id: 'node-1', style: { x: 200, y: 200 } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'fly-marker-cubic',
    style: {
      lineDash: [10, 10],
    },
  },
});

graph.render();
