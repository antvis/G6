import { Graph } from '@/src';
import type { STDTestCase } from '../types';

export const combo: STDTestCase = async (context) => {
  const data = {
    nodes: [
      { id: 'node-1', data: {}, style: { parentId: 'combo-2', x: 120, y: 100 } },
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
        style: { type: 'rect', parentId: 'combo-2' },
      },
      {
        id: 'combo-2',
      },
    ],
  };

  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    combo: {
      style: {
        labelText: (d) => d.id,
        lineDash: 0,
        collapsedLineDash: [5, 5],
      },
    },
  });

  await graph.render();

  const COMBO_TYPE = ['circle', 'rect'];
  const COLLAPSED_ORIGIN = [
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
  ];
  const COLLAPSED_MARKER_TYPE = ['child-count', 'descendant-count', 'node-count', 'custom'];

  combo.form = (panel) => {
    const config: Record<string, any> = {
      combo2Type: 'circle',
      collapsedOrigin: 'top',
      collapsedMarker: true,
      collapsedMarkerType: 'child-count',
      collapseCombo1: () => {
        graph.updateComboData([
          {
            id: 'combo-1',
            style: {
              collapsed: true,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
              collapsedMarkerType:
                config.collapsedMarkerType === 'custom'
                  ? (children) => children.length.toString() + 'nodes'
                  : config.collapsedMarkerType,
            },
          },
        ]);
        graph.render();
      },
      expandCombo1: () => {
        graph.updateComboData([
          {
            id: 'combo-1',
            style: {
              collapsed: false,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
            },
          },
        ]);
        graph.render();
      },
      collapseCombo2: () => {
        graph.updateComboData((data) => [
          ...data,
          {
            id: 'combo-2',
            style: {
              collapsed: true,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
              collapsedMarkerType:
                config.collapsedMarkerType === 'custom'
                  ? (children) => children.length.toString() + 'nodes'
                  : config.collapsedMarkerType,
            },
          },
        ]);
        graph.render();
      },
      expandCombo2: () => {
        graph.updateComboData([
          {
            id: 'combo-2',
            style: {
              collapsed: false,
              collapsedOrigin: config.collapsedOrigin,
              collapsedMarker: config.collapsedMarker,
            },
          },
        ]);
        graph.render();
      },
      addRemoveNode: async () => {
        const node4 = graph.getNodeData('node-4');
        if (node4) {
          graph.removeNodeData(['node-4']);
        } else {
          graph.addNodeData([
            {
              id: 'node-4',
              style: { parentId: 'combo-2', x: 100, y: 200, fill: 'pink' },
            },
          ]);
        }
        panels.at(-1)?.disable();
        await graph.render();
        panels.at(-1)?.enable();
      },
    };

    const panels = [
      panel.add(config, 'combo2Type', COMBO_TYPE).onChange((type: string) => {
        config.combo2Type = type;
        const combo2Data = graph.getComboData('combo-2');
        graph.updateComboData([{ ...combo2Data, style: { ...combo2Data.style, type: config.combo2Type } }]);
        graph.render();
      }),
      panel.add(config, 'collapsedOrigin', COLLAPSED_ORIGIN),
      panel.add(config, 'collapsedMarker'),
      panel.add(config, 'collapsedMarkerType', COLLAPSED_MARKER_TYPE),
      panel.add(config, 'collapseCombo1'),
      panel.add(config, 'expandCombo1'),
      panel.add(config, 'collapseCombo2'),
      panel.add(config, 'expandCombo2'),
      panel.add(config, 'addRemoveNode'),
    ];

    return panels;
  };

  return graph;
};
