import { Graph } from '@/src';
import factory from '@@/assets/factory.svg';
import store from '@@/assets/store.svg';
import warehouse from '@@/assets/warehouse.svg';

const data = {
  nodes: [
    {
      id: 'assembly-line-1',
      data: {
        type: 'factory',
        name: 'Assembly Line 1',
      },
      combo: 'factory',
      style: { x: 50, y: 150 },
    },
    {
      id: 'assembly-line-2',
      data: {
        type: 'factory',
        name: 'Assembly Line 2',
      },
      combo: 'factory',
      style: { x: 50, y: 300 },
    },
    {
      id: 'warehouse-1-container-1',
      combo: 'warehouse-1',
      data: {
        type: 'container',
        name: 'Container 1',
      },
      style: { x: 275, y: 175 },
    },
    {
      id: 'warehouse-1-container-2',
      combo: 'warehouse-1',
      data: {
        type: 'container',
        name: 'Container 2',
      },
      style: { x: 275, y: 115 },
    },
    {
      id: 'warehouse-1-container-3',
      combo: 'warehouse-1',
      data: {
        type: 'container',
        name: 'Container 3',
      },
      style: { x: 275, y: 55 },
    },
    {
      id: 'warehouse-2-container-1',
      combo: 'warehouse-2',
      data: {
        type: 'container',
        name: 'Container 1',
      },
      style: { x: 275, y: 255 },
    },
    {
      id: 'warehouse-2-container-2',
      combo: 'warehouse-2',
      data: {
        type: 'container',
        name: 'Container 2',
      },
      style: { x: 275, y: 315 },
    },
    {
      id: 'warehouse-2-container-3',
      combo: 'warehouse-2',
      data: {
        type: 'container',
        name: 'Container 3',
      },
      style: { x: 275, y: 370 },
    },
    {
      id: 'warehouse-2-container-4',
      combo: 'warehouse-2',
      data: {
        type: 'container',
        name: 'Container 4',
      },
      style: { x: 275, y: 430 },
    },
    {
      id: 'store',
      data: {
        type: 'store',
        name: 'Store',
      },
      style: { x: 500, y: 225 },
    },
  ],
  edges: [
    {
      id: 'g15',
      source: 'assembly-line-1',
      target: 'warehouse-1-container-1',
      data: {
        transportation: 'airplane',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-1-container-1',
      },
    },
    {
      id: 'g16',
      source: 'assembly-line-1',
      target: 'warehouse-1-container-2',
      data: {
        transportation: 'truck',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-1-container-2',
      },
    },
    {
      id: 'g17',
      source: 'assembly-line-1',
      target: 'warehouse-1-container-3',
      data: {
        transportation: 'truck',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-1-container-3',
      },
    },
    {
      id: 'g18',
      source: 'assembly-line-2',
      target: 'warehouse-2-container-1',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-2-container-1',
      },
    },
    {
      id: 'g19',
      source: 'assembly-line-2',
      target: 'warehouse-2-container-2',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-2-container-2',
      },
    },
    {
      id: 'g20',
      source: 'assembly-line-2',
      target: 'warehouse-2-container-3',
      data: {
        transportation: 'truck',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-2-container-3',
      },
    },
    {
      id: 'g21',
      source: 'assembly-line-2',
      target: 'warehouse-2-container-4',
      data: {
        transportation: 'truck',
      },
      style: {
        sourceNode: 'factory',
        targetNode: 'warehouse-2-container-4',
      },
    },
    {
      id: 'g22',
      source: 'warehouse-1-container-1',
      target: 'store',
      data: {
        transportation: 'truck',
      },
      style: {
        sourceNode: 'warehouse-1-container-1',
        targetNode: 'store',
      },
    },
    {
      id: 'g23',
      source: 'warehouse-1-container-2',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-1-container-2',
        targetNode: 'store',
      },
    },
    {
      id: 'g24',
      source: 'warehouse-1-container-3',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-1-container-3',
        targetNode: 'store',
      },
    },
    {
      id: 'g25',
      source: 'warehouse-2-container-1',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-2-container-1',
        targetNode: 'store',
      },
    },
    {
      id: 'g26',
      source: 'warehouse-2-container-2',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-2-container-2',
        targetNode: 'store',
      },
    },
    {
      id: 'g27',
      source: 'warehouse-2-container-3',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-2-container-3',
        targetNode: 'store',
      },
    },
    {
      id: 'g28',
      source: 'warehouse-2-container-4',
      target: 'store',
      data: {
        transportation: 'train',
      },
      style: {
        sourceNode: 'warehouse-2-container-4',
        targetNode: 'store',
      },
    },
  ],
  combos: [
    {
      id: 'factory',
      data: {
        type: 'factory',
        name: 'Factory',
      },
    },
    {
      id: 'warehouse-1',
      combo: 'warehouse',
      data: {
        type: 'warehouse',
        name: 'Warehouse 1',
      },
    },
    {
      id: 'warehouse-2',
      combo: 'warehouse',
      data: {
        type: 'warehouse',
        name: 'Warehouse 2',
      },
    },
    {
      id: 'warehouse',
      data: {
        type: 'warehouse',
        name: 'Warehouses',
      },
    },
  ],
};

