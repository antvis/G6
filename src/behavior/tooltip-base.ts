import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDom from '@antv/dom-util/lib/create-dom';
import { IG6GraphEvent } from '../../types';

const OFFSET = 12;

export default {
  onMouseEnter(e: IG6GraphEvent) {
    const self = this;
    if (!self.shouldBegin(e)) {
      return;
    }
    const item = e.item;
    self.currentTarget = item;
    self.showTooltip(e);
    self.graph.emit('tooltipchange', { item: e.item, action: 'show' });
  },
  onMouseMove(e: IG6GraphEvent) {
    if (!this.shouldUpdate(e)) {
      this.hideTooltip();
      return;
    }
    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }
    this.updatePosition(e);
  },
  onMouseLeave(e: IG6GraphEvent) {
    if (!this.shouldEnd(e)) {
      return;
    }
    this.hideTooltip();
    this.graph.emit('tooltipchange', { item: this.currentTarget, action: 'hide' });
    this.currentTarget = null;
  },
  showTooltip(e: IG6GraphEvent) {
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
    modifyCSS(this.container, { visibility: 'visible' });
  },
  hideTooltip() {
    modifyCSS(this.container, {
      visibility: 'hidden'
    });
  },
  updatePosition(e: IG6GraphEvent) {
    const width = this.width;
    const height = this.height;
    const container = this.container;
    let x = e.canvasX;
    let y = e.canvasY;
    const bbox = container.getBoundingClientRect();
    if (x > width / 2) {
      x -= (bbox.width);
    } else {
      x += OFFSET;
    }
    if (y > height / 2) {
      y -= (bbox.height);
    } else {
      y += OFFSET;
    }
    const left = x + 'px';
    const top = y + 'px';
    modifyCSS(this.container, { left, top, visibility: 'visible' });
  },
  _createTooltip(canvas): HTMLElement {
    const el = canvas.get('el');
    el.style.position = 'relative';
    const container = createDom('<div class="g6-tooltip g6-' + this.item + '-tooltip"></div>');
    el.parentNode.appendChild(container);
    modifyCSS(container, {
      position: 'absolute',
      visibility: 'visible'
    });
    this.width = canvas.get('width');
    this.height = canvas.get('height');
    this.container = container;
    return container;
  }
};
