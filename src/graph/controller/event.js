const Util = require('../../util');

const EVENTS = [
  'click',
  'mousedown',
  'mouseup',
  'dblclick',
  'contextmenu',
  'mouseenter',
  'mouseout',
  'mouseover',
  'mousemove',
  'mouseleave',
  'dragstart',
  'dragend',
  'drag',
  'dragenter',
  'dragleave',
  'drop'
];

const EXTEND_EVENTS = [
  'mousewheel',
  'wheel',
  'keydown',
  'keyup'
];

function getItemRoot(shape) {
  while (shape && !shape.item) {
    shape = shape.get('parent');
  }
  return shape;
}

class Event {
  constructor(graph) {
    this.graph = graph;
    this.extendEvents = [];
    this._initEvents();
  }
  _initEvents() {
    const self = this;
    const graph = self.graph;
    const canvas = graph.get('canvas');
    const el = canvas.get('el');
    const extendEvents = self.extendEvents;
    const canvasHandler = Util.wrapBehavior(self, '_onCanvasEvents');
    Util.each(EVENTS, event => {
      canvas.on(event, canvasHandler);
      canvas.on(event, evt => {
        graph.emit(event, evt);
      });
    });
    this.canvasHandler = canvasHandler;
    Util.each(EXTEND_EVENTS, event => {
      extendEvents.push(Util.addEventListener(el, event, Util.wrapBehavior(self, '_onExtendEvents')));
    });
  }
  _onCanvasEvents(e) {
    const graph = this.graph;
    const canvas = graph.get('canvas');
    const target = e.target;
    if (target === canvas) {
      graph.emit('canvas:' + e.type, e);
      return;
    }
    const itemShape = getItemRoot(target);
    if (itemShape !== canvas) {
      const item = itemShape.item;
      e.target = item;
      graph.emit(item.getType() + ':' + e.type, e);
    }
  }
  _onExtendEvents(e) {
    this.graph.emit(e.type, e);
  }
  destroy() {
    const graph = this.graph;
    const canvasHandler = this.canvasHandler;
    const canvas = graph.get('canvas');
    Util.each(EVENTS, event => {
      canvas.off(event, canvasHandler);
    });
    Util.each(this.extendEvents, event => {
      event.remove();
    });
  }
}

module.exports = Event;
