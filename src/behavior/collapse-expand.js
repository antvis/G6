const DEFAULT_CLICK_TYPE = 'click';
const ALLOW_EVENTS = ['click', 'dblclick'];
module.exports = {
  getDefaultCfg() {
    return {
      /**
       * 发生收缩/扩展变化时的回调
       */
      clickType: DEFAULT_CLICK_TYPE,
      onChange() {}
    };
  },
  getEvents() {
    let clickType;
    // 检测输入是否合法
    if (ALLOW_EVENTS.includes(this.clickType)) {
      clickType = this.clickType;
    } else {
      clickType = DEFAULT_CLICK_TYPE;
      console.warn('Behavior collapse-expand的clickType参数不合法，请输入click或dblclick');
    }
    return {
      [`node:${clickType}`]: 'onNodeClick'
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
      console.warn('G6 自 3.0.4 版本支持直接从 item.getModel() 获取源数据(临时通知，将在之后版本清除)', e);
    }
    this.graph.refreshLayout();
  }
};
