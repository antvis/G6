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
    const extendEvents = this.extendEvents;
    Util.each(EVENTS, event => {
      canvas.on(event, evt => {
        graph.emit(event, evt);
      });
    });
    Util.each(EXTEND_EVENTS, event => {
      extendEvents.push(Util.addEventListener(el, event, Util.wrapBehavior(self, 'onExtendEvents')));
    });
  }
  onExtendEvents(e) {
    this.graph.emit(e.type, e);
  }
  destroy() {
    const graph = this.graph;
    const canvas = graph.get('canvas');
    canvas.removeEvent();
    Util.each(this.extendEvents, event => {
      event.remove();
    });
  }
}

module.exports = Event;
