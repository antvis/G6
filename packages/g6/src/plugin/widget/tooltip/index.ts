// TODO: update type define.
import { AABB } from '@antv/g';
import { isArray, isString, uniqueId } from '@antv/util';
import insertCss from 'insert-css';
import { Graph } from '../../../types';
import { IG6GraphEvent } from '../../../types/event';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { createDOM, modifyCSS } from '../../../utils/dom';
import { warn } from '../../../utils/invariant';

typeof document !== 'undefined' &&
  insertCss(`
    .g6-component-tooltip {
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        font-size: 12px;
        color: #545454;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 10px 8px;
        box-shadow: rgb(174, 174, 174) 0px 0px 10px;
    }
    .tooltip-type {
        padding: 0;
        margin: 0;
    }
    .tooltip-id {
        color: #531dab;
    }
    .g6-loading-dom {
    border: 5px solid #e5e5e5;
    border-top: 5px solid #227EFF;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation: turn-around 1.5s linear infinite;
    }
    @keyframes turn-around {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`);

type Placement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'leftTop'
  | 'topRight'
  | 'rightTop'
  | 'bottomLeft'
  | 'leftBottom'
  | 'bottomRight'
  | 'rightBottom';

/**
 * The `TooltipConfig` interface contains the following properties:
 * - `getContent`: An optional function for getting the content of the tooltip. It takes an optional argument of type `IG6GraphEvent`, and returns a value of type HTMLElement, string, or Promise (resolving to HTMLElement or string).
 * - `offsetX`: An optional number representing the offset of the tooltip in the X direction.
 * - `offsetY`: An optional number representing the offset of the tooltip in the Y direction.
 * - `shouldBegin`: An optional function for determining whether the tooltip should be displayed. It takes an optional argument of type `IG6GraphEvent`, and returns a boolean value.
 * - `itemTypes`: An optional array of strings representing the types of items for which the tooltip is allowed to be displayed. The possible values are 'node', 'edge', 'combo', and 'canvas'.
 * - `trigger`: An optional string, either 'pointerenter' or 'click', representing the event type that triggers the display of the tooltip.
 * - `fixToNode`: An optional array of two numbers, a string representing a placement, or undefined, representing how to fix the tooltip to a node.
 * - `loadingContent`: An optional HTMLElement or string representing the loading DOM.
 */
export interface TooltipConfig extends IPluginBaseConfig {
  /** Function for getting tooltip content */
  getContent?: (evt?: IG6GraphEvent) => HTMLElement | string | Promise<HTMLElement | string>;
  /** Offset of tooltip in X direction */
  offsetX?: number;
  /** Offset of tooltip in Y direction */
  offsetY?: number;
  /** Determine whether to display tooltip */
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  /** Types of items for which tooltip is allowed to be displayed */
  itemTypes?: ('node' | 'edge' | 'combo' | 'canvas')[];
  /** Event type that triggers display of tooltip */
  trigger?: 'pointerenter' | 'click';
  /** How to fix tooltip to node */
  fixToNode?: [number, number] | Placement | undefined;
  /** Loading DOM */
  loadingContent?: HTMLElement | string;
}
export class Tooltip extends Base {
  private tooltip;
  private container;
  private currentTarget;
  private asyncTooltip;
  private currentAsyncTarget;
  private hiddenTimer; //delay hiding tooltip

  constructor(options?: TooltipConfig) {
    super(options);
  }

  public getDefaultCfgs(): TooltipConfig {
    return {
      key: `tooltip-${uniqueId()}`,
      offsetX: 0,
      offsetY: 0,
      getContent: (e) => {
        return `
        <div>
          <h4 class='tooltip-type'>类型: ${e.itemType}</h4>
          <span class='tooltip-id'>ID: ${e.itemId}</span>
        </div>
        `;
      },
      shouldBegin: (e) => {
        return true;
      },
      itemTypes: ['node', 'edge', 'combo'],
      trigger: 'pointerenter',
      fixToNode: undefined,
      loadingContent: `<div class='g6-loading-dom'></div>`,
    };
  }

