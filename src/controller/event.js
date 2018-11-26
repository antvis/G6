/**
 * @fileOverview dom event handler
 * @author wuyue.lwy <wyueliu@gmail.com>
 */

const Base = require('./base');
const Util = require('../util/');
const EVENT = {
  MOUSEMOVE: 'mousemove',
  MOUSEDOWN: 'mousedown',
  MOUSEUP: 'mouseup',
  MOUSEENTER: 'mouseenter',
  MOUSELEAVE: 'mouseleave',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGSTART: 'dragstart',
  DRAG: 'drag',
  DRAGENTER: 'dragenter',
  DRAGLEAVE: 'dragleave',
  DRAGEND: 'dragend',
  DROP: 'drop',
  CONTEXTMENU: 'contextmenu',
  WHEEL: 'wheel',
  KEYDOWN: 'keydown',
  KEYUP: 'keyup',
  KEYPRESS: 'keypress',
  MOUSEWHEEL: 'mousewheel' // Compatible with MOUSEWHEEL
};
const SHAKE_TOLERANCE = 9; // use to tolerate click shake prevent drag shake. The distance is tolerance sqrt.

// native dom events list:
const MouseEventTypes = [ EVENT.DBLCLICK, EVENT.MOUSEDOWN, EVENT.MOUSEUP, EVENT.MOUSEENTER, EVENT.MOUSELEAVE, EVENT.MOUSEMOVE,
  EVENT.CONTEXTMENU, EVENT.WHEEL, EVENT.MOUSEWHEEL ];
