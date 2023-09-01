import { ICamera } from '@antv/g';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';

const VALID_TRIGGERS = ['drag', 'directionKeys'];

export interface RotateCanvas3DOptions {
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
   * To speed up rotating while pressing and rotate the canvas by direciton keys (trigger = 'directionKeys').
   */
  speedUpKey?: string;
  /**
   * Whether allow zooming canvas on a node/edge/combo.
   */
  triggerOnItems?: boolean;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<RotateCanvas3DOptions> = {
  trigger: 'drag',
  secondaryKey: '',
  speedUpKey: 'shift',
  eventName: '',
  triggerOnItems: false,
  shouldBegin: () => true,
};

const MOTION_FACTOR = 10;

/**
 * Rotate the 3d canvas with the center of the graph.
 */
export class RotateCanvas3D extends Behavior {
  public pointStartAt: Point;
  public keydown: boolean;
  public speedUpKeydown: boolean;

  constructor(options: Partial<RotateCanvas3DOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      console.warn(
        `The trigger ${
          finalOptions.trigger
        } is not valid for rotate-canvas-3d behavior, "drag" will take effect instead. Only "${VALID_TRIGGERS.join(
          '", "',
        )}" are available.`,
      );
      finalOptions.trigger = 'drag';
    }
    super(finalOptions);
  }

  getEvents = () => {
    if (this.options.trigger === 'drag') {
      return {
        pointerdown: this.onPointerDown,
        pointermove: this.onPointerMove,
        pointerup: this.onPointerUp,
        keydown: this.onKeydown,
        keyup: this.onKeyup,
      };
    }
    return {
      keydown: this.onKeydown,
      keyup: this.onKeyup,
    };
  };

  public onPointerDown(event) {
    const { triggerOnItems, shouldBegin } = this.options;
    if ((event.itemId && !triggerOnItems) || !shouldBegin(event)) return;
    const { client } = event;
    this.pointStartAt = {
      x: client.x,
      y: client.y,
    };
  }

  public onPointerMove(event) {
    if (!this.pointStartAt) return;
    const { shouldBegin, secondaryKey } = this.options;

    if (secondaryKey && !this.keydown) return;
    if (!shouldBegin(event)) return;

    const { client } = event;
    const diff = {
      x: client.x - this.pointStartAt.x,
      y: client.y - this.pointStartAt.y,
    };
    const { graph } = this;
    const camera = graph.canvas.getCamera();
    this.rotate(camera, diff.x, diff.y);

    this.pointStartAt = {
      x: client.x,
      y: client.y,
    };
  }

  public onPointerUp(event) {
    this.pointStartAt = undefined;
  }

  public onKeydown(event) {
    const { key } = event;
    const { trigger, secondaryKey, speedUpKey } = this.options;
    if (trigger === 'directionKeys') {
      if (!secondaryKey || (secondaryKey && this.keydown)) {
        const { graph } = this;
        const camera = graph.canvas.getCamera();
        const speed = 1 * (this.speedUpKeydown ? 10 : 1);
        if (key === 'ArrowUp') camera.pan(0, speed);
        if (key === 'ArrowDown') camera.pan(0, -speed);
        if (key === 'ArrowLeft') camera.pan(speed, 0);
        if (key === 'ArrowRight') camera.pan(-speed, 0);
      }
    }
    if (secondaryKey === key.toLowerCase()) {
      this.keydown = true;
    }
    if (speedUpKey === key.toLowerCase()) {
      this.speedUpKeydown = true;
    }
  }

  public onKeyup(event) {
    const { key } = event;
    const { secondaryKey, speedUpKey } = this.options;
    if (secondaryKey === key.toLowerCase()) this.keydown = false;
    if (speedUpKey === key.toLowerCase()) this.speedUpKeydown = false;
  }

  private rotate(camera: ICamera, rx: number, ry: number) {
    const { width, height } = this.graph.canvas.getConfig();
    const dx = 20.0 / height;
    const dy = 20.0 / width;
    let motionFactorX = MOTION_FACTOR;
    let motionFactorY = MOTION_FACTOR;
    if (rx * rx > 2 * ry * ry) {
      motionFactorY *= 0.5;
    } else if (ry * ry > 2 * rx * rx) {
      motionFactorX *= 0.5;
    }

    const rotX = rx * dx * motionFactorX;
    const rotY = ry * dy * motionFactorY;

    camera.rotate(rotX, -rotY, 0);
  }
}
