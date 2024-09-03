import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';
import { Light, Line3D, ObserveCanvas3D, Sphere, ZoomCanvas3D, renderer } from '@antv/g6-extension-3d';

register(ExtensionCategory.PLUGIN, '3d-light', Light);
register(ExtensionCategory.NODE, 'sphere', Sphere);
register(ExtensionCategory.EDGE, 'line3d', Line3D);
register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);
register(ExtensionCategory.BEHAVIOR, 'zoom-canvas-3d', ZoomCanvas3D);
register(ExtensionCategory.BEHAVIOR, 'observe-canvas-3d', ObserveCanvas3D);

fetch('https://assets.antv.antgroup.com/g6/eva-3d-data.json')
  .then((res) => res.json())
  .then(({ nodes, edges }) => {
    const degree = new Map();
    edges.forEach(({ source, target }) => {
      if (!degree.has(source)) degree.set(source, 0);
      if (!degree.has(target)) degree.set(target, 0);
      degree.set(source, degree.get(source) + 1);
      degree.set(target, degree.get(target) + 1);
    });
    nodes.forEach((node) => {
      const { id } = node;
      Object.assign(node.data, { degree: degree.get(id) ?? 0 });
      return node;
    });

    return { nodes, edges };
  })
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      renderer,
      data,
      animation: false,
      node: {
        type: 'sphere',
        style: {
          materialType: 'phong',
          size: (d) => 50 + d.data.degree,
          x: (d) => d.data.x,
          y: (d) => d.data.y,
          z: (d) => d.data.z,
        },
        palette: {
          color: 'tableau',
          type: 'group',
          field: 'cluster',
        },
      },
      edge: {
        type: 'line3d',
        style: {
          lineWidth: 0.4,
          opacity: 0.4,
          stroke: '#fff',
        },
      },
      behaviors: ['observe-canvas-3d', 'zoom-canvas-3d'],
      plugins: [
        {
          type: 'camera-setting',
          projectionMode: 'orthographic',
          near: 1,
          far: 10000,
          fov: 45,
          aspect: 1,
        },
        {
          type: '3d-light',
          directional: {
            direction: [0, 0, 1],
          },
        },
        {
          type: 'background',
          background: '#000',
        },
      ],
    });

    graph.draw().then(() => {
      const camera = graph.getCanvas().getCamera();
      let frame;
      let counter = 0;
      const tick = () => {
        if (counter < 80) {
          camera.dolly(4);
        }
        camera.rotate(0.4, 0);
        counter++;

        frame = requestAnimationFrame(tick);
        if (counter > 160 && frame) {
          cancelAnimationFrame(frame);
        }
      };

      tick();
    });
  });
