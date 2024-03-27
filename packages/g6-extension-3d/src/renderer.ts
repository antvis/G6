import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as Plugin3D } from '@antv/g-plugin-3d';
import { Plugin as PluginControl } from '@antv/g-plugin-control';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import type { CanvasOptions } from '@antv/g6';

export const renderer: CanvasOptions['renderer'] = (layer) => {
  if (layer === 'label' || layer === 'transientLabel') {
    return new CanvasRenderer();
  }

  const renderer = new WebGLRenderer();

  if (['main', 'transient'].includes(layer)) {
    renderer.registerPlugin(
      new DragNDropPlugin({
        isDocumentDraggable: true,
        isDocumentDroppable: true,
        dragstartDistanceThreshold: 10,
        dragstartTimeThreshold: 100,
      }),
    );
  }

  if (layer === 'main') {
    renderer.registerPlugin(new Plugin3D());
    renderer.registerPlugin(new PluginControl());
  } else {
    renderer.unregisterPlugin(renderer.getPlugin('dom-interaction'));
  }

  return renderer;
};
