/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */
require('./extend/g/group');
require('./extend/g/shape');
require('./extend/g/dom');

const Util = require('./util/');

class Graph {
  /**
   * Access to the default configuration properties
   * @return {object} default configuration
   */
  getDefaultCfg() {
    return {
      /**
       * Container could be dom object or dom id
       * @type {object|string|undefined}
       */
      container: undefined,

      /**
       * Canvas width
       * @type {number|undefined}
       * unit pixel if undefined force fit width
       */
      width: undefined,

      /**
       * Canvas height
       * @type {number|undefined}
       * unit pixel if undefined force fit height
       */
      height: undefined,

      /**
       * default node shape
       * @type {string|undefined}
       */
      nodeDefaultShape: undefined,

      /**
       * default edge shape
       * @type {string|undefined}
       */
      edgeDefaultShape: undefined,

      /**
       * default group shape
       * @type {string|undefined}
       */
      groupDefaultShape: undefined,

      /**
       * default edge node intersect box
       * @type {string}
       */
      defaultIntersectBox: 'circle',

      /**
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',

      _type: 'graph',
      _data: {},
      _delayRunObj: {}
    };
  }

  constructor(inputCfg) {
    const cfg = Util.mix({}, this.getDefaultCfg(), inputCfg);
    this._init(cfg);
  }
  _init() {}

  /**
   * @return  {domobject} graphcontainer
   */
  getGraphContainer() {
    return this;
  }
  _drawInner() {}
  _clearInner() {}
  /**
   * @param  {string} type item type
   * @param  {object} model data model
   * @return {object} shapeObj
   */
  getShapeObj(type, model) {
    return { type, model };
  }
  /**
   * @return {object} source data
   */
  getSource() {
    return this.get('_sourceData');
  }
  /**
   * @param  {object} data source data
   * @return {object} plain data
   */
  parseSource(data) {
    return data;
  }
  /**
   * @return {G.Canvas} canvas
   */
  getCanvas() {
    return this.get('_canvas');
  }
  /**
   * @return {G.Group} rootGroup
   */
  getRootGroup() {
    return this;
  }
  /**
   * @return {G.Group} itemGroup
   */
  getItemGroup() {
    return this;
  }
  /**
   * @param  {object} data source data
   * @return {Graph} this
   */
  source(data) {
    return data;
  }
  /**
   * @return {Graph} this
   */
  render() {
    return this;
  }
  /**
   * @return {Graph} - this
   */
  reRender() {
    const data = this.get('_sourceData');
    this.read(data);
    return this;
  }
  /**
   * set canvas captrue
   * @param  {boolean} bool boolean
   */
  setCapture(bool) {
    const rootGroup = this.get('_rootGroup');
    rootGroup.set('capture', bool);
  }
  /**
   * @return {Graph} - this
   */
  destroy() {
    return this;
  }
  /**
   * @return {object} data
   */
  save() {
    return this;
  }
  /**
   * @param {string} type item type
   * @param {object} model data model
   * @return {Graph} this
   */
  add(type, model) {
    return { type, model };
  }
  /**
   * @param {string|Item} item - target item
   * @return {Graph} this
   */
  remove(item) {
    return item;
  }
  /**
   * @param {string|Item|undefined} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  update(item, model) {
    return { item, model };
  }
  /**
   * change data
   * @param {object} data - source data
   * @return {Graph} this
   */
  read(data) {
    return data;
  }
  /**
   * @return {Graph} this
   */
  clear() {
    return this;
  }
  /**
   * @return {Graph} this
   */
  getWidth() {
    return this.get('width');
  }
  /**
   * @return {Graph} this
   */
  getHeight() {
    return this.get('height');
  }
  /**
   * change canvas size
   * @param  {number} width  input width
   * @param  {number} height input height
   * @return {object} this
   */
  changeSize(width, height) {
    return { width, height };
  }
}

module.exports = Graph;
