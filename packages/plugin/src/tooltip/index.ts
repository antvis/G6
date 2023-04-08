import { modifyCSS, createDom } from '@antv/dom-util';
import { isArray, isString } from '@antv/util';
import insertCss from 'insert-css';
import { IG6GraphEvent, Item, IAbstractGraph as IGraph } from '@antv/g6-core';
import Base, { IPluginBaseConfig } from '../base';

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
`);

interface TooltipConfig extends IPluginBaseConfig {
  getContent?: (evt?: IG6GraphEvent) => HTMLDivElement | string;
  offsetX?: number;
  offsetY?: number;
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  // 允许出现 tooltip 的 item 类型
  itemTypes?: string[];
  trigger?: 'mouseenter' | 'click';
  fixToNode?: [number, number] | undefined;
}

export default class Tooltip extends Base {
  constructor(config?: TooltipConfig) {
    super(config);
  }
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
      itemTypes: ['node', 'edge', 'combo'],
      trigger: 'mouseenter',
      fixToNode: undefined,
    };
  }

  // class-methods-use-this
  public getEvents() {
    if (this.get('trigger') === 'click') {
      return {
        'node:click': 'onClick',
        'edge:click': 'onClick',
        'combo:click': 'onClick',
        'canvas:click': 'onMouseLeave',
        afterremoveitem: 'onMouseLeave',
        contextmenu: 'onMouseLeave',
        drag: 'onMouseLeave',
      };
    }
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove',
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove',
      'combo:mouseenter': 'onMouseEnter',
      'combo:mouseleave': 'onMouseLeave',
      'combo:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave',
      contextmenu: 'onMouseLeave',
      'node:drag': 'onMouseLeave',
    };
  }

  public init() {
    const self = this;
    const className = self.get('className') || 'g6-component-tooltip';
    const tooltip = createDom(`<div class='${className}'></div>`);
    let container: HTMLDivElement | null = self.get('container');
    if (!container) {
      container = self.get('graph').get('container');
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLDivElement;
    }

    modifyCSS(tooltip, { position: 'absolute', visibility: 'hidden', display: 'none' });
    container.appendChild(tooltip);

    if (self.get('trigger') !== 'click') {
      tooltip.addEventListener('mouseenter', (e) => {
        modifyCSS(tooltip, {
          visibility: 'visible',
          display: 'unset',
        });
      });
      tooltip.addEventListener('mouseleave', (e) => {
        self.hideTooltip();
      });
    }
    self.set('tooltip', tooltip);
  }

  onClick(e: IG6GraphEvent) {
    const itemTypes = this.get('itemTypes');
    if (e.item && e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) return;

    const { item } = e;
    const graph: IGraph = this.get('graph');
    // 若与上一次同一 item，隐藏该 tooltip
    if (this.currentTarget === item) {
      this.currentTarget = null;
      this.hideTooltip();
      graph.emit('tooltipchange', { item: e.item, action: 'hide' });
    } else {
      this.currentTarget = item;
      this.showTooltip(e);
      graph.emit('tooltipchange', { item: e.item, action: 'show' });
    }
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

  clearContainer() {
    const container = this.get('tooltip');
    if (container) {
      container.innerHTML = ''
    }
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
      this.clearContainer();
      container.appendChild(tooltip);
    }

    this.updatePosition(e);
  }

  hideTooltip() {
    const tooltip = this.get('tooltip');
    if (tooltip) {
      modifyCSS(tooltip, { visibility: 'hidden', display: 'none' });
    }
  }

  updatePosition(e: IG6GraphEvent) {
    const shouldBegin = this.get('shouldBegin');
    const tooltip = this.get('tooltip');
    if (!shouldBegin(e)) {
      modifyCSS(tooltip, {
        visibility: 'hidden',
        display: 'none',
      });
      return;
    }
    const graph: IGraph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const offsetX = this.get('offsetX') || 0;
    const offsetY = this.get('offsetY') || 0;

    let point = graph.getPointByClient(e.clientX, e.clientY);

    const fixToNode = this.get('fixToNode');
    const { item } = e;
    if (
      item.getType &&
      item.getType() === 'node' &&
      fixToNode &&
      isArray(fixToNode) &&
      fixToNode.length >= 2
    ) {
      const itemBBox = item.getBBox();
      point = {
        x: itemBBox.minX + itemBBox.width * fixToNode[0],
        y: itemBBox.minY + itemBBox.height * fixToNode[1],
      };
    }

    const { x, y } = graph.getCanvasByPoint(point.x, point.y);

    const graphContainer = graph.getContainer();

    const res = {
      x: x + graphContainer.offsetLeft + offsetX,
      y: y + graphContainer.offsetTop + offsetY,
    };

    // 先修改为 visible 方可正确计算 bbox
    modifyCSS(tooltip, {
      visibility: 'visible',
      display: 'unset',
    });
    const bbox = tooltip.getBoundingClientRect();

    if (x + bbox.width + offsetX > width) {
      res.x -= bbox.width + offsetX;
    }

    if (y + bbox.height + offsetY > height) {
      res.y -= bbox.height + offsetY;
      if (res.y < 0) {
        res.y = 0
      }
    }

    modifyCSS(tooltip, {
      left: `${res.x}px`,
      top: `${res.y}px`,
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
      if (isString(container)) {
        container = document.getElementById(container) as HTMLDivElement;
      }
      container.removeChild(tooltip);
    }
  }
}
