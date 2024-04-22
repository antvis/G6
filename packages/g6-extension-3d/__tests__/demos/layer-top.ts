import type { GraphData } from '@antv/g6';
import { ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Plane, Sphere, renderer } from '../../src';

export const layerTop: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, '3d-light', Light);
  register(ExtensionCategory.NODE, 'sphere', Sphere);
  register(ExtensionCategory.NODE, 'plane', Plane);
  register(ExtensionCategory.EDGE, 'line3d', Line3D);
  register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

  const result = await fetch('https://assets.antv.antgroup.com/g6/3-layer-top.json');
  const { nodes, edges } = await result.json();

  const colors = ['rgb(240, 134, 82)', 'rgb(30, 160, 230)', 'rgb(122, 225, 116)'];
  const data: GraphData = {};
  data.nodes = nodes.map(({ name, pos, layer }: any) => ({
    id: name,
    data: { layer },
    type: 'sphere',
    style: {
      radius: 10,
      color: colors[layer - 1],
      materialType: 'phong',
      ...pos,
    },
  }));

  new Array(3).fill(0).forEach((_, i) => {
    data.nodes!.push({
      id: `plane-${i + 1}`,
      type: 'plane',
      style: {
        size: 1000,
        color: colors[i],
        y: -300 + 300 * i + 10,
      },
    });
  });

  data.edges = edges.map(({ source, target }: any) => ({
    source,
    target,
  }));

  const graph = new Graph({
    ...context,
    renderer,
    x: 100,
    y: 100,
    data,
    zoom: 0.4,
    edge: {
      type: 'line3d',
      style: {
        lineWidth: 5,
      },
    },
    behaviors: ['observe-canvas-3d'],
    plugins: [
      {
        type: 'camera-setting',
        projectionMode: 'perspective',
        near: 0.1,
        far: 50000,
        fov: 45,
        aspect: 1,
      },
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
