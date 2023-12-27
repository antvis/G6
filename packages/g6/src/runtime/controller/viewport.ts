import { IGraph } from '../../types';
import { ViewportChangeHookParams } from '../../types/hook';

let landmarkCounter = 0;

export class ViewportController {
  public graph: IGraph;

  constructor(graph: IGraph<any, any>) {
    this.graph = graph;
    this.tap();
  }

  /**
   * Subscribe the lifecycle of graph.
   */
  private tap() {
    this.graph.hooks.viewportchange.tap(this.onViewportChange.bind(this));
  }

  private async onViewportChange({ transform, effectTiming }: ViewportChangeHookParams) {
    const camera = this.graph.canvas.getCamera();
    const transientCamera = this.graph.transientCanvas.getCamera();
    // @ts-ignore
    if (camera.landmarks?.length) {
      camera.cancelLandmarkAnimation();
      transientCamera.cancelLandmarkAnimation();
      this.graph.emit('cancelviewportanimation');
    }
    const { translate, rotate, zoom, origin = this.graph.getViewportCenter() } = transform;
    const currentZoom = camera.getZoom();

    if (effectTiming) {
      this.graph.emit('beforeviewportanimation', transform);
      const { duration = 1000, easing = 'linear', easingFunction } = effectTiming;
      const landmarkOptions: Partial<{
        position: [number, number] | [number, number, number] | Float32Array;
        focalPoint: [number, number] | [number, number, number] | Float32Array;
        zoom: number;
        roll: number;
      }> = {};

      if (translate) {
        const [px, py, pz] = camera.getPosition();
        const [fx, fy, fz] = camera.getFocalPoint();
        const { dx = 0, dy = 0, dz = 0, targetX, targetY, targetZ } = translate;
        const animateTargetPosition = [targetX, targetY, targetZ];
        const animateTargetFocal = [targetX, targetY, targetZ];
        if (isNaN(targetX)) {
          animateTargetPosition[0] = px - dx;
          animateTargetFocal[0] = fx - dx;
        }
        if (isNaN(targetY)) {
          animateTargetPosition[1] = py - dy;
          animateTargetFocal[1] = fy - dy;
        }
        if (isNaN(targetZ)) {
          animateTargetPosition[2] = pz - dz;
          animateTargetFocal[2] = fz - dz;
        }
        landmarkOptions.position = animateTargetPosition as [number, number, number];
        landmarkOptions.focalPoint = animateTargetFocal as [number, number, number];
      }

      if (zoom) {
        const { ratio } = zoom;
        landmarkOptions.zoom = currentZoom * ratio;
      }

      if (rotate) {
        const { angle } = rotate;
        landmarkOptions.roll = camera.getRoll() + angle;
      }

      const landmark = camera.createLandmark(`mark${landmarkCounter++}`, landmarkOptions);
      const transientLandmark = transientCamera.createLandmark(`mark${landmarkCounter}`, landmarkOptions);

      return new Promise((resolve) => {
        transientCamera.gotoLandmark(transientLandmark, {
          duration: Number(duration),
          easing,
          easingFunction,
        });
        camera.gotoLandmark(landmark, {
          duration: Number(duration),
          easing,
          easingFunction,
          onfinish: () => {
            this.graph.emit('afterviewportanimation', transform);
            resolve(undefined);
          },
        });
      });
    } else {
      if (translate) {
        const { dx = 0, dy = 0 } = translate;
        camera.pan(-dx / currentZoom, -dy / currentZoom);
        transientCamera.pan(-dx / currentZoom, -dy / currentZoom);
      }

      if (rotate) {
        const { angle } = rotate;
        const [x, y] = camera.getPosition();
        if (origin) {
          camera.setPosition(origin.x, origin.y);
          camera.setFocalPoint(origin.x, origin.y);
          transientCamera.setPosition(origin.x, origin.y);
          transientCamera.setFocalPoint(origin.x, origin.y);
        }
        camera.rotate(0, 0, angle);
        transientCamera.rotate(0, 0, angle);
        if (origin) {
          camera.pan(x - origin.x, y - origin.y);
          transientCamera.pan(x - origin.x, y - origin.y);
        }
      }

      if (zoom) {
        const { ratio } = zoom;
        camera.setZoomByViewportPoint(currentZoom * ratio, [origin.x, origin.y]);
        transientCamera.setZoomByViewportPoint(currentZoom * ratio, [origin.x, origin.y]);
      }
    }
  }

  destroy() {}
}
