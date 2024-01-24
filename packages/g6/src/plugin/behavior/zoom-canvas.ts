import { isBoolean, isNumber } from '@antv/util';
import { ID, IG6GraphEvent } from '../../types';
import { Behavior } from '../../types/behavior';
import { warn } from '../../utils/invariant';

const VALID_TRIGGERS = ['wheel', 'upDownKeys'];
const WHEEL_DURATION = 250;
export interface ZoomCanvasOptions {
  /**
   * Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while zooming.
   * TODO: optimize when trigger is upDownKeys
   */
  enableOptimize?: boolean;
  /**
   * Whether allow trigger this behavior when wheeling start on nodes / edges / combos.
   */
  triggerOnItems?: boolean;
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
   * The min value of zoom ratio to constrain the zoom-canvas-3d behavior
   */
  minZoom?: number;
  /**
   * The max value of zoom ratio to constrain the zoom-canvas-3d behavior
   */
  maxZoom?: number;
  /**
   * Whether allow the behavior happen on the current item.
   */
  shouldBegin?: (event: IG6GraphEvent) => boolean;
  /**
   * Whether to fix the stroke thickness, text size, overall size, etc. of selected elements. false by default.
   * - fixAll: fix the overall size of the element, higher priority than fixSelectedItems.fixLineWidth and fixSelectedItems.fixLabel;
   * - fixLineWidth: fix the stroke thickness of keyShape;
   * - fixLabel: fix the text size of labelShape, labelBackgroundShape;
   * - fixState: the state of the element to be fixed. Default is `selected` ;
   */
  fixSelectedItems:
    | boolean
    | {
        fixAll?: boolean;
        fixLineWidth?: boolean;
        fixLabel?: boolean;
        fixState: string;
      };
  // TODO:  optimizeZoom
  // optimizeZoom: hide shapes when zoom ratio is smaller than optimizeZoom
}

const DEFAULT_OPTIONS: Required<ZoomCanvasOptions> = {
  enableOptimize: false,
  triggerOnItems: true,
  sensitivity: 6,
  trigger: 'wheel',
  secondaryKey: '',
  speedUpKey: 'shift',
  eventName: '',
  minZoom: 0.00001,
  maxZoom: 1000,
  shouldBegin: () => true,
  fixSelectedItems: false,
};

export class ZoomCanvas extends Behavior {
  private zooming: boolean; // pointerdown + pointermove a distance
  private keydown: boolean;
  private speedupKeydown: boolean;
  private hiddenEdgeIds: ID[];
  private hiddenNodeIds: ID[];
  private zoomTimer: ReturnType<typeof setTimeout>;
  private tileRequestId?: number;
  private lastWheelTriggerTime?: number;

  private zoomCache: {
    fixIds: Set<ID>;
    balanceRatio?: Map<ID, number>;
    lineWidth?: Map<ID, number>;
  } = {
    fixIds: new Set(),
    balanceRatio: new Map(),
    lineWidth: new Map(),
  };

