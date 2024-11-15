import { Circle as CircleGeometry } from '@antv/g';
import { CanvasEvent, Circle, ExtensionCategory, Graph, NodeEvent, register } from '@antv/g6';

class LightNode extends Circle {
  render(attributes, container) {
    super.render(attributes, container);
    this.upsert('light', CircleGeometry, { r: 8, fill: '#0f0', cx: 0, cy: -25 }, container);
  }
}

register(ExtensionCategory.NODE, 'light', LightNode);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node1', style: { x: 100, y: 150 } },
      { id: 'node2', style: { x: 300, y: 150 } },
    ],
    edges: [{ source: 'node1', target: 'node2' }],
  },
  node: {
    type: 'light',
    style: {
      size: 100,
      labelText: (d) => d.style.labelText || 'Click the Light',
      labelPlacement: 'center',
      labelBackground: true,
      labelBackgroundFill: '#fff',
      labelBackgroundFillOpacity: 0.8,
    },
  },
  behaviors: ['drag-element'],
});

graph.render();

graph.on(NodeEvent.CLICK, (event) => {
  const { target, originalTarget } = event;
  if (originalTarget.className === 'light') {
    graph.updateNodeData([{ id: target.id, states: ['selected'], style: { labelText: 'Clicked!' } }]);
    graph.draw();
  }
});

graph.on(CanvasEvent.CLICK, () => {
  const selectedIds = graph.getElementDataByState('node', 'selected').map((node) => node.id);
  graph.updateNodeData(selectedIds.map((id) => ({ id, states: [], style: { labelText: 'Click the Light' } })));
  graph.draw();
});
