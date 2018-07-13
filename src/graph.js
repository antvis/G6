/**
 * @fileOverview graph
 * @author huangtonger@aliyun.com
 */
require('./extend/g/html');
require('./extend/g/canvas');
require('./extend/g/group');
require('./extend/g/shape');
require('./extend/g/html');
const Base = require('./base');
const Item = require('./item/');
const Shape = require('./shape/');
const Util = require('./util/');
const G = require('@antv/g');
// const G = require('./renderer2d');
const CanvasRootGroup = require('./extend/g/canvas-root-group');
const SvgRootGroup = require('./extend/g/svg-root-group');
const LayoutMixin = require('./mixin/layout');
const MappingMixin = require('./mixin/mapping');
const QueryMixin = require('./mixin/query');
const EventMixin = require('./mixin/event');
const ModeMixin = require('./mixin/mode');
const FilterMixin = require('./mixin/filter');
const AnimateMixin = require('./mixin/animate');
const FitView = require('./mixin/fit-view');
const ForceFit = require('./mixin/force-fit');
const Canvas = G.canvas.Canvas;
const SVG = G.svg.Canvas;
const Mixins = [ FilterMixin, MappingMixin, QueryMixin, AnimateMixin, ForceFit, LayoutMixin, FitView, EventMixin, ModeMixin ];
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
       * Modes list
       * @type {object}
       */
      modes: {},

      /**
       * Current mode
       * @type {string}
       */
      mode: 'default',

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
      render: 'canvas',
      _controllers: {},
      _timers: {},
      _dataMap: {},
      _itemMap: {},
      _data: {},
      _delayRunObj: {}
    };
  }

  constructor(inputCfg) {
    const cfg = {};

    Mixins.forEach(Mixin => {
      Util.mix(cfg, Mixin.CFG, inputCfg);
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
  _executeLayout(processer, nodes, edges, groups) {
    if (Util.isFunction(processer)) {
      processer(nodes, edges, this);
    } else if (Util.isObject(processer)) {
      processer.nodes = nodes;
      processer.edges = edges;
      processer.groups = groups;
      processer.graph = this;
      processer.execute();
    }
  }
  _pluginInit() {
    const plugins = this.get('plugins');
    plugins.forEach(plugin => {
      plugin.graph = this;
      plugin.init && plugin.init();
    });
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
    if (container) {
      if (Util.isString(container)) {
        container = document.getElementById(container);
      }
    } else {
      throw new Error('please set the container for the graph !');
    }
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
    const canvasCfg = {
      width,
      height,
      fontFamily,
      eventEnable: false,
      containerDOM: graphContainer
    };

    const Constructor = this.getConstructor(Canvas, SVG);
    const canvas = new Constructor(canvasCfg);
    const frontCanvas = new Constructor(canvasCfg);

    const frontEl = frontCanvas.get('el');
    const htmlElementContaniner = graphContainer.appendChild(Util.createDOM('<div class="graph-container-html-Elements"></div>'));
    canvas.on('beforedraw', () => {
      this.emit('beforecanvasdraw');
    });
    frontEl.style.position = 'absolute';
    frontEl.style.top = 0;
    frontEl.style.left = 0;
    htmlElementContaniner.style.overflow = 'hidden';
    htmlElementContaniner.style.width = width + 'px';
    htmlElementContaniner.style.height = height + 'px';
    htmlElementContaniner.style.position = 'absolute';
    htmlElementContaniner.style.top = 0;
    htmlElementContaniner.style.left = 0;

    this.set('_canvas', canvas);
    this.set('_frontCanvas', frontCanvas);
    this.set('_htmlElementContaniner', htmlElementContaniner);
    const mouseEventWrapper = this.getMouseEventWrapper();
    mouseEventWrapper.style.outline = 'none';
    mouseEventWrapper.style['user-select'] = 'none';
    mouseEventWrapper.setAttribute('tabindex', TAB_INDEX);
    canvas.set('htmlElementContaniner', htmlElementContaniner);

    const RootGroup = this.getConstructor(CanvasRootGroup, SvgRootGroup);
    const rootGroup = canvas.addGroup(RootGroup);
    const frontRootGroup = frontCanvas.addGroup(RootGroup);

    const itemGroup = rootGroup.addGroup();
    this.set('_itemGroup', itemGroup);
    this.set('_rootGroup', rootGroup);
    this.set('_frontRootGroup', frontRootGroup);
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
    return this.get('_htmlElementContaniner');
  }
  /**
   * @return  {domobject} graphcontainer
   */
  getGraphContainer() {
    return this.get('_graphContainer');
  }
  /**
   * @param  {string} type item type
   * @param  {array} models models
   */
  addItems(type, models) {
    this._addDatas(type, models);
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
  removeItems(items) {
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
   * @param  {object} item item
   * @param  {object} model update model
   */
  updateItem(item, model) {
    Util.mix(item.getModel(), model);
    item.update();
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

    if (data.nodes) {
      this.addItems('node', data.nodes);
    }
    if (data.groups) {
      this.addItems('group', data.groups);
    }
    if (data.edges) {
      this.addItems('edge', data.edges);
    }
    if (data.guides) {
      this.addItems('guide', data.guides);
    }
    itemGroup.sortBy(child => {
      const id = child.id;
      const model = dataMap[id];
      return model.index;
    });
  }
  _clearInner() {
    const items = this.getItems();
    items.forEach(item => {
      item && !item.destroyed && item.destroy();
    });
  }
  /**
   * @param  {function} CanvasCons option 1
   * @param  {function} SvgCons option 2
   * @return {function} function
   */
  getConstructor(CanvasCons, SvgCons) {
    const render = this.get('render');
    if (render === 'svg') {
      return SvgCons;
    }
    return CanvasCons;
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
   * @return {G.Group} frontRootGroup
   */
  getFrontRootGroup() {
    return this.get('_frontRootGroup');
  }
  /**
   * @return {G.Canvas} canvas
   */
  getFrontCanvas() {
    return this.get('_frontCanvas');
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
    this.draw();
    this.emit('afterrender');
    return this;
  }
  /**
   * @param  {boolean} bool if force prevent animate
   */
  forcePreventAnimate(bool) {
    this.set('forcePreventAnimate', bool);
  }
  /**
   * @return {Graph} this
   */
  reRender() {
    const data = this.get('_sourceData');
    this.read(data);
    return this;
  }
  /**
   * @return {Graph} this
   */
  destroy() {
    const canvas = this.get('_canvas');
    const frontCanvas = this.get('_frontCanvas');
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
    frontCanvas && frontCanvas.destroy();
    graphContainer.destroy();
    window.removeEventListener('resize', windowForceResizeEvent);
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
        const saveModel = Util.cloneDeep(model);
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
    const ev = {
      action: 'add',
      model
    };
    this.emit('beforechange', ev);
    const itemMap = this.get('_itemMap');
    this.addItems(type, [ model ]);
    const item = itemMap[model.id];
    item.getAllParents().forEach(parent => {
      parent.update();
    });
    ev.item = item;
    this.emit('afterchange', ev);
    this.draw();
    return item;
  }
  /**
   * @param {String|Item} item target item
   * @return {Graph} this
   */
  remove(item) {
    item = this.getItem(item);
    if (!item || item.destroyed) {
      return;
    }
    const ev = {
      action: 'remove',
      item
    };
    this.emit('beforechange', ev);
    if (item.isNode || item.isGroup) {
      const edges = item.getEdges();
      edges.forEach(edge => {
        this.remove(edge);
      });
    }
    if (item.isGroup) {
      const children = item.getChildren();
      children.forEach(child => {
        this.remove(child);
      });
    }
    this.removeItems([ item ]);
    item.getAllParents().forEach(parent => {
      parent.update();
    });
    this.emit('afterchange', ev);
    this.draw();
    return this;
  }
  /**
   * @param {String|Item} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  simpleUpdate(item, model) {
    this.updateItem(item, model);
    this.draw();
    return this;
  }
  /**
   * @param {String|Item} item target item
   * @param {object} model data model
   * @return {Graph} this
   */
  update(item, model) {
    const itemMap = this.get('_itemMap');
    item = this.getItem(item);
    if (!item || item.destroyed) {
      return;
    }
    const itemModel = item.getModel();
    const originModel = Util.mix({
    }, itemModel);
    const ev = {
      action: 'update',
      item,
      originModel,
      updateModel: model
    };
    const originParent = itemMap[originModel.parent];
    if (originParent && (originParent !== parent) && Util.isGroup(originParent)) {
      item.getAllParents().forEach(parent => {
        parent.update();
      });
    }

    model && this.emit('beforechange', ev);
    this.updateItem(item, model);

    // If the update nodes or group, update their parent
    item.getAllParents().forEach(parent => {
      parent.update();
    });

    // If the update nodes or group, update the connection edge
    if ((item.isNode || item.isGroup) && !item.collapsedParent) {
      const edges = item.getEdges();
      edges.forEach(edge => {
        edge.update();
      });
    }

    // update group relative items
    if (item.isGroup && model) {
      item.deepEach(child => {
        child.updateCollapsedParent();
        if (child.collapsedParent) {
          child.hide();
        } else {
          child.show();
        }
        child.update();
      });
      item.getInnerEdges().forEach(child => {
        const bool = child.linkedItemVisible();
        if (bool) {
          child.show();
        } else {
          child.hide();
        }
        child.update();
      });
    }
    model && this.emit('afterchange', ev);
    this.draw();
    return this;
  }
  /**
   * change data
   * @param {object} data source data
   * @return {Graph} this
   */
  read(data) {
    if (!data) {
      throw new Error('please read valid data!');
    }
    const fitView = this.get('fitView');
    const ev = {
      action: 'changeData',
      data
    };
    this.emit('beforechange', ev);
    this.clear();
    this.source(data);
    this.render();
    this.emit('afterchange', ev);
    fitView && this.setFitView(fitView);
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
    this.draw();
    return this;
  }
  /**
   * hide item
   * @param  {number} item  input item
   * @return {object} this
   */
  hide(item) {
    item = this.getItem(item);
    item.hide();
    if (item.isNode) {
      item.getEdges().forEach(edge => {
        edge.hide();
      });
    }
    if (item.isGroup) {
      item.getEdges().forEach(edge => {
        edge.hide();
      });
      item.getInnerEdges().forEach(edge => {
        edge.hide();
      });
      item.deepEach(child => {
        child.hide();
      });
    }
    this.draw();
    return this;
  }
  /**
   * show item
   * @param  {number} item  input item
   * @return {object} this
   */
  show(item) {
    item = this.getItem(item);
    if (item.isEdge) {
      item.isVisible() && item.isVisible() && item.show();
    } else {
      item.show();
    }
    if (item.isNode) {
      item.getEdges().forEach(edge => {
        const source = edge.getSource();
        const target = edge.getTarget();
        source.isVisible() && target.isVisible() && edge.show();
      });
    }
    if (item.isGroup) {
      item.getEdges().forEach(edge => {
        edge.show();
      });
      item.getInnerEdges().forEach(edge => {
        edge.show();
      });
      item.deepEach(child => {
        child.show();
      });
    }
    this.draw();
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
    const frontCanvas = this.get('_frontCanvas');
    const htmlElementContaniner = this.get('_htmlElementContaniner');
    if (width !== this.get('width') || height !== this.get('height')) {
      this.emit('beforechangesize');
      canvas.changeSize(width, height);
      frontCanvas.changeSize(width, height);
      htmlElementContaniner.css({
        width: width + 'px',
        height: height + 'px'
      });

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
   * @return  {object} canvas dom
   */
  saveImage() {
    const box = this.getBBox();
    const padding = this.getFitViewPadding();

    return Util.graph2Canvas({
      graph: this,
      width: box.width + padding[1] + padding[3],
      height: box.height + padding[0] + padding[2]
    });
  }
}
Mixins.forEach(Mixin => {
  Util.mix(Graph.prototype, Mixin.AUGMENT);
});
module.exports = Graph;
