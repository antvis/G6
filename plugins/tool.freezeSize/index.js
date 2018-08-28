/**
 * @fileOverview freeze size zoom
 * @author huangtonger@aliyun.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

class Plugin {
  constructor(options) {
    Util.mix(this, {
      // cache freeze elements
      _freezeElements: {}
    }, options);
  }
  init() {
    const graph = this.graph;
    graph.on('afterchange', () => {
      this._stashFreezeElement();
    });
    graph.on('afterzoom', () => {
      this.freezeSize();
    });
  }
  _stashFreezeElement() {
    const graph = this.graph;
    const canvas = graph.getCanvas();
    const freezeElements = this._freezeElements;
    canvas.deepEach(child => {
      if (child.get('freezePoint')) {
        freezeElements[child.gid] = child;
      }
    });
  }
  freezeSize() {
    const freezeElements = this._freezeElements;
    const graph = this.graph;
    Util.each(freezeElements, freezeElement => {
      const freezePoint = freezeElement.get('freezePoint');
      const zoom = graph.getZoom();
      if (freezeElement.isShape && freezePoint && freezeElement.get('visible')) {
        freezeElement.resetMatrix();
        freezeElement.transform([
          [ 't', -freezePoint.x, -freezePoint.y ],
          [ 's', 1 / zoom, 1 / zoom ],
          [ 't', freezePoint.x, freezePoint.y ]
        ]);
      }
    });
  }
}

G6.Plugins['tool.freezeSize'] = Plugin;
module.exports = Plugin;
