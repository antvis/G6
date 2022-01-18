import { modifyCSS, createDom } from '@antv/dom-util';
import { isString } from '@antv/util';
import insertCss from 'insert-css';
import { IAbstractGraph as IGraph, IG6GraphEvent, Item } from '@antv/g6-core';
import Base, { IPluginBaseConfig } from '../base';

typeof document !== 'undefined' &&
  insertCss(`
  .g6-component-contextmenu {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
  .g6-contextmenu-ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

`);

interface MenuConfig extends IPluginBaseConfig {
  handleMenuClick?: (target: HTMLElement, item: Item) => void;
  getContent?: (evt?: IG6GraphEvent) => HTMLDivElement | string;
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX?: number;
  offsetY?: number;
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  // 允许出现 tooltip 的 item 类型
  itemTypes?: string[];
  trigger?: 'click' | 'contextmenu';
}

export default class Menu extends Base {
  constructor(config?: MenuConfig) {
    super(config);
  }

  public getDefaultCfgs(): MenuConfig {
    return {
      offsetX: 6,
      offsetY: 6,
      handleMenuClick: undefined,
      // 指定菜单内容，function(e) {...}
      getContent: (e) => {
        return `
          <ul class='g6-contextmenu-ul'>
            <li>菜单项1</li>
            <li>菜单项2</li>
          </ul>
        `;
      },
      shouldBegin: (e) => {
        return true;
      },
      // 菜单隐藏事件
      onHide() {
        return true;
      },
      itemTypes: ['node', 'edge', 'combo'],
      trigger: 'contextmenu',
    };
  }

  // class-methods-use-this
  public getEvents() {
    if (this.get('trigger') === 'click') {
      return {
        click: 'onMenuShow',
        touchend: 'onMenuShow'
      };
    }
    return {
      contextmenu: 'onMenuShow',
    };
  }

  public init() {
    const className = this.get('className');
    const menu = createDom(`<div class=${className || 'g6-component-contextmenu'}></div>`);
    modifyCSS(menu, { top: '0px', position: 'absolute', visibility: 'hidden' });
    let container: HTMLDivElement | null = this.get('container');
    if (!container) {
      container = this.get('graph').get('container');
    }
    if (isString(container)) {
      container = document.getElementById(container) as HTMLDivElement;
    }

    container.appendChild(menu);

    this.set('menu', menu);
  }

  protected onMenuShow(e: IG6GraphEvent) {
    const self = this;
    e.preventDefault();

    const itemTypes = this.get('itemTypes');
    if (!e.item) {
      if (itemTypes.indexOf('canvas') === -1) {
        self.onMenuHide();
        return;
      }
    } else {
      if (e.item && e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) {
        self.onMenuHide();
        return;
      }
    }

    const shouldBegin = this.get('shouldBegin');
    if (!shouldBegin(e)) return;

    const menuDom = this.get('menu');
    const getContent = this.get('getContent');
    const graph: IGraph = this.get('graph');
    const menu = getContent(e, graph);
    if (isString(menu)) {
      menuDom.innerHTML = menu;
    } else {
      menuDom.innerHTML = menu.outerHTML;
    }
    // 清除之前监听的事件
    this.removeMenuEventListener();

    const handleMenuClick = this.get('handleMenuClick');
    if (handleMenuClick) {
      const handleMenuClickWrapper = (evt) => {
        handleMenuClick(evt.target, e.item, graph);
      };
      this.set('handleMenuClickWrapper', handleMenuClickWrapper);
      menuDom.addEventListener('click', handleMenuClickWrapper);
    }

    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const bbox = menuDom.getBoundingClientRect();

    const offsetX = this.get('offsetX') || 0;
    const offsetY = this.get('offsetY') || 0;

    const graphTop = graph.getContainer().offsetTop;
    const graphLeft = graph.getContainer().offsetLeft;

    let x = e.canvasX + graphLeft + offsetX;
    let y = e.canvasY + graphTop + offsetY;

    // when the menu is (part of) out of the canvas
    if (x + bbox.width > width) {
      x = e.canvasX - bbox.width - offsetX + graphLeft;
    }
    if (y + bbox.height > height) {
      y = e.canvasY - bbox.height - offsetY + graphTop;
    }

    modifyCSS(menuDom, {
      top: `${y}px`,
      left: `${x}px`,
      visibility: 'visible',
    });

    // 左键单击会触发 body 上监听的 click 事件，导致菜单展示出来后又立即被隐藏了，需要过滤掉
    let triggeredByFirstClick = this.get('trigger') === 'click';
    const handler = (evt) => {
      if (triggeredByFirstClick) {
        triggeredByFirstClick = false;
        return;
      }
      self.onMenuHide();
    };

    // 如果在页面中其他任意地方进行click, 隐去菜单
    document.body.addEventListener('click', handler);
    this.set('handler', handler);
  }

  private removeMenuEventListener() {
    const handleMenuClickWrapper = this.get('handleMenuClickWrapper');
    const handler = this.get('handler');

    if (handleMenuClickWrapper) {
      const menuDom = this.get('menu');
      menuDom.removeEventListener('click', handleMenuClickWrapper);
      this.set('handleMenuClickWrapper', null);
    }
    if (handler) {
      document.body.removeEventListener('click', handler);
    }
  }

  private onMenuHide() {
    const menuDom = this.get('menu');
    if (menuDom) {
      modifyCSS(menuDom, { visibility: 'hidden' });
    }

    // 隐藏菜单后需要移除事件监听
    this.removeMenuEventListener();
  }

  public destroy() {
    const menu = this.get('menu');
    this.removeMenuEventListener();

    if (menu) {
      let container: HTMLDivElement | null = this.get('container');
      if (!container) {
        container = this.get('graph').get('container');
      }
      if (isString(container)) {
        container = document.getElementById(container) as HTMLDivElement;
      }
      container.removeChild(menu);
    }
  }
}
