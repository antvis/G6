import { ID } from '@antv/graphlib';
import { debounce, uniq } from '@antv/util';
import { EdgeModel } from '../../types';
import { Behavior } from '../../types/behavior';
import { IG6GraphEvent } from '../../types/event';
import { Point } from '../../types/common';

// TODO: truck canvas

const VALID_TRIGGERS = ['drag', 'directionKeys'];

export interface TrackCanvas3DOptions {
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

const DEFAULT_OPTIONS: Required<TrackCanvas3DOptions> = {
  trigger: 'drag',
  secondaryKey: '',
  eventName: '',
  shouldBegin: () => true,
};

/**
 * Translate the 3d canvas along the plane parallel to the screen.
 */
export default class TrackCanvas3D extends Behavior {
  options: TrackCanvas3DOptions;

  private pointerDownAt: Point;
  private keydown: boolean;

  constructor(options: Partial<TrackCanvas3DOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    super(finalOptions);
  }

  getEvents = () => {
    return {
      pointerdown: this.onPointerDown,
      pointermove: this.onPointerMove,
      pointerup: this.onPointerUp,
      // FIXME: IG6Event -> keyboard event
      keydown: this.onKeydown as any,
    };
  };

  onPointerDown = (event) => {
    if (event.itemId || !this.options.shouldBegin(event)) return;
    const { canvas } = event;
    this.pointerDownAt = {
      x: canvas.x,
      y: canvas.y,
    };
  };

  onPointerMove = (event) => {
    if (!this.pointerDownAt) return;
    // TODO: move camera
    const { canvas } = event;
    const diff = {
      x: canvas.x - this.pointerDownAt.x,
      y: canvas.y - this.pointerDownAt.y,
    };
    const { graph } = this;
    const camera = graph.canvas.getCamera();
    const currentPosition = camera.getPosition();
    const zoom = 1.2; //camera.getZoom();
    // TODO: track?? which api
    // camera.track(-diff.x * zoom, -diff.y * zoom);

    // const nextPosition = {
    //   x: currentPosition[0] + diff.x,
    //   y: currentPosition[1] + diff.y,
    // };
    // console.log(
    //   'nextPosition',
    //   nextPosition,
    //   currentPosition,
    //   canvas,
    //   this.pointerDownAt,
    // );
    // camera.setPosition(nextPosition.x, nextPosition.y);
    // camera.setFocalPoint(nextPosition.x, nextPosition.y);

    this.pointerDownAt = {
      x: canvas.x,
      y: canvas.y,
    };
  };

  onPointerUp = (event) => {
    this.pointerDownAt = undefined;
  };

  onKeydown = (event) => {
    // TODO: cache keydown
  };
}