  constructor(options: Partial<ZoomCanvasOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!VALID_TRIGGERS.includes(finalOptions.trigger)) {
      warn(`The trigger ${finalOptions.trigger} is not valid, 'wheel' will take effect.`);
      finalOptions.trigger = 'wheel';
    }
    const { fixSelectedItems } = finalOptions;
    if (isBoolean(fixSelectedItems) && fixSelectedItems) {
      finalOptions.fixSelectedItems = {
        fixAll: true,
        fixState: 'selected',
      };
    }
    if (!isBoolean(fixSelectedItems)) {
      if (!fixSelectedItems.fixState) fixSelectedItems.fixState = 'selected';
    }
    super(finalOptions);
  }

  getEvents() {
    this.graph.canvas
      .getContextService()
      .getDomElement()
      .addEventListener?.(
        'wheel',
        (e) => {
          e.preventDefault();
        },
        { passive: false },
      );

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
    const { tileBehavior: graphBehaviorOptimize, tileBehaviorSize = 1000 } = graph.getOptions().optimize || {};
    const optimize = this.options.enableOptimize !== undefined ? this.options.enableOptimize : graphBehaviorOptimize;
    const shouldOptimize = isNumber(optimize) ? graph.getNodeData().length > optimize : optimize;
    if (shouldOptimize) {
      this.hiddenEdgeIds = graph
        .getAllEdgesData()
        .map((edge) => edge.id)
        .filter((id) => graph.getItemVisible(id) === true);
      this.hiddenNodeIds = graph
        .getAllNodesData()
        .map((node) => node.id)
        .filter((id) => graph.getItemVisible(id) === true);

      const hiddenIds = [...this.hiddenNodeIds];
      const sectionNum = Math.ceil(hiddenIds.length / tileBehaviorSize);
      const sections = Array.from({ length: sectionNum }, (v, i) =>
        hiddenIds.slice(i * tileBehaviorSize, i * tileBehaviorSize + tileBehaviorSize),
      );
      const update = () => {
        if (!sections.length && this.tileRequestId) {
          cancelAnimationFrame(this.tileRequestId);
          this.tileRequestId = undefined;
          return;
        }
        const section = sections.shift();
        graph.hideItem(section, { disableAnimate: false, keepKeyShape: true });
        this.tileRequestId = requestAnimationFrame(update);
      };
      this.tileRequestId = requestAnimationFrame(update);
    }
  }

  private endZoom() {
    const { graph, hiddenEdgeIds = [], hiddenNodeIds } = this;
    const { tileBehavior: graphBehaviorOptimize, tileBehaviorSize = 1000 } = graph.getOptions().optimize || {};
    const optimize = this.options.enableOptimize !== undefined ? this.options.enableOptimize : graphBehaviorOptimize;
    const shouldOptimize = isNumber(optimize) ? graph.getNodeData().length > optimize : optimize;
    this.zooming = false;
    if (shouldOptimize) {
      if (this.tileRequestId) {
        cancelAnimationFrame(this.tileRequestId);
        this.tileRequestId = undefined;
      }
      if (hiddenNodeIds) {
        const hiddenIds = [...hiddenNodeIds, ...hiddenEdgeIds];
        const sectionNum = Math.ceil(hiddenIds.length / tileBehaviorSize);
        const sections = Array.from({ length: sectionNum }, (v, i) =>
          hiddenIds.slice(i * tileBehaviorSize, i * tileBehaviorSize + tileBehaviorSize),
        );
        const update = () => {
          if (!sections.length && this.tileRequestId) {
            cancelAnimationFrame(this.tileRequestId);
            this.tileRequestId = undefined;
            return;
          }
          graph.showItem(sections.shift(), { disableAnimate: false });
          this.tileRequestId = requestAnimationFrame(update);
        };
        this.tileRequestId = requestAnimationFrame(update);
      }
    }
    this.hiddenEdgeIds = [];
    this.hiddenNodeIds = [];
  }

  public onWheel(event) {
    const { graph, keydown } = this;
    const { deltaY, client, itemId } = event;
    const { eventName, sensitivity, secondaryKey, triggerOnItems, minZoom, maxZoom, shouldBegin } = this.options;

    // TODO: CANVAS
    const isOnItem = itemId && itemId !== 'CANVAS';
    if ((secondaryKey && !keydown) || (isOnItem && !triggerOnItems) || !shouldBegin(event)) {
      this.endZoom();
      return;
    }

    // begin zooming
    if (!this.zooming) {
      this.graph.canvas.getConfig().disableHitTesting = true;
      this.hideShapes();
      this.clearCache();
      this.zooming = true;
    }

    const { tileBehavior: graphBehaviorOptimize } = graph.getOptions().optimize || {};

    const shouldDebounce =
      typeof graphBehaviorOptimize === 'boolean'
        ? graphBehaviorOptimize
        : graph.getNodeData().length > graphBehaviorOptimize;

    const now = Date.now();
    if (shouldDebounce && this.lastWheelTriggerTime && now - this.lastWheelTriggerTime < WHEEL_DURATION / 5) {
      return;
    }

    let zoomRatio = 1;
    if (deltaY < 0) zoomRatio = (100 + sensitivity) / 100;
    if (deltaY > 0) zoomRatio = 100 / (100 + sensitivity);
    const zoomTo = zoomRatio * graph.getZoom();
    if (minZoom && zoomTo < minZoom) return;
    if (maxZoom && zoomTo > maxZoom) return;

    const { fixSelectedItems } = this.options;
    if (fixSelectedItems) {
      this.balanceItemSize();
    }

    graph.zoom(zoomRatio, { x: client.x, y: client.y });

    this.lastWheelTriggerTime = now;

    clearTimeout(this.zoomTimer);
    this.zoomTimer = setTimeout(() => {
      this.endZoom();
      this.graph.canvas.getConfig().disableHitTesting = false;
    }, 300);

    // Emit event.
    if (eventName) {
      graph.emit(eventName, { zoom: { ratio: zoomRatio } });
    }
  }

  private clearCache() {
    this.zoomCache.fixIds.forEach((fixId) => {
      // @ts-expect-error TODO: Need to fix the type
      const item = this.graph.itemController.itemMap.get(fixId);
      // @ts-expect-error TODO: Need to fix the type
      item.displayModel.labelShapeVisible = undefined;
    });
    this.zoomCache.fixIds.clear();
  }

  private balanceItemSize() {
    const { graph } = this;
    const zoom = graph.getZoom();

    let fixNodeIds = [];
    let fixEdgeIds = [];

    if (zoom < 1) {
      let typeArr = [];
      const { fixSelectedItems } = this.options;
      const { fixLabel, fixAll, fixLineWidth, fixState } = fixSelectedItems;
      if (fixLabel) typeArr.push('labelSize');
      if (fixLineWidth) typeArr.push('lineWidth');
      if (fixAll) typeArr = ['fullSize'];

      fixNodeIds = graph.findIdByState('node', fixState);
      fixEdgeIds = graph.findIdByState('edge', fixState);

      const fixIds = fixNodeIds.concat(fixEdgeIds);
      if (!fixIds.length) return;
      this.zoomCache.fixIds = new Set([...fixIds]);
      fixIds.forEach((id) => {
        // @ts-expect-error TODO: Need to fix the type
        const item = graph.itemController.itemMap.get(id);
        const balanceRatio = 1 / zoom || 1;

        const itemType = item.getType();
        if (itemType === 'edge' && typeArr.includes('fullSize')) {
          typeArr = ['labelSize', 'lineWidth'];
        }

        const balanceLabelShape = () => {
          item.updateLabelPosition();
          // @ts-expect-error TODO: Need to fix the type
          item.displayModel.labelShapeVisible = true;
          graph.showItem(id, {
            shapeIds: ['labelShape', 'labelBackgroundShape'],
            disableAnimate: true,
          });
        };

        typeArr.forEach((type) => {
          switch (type) {
            case 'lineWidth': {
              const { keyShape } = item.shapeMap;
              if (!this.zoomCache.lineWidth.has(id)) {
                this.zoomCache.lineWidth.set(id, keyShape.attributes.lineWidth);
              }
              const oriLineWidth = this.zoomCache.lineWidth.get(id);
              keyShape.attr('lineWidth', oriLineWidth * balanceRatio);
              break;
            }
            case 'fullSize': {
              const { group } = item;
              const transform = group.style.transform;
              if (!this.zoomCache.balanceRatio.has(id)) {
                const oriBalanceRatio = Number(transform?.match(/scale\(([\d.]+),/)?.[1]) || 1;
                this.zoomCache.balanceRatio.set(id, oriBalanceRatio);
              }
              const balanceRatioCache = this.zoomCache.balanceRatio.get(id);
              const newBalanceRatio = balanceRatioCache * balanceRatio;
              group.style.transform = `scale(${newBalanceRatio}, ${newBalanceRatio})`;
              balanceLabelShape();
              break;
            }
            case 'labelSize': {
              balanceLabelShape();
              break;
            }
            default:
              break;
          }
        });
      });
    }
  }

  public onKeydown(event) {
    const { key } = event;
    const { secondaryKey, trigger, speedUpKey, eventName, sensitivity, shouldBegin } = this.options;
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
