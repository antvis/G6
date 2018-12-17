/**
 * @fileOverview force fit mixin
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Mixin = {};
Mixin.INIT = '_initForceFit';
Mixin.AUGMENT = {
  _initForceFit() {
    const width = this.get('width');
    const height = this.get('height');
    if (!width && !height) {
      this.forceFit();
      this._bindForceEvent();
      return;
    }
    if (!width) {
      this.forceFit('width');
      this._bindForceEvent('width');
      return;
    }
    if (!height) {
      this.forceFit('height');
      this._bindForceEvent('height');
      return;
    }
  },
  _bindForceEvent(type) {
    const forceFitTimer = this._getTimer('forceFit');
    const windowForceResizeEvent = () => {
      const timer = setTimeout(() => {
        this.forceFit(type);
      }, 200);
      forceFitTimer && clearTimeout(forceFitTimer);
      this._setTimer('forceFit', timer);
    };
    window.addEventListener('resize', windowForceResizeEvent);
    this.set('_windowForceResizeEvent', windowForceResizeEvent);
  },
  /**
   * force fit canvas size to container
   * @param  {string|undefined} type string could be 'width', 'height'
   * @return {Graph} this
   */
  forceFit(type) {
    const container = this.get('_containerDOM');
    const width = this.get('width');
    const height = this.get('height');
    const containerHeight = Util.getHeight(container);
    const containerWidth = Util.getWidth(container);
    if (type === 'width') {
      this.changeSize(containerWidth, height);
      return this;
    }
    if (type === 'height') {
      this.changeSize(width, containerHeight);
      return this;
    }
    this.changeSize(containerWidth, containerHeight);
    return this;
  }
};

module.exports = Mixin;
