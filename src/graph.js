/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */
require('./extend/g/group');
require('./extend/g/shape');
require('./extend/g/dom');

const Base = require('./base');
const Item = require('./item/');
const Shape = require('./shape/');
const Util = require('./util/');
const Graph2Canvas = require('./helper/graph2canvas');
const G = require('@antv/g/lib');
const LayoutMixin = require('./mixin/layout');
const MappingMixin = require('./mixin/mapping');
const QueryMixin = require('./mixin/query');
const EventMixin = require('./mixin/event');
const ModeMixin = require('./mixin/mode');
const FilterMixin = require('./mixin/filter');
const AnimateMixin = require('./mixin/animate');
const DrawMixin = require('./mixin/draw');
const FitView = require('./mixin/fit-view');
const ForceFit = require('./mixin/force-fit');
const Mixins = [ FilterMixin, MappingMixin, QueryMixin, LayoutMixin, AnimateMixin, DrawMixin, ForceFit, FitView, EventMixin, ModeMixin ];
const TAB_INDEX = 20;

class Graph extends Base {
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
       * Plugins
       * @type {array}
       */
      plugins: [],

      /**
       * FontFamily
       * @type {string}
       */
      fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"',

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
      _controllers: {},
      _timers: {},
      _dataMap: {},
      _itemMap: {},
      _freezMap: {},
      _data: {},
      _delayRunObj: {}
    };
  }

  constructor(inputCfg) {
    const cfg = {};

    Mixins.forEach(Mixin => {
      Util.mix(cfg, Util.clone(Mixin.CFG), inputCfg);
    });
    super(cfg);
    // plugin should init before all
    this._pluginInit();
    this.emit('beforeinit');
    this._init();
    this.emit('afterinit');
  }
  _init() {
    this._initData();
    this._initContainer();
    this._initCanvas();
    Mixins.forEach(Mixin => {
      Mixin.INIT && this[Mixin.INIT]();
    });
    this.initEvent();
  }
  initEvent() {

  }
  _executeLayout(processor, nodes, edges, groups) {
    if (Util.isFunction(processor)) {
      processor(nodes, edges, this);
    } else if (Util.isObject(processor)) {
      processor.nodes = nodes;
      processor.edges = edges;
      processor.groups = groups;
      processor.graph = this;
      processor.execute();
    }
  }
  _pluginInit() {
    const plugins = this.get('plugins');
    plugins.forEach(plugin => {
      this._initPlugin(plugin);
    });
  }
  _initPlugin(plugin) {
    plugin.graph = this;
    plugin.init && plugin.init();
  }
  _getTimer(name) {
    return this.get('_timers')[name];
  }
  _setTimer(name, value) {
    this.get('_timers')[name] = value;
  }
  _getController(name) {
    return this.get('_controllers')[name];
  }
  _initContainer() {
    let container = this.get('container');
    if (!container) {
      // Compatible with id written
      container = this.get('id');
    }
    container = Util.initDOMContainer(container, 'graph');
    const graphContainer = Util.createDOM('<div class="graph-container"></div>', {
      position: 'relative'
    });
    container.appendChild(graphContainer);
    this.set('_containerDOM', container);
    this.set('_graphContainer', graphContainer);
  }
  _initCanvas() {
    const graphContainer = this.get('_graphContainer');
    const width = this.get('width');
    const height = this.get('height');
    const fontFamily = this.get('fontFamily');
    const renderer = this.get('renderer');
    const canvasCfg = {
      width,
      height,
      fontFamily,
      renderer,
      eventEnable: false,
      containerDOM: graphContainer
    };
    if (renderer === 'svg') {
      canvasCfg.pixelRatio = 1;
    }
    const Canvas = G.Canvas;
    const canvas = new Canvas(canvasCfg);
    const el = canvas.get('el');
    el.style.top = 0;
    el.style.left = 0;
    el.style.overflow = 'hidden';

    this.set('_canvas', canvas);
    const mouseEventWrapper = this.getMouseEventWrapper();
    mouseEventWrapper.style.outline = 'none';
    mouseEventWrapper.style['user-select'] = 'none';
    mouseEventWrapper.setAttribute('tabindex', TAB_INDEX);

    const rootGroup = canvas.addGroup();

    const itemGroup = rootGroup.addGroup();
    this.set('_itemGroup', itemGroup);
    this.set('_rootGroup', rootGroup);
  }
  _initData() {
    this.set('_dataMap', {});
    this.set('_itemMap', {
      _nodes: [],
      _edges: [],
      _groups: [],
      _guides: []
    });
    this.set('_data', {});
  }
  _refresh() {

  }
  getKeyboardEventWrapper() {
    const keyboardEventWrapper = this.get('keyboardEventWrapper');
    return keyboardEventWrapper ? keyboardEventWrapper : this.getMouseEventWrapper();
  }
  getMouseEventWrapper() {
    return this.get('_canvas').get('el');
  }
  /**
   * @param  {object} plugin - plugin instance
   */
  addPlugin(plugin) {
    const plugins = this.get('plugins');
    this._initPlugin(plugin);
    plugins.push(plugin);
  }
  /**
   * @return  {domobject} graphcontainer
   */
  getGraphContainer() {
    return this.get('_graphContainer');
  }
  // sort group
  _sortGroup(models) {
    const dataMap = this.get('_dataMap');
    const hierarchyCache = {};
    models.forEach(({ id, parent }) => {
      hierarchyCache[id] = 1;
      while (parent && dataMap[parent]) {
        hierarchyCache[id]++;
        parent = dataMap[parent].parent;
      }
    });
    models.sort((a, b) => {
      return hierarchyCache[b.id] - hierarchyCache[a.id];
    });
  }
  /**
   * @param  {string} type item type
   * @param  {array} models models
   */
  _addItems(type, models) {
    this._addDatas(type, models);
    if (type === 'group') this._sortGroup(models);
    const Type = Util.upperFirst(type);
    const Constructor = Item[Type];
    const itemMap = this.get('_itemMap');
    const itemGroup = this.get('_itemGroup');
    const dataMap = this.get('_dataMap');
    const animate = this.get('animate');
    const defaultIntersectBox = this.get('defaultIntersectBox');

    if (!Constructor) {
      throw new Error('please set valid item type!');
    }
    models.forEach(model => {
      const item = new Constructor({
        id: model.id,
        type,
        model,
        group: itemGroup.addGroup(),
        graph: this,
        mapper: this._getController(type + 'Mapper'),
        itemMap,
        animate,
        dataMap,
        defaultIntersectBox
      });
      itemMap[model.id] = item;
      itemMap['_' + type + 's'].push(item);
    });
  }
  /**
   * @param  {array} items remove items
   */
  _removeItems(items) {
    const dataMap = this.get('_dataMap');
    const itemMap = this.get('_itemMap');
    items.forEach(item => {
      delete dataMap[item.id];
      delete itemMap[item.id];
      Util.Array.remove(itemMap['_' + item.type + 's'], item);
      item.destroy();
    });
  }
  /**
   * @param  {array} items - items
   * @param  {array} models - update models
   */
  _updateItems(items, models) {
    items.forEach((item, index) => {
      const model = models[index];
      model && Util.mix(item.getModel(), model);
      // if (model) {

      //   // if update edge source or target re cache edges.
      //   if (item.isEdge && model && (model.target || model.source)) {
      //     item.cacheEdges();
      //   }
      // }
      item.update();
    });
  }
  _getShowEdge(edge) {
    const source = edge.getSource();
    const target = edge.getTarget();
    return (source.linkable && source.isVisible() || !source.linkable)
    && (target.linkable && target.isVisible() || !target.linkable)
    && edge;
  }
  _addDatas(type, models) {
    const dataMap = this.get('_dataMap');
    models.forEach(model => {
      if (Util.isNil(model.id)) {
        model.id = Util.guid();
      }
      if (dataMap[model.id]) {
        throw new Error('id:' + model.id + ' has already been set, please set new one');
      }
      dataMap[model.id] = model;
    });
  }
  _drawInner() {
    const data = this.get('_data');
    const itemGroup = this.get('_itemGroup');
    const dataMap = this.get('_dataMap');
    const itemMap = this.get('_itemMap');

    if (data.nodes) {
      this._addItems('node', data.nodes);
    }
    if (data.groups) {
      this._addItems('group', data.groups);
    }
    if (data.edges) {
      this._addItems('edge', data.edges);
    }
    if (data.guides) {
      this._addItems('guide', data.guides);
    }
    itemGroup.sortBy(child => {
      const id = child.id;
      const item = itemMap[id];
      const model = dataMap[id];
      if (model && !Util.isNil(model.index)) {
        return model.index;
      }
      if (item && !item.destroyed && !Util.isNil(item.zIndex)) {
        return item.zIndex;
      }
    });
  }
  _clearInner() {
    const items = this.getItems();
    items.forEach(item => {
      item && item.destroy();
    });
  }
  /**
   * @param  {function} callback - callback
   * @return {Graph} this
   */
  preventAnimate(callback) {
    this.set('_forcePreventAnimate', true);
    callback();
    this.set('_forcePreventAnimate', false);
    return this;
  }
  /**
   * @param  {string} type item type
   * @param  {object} model data model
   * @return {object} shapeObj
   */
  getShapeObj(type, model) {
    if (!Util.isObject(type)) {
      const Type = Util.upperFirst(type);
      const shapeManager = Shape[Type];
      const defaultShape = this.get(type + 'DefaultShape');
      return shapeManager.getShape(model.shape, defaultShape);
    }
    return type.getShapeObj();
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
    return this.get('_rootGroup');
  }
  /**
   * @return {G.Group} itemGroup
   */
  getItemGroup() {
    return this.get('_itemGroup');
  }
  /**
   * @param  {object} data source data
   * @return {Graph} this
   */
  source(data) {
    this.emit('beforesource');
    this.set('_data', data);
    this.set('_sourceData', data);
    this.emit('aftersource');
    return this;
  }
  /**
   * @return {Graph} this
   */
  render() {
    this.emit('beforerender');
    this.emit('beforedrawinner');
    this._drawInner();
    this.emit('afterdrawinner');
    this.emit('afterrender');
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
    this.emit('beforedestroy');
    const canvas = this.get('_canvas');
    const graphContainer = this.get('_graphContainer');
    const controllers = this.get('_controllers');
    const timers = this.get('_timers');
    const windowForceResizeEvent = this.get('_windowForceResizeEvent');
    const plugins = this.get('plugins');
    Util.each(timers, timer => {
      clearTimeout(timer);
    });
    Util.each(controllers, controller => {
      controller.destroy();
    });
    plugins.forEach(plugin => {
      plugin.destroy && plugin.destroy();
    });
    canvas && canvas.destroy();
    graphContainer.destroy();
    window.removeEventListener('resize', windowForceResizeEvent);
    this.emit('afterdestroy');
    super.destroy();
    return this;
  }
  /**
   * @return {object} data
   */
  save() {
    const itemGroup = this.get('_itemGroup');
    const children = itemGroup.get('children');
    const rst = {
      nodes: [],
      edges: [],
      groups: [],
      guides: []
    };
    children.forEach((child, index) => {
      const model = child.model;
      if (model) {
        const type = child.itemType;
        const saveModel = Util.clone(model);
        saveModel.index = index;
        rst[type + 's'].push(saveModel);
      }
    });
    rst.nodes.length === 0 && delete rst.nodes;
    rst.edges.length === 0 && delete rst.edges;
    rst.groups.length === 0 && delete rst.groups;
    rst.guides.length === 0 && delete rst.guides;
    return rst;
  }
  /**
   * @param {string} type item type
   * @param {object} model data model
   * @return {Graph} this
   */
  add(type, model) {
    const affectedItemIds = [];
    const ev = {
      action: 'add',
      model,
      affectedItemIds
    };
    this.emit('beforechange', ev);
    const itemMap = this.get('_itemMap');
    this._addItems(type, [ model ]);
    const item = itemMap[model.id];
    item.getAllParents().forEach(parent => {
      parent.update();
    });
    ev.item = item;
    affectedItemIds.push(model.id);
    this.emit('afterchange', ev);
    return item;
  }
  /**
   * @param {string|Item} item - target item
   * @return {Graph} this
   */
  remove(item) {
    item = this.getItem(item);
    if (!item || item.destroyed) {
      return;
    }
    let removeItemCache = [];
    const affectedItemIds = [];
    const ev = {
      action: 'remove',
      item,
      affectedItemIds
    };
    if (item.isNode) {
      const edges = item.getEdges();
      removeItemCache = removeItemCache.concat(edges);
    }
    if (item.isGroup) {
      const edges = item.getEdges();
      const children = item.getAllChildren();
      const crossEdges = item.getCrossEdges();
      const innerEdges = item.getInnerEdges();
      removeItemCache = removeItemCache.concat(edges, children, crossEdges, innerEdges);
      removeItemCache = Util.uniq(removeItemCache);
    }
    removeItemCache.push(item);
    const allParents = item.getAllParents();
    allParents.forEach(parent => {
      affectedItemIds.push(parent.id);
    });
    removeItemCache.forEach(removeItem => {
      affectedItemIds.push(removeItem.id);
    });
    this.emit('beforechange', ev);
    this._removeItems(removeItemCache);
    allParents.forEach(parent => {
      parent.update();
    });
    this.emit('afterchange', ev);
    return this;
  }
  /**
   * @param {string|Item} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  simpleUpdate(item, model) {
    this._updateItems([ item ], [ model ]);
    this.draw();
    return this;
  }
  /**
   * @param {string|Item|undefined} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  update(item, model) {
    const itemMap = this.get('_itemMap');
    item = this.getItem(item);
    if (!item || item.destroyed || !model) {
      return;
    }
    const animate = this.get('animate');
    const updateItemCache = [];
    const updateModelCache = [];
    const affectedItemIds = [];
    const itemModel = item.getModel();
    const originModel = Util.mix({
    }, itemModel);
    const ev = {
      action: 'update',
      item,
      originModel,
      updateModel: model,
      affectedItemIds
    };
    const originParent = itemMap[originModel.parent];
    updateItemCache.push(item);
    updateModelCache.push(model);
    affectedItemIds.push(item.id);

    // If originParent exist update orign parent
    if (originParent && (originParent !== parent) && Util.isGroup(originParent)) {
      item.getAllParents().forEach(parent => {
        updateItemCache.push(parent);
        updateModelCache.push(null);
        affectedItemIds.push(parent.id);
      });
    }

    // If the update group, update all the group
    if (model.parent) {
      const updateParent = itemMap[model.parent];
      if (!updateParent) {
        throw new Error('there is no ' + model.parent + ' exist, please add a new one!');
      }
      updateItemCache.push(updateParent);
      updateModelCache.push(null);
      affectedItemIds.push(updateParent.id);
      updateParent.getAllParents().forEach(parent => {
        updateItemCache.push(parent);
        updateModelCache.push(null);
        affectedItemIds.push(parent.id);
      });
    }

    // If the update nodes or group, update the connection edge
    if ((item.isNode || item.isGroup)) {
      const edges = item.getEdges();
      edges.forEach(edge => {
        updateItemCache.push(edge);
        updateModelCache.push(null);
        affectedItemIds.push(edge.id);
      });
    }

    // If group children collapse && expend animate
    if (item.isGroup && !Util.isNil(model.collapsed)) {
      if (animate) {
        item.deepEach(subItem => {
          affectedItemIds.push(subItem.id);
        });
      }
      item.getCrossEdges().forEach(edge => {
        updateItemCache.push(edge);
        updateModelCache.push(null);
        affectedItemIds.push(edge.id);
      });
    }
    this.emit('beforechange', ev);
    this._updateItems(updateItemCache, updateModelCache);
    this.emit('afterchange', ev);
    return this;
  }
  /**
   * change data
   * @param {object} data - source data
   * @return {Graph} this
   */
  read(data) {
    if (!data) {
      throw new Error('please read valid data!');
    }
    const ev = {
      action: 'changeData',
      data
    };
    this.emit('beforechange', ev);
    this.preventAnimate(() => {
      this.clear();
      this.source(data);
      this.render();
    });
    this.emit('afterchange', ev);
    return this;
  }
  /**
   * @return {Graph} this
   */
  clear() {
    this.emit('beforeclear');
    this._clearInner();
    this._initData();
    this.emit('afterclear');
    return this;
  }
  /**
   * hide item
   * @param  {number} item  input item
   * @return {object} this
   */
  hide(item) {
    item = this.getItem(item);
    let hideItemCache = [];
    const affectedItemIds = [];
    const ev = {
      item,
      affectedItemIds
    };
    hideItemCache.push(item);
    if (item.isNode) {
      item.getEdges().forEach(edge => {
        hideItemCache.push(edge);
      });
    }
    if (item.isGroup) {
      item.getEdges().forEach(edge => {
        hideItemCache.push(edge);
      });
      item.deepEach(child => {
        hideItemCache.push(child);
      });
    }
    hideItemCache = Util.uniq(hideItemCache);
    hideItemCache.forEach(item => {
      affectedItemIds.push(item.id);
    });
    this.emit('beforehide', ev);
    hideItemCache.forEach(item => {
      item.hide();
    });
    this.emit('afterhide', ev);
    return this;
  }
  /**
   * show item
   * @param  {number} item  input item
   * @return {object} this
   */
  show(item) {
    item = this.getItem(item);
    let showItemCache = [];
    const affectedItemIds = [];
    const ev = {
      item,
      affectedItemIds
    };
    item.visible = true;
    if (item.isEdge) {
      const edge = this._getShowEdge(item);
      if (edge) showItemCache.push(edge);
    } else {
      showItemCache.push(item);
    }
    if (item.isNode) {
      item.getEdges().forEach(edge => {
        edge = this._getShowEdge(edge);
        if (edge) showItemCache.push(edge);
      });
    }
    if (item.isGroup) {
      item.getEdges().forEach(edge => {
        edge = this._getShowEdge(edge);
        if (edge) showItemCache.push(edge);
      });
      item.deepEach(child => {
        showItemCache.push(child);
      });
    }
    showItemCache = Util.uniq(showItemCache);
    showItemCache.forEach(item => {
      affectedItemIds.push(item.id);
    });
    this.emit('beforeshow', ev);
    showItemCache.forEach(item => {
      item.show();
    });
    this.emit('aftershow', ev);
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
    if (Math.abs(width) >= Infinity || Math.abs(height) >= Infinity) {
      console.warn('size parameter more than the maximum');
      return;
    }
    const canvas = this.get('_canvas');
    if (width !== this.get('width') || height !== this.get('height')) {
      this.emit('beforechangesize');
      canvas.changeSize(width, height);

      this.set('width', width);
      this.set('height', height);
      this.emit('afterchangesize');
      this.draw();
    }
    return this;
  }
  /**
   * item to front
   * @param  {object} item  item
   */
  toFront(item) {
    item = this.getItem(item);
    const itemGroup = this.get('_itemGroup');
    const group = item.getGraphicGroup();
    Util.toFront(group, itemGroup);
    this.draw();
  }
  /**
   * item to back
   * @param  {object} item  item
   */
  toBack(item) {
    item = this.getItem(item);
    const itemGroup = this.get('_itemGroup');
    const group = item.getGraphicGroup();
    Util.toBack(group, itemGroup);
    this.draw();
  }
  /**
   * set cantainer css
   * @param  {object} style container dom css
   */
  css(style) {
    const graphContainer = this.getGraphContainer();
    Util.modifyCSS(graphContainer, style);
  }
  /**
   * save graph image
   * @param {object} options - save options
   * @return  {object} canvas dom
   */
  saveImage(options) {
    const box = this.getBBox();
    const padding = this.getFitViewPadding();
    const graph2Canvas = new Graph2Canvas({
      graph: this,
      width: box.width + padding[1] + padding[3],
      height: box.height + padding[0] + padding[2],
      ...options
    });
    return graph2Canvas.toCanvas();
  }
}
Mixins.forEach(Mixin => {
  Util.mix(Graph.prototype, Mixin.AUGMENT);
});
module.exports = Graph;
