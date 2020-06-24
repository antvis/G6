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
}

export default class Menu extends Base {
  constructor(cfg?: MenuConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): MenuConfig {
    return {
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
      // 菜单隐藏事件
      onHide() {
        return true;
      },
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
    document.body.appendChild(menu)
    this.set('menu', menu)
  }

  protected onMenuShow(e: IG6GraphEvent) {
    const self = this;
    
    const container = this.get('menu')
    const getContent = this.get('getContent')
    let menu = getContent(e)
    if (isString(menu)) {
      container.innerHTML = menu
    } else {
      container.innerHTML = menu.outerHTML
    }

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      container.addEventListener('click', evt => {
        handleMenuClick(evt.target, e.item)
      })
    }

    const graph: Graph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const bbox = container.getBoundingClientRect();

    let x = e.item.getModel().x;
    let y = e.item.getModel().y;

    // 若菜单超出画布范围，反向
    if (x + bbox.width > width) {
      x = width - bbox.width;
    }
    
    if (y + bbox.height > height) {
      y = height - bbox.height;
    }
    
    const point = graph.getClientByPoint(x, y)
    e.canvasX = point.x;
    e.canvasY = point.y;

    modifyCSS(container, {
      top: `${point.y}px`, 
      left: `${point.x}px`, 
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
    const container = this.get('menu')
    if (container) {
      modifyCSS(container, { visibility: 'hidden' });
    }

    // 隐藏菜单后需要移除事件监听
    document.body.removeEventListener('click', this.get('handler'));
    
    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      container.removeEventListener('click', handleMenuClick)
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
      document.body.removeChild(menu);
    }

    if (handler) {
      document.body.removeEventListener('click', handler);
    }
  }
}
