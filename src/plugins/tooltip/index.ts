import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDOM from '@antv/dom-util/lib/create-dom';
import isString from '@antv/util/lib/is-string';
import insertCss from 'insert-css';
import Graph from '../../graph/graph';
import { IG6GraphEvent, Item } from '../../types';
import Base, { IPluginBaseConfig } from '../base';
import { IGraph } from '../../interface/graph';

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
`);

interface TooltipConfig extends IPluginBaseConfig {
  getContent?: (evt?: IG6GraphEvent) => HTMLDivElement | string;
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX?: number;
  offsetY?: number;
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  // 允许出现 tooltip 的 item 类型
  itemTypes?: string[];
}

export default class Tooltip extends Base {
  private currentTarget: Item;

  public getDefaultCfgs(): TooltipConfig {
    return {
      offsetX: 6,
      offsetY: 6,
      // 指定菜单内容，function(e) {...}
      getContent: (e) => {
        return `
          <h4 class='tooltip-type'>类型：${e.item.getType()}</h4>
          <span class='tooltip-id'>ID：${e.item.getID()}</span>
        `;
      },
      shouldBegin: (e) => {
        return true;
      },
      itemTypes: ['node', 'edge', 'combo']
    };
  }

  // class-methods-use-this
  public getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove',
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave',
      'contextmenu': 'onMouseLeave',
      'node:drag': 'onMouseLeave'
    };
  }

  public init() {
    const className = this.get('className') || 'g6-component-tooltip';
    const tooltip = createDOM(`<div class=${className}></div>`);
    let container: HTMLDivElement | null = this.get('container');
    if (!container) {
      container = this.get('graph').get('container');
    }

    modifyCSS(tooltip, { position: 'absolute', visibility: 'hidden' });
    container.appendChild(tooltip);
    this.set('tooltip', tooltip);
  }

  onMouseEnter(e: IG6GraphEvent) {
    const itemTypes = this.get('itemTypes');

    if (e.item && e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) return;
    const { item } = e;
    const graph: IGraph = this.get('graph');
    this.currentTarget = item;
    this.showTooltip(e);
    graph.emit('tooltipchange', { item: e.item, action: 'show' });
  }

  onMouseMove(e: IG6GraphEvent) {
    const itemTypes = this.get('itemTypes');
    if (e.item && e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) return;
    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }
    this.showTooltip(e);
  }

  onMouseLeave() {
    this.hideTooltip();
    const graph: IGraph = this.get('graph');
    graph.emit('tooltipchange', { item: this.currentTarget, action: 'hide' });
    this.currentTarget = null;
  }

  showTooltip(e: IG6GraphEvent) {
    if (!e.item) {
      return;
    }
    const itemTypes = this.get('itemTypes');

    if (e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) return;

    const container = this.get('tooltip');

    const getContent = this.get('getContent');
    const tooltip = getContent(e);
    if (isString(tooltip)) {
      container.innerHTML = tooltip;
    } else {
      container.innerHTML = tooltip.outerHTML;
    }

    this.updatePosition(e);
  }

  hideTooltip() {
    const tooltip = this.get('tooltip');
    if (tooltip) {
      modifyCSS(tooltip, { visibility: 'hidden' });
    }
  }

  updatePosition(e: IG6GraphEvent) {
    const shouldBegin = this.get('shouldBegin');
    const tooltip = this.get('tooltip');
    if (!shouldBegin(e)) {
      modifyCSS(tooltip, {
        visibility: 'hidden',
      });
      return
    };
    const graph: Graph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');


    const offsetX = this.get('offsetX') || 0;
    const offsetY = this.get('offsetY') || 0;

    // const mousePos = graph.getPointByClient(e.clientX, e.clientY);
    const point = graph.getPointByClient(e.clientX, e.clientY);
    let { x, y } = graph.getCanvasByPoint(point.x, point.y);

    // let x = mousePos.x + offsetX;
    // let y = mousePos.y + offsetY;
    // let x = e.x + offsetX;
    // let y = e.y + offsetY;
    x += offsetX;
    y += offsetY;

    const bbox = tooltip.getBoundingClientRect();
    if (x + bbox.width > width) {
      x = x - bbox.width - offsetX;
    }

    if (y + bbox.height > height) {
      y = y - bbox.height - offsetY;
    }

    modifyCSS(tooltip, {
      left: `${x}px`,
      top: `${y}px`,
      visibility: 'visible',
    });
  }

  public hide() {
    this.onMouseLeave();
  }

  public destroy() {
    const tooltip = this.get('tooltip');

    if (tooltip) {
      let container: HTMLDivElement | null = this.get('container');
      if (!container) {
        container = this.get('graph').get('container');
      }
      container.removeChild(tooltip);
    }
  }
}
