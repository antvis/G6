/**
 * @fileOverview tooltip plugin
 * @author huangtonger@aliyun.com
 */
const G6 = require('@antv/g6');
const Util = G6.Util;
class Plugin {
  constructor(options) {
    this.options = {
      /**
       * horizontal offset
       * @type {number}
       */
      dx: 10,

      /**
       * vertical offset
       * @type {number}
       */
      dy: 10,

      /**
       * get tooltip dom
       * @type {function}
       * @return {string|null} tooltip dom
       */
      getTooltip({ item }) {
        if (item) {
          const model = item.getModel();
          const tooltip = model.tooltip;
          if (tooltip) {
            let lis = '';
            let title = item.type;
            if (Util.isArray(tooltip)) {
              tooltip.forEach(subTooltip => {
                lis += '<li style="font-size: 12px;list-style-type: none;"><span>' + subTooltip[0] + '</span>: ' + subTooltip[1] + '</li>';
              });
            } else {
              title = tooltip.title;
              tooltip.list.forEach(subTooltip => {
                lis += '<li style="font-size: 12px;list-style-type: none;"><span>' + subTooltip[0] + '</span>: ' + subTooltip[1] + '</li>';
              });
            }

            return `
              <div class="g6-tooltip" style="
                position: absolute;
                white-space: nowrap;
                zIndex: 8;
                transition: visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1), left 0.4s cubic-bezier(0.23, 1, 0.32, 1), top 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                background-color: rgba(255, 255, 255, 0.9);
                box-shadow: 0px 0px 10px #aeaeae;
                border-radius: 3px;
                color: rgb(87, 87, 87);
                line-height: 20px;
                padding: 10px 10px 6px 10px;
              ">
                <h4 class="g6-tooltip-title" style="
                  margin: 0;
                ">${title}</h4>
                <ul class="g6-tooltip-list" style="
                  padding: 0;
                  margin: 0;
                  margin-top: 4px;
                ">
                  ${lis}
                </ul>
              </div>
            `;
          }
        }
        return null;
      },
      ...options
    };
  }
  init() {
    const graph = this.graph;
    graph.on('mouseenter', ev => {
      ev.shape && this.onMouseEnter(ev);
    });
    graph.on('mousemove', ev => {
      this.onMouseMove(ev);
    });
    graph.on('mouseleave', ev => {
      this.onMouseLeave(ev);
    });
  }
  onMouseEnter(ev) {
    const graph = this.graph;
    const graphContainer = graph.getGraphContainer();
    const options = this.options;
    const tooltipHtml = options.getTooltip(ev);
    let tooltip = this.tooltip;
    tooltip && this.tooltip.destroy();

    if (tooltipHtml) {
      tooltip = Util.createDOM(tooltipHtml);
      tooltip.css({
        position: 'absolute'
      });
      graphContainer.appendChild(tooltip);
    } else {
      tooltip = null;
    }
    this.tooltip = tooltip;
  }
  onMouseMove({ domX, domY }) {
    const tooltip = this.tooltip;
    if (tooltip) {
      const graph = this.graph;
      const w0 = Util.getOuterWidth(tooltip);
      const h0 = Util.getOuterHeight(tooltip);
      const w1 = graph.getWidth();
      const h1 = graph.getHeight();

      tooltip.css({
        top: this._getTop(h0, h1, domY),
        left: this._getLeft(w0, w1, domX)
      });
    }
  }
  onMouseLeave() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }
  _getTop(h0, h1, domY) {
    const { dy } = this.options;
    if (h0 * 2 >= h1) {
      return '0px';
    }
    if (domY < h0 + dy) {
      return domY + dy + 'px';
    }
    return domY - h0 - dy + 'px';
  }
  _getLeft(w0, w1, domX) {
    const { dx } = this.options;
    if (w0 * 2 >= w1) {
      return '0px';
    }
    if (w1 - domX - dx < w0) {
      return domX - w0 - dx + 'px';
    }
    return domX + dx + 'px';
  }
  destroy() {
    this.tooltip && this.tooltip.destroy();
  }
}

G6.Plugins['tool.tooltip'] = Plugin;

module.exports = Plugin;
