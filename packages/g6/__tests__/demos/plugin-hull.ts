import { Graph, Hull } from '@/src';
import { HullOptions } from '@/src/plugins';
import type { CardinalPlacement } from '@/src/types';

const data = {
  nodes: [
    {
      id: 'node0',
      style: {
        size: 50,
        x: 220.62410328092116,
        y: 326.9855382821517,
        z: 113.94955744703128,
      },
      data: {},
    },
    {
      id: 'node1',
      style: {
        size: 30,
        x: 426.28631115314664,
        y: 421.4641026532594,
        z: 69.8328956021318,
      },
      data: {},
    },
    {
      id: 'node2',
      style: {
        size: 30,
        x: 329.60916465671136,
        y: 88.75724297452824,
        z: 250.02945624246885,
      },
      data: {},
    },
    {
      id: 'node3',
      style: {
        size: 30,
        x: -16.881815891377354,
        y: 255.11326213296195,
        z: 176.79834332083178,
      },
      data: {},
    },
    {
      id: 'node4',
      style: {
        size: 30,
        x: 79.16162795623173,
        y: 493.41204409665306,
        z: 132.42742012198295,
      },
      data: {},
    },
    {
      id: 'node5',
      style: {
        size: 30,
        x: 235.47627478351225,
        y: 540.939496488372,
        z: 359.84770530643084,
      },
      data: {},
    },
    {
      id: 'node6',
      style: {
        size: 15,
        x: 428.5582954499783,
        y: 547.7277221239941,
        z: 292.066285489707,
      },
      data: {},
    },
    {
      id: 'node7',
      style: {
        size: 15,
        x: 546.5257984808264,
        y: 371.71829186008057,
        z: 212.18106937237945,
      },
      data: {},
    },
    {
      id: 'node8',
      style: {
        size: 15,
        x: 333.2546574363148,
        y: -57.78517795478168,
        z: 351.95520541170345,
      },
      data: {},
    },
    {
      id: 'node9',
      style: {
        size: 15,
        x: 202.9634744683668,
        y: -8.527670848371006,
        z: 458.8244455631553,
      },
      data: {},
    },
    {
      id: 'node10',
      style: {
        size: 15,
        x: 473.9801625504269,
        y: 145.56758163841602,
        z: 350.3400618806517,
      },
      data: {},
    },
    {
      id: 'node11',
      style: {
        size: 15,
        x: 458.3574086644886,
        y: 12.645329717202195,
        z: 100.31448085768979,
      },
      data: {},
    },
    {
      id: 'node12',
      style: {
        size: 15,
        x: 353.58208807643365,
        y: 221.50761622705693,
        z: 315.840909508189,
      },
      data: {},
    },
    {
      id: 'node13',
      style: {
        size: 15,
        x: 201.37696725182042,
        y: 133.54311954961742,
        z: 155.00402076440588,
      },
      data: {},
    },
    {
      id: 'node14',
      style: {
        size: 15,
        x: 94.68008724338947,
        y: 241.3180833641008,
        z: 243.50036373490224,
      },
      data: {},
    },
    {
      id: 'node15',
      style: {
        size: 15,
        x: -67.39984359178499,
        y: 127.45518384410109,
        z: 409.3755984258148,
      },
      data: {},
    },
    {
      id: 'node16',
      style: {
        size: 15,
        x: -91.94678983140132,
        y: 359.71346059522347,
        z: 385.4514888070013,
      },
      data: {},
    },
  ],
  edges: [
    {
      id: 'edge1',
      source: 'node0',
      target: 'node1',
      style: {},
      data: {},
    },
    {
      id: 'edge2',
      source: 'node0',
      target: 'node2',
      style: {},
      data: {},
    },
    {
      id: 'edge3',
      source: 'node0',
      target: 'node3',
      style: {},
      data: {},
    },
    {
      id: 'edge4',
      source: 'node0',
      target: 'node4',
      style: {},
      data: {},
    },
    {
      id: 'edge5',
      source: 'node0',
      target: 'node5',
      style: {},
      data: {},
    },
    {
      id: 'edge6',
      source: 'node1',
      target: 'node6',
      style: {},
      data: {},
    },
    {
      id: 'edge7',
      source: 'node1',
      target: 'node7',
      style: {},
      data: {},
    },
    {
      id: 'edge8',
      source: 'node2',
      target: 'node8',
      style: {},
      data: {},
    },
    {
      id: 'edge9',
      source: 'node2',
      target: 'node9',
      style: {},
      data: {},
    },
    {
      id: 'edge10',
      source: 'node2',
      target: 'node10',
      style: {},
      data: {},
    },
    {
      id: 'edge11',
      source: 'node2',
      target: 'node11',
      style: {},
      data: {},
    },
    {
      id: 'edge12',
      source: 'node2',
      target: 'node12',
      style: {},
      data: {},
    },
    {
      id: 'edge13',
      source: 'node2',
      target: 'node13',
      style: {},
      data: {},
    },
    {
      id: 'edge14',
      source: 'node3',
      target: 'node14',
      style: {},
      data: {},
    },
    {
      id: 'edge15',
      source: 'node3',
      target: 'node15',
      style: {},
      data: {},
    },
    {
      id: 'edge16',
      source: 'node3',
      target: 'node16',
      style: {},
      data: {},
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
      style: {
        labelText: (d) => d.id,
      },
    },
    edge: {
      style: {},
    },
    autoFit: 'view',
  });

  await graph.render();

  const hull = graph.getPluginInstance<Hull>('hull');

  const updateHullOptions = (optionsToUpdate: Partial<HullOptions>) => {
    hull.updateOptions((options) => ({ ...options, ...optionsToUpdate }));
  };

  const nodeIds = data.nodes.map((node) => node.id);
  let nodeIndex = 3;
  let all = false;

  pluginHull.form = (panel) => {
    const config = {
      concavity: 100,
      padding: 10,
      corner: 'rounded',
      labelPlacement: 'bottom',
      labelCloseToHull: true,
      labelAutoRotate: true,
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
        .add(config, 'labelCloseToHull')
        .name('Label Close To Hull')
        .onChange((labelCloseToHull: boolean) => {
          updateHullOptions({ labelCloseToHull });
        }),
      panel
        .add(config, 'labelAutoRotate')
        .name('Label Auto Rotate')
        .onChange((labelAutoRotate: boolean) => {
          updateHullOptions({ labelAutoRotate });
        }),
      panel
        .add(
          {
            AddMember: () => {
              hull.addMembers(nodeIds[nodeIndex]);
              nodeIndex = (nodeIndex + 1) % nodeIds.length;
            },
          },
          'AddMember',
        )
        .name('Add Member'),
      panel
        .add(
          {
            RemoveMember: () => {
              hull.removeMembers(nodeIds[nodeIndex - 1]);
              nodeIndex = (nodeIndex - 1) % nodeIds.length;
            },
          },
          'RemoveMember',
        )
        .name('Remove Member'),
      panel
        .add(
          {
            UpdateMembers: () => {
              hull.updateMembers(all ? [] : nodeIds);
              nodeIndex = all ? 0 : nodeIds.length - 1;
              all = !all;
            },
          },
          'UpdateMembers',
        )
        .name('All/None Members'),
    ];
  };

  return graph;
};
