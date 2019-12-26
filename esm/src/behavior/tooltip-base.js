import modifyCSS from '@antv/dom-util/lib/modify-css';
import createDom from '@antv/dom-util/lib/create-dom';
var OFFSET = 12;
export default {
    onMouseEnter: function (e) {
        var self = this;
        if (!self.shouldBegin(e)) {
            return;
        }
        var item = e.item;
        self.currentTarget = item;
        self.showTooltip(e);
        self.graph.emit('tooltipchange', { item: e.item, action: 'show' });
    },
    onMouseMove: function (e) {
        if (!this.shouldUpdate(e)) {
            this.hideTooltip();
            return;
        }
        if (!this.currentTarget || e.item !== this.currentTarget) {
            return;
        }
        this.updatePosition(e);
    },
    onMouseLeave: function (e) {
        if (!this.shouldEnd(e)) {
            return;
        }
        this.hideTooltip();
        this.graph.emit('tooltipchange', { item: this.currentTarget, action: 'hide' });
        this.currentTarget = null;
    },
    showTooltip: function (e) {
        var self = this;
        if (!e.item) {
            return;
        }
        var container = self.container;
        if (!container) {
            container = self._createTooltip(self.graph.get('canvas'));
            self.container = container;
        }
        var text = self.formatText(e.item.get('model'), e);
        container.innerHTML = text;
        this.updatePosition(e);
        modifyCSS(this.container, { visibility: 'visible' });
    },
    hideTooltip: function () {
        modifyCSS(this.container, {
            visibility: 'hidden'
        });
    },
    updatePosition: function (e) {
        var width = this.width;
        var height = this.height;
        var container = this.container;
        var x = e.canvasX;
        var y = e.canvasY;
        var bbox = container.getBoundingClientRect();
        if (x > width / 2) {
            x -= (bbox.width);
        }
        else {
            x += OFFSET;
        }
        if (y > height / 2) {
            y -= (bbox.height);
        }
        else {
            y += OFFSET;
        }
        var left = x + 'px';
        var top = y + 'px';
        modifyCSS(this.container, { left: left, top: top, visibility: 'visible' });
    },
    _createTooltip: function (canvas) {
        var el = canvas.get('el');
        el.style.position = 'relative';
        var container = createDom('<div class="g6-tooltip g6-' + this.item + '-tooltip"></div>');
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
//# sourceMappingURL=tooltip-base.js.map