/**
 * @fileOverview dom util
 * @author huangtonger@aliyun.com
 */

const BaseUtil = require('./base');
const DomUtil = {};
BaseUtil.mix(DomUtil, {
  /**
   * add event listener
   * @param  {object} target - event source
   * @param  {object} eventType - event type
   * @param  {funtion} callback - event callback
   * @return {object} - event object that has remove function
   */
  addEventListener(target, eventType, callback) {
    if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove() {
          target.detachEvent('on' + eventType, callback);
        }
      };
    } else if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    }
  },
  /**
   * create dom by string
   * @param  {string}  str dom string
   * @param  {object}  css css
   * @return  {domobject}  dom
   */
  createDOM(str, css) {
    let dom;
    if (BaseUtil.isString(str)) {
      dom = BaseUtil.createDom(str);
    } else {
      dom = str;
    }
    dom.bbox = dom.getBoundingClientRect();
    dom.hide = function() {
      dom.style.visibility = 'hidden';
      return dom;
    };
    dom.show = function() {
      dom.style.visibility = 'visible';
      return dom;
    };
    dom.css = function(obj) {
      BaseUtil.modifyCSS(dom, obj);
      return dom;
    };
    dom.width = function() {
      return BaseUtil.getWidth(dom);
    };
    dom.height = function() {
      return BaseUtil.getHeight(dom);
    };
    dom.destroy = function() {
      dom.parentNode && dom.parentNode.removeChild(dom);
    };
    dom.on = function(eventType, callback) {
      dom.addEventListener(eventType, callback);
    };
    dom.off = function(eventType, callback) {
      dom.removeEventListener(eventType, callback);
    };
    dom.css(css);
    return dom;
  },
  initDOMContainer(container, className) {
    if (container) {
      if (BaseUtil.isString(container)) {
        container = document.getElementById(container);
      }
    } else {
      throw new Error('please set the container for the ' + className + ' !');
    }
    return container;
  }
});
module.exports = DomUtil;
