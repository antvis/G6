module.exports = {
  getDefaultCfg() {
    return {
      /**
       * 发生收缩/扩展变化时的回调
       */
      onChange() {}
    };
  },
  getEvents() {
    return {
      'node:click': 'onNodeClick'
    };
  },
  onNodeClick(e) {
    const item = e.item;
    // 如果节点进行过更新，model 会进行 merge，直接改 model 就不能改布局，所以需要去改源数据
    const sourceData = this.graph.findDataById(item.get('id'));
    const children = sourceData.children;
    // 叶子节点的收缩和展开没有意义
    if (!children || children.length === 0) {
      return;
    }
    const collapsed = !sourceData.collapsed;
    if (!this.shouldBegin(e, collapsed)) {
      return;
    }
    sourceData.collapsed = collapsed;
    item.getModel().collapsed = collapsed;
    this.graph.emit('itemcollapsed', { item: e.item, collapsed });
    if (!this.shouldUpdate(e, collapsed)) {
      return;
    }
    try {
      this.onChange(item, collapsed);
    } catch (e) {
      console.warn('You can access to source data via item.getModel() directly since 3.0.4', e);
    }
    this.graph.refreshLayout();
  }
};
