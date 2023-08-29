import { ID } from '@antv/graphlib';
import { debounce, uniq } from '@antv/util';
import { EdgeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';

const VALID_TRIGGERS = ['wheel', 'upDownKeys'];

export interface ZoomCanvas3DOptions {
  /**
   * The way to tranlate the canvas. 'drag' (default) means dragged by mouse, 'directionKeys' means the up/down/left/right key on keyBoard.
   */
  trigger?: 'wheel' | 'upDownKeys';
  /**
   * The assistance secondary key to trigger the behavior.
   * If it is not assigned, triggered only by trigger.
   * You can also assigned it with a key on keyboard e.g. 'shift',
   * to make the behavior triggered only when the key is pressing and trigger is happening.
   */
  secondaryKey?: string;
  /**
   * Sensitivity of zooming.
   */
  sensitivity?: number;
  /**
   * Whether allow zooming canvas on a node/edge/combo.
   */
  triggerOnItems?: boolean;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * The min value of camera's dolly to constrain the zoom-canvas-3d behavior
   */
  minZoom?: number;
  /**
   * The max value of camera's dolly to constrain the zoom-canvas-3d behavior
   */
  maxZoom?: number;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<ZoomCanvas3DOptions> = {
  trigger: 'wheel',
  secondaryKey: '',
  eventName: '',
  sensitivity: 10,
  triggerOnItems: true,
  minZoom: 0.01,
  maxZoom: 10,
  shouldBegin: () => true,
};

/**
 * Zoom the 3d canvas along the ray vertical to the screen.
 */
export class ZoomCanvas3D extends Behavior {
  private keydown: boolean;

  constructor(options: Partial<ZoomCanvas3DOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      console.warn(
        `The trigger ${
          finalOptions.trigger
        } is not valid for zoom-canvas-3d behavior, "wheel" will take effect instead. Only "${VALID_TRIGGERS.join(
          '", "',
        )}" are available.`,
      );
      finalOptions.trigger = 'wheel';
    }
    super(finalOptions);
  }

  getEvents = () => {
    const $el = this.graph.canvas.getContextService().getDomElement();
    if ($el && $el.addEventListener) {
      $el.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
        },
        { passive: false },
      );
    }

    if (this.options.trigger === 'wheel') {
      return {
        wheel: this.onWheel,
        keydown: this.onKeydown,
        keyup: this.onKeyup,
      };
    }
    return {
      keydown: this.onKeydown,
      keyup: this.onKeyup,
    };
  };

  public onWheel(event) {
    const { graph, options } = this;
    const {
      secondaryKey,
      triggerOnItems,
      eventName,
      minZoom,
      maxZoom,
      sensitivity = 1,
      shouldBegin,
    } = options;
    if (event.itemId && !triggerOnItems) return;
    if (!shouldBegin(event)) return;
    if (secondaryKey && !this.keydown) return;
    const camera = graph.canvas.getCamera();
    const sign = event.deltaY > 0 ? 1 : -1;
    const currentDistance = camera.getDistance();
    const dolly =
      ((100 * sign * sensitivity) / currentDistance) *
      Math.sqrt(currentDistance);
    const toDistance = currentDistance + dolly;
    const cameraFrontOfFocalPoint = camera.getDistanceVector()[2] < 0;

    // zoom out constraint
    if (
      dolly > 0 &&
      cameraFrontOfFocalPoint &&
      toDistance > (1 / minZoom) * 200
    ) {
      return;
    }
    // zoom in constraint
    if (dolly < 0 && !cameraFrontOfFocalPoint && toDistance > maxZoom * 200) {
      return;
    }

    camera.dolly(dolly);

    // Emit event.
    if (eventName) {
      graph.emit(eventName, {
        zoom: camera.getZoom(),
      });
    }
  }

  public onKeydown(event) {
    const { key } = event;
    const { trigger, secondaryKey } = this.options;
    if (trigger === 'upDownKeys') {
      if (key === 'ArrowUp') this.onWheel({ deltaY: -1 });
      if (key === 'ArrowDown') this.onWheel({ deltaY: 1 });
    }
    if (secondaryKey === key.toLowerCase()) {
      this.keydown = true;
    }
  }

  public onKeyup(event) {
    const { key } = event;
    const { secondaryKey } = this.options;
    if (secondaryKey === key.toLowerCase()) this.keydown = false;
  }
}
