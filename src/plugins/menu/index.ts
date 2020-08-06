import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDOM from '@antv/dom-util/lib/create-dom';
import isString from '@antv/util/lib/is-string'
import insertCss from 'insert-css';
import Graph from '../../graph/graph';
import { IG6GraphEvent, Item } from '../../types';
import Base, { IPluginBaseConfig } from '../base';
import { IGraph } from '../../interface/graph';

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

`)

interface MenuConfig extends IPluginBaseConfig {
  handleMenuClick?: (target: HTMLElement, item: Item) => void;
  getContent?: (graph?: IGraph) => HTMLDivElement | string;
  // offsetX 与 offsetY 需要加上父容器的 padding
  offsetX?: number;
  offsetY?: number;
  shouldBegin?: (evt?: IG6GraphEvent) => boolean;
  // 允许出现 tooltip 的 item 类型
  itemTypes?: string[];
}

export default class Menu extends Base {
  constructor(cfg?: MenuConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): MenuConfig {
    return {
      offsetX: 6,
      offsetY: 6,
      handleMenuClick: undefined,
      // 指定菜单内容，function(e) {...}
      getContent: (graph) => {
        return `
          <ul class='g6-contextmenu-ul'>
            <li>菜单项1</li>
            <li>菜单项2</li>
          </ul>
        `
      },
      shouldBegin: e => {
        return true
      },
      // 菜单隐藏事件
      onHide() {
        return true;
      },
      itemTypes: ['node', 'edge', 'combo']
    };
  }

  // class-methods-use-this
  public getEvents() {
    return {
      contextmenu: 'onMenuShow',
    };
  }

  public init() {
    const className = this.get('className')
    const menu = createDOM(`<div class=${className || 'g6-component-contextmenu'}></div>`)
    modifyCSS(menu, { position: 'absolute', visibility: 'hidden' });
    let container: HTMLDivElement | null = this.get('container');
    if (!container) {
      container = this.get('graph').get('container');
    }
    container.appendChild(menu)

    this.set('menu', menu)
  }

  protected onMenuShow(e: IG6GraphEvent) {
    const self = this;
    e.preventDefault()
    e.stopPropagation()

    const shouldBegin = this.get('shouldBegin');
    if (!shouldBegin(e)) return;

    const itemTypes = this.get('itemTypes');
    if (e.item && e.item.getType && itemTypes.indexOf(e.item.getType()) === -1) {
      self.onMenuHide();
      return;
    }

    if (!e.item) {
      return
    }


    const menuDom = this.get('menu')
    const getContent = this.get('getContent')
    let menu = getContent(e)
    if (isString(menu)) {
      menuDom.innerHTML = menu
    } else {
      menuDom.innerHTML = menu.outerHTML
    }

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menuDom.addEventListener('click', handleMenuClick);
    }

    const graph: Graph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const bbox = menuDom.getBoundingClientRect();


    const offsetX = this.get('offsetX') || 0
    const offsetY = this.get('offsetY') || 0

    let x = e.canvasX + offsetX
    let y = e.canvasY + offsetY

    if (x + bbox.width > width) {
      x = x - bbox.width - offsetX;
    }

    if (y + bbox.height > height) {
      y = y - bbox.height - offsetY;
    }

    modifyCSS(menuDom, {
      top: `${y}px`,
      left: `${x}px`,
      visibility: 'visible'
    });

    const handler = (evt) => {
      self.onMenuHide();
    };

    // 如果在页面中其他任意地方进行click, 隐去菜单
    document.body.addEventListener('click', handler);
    this.set('handler', handler);
  }

  private onMenuHide() {
    const menuDom = this.get('menu')
    if (menuDom) {
      modifyCSS(menuDom, { visibility: 'hidden' });
    }

    // 隐藏菜单后需要移除事件监听
    document.body.removeEventListener('click', this.get('handler'));

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menuDom.removeEventListener('click', handleMenuClick)
    }
  }

  public destroy() {
    const menu = this.get('menu')
    const handler = this.get('handler');

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menu.removeEventListener('click', handleMenuClick)
    }

    if (menu) {
      let container: HTMLDivElement | null = this.get('container');
      if (!container) {
        container = this.get('graph').get('container');
      }
      container.removeChild(menu);
    }

    if (handler) {
      document.body.removeEventListener('click', handler);
    }
  }
}
