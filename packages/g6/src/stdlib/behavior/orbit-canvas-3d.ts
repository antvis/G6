import { CameraType } from '@antv/g';
import { IG6GraphEvent } from '../../types/event';
import { RotateCanvas3D } from './rotate-canvas-3d';

// TODO: truck canvas

const VALID_TRIGGERS = ['drag', 'directionKeys'];

export interface OrbitCanvas3DOptions {
  /**
   * The way to tranlate the canvas. 'drag' (default) means dragged by mouse, 'directionKeys' means the up/down/left/right key on keyBoard.
   */
  trigger?: 'drag' | 'directionKeys';
  /**
   * The assistance secondary key to trigger the behavior.
   * If it is not assigned, triggered only by trigger.
   * You can also assigned it with a key on keyboard e.g. 'shift',
   * to make the behavior triggered only when the key is pressing and trigger is happening.
   */
  secondaryKey?: string;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<OrbitCanvas3DOptions> = {
  trigger: 'directionKeys',
  secondaryKey: '',
  eventName: '',
  shouldBegin: () => true,
};

/**
 * Translate the 3d canvas along the plane parallel to the screen.
 */
export class OrbitCanvas3D extends RotateCanvas3D {
  private previousType: CameraType;

  constructor(options: Partial<OrbitCanvas3DOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      console.warn(
        `The trigger ${
          finalOptions.trigger
        } is not valid for track-canvas-3d behavior, "drag" will take effect instead. Only "${VALID_TRIGGERS.join(
          '", "',
        )}" are available.`,
      );
      finalOptions.trigger = 'drag';
    }
    super(finalOptions);
  }

  private setTrackingCamera() {
    const { graph } = this;
    const camera: any = graph.canvas.getCamera();
    this.previousType = camera.type;
    graph.canvas.getCamera().setType(CameraType.ORBITING);
  }

  private restoreCameraType() {
    if (this.previousType !== undefined) {
      const { graph } = this;
      graph.canvas.getCamera().setType(this.previousType);
    }
  }

  public onPointerDown(event) {
    this.setTrackingCamera();
    super.onPointerDown(event);
  }

  public onPointerUp(event) {
    this.restoreCameraType();
    super.onPointerUp(event);
  }

  public onKeydown(event) {
    const { trigger, secondaryKey } = this.options;
    if (trigger === 'directionKeys') {
      if (!secondaryKey || (secondaryKey && this.keydown)) {
        this.setTrackingCamera();
      }
    }
    super.onKeydown(event);
  }

  public onKeyup(event) {
    const { trigger, secondaryKey } = this.options;
    if (trigger === 'directionKeys') {
      if (!secondaryKey || (secondaryKey && this.keydown)) {
        this.restoreCameraType();
      }
    }
    super.onKeyup(event);
  }
}
