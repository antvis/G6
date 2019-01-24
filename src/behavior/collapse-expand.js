const Util = require('../util');

module.exports = {
  getDefaultCfg() {
    return {
      onChange() {},
      animate: {
        duration: 500,
        delay: 0,
        callback() {},
        easing: 'easeLinear'
      }
    };
  },
  getEvents() {
    return {
      'node:click': 'onNodeClick'
    };
  },
  onNodeClick(e) {
    const item = e.item;
    const collapsed = !item.hasState('collapsed');
    item.set('collapsed', collapsed);
    const autoPaint = this.graph.get('autoPaint');
    this.graph.setAutoPaint(false);
    this.updateLayout(item, collapsed);
    this.setChildrenState(item, 'collapsed', collapsed);
    this.graph.setAutoPaint(autoPaint);
  },
  updateLayout(item, isCollapsed) {
    const changedData = this.onChange(item, isCollapsed);
    if (changedData) {
      if (this.animate) {
        if (this.graph.get('animating')) {
          this.graph.stopAnimate();
        }
        this.animateChild(changedData);
        this.performAnimate();
      } else {
        this.graph.changeData(changedData);
      }
    } else {
      if (isCollapsed) {
        this.collapse(item);
      } else {
        this.expand(item);
      }
      this.graph.paint();
    }
  },
  // 执行位置动画
  performAnimate() {
    const self = this;
    const animate = self.animate;
    const graph = self.graph;
    let lastRatio = 0;
    graph.positionAnimate(ratio => {
      Util.each(graph.get('nodes'), node => {
        const delta = node.get('deltaPosition');
        if (delta) {
          const model = node.get('model');
          model.x = model.x + (ratio - lastRatio) * delta.x;
          model.y = model.y + (ratio - lastRatio) * delta.y;
        }
      });
      lastRatio = ratio;
    }, animate.duration, animate.easing, () => {
      Util.each(graph.get('nodes'), node => {
        // node.set('deltaPosition', null);
        if (node.get('shouldHide')) {
          node.set('shouldHide', false);
          graph.hideItem(node);
        }
      });
      graph.paint();
      animate.callback();
    }, animate.delay);
  },
  // 根据最新layout，整理节点位置
  animateChild(data) {
    const self = this;
    const node = self.graph.findById(data.id);
    const nodeModel = node.get('model');
    const point = {
      x: data.x,
      y: data.y
    };
    if (!point.x || !point.y) {
      const model = node.get('parent').get('model');
      point.x = model.x;
      point.y = model.y;
    }
    if (nodeModel.x !== point.x || nodeModel.y !== point.y) {
      node.set('deltaPosition', {
        x: point.x - nodeModel.x,
        y: point.y - nodeModel.y
      });
    }
    // 还是展开状态的子节点，也做位移动画
    Util.each(data.children, child => {
      self.animateChild(child, data);
    });
    // 收缩状态的节点，都跑收缩动画
    if (node.get('collapsed')) {
      self.collapsePosition(node, point);
    }
    self.graph.showItem(node);
  },
  // 收缩的节点的动画终态是最顶收缩态节点的坐标
  collapsePosition(node, toPoint) {
    const self = this;
    Util.each(node.get('model').children, child => {
      child = self.graph.findById(child.id);
      const model = child.get('model');
      child.set('deltaPosition', {
        x: toPoint.x - model.x,
        y: toPoint.y - model.y
      });
      child.set('shouldHide', true);
      self.collapsePosition(child, toPoint);
    });
  },
  // 设置子树的collapse状态
  setChildrenState(item, state, enabled) {
    const self = this;
    // 如果父节点展开了，子节点还有原本就收缩的，不设置这个子树的状态
    if (!enabled && item.get('collapsed')) {
      return;
    }
    self.graph.setItemState(item, state, enabled);
    Util.each(item.get('model').children, child => {
      const node = self.graph.findById(child.id);
      self.setChildrenState(node, state, enabled);
    });
  },
  expand(item) {
    const self = this;
    const graph = self.graph;
    if (item.get('model').collapsed) {
      graph.showItem(item);
      return;
    }
    graph.showItem(item);
    graph.setItemState(item, 'collapsed', false);
    Util.each(item.get('model').children, child => {
      const node = self.graph.findById(child.id);
      self.expand(node);
    });
  },
  collapse(item) {
    const self = this;
    const graph = self.graph;
    graph.setItemState(item, 'collapsed', true);
    Util.each(item.get('model').children, child => {
      const node = graph.findById(child.id);
      self.collapse(node);
      self.graph.hideItem(node);
    });
  }
};
