import type { BubbleSetsOptions } from '@/src/plugins';
import { idOf } from '@/src/utils/id';
import { BubbleSets, Graph } from '@antv/g6';

const data = {
  nodes: [
    {
      id: 'node0',
      style: { size: 50, x: 220, y: 326 },
    },
    {
      id: 'node1',
      style: { size: 30, x: 426, y: 421 },
    },
    {
      id: 'node2',
      style: { size: 30, x: 329, y: 88 },
    },
    {
      id: 'node3',
      style: { size: 30, x: -16, y: 255 },
    },
    {
      id: 'node4',
      style: { size: 30, x: 79, y: 493 },
    },
    {
      id: 'node5',
      style: { size: 30, x: 235, y: 540 },
    },
    {
      id: 'node6',
      style: { size: 15, x: 428, y: 547 },
    },
    {
      id: 'node7',
      style: { size: 15, x: 546, y: 371 },
    },
    {
      id: 'node8',
      style: { size: 15, x: 333, y: -57 },
    },
    {
      id: 'node9',
      style: { size: 15, x: 202, y: -8 },
    },
    {
      id: 'node10',
      style: { size: 15, x: 473, y: 145 },
    },
    {
      id: 'node11',
      style: { size: 15, x: 458, y: 12 },
    },
    {
      id: 'node12',
      style: { size: 15, x: 353, y: 221 },
    },
    {
      id: 'node13',
      style: { size: 15, x: 201, y: 133 },
    },
    {
      id: 'node14',
      style: { size: 15, x: 94, y: 241 },
    },
    {
      id: 'node15',
      style: { size: 15, x: -67, y: 127 },
    },
    {
      id: 'node16',
      style: { size: 15, x: -91, y: 359 },
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node0',
      target: 'node1',
    },
    {
      id: 'edge2',
      source: 'node0',
      target: 'node2',
    },
    {
      id: 'edge3',
      source: 'node0',
      target: 'node3',
    },
    {
      id: 'edge4',
      source: 'node0',
      target: 'node4',
    },
    {
      id: 'edge5',
      source: 'node0',
      target: 'node5',
    },
    {
      id: 'edge6',
      source: 'node1',
      target: 'node6',
    },
    {
      id: 'edge7',
      source: 'node1',
      target: 'node7',
    },
    {
      id: 'edge8',
      source: 'node2',
      target: 'node8',
    },
    {
      id: 'edge9',
      source: 'node2',
      target: 'node9',
    },
    {
      id: 'edge10',
      source: 'node2',
      target: 'node10',
    },
    {
      id: 'edge11',
      source: 'node2',
      target: 'node11',
    },
    {
      id: 'edge12',
      source: 'node2',
      target: 'node12',
    },
    {
      id: 'edge13',
      source: 'node2',
      target: 'node13',
    },
    {
      id: 'edge14',
      source: 'node3',
      target: 'node14',
    },
    {
      id: 'edge15',
      source: 'node3',
      target: 'node15',
    },
    {
      id: 'edge16',
      source: 'node3',
      target: 'node16',
    },
  ],
  combos: [],
};

export const pluginBubbleSets: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      {
        key: 'bubble-sets',
        type: 'bubble-sets',
        members: ['node0', 'node1'],
        labelText: 'Bubble',
      },
    ],
    node: { style: { labelText: (d) => d.id } },
    autoFit: 'view',
  });

  await graph.render();

  pluginBubbleSets.form = (panel) => {
    const bubblesets = graph.getPluginInstance<BubbleSets>('bubble-sets');

    const config = {
      member: 'node0',
      // default options in bubblesets-js
      // More info see: https://github.com/upsetjs/bubblesets-js/blob/main/src/BubbleSets.ts
      maxRoutingIterations: 100,
      maxMarchingIterations: 20,
      pixelGroup: 4,
      edgeR0: 10,
      edgeR1: 20,
      nodeR0: 15,
      nodeR1: 50,
      morphBuffer: 10,
      threshold: 1,
      memberInfluenceFactor: 1,
      edgeInfluenceFactor: 1,
      AvoidMemberInfluenceFactor: -0.8,
      virtualEdges: true,
    };

    const members = [
      ...graph.getNodeData().map(idOf),
      ...graph.getEdgeData().map(idOf),
      ...graph.getComboData().map(idOf),
    ];

    const panels = [
      panel.add(config, 'member', members).name('Element'),
      panel
        .add(
          {
            AddMember: () => {
              bubblesets.addMember(config.member);
            },
          },
          'AddMember',
        )
        .name('Add Element as Member'),
      panel
        .add(
          {
            RemoveMember: () => {
              bubblesets.removeMember(config.member);
            },
          },
          'RemoveMember',
        )
        .name('Remove Element as Member'),
      panel
        .add(
          {
            AddAvoidMember: () => {
              bubblesets.addAvoidMember(config.member);
            },
          },
          'AddAvoidMember',
        )
        .name('Add Element as Non-Member'),

      panel
        .add(
          {
            RemoveMember: () => {
              bubblesets.removeAvoidMember(config.member);
            },
          },
          'RemoveMember',
        )
        .name('Remove Element as Non-Member'),
    ];

    const updateOptions = (options: BubbleSetsOptions) => {
      graph.updatePlugin({
        key: 'bubble-sets',
        ...options,
      });
      graph.render();
    };

    Object.keys(config)
      .slice(1, -1)
      .forEach((key) => {
        panels.push(
          panel.add(config, key, 0, 100, 1).onChange((value: number) => {
            updateOptions({ [key]: value } as BubbleSetsOptions);
          }),
        );
      });

    panels.push(
      panel.add(config, 'virtualEdges').onChange((value: boolean) => {
        updateOptions({ virtualEdges: value } as BubbleSetsOptions);
      }),
    );

    return panels;
  };

  return graph;
};
