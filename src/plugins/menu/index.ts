import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDOM from '@antv/dom-util/lib/create-dom';
import isString from '@ANTV/util/lib/is-string'
import Graph from '../../graph/graph';
import { IG6GraphEvent, Item } from '../../types';
import Base, { IPluginBaseConfig } from '../base';
import { IGraph } from '../../interface/graph';

interface MenuConfig extends IPluginBaseConfig {
  handleMenuClick?: (target: HTMLElement, item: Item) => void;
  getContent?: (graph?: IGraph) => HTMLDivElement | string;
}

export default class Menu extends Base {
  constructor(cfg: MenuConfig) {
    super(cfg);
  }

  public getDefaultCfgs(): MenuConfig {
    return {
      handleMenuClick: undefined,
      getContent: undefined, // 指定菜单内容，function(e) {...}
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
    // const getContent = this.get('getContent')
    // const menu = getContent(this.get('graph'))
    // let menuDOM = menu
    // if (isString(menu)) {
    //   menuDOM = createDOM(menu)
    // }
    
    // this.set('menu', menuDOM)
    // document.body.appendChild(menuDOM)
  }

  protected onMenuShow(e: IG6GraphEvent) {
    const self = this;
    
    const getContent = this.get('getContent')
    let menu = getContent(e)
    if (isString(menu)) {
      menu = createDOM(menu)
    }
    
    this.set('menu', menu)
    document.body.appendChild(menu)

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menu.addEventListener('click', evt => {
        handleMenuClick(evt.target, e.item)
      })
    }

    const graph: Graph = this.get('graph');
    const width: number = graph.get('width');
    const height: number = graph.get('height');

    const bbox = menu.getBoundingClientRect();

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

    modifyCSS(menu, { 
      position: 'absolute',
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
    const menu = this.get('menu')
    if (menu) {
      document.body.removeChild(menu);
      // modifyCSS(menu, { visibility: 'hidden' });
    }

    // 隐藏菜单后需要移除事件监听
    document.body.removeEventListener('click', this.get('handler'));
    
    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menu.removeEventListener('click', handleMenuClick)
    }
  }

  public destroy() {
    const menu = this.get('menu')
    const handler = this.get('handler');

    if (menu) {
      document.body.removeChild(menu);
    }

    if (handler) {
      document.body.removeEventListener('click', handler);
    }

    const handleMenuClick = this.get('handleMenuClick')
    if (handleMenuClick) {
      menu.removeEventListener('click', handleMenuClick)
    }
  }
}
