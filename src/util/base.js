
Math.sign = function(x) {
  x = +x;
  if (x === 0 || isNaN(x)) {
    return x;
  }
  return x > 0 ? 1 : -1;
};
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
  /**
   * traverse tree
   * @param  {object}      parent      parent
   * @param  {function}    callback    callback
   * @param  {function}    getChild    get child function
   * @param  {boolean}     runSelf     callback run self or not
   */
  traverseTree(parent, callback, getChild, runSelf = false) {
    const children = getChild(parent);
    runSelf && callback(parent, null, null);
    children && BaseUtil.each(children, (child, index) => {
      callback(child, parent, index);
      BaseUtil.traverseTree(child, callback, getChild);
    });
  },

  /**
   * turn padding into [top, right, bottom, right]
   * @param  {Number|Array} padding input padding
   * @return {array} output
   */
  toAllPadding(padding) {
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
  }
};

module.exports = BaseUtil;
