import { Graph, GraphEvent } from '@/src';
import data from '@@/dataset/cluster.json';

export const graphEvent: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        size: 20,
      },
    },
    autoResize: true,
    layout: { type: 'd3force' },
  });

  const events = [
    GraphEvent.BEFORE_RENDER,
    GraphEvent.AFTER_RENDER,
    GraphEvent.BEFORE_DRAW,
    GraphEvent.AFTER_DRAW,
    GraphEvent.BEFORE_LAYOUT,
    GraphEvent.AFTER_LAYOUT,
    GraphEvent.BEFORE_SIZE_CHANGE,
    GraphEvent.AFTER_SIZE_CHANGE,
  ];

  const now = performance.now();
  events.forEach((event) => {
    graph.on(event, (e: any) => {
      console.log('Time: ', performance.now() - now);
      console.log(event, e);
    });
  });

  await graph.render();

  graphEvent.form = (panel) => {
    const config = {
      note: 'See The Console',
      resize: () => {
        const $container = document.getElementById('container')!;
        Object.assign($container.style, { width: '600px', height: '600px' });
        window.dispatchEvent(new Event('resize'));
      },
      follow: false,
      size: 20,
    };
    return [panel.add(config, 'note').name('⚠️ Note').disable()];
  };

  return graph;
};
