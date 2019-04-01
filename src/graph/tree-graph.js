const Util = require('../util');
const Graph = require('./graph');

function indexOfChild(children, child) {
  let index = -1;
  Util.each(children, (former, i) => {
    if (child.id === former.id) {
      index = i;
      return false;
    }
  });
  return index;
}

class TreeGraph extends Graph {
  /**
   * 根据data接口的数据渲染视图
   */
  render() {
    const self = this;
    const data = self.get('data');
    if (!data) {
      throw new Error('data must be defined first');
    }
    self.clear();
    self.emit('beforerender');
    const autoPaint = self.get('autoPaint');
    self.setAutoPaint(false);
    const rootData = self._refreshLayout(data);
    const root = self._addChild(rootData, null);
    self.set('root', root);
    self.paint();
    self.setAutoPaint(autoPaint);
    self.emit('afterrender');
  }
  /**
   * 添加子树
   * @param {object} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  addChild(data, parent) {
    const self = this;
    // 将数据添加到源数据中，走changeData方法
    if (!Util.isString(parent)) {
      parent = parent.get('id');
    }
    const parentData = self.findDataById(parent);
    if (!parentData.children) {
      parentData.children = [];
    }
    parentData.children.push(data);
    self.changeData(self.get('data'));
  }
  // 计算好layout的数据添加到graph中
  _addChild(data, parent) {
    const self = this;
    const node = self.addItem('node', data);
    if (parent) {
      node.set('parent', parent);
      self.addItem('edge', { source: parent, target: node, id: parent.get('id') + ':' + node.get('id') });
    }
    Util.each(data.children, child => {
      self._addChild(child, node);
    });
    return node;
  }
  /**
   * 更新数据模型，差量更新并重新渲染
   * @param {object} data 数据模型
   */
  changeData(data) {
    const self = this;
    if (!self.get('data')) {
      self.data(data);
      self.render();
      return;
    }
    const autoPaint = this.get('autoPaint');
    self.setAutoPaint(false);
    if (data) {
      self.data(data);
    }
    const root = self._refreshLayout();
    self._updateChild(root, null);
    self.paint();
    self.setAutoPaint(autoPaint);
  }
  /**
   * 差量更新子树
   * @param {object} data 子树数据模型
   * @param {string} parent 子树的父节点id
   */
  updateChild(data, parent) {
    const self = this;
    // 如果有父节点，则更新父节点下的子树
    if (parent) {
      parent = self.findDataById(parent).get('model');
    }
    // 如果没有父节点，是全量的更新，直接重置data
    if (!parent) {
      self.changeData(data);
      return;
    }
    const current = self.findById(data.id);
    // 如果不存在该节点，则添加
    if (!current) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(data);
    } else {
      const index = indexOfChild(parent.children, data);
      parent.children[index] = data;
    }
    self.changeData();
  }
  _updateChild(data, parent) {
    const self = this;
    const current = self.findById(data.id);
    if (!current) {
      self._addChild(data, parent);
      return;
    }
    // 更新新节点下所有子节点
    Util.each(data.children, child => {
      self._updateChild(child, current);
    });
    // 用现在节点的children来删除移除的子节点
    Util.each(current.get('model').children, child => {
      if (indexOfChild(data.children, child) === -1) {
        self._removeChild(child.id);
      }
    });
    // 最后更新节点本身
    self.updateItem(current, data);
  }
  /**
   * 删除子树
   * @param {string} id 子树根节点id
   */
  removeChild(id) {
    const self = this;
    const node = self.findById(id);
    if (!node) {
      return;
    }
    const parent = node.get('parent');
    if (parent && !parent.destroyed) {
      const siblings = self.findDataById(parent.get('id')).children;
      const index = indexOfChild(siblings, node.get('model'));
      siblings.splice(index, 1);
    }
    self._removeChild(id);
    self.changeData();
  }
  // 删除子节点Item对象
  _removeChild(id) {
    const self = this;
    const node = self.findById(id);
    if (!node) {
      return;
    }
    Util.each(node.get('model').children, child => {
      self._removeChild(child.id);
    });
    self.removeItem(node);
  }
  /**
   * 导出图数据
   * @return {object} data
   */
  save() {
    return this.get('data');
  }
  // 数据变更后，刷新图布局
  _refreshLayout() {
    let root = this.get('data');
    const layout = this.get('layout');
    if ((!layout) && (!(root.x && root.y))) {
      console.warn('tree graph accepts either a layout method or calculated data');
      return;
    }
    if (layout) {
      root = layout(root);
    }
    return root;
  }
  /**
   * 根据id获取对应的源数据
   * @param {string|object} id 元素id
   * @param {object} parent 从哪个节点开始寻找，为空时从根节点开始查找
   * @return {object} 对应源数据
   */
  findDataById(id, parent) {
    const self = this;
    if (!parent) {
      parent = self.get('data');
    }
    if (id === parent.id) {
      return parent;
    }
    let result = null;
    Util.each(parent.children, child => {
      if (child.id === id) {
        result = child;
        return false;
      }
      result = self.findDataById(id, child);
      if (result) {
        return false;
      }
    });
    return result;
  }
  /**
   * 更改并应用树布局算法
   * @param {object} layout 布局算法
   */
  changeLayout(layout) {
    const self = this;
    self.set('layout', layout);
    if (layout) {
      const autoPaint = self.get('autoPaint');
      self.setAutoPaint(false);
      const root = self._refreshLayout();
      self._updateChild(root, null);
      self.fitView();
      self.paint();
      self.setAutoPaint(autoPaint);
    }
  }
  /**
   * 布局动画接口，用于数据更新时做节点位置更新的动画
   * @param {object} data 更新的数据
   * @param {function} onFrame 定义节点位置更新时如何移动
   * @param {number} duration 动画时间
   * @param {string} ease 指定动效
   * @param {function} callback 动画结束的回调
   * @param {number} delay 动画延迟执行(ms)
   */
  layoutAnimate(data, onFrame, duration = 500, ease = 'easeLinear', callback, delay = 0) {
    const self = this;
    self.emit('layoutanimatestart', { data });
    const autoPaint = self.get('autoPaint');
    self.setAutoPaint(false);
    this.get('canvas').animate({
      onFrame(ratio) {
        Util.traverseTree(data, child => {
          const node = self.findById(child.id);
          let origin = node.get('origin');
          const model = node.get('model');
          if (!origin) {
            origin = {
              x: model.x,
              y: model.y,
              style: model.style
            };
            node.set('origin', origin);
          }
          if (onFrame) {
            const attrs = onFrame(node, ratio, origin, data);
            node.set('model', Util.mix(model, attrs));
          } else {
            model.x = origin.x + (data.x - origin.x) * ratio;
            model.y = origin.y + (data.y - origin.y) * ratio;
          }
        });
        self.refreshPositions();
      }
    }, duration, ease, () => {
      self.setAutoPaint(autoPaint);
      self.emit('layoutanimateend', { data });
      if (callback) {
        callback();
      }
      Util.each(self.get('nodes'), node => {
        node.set('origin', null);
      });
    }, delay);
  }
  /**
   * 立即停止布局动画
   */
  stopLayoutAnimate() {
    this.get('canvas').stopAnimate();
    this.emit('layoutanimateend', { data: this.get('data') });
    this.layoutAnimating = false;
  }

  /**
   * 是否在布局动画
   * @return {boolean} 是否有布局动画
   */
  isLayoutAnimating() {
    return this.layoutAnimating;
  }
}

module.exports = TreeGraph;
