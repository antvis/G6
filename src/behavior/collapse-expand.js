const Util = require('../util');

const DEFAULT_ANIMATE = {
  duration: 500,
  delay: 0,
  callback() {},
  easing: 'easeLinear'
};

module.exports = {
  getDefaultCfg() {
    return {
      /**
       * 发生收缩/扩展变化时，是否需要重新layout。
       */
      onChange() {},
      animate: {}
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
    if (!this.shouldBegin(e, collapsed)) {
      return;
    }
    item.set('collapsed', collapsed);
    this.graph.emit('itemcollapsed', { item: e.item, collapsed });
    if (!this.shouldUpdate(e, collapsed)) {
      return;
    }
    const autoPaint = this.graph.get('autoPaint');
    this.graph.setAutoPaint(false);
    this.updateLayout(item, collapsed);
    this.setChildrenState(item, 'collapsed', collapsed);
    this.graph.setAutoPaint(autoPaint);
  },
  updateLayout(item, isCollapsed) {
    const graph = this.graph;
    let data = this.onChange(item, isCollapsed);
    if (data) {
      data = typeof data === 'boolean' ? graph.get('data') : data;
      if (graph.get('layout')) {
        data = graph.get('layout')(data);
      }
      if (this.animate) {
        // 有动画，且有重布局，先停掉原有动画
        if (this.animating) {
          this.graph.get('canvas').stopAnimate();
        }
        // 计算每个节点移动的起始位置和最终位置
        this.animateChild(data);
        this.performAnimate();
      } else {
        // 仅有重布局
        this.graph.changeData(data);
      }
    } else {
      if (this.animate) {
        // 没有重布局，有动画的情况
        const model = item.get('model');
        if (isCollapsed) {
          this.collapsePosition(item, {
            x: model.x,
            y: model.y
          });
        } else {
          this.expandPosition(item, { x: model.x, y: model.y });
        }
        this.performAnimate();
      } else {
        // 没有重布局，没有动画
        if (isCollapsed) {
          this.collapse(item);
        } else {
          this.expand(item);
        }
        this.graph.paint();
      }
    }
  },
  // 执行位置动画
  performAnimate() {
    const self = this;
    const animate = Util.mix({}, DEFAULT_ANIMATE, self.animate);
    const graph = self.graph;
    let lastRatio = 0;
    this.animating = true;
    graph.get('canvas').animate({
      onFrame: ratio => {
        Util.each(graph.get('nodes'), node => {
          const delta = node.get('deltaPosition');
          if (delta) {
            const model = node.get('model');
            model.x = model.x + (ratio - lastRatio) * delta.x;
            model.y = model.y + (ratio - lastRatio) * delta.y;
          }
        });
        lastRatio = ratio;
        graph.refreshPositions();
      }
    }, animate.duration || 500, animate.easing, () => {
      Util.each(graph.get('nodes'), node => {
        if (node.get('shouldHide')) {
          node.set('shouldHide', false);
          graph.hideItem(node);
        }
        node.set('deltaPosition', null);
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
      if (!child.get('origin')) {
        child.set('origin', { x: model.x, y: model.y });
      }
      child.set('deltaPosition', {
        x: toPoint.x - model.x,
        y: toPoint.y - model.y
      });
      child.set('shouldHide', true);
      if (!child.get('collapsed')) {
        self.collapsePosition(child, toPoint);
      }
    });
  },
  // 张开的节点，从startPoint开始，动画到节点原本的位置
  expandPosition(item, startPoint) {
    const self = this;
    const children = item.get('model').children;
    Util.each(children, child => {
      child = self.graph.findById(child.id);
      self.graph.showItem(child);
      const origin = child.get('origin');
      child.set('deltaPosition', { x: origin.x - startPoint.x, y: origin.y - startPoint.y });
      if (!child.get('collapsed')) {
        self.expandPosition(child, startPoint);
      }
    });
  },
  // 设置子节点的状态
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
  // 不包含动画，仅展示展开节点
  expand(item) {
    const self = this;
    const graph = self.graph;
    if (item.get('collapsed')) {
      graph.showItem(item);
      return;
    }
    graph.showItem(item);
    Util.each(item.get('model').children, child => {
      const node = self.graph.findById(child.id);
      self.expand(node);
    });
  },
  // 不包含动画，仅隐藏收缩节点
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
