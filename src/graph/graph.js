/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */

const EventEmitter = require('@antv/g/lib/').EventEmitter;
// const Util = require('./util/');

class Graph extends EventEmitter {
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
       * renderer canvas or svg
       * @type {string}
       */
      renderer: 'canvas',
      /**
       * control graph behaviors
       * @type Array
       */
      mode: [],
      /**
       * all the node instances
       * @type Array
       */
      nodes: [],
      /**
       * all the eadge instances
       * @type Array
       */
      edges: [],
      /**
       * nodes instances indexed by id
       * @type object
       */
      nodesById: {},
      /**
       * ed instances indexed by id
       * @type object
       */
      edgesById: {}
    };
  }

  constructor(inputCfg) {
    super(inputCfg);
    this._init();
  }
  _init() {
    // all the node instances
    this.nodes = [];
    // all the edge instances
    this.edges = [];
    // node instances indexed by id
    this._nodesById = {};
    // edge instances indexed by id
    this._edgesById = {};
  }

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
