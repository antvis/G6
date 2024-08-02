import data from '@@/dataset/cluster.json';
import { CameraSetting, ExtensionCategory, Graph, register } from '@antv/g6';

export const pluginCameraSetting: TestCase = async (context) => {
  register(ExtensionCategory.PLUGIN, 'camera-setting', CameraSetting);

  const graph = new Graph({
    ...context,
    data,
    layout: { type: 'd3-force' },
    plugins: [{ key: 'camera-setting', type: 'camera-setting' }],
  });

  pluginCameraSetting.form = (panel) => {
    const config = {
      cameraType: 'orbiting',
      near: 0.1,
      far: 1000,
      fov: 45,
      // aspect: 'auto',
      projectionMode: 'orthographic',
      distance: 500,
      roll: 0,
      elevation: 0,
      azimuth: 0,
    };

    const handleChange = () => {
      graph.updatePlugin({
        key: 'camera-setting',
        type: 'camera-setting',
        ...config,
      });
    };

    panel.onChange(handleChange);

    return [
      panel.add(config, 'cameraType', ['orbiting', 'exploring', 'tracking']).name('Camera Type'),
      panel.add(config, 'near', 0.1, 10, 0.1).name('Near'),
      panel.add(config, 'far', 100, 1000, 10).name('Far'),
      panel.add(config, 'fov', 0, 180, 1).name('Fov'),
      // panel.add(config, 'aspect', ['auto', 'custom']).name('Aspect'),
      panel.add(config, 'projectionMode', ['orthographic', 'perspective']).name('Projection Mode'),
      panel.add(config, 'distance', 100, 1000, 10).name('Distance'),
      panel.add(config, 'roll', -180, 180, 1).name('Roll'),
      panel.add(config, 'elevation', -90, 90, 1).name('Elevation'),
      panel.add(config, 'azimuth', -180, 180, 1).name('Azimuth'),
    ];
  };

  await graph.render();

  return graph;
};