export const demoSupplyChains: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: (datum) => ({
        labelText: datum.data!.name,
        labelFill: '#fff',
        labelBackground: true,
        labelBackgroundFill: '#00C9C9',
        labelBackgroundOpacity: 1,
        labelBackgroundRadius: 10,
        labelPadding: [-3, 5],
        labelFontSize: 10,
        iconSrc: datum.data?.type === 'factory' ? factory : datum.data?.type === 'store' ? store : warehouse,
        iconWidth: 24,
        iconHeight: 24,
        size: 30,
        fill: 'transparent',
      }),
    },
    edge: {
      style: (datum) => {
        const index = ['airplane', 'truck', 'train'].indexOf(datum.data?.transportation as string);
        const color = ['#5B8FF9', '#61DDAA', '#F6903D'][index];
        return {
          stroke: color,
          labelText: datum.data!.transportation,
          labelFill: '#fff',
          labelBackground: true,
          labelBackgroundFill: color,
          labelBackgroundOpacity: 1,
          labelBackgroundRadius: 10,
          labelPadding: [-3, 5],
          labelFontSize: 8,
          lineDash: 0,
          ...datum.style,
        };
      },
    },
    combo: {
      type: 'rect',
      style: (datum) => ({
        stroke: datum.style?.collapsed ? ' transparent' : '#99add1',
        fill: datum.style?.collapsed ? ' transparent' : '#99add1',
        fillOpacity: 0.05,
        labelBackground: true,
        labelBackgroundFill: '#00C9C9',
        labelBackgroundOpacity: 1,
        labelBackgroundRadius: 10,
        labelFill: '#fff',
        labelFontSize: 10,
        labelPadding: [-3, 5],
        labelText: datum.data!.name,
        collapsedMarker: true,
        collapsedMarkerSrc: datum.data?.type === 'factory' ? factory : datum.data?.type === 'store' ? store : warehouse,
        collapsedMarkerWidth: 32,
        collapsedMarkerHeight: 32,
      }),
      state: {
        active: {
          halo: false,
          stroke: '#5AD8A6',
          lineWidth: 2,
        },
      },
    },
    behaviors: ['collapse-expand', 'drag-element'],
    transforms: [
      {
        key: 'process-parallel-edges',
        type: 'process-parallel-edges',
        distance: 20,
        style: (edges) => ({
          stroke: '#99add1',
          lineWidth: 3,
          lineDash: [2, 2],
          labelText: edges.length.toString(),
          labelBackgroundFill: '#99add1',
        }),
      },
    ],
  });

  graph.render();

  demoSupplyChains.form = (panel) => {
    const config = {
      mode: 'bundle',
    };
    return [
      panel
        .add(config, 'Parallel Edge Mode', ['bundle', 'merge'])
        .name('node-1 type')
        .onChange((value: string) => {
          graph.updateTransform({
            key: 'process-parallel-edges',
            mode: value,
          });
          graph.render();
        }),
    ];
  };
  return graph;
};