  public getEvents() {
    if (this.options.trigger === 'click') {
      return {
        'node:click': this.onClick,
        'edge:click': this.onClick,
        'combo:click': this.onClick,
        'canvas:click': this.onPointerLeave,
        afterremoveitem: this.onPointerLeave,
        contextmenu: this.onPointerLeave,
        drag: this.onPointerLeave,
      };
    }

    return {
      'node:pointerenter': this.onPointerEnter,
      'node:pointerleave': this.onPointerLeave,
      'node:pointermove': this.onPointerMove,
      'edge:pointerenter': this.onPointerEnter,
      'edge:pointerleave': this.onPointerLeave,
      'edge:pointermove': this.onPointerMove,
      'combo:pointerenter': this.onPointerEnter,
      'combo:pointerleave': this.onPointerLeave,
      'combo:pointermove': this.onPointerMove,
      afterremoveitem: this.onPointerLeave,
      contextmenu: this.onPointerLeave,
      'node:drag': this.onPointerLeave,
    };
  }

  public init(graph: Graph) {
    super.init(graph);
    const className = this.options.className;
    const tooltip = createDOM(`<div class='${className || 'g6-component-tooltip'}'></div>`);
    modifyCSS(tooltip, {
      position: 'absolute',
      visibility: 'hidden',
      display: 'none',
    });
    if (this.options.trigger !== 'click') {
      tooltip.addEventListener('pointerenter', (e) => {
        modifyCSS(tooltip, {
          visibility: 'visible',
          display: 'unset',
        });
      });
      tooltip.addEventListener('pointerleave', (e) => {
        this.hideTooltip();
      });
    }
    //`container` string type in v5
    let container: HTMLElement | null | string = this.options.container;
    if (!container) {
      container = this.graph.container as HTMLElement;
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLElement;
    }
    container.appendChild(tooltip);
    this.tooltip = tooltip;
    this.container = container;
  }

  public onClick(e: IG6GraphEvent) {
    if (e.itemId && e.itemType && this.options.itemTypes.indexOf(e.itemType) === -1) return;
    const { itemId } = e;
    // click the same item twice, tooltip will be hidden
    if (this.currentTarget === itemId) {
      this.currentTarget = null;
      this.hideTooltip();
      this.graph.emit('tooltipchange', { itemId: itemId, action: 'hide' });
    } else {
      this.currentTarget = itemId;
      this.showTooltip(e);
      // this.graph.emit('tooltipchange', { itemId: itemId, action: 'show' });
    }
  }

  public onPointerEnter(e: IG6GraphEvent) {
    if (e.itemId && e.itemType && this.options.itemTypes.indexOf(e.itemType) === -1) return;
    const { itemId } = e;
    this.currentTarget = itemId;
    this.showTooltip(e);
    this.graph.emit('tooltipchange', { itemId: e.itemId, action: 'show' });
  }

  public onPointerMove(e: IG6GraphEvent) {
    if (e.itemId && e.itemType && this.options.itemTypes.indexOf(e.itemType) === -1) return;
    if (!this.currentTarget || e.itemId === this.currentTarget) {
      return;
    }
    this.showTooltip(e);
  }

  public onPointerLeave() {
    this.hideTooltip();
    this.graph.emit('tooltipchange', {
      itemId: this.currentTarget,
      action: 'hide',
    });
    this.currentTarget = null;
  }

  public clearContainer() {
    this.container.innerHTML = '';
  }

  public async showTooltip(e: IG6GraphEvent) {
    clearTimeout(this.hiddenTimer);
    if (!e.itemId) {
      return;
    }
    if (e.itemType && this.options.itemTypes.indexOf(e.itemType) === -1) return;
    const tooltip = this.options.getContent(e);
    const tooltipDom = this.tooltip;
    // modify the position first because of the async function
    modifyCSS(tooltipDom, {
      display: 'unset',
    });
    const res = this.updatePosition(e);
    modifyCSS(tooltipDom, {
      visibility: 'visible',
      left: `${res.x}px`,
      top: `${res.y}px`,
    });
    if (isString(tooltip)) {
      tooltipDom.innerHTML = tooltip;
    } else if (tooltip instanceof HTMLElement) {
      this.clearContainer();
      this.container.appendChild(tooltip);
    } else {
      //promise type
      this.asyncTooltip = null; //avoid trigger many time
      if (isString(this.options.loadingContent)) {
        tooltipDom.innerHTML = this.options.loadingContent;
      } else {
        tooltipDom.innerHTML = this.options.loadingContent.outerHTML;
      }
      if (!this.asyncTooltip || e.itemId !== this.currentAsyncTarget) {
        this.currentAsyncTarget = e.itemId;
        this.asyncTooltip = await this.options.getContent(e);
      }
      if (e.itemId != this.currentAsyncTarget) {
        return;
      }
      if (isString(this.asyncTooltip)) {
        tooltipDom.innerHTML = this.asyncTooltip;
      } else {
        this.clearContainer();
        this.container.appendChild(this.asyncTooltip);
      }
    }
  }

