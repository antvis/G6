/**
 * @fileOverview animate controller
 * @author huangtonger@aliyun.com
 */

const Base = require('./base');
const Animation = require('../animation/');
const Util = require('../util/');
const Global = require('../global');
const INVALID_ATTRS = [ 'matrix', 'fillStyle', 'strokeStyle', 'endArrow', 'startArrow' ];

class Controller extends Base {
  getDefaultCfg() {
    return {
      /**
       * show animate
       * @type {function|string}
       */
      show: 'scaleIn',

      /**
       * hide animate
       * @type {function|string}
       */
      hide: 'scaleOut',

      /**
       * enter animate
       * @type {function|string}
       */
      enter: 'scaleIn',

      /**
       * leave animate
       * @type {function|string}
       */
      leave: 'scaleOut',

      /**
       * update animate
       * @type {function}
       */
      update({ element, endKeyFrame }) {
        const { props } = endKeyFrame;
        element.animate({
          matrix: props.matrix,
          ...props.attrs
        }, Global.updateDuration, Global.updateEasing);
      },
      graph: null,
      startStashes: {},
      endStashes: {},
      keykeyStashes: {}
    };
  }
  _init() {
    const graph = this.graph;
    const keykeyStashes = this.keykeyStashes;
    graph.on('afteritemdraw', ({ item }) => {
      const group = item.getGraphicGroup();
      group.deepEach(element => {
        keykeyStashes[element.gid] = this._getStash(element);
      }, true);
    });
  }
  cacheGraph(stashType, affectedItemIds) {
    const graph = this.graph;
    let items;
    if (affectedItemIds) {
      items = affectedItemIds.map(affectedItemId => {
        return graph.find(affectedItemId);
      });
    } else {
      items = graph.getItems();
    }
    this[stashType] = {};
    items.forEach(item => {
      item && this.cache(item, this[stashType], stashType);
    });
  }
  _getStash(element) {
    const keykeyStashes = this.keykeyStashes;
    if (!Util.isObject(element)) {
      return keykeyStashes[element];
    }
    const stash = {
      props: {
        matrix: Util.clone(element.getMatrix()),
        attrs: {}
      }
    };
    if (element.isShape) {
      let attrs = element.attr();
      attrs = Util.omit(attrs, INVALID_ATTRS);
      stash.props.attrs = Util.clone(attrs);
    }
    return stash;
  }
  /**
   * get animate
   * @param  {object} item - item
   * @param  {string} type - animate type could be `show`, `hide`, `enter`, `leave`, 'update'
   * @return {function} animate function
   */
  _getAnimation(item, type) {
    const shapeObj = item.shapeObj;
    const defaultAnimation = this[type];
    const shapeAnimation = shapeObj[type + 'Animation'] || shapeObj[type + 'Animate']; // compatible with Animate
    const animation = shapeAnimation ? shapeAnimation : defaultAnimation;
    return Util.isString(animation) ? Animation[type + Util.upperFirst(animation)] : animation;
  }
  cache(item, stash, type) {
    const group = item.getGraphicGroup();
    group.deepEach(element => {
      const id = element.gid;
      const subStash = type === 'startStashes' ? this._getStash(element) : this._getStash(element.gid);
      subStash.enterAnimate = this._getAnimation(item, 'enter');
      subStash.leaveAnimate = this._getAnimation(item, 'leave');
      subStash.showAnimate = this._getAnimation(item, 'show');
      subStash.hideAnimate = this._getAnimation(item, 'hide');
      subStash.updateAnimate = this._getAnimation(item, 'update');
      subStash.item = item;
      subStash.element = element;
      subStash.visible = element.get('visible');
      stash[id] = subStash;
    }, true);
  }
  _compare() {
    const startStashes = this.startStashes;
    const endStashes = this.endStashes;
    const enterElements = [];
    const leaveElements = [];
    const updateElements = [];
    const hideElements = [];
    const showElements = [];
    Util.each(endStashes, (endKeyFrame, k) => {
      const startKeyFrame = startStashes[k];
      if (startKeyFrame) {
        if (startKeyFrame.element.get('type') === endKeyFrame.element.get('type')) {
          if (startKeyFrame.visible && endKeyFrame.visible) {
            updateElements.push(k);
          } else if (startKeyFrame.visible && !endKeyFrame.visible) {
            hideElements.push(k);
          } else if (!startKeyFrame.visible && endKeyFrame.visible) {
            showElements.push(k);
          }
        }
      } else {
        enterElements.push(k);
      }
    });
    Util.each(startStashes, (v, k) => {
      if (!endStashes[k]) {
        leaveElements.push(k);
      }
    });
    this.enterElements = enterElements;
    this.leaveElements = leaveElements;
    this.updateElements = updateElements;
    this.hideElements = hideElements;
    this.showElements = showElements;
  }
  _addTween() {
    const enterElements = this.enterElements;
    const leaveElements = this.leaveElements;
    const updateElements = this.updateElements;
    const hideElements = this.hideElements;
    const showElements = this.showElements;
    const startStashes = this.startStashes;
    const endStashes = this.endStashes;
    // console.log('enterElements ==> ', enterElements);
    // console.log('leaveElements ==> ', leaveElements);
    // console.log('updateElements ==> ', updateElements);
    // console.log('hideElements ==> ', hideElements);
    // console.log('showElements ==> ', showElements);

    enterElements.forEach(id => {
      const endKeyFrame = endStashes[id];
      const enterAnimate = endKeyFrame.enterAnimate;
      if (enterAnimate) {
        enterAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame: null,
          startStashes,
          endStashes,
          done() {}
        });
      }
    });
    leaveElements.forEach(id => {
      const startKeyFrame = startStashes[id];
      const leaveAnimate = startKeyFrame.leaveAnimate;
      if (leaveAnimate) {
        const startElement = startStashes[id].element;
        if (startElement.isItemContainer) {
          startElement.getParent().add(startElement);
        }
        leaveAnimate({
          element: startElement,
          item: startKeyFrame.item,
          endKeyFrame: null,
          startKeyFrame,
          startStashes,
          endStashes,
          done() {
            if (startElement.isItemContainer) {
              startElement.remove();
            }
          }
        });
      }
    });
    updateElements.forEach(id => {
      const endKeyFrame = endStashes[id];
      const startKeyFrame = startStashes[id];
      const endElement = endKeyFrame.element;
      const startElement = startKeyFrame.element;
      const startProps = startKeyFrame.props;
      const endProps = endKeyFrame.props;
      const updateAnimate = endKeyFrame.updateAnimate;
      const done = () => {};
      if (startProps.attrs) {
        endElement.attr(startProps.attrs);
      }
      if (!Util.isEqual(startProps.matrix, endProps.matrix)) {
        endElement.setMatrix(startProps.matrix);
      }
      updateAnimate({
        element: endElement,
        item: endKeyFrame,
        endKeyFrame,
        startKeyFrame,
        startStashes,
        endStashes,
        done
      });
      if (startElement !== endElement) {
        startElement.remove();
      }
    });
    hideElements.forEach(id => {
      const endKeyFrame = endStashes[id];
      const startKeyFrame = startStashes[id];
      const hideAnimate = endKeyFrame.hideAnimate;
      if (hideAnimate) {
        endKeyFrame.element.show();
        hideAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame,
          startStashes,
          endStashes,
          done() {
            const item = endKeyFrame.item;
            const group = item.getGraphicGroup();
            !item.visible && group.hide();
          }
        });
      }
    });
    showElements.forEach(id => {
      const endKeyFrame = endStashes[id];
      const startKeyFrame = startStashes[id];
      const showAnimate = endKeyFrame.showAnimate;
      if (showAnimate) {
        showAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame,
          startStashes,
          endStashes,
          done() {}
        });
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
