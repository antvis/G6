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
      startCache: {},
      endCache: {},
      keykeyCache: {}
    };
  }
  _init() {
    const graph = this.graph;
    const keykeyCache = this.keykeyCache;
    graph.on('afteritemdraw', ({ item }) => {
      const group = item.getGraphicGroup();
      group.deepEach(element => {
        keykeyCache[element.gid] = this._getCache(element);
      }, true);
    });
  }
  cacheGraph(cacheType, affectedItemIds) {
    const graph = this.graph;
    let items;
    if (affectedItemIds) {
      items = affectedItemIds.map(affectedItemId => {
        return graph.find(affectedItemId);
      });
    } else {
      items = graph.getItems();
    }
    this[cacheType] = {};
    items.forEach(item => {
      item && this.cache(item, this[cacheType], cacheType);
    });
  }
  _getCache(element) {
    const keykeyCache = this.keykeyCache;
    if (!Util.isObject(element)) {
      return keykeyCache[element];
    }
    const cache = {
      props: {
        matrix: Util.clone(element.getMatrix()),
        attrs: {}
      }
    };
    if (element.isShape) {
      let attrs = element.attr();
      attrs = Util.omit(attrs, INVALID_ATTRS);
      cache.props.attrs = Util.clone(attrs);
    }
    return cache;
  }
  /**
   * get animate
   * @param  {object} item - item
   * @param  {string} type - animate type could be `show`, `hide`, `enter`, `leave`, 'update'
   * @return {function} animate function
   */
  _getAnimation(item, type) {
    const graph = this.graph;
    const shapeObj = item.shapeObj;
    const defaultAnimation = this[type];
    const shapeAnimation = shapeObj[type + 'Animation'] || shapeObj[type + 'Animate']; // compatible with Animate
    const graphAnimate = graph.get('_' + type + 'Animation');
    const animation = shapeAnimation || graphAnimate || defaultAnimation;
    return Util.isString(animation) ? Animation[type + Util.upperFirst(animation)] : animation;
  }
  cache(item, cache, type) {
    const group = item.getGraphicGroup();
    group.deepEach(element => {
      const id = element.gid;
      const subCache = type === 'startCache' ? this._getCache(element) : this._getCache(element.gid);
      subCache.enterAnimate = this._getAnimation(item, 'enter');
      subCache.leaveAnimate = this._getAnimation(item, 'leave');
      subCache.showAnimate = this._getAnimation(item, 'show');
      subCache.hideAnimate = this._getAnimation(item, 'hide');
      subCache.updateAnimate = this._getAnimation(item, 'update');
      subCache.item = item;
      subCache.element = element;
      subCache.visible = element.get('visible');
      cache[id] = subCache;
    }, true);
  }
  _compare() {
    const startCache = this.startCache;
    const endCache = this.endCache;
    const enterElements = [];
    const leaveElements = [];
    const updateElements = [];
    const hideElements = [];
    const showElements = [];
    Util.each(endCache, (endKeyFrame, k) => {
      const startKeyFrame = startCache[k];
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
    Util.each(startCache, (v, k) => {
      if (!endCache[k]) {
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
    const startCache = this.startCache;
    const endCache = this.endCache;
    // console.log('enterElements ==> ', enterElements);
    // console.log('leaveElements ==> ', leaveElements);
    // console.log('updateElements ==> ', updateElements);
    // console.log('hideElements ==> ', hideElements);
    // console.log('showElements ==> ', showElements);

    enterElements.forEach(id => {
      const endKeyFrame = endCache[id];
      const enterAnimate = endKeyFrame.enterAnimate;
      if (enterAnimate) {
        enterAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame: null,
          startCache,
          endCache,
          done() {}
        });
      }
    });
    leaveElements.forEach(id => {
      const startKeyFrame = startCache[id];
      const leaveAnimate = startKeyFrame.leaveAnimate;
      if (leaveAnimate) {
        const startElement = startCache[id].element;
        if (startElement.isItemContainer) {
          startElement.getParent().add(startElement);
        }
        leaveAnimate({
          element: startElement,
          item: startKeyFrame.item,
          endKeyFrame: null,
          startKeyFrame,
          startCache,
          endCache,
          done() {
            if (startElement.isItemContainer) {
              startElement.remove();
            }
          }
        });
      }
    });
    updateElements.forEach(id => {
      const endKeyFrame = endCache[id];
      const startKeyFrame = startCache[id];
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
        startCache,
        endCache,
        done
      });
      if (startElement !== endElement) {
        startElement.remove();
      }
    });
    hideElements.forEach(id => {
      const endKeyFrame = endCache[id];
      const startKeyFrame = startCache[id];
      const hideAnimate = endKeyFrame.hideAnimate;
      if (hideAnimate) {
        endKeyFrame.element.show();
        hideAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame,
          startCache,
          endCache,
          done() {
            const item = endKeyFrame.item;
            const group = item.getGraphicGroup();
            !item.visible && group.hide();
          }
        });
      }
    });
    showElements.forEach(id => {
      const endKeyFrame = endCache[id];
      const startKeyFrame = startCache[id];
      const showAnimate = endKeyFrame.showAnimate;
      if (showAnimate) {
        showAnimate({
          element: endKeyFrame.element,
          item: endKeyFrame.item,
          endKeyFrame,
          startKeyFrame,
          startCache,
          endCache,
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
