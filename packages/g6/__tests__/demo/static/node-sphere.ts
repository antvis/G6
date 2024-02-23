import { Canvas } from '@antv/g';
import { CubeGeometry, Mesh, MeshBasicMaterial, Plugin as Plugin3D } from '@antv/g-plugin-3d';
import { Plugin as PluginControl } from '@antv/g-plugin-control';
import { Renderer } from '@antv/g-webgl';
import type { StaticTestCase } from '../types';

export const nodeSphere: StaticTestCase = async () => {
  const renderer = new Renderer();
  renderer.registerPlugin(new Plugin3D());
  renderer.registerPlugin(new PluginControl());

  // create a canvas
  const canvas = new Canvas({
    container: 'test-root',
    width: 600,
    height: 500,
    renderer,
  });

  await canvas.ready;

  // use GPU device
  const plugin = renderer.getPlugin('device-renderer');
  const device = plugin.getDevice();

  const cubeGeometry = new CubeGeometry(device, {
    width: 200,
    height: 200,
    depth: 200,
  });
  const basicMaterial = new MeshBasicMaterial(device, {});

  const cube = new Mesh({
    style: {
      x: 100,
      y: 100,
      z: 0,
      fill: '#1890FF',
      opacity: 1,
      geometry: cubeGeometry,
      material: basicMaterial,
    },
  });
  // cube.setPosition(300, 250, 0);
  canvas.appendChild(cube);

  /**
  const data = {
    nodes: [
      { id: 'sphere' },
      { id: 'sphere-halo' },
      { id: 'sphere-badges' },
      { id: 'sphere-ports' },
      { id: 'sphere-active' },
      { id: 'sphere-selected' },
      { id: 'sphere-highlight' },
      { id: 'sphere-inactive' },
    ],
  };
   
  const graph = new Graph({
    container: canvas,
    data,
    node: {
      style: {
        type: 'sphere', // 👈🏻 Node shape type.
        size: 100,
        x: 100,
        y: 100,
        z: 100,
        fill: '#1783FF',
        texture: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*npAsSLPX4A4AAAAAAAAAAAAAARQnAQ',
        labelText: (d) => d.id,
      },
      state: {
        active: {
          halo: true,
        },
        selected: {
          halo: true,
          lineWidth: 2,
          stroke: '#000',
        },
        highlight: {
          halo: false,
          lineWidth: 2,
          stroke: '#000',
        },
        inactive: {
          opacity: 0.2,
        },
      },
    },
    layout: {
      type: 'grid',
    },
    animation,
  });
   
  await graph.render();
   
  graph.setElementState('sphere-active', 'active');
  graph.setElementState('sphere-selected', 'selected');
  graph.setElementState('sphere-highlight', 'highlight');
  graph.setElementState('sphere-inactive', 'inactive');
   */
};
