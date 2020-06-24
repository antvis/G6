import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDOM from '@antv/dom-util/lib/create-dom';
import isString from '@antv/util/lib/is-string'
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
`)

interface TooltipConfig extends IPluginBaseConfig {
  getContent?: (evt?: IG6GraphEvent) => HTMLDivElement | string;
  offset?: number;
}

export default class Tooltip extends Base {
  private currentTarget: Item

  constructor(cfg?: TooltipConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): TooltipConfig {
    return {
      offset: 6,
      // 指定菜单内容，function(e) {...}
      getContent: (e) => {
        return `
          <h4 class='tooltip-type'>类型：${e.item.getType()}</h4>
          <span class='tooltip-id'>ID：${e.item.getID()}</span>
        `
      },
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
    };
  }

  public init() {
    const className = this.get('className')
    const tooltip = createDOM(`<div class=${className || 'g6-component-tooltip'}></div>`)
    modifyCSS(tooltip, { position: 'absolute', visibility: 'hidden' });
    document.body.appendChild(tooltip)
    this.set('tooltip', tooltip)
  }

  onMouseEnter(e: IG6GraphEvent) {
    const { item } = e;
    const graph: IGraph = this.get('graph')
    this.currentTarget = item;
    this.showTooltip(e);
    graph.emit('tooltipchange', { item: e.item, action: 'show' });
  }

  onMouseMove(e: IG6GraphEvent) {
    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }
    this.updatePosition(e);
  }

  onMouseLeave() {
    this.hideTooltip();
    const graph: IGraph = this.get('graph')
    graph.emit('tooltipchange', { item: this.currentTarget, action: 'hide' });
    this.currentTarget = null;
  }

  showTooltip(e: IG6GraphEvent) {
    if (!e.item) {
      return;
    }

    const container = this.get('tooltip')

    const getContent = this.get('getContent')
    let tooltip = getContent(e)
    if (isString(tooltip)) {
      container.innerHTML = tooltip
    } else {
      container.innerHTML = tooltip.outerHTML
    }

    this.updatePosition(e);
  }

  hideTooltip() {
    const tooltip = this.get('tooltip')
    if (tooltip) {
      modifyCSS(tooltip, { visibility: 'hidden' });
    }
  }

  updatePosition(e: IG6GraphEvent) {
    const graph: Graph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const tooltip = this.get('tooltip')
    
    let x = e.clientX
    let y = e.clientY
    const bbox = tooltip.getBoundingClientRect();
    if (x > width / 2) {
      x -= bbox.width / 2;
    }
    
    if (y > height / 2) {
      y -= bbox.height;
    }
    
    const offset = this.get('offset')
    const left = `${x + offset}px`;
    const top = `${y - offset}px`;
    modifyCSS(tooltip, {
      left, 
      top, 
      visibility: 'visible' 
    });
  }

  public destroy() {
    const tooltip = this.get('tooltip')

    if (tooltip) {
      document.body.removeChild(tooltip);
    }
  }
}
