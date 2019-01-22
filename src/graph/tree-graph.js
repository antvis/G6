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
    return self;
  }
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
  changeData(data) {
    const self = this;
    if (!self.get('data')) {
      self.data(data);
      self.render();
    }
    const autoPaint = this.get('autoPaint');
    self.setAutoPaint(false);
    self.updateChild(data, null, true);
    self.paint();
    self.setAutoPaint(autoPaint);
  }
  updateChild(node, parent, internal) {
    const self = this;
    const current = self.findById(node.id);
    // 如果不存在该节点，则添加
    if (!current) {
      return self.addChild(node, parent, internal);
    }
    // 更新新节点下所有子节点
    Util.each(node.children, child => {
      self.updateChild(child, current, internal);
    });
    // 用现在节点的children来删除移除的子节点
    Util.each(current.get('model').children, child => {
      if (indexOfChild(node.children, child) === -1) {
        self.removeChild(child.id, internal);
      }
    });
    // 最后更新节点本身
    self.updateItem(current, node);
    self.autoPaint();
  }
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
  save() {
    return this.get('data');
  }
}

module.exports = TreeGraph;
