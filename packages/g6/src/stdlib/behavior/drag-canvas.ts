import { ID, IG6GraphEvent } from 'types';
import { Behavior } from '../../types/behavior';
import { Point } from '../../types/common';

const VALID_TRIGGERS = ['drag', 'directionKeys'];
export interface DragCanvasOptions {
  /**
   * Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while dragging.
   */
  enableOptimize?: boolean;
  /**
   * Whether allow trigger this behavior when drag start on nodes / edges / combos.
   */
  dragOnItems?: boolean;
  /**
   * The trigger for the behavior, 'drag' by default. 'directionKeys' means trigger this behavior by up / down / left / right keys on keyboard.
   */
  trigger?: 'drag' | 'directionKeys';
  /**
   * The direction to drag the canvas. 'both' by default.
   */
  direction?: 'both' | 'x' | 'y';
  /**
   * The assistant secondary key on keyboard. If it is not assigned, the behavior will be triggered when trigger happens.
   */
  secondaryKey?: string;
  /**
   * The key on keyboard to speed up translating while pressing and drag-canvas by direction keys. The trigger should be 'directionKeys' for this option.
   */
  speedUpKey?: string;
  /**
   * The range of canvas to limit dragging, 0 by default, which means the graph cannot be dragged totally out of the view port range.
   * If scalableRange > 0, the graph can be dragged out of the view port range.
   * If scalableRange < 0, the range is smaller than the view port.
   * If 0 < abs(scalableRange) < 1, it is regarded as a ratio of view port size.
   * If abs(scalableRange) > 1, it is regarded as pixels.
   * Refer to https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
   */
  scalableRange?: number;
  /**
   * The event name to trigger when drag end.
   */
  eventName?: string;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
}

const DEFAULT_OPTIONS: Required<DragCanvasOptions> = {
  enableOptimize: true,
  dragOnItems: false,
  trigger: 'drag',
  direction: 'both',
  secondaryKey: '',
  speedUpKey: '',
  scalableRange: 0,
  eventName: '',
  shouldBegin: () => true,
};

export default class DragCanvas extends Behavior {
  options: DragCanvasOptions;

  private pointerDownAt: Point;
  private dragging: boolean; // pointerdown + pointermove a distance
  private keydown: boolean;
  private speedupKeydown: boolean;
  private hiddenEdgeIds: ID[];
  private hiddenNodeIds: ID[];

