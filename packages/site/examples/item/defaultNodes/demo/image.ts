import { Graph, GraphEvent } from '@antv/g6';

const data = {
  nodes: [
    { id: 'image' },
    { id: 'image-halo' },
    { id: 'image-badges' },
    { id: 'image-ports' },
    { id: 'image-active' },
    { id: 'image-selected' },
    { id: 'image-highlight' },
    { id: 'image-inactive' },
    { id: 'image-disabled' },
  ],
};

const graph = new Graph({
  container: 'container',
  data,
  node: {
    style: {
      type: 'image',
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      size: 40,
      labelMaxWidth: 120,
      labelText: (d) => d.id,
      halo: (d) => d.id.includes('halo'),
      ports: (d) =>
        d.id.includes('ports')
          ? [{ placement: 'left' }, { placement: 'right' }, { placement: 'top' }, { placement: 'bottom' }]
          : [],
      badges: (d) =>
        d.id.includes('badges')
          ? [
              { text: 'A', placement: 'right-top' },
              { text: 'Important', placement: 'right' },
              { text: 'Notice', placement: 'right-bottom' },
            ]
          : [],
    },
    state: {
      disabled: {
        opacity: 0.25,
      },
    },
  },
  layout: {
    type: 'grid',
  },
});

graph.render();

graph.on(GraphEvent.AFTER_RENDER, () => {
  graph.setElementState('image-active', 'active');
  graph.setElementState('image-selected', 'selected');
  graph.setElementState('image-highlight', 'highlight');
  graph.setElementState('image-inactive', 'inactive');
  graph.setElementState('image-disabled', 'disabled');
});
