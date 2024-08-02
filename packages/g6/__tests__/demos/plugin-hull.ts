import { HullOptions } from '@/src/plugins';
import type { CardinalPlacement } from '@/src/types';
import { Graph, Hull } from '@antv/g6';

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

export const pluginHull: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    behaviors: ['drag-canvas', 'drag-element'],
    plugins: [
      {
        key: 'hull',
        type: 'hull',
        members: ['node0', 'node1', 'node2'],
        labelText: 'convex hull',
        labelFontWeight: '700',
        labelBackground: true,
        labelBackgroundFill: 'pink',
        lineWidth: 5,
      },
    ],
    node: {
      style: { labelText: (d) => d.id },
    },
    edge: {
      style: {},
    },
    autoFit: 'view',
  });

  await graph.render();

  const hull = graph.getPluginInstance<Hull>('hull');

  const updateHullOptions = (optionsToUpdate: Partial<HullOptions>) => {
    graph.updatePlugin({ key: 'hull', ...optionsToUpdate });
    graph.render();
  };

  pluginHull.form = (panel) => {
    const nodeIds = graph.getNodeData().map((node) => node.id);
    const config = {
      concavity: 100,
      padding: 10,
      corner: 'rounded',
      labelPlacement: 'bottom',
      labelCloseToPath: true,
      labelAutoRotate: true,
      node: 'node0',
    };
    return [
      panel.add(config, 'concavity', 0, 100, 1).onChange((concavity: number) => {
        updateHullOptions({ concavity });
      }),
      panel.add(config, 'padding', 0, 100, 1).onChange((padding: number) => {
        updateHullOptions({ padding });
      }),
      panel
        .add(config, 'corner', ['rounded', 'smooth', 'sharp'])
        .name('Corner Type')
        .onChange((corner: 'rounded' | 'smooth' | 'sharp') => {
          updateHullOptions({ corner });
        }),
      panel
        .add(config, 'labelPlacement', ['top', 'bottom', 'left', 'right'])
        .name('Label Placement')
        .onChange((labelPlacement: CardinalPlacement) => {
          updateHullOptions({ labelPlacement });
        }),
      panel
        .add(config, 'labelCloseToPath')
        .name('Label Close To Path')
        .onChange((labelCloseToPath: boolean) => {
          updateHullOptions({ labelCloseToPath });
        }),
      panel
        .add(config, 'labelAutoRotate')
        .name('Label Auto Rotate')
        .onChange((labelAutoRotate: boolean) => {
          updateHullOptions({ labelAutoRotate });
        }),
      panel.add(config, 'node', nodeIds).name('Node'),
      panel
        .add(
          {
            AddMember: () => {
              hull.addMember(config.node);
            },
          },
          'AddMember',
        )
        .name('Add Member'),
      panel
        .add(
          {
            RemoveMember: () => {
              hull.removeMember(config.node);
            },
          },
          'RemoveMember',
        )
        .name('Remove Member'),
    ];
  };

  return graph;
};
