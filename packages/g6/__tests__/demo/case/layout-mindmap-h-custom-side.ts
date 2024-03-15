import { Graph, Utils } from '@/src';
import data from '@@/dataset/algorithm-category.json';
import type { STDTestCase } from '../types';

export const layoutMindmapHCustomSide: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: Utils.treeToGraphData(data),
    autoFit: 'view',
    node: {
      // @ts-expect-error
      style: (model: any) => {
        const {
          style: { x },
        } = model;
        return {
          labelText: model.id,
          size: 26,
          labelPlacement: x > 0 ? 'right' : 'left',
          labelMaxWidth: 200,
          labelTextAlign: x > 0 ? 'start' : 'end',
          lineWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          ports: [{ placement: 'right' }, { placement: 'left' }],
        };
      },
    },
    edge: {
      style: {
        type: 'cubic-horizontal',
      },
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getHeight: () => {
        return 16;
      },
      getWidth: () => {
        return 16;
      },
      getVGap: () => {
        return 10;
      },
      getHGap: () => {
        return 50;
      },
      getSide: (d: Model) => {
        if (d.id === 'Classification') {
          return 'left';
        }
        return 'right';
      },
    },
    behaviors: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
