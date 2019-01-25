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
    const root = self.addChild(data, null, true);
    self.set('root', root);
    self.paint();
    self.setAutoPaint(autoPaint);
    self.emit('afterrender');
  }
  /**
   * 添加子树
   * @param {object} data 子树数据模型
   * @param {object} parent 子树的父节点
   * @param {boolean} internal 是否是内部变更。若不是内部变更则更新data数据
   * @return {object} 子树的root节点
   */
  addChild(data, parent, internal) {
    const self = this;
    const node = self.addItem('node', data);
    node.set('parent', parent);
    if (parent) {
      self.addItem('edge', { source: parent, target: node, id: parent.get('id') + ':' + node.get('id') });
    }
    Util.each(data.children, child => {
      self.addChild(child, node, true);
    });
    if (!internal) {
      if (!parent.get('model').children) {
        parent.get('model').children = [];
      }
      parent.get('model').children.push(data);
    }
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
    }
    const autoPaint = this.get('autoPaint');
    self.setAutoPaint(false);
    self.updateChild(data, null, true);
    self.data(data);
    self.paint();
    self.setAutoPaint(autoPaint);
  }
  /**
   * 差量更新子树
   * @param {object} data 子树数据模型
   * @param {object} parent 子树的父节点
   * @param {boolean} internal 是否是内部变更。若不是内部变更则更新data数据
   * @return {object} 新增子节点
   */
  updateChild(data, parent, internal) {
    const self = this;
    const current = self.findById(data.id);
    // 如果不存在该节点，则添加
    if (!current) {
      return self.addChild(data, parent, internal);
    }
    // 更新新节点下所有子节点
    Util.each(data.children, child => {
      self.updateChild(child, current, internal);
    });
    // 用现在节点的children来删除移除的子节点
    Util.each(current.get('model').children, child => {
      if (indexOfChild(data.children, child) === -1) {
        self.removeChild(child.id, internal);
      }
    });
    // 最后更新节点本身
    self.updateItem(current, data);
    self.autoPaint();
  }
  /**
   * 删除子树
   * @param {string} id 子树根节点id
   * @param {boolean} internal 是否是内部变更。若不是内部变更则更新data数据
   * @return {object} 子树根节点
   */
  removeChild(id, internal) {
    const self = this;
    const node = self.findById(id);
    if (!node) {
      return self;
    }
    const children = node.get('model').children;
    const parent = node.get('parent');
    if (!parent.destroyed && !internal) {
      const siblings = parent.get('model').children;
      const index = indexOfChild(siblings, node.get('model'));
      siblings.splice(index, 1);
    }
    self.removeItem(node);
    Util.each(children, child => {
      self.removeChild(child.id, internal);
    });
    self.autoPaint();
  }
  /**
   * 导出图数据
   * @return {object} data
   */
  save() {
    return this.get('data');
  }
}

module.exports = TreeGraph;
