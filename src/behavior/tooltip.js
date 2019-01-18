const Util = require('../../src/util');
const OFFSET = 12;

module.exports = {
  getDefaultCfg() {
    return {
      textStyle: {
        stroke: '#575757',
        fontSize: 12
      },
      backgroundStyle: {
        fill: 'rgba(255,255,255,0.9)',
        stroke: '#e2e2e2',
        radius: 4
      },
      formatText(model) { return model.label; },
      padding: [ 10, 6 ]
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
    /* eslint-disable */
    console.log(e.x, e.y, left, top);
    Util.modifyCSS(this.container, { left, top });
  },
  _createTooltip(canvas) {
    const self = this;
    const backgroundStyle = self.backgroundStyle;
    const textStyle = self.textStyle;
    const el = canvas.get('el');
    el.style.position = 'relative';
    const container = Util.createDom('<div class="g6-tooltip"></div>');
    const padding = Util.formatPadding(this.padding);
    el.parentNode.appendChild(container);
    Util.modifyCSS(container, {
      position: 'absolute',
      backgroundColor: backgroundStyle.fill || 'rgba(255,255,255,0.9)',
      border: '1px solid ' + backgroundStyle.stroke,
      borderRadius: backgroundStyle.radius + 'px',
      color: textStyle.stroke,
      fontSize: textStyle.fontSize + 'px',
      padding: padding[0] + 'px ' + padding[1] + 'px ' + padding[2] + 'px ' + padding[3] + 'px',
      visibility: 'visible',
      boxShadow: '#aeaeae 0px 0px 10px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif',
      transition: 'visibility 0.2s ease 0s'
    });
    this.width = canvas.get('width');
    this.height = canvas.get('height');
    this.container = container;
    return container;
  }
};
