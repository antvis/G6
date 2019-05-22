const Base = require('../base');
const modifyCSS = require('@antv/util/lib/dom/modify-css');

class Menu extends Base {
  getDefaultCfgs() {
    return {
      createDOM: true,                  // 是否渲染 dom
      container: null,                  // menu 容器。若不指定就用 graph 的 container
      className: 'g6-analyzer-menu',    // 指定 container css
      getContent: null,                 // 指定菜单内容，function(e) {...}
      onShow() {},                      // 菜单展示事件
      onHide() {}                       // 菜单隐藏事件
    };
  }
  getEvents() {
    return {
      contextmenu: 'onMenuShow'
    };
  }
  init() {
    if (!this.get('createDOM')) {
      return;
    }
    // 如果指定组件生成 menu 内容,生成菜单 dom
    const menu = document.createElement('div');
    menu.className = this.get('className');
    modifyCSS(menu, { visibility: 'hidden' });
    let container = this.get('container');
    if (!container) {
      container = this.get('graph').get('container');
    }
    container.appendChild(menu);
    this.set('menu', menu);
  }
  onMenuShow(e) {
    const self = this;
    const menu = this.get('menu');
    const getContent = this.get('getContent');
    const onShow = this.get('onShow');
    if (getContent) {
      menu.innerHTML = getContent(e);
    }
    if (menu) {
      const graph = this.get('graph');
      const width = graph.get('width');
      const height = graph.get('height');
      const bbox = menu.getBoundingClientRect();
      let x = e.canvasX,
        y = e.canvasY;
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
  onMenuHide() {
    const menu = this.get('menu');
    if (this.get('onHide')() !== false) {
      menu && modifyCSS(menu, { visibility: 'hidden' });
      // 隐藏菜单后需要移除事件监听
      document.body.removeEventListener('click', this.get('handler'));
    }
  }
  destroy() {
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

module.exports = Menu;
