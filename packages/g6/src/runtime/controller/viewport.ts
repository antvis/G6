import { ICamera, PointLike } from '@antv/g';
import { IGraph } from '../../types';
import { CameraAnimationOptions } from '../../types/animate';
import { ViewportChangeHookParams } from '../../types/hook';

let landmarkCounter = 0;

export class ViewportController {
  public graph: IGraph;

  constructor(graph: IGraph<any>) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.viewportchange.tap(this.onViewportChange.bind(this));
  }

  private async onViewportChange({ action, options }: ViewportChangeHookParams) {
    const camera = this.graph.canvas.getCamera();
    if (action === 'translate') {
      await this.translate(options, camera);
    } else if (action === 'rotate') {
    } else if (action === 'zoom') {
      await this.zoom(options, camera);
    }
  }

  private async translate(
    options: {
      dx: number;
      dy: number;
      effectTiming?: CameraAnimationOptions;
    },
    camera: ICamera,
  ) {
    const { dx, dy, effectTiming } = options;
    if (effectTiming) {
      const { duration = 1000, easing = 'linear', easingFunction } = effectTiming;
      const [px, py] = camera.getPosition();
      const [fx, fy] = camera.getFocalPoint();

      const landmark = camera.createLandmark(`mark${landmarkCounter++}`, {
        position: [px - dx, py - dy],
        focalPoint: [fx - dx, fy - dy],
      });

      return new Promise((resolve) => {
        camera.gotoLandmark(landmark, {
          duration: Number(duration),
          easing,
          easingFunction,
          onfinish: () => {
            resolve(undefined);
          },
        });
      });
    } else {
      camera.pan(-dx, -dy);
    }
  }

  private async zoom(
    options: {
      zoom: number;
      center: PointLike;
      effectTiming?: CameraAnimationOptions | undefined;
    },
    camera: ICamera,
  ) {
    const { zoom, center, effectTiming } = options;
    if (effectTiming) {
      const { duration = 1000, easing = 'linear', easingFunction, onfinish } = effectTiming;
      const landmark = camera.createLandmark(`mark${landmarkCounter++}`, {
        position: [center.x, center.y],
        focalPoint: [center.x, center.y],
        zoom,
      });

      return new Promise((resolve) => {
        camera.gotoLandmark(landmark, {
          duration: Number(duration),
          easing,
          easingFunction,
          onfinish: () => {
            resolve(undefined);
          },
        });
      });
    } else {
      const vp = this.graph.canvas.canvas2Viewport(center);
      camera.setZoomByViewportPoint(zoom, [vp.x, vp.y]);
    }
  }

  destroy() {}
}
