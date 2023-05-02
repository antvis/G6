import { ID, IG6GraphEvent } from 'types';
import { Behavior } from '../../types/behavior';
import { Point } from 'types/common';

const VALID_TRIGGERS = ['wheel', 'upDownKeys'];
export interface ZoomCanvasOptions {
  /**
   * Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while zooming.
   * TODO: optimize when trigger is upDownKeys
   */
  enableOptimize?: boolean;
  /**
   * Whether allow trigger this behavior when wheeling start on nodes / edges / combos.
   */
  zoomOnItems?: boolean;
  /**
   * The trigger for the behavior, 'wheel' by default. 'upDownKeys' means trigger this behavior by up / down keys on keyboard.
   */
  trigger?: 'wheel' | 'upDownKeys';
  /**
   * The assistant secondary key on keyboard. If it is not assigned, the behavior will be triggered when trigger happens.
   */
  secondaryKey?: string;
  /**
   * The key on keyboard to speed up translating while pressing and zoom-canvas by direction keys. The trigger should be 'directionKeys' for this option.
   */
  speedUpKey?: string;
  /**
   * The sensitivity / speed of zooming.
   */
  sensitivity?: number;
  /**
   * The event name to trigger when zoom end.
   */
  eventName?: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;

  // TODO: fixSelectedItems, optimizeZoom
  // fixSelectedItems: {
  //   fixAll: false,
  //   fixLineWidth: false,
  //   fixLabel: false,
  //   fixState: 'selected',
  // },
  // optimizeZoom: hide shapes when zoom ratio is smaller than optimizeZoom
}

const DEFAULT_OPTIONS: Required<ZoomCanvasOptions> = {
  enableOptimize: false,
  zoomOnItems: false,
  sensitivity: 1,
  trigger: 'wheel',
  secondaryKey: '',
  speedUpKey: 'shift',
  eventName: '',
  shouldBegin: () => true,
};

export default class ZoomCanvas extends Behavior {
  options: ZoomCanvasOptions;

  private zooming: boolean; // pointerdown + pointermove a distance
  private keydown: boolean;
  private speedupKeydown: boolean;
  private hiddenEdgeIds: ID[];
  private hiddenNodeIds: ID[];
  private zoomTimer: NodeJS.Timeout;

  constructor(options: Partial<ZoomCanvasOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      console.warn(
        `The trigger ${finalOptions.trigger} is not valid, 'wheel' will take effect.`,
      );
      finalOptions.trigger = 'wheel';
    }
    super(finalOptions);
  }

  getEvents() {
    if (this.options.trigger === 'upDownKeys') {
      return {
        keydown: this.onKeydown,
        keyup: this.onKeyup,
      };
    }
    return {
      wheel: this.onWheel,
      keydown: this.onKeydown,
      keyup: this.onKeyup,
    };
  }

  private hideShapes() {
    const { graph } = this;
    if (this.options.enableOptimize) {
      this.hiddenEdgeIds = graph
        .getAllEdgesData()
        .map((edge) => edge.id)
        .filter((id) => graph.getItemVisible(id) === true);
      graph.hideItem(this.hiddenEdgeIds);
      this.hiddenNodeIds = graph
        .getAllNodesData()
        .map((node) => node.id)
        .filter((id) => graph.getItemVisible(id) === true);
      // draw node's keyShapes on transient, and then hidden the real nodes;
      this.hiddenNodeIds.forEach((id) => {
        graph.drawTransient('node', id, {
          onlyDrawKeyShape: true,
        });
      });
      graph.hideItem(this.hiddenNodeIds);
    }
  }

  private endZoom() {
    const { graph, hiddenEdgeIds, hiddenNodeIds } = this;
    const { enableOptimize } = this.options;
    this.zooming = false;
    if (enableOptimize) {
      // restore hidden items
      if (hiddenEdgeIds) {
        graph.showItem(hiddenEdgeIds);
      }
      if (hiddenNodeIds) {
        hiddenNodeIds.forEach((id) => {
          graph.drawTransient('node', id, { action: 'remove' });
        });
        graph.showItem(hiddenNodeIds);
      }
    }
    this.hiddenEdgeIds = [];
    this.hiddenNodeIds = [];
  }

  public onWheel(event) {
    const { graph, keydown } = this;
    const { deltaY, canvas, itemId } = event;
    const { eventName, sensitivity, secondaryKey, zoomOnItems, shouldBegin } =
      this.options;

    // TODO: CANVAS
    const isOnItem = itemId && itemId !== 'CANVAS';
    if (
      (secondaryKey && !keydown) ||
      (isOnItem && !zoomOnItems) ||
      !shouldBegin(event)
    ) {
      this.endZoom();
      return;
    }

    // begin zooming
    if (!this.zooming) {
      this.hideShapes();
      this.zooming = true;
    }
    let zoomRatio = 1;
    if (deltaY < 0) zoomRatio = (100 + sensitivity) / 100;
    if (deltaY > 0) zoomRatio = 100 / (100 + sensitivity);
    // TODO: the zoom center is wrong?
    graph.zoom(zoomRatio, { x: canvas.x, y: canvas.y });

    clearTimeout(this.zoomTimer);
    this.zoomTimer = setTimeout(() => {
      this.endZoom();
    }, 300);

    // Emit event.
    if (eventName) {
      graph.emit(eventName, { zoom: { ratio: zoomRatio } });
    }
  }

  public onKeydown(event) {
    const { key } = event;
    const {
      secondaryKey,
      trigger,
      speedUpKey,
      eventName,
      sensitivity,
      shouldBegin,
    } = this.options;
    if (secondaryKey && secondaryKey === key.toLowerCase()) {
      this.keydown = true;
    }
    if (speedUpKey && speedUpKey === key.toLowerCase()) {
      this.speedupKeydown = true;
    }
    if (trigger === 'upDownKeys') {
      if (secondaryKey && !this.keydown) return;
      if (!shouldBegin(event)) return;
      const { graph, speedupKeydown } = this;
      const speed = speedupKeydown ? 20 : 1;
      let zoomRatio = 1;
      switch (key) {
        case 'ArrowUp':
          // Zoom in.
          zoomRatio = (100 + sensitivity * speed) / 100;
          break;
        case 'ArrowDown':
          // Zoom out.
          zoomRatio = 100 / (100 + sensitivity * speed);
          break;
      }
      if (zoomRatio !== 1) {
        graph.zoom(zoomRatio);
        if (eventName) {
          graph.emit(eventName, { zoom: { ratio: zoomRatio } });
        }
      }
    }
  }

  public onKeyup(event) {
    const { key } = event;
    const { secondaryKey, speedUpKey } = this.options;
    if (secondaryKey && secondaryKey === key.toLowerCase()) {
      this.keydown = false;
    }
    if (speedUpKey && speedUpKey === key.toLowerCase()) {
      this.speedupKeydown = false;
    }
  }
}
