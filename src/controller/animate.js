/**
 * @fileOverview animate controller
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');
const Util = require('../util/');

/**
 * depth traversal and copy the graphics
 * @param  {object}   map        the index table
 * @param  {array}    parent     parent
 * @param  {number}   count      element count
 * @return {number}   count      element count
 */
function getElements(map, parent, count) {
  const children = parent.get('children');
  Util.each(children, function(child) {
    count++;
    const id = child.gid;

    if (child.isGroup) {
      count = getElements(map, child, count);
    }
    if (!Util.isNil(id)) {
      const stash = {
        matrixStash: Util.cloneDeep(child.getMatrix()),
        element: child,
        visible: child.get('visible')
      };
      if (child.isShape) {
        stash.attrsStash = Util.cloneDeep(child.attr());
      }
      map[id] = stash;
    }
  });
  return count;
}

class Controller extends Base {
  constructor(cfg) {
    super(cfg);
    this._init();
  }
  _init() {
    const graph = this.graph;
    graph.on('afteritemdraw', ev => {
      this.cacheKeyFrame(ev.item);
    });
  }
  cacheKeyFrame(item) {
    const keyFrameCache = this.keyFrameCache;
    const group = item.getGraphicGroup();
    if (item.isEdge) {
      group.setMatrix([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ]);
    }
    group.deepEach(element => {
      const id = element.gid;
      const stash = {
        matrix: Util.cloneDeep(element.getMatrix())
      };
      if (element.isItemContainer) {
        stash.enterAnimate = item.getEnterAnimate();
        stash.leaveAnimate = item.getLeaveAnimate();
      }
      if (element.isShape) {
        stash.attrs = Util.cloneDeep(element.attr());
      }
      stash.item = item;
      keyFrameCache[id] = stash;
    }, true);
  }
  _compare() {
    const stash0 = this.stash0;
    const stash1 = this.stash1;
    const enterElements = [];
    const leaveElements = [];
    const updateElements = [];

    Util.each(stash1, function(v, k) {
      if (stash0[k]) {
        if (v.element.get('type') === stash0[k].element.get('type')) {
          updateElements.push(k);
        }
      } else {
        enterElements.push(k);
      }
    });
    Util.each(stash0, function(v, k) {
      if (!stash1[k]) {
        leaveElements.push(k);
      }
    });
    this.enterElements = enterElements;
    this.leaveElements = leaveElements;
    this.updateElements = updateElements;
  }
  _addTween() {
    const graph = this.graph;
    const updateAnimate = graph.get('_updateAnimate');
    const enterElements = this.enterElements;
    const leaveElements = this.leaveElements;
    const updateElements = this.updateElements;
    const stash0 = this.stash0;
    const stash1 = this.stash1;
    const keyFrameCache = this.keyFrameCache;

    enterElements.forEach(function(elementId) {
      const keyFrame = keyFrameCache[elementId];
      const enterAnimate = keyFrame.enterAnimate;

      if (enterAnimate) {
        enterAnimate(keyFrame.item, stash0.element, stash1.element);
      }
    });
    Util.each(leaveElements, function(elementId) {
      const keyFrame = keyFrameCache[elementId];
      const leaveAnimate = keyFrame.leaveAnimate;
      if (leaveAnimate) {
        const e0 = stash0[elementId].element;
        e0.getParent().add(e0);
        leaveAnimate(keyFrame.item, stash0, stash1);
      }
    });
    Util.each(updateElements, function(elementId) {
      const keyFrame = keyFrameCache[elementId];
      const subStash1 = stash1[elementId];
      const subStash0 = stash0[elementId];
      const e1 = subStash1.element;
      const e0 = subStash0.element;
      let visibleAction = 'none';
      if (subStash1.visible && !subStash0.visible) {
        visibleAction = 'show';
      } else if (!subStash1.visible && subStash0.visible) {
        visibleAction = 'hide';
      }
      if (subStash0.attrsStash) {
        e1.attr(subStash0.attrsStash);
      }
      e1.setMatrix(Util.cloneDeep(subStash0.matrixStash));
      updateAnimate(e1, Util.mix({}, keyFrame.attrs, { matrix: keyFrame.matrix }), visibleAction);
      if (e0 !== e1) {
        e0.remove();
      }
    });
  }
  getDefaultCfg() {
    return {
      graph: null,
      canvases: null,
      stash0: null,
      stash1: null,
      keyFrameCache: {}
    };
  }
  run() {
    if (this.graph.destroyed) {
      return;
    }
    this.updateStash();
    if (this.count < 5000) {
      this._compare();
      this._addTween();
    }
    Util.each(this.canvases, canvas => {
      canvas.draw();
    });
  }
  updateStash() {
    const canvases = this.canvases;
    let elementsStash = this.elementsStash;
    const elements = {};
    let count = 0;
    elementsStash = elementsStash ? elementsStash : {};
    Util.each(canvases, canvas => {
      count += getElements(elements, canvas, 0);
    });
    this.elementsStash = elements;
    this.stash0 = elementsStash;
    this.stash1 = elements;
    this.count = count;
  }
}

module.exports = Controller;