  constructor(options: Partial<DragCanvasOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      console.warn(
        `The trigger ${finalOptions.trigger} is not valid, 'drag' will take effect.`,
      );
      finalOptions.trigger = 'drag';
    }
    super(finalOptions);
  }

  getEvents() {
    if (this.options.trigger === 'directionKeys') {
      return {
        keydown: this.onKeydown,
        keyup: this.onKeyup,
      };
    }
    return {
      pointerdown: this.onPointerDown,
      pointermove: this.onPointerMove,
      pointerup: this.onPointerUp,
      keydown: this.onKeydown,
      keyup: this.onKeyup,
    };
  }

  public onPointerDown(event) {
    const { secondaryKey, dragOnItems, shouldBegin } = this.options;
    // assistant key is not pressing
    if (secondaryKey && !this.keydown) return;
    // should not begin
    if (!shouldBegin(event)) return;
    // begin on an item
    const isDragOnItem = event.itemId && event.itemId !== 'CANVAS';
    if (isDragOnItem && !dragOnItems) return;

    const { client } = event;
    this.pointerDownAt = { x: client.x, y: client.y };

    document.addEventListener(
      'mouseup',
      (evt) => {
        this.onPointerUp();
      },
      { once: true },
    );
  }

  private hideShapes() {
    const { graph } = this;
    if (this.options.enableOptimize) {
      this.hiddenEdgeIds = graph
        .getAllEdgesData()
        .map((edge) => edge.id)
        .filter((id) => graph.getItemVisible(id) === true);
      graph.hideItem(this.hiddenEdgeIds, true);
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
      graph.hideItem(this.hiddenNodeIds, true);
    }
  }

  private formatDisplacement(diffX: number, diffY: number) {
    const { graph } = this;
    const { scalableRange, direction } = this.options;
    const [width, height] = graph.getSize();
    const graphBBox = graph.canvas.getRoot().getRenderBounds();
    let expandWidth = scalableRange;
    let expandHeight = scalableRange;
    // 若 scalableRange 是 0~1 的小数，则作为比例考虑
    if (expandWidth < 1 && expandWidth > -1) {
      expandWidth = width * expandWidth;
      expandHeight = height * expandHeight;
    }
    const leftTopClient = graph.getViewportByCanvas({
      x: graphBBox.min[0],
      y: graphBBox.min[1],
    });
    const rightBottomClient = graph.getViewportByCanvas({
      x: graphBBox.max[0],
      y: graphBBox.max[1],
    });

    let dx = diffX;
    let dy = diffY;
    if (
      direction === 'y' ||
      (diffX > 0 && rightBottomClient.x + diffX > width + expandWidth) ||
      (diffX < 0 && leftTopClient.x + expandWidth + diffX < 0)
    ) {
      dx = 0;
    }
    if (
      direction === 'x' ||
      (diffY > 0 && rightBottomClient.y + diffY > height + expandHeight) ||
      (diffY < 0 && leftTopClient.y + expandHeight + diffY < 0)
    ) {
      dy = 0;
    }
    return { dx, dy };
  }

  public onPointerMove(event) {
    if (!this.pointerDownAt) return;
    const { graph } = this;
    const { client } = event;
    const { eventName, direction } = this.options;
    const diffX = client.x - this.pointerDownAt.x;
    const diffY = client.y - this.pointerDownAt.y;
    if (direction === 'x' && !diffX) return;
    if (direction === 'y' && !diffY) return;
    if (direction === 'both' && !diffX && !diffY) return;

    // begin dragging
    if (!this.dragging) {
      this.hideShapes();
      this.dragging = true;
    }

    const { dx, dy } = this.formatDisplacement(diffX, diffY);
    graph.translate(dx, dy);

    this.pointerDownAt = { x: client.x, y: client.y };

    // Emit event.
    if (eventName) {
      this.graph.emit(eventName, { translate: { dx, dy } });
    }
  }

  public onPointerUp() {
    this.pointerDownAt = undefined;
    this.dragging = false;

    const { graph } = this;
    if (this.options.enableOptimize) {
      if (this.hiddenEdgeIds) {
        graph.showItem(this.hiddenEdgeIds, true);
      }
      if (this.hiddenNodeIds) {
        this.hiddenNodeIds.forEach((id) => {
          this.graph.drawTransient('node', id, { action: 'remove' });
        });
        graph.showItem(this.hiddenNodeIds, true);
      }
    }
  }

  public onKeydown(event) {
    const { key } = event;
    const { secondaryKey, trigger, speedUpKey, eventName, shouldBegin } =
      this.options;
    if (secondaryKey && secondaryKey === key.toLowerCase()) {
      this.keydown = true;
    }
    if (speedUpKey && speedUpKey === key.toLowerCase()) {
      this.speedupKeydown = true;
    }
    if (trigger === 'directionKeys') {
      if (secondaryKey && !this.keydown) return;
      if (!shouldBegin(event)) return;
      const { graph, speedupKeydown } = this;
      const speed = speedupKeydown ? 20 : 1;
      let dx = 0;
      let dy = 0;
      switch (key) {
        case 'ArrowLeft':
          dx = -speed;
          break;
        case 'ArrowRight':
          dx = speed;
          break;
        case 'ArrowUp':
          dy = -speed;
          break;
        case 'ArrowDown':
          dy = speed;
          break;
      }
      if (dx || dy) {
        const { dx: formattedDx, dy: formattedDy } = this.formatDisplacement(
          dx,
          dy,
        );
        graph.translate(formattedDx, formattedDy);
        if (eventName) {
          this.graph.emit(eventName, {
            translate: { dx: formattedDx, dy: formattedDy },
          });
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
