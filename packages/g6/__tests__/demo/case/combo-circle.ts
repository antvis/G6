import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const comboCircle: STDTestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node-1', data: {}, style: { parentId: 'combo-2', x: 100, y: 100 } },
      { id: 'node-2', data: {}, style: { parentId: 'combo-1', x: 300, y: 200 } },
      { id: 'node-3', data: {}, style: { parentId: 'combo-1', x: 200, y: 300 } },
    ],
    edges: [
      { id: 'edge-1', source: 'node-1', target: 'node-2' },
      { id: 'edge-2', source: 'node-2', target: 'node-3' },
    ],
    combos: [
      {
        id: 'combo-1',
        style: { parentId: 'combo-2' },
      },
      {
        id: 'combo-2',
        style: {
          zIndex: -10, // TODO: zIndex?
        },
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d: any) => d.id,
      },
    },
    combo: {
      style: {
        padding: 0,
        labelText: (d: any) => d.id,
        collapsedLineDash: [5, 5],
      },
    },
  });

  await graph.render();

  const COLLAPSED_ORIGIN = ['top', 'bottom', 'left', 'right', 'center'];
  const COLLAPSED_MARKER_TYPE = ['childCount', 'descendantCount', 'nodeCount'];

  comboCircle.form = (panel) => {
    const config = {
      collapsedOrigin: 'top',
      collapsedMarker: true,
      collapsedMarkerType: 'childCount',
      collapseCombo2: () => {
        graph.updateComboData((data) => [
          ...data,
          {
            id: 'combo-2',
            style: {
              collapsed: true,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
              collapsedMarkerType: config.collapsedMarkerType,
            },
          },
        ]);
        graph.render();
      },
      expandCombo2: () => {
        graph.updateComboData((data) => [
          ...data,
          {
            id: 'combo-2',
            style: {
              collapsed: false,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
              collapsedMarkerType: config.collapsedMarkerType,
            },
          },
        ]);
        graph.render();
      },
    };

    return [
      panel.add(config, 'collapsedOrigin', COLLAPSED_ORIGIN).onChange((collapsedOrigin: string) => {
        config.collapsedOrigin = collapsedOrigin;
      }),
      panel.add(config, 'collapsedMarker').onChange((collapsedMarker: boolean) => {
        config.collapsedMarker = collapsedMarker;
      }),
      panel.add(config, 'collapsedMarkerType', COLLAPSED_MARKER_TYPE).onChange((collapsedMarkerType: string) => {
        config.collapsedMarkerType = collapsedMarkerType;
      }),
      panel.add(config, 'collapseCombo2'),
      panel.add(config, 'expandCombo2'),
    ];
  };

  return graph;
};
