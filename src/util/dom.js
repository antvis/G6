/**
 * @fileOverview dom util
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g');
const BaseUtil = require('./base');
const DomUtil = {};
BaseUtil.mix(DomUtil, G.DomUtil, {
  /**
   * add event listener
   * @param  {object} target - event source
   * @param  {object} eventType - event type
   * @param  {funtion} callback - event callback
   * @return {object} - event object that has remove function
   */
  addEventListener(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false);
      return {
        remove() {
          target.removeEventListener(eventType, callback, false);
        }
      };
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventType, callback);
      return {
        remove() {
          target.detachEvent('on' + eventType, callback);
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
      dom = G.DomUtil.createDom(str);
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
      G.DomUtil.modifyCSS(dom, obj);
      return dom;
    };
    dom.width = function() {
      return G.DomUtil.getWidth(dom);
    };
    dom.height = function() {
      return G.DomUtil.getHeight(dom);
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
    dom.attr = function(attrName) {
      return dom.getAttribute(attrName);
    };
    dom.css(css);
    return dom;
  }
});
module.exports = DomUtil;
