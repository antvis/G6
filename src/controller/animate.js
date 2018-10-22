/**
 * @fileOverview animate controller
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');
const Util = require('../util/');

class Controller extends Base {
  getDefaultCfg() {
    return {
      graph: null,
      stash0: {},
      stash1: {}
    };
  }
  cacheGraph(stashType) {
    const graph = this.graph;
    const items = graph.getItems();
    this[stashType] = {};
    items.forEach(item => {
      this.cache(item, this[stashType]);
    });
  }
  cache(item, stash) {
    const group = item.getGraphicGroup();
    group.deepEach(element => {
      const id = element.gid;
      const subStash = {
        matrix: Util.cloneDeep(element.getMatrix())
      };
      if (element.isItemContainer) {
        subStash.enterAnimate = item.getEnterAnimate();
        subStash.leaveAnimate = item.getLeaveAnimate();
        subStash.showAnimate = item.getShowAnimate();
        subStash.hideAnimate = item.getHideAnimate();
      }
      if (element.isShape) {
        let attrs = element.attr();
        attrs = Util.omit(attrs, [ 'matrix', 'fillStyle', 'strokeStyle', 'endArrow', 'startArrow' ]);
        subStash.attrs = Util.cloneDeep(attrs);
      }
      subStash.item = item;
      subStash.element = element;
      subStash.visible = element.get('visible');
      stash[id] = subStash;
    }, true);
  }
  _compare() {
    const stash0 = this.stash0;
    const stash1 = this.stash1;
    const enterElements = [];
    const leaveElements = [];
    const updateElements = [];
    const hideElements = [];
    const showElements = [];

    Util.each(stash1, (subStash1, k) => {
      const subStash0 = stash0[k];
      if (subStash0) {
        if (subStash0.element.get('type') === subStash1.element.get('type')) {
          if (subStash0.visible && subStash1.visible) {
            updateElements.push(k);
          } else if (subStash0.visible && !subStash1.visible) {
            hideElements.push(k);
          } else if (!subStash0.visible && subStash1.visible) {
            showElements.push(k);
          }
        }
      } else {
        subStash1.element.isItemContainer && enterElements.push(k);
      }
    });
    Util.each(stash0, (v, k) => {
      if (!stash1[k]) {
        v.element.isItemContainer && leaveElements.push(k);
      }
    });
    this.enterElements = enterElements;
    this.leaveElements = leaveElements;
    this.updateElements = updateElements;
    this.hideElements = hideElements;
    this.showElements = showElements;
  }
  _addTween() {
    const graph = this.graph;
    const updateAnimate = graph.get('_updateAnimate');
    const enterElements = this.enterElements;
    const leaveElements = this.leaveElements;
    const updateElements = this.updateElements;
    const hideElements = this.hideElements;
    const showElements = this.showElements;
    const stash0 = this.stash0;
    const stash1 = this.stash1;
    // console.log('enterElements ==> ', enterElements);
    // console.log('leaveElements ==> ', leaveElements);
    // console.log('updateElements ==> ', updateElements);
    // console.log('hideElements ==> ', hideElements);
    // console.log('showElements ==> ', showElements);

    enterElements.forEach(elementId => {
      const subStash1 = stash1[elementId];
      const enterAnimate = subStash1.enterAnimate;
      if (enterAnimate) {
        enterAnimate(subStash1.item);
      }
    });
    leaveElements.forEach(elementId => {
      const subStash0 = stash0[elementId];
      const leaveAnimate = subStash0.leaveAnimate;
      if (leaveAnimate) {
        const e0 = stash0[elementId].element;
        e0.getParent().add(e0);
        leaveAnimate(subStash0.item);
      }
    });
    updateElements.forEach(elementId => {
      const subStash1 = stash1[elementId];
      const subStash0 = stash0[elementId];
      const e1 = subStash1.element;
      const e0 = subStash0.element;
      if (subStash0.attrs) {
        e1.attr(subStash0.attrs);
      }
      e1.setMatrix(subStash0.matrix);
      updateAnimate(e1, Util.mix({}, subStash1.attrs, { matrix: subStash1.matrix }));
      if (e0 !== e1) {
        e0.remove();
      }
    });
    hideElements.forEach(elementId => {
      const subStash1 = stash1[elementId];
      const hideAnimate = subStash1.hideAnimate;
      if (hideAnimate) {
        subStash1.element.show();
        hideAnimate(subStash1.item);
      }
    });
    showElements.forEach(elementId => {
      const subStash1 = stash1[elementId];
      const showAnimate = subStash1.showAnimate;
      if (showAnimate) {
        showAnimate(subStash1.item);
      }
    });
  }
  run() {
    if (this.graph.destroyed) {
      return;
    }
    this._compare();
    this._addTween();
  }
}

module.exports = Controller;
