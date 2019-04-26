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
    const rawData = this.graph.findDataById(item.getModel().id);
    const children = rawData.children;
    // 叶子节点的收缩和展开没有意义
    if (!children || children.length === 0) {
      return;
    }
    const collapsed = !rawData.collapsed;
    if (!this.shouldBegin(e, collapsed)) {
      return;
    }
    rawData.collapsed = collapsed;
    this.graph.emit('itemcollapsed', { item: e.item, collapsed });
    if (!this.shouldUpdate(e, collapsed)) {
      return;
    }
    this.onChange(item, collapsed);
    this.graph.refreshLayout();
  }
};