const KeyboardEventTypes = [ EVENT.KEYDOWN, EVENT.KEYUP, EVENT.KEYPRESS ];
const CANVAS = 'canvas:';
function parentNodeHasTag(n, t) {
  let p = n.parentNode;
  while (p) {
    if (p.tagName === t) {
      return true;
    }
    p = p.parentNode;
  }
  return false;
}
class Controller extends Base {
  constructor(cfg) {
    super(cfg);
    this._domEvents = [];
    this._initEventStates();
    this._registerEvents();
  }
  // init evnet states
  _initEventStates() {
    this._pressing = false;
    this._dragging = false;
    this._currentEventObj = {};
    this._dragEventObj = {};
  }
  // register all native dom events
  _registerEvents() {
    this._registerMouseEvents();
    this._registerKeyboardEvents();
  }
  _registerKeyboardEvents() {
    const graph = this.graph;
    const el = graph.getKeyboardEventWrapper();
    const _events = this._domEvents;
    const keyboardEnable = graph.get('keyboardEnable');

    Util.each(KeyboardEventTypes, item => {
      _events.push(Util.addEventListener(el, item, ev => {
        let enable = true;
        if (Util.isFunction(keyboardEnable)) {
          enable = keyboardEnable();
        }
        enable && graph.emit(item, {
          domEvent: ev
        });
      }));
    });
  }
  _registerMouseEvents() {
    const graph = this.graph;
    const self = this;
    const el = graph.getMouseEventWrapper();
    const _events = this._domEvents;
    Util.each(MouseEventTypes, item => {
      _events.push(Util.addEventListener(el, item, ev => {
        // Compatible with SVG
        if (ev.type === EVENT.MOUSEENTER) {
          if (ev.fromElement) {
            if (!ev.fromElement.parentNode || parentNodeHasTag(ev.fromElement, 'foreignObject')) {
              return;
            }
          }
        }
        const oldEventObj = this._currentEventObj;
        this._oldEventObj = oldEventObj;
        this._processEventObj(ev);
        const currentEventObj = this._currentEventObj;

        // emit simulate events like click, dragstart, dragend, drop, dtagover,  mouseenter, mouseleave
        self._simulateEvents(ev, oldEventObj, currentEventObj);

        // emit normal events
        if ([ EVENT.MOUSELEAVE, EVENT.MOUSEENTER ].indexOf(ev.type) !== -1) {
          self._triggerEvent(CANVAS + ev.type);
        }
        self._triggerEvent(ev.type);

        if (ev.type === EVENT.MOUSELEAVE) {
          // trigger canvas dragleave when out of canvas , user can clear things that record by themselves
          if (this._dragging) {
            self._triggerEvent(EVENT.DRAGLEAVE, Util.mix({}, currentEventObj, { item: null, shape: null, currentItem: this._dragEventObj.item, currentShape: this._dragEventObj.shape }));
          }
          self._initEventStates();
        }
      }));
    });
  }
  // delete listeners
  destroy() {
    const events = this._domEvents;
    Util.each(events, ev => {
      ev && ev.remove();
    });
    this._domEvents = null;
  }
  /**
    * trigger event
    * @param {string} type  - event type
    * @param {object} eventObj - event object
    */
  _triggerEvent(type, eventObj) {
    if (!eventObj) {
      if (type === 'mouseleave') {
        eventObj = this._oldEventObj;
      } else {
        eventObj = this._currentEventObj;
      }
    }
    if (type === 'mousedown') {
      eventObj.button = this._button;
    }
    // emit shape event
    eventObj._type = type;
    this.emitGraphEvent(type, eventObj);
    if ([ CANVAS + EVENT.MOUSELEAVE, CANVAS + EVENT.MOUSEENTER ].indexOf(type) !== -1) {
      return;
    }
    let eventPreFix = eventObj.shape && eventObj.shape.eventPreFix;

    if ([ EVENT.DRAGSTART, EVENT.DRAG, EVENT.DRAGEND ].indexOf(type) !== -1) {
      // get correct prefix
      eventPreFix = eventObj.currentShape && eventObj.currentShape.eventPreFix;
    }

    if (eventPreFix) {
      const _type = eventPreFix + ':' + type;
      eventObj._type = _type;
      if (Util.isBoolean(eventObj._isItemChange)) {
        if (eventObj._isItemChange) {
          this.emitGraphEvent(_type, eventObj);
        }
      } else {
        this.emitGraphEvent(_type, eventObj);
      }
    }
  }
  /**
    * emit graph event
    * @param {object} type - event type
    * @param {object} eventObj - event object
    */
  emitGraphEvent(type, eventObj) {
    const graph = this.graph;
    graph.emit(type, eventObj);
  }
  _getDistanceToPress(ev) {
    return Math.pow(ev.clientX - this._pressX, 2) + Math.pow(ev.clientY - this._pressY, 2);
  }
  /**
    * check whether or not  click  and drag
    * @param {object} ev - native dom event
    * @param {object} oldEventObj - old event object
    * @param {object} currentEventObj - current event object
    */
  _simulateEvents(ev, oldEventObj = {}, currentEventObj = {}) {
    let currentItem = this._dragEventObj.item;
    let currentShape = this._dragEventObj.shape;
    switch (ev.type) {
      case EVENT.MOUSEDOWN:
        this._pressing = true;
        this._button = ev.button;
        this._pressX = ev.clientX;
        this._pressY = ev.clientY;
        break;
      case EVENT.MOUSEMOVE:
        // record the element that was dragging
        if (this._dragging) {
          this._triggerEvent(EVENT.DRAG, Util.mix({}, currentEventObj, { button: this._button, currentItem, currentShape }));
          if (oldEventObj.shape !== currentEventObj.shape) {
            const _isItemChange = this._isItemChange(oldEventObj, currentEventObj);
            if (oldEventObj.shape) {
              this._triggerEvent(EVENT.DRAGLEAVE, Util.mix({}, currentEventObj, { button: this._button, item: oldEventObj.item, shape: oldEventObj.shape,
                toItem: currentEventObj.item, toShape: currentEventObj.shape, currentItem, currentShape, _isItemChange }));
            }
            if (currentEventObj.shape) {
              this._triggerEvent(EVENT.DRAGENTER, Util.mix({}, currentEventObj, { button: this._button, currentItem, currentShape, fromItem: oldEventObj.item,
                fromShape: oldEventObj.shape, _isItemChange }));
            }
          }
        } else if (this._pressing &&
          this._getDistanceToPress(ev) > SHAKE_TOLERANCE) {

          this._dragging = true;
          this._dragEventObj = oldEventObj;
          currentItem = this._dragEventObj.item;
          currentShape = this._dragEventObj.shape;
          this._triggerEvent(EVENT.DRAGSTART, Util.mix({}, oldEventObj, { button: this._button, currentItem, currentShape }));
        }
        // normal move
        if (oldEventObj.shape !== currentEventObj.shape) {
          const _isItemChange = this._isItemChange(oldEventObj, currentEventObj);

          if (oldEventObj.shape) {
            // just canvas has no shape, it should not trigger leave
            this._triggerEvent(EVENT.MOUSELEAVE, Util.mix({}, currentEventObj, { item: oldEventObj.item, shape: oldEventObj.shape,
              toItem: currentEventObj.item, toShape: currentEventObj.shape, _isItemChange }));
          }
          if (currentEventObj.shape) {
            // canvas should not trigger enter
            this._triggerEvent(EVENT.MOUSEENTER, Util.mix({}, currentEventObj, { fromtItem: oldEventObj.item, fromShape: oldEventObj.shape, _isItemChange }));
          }
        }
        break;
      case EVENT.MOUSEUP:
        if (!this._dragging && this._pressing) {
          this._triggerEvent(EVENT.CLICK, Util.mix({}, currentEventObj, { button: this._button }));
        } else {
          this._triggerEvent(EVENT.DROP, Util.mix({}, currentEventObj, { button: this._button, currentItem, currentShape }));
          this._triggerEvent(EVENT.DRAGEND, Util.mix({}, currentEventObj, { button: this._button, currentItem, currentShape }));
        }
        this._pressing = false;
        this._dragging = false;
        this._dragEventObj = {};
        break;
      default:
        return;
    }
  }
  /**
   * checkout item is change
   * @param {object} oldEventObj - old event obj
   * @param {object} currentEventObj - current event obj
   * @return {boolean} rst
   */
  _isItemChange(oldEventObj, currentEventObj) {
    const oldShape = oldEventObj.shape;
    const currentShape = currentEventObj.shape;
    const shapeIsItemChange = oldShape && currentShape && (oldShape.get('isItemChange') || currentShape.get('isItemChange'));

    if (shapeIsItemChange) {
      return shapeIsItemChange(currentShape, oldShape);
    }
    if (Util.isObject(oldEventObj.item) && Util.isObject(currentEventObj.item)) {
      return oldEventObj.item.id !== currentEventObj.item.id;
    }
    return oldEventObj.item !== currentEventObj.item;
  }
  /**
   * handle the native event by browser
   * @param {object} ev - native event by browser
   */
  _processEventObj(ev) {
    const graph = this.graph;
    const canvas = graph.get('_canvas');
    const evObj = this._getEventObj(ev, canvas);

    this._currentEventObj = evObj;
  }
  // transform point position by pixel Ratio
  _parsePoint(x, y) {
    const graph = this.graph;
    return graph.getPointByCanvas({
      x,
      y
    });
  }
  /**
    * get the source object which emitted event
    * @param {object} ev  -native event by browser
    * @param {object} canvas -the scene that event occurred
    * @return {object} - event object
    */
  _getEventObj(ev, canvas) {
    const graph = this.graph;
    const clientX = ev.clientX;
    const clientY = ev.clientY;
    const canvasPoint = canvas.getPointByClient(clientX, clientY);
    const point = this._parsePoint(canvasPoint.x, canvasPoint.y);
    const shape = canvas.getShape(canvasPoint.x, canvasPoint.y, ev);
    const item = graph.getItemByShape(shape);
    const pixelRatio = canvas.get('pixelRatio');
    return {
      item,
      shape,
      x: point.x,
      y: point.y,
      domX: canvasPoint.x / pixelRatio,
      domY: canvasPoint.y / pixelRatio,
      domEvent: ev
    };
  }
}
module.exports = Controller;
