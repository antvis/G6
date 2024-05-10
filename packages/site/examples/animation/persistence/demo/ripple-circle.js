import { Circle as CircleGeometry } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class RippleCircle extends Circle {
  onCreate() {
    const { fill } = this.attributes;
    const r = this.shapeMap.key.style.r;
    const length = 5;
    const fillOpacity = 0.5;

    Array.from({ length }).map((_, index) => {
      const ripple = this.upsert(
        `ripple-${index}`,
        CircleGeometry,
        {
          r,
          fill,
          fillOpacity,
        },
        this,
      );
      ripple.animate(
        [
          { r, fillOpacity },
          { r: r + length * 5, fillOpacity: 0 },
        ],
        {
          duration: 1000 * length,
          iterations: Infinity,
          delay: 1000 * index,
          easing: 'ease-cubic',
        },
      );
    });
  }
}

register(ExtensionCategory.NODE, 'ripple-circle', RippleCircle);

const graph = new Graph({
  container: 'container',
  renderer: () => new Renderer(),
  data: {
    nodes: [{ id: 'node-0' }, { id: 'node-1' }, { id: 'node-2' }, { id: 'node-3' }],
  },
  node: {
    type: 'ripple-circle',
    animation: {
      enter: false,
    },
    style: {
      size: 50,
    },
    palette: ['#3875f6', '#efb041', '#ec5b56', '#72c240'],
  },
  layout: {
    type: 'grid',
  },
});

graph.render();
