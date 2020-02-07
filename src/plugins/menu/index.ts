import modifyCSS from '@antv/dom-util/lib/modify-css'
import Graph from '../../graph/graph';
import { IG6GraphEvent } from '../../types';
import Base, { IPluginBaseConfig } from '../base'

interface MenuConfig extends IPluginBaseConfig {
  createDOM?: boolean;
  menu?: HTMLDivElement;
  getContent?: (evt?: IG6GraphEvent) => string;
  onShow: (evt?: IG6GraphEvent) => boolean;
  onHide: (evt?: IG6GraphEvent) => boolean;
}

export default class Menu extends Base {
  constructor(cfg: MenuConfig) {
    super(cfg)
  }

  public getDefaultCfgs(): MenuConfig {
    return {
      createDOM: true,                  // 是否渲染 dom
      container: null,                  // menu 容器。若不指定就用 graph 的 container
      className: 'g6-analyzer-menu',    // 指定 container css
      getContent: undefined,                 // 指定菜单内容，function(e) {...}
      // 菜单展示事件
      onShow() {
        return true
      },        
      // 菜单隐藏事件              
      onHide() {
        return true
      }                       
    };
  }

  public getEvents() {
    return {
      contextmenu: 'onMenuShow'
    };
  }

  public init() {
    if (!this.get('createDOM')) {
      return;
    }

    // 如果指定组件生成 menu 内容,生成菜单 dom
    const menu = document.createElement('div');
    menu.className = this.get('className');
    modifyCSS(menu, { visibility: 'hidden' });

    let container: HTMLDivElement | null = this.get('container');
    if (!container) {
      container = this.get('graph').get('container');
    }

    container!.appendChild(menu);
    this.set('menu', menu);
  }

  protected onMenuShow(e: IG6GraphEvent) {
    const self = this;
    // e.preventDefault()
    // e.stopPropagation()
    const menu: HTMLDivElement = this.get('menu');
    const getContent: (evt?: IG6GraphEvent) => string = this.get('getContent');
    const onShow = this.get('onShow');

    if (getContent) {
      menu.innerHTML = getContent(e);
    }

    if (menu) {
      const graph: Graph = this.get('graph');
      const width: number = graph.get('width');
      const height: number = graph.get('height');

      const bbox = menu.getBoundingClientRect();

      let x = e.canvasX
      let y = e.canvasY;

      // 若菜单超出画布范围，反向
      if (x + bbox.width > width) {
        x = width - bbox.width;
        e.canvasX = x;
      }

      if (y + bbox.height > height) {
        y = height - bbox.height;
        e.canvasY = y;
      }

      if (!onShow || onShow(e) !== false) {
        modifyCSS(menu, { top: y, left: x, visibility: 'visible' });
      }
    } else {
      onShow(e);
    }

    const handler = () => {
      self.onMenuHide();
    };

    // 如果在页面中其他任意地方进行click, 隐去菜单
    document.body.addEventListener('click', handler);
    this.set('handler', handler);
  }

  private onMenuHide() {
    const menu: HTMLDivElement = this.get('menu');
    const hide: (evt?: IG6GraphEvent) => boolean = this.get('onHide')
    const hasHide = hide()
    if (hasHide) {
      if(menu) {
        modifyCSS(menu, { visibility: 'hidden' });
      }

      // 隐藏菜单后需要移除事件监听
      document.body.removeEventListener('click', this.get('handler'));
    }
  }

  public destroy() {
    const menu = this.get('menu');
    const handler = this.get('handler');

    if (menu) {
      menu.parentNode.removeChild(menu);
    }

    if (handler) {
      document.body.removeEventListener('click', handler);
    }
  }
}
