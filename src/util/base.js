const Event = require('@antv/g/lib/event');
const BaseUtil = {
  deepMix: require('@antv/util/lib/deep-mix'),
  mix: require('@antv/util/lib/mix'),
  debounce: require('@antv/util/lib/debounce'),
  each: require('@antv/util/lib/each'),
  throttle: require('@antv/util/lib/throttle'),
  mat3: require('@antv/util/lib/matrix/mat3'),
  vec2: require('@antv/util/lib/matrix/vec2'),
  vec3: require('@antv/util/lib/matrix/vec3'),
  transform: require('@antv/util/lib/matrix/transform'),
  clone: require('@antv/util/lib/clone'),
  upperFirst: require('@antv/util/lib/string/upper-first'),
  isNil: require('@antv/util/lib/type/is-nil'),
  isArray: require('@antv/util/lib/type/is-array'),
  createDom: require('@antv/util/lib/dom/create-dom'),
  modifyCSS: require('@antv/util/lib/dom/modify-css'),
  isObject: require('@antv/util/lib/type/is-object'),
  isPlainObject: require('@antv/util/lib/type/is-plain-object'),
  isNumber: require('@antv/util/lib/type/is-number'),
  isString: require('@antv/util/lib/type/is-string'),
  uniqueId: require('@antv/util/lib/unique-id'),
  addEventListener: require('@antv/util/lib/dom/add-event-listener'),
  wrapBehavior: require('@antv/util/lib/event/wrap-behavior'),
  extend: require('@antv/util/lib/extend'),
  augment: require('@antv/util/lib/augment'),
  remove: require('@antv/util/lib/array/remove'),
  /**
   * turn padding into [top, right, bottom, right]
   * @param  {Number|Array} padding input padding
   * @return {array} output
   */
  formatPadding(padding) {
    let top = 0;
    let left = 0;
    let right = 0;
    let bottom = 0;

    if (BaseUtil.isNumber(padding) || BaseUtil.isString(padding)) {
      top = left = right = bottom = padding;
    } else if (BaseUtil.isArray(padding)) {
      top = padding[0];
      right = !BaseUtil.isNil(padding[1]) ? padding[1] : padding[0];
      bottom = !BaseUtil.isNil(padding[2]) ? padding[2] : padding[0];
      left = !BaseUtil.isNil(padding[3]) ? padding[3] : right;
    }
    return [ top, right, bottom, left ];
  },
  cloneEvent(e) {
    const event = new Event(e.type, e, true, true);
    event.clientX = e.clientX;
    event.clientY = e.clientY;
    event.x = e.x;
    event.y = e.y;
    event.target = e.target;
    event.currentTarget = e.currentTarget;
    event.item = e.item;
    return event;
  }
};

module.exports = BaseUtil;
