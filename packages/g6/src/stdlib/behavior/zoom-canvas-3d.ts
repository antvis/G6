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
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<ZoomCanvas3DOptions> = {
  trigger: 'wheel',
  secondaryKey: '',
  eventName: '',
  sensitivity: 1,
  triggerOnItems: true,
  shouldBegin: () => true,
};

/**
 * Zoom the 3d canvas along the ray vertical to the screen.
 */
export default class ZoomCanvas3D extends Behavior {
  options: ZoomCanvas3DOptions;

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
      sensitivity = 1,
      shouldBegin,
    } = options;
    if (event.itemId && !triggerOnItems) return;
    if (!shouldBegin(event)) return;
    if (secondaryKey && !this.keydown) return;
    const camera = graph.canvas.getCamera();

    camera.dolly(event.deltaY * sensitivity);

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
