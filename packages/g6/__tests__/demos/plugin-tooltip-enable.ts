import type { ElementDatum, IElementEvent } from '@antv/g6';
import { Graph } from '@antv/g6';

export const pluginTooltipEnable: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', style: { x: 150, y: 100 }, data: { type: 'test1', desc: 'This is a tooltip' } },
        { id: 'node2', style: { x: 150, y: 200 }, data: { type: 'test1', desc: '' } },
        { id: 'node3', style: { x: 150, y: 300 }, data: { type: 'test2', desc: 'This is a tooltip' } },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      {
        key: 'tooltip',
        type: 'tooltip',
        trigger: 'click',
        enable: (e: IElementEvent, items: ElementDatum[]) => {
          return items[0].data?.type === 'test1';
        },
        getContent: (evt: IElementEvent, items: ElementDatum[]) => {
          return items[0].data?.desc || '';
        },
      },
    ],
  });

  await graph.render();

  return graph;
};

export const pluginTooltipPrefixClsEnable: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node11', style: { x: 150, y: 100 }, data: { type: 'test1', desc: 'This is a tooltip' } },
        { id: 'node22', style: { x: 150, y: 200 }, data: { type: 'test1', desc: '' } },
        { id: 'node33', style: { x: 150, y: 300 }, data: { type: 'test2', desc: 'This is a tooltip' } },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    plugins: [
      {
        key: 'tooltip',
        type: 'tooltip',
        trigger: 'click',
        prefixCls: 'g6prefix-',
        enable: (e: IElementEvent, items: ElementDatum[]) => {
          return items[0].data?.type === 'test1';
        },
        getContent: (evt: IElementEvent, items: ElementDatum[]) => {
          return items[0].data?.desc || '';
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
