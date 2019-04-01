const G = require('@antv/g6').G;
const Base = require('../base');
const isString = require('@antv/util/lib/type/is-string');
const isNil = require('@antv/util/lib/type/is-nil');
const createDOM = require('@antv/util/lib/dom/create-dom');
const modifyCSS = require('@antv/util/lib/dom/modify-css');
const each = require('@antv/util/lib/each');

const max = Math.max;

const DEFAULT_MODE = 'default';
const KEYSHAPE_MODE = 'keyShape';
const DELEGATE_MODE = 'delegate';

class Minimap extends Base {
  init() {
    this.initContainer();
  }
  getDefaultCfg() {
    return {
      container: null,
      className: 'g6-minimap',
      viewportClassName: 'g6-minimap-viewport',
      type: 'default',   // 可选 default, delegate, keyShape
      size: [ 200, 120 ],
      delegateStyle: {
        fill: '#40a9ff',
        stroke: '#096dd9'
      }
    };
  }
  getEvents() {
    return { beforepaint: 'updateCanvas' };
  }
  initContainer() {
    const self = this;
    const graph = self.get('graph');
    const size = self.get('size');
    const className = self.get('className');
    let parentNode = self.get('container');
    const container = createDOM('<div class="' + className + '" style="width:' + size[0] + 'px; height:' + size[1] + 'px"></div>');
    if (isString(parentNode)) {
      parentNode = document.getElementById(parentNode);
    }
    if (parentNode) {
      parentNode.appendChild(container);
    } else {
      graph.get('container').appendChild(container);
    }
    self.set('container', container);
    const containerDOM = createDOM('<div class="g6-minimap-container"></div>');
    container.appendChild(containerDOM);
    const canvas = new G.Canvas({
      containerDOM,
      width: size[0],
      height: size[1],
      pixelRatio: graph.get('pixelRatio')
    });
    self.set('canvas', canvas);
    self.updateCanvas();
  }
  initViewport() {
    const cfgs = this._cfgs;
    const size = cfgs.size;
    const graph = cfgs.graph;
    const pixelRatio = graph.get('pixelRatio') || graph.get('canvas').get('pixelRatio');
    const widthRatio = graph.get('width') / size[0] * pixelRatio;
    const heightRatio = graph.get('height') / size[1] * pixelRatio;
    const canvas = this.get('canvas');
    const containerDOM = canvas.get('containerDOM');
    const viewport = createDOM('<div class="' + cfgs.viewportClassName + '" style="position:absolute;left:0;top:0;box-sizing:border-box;border: 2px solid #1980ff"></div>');
    let x,            // 计算拖拽水平方向距离
      y,              // 计算拖拽垂直方向距离
      dragging,       // 是否在拖拽minimap的视口
      left,           // 缓存viewport当前对于画布的x
      top,            // 缓存viewport当前对于画布的y
      width,          // 缓存viewport当前宽度
      height;         // 缓存viewport当前高度
    containerDOM.addEventListener('mousedown', e => {
      if (e.target !== viewport) {
        return;
      }
      // 如果视口已经最大了，不需要拖拽
      const style = viewport.style;
      left = parseInt(style.left, 10);
      top = parseInt(style.top, 10);
      width = parseInt(style.width, 10);
      height = parseInt(style.height, 10);
      if (width >= size[0] || height >= size[1]) {
        return;
      }
      dragging = true;
      x = e.clientX;
      y = e.clientY;
    }, false);
    containerDOM.addEventListener('mousemove', e => {
      if (!dragging || isNil(e.clientX) || isNil(e.clientY)) {
        return;
      }
      let dx = x - e.clientX;
      let dy = y - e.clientY;
      // 若视口移动到最左边或最右边了,仅移动到边界
      if (left - dx < 0) {
        dx = left;
      } else if (left - dx + width > size[0]) {
        dx = left + width - size[0];
      }
      // 若视口移动到最上或最下边了，仅移动到边界
      if (top - dy < 0) {
        dy = top;
      } else if (top - dy + height > size[1]) {
        dy = top + height - size[1];
      }
      left -= dx;
      top -= dy;
      // 先移动视口，避免移动到边上以后出现视口闪烁
      modifyCSS(viewport, {
        left: left + 'px',
        top: top + 'px'
      });
      graph.translate(dx * widthRatio * pixelRatio, dy * heightRatio * pixelRatio);
      x = e.clientX;
      y = e.clientY;
    }, false);
    containerDOM.addEventListener('mouseleave', () => {
      dragging = false;
    }, false);
    containerDOM.addEventListener('mouseup', () => {
      dragging = false;
    }, false);
    this.set('viewport', viewport);
    containerDOM.appendChild(viewport);
  }
  updateCanvas() {
    const size = this.get('size');
    const graph = this.get('graph');
    const canvas = this.get('canvas');
    const type = this.get('type');
    switch (type) {
      case DEFAULT_MODE:
        this._updateGraphShapes();
        break;
      case KEYSHAPE_MODE:
        this._updateKeyShapes();
        break;
      case DELEGATE_MODE:
        this._updateDelegateShapes();
        break;
      default:
        this._updateGraphShapes();
    }
    const bbox = canvas.getBBox();
    // 刷新后bbox可能会变，需要重置画布矩阵以缩放到合适的大小
    const width = max(bbox.width, graph.get('width'));
    const height = max(bbox.height, graph.get('height'));
    const pixelRatio = canvas.get('pixelRatio');
    const ratio = Math.min(size[0] / width, size[1] / height);
    canvas.resetMatrix();
    // 如果bbox为负，先平移到左上角
    const minX = -(bbox.minX > 0 ? 0 : bbox.minX);
    const minY = -(bbox.minY > 0 ? 0 : bbox.minY);
    canvas.translate(minX, minY);
    canvas.scale(ratio * pixelRatio, ratio * pixelRatio);
    // 缩放到适合视口后, 平移到画布中心
    const dx = (size[0] - width * ratio) / 2;
    const dy = (size[1] - height * ratio) / 2;
    canvas.translate(dx * pixelRatio, dy * pixelRatio);
    canvas.draw();
    // 更新minimap视口
    this._updateViewport(ratio, dx + minX * ratio, dy + minY * ratio);
  }
  // 仅在minimap上绘制keyShape
  // FIXME 如果用户自定义绘制了其他内容，minimap上就无法画出
  _updateKeyShapes() {
    const graph = this._cfgs.graph;
    const canvas = this.get('canvas');
    let group = canvas.get('children')[0];
    if (!group) {
      group = canvas.addGroup();
      group.setMatrix(graph.get('group').getMatrix());
    }
    const nodes = graph.getNodes();
    group.clear();
    this._getGraphEdgeKeyShape(group);
    // 节点需要group配合keyShape
    each(nodes, node => {
      const parent = group.addGroup();
      parent.setMatrix(node.get('group').attr('matrix'));
      parent.add(node.get('keyShape').clone());
    });
  }
  // 将主图上的图形完全复制到小图
  _updateGraphShapes() {
    const graph = this.get('graph');
    const canvas = this.get('canvas');
    const graphGroup = graph.get('group');
    const clonedGroup = graphGroup.clone();
    clonedGroup.resetMatrix();
    canvas.get('children')[0] = clonedGroup;
  }
  // 将主图上的node用
  _updateDelegateShapes() {
    const graph = this._cfgs.graph;
    const canvas = this.get('canvas');
    const group = canvas.get('children')[0] || canvas.addGroup();
    const delegateStyle = this.get('delegateStyle');
    group.clear();
    this._getGraphEdgeKeyShape(group);
    each(graph.getNodes(), node => {
      const bbox = node.getBBox();
      group.addShape('rect', {
        attrs: {
          x: bbox.minX,
          y: bbox.minY,
          width: bbox.width,
          height: bbox.height,
          ...delegateStyle
        }
      });
    });
  }
  _getGraphEdgeKeyShape(group) {
    const graph = this.get('graph');
    each(graph.getEdges(), edge => {
      group.add(edge.get('keyShape').clone());
    });
  }
  // 绘制minimap视口
  _updateViewport(ratio, dx, dy) {
    const graph = this.get('graph');
    const size = this.get('size');
    const graphWidth = graph.get('width');
    const graphHeight = graph.get('height');
    const topLeft = graph.getPointByCanvas(0, 0);
    const bottomRight = graph.getPointByCanvas(graphWidth, graphHeight);
    const viewport = this.get('viewport');
    if (!viewport) {
      this.initViewport();
    }
    // viewport宽高,左上角点的计算
    let width = (bottomRight.x - topLeft.x) * ratio;
    let height = (bottomRight.y - topLeft.y) * ratio;
    const left = topLeft.x * ratio + dx;
    const top = topLeft.y * ratio + dy;
    if (width > size[0]) {
      width = size[0];
    }
    if (height > size[1]) {
      height = size[1];
    }

    modifyCSS(viewport, {
      left: left > 0 ? left + 'px' : 0,
      top: top > 0 ? top + 'px' : 0,
      width: width + 'px',
      height: height + 'px'
    });
  }

  /**
   * 获取minimap的画布
   * @return {object} G的canvas实例
   */
  getCanvas() {
    return this.get('canvas');
  }
  /**
   * 获取minimap的窗口
   * @return {object} 窗口的dom实例
   */
  getViewport() {
    return this.get('viewport');
  }
  /**
   * 获取minimap的容器dom
   * @return {object} dom
   */
  getContainer() {
    return this.get('container');
  }
  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

module.exports = Minimap;
