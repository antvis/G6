const Util = require('../util');
const OFFSET = 12;

module.exports = {
  getDefaultCfg() {
    return {
      formatText(model) { return model.label; }
    };
  },
  getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove'
    };
  },
  onMouseEnter(e) {
    const self = this;
    if (!self.shouldBegin(e)) {
      return;
    }
    const item = e.item;
    self.currentTarget = item;
    self.showTooltip(e);
  },
  onMouseMove(e) {
    if (!this.shouldUpdate(e)) {
      return;
    }
    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }
    this.updatePosition(e);
  },
  onMouseLeave(e) {
    if (!this.shouldEnd(e)) {
      return;
    }
    this.currentTarget = null;
    this.hideTooltip();
  },
  showTooltip(e) {
    const self = this;
    if (!e.item) {
      return;
    }
    let container = self.container;
    if (!container) {
      container = self._createTooltip(self.graph.get('canvas'));
      self.container = container;
    }
    const text = self.formatText(e.item.get('model'), e);
    container.innerHTML = text;
    this.updatePosition(e);
    Util.modifyCSS(this.container, { visibility: 'visible' });
  },
  hideTooltip() {
    Util.modifyCSS(this.container, {
      visibility: 'hidden'
    });
  },
  updatePosition(e) {
    const width = this.width;
    const height = this.height;
    const container = this.container;
    let x = e.x;
    let y = e.y;
    const bbox = container.getBoundingClientRect();
    if (x > width / 2) {
      x -= (bbox.width + OFFSET);
    } else {
      x += OFFSET;
    }
    if (y > height / 2) {
      y -= (bbox.height + OFFSET);
    } else {
      y += OFFSET;
    }
    const left = x + 'px';
    const top = y + 'px';
    Util.modifyCSS(this.container, { left, top });
  },
  _createTooltip(canvas) {
    const el = canvas.get('el');
    el.style.position = 'relative';
    const container = Util.createDom('<div class="g6-tooltip"></div>');
    el.parentNode.appendChild(container);
    Util.modifyCSS(container, {
      position: 'absolute',
      visibility: 'visible'
    });
    this.width = canvas.get('width');
    this.height = canvas.get('height');
    this.container = container;
    return container;
  }
};
