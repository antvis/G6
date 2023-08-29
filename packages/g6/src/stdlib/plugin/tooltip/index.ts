// TODO: update type define.
import { createDom, modifyCSS } from '@antv/dom-util';
import { AABB } from '@antv/g';
import { isArray, isString } from '@antv/util';
import insertCss from 'insert-css';
import { IGraph } from '../../../types';
import { IG6GraphEvent } from '../../../types/event';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

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

export interface TooltipConfig extends IPluginBaseConfig {
  getContent?: (
    evt?: IG6GraphEvent,
  ) => HTMLDivElement | string | Promise<HTMLDivElement | string>;
  offsetX?: number;
  offsetY?: number;
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  // more detail type instead of "string[]"
  itemTypes?: ('node' | 'edge' | 'combo' | 'canvas')[];
  trigger?: 'pointerenter' | 'click';
  fixToNode?: [number, number] | Placement | undefined;
  loadingContent?: HTMLDivElement | string;
}

export class Tooltip extends Base {
  private tooltip;
  private container;
  private currentTarget;
  private asyncTooltip;
  private currentAsyncTarget;
  private hidenTimer; //delay hiding tooltip

  constructor(options?: TooltipConfig) {
    super(options);
  }

  public getDefaultCfgs(): TooltipConfig {
    return {
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

  public init(graph: IGraph) {
    super.init(graph);
    const className = this.options.className;
    const tooltip = createDom(
      `<div class='${className || 'g6-component-tooltip'}'></div>`,
    );
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
    let container: HTMLDivElement | null | string = this.options.container;
    if (!container) {
      container = this.graph.container as HTMLDivElement;
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLDivElement;
    }
    container.appendChild(tooltip);
    this.tooltip = tooltip;
    this.container = container;
  }

  public onClick(e: IG6GraphEvent) {
    if (
      e.itemId &&
      e.itemType &&
      this.options.itemTypes.indexOf(e.itemType) === -1
    )
      return;
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
    if (
      e.itemId &&
      e.itemType &&
      this.options.itemTypes.indexOf(e.itemType) === -1
    )
      return;
    const { itemId } = e;
    this.currentTarget = itemId;
    this.showTooltip(e);
    this.graph.emit('tooltipchange', { itemId: e.itemId, action: 'show' });
  }

  public onPointerMove(e: IG6GraphEvent) {
    if (
      e.itemId &&
      e.itemType &&
      this.options.itemTypes.indexOf(e.itemType) === -1
    )
      return;
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
    clearTimeout(this.hidenTimer);
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
    } else if (tooltip instanceof HTMLDivElement) {
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
      this.hidenTimer = setTimeout(() => {
        modifyCSS(tooltip, { visibility: 'hidden', display: 'none' });
      }, 100);
      tooltip.addEventListener('pointerenter', (e) => {
        clearTimeout(this.hidenTimer);
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
    const graph: IGraph = this.graph;
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
              y: itemBBox.min[1] + itemHeight * 0.5,
            };
            break;
          }
          case 'rightTop':
          case 'topRight': {
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] + itemHeight * 0,
            };
            break;
          }
          case 'rightBottom':
          case 'bottomRight': {
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] + itemHeight * 1,
            };
            break;
          }
          case 'bottom': {
            point = {
              x: itemBBox.min[0] + itemWidth * 0,
              y: itemBBox.min[1] + itemHeight * 1,
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
              y: itemBBox.min[1] + itemHeight * 0.5,
            };
            break;
          }
          case 'leftTop':
          case 'topLeft': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] - tooltipBBox.width,
              y: itemBBox.min[1] + itemHeight * 0,
            };
            break;
          }
          case 'leftBottom':
          case 'bottomLeft': {
            const tooltipBBox = tooltip.getBoundingClientRect();
            point = {
              x: itemBBox.min[0] - tooltipBBox.width,
              y: itemBBox.min[1] + itemHeight * 1,
            };
            break;
          }
          default:
            //right
            point = {
              x: itemBBox.min[0] + itemWidth * 1,
              y: itemBBox.min[1] + itemHeight * 0.5,
            };
            console.warn(
              `The '${this.options.fixToNode}' fixToNode position configuration is not supported, please use 'top'|'left'| 'right'| 'bottom'| 'topLeft'| 'leftTop'| 'topRight'| 'rightTop'| 'bottomLeft'| 'leftBottom'| 'bottomRight'| 'rightBottom', or use array to config, like: [0,5,1]`,
            );
            break;
        }
      } else if (isArray(fixToNode) && fixToNode.length >= 2) {
        point = {
          x: itemBBox.min[0] + itemWidth * fixToNode[0],
          y: itemBBox.min[1] + itemHeight * fixToNode[1],
        };
      }
    }

    const { x, y } = point;
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
