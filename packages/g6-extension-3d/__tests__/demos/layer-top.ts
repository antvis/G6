import type { GraphData } from '@antv/g6';
import { Graph, register } from '@antv/g6';
import { Light, Line3D, Plane, Sphere, renderer } from '../../src';

export const layerTop = async (context) => {
  register('plugin', '3d-light', Light);
  register('node', 'sphere', Sphere);
  register('node', 'plane', Plane);
  register('edge', 'line3d', Line3D);

  const result = await fetch('https://assets.antv.antgroup.com/g6/3-layer-top.json');
  const { nodes, edges } = await result.json();

  const colors = ['rgb(240, 134, 82)', 'rgb(30, 160, 230)', 'rgb(122, 225, 116)'];
  const data: GraphData = {};
  data.nodes = nodes.map(({ name, pos, layer }) => ({
    id: name,
    data: { layer },
    style: {
      type: 'sphere',
      radius: 10,
      color: colors[layer - 1],
      materialType: 'phong',
      ...pos,
    },
  }));

  new Array(3).fill(0).forEach((_, i) => {
    data.nodes!.push({
      id: `plane-${i + 1}`,
      style: {
        type: 'plane',
        size: 1000,
        color: colors[i],
        y: -300 + 300 * i + 10,
      },
    });
  });

  data.edges = edges.map(({ source, target }) => ({
    source,
    target,
  }));

  const graph = new Graph({
    ...context,
    renderer,
    data,
    node: {
      style: {},
    },
    edge: {
      style: {
        type: 'line3d',
        lineWidth: 5,
      },
    },
    plugins: [
      {
        type: '3d-light',
        directional: {
          direction: [0, 0, 1],
        },
      },
    ],
  });

  await graph.render();

  return graph;
};