  public hideTooltip() {
    const tooltip = this.tooltip;
    if (tooltip) {
      this.hiddenTimer = setTimeout(() => {
        modifyCSS(tooltip, { visibility: 'hidden', display: 'none' });
      }, 100);
      tooltip.addEventListener('pointerenter', (e) => {
        clearTimeout(this.hiddenTimer);
      });
      tooltip.addEventListener('pointerleave', (e) => {
        modifyCSS(tooltip, { visibility: 'hidden', display: 'none' });
      });
    }
  }

  public updatePosition(e: IG6GraphEvent): { x: number; y: number } {
    const shouldBegin = this.options.shouldBegin;
    const tooltip = this.tooltip;
    if (!shouldBegin(e)) {
      modifyCSS(tooltip, {
        visibility: 'hidden',
        display: 'none',
      });
      return;
    }
    const graph: Graph = this.graph;
    const width: number = graph.getSize()[0];
    const height: number = graph.getSize()[1];
    const offsetX = this.options.offsetX || 0;
    const offsetY = this.options.offsetY || 0;
    let point = {
      x: e.viewport.x,
      y: e.viewport.y,
    };

    const fixToNode = this.options.fixToNode;
    //handle `fixToNode` config
    if (e.itemType && e.itemType === 'node' && fixToNode) {
      const itemBBox = graph.getRenderBBox(e.itemId) as AABB;
      const itemWidth = itemBBox.max[0] - itemBBox.min[0];
      const itemHeight = itemBBox.max[1] - itemBBox.min[1];

      if (isString(fixToNode)) {
        switch (fixToNode) {
          case 'right': {
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] - itemHeight * 0.5,
            };
            break;
          }
          case 'rightTop':
          case 'topRight': {
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] - itemHeight * 1,
            };
            break;
          }
          case 'rightBottom':
          case 'bottomRight': {
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1],
            };
            break;
          }
          case 'bottom': {
            point = {
              x: itemBBox.min[0] + itemWidth * 0,
              y: itemBBox.min[1],
            };
            break;
          }
          case 'top': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] + itemWidth * 0,
              y: itemBBox.min[1] - tooltipBBox.height,
            };
            break;
          }
          case 'left': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] - tooltipBBox.width,
              y: itemBBox.min[1] - itemHeight * 0.5,
            };
            break;
          }
          case 'leftTop':
          case 'topLeft': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] - tooltipBBox.width,
              y: itemBBox.min[1] - itemHeight * 1,
            };
            break;
          }
          case 'leftBottom':
          case 'bottomLeft': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] - tooltipBBox.width,
              y: itemBBox.min[1],
            };
            break;
          }
          default:
            //right
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] - itemHeight * 0.5,
            };
            warn(
              `The '${this.options.fixToNode}' fixToNode position configuration is not supported, please use 'top'|'left'| 'right'| 'bottom'| 'topLeft'| 'leftTop'| 'topRight'| 'rightTop'| 'bottomLeft'| 'leftBottom'| 'bottomRight'| 'rightBottom', or use array to config, like: [0,5,1]`,
            );
            break;
        }
      } else if (isArray(fixToNode) && fixToNode.length >= 2) {
        point = {
          x: itemBBox.min[0] + itemWidth * fixToNode[0],
          y: itemBBox.min[1] - itemHeight * (1 - fixToNode[1]),
        };
      }
    }
    const { x, y } = this.graph.getViewportByCanvas(point);
    const graphContainer = this.graph.container;
    const res = {
      x: x + graphContainer.offsetLeft + offsetX,
      y: y + graphContainer.offsetTop + offsetY,
    };

    //tooltip dom bbox
    const bbox = tooltip.getBoundingClientRect();
    if (x + bbox.width + offsetX > width) {
      res.x -= bbox.width + offsetX;
    }
    if (y + bbox.height + offsetY > height) {
      res.y -= bbox.height + offsetY;
      if (res.y < 0) {
        res.y = 0;
      }
    }
    return res;
  }

  public destroy() {
    this.container.removeChild(this.tooltip);
  }
}
