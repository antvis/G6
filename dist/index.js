(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("G6", [], factory);
	else if(typeof exports === 'object')
		exports["G6"] = factory();
	else
		root["G6"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var G6 = {};
	var Monitor = __webpack_require__(59);

	G6.Color = __webpack_require__(72);
	G6.Math = __webpack_require__(8);
	G6.Matrix = __webpack_require__(3);
	G6.Tween = __webpack_require__(55);
	G6.Canvas = __webpack_require__(10);
	G6.Layouts = __webpack_require__(68);
	G6.Graph = __webpack_require__(13);
	G6.Net = __webpack_require__(184);
	G6.Tree = __webpack_require__(188);
	G6.Global = G6.Graph.Global;
	G6.Handler = G6.Graph.Handler;
	G6.Shape = G6.Graph.Shape;
	G6.Util = G6.Graph.Util;
	G6.Item = G6.Graph.Item;
	// 兼容老写法，大版本升级时删掉 start
	G6.registNode = G6.Graph.registNode;
	G6.registEdge = G6.Graph.registEdge;
	G6.Layout = G6.Layouts;
	// 兼容老写法，大版本升级时删掉 end
	G6.registerNode = G6.Graph.registNode;
	G6.registerEdge = G6.Graph.registEdge;
	G6.registBehaviour = G6.Handler.registBehaviour;

	Monitor.tracking = true;
	G6.track = function (enable) {
	  Monitor.tracking = enable;
	};
	__webpack_require__(186);
	module.exports = G6;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var gUtil = __webpack_require__(110);

	module.exports = gUtil;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * @fileOverview Handler 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Handler = {
	  // 重置模式
	  resetMode: function resetMode(arr, graph) {
	    var fn = void 0;
	    graph._off();
	    for (var i = 0; i < arr.length; i++) {
	      fn = Handler[arr[i]];
	      fn && fn(graph);
	    }
	  },

	  // 注册行为
	  registBehaviour: function registBehaviour(name, fun) {
	    Handler[name] = fun;
	  }
	};

	module.exports = Handler;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var gMatrix = {
	  Matrix3: __webpack_require__(102),
	  Vector2: __webpack_require__(103),
	  Vector3: __webpack_require__(104)
	};

	module.exports = gMatrix;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 图工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var MathUtil = __webpack_require__(31);
	var PathUtil = __webpack_require__(18);
	var BaseUtil = __webpack_require__(30);
	var DOMUtil = __webpack_require__(138);
	var EdgeUtil = __webpack_require__(141);
	var NodeUtil = __webpack_require__(64);
	var GraphUtil = {};
	Util.mix(GraphUtil, Util, BaseUtil, MathUtil, PathUtil, EdgeUtil, NodeUtil, DOMUtil);
	module.exports = GraphUtil;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Element = __webpack_require__(36);
	var Inside = __webpack_require__(6);
	var Vector3 = __webpack_require__(3).Vector3;

	var Shape = function(cfg) {
	  Shape.superclass.constructor.call(this, cfg);
	};

	Shape.ATTRS = {};

	Util.extend(Shape, Element);

	Util.augment(Shape, {
	  isShape: true,
	  createPath: function() {},
	  drawInner: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    self.createPath(context);
	    var originOpacity = context.globalAlpha;
	    if (self.hasFill()) {
	      var fillOpacity = attrs.fillOpacity;
	      if (!Util.isNull(fillOpacity) && fillOpacity !== 1) {
	        context.globalAlpha = fillOpacity;
	        context.fill();
	        context.globalAlpha = originOpacity;
	      } else {
	        context.fill();
	      }
	    }
	    if (self.hasStroke()) {
	      var lineWidth = self.__attrs.lineWidth;
	      if (lineWidth > 0) {
	        var strokeOpacity = attrs.strokeOpacity;
	        if (!Util.isNull(strokeOpacity) && strokeOpacity !== 1) {
	          context.globalAlpha = strokeOpacity;
	        }
	        context.stroke();
	      }
	    }
	  },
	  /**
	   * 节点是否在图形中
	   * @param  {Number}  x x 坐标
	   * @param  {Number}  y y 坐标
	   * @return {Boolean}  是否在图形中
	   */
	  isPointInPath: function() {
	    return false;
	  },
	  /**
	   * 击中图形时是否进行包围盒判断
	   * @return {Boolean} [description]
	   */
	  isHitBox: function() {
	    return true;
	  },
	  /**
	   * 节点是否能够被击中
	   * @param {Number} x x坐标
	   * @param {Number} y y坐标
	   * @return {Boolean} 是否在图形中
	   */
	  isHit: function(x, y) {
	    var self = this;
	    var v = new Vector3(x, y, 1);
	    self.invert(v); // canvas

	    if (self.isHitBox()) {
	      var box = self.getBBox();
	      if (box && !Inside.box(box.minX, box.maxX, box.minY, box.maxY, v.x, v.y)) {
	        return false;
	      }
	    }
	    var clip = self.__attrs.clip;
	    if (clip) {
	      if (clip.inside(x, y)) {
	        return self.isPointInPath(v.x, v.y);
	      }
	    } else {
	      return self.isPointInPath(v.x, v.y);
	    }
	    return false;
	  },
	  /**
	   * @protected
	   * 计算包围盒
	   * @return {Object} 包围盒
	   */
	  calculateBox: function() {
	    return null;
	  },
	  // 清除当前的矩阵
	  clearTotalMatrix: function() {
	    this.__cfg.totalMatrix = null;
	    this.__cfg.region = null;
	  },
	  clearBBox: function() {
	    this.__cfg.box = null;
	    this.__cfg.region = null;
	  },
	  getBBox: function() {
	    var box = this.__cfg.box;
	    // 延迟计算
	    if (!box) {
	      box = this.calculateBox();
	      if (box) {
	        box.x = box.minX;
	        box.y = box.minY;
	        box.width = box.maxX - box.minX;
	        box.height = box.maxY - box.minY;
	      }
	      this.__cfg.box = box;
	    }
	    return box;
	  }
	});

	module.exports = Shape;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview isInside
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Line = __webpack_require__(21);
	var Quadratic = __webpack_require__(22);
	var Cubic = __webpack_require__(15);
	var Arc = __webpack_require__(20);

	module.exports = {
	  line: function(x1, y1, x2, y2, lineWidth, x, y) {
	    var box = Line.box(x1, y1, x2, y2, lineWidth);

	    if (!this.box(box.minX, box.maxX, box.minY, box.maxY, x, y)) {
	      return false;
	    }

	    var d = Line.pointDistance(x1, y1, x2, y2, x, y);
	    if (isNaN(d)) {
	      return false;
	    }
	    return d <= lineWidth / 2;
	  },
	  polyline: function(points, lineWidth, x, y) {
	    var l = points.length - 1;
	    if (l < 1) {
	      return false;
	    }
	    for (var i = 0; i < l; i ++) {
	      var x1 = points[i][0];
	      var y1 = points[i][1];
	      var x2 = points[i + 1][0];
	      var y2 = points[i + 1][1];

	      if (this.line(x1, y1, x2, y2, lineWidth, x, y)) {
	        return true;
	      }
	    }

	    return false;
	  },
	  cubicline: function(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, x, y) {
	    return Cubic.pointDistance(x1, y1, x2, y2, x3, y3, x4, y4, x, y) <= lineWidth / 2;
	  },
	  quadraticline: function(x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
	    return Quadratic.pointDistance(x1, y1, x2, y2, x3, y3, x, y) <= lineWidth / 2;
	  },
	  arcline: function(cx, cy, r, startAngle, endAngle, clockwise, lineWidth, x, y) {
	    return Arc.pointDistance(cx, cy, r, startAngle, endAngle, clockwise, x, y) <= lineWidth / 2;
	  },
	  rect: function(rx, ry, width, height, x, y) {
	    return rx <= x && x <= rx + width && ry <= y && y <= ry + height;
	  },
	  circle: function(cx, cy, r, x, y) {
	    return Math.pow(x - cx, 2) + Math.pow(y - cy, 2) <= Math.pow(r, 2);
	  },
	  box: function(minX, maxX, minY, maxY, x, y) {
	    return minX <= x && x <= maxX && minY <= y && y <= maxY;
	  }
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * @fileOverview 全局配置项
	 * @author huangtonger@aliyun.com
	 */

	module.exports = {
	  // 默认颜色
	  colors: ['#4E7CCC', '#36B3C3', '#4ECDA5', '#94E08A', '#E2F194', '#EDCC72', '#F8AB60', '#F9815C', '#EB4456', '#C82B3D'],
	  guide: {},
	  // 网格配置项
	  grid: {
	    line: {
	      stroke: '#F5F5F5',
	      lineWidth: 1
	    },
	    forceAlign: true,
	    cell: 10
	  },
	  // 节点样式
	  nodeStyle: {
	    stroke: '#666',
	    fill: '#fff',
	    lineWidth: 1,
	    radius: 4,
	    fillOpacity: 0.1
	  },
	  // 节点委托图形样式
	  nodeDelegationStyle: {
	    stroke: '#108EE9',
	    lineDash: [3, 3]
	  },
	  // 线委托图形样式
	  edgeDelegationStyle: {
	    stroke: '#108EE9',
	    lineDash: [3, 3]
	  },
	  // 节点内边距
	  nodePadding: [8, 16],
	  // 节点文本样式
	  nodeLabelStyle: {
	    fill: '#666',
	    textAlign: 'center',
	    textBaseline: 'middle',
	    fontSize: 14
	  },
	  // 边样式
	  edgeStyle: {
	    lineWidth: 1,
	    stroke: '#999',
	    lineAppendWidth: 10
	  },
	  // 边文本样式
	  edgeLabelStyle: {
	    fill: '#666',
	    textAlign: 'center',
	    textBaseline: 'middle'
	  },
	  // 边文本矩形底样式
	  edgeLabelRectStyle: {
	    fill: 'white'
	  },
	  // 锚点样式
	  anchorPointStyle: {
	    fill: '#108EE9',
	    lineWidth: 0.1,
	    r: 4
	  },
	  // 锚点鼠标悬浮样式
	  anchorPointHoverStyle: {
	    lineWidth: 6,
	    stroke: '#108EE9',
	    strokeOpacity: 0.2
	  },
	  // 多选框选框样式
	  frameRectStyle: {
	    fill: 'blue',
	    opacity: 0.1
	  },
	  // 节点控制点样式
	  nodeControlPointStyle: {
	    r: 4,
	    fill: '#fff',
	    shadowBlur: 4,
	    shadowColor: '#666'
	  },
	  // 边的控制点样式
	  edgeControlPointStyle: {
	    r: 4,
	    fill: '#fff',
	    shadowBlur: 4,
	    shadowColor: '#666'
	  },
	  // 拼写错误兼容 TODO delete
	  nodeAcitvedBoxStyle: {},
	  // 选中节点盒子样式
	  nodeActivedBoxStyle: {
	    stroke: '#108EE9',
	    lineDash: [3, 3]
	  },
	  modalRectStyle: {
	    fill: 'white',
	    fillOpacity: 0.8
	  },
	  // z层级
	  zIndex: {
	    node: 1,
	    edge: 0,
	    nodeLabel: 5,
	    edgeLabel: 4,
	    edgeLabelBackground: 3
	  },
	  // 树图展开 icon 样式
	  treeButtonStyle: {
	    fill: '#fff',
	    stroke: '#333'
	  },
	  // 滚轮超时时长
	  wheelZoomTimeout: 200,
	  // 提示超时时长
	  toolTipTimeout: 200,
	  // 树图按钮半径
	  treeButtonRadius: 6,
	  // 树图按钮内边距
	  treeButtonPadding: 3,
	  // 自动缩放边距
	  fitViewPadding: 10,
	  // 更新动画持续时间
	  updateDuration: 450,
	  // 入场动画持续时间
	  enterDuration: 450,
	  // 退场动画持续时间
	  leaveDuration: 450,
	  // 更新动画缓动函数
	  updateEasing: 'easeOutQuart',
	  // 入场动画缓动函数
	  enterEasing: 'easeOutQuart',
	  // 退场动画缓动函数
	  leaveEasing: 'easeOutQuart',
	  // 字体家族
	  fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", SimSun, "sans-serif"'
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var gMath = __webpack_require__(101);

	module.exports = gMath;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview Handler 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Global = __webpack_require__(7);
	var Util = __webpack_require__(4);

	var HandlerUtil = {
	  /**
	   * 添加节点
	   * @param  {Object}    graph          图类
	   * @param  {Object}    eventType      事件类型
	   */
	  addNode: function addNode(graph, eventType) {
	    var addingType = void 0;
	    var model = void 0;
	    var node = void 0;
	    var gridAssist = graph.get('gridAssist');
	    var forceAlign = gridAssist && gridAssist.forceAlign;

	    graph._on(eventType, function (ev) {
	      addingType = graph.get('addingType');
	      model = graph.get('addingModel');
	      if (addingType === 'node') {
	        // 添加节点
	        model.x = ev.x;
	        model.y = ev.y;
	        if (forceAlign) {
	          HandlerUtil.alignPoint(model, gridAssist.cell);
	        }
	        node = graph.addItem('node', model);
	        graph.clearAllActived();
	        graph.setItemActived(node);
	        graph.updateRollback();
	        graph.draw(false);
	        graph.endAdd(node);
	      }
	    });
	  },

	  /**
	   * 滚轮隐藏
	   * @param  {Object}    graph          图类
	   * @param  {Function}  startCallback  滚动开始
	   * @param  {Function}  endCallback    滚动结束
	   */
	  onWheelZoom: function onWheelZoom(graph, startCallback, endCallback) {
	    var timer = setTimeout(function () {}, Global.wheelZoomTimeout);
	    var status = 1; // 状体 1 为结束后，0 为开始后
	    graph._on('wheelzoom', function () {
	      clearTimeout(timer);
	      if (status) {
	        startCallback();
	        status = 0;
	      }
	      timer = setTimeout(function () {
	        endCallback();
	        status = 1;
	      }, Global.wheelZoomTimeout);
	    });
	  },
	  autoText: function autoText(item) {
	    var keyShape = item.getKeyShape();
	    var group = item.getGroup();
	    var keyShapeBBox = Util.getBBox(keyShape, group.getParent().getParent().getParent()); // 因为在 freezeSize 模式下，要将文本尺寸变换 rootGroup 层次做比较才行
	    var keyShapeWidth = keyShapeBBox.maxX - keyShapeBBox.minX;
	    group.traverseChildren(function (child) {
	      if (child.type === 'text' && child.get('freezePoint')) {
	        var textBBox = child.getBBox();
	        var textWidth = textBBox.maxX - textBBox.minX;
	        if (textWidth > 7 / 3 * keyShapeWidth) {
	          child.hide();
	          child.set('autoTextHide', true);
	        } else {
	          child.set('autoTextHide', false);
	          child.show();
	        }
	      }
	    });
	  },
	  autoTexts: function autoTexts(graph) {
	    var nodes = graph.getNodes();
	    Util.each(nodes, function (node) {
	      HandlerUtil.autoText(node);
	    });
	    graph.draw();
	  },

	  /**
	   * 隐藏文本
	   * @param  {Object}  graph          图类
	   */
	  hideTexts: function hideTexts(graph) {
	    var rootGroup = graph.get('rootGroup');
	    rootGroup.traverseChildren(function (child) {
	      if (child.type === 'text') {
	        child.hide();
	      }
	    });
	    graph.draw(false);
	  },
	  showText: function showText(item) {
	    var group = item.getGroup();
	    group.traverseChildren(function (child) {
	      if (child.type === 'text') {
	        child.show();
	      }
	    });
	  },

	  /**
	   * 显示文本
	   * @param  {Object}  graph          图类
	   */
	  showTexts: function showTexts(graph) {
	    var rootGroup = graph.get('rootGroup');
	    rootGroup.traverseChildren(function (child) {
	      if (child.type === 'text') {
	        child.show();
	      }
	    });
	    graph.draw(false);
	  },

	  /**
	   * 跟栅格对齐
	   * @param  {Object}  point          点
	   * @param  {Number}  cell           网格尺寸
	   */
	  alignPoint: function alignPoint(point, cell) {
	    point.x = Math.round(point.x / cell) * cell;
	    point.y = Math.round(point.y / cell) * cell;
	  },

	  /**
	   * 获取控制点信息
	   * @param  {Object} point                输入点
	   * @param  {Number} pointIndex           控制点索引
	   * @param  {Object} controlPoint         控制点
	   * @param  {Object} node                 节点
	   * @param  {String} canvasType           画布类型
	   * @return {Object} 控制点信息
	   */
	  getControlInfo: function getControlInfo(point, pointIndex, controlPoint, node, canvasType) {
	    var controlX = point.x - controlPoint.x;
	    var controlY = point.y - controlPoint.y;
	    var bbox = node.getBBox();
	    var position = node.getPosition();
	    var width = void 0;
	    var height = void 0;
	    if (canvasType === 'frontCanvas') {
	      position = node.getCenter();
	    }
	    switch (pointIndex) {
	      case 0:
	        width = bbox.width - controlX;
	        height = bbox.height - controlY;
	        break;
	      case 1:
	        width = bbox.width + controlX;
	        height = bbox.height - controlY;
	        break;
	      case 2:
	        width = bbox.width + controlX;
	        height = bbox.height + controlY;
	        break;
	      default:
	        width = bbox.width - controlX;
	        height = bbox.height + controlY;
	        break;
	    }
	    var size = [width, height];
	    return { // 显示委托对象
	      x: position.x + controlX / 2,
	      y: position.y + controlY / 2,
	      size: size
	    };
	  },

	  /**
	   * 拖动端点
	   * @param  {Object}   graph                 类型：node ,edge
	   * @param  {Function} getDragEdge           获取要拖动的节点
	   * @param  {Function} getExtremePointIndex  获取拖动的端点
	   * @param  {Function} callBack              回调结束时回调
	   */
	  dragEdgeExtremePoint: function dragEdgeExtremePoint(graph, getDragEdge, getExtremePointIndex, callBack) {
	    var behaviourSignal = graph.get('behaviourSignal');
	    var item = void 0;
	    var shape = void 0;
	    var startShape = void 0;
	    var dragEdge = void 0;
	    var pointIndex = void 0;
	    var params = void 0;
	    var pointInfo = void 0;

	    graph._on('mousedown', function (ev) {
	      shape = ev.shape;
	      startShape = ev.shape;
	      dragEdge = getDragEdge(ev);
	      pointIndex = getExtremePointIndex(ev, dragEdge);
	      // 如果连接的不是端点，则返回
	      if (dragEdge && !dragEdge.isSourcePoint(pointIndex) && !dragEdge.isTargetPoint(pointIndex)) {
	        dragEdge = undefined;
	      }
	      if (dragEdge && shape && shape.hasClass('anchor-point')) {
	        dragEdge.updateModel({
	          controlPoints: [shape.get('point'), shape.get('point')],
	          sourceAnchor: shape.get('index')
	        });
	      }
	    });

	    graph._on('dragmove', function (ev) {
	      if (!graph.isEdge(dragEdge)) {
	        return;
	      }
	      behaviourSignal.draggingEdge = true;
	      item = ev.item;
	      pointInfo = {
	        x: ev.x,
	        y: ev.y,
	        controlPointIndex: pointIndex
	      };
	      dragEdge.showDelegation(pointInfo);
	      graph.refreshFront();
	    });

	    graph.on('mouseup', function (ev) {
	      if (!graph.isEdge(dragEdge)) {
	        return;
	      }
	      item = ev.item;
	      shape = ev.shape;
	      params = {};
	      if (behaviourSignal.draggingEdge) {
	        if (shape && shape.get('class') === 'anchor-point') {
	          // 连接锚点
	          if (shape.get('linkable') !== false && shape !== startShape) {
	            if (dragEdge.isSourcePoint(pointIndex)) {
	              params.source = item.get('id');
	              params.sourceAnchor = shape.get('index');
	            } else if (dragEdge.isTargetPoint(pointIndex)) {
	              params.target = item.get('id');
	              params.targetAnchor = shape.get('index');
	            }
	          }
	        } else if (graph.isNode(item)) {
	          // 连接节点
	          if (dragEdge.isSourcePoint(pointIndex)) {
	            params.source = item.get('id');
	            params.sourceAnchor = null;
	          } else if (dragEdge.isTargetPoint(pointIndex)) {
	            params.target = item.get('id');
	            params.targetAnchor = null;
	          }
	        }
	        dragEdge.hideDelegation();
	      }
	      callBack(dragEdge, params);
	      graph.fire('dragedgeend', {
	        edge: dragEdge,
	        shape: shape,
	        item: item
	      });

	      startShape = undefined;
	      item = undefined;
	      dragEdge = undefined;
	      params = undefined;
	      pointIndex = undefined;
	      pointInfo = undefined;
	      shape = undefined;
	      behaviourSignal.draggingEdge = undefined;
	    });
	  }
	};

	module.exports = HandlerUtil;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var Canvas = __webpack_require__(75);
	var G = __webpack_require__(38);
	Canvas.G = G;
	Canvas.Group = G.Group;
	Canvas.Shape = {};
	Canvas.Shape.Marker = G.Marker;
	Canvas.Util = __webpack_require__(54);
	Canvas.Matrix = __webpack_require__(3);
	module.exports = Canvas;



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	var gBase = __webpack_require__(74);

	module.exports = gBase;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var Vector2 = __webpack_require__(3).Vector2;

	var THETA = Math.PI / 6;

	function calculatePoints(vector, end, lineWidth) {
	  var angle = (new Vector2(1, 0)).angleTo(vector);
	  var downAngle = angle - THETA;
	  var upAngle = angle + THETA;
	  var length = 6 + lineWidth * 3;
	  return [
	    {
	      x: end.x - length * Math.cos(downAngle),
	      y: end.y - length * Math.sin(downAngle)
	    },
	    end,
	    {
	      x: end.x - length * Math.cos(upAngle),
	      y: end.y - length * Math.sin(upAngle)
	    }
	  ];
	}

	function arrow(context, points) {
	  context.moveTo(points[0].x, points[0].y);
	  context.lineTo(points[1].x, points[1].y);
	  context.lineTo(points[2].x, points[2].y);
	}

	function makeArrow(context, vector, end, lineWidth) {
	  arrow(context, calculatePoints(vector, end, lineWidth));
	}

	function getEndPoint(vector, end, lineWidth) {
	  var miterLimit = lineWidth / Math.sin(THETA);
	  vector.setLength(miterLimit / 2);
	  end.sub(vector);
	  return end;
	}

	module.exports = {
	  makeArrow: makeArrow,
	  getEndPoint: getEndPoint
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview Graph 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Graph = __webpack_require__(123);
	__webpack_require__(120);
	__webpack_require__(122);
	Graph.Mapper = __webpack_require__(62);
	Graph.Item = __webpack_require__(61);
	Graph.Shape = __webpack_require__(63);
	Graph.Util = __webpack_require__(4);
	Graph.Global = __webpack_require__(7);
	Graph.Handler = __webpack_require__(2);
	Graph.IdGroup = __webpack_require__(26);
	Graph.SortGroup = __webpack_require__(60);
	Graph.HtmlShape = __webpack_require__(121);
	Graph.registNode = Graph.Shape.registNode;
	Graph.registEdge = Graph.Shape.registEdge;

	module.exports = Graph;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = __webpack_require__(33);
	var util = __webpack_require__(1);

	var Layout = function () {
	  function Layout() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Layout);

	    var me = this;
	    // me.root = new Node(root, options);
	    me.options = options;
	    if (!util.isFunction(options.callback)) {
	      me.options.callback = function () {};
	    }
	  }

	  Layout.prototype._prepareRoot = function _prepareRoot() {
	    var me = this;
	    me.rootNode = new Node(me.root, me.options);
	  };

	  Layout.prototype.execute = function execute() {
	    throw new Error('please override this method');
	  };

	  Layout.prototype.getNodes = function getNodes() {
	    var me = this;
	    var root = me.execute();
	    root.translate(-(root.x + root.width / 2 + root.hgap), -(root.y + root.height / 2 + root.vgap));
	    var nodes = [];
	    root.eachNode(function (node) {
	      nodes.push(node.data);
	    });
	    return nodes;
	  };

	  Layout.prototype.getEdges = function getEdges() {
	    var me = this;
	    var options = me.options;
	    var extraEdges = options.extraEdges;
	    var root = this.rootNode;
	    var edges = [];
	    root.eachNode(function (node) {
	      node.children.forEach(function (child) {
	        edges.push({
	          id: node.id + '-' + child.id,
	          source: node.id,
	          target: child.id
	        });
	      });
	    });
	    edges.concat(extraEdges);
	    return edges;
	  };

	  return Layout;
	}();

	module.exports = Layout;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 三次贝赛尔曲线算法
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Vector2 = __webpack_require__(3).Vector2;
	var GMath = __webpack_require__(8);
	var Util = __webpack_require__(1);

	function cubicAt(p0, p1, p2, p3, t) {
	  var onet = 1 - t;
	  return onet * onet * (onet * p3 + 3 * t * p2) + t * t * (t * p0 + 3 * onet * p1);
	}

	function cubicDerivativeAt(p0, p1, p2, p3, t) {
	  var onet = 1 - t;
	  return 3 * (
	    ((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet +
	    (p3 - p2) * t * t
	  );
	}

	function cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, out) {
	  var t;
	  var interval = 0.005;
	  var d = Infinity;
	  var _t;
	  var v1;
	  var d1;
	  var d2;
	  var v2;
	  var prev;
	  var next;
	  var EPSILON = 0.0001;
	  var v0 = new Vector2(x, y);

	  for (_t = 0; _t < 1; _t += 0.05) {
	    v1 = new Vector2(
	      cubicAt(x1, x2, x3, x4, _t),
	      cubicAt(y1, y2, y3, y4, _t)
	    );


	    d1 = v1.distanceToSquared(v0);
	    if (d1 < d) {
	      t = _t;
	      d = d1;
	    }
	  }
	  d = Infinity;

	  for (var i = 0; i < 32; i++) {
	    if (interval < EPSILON) {
	      break;
	    }

	    prev = t - interval;
	    next = t + interval;

	    v1 = new Vector2(
	      cubicAt(x1, x2, x3, x4, prev),
	      cubicAt(y1, y2, y3, y4, prev)
	    );

	    d1 = v1.distanceToSquared(v0);

	    if (prev >= 0 && d1 < d) {
	      t = prev;
	      d = d1;
	    } else {
	      v2 = new Vector2(
	        cubicAt(x1, x2, x3, x4, next),
	        cubicAt(y1, y2, y3, y4, next)
	      );

	      d2 = v2.distanceToSquared(v0);

	      if (next <= 1 && d2 < d) {
	        t = next;
	        d = d2;
	      } else {
	        interval *= 0.5;
	      }
	    }
	  }

	  if (out) {
	    out.x = cubicAt(x1, x2, x3, x4, t);
	    out.y = cubicAt(y1, y2, y3, y4, t);
	  }

	  return Math.sqrt(d);
	}

	function cubicExtrema(p0, p1, p2, p3) {
	  var a = 3 * p0 - 9 * p1 + 9 * p2 - 3 * p3;
	  var b = 6 * p1 - 12 * p2 + 6 * p3;
	  var c = 3 * p2 - 3 * p3;
	  var extrema = [];
	  var t1;
	  var t2;
	  var discSqrt;

	  if (GMath.equal(a, 0)) {
	    if (!GMath.equal(b, 0)) {
	      t1 = -c / b;
	      if (t1 >= 0 && t1 <= 1) {
	        extrema.push(t1);
	      }
	    }
	  } else {
	    var disc = b * b - 4 * a * c;
	    if (GMath.equal(disc, 0)) {
	      extrema.push(-b / (2 * a));
	    } else if (disc > 0) {
	      discSqrt = Math.sqrt(disc);
	      t1 = (-b + discSqrt) / (2 * a);
	      t2 = (-b - discSqrt) / (2 * a);
	      if (t1 >= 0 && t1 <= 1) {
	        extrema.push(t1);
	      }
	      if (t2 >= 0 && t2 <= 1) {
	        extrema.push(t2);
	      }
	    }
	  }
	  return extrema;
	}

	function base3(t, p1, p2, p3, p4) {
	  var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4;
	  var t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
	  return t * t2 - 3 * p1 + 3 * p2;
	}

	function cubiclLen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
	  if (Util.isNull(z)) {
	    z = 1;
	  }
	  z = z > 1 ? 1 : z < 0 ? 0 : z;
	  var z2 = z / 2;
	  var n = 12;
	  var Tvalues = [-0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699, 0.7699, -0.9041, 0.9041, -0.9816, 0.9816];
	  var Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472];
	  var sum = 0;
	  for (var i = 0; i < n; i++) {
	    var ct = z2 * Tvalues[i] + z2;
	    var xbase = base3(ct, x1, x2, x3, x4);
	    var ybase = base3(ct, y1, y2, y3, y4);
	    var comb = xbase * xbase + ybase * ybase;
	    sum += Cvalues[i] * Math.sqrt(comb);
	  }
	  return z2 * sum;
	}


	module.exports = {
	  at: cubicAt,
	  derivativeAt: cubicDerivativeAt,
	  projectPoint: function(x1, y1, x2, y2, x3, y3, x4, y4, x, y) {
	    var rst = {};
	    cubicProjectPoint(x1, y1, x2, y2, x3, y3, x4, y4, x, y, rst);
	    return rst;
	  },
	  pointDistance: cubicProjectPoint,
	  extrema: cubicExtrema,
	  len: cubiclLen
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(87);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var number = __webpack_require__(98);
	var color = __webpack_require__(95);
	var Color = __webpack_require__(16);


	function singular(a, b) {
	  if (Util.isNumeric(a) && Util.isNumeric(b)) {
	    return number.number(a, b);
	  } else if(Util.isString(a) && Util.isString(b)) {
	    var color1 = new Color(a);
	    var color2 = new Color(b);
	    if (color1.getType() && color2.getType()) {
	      return color.color(color1, color2);
	    }
	  }
	}

	function unSingular(a, b) {
	  if (Util.isNumeric(a) && Util.isNumeric(b)) {
	    return number.unNumber(a, b);
	  } else if (Util.isString(a) && Util.isString(b)) {
	    var color1 = new Color(a);
	    var color2 = new Color(b);
	    if (color1.getType() && color2.getType()) {
	      return color.unColor(color1, color2);
	    }
	  }
	}

	module.exports = {
	  singular: singular,
	  unSingular: unSingular
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview Path工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var GPathUtil = __webpack_require__(105);
	var PathUtil = {};

	// 拍平点集
	function pointstoArray(points) {
	  var rst = [];
	  Util.each(points, function (p) {
	    rst.push(p.x);
	    rst.push(p.y);
	  });
	  return rst;
	}

	Util.mix(PathUtil, {
	  pathToArray: GPathUtil.toArray,
	  pathToString: GPathUtil.toString,
	  pathToCurve: GPathUtil.toCurve,
	  pathToAbsolute: GPathUtil.toAbsolute,
	  pathCatmullRomToBezier: GPathUtil.catmullRomToBezier,
	  getRectPath: GPathUtil.rectPath,
	  pathIntersection: GPathUtil.intersection,
	  /**
	   * 获取椭圆路径
	   * @param {Number} x 中心x坐标
	   * @param {Number} y 中心y坐标
	   * @param {Number} rx 横轴半径
	   * @param {Number} ry 纵轴
	   * @return {Array} Path
	   */
	  getEllipsePath: function getEllipsePath(x, y, rx, ry) {
	    var rst = [['M', x, y - ry], ['a', rx, ry, 0, 1, 1, 0, 2 * ry], ['a', rx, ry, 0, 1, 1, 0, -2 * ry], ['z']];
	    return rst;
	  },

	  /**
	   * 点集转化为Path多边形
	   * @param {Array} points 点集
	   * @param {Boolen} z 是否封闭
	   * @return {Array} Path
	   */
	  pointsToPolygon: function pointsToPolygon(points, z) {
	    if (!points.length) {
	      return '';
	    }
	    var path = '';
	    var str = '';

	    for (var i = 0, length = points.length; i < length; i++) {
	      var item = points[i];
	      if (i === 0) {
	        str = 'M{x} {y}';
	      } else {
	        str = 'L{x} {y}';
	      }
	      path += Util.substitute(str, item);
	    }

	    if (z) {
	      path += 'Z';
	    }
	    return path;
	  },

	  /**
	   * 点集到贝塞尔曲线
	   * @param  {Array} points 点集
	   * @return {Array} Path
	   */
	  pointsToCurve: function pointsToCurve(points) {
	    points = pointstoArray(points);
	    var rst = PathUtil.pathCatmullRomToBezier(points);
	    rst.unshift(['M', points[0], points[1]]);
	    return rst;
	  },

	  /**
	   * 用贝塞尔曲线模拟正弦波
	   * Using Bezier curves to fit sine wave.
	   * There is 4 control points for each curve of wave,
	   * which is at 1/4 wave length of the sine wave.
	   *
	   * The control points for a wave from (a) to (d) are a-b-c-d:
	   *          c *----* d
	   *     b *
	   *       |
	   * ... a * ..................
	   *
	   * whose positions are a: (0, 0), b: (0.5, 0.5), c: (1, 1), d: (PI / 2, 1)
	   *
	   * @param {number} x          x position of the left-most point (a)
	   * @param {number} stage      0-3, stating which part of the wave it is
	   * @param {number} waveLength wave length of the sine wave
	   * @param {number} amplitude  wave amplitude
	   * @return {Array} 正弦片段曲线
	   */
	  getWaterPositions: function getWaterPositions(x, stage, waveLength, amplitude) {
	    if (stage === 0) {
	      return [[x + 1 / 2 * waveLength / Math.PI / 2, amplitude / 2], [x + 1 / 2 * waveLength / Math.PI, amplitude], [x + waveLength / 4, amplitude]];
	    } else if (stage === 1) {
	      return [[x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2), amplitude], [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1), amplitude / 2], [x + waveLength / 4, 0]];
	    } else if (stage === 2) {
	      return [[x + 1 / 2 * waveLength / Math.PI / 2, -amplitude / 2], [x + 1 / 2 * waveLength / Math.PI, -amplitude], [x + waveLength / 4, -amplitude]];
	    }
	    return [[x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 2), -amplitude], [x + 1 / 2 * waveLength / Math.PI / 2 * (Math.PI - 1), -amplitude / 2], [x + waveLength / 4, 0]];
	  },

	  /**
	   * 获取水波路径
	   * @param  {number} radius          半径
	   * @param  {number} waterLevel      水位
	   * @param  {number} waveLength      波长
	   * @param  {number} phase           相位
	   * @param  {number} amplitude       震幅
	   * @param  {number} cx              圆心x
	   * @param  {number} cy              圆心y
	   * @return {Array}  path            路径
	   */
	  getWaterPath: function getWaterPath(radius, waterLevel, waveLength, phase, amplitude, cx, cy) {
	    var curves = Math.ceil(2 * radius / waveLength * 4) * 2;
	    var path = [];

	    // map phase to [-Math.PI * 2, 0]
	    while (phase < -Math.PI * 2) {
	      phase += Math.PI * 2;
	    }
	    while (phase > 0) {
	      phase -= Math.PI * 2;
	    }
	    phase = phase / Math.PI / 2 * waveLength;

	    var left = cx - radius + phase - radius * 2;

	    /**
	     * top-left corner as start point
	     *
	     * draws this point
	     *  |
	     * \|/
	     *  ~~~~~~~~
	     *  |      |
	     *  +------+
	     */
	    path.push(['M', left, waterLevel]);

	    /**
	     * top wave
	     *
	     * ~~~~~~~~ <- draws this sine wave
	     * |      |
	     * +------+
	     */
	    var waveRight = 0;
	    for (var c = 0; c < curves; ++c) {
	      var stage = c % 4;
	      var pos = PathUtil.getWaterPositions(c * waveLength / 4, stage, waveLength, amplitude);
	      path.push(['C', pos[0][0] + left, -pos[0][1] + waterLevel, pos[1][0] + left, -pos[1][1] + waterLevel, pos[2][0] + left, -pos[2][1] + waterLevel]);

	      if (c === curves - 1) {
	        waveRight = pos[2][0];
	      }
	    }

	    /**
	     * top-right corner
	     *
	     *                       ~~~~~~~~
	     * 3. draws this line -> |      | <- 1. draws this line
	     *                       +------+
	     *                          ^
	     *                          |
	     *                  2. draws this line
	     */
	    path.push(['L', waveRight + left, cy + radius]);
	    path.push(['L', left, cy + radius]);
	    path.push(['L', left, waterLevel]);
	    return path;
	  }
	});

	module.exports = PathUtil;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动画布行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var dragCanvas = function dragCanvas(graph, blank, xable, yable) {
	  var rootGroup = graph.get('rootGroup');
	  var startPoint = void 0;
	  var startMatrix = void 0;
	  var curMatrix = void 0;
	  var dx = void 0;
	  var dy = void 0;

	  graph._on('mousedown', function (ev) {
	    if (blank) {
	      if (ev.shape || ev.frontEvObj.shape) {
	        return;
	      }
	    }
	    startPoint = {
	      x: ev.domX,
	      y: ev.domY
	    };
	    startMatrix = rootGroup.getMatrix();
	  });
	  graph._on('dragmove', function (ev) {
	    if (!startPoint) {
	      return;
	    }
	    dx = ev.domX - startPoint.x;
	    dy = ev.domY - startPoint.y;
	    curMatrix = startMatrix.clone();
	    if (xable === false) {
	      dx = 0;
	    }
	    if (yable === false) {
	      dy = 0;
	    }
	    curMatrix.translate(dx, dy);
	    graph.updateMatrix(curMatrix);
	    graph.setCapture(false);
	    graph.draw(false);
	  });
	  graph._on('dommouseleave', function () {
	    graph.setCapture(true);
	    startPoint = undefined;
	    startMatrix = undefined;
	    dx = undefined;
	    dy = undefined;
	    curMatrix = undefined;
	  });
	  graph._on('mouseup', function () {
	    graph.setCapture(true);
	    startPoint = undefined;
	    startMatrix = undefined;
	    dx = undefined;
	    dy = undefined;
	    curMatrix = undefined;
	  });
	};

	Handler.dragCanvas = dragCanvas;

	module.exports = dragCanvas;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 圆弧线算法
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Vector2 = __webpack_require__(3).Vector2;
	var GMath = __webpack_require__(8);
	var Util = __webpack_require__(1);

	function circlePoint(cx, cy, r, angle) {
	  return {
	    x: Math.cos(angle) * r + cx,
	    y: Math.sin(angle) * r + cy
	  };
	}

	function angleNearTo(angle, min, max, out) {
	  var v1;
	  var v2;
	  if (out) {
	    if (angle < min) {
	      v1 = min - angle;
	      v2 = Math.PI * 2 - max + angle;
	    } else if (angle > max) {
	      v1 = Math.PI * 2 - angle + min;
	      v2 = angle - max;
	    }
	  } else {
	    v1 = angle - min;
	    v2 = max - angle;
	  }

	  return v1 > v2 ? max : min;
	}

	function nearAngle(angle, startAngle, endAngle, clockwise) {
	  var plus = 0;
	  if (endAngle - startAngle >= Math.PI * 2) {
	    plus = Math.PI * 2;
	  }
	  startAngle = GMath.mod(startAngle, Math.PI * 2);
	  endAngle = GMath.mod(endAngle, Math.PI * 2) + plus;
	  angle = GMath.mod(angle, Math.PI * 2);
	  if (clockwise) {
	    if (startAngle >= endAngle) {
	      if (angle > endAngle && angle < startAngle) {
	        return angle;
	      }
	      return angleNearTo(angle, endAngle, startAngle, true);
	    }
	    if (angle < startAngle || angle > endAngle) {
	      return angle;
	    }
	    return angleNearTo(angle, startAngle, endAngle);
	  }
	  if (startAngle <= endAngle) {
	    if (startAngle < angle && angle < endAngle) {
	      return angle;
	    }
	    return angleNearTo(angle, startAngle, endAngle, true);
	  }
	  if (angle > startAngle || angle < endAngle) {
	    return angle;
	  }
	  return angleNearTo(angle, endAngle, startAngle);
	}

	function arcProjectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, out) {
	  var v = new Vector2(x, y);
	  var v0 = new Vector2(cx, cy);
	  var v1 = new Vector2(1, 0);
	  var subv = Vector2.sub(v, v0);
	  var angle = v1.angleTo(subv);

	  angle = nearAngle(angle, startAngle, endAngle, clockwise);
	  var vpoint = new Vector2(r * Math.cos(angle) + cx, r * Math.sin(angle) + cy);
	  if (out) {
	    out.x = vpoint.x;
	    out.y = vpoint.y;
	  }
	  var d = v.distanceTo(vpoint);
	  return d;
	}

	function arcBox(cx, cy, r, startAngle, endAngle, clockwise) {
	  var angleRight = 0;
	  var angleBottom = Math.PI / 2;
	  var angleLeft = Math.PI;
	  var angleTop = Math.PI * 3 / 2;
	  var points = [];
	  var angle = nearAngle(angleRight, startAngle, endAngle, clockwise);
	  if (angle === angleRight) {
	    points.push(circlePoint(cx, cy, r, angleRight));
	  }

	  angle = nearAngle(angleBottom, startAngle, endAngle, clockwise);
	  if (angle === angleBottom) {
	    points.push(circlePoint(cx, cy, r, angleBottom));
	  }

	  angle = nearAngle(angleLeft, startAngle, endAngle, clockwise);
	  if (angle === angleLeft) {
	    points.push(circlePoint(cx, cy, r, angleLeft));
	  }

	  angle = nearAngle(angleTop, startAngle, endAngle, clockwise);
	  if (angle === angleTop) {
	    points.push(circlePoint(cx, cy, r, angleTop));
	  }

	  points.push(circlePoint(cx, cy, r, startAngle));
	  points.push(circlePoint(cx, cy, r, endAngle));
	  var minX = Infinity;
	  var maxX = -Infinity;
	  var minY = Infinity;
	  var maxY = -Infinity;
	  Util.each(points, function(point) {
	    if (minX > point.x) {
	      minX = point.x;
	    }
	    if (maxX < point.x) {
	      maxX = point.x;
	    }
	    if (minY > point.y) {
	      minY = point.y;
	    }
	    if (maxY < point.y) {
	      maxY = point.y;
	    }
	  });

	  return {
	    minX: minX,
	    minY: minY,
	    maxX: maxX,
	    maxY: maxY
	  };
	}

	module.exports = {
	  nearAngle: nearAngle,
	  projectPoint: function(cx, cy, r, startAngle, endAngle, clockwise, x, y) {
	    var rst = {};
	    arcProjectPoint(cx, cy, r, startAngle, endAngle, clockwise, x, y, rst);
	    return rst;
	  },
	  pointDistance: arcProjectPoint,
	  box: arcBox
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 直线算法
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Vector2 = __webpack_require__(3).Vector2;

	module.exports = {
	  at: function(p1, p2, t) {
	    return (p2 - p1) * t + p1;
	  },
	  pointDistance: function(x1, y1, x2, y2, x, y) {
	    var d = new Vector2(x2 - x1, y2 - y1);
	    if (d.isZero()) {
	      return NaN;
	    }

	    var u = d.vertical();
	    u.normalize();
	    var a = new Vector2(x - x1, y - y1);
	    return Math.abs(a.dot(u));
	  },
	  box: function(x1, y1, x2, y2, lineWidth) {
	    var halfWidth = lineWidth / 2;
	    var minX = Math.min(x1, x2);
	    var maxX = Math.max(x1, x2);
	    var minY = Math.min(y1, y2);
	    var maxY = Math.max(y1, y2);

	    return {
	      minX: minX - halfWidth,
	      minY: minY - halfWidth,
	      maxX: maxX + halfWidth,
	      maxY: maxY + halfWidth
	    };
	  },
	  len: function(x1, y1, x2, y2) {
	    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
	  }
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 二次贝赛尔曲线算法
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Vector2 = __webpack_require__(3).Vector2;
	var GMath = __webpack_require__(8);

	function quadraticAt(p0, p1, p2, t) {
	  var onet = 1 - t;
	  return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
	}

	function quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, out) {
	  var t;
	  var interval = 0.005;
	  var d = Infinity;
	  var d1;
	  var v1;
	  var v2;
	  var _t;
	  var d2;
	  var i;
	  var EPSILON = 0.0001;
	  var v0 = new Vector2(x, y);

	  for (_t = 0; _t < 1; _t += 0.05) {
	    v1 = new Vector2(
	      quadraticAt(x1, x2, x3, _t),
	      quadraticAt(y1, y2, y3, _t)
	    );

	    d1 = v1.distanceToSquared(v0);
	    if (d1 < d) {
	      t = _t;
	      d = d1;
	    }
	  }
	  d = Infinity;

	  for (i = 0; i < 32; i++) {
	    if (interval < EPSILON) {
	      break;
	    }

	    var prev = t - interval;
	    var next = t + interval;

	    v1 = new Vector2(
	      quadraticAt(x1, x2, x3, prev),
	      quadraticAt(y1, y2, y3, prev)
	    );

	    d1 = v1.distanceToSquared(v0);

	    if (prev >= 0 && d1 < d) {
	      t = prev;
	      d = d1;
	    } else {
	      v2 = new Vector2(
	        quadraticAt(x1, x2, x3, next),
	        quadraticAt(y1, y2, y3, next)
	      );

	      d2 = v2.distanceToSquared(v0);

	      if (next <= 1 && d2 < d) {
	        t = next;
	        d = d2;
	      } else {
	        interval *= 0.5;
	      }
	    }
	  }

	  if (out) {
	    out.x = quadraticAt(x1, x2, x3, t);
	    out.y = quadraticAt(y1, y2, y3, t);
	  }

	  return Math.sqrt(d);
	}


	function quadraticExtrema(p0, p1, p2) {
	  var a = p0 + p2 - 2 * p1;
	  if (GMath.equal(a, 0)) {
	    return [0.5];
	  }
	  var rst = (p0 - p1) / a;
	  if (rst <= 1 && rst >= 0) {
	    return [rst];
	  }
	  return [];
	}

	module.exports = {
	  at: quadraticAt,
	  projectPoint: function(x1, y1, x2, y2, x3, y3, x, y) {
	    var rst = {};
	    quadraticProjectPoint(x1, y1, x2, y2, x3, y3, x, y, rst);
	    return rst;
	  },
	  pointDistance: quadraticProjectPoint,
	  extrema: quadraticExtrema
	};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Useful things from Adobe's Snap.svg adopted to the library needs
	 */

	'use strict';

	var Util = __webpack_require__(1);

	/*
	 * Paths
	 */

	var spaces = "\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
	var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
	var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");

	// Parses given path string into an array of arrays of path segments
	var parsePathString = function(pathString) {
	  if (!pathString) {
	    return null;
	  }

	  if (typeof pathString === typeof []) {
	    return pathString;
	  } else {
	    var paramCounts = {
	        a: 7,
	        c: 6,
	        o: 2,
	        h: 1,
	        l: 2,
	        m: 2,
	        r: 4,
	        q: 4,
	        s: 4,
	        t: 2,
	        v: 1,
	        u: 3,
	        z: 0
	      },
	      data = [];

	    String(pathString).replace(pathCommand, function(a, b, c) {
	      var params = [],
	        name = b.toLowerCase();
	      c.replace(pathValues, function(a, b) {
	        b && params.push(+b);
	      });
	      if (name == "m" && params.length > 2) {
	        data.push([b].concat(params.splice(0, 2)));
	        name = "l";
	        b = b == "m" ? "l" : "L";
	      }
	      if (name == "o" && params.length == 1) {
	        data.push([b, params[0]]);
	      }
	      if (name == "r") {
	        data.push([b].concat(params));
	      } else
	        while (params.length >= paramCounts[name]) {
	          data.push([b].concat(params.splice(0, paramCounts[name])));
	          if (!paramCounts[name]) {
	            break;
	          }
	        }
	    });

	    return data;
	  }
	};


	// http://schepers.cc/getting-to-the-point
	var catmullRom2bezier = function(crp, z) {
	  var d = [];
	  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	    var p = [{
	      x: +crp[i - 2],
	      y: +crp[i - 1]
	    }, {
	      x: +crp[i],
	      y: +crp[i + 1]
	    }, {
	      x: +crp[i + 2],
	      y: +crp[i + 3]
	    }, {
	      x: +crp[i + 4],
	      y: +crp[i + 5]
	    }];
	    if (z) {
	      if (!i) {
	        p[0] = {
	          x: +crp[iLen - 2],
	          y: +crp[iLen - 1]
	        };
	      } else if (iLen - 4 == i) {
	        p[3] = {
	          x: +crp[0],
	          y: +crp[1]
	        };
	      } else if (iLen - 2 == i) {
	        p[2] = {
	          x: +crp[0],
	          y: +crp[1]
	        };
	        p[3] = {
	          x: +crp[2],
	          y: +crp[3]
	        };
	      }
	    } else {
	      if (iLen - 4 == i) {
	        p[3] = p[2];
	      } else if (!i) {
	        p[0] = {
	          x: +crp[i],
	          y: +crp[i + 1]
	        };
	      }
	    }
	    d.push(["C",
	      (-p[0].x + 6 * p[1].x + p[2].x) / 6,
	      (-p[0].y + 6 * p[1].y + p[2].y) / 6,
	      (p[1].x + 6 * p[2].x - p[3].x) / 6,
	      (p[1].y + 6 * p[2].y - p[3].y) / 6,
	      p[2].x,
	      p[2].y
	    ]);
	  }

	  return d;

	};

	var ellipsePath = function(x, y, rx, ry, a) {
	  if (a == null && ry == null) {
	    ry = rx;
	  }
	  x = +x;
	  y = +y;
	  rx = +rx;
	  ry = +ry;
	  if (a != null) {
	    var rad = Math.PI / 180,
	      x1 = x + rx * Math.cos(-ry * rad),
	      x2 = x + rx * Math.cos(-a * rad),
	      y1 = y + rx * Math.sin(-ry * rad),
	      y2 = y + rx * Math.sin(-a * rad),
	      res = [
	        ["M", x1, y1],
	        ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]
	      ];
	  } else {
	    res = [
	      ["M", x, y],
	      ["m", 0, -ry],
	      ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
	      ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
	      ["z"]
	    ];
	  }
	  return res;
	};

	var pathToAbsolute = function(pathArray) {
	  pathArray = parsePathString(pathArray);

	  if (!pathArray || !pathArray.length) {
	    return [
	      ["M", 0, 0]
	    ];
	  }
	  var res = [],
	    x = 0,
	    y = 0,
	    mx = 0,
	    my = 0,
	    start = 0,
	    pa0;
	  if (pathArray[0][0] == "M") {
	    x = +pathArray[0][1];
	    y = +pathArray[0][2];
	    mx = x;
	    my = y;
	    start++;
	    res[0] = ["M", x, y];
	  }
	  var crz = pathArray.length == 3 &&
	    pathArray[0][0] == "M" &&
	    pathArray[1][0].toUpperCase() == "R" &&
	    pathArray[2][0].toUpperCase() == "Z";
	  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	    res.push(r = []);
	    pa = pathArray[i];
	    pa0 = pa[0];
	    if (pa0 != pa0.toUpperCase()) {
	      r[0] = pa0.toUpperCase();
	      switch (r[0]) {
	        case "A":
	          r[1] = pa[1];
	          r[2] = pa[2];
	          r[3] = pa[3];
	          r[4] = pa[4];
	          r[5] = pa[5];
	          r[6] = +pa[6] + x;
	          r[7] = +pa[7] + y;
	          break;
	        case "V":
	          r[1] = +pa[1] + y;
	          break;
	        case "H":
	          r[1] = +pa[1] + x;
	          break;
	        case "R":
	          var dots = [x, y].concat(pa.slice(1));
	          for (var j = 2, jj = dots.length; j < jj; j++) {
	            dots[j] = +dots[j] + x;
	            dots[++j] = +dots[j] + y;
	          }
	          res.pop();
	          res = res.concat(catmullRom2bezier(dots, crz));
	          break;
	        case "O":
	          res.pop();
	          dots = ellipsePath(x, y, pa[1], pa[2]);
	          dots.push(dots[0]);
	          res = res.concat(dots);
	          break;
	        case "U":
	          res.pop();
	          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	          r = ["U"].concat(res[res.length - 1].slice(-2));
	          break;
	        case "M":
	          mx = +pa[1] + x;
	          my = +pa[2] + y;
	        default:
	          for (j = 1, jj = pa.length; j < jj; j++) {
	            r[j] = +pa[j] + ((j % 2) ? x : y);
	          }
	      }
	    } else if (pa0 == "R") {
	      dots = [x, y].concat(pa.slice(1));
	      res.pop();
	      res = res.concat(catmullRom2bezier(dots, crz));
	      r = ["R"].concat(pa.slice(-2));
	    } else if (pa0 == "O") {
	      res.pop();
	      dots = ellipsePath(x, y, pa[1], pa[2]);
	      dots.push(dots[0]);
	      res = res.concat(dots);
	    } else if (pa0 == "U") {
	      res.pop();
	      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	      r = ["U"].concat(res[res.length - 1].slice(-2));
	    } else {
	      for (var k = 0, kk = pa.length; k < kk; k++) {
	        r[k] = pa[k];
	      }
	    }
	    pa0 = pa0.toUpperCase();
	    if (pa0 != "O") {
	      switch (r[0]) {
	        case "Z":
	          x = +mx;
	          y = +my;
	          break;
	        case "H":
	          x = r[1];
	          break;
	        case "V":
	          y = r[1];
	          break;
	        case "M":
	          mx = r[r.length - 2];
	          my = r[r.length - 1];
	        default:
	          x = r[r.length - 2];
	          y = r[r.length - 1];
	      }
	    }
	  }

	  return res;
	};


	var l2c = function(x1, y1, x2, y2) {
	  return [x1, y1, x2, y2, x2, y2];
	};
	var q2c = function(x1, y1, ax, ay, x2, y2) {
	  var _13 = 1 / 3,
	    _23 = 2 / 3;
	  return [
	    _13 * x1 + _23 * ax,
	    _13 * y1 + _23 * ay,
	    _13 * x2 + _23 * ax,
	    _13 * y2 + _23 * ay,
	    x2,
	    y2
	  ];
	};
	var a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	  // for more information of where this math came from visit:
	  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	  if(rx === ry) rx += 1;
	  var _120 = Math.PI * 120 / 180,
	    rad = Math.PI / 180 * (+angle || 0),
	    res = [],
	    xy,
	    rotate = function(x, y, rad) {
	      var X = x * Math.cos(rad) - y * Math.sin(rad),
	        Y = x * Math.sin(rad) + y * Math.cos(rad);
	      return {
	        x: X,
	        y: Y
	      };
	    };
	  if (!recursive) {
	    xy = rotate(x1, y1, -rad);
	    x1 = xy.x;
	    y1 = xy.y;
	    xy = rotate(x2, y2, -rad);
	    x2 = xy.x;
	    y2 = xy.y;
	    if(x1 === x2 && y1 === y2) { // 若弧的起始点和终点重叠则错开一点
	      x2 += 1;
	      y2 += 1;
	    }
	    var cos = Math.cos(Math.PI / 180 * angle),
	      sin = Math.sin(Math.PI / 180 * angle),
	      x = (x1 - x2) / 2,
	      y = (y1 - y2) / 2;
	    var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	    if (h > 1) {
	      h = Math.sqrt(h);
	      rx = h * rx;
	      ry = h * ry;
	    }
	    var rx2 = rx * rx,
	      ry2 = ry * ry,
	      k = (large_arc_flag == sweep_flag ? -1 : 1) *
	      Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	      cx = k * rx * y / ry + (x1 + x2) / 2,
	      cy = k * -ry * x / rx + (y1 + y2) / 2,
	      f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
	      f2 = Math.asin(((y2 - cy) / ry).toFixed(9));

	    f1 = x1 < cx ? Math.PI - f1 : f1;
	    f2 = x2 < cx ? Math.PI - f2 : f2;
	    f1 < 0 && (f1 = Math.PI * 2 + f1);
	    f2 < 0 && (f2 = Math.PI * 2 + f2);
	    if (sweep_flag && f1 > f2) {
	      f1 = f1 - Math.PI * 2;
	    }
	    if (!sweep_flag && f2 > f1) {
	      f2 = f2 - Math.PI * 2;
	    }
	  } else {
	    f1 = recursive[0];
	    f2 = recursive[1];
	    cx = recursive[2];
	    cy = recursive[3];
	  }
	  var df = f2 - f1;
	  if (Math.abs(df) > _120) {
	    var f2old = f2,
	      x2old = x2,
	      y2old = y2;
	    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	    x2 = cx + rx * Math.cos(f2);
	    y2 = cy + ry * Math.sin(f2);
	    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	  }
	  df = f2 - f1;
	  var c1 = Math.cos(f1),
	    s1 = Math.sin(f1),
	    c2 = Math.cos(f2),
	    s2 = Math.sin(f2),
	    t = Math.tan(df / 4),
	    hx = 4 / 3 * rx * t,
	    hy = 4 / 3 * ry * t,
	    m1 = [x1, y1],
	    m2 = [x1 + hx * s1, y1 - hy * c1],
	    m3 = [x2 + hx * s2, y2 - hy * c2],
	    m4 = [x2, y2];
	  m2[0] = 2 * m1[0] - m2[0];
	  m2[1] = 2 * m1[1] - m2[1];
	  if (recursive) {
	    return [m2, m3, m4].concat(res);
	  } else {
	    res = [m2, m3, m4].concat(res).join().split(",");
	    var newres = [];
	    for (var i = 0, ii = res.length; i < ii; i++) {
	      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	    }
	    return newres;
	  }
	};

	var path2curve = function(path, path2) {
	  var p = pathToAbsolute(path),
	    p2 = path2 && pathToAbsolute(path2),
	    attrs = {
	      x: 0,
	      y: 0,
	      bx: 0,
	      by: 0,
	      X: 0,
	      Y: 0,
	      qx: null,
	      qy: null
	    },
	    attrs2 = {
	      x: 0,
	      y: 0,
	      bx: 0,
	      by: 0,
	      X: 0,
	      Y: 0,
	      qx: null,
	      qy: null
	    },
	    processPath = function(path, d, pcom) {
	      var nx, ny;
	      if (!path) {
	        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	      }!(path[0] in {
	        T: 1,
	        Q: 1
	      }) && (d.qx = d.qy = null);
	      switch (path[0]) {
	        case "M":
	          d.X = path[1];
	          d.Y = path[2];
	          break;
	        case "A":
	          path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
	          break;
	        case "S":
	          if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
	            nx = d.x * 2 - d.bx; // And reflect the previous
	            ny = d.y * 2 - d.by; // command's control point relative to the current point.
	          } else { // or some else or nothing
	            nx = d.x;
	            ny = d.y;
	          }
	          path = ["C", nx, ny].concat(path.slice(1));
	          break;
	        case "T":
	          if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
	            d.qx = d.x * 2 - d.qx; // And make a reflection similar
	            d.qy = d.y * 2 - d.qy; // to case "S".
	          } else { // or something else or nothing
	            d.qx = d.x;
	            d.qy = d.y;
	          }
	          path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	          break;
	        case "Q":
	          d.qx = path[1];
	          d.qy = path[2];
	          path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	          break;
	        case "L":
	          path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
	          break;
	        case "H":
	          path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
	          break;
	        case "V":
	          path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
	          break;
	        case "Z":
	          path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
	          break;
	      }
	      return path;
	    },
	    fixArc = function(pp, i) {
	      if (pp[i].length > 7) {
	        pp[i].shift();
	        var pi = pp[i];
	        while (pi.length) {
	          pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
	          p2 && (pcoms2[i] = "A"); // the same as above
	          pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
	        }
	        pp.splice(i, 1);
	        ii = Math.max(p.length, p2 && p2.length || 0);
	      }
	    },
	    fixM = function(path1, path2, a1, a2, i) {
	      if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	        path2.splice(i, 0, ["M", a2.x, a2.y]);
	        a1.bx = 0;
	        a1.by = 0;
	        a1.x = path1[i][1];
	        a1.y = path1[i][2];
	        ii = Math.max(p.length, p2 && p2.length || 0);
	      }
	    },
	    pcoms1 = [], // path commands of original path p
	    pcoms2 = [], // path commands of original path p2
	    pfirst = "", // temporary holder for original path command
	    pcom = ""; // holder for previous path command of original path
	  for (var i = 0, ii = Math.max(p.length, p2 && p2.length || 0); i < ii; i++) {
	    p[i] && (pfirst = p[i][0]); // save current path command

	    if (pfirst != "C") { // C is not saved yet, because it may be result of conversion
	      pcoms1[i] = pfirst; // Save current path command
	      i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
	    }
	    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

	    if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	    // which may produce multiple C:s
	    // so we have to make sure that C is also C in original path

	    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

	    if (p2) { // the same procedures is done to p2
	      p2[i] && (pfirst = p2[i][0]);
	      if (pfirst != "C") {
	        pcoms2[i] = pfirst;
	        i && (pcom = pcoms2[i - 1]);
	      }
	      p2[i] = processPath(p2[i], attrs2, pcom);

	      if (pcoms2[i] != "A" && pfirst == "C") {
	        pcoms2[i] = "C";
	      }

	      fixArc(p2, i);
	    }
	    fixM(p, p2, attrs, attrs2, i);
	    fixM(p2, p, attrs2, attrs, i);
	    var seg = p[i],
	      seg2 = p2 && p2[i],
	      seglen = seg.length,
	      seg2len = p2 && seg2.length;
	    attrs.x = seg[seglen - 2];
	    attrs.y = seg[seglen - 1];
	    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
	    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
	    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
	    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
	    attrs2.x = p2 && seg2[seg2len - 2];
	    attrs2.y = p2 && seg2[seg2len - 1];
	  }

	  return p2 ? [p, p2] : p;
	};

	var box = function(x, y, width, height) {
	  if (x == null) {
	    x = y = width = height = 0;
	  }
	  if (y == null) {
	    y = x.y;
	    width = x.width;
	    height = x.height;
	    x = x.x;
	  }
	  return {
	    x: x,
	    y: y,
	    w: width,
	    h: height,
	    cx: x + width / 2,
	    cy: y + height / 2
	  };
	};

	var p2s = /,?([a-z]),?/gi;
	var path2string = function(path) {
	  return path.join(',').replace(p2s, "$1");
	};

	var PathUtil = {
	  toArray: parsePathString,
	  toString: path2string,
	  toCurve: path2curve,
	  toAbsolute: pathToAbsolute,
	  catmullRomToBezier: catmullRom2bezier
	};

	module.exports = PathUtil;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 动画入口文件
	 * @author huangtonger@aliyun.com
	 */

	module.exports = {
	  centerScaleIn: __webpack_require__(111),
	  centerScaleOut: __webpack_require__(112),
	  update: __webpack_require__(113),
	  Util: __webpack_require__(25)
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 动画的工具方法
	 * @author huangtonger@aliyun.com
	 */

	var Global = __webpack_require__(7);
	var AnimateUtil = {
	  // 缩放进入
	  scaleIn: function scaleIn(element, x, y, centerX, centerY) {
	    centerX = centerX ? centerX : x;
	    centerY = centerY ? centerY : y;
	    element.transform([['t', -centerX, -centerY], ['s', 0.01, 0.01], ['t', x, y]]);
	    setTimeout(function () {
	      element && !element.get('destroyed') && element.animate({
	        transform: [['t', -x, -y], ['s', 100, 100], ['t', centerX, centerY]]
	      }, Global.enterDuration, Global.enterEasing);
	    }, 16);
	  },

	  // 缩放退出
	  scaleOut: function scaleOut(element, x, y) {
	    element.animate({
	      transform: [['t', -x, -y], ['s', 0.01, 0.01], ['t', x, y]]
	    }, Global.leaveDuration, Global.leaveEasing, function () {
	      element.remove();
	    });
	  }
	};

	module.exports = AnimateUtil;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview Id 该图组下直接生产的元素包含ID
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var G = __webpack_require__(10).G;
	var gGroup = G.Group;

	var Group = function Group(cfg) {
	  Group.superclass.constructor.call(this, cfg);
	};

	Util.extend(Group, gGroup);

	Util.augment(Group, {
	  init: function init() {
	    Group.superclass.init.call(this);
	    this.set('gid', this.get('id'));
	  },
	  addShape: function addShape(type, cfg) {
	    var id = this.get('id');
	    var child = Group.superclass.addShape.call(this, type, cfg);
	    child.set('id', id);
	    child.set('gid', id + '-' + this.get('children').length);
	    return child;
	  },
	  addGroup: function addGroup(type, cfg) {
	    var id = this.get('id');
	    var child = Group.superclass.addGroup.call(this, type, cfg);
	    child.set('id', id);
	    child.set('gid', id + this.get('children').length);
	    return child;
	  }
	});

	module.exports = Group;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点和边的基础类
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Base = __webpack_require__(11);
	var Util = __webpack_require__(4);
	var ActivedMixin = __webpack_require__(128);
	var QueryMixin = __webpack_require__(28);
	var Shape = __webpack_require__(63);
	var Global = __webpack_require__(7);
	var Animate = __webpack_require__(24);

	var Item = function Item(cfg) {
	  Item.superclass.constructor.call(this, cfg);
	  this._init();
	};

	Item.ATTRS = {
	  /**
	   * 节点id
	   * @type {String}
	   */
	  id: '',

	  /**
	   * 类型
	   * @type {String}
	   */
	  type: null,

	  /**
	   * 节点对应的数据对象
	   * @type {Object}
	   */
	  model: {},

	  /**
	   * 执行映射的对象
	   * @type {Mapping}
	   */
	  mapper: null,

	  /**
	   * 所在的图形容器
	   * @type {Canvas.Group}
	   */
	  group: null,

	  /**
	   * 变形点所在组
	   * @type {Canvas.Group}
	   */
	  controlGroup: null,

	  /**
	   * 关键形
	   * @type {Canvas.Shape}
	   */
	  keyShape: null,

	  /**
	   * 类型集
	   * @type {String}
	   */
	  class: null,

	  /**
	   * 用于存储帧绘制状态数据
	   * @type {Boolean}
	   */
	  drawFrameObj: {},

	  /**
	   * 进场动画
	   * @type {Funtion}
	   */
	  enterAnimate: Animate.centerScaleIn,

	  /**
	   * 出场动画
	   * @type {Funtion}
	   */
	  leaveAnimate: Animate.centerScaleOut
	};

	Util.extend(Item, Base);

	Util.mixin(Item, [ActivedMixin, QueryMixin]);

	Util.augment(Item, {
	  // 初始化
	  _init: function _init() {
	    var self = this;
	    var type = self.get('type');
	    var shapeManger = Shape.getShape(type);
	    this.set('shapeManger', shapeManger);
	  },

	  // 计算包围盒
	  _calculateBBox: function _calculateBBox() {
	    var self = this;
	    var keyShape = self.getKeyShape();
	    var group = keyShape.get('parent');
	    var bbox = Util.getBBox(keyShape, group);
	    this.set('boxStash', bbox); // 缓存包围盒节约开销
	    return bbox;
	  },

	  // 设置退场动画和入场动画
	  _setAnimate: function _setAnimate() {
	    var group = this.get('group');
	    var shapeObj = this.getShapeObj();
	    var graph = this.get('graph');
	    var enterAnimate = this.get('enterAnimate');
	    var leaveAnimate = this.get('leaveAnimate');
	    if (!graph) {
	      return;
	    }
	    var animate = Util.mix(true, {}, {
	      enterAnimate: enterAnimate,
	      leaveAnimate: leaveAnimate
	    }, {
	      enterAnimate: graph.enterAnimate,
	      leaveAnimate: graph.leaveAnimate
	    }, {
	      enterAnimate: shapeObj.enterAnimate,
	      leaveAnimate: shapeObj.leaveAnimate
	    });
	    group.set('enterAnimate', animate.enterAnimate);
	    group.set('leaveAnimate', animate.leaveAnimate);
	  },

	  // 隐藏控制点
	  hideControlPoints: function hideControlPoints() {
	    var controlGroup = this.get('controlGroup');
	    controlGroup && controlGroup.remove();
	  },

	  // 显示控制点
	  showControlPoints: function showControlPoints() {
	    var self = this;
	    var points = self.getControlPoints();
	    var type = self.get('type');
	    var style = Global[type + 'ControlPointStyle'];
	    var controlPointRootGroup = self.get('controlPointRootGroup');
	    var controlGroup = self.get('controlGroup');
	    controlGroup && controlGroup.remove(true);
	    controlGroup = controlPointRootGroup.addGroup({
	      zIndex: Global.zIndex.controlPoint,
	      id: self.get('id')
	    });
	    self.set('controlGroup', controlGroup);
	    if (!style) {
	      return;
	    }
	    var r = style.r ? style.r : 5;
	    Util.each(points, function (point, index) {
	      controlGroup.addShape('rect', {
	        class: 'control-point',
	        freezePoint: point,
	        pointIndex: index,
	        point: point,
	        item: self,
	        attrs: Util.mix({}, style, {
	          x: point.x - r,
	          y: point.y - r,
	          width: 2 * r,
	          height: 2 * r
	        })
	      });
	    });
	  },
	  isVisible: function isVisible() {
	    var group = this.getGroup();
	    return group.get('visible');
	  },

	  // 显示
	  _show: function _show() {
	    var group = this.get('group');
	    group.show();
	  },

	  // 隐藏
	  _hide: function _hide() {
	    var group = this.get('group');
	    group.hide();
	    this.clearActived();
	  },
	  getLabelShape: function getLabelShape() {
	    var group = this.get('group');
	    return group.findBy(function (child) {
	      return child.hasClass('label');
	    });
	  },
	  getType: function getType() {
	    return this.get('type');
	  },

	  /**
	   * 包围盒
	   * @return {Object} 包围盒
	   */
	  getBBox: function getBBox() {
	    var boxStash = this.get('boxStash');
	    return boxStash || this._calculateBBox();
	  },

	  /**
	   * 获得图组
	   * @return {Object} 图组
	   */
	  getGroup: function getGroup() {
	    return this.get('group');
	  },

	  /**
	   * 获取关键形
	   * @return {G.Element} Element
	   */
	  getKeyShape: function getKeyShape() {
	    var self = this;
	    var group = self.get('group');
	    var children = group.get('children');
	    var keyShape = self.get('keyShape');
	    return keyShape || children[0];
	  },

	  /**
	   * 获取注册形对象
	   * @return {Object} ShapeObj
	   */
	  getShapeObj: function getShapeObj() {
	    return this.get('shapeObj');
	  },

	  /**
	   * 获取映射后的配置信息
	   * @return {Object} 配置信息
	   */
	  getShapeCfg: function getShapeCfg() {
	    return this.get('group').get('shapeCfg');
	  },

	  /**
	   * 更新
	   * @param {Boolean} bool 是否清空时图形对象是否销毁
	   */
	  update: function update() {
	    var group = this.get('group');
	    var animate = this.get('animate');
	    group.clear(!animate);
	    this.draw();
	  },

	  /**
	   * 绘制
	   */
	  draw: function draw() {
	    var self = this;
	    var model = self.get('model');
	    var mapper = self.get('mapper');
	    var cfg = mapper.mapping(model);
	    var group = self.get('group');
	    var shapeManger = self.get('shapeManger');
	    var shape = void 0;
	    var image = void 0;
	    var canvas = void 0;

	    group.set('shapeCfg', cfg); // 缓存cfg到group
	    self.beforeDraw();
	    shape = cfg.shape;
	    if (Util.isArray(cfg.shape)) {
	      shape = cfg.shape[0];
	    }
	    if (shape && shape.startsWith && shape.startsWith('http')) {
	      if (!cfg.size) {
	        image = new Image();
	        canvas = self.getCanvas();
	        image.src = cfg.shape;
	        image.onload = function () {
	          if (!self || self.get('destroyed')) return false;
	          model.size = [image.width, image.height];
	          self.draw();
	          canvas.draw();
	        };
	        return;
	      }
	      shape = 'image';
	    }
	    var keyShape = shapeManger.draw(shape, cfg, group);
	    self.set('shapeObj', shapeManger.getShape(shape));
	    self.set('keyShape', keyShape);
	    group.set('keyShape', keyShape);
	    self._setAnimate();
	    self.afterDraw();
	  },

	  // 获取canvas
	  getCanvas: function getCanvas() {
	    var canvas = this.get('group').get('canvas');
	    return canvas;
	  },

	  // 绘制前执行
	  beforeDraw: function beforeDraw() {},

	  /**
	   * 绘制完成后
	   */
	  afterDraw: function afterDraw() {
	    var graph = this.get('graph');
	    var actived = this.get('actived');
	    actived && this.setActiveStatus(actived);
	    graph.fire('afteritemrender', {
	      item: this
	    });
	  },

	  /**
	   * 销毁边和节点内部元素
	   */
	  destroyItem: function destroyItem() {},

	  /**
	   * 销毁子项
	   * @param {Boolean} bool 是否清空时图形对象是否销毁
	   */
	  destroy: function destroy() {
	    var group = this.get('group');
	    var controlGroup = this.get('controlGroup');
	    var delegateEl = this.get('delegateEl');
	    var animate = this.get('animate');
	    group && group.remove(!animate);
	    controlGroup && controlGroup.remove();
	    delegateEl && delegateEl.remove();
	    this.destroyItem();
	    Item.superclass.destroy.call(this);
	  },

	  /**
	   * 设置图形的激活状态
	   * @param {Boolean}  actived            是否激活
	   * @param {Function} activedCallBack    激活时回调
	   * @param {Function} unactivedCallBack  取消激活时回调
	   */
	  setActiveStatus: function setActiveStatus(actived, activedCallBack, unactivedCallBack) {
	    // 防御机制
	    // 防止 changeData 后原来元素已被销毁，但仍被触发
	    if (this.destroyed) {
	      return;
	    }
	    var shapeObj = this.getShapeObj();
	    if (shapeObj && Util.isFunction(shapeObj.setActived)) {
	      shapeObj.setActived(this, actived);
	    } else {
	      if (actived) {
	        this.showControlPoints();
	        activedCallBack && activedCallBack();
	      } else {
	        this.hideControlPoints();
	        unactivedCallBack && unactivedCallBack();
	      }
	    }
	  },

	  /**
	   * 显示委托图形
	   * @param {Object} pointInfo 点信息
	   */
	  showDelegation: function showDelegation(pointInfo) {
	    var path = this.getDelegationPath(pointInfo);
	    var delegateEl = this.get('delegateEl');
	    var stroke = pointInfo.stroke;
	    var delegaRootGroup = this.get('delegaRootGroup');
	    var type = this.get('type');
	    var attrs = Util.mix(true, {}, Global[type + 'DelegationStyle'], {
	      path: path,
	      stroke: stroke
	    });

	    if (!delegateEl) {
	      delegateEl = delegaRootGroup.addShape('path', {
	        attrs: attrs,
	        capture: false,
	        zIndex: Global.zIndex.delegate
	      });
	      this.set('delegateEl', delegateEl);
	    } else {
	      delegateEl.attr(attrs);
	    }
	  },

	  /**
	   * 获取数据模型
	   * @return {Object} model
	   */
	  getModel: function getModel() {
	    return this.get('model');
	  },

	  /**
	   * 更新数据模型
	   * @param {Object} cfg 配置项
	   */
	  updateModel: function updateModel(cfg) {
	    var model = this.getModel();
	    Util.mix(model, cfg);
	  },

	  /**
	   * 获取选中时显示的点
	   */
	  getControlPoints: function getControlPoints() {},

	  /**
	   * 获取委托对象的path
	   */
	  getDelegationPath: function getDelegationPath() {},

	  /**
	   * 隐藏委托图形
	   */
	  hideDelegation: function hideDelegation() {
	    var delegateEl = this.get('delegateEl');
	    delegateEl && delegateEl.remove();
	    this.set('delegateEl', null);
	  },

	  /**
	   * 设置样式
	   * @param {Object} attrs 样式配置
	   */
	  style: function style(attrs) {
	    var group = this.get('group');
	    Util.traverseTree(group, function (child) {
	      child.attr(attrs);
	    });
	  }
	});

	module.exports = Item;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 为元素提供一些简易的查询方法
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);

	var Mixin = function Mixin() {};

	Util.augment(Mixin, {
	  /**
	   * 检查元素是否包含指定的 class
	   * @param   {String}      className 类名
	   * @return  {Boolean}     boolean   结果
	   */
	  hasClass: function hasClass(className) {
	    var clasees = this.get('class');
	    if (clasees && clasees.indexOf(className) !== -1) {
	      return true;
	    }
	    return false;
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 基类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Shape = {};

	var GeomShape = {
	  defaultShapeType: null,
	  getShape: function getShape(type) {
	    var self = this;
	    var shape = self[type] || self[self.defaultShapeType] || Shape.ShapeBase;
	    return shape;
	  },
	  draw: function draw(type, cfg, container) {
	    var shape = this.getShape(type);
	    var style = shape.style(cfg);
	    if (style) {
	      if (Util.isObject(cfg.style)) {
	        cfg.style = Util.mix({}, style, cfg.style);
	      } else {
	        cfg.style = style;
	      }
	    }
	    var rst = shape.draw(cfg, container);
	    shape.afterDraw(cfg, container, rst);
	    return rst;
	  }
	};

	var ShapeBase = {
	  afterDraw: function afterDraw() {},
	  draw: function draw() {},
	  style: function style() {}
	};

	function getDefaultShape(geomClass, shapeType, extendShape) {
	  if (extendShape) {
	    return geomClass.getShape(extendShape);
	  }
	  return geomClass.getShape(shapeType);
	}

	// 注册 Geometry 获取图形的入口
	Shape.registGeom = function (geomType, cfg) {
	  var className = Util.ucfirst(geomType);
	  var geomObj = Util.mix({}, GeomShape, cfg);
	  Shape[className] = geomObj;
	  geomObj.className = className;
	  return geomObj;
	};

	// 注册节点
	Shape.registNode = function (shapeType, cfg, extendShape) {
	  var geomClass = Shape.Node;
	  var defaultShape = getDefaultShape(geomClass, shapeType, extendShape);
	  var shapeObj = Util.mix({}, defaultShape, cfg);

	  geomClass[shapeType] = shapeObj;
	  return shapeObj;
	};

	// 注册边
	Shape.registEdge = function (shapeType, cfg, extendShape) {
	  var geomClass = Shape.Edge;
	  var defaultShape = getDefaultShape(geomClass, shapeType, extendShape);
	  var shapeObj = Util.mix({}, defaultShape, cfg);
	  geomClass[shapeType] = shapeObj;
	  return shapeObj;
	};

	// 获得 Shape
	Shape.getShape = function (shapeType) {
	  var self = this;
	  shapeType = Util.ucfirst(shapeType);
	  return self[shapeType] || Shape.ShapeBase;
	};

	Shape.GeomShape = GeomShape;
	Shape.ShapeBase = ShapeBase;
	module.exports = Shape;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 基础工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var BaseUtil = {};
	Util.mix(BaseUtil, {
	  // 遍历图形树
	  traverseTree: function traverseTree(root, callback) {
	    var children = root.get('children');
	    Util.each(children, function (child) {
	      callback(child, root);
	      if (child.get('children')) {
	        Util.traverseTree(child, callback);
	      }
	    });
	  },

	  /**
	   * 判断子项是否是节点
	   * @param  {Object}  item 子项
	   * @return {Boolean} 布尔值
	   */
	  isNode: function isNode(item) {
	    return item && Util.isObject(item) && item.get('type') === 'node';
	  },

	  /**
	   * 判断子项是否是边
	   * @param  {Object}  item 子项
	   * @return {Boolean} 布尔值
	   */
	  isEdge: function isEdge(item) {
	    return item && Util.isObject(item) && item.get('type') === 'edge';
	  },

	  /**
	   * 对象转数组
	   * @param   {Object}      obj 对象
	   * @return  {Array}       rst 返回数组
	   */
	  objectToValues: function objectToValues(obj) {
	    var rst = [];
	    var i = void 0;

	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        rst.push(obj[i]);
	      }
	    }
	    return rst;
	  },

	  // 确保一帧 （16 ms）内只执行一次
	  frameDraw: function frameDraw(drawFrameObj) {
	    function drawInner() {
	      drawFrameObj.animateHandler = Util.requestAnimationFrame(function () {
	        try {
	          drawFrameObj.callback();
	        } catch (ev) {
	          // 异常中断
	          console.warn(ev);
	        }
	        drawFrameObj.animateHandler = undefined;
	      });
	    }
	    if (drawFrameObj.animateHandler === undefined) {
	      drawInner();
	    }
	  },

	  // 画标注
	  drawLabel: function drawLabel(group, attrs, zIndex) {
	    return group.addShape('text', {
	      attrs: attrs,
	      class: 'label',
	      zIndex: zIndex,
	      freezePoint: {
	        x: attrs.x,
	        y: attrs.y
	      }
	    });
	  },

	  // 获取九宫格坐标
	  getNineBoxPosition: function getNineBoxPosition(position, containerBox, width, height, margin) {
	    var startPoint = {};
	    switch (position) {
	      case 'tl':
	        startPoint.y = margin[0];
	        startPoint.x = margin[3];
	        break;
	      case 'lc':
	        startPoint.y = (containerBox.height - height) / 2;
	        startPoint.x = margin[3];
	        break;
	      case 'bl':
	        startPoint.y = containerBox.height - height - margin[2];
	        startPoint.x = margin[3];
	        break;
	      case 'cc':
	        startPoint.y = (containerBox.height - height) / 2;
	        startPoint.x = (containerBox.width - width) / 2;
	        break;
	      case 'tc':
	        startPoint.y = margin[0];
	        startPoint.x = (containerBox.width - width) / 2;
	        break;
	      case 'tr':
	        startPoint.y = margin[0];
	        startPoint.x = containerBox.width - width - margin[1];
	        break;
	      case 'rc':
	        startPoint.y = (containerBox.height - height) / 2;
	        startPoint.x = containerBox.width - width - margin[1];
	        break;
	      case 'br':
	        startPoint.y = containerBox.height - height - margin[2];
	        startPoint.x = containerBox.width - width - margin[1];
	        break;
	      case 'bc':
	        startPoint.y = containerBox.height - height - margin[2];
	        startPoint.x = (containerBox.width - width) / 2;
	        break;
	      default:
	        startPoint.y = containerBox.minX + margin[0];
	        startPoint.x = containerBox.minY + margin[3];
	        break;
	    }
	    startPoint.x += containerBox.x;
	    startPoint.y += containerBox.y;
	    return startPoint;
	  }
	});

	module.exports = BaseUtil;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 数学工具类
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var MathUtil = __webpack_require__(8);
	var Matrix = __webpack_require__(3);
	var Vector = Matrix.Vector2;
	var Vector3 = Matrix.Vector3;
	var inDis = 2; // 判断共线的最小距离
	var tolerance = 0.001;

	Util.mix(MathUtil, {
	  /**
	   * 点在矩形分割的哪个象限
	   * @param   {Object}      rect  矩形
	   * @param   {Object}      point 点
	   * @return  {Number}      rst   象限 0 上象限， 1 右象限， 2 下象限， 3左象限
	   */
	  getpointInRectQuadrant: function getpointInRectQuadrant(rect, point) {
	    var v1 = new Vector(rect.maxX - rect.minX, rect.minY - rect.maxY);
	    var v2 = new Vector(rect.maxX - rect.minX, rect.maxY - rect.minY);
	    var v3 = new Vector(rect.minX - rect.maxX, rect.maxY - rect.minY);
	    var v4 = new Vector(rect.minX - rect.maxX, rect.minY - rect.maxY);
	    var v = new Vector(point.x - (rect.minX + rect.maxX) / 2, point.y - (rect.minY + rect.maxY) / 2);
	    if (MathUtil.getVectorAngle(v, v2) < MathUtil.getVectorAngle(v3, v2)) {
	      return 2;
	    }
	    if (MathUtil.getVectorAngle(v, v1) < MathUtil.getVectorAngle(v2, v1)) {
	      return 1;
	    }
	    if (MathUtil.getVectorAngle(v, v4) < MathUtil.getVectorAngle(v1, v4)) {
	      return 0;
	    }
	    if (MathUtil.getVectorAngle(v, v3) < MathUtil.getVectorAngle(v4, v3)) {
	      return 3;
	    }
	  },

	  /**
	   * 获得两向量间夹角 0～PI
	   * @param   {Object}      v1  矩形
	   * @param   {Object}      v2  点
	   * @return  {Number}      angle 夹角
	   */
	  getVectorAngle: function getVectorAngle(v1, v2) {
	    var angle = v1.angleTo(v2, true);
	    return angle;
	  },

	  /**
	   * 是否在区间内
	   * @param   {Number}       value  值
	   * @param   {Number}       min    最小值
	   * @param   {Number}       max    最大值
	   * @return  {Boolean}      bool   布尔
	   */
	  isBetween: function isBetween(value, min, max) {
	    return value >= min && value <= max;
	  },

	  /**
	   * 为点集附上变换
	   * @param  {Array}          points  点集
	   * @param  {Canvas.Element} element 元素
	   * @param  {Canvas.Group}   root    图组
	   * @return {Oject}          结果集
	   */
	  applyPoints: function applyPoints(points, element, root) {
	    var rst = [];
	    Util.each(points, function (point) {
	      rst.push(MathUtil.applyPoint(point, element, root));
	    });
	    return rst;
	  },

	  /**
	   * 为点附上变换
	   * @param  {object}         point   点
	   * @param  {Canvas.Element} element 元素
	   * @param  {Canvas.Group}   root    图组
	   * @return {Oject}          结果
	   */
	  applyPoint: function applyPoint(point, element, root) {
	    var v = new Vector3(point.x, point.y, 1);
	    element.apply(v, root);
	    point.x = v.x;
	    point.y = v.y;
	    return point;
	  },

	  /**
	   * 获取元素相对于根节点的包围盒
	   * @param  {Canvas.Element} element 元素
	   * @param  {Canvas.Group}   root    图组
	   * @return {object}         bbox    包围盒
	   */
	  getBBox: function getBBox(element, root) {
	    root = root ? root : element;
	    var bbox = element.getBBox();
	    var leftTop = MathUtil.applyPoint({
	      x: bbox.minX,
	      y: bbox.minY
	    }, element, root);
	    var rightBottom = MathUtil.applyPoint({
	      x: bbox.maxX,
	      y: bbox.maxY
	    }, element, root);
	    var minX = leftTop.x;
	    var minY = leftTop.y;
	    var maxX = rightBottom.x;
	    var maxY = rightBottom.y;
	    var box = {
	      minX: minX,
	      minY: minY,
	      x: minX,
	      y: minY,
	      maxX: maxX,
	      maxY: maxY,
	      centerX: (maxX + minX) / 2,
	      centerY: (maxY + minY) / 2,
	      width: maxX - minX,
	      height: maxY - minY
	    };
	    return box;
	  },

	  /**
	   * 基数排序
	   * @param  {Array} arr 未排序子节点集合
	   * @param  {Function} callback 回调
	   * @return {Array} 排序后子节点集合
	   */
	  radixSort: function radixSort(arr, callback) {
	    var mod = 10;
	    var dev = 1;
	    var counter = []; // 桶
	    var maxDigit = 1; // 最大位数
	    var rank = void 0;
	    var length = void 0;
	    var i = void 0;
	    var j = void 0;
	    var bucket = void 0;
	    var pos = void 0;
	    var value = void 0;

	    for (i = 0; i < arr.length; i++) {
	      rank = callback(arr[i]);
	      rank = parseInt(rank, 10);
	      length = rank.toString().length;
	      if (rank.toString().length > maxDigit) {
	        maxDigit = length;
	      }
	    }
	    for (i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
	      for (j = 0; j < arr.length; j++) {
	        bucket = callback(arr[j]);
	        bucket = parseInt(bucket % mod / dev, 10);
	        if (counter[bucket] === undefined) {
	          counter[bucket] = [];
	        }
	        counter[bucket].push(arr[j]);
	      }
	      pos = 0;
	      for (j = 0; j < counter.length; j++) {
	        value = undefined;
	        if (counter[j] !== undefined) {
	          value = counter[j].shift();
	          while (value !== undefined) {
	            arr[pos++] = value;
	            value = counter[j].shift();
	          }
	        }
	      }
	    }
	    return arr;
	  },

	  /**
	   * 矩阵关于某点缩放
	   * @param {Number} scale 缩放倍数
	   * @param {Object} point 点
	   * @param {Matrix} matrix 操作矩阵
	   */
	  scaleMatrix: function scaleMatrix(scale, point, matrix) {
	    point && matrix.translate(-point.x, -point.y);
	    matrix.scale(scale, scale);
	    point && matrix.translate(point.x, point.y);
	  },

	  /**
	   * 矩阵关于某点缩放
	   * @param  {Object}  point 点
	   * @param  {Matrix}  matrix 矩阵
	   * @param  {Boolean} tag 点或向量
	   * @return {Object}  结果
	   */
	  invertPoint: function invertPoint(point, matrix, tag) {
	    matrix = matrix.getInverse();
	    return MathUtil.converPoint(point, matrix, tag);
	  },

	  /**
	   * 矩阵关于某点缩放
	   * @param  {Object}  point 点
	   * @param  {Matrix}  matrix 矩阵
	   * @param  {Boolean} tag 点或向量
	   * @return {Object}  结果
	   */
	  converPoint: function converPoint(point, matrix, tag) {
	    if (tag === undefined) tag = 1;
	    var v = new Vector3(point.x, point.y, tag);
	    v.applyMatrix(matrix);
	    return {
	      x: v.x,
	      y: v.y
	    };
	  },

	  /**
	   * 线段和矩形交点
	   * @param  {Object} rect 矩形
	   * @param  {Object} point 点
	   * @param  {Object} rst 交点
	   * @return {Object} 交点结果集合
	   */
	  getRectIntersect: function getRectIntersect(rect, point) {
	    var x = rect.x;
	    var y = rect.y;
	    var width = rect.width;
	    var height = rect.height;
	    var cx = x + width / 2;
	    var cy = y + height / 2;
	    var points = [];
	    var center = {
	      x: cx,
	      y: cy
	    };
	    points.push({
	      x: x,
	      y: y
	    });
	    points.push({
	      x: x + width,
	      y: y
	    });
	    points.push({
	      x: x + width,
	      y: y + height
	    });
	    points.push({
	      x: x,
	      y: y + height
	    });
	    points.push({
	      x: x,
	      y: y
	    });
	    var rst = null;
	    for (var i = 1; i < points.length; i++) {
	      rst = MathUtil.getLineIntersect(points[i - 1], points[i], center, point);
	      if (rst) {
	        break;
	      }
	    }
	    return rst;
	  },

	  /**
	   * 两线段交点
	   * @param  {Object}  p0 第一条线段起点
	   * @param  {Object}  p1 第一条线段终点
	   * @param  {Object}  p2 第二条线段起点
	   * @param  {Object}  p3 第二条线段终点
	   * @return {Object}  交点
	   */
	  getLineIntersect: function getLineIntersect(p0, p1, p2, p3) {
	    var E = MathUtil.vector(p0, p2);
	    var D0 = MathUtil.vector(p0, p1);
	    var D1 = MathUtil.vector(p2, p3);
	    var kross = D0.x * D1.y - D0.y * D1.x;
	    var sqrKross = kross * kross;
	    var sqrLen0 = D0.x * D0.x + D0.y * D0.y;
	    var sqrLen1 = D1.x * D1.x + D1.y * D1.y;
	    var point = null;
	    if (sqrKross > tolerance * sqrLen0 * sqrLen1) {
	      var s = (E.x * D1.y - E.y * D1.x) / kross;
	      var t = (E.x * D0.y - E.y * D0.x) / kross;
	      if (MathUtil.isBetween(s, 0, 1) && MathUtil.isBetween(t, 0, 1)) {
	        point = {
	          x: p0.x + s * D0.x,
	          y: p0.y + s * D0.y
	        };
	      }
	    }
	    return point;
	  },

	  /**
	   * 获取一个点关于一个点集的最近点对
	   * @param {Array} points 点集合
	   * @param {Object} point 目标点
	   * @return {Object} rst 逼近点
	   */
	  getSnapPoint: function getSnapPoint(points, point) {
	    var min = MathUtil.distance(points[0], point, false);
	    var rst = points[0];
	    for (var i = 1; i < points.length; i++) {
	      var nextPoint = points[i];
	      var dis = MathUtil.distance(nextPoint, point, false);
	      if (dis < min) {
	        rst = nextPoint;
	        min = dis;
	      }
	    }
	    return rst;
	  },

	  /**
	   * 两点之间距离
	   * @param {Object} p1 起点
	   * @param {Object} p2 终点
	   * @param {Boolean} bool 是否开方
	   * @return {Object} rst 距离
	   */
	  distance: function distance(p1, p2, bool) {
	    var rst = (p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y);
	    if (bool === false) {
	      // 比较大小时直接返回，节约计算
	      return rst;
	    }
	    return Math.sqrt(rst);
	  },

	  /**
	   * 点是否在矩形内
	   * @param  {Object}   p 点
	   * @param  {Number}   minX 最小X
	   * @param  {Number}   minY 最小Y
	   * @param  {Number}   maxX 最大X
	   * @param  {Number}   maxY 最大Y
	   * @return {Boolean}  布尔值
	   */
	  isInRect: function isInRect(p, minX, minY, maxX, maxY) {
	    return p.x < maxX && p.x > minX && p.y < maxY && p.y > minY;
	  },

	  /**
	   * 点是否在线段上
	   * @param  {Object}  p1 线段起点
	   * @param  {Object}  p2 线段终点
	   * @param  {Object}  p 点
	   * @return {Boolean} 布尔值
	   */
	  isInSegment: function isInSegment(p1, p2, p) {
	    if (!p1 || !p2 || !p) return false;
	    var dis = MathUtil.segmentDistance(p1, p2, p);
	    return dis !== Infinity && dis < inDis;
	  },

	  /**
	   * 点到线段的距离，如果点的投影不在线段上则返回无穷大
	   * @param {Object} p1 线段起点
	   * @param {Object} p2 线段终点
	   * @param {Object} p 点
	   * @return {Number} 距离
	   */
	  segmentDistance: function segmentDistance(p1, p2, p) {
	    var v1 = MathUtil.vector(p1, p);
	    var v2 = MathUtil.vector(p2, p);
	    var v = MathUtil.vector(p1, p2);
	    var a1 = v1.angle(v);
	    var a2 = v2.angle(v);
	    a1 = a1 - Math.PI / 2 > 0 ? 1 : 0;
	    a2 = a2 - Math.PI / 2 > 0 ? 1 : 0;

	    if (a1 === a2) return Infinity;
	    var angle = v.angle(v1);
	    var len = v.length();
	    return Math.abs(len * Math.sin(angle));
	  },

	  /**
	   * 生产向量
	   * @param  {Object}  p0 线段起点
	   * @param  {Object}  p1 线段终点
	   * @return {Vector2} 二维向量
	   */
	  vector: function vector(p0, p1) {
	    return new Vector(p1.x - p0.x, p1.y - p0.y);
	  },

	  /**
	   * 生成随机ID
	   * @return {String} 随机id
	   */
	  guid: function guid() {
	    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
	      var r = Math.random() * 16 | 0;
	      var v = c === 'x' ? r : r & 0x3 | 0x8;
	      return v.toString(16);
	    });
	  }
	});

	module.exports = MathUtil;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var VALID_DIRECTIONS = __webpack_require__(174);
	var isHorizontal = __webpack_require__(181);
	var setAnchors = __webpack_require__(71);
	var separateTree = __webpack_require__(70);

	var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

	module.exports = function (root, options, layoutAlgrithm) {
	  var direction = options.direction || DEFAULT_DIRECTION;
	  options.isHorizontal = isHorizontal(direction);
	  if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
	    throw new TypeError('Invalid direction: ' + direction);
	  }

	  if (direction === VALID_DIRECTIONS[0]) {
	    // LR
	    layoutAlgrithm(root, options);
	    setAnchors(root, 'L', 'R', options);
	  } else if (direction === VALID_DIRECTIONS[1]) {
	    // RL
	    layoutAlgrithm(root, options);
	    root.right2left();
	    // anchors
	    setAnchors(root, 'R', 'L', options);
	  } else if (direction === VALID_DIRECTIONS[2]) {
	    // TB
	    layoutAlgrithm(root, options);
	    setAnchors(root, 'T', 'B', options);
	  } else if (direction === VALID_DIRECTIONS[3]) {
	    // BT
	    layoutAlgrithm(root, options);
	    root.bottom2top();
	    setAnchors(root, 'B', 'T', options);
	  } else if (direction === VALID_DIRECTIONS[4] || direction === VALID_DIRECTIONS[5]) {
	    // H or V
	    // separate into left and right trees
	    var _separateTree = separateTree(root, options),
	        left = _separateTree.left,
	        right = _separateTree.right;
	    // do layout for left and right trees


	    layoutAlgrithm(left, options);
	    layoutAlgrithm(right, options);
	    if (options.isHorizontal) {
	      setAnchors(left, 'R', 'L', options);
	      setAnchors(right, 'L', 'R', options);
	    } else {
	      setAnchors(left, 'B', 'T', options);
	      setAnchors(right, 'T', 'B', options);
	    }
	    options.isHorizontal ? left.right2left() : left.bottom2top();
	    // combine left and right trees
	    right.translate(left.x - right.x, left.y - right.y);
	    // translate root
	    root.x = left.x;
	    root.y = right.y;
	    setAnchors(root, 'C', 'C', options, true);
	    var bb = root.getBoundingBox();
	    if (options.isHorizontal) {
	      if (bb.top < 0) {
	        root.translate(0, -bb.top);
	      }
	    } else {
	      if (bb.left < 0) {
	        root.translate(-bb.left, 0);
	      }
	    }
	  }
	  root.translate(-(root.x + root.width / 2 + root.hgap), -(root.y + root.height / 2 + root.vgap));
	  root.eachNode(function (node) {
	    var data = node.data;
	    data.x = node.x + node.width / 2 + node.hgap;
	    data.y = node.y + node.height / 2 + node.vgap;
	    data.align = node.align;
	    data.inAnchor = node.inAnchor ? [node.inAnchor.x, node.inAnchor.y] : null;
	    data.outAnchor = node.outAnchor ? [node.outAnchor.x, node.outAnchor.y] : null;
	  });
	  return root;
	};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PEM = __webpack_require__(176);
	var DEFAULT_HEIGHT = PEM * 2;
	var DEFAULT_GAP = PEM;

	var DEFAULT_OPTIONS = {
	  getId: function getId(d) {
	    return d.id || d.name;
	  },
	  getHGap: function getHGap(d) {
	    return d.hgap || DEFAULT_GAP;
	  },
	  getVGap: function getVGap(d) {
	    return d.vgap || DEFAULT_GAP;
	  },
	  getChildren: function getChildren(d) {
	    return d.children;
	  },
	  getHeight: function getHeight(d) {
	    return d.height || DEFAULT_HEIGHT;
	  },
	  getWidth: function getWidth(d) {
	    var name = d.name || ' ';
	    return d.width || name.split('').length * PEM; // FIXME DO NOT get width like this
	  }
	};

	var Node = function () {
	  function Node(data) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var isolated = arguments[2];

	    _classCallCheck(this, Node);

	    var me = this;
	    me.vgap = me.hgap = 0;
	    if (data instanceof Node) return data;
	    me.data = data;
	    /*
	     * Gaps: filling space between nodes
	     * (x, y) ----------------------
	     * |            hgap            |
	     * |    --------------------    h
	     * | v |                    |   e
	     * | g |                    |   i
	     * | a |                    |   g
	     * | p |                    |   h
	     * |   ---------------------    t
	     * |                            |
	     *  -----------width------------
	     */
	    var hgap = (options.getHGap || DEFAULT_OPTIONS.getHGap)(data);
	    var vgap = (options.getVGap || DEFAULT_OPTIONS.getVGap)(data);
	    /*
	     * BBox: start point, width, height, etc.
	     * (x, y) ---width--->| (x+width, y)
	     *   |                |
	     *  height            |
	     *   |                |
	     * (x, y+height)----->| (x+width, y+height)
	     */
	    me.width = (options.getWidth || DEFAULT_OPTIONS.getWidth)(data);
	    me.height = (options.getHeight || DEFAULT_OPTIONS.getHeight)(data);
	    me.id = (options.getId || DEFAULT_OPTIONS.getId)(data);
	    me.x = me.y = 0;
	    /*
	     * Anchors: points that edges linked to
	     * (0, 0) --------> (0, 1)
	     *   |                |
	     *   |   (0.5, 0.5)   |
	     *   |                |
	     * (0, 1) --------> (1, 1)
	     */
	    me.inAnchor = {
	      x: 0,
	      y: 0.5
	    };
	    me.outAnchor = {
	      x: 1,
	      y: 0.5
	    };
	    me.depth = 0;
	    if (!isolated && !data.isCollapsed) {
	      var nodes = [me];
	      var node = nodes.pop();
	      while (node) {
	        if (!node.data.isCollapsed) {
	          var children = (options.getChildren || DEFAULT_OPTIONS.getChildren)(node.data);
	          var length = children ? children.length : 0;
	          node.children = [];
	          if (children && length) {
	            for (var i = 0; i < length; i++) {
	              var child = new Node(children[i], options);
	              node.children.push(child);
	              nodes.push(child);
	              child.parent = node;
	              child.depth = node.depth + 1;
	            }
	          }
	        }
	        node = nodes.pop();
	      }
	    }
	    if (!me.children) {
	      me.children = [];
	    }
	    me.addGap(hgap, vgap);
	  }

	  Node.prototype.isRoot = function isRoot() {
	    return this.depth === 0;
	  };

	  Node.prototype.isLeaf = function isLeaf() {
	    return this.children.length === 0;
	  };

	  Node.prototype.addGap = function addGap(hgap, vgap) {
	    var me = this;
	    me.hgap += hgap;
	    me.vgap += vgap;
	    me.width += 2 * hgap;
	    me.height += 2 * vgap;
	  };

	  Node.prototype.eachNode = function eachNode(callback) {
	    // depth first traverse
	    var me = this;
	    var nodes = [me];
	    var current = nodes.pop();
	    while (current) {
	      callback(current);
	      nodes = nodes.concat(current.children);
	      current = nodes.pop();
	    }
	  };

	  Node.prototype.DFTraverse = function DFTraverse(callback) {
	    // Depth First traverse
	    this.eachNode(callback);
	  };

	  Node.prototype.BFTraverse = function BFTraverse(callback) {
	    // Breadth First traverse
	    var me = this;
	    var nodes = [me];
	    var current = nodes.shift();
	    while (current) {
	      callback(current);
	      nodes = nodes.concat(current.children);
	      current = nodes.shift();
	    }
	  };

	  Node.prototype.getBoundingBox = function getBoundingBox() {
	    var bb = {
	      left: Number.MAX_VALUE,
	      top: Number.MAX_VALUE,
	      width: 0,
	      height: 0
	    };
	    this.eachNode(function (node) {
	      bb.left = Math.min(bb.left, node.x);
	      bb.top = Math.min(bb.top, node.y);
	      bb.width = Math.max(bb.width, node.x + node.width);
	      bb.height = Math.max(bb.height, node.y + node.height);
	    });
	    return bb;
	  };

	  // translate

	  Node.prototype.translate = function translate() {
	    var tx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var ty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    this.eachNode(function (node) {
	      node.x += tx;
	      node.y += ty;
	    });
	  };

	  Node.prototype.right2left = function right2left() {
	    var me = this;
	    var bb = me.getBoundingBox();
	    me.eachNode(function (node) {
	      node.x = node.x - (node.x - bb.left) * 2 - node.width;
	      // node.x = - node.x;
	    });
	    me.translate(bb.width, 0);
	  };

	  Node.prototype.bottom2top = function bottom2top() {
	    var me = this;
	    var bb = me.getBoundingBox();
	    me.eachNode(function (node) {
	      node.y = node.y - (node.y - bb.top) * 2 - node.height;
	      // node.y = - node.y;
	    });
	    me.translate(0, bb.height);
	  };

	  Node.prototype.getCenterX = function getCenterX() {
	    var me = this;
	    return me.x + me.width / 2;
	  };

	  Node.prototype.getCenterY = function getCenterY() {
	    var me = this;
	    return me.y + me.height / 2;
	  };

	  Node.prototype.getActualWidth = function getActualWidth() {
	    var me = this;
	    return me.width - me.hgap * 2;
	  };

	  Node.prototype.getActualHeight = function getActualHeight() {
	    var me = this;
	    return me.height - me.vgap * 2;
	  };

	  Node.prototype.getAnchorPoint = function getAnchorPoint(anchor) {
	    var me = this;
	    var width = me.getActualWidth();
	    var height = me.getActualHeight();
	    return {
	      x: me.x + me.hgap + width * anchor.x,
	      y: me.y + me.vgap + height * anchor.y
	    };
	  };

	  return Node;
	}();

	module.exports = Node;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	/**
	 * @fileOverview calculate the color
	 * @author huangtong.ht@alipay.com
	 */

	'use strict';
	var RGB_REG = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/;

	function createTmp() {
	  var i = document.createElement('i');
	  i.title = 'Web Colour Picker';
	  i.style.display = 'none';
	  document.body.appendChild(i);
	  return i;
	}
	var colorCache = {};
	var iEl = null;
	module.exports = {
	  toRGB: function(color) {
	    if (!iEl) { // 防止防止在页头报错
	      iEl = createTmp();
	    }
	    var rst;
	    if (colorCache[color]) {
	      rst = colorCache[color];
	    } else {
	      iEl.style.color = color;
	      rst = document.defaultView.getComputedStyle(iEl, '').getPropertyValue('color');
	      var cArray = RGB_REG.exec(rst);
	      cArray.shift();
	      rst = this.arr2rgb(cArray);
	      colorCache[color] = rst;
	    }
	    return rst;
	  },
	  // value to hex
	  toHex: function(value) {
	    value = Math.round(value);
	    value = value.toString(16);
	    if (value.length === 1) {
	      value = '0' + value;
	    }
	    return value;
	  },
	  hsl2Rgb: function(hsl) {
	    // h,s,l ranges are in 0.0 - 1.0
	    var h = hsl[0];
	    var s = hsl[1];
	    var l = hsl[2];

	    var rgb = {};
	    if (s === 0) {
	      rgb.r = rgb.g = rgb.b = l;
	    } else {
	      var hue2rgb = function(p, q, t) {
	        if (t < 0) {
	          t += 1;
	        }
	        if (t > 1) {
	          t -= 1;
	        }
	        if (t < 1 / 6) {
	          return p + (q - p) * 6 * t;
	        }
	        if (t < 1 / 2) {
	          return q;
	        }
	        if (t < 2 / 3) {
	          return p + (q - p) * 6 * (2 / 3 - t);
	        }
	        return p;
	      };
	      var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
	      var q = (2 * l) - p;
	      rgb.r = hue2rgb(q, p, h + 1 / 3);
	      rgb.g = hue2rgb(q, p, h);
	      rgb.b = hue2rgb(q, p, h - 1 / 3);
	    }
	    rgb.r = Math.min(Math.round(rgb.r * 255), 255);
	    rgb.g = Math.min(Math.round(rgb.g * 255), 255);
	    rgb.b = Math.min(Math.round(rgb.b * 255), 255);

	    return '#' + this.toHex(rgb.r) + this.toHex(rgb.g) + this.toHex(rgb.b);
	  },
	  rgb2hsl: function(str) {
	    var rgb = this.rgb2arr(str);
	    var r = rgb[0] / 255;
	    var g = rgb[1] / 255;
	    var b = rgb[2] / 255;
	    var min = Math.min(r, g, b);
	    var max = Math.max(r, g, b);
	    var delta = max - min;
	    var h;
	    var s;
	    var l;

	    if (max === min) {
	      h = 0;
	    } else if (r === max) {
	      h = (g - b) / delta;
	    } else if (g === max) {
	      h = 2 + (b - r) / delta;
	    } else if (b === max) {
	      h = 4 + (r - g) / delta;
	    }
	    h = Math.min(h * 60, 360);
	    if (h < 0) {
	      h += 360;
	    }
	    l = (min + max) / 2;
	    if (max === min) {
	      s = 0;
	    } else if (l <= 0.5) {
	      s = delta / (max + min);
	    } else {
	      s = delta / (2 - max - min);
	    }
	    return [h / 360, s, l];
	  },
	  arr2rgb: function(arr) {
	    return '#' + this.toHex(arr[0]) + this.toHex(arr[1]) + this.toHex(arr[2]);
	  },
	  rgb2arr: function(str) {
	    var arr = [];
	    arr.push(parseInt(str.substr(1, 2), 16));
	    arr.push(parseInt(str.substr(3, 2), 16));
	    arr.push(parseInt(str.substr(5, 2), 16));
	    return arr;
	  }
	};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	/**
	 * @fileOverview 公共类
	 * @author hankaiai@126.com
	 */
	module.exports = {
	  prefix: 'g',
	  backupContext: document.createElement('canvas').getContext('2d'),
	  debug: false,
	  warn: function() {}
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 图形控件或者分组的基类
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Attributes = __webpack_require__(81);
	var Transform = __webpack_require__(82);
	var Animate = __webpack_require__(80);
	var Format = __webpack_require__(37);
	// var Vector3 = require('@ali/g-matrix').Vector3;
	var EventDispatcher = __webpack_require__(77);

	var SHAPE_ATTRS = [
	  'fillStyle',
	  'font',
	  'globalAlpha',
	  'lineCap',
	  'lineWidth',
	  'lineJoin',
	  'miterLimit',
	  'shadowBlur',
	  'shadowColor',
	  'shadowOffsetX',
	  'shadowOffsetY',
	  'strokeStyle',
	  'textAlign',
	  'textBaseline',
	  'lineDash'
	];

	var Element = function(cfg) {
	  this.__cfg = {
	    zIndex: 0,
	    capture: true,
	    visible: true,
	    destroyed: false
	  }; // 配置存放地

	  Util.simpleMix(this.__cfg, this.getDefaultCfg(), cfg); // Element.CFG不合并，提升性能 合并默认配置，用户配置->继承默认配置->Element默认配置
	  this.initAttrs(this.__cfg.attrs); // 初始化绘图属性
	  this.initTransform(); // 初始化变换
	  this.initEventDispatcher();
	  this.init(); // 类型初始化
	};

	Element.CFG = {
	  /**
	   * 唯一标示
	   * @type {Number}
	   */
	  id: null,
	  /**
	   * Z轴的层叠关系，Z值越大离用户越近
	   * @type {Number}
	   */
	  zIndex: 0,
	  /**
	   * Canvas对象
	   * @type: {Object}
	   */
	  canvas: null,
	  /**
	   * 父元素指针
	   * @type {Object}
	   */
	  parent: null,
	  /**
	   * 用来设置当前对象是否能被捕捉
	   * true 能
	   * false 不能
	   * 对象默认是都可以被捕捉的, 当capture为false时，group.getShape(x, y)方法无法获得该元素
	   * 通过将不必要捕捉的元素的该属性设置成false, 来提高捕捉性能
	   **/
	  capture: true,
	  /**
	   * 画布的上下文
	   * @type {Object}
	   */
	  context: null,
	  /**
	   * 是否显示
	   * @type {Boolean}
	   */
	  visible: true,
	  /**
	   * 是否被销毁
	   * @type: {Boolean}
	   */
	  destroyed: false
	};

	Util.augment(Element, Attributes, EventDispatcher, Transform, Animate, {
	  /**
	   * @protected
	   * 初始化
	   */
	  init: function() {
	    this.setSilent('animable', true);
	    var attrs = this.__attrs;
	    if (attrs && attrs.rotate) {
	      this.rotateAtStart(attrs.rotate);
	    }
	  },
	  getParent: function() {
	    return this.get('parent');
	  },
	  /**
	   * 获取默认的配置信息
	   * @protected
	   * @return {Object} 默认的属性
	   */
	  getDefaultCfg: function() {
	    return {};
	  },
	  /**
	   * 设置属性信息
	   * @protected
	   */
	  set: function(name, value) {
	    var m = '__set' + Util.ucfirst(name);

	    if (this[m]) {
	      value = this[m](value);
	    }
	    this.__cfg[name] = value;
	    return this;
	  },
	  /**
	   * 设置属性信息,不进行特殊处理
	   * @protected
	   */
	  setSilent: function(name, value) {
	    this.__cfg[name] = value;
	  },
	  /**
	   * 获取属性信息
	   * @protected
	   */
	  get: function(name) {
	    return this.__cfg[name];
	  },
	  /**
	   * 绘制自身
	   */
	  draw: function(context) {
	    if (this.get('destroyed')) {
	      return;
	    }
	    if (this.get('visible')) {
	      this.setContext(context);
	      this.drawInner(context);
	      this.restoreContext(context);
	    }
	  },
	  setContext: function(context) {
	    var clip = this.__attrs.clip;
	    context.save();
	    if (clip) {
	      // context.save();
	      clip.resetTransform(context);
	      clip.createPath(context);
	      context.clip();
	      // context.restore();
	    }
	    this.resetContext(context);
	    this.resetTransform(context);
	  },
	  restoreContext: function(context) {
	    context.restore();
	  },
	  /**
	   * @protected
	   * 设置绘图属性
	   */
	  resetContext: function(context) {
	    var elAttrs = this.__attrs;
	    // var canvas = this.get('canvas');
	    if (!this.isGroup) {
	      // canvas.registShape(this); // 快速拾取方案暂时不执行
	      for (var k in elAttrs) {
	        if (SHAPE_ATTRS.indexOf(k) > -1) { // 非canvas属性不附加
	          var v = elAttrs[k];
	          if (k === 'fillStyle') {
	            v = Format.parseStyle(v, this);
	          }
	          if (k === 'strokeStyle') {
	            v = Format.parseStyle(v, this);
	          }
	          if (k === 'lineDash' && context.setLineDash) {
	            if (Util.isArray(v)) {
	              context.setLineDash(v);
	            } else if (Util.isString(v)) {
	              context.setLineDash(v.split(' '));
	            }
	          } else {
	            context[k] = v;
	          }
	        }
	      }
	    }
	  },
	  /**
	   * @protected
	   * 绘制内部图形
	   */
	  drawInner: function(/* context */) {

	  },
	  show: function() {
	    this.set('visible', true);
	    return this;
	  },
	  hide: function() {
	    this.set('visible', false);
	    return this;
	  },
	  /**
	   * 删除自己, 从父元素中删除自己
	   * @param  {Boolean} [destroy=true]
	   */
	  remove: function(destroy) {
	    if (destroy === undefined) {
	      destroy = true;
	    }

	    if (this.get('parent')) {
	      var parent = this.get('parent');
	      var children = parent.get('children');
	      Util.remove(children, this);
	      // this.set('parent', null);
	    }

	    if (destroy) {
	      this.destroy();
	    }

	    return this;
	  },
	  destroy: function() {
	    var destroyed = this.get('destroyed');

	    if (destroyed) {
	      return;
	    }
	    this.__cfg = {};
	    this.__attrs = null;
	    this.__listeners = null;
	    this.__m = null;
	    this.set('destroyed', true);
	  },
	  __setZIndex: function(zIndex) {
	    this.__cfg.zIndex = zIndex;
	    if (Util.notNull(this.get('parent'))) {
	      this.get('parent').sort();
	    }
	    return zIndex;
	  },
	  __setAttrs: function(attrs) {
	    this.attr(attrs);
	    return attrs;
	  },
	  clone: function() {
	    return Util.clone(this);
	  },
	  getBBox: function() {
	    return {
	      minX: 0,
	      maxX: 0,
	      minY: 0,
	      maxY: 0
	    };
	  }
	});

	module.exports = Element;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var GMath = __webpack_require__(8);
	var GColor = __webpack_require__(16);

	var regexTags = /[MLHVQTCSAZ]([^MLHVQTCSAZ]*)/ig;
	var regexDot = /[^\s\,]+/ig;
	var regexLG = /^l\s*\(\s*([\d.]+)\s*\)\s*(.*)/i;
	var regexRG = /^r\s*\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)\s*(.*)/i;
	var regexPR = /^p\s*([axyn])\s+(.*)/i;
	var regexColorStop = /[\d.]+:(#[^\s]+|[^\)]+\))/ig;
	var numColorCache = {};

	function multiplyOpacity(color, opacity) {
	  if (opacity === undefined) {
	    return color;
	  }
	  color = new GColor(color);
	  color.multiplyA(opacity);
	  var type = color.getType();
	  if (type === 'hsl') {
	    return color.getHSLStyle();
	  } else if (type === 'rgb') {
	    return color.getRGBStyle();
	  }
	}

	function addStop(steps, gradient, opacity) {
	  var arr = steps.match(regexColorStop);
	  Util.each(arr, function(item) {
	    item = item.split(':');
	    var color = multiplyOpacity(item[1], opacity);
	    gradient.addColorStop(item[0], color);
	  });
	}

	function parseLineGradient(color, self, opacity) {
	  var arr = regexLG.exec(color);
	  var angle = GMath.mod(GMath.degreeToRad(parseFloat(arr[1])), Math.PI * 2);
	  var steps = arr[2];
	  var box = self.getBBox();
	  var start;
	  var end;

	  if (angle >= 0 && angle < 0.5 * Math.PI) {
	    start = {
	      x: box.minX,
	      y: box.minY
	    };
	    end = {
	      x: box.maxX,
	      y: box.maxY
	    };
	  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
	    start = {
	      x: box.maxX,
	      y: box.minY
	    };
	    end = {
	      x: box.minX,
	      y: box.maxY
	    };
	  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
	    start = {
	      x: box.maxX,
	      y: box.maxY
	    };
	    end = {
	      x: box.minX,
	      y: box.minY
	    };
	  } else {
	    start = {
	      x: box.minX,
	      y: box.maxY
	    };
	    end = {
	      x: box.maxX,
	      y: box.minY
	    };
	  }

	  var tanTheta = Math.tan(angle);
	  var tanTheta2 = tanTheta * tanTheta;

	  var x = ((end.x - start.x) + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
	  var y = tanTheta * ((end.x - start.x) + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
	  var context = self.get('context');
	  var gradient = context.createLinearGradient(start.x, start.y, x, y);
	  addStop(steps, gradient, opacity);
	  return gradient;
	}

	function parseRadialGradient(color, self, opacity) {
	  var arr = regexRG.exec(color);
	  var fx = parseFloat(arr[1]);
	  var fy = parseFloat(arr[2]);
	  var fr = parseFloat(arr[3]);
	  var steps = arr[4];
	  var box = self.getBBox();
	  var context = self.get('context');
	  var width = box.maxX - box.minX;
	  var height = box.maxY - box.minY;
	  var r = Math.sqrt(width * width + height * height) / 2;
	  var gradient = context.createRadialGradient(box.minX + width * fx, box.minY + height * fy, fr, box.minX + width / 2, box.minY + height / 2, r);
	  addStop(steps, gradient, opacity);
	  return gradient;
	}

	function parsePattern(color, self) {
	  var arr = regexPR.exec(color);
	  var repeat = arr[1];
	  var id = arr[2];
	  switch (repeat) {
	    case 'a':
	      repeat = 'repeat';
	      break;
	    case 'x':
	      repeat = 'repeat-x';
	      break;
	    case 'y':
	      repeat = 'repeat-y';
	      break;
	    case 'n':
	      repeat = 'no-repeat';
	      break;
	    default:
	      repeat = 'no-repeat';
	  }
	  var img = document.getElementById(id);
	  var context = self.get('context');
	  var pattern = context.createPattern(img, repeat);
	  return pattern;
	}

	module.exports = {
	  parsePath: function(path) {
	    path = path || [];
	    if (Util.isArray(path)) {
	      return path;
	    }

	    if (Util.isString(path)) {
	      path = path.match(regexTags);
	      Util.each(path, function(item, index) {
	        item = item.match(regexDot);
	        if (item[0].length > 1) {
	          var tag = item[0].charAt(0);
	          item.splice(1, 0, item[0].substr(1));
	          item[0] = tag;
	        }
	        Util.each(item, function(sub, i) {
	          if (!isNaN(sub)) {
	            item[i] = +sub;
	          }
	        });
	        path[index] = item;
	      });
	      return path;
	    }
	  },
	  parseStyle: function(color, self, opacity) {
	    if (Util.isString(color)) {
	      if (color[1] === '(' || color[2] === '(') {
	        if (color[0] === 'l') { // regexLG.test(color)
	          return parseLineGradient(color, self, opacity);
	        } else if (color[0] === 'r') { // regexRG.test(color)
	          return parseRadialGradient(color, self, opacity);
	        } else if (color[0] === 'p') {// regexPR.test(color)
	          return parsePattern(color, self);
	        }
	      }
	      if (Util.isNull(opacity)) {
	        return color;
	      }
	      return multiplyOpacity(color, opacity);
	    }
	  },
	  numberToColor: function(num) {
	    // 增加缓存
	    var color = numColorCache[num];
	    if (!color) {
	      var str = num.toString(16);
	      for (var i = str.length; i < 6; i++) {
	        str = '0' + str;
	      }
	      color = '#' + str;
	      numColorCache[num] = color;
	    }
	    return color;
	  }
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	var Common = __webpack_require__(35);

	var G = {
	  Group: __webpack_require__(79),
	  Shape: __webpack_require__(5),
	  Rect: __webpack_require__(52),
	  Circle: __webpack_require__(40),
	  Ellipse: __webpack_require__(42),
	  Path: __webpack_require__(48),
	  Text: __webpack_require__(53),
	  Line: __webpack_require__(46),
	  Image: __webpack_require__(44),
	  Polygon: __webpack_require__(49),
	  Polyline: __webpack_require__(50),
	  Arc: __webpack_require__(39),
	  Fan: __webpack_require__(43),
	  Cubic: __webpack_require__(41),
	  Quadratic: __webpack_require__(51),
	  Marker: __webpack_require__(47),
	  debug: function(debug) {
	    Common.debug = debug;
	  }
	};

	module.exports = G;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview arc
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */

	var Util = __webpack_require__(1);
	var Vector2 = __webpack_require__(3).Vector2;
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var ArcMath = __webpack_require__(20);
	var Arrow = __webpack_require__(12);

	var Arc = function(cfg) {
	  Arc.superclass.constructor.call(this, cfg);
	};

	Arc.ATTRS = {
	  x: 0,
	  y: 0,
	  r: 0,
	  startAngle: 0,
	  endAngle: 0,
	  clockwise: false,
	  lineWidth: 1,
	  arrow: false
	};

	Util.extend(Arc, Shape);

	Util.augment(Arc, {
	  canStroke: true,
	  type: 'arc',
	  getDefaultAttrs: function() {
	    return {
	      x: 0,
	      y: 0,
	      r: 0,
	      startAngle: 0,
	      endAngle: 0,
	      clockwise: false,
	      lineWidth: 1,
	      arrow: false
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;
	    var lineWidth = attrs.lineWidth;
	    var halfWidth = lineWidth / 2;
	    var box = ArcMath.box(cx, cy, r, startAngle, endAngle, clockwise);
	    box.minX -= halfWidth;
	    box.minY -= halfWidth;
	    box.maxX += halfWidth;
	    box.maxY += halfWidth;
	    return box;
	  },
	  isPointInPath: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;
	    var lineWidth = attrs.lineWidth;

	    if (this.hasStroke()) {
	      return Inside.arcline(cx, cy, r, startAngle, endAngle, clockwise, lineWidth, x, y);
	    }
	    return false;
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;
	    var lineWidth = attrs.lineWidth;
	    var arrow = attrs.arrow;
	    context = context || self.get('context');

	    context.beginPath();
	    context.arc(cx, cy, r, startAngle, endAngle, clockwise);

	    if (arrow) {
	      var end = {
	        x: cx + r * Math.cos(endAngle),
	        y: cy + r * Math.sin(endAngle)
	      };

	      var v = new Vector2(-r * Math.sin(endAngle), r * Math.cos(endAngle));
	      if (clockwise) {
	        v.multiplyScaler(-1);
	      }
	      Arrow.makeArrow(context, v, end, lineWidth);
	    }
	  }
	});

	module.exports = Arc;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview circle
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);

	var Circle = function(cfg) {
	  Circle.superclass.constructor.call(this, cfg);
	};

	Circle.ATTRS = {
	  x: 0,
	  y: 0,
	  r: 0,
	  lineWidth: 1
	};

	Util.extend(Circle, Shape);

	Util.augment(Circle, {
	  canFill: true,
	  canStroke: true,
	  type: 'circle',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    var lineWidth = attrs.lineWidth;
	    var halfWidth = lineWidth / 2 + r;
	    return {
	      minX: cx - halfWidth,
	      minY: cy - halfWidth,
	      maxX: cx + halfWidth,
	      maxY: cy + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var fill = this.hasFill();
	    var stroke = this.hasStroke();
	    if (fill && stroke) {
	      return this.__isPointInFill(x, y) || this.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return this.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return this.__isPointInStroke(x, y);
	    }

	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;

	    return Inside.circle(cx, cy, r, x, y);
	  },
	  __isPointInStroke: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    var lineWidth = attrs.lineWidth;

	    return Inside.arcline(cx, cy, r, 0, Math.PI * 2, false, lineWidth, x, y);
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.r;
	    context = context || self.get('context');

	    context.beginPath();
	    context.arc(cx, cy, r, 0, Math.PI * 2, false);
	  }
	});

	module.exports = Circle;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Cubic
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Arrow = __webpack_require__(12);
	var CubicMath = __webpack_require__(15);
	var Vector2 = __webpack_require__(3).Vector2;

	var Cubic = function(cfg) {
	  Cubic.superclass.constructor.call(this, cfg);
	};

	Cubic.ATTRS = {
	  p1: null,
	  p2: null,
	  p3: null,
	  p4: null,
	  lineWidth: 1,
	  arrow: false
	};

	Util.extend(Cubic, Shape);

	Util.augment(Cubic, {
	  canStroke: true,
	  type: 'cubic',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var p4 = attrs.p4;
	    var i;
	    var l;

	    if (
	      Util.isNull(p1) ||
	      Util.isNull(p2) ||
	      Util.isNull(p3) ||
	      Util.isNull(p4)
	    ) {
	      return null;
	    }
	    var halfWidth = attrs.lineWidth / 2;

	    var xDim = CubicMath.extrema(p1[0], p2[0], p3[0], p4[0]);
	    for (i = 0, l = xDim.length; i < l; i++) {
	      xDim[i] = CubicMath.at(p1[0], p2[0], p3[0], p4[0], xDim[i]);
	    }
	    var yDim = CubicMath.extrema(p1[1], p2[1], p3[1], p4[1]);
	    for (i = 0, l = yDim.length; i < l; i++) {
	      yDim[i] = CubicMath.at(p1[1], p2[1], p3[1], p4[1], yDim[i]);
	    }
	    xDim.push(p1[0], p4[0]);
	    yDim.push(p1[1], p4[1]);

	    return {
	      minX: Math.min.apply(Math, xDim) - halfWidth,
	      maxX: Math.max.apply(Math, xDim) + halfWidth,
	      minY: Math.min.apply(Math, yDim) - halfWidth,
	      maxY: Math.max.apply(Math, yDim) + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var attrs = this.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var p4 = attrs.p4;
	    var lineWidth = attrs.lineWidth;

	    return Inside.cubicline(
	      p1[0], p1[1],
	      p2[0], p2[1],
	      p3[0], p3[1],
	      p4[0], p4[1],
	      lineWidth, x, y
	    );
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var p4 = attrs.p4;
	    var lineWidth = attrs.lineWidth;
	    var arrow = attrs.arrow;
	    context = context || self.get('context');
	    if (
	      Util.isNull(p1) ||
	      Util.isNull(p2) ||
	      Util.isNull(p3) ||
	      Util.isNull(p4)
	    ) {
	      return;
	    }

	    context.beginPath();
	    context.moveTo(p1[0], p1[1]);

	    if (arrow) {
	      var v = new Vector2(p4[0] - p3[0], p4[1] - p3[1]);
	      var end = Arrow.getEndPoint(v, new Vector2(p4[0], p4[1]), lineWidth);
	      context.bezierCurveTo(p2[0], p2[1], p3[0], p3[1], end.x, end.y);
	      Arrow.makeArrow(context, v, end, lineWidth);
	    } else {
	      context.bezierCurveTo(p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);
	    }
	  },
	  getPoint: function(t) {
	    var attrs = this.__attrs;
	    return {
	      x: CubicMath.at(attrs.p4[0], attrs.p3[0], attrs.p2[0], attrs.p1[0], t),
	      y: CubicMath.at(attrs.p4[1], attrs.p3[1], attrs.p2[1], attrs.p1[1], t)
	    };
	  }
	});

	module.exports = Cubic;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Ellipse
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Matrix = __webpack_require__(3);
	var Matrix3 = Matrix.Matrix3;
	var Vector3 = Matrix.Vector3;

	var Ellipse = function(cfg) {
	  Ellipse.superclass.constructor.call(this, cfg);
	};

	Ellipse.ATTRS = {
	  x: 0,
	  y: 0,
	  rx: 1,
	  ry: 1,
	  lineWidth: 1
	};

	Util.extend(Ellipse, Shape);

	Util.augment(Ellipse, {
	  canFill: true,
	  canStroke: true,
	  type: 'ellipse',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rx = attrs.rx;
	    var ry = attrs.ry;
	    var lineWidth = attrs.lineWidth;
	    var halfXWidth = rx + lineWidth / 2;
	    var halfYWidth = ry + lineWidth / 2;

	    return {
	      minX: cx - halfXWidth,
	      minY: cy - halfYWidth,
	      maxX: cx + halfXWidth,
	      maxY: cy + halfYWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var fill = this.hasFill();
	    var stroke = this.hasStroke();

	    if (fill && stroke) {
	      return this.__isPointInFill(x, y) || this.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return this.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return this.__isPointInStroke(x, y);
	    }

	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rx = attrs.rx;
	    var ry = attrs.ry;

	    var r = (rx > ry) ? rx : ry;
	    var scaleX = (rx > ry) ? 1 : rx / ry;
	    var scaleY = (rx > ry) ? ry / rx : 1;

	    var p = new Vector3(x, y, 1);
	    var m = new Matrix3();
	    m.scale(scaleX, scaleY);
	    m.translate(cx, cy);
	    var inm = m.getInverse();
	    p.applyMatrix(inm);

	    return Inside.circle(0, 0, r, p.x, p.y);
	  },
	  __isPointInStroke: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rx = attrs.rx;
	    var ry = attrs.ry;
	    var lineWidth = attrs.lineWidth;

	    var r = (rx > ry) ? rx : ry;
	    var scaleX = (rx > ry) ? 1 : rx / ry;
	    var scaleY = (rx > ry) ? ry / rx : 1;

	    var p = new Vector3(x, y, 1);
	    var m = new Matrix3();
	    m.scale(scaleX, scaleY);
	    m.translate(cx, cy);
	    var inm = m.getInverse();
	    p.applyMatrix(inm);

	    return Inside.arcline(0, 0, r, 0, Math.PI * 2, false, lineWidth, p.x, p.y);
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rx = attrs.rx;
	    var ry = attrs.ry;

	    context = context || self.get('context');
	    var r = (rx > ry) ? rx : ry;
	    var scaleX = (rx > ry) ? 1 : rx / ry;
	    var scaleY = (rx > ry) ? ry / rx : 1;

	    var m = new Matrix3();
	    m.scale(scaleX, scaleY);
	    m.translate(cx, cy);
	    var mo = m.to2DObject();
	    context.beginPath();
	    context.save();
	    context.transform(mo.a, mo.b, mo.c, mo.d, mo.e, mo.f);
	    context.arc(0, 0, r, 0, Math.PI * 2);
	    context.restore();
	    context.closePath();
	  }
	});

	module.exports = Ellipse;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 扇形
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var gMath = __webpack_require__(8);
	var ArcMath = __webpack_require__(20);
	var Matrix = __webpack_require__(3);
	var Vector2 = Matrix.Vector2;

	var Fan = function(cfg) {
	  Fan.superclass.constructor.call(this, cfg);
	};

	Fan.ATTRS = {
	  x: 0,
	  y: 0,
	  rs: 0,
	  re: 0,
	  startAngle: 0,
	  endAngle: 0,
	  clockwise: false,
	  lineWidth: 1
	};

	Util.extend(Fan, Shape);

	Util.augment(Fan, {
	  canFill: true,
	  canStroke: true,
	  type: 'fan',
	  getDefaultAttrs: function() {
	    return {
	      clockwise: false,
	      lineWidth: 1,
	      rs: 0,
	      re: 0
	    };
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rs = attrs.rs;
	    var re = attrs.re;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;
	    var lineWidth = attrs.lineWidth;

	    var boxs = ArcMath.box(cx, cy, rs, startAngle, endAngle, clockwise);
	    var boxe = ArcMath.box(cx, cy, re, startAngle, endAngle, clockwise);
	    var minX = Math.min(boxs.minX, boxe.minX);
	    var minY = Math.min(boxs.minY, boxe.minY);
	    var maxX = Math.max(boxs.maxX, boxe.maxX);
	    var maxY = Math.max(boxs.maxY, boxe.maxY);

	    var halfWidth = lineWidth / 2;
	    return {
	      minX: minX - halfWidth,
	      minY: minY - halfWidth,
	      maxX: maxX + halfWidth,
	      maxY: maxY + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var fill = this.hasFill();
	    var stroke = this.hasStroke();

	    if (fill && stroke) {
	      return this.__isPointInFill(x, y) || this.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return this.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return this.__isPointInStroke(x, y);
	    }
	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rs = attrs.rs;
	    var re = attrs.re;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;

	    var v1 = new Vector2(1, 0);
	    var subv = new Vector2(x - cx, y - cy);
	    var angle = v1.angleTo(subv);


	    var angle1 = ArcMath.nearAngle(angle, startAngle, endAngle, clockwise);

	    if (gMath.equal(angle, angle1)) {
	      var ls = subv.lengthSq();
	      if (rs * rs <= ls && ls <= re * re) {
	        return true;
	      }
	    }
	    return false;
	  },
	  __isPointInStroke: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rs = attrs.rs;
	    var re = attrs.re;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;
	    var lineWidth = attrs.lineWidth;

	    var ssp = {
	      x: Math.cos(startAngle) * rs + cx,
	      y: Math.sin(startAngle) * rs + cy
	    };
	    var sep = {
	      x: Math.cos(startAngle) * re + cx,
	      y: Math.sin(startAngle) * re + cy
	    };
	    var esp = {
	      x: Math.cos(endAngle) * rs + cx,
	      y: Math.sin(endAngle) * rs + cy
	    };
	    var eep = {
	      x: Math.cos(endAngle) * re + cx,
	      y: Math.sin(endAngle) * re + cy
	    };

	    if (Inside.line(ssp.x, ssp.y, sep.x, sep.y, lineWidth, x, y)) {
	      return true;
	    }

	    if (Inside.line(esp.x, esp.y, eep.x, eep.y, lineWidth, x, y)) {
	      return true;
	    }

	    if (Inside.arcline(cx, cy, rs, startAngle, endAngle, clockwise, lineWidth, x, y)) {
	      return true;
	    }

	    if (Inside.arcline(cx, cy, re, startAngle, endAngle, clockwise, lineWidth, x, y)) {
	      return true;
	    }

	    return false;
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var rs = attrs.rs;
	    var re = attrs.re;
	    var startAngle = attrs.startAngle;
	    var endAngle = attrs.endAngle;
	    var clockwise = attrs.clockwise;

	    var ssp = {
	      x: Math.cos(startAngle) * rs + cx,
	      y: Math.sin(startAngle) * rs + cy
	    };
	    var sep = {
	      x: Math.cos(startAngle) * re + cx,
	      y: Math.sin(startAngle) * re + cy
	    };
	    var esp = {
	      x: Math.cos(endAngle) * rs + cx,
	      y: Math.sin(endAngle) * rs + cy
	    };

	    context = context || self.get('context');
	    context.beginPath();
	    context.moveTo(ssp.x, ssp.y);
	    context.lineTo(sep.x, sep.y);
	    context.arc(cx, cy, re, startAngle, endAngle, clockwise);
	    context.lineTo(esp.x, esp.y);
	    context.arc(cx, cy, rs, endAngle, startAngle, !clockwise);
	    context.closePath();
	  }
	});

	module.exports = Fan;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 图像
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);

	var CImage = function(cfg) {
	  CImage.superclass.constructor.call(this, cfg);
	};

	CImage.ATTRS = {
	  x: 0,
	  y: 0,
	  img: undefined,
	  width: 0,
	  height: 0,
	  sx: null,
	  sy: null,
	  swidth: null,
	  sheight: null
	};

	Util.extend(CImage, Shape);

	Util.augment(CImage, {
	  type: 'image',
	  __afterSetAttrImg: function(img) {
	    this.__setAttrImg(img);
	  },
	  __afterSetAttrAll: function(params) {
	    if (params.img) {
	      this.__setAttrImg(params.img);
	    }
	  },
	  isHitBox: function() {
	    return false;
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var width = attrs.width;
	    var height = attrs.height;

	    return {
	      minX: x,
	      minY: y,
	      maxX: x + width,
	      maxY: y + height
	    };
	  },
	  isPointInPath: function(x, y) {
	    var attrs = this.__attrs;
	    if (this.get('toDraw') || !attrs.img) {
	      return false;
	    }
	    var rx = attrs.x;
	    var ry = attrs.y;
	    var width = attrs.width;
	    var height = attrs.height;
	    return Inside.rect(rx, ry, width, height, x, y);
	  },
	  __setLoading: function(loading) {
	    var canvas = this.get('canvas');
	    if (loading === false && this.get('toDraw') === true) {
	      this.__cfg.loading = false;
	      canvas.draw();
	    }
	    return loading;
	  },
	  __setAttrImg: function(img) {
	    var self = this;
	    var attrs = self.__attrs;
	    if (Util.isString(img)) {
	      var image = new Image();
	      image.onload = function() {
	        if (self.get('destroyed')) return false;
	        self.attr('imgSrc', img);
	        self.attr('img', image);
	        var callback = self.get('callback');
	        if (callback) {
	          callback.call(self);
	        }
	        self.set('loading', false);
	      };
	      image.src = img;
	      self.set('loading', true);
	    } else if (img instanceof Image) {
	      if (!attrs.width) {
	        self.attr('width', img.width);
	      }

	      if (!attrs.height) {
	        self.attr('height', img.height);
	      }
	      return img;
	    } else if (img instanceof HTMLElement && Util.isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS') {
	      if (!attrs.width) {
	        self.attr('width', Number(img.getAttribute('width')));
	      }

	      if (!attrs.height) {
	        self.attr('height', Number(img.getAttribute('height')));
	      }
	      return img;
	    } else if (img instanceof ImageData) {
	      if (!attrs.width) {
	        self.attr('width', img.width);
	      }

	      if (!attrs.height) {
	        self.attr('height', img.height);
	      }
	      return img;
	    } else {
	      return null;
	    }
	  },
	  drawInner: function(context) {
	    if (this.get('loading')) {
	      this.set('toDraw', true);
	      return;
	    }
	    this.__drawImage(context);
	  },
	  __drawImage: function(context) {
	    var attrs = this.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var img = attrs.img;
	    var width = attrs.width;
	    var height = attrs.height;
	    var sx = attrs.sx;
	    var sy = attrs.sy;
	    var swidth = attrs.swidth;
	    var sheight = attrs.sheight;
	    this.set('toDraw', false);

	    if (img instanceof Image || (img instanceof HTMLElement && Util.isString(img.nodeName) && img.nodeName.toUpperCase() === 'CANVAS')) {
	      if (
	        Util.isNull(sx) ||
	        Util.isNull(sy) ||
	        Util.isNull(swidth) ||
	        Util.isNull(sheight)
	      ) {
	        context.drawImage(img, x, y, width, height);
	        return;
	      }
	      if (
	        Util.notNull(sx) &&
	        Util.notNull(sy) &&
	        Util.notNull(swidth) &&
	        Util.notNull(sheight)
	      ) {
	        context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);
	        return;
	      }
	    } else if (img instanceof ImageData) {
	      context.putImageData(img, x, y, sx || 0, sy || 0, swidth || width, sheight || height);
	      return;
	    }
	    return;
	  }
	});

	module.exports = CImage;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var Shape = {
	  Rect: __webpack_require__(52),
	  Circle: __webpack_require__(40),
	  Ellipse: __webpack_require__(42),
	  Path: __webpack_require__(48),
	  Text: __webpack_require__(53),
	  Line: __webpack_require__(46),
	  Image: __webpack_require__(44),
	  Polygon: __webpack_require__(49),
	  Polyline: __webpack_require__(50),
	  Arc: __webpack_require__(39),
	  Fan: __webpack_require__(43),
	  Cubic: __webpack_require__(41),
	  Quadratic: __webpack_require__(51),
	  Marker: __webpack_require__(47)
	};

	module.exports = Shape;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 直线
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Arrow = __webpack_require__(12);
	var LineMath = __webpack_require__(21);
	var Matrix = __webpack_require__(3);
	var Vector2 = Matrix.Vector2;

	var Line = function(cfg) {
	  Line.superclass.constructor.call(this, cfg);
	};

	Line.ATTRS = {
	  x1: 0,
	  y1: 0,
	  x2: 0,
	  y2: 0,
	  lineWidth: 1,
	  arrow: false
	};

	Util.extend(Line, Shape);

	Util.augment(Line, {
	  canStroke: true,
	  type: 'line',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1,
	      arrow: false
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var x1 = attrs.x1;
	    var y1 = attrs.y1;
	    var x2 = attrs.x2;
	    var y2 = attrs.y2;
	    var lineWidth = attrs.lineWidth;

	    return LineMath.box(x1, y1, x2, y2, lineWidth);
	  },
	  isPointInPath: function(x, y) {
	    var attrs = this.__attrs;
	    var x1 = attrs.x1;
	    var y1 = attrs.y1;
	    var x2 = attrs.x2;
	    var y2 = attrs.y2;
	    var lineWidth = attrs.lineWidth;
	    if (this.hasStroke()) {
	      return Inside.line(x1, y1, x2, y2, lineWidth, x, y);
	    }

	    return false;
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var x1 = attrs.x1;
	    var y1 = attrs.y1;
	    var x2 = attrs.x2;
	    var y2 = attrs.y2;
	    var arrow = attrs.arrow;
	    var lineWidth = attrs.lineWidth;
	    context = context || self.get('context');
	    context.beginPath();
	    context.moveTo(x1, y1);
	    if (arrow) {
	      var v = new Vector2(x2 - x1, y2 - y1);
	      var end = Arrow.getEndPoint(v, new Vector2(x2, y2), lineWidth);
	      context.lineTo(end.x, end.y);
	      Arrow.makeArrow(context, v, end, lineWidth);
	    } else {
	      context.lineTo(x2, y2);
	    }
	  },
	  getPoint: function(t) {
	    var attrs = this.__attrs;
	    return {
	      x: LineMath.at(attrs.x1, attrs.x2, t),
	      y: LineMath.at(attrs.y1, attrs.y2, t)
	    };
	  }
	});

	module.exports = Line;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);

	var Marker = function(cfg) {
	  Marker.superclass.constructor.call(this, cfg);
	};

	Marker.Symbols = {
	  // 圆
	  circle: function(x, y, r, ctx) {
	    ctx.arc(x, y, r, 0, Math.PI * 2, false);
	  },
	  // 正方形
	  square: function(x, y, r, ctx) {
	    ctx.moveTo(x - r, y - r);
	    ctx.lineTo(x + r, y - r);
	    ctx.lineTo(x + r, y + r);
	    ctx.lineTo(x - r, y + r);
	    ctx.closePath();
	  },
	  // 菱形
	  diamond: function(x, y, r, ctx) {
	    ctx.moveTo(x - r, y);
	    ctx.lineTo(x, y - r);
	    ctx.lineTo(x + r, y);
	    ctx.lineTo(x, y + r);
	    ctx.closePath();
	  },
	  // 三角形
	  triangle: function(x, y, r, ctx) {
	    var diffX = r / 0.966;
	    var diffY = r;
	    ctx.moveTo(x, y - r);
	    ctx.lineTo(x + diffX, y + diffY);
	    ctx.lineTo(x - diffX, y + diffY);
	    ctx.closePath();
	  },
	  // 倒三角形
	  'triangle-down': function(x, y, r, ctx) {
	    var diffX = r / 0.966;
	    var diffY = r;
	    ctx.moveTo(x, y + r);
	    ctx.lineTo(x + diffX, y - diffY);
	    ctx.lineTo(x - diffX, y - diffY);
	    ctx.closePath();
	  }
	};

	Marker.ATTRS = {
	  path: null,
	  lineWidth: 1
	};

	Util.extend(Marker, Shape);

	Util.augment(Marker, {
	  type: 'marker',
	  canFill: true,
	  canStroke: true,
	  getDefaultAttrs: function() {
	    return {
	      x: 0,
	      y: 0,
	      lineWidth: 1
	    };
	  },
	  calculateBox: function() {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.radius;
	    var lineWidth = attrs.lineWidth;
	    var halfWidth = lineWidth / 2 + r;
	    return {
	      minX: cx - halfWidth,
	      minY: cy - halfWidth,
	      maxX: cx + halfWidth,
	      maxY: cy + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var attrs = this.__attrs;
	    var cx = attrs.x;
	    var cy = attrs.y;
	    var r = attrs.radius;
	    return Inside.circle(cx, cy, r, x, y);
	  },
	  createPath: function(context) {
	    var attrs = this.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var r = attrs.radius;
	    var symbol = attrs.symbol || 'circle';
	    var method;
	    if (Util.isFunction(symbol)) {
	      method = symbol;
	    } else {
	      method = Marker.Symbols[symbol];
	    }
	    context.beginPath();
	    method(x, y, r, context);
	  }/**/
	});

	module.exports = Marker;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Path
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @see http://www.w3.org/TR/2011/REC-SVG11-20110816/paths.html#PathData
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var PathSegment = __webpack_require__(84);
	var Format = __webpack_require__(37);
	var Arrow = __webpack_require__(12);
	var pathUtil = __webpack_require__(23);
	var CubicMath = __webpack_require__(15);
	var Matrix = __webpack_require__(3);
	var Vector2 = Matrix.Vector2;

	var Path = function(cfg) {
	  Path.superclass.constructor.call(this, cfg);
	};

	Path.ATTRS = {
	  path: null,
	  lineWidth: 1,
	  curve: null, // 曲线path
	  tCache: null
	};

	Util.extend(Path, Shape);

	Util.augment(Path, {
	  canFill: true,
	  canStroke: true,
	  type: 'path',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1
	    };
	  },
	  __afterSetAttrPath: function(path) {
	    var self = this;
	    if (Util.isNull(path)) {
	      self.setSilent('segments', null);
	      self.setSilent('box', undefined);
	      return;
	    }
	    var pathArray = Format.parsePath(path);
	    var preSegment;
	    var segments = [];

	    if (!Util.isArray(pathArray) ||
	      pathArray.length === 0 ||
	      (pathArray[0][0] !== 'M' &&
	        pathArray[0][0] !== 'm')
	    ) {
	      return;
	    }
	    var count = pathArray.length;
	    for (var i = 0; i < pathArray.length; i++) {
	      var item = pathArray[i];
	      preSegment = new PathSegment(item, preSegment, i === count - 1);
	      segments.push(preSegment);
	    }
	    self.setSilent('segments', segments);
	    self.set('tCache', null);
	    this.setSilent('box', null);
	  },
	  __afterSetAttrAll: function(objs) {
	    if (objs.path) {
	      this.__afterSetAttrPath(objs.path);
	    }
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var lineWidth = attrs.lineWidth;
	    var lineAppendWidth = attrs.lineAppendWidth || 0;
	    var segments = self.get('segments');

	    if (!segments) {
	      return null;
	    }
	    lineWidth += lineAppendWidth;
	    var minX = Infinity;
	    var maxX = -Infinity;
	    var minY = Infinity;
	    var maxY = -Infinity;
	    Util.each(segments, function(segment) {
	      segment.getBBox(lineWidth);
	      var box = segment.box;
	      if (box) {
	        if (box.minX < minX) {
	          minX = box.minX;
	        }

	        if (box.maxX > maxX) {
	          maxX = box.maxX;
	        }

	        if (box.minY < minY) {
	          minY = box.minY;
	        }

	        if (box.maxY > maxY) {
	          maxY = box.maxY;
	        }
	      }
	    });
	    return {
	      minX: minX,
	      minY: minY,
	      maxX: maxX,
	      maxY: maxY
	    };
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var fill = self.hasFill();
	    var stroke = self.hasStroke();

	    if (fill && stroke) {
	      return self.__isPointInFill(x, y) || self.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return self.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return self.__isPointInStroke(x, y);
	    }

	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var self = this;
	    var context = self.get('context');
	    if (!context) return undefined;
	    self.createPath();
	    return context.isPointInPath(x, y);
	  },
	  __isPointInStroke: function(x, y) {
	    var self = this;
	    var segments = self.get('segments');
	    var attrs = self.__attrs;
	    var lineWidth = attrs.lineWidth;
	    var appendWidth = attrs.lineAppendWidth || 0;
	    lineWidth += appendWidth;
	    for (var i = 0, l = segments.length; i < l; i++) {
	      if (segments[i].isInside(x, y, lineWidth)) {
	        return true;
	      }
	    }

	    return false;
	  },
	  __setTcache: function() {
	    var totalLength = 0;
	    var tempLength = 0;
	    var tCache = [];
	    var segmentT;
	    var segmentL;
	    var segmentN;
	    var l;
	    var curve = this.curve;

	    if (!curve) {
	      return;
	    }

	    Util.each(curve, function(segment, i) {
	      segmentN = curve[i + 1];
	      l = segment.length;
	      if (segmentN) {
	        totalLength += CubicMath.len(segment[l - 2], segment[l - 1], segmentN[1], segmentN[2], segmentN[3], segmentN[4], segmentN[5], segmentN[6]);
	      }
	    });

	    Util.each(curve, function(segment, i) {
	      segmentN = curve[i + 1];
	      l = segment.length;
	      if (segmentN) {
	        segmentT = [];
	        segmentT[0] = tempLength / totalLength;
	        segmentL = CubicMath.len(segment[l - 2], segment[l - 1], segmentN[1], segmentN[2], segmentN[3], segmentN[4], segmentN[5], segmentN[6]);
	        tempLength += segmentL;
	        segmentT[1] = tempLength / totalLength;
	        tCache.push(segmentT);
	      }
	    });

	    this.tCache = tCache;
	  },
	  __calculateCurve: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var path = attrs.path;
	    this.curve = pathUtil.toCurve(path);
	  },
	  getPoint: function(t) {
	    var tCache = this.tCache;
	    var curve;
	    var subt;
	    var index;
	    var seg;
	    var l;
	    var nextSeg;

	    if (!tCache) {
	      this.__calculateCurve();
	      this.__setTcache();
	      tCache = this.tCache;
	    }

	    curve = this.curve;

	    if (!tCache) {
	      if (curve) {
	        return {
	          x: curve[0][1],
	          y: curve[0][2]
	        };
	      }
	      return null;
	    }
	    Util.each(tCache, function(v, i) {
	      if (t >= v[0] && t <= v[1]) {
	        subt = (t - v[0]) / (v[1] - v[0]);
	        index = i;
	      }
	    });
	    seg = curve[index];
	    if (Util.isNull(seg) || Util.isNull(index)) {
	      return null;
	    }
	    l = seg.length;
	    nextSeg = curve[index + 1];
	    return {
	      x: CubicMath.at(seg[l - 2], nextSeg[1], nextSeg[3], nextSeg[5], 1 - subt),
	      y: CubicMath.at(seg[l - 1], nextSeg[2], nextSeg[4], nextSeg[6], 1 - subt)
	    };
	  },
	  createPath: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var segments = self.get('segments');
	    var lineWidth = attrs.lineWidth;
	    var arrow = attrs.arrow;

	    if (!Util.isArray(segments)) return;
	    context = context || self.get('context');
	    context.beginPath();
	    for (var i = 0, l = segments.length; i < l; i++) {
	      if (i === l - 1 && arrow) {
	        var lastSeg = segments[i];
	        var endTangent = segments[i].endTangent;
	        var endPoint = {
	          x: lastSeg.params[lastSeg.params.length - 1].x,
	          y: lastSeg.params[lastSeg.params.length - 1].y
	        };
	        if (lastSeg && Util.isFunction(endTangent)) {
	          var v = endTangent();
	          var end = Arrow.getEndPoint(v, new Vector2(endPoint.x, endPoint.y), lineWidth);
	          lastSeg.params[lastSeg.params.length - 1] = end;
	          segments[i].draw(context);
	          Arrow.makeArrow(context, v, end, lineWidth);
	          lastSeg.params[lastSeg.params.length - 1] = endPoint;
	        }
	      } else {
	        segments[i].draw(context);
	      }
	    }
	  }
	});

	module.exports = Path;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview polygon
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);

	var Polygon = function(cfg) {
	  Polygon.superclass.constructor.call(this, cfg);
	};

	Polygon.ATTRS = {
	  points: null,
	  lineWidth: 1
	};

	Util.extend(Polygon, Shape);

	Util.augment(Polygon, {
	  canFill: true,
	  canStroke: true,
	  type: 'polygon',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1
	    };
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var points = attrs.points;
	    var lineWidth = attrs.lineWidth;
	    if (!points || points.length === 0) {
	      return null;
	    }
	    var minX = Infinity;
	    var minY = Infinity;
	    var maxX = -Infinity;
	    var maxY = -Infinity;

	    Util.each(points, function(point) {
	      var x = point[0];
	      var y = point[1];
	      if (x < minX) {
	        minX = x;
	      }
	      if (x > maxX) {
	        maxX = x;
	      }

	      if (y < minY) {
	        minY = y;
	      }

	      if (y > maxY) {
	        maxY = y;
	      }
	    });

	    var halfWidth = lineWidth / 2;
	    return {
	      minX: minX - halfWidth,
	      minY: minY - halfWidth,
	      maxX: maxX + halfWidth,
	      maxY: maxY + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var fill = self.hasFill();
	    var stroke = self.hasStroke();

	    if (fill && stroke) {
	      return self.__isPointInFill(x, y) || self.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return self.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return self.__isPointInStroke(x, y);
	    }

	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var self = this;
	    var context = self.get('context');
	    self.createPath();
	    return context.isPointInPath(x, y);
	  },
	  __isPointInStroke: function(x, y) {
	    var self = this;
	    var attrs = self.__attrs;
	    var points = attrs.points;
	    if (points.length < 2) {
	      return false;
	    }
	    var lineWidth = attrs.lineWidth;
	    var outPoints = points.slice(0);
	    if (points.length >= 3) {
	      outPoints.push(points[0]);
	    }

	    return Inside.polyline(outPoints, lineWidth, x, y);
	  },
	  createPath: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var points = attrs.points;
	    if (points.length < 2) {
	      return;
	    }
	    context = context || self.get('context');
	    context.beginPath();
	    Util.each(points, function(point, index) {
	      if (index === 0) {
	        context.moveTo(point[0], point[1]);
	      } else {
	        context.lineTo(point[0], point[1]);
	      }
	    });
	    context.closePath();
	  }
	});

	module.exports = Polygon;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview polyline
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Arrow = __webpack_require__(12);
	var LineMath = __webpack_require__(21);
	var Matrix = __webpack_require__(3);
	var Vector2 = Matrix.Vector2;

	var Polyline = function(cfg) {
	  Polyline.superclass.constructor.call(this, cfg);
	};

	Polyline.ATTRS = {
	  points: null,
	  lineWidth: 1,
	  arrow: false,
	  tCache: null
	};

	Util.extend(Polyline, Shape);

	Util.augment(Polyline, {
	  canStroke: true,
	  type: 'polyline',
	  tCache: null, // 缓存各点的t
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1,
	      arrow: false
	    };
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var lineWidth = attrs.lineWidth;
	    var points = attrs.points;
	    if (!points || points.length === 0) {
	      return null;
	    }
	    var minX = Infinity;
	    var minY = Infinity;
	    var maxX = -Infinity;
	    var maxY = -Infinity;

	    Util.each(points, function(point) {
	      var x = point[0];
	      var y = point[1];
	      if (x < minX) {
	        minX = x;
	      }
	      if (x > maxX) {
	        maxX = x;
	      }

	      if (y < minY) {
	        minY = y;
	      }

	      if (y > maxY) {
	        maxY = y;
	      }
	    });

	    var halfWidth = lineWidth / 2;
	    return {
	      minX: minX - halfWidth,
	      minY: minY - halfWidth,
	      maxX: maxX + halfWidth,
	      maxY: maxY + halfWidth
	    };
	  },
	  __setTcache: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var points = attrs.points;
	    var totalLength = 0;
	    var tempLength = 0;
	    var tCache = [];
	    var segmentT;
	    var segmentL;
	    if (!points || points.length === 0) {
	      return;
	    }

	    Util.each(points, function(p, i) {
	      if (points[i + 1]) {
	        totalLength += LineMath.len(p[0], p[1], points[i + 1][0], points[i + 1][1]);
	      }
	    });
	    if (totalLength <= 0) {
	      return;
	    }
	    Util.each(points, function(p, i) {
	      if (points[i + 1]) {
	        segmentT = [];
	        segmentT[0] = tempLength / totalLength;
	        segmentL = LineMath.len(p[0], p[1], points[i + 1][0], points[i + 1][1]);
	        tempLength += segmentL;
	        segmentT[1] = tempLength / totalLength;
	        tCache.push(segmentT);
	      }
	    });
	    this.tCache = tCache;
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var attrs = self.__attrs;
	    if (self.hasStroke()) {
	      var points = attrs.points;
	      if (points.length < 2) {
	        return false;
	      }
	      var lineWidth = attrs.lineWidth;
	      return Inside.polyline(points, lineWidth, x, y);
	    }
	    return false;
	  },
	  createPath: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var points = attrs.points;
	    var arrow = attrs.arrow;
	    var lineWidth = attrs.lineWidth;
	    var l;
	    var i;

	    if (points.length < 2) {
	      return;
	    }
	    context = context || self.get('context');
	    context.beginPath();
	    context.moveTo(points[0][0], points[0][1]);
	    for (i = 1, l = points.length - 1; i < l; i++) {
	      context.lineTo(points[i][0], points[i][1]);
	    }
	    if (arrow) {
	      var v = new Vector2(points[l][0] - points[l - 1][0], points[l][1] - points[l - 1][1]);
	      var end = Arrow.getEndPoint(v, new Vector2(points[l][0], points[l][1]), lineWidth);
	      context.lineTo(end.x, end.y);
	      Arrow.makeArrow(context, v, end, lineWidth);
	    } else {
	      context.lineTo(points[l][0], points[l][1]);
	    }
	  },
	  getPoint: function(t) {
	    var attrs = this.__attrs;
	    var points = attrs.points;
	    var tCache = this.tCache;
	    var subt;
	    var index;
	    if (!tCache) {
	      this.__setTcache();
	      tCache = this.tCache;
	    }
	    Util.each(tCache, function(v, i) {
	      if (t >= v[0] && t <= v[1]) {
	        subt = (t - v[0]) / (v[1] - v[0]);
	        index = i;
	      }
	    });
	    return {
	      x: LineMath.at(points[index][0], points[index + 1][0], subt),
	      y: LineMath.at(points[index][1], points[index + 1][1], subt)
	    };
	  }
	});

	module.exports = Polyline;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Quadratic
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Arrow = __webpack_require__(12);
	var QuadraticMath = __webpack_require__(22);
	var Vector2 = __webpack_require__(3).Vector2;

	var Quadratic = function(cfg) {
	  Quadratic.superclass.constructor.call(this, cfg);
	};

	Quadratic.ATTRS = {
	  p1: null,
	  p2: null,
	  p3: null,
	  lineWidth: 1,
	  arrow: false
	};

	Util.extend(Quadratic, Shape);

	Util.augment(Quadratic, {
	  canStroke: true,
	  type: 'quadratic',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1,
	      arrow: false
	    };
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var i;
	    var l;

	    if (
	      Util.isNull(p1) ||
	      Util.isNull(p2) ||
	      Util.isNull(p3)
	    ) {
	      return null;
	    }
	    var halfWidth = attrs.lineWidth / 2;


	    var xDims = QuadraticMath.extrema(p1[0], p2[0], p3[0]);
	    for (i = 0, l = xDims.length; i < l; i++) {
	      xDims[i] = QuadraticMath.at(p1[0], p2[0], p3[0], xDims[i]);
	    }
	    xDims.push(p1[0], p3[0]);
	    var yDims = QuadraticMath.extrema(p1[1], p2[1], p3[1]);
	    for (i = 0, l = yDims.length; i < l; i++) {
	      yDims[i] = QuadraticMath.at(p1[1], p2[1], p3[1], yDims[i]);
	    }
	    yDims.push(p1[1], p3[1]);

	    return {
	      minX: Math.min.apply(Math, xDims) - halfWidth,
	      maxX: Math.max.apply(Math, xDims) + halfWidth,
	      minY: Math.min.apply(Math, yDims) - halfWidth,
	      maxY: Math.max.apply(Math, yDims) + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var attrs = self.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var lineWidth = attrs.lineWidth;

	    return Inside.quadraticline(
	      p1[0], p1[1],
	      p2[0], p2[1],
	      p3[0], p3[1],
	      lineWidth, x, y
	    );
	  },
	  createPath: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var p1 = attrs.p1;
	    var p2 = attrs.p2;
	    var p3 = attrs.p3;
	    var lineWidth = attrs.lineWidth;
	    var arrow = attrs.arrow;

	    if (
	      Util.isNull(p1) ||
	      Util.isNull(p2) ||
	      Util.isNull(p3)
	    ) {
	      return;
	    }
	    context = context || self.get('context');
	    context.beginPath();
	    context.moveTo(p1[0], p1[1]);


	    if (arrow) {
	      var v = new Vector2(p3[0] - p2[0], p3[1] - p2[1]);
	      var end = Arrow.getEndPoint(v, new Vector2(p3[0], p3[1]), lineWidth);
	      context.quadraticCurveTo(p2[0], p2[1], end.x, end.y);
	      Arrow.makeArrow(context, v, end, lineWidth);
	    } else {
	      context.quadraticCurveTo(p2[0], p2[1], p3[0], p3[1]);
	    }
	  },
	  getPoint: function(t) {
	    var attrs = this.__attrs;
	    return {
	      x: QuadraticMath.at(attrs.p1[0], attrs.p2[0], attrs.p3[0], t),
	      y: QuadraticMath.at(attrs.p1[1], attrs.p2[1], attrs.p3[1], t)
	    };
	  }
	});

	module.exports = Quadratic;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 矩形
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);

	var Rect = function(cfg) {
	  Rect.superclass.constructor.call(this, cfg);
	};

	Rect.ATTRS = {
	  x: 0,
	  y: 0,
	  width: 0,
	  height: 0,
	  radius: 0,
	  lineWidth: 1
	};

	Util.extend(Rect, Shape);

	Util.augment(Rect, {
	  canFill: true,
	  canStroke: true,
	  type: 'rect',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1,
	      radius: 0
	    };
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var width = attrs.width;
	    var height = attrs.height;
	    var lineWidth = attrs.lineWidth;

	    var halfWidth = lineWidth / 2;
	    return {
	      minX: x - halfWidth,
	      minY: y - halfWidth,
	      maxX: x + width + halfWidth,
	      maxY: y + height + halfWidth
	    };
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var fill = self.hasFill();
	    var stroke = self.hasStroke();

	    if (fill && stroke) {
	      return self.__isPointInFill(x, y) || self.__isPointInStroke(x, y);
	    }

	    if (fill) {
	      return self.__isPointInFill(x, y);
	    }

	    if (stroke) {
	      return self.__isPointInStroke(x, y);
	    }

	    return false;
	  },
	  __isPointInFill: function(x, y) {
	    var context = this.get('context');

	    if (!context) return false;
	    this.createPath();
	    return context.isPointInPath(x, y);
	  },
	  __isPointInStroke: function(x, y) {
	    var self = this;
	    var attrs = self.__attrs;
	    var rx = attrs.x;
	    var ry = attrs.y;
	    var width = attrs.width;
	    var height = attrs.height;
	    var radius = attrs.radius;
	    var lineWidth = attrs.lineWidth;

	    if (radius === 0) {
	      var halfWidth = lineWidth / 2;
	      return Inside.line(rx - halfWidth, ry, rx + width + halfWidth, ry, lineWidth, x, y) ||
	        Inside.line(rx + width, ry - halfWidth, rx + width, ry + height + halfWidth, lineWidth, x, y) ||
	        Inside.line(rx + width + halfWidth, ry + height, rx - halfWidth, ry + height, lineWidth, x, y) ||
	        Inside.line(rx, ry + height + halfWidth, rx, ry - halfWidth, lineWidth, x, y);
	    }

	    return Inside.line(rx + radius, ry, rx + width - radius, ry, lineWidth, x, y) ||
	      Inside.line(rx + width, ry + radius, rx + width, ry + height - radius, lineWidth, x, y) ||
	      Inside.line(rx + width - radius, ry + height, rx + radius, ry + height, lineWidth, x, y) ||
	      Inside.line(rx, ry + height - radius, rx, ry + radius, lineWidth, x, y) ||
	      Inside.arcline(rx + width - radius, ry + radius, radius, 1.5 * Math.PI, 2 * Math.PI, false, lineWidth, x, y) ||
	      Inside.arcline(rx + width - radius, ry + height - radius, radius, 0, 0.5 * Math.PI, false, lineWidth, x, y) ||
	      Inside.arcline(rx + radius, ry + height - radius, radius, 0.5 * Math.PI, Math.PI, false, lineWidth, x, y) ||
	      Inside.arcline(rx + radius, ry + radius, radius, Math.PI, 1.5 * Math.PI, false, lineWidth, x, y);
	  },
	  createPath: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var width = attrs.width;
	    var height = attrs.height;
	    var radius = attrs.radius;
	    context = context || self.get('context');

	    context.beginPath();
	    if (radius === 0) {
	      // 改成原生的rect方法
	      context.rect(x, y, width, height);
	    } else {
	      context.moveTo(x + radius, y);
	      context.lineTo(x + width - radius, y);
	      context.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
	      context.lineTo(x + width, y + height - radius);
	      context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
	      context.lineTo(x + radius, y + height);
	      context.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
	      context.lineTo(x, y + radius);
	      context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2, false);
	      context.closePath();
	    }
	  }
	});

	module.exports = Rect;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview text 文本
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var Shape = __webpack_require__(5);
	var Inside = __webpack_require__(6);
	var Common = __webpack_require__(35);

	var CText = function(cfg) {
	  CText.superclass.constructor.call(this, cfg);
	};

	CText.ATTRS = {
	  x: 0,
	  y: 0,
	  text: null,
	  fontSize: 12,
	  fontFamily: 'sans-serif',
	  fontStyle: 'normal',
	  fontWeight: 'normal',
	  fontVariant: 'normal',
	  textAlign: 'start',
	  textBaseline: 'bottom',
	  lineHeight: null,
	  textArr: null
	};

	Util.extend(CText, Shape);

	Util.augment(CText, {
	  canFill: true,
	  canStroke: true,
	  type: 'text',
	  getDefaultAttrs: function() {
	    return {
	      lineWidth: 1,
	      lineCount: 1,
	      fontSize: 12,
	      fontFamily: 'sans-serif',
	      fontStyle: 'normal',
	      fontWeight: 'normal',
	      fontVariant: 'normal',
	      textAlign: 'start',
	      textBaseline: 'bottom'
	    };
	  },
	  __assembleFont: function() {
	    // var self = this;
	    var attrs = this.__attrs;
	    var fontSize = attrs.fontSize;
	    var fontFamily = attrs.fontFamily;
	    var fontWeight = attrs.fontWeight;
	    var fontStyle = attrs.fontStyle; // self.attr('fontStyle');
	    var fontVariant = attrs.fontVariant; // self.attr('fontVariant');
	    // self.attr('font', [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' '));
	    attrs.font = [fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily].join(' ');
	  },
	  __afterSetAttrFontSize: function() {
	    /* this.attr({
	      height: this.__getTextHeight()
	    }); */
	    this.__assembleFont();
	  },
	  __afterSetAttrFontFamily: function() {
	    this.__assembleFont();
	  },
	  __afterSetAttrFontWeight: function() {
	    this.__assembleFont();
	  },
	  __afterSetAttrFontStyle: function() {
	    this.__assembleFont();
	  },
	  __afterSetAttrFontVariant: function() {
	    this.__assembleFont();
	  },
	  __afterSetAttrFont: function() {
	    // this.attr('width', this.measureText());
	  },
	  __afterSetAttrText: function() {
	    var attrs = this.__attrs;
	    var text = attrs.text;
	    var textArr;
	    if (Util.isString(text) && (text.indexOf('\n') !== -1)) {
	      textArr = text.split('\n');
	      var lineCount = textArr.length;
	      attrs.lineCount = lineCount;
	      attrs.textArr = textArr;
	    }
	    // attrs.height = this.__getTextHeight();
	    // attrs.width = this.measureText();
	  },
	  __getTextHeight: function() {
	    var attrs = this.__attrs;
	    var lineCount = attrs.lineCount;
	    var fontSize = attrs.fontSize * 1;
	    if (lineCount > 1) {
	      var spaceingY = this.__getSpaceingY();
	      return fontSize * lineCount + spaceingY * (lineCount - 1);
	    }
	    return fontSize;
	  },
	  // 计算浪费，效率低，待优化
	  __afterSetAttrAll: function(objs) {
	    var self = this;
	    if (
	      'fontSize' in objs ||
	      'fontWeight' in objs ||
	      'fontStyle' in objs ||
	      'fontVariant' in objs ||
	      'fontFamily' in objs
	    ) {
	      self.__assembleFont();
	    }

	    if (
	      'text' in objs
	    ) {
	      self.__afterSetAttrText(objs.text);
	    }
	  },
	  isHitBox: function() {
	    return false;
	  },
	  calculateBox: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var x = attrs.x;
	    var y = attrs.y;
	    var width = self.measureText(); // attrs.width
	    if (!width) {
	      // 如果width不存在，四点共其实点
	      return {
	        minX: x,
	        minY: y,
	        maxX: x,
	        maxY: y
	      };
	    }
	    var height = self.__getTextHeight(); // attrs.height
	    var textAlign = attrs.textAlign;
	    var textBaseline = attrs.textBaseline;
	    var lineWidth = attrs.lineWidth;
	    var point = {
	      x: x,
	      y: y - height
	    };

	    if (textAlign) {
	      if (textAlign === 'end' || textAlign === 'right') {
	        point.x -= width;
	      } else if (textAlign === 'center') {
	        point.x -= width / 2;
	      }
	    }

	    if (textBaseline) {
	      if (textBaseline === 'top') {
	        point.y += height;
	      } else if (textBaseline === 'middle') {
	        point.y += height / 2;
	      }
	    }

	    this.set('startPoint', point);
	    var halfWidth = lineWidth / 2;
	    return {
	      minX: point.x - halfWidth,
	      minY: point.y - halfWidth,
	      maxX: point.x + width + halfWidth,
	      maxY: point.y + height + halfWidth
	    };
	  },
	  __getSpaceingY: function() {
	    var attrs = this.__attrs;
	    var lineHeight = attrs.lineHeight;
	    var fontSize = attrs.fontSize * 1;
	    return lineHeight ? (lineHeight - fontSize) : fontSize * 0.14;
	  },
	  isPointInPath: function(x, y) {
	    var self = this;
	    var box = self.getBBox();
	    if (self.hasFill() || self.hasStroke()) {
	      return Inside.box(box.minX, box.maxX, box.minY, box.maxY, x, y);
	    }
	  },
	  drawInner: function(context) {
	    var self = this;
	    var attrs = self.__attrs;
	    var text = attrs.text;
	    if (!text) {
	      return;
	    }
	    var textArr = attrs.textArr;
	    var fontSize = attrs.fontSize * 1;
	    var spaceingY = self.__getSpaceingY();
	    var x = attrs.x;
	    var y = attrs.y;
	    var textBaseline = attrs.textBaseline;
	    var height;
	    if (textArr) {
	      var box = self.getBBox();
	      height = box.maxY - box.minY;
	    }
	    var subY;

	    context.beginPath();
	    if (self.hasFill()) {
	      var fillOpacity = attrs.fillOpacity;
	      if (!Util.isNull(fillOpacity) && fillOpacity !== 1) {
	        context.globalAlpha = fillOpacity;
	      }
	      if (textArr) {
	        Util.each(textArr, function(subText, index) {
	          subY = y + index * (spaceingY + fontSize) - height + fontSize; // bottom;
	          if (textBaseline === 'middle') subY += height - fontSize - (height - fontSize) / 2;
	          if (textBaseline === 'top') subY += height - fontSize;
	          context.fillText(subText, x, subY);
	        });
	      } else {
	        context.fillText(text, x, y);
	      }
	    }

	    if (self.hasStroke()) {
	      if (textArr) {
	        Util.each(textArr, function(subText, index) {
	          subY = y + index * (spaceingY + fontSize) - height + fontSize; // bottom;
	          if (textBaseline === 'middle') subY += height - fontSize - (height - fontSize) / 2;
	          if (textBaseline === 'top') subY += height - fontSize;
	          context.strokeText(subText, x, subY);
	        });
	      } else {
	        context.strokeText(text, x, y);
	      }
	    }
	  },
	  measureText: function() {
	    var self = this;
	    var attrs = self.__attrs;
	    var text = attrs.text;
	    var font = attrs.font;
	    var textArr = attrs.textArr;
	    var measureWidth;
	    var width = 0;

	    if (Util.isNull(text)) return undefined;
	    var context = Common.backupContext;
	    context.save();
	    context.font = font;
	    if (textArr) {
	      Util.each(textArr, function(subText) {
	        measureWidth = context.measureText(subText).width;
	        if (width < measureWidth) {
	          width = measureWidth;
	        }
	        context.restore();
	      });
	    } else {
	      width = context.measureText(text).width;
	      context.restore();
	    }
	    return width;
	  }
	});

	module.exports = CText;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var MatrixUtil = __webpack_require__(86);
	var DomUtil = __webpack_require__(85);
	var PathUtil = __webpack_require__(23);

	Util.mix(Util, DomUtil, {
	  /**
	   * 混合方法 适用CFG模式
	   * @param  {Array} arr 数组
	   * @return {Array} map后的数组
	   */
	  mixin: function(c, mixins) {
	    var Param = c.CFG ? 'CFG' : 'ATTRS';
	    if (c && mixins) {
	      c._mixins = mixins;
	      c[Param] = c[Param] || {};
	      var temp = {};
	      Util.each(mixins, function(mixin) {
	        Util.augment(c, mixin);
	        var attrs = mixin[Param];
	        if (attrs) {
	          Util.mix(temp, attrs);
	        }
	      });
	      c[Param] = Util.mix(temp, c[Param]);
	    }
	  },
	  // 判断是否为正整数
	  isPositiveNum: function(s) {
	    var re = /^[0-9]*[1-9][0-9]*$/;
	    return re.test(s);
	  },
	  /**
	   * 获取屏幕像素比
	   */
	  getRatio: function() {
	    return window.devicePixelRatio ? window.devicePixelRatio : 2;
	  },
	  /**
	   * 获取宽度
	   * @param  {HTMLElement} el  dom节点
	   * @return {Number} 宽度
	   */
	  getWidth: function(el) {
	    var width = Util.getStyle(el, 'width');
	    if (width === 'auto') {
	      width = el.offsetWidth;
	    }
	    return parseFloat(width);
	  },
	  /**
	   * 获取高度
	   * @param  {HTMLElement} el  dom节点
	   * @return {Number} 高度
	   */
	  getHeight: function(el) {
	    var height = Util.getStyle(el, 'height');
	    if (height === 'auto') {
	      height = el.offsetHeight;
	    }
	    return parseFloat(height);
	  },
	  /**
	   * 获取外层高度
	   * @param  {HTMLElement} el  dom节点
	   * @return {Number} 高度
	   */
	  getOuterHeight: function(el) {
	    var height = Util.getHeight(el);
	    var bTop = parseFloat(Util.getStyle(el, 'borderTopWidth')) || 0;
	    var pTop = parseFloat(Util.getStyle(el, 'paddingTop'));
	    var pBottom = parseFloat(Util.getStyle(el, 'paddingBottom'));
	    var bBottom = parseFloat(Util.getStyle(el, 'borderBottomWidth')) || 0;
	    return height + bTop + bBottom + pTop + pBottom;
	  },
	  parsePathString: PathUtil.toArray,
	  path2string: PathUtil.toString,
	  path2curve: PathUtil.toCurve,
	  pathToAbsolute: PathUtil.toAbsolute,
	  catmullRom2bezier: PathUtil.catmullRomToBezier,
	  /**
	   * 将path数组转换成字符串
	   * @param  {Array} array 数组
	   * @return {String}  字符串
	   */
	  parsePathArray: function(array) {
	    return Util.path2string(array);
	  },
	  path2Absolute: function(pathArray) {
	    return Util.pathToAbsolute(pathArray);
	  }
	});

	Util.MatrixUtil = MatrixUtil;

	module.exports = Util;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	var Tween = __webpack_require__(106);
	Tween.Tween = __webpack_require__(58);
	Tween.Ease = __webpack_require__(56);
	module.exports = Tween;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

	var Ease = {
		linear: function (t) {
			return t;
		},
		easeInQuad: function (t) {
			return t * t;
		},
		easeOutQuad: function (t) {
			return -1 * t * (t - 2);
		},
		easeInOutQuad: function (t) {
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * t * t;
			}
			return -1 / 2 * ((--t) * (t - 2) - 1);
		},
		easeInCubic: function (t) {
			return t * t * t;
		},
		easeOutCubic: function (t) {
			return 1 * ((t = t / 1 - 1) * t * t + 1);
		},
		easeInOutCubic: function (t) {
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t + 2);
		},
		easeInQuart: function (t) {
			return t * t * t * t;
		},
		easeOutQuart: function (t) {
			return -1 * ((t = t / 1 - 1) * t * t * t - 1);
		},
		easeInOutQuart: function (t) {
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * t * t * t * t;
			}
			return -1 / 2 * ((t -= 2) * t * t * t - 2);
		},
		easeInQuint: function (t) {
			return 1 * (t /= 1) * t * t * t * t;
		},
		easeOutQuint: function (t) {
			return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
		},
		easeInOutQuint: function (t) {
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * t * t * t * t * t;
			}
			return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
		},
		easeInSine: function (t) {
			return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
		},
		easeOutSine: function (t) {
			return 1 * Math.sin(t / 1 * (Math.PI / 2));
		},
		easeInOutSine: function (t) {
			return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
		},
		easeInExpo: function (t) {
			return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
		},
		easeOutExpo: function (t) {
			return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
		},
		easeInOutExpo: function (t) {
			if (t === 0){
				return 0;
			}
			if (t === 1){
				return 1;
			}
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * Math.pow(2, 10 * (t - 1));
			}
			return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
		},
		easeInCirc: function (t) {
			if (t >= 1){
				return t;
			}
			return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
		},
		easeOutCirc: function (t) {
			return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
		},
		easeInOutCirc: function (t) {
			if ((t /= 1 / 2) < 1){
				return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
			}
			return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		},
		easeInElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0){
				return 0;
			}
			if ((t /= 1) == 1){
				return 1;
			}
			if (!p){
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else{
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
		},
		easeOutElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0){
				return 0;
			}
			if ((t /= 1) == 1){
				return 1;
			}
			if (!p){
				p = 1 * 0.3;
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else{
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
		},
		easeInOutElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t === 0){
				return 0;
			}
			if ((t /= 1 / 2) == 2){
				return 1;
			}
			if (!p){
				p = 1 * (0.3 * 1.5);
			}
			if (a < Math.abs(1)) {
				a = 1;
				s = p / 4;
			} else {
				s = p / (2 * Math.PI) * Math.asin(1 / a);
			}
			if (t < 1){
				return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));}
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
		},
		easeInBack: function (t) {
			var s = 1.70158;
			return 1 * (t /= 1) * t * ((s + 1) * t - s);
		},
		easeOutBack: function (t) {
			var s = 1.70158;
			return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
		},
		easeInOutBack: function (t) {
			var s = 1.70158;
			if ((t /= 1 / 2) < 1){
				return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
			}
			return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
		},
		easeInBounce: function (t) {
			return 1 - Ease.easeOutBounce(1 - t);
		},
		easeOutBounce: function (t) {
			if ((t /= 1) < (1 / 2.75)) {
				return 1 * (7.5625 * t * t);
			} else if (t < (2 / 2.75)) {
				return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
			} else if (t < (2.5 / 2.75)) {
				return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
			} else {
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
			}
		},
		easeInOutBounce: function (t) {
			if (t < 1 / 2){
				return Ease.easeInBounce(t * 2) * 0.5;
			}
			return Ease.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
		}
	}
	module.exports = Ease;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 工具类
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var Matrix = __webpack_require__(3);
	var Interpolation = __webpack_require__(93);
	var ReservedProps = {
	  duration: 'duration',
	  destroy: 'destroy',
	  delay: 'delay',
	  repeat: 'repeat',
	  onUpdate: 'onUpdate'
	}
	var Matrix3 = Matrix.Matrix3;

	var TweenUtil = {
	  /**
	   * 获取对象长度
	   * @return  {Number} rst 对象长度
	   */
	  getObjectLength: function(obj) {
	    var count = 0;
	    var i;

	    for (i in obj) {
	      if (obj.hasOwnProperty(i)) {
	        count++;
	      }
	    }
	    return count;
	  },
	  isEqual: function(v1, v2) {
	    var i;
	    var k;

	    if (typeof v1 !== typeof v2) {
	      return false;
	    }

	    // 数字、字符串
	    if (Util.isNumber(v1) || Util.isString(v1)) {
	      if (v1 === v2) {
	        return true;
	      }
	      return false;
	    }

	    // 数组
	    if (Util.isArray(v1)) {
	      if(!Util.isArray(v1[0])){
	        // 非嵌套数组
	        if (Util.equalsArray(v1, v2)) {
	          return true;
	        }
	        return false;
	      }
	      // 嵌套数组
	      if (v1 === v2) {
	        return true;
	      }
	      if (v1.length !== v2.length) {
	        return false;
	      }
	      for (i = 0; i < v1.length; i++) {
	        if (!Util.equalsArray(v1[i], v2[i])) {
	          return false;
	        }
	      }
	      return true;
	    }

	    // 对象
	    if (Util.isObject(v1)) {
	      if(TweenUtil.getObjectLength(v1) !== TweenUtil.getObjectLength(v2)){
	        return false;
	      }

	      for (k in v1) {
	        if (typeof v1[k] !== typeof v2[k]) {
	          return false;
	        }
	        if (v1[k] !== v2[k]) {
	          return false;
	        }
	      }
	      return true;
	    }
	    // if (Util.isArray(v1) || Util.isObject(v1)) {
	    //   v1 = JSON.stringify(v1);
	    //   v2 = JSON.stringify(v2);
	    // }
	    if (v1 === v2) {
	      return true;
	    }
	    return false;
	  },
	  /**
	   * 差值函数
	   * @return  {Function} fun 差值函数
	   */
	  interpolation: Interpolation.interpolation,
	  /**
	   * 获得帧
	   * @param   {Nmuber} ratio 比率
	   * @param   {Object} skf 起始关键帧
	   * @param   {Object} ekf 结束关键帧
	   * @param   {Object} interpolations 插值器集
	   * @param   {Object} target 目标图形对象
	   * @return  {Object} frame 当前比率帧
	   */
	  getFrame: function(ratio, skf, ekf, interpolations, target) {
	    var frame = {
	      attrs: {},
	      matrix: null
	    };
	    var onUpdate = ekf.onUpdate;

	    for (var k in interpolations.attrs) {
	      frame.attrs[k] = interpolations.attrs[k](ratio);
	    }
	    if (interpolations.matrix) {
	      frame.matrix = interpolations.matrix(ratio);
	    }
	    if (Util.isFunction(onUpdate)) {
	      onUpdate(frame, ratio);
	    }
	    return frame;
	  },
	  /**
	   * 获取插值函数
	   * @param   {Object} startKeyFrame 起始帧
	   * @param   {Object} endKeyFrame   结束帧
	   * @return  {Object} interpolation 插值器集
	   */
	  getInterpolations: function(startKeyFrame, endKeyFrame) {
	    var interpolations = {
	      attrs: {},
	      matrix: null
	    };
	    var interpolation;
	    var endAttrValue;
	    Util.each(startKeyFrame.attrs, function(startAttrValue, k) {
	      interpolation = null;
	      endAttrValue = endKeyFrame.attrs[k];
	      if (!TweenUtil.isEqual(startAttrValue, endAttrValue)) {
	        if (k === 'path') {
	          interpolation = TweenUtil.interpolation({
	            path: startAttrValue,
	            type: 'path'
	          }, {
	            path: endAttrValue,
	            type: 'path'
	          });
	        } else {
	          interpolation = TweenUtil.interpolation(startAttrValue, endAttrValue);
	        }
	        if (Util.isFunction(interpolation)) {
	          interpolations.attrs[k] = interpolation;
	        }
	      }
	    });
	    if (endKeyFrame.matrix && startKeyFrame.matrix && !Matrix3.equal(startKeyFrame.matrix, endKeyFrame.matrix)) {
	      interpolation = TweenUtil.interpolation(startKeyFrame.matrix, endKeyFrame.matrix);
	      if(Util.isFunction(interpolation)){
	        interpolations.matrix = interpolation;
	      }
	    }
	    return interpolations;
	  },
	  /**
	   * 通过Props获取Frames
	   * @param   {Object} target 目标图形对象
	   * @param   {Object} props 目标属性(包括矩阵和图形属性)
	   * @return  {Object} frames 帧集
	   */
	  getKeyFrameByProps: function(target, props) {
	    var frames = [];
	    var endKeyFrame = TweenUtil.props2frame(target, props);
	    var startKeyFrame = {
	      attrs: TweenUtil.getTargetAttrs(target, endKeyFrame.attrs),
	      matrix: target.getMatrix()
	    };
	    frames[0] = startKeyFrame;
	    frames[1] = endKeyFrame;
	    return frames;
	  },
	  /**
	   * 格式化Props 为 Frame
	   * @param   {Object} target 目标图形对象
	   * @param   {Object} props 目标属性(包括矩阵和图形属性)
	   * @return  {Object} frame 帧
	   */
	  props2frame: function(target, props) {
	    var frame = {
	      matrix: null,
	      attrs: {}
	    };
	    Util.each(props, function(v, k) {
	      if (k === 'transform' && !props['k']) {
	        frame.matrix = TweenUtil.transform(target.getMatrix(), v);
	      } else if (k === 'matrix') {
	        frame.matrix = v;
	      } else if (k === 'onUpdate') {
	        frame.onUpdate = props.onUpdate;
	      } else if (!ReservedProps[k]) {
	        frame.attrs[k] = v;
	      }
	    });
	    return frame;
	  },
	  /**
	   * 变换快捷方式
	   * @param  {Object} m 矩阵
	   * @param  {Array} ts 变换数组同
	   * @return  {Object} this 回调函数
	   */
	  transform: function(m, ts) {
	    m = m.clone();
	    Util.each(ts, function(t) {
	      switch (t[0]) {
	        case 't':
	          m.translate(t[1], t[2]);
	          break;
	        case 's':
	          m.scale(t[1], t[2]);
	          break;
	        case 'r':
	          m.rotate(t[1]);
	          break;
	        case 'm':
	          m.multiply(t[1]);
	          break;
	        default:
	          return false;
	      }
	    });
	    return m;
	  },
	  /** 获取图形相应的图形属性
	   * @param   {Object} target 目标图形对象
	   * @param   {Object} attrs 参考图形属性
	   * @return  {Object} rst 图形属性
	   */
	  getTargetAttrs: function(target, attrs) {
	    var rst = {};
	    var k;
	    for (k in attrs) {
	      rst[k] = target.attr(k);
	    }
	    return rst;
	  }
	}

	module.exports = TweenUtil;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 补间
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	'use strict';

	var Base = __webpack_require__(11);
	var TweenUtil = __webpack_require__(57);
	var Util = __webpack_require__(1);
	var Ease = __webpack_require__(56);

	var Tween = function(cfg) {
	  Util.mix(this, cfg);
	  this._init();
	}

	Util.augment(Tween, {
	  /**
	   * 类型
	   * @type {String}
	   */
	  type: 'tween',
	  /**
	   * 画布对象
	   * @type {Object}
	   */
	  canvas: null,
	  /**
	   * 目标图形对象
	   * @type {Object}
	   */
	  target: null,
	  /**
	   * 起始时间
	   * @type {Number}
	   */
	  startTime: null,
	  /**
	   * 结束时间
	   * @type {Number}
	   */
	  endTime: null,
	  /**
	   * 持续时间
	   * @type {Number}
	   */
	  duration: null,
	  /**
	   * 绘制比率
	   * @type {Number}
	   */
	  ratio: 0,
	  /**
	   * 动画结束后是否要被清除目标对象
	   * @type {Boolean}
	   */
	  destroyTarget: false,
	  /**
	   * 是否要被清除
	   * @type {Boolean}
	   */
	  needsDestroy: false,
	  /**
	   * 是否可被执行
	   * @type {Boolean}
	   */
	  available: true,
	  /**
	   * 是否重复
	   * @type {Boolean}
	   */
	  repeat: false,
	  /**
	   * 回调函数
	   * @type {Function}
	   */
	  callBack: null,
	  /**
	   * 当前帧
	   * @type {Object}
	   */
	  currentFrame: null,
	  /**
	   * 起始关键帧
	   * @type {Object}
	   */
	  startKeyFrame: {
	    attrs: null,
	    matrix: null
	  },
	  /**
	   * 结束关键帧
	   * @type {Object}
	   */
	  endKeyFrame: {
	    attrs: null,
	    matrix: null
	  },
	  /**
	   * 插值器集
	   * @type {Object}
	   */
	  interpolations: null,
	  _init: function() {
	    var startTime = this.startTime;
	    var duration = this.duration;
	    this.endTime = startTime + duration;
	  },
	  /**
	   * 尝试执行
	   * @param  {Number} time 时间戳
	   */
	  tryStep: function(time) {
	    var startTime = this.startTime;
	    var duration = this.duration;
	    var startKeyFrame = this.startKeyFrame;
	    var target = this.target;
	    var realStartTime = startTime;
	    if(!target || target.get('destroyed')) {
	      this.needsDestroy = true;
	      return false;
	    }
	    try {
	      this.step(time);
	    } catch (ev) { // 异常，中断重绘
	      this.needsDestroy = true;
	      return false;
	    }
	  },
	  /**
	   * 执行
	   * @param  {Number} time 时间戳
	   */
	  step: function(time) {
	    var target = this.target; // 目标对象
	    var startTime = this.startTime; // 开始时间
	    var elapsed = time - startTime; // 逝去时间
	    var duration = this.duration; // 持续时间
	    var skf = this.startKeyFrame; // 开始帧
	    var ekf = this.endKeyFrame; // 结束帧
	    var easing = this.easing; // 缓动函数名
	    var interpolations = this.interpolations;
	    var ckf; // 当前帧
	    var ratio; // 真实比率
	    var easeRatio; // 绘制比率

	    if (!Util.isFunction(easing)) easing = Ease[easing] ? Ease[easing] : Ease['linear'];
	    ratio = elapsed / duration;
	    ratio = ratio <= 0 ? 0 : ratio >= 1 ? 1 : ratio;
	    easeRatio = easing(ratio);
	    ckf = TweenUtil.getFrame(easeRatio, skf, ekf, interpolations, target);
	    ckf.attrs && target.attr(ckf.attrs);
	    ckf.matrix && target.setMatrix(ckf.matrix);
	    this.ratio = ratio;
	    this.currentFrame = ckf;
	    this.updateStatus();
	    return target;
	  },
	  /**
	   * 更新状态
	   */
	  updateStatus: function() {
	    var ratio = this.ratio;
	    var callBack = this.callBack;
	    var destroyTarget = this.destroyTarget;
	    var target = this.target;
	    var repeat = this.repeat;
	    if (ratio >= 1) {
	      if (repeat) {
	        var startTime = this.startTime;
	        var endTime = this.endTime;
	        var duration = this.duration;
	        this.startTime = startTime + duration;
	        this.endTime = endTime + duration;
	        this.reset();
	      } else {
	        this.needsDestroy = true;
	        callBack && callBack.call(target);
	        destroyTarget && !target.get('destroyed') && target.remove(true);
	      }
	    } else {
	      return;
	    }
	  },
	  /**
	   * 重置当前补间
	   */
	  reset: function() {
	    var target = this.target;
	    var skf = this.startKeyFrame;
	    skf.attrs && target.attr(skf.attrs);
	    skf.matrix && target.setMatrix(skf.matrix);
	    this.ratio = 0;
	    this.needsDestroy = false;
	  },
	  destroy: function(){
	    var target = this.target;
	    var ekf = this.endKeyFrame;
	    if(target && !target.get('destroyed')){
	      ekf.attrs && target.attr(ekf.attrs);
	      ekf.matrix && target.setMatrix(ekf.matrix);
	    }
	    this.destroyed = true;
	  }
	});

	module.exports = Tween;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// const win = window;
	// const doc = win.document;
	var SERVER_URL = 'https://kcart.alipay.com/web/bi.do';
	var Util = __webpack_require__(1);

	var Monitor = function () {
	  function Monitor(opt) {
	    _classCallCheck(this, Monitor);

	    var _self = this;
	    var config = opt || {};
	    var image = new Image();

	    Util.mix(_self, {
	      image: image,
	      // cnaServer: 'https://log.mmstat.com/5.gif?url=https://kcart.alipay.com/web/1.do?',
	      server: SERVER_URL
	    }, config);

	    // if (!/\bcna=/.test(doc.cookie)) {
	    //   _self._ing = true;
	    //   image.src = _self.cnaServer;
	    // }
	  }
	  /**
	   * 发送请求
	   * @param {object} opt 埋点记录参数
	   *   opt.pg：访问的页面url
	   */


	  _createClass(Monitor, [{
	    key: 'log',
	    value: function log(opt) {
	      var _self = this;
	      var config = opt || {};

	      var newObj = Util.mix({
	        pg: document.URL,
	        r: new Date().getTime()
	      }, config);

	      var d = encodeURIComponent(JSON.stringify([newObj]));

	      _self.image.src = _self.server + '?BIProfile=merge&d=' + d;
	    }
	  }]);

	  return Monitor;
	}();

	exports.default = Monitor;
	module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 图组基类
	 * @author huangtonger@aliyun.com
	 */

	var G = __webpack_require__(10).G;
	var Util = __webpack_require__(4);
	var gGroup = G.Group;

	var Group = function Group(cfg) {
	  Group.superclass.constructor.call(this, cfg);
	};

	// 获取图组内所有的shapes
	function getShapes(shapes, parent) {
	  // 当图组设置了animate为false，则不对该图组的子元素做动画
	  var children = parent.get('children');
	  Util.each(children, function (child) {
	    if (child.isGroup && child.get('visible')) {
	      getShapes(shapes, child);
	    } else {
	      shapes.push(child);
	    }
	  });
	}

	function getParent(shape, arr, root) {
	  var parent = shape.get('parent');
	  while (parent !== root) {
	    arr.push(parent);
	    parent = parent.get('parent');
	  }
	}

	Util.extend(Group, gGroup);

	Util.augment(Group, {
	  drawInner: function drawInner(context) {
	    var self = this;
	    var children = [];
	    var parents = void 0;
	    getShapes(children, self);
	    Util.radixSort(children, function (child) {
	      return child.get('zIndex');
	    });
	    // 个位
	    Util.each(children, function (child) {
	      parents = [];
	      context.save();
	      getParent(child, parents, self);
	      Util.each(parents, function (parent) {
	        parent.resetTransform(context);
	      });
	      child.draw(context);
	      context.restore();
	    });
	    return self;
	  }
	});

	module.exports = Group;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 封装图形的节点
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Element = __webpack_require__(27);
	Element.Node = __webpack_require__(125);
	Element.Edge = __webpack_require__(124);

	module.exports = Element;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点和边的基类
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Base = __webpack_require__(11);
	var ATTR_NAMES = ['color', 'shape', 'size', 'label', 'tooltip', 'style'];
	var Attr = __webpack_require__(126);
	var FILED_ORIGIN = 'origin';

	var Mapper = function Mapper(cfg) {
	  Mapper.superclass.constructor.call(this, cfg);
	  this._init();
	};

	Mapper.ATTRS = {
	  attrs: null,
	  /**
	   * 类型，是node还是edge
	   * @type {String}
	   */
	  type: null
	};

	Util.extend(Mapper, Base);

	Util.augment(Mapper, {
	  // 初始化
	  _init: function _init() {
	    this._initAttrs();
	  },

	  // 初始化属性
	  _initAttrs: function _initAttrs() {
	    var self = this;
	    var attrs = {};
	    Util.each(ATTR_NAMES, function (attrName) {
	      attrs[attrName] = new Attr({
	        type: attrName
	      });
	    });
	    self.set('attrs', attrs);
	  },

	  // 获取属性
	  _getAttr: function _getAttr(attrName) {
	    return this.get('attrs')[attrName];
	  },

	  // 第一个参数为回调函数时调用，回调函数
	  _updateCallbackMappingAttr: function _updateCallbackMappingAttr(attrName, callback) {
	    var attr = this._getAttr(attrName);
	    attr.mappingType = 'custom';
	    attr.callback = callback;
	  },

	  // 更新属性
	  _updateAutoMappingAttr: function _updateAutoMappingAttr(attrName, dim, callback) {
	    var attr = this._getAttr(attrName);
	    attr.dims = this._parseDims(dim);
	    attr.callback = callback;
	  },

	  // _updateAutoMappingAttr
	  // 将属性对应的字段名翻译成数组
	  _parseDims: function _parseDims(dims) {
	    var rst = null;
	    if (Util.isArray(dims)) {
	      rst = dims;
	    } else if (Util.isString(dims)) {
	      rst = dims.split('*');
	    } else {
	      rst = [dims];
	    }
	    return rst;
	  },

	  /**
	   * 映射对象
	   * @param  {Object} item 映射的对象
	   * @return {Object} 映射结果
	   */
	  mapping: function mapping(item) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var obj = {};
	    Util.each(attrs, function (attr) {
	      var type = attr.type;
	      if (!Util.isNull(item[type])) {
	        // 以源数据内部的属性为主，如果为设置，则以映射为准
	        obj[type] = item[type];
	      } else {
	        obj[type] = attr.getValue(item);
	      }
	    });
	    obj.x = item.x ? item.x : 0;
	    obj.y = item.y ? item.y : 0;
	    obj.style = Util.mix({}, obj.style, item.style);
	    obj.labelStyle = item.labelStyle;
	    obj[FILED_ORIGIN] = item; // 将原始对象赋值到origin
	    obj.model = item;
	    return obj;
	  }
	});

	Util.each(ATTR_NAMES, function (attrName) {
	  Mapper.prototype[attrName] = function (dim, callback) {
	    var self = this;
	    if (Util.isFunction(dim)) {
	      self._updateCallbackMappingAttr(attrName, dim);
	    } else {
	      if (attrName === 'label' && !callback) {
	        callback = function callback() {
	          return Util.toArray(arguments);
	        };
	      }
	      if (attrName === 'tooltip' && !callback) {
	        callback = function callback() {
	          var values = Util.toArray(arguments);
	          var dims = self._parseDims(dim);
	          var rst = [];
	          var i = void 0;
	          for (i = 0; i < values.length; i++) {
	            rst.push([dims[i], values[i]]);
	          }
	          return rst;
	        };
	      }
	      self._updateAutoMappingAttr(attrName, dim, callback);
	    }

	    return self;
	  };
	});

	module.exports = Mapper;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview shape 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Shape = __webpack_require__(29);
	__webpack_require__(137);
	__webpack_require__(136);
	module.exports = Shape;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Node = __webpack_require__(142);
	var MathUtil = __webpack_require__(31);
	var Global = __webpack_require__(7);

	function getAttrs(cfg) {
	  var attrs = Util.mix({}, Global.nodeStyle);
	  if (cfg.color) {
	    attrs.stroke = cfg.color;
	    attrs.fill = cfg.color;
	  }
	  if (cfg.style) {
	    Util.mix(attrs, cfg.style);
	  }
	  return attrs;
	}

	module.exports = {
	  /**
	   * 画节点
	   * @param  {String}       name  名字
	   * @param  {Object}       cfg   配置项
	   * @param  {Object}       group 图组
	   * @return {Ganvas.Shape} shape
	   */
	  drawNode: function drawNode(name, cfg, group) {
	    var attrs = getAttrs(cfg);
	    var shape = Node[name](cfg, group, attrs);
	    if (name !== 'text' && name !== 'html') {
	      shape.attr(attrs);
	    }
	    shape.set('zIndex', Global.zIndex.node);
	    shape.set('class', 'node-key-shape');
	    return shape;
	  },

	  /**
	   * 获取逼近的锚点
	   * @param {Node}    node  节点
	   * @param {Object}  point 用于逼近点
	   * @return {Object} rst   逼近点
	   */
	  getSnapAnchor: function getSnapAnchor(node, point) {
	    if (!node || !point) {
	      return false;
	    }
	    var center = node.getCenter();
	    var points = node.getAnchorPoints();
	    var v1 = MathUtil.vector(center, point);
	    var angleStash = Infinity;
	    var angle = void 0;
	    var rst = void 0;
	    var v2 = void 0;

	    Util.each(points, function (subPoint) {
	      v2 = MathUtil.vector(center, subPoint);
	      angle = v1.angleTo(v2);
	      if (angle > Math.PI) {
	        angle = 2 * Math.PI - angle;
	      }
	      if (angle < angleStash) {
	        angleStash = angle;
	        rst = subPoint;
	      }
	    });
	    return rst;
	  }
	};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 按钮悬浮变指针变小手
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.buttonPointer = function (graph) {
	  graph._on('mouseenter', function (ev) {
	    var shape = ev.shape;
	    if (shape && shape.hasClass('Button')) {
	      graph.css({
	        cursor: 'pointer'
	      });
	    }
	  });

	  graph._on('mouseleave', function (ev) {
	    var shape = ev.shape;
	    if (shape && shape.hasClass('Button')) {
	      graph.css({
	        cursor: 'default'
	      });
	    }
	  });
	};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动空白区域行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var dragCanvas = __webpack_require__(19);

	Handler.dragBlank = function (graph) {
	  dragCanvas(graph, true);
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 滚轮缩放行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var Util = __webpack_require__(4);

	Handler.wheelZoom = function (graph) {
	  var scale = 1;
	  var times = 1.05;
	  var rootGroup = graph.get('rootGroup');
	  var canvas = rootGroup.get('canvas');
	  var timer = setTimeout(function () {}, 100);
	  var scaleLimit = graph.get('wheelScaleLimit');
	  var domEvent = void 0;
	  var delta = void 0;
	  var point = void 0;
	  var matrix = void 0;

	  graph._on('mousewheel', function (ev) {
	    var domFocus = graph.get('domFocus');
	    // DOM 节点无焦点则无法缩放
	    if (!domFocus) {
	      return;
	    }
	    domEvent = ev.domEvent;
	    domEvent.preventDefault();
	    delta = domEvent.wheelDelta;
	    if (Math.abs(delta) > 10) {
	      // 控制灵敏度
	      point = canvas.getPointByClient(domEvent.clientX, domEvent.clientY);
	      point = {
	        x: point.x / canvas.get('pixelRatio'),
	        y: point.y / canvas.get('pixelRatio')
	      };
	      matrix = rootGroup.getMatrix().clone();
	      if (delta > 0) {
	        scale = scale * times;
	        Util.scaleMatrix(times, point, matrix);
	      } else {
	        scale = scale / times;
	        Util.scaleMatrix(1 / times, point, matrix);
	      }

	      // 超出缩放限制则返回
	      if (!Util.isBetween(matrix.elements[0], scaleLimit[0], scaleLimit[1])) {
	        return;
	      }
	      graph.setCapture(false);
	      graph.updateMatrix(matrix);
	      graph.refresh();
	      graph.fire('wheelzoom', Util.mix({
	        scale: matrix.elements[0]
	      }, ev));
	      clearTimeout(timer);
	      timer = setTimeout(function () {
	        graph.setCapture(true);
	        graph.fire('wheelzoomend', Util.mix({
	          scale: matrix.elements[0]
	        }, ev));
	        graph.draw(false);
	      }, 60);
	    }
	  });
	};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	// TODO 待重构

	var layouts = {
	  CompactBoxTree: __webpack_require__(172),
	  Dendrogram: __webpack_require__(177),
	  IndentedTree: __webpack_require__(178),
	  LayeredTidyTree: __webpack_require__(179),
	  TreeLayout: __webpack_require__(14)
	};

	module.exports = layouts;

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	"use strict";

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// wrap tree node
	var WrappedTree = function WrappedTree(w, h, y) {
	  var c = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

	  _classCallCheck(this, WrappedTree);

	  var me = this;
	  // size
	  me.w = w || 0;
	  me.h = h || 0;

	  // position
	  me.y = y || 0;
	  me.x = 0;

	  // children
	  me.c = c || [];
	  me.cs = c.length;

	  // modified
	  me.prelim = 0;
	  me.mod = 0;
	  me.shift = 0;
	  me.change = 0;

	  // left/right tree
	  me.tl = null;
	  me.tr = null;

	  // extreme left/right tree
	  me.el = null;
	  me.er = null;

	  // modified left/right tree
	  me.msel = 0;
	  me.mser = 0;
	};

	WrappedTree.fromNode = function (root, isHorizontal) {
	  if (!root) return null;
	  var children = [];
	  root.children.forEach(function (child) {
	    children.push(WrappedTree.fromNode(child, isHorizontal));
	  });
	  if (isHorizontal) return new WrappedTree(root.height, root.width, root.x, children);
	  return new WrappedTree(root.width, root.height, root.y, children);
	};

	// node utils
	function moveRight(node, move, isHorizontal) {
	  if (isHorizontal) {
	    node.y += move;
	  } else {
	    node.x += move;
	  }
	  node.children.forEach(function (child) {
	    moveRight(child, move, isHorizontal);
	  });
	}

	function getMin(node, isHorizontal) {
	  var res = isHorizontal ? node.y : node.x;
	  node.children.forEach(function (child) {
	    res = Math.min(getMin(child, isHorizontal), res);
	  });
	  return res;
	}

	function normalize(node, isHorizontal) {
	  var min = getMin(node, isHorizontal);
	  moveRight(node, -min, isHorizontal);
	}

	function convertBack(converted /* WrappedTree */, root /* TreeNode */, isHorizontal) {
	  if (isHorizontal) {
	    root.y = converted.x;
	  } else {
	    root.x = converted.x;
	  }
	  converted.c.forEach(function (child, i) {
	    convertBack(child, root.children[i], isHorizontal);
	  });
	}

	function layer(node, isHorizontal) {
	  var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	  if (isHorizontal) {
	    node.x = d;
	    d += node.width;
	  } else {
	    node.y = d;
	    d += node.height;
	  }
	  node.children.forEach(function (child) {
	    layer(child, isHorizontal, d);
	  });
	}

	module.exports = function (root) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  var isHorizontal = options.isHorizontal;
	  function firstWalk(t) {
	    if (t.cs === 0) {
	      setExtremes(t);
	      return;
	    }
	    firstWalk(t.c[0]);
	    var ih = updateIYL(bottom(t.c[0].el), 0, null);
	    for (var i = 1; i < t.cs; ++i) {
	      firstWalk(t.c[i]);
	      var min = bottom(t.c[i].er);
	      separate(t, i, ih);
	      ih = updateIYL(min, i, ih);
	    }
	    positionRoot(t);
	    setExtremes(t);
	  }

	  function setExtremes(t) {
	    if (t.cs === 0) {
	      t.el = t;
	      t.er = t;
	      t.msel = t.mser = 0;
	    } else {
	      t.el = t.c[0].el;
	      t.msel = t.c[0].msel;
	      t.er = t.c[t.cs - 1].er;
	      t.mser = t.c[t.cs - 1].mser;
	    }
	  }

	  function separate(t, i, ih) {
	    var sr = t.c[i - 1];
	    var mssr = sr.mod;
	    var cl = t.c[i];
	    var mscl = cl.mod;
	    while (sr !== null && cl !== null) {
	      if (bottom(sr) > ih.low) ih = ih.nxt;
	      var dist = mssr + sr.prelim + sr.w - (mscl + cl.prelim);
	      if (dist > 0) {
	        mscl += dist;
	        moveSubtree(t, i, ih.index, dist);
	      }
	      var sy = bottom(sr);
	      var cy = bottom(cl);
	      if (sy <= cy) {
	        sr = nextRightContour(sr);
	        if (sr !== null) mssr += sr.mod;
	      }
	      if (sy >= cy) {
	        cl = nextLeftContour(cl);
	        if (cl !== null) mscl += cl.mod;
	      }
	    }
	    if (!sr && !!cl) {
	      setLeftThread(t, i, cl, mscl);
	    } else if (!!sr && !cl) {
	      setRightThread(t, i, sr, mssr);
	    }
	  }

	  function moveSubtree(t, i, si, dist) {
	    t.c[i].mod += dist;
	    t.c[i].msel += dist;
	    t.c[i].mser += dist;
	    distributeExtra(t, i, si, dist);
	  }

	  function nextLeftContour(t) {
	    return t.cs === 0 ? t.tl : t.c[0];
	  }

	  function nextRightContour(t) {
	    return t.cs === 0 ? t.tr : t.c[t.cs - 1];
	  }

	  function bottom(t) {
	    return t.y + t.h;
	  }

	  function setLeftThread(t, i, cl, modsumcl) {
	    var li = t.c[0].el;
	    li.tl = cl;
	    var diff = modsumcl - cl.mod - t.c[0].msel;
	    li.mod += diff;
	    li.prelim -= diff;
	    t.c[0].el = t.c[i].el;
	    t.c[0].msel = t.c[i].msel;
	  }

	  function setRightThread(t, i, sr, modsumsr) {
	    var ri = t.c[i].er;
	    ri.tr = sr;
	    var diff = modsumsr - sr.mod - t.c[i].mser;
	    ri.mod += diff;
	    ri.prelim -= diff;
	    t.c[i].er = t.c[i - 1].er;
	    t.c[i].mser = t.c[i - 1].mser;
	  }

	  function positionRoot(t) {
	    t.prelim = (t.c[0].prelim + t.c[0].mod + t.c[t.cs - 1].mod + t.c[t.cs - 1].prelim + t.c[t.cs - 1].w) / 2 - t.w / 2;
	  }

	  function secondWalk(t, modsum) {
	    modsum += t.mod;
	    t.x = t.prelim + modsum;
	    addChildSpacing(t);
	    for (var i = 0; i < t.cs; i++) {
	      secondWalk(t.c[i], modsum);
	    }
	  }

	  function distributeExtra(t, i, si, dist) {
	    if (si !== i - 1) {
	      var nr = i - si;
	      t.c[si + 1].shift += dist / nr;
	      t.c[i].shift -= dist / nr;
	      t.c[i].change -= dist - dist / nr;
	    }
	  }

	  function addChildSpacing(t) {
	    var d = 0;
	    var modsumdelta = 0;
	    for (var i = 0; i < t.cs; i++) {
	      d += t.c[i].shift;
	      modsumdelta += d + t.c[i].change;
	      t.c[i].mod += modsumdelta;
	    }
	  }

	  function updateIYL(low, index, ih) {
	    while (ih !== null && low >= ih.low) {
	      ih = ih.nxt;
	    }
	    return {
	      low: low,
	      index: index,
	      nxt: ih
	    };
	  }

	  // do layout
	  layer(root, isHorizontal);
	  var wt = WrappedTree.fromNode(root, isHorizontal);
	  firstWalk(wt);
	  secondWalk(wt, 0);
	  convertBack(wt, root, isHorizontal);
	  normalize(root, isHorizontal);

	  return root;
	};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Node = __webpack_require__(33);

	module.exports = function (root, options) {
	  // separate into left and right trees
	  var left = new Node(root.data, options, true); // root only
	  var right = new Node(root.data, options, true); // root only
	  // automatically
	  // TODO separate left and right tree by meta data
	  var treeSize = root.children.length;
	  var rightTreeSize = Math.round(treeSize / 2);
	  for (var i = 0; i < treeSize; i++) {
	    var child = root.children[i];
	    if (i < rightTreeSize) {
	      right.children.push(child);
	    } else {
	      left.children.push(child);
	    }
	  }
	  return {
	    left: left,
	    right: right
	  };
	};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var ANCHORS_BY_DIRECTION = __webpack_require__(173);
	var getReverseDirection = __webpack_require__(180);

	function setAnchors(node, d1, d2, options) {
	  if (options.forceAlign) {
	    node.align = options.forceAlign;
	  } else {
	    if (node.isRoot() && (options.direction === 'H' || options.direction === 'V')) {
	      node.align = options.isHorizontal ? 'CH' : 'CV';
	    } else {
	      node.align = node.isLeaf() ? getReverseDirection(d2) : d2;
	    }
	  }
	  node.inAnchor = ANCHORS_BY_DIRECTION[d1];
	  node.outAnchor = ANCHORS_BY_DIRECTION[d2];
	}

	module.exports = function (root, d1, d2) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	  var single = arguments[4];

	  if (single) {
	    setAnchors(root, d1, d2, options);
	  } else {
	    root.eachNode(function (node) {
	      setAnchors(node, d1, d2, options);
	    });
	  }
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	var ColorCal = __webpack_require__(73);

	ColorCal.Util = __webpack_require__(34);

	module.exports = ColorCal;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview calculate the color
	 * @author dxq613@gmail.com
	 */

	'use strict';
	var cUtil = __webpack_require__(34);
	var Util = __webpack_require__(1);

	// get percent value
	function getValue(start, end, left, index) {
	  var value = start[index] + (end[index] - start[index]) * left;
	  return value;
	}
	var CalColor = {
	  calColor: function(points, percent, space) {
	    var steps = points.length - 1;
	    var step = Math.floor(steps * percent);
	    var left = steps * percent - step;
	    var start = points[step];
	    var end = step === steps ? start : points[step + 1];
	    var rgb;
	    if (space === 'hsl') {
	      rgb = cUtil.hsl2Rgb([getValue(start, end, left, 0), getValue(start, end, left, 1), getValue(start, end, left, 2)]);
	    } else {
	      rgb = {
	        r: getValue(start, end, left, 0),
	        g: getValue(start, end, left, 1),
	        b: getValue(start, end, left, 2)
	      };
	      rgb = '#' + cUtil.toHex(rgb.r) + cUtil.toHex(rgb.g) + cUtil.toHex(rgb.b);
	    }
	    return rgb;
	  },
	  lightness: function(percent, hue) {
	    hue = hue || 0;
	    var points = [
	      [hue, 1, 0.9],
	      [hue, 1, 0.5]
	    ];
	    return CalColor.calColor(points, percent, 'hsl');
	  },
	  /**
	   * 渐变的红色
	   * @param  {Number} percent 百分比
	   * @return {String}
	   */
	  red: function(percent) {
	    return CalColor.lightness(percent, 0);
	  },
	  /**
	   * 渐变的蓝色
	   * @param  {Number} percent 百分比
	   * @return {String}
	   */
	  blue: function(percent) {
	    return CalColor.lightness(percent, 0.66);
	  },
	  /**
	   * 渐变的绿色
	   * @param  {Number} percent 百分比
	   * @return {String}
	   */
	  green: function(percent) {
	    return CalColor.lightness(percent, 0.33);
	  },
	  gradient: function(colors) {
	    var points = [];
	    if (Util.isString(colors)) {
	      colors = colors.split('-');
	    }
	    Util.each(colors, function(color) {
	      if (color.indexOf('#') === -1) {
	        color = cUtil.toRGB(color);
	      }
	      points.push(cUtil.rgb2arr(color));
	    });
	    return function(percent) {
	      return CalColor.calColor(points, percent);
	    };
	  },
	  gradientHsl: function(colors) {
	    var points = [];
	    if (Util.isString(colors)) {
	      colors = colors.split('-');
	    }
	    Util.each(colors, function(color) {
	      if (color.indexOf('#') === -1) {
	        color = cUtil.toRGB(color);
	      }
	      points.push(cUtil.rgb2hsl(color));
	    });
	    return function(percent) {
	      return CalColor.calColor(points, percent, 'hsl');
	    };
	  },
	  saturation: function(percent, hue) {
	    hue = hue || 0;
	    var points = [
	      [hue, 0, 0.5],
	      [hue, 1, 0.5]
	    ];
	    return CalColor.calColor(points, percent, 'hsl');
	  },
	  hue: function(percent) {
	    var points = [
	      [0, 1, 0.5],
	      [1, 1, 0.5]
	    ];
	    return CalColor.calColor(points, percent, 'hsl');
	  },
	  /**
	   * get a gray color,use the percent
	   * @param  {Number} percent the percent of gray
	   * @return {String} color
	   */
	  brightness: function(percent) {
	    var points = [
	      [255, 255, 255],
	      [0, 0, 0]
	    ];
	    return CalColor.calColor(points, percent);
	  },
	  /**
	   * get a heat color,use the percent
	   * @param  {Number} percent the percent of heat
	   * @return {String} color
	   */
	  heat: function(percent) {
	    var points = [
	      [255, 255, 255],
	      [255, 255 * 0.5, 0],
	      [0, 0, 0]
	    ];
	    return CalColor.calColor(points, percent);
	  },
	  /**
	   * get a rainbow color,use the percent
	   * @param  {Number} percent the percent of rainbow
	   * @return {String} color
	   */
	  rainbow: function(percent) {
	    var points = [
	      [0, 255, 255],
	      [0, 0, 255],
	      [0, 255, 0],
	      [255, 0, 0]
	    ];
	    return CalColor.calColor(points, percent);
	  },
	  /**
	   * get a circular color,use the percent
	   * @param  {Number} percent the percent of circular
	   * @return {String} color
	   */
	  circular: function(percent) {
	    var points = [
	      [0, 0, 255],
	      [0, 255, 0],
	      [255, 255, 0],
	      [255, 0, 0],
	      [0, 0, 255]
	    ];
	    return CalColor.calColor(points, percent);
	  },
	  /**
	   * get a bipolar color,use the percent
	   * @param  {Number} percent the percent of bipolar
	   * @return {String} color
	   */
	  bipolar: function(percent) {
	    var points = [
	      [0, 255, 0],
	      [0, 0, 0],
	      [255, 0, 0]
	    ];
	    return CalColor.calColor(points, percent);
	  }
	};
	module.exports = CalColor;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 基类，用于设置、获取值，继承父类的ATTRS，事件处理等
	 */

	"use strict";

	var Util = __webpack_require__(1);
	var Base;

	// copy attr
	function initClassAttrs(c){
	  if(c._attrs || c === Base){
	    return;
	  }

	  var superCon = c.superclass.constructor;
	  if(superCon && !superCon._attrs){
	    initClassAttrs(superCon);
	  }
	  c._attrs =  {};
	  
	  Util.mix(true,c._attrs,superCon._attrs);
	  Util.mix(true,c._attrs,c.ATTRS);
	}

	Base = function (cfg) {
	  initClassAttrs(this.constructor); // 初始化类的属性
	  this._attrs = {}; // 存放变量
	  this.events = {};
	  var defaultCfg = this.getDefaultCfg(); 
	  Util.mix(this._attrs,defaultCfg,cfg); // 复制属性到对象
	};

	Util.augment(Base,{

	  /**
	   * @protected
	   * get the default cfg
	   * @return {Object} default cfg
	   */
	  getDefaultCfg: function(){
	    var _self = this,
	      con = _self.constructor,
	      attrs = con._attrs,
	      rst = Util.mix(true,{},attrs);
	    return rst;
	  },
	  /**
	   * 设置属性信息
	   * @protected
	   */
	  set : function(name,value){
	    var m = '_onRender' + Util.ucfirst(name);
	    if(this[m]){
	      this[m](value,this._attrs[name]);
	    }
	    this._attrs[name] = value;
	    return this;
	  },
	  /**
	   * get the property
	   * @protected
	   */
	  get : function(name){
	    return this._attrs[name];
	  },
	  /**
	   * bind event
	   * @param  {String}   eventType event type
	   * @param  {Function} fn  callback function
	   */
	  on : function(eventType,fn){

	    var self = this,
	      events = self.events,
	      callbacks = events[eventType];

	    if(!callbacks){
	      callbacks = events[eventType] = [];
	    }
	    callbacks.push(fn);
	    return self;
	  },
	  /**
	   * fire the event
	   * @param  {String} eventType event type
	   */
	  fire : function(eventType,eventObj){
	    var _self = this,
	      events = _self.events,
	      callbacks = events[eventType];
	    if(callbacks){
	      Util.each(callbacks,function(m){
	        m(eventObj);
	      });
	    }
	  },
	  /**
	   * remove the event
	   * @param  {String}   eventType event type
	   * @param  {Function} fn  the callback function
	   */
	  off : function(eventType,fn){
	    var self = this,
	      events = self.events,
	      callbacks = events[eventType];
	    if(!eventType){
	      self.events = {};
	      return self;
	    }    
	    if(callbacks){
	      Util.remove(callbacks,fn);
	    }
	    return self;
	  },
	  /**
	   * remove the events
	   * @param  {String} eventType event type
	   */
	  offEvents: function(eventType) {
	    var self = this,
	      events = self.events;
	    if(!eventType){
	      self.events = {};
	      return self;
	    }
	    events[eventType] = null;
	    return self;
	  },
	  /**
	   * 析构函数
	   */
	  destroy : function(){
	    var self = this;
	    var destroyed = self.destroyed;

	    if(destroyed){
	      return self;
	    }
	    self._attrs = {};
	    self.events = {};
	    self.destroyed = true;
	  }

	});



	module.exports = Base;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(54);
	var MouseEvent = __webpack_require__(78);
	var G = __webpack_require__(38);

	var Canvas = function(cfg) {
	  Canvas.superclass.constructor.call(this, cfg);
	};

	Canvas.CFG = {

	  eventEnable: true,
	  /**
	   * 像素宽度
	   * @type {Number}
	   */
	  width: null,
	  /**
	   * 像素高度
	   * @type {Number}
	   */
	  height: null,
	  /**
	   * 画布宽度
	   * @type {Number}
	   */
	  widthCanvas: null,
	  /**
	   * 画布高度
	   * @type {Number}
	   */
	  heightCanvas: null,
	  /**
	   * CSS宽
	   * @type {String}
	   */
	  widthStyle: null,
	  /**
	   * CSS高
	   * @type {String}
	   */
	  heightStyle: null,
	  /**
	   * 容器DOM
	   * @type {Object}
	   */
	  containerDOM: null,
	  /**
	   * 当前Canvas的DOM
	   * @type {Object}
	   */
	  canvasDOM: null,
	  /**
	   * 屏幕像素比
	   * @type {Number}
	   */
	  pixelRatio: null
	};

	Util.extend(Canvas, G.Group);

	Util.augment(Canvas, {
	  init: function() {
	    /**
	     * 执行父类的父类的init方法
	     */
	    Canvas.superclass.init.call(this);

	    /**
	     * @SET {Number} pixelRatio 屏幕像素比
	     */
	    this._setGlobalParam();
	    /**
	     * @SET {Object} containerDOM 容器
	     * @SET {Object} layer        图层
	     */
	    this._setDOM();
	    /**
	     * @SET {Number} width    Canvas 宽度
	     * @SET {Number} height   Canvas 高度
	     * @SET {Number} widthCanvas  px     宽度
	     * @SET {Number} heightCanvas px     高度
	     */
	    this._setInitSize();
	    this._setCanvas();
	    this._scale();
	    if (this.get('eventEnable')) {
	      this._registEvents();
	    }
	  },
	  _registEvents: function() {
	    var self = this;
	    var el = self.get('el');
	    var mouseEvent = new MouseEvent(self);

	    el.addEventListener('mouseout', function(e) {
	      mouseEvent.mouseout(e);
	    }, false);

	    el.addEventListener('mouseover', function(e) {
	      mouseEvent.mouseover(e);
	    }, false);

	    el.addEventListener('mousemove', function(e) {
	      mouseEvent.mousemove(e);
	    }, false);

	    el.addEventListener('mousedown', function(e) {
	      mouseEvent.mousedown(e);
	    }, false);

	    el.addEventListener('mouseup', function(e) {
	      mouseEvent.mouseup(e);
	    }, false);

	    el.addEventListener('click', function(e) {
	      mouseEvent.click(e);
	    }, false);

	    el.addEventListener('dblclick', function(e) {
	      mouseEvent.dblclick(e);
	    }, false);
	  },
	  // 初始化缩放
	  _scale: function() {
	    var pixelRatio = this.get('pixelRatio');
	    this.scale(pixelRatio, pixelRatio);
	  },
	  // 设置画布
	  _setCanvas: function() {
	    var canvasDOM = this.get('canvasDOM');
	    this.set('el', canvasDOM);
	    this.set('context', canvasDOM.getContext('2d'));
	    this.set('canvas', this);
	  },
	  /**
	   * 设置全局参数
	   */
	  _setGlobalParam: function() {
	    var pixelRatio = this.get('pixelRatio');
	    if (!pixelRatio) {
	      this.set('pixelRatio', Util.getRatio());
	    }
	    return;
	  },
	  /**
	   * 设置所有DOM
	   */
	  _setDOM: function() {
	    this._setContainer();
	    this._setLayer();
	  },
	  /**
	   * 设置容器DOM
	   */
	  _setContainer: function() {
	    var containerId = this.get('containerId');
	    var containerDOM = this.get('containerDOM');
	    if (!containerDOM) {
	      containerDOM = document.getElementById(containerId);
	      this.set('containerDOM', containerDOM);
	    }
	    Util.modiCSS(containerDOM, {
	      position: 'relative'
	    });
	  },
	  /**
	   * 设置图层DOM
	   */
	  _setLayer: function() {
	    var containerDOM = this.get('containerDOM');
	    var canvasId = Util.guid('canvas_');
	    if (containerDOM) {
	      var canvasDOM = Util.createDom('<canvas id="' + canvasId + '"></canvas>');
	      containerDOM.appendChild(canvasDOM);
	      this.set('canvasDOM', canvasDOM);
	    }
	  },
	  /**
	   * 设置初始画布参数
	   */
	  _setInitSize: function() {
	    if (this.get('widthStyle')) {
	      this.changeSizeByCss(this.get('widthStyle'), this.get('heightStyle'));
	    } else if (this.get('width')) {
	      this.changeSize(this.get('width'), this.get('height'));
	    }
	  },
	  /**
	   * 获取像素长度
	   */
	  _getPx: function(edge, value) {
	    var canvasDOM = this.get('canvasDOM');
	    canvasDOM.style[edge] = value;
	    var clientRect = Util.getBoundingClientRect(canvasDOM);
	    if (edge === 'width') {
	      return clientRect.right - clientRect.left;
	    } else if (edge === 'height') {
	      return clientRect.bottom - clientRect.top;
	    }
	  },
	  /**
	   * 重设画布尺寸
	   */
	  _reSize: function() {
	    var canvasDOM = this.get('canvasDOM');
	    var widthCanvas = this.get('widthCanvas');
	    var heightCanvas = this.get('heightCanvas');
	    var widthStyle = this.get('widthStyle');
	    var heightStyle = this.get('heightStyle');

	    canvasDOM.style.width = widthStyle;
	    canvasDOM.style.height = heightStyle;
	    canvasDOM.setAttribute('width', widthCanvas);
	    canvasDOM.setAttribute('height', heightCanvas);
	  },
	  /**
	   * 获取宽度
	   */
	  getWidth: function() {
	    var pixelRatio = this.get('pixelRatio');
	    var width = this.get('width');
	    return width * pixelRatio;
	  },
	  /**
	   * 获取高度
	   */
	  getHeight: function() {
	    var pixelRatio = this.get('pixelRatio');
	    var height = this.get('height');
	    return height * pixelRatio;
	  },
	  /**
	   * 通过css设置画布尺寸
	   * @param  {String} CSS width
	   * @param  {String} CSS height
	   */
	  changeSizeByCss: function(width, height) {
	    var pixelRatio = this.get('pixelRatio');
	    width = this._getPx('width', width);
	    height = this._getPx('height', height);
	    var widthCanvas = width * pixelRatio;
	    var heightCanvas = height * pixelRatio;

	    this.set('widthStyle', width);
	    this.set('heightStyle', height);
	    this.set('widthCanvas', widthCanvas);
	    this.set('heightCanvas', heightCanvas);
	    this.set('width', width);
	    this.set('height', height);
	    this._reSize();
	  },
	  /**
	   * 设置画布尺寸
	   * @param  {Number} Canvas width
	   * @param  {Number} Canvas height
	   * @param  {Number} pixelRatio height
	   */
	  changeSize: function(width, height) {
	    var pixelRatio = this.get('pixelRatio');
	    var widthCanvas = width * pixelRatio;
	    var heightCanvas = height * pixelRatio;

	    this.set('widthCanvas', widthCanvas);
	    this.set('heightCanvas', heightCanvas);
	    this.set('widthStyle', width + 'px');
	    this.set('heightStyle', height + 'px');
	    this.set('width', width);
	    this.set('height', height);
	    this._reSize();
	  },
	  /**
	   * 将窗口坐标转变成 canvas 坐标
	   * @param  {Number} clientX 窗口x坐标
	   * @param  {Number} clientY 窗口y坐标
	   * @return {Object} canvas坐标
	   */
	  getPointByClient: function(clientX, clientY) {
	    var el = this.get('el');
	    var bbox = el.getBoundingClientRect();
	    var width = bbox.right - bbox.left;
	    var height = bbox.bottom - bbox.top;
	    return {
	      x: (clientX - bbox.left) * (el.width / width),
	      y: (clientY - bbox.top) * (el.height / height)
	    };
	  },
	  /**
	   * 将 canvas 坐标转变成窗口坐标
	   * @param  {Number} x canvas x坐标
	   * @param  {Number} x canvas y坐标
	   * @return {Object} 窗口坐标
	   */
	  getClientByPoint: function(x, y) {
	    var el = this.get('el');
	    var bbox = el.getBoundingClientRect();
	    var width = bbox.right - bbox.left;
	    var height = bbox.bottom - bbox.top;
	    return {
	      clientX: x / (el.width / width) + bbox.left,
	      clientY: y / (el.height / height) + bbox.top
	    };
	  },
	  beforeDraw: function() {
	    var context = this.get('context');
	    var el = this.get('el');
	    context && context.clearRect(0, 0, el.width, el.height);
	  },
	  _beginDraw: function() {
	    this.setSilent('toDraw', true);
	  },
	  _endDraw: function() {
	    this.setSilent('toDraw', false);
	  },
	  draw: function() {
	    var self = this;
	    function drawInner() {
	      self.set('animateHandler', Util.requestAnimationFrame(function() {
	        self.set('animateHandler', undefined);
	        if (self.get('toDraw')) {
	          drawInner();
	        }
	      }));
	      self.beforeDraw();
	      try {
	        var context = self.get('context');
	        Canvas.superclass.draw.call(self, context);
	        // self._drawCanvas();
	      } catch (ev) { // 绘制时异常，中断重绘
	        console.warn('error in draw canvas, detail as:');
	        console.warn(ev);
	        self._endDraw();
	      }
	      self._endDraw();
	    }

	    if (self.get('destroyed')) {
	      return;
	    }
	    if (self.get('animateHandler')) {
	      this._beginDraw();
	    } else {
	      drawInner();
	    }
	  },
	  /**
	   * 销毁
	   */
	  destroy: function() {
	    var containerDOM = this.get('containerDOM');
	    var canvasDOM = this.get('canvasDOM');
	    if (canvasDOM && containerDOM) {
	      containerDOM.removeChild(canvasDOM);
	    }
	    Canvas.superclass.destroy.call(this);
	  }
	});

	module.exports = Canvas;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 事件基类
	 # @author hankaiai@126.com 韩凯
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var Event = function(type, event, bubbles, cancelable) {
	  this.type = type; // 事件类型
	  this.target = null; // 目标
	  this.currentTarget = null; // 当前目标
	  this.bubbles = bubbles; // 冒泡
	  this.cancelable = cancelable; // 是否能够阻止
	  this.timeStamp = (new Date()).getTime(); // 时间戳
	  this.defaultPrevented = false; // 阻止默认
	  this.propagationStopped = false; // 阻止冒泡
	  this.removed = false; // 是否被移除
	  this.event = event; // 触发的原生事件
	};


	Util.augment(Event, {
	  preventDefault: function() {
	    this.defaultPrevented = this.cancelable && true;
	  },
	  stopPropagation: function() {
	    this.propagationStopped = true;
	  },
	  remove: function() {
	    this.remove = true;
	  },
	  clone: function() {
	    return Util.clone(this);
	  },
	  toString: function() {
	    return '[Event (type=' + this.type + ')]';
	  }
	});

	module.exports = Event;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Event = __webpack_require__(76);

	module.exports = {
	  /**
	   * 事件分发器的处理函数
	   */
	  initEventDispatcher: function() {
	    this.__listeners = {};
	  },
	  /**
	   * 为对象注册事件
	   * @param  {String} type 事件类型
	   * @param  {Function} listener 回调函数
	   * @return {Object} this
	   */
	  on: function(type, listener) {
	    var listeners = this.__listeners;

	    if (Util.isNull(listeners[type])) {
	      listeners[type] = [];
	    }

	    if (listeners[type].indexOf(listener) === -1) {
	      listeners[type].push(listener);
	    }
	    return this;
	  },
	  /**
	   * 为对象取消事件回调
	   * 三个模式
	   * 模式1: 没有参数的时候，取消所有回调处理函数
	   * 模式2: 只有type的时候，取消所有type的回调类别
	   * 模式3: 同时具有type, listener参数时，只取消type中listener对应的回调
	   * @param  {String} type 事件类型
	   * @param  {Function} listener 回调函数
	   * @return {Object} this
	   */
	  off: function(type, listener) {
	    var listeners = this.__listeners;
	    if (arguments.length === 0) {
	      this.__listeners = {};
	      return this;
	    }

	    if (arguments.length === 1 && Util.isString(type)) {
	      listeners[type] = [];
	      return this;
	    }

	    if (arguments.length === 2 && Util.isString(type) && Util.isFunction(listener)) {
	      Util.remove(listeners[type], listener);
	      return this;
	    }
	  },
	  /**
	   * 判断某个listener是否是当前对象的回调函数
	   * @param  {String} type 事件类型
	   * @param  {Function} listener 回调函数
	   * @return {Object} this
	   */
	  has: function(type, listener) {
	    var listeners = this.__listeners;

	    if (arguments.length === 0) {
	      if (!Util.isBlank(listeners)) {
	        return true;
	      }
	    }

	    if (arguments.length === 1) {
	      if (listeners[type] && !Util.isBlank(listeners[type])) {
	        return true;
	      }
	    }

	    if (arguments.length === 2) {
	      if (listeners[type] && listeners[type].indexOf(listener) !== -1) {
	        return true;
	      }
	    }

	    return false;
	  },
	  trigger: function(event) {
	    var self = this;
	    var listeners = self.__listeners;
	    var listenersArray = listeners[event.type];
	    event.target = self;
	    if (Util.notNull(listenersArray)) {
	      listenersArray.forEach(function(listener) {
	        listener.call(self, event);
	      });
	    }
	    if (event.bubbles) {
	      var parent = self.get('parent');
	      if (parent && !event.propagationStopped) {
	        parent.trigger(event);
	      }
	    }
	    return self;
	  },
	  /**
	   * fire the event
	   * @param  {String} eventType event type
	   */
	  fire: function(eventType, eventObj) {
	    var event = new Event(eventType);
	    Util.each(eventObj, function(v, k) {
	      event[k] = v;
	    });
	    this.trigger(event);
	  }
	};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview mouse 事件
	 * @author hankaiai@126.com
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var Event = __webpack_require__(91);

	var MouseEvent = function(canvas) {
	  this.canvas = canvas;
	  this.el = canvas.get('el');
	  this.current = null;
	  this.pre = null;
	};

	Util.augment(MouseEvent, {
	  tryTrigger: function(element, event) {
	    if (element.__listeners) {
	      element.trigger(event);
	    } else {
	      return;
	    }
	  },
	  getCurrent: function(e) {
	    var canvas = this.canvas;
	    var point = canvas.getPointByClient(e.clientX, e.clientY);
	    this.point = point;
	    this.pre = this.current;
	    this.current = canvas.getShape(point.x, point.y);
	  },
	  mousemove: function(e) {
	    this.getCurrent(e);
	    var point = this.point;
	    var canvas = this.canvas;
	    if (canvas.has('canvas-mousemove')) {
	      var canvasmousemove = new Event('canvas-mousemove', e, true, true);
	      canvasmousemove.x = point.x;
	      canvasmousemove.y = point.y;
	      canvasmousemove.clientX = e.clientX;
	      canvasmousemove.clientY = e.clientY;
	      canvasmousemove.currentTarget = canvas;
	      this.tryTrigger(canvas, canvasmousemove);
	    }

	    if (this.pre && this.pre !== this.current) {
	      var mouseleave = new Event('mouseleave', e, true, true);
	      mouseleave.x = point.x;
	      mouseleave.y = point.y;
	      mouseleave.clientX = e.clientX;
	      mouseleave.clientY = e.clientY;
	      mouseleave.currentTarget = this.pre;
	      mouseleave.target = this.pre;
	      this.tryTrigger(this.pre, mouseleave);
	    }

	    if (this.current) {
	      var mousemove = new Event('mousemove', e, true, true);
	      mousemove.x = point.x;
	      mousemove.y = point.y;
	      mousemove.clientX = e.clientX;
	      mousemove.clientY = e.clientY;
	      mousemove.currentTarget = this.current;
	      mousemove.target = this.current;
	      this.tryTrigger(this.current, mousemove);

	      if (this.pre !== this.current) {
	        var mouseenter = new Event('mouseenter', e, true, true);
	        mouseenter.x = point.x;
	        mouseenter.y = point.y;
	        mouseenter.clientX = e.clientX;
	        mouseenter.clientY = e.clientY;
	        mouseenter.currentTarget = this.current;
	        mouseenter.target = this.current;
	        this.tryTrigger(this.current, mouseenter);
	      }
	    }
	  },
	  mousedown: function(e) {
	    var point = this.point;
	    var canvas = this.canvas;

	    if (canvas.has('canvas-mousedown')) {
	      var canvasmousedown = new Event('canvas-mousedown', e, true, true);
	      canvasmousedown.x = point.x;
	      canvasmousedown.y = point.y;
	      canvasmousedown.clientX = e.clientX;
	      canvasmousedown.clientY = e.clientY;
	      canvasmousedown.currentTarget = canvas;
	      this.tryTrigger(canvas, canvasmousedown);
	    }


	    if (this.current) {
	      var mousedown = new Event('mousedown', e, true, true);
	      mousedown.x = point.x;
	      mousedown.y = point.y;
	      mousedown.clientX = e.clientX;
	      mousedown.clientY = e.clientY;
	      mousedown.currentTarget = this.current;
	      mousedown.target = this.current;
	      this.tryTrigger(this.current, mousedown);
	    }
	  },
	  mouseup: function(e) {
	    var point = this.point;
	    var canvas = this.canvas;
	    if (canvas.has('canvas-mouseup')) {
	      var canvasmouseup = new Event('canvas-mouseup', e, true, true);
	      canvasmouseup.x = point.x;
	      canvasmouseup.y = point.y;
	      canvasmouseup.clientX = e.clientX;
	      canvasmouseup.clientY = e.clientY;
	      canvasmouseup.currentTarget = canvas;
	      this.tryTrigger(canvas, canvasmouseup);
	    }
	    if (this.current) {
	      var mouseup = new Event('mouseup', e, true, true);
	      mouseup.x = point.x;
	      mouseup.y = point.y;
	      mouseup.clientX = e.clientX;
	      mouseup.clientY = e.clientY;
	      mouseup.currentTarget = this.current;
	      mouseup.target = this.current;
	      this.tryTrigger(this.current, mouseup);
	    }
	  },
	  click: function(e) {
	    this.getCurrent(e);
	    var point = this.point;
	    var canvas = this.canvas;
	    if (canvas.has('canvas-click')) {
	      var canvasclick = new Event('canvas-click', e, true, true);
	      canvasclick.x = point.x;
	      canvasclick.y = point.y;
	      canvasclick.clientX = e.clientX;
	      canvasclick.clientY = e.clientY;
	      canvasclick.currentTarget = canvas;
	      this.tryTrigger(canvas, canvasclick);
	    }

	    if (this.current) {
	      var click = new Event('click', e, true, true);
	      click.x = point.x;
	      click.y = point.y;
	      click.clientX = e.clientX;
	      click.clientY = e.clientY;
	      click.currentTarget = this.current;
	      click.target = this.current;
	      this.tryTrigger(this.current, click);
	    }
	  },
	  dblclick: function(e) {
	    var point = this.point;
	    var canvas = this.canvas;

	    if (canvas.has('canvas-dblclick')) {
	      var canvasdblclick = new Event('canvas-dblclick', e, true, true);
	      canvasdblclick.x = point.x;
	      canvasdblclick.y = point.y;
	      canvasdblclick.clientX = e.clientX;
	      canvasdblclick.clientY = e.clientY;
	      canvasdblclick.currentTarget = canvas;
	      this.tryTrigger(canvas, canvasdblclick);
	    }


	    if (this.current) {
	      var dblclick = new Event('dblclick', e, true, true);
	      dblclick.x = point.x;
	      dblclick.y = point.y;
	      dblclick.clientX = e.clientX;
	      dblclick.clientY = e.clientY;
	      dblclick.currentTarget = this.current;
	      dblclick.target = this.current;
	      this.tryTrigger(this.current, dblclick);
	    }
	  },
	  mouseout: function(e) {
	    var point = this.point;
	    var canvas = this.canvas;

	    var canvasmouseleave = new Event('canvas-mouseleave', e, true, true);
	    canvasmouseleave.x = point.x;
	    canvasmouseleave.y = point.y;
	    canvasmouseleave.currentTarget = canvas;
	    this.tryTrigger(canvas, canvasmouseleave);
	  },
	  mouseover: function(e) {
	    var canvas = this.canvas;

	    var canvasmouseenter = new Event('canvas-mouseenter', e, true, true);
	    canvasmouseenter.currentTarget = canvas;
	    this.tryTrigger(canvas, canvasmouseenter);
	  }
	});

	module.exports = MouseEvent;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Vector3 = __webpack_require__(3).Vector3;
	var Element = __webpack_require__(36);
	var Shape = __webpack_require__(45);
	var SHAPE_MAP = {}; // 缓存图形类型

	function find(children, x, y) {
	  var rst;
	  for (var i = children.length - 1; i >= 0; i--) {
	    var child = children[i];
	    if (child.__cfg.visible && child.__cfg.capture) {
	      if (child.isGroup) {
	        rst = child.getShape(x, y);
	      } else if (child.isHit(x, y)) {
	        rst = child;
	      }
	    }
	    if (rst) {
	      break;
	    }
	  }
	  return rst;
	}

	var Group = function(cfg) {
	  Group.superclass.constructor.call(this, cfg);
	  this.set('children', []);

	  this._beforeRenderUI();
	  this._renderUI();
	  this._bindUI();
	};

	/**
	 * 混合原型链CFG
	 * @param   {Object} c 函数对象
	 */
	function initClassCfgs(c) {
	  if (c.__cfg || c === Group) {
	    return;
	  }
	  var superCon = c.superclass.constructor;
	  if (superCon && !superCon.__cfg) {
	    initClassCfgs(superCon);
	  }
	  c.__cfg = {};

	  Util.mix(true, c.__cfg, superCon.__cfg);
	  Util.mix(true, c.__cfg, c.CFG);
	}

	Util.extend(Group, Element);

	Util.augment(Group, {
	  isGroup: true,
	  canFill: true,
	  canStroke: true,
	  getDefaultCfg: function() {
	    initClassCfgs(this.constructor);
	    return Util.mix(true, {}, this.constructor.__cfg);
	  },
	  // 渲染组件前
	  _beforeRenderUI: function() {},
	  // 渲染组件
	  _renderUI: function() {},
	  // 绑定事件
	  _bindUI: function() {},
	  /** 添加图形
	   * @param  {String} type
	   * @param  {Object} cfg
	   * @return {Object} rst 图形
	   */
	  addShape: function(type, cfg) {
	    var canvas = this.get('canvas');
	    var rst;
	    cfg = cfg || {};
	    var shapeType = SHAPE_MAP[type];
	    if (!shapeType) {
	      shapeType = Util.ucfirst(type);
	      SHAPE_MAP[type] = shapeType;
	    }
	    if (cfg.attrs) {
	      var attrs = cfg.attrs;
	      if (type === 'text') { // 临时解决
	        var topFontFamily = canvas.get('fontFamily');
	        if (topFontFamily) {
	          attrs.fontFamily = attrs.fontFamily ? attrs.fontFamily : topFontFamily;
	        }
	      }
	    }
	    cfg.canvas = canvas;
	    cfg.type = type;
	    rst = new Shape[shapeType](cfg);
	    this.add(rst);
	    return rst;
	  },
	  /** 添加图组
	   * @param  {Function|Object|undefined} param 图组类
	   * @param  {Object} cfg 配置项
	   * @return {Object} rst 图组
	   */
	  addGroup: function(param, cfg) {
	    var canvas = this.get('canvas');
	    var rst;
	    cfg = Util.mix({}, cfg);
	    if (Util.isFunction(param)) {
	      if (cfg) {
	        cfg.canvas = canvas;
	        cfg.parent = this;
	        rst = new param(cfg);
	      } else {
	        rst = new param({
	          canvas: canvas,
	          parent: this
	        });
	      }
	      this.add(rst);
	    } else if (Util.isObject(param)) {
	      param.canvas = canvas;
	      rst = new Group(param);
	      this.add(rst);
	    } else if (param === undefined) {
	      rst = new Group();
	      this.add(rst);
	    } else {
	      return false;
	    }
	    return rst;
	  },
	  /** 绘制背景
	   * @param  {Array} padding 内边距
	   * @param  {Attrs} attrs 图形属性
	   * @param  {Shape} backShape 背景图形
	   */
	  renderBack: function(padding, attrs) {
	    var backShape = this.get('backShape');
	    var innerBox = this.getBBox();
	    var parent = this.get('parent'); // getParent
	    Util.mix(attrs, {
	      x: innerBox.minX - padding[3],
	      y: innerBox.minY - padding[0],
	      width: innerBox.width + padding[1] + padding[3],
	      height: innerBox.height + padding[0] + padding[2]
	    });
	    if (backShape) {
	      backShape.attr(attrs);
	    } else {
	      backShape = parent.addShape('rect', {
	        zIndex: -1,
	        attrs: attrs
	      });
	    }
	    this.set('backShape', backShape);
	    parent.sort();
	    return backShape;
	  },
	  /**
	   * 从组中移除 shape 或者 group
	   * @param {Object} item 图形或者分组, 如果item存在则移除item
	   */
	  removeChild: function(item, destroy) {
	    if (arguments.length >= 2) {
	      if (this.contain(item)) {
	        item.remove(destroy);
	      }
	    } else {
	      if (arguments.length === 1) {
	        if (Util.isBoolean(item)) {
	          destroy = item;
	        } else {
	          if (this.contain(item)) {
	            item.remove(true);
	          }
	          return this;
	        }
	      }
	      if (arguments.length === 0) {
	        destroy = true;
	      }

	      Group.superclass.remove.call(this, destroy);
	    }
	    return this;
	  },
	  /**
	   * 向组中添加shape或者group
	   * @param {Object} item 图形或者分组
	   */
	  add: function(items) {
	    var self = this;
	    var children = self.get('children');
	    if (Util.isArray(items)) {
	      Util.each(items, function(item) {
	        var parent = item.get('parent');
	        if (parent) {
	          parent.removeChild(item, false);
	        }
	        self.__setEvn(item);
	      });
	      children.push.apply(children, items);
	    } else {
	      var item = items;
	      var parent = item.get('parent');
	      if (parent) {
	        parent.removeChild(item, false);
	      }
	      self.__setEvn(item);
	      children.push(item);
	    }
	    return self;
	  },
	  /**
	   * 当前 group 是否拥有某个 item
	   **/
	  contain: function(item) {
	    var children = this.get('children');
	    return children.indexOf(item) > -1;
	  },
	  /** 获取第N个子元素
	   */
	  getChildByIndex: function(index) {
	    var children = this.get('children');
	    return children[index];
	  },
	  getFirst: function() {
	    return this.getChildByIndex(0);
	  },
	  getLast: function() {
	    var lastIndex = this.get('children').length - 1;
	    return this.getChildByIndex(lastIndex);
	  },
	  /**
	   * 设置子元素及子孙元素的环境属性
	   * @private
	   */
	  __setEvn: function(item) {
	    var self = this;
	    item.__cfg.parent = self;
	    item.__cfg.context = self.__cfg.context;
	    item.__cfg.canvas = self.__cfg.canvas;
	    item.__cfg.totalMatrix = null;
	    var clip = item.__attrs.clip;
	    if (clip) {
	      clip.setSilent('parent', self);
	      clip.setSilent('context', self.get('context'));
	    }
	    var children = item.__cfg.children;
	    if (children) {
	      Util.each(children, function(child) {
	        item.__setEvn(child);
	      });
	    }
	  },
	  getBBox: function() {
	    var self = this;
	    var minX = Infinity;
	    var maxX = -Infinity;
	    var minY = Infinity;
	    var maxY = -Infinity;
	    var children = self.get('children');
	    Util.each(children, function(child) {
	      if (child.get('visible')) {
	        var box = child.getBBox();
	        if (!box) {
	          return true;
	        }
	        var leftTop = new Vector3(box.minX, box.minY, 1);
	        var leftBottom = new Vector3(box.minX, box.maxY, 1);
	        var rightTop = new Vector3(box.maxX, box.minY, 1);
	        var rightBottom = new Vector3(box.maxX, box.maxY, 1);

	        child.apply(leftTop);
	        child.apply(leftBottom);
	        child.apply(rightTop);
	        child.apply(rightBottom);

	        var boxMinX = Math.min(leftTop.x, leftBottom.x, rightTop.x, rightBottom.x);
	        var boxMaxX = Math.max(leftTop.x, leftBottom.x, rightTop.x, rightBottom.x);
	        var boxMinY = Math.min(leftTop.y, leftBottom.y, rightTop.y, rightBottom.y);
	        var boxMaxY = Math.max(leftTop.y, leftBottom.y, rightTop.y, rightBottom.y);

	        if (boxMinX < minX) {
	          minX = boxMinX;
	        }

	        if (boxMaxX > maxX) {
	          maxX = boxMaxX;
	        }

	        if (boxMinY < minY) {
	          minY = boxMinY;
	        }

	        if (boxMaxY > maxY) {
	          maxY = boxMaxY;
	        }
	      }
	    });
	    var box = {
	      minX: minX,
	      minY: minY,
	      maxX: maxX,
	      maxY: maxY
	    };
	    box.x = box.minX;
	    box.y = box.minY;
	    box.width = box.maxX - box.minX;
	    box.height = box.maxY - box.minY;
	    return box;
	  },
	  /**
	   * @protected
	   * 绘制内部图形
	   */
	  drawInner: function(context) {
	    var children = this.get('children');
	    for (var i = 0; i < children.length; i++) {
	      var child = children[i];
	      child.draw(context);
	    }
	    return this;
	  },
	  /**
	   * 获得子元素的个数
	   */
	  getCount: function() {
	    return this.get('children').length;
	  },
	  /**
	   * 将子元素按照zIndex排序
	   */
	  sort: function() {
	    var children = this.get('children');
	    children.sort(function(obj1, obj2) {
	      return obj1.get('zIndex') - obj2.get('zIndex');
	    });
	    return this;
	  },
	  find: function(id) {
	    return this.findBy(function(item) {
	      return item.get('id') === id;
	    });
	  },
	  /**
	   * 根据查找函数查找分组或者图形
	   * @param  {Function} fn 匹配函数
	   * @return {Canvas.Base} 分组或者图形
	   */
	  findBy: function(fn) {
	    var children = this.get('children');
	    var rst = null;

	    Util.each(children, function(item) {
	      if (fn(item)) {
	        rst = item;
	      } else if (item.findBy) {
	        rst = item.findBy(fn);
	      }
	      if (rst) {
	        return false;
	      }
	    });
	    return rst;
	  },
	  findAllBy: function(fn) {
	    var children = this.get('children');
	    var rst = [];
	    var childRst = [];
	    Util.each(children, function(item) {
	      if (fn(item)) {
	        rst.push(item);
	      }
	      if (item.findAllBy) {
	        childRst = item.findAllBy(fn);
	        rst = rst.concat(childRst);
	      }
	    });
	    return rst;
	  },
	  /**
	   * 根据x，y轴坐标获取对应的图形
	   * @param  {Number} x x坐标
	   * @param  {Number} y y坐标
	   * @return {Object}  最上面的图形
	   */
	  getShape: function(x, y) {
	    var self = this;
	    var clip = self.__attrs.clip;
	    var children = self.__cfg.children;
	    var rst;
	    if (clip) {
	      if (clip.inside(x, y)) {
	        rst = find(children, x, y);
	      }
	    } else {
	      rst = find(children, x, y);
	    }
	    return rst;
	  },
	  // 连同一起清理子元素的矩阵
	  clearTotalMatrix: function() {
	    var m = this.get('totalMatrix');
	    if (m) {
	      this.setSilent('totalMatrix', null);
	      var children = this.__cfg.children;
	      for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        child.clearTotalMatrix();
	      }
	    }
	  },
	  /**
	   * 清除容器内的图形或者分组
	   */
	  clear: function() {
	    var children = this.get('children');

	    while (children.length !== 0) {
	      children[children.length - 1].remove();
	    }
	    return this;
	  },
	  /**
	   * 析构函数
	   */
	  destroy: function() {
	    if (this.get('destroyed')) {
	      return;
	    }
	    this.clear();
	    Group.superclass.destroy.call(this);
	  }
	});

	module.exports = Group;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Tween = __webpack_require__(55);
	var tween = new Tween();

	module.exports = {
	  tween: tween,
	  animate: function(toProps, duration, easing, callBack) {
	    var now = tween.getNow();
	    var cfg = Util.mix({}, toProps, {
	      duration: duration
	    });
	    tween.animate(this).append(now, cfg, easing, callBack);
	    if (tween.get('status') === 'silent') tween.play();
	  }
	};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Vector3 = __webpack_require__(3).Vector3;

	var ALIAS_ATTRS = ['strokeStyle', 'fillStyle', 'globalAlpha'];
	var CLIP_SHAPES = ['circle', 'ellipse', 'fan', 'polygon', 'rect', 'path'];
	var CAPITALIZED_ATTRS_MAP = {
	  r: 'R',
	  opacity: 'Opacity',
	  lineWidth: 'LineWidth',
	  clip: 'Clip',
	  stroke: 'Stroke',
	  fill: 'Fill',
	  strokeOpacity: 'Stroke',
	  fillOpacity: 'Fill',
	  x: 'X',
	  y: 'Y',
	  rx: 'Rx',
	  ry: 'Ry',
	  re: 'Re',
	  rs: 'Rs',
	  width: 'Width',
	  height: 'Height',
	  img: 'Img',
	  x1: 'X1',
	  x2: 'X2',
	  y1: 'Y1',
	  y2: 'Y2',
	  points: 'Points',
	  p1: 'P1',
	  p2: 'P2',
	  p3: 'P3',
	  p4: 'P4',
	  text: 'Text',
	  radius: 'Radius',
	  textAlign: 'TextAlign',
	  textBaseline: 'TextBaseline',
	  font: 'Font',
	  fontSize: 'FontSize',
	  fontStyle: 'FontStyle',
	  fontVariant: 'FontVariant',
	  fontWeight: 'FontWeight',
	  fontFamily: 'FontFamily',
	  clockwise: 'Clockwise',
	  startAngle: 'StartAngle',
	  endAngle: 'EndAngle',
	  path: 'Path'
	};
	var ALIAS_ATTRS_MAP = {
	  stroke: 'strokeStyle',
	  fill: 'fillStyle',
	  opacity: 'globalAlpha'
	};

	module.exports = {
	  canFill: false,
	  canStroke: false,
	  initAttrs: function(attrs) {
	    this.__attrs = {
	      opacity: 1,
	      fillOpacity: 1,
	      strokeOpacity: 1
	    };
	    this.attr(Util.simpleMix(this.getDefaultAttrs(), attrs));
	    return this;
	  },
	  getDefaultAttrs: function() {
	    return {};
	  },
	  /**
	   * 设置或者设置属性，有以下 4 种情形：
	   *   - name 不存在, 则返回属性集合
	   *   - name 为字符串，value 为空，获取属性值
	   *   - name 为字符串，value 不为空，设置属性值，返回 this
	   *   - name 为键值对，value 为空，设置属性值
	   *
	   * @param  {String | Object} name  属性名
	   * @param  {*} value 属性值
	   * @return {*} 属性值
	   */
	  attr: function(name, value) {
	    var self = this;
	    if (arguments.length === 0) {
	      return self.__attrs;
	    }

	    if (Util.isObject(name)) {
	      for (var k in name) {
	        if (ALIAS_ATTRS.indexOf(k) === -1) {
	          var v = name[k];
	          self._setAttr(k, v);
	        }
	      }
	      if (self.__afterSetAttrAll) {
	        self.__afterSetAttrAll(name);
	      }
	      // self.setSilent('box', null);
	      self.clearBBox();
	      return self;
	    }
	    if (arguments.length === 2) {
	      if (self._setAttr(name, value) !== false) {
	        var m = '__afterSetAttr' + CAPITALIZED_ATTRS_MAP[name];
	        if (self[m]) {
	          self[m](value);
	        }
	      }
	      // self.setSilent('box', null);
	      self.clearBBox();
	      return self;
	    }
	    return self._getAttr(name);
	  },
	  clearBBox: function() {
	    this.setSilent('box', null);
	  },
	  __afterSetAttrAll: function() {

	  },
	  // 属性获取触发函数
	  _getAttr: function(name) {
	    return this.__attrs[name];
	  },
	  // 属性设置触发函数
	  _setAttr: function(name, value) {
	    var self = this;
	    if (name === 'clip') {
	      self.__setAttrClip(value);
	      self.__attrs.clip = value;
	    } else {
	      self.__attrs[name] = value;
	      var alias = ALIAS_ATTRS_MAP[name];
	      if (alias) {
	        self.__attrs[alias] = value;
	      }
	    }
	    return self;
	  },
	  hasFill: function() {
	    return this.canFill && this.__attrs.fillStyle;
	  },
	  hasStroke: function() {
	    return this.canStroke && this.__attrs.strokeStyle;
	  },
	  // 设置透明度
	  __setAttrOpacity: function(v) {
	    this.__attrs.globalAlpha = v;
	    return v;
	  },
	  __setAttrClip: function(clip) {
	    var self = this;
	    if (clip && (CLIP_SHAPES.indexOf(clip.type) > -1)) {
	      if (clip.get('canvas') === null) {
	        clip = Util.clone(clip);
	      }
	      clip.set('parent', self.get('parent'));
	      clip.set('context', self.get('context'));
	      clip.inside = function (x, y) {
	        var v = new Vector3(x, y, 1);
	        clip.invert(v, self.get('canvas')); // 已经在外面转换
	        return clip.__isPointInFill(v.x, v.y);
	      };
	      return clip;
	    }
	    return null;
	  }
	};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Matrix3 = __webpack_require__(3).Matrix3;

	// 是否未改变
	function isUnchanged(m) {
	  var elements = m.elements;
	  return elements[0] === 1 && elements[1] === 0 && elements[3] === 0 && elements[4] === 1 && elements[6] === 0 && elements[7] === 0;
	}

	// 是否仅仅是scale
	function isScale(m) {
	  var elements = m.elements;
	  return elements[1] === 0 && elements[3] === 0 && elements[6] === 0 && elements[7] === 0;
	}

	function multiple(m1, m2) {
	  if (!isUnchanged(m2)) {
	    if (isScale(m2)) {
	      m1.elements[0] *= m2.elements[0];
	      m1.elements[4] *= m2.elements[4];
	    } else {
	      m1.multiply(m2);
	    }
	  }
	}

	module.exports = {
	  initTransform: function() {
	    this.__m = new Matrix3();
	  },
	  translate: function(tx, ty) {
	    this.__m.translate(tx, ty);
	    this.clearTotalMatrix();
	    return this;
	  },
	  rotate: function(angle) {
	    this.__m.rotate(angle); // 仅支持弧度，不再支持角度
	    this.clearTotalMatrix();
	    return this;
	  },
	  scale: function(s1, s2) {
	    this.__m.scale(s1, s2);
	    this.clearTotalMatrix();
	    return this;
	  },
	  /**
	   * 绕起始点旋转
	   * @param  {Number} rotate 0～360
	   */
	  rotateAtStart: function(rotate) {
	    var x = this.attr('x');
	    var y = this.attr('y');
	    if (Math.abs(rotate) > Math.PI * 2) {
	      rotate = rotate / 180 * Math.PI;
	    }
	    this.transform([
	      ['t', -x, -y],
	      ['r', rotate],
	      ['t', x, y]
	    ]);
	  },
	  /**
	   * 移动的到位置
	   * @param  {Number} x 移动到x
	   * @param  {Number} y 移动到y
	   */
	  move: function(x, y) {
	    var cx = this.get('x') || 0; // 当前的x
	    var cy = this.get('y') || 0; // 当前的y
	    this.translate(x - cx, y - cy);
	    this.set('x', x);
	    this.set('y', y);
	  },
	  transform: function(ts) {
	    var self = this;
	    Util.each(ts, function(t) {
	      switch (t[0]) {
	        case 't':
	          self.translate(t[1], t[2]);
	          break;
	        case 's':
	          self.scale(t[1], t[2]);
	          break;
	        case 'r':
	          self.rotate(t[1]);
	          break;
	        case 'm':
	          self.__m = Matrix3.multiply(t[1], self.__m);
	          self.clearTotalMatrix();
	          break;
	        default:
	          break;
	      }
	    });
	    return self;
	  },
	  setTransform: function(ts) {
	    this.__m.identity();
	    return this.transform(ts);
	  },
	  getMatrix: function() {
	    return this.__m;
	  },
	  setMatrix: function(m) {
	    this.__m = m;
	    this.clearTotalMatrix();
	    return this;
	  },
	  apply: function(v, root) {
	    var m;
	    if (root) {
	      m = this._getMatrixByRoot(root);
	    } else {
	      m = this.__m;
	    }
	    v.applyMatrix(m);
	    return this;
	  },
	  // 获取到达指定根节点的矩阵
	  _getMatrixByRoot: function(root) {
	    var self = this;
	    root = root || self;
	    var parent = self;
	    var parents = [];

	    while (parent !== root) {
	      parents.unshift(parent);
	      parent = parent.get('parent');
	    }
	    parents.unshift(parent);

	    var m = new Matrix3();
	    Util.each(parents, function(child) {
	      m.multiply(child.__m);
	    });
	    return m;
	  },
	  /**
	   * 应用到当前元素上的总的矩阵
	   * @return {Matrix} 矩阵
	   */
	  getTotalMatrix: function() {
	    var m = this.__cfg.totalMatrix;
	    if (!m) {
	      m = new Matrix3();
	      var parent = this.__cfg.parent;
	      if (parent) {
	        var pm = parent.getTotalMatrix();
	        /* if (!isUnchanged(pm)) {
	          m.multiply(pm);
	        } */
	        multiple(m, pm);
	      }
	      /* if (!isUnchanged(this.__m)) {
	        m.multiply(this.__m);
	      } */
	      multiple(m, this.__m);
	      this.__cfg.totalMatrix = m;
	    }
	    return m;
	  },
	  // 清除当前的矩阵
	  clearTotalMatrix: function() {
	    // this.__cfg.totalMatrix = null;
	  },
	  invert: function(v) {
	    var m = this.getTotalMatrix();
	    // 单精屏幕下大多数矩阵没变化
	    if (isScale(m)) {
	      v.x /= m.elements[0];
	      v.y /= m.elements[4];
	    } else {
	      var inm = m.getInverse();
	      v.applyMatrix(inm);
	    }
	    return this;
	  },
	  resetTransform: function(context) {
	    var mo = this.__m.to2DObject();
	    // 不改变时
	    if (!isUnchanged(this.__m)) {
	      context.transform(mo.a, mo.b, mo.c, mo.d, mo.e, mo.f);
	    }
	  }
	};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

	/**
	 * @fileOverview ellipse math
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	module.exports = {
	  xAt: function(psi, rx, ry, cx, t) {
	    return rx * Math.cos(psi) * Math.cos(t) - ry * Math.sin(psi) * Math.sin(t) + cx;
	  },
	  yAt: function(psi, rx, ry, cy, t) {
	    return rx * Math.sin(psi) * Math.cos(t) + ry * Math.cos(psi) * Math.sin(t) + cy;
	  },
	  xExtrema: function(psi, rx, ry) {
	    return Math.atan((-ry / rx) * Math.tan(psi));
	  },
	  yExtrema: function(psi, rx, ry) {
	    return Math.atan((ry / (rx * Math.tan(psi))));
	  }
	};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Path
	 * @author dxq613@gmail.com
	 * @author hankaiai@126.com
	 * @ignore
	 */
	var Util = __webpack_require__(1);
	var GMath = __webpack_require__(8);
	var Inside = __webpack_require__(6);
	var Cubic = __webpack_require__(15);
	var Quadratic = __webpack_require__(22);
	var Ellipse = __webpack_require__(83);
	var Matrix = __webpack_require__(3);
	var Vector2 = Matrix.Vector2;
	var Vector3 = Matrix.Vector3;
	var Matrix3 = Matrix.Matrix3;


	var ARR_CMD = ['m', 'l', 'c', 'a', 'q', 'h', 'v', 't', 's', 'z'];

	function toAbsolute(x, y, curPoint) { // 获取绝对坐标
	  return {
	    x: curPoint.x + x,
	    y: curPoint.y + y
	  };
	}

	function toSymmetry(point, center) { // 点对称
	  return {
	    x: center.x + (center.x - point.x),
	    y: center.y + (center.y - point.y)
	  };
	}

	function vMag(v) {
	  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	}

	function vRatio(u, v) {
	  return (u[0] * v[0] + u[1] * v[1]) / (vMag(u) * vMag(v));
	}

	function vAngle(u, v) {
	  return (u[0] * v[1] < u[1] * v[0] ? -1 : 1) * Math.acos(vRatio(u, v));
	}

	function getArcParams(point1, point2, fa, fs, rx, ry, psiDeg) {
	  var psi = GMath.mod(GMath.degreeToRad(psiDeg), Math.PI * 2);
	  var x1 = point1.x;
	  var y1 = point1.y;
	  var x2 = point2.x;
	  var y2 = point2.y;
	  var xp = Math.cos(psi) * (x1 - x2) / 2.0 + Math.sin(psi) * (y1 - y2) / 2.0;
	  var yp = -1 * Math.sin(psi) * (x1 - x2) / 2.0 + Math.cos(psi) * (y1 - y2) / 2.0;
	  var lambda = (xp * xp) / (rx * rx) + (yp * yp) / (ry * ry);

	  if (lambda > 1) {
	    rx *= Math.sqrt(lambda);
	    ry *= Math.sqrt(lambda);
	  }

	  var f = Math.sqrt((((rx * rx) * (ry * ry)) - ((rx * rx) * (yp * yp)) - ((ry * ry) * (xp * xp))) / ((rx * rx) * (yp * yp) + (ry * ry) * (xp * xp)));

	  if (fa === fs) {
	    f *= -1;
	  }
	  if (isNaN(f)) {
	    f = 0;
	  }

	  var cxp = f * rx * yp / ry;
	  var cyp = f * -ry * xp / rx;

	  var cx = (x1 + x2) / 2.0 + Math.cos(psi) * cxp - Math.sin(psi) * cyp;
	  var cy = (y1 + y2) / 2.0 + Math.sin(psi) * cxp + Math.cos(psi) * cyp;

	  var theta = vAngle([1, 0], [(xp - cxp) / rx, (yp - cyp) / ry]);
	  var u = [(xp - cxp) / rx, (yp - cyp) / ry];
	  var v = [(-1 * xp - cxp) / rx, (-1 * yp - cyp) / ry];
	  var dTheta = vAngle(u, v);

	  if (vRatio(u, v) <= -1) {
	    dTheta = Math.PI;
	  }
	  if (vRatio(u, v) >= 1) {
	    dTheta = 0;
	  }
	  if (fs === 0 && dTheta > 0) {
	    dTheta = dTheta - 2 * Math.PI;
	  }
	  if (fs === 1 && dTheta < 0) {
	    dTheta = dTheta + 2 * Math.PI;
	  }
	  return [point1, cx, cy, rx, ry, theta, dTheta, psi, fs];
	}

	var PathSegment = function(item, preSegment, isLast) {
	  this.preSegment = preSegment;
	  this.isLast = isLast;
	  this.init(item, preSegment);
	};

	Util.augment(PathSegment, {
	  init: function(item, preSegment) {
	    var command = item[0];
	    preSegment = preSegment || {
	      endPoint: {
	        x: 0,
	        y: 0
	      }
	    };
	    var relative = ARR_CMD.indexOf(command) >= 0; // /[a-z]/.test(command);
	    var cmd = relative ? command.toUpperCase() : command;
	    var p = item;
	    var point1;
	    var point2;
	    var point3;
	    var point;
	    var preEndPoint = preSegment.endPoint;

	    var p1 = p[1];
	    var p2 = p[2];
	    switch (cmd) {
	      default: break;
	      case 'M':
	        if (relative) {
	          point = toAbsolute(p1, p2, preEndPoint);
	        } else {
	          point = {
	            x: p1,
	            y: p2
	          };
	        }
	        this.command = 'M';
	        this.params = [preEndPoint, point];
	        this.subStart = point;
	        this.endPoint = point;
	        break;
	      case 'L':
	        if (relative) {
	          point = toAbsolute(p1, p2, preEndPoint);
	        } else {
	          point = {
	            x: p1,
	            y: p2
	          };
	        }
	        this.command = 'L';
	        this.params = [preEndPoint, point];
	        this.subStart = preSegment.subStart;
	        this.endPoint = point;
	        if (this.isLast) {
	          this.endTangent = function() {
	            return new Vector2(point.x - preEndPoint.x, point.y - preEndPoint.y);
	          };
	        }
	        break;
	      case 'H':
	        if (relative) {
	          point = toAbsolute(p1, 0, preEndPoint);
	        } else {
	          point = {
	            x: p1,
	            y: preEndPoint.y
	          };
	        }
	        this.command = 'L';
	        this.params = [preEndPoint, point];
	        this.subStart = preSegment.subStart;
	        this.endPoint = point;
	        this.endTangent = function() {
	          return new Vector2(point.x - preEndPoint.x, point.y - preEndPoint.y);
	        };
	        break;
	      case 'V':
	        if (relative) {
	          point = toAbsolute(0, p1, preEndPoint);
	        } else {
	          point = {
	            x: preEndPoint.x,
	            y: p1
	          };
	        }
	        this.command = 'L';
	        this.params = [preEndPoint, point];
	        this.subStart = preSegment.subStart;
	        this.endPoint = point;
	        this.endTangent = function() {
	          return new Vector2(point.x - preEndPoint.x, point.y - preEndPoint.y);
	        };
	        break;
	      case 'Q':
	        if (relative) {
	          point1 = toAbsolute(p1, p2, preEndPoint);
	          point2 = toAbsolute(p[3], p[4], preEndPoint);
	        } else {
	          point1 = {
	            x: p1,
	            y: p2
	          };
	          point2 = {
	            x: p[3],
	            y: p[4]
	          };
	        }
	        this.command = 'Q';
	        this.params = [preEndPoint, point1, point2];
	        this.subStart = preSegment.subStart;
	        this.endPoint = point2;
	        this.endTangent = function() {
	          return new Vector2(point2.x - point1.x, point2.y - point1.y);
	        };
	        break;
	      case 'T':
	        if (relative) {
	          point2 = toAbsolute(p1, p2, preEndPoint);
	        } else {
	          point2 = {
	            x: p1,
	            y: p2
	          };
	        }
	        if (preSegment.command === 'Q') {
	          point1 = toSymmetry(preSegment.params[1], preEndPoint);
	          this.command = 'Q';
	          this.params = [preEndPoint, point1, point2];
	          this.subStart = preSegment.subStart;
	          this.endPoint = point2;
	          this.endTangent = function() {
	            return new Vector2(point2.x - point1.x, point2.y - point1.y);
	          };
	        } else {
	          this.command = 'TL';
	          this.params = [preEndPoint, point2];
	          this.subStart = preSegment.subStart;
	          this.endPoint = point2;
	          this.endTangent = function() {
	            return new Vector2(point2.x - preEndPoint.x, point2.y - preEndPoint.y);
	          };
	        }

	        break;
	      case 'C':
	        if (relative) {
	          point1 = toAbsolute(p1, p2, preEndPoint);
	          point2 = toAbsolute(p[3], p[4], preEndPoint);
	          point3 = toAbsolute(p[5], p[6], preEndPoint);
	        } else {
	          point1 = {
	            x: p1,
	            y: p2
	          };
	          point2 = {
	            x: p[3],
	            y: p[4]
	          };
	          point3 = {
	            x: p[5],
	            y: p[6]
	          };
	        }
	        this.command = 'C';
	        this.params = [preEndPoint, point1, point2, point3];
	        this.subStart = preSegment.subStart;
	        this.endPoint = point3;
	        this.endTangent = function() {
	          return new Vector2(point3.x - point2.x, point3.y - point2.y);
	        };
	        break;
	      case 'S':
	        if (relative) {
	          point2 = toAbsolute(p1, p2, preEndPoint);
	          point3 = toAbsolute(p[3], p[4], preEndPoint);
	        } else {
	          point2 = {
	            x: p1,
	            y: p2
	          };
	          point3 = {
	            x: p[3],
	            y: p[4]
	          };
	        }
	        if (preSegment.command === 'C') {
	          point1 = toSymmetry(preSegment.params[2], preEndPoint);
	          this.command = 'C';
	          this.params = [preEndPoint, point1, point2, point3];
	          this.subStart = preSegment.subStart;
	          this.endPoint = point3;
	          this.endTangent = function() {
	            return new Vector2(point3.x - point2.x, point3.y - point2.y);
	          };
	        } else {
	          this.command = 'SQ';
	          this.params = [preEndPoint, point2, point3];
	          this.subStart = preSegment.subStart;
	          this.endPoint = point3;
	          this.endTangent = function() {
	            return new Vector2(point3.x - point2.x, point3.y - point2.y);
	          };
	        }
	        break;
	      case 'A':
	        var rx = p1;
	        var ry = p2;
	        var psi = p[3];
	        var fa = p[4];
	        var fs = p[5];
	        if (relative) {
	          point = toAbsolute(p[6], p[7], preEndPoint);
	        } else {
	          point = {
	            x: p[6],
	            y: p[7]
	          };
	        }

	        this.command = 'A';
	        this.params = getArcParams(preEndPoint, point, fa, fs, rx, ry, psi);
	        this.subStart = preSegment.subStart;
	        this.endPoint = point;
	        break;
	      case 'Z':
	        this.command = 'Z';
	        this.params = [preEndPoint, preSegment.subStart];
	        this.subStart = preSegment.subStart;
	        this.endPoint = preSegment.subStart;
	    }
	  },
	  isInside: function(x, y, lineWidth) {
	    var self = this;
	    var command = self.command;
	    var params = self.params;
	    var box = self.box;
	    if (box) {
	      if (!Inside.box(box.minX, box.maxX, box.minY, box.maxY, x, y)) {
	        return false;
	      }
	    }
	    switch (command) {
	      default: break;
	      case 'M':
	        return false;
	      case 'TL':
	      case 'L':
	      case 'Z':
	        return Inside.line(
	          params[0].x, params[0].y,
	          params[1].x, params[1].y,
	          lineWidth, x, y
	        );
	      case 'SQ':
	      case 'Q':
	        return Inside.quadraticline(
	          params[0].x, params[0].y,
	          params[1].x, params[1].y,
	          params[2].x, params[2].y,
	          lineWidth, x, y
	        );
	      case 'C':
	        return Inside.cubicline(
	          params[0].x, params[0].y,
	          params[1].x, params[1].y,
	          params[2].x, params[2].y,
	          params[3].x, params[3].y,
	          lineWidth, x, y
	        );
	      case 'A':
	        var p = params;
	        var cx = p[1];
	        var cy = p[2];
	        var rx = p[3];
	        var ry = p[4];
	        var theta = p[5];
	        var dTheta = p[6];
	        var psi = p[7];
	        var fs = p[8];

	        var r = (rx > ry) ? rx : ry;
	        var scaleX = (rx > ry) ? 1 : rx / ry;
	        var scaleY = (rx > ry) ? ry / rx : 1;

	        p = new Vector3(x, y, 1);
	        var m = new Matrix3();
	        m.translate(-cx, -cy);
	        m.rotate(-psi);
	        m.scale(1 / scaleX, 1 / scaleY);
	        p.applyMatrix(m);
	        return Inside.arcline(0, 0, r, theta, theta + dTheta, 1 - fs, lineWidth, p.x, p.y);
	    }
	    return false;
	  },
	  draw: function(context) {
	    var command = this.command;
	    var params = this.params;
	    var point1;
	    var point2;
	    var point3;

	    switch (command) {
	      default: break;
	      case 'M':
	        context.moveTo(params[1].x, params[1].y);
	        break;
	      case 'TL':
	      case 'L':
	        context.lineTo(params[1].x, params[1].y);
	        break;
	      case 'SQ':
	      case 'Q':
	        point1 = params[1];
	        point2 = params[2];
	        context.quadraticCurveTo(point1.x, point1.y, point2.x, point2.y);
	        break;
	      case 'C':
	        point1 = params[1];
	        point2 = params[2];
	        point3 = params[3];
	        context.bezierCurveTo(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
	        break;
	      case 'A':
	        var p = params;
	        var p1 = p[1];
	        var p2 = p[2];
	        var cx = p1;
	        var cy = p2;
	        var rx = p[3];
	        var ry = p[4];
	        var theta = p[5];
	        var dTheta = p[6];
	        var psi = p[7];
	        var fs = p[8];

	        var r = (rx > ry) ? rx : ry;
	        var scaleX = (rx > ry) ? 1 : rx / ry;
	        var scaleY = (rx > ry) ? ry / rx : 1;

	        context.translate(cx, cy);
	        context.rotate(psi);
	        context.scale(scaleX, scaleY);
	        context.arc(0, 0, r, theta, theta + dTheta, 1 - fs);
	        context.scale(1 / scaleX, 1 / scaleY);
	        context.rotate(-psi);
	        context.translate(-cx, -cy);
	        break;
	      case 'Z':
	        context.closePath();
	        break;
	    }
	  },
	  getBBox: function(lineWidth) {
	    var halfWidth = lineWidth / 2;
	    var params = this.params;
	    var yDims;
	    var xDims;
	    var i;
	    var l;

	    switch (this.command) {
	      default:
	      case 'M':
	      case 'Z':
	        break;
	      case 'TL':
	      case 'L':
	        this.box = {
	          minX: Math.min(params[0].x, params[1].x) - halfWidth,
	          maxX: Math.max(params[0].x, params[1].x) + halfWidth,
	          minY: Math.min(params[0].y, params[1].y) - halfWidth,
	          maxY: Math.max(params[0].y, params[1].y) + halfWidth
	        };
	        break;
	      case 'SQ':
	      case 'Q':
	        xDims = Quadratic.extrema(params[0].x, params[1].x, params[2].x);
	        for (i = 0, l = xDims.length; i < l; i++) {
	          xDims[i] = Quadratic.at(params[0].x, params[1].x, params[2].x, xDims[i]);
	        }
	        xDims.push(params[0].x, params[2].x);
	        yDims = Quadratic.extrema(params[0].y, params[1].y, params[2].y);
	        for (i = 0, l = yDims.length; i < l; i++) {
	          yDims[i] = Quadratic.at(params[0].y, params[1].y, params[2].y, yDims);
	        }
	        yDims.push(params[0].y, params[2].y);
	        this.box = {
	          minX: Math.min.apply(Math, xDims) - halfWidth,
	          maxX: Math.max.apply(Math, xDims) + halfWidth,
	          minY: Math.min.apply(Math, yDims) - halfWidth,
	          maxY: Math.max.apply(Math, yDims) + halfWidth
	        };
	        break;
	      case 'C':
	        xDims = Cubic.extrema(params[0].x, params[1].x, params[2].x, params[3].x);
	        for (i = 0, l = xDims.length; i < l; i++) {
	          xDims[i] = Cubic.at(params[0].x, params[1].x, params[2].x, params[3].x, xDims[i]);
	        }
	        yDims = Cubic.extrema(params[0].y, params[1].y, params[2].y, params[3].y);
	        for (i = 0, l = yDims.length; i < l; i++) {
	          yDims[i] = Cubic.at(params[0].y, params[1].y, params[2].y, params[3].y, yDims[i]);
	        }
	        xDims.push(params[0].x, params[3].x);
	        yDims.push(params[0].y, params[3].y);
	        this.box = {
	          minX: Math.min.apply(Math, xDims) - halfWidth,
	          maxX: Math.max.apply(Math, xDims) + halfWidth,
	          minY: Math.min.apply(Math, yDims) - halfWidth,
	          maxY: Math.max.apply(Math, yDims) + halfWidth
	        };
	        break;
	      case 'A':
	        // todo 待优化
	        var p = params;
	        var cx = p[1];
	        var cy = p[2];
	        var rx = p[3];
	        var ry = p[4];
	        var theta = p[5];
	        var dTheta = p[6];
	        var psi = p[7];
	        var fs = p[8];
	        var start = theta;
	        var end = theta + dTheta;

	        var xDim = Ellipse.xExtrema(psi, rx, ry);
	        var minX = Infinity;
	        var maxX = -Infinity;
	        var xs = [start, end];
	        for (i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
	          var xAngle = xDim + i;
	          if (fs === 1) {
	            if (start < xAngle && xAngle < end) {
	              xs.push(xAngle);
	            }
	          } else {
	            if (end < xAngle && xAngle < start) {
	              xs.push(xAngle);
	            }
	          }
	        }

	        for (i = 0, l = xs.length; i < l; i++) {
	          var x = Ellipse.xAt(psi, rx, ry, cx, xs[i]);
	          if (x < minX) {
	            minX = x;
	          }
	          if (x > maxX) {
	            maxX = x;
	          }
	        }

	        var yDim = Ellipse.yExtrema(psi, rx, ry);
	        var minY = Infinity;
	        var maxY = -Infinity;
	        var ys = [start, end];
	        for (i = -Math.PI * 2; i <= Math.PI * 2; i += Math.PI) {
	          var yAngle = yDim + i;
	          if (fs === 1) {
	            if (start < yAngle && yAngle < end) {
	              ys.push(yAngle);
	            }
	          } else {
	            if (end < yAngle && yAngle < start) {
	              ys.push(yAngle);
	            }
	          }
	        }

	        for (i = 0, l = ys.length; i < l; i++) {
	          var y = Ellipse.yAt(psi, rx, ry, cy, ys[i]);
	          if (y < minY) {
	            minY = y;
	          }
	          if (y > maxY) {
	            maxY = y;
	          }
	        }
	        this.box = {
	          minX: minX - halfWidth,
	          maxX: maxX + halfWidth,
	          minY: minY - halfWidth,
	          maxY: maxY + halfWidth
	        };
	        break;
	    }
	  }
	});

	module.exports = PathSegment;


/***/ }),
/* 85 */
/***/ (function(module, exports) {

	var table = document.createElement('table');
	var tableRow = document.createElement('tr');
	var FRAGMENTRE = /^\s*<(\w+|!)[^>]*>/;
	var CONTAINERS = {
	  'tr': document.createElement('tbody'),
	  'tbody': table,
	  'thead': table,
	  'tfoot': table,
	  'td': tableRow,
	  'th': tableRow,
	  '*': document.createElement('div')
	};

	module.exports = {
	  /**
	   * 计算BoundingClientRect
	   * @param  {HTMLElement} DOM 节点
	   * @return {Object}  DOM 节点
	   */
	  getBoundingClientRect: function(node) {
	    var rect = node.getBoundingClientRect();
	    var top = document.documentElement.clientTop;
	    var left = document.documentElement.clientLeft;
	    return {
	      top: rect.top - top,
	      bottom: rect.bottom - top,
	      left: rect.left - left,
	      right: rect.right - left
	    };
	  },
	  /**
	   * 获取样式
	   * @param  {Object} DOM节点
	   * @param  {String} name 样式名
	   * @return {String} 属性值
	   */
	  getStyle: function(DOM, name) {
	    if (window.getComputedStyle) {
	      return window.getComputedStyle(DOM, null)[name];
	    }
	    return DOM.currentStyle[name];
	  },
	  /**
	   * 修改CSS
	   * @param  {Object} DOM
	   * @param  {Object} CSS键值对
	   * @return {Object} DOM
	   */
	  modiCSS: function(DOM, CSS) {
	    for (var key in CSS) {
	      if (CSS.hasOwnProperty(key)) {
	        DOM.style[key] = CSS[key];
	      }
	    }
	    return DOM;
	  },
	  /**
	   * 创建DOM 节点
	   * @param  {String} str Dom 字符串
	   * @return {HTMLElement}  DOM 节点
	   */
	  createDom: function(str) {
	    var name = FRAGMENTRE.test(str) && RegExp.$1;
	    if (!(name in CONTAINERS)) {
	      name = '*';
	    }
	    var container = CONTAINERS[name];
	    str = str.replace(/(^\s*)|(\s*$)/g, '');
	    container.innerHTML = '' + str;
	    return container.childNodes[0];
	  },
	  /**
	   * TODO: 应该移除的
	   * 添加时间监听器
	   * @param  {object} DOM对象
	   * @param  {Object} 事件名
	   * @param  {funtion} 回调函数
	   * @return {Object} 返回对象
	   */
	  addEventListener: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

	module.exports = {
	  /**
	   * 同 G transform
	   * @param  {Object} m 矩阵
	   * @param  {Array} ts 变换数组同
	   * @return  {Object} this 回调函数
	   */
	  transform: function(m, ts) {
	    m = m.clone();
	    for (var i = 0, len = ts.length; i < len; i++) {
	      var t = ts[i];
	      switch (t[0]) {
	        case 't':
	          m.translate(t[1], t[2]);
	          break;
	        case 's':
	          m.scale(t[1], t[2]);
	          break;
	        case 'r':
	          m.rotate(t[1]);
	          break;
	        case 'm':
	          m.multiply(t[1]);
	          break;
	        default:
	          continue;
	      }
	    }
	    return m;
	  },
	  /**
	   * 基于某点缩放
	   * @param  {Object} m 矩阵
	   * @param  {Number} sx x缩放
	   * @param  {Number} sy y缩放
	   * @param  {Number} x 坐标点
	   * @param  {Number} y 坐标点
	   */
	  scale: function(m, sx, sy, x, y) {
	    m = m.clone();
	    m.translate(-1 * x, -1 * y);
	    m.scale(sx, sy);
	    m.translate(x, y);
	    return m;
	  },
	  /**
	   * 基于某点旋转
	   * @param  {Object} m 矩阵
	   * @param  {Number} r 旋转角度，用弧度表示
	   * @param  {Number} x 坐标点
	   * @param  {Number} y 坐标点
	   */
	  rotate: function(m, r, x, y) {
	    m = m.clone();
	    m.translate(-1 * x, -1 * y);
	    m.rotate(r);
	    m.translate(x, y);
	    return m;
	  },
	  /**
	   * 判断是否是3阶矩阵
	   * @param  {Object} m 矩阵
	   * @return {Boolean}
	   */
	  isMatrix3: function(m) {
	    return m.type === 'matrix3';
	  }
	};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);
	var HSL = __webpack_require__(89);
	var RGB = __webpack_require__(90);
	var colorKeywords = __webpack_require__(88);


	var regex = {
	  hex: /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/,                                          // #ffffff or #fff
	  space: /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)$/,                                          // rbg | rgba | hsl | hsla
	  rgbNum: /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*$/,                                       // rgb(255, 0, 120)
	  rgbaNum: /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([0-9]*\.?[0-9]+)\s*$/,              // rgba(255, 0, 120, 0.2)
	  rgbPre: /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/,                                 // rgb(100%, 20%, 50%)
	  rgbaPre: /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/,        // rgba(100%, 20%, 50%, 0.1)
	  hsl: /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*$/,                          // hsl(360, 100%, 100%)
	  hsla: /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*([0-9]*\.?[0-9]+)\s*$/  // hsla(360.0, 100%, 100%, 0.2)
	};


	function Color(color) {
	  this.space = {};
	  if(Util.isString(color)) {
	    this.setStyle(color);
	  } else if(color instanceof Color){
	    this.copy(color);
	  }
	}

	Util.augment(Color, {
	  getType: function() {
	    return this.space.type;
	  },
	  toRGB: function() {
	    var space = this.space;
	    if (space.type !== 'rgb') {
	      var rgb = space.toRGB();
	      this.setRGB(rgb.r, rgb.g, rgb.b, rgb.a);
	    }
	  },
	  toHSL: function() {
	    var space = this.space;
	    if (space.type !== 'hsl') {
	      var hsl = space.toHSL();
	      this.setHSL(hsl.h, hsl.s, hsl.l, hsl.a);
	    }
	  },
	  getR: function() {
	    this.toRGB();
	    return this.space.r;
	  },
	  getG: function() {
	    this.toRGB();
	    return this.space.g;
	  },
	  getB: function() {
	    this.toRGB();
	    return this.space.b;
	  },
	  getH: function() {
	    this.toHSL();
	    return this.space.h;
	  },
	  getS: function() {
	    this.toHSL();
	    return this.space.s;
	  },
	  getL: function() {
	    this.toHSL();
	    return this.space.l;
	  },
	  getA: function() {
	    return this.space.a;
	  },
	  multiplyA: function(a) {
	    if (a === undefined) {
	      return this;
	    }
	    if (this.space.a === undefined) {
	      this.space.a = 1;
	    }
	    this.space.a *= a;
	    return this;
	  },
	  getRGBStyle: function() {
	    this.toRGB();
	    return this.space.getStyle();
	  },
	  getRGBPreStyle: function() {
	    this.toRGB();
	    return this.space.getPreStyle();
	  },
	  getHSLStyle: function() {
	    this.toHSL();
	    return this.space.getStyle();
	  },
	  getHex: function() {
	    this.toRGB();
	    return this.space.getHex();
	  },
	  setRGB: function(r, g, b, a) {
	    this.space = new RGB();
	    this.space.setRGB(r, g, b, a);
	    return this;
	  },
	  setHSL: function(h, s, l, a) {
	    this.space = new HSL();
	    this.space.setHSL(h, s, l, a);
	    return this;
	  },
	  setHex: function(hex) {
	    this.space = new RGB();
	    hex = Math.floor( hex );

	    this.space.r = ( hex >> 16 & 255 ) / 255;
	    this.space.g = ( hex >> 8 & 255 ) / 255;
	    this.space.b = ( hex & 255 ) / 255;

	    return this;
	  },
	  setStyle: function(style) {
	    var m;
	    if (m = regex.hex.exec(style)) {
	      var hex = m[1];
	      var size = hex.length;

	      if (size === 3) {
	        this.setRGB(
	          parseInt( hex.charAt( 0 ) + hex.charAt( 0 ), 16 ) / 255,
	          parseInt( hex.charAt( 1 ) + hex.charAt( 1 ), 16 ) / 255,
	          parseInt( hex.charAt( 2 ) + hex.charAt( 2 ), 16 ) / 255
	        );
	        return this;
	      } else if(size === 6) {

	        this.setRGB(
	          parseInt( hex.charAt( 0 ) + hex.charAt( 1 ), 16 ) / 255,
	          parseInt( hex.charAt( 2 ) + hex.charAt( 3 ), 16 ) / 255,
	          parseInt( hex.charAt( 4 ) + hex.charAt( 5 ), 16 ) / 255
	        );
	        return this;
	      }
	    } else if (m = regex.space.exec(style)){
	      var name = m[1];
	      var components = m[2];
	      var color;
	      switch(name) {
	        case 'rgb':
	          if (color = regex.rgbNum.exec(components)) {

	            this.setRGB(
	              parseInt(color[1], 10) / 255,
	              parseInt(color[2], 10) / 255,
	              parseInt(color[3], 10) / 255
	            );
	            return this;
	          }

	          if (color = regex.rgbPre.exec(components)) {
	            this.setRGB(
	              parseInt(color[1], 10) / 100,
	              parseInt(color[2], 10) / 100,
	              parseInt(color[3], 10) / 100
	            );
	            return this;
	          }
	          break;
	        case 'rgba':
	          if (color = regex.rgbaNum.exec(components)) {
	            this.setRGB(
	              parseInt(color[1], 10) / 255,
	              parseInt(color[2], 10) / 255,
	              parseInt(color[3], 10) / 255,
	              parseFloat(color[4])
	            );
	            return this;
	          }

	          if (color = regex.rgbaPre.exec(components)) {
	            this.setRGB(
	              parseInt(color[1], 10) / 100,
	              parseInt(color[2], 10) / 100,
	              parseInt(color[3], 10) / 100,
	              parseFloat(color[4])
	            );
	            return this;
	          }
	          break;
	        case 'hsl':
	          if (color = regex.hsl.exec(components)) {
	            this.setHSL(
	              parseInt(color[1], 10) / 360,
	              parseInt(color[2], 10) / 100,
	              parseInt(color[3], 10) / 100
	            );
	            return this;
	          }
	          break;
	        case 'hsla':
	          if (color = regex.hsla.exec(components)) {
	            this.setHSL(
	              parseInt(color[1], 10) / 360,
	              parseInt(color[2], 10) / 100,
	              parseInt(color[3], 10) / 100,
	              parseFloat(color[4])
	            );
	            return this;
	          }
	          break;
	      }
	    } else {
	      style = style.toLowerCase();
	      if (colorKeywords[style] !== undefined) {
	        this.setHex(colorKeywords[style]);
	      } else {
	        this.setHex(colorKeywords['black']);
	      }
	    }
	  },
	  copy: function(color) {
	    this.space = color.space.clone();
	  },
	  clone: function() {
	    return new Color(this);
	  }
	});


	module.exports = Color;



/***/ }),
/* 88 */
/***/ (function(module, exports) {

	module.exports = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
	'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
	'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
	'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
	'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
	'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
	'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
	'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
	'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
	'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
	'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
	'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
	'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
	'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
	'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
	'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
	'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
	'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
	'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
	'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
	'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
	'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
	'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
	'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);


	var HSL = function() {
	  this.h = 0;
	  this.s = 0;
	  this.l = 0;
	}

	Util.augment(HSL, {
	  type: 'hsl',
	  setHSL: function(h, s, l, a) {
	    this.h = gMath.mod(h, 1);
	    this.s = gMath.clamp(s, 0, 1);
	    this.l = gMath.clamp(l, 0, 1);
	    if (a !== undefined) {
	      this.a = gMath.clamp(a, 0, 1);
	    } else {
	      this.a = undefined;
	    }
	  },
	  toRGB: function () {
	    function hue2rgb( p, q, t ) {
	      if ( t < 0 ) t += 1;
	      if ( t > 1 ) t -= 1;
	      if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
	      if ( t < 1 / 2 ) return q;
	      if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
	      return p;
	    }
	    return function () {
	      // h,s,l ranges are in 0.0 - 1.0

	      var self = this;
	      var h = self.h;
	      var s = self.s;
	      var l = self.l;

	      if ( s === 0 ) {
	        return {
	          r: l,
	          g: l,
	          b: l,
	          a: self.a
	        };
	      } else {
	        var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
	        var q = ( 2 * l ) - p;
	      }
	      return {
	        r: hue2rgb( q, p, h + 1 / 3 ),
	        g: hue2rgb( q, p, h ),
	        b: hue2rgb( q, p, h - 1 / 3 ),
	        a: self.a
	      };
	    };
	  }(),
	  clone: function() {
	    var hsl = new HSL();
	    hsl.h = this.h;
	    hsl.s = this.s;
	    hsl.l = this.l;
	    hsl.a = this.a;
	    return hsl;
	  },
	  copy: function(hsl) {
	    this.h = hsl.h;
	    this.s = hsl.s;
	    this.l = hsl.l;
	    this.a = hsl.a;
	    return this;
	  },
	  getStyle: function() {
	    var self = this;
	    if (self.a === undefined) {
	      return 'hsl(' + Math.round(self.h * 360) + ', ' + Math.round(self.s * 100) + '%, ' + Math.round(self.l * 100) + '%)';
	    } else {
	      return 'hsla(' + Math.round(self.h * 360) + ', ' + Math.round(self.s * 100) + '%, ' + Math.round(self.l * 100) + '%, ' + self.a +')';
	    }
	  }
	});

	module.exports = HSL;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);

	var RGB = function() {
	  this.r = 0;
	  this.g = 0;
	  this.b = 0;
	  this.type = 'rgb';
	}

	Util.augment(RGB, {
	  type: 'rgb',
	  setRGB: function(r, g, b, a) {
	    this.r = gMath.clamp(r, 0, 1);
	    this.g = gMath.clamp(g, 0, 1);
	    this.b = gMath.clamp(b, 0, 1);
	    if (a !== undefined) {
	      this.a = gMath.clamp(a, 0, 1);
	    } else {
	      this.a = undefined;
	    }
	  },
	  toHSL: function() {
	    // h,s,l ranges are in 0.0 - 1.0
	    var r = this.r, g = this.g, b = this.b;
	    var max = Math.max( r, g, b );
	    var min = Math.min( r, g, b );
	    var hue, saturation;
	    var lightness = ( min + max ) / 2.0;
	    if ( min === max ) {
	      hue = 0;
	      saturation = 0;
	    } else {
	      var delta = max - min;
	      saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );
	      switch ( max ) {
	        case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
	        case g: hue = ( b - r ) / delta + 2; break;
	        case b: hue = ( r - g ) / delta + 4; break;
	      }
	      hue /= 6;
	    }

	    return {
	      h: hue,
	      s: saturation,
	      l: lightness,
	      a: this.a
	    };
	  },
	  getHex: function() {
	    var hex = ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;
	    return '#' + ('000000' + hex.toString(16)).slice(-6);
	  },
	  getStyle: function() {
	    if (this.a === undefined) {
	      return 'rgb(' + Math.round(this.r * 255).toString() + ', ' + Math.round(this.g * 255).toString() + ', ' + Math.round(this.b * 255).toString() + ')';
	    } else {
	      return 'rgba(' + Math.round(this.r * 255).toString() + ', ' + Math.round(this.g * 255).toString() + ', ' + Math.round(this.b * 255).toString() + ', ' + this.a + ')';
	    }
	  },
	  getPreStyle: function() {
	    if (this.a === undefined) {
	      return 'rgb(' + Math.round(this.r * 100).toString() + '%, ' + Math.round(this.g * 100).toString() + '%, ' + Math.round(this.b * 100).toString() + '%)';
	    } else {
	      return 'rgba(' + Math.round(this.r * 100).toString() + '%, ' + Math.round(this.g * 100).toString() + '%, ' + Math.round(this.b * 100).toString() + '%, ' + this.a + ')';
	    }
	  },
	  clone: function() {
	    var rgb = new RGB();
	    rgb.r = this.r;
	    rgb.g = this.g;
	    rgb.b = this.b;
	    rgb.a = this.a;
	    return rgb;
	  },
	  copy: function(rgb) {
	    this.r = rgb.r;
	    this.g = rgb.g;
	    this.b = rgb.b;
	    this.a = rgb.a;
	    return this;
	  }
	});


	module.exports = RGB;



/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	var Event = __webpack_require__(92);

	module.exports = Event;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 事件基类
	 # @author hankaiai@126.com 韩凯
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);

	var Event = function(type, event, bubbles, cancelable) {
	  this.type = type;  // 事件类型
	  this.target = null; // 目标
	  this.currentTarget = null; // 当前目标
	  this.bubbles = bubbles; // 冒泡
	  this.cancelable = cancelable; // 是否能够阻止
	  this.timeStamp = (new Date()).getTime(); // 时间戳
	  this.defaultPrevented = false; // 阻止默认
	  this.propagationStopped = false; // 阻止冒泡
	  this.removed= false; //是否被移除
	  this.event = event; // 触发的原生事件
	};


	Util.augment(Event, {
	  preventDefault: function() {
	    this.defaultPrevented = this.cancelable && true;
	  },
	  stopPropagation: function() {
	    this.propagationStopped = true;
	  },
	  remove: function() {
	    this.remove = true;
	  },
	  clone: function() {
	    return Util.clone(this);
	  },
	  toString: function() {
	    return '[Event (type=' + this.type + ')]';
	  }
	});

	module.exports = Event;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	var inter = __webpack_require__(96);
	module.exports = {
	  interpolation: inter.interpolation,
	  unInterpolation: inter.unInterpolation
	};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var singular = __webpack_require__(17);
	var Util = __webpack_require__(1);

	function array(a, b) {
	  var x = [];
	  var l = Math.min(a.length, b.length);

	  for (var i = 0; i < l; i ++) {
	    if(Util.isArray(a[i]) && Util.isArray(b[i])) {
	      x[i] = array(a[i], b[i]);
	    } else {
	      x[i] = singular.singular(a[i], b[i]);
	    }
	  }
	  return function(t) {
	    var c = [];
	    for (var i = 0; i < l; i ++) {
	      c[i] = x[i](t);
	    }
	    return c;
	  }
	}

	function unArray(a, b) {
	  var x = [];
	  var l = Math.min(a.length, b.length);

	  for (var i = 0; i < l; i ++) {
	    if(Util.isArray(a[i]) && Util.isArray(b[i])) {
	      x[i] = unArray(a[i], b[i]);
	    } else {
	      x[i] = singular.unSingular(a[i], b[i]);
	    }
	  }

	  return function(c) {
	    var l = Math.min(x.length, c.length);
	    var rst = 0;
	    var num = 0;
	    for (var i = 0; i < l; i ++) {
	      rst += x[i](c[i]);
	      num ++;
	    }
	    return num === 0 ? 0 : rst / num;
	  }
	}

	module.exports = {
	  array: array,
	  unArray: unArray
	};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Color = __webpack_require__(16);

	function color(color1, color2) {
	  switch(color2.getType()) {
	    case 'rgb':
	      return rgb(color1, color2);
	    case 'hsl':
	      return hsl(color1, color2);
	  }
	}

	function unColor(color1, color2) {
	  switch(color2.getType()) {
	    case 'rgb':
	      return unRgb(color1, color2);
	    case 'hsl':
	      return unHsl(color1, color2);
	  }
	}

	function rgb(color1, color2) {
	  var r1 = color1.getR();
	  var g1 = color1.getG();
	  var b1 = color1.getB();
	  var a1 = color1.getA();


	  var r2 = color2.getR() - r1;
	  var g2 = color2.getG() - g1;
	  var b2 = color2.getB() - b1;
	  var a2 = color2.getA();

	  if (a1 !== undefined || a2 !== undefined) {
	    a1 = a1 || 1;
	    a2 = (a2 === undefined ? 1 : a2) - a1;
	  }

	  return function(t) {
	    var rst = new Color();
	    rst.setRGB(
	      r1 + r2 * t,
	      g1 + g2 * t,
	      b1 + b2 * t,
	      (a1 !== undefined && a2 !== undefined) ? a1 + a2 * t : undefined
	    );
	    return rst.getRGBStyle();
	  };
	}

	function unRgb(color1, color2) {
	  var r1 = color1.getR();
	  var g1 = color1.getG();
	  var b1 = color1.getB();
	  var a1 = color1.getA();


	  var r2 = color2.getR() - r1;
	  var g2 = color2.getG() - g1;
	  var b2 = color2.getB() - b1;
	  var a2 = color2.getA();

	  if (a1 !== undefined || a2 !== undefined) {
	    a1 = a1 || 1;
	    a2 = (a2 === undefined ? 1 : a2) - a1;
	  }

	  return function(color) {
	    color = new Color(color);
	    if (!color.getType()) {
	      return 0;
	    }
	    var r = color.getR();
	    var g = color.getG();
	    var b = color.getB();
	    var a = color.getA();

	    a = a || 1;

	    var rst = 0;
	    var num = 0;

	    if (r2 !== 0) {
	      rst += (r - r1) / r2;
	      num ++;
	    }
	    if (g2 !== 0) {
	      rst += (g - g1) / g2;
	      num ++;
	    }
	    if (b2 !== 0) {
	      rst += (b - b1) / b2;
	      num ++;
	    }
	    if (a2 !== 0 && a2) {
	      rst += (a - a1) / a2;
	      num ++;
	    }
	    return num === 0 ? 0 : rst / num;
	  }
	}

	function hsl(color1, color2) {
	  var h1 = color1.getH();
	  var s1 = color1.getS();
	  var l1 = color1.getL();
	  var a1 = color1.getA();

	  var h2 = color2.getH() - h1;
	  var s2 = color2.getS() - s1;
	  var l2 = color2.getL() - l1;
	  var a2 = color2.getA();

	  if (a1 !== undefined || a2 !== undefined) {
	    a1 = a1 || 1;
	    a2 = (a2 === undefined ? 1 : a2) - a1;
	  }

	  return function(t) {
	    var rst = new Color();
	    rst.setHSL(
	      h1 + h2 * t,
	      s1 + s2 * t,
	      l1 + l2 * t,
	      (a1 !== undefined && a2 !== undefined) ? a1 + a2 * t : undefined
	    );
	    return rst.getHSLStyle();
	  };

	}

	function unHsl(color1, color2) {
	  var h1 = color1.getH();
	  var s1 = color1.getS();
	  var l1 = color1.getL();
	  var a1 = color1.getA();

	  var h2 = color2.getH() - h1;
	  var s2 = color2.getS() - s1;
	  var l2 = color2.getL() - l1;
	  var a2 = color2.getA();

	  if (a1 !== undefined || a2 !== undefined) {
	    a1 = a1 || 1;
	    a2 = (a2 === undefined ? 1 : a2) - a1;
	  }

	  return function(color) {
	    color = new Color(color);
	    if (!color.getType()) {
	      return 0;
	    }
	    var h = color.getH();
	    var s = color.getS();
	    var l = color.getL();
	    var a = color.getA();

	    a = a || 1;

	    var rst = 0;
	    var num = 0;
	    if (h2 !== 0) {
	      rst += (h - h1) / h2;
	      num ++;
	    }

	    if (s2 !== 0) {
	      rst += (s - s1) / s2;
	      num ++;
	    }

	    if (l2 !== 0) {
	      rst += (l - l1) / l2;
	      num ++;
	    }

	    if (a2 !== 0 && a2) {
	      rst += (a - a1) / a2;
	      num ++;
	    }

	    return num === 0 ? 0 : rst / num;
	  }
	}


	module.exports = {
	  color: color,
	  unColor: unColor
	};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var path = __webpack_require__(100);
	var array = __webpack_require__(94);
	var object = __webpack_require__(99);
	var singular = __webpack_require__(17);
	var matrix = __webpack_require__(97);
	var Matrix = __webpack_require__(3);
	var Matrix3 = Matrix.Matrix3;

	function interpolation(a, b) {
	  if (Util.isObject(a) && Util.isObject(b)) {
	    if ((a.type === 'matrix3') && (b.type === 'matrix3')) {
	      return matrix.matrix(a, b);
	    } else if ((a.type === 'path') && (b.type === 'path')) {
	      return path.path(a, b);
	    }
	    return object.object(a, b);
	  } else if (Util.isArray(a) && Util.isArray(b)) {
	    return array.array(a, b);
	  } else {
	    return singular.singular(a, b);
	  }
	};

	function unInterpolation(a, b) {
	  if ((a.type === 'matrix3') && (b.type === 'matrix3')) {
	    return matrix.unMatrix(a, b);
	  } else if (Util.isArray(a) && Util.isArray(b)) {
	    return array.unArray(a, b);
	  } else if (Util.isObject(a) && Util.isObject(b)) {
	    return object.unObject(a, b);
	  } else {
	    return singular.unSingular(a, b);
	  }
	}

	module.exports = {
	  interpolation: interpolation,
	  unInterpolation: unInterpolation
	};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var singular = __webpack_require__(17);
	var Matrix = __webpack_require__(3);
	var Matrix3 = Matrix.Matrix3;

	var l = 9;

	function matrix(m1, m2) {
	  var x = [];
	  var m1e = m1.elements;
	  var m2e = m2.elements;

	  for (var i = 0; i < l; i ++) {
	    x[i] = singular.singular(m1e[i], m2e[i]);
	  }

	  return function(t) {
	    var m = new Matrix3();
	    var me = m.elements;

	    for (var i = 0; i < l; i ++) {
	      me[i] = x[i](t);
	    }

	    return m;
	  }
	}

	function unMatrix(m1, m2) {
	  var x = [];
	  var m1e = m1.elements;
	  var m2e = m2.elements;

	  for (var i = 0; i < l; i ++) {
	    x[i] = singular.unSingular(m1e[i], m2e[i]);
	  }

	  return function(m) {
	    var me = m.elements;
	    var rst = 0;
	    var num = 0;
	    for (var i = 0; i < l; i ++) {
	      var r = x[i](me[i]);
	      if (r !== 0) {
	        rst += r;
	        num ++;
	      }
	    }
	    return rst / num;
	  }
	}

	module.exports = {
	  matrix: matrix,
	  unMatrix: unMatrix
	};


/***/ }),
/* 98 */
/***/ (function(module, exports) {

	'use strict';

	function number(a, b) {
	  a = +a;
	  b = +b;
	  return function(t) {
	    return a * (1 - t) + b * t;
	  };
	}

	function unNumber(a, b) {
	  b -= a;
	  return function(x) {
	    return b === 0 ? 0 : (x - a) / b;
	  }
	}

	module.exports = {
	  number: number,
	  unNumber: unNumber
	};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var singular = __webpack_require__(17);

	function object(a, b) {
	  var x = {};

	  for (var k in a) {
	    if (k in b) {
	      x[k] = singular.singular(a[k], b[k]);
	    }
	  }

	  return function(t) {
	    var c = {};
	    for (var k in x) {
	      c[k] = x[k](t);
	    }
	    return c;
	  }
	}

	function unObject(a, b) {
	  var x = {};
	  for (var k in a) {
	    if (k in b) {
	      x[k] = singular.unSingular(a[k], b[k]);
	    }
	  }

	  return function(c) {
	    var rst = 0;
	    var num = 0;
	    for (var k in x) {
	      if (k in c) {
	        rst += x[k](c[k]);
	        num ++;
	      }
	    }
	    return num === 0 ? 0 : rst / num;
	  }
	}

	module.exports = {
	  object: object,
	  unObject: unObject
	};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var PathUtil = __webpack_require__(23);

	function path(a, b) {
	  var curves = PathUtil.toCurve(a.path, b.path);
	  var curvea = curves[0];
	  var curveb = curves[1];
	  return function(t) {
	    var rst = [];
	    if(t >= 1){
	      return b.path;
	    }
	    if(t <= 0){
	      return a.path;
	    }
	    for (var i = 0; i < curvea.length; i++) {
	      rst[i] = [curvea[i][0]];
	      for (var j = 1; j < curvea[i].length; j++) {
	        rst[i][j] = (curveb[i][j] - curvea[i][j])*t + curvea[i][j];
	      }
	    }
	    return rst;
	  }
	}

	module.exports = {
	  path: path
	};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

	/**
	 * @fileOverview gMath 基础数学工具类
	 * @author hankaiai@126.com
	 * @author dxq613@gmail.com
	 * @ignore
	 */

	"use strict";

	//取小于当前值的
	function arrayFloor(values,value){
	  var length = values.length;
	  if (length === 0) {
	    return NaN;
	  }


	  var pre = values[0];

	  if(value < values[0]){
	    return NaN;
	  }

	  if(value >= values[length - 1]){
	    return values[length - 1];
	  }
	  for (var i = 1; i < values.length; i++) {
	    if(value < values[i]){
	      break;
	    }
	    pre = values[i];
	  }

	  return pre;
	}
	//大于当前值的第一个
	function arrayCeiling(values,value){
	  var length = values.length;
	  if (length === 0) {
	    return NaN;
	  }
	  var pre = values[0],
	      rst;
	  if(value > values[length - 1]){
	    return NaN;
	  }
	  if(value < values[0]){
	    return values[0];
	  }

	  for (var i = 1; i < values.length; i++) {
	    if(value <= values[i]){
	      rst = values[i];
	      break;
	    }
	    pre = values[i];
	  }

	  return rst;
	}


	var gMath = {
	  /**
	   * 常亮：数据的精度，小于这个精度认为是0
	   **/
	  PRECISION: 0.00001,
	  /**
	   * 判断两个数是否相等
	   * @param {Number} a 数
	   * @param {Number} b 数
	   * @return {Boolean} 是否相等
	   **/
	  equal: function(a, b) {
	    return (Math.abs((a - b)) < gMath.PRECISION);
	  },
	  /**
	   * 把a夹在min，max中间, 低于min的返回min，高于max的返回max，否则返回自身
	   * @param {Number} a 数
	   * @param {Number} min 下限
	   * @param {Number} max 上限
	   **/
	  clamp: function(a, min, max) {
	    if (a < min) {
	      return min;
	    } else if (a > max){
	      return max;
	    } else {
	      return a;
	    }
	  },
	  /**
	   * 获取逼近的值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的值
	   */
	  snapTo : function(values, value){
	    // 这里假定values是升序排列
	    var floorVal = arrayFloor(values,value),
	      ceilingVal = arrayCeiling(values,value);
	    if(isNaN(floorVal) || isNaN(ceilingVal)){
	      if(values[0] >= value){
	        return values[0];
	      }
	      var last = values[values.length -1];
	      if(last <= value){
	        return last;
	      }
	    }


	    if(Math.abs(value - floorVal) < Math.abs(ceilingVal - value)){
	      return floorVal;
	    }
	    return ceilingVal;
	  },
	  /**
	   * 获取逼近的最小值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的最小值
	   */
	  snapFloor : function(values,value){
	    // 这里假定values是升序排列
	    return arrayFloor(values,value);
	  },
	  /**
	   * 获取逼近的最大值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的最大值
	   */
	  snapCeiling : function(values,value){
	    // 这里假定values是升序排列
	    return arrayCeiling(values,value);
	  },
	  /**
	   * 获取角度对应的弧度
	   * @param {Number} degree 角度
	   * @return {Number} 弧度
	   **/
	  degreeToRad: function(degree) {
	    return Math.PI / 180 * degree;
	  },
	  /**
	   * 获取弧度对应的角度
	   * @param {Number} rad 弧度
	   * @return {Number} 角度
	   **/
	  radToDegree: function(rad) {
	    return 180 / Math.PI * rad;
	  },
	  /**
	   * 广义取模运算
	   * @param {Number} v 被取模的值
	   * @param {Number} m 模
	   */
	  mod: function(n, m) {
	    return ( ( n % m ) + m ) % m;
	  }
	};



	module.exports = gMath;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Matrix3 3阶矩阵表示
	 * @author hankaiai@126.com
	 * @ignore
	 */

	 "use strict";

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);

	function Matrix3() {
	  this.elements = [
	    1, 0, 0,
	    0, 1, 0,
	    0, 0, 1
	  ];
	}

	Matrix3.multiply = function(m1, m2) {
	  var te = m1.elements;
	  var me = m2.elements;
	  var m = new Matrix3();
	  return m.set(
	    te[0] * me[0] + te[3] * me[1] + te[6] * me[2], te[0] * me[3] + te[3] * me[4] + te[6] * me[5], te[0] * me[6] + te[3] * me[7] + te[6] * me[8],
	    te[1] * me[0] + te[4] * me[1] + te[7] * me[2], te[1] * me[3] + te[4] * me[4] + te[7] * me[5], te[1] * me[6] + te[4] * me[7] + te[7] * me[8],
	    te[2] * me[0] + te[5] * me[1] + te[8] * me[2], te[2] * me[3] + te[5] * me[4] + te[8] * me[5], te[2] * me[6] + te[5] * me[7] + te[8] * me[8]
	  );
	};

	Matrix3.equal = function(m1, m2) {
	  var m1e = m1.elements;
	  var m2e = m2.elements;
	  var res = true;
	  for (var i = 0, l = m1e.length; i < l; i ++) {
	    if (!gMath.equal(m1e[i], m2e[i])) {
	      res = false;
	      break;
	    }
	  }
	  return res;
	};

	Util.augment(Matrix3, {
	  type: 'matrix3',
	  set: function(
	    n11, n12, n13,
	    n21, n22, n23,
	    n31, n32, n33
	  ) {
	    var te = this.elements;

	    te[0] = n11; te[3] = n12; te[6] = n13;
	    te[1] = n21; te[4] = n22; te[7] = n23;
	    te[2] = n31; te[5] = n32; te[8] = n33;

	    return this;
	  },
	  get: function(i, j) {
	    i --;
	    j --;
	    return this.elements[j * 3 + i];
	  },
	  identity: function() {
	    return this.set(
	      1, 0, 0,
	      0, 1, 0,
	      0, 0, 1
	    );
	  },
	  multiplyScalar: function(s) {
	    var te = this.elements;

	    te[0] *= s; te[3] *= s; te[6] *= s;
	    te[1] *= s; te[4] *= s; te[7] *= s;
	    te[2] *= s; te[5] *= s; te[8] *= s;

	    return this;
	  },
	  det: function() {
	    var te = this.elements;
	    var a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
	        d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
	        g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

	    return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
	  },
	  inverse: function(throwOnInvertible) {
	    return this.copy(this.getInverse(throwOnInvertible));;
	  },
	  getInverse: function(throwOnInvertible) {
	    var det = this.det();
	    if (det === 0) {
	      if (throwOnInvertible) {
	        throw 'matrix exception: get inverse matrix with 0 det';
	      } else {
	        console.warn('matrix cannot inverse');
	        return new Matrix3();
	      }
	    }
	    var te = this.elements;
	    var a = te[ 0 ], b = te[ 3 ], c = te[ 6 ],
	        d = te[ 1 ], e = te[ 4 ], f = te[ 7 ],
	        g = te[ 2 ], h = te[ 5 ], i = te[ 8 ];
	    var inverse = new Matrix3();
	    inverse.set(
	        te[4] * te[8] - te[7] * te[5] , -(te[3] * te[8] - te[6] * te[5]),   te[3] * te[7] - te[6] * te[4] ,
	      -(te[1] * te[8] - te[7] * te[2]),   te[0] * te[8] - te[6] * te[2] , -(te[0] * te[7] - te[6] * te[1]),
	        te[1] * te[5] - te[4] * te[2] , -(te[0] * te[5] - te[3] * te[2]),   te[0] * te[4] - te[3] * te[1]
	    );
	    inverse.multiplyScalar(1 / det);
	    return inverse;
	  },
	  transpose: function() {
	    var tmp, te = this.elements;
	    tmp = te[1]; te[1] = te[3]; te[3] = tmp;
	    tmp = te[2]; te[2] = te[6]; te[6] = tmp;
	    tmp = te[5]; te[5] = te[7]; te[7] = tmp;
	    return this;
	  },
	  multiply: function(m) {
	    return this.copy(Matrix3.multiply(this, m));;
	  },
	  translate: function(x, y) {
	    var t = new Matrix3();
	    t.set(
	      1, 0, x,
	      0, 1, y,
	      0, 0, 1
	    );
	    return this.copy(Matrix3.multiply(t, this));
	  },
	  rotate: function(rad) {
	    var r = new Matrix3();
	    r.set(
	      Math.cos(rad), -Math.sin(rad), 0,
	      Math.sin(rad), Math.cos(rad), 0,
	      0, 0, 1
	    );
	    return this.copy(Matrix3.multiply(r, this));
	  },
	  scale: function(s1, s2) {
	    var s = new Matrix3();
	    s.set(
	      s1, 0, 0,
	      0, s2, 0,
	      0, 0,  1
	    );
	    return this.copy(Matrix3.multiply(s, this));
	  },
	  equal: function(m) {
	    return Matrix3.equal(this, m);
	  },
	  copy: function(m) {
	    var me = m.elements;
	    var te = this.elements;
	    for (var i = 0, l = me.length; i < l; i ++) {
	      te[i] = me[i];
	    }
	    return this;
	  },
	  clone: function() {
	    var m = new Matrix3();
	    var me = m.elements;
	    var te = this.elements;
	    for (var i = 0, l = te.length; i < l; i ++) {
	      me[i] = te[i];
	    }
	    return m;
	  },
	  to2DObject: function() {
	    var te = this.elements;
	    return {
	      a: te[0],
	      b: te[1],
	      c: te[3],
	      d: te[4],
	      e: te[6],
	      f: te[7]
	    };
	  },
	  from2DObject: function(obj) {
	    var te = this.elements;
	    te[0] = obj.a;
	    te[1] = obj.b;
	    te[3] = obj.c;
	    te[4] = obj.d;
	    te[6] = obj.e;
	    te[7] = obj.f;
	    return this;
	  }
	});


	module.exports = Matrix3;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Vector2 2维向量类
	 * @author hankaiai@126.com
	 * @ignore
	 */

	 "use strict";

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);

	function Vector2(x, y) {
	  if (arguments.length === 1) {
	    var arr = x;
	    x = arr[0];
	    y = arr[1];
	  }
	  this.x = x || 0;
	  this.y = y || 0;
	}

	// v1 v2 和
	Vector2.add = function(v1, v2) {
	  return new Vector2(v1.x + v2.x, v1.y + v2.y);
	};

	// v1 v2 差
	Vector2.sub = function(v1, v2) {
	  return new Vector2(v1.x - v2.x, v1.y - v2.y);
	};

	// v1 v2 插值
	Vector2.lerp = function(v1, v2, alpha) {
	  return new Vector2(v1.x + (v2.x - v1.x) * alpha, v1.y + (v2.y - v1.y) * alpha);
	};

	// v1 v2 夹角
	Vector2.angle = function(v1, v2) {
	  var theta = v1.dot(v2) / (v1.length() * v2.length());

	  return Math.acos(gMath.clamp(theta, -1, 1));
	};

	// v1 到 v2 夹角的方向
	Vector2.direction = function(v1, v2) { // >= 0 顺时针 < 0 逆时针
	  return v1.x * v2.y - v2.x * v1.y;
	};



	Util.augment(Vector2, {
	  type: 'vector2',
	  set: function(x, y) {
	    this.x = x;
	    this.y = y;
	    return this;
	  },
	  setComponent: function(index, value) {
	    switch(index) {
	      case 0: this.x = value; return this;
	      case 1: this.y = value; return this;
	      default: throw new Error('the index out of range:' + index);
	    }
	  },
	  getComponent: function(index) {
	    switch(index) {
	      case 0: return this.x;
	      case 1: return this.y;
	      default: throw new Error('the index out of range:' + index);
	    }
	  },
	  copy: function(v) {
	    this.x = v.x;
	    this.y = v.y;
	    return this;
	  },
	  add: function(v) {
	    return this.copy(Vector2.add(this, v));
	  },
	  sub: function(v) {
	    return this.copy(Vector2.sub(this, v));
	  },
	  subBy: function(v) {
	    return this.copy(Vector2.sub(v, this));
	  },
	  multiplyScaler: function(s) {
	    this.x *= s;
	    this.y *= s;
	    return this;
	  },
	  divideScaler: function(s) {
	    if (s !== 0) {
	      var invScaler = 1 / s;
	      this.x *= invScaler;
	      this.y *= invScaler;
	    } else {
	      this.x = 0;
	      this.y = 0;
	    }
	    return this;
	  },
	  min: function(v) {
	    if (this.x > v.x) {
	      this.x = v.x;
	    }

	    if (this.y > v.y) {
	      this.y = v.y;
	    }
	    return this;
	  },
	  max: function(v) {
	    if (this.x < v.x) {
	      this.x = v.x;
	    }

	    if (this.y < v.y) {
	      this.y = v.y;
	    }

	    return this;
	  },
	  clamp: function(min, max) {
	    if (this.x < min.x) {
	      this.x = min.x;
	    } else if (this.x > max.x){
	      this.x = max.x;
	    }

	    if (this.y < min.y) {
	      this.y = min.y;
	    } else if (this.y > max.y) {
	      this.y = max.y;
	    }

	    return this;
	  },
	  clampScale: (function() {
	    var min, max;
	    return function (minVal, maxVal) {
	      if (min === undefined) {
	        min = new Vector2();
	        max = new Vector2();
	      }
	      min.set(minVal, minVal);
	      max.set(maxVal, maxVal);

	      return this.clamp(min, max);
	    };
	  })(),
	  floor: function() {
	    this.x = Math.floor(this.x);
	    this.y = Math.floor(this.y);
	    return this;
	  },
	  ceil: function() {
	    this.x = Math.ceil(this.x);
	    this.y = Math.ceil(this.y);
	    return this;
	  },
	  round: function() {
	    this.x = Math.round(this.x);
	    this.y = Math.round(this.y);
	    return this;
	  },
	  roundToZero: function() {
	    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
	    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
	    return this;
	  },
	  negate: function() {
	    this.x = - this.x;
	    this.y = - this.y;
	    return this;
	  },
	  dot: function(v) {
	    return this.x * v.x + this.y * v.y;
	  },
	  lengthSq: function() {
	    return this.x * this.x + this.y * this.y;
	  },
	  length: function() {
	    return Math.sqrt(this.lengthSq());
	  },
	  normalize: function() {
	    return this.divideScaler(this.length());
	  },
	  distanceToSquared: function(v) {
	    var dx = this.x - v.x, dy = this.y - v.y;
	    return dx * dx + dy * dy;
	  },
	  distanceTo: function(v) {
	    return Math.sqrt(this.distanceToSquared(v));
	  },
	  angleTo: function(v, direct) {
	    var angle = this.angle(v);
	    var angleLargeThanPi = Vector2.direction(this, v) >= 0;
	    if (direct) {
	      if (angleLargeThanPi) {
	        return Math.PI * 2 - angle;
	      } else {
	        return angle;
	      }
	    } else {
	      if (angleLargeThanPi) {
	        return angle;
	      } else {
	        return Math.PI * 2 - angle;
	      }
	    }
	  },
	  vertical: function(left) {
	    if (left) {
	      return new Vector2(this.y, -this.x);
	    } else {
	      return new Vector2(-this.y, this.x);
	    }
	  },
	  angle: function(v) {
	    return Vector2.angle(this, v);
	  },
	  setLength: function(l) {
	    var oldLength = this.length();
	    if (oldLength !== 0 && l !== oldLength) {
	      this.multiplyScaler(l / oldLength);
	    }
	    return this;
	  },
	  isZero: function() {
	    return this.x === 0 && this.y === 0;
	  },
	  lerp: function(v, alpha) {
	    return this.copy(Vector2.lerp(this, v, alpha));
	  },
	  equal: function(v) {
	    return gMath.equal(this.x, v.x) && gMath.equal(this.y, v.y);
	  },
	  clone: function() {
	    return new Vector2(this.x, this.y);
	  },
	  rotate: function(angle) {
	    var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	    var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	    this.x = nx;
	    this.y = ny;

	    return this;
	  }
	});

	module.exports = Vector2;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview Vector3 3维向量类
	 * @author hankaiai@126.com
	 * @ignore
	 */

	 "use strict";

	var Util = __webpack_require__(1);
	var gMath = __webpack_require__(8);



	function Vector3(x, y, z) {
	  if (arguments.length === 1) {
	    if (Util.isArray(x)) {
	      var arr = x;
	      x = arr[0];
	      y = arr[1];
	      z = arr[2];
	    } else if (x.type === 'vector2') {
	      var v = x;
	      x = v.x;
	      y = v.y;
	      z = 1;
	    }
	  }
	  this.x = x || 0;
	  this.y = y || 0;
	  this.z = z || 0;
	}

	Vector3.add = function(v1, v2) {
	  return new Vector3(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
	};

	Vector3.sub = function(v1, v2) {
	  return new Vector3(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
	};

	Vector3.lerp = function(v1, v2, alpha) {
	  return new Vector3(
	    v1.x + (v2.x - v1.x) * alpha,
	    v1.y + (v2.y - v1.y) * alpha,
	    v1.z + (v2.z - v1.z) * alpha
	  );
	};

	Vector3.cross = function(v, w) {
	  var vx = v.x, vy = v.y, vz = v.z;
	  var wx = w.x, wy = w.y, wz = w.z;
	  return new Vector3(
	    vy * wz - vz * wy,
	    vz * wx - vx * wz,
	    vx * wy - vy * wx
	  );
	};

	Vector3.angle = function(v1, v2) {
	  var theta = v1.dot(v2) / (v1.length() * v2.length());

	  return Math.acos(gMath.clamp(theta, -1, 1));
	};

	Util.augment(Vector3, {
	  type: 'vector3',
	  set: function(x, y, z) {
	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	  },
	  setComponent: function(index, value) {
	    switch(index) {
	      case 0: this.x = value; return this;
	      case 1: this.y = value; return this;
	      case 2: this.z = value; return this;
	      default: throw new Error('index is out of range:' + index);
	    }
	  },
	  getComponent: function(index) {
	    switch(index) {
	      case 0: return this.x;
	      case 1: return this.y;
	      case 2: return this.z;
	      default: throw new Error('index is out of range:' + index);
	    }
	  },
	  add: function(v) {
	    return this.copy(Vector3.add(this, v));
	  },
	  sub: function(v) {
	    return this.copy(Vector3.sub(this, v));
	  },
	  subBy: function(v) {
	    return this.copy(Vector3.sub(v, this));
	  },
	  multiplyScaler: function(s) {
	    this.x *= s;
	    this.y *= s;
	    this.z *= s;
	    return this;
	  },
	  divideScaler: function(s) {
	    if (s !== 0) {
	      var invs = 1 / s;
	      this.x *= invs;
	      this.y *= invs;
	      this.z *= invs;
	    } else {
	      this.x = 0;
	      this.y = 0;
	      this.z = 0;
	    }
	    return this;
	  },
	  min: function(v) {
	    if (this.x > v.x) {
	      this.x = v.x;
	    }
	    if (this.y > v.y) {
	      this.y = v.y;
	    }
	    if (this.z > v.z) {
	      this.z = v.z;
	    }
	    return this;
	  },
	  max: function(v) {
	    if (this.x < v.x) {
	      this.x = v.x;
	    }
	    if (this.y < v.y) {
	      this.y = v.y;
	    }
	    if (this.z < v.z) {
	      this.z = v.z;
	    }
	    return this;
	  },
	  clamp: function(min, max) {
	    if (this.x < min.x) {
	      this.x = min.x;
	    } else if (this.x > max.x){
	      this.x = max.x;
	    }

	    if (this.y < min.y) {
	      this.y = min.y;
	    } else if (this.y > max.y){
	      this.y = max.y;
	    }

	    if (this.z < min.z) {
	      this.z = min.z;
	    } else if (this.z > max.z) {
	      this.z = max.z;
	    }
	    return this;
	  },
	  clampScale: function() {
	    var min, max;
	    return function(minVal, maxVal) {
	      if (min === undefined) {
	        min = new Vector3();
	        max = new Vector3();
	      }
	      min.set(minVal, minVal, minVal);
	      max.set(maxVal, maxVal, maxVal);

	      return this.clamp(min, max);
	    };
	  }(),
	  floor: function() {
	    this.x = Math.floor(this.x);
	    this.y = Math.floor(this.y);
	    this.z = Math.floor(this.z);
	    return this;
	  },
	  ceil: function() {
	    this.x = Math.ceil(this.x);
	    this.y = Math.ceil(this.y);
	    this.z = Math.ceil(this.z);
	    return this;
	  },
	  round: function() {
	    this.x = Math.round(this.x);
	    this.y = Math.round(this.y);
	    this.z = Math.round(this.z);
	    return this;
	  },
	  roundToZero: function() {
	    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
	    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
	    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z);
	    return this;
	  },
	  negate: function() {
	    this.x = - this.x;
	    this.y = - this.y;
	    this.z = - this.z;

	    return this;
	  },
	  dot: function(v) {
	    return this.x * v.x + this.y * v.y + this.z * v.z;
	  },
	  lengthSq: function() {
	    return this.x * this.x + this.y * this.y + this.z * this.z;
	  },
	  length: function() {
	    return Math.sqrt(this.lengthSq());
	  },
	  lengthManhattan: function() {
	    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	  },
	  normalize: function() {
	    return this.divideScaler(this.length());
	  },
	  setLength: function(l) {
	    var oldLength = this.length();

	    if (oldLength !== 0 && l !== oldLength) {
	        this.multiplyScaler(l / oldLength);
	    }
	    return this;
	  },
	  lerp: function(v, alpha) {
	    return this.copy(Vector3.lerp(this, v, alpha));
	  },
	  cross: function(v) {
	    return this.copy(Vector3.cross(this, v));
	  },
	  // angleTo: function(v) {
	  //   var theta = this.dot(v) / (this.length() * v.length());

	  //   return Math.acos(gMath.clamp(theta, -1, 1));
	  // },
	  angle: function(v) {
	    return Vector3.angle(this, v);
	  },
	  distanceToSquared: function(v) {
	    var dx = this.x - v.x;
	    var dy = this.y - v.y;
	    var dz = this.z - v.z;

	    return dx * dx + dy * dy + dz * dz;
	  },
	  distanceTo: function(v) {
	    return Math.sqrt(this.distanceToSquared(v));
	  },
	  applyMatrix: function(m) {
	    var me = m.elements;
	    var x = me[0] * this.x + me[3] * this.y + me[6] * this.z;
	    var y = me[1] * this.x + me[4] * this.y + me[7] * this.z;
	    var z = me[2] * this.x + me[5] * this.y + me[8] * this.z;

	    this.x = x;
	    this.y = y;
	    this.z = z;
	    return this;
	  },
	  copy: function(v) {
	    this.x = v.x;
	    this.y = v.y;
	    this.z = v.z !== undefined ? v.z : 1;
	    return this;
	  },
	  equal: function(v) {
	    return gMath.equal(this.x, v.x)
	        && gMath.equal(this.y, v.y)
	        && gMath.equal(this.z, v.z);
	  },
	  clone: function() {
	    return new Vector3(this.x, this.y, this.z);
	  }
	});

	module.exports = Vector3;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Useful things from Adobe's Snap.svg adopted to the library needs
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var PI = Math.PI;

	/*
	 * Paths
	 */

	var spaces = "\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029";
	var pathCommand = new RegExp("([a-z])[" + spaces + ",]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[" + spaces + "]*,?[" + spaces + "]*)+)", "ig");
	var pathValues = new RegExp("(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[" + spaces + "]*,?[" + spaces + "]*", "ig");

	// Parses given path string into an array of arrays of path segments
	var parsePathString = function(pathString) {
	  if (!pathString) {
	    return null;
	  }

	  if (typeof pathString === typeof []) {
	    return pathString;
	  } else {
	    var paramCounts = {
	        a: 7,
	        c: 6,
	        o: 2,
	        h: 1,
	        l: 2,
	        m: 2,
	        r: 4,
	        q: 4,
	        s: 4,
	        t: 2,
	        v: 1,
	        u: 3,
	        z: 0
	      },
	      data = [];

	    String(pathString).replace(pathCommand, function(a, b, c) {
	      var params = [],
	        name = b.toLowerCase();
	      c.replace(pathValues, function(a, b) {
	        b && params.push(+b);
	      });
	      if (name == "m" && params.length > 2) {
	        data.push([b].concat(params.splice(0, 2)));
	        name = "l";
	        b = b == "m" ? "l" : "L";
	      }
	      if (name == "o" && params.length == 1) {
	        data.push([b, params[0]]);
	      }
	      if (name == "r") {
	        data.push([b].concat(params));
	      } else
	        while (params.length >= paramCounts[name]) {
	          data.push([b].concat(params.splice(0, paramCounts[name])));
	          if (!paramCounts[name]) {
	            break;
	          }
	        }
	    });

	    return data;
	  }
	};


	// http://schepers.cc/getting-to-the-point
	var catmullRom2bezier = function(crp, z) {
	  var d = [];
	  for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
	    var p = [{
	      x: +crp[i - 2],
	      y: +crp[i - 1]
	    }, {
	      x: +crp[i],
	      y: +crp[i + 1]
	    }, {
	      x: +crp[i + 2],
	      y: +crp[i + 3]
	    }, {
	      x: +crp[i + 4],
	      y: +crp[i + 5]
	    }];
	    if (z) {
	      if (!i) {
	        p[0] = {
	          x: +crp[iLen - 2],
	          y: +crp[iLen - 1]
	        };
	      } else if (iLen - 4 == i) {
	        p[3] = {
	          x: +crp[0],
	          y: +crp[1]
	        };
	      } else if (iLen - 2 == i) {
	        p[2] = {
	          x: +crp[0],
	          y: +crp[1]
	        };
	        p[3] = {
	          x: +crp[2],
	          y: +crp[3]
	        };
	      }
	    } else {
	      if (iLen - 4 == i) {
	        p[3] = p[2];
	      } else if (!i) {
	        p[0] = {
	          x: +crp[i],
	          y: +crp[i + 1]
	        };
	      }
	    }
	    d.push(["C",
	      (-p[0].x + 6 * p[1].x + p[2].x) / 6,
	      (-p[0].y + 6 * p[1].y + p[2].y) / 6,
	      (p[1].x + 6 * p[2].x - p[3].x) / 6,
	      (p[1].y + 6 * p[2].y - p[3].y) / 6,
	      p[2].x,
	      p[2].y
	    ]);
	  }

	  return d;

	};

	var ellipsePath = function(x, y, rx, ry, a) {
	  if (a == null && ry == null) {
	    ry = rx;
	  }
	  x = +x;
	  y = +y;
	  rx = +rx;
	  ry = +ry;
	  if (a != null) {
	    var rad = Math.PI / 180,
	      x1 = x + rx * Math.cos(-ry * rad),
	      x2 = x + rx * Math.cos(-a * rad),
	      y1 = y + rx * Math.sin(-ry * rad),
	      y2 = y + rx * Math.sin(-a * rad),
	      res = [
	        ["M", x1, y1],
	        ["A", rx, rx, 0, +(a - ry > 180), 0, x2, y2]
	      ];
	  } else {
	    res = [
	      ["M", x, y],
	      ["m", 0, -ry],
	      ["a", rx, ry, 0, 1, 1, 0, 2 * ry],
	      ["a", rx, ry, 0, 1, 1, 0, -2 * ry],
	      ["z"]
	    ];
	  }
	  return res;
	};

	var pathToAbsolute = function(pathArray) {
	  pathArray = parsePathString(pathArray);

	  if (!pathArray || !pathArray.length) {
	    return [
	      ["M", 0, 0]
	    ];
	  }
	  var res = [],
	    x = 0,
	    y = 0,
	    mx = 0,
	    my = 0,
	    start = 0,
	    pa0;
	  if (pathArray[0][0] == "M") {
	    x = +pathArray[0][1];
	    y = +pathArray[0][2];
	    mx = x;
	    my = y;
	    start++;
	    res[0] = ["M", x, y];
	  }
	  var crz = pathArray.length == 3 &&
	    pathArray[0][0] == "M" &&
	    pathArray[1][0].toUpperCase() == "R" &&
	    pathArray[2][0].toUpperCase() == "Z";
	  for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
	    res.push(r = []);
	    pa = pathArray[i];
	    pa0 = pa[0];
	    if (pa0 != pa0.toUpperCase()) {
	      r[0] = pa0.toUpperCase();
	      switch (r[0]) {
	        case "A":
	          r[1] = pa[1];
	          r[2] = pa[2];
	          r[3] = pa[3];
	          r[4] = pa[4];
	          r[5] = pa[5];
	          r[6] = +pa[6] + x;
	          r[7] = +pa[7] + y;
	          break;
	        case "V":
	          r[1] = +pa[1] + y;
	          break;
	        case "H":
	          r[1] = +pa[1] + x;
	          break;
	        case "R":
	          var dots = [x, y].concat(pa.slice(1));
	          for (var j = 2, jj = dots.length; j < jj; j++) {
	            dots[j] = +dots[j] + x;
	            dots[++j] = +dots[j] + y;
	          }
	          res.pop();
	          res = res.concat(catmullRom2bezier(dots, crz));
	          break;
	        case "O":
	          res.pop();
	          dots = ellipsePath(x, y, pa[1], pa[2]);
	          dots.push(dots[0]);
	          res = res.concat(dots);
	          break;
	        case "U":
	          res.pop();
	          res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	          r = ["U"].concat(res[res.length - 1].slice(-2));
	          break;
	        case "M":
	          mx = +pa[1] + x;
	          my = +pa[2] + y;
	        default:
	          for (j = 1, jj = pa.length; j < jj; j++) {
	            r[j] = +pa[j] + ((j % 2) ? x : y);
	          }
	      }
	    } else if (pa0 == "R") {
	      dots = [x, y].concat(pa.slice(1));
	      res.pop();
	      res = res.concat(catmullRom2bezier(dots, crz));
	      r = ["R"].concat(pa.slice(-2));
	    } else if (pa0 == "O") {
	      res.pop();
	      dots = ellipsePath(x, y, pa[1], pa[2]);
	      dots.push(dots[0]);
	      res = res.concat(dots);
	    } else if (pa0 == "U") {
	      res.pop();
	      res = res.concat(ellipsePath(x, y, pa[1], pa[2], pa[3]));
	      r = ["U"].concat(res[res.length - 1].slice(-2));
	    } else {
	      for (var k = 0, kk = pa.length; k < kk; k++) {
	        r[k] = pa[k];
	      }
	    }
	    pa0 = pa0.toUpperCase();
	    if (pa0 != "O") {
	      switch (r[0]) {
	        case "Z":
	          x = +mx;
	          y = +my;
	          break;
	        case "H":
	          x = r[1];
	          break;
	        case "V":
	          y = r[1];
	          break;
	        case "M":
	          mx = r[r.length - 2];
	          my = r[r.length - 1];
	        default:
	          x = r[r.length - 2];
	          y = r[r.length - 1];
	      }
	    }
	  }

	  return res;
	};


	var l2c = function(x1, y1, x2, y2) {
	  return [x1, y1, x2, y2, x2, y2];
	};
	var q2c = function(x1, y1, ax, ay, x2, y2) {
	  var _13 = 1 / 3,
	    _23 = 2 / 3;
	  return [
	    _13 * x1 + _23 * ax,
	    _13 * y1 + _23 * ay,
	    _13 * x2 + _23 * ax,
	    _13 * y2 + _23 * ay,
	    x2,
	    y2
	  ];
	};
	var a2c = function(x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
	  // for more information of where this math came from visit:
	  // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
	  if (rx === ry) rx += 1;
	  var _120 = Math.PI * 120 / 180,
	    rad = Math.PI / 180 * (+angle || 0),
	    res = [],
	    xy,
	    rotate = function(x, y, rad) {
	      var X = x * Math.cos(rad) - y * Math.sin(rad),
	        Y = x * Math.sin(rad) + y * Math.cos(rad);
	      return {
	        x: X,
	        y: Y
	      };
	    };
	  if (!recursive) {
	    xy = rotate(x1, y1, -rad);
	    x1 = xy.x;
	    y1 = xy.y;
	    xy = rotate(x2, y2, -rad);
	    x2 = xy.x;
	    y2 = xy.y;
	    if (x1 === x2 && y1 === y2) { // 若弧的起始点和终点重叠则错开一点
	      x2 += 1;
	      y2 += 1;
	    }
	    var cos = Math.cos(Math.PI / 180 * angle),
	      sin = Math.sin(Math.PI / 180 * angle),
	      x = (x1 - x2) / 2,
	      y = (y1 - y2) / 2;
	    var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
	    if (h > 1) {
	      h = Math.sqrt(h);
	      rx = h * rx;
	      ry = h * ry;
	    }
	    var rx2 = rx * rx,
	      ry2 = ry * ry,
	      k = (large_arc_flag == sweep_flag ? -1 : 1) *
	      Math.sqrt(Math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
	      cx = k * rx * y / ry + (x1 + x2) / 2,
	      cy = k * -ry * x / rx + (y1 + y2) / 2,
	      f1 = Math.asin(((y1 - cy) / ry).toFixed(9)),
	      f2 = Math.asin(((y2 - cy) / ry).toFixed(9));

	    f1 = x1 < cx ? Math.PI - f1 : f1;
	    f2 = x2 < cx ? Math.PI - f2 : f2;
	    f1 < 0 && (f1 = Math.PI * 2 + f1);
	    f2 < 0 && (f2 = Math.PI * 2 + f2);
	    if (sweep_flag && f1 > f2) {
	      f1 = f1 - Math.PI * 2;
	    }
	    if (!sweep_flag && f2 > f1) {
	      f2 = f2 - Math.PI * 2;
	    }
	  } else {
	    f1 = recursive[0];
	    f2 = recursive[1];
	    cx = recursive[2];
	    cy = recursive[3];
	  }
	  var df = f2 - f1;
	  if (Math.abs(df) > _120) {
	    var f2old = f2,
	      x2old = x2,
	      y2old = y2;
	    f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
	    x2 = cx + rx * Math.cos(f2);
	    y2 = cy + ry * Math.sin(f2);
	    res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
	  }
	  df = f2 - f1;
	  var c1 = Math.cos(f1),
	    s1 = Math.sin(f1),
	    c2 = Math.cos(f2),
	    s2 = Math.sin(f2),
	    t = Math.tan(df / 4),
	    hx = 4 / 3 * rx * t,
	    hy = 4 / 3 * ry * t,
	    m1 = [x1, y1],
	    m2 = [x1 + hx * s1, y1 - hy * c1],
	    m3 = [x2 + hx * s2, y2 - hy * c2],
	    m4 = [x2, y2];
	  m2[0] = 2 * m1[0] - m2[0];
	  m2[1] = 2 * m1[1] - m2[1];
	  if (recursive) {
	    return [m2, m3, m4].concat(res);
	  } else {
	    res = [m2, m3, m4].concat(res).join().split(",");
	    var newres = [];
	    for (var i = 0, ii = res.length; i < ii; i++) {
	      newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
	    }
	    return newres;
	  }
	};

	var path2curve = function(path, path2) {
	  var p = pathToAbsolute(path),
	    p2 = path2 && pathToAbsolute(path2),
	    attrs = {
	      x: 0,
	      y: 0,
	      bx: 0,
	      by: 0,
	      X: 0,
	      Y: 0,
	      qx: null,
	      qy: null
	    },
	    attrs2 = {
	      x: 0,
	      y: 0,
	      bx: 0,
	      by: 0,
	      X: 0,
	      Y: 0,
	      qx: null,
	      qy: null
	    },
	    processPath = function(path, d, pcom) {
	      var nx, ny;
	      if (!path) {
	        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
	      }!(path[0] in {
	        T: 1,
	        Q: 1
	      }) && (d.qx = d.qy = null);
	      switch (path[0]) {
	        case "M":
	          d.X = path[1];
	          d.Y = path[2];
	          break;
	        case "A":
	          path = ["C"].concat(a2c.apply(0, [d.x, d.y].concat(path.slice(1))));
	          break;
	        case "S":
	          if (pcom == "C" || pcom == "S") { // In "S" case we have to take into account, if the previous command is C/S.
	            nx = d.x * 2 - d.bx; // And reflect the previous
	            ny = d.y * 2 - d.by; // command's control point relative to the current point.
	          } else { // or some else or nothing
	            nx = d.x;
	            ny = d.y;
	          }
	          path = ["C", nx, ny].concat(path.slice(1));
	          break;
	        case "T":
	          if (pcom == "Q" || pcom == "T") { // In "T" case we have to take into account, if the previous command is Q/T.
	            d.qx = d.x * 2 - d.qx; // And make a reflection similar
	            d.qy = d.y * 2 - d.qy; // to case "S".
	          } else { // or something else or nothing
	            d.qx = d.x;
	            d.qy = d.y;
	          }
	          path = ["C"].concat(q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
	          break;
	        case "Q":
	          d.qx = path[1];
	          d.qy = path[2];
	          path = ["C"].concat(q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
	          break;
	        case "L":
	          path = ["C"].concat(l2c(d.x, d.y, path[1], path[2]));
	          break;
	        case "H":
	          path = ["C"].concat(l2c(d.x, d.y, path[1], d.y));
	          break;
	        case "V":
	          path = ["C"].concat(l2c(d.x, d.y, d.x, path[1]));
	          break;
	        case "Z":
	          path = ["C"].concat(l2c(d.x, d.y, d.X, d.Y));
	          break;
	      }
	      return path;
	    },
	    fixArc = function(pp, i) {
	      if (pp[i].length > 7) {
	        pp[i].shift();
	        var pi = pp[i];
	        while (pi.length) {
	          pcoms1[i] = "A"; // if created multiple C:s, their original seg is saved
	          p2 && (pcoms2[i] = "A"); // the same as above
	          pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
	        }
	        pp.splice(i, 1);
	        ii = Math.max(p.length, p2 && p2.length || 0);
	      }
	    },
	    fixM = function(path1, path2, a1, a2, i) {
	      if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
	        path2.splice(i, 0, ["M", a2.x, a2.y]);
	        a1.bx = 0;
	        a1.by = 0;
	        a1.x = path1[i][1];
	        a1.y = path1[i][2];
	        ii = Math.max(p.length, p2 && p2.length || 0);
	      }
	    },
	    pcoms1 = [], // path commands of original path p
	    pcoms2 = [], // path commands of original path p2
	    pfirst = "", // temporary holder for original path command
	    pcom = ""; // holder for previous path command of original path
	  for (var i = 0, ii = Math.max(p.length, p2 && p2.length || 0); i < ii; i++) {
	    p[i] && (pfirst = p[i][0]); // save current path command

	    if (pfirst != "C") { // C is not saved yet, because it may be result of conversion
	      pcoms1[i] = pfirst; // Save current path command
	      i && (pcom = pcoms1[i - 1]); // Get previous path command pcom
	    }
	    p[i] = processPath(p[i], attrs, pcom); // Previous path command is inputted to processPath

	    if (pcoms1[i] != "A" && pfirst == "C") pcoms1[i] = "C"; // A is the only command
	    // which may produce multiple C:s
	    // so we have to make sure that C is also C in original path

	    fixArc(p, i); // fixArc adds also the right amount of A:s to pcoms1

	    if (p2) { // the same procedures is done to p2
	      p2[i] && (pfirst = p2[i][0]);
	      if (pfirst != "C") {
	        pcoms2[i] = pfirst;
	        i && (pcom = pcoms2[i - 1]);
	      }
	      p2[i] = processPath(p2[i], attrs2, pcom);

	      if (pcoms2[i] != "A" && pfirst == "C") {
	        pcoms2[i] = "C";
	      }

	      fixArc(p2, i);
	    }
	    fixM(p, p2, attrs, attrs2, i);
	    fixM(p2, p, attrs2, attrs, i);
	    var seg = p[i],
	      seg2 = p2 && p2[i],
	      seglen = seg.length,
	      seg2len = p2 && seg2.length;
	    attrs.x = seg[seglen - 2];
	    attrs.y = seg[seglen - 1];
	    attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
	    attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
	    attrs2.bx = p2 && (parseFloat(seg2[seg2len - 4]) || attrs2.x);
	    attrs2.by = p2 && (parseFloat(seg2[seg2len - 3]) || attrs2.y);
	    attrs2.x = p2 && seg2[seg2len - 2];
	    attrs2.y = p2 && seg2[seg2len - 1];
	  }

	  return p2 ? [p, p2] : p;
	};

	var box = function(x, y, width, height) {
	  if (x == null) {
	    x = y = width = height = 0;
	  }
	  if (y == null) {
	    y = x.y;
	    width = x.width;
	    height = x.height;
	    x = x.x;
	  }
	  return {
	    x: x,
	    y: y,
	    w: width,
	    h: height,
	    cx: x + width / 2,
	    cy: y + height / 2
	  };
	};

	var p2s = /,?([a-z]),?/gi;
	var path2string = function(path) {
	  return path.join(',').replace(p2s, "$1");
	};

	var base3 = function(t, p1, p2, p3, p4) {
	  var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
	    t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
	  return t * t2 - 3 * p1 + 3 * p2;
	}

	var bezlen = function(x1, y1, x2, y2, x3, y3, x4, y4, z) {
	  if (z == null) {
	    z = 1;
	  }
	  z = z > 1 ? 1 : z < 0 ? 0 : z;
	  var z2 = z / 2,
	    n = 12,
	    Tvalues = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816],
	    Cvalues = [0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601, 0.1069, 0.1069, 0.0472, 0.0472],
	    sum = 0;
	  for (var i = 0; i < n; i++) {
	    var ct = z2 * Tvalues[i] + z2,
	      xbase = base3(ct, x1, x2, x3, x4),
	      ybase = base3(ct, y1, y2, y3, y4),
	      comb = xbase * xbase + ybase * ybase;
	    sum += Cvalues[i] * Math.sqrt(comb);
	  }
	  return z2 * sum;
	}

	var curveDim = function(x0, y0, x1, y1, x2, y2, x3, y3) {
	  var tvalues = [],
	    bounds = [
	      [],
	      []
	    ],
	    a, b, c, t, t1, t2, b2ac, sqrtb2ac;
	  for (var i = 0; i < 2; ++i) {
	    if (i == 0) {
	      b = 6 * x0 - 12 * x1 + 6 * x2;
	      a = -3 * x0 + 9 * x1 - 9 * x2 + 3 * x3;
	      c = 3 * x1 - 3 * x0;
	    } else {
	      b = 6 * y0 - 12 * y1 + 6 * y2;
	      a = -3 * y0 + 9 * y1 - 9 * y2 + 3 * y3;
	      c = 3 * y1 - 3 * y0;
	    }
	    if (Math.abs(a) < 1e-12) {
	      if (Math.abs(b) < 1e-12) {
	        continue;
	      }
	      t = -c / b;
	      if (0 < t && t < 1) {
	        tvalues.push(t);
	      }
	      continue;
	    }
	    b2ac = b * b - 4 * c * a;
	    sqrtb2ac = Math.sqrt(b2ac);
	    if (b2ac < 0) {
	      continue;
	    }
	    t1 = (-b + sqrtb2ac) / (2 * a);
	    if (0 < t1 && t1 < 1) {
	      tvalues.push(t1);
	    }
	    t2 = (-b - sqrtb2ac) / (2 * a);
	    if (0 < t2 && t2 < 1) {
	      tvalues.push(t2);
	    }
	  }

	  var x, y, j = tvalues.length,
	    jlen = j,
	    mt;
	  while (j--) {
	    t = tvalues[j];
	    mt = 1 - t;
	    bounds[0][j] = (mt * mt * mt * x0) + (3 * mt * mt * t * x1) + (3 * mt * t * t * x2) + (t * t * t * x3);
	    bounds[1][j] = (mt * mt * mt * y0) + (3 * mt * mt * t * y1) + (3 * mt * t * t * y2) + (t * t * t * y3);
	  }

	  bounds[0][jlen] = x0;
	  bounds[1][jlen] = y0;
	  bounds[0][jlen + 1] = x3;
	  bounds[1][jlen + 1] = y3;
	  bounds[0].length = bounds[1].length = jlen + 2;


	  return {
	    min: {
	      x: Math.min.apply(0, bounds[0]),
	      y: Math.min.apply(0, bounds[1])
	    },
	    max: {
	      x: Math.max.apply(0, bounds[0]),
	      y: Math.max.apply(0, bounds[1])
	    }
	  };
	}

	var intersect = function(x1, y1, x2, y2, x3, y3, x4, y4) {
	  if (
	    Math.max(x1, x2) < Math.min(x3, x4) ||
	    Math.min(x1, x2) > Math.max(x3, x4) ||
	    Math.max(y1, y2) < Math.min(y3, y4) ||
	    Math.min(y1, y2) > Math.max(y3, y4)
	  ) {
	    return;
	  }
	  var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
	    ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
	    denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

	  if (!denominator) {
	    return;
	  }
	  var px = nx / denominator,
	    py = ny / denominator,
	    px2 = +px.toFixed(2),
	    py2 = +py.toFixed(2);
	  if (
	    px2 < +Math.min(x1, x2).toFixed(2) ||
	    px2 > +Math.max(x1, x2).toFixed(2) ||
	    px2 < +Math.min(x3, x4).toFixed(2) ||
	    px2 > +Math.max(x3, x4).toFixed(2) ||
	    py2 < +Math.min(y1, y2).toFixed(2) ||
	    py2 > +Math.max(y1, y2).toFixed(2) ||
	    py2 < +Math.min(y3, y4).toFixed(2) ||
	    py2 > +Math.max(y3, y4).toFixed(2)
	  ) {
	    return;
	  }
	  return {
	    x: px,
	    y: py
	  };
	}

	var isPointInsideBBox = function(bbox, x, y) {
	  return x >= bbox.x &&
	    x <= bbox.x + bbox.width &&
	    y >= bbox.y &&
	    y <= bbox.y + bbox.height;
	}

	var rectPath = function(x, y, w, h, r) {
	  if (r) {
	    return [
	      ["M", +x + (+r), y],
	      ["l", w - r * 2, 0],
	      ["a", r, r, 0, 0, 1, r, r],
	      ["l", 0, h - r * 2],
	      ["a", r, r, 0, 0, 1, -r, r],
	      ["l", r * 2 - w, 0],
	      ["a", r, r, 0, 0, 1, -r, -r],
	      ["l", 0, r * 2 - h],
	      ["a", r, r, 0, 0, 1, r, -r],
	      ["z"]
	    ];
	  }
	  var res = [
	    ["M", x, y],
	    ["l", w, 0],
	    ["l", 0, h],
	    ["l", -w, 0],
	    ["z"]
	  ];
	  res.toString = toString;
	  return res;
	}

	var box = function(x, y, width, height) {
	  if (x == null) {
	    x = y = width = height = 0;
	  }
	  if (y == null) {
	    y = x.y;
	    width = x.width;
	    height = x.height;
	    x = x.x;
	  }
	  return {
	    x: x,
	    y: y,
	    width: width,
	    w: width,
	    height: height,
	    h: height,
	    x2: x + width,
	    y2: y + height,
	    cx: x + width / 2,
	    cy: y + height / 2,
	    r1: Math.min(width, height) / 2,
	    r2: Math.max(width, height) / 2,
	    r0: Math.sqrt(width * width + height * height) / 2,
	    path: rectPath(x, y, width, height),
	    vb: [x, y, width, height].join(" ")
	  };
	}

	var isBBoxIntersect = function(bbox1, bbox2) {
	  bbox1 = box(bbox1);
	  bbox2 = box(bbox2);
	  return isPointInsideBBox(bbox2, bbox1.x, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y) || isPointInsideBBox(bbox2, bbox1.x, bbox1.y2) || isPointInsideBBox(bbox2, bbox1.x2, bbox1.y2) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y) || isPointInsideBBox(bbox1, bbox2.x, bbox2.y2) || isPointInsideBBox(bbox1, bbox2.x2, bbox2.y2) || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x) && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
	}

	var bezierBBox = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
	  if (!Util.isArray(p1x)) {
	    p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
	  }
	  var bbox = curveDim.apply(null, p1x);
	  return box(
	    bbox.min.x,
	    bbox.min.y,
	    bbox.max.x - bbox.min.x,
	    bbox.max.y - bbox.min.y
	  );
	}

	var findDotsAtSegment = function(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
	  var t1 = 1 - t,
	    t13 = Math.pow(t1, 3),
	    t12 = Math.pow(t1, 2),
	    t2 = t * t,
	    t3 = t2 * t,
	    x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
	    y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
	    mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
	    my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
	    nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
	    ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
	    ax = t1 * p1x + t * c1x,
	    ay = t1 * p1y + t * c1y,
	    cx = t1 * c2x + t * p2x,
	    cy = t1 * c2y + t * p2y,
	    alpha = (90 - Math.atan2(mx - nx, my - ny) * 180 / PI);
	  // (mx > nx || my < ny) && (alpha += 180);
	  return {
	    x: x,
	    y: y,
	    m: {
	      x: mx,
	      y: my
	    },
	    n: {
	      x: nx,
	      y: ny
	    },
	    start: {
	      x: ax,
	      y: ay
	    },
	    end: {
	      x: cx,
	      y: cy
	    },
	    alpha: alpha
	  };
	}

	var interHelper = function(bez1, bez2, justCount) {
	  var bbox1 = bezierBBox(bez1),
	    bbox2 = bezierBBox(bez2);
	  if (!isBBoxIntersect(bbox1, bbox2)) {
	    return justCount ? 0 : [];
	  }
	  var l1 = bezlen.apply(0, bez1),
	    l2 = bezlen.apply(0, bez2),
	    n1 = ~~(l1 / 8),
	    n2 = ~~(l2 / 8),
	    dots1 = [],
	    dots2 = [],
	    xy = {},
	    res = justCount ? 0 : [];
	  for (var i = 0; i < n1 + 1; i++) {
	    var p = findDotsAtSegment.apply(0, bez1.concat(i / n1));
	    dots1.push({
	      x: p.x,
	      y: p.y,
	      t: i / n1
	    });
	  }
	  for (i = 0; i < n2 + 1; i++) {
	    p = findDotsAtSegment.apply(0, bez2.concat(i / n2));
	    dots2.push({
	      x: p.x,
	      y: p.y,
	      t: i / n2
	    });
	  }
	  for (i = 0; i < n1; i++) {
	    for (var j = 0; j < n2; j++) {
	      var di = dots1[i],
	        di1 = dots1[i + 1],
	        dj = dots2[j],
	        dj1 = dots2[j + 1],
	        ci = Math.abs(di1.x - di.x) < .001 ? "y" : "x",
	        cj = Math.abs(dj1.x - dj.x) < .001 ? "y" : "x",
	        is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
	      if (is) {
	        if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
	          continue;
	        }
	        xy[is.x.toFixed(4)] = is.y.toFixed(4);
	        var t1 = di.t + Math.abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
	          t2 = dj.t + Math.abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
	        if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
	          if (justCount) {
	            res++;
	          } else {
	            res.push({
	              x: is.x,
	              y: is.y,
	              t1: t1,
	              t2: t2
	            });
	          }
	        }
	      }
	    }
	  }
	  return res;
	}

	var interPathHelper = function(path1, path2, justCount) {
	  path1 = path2curve(path1);
	  path2 = path2curve(path2);
	  var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
	    res = justCount ? 0 : [];
	  for (var i = 0, ii = path1.length; i < ii; i++) {
	    var pi = path1[i];
	    if (pi[0] == "M") {
	      x1 = x1m = pi[1];
	      y1 = y1m = pi[2];
	    } else {
	      if (pi[0] == "C") {
	        bez1 = [x1, y1].concat(pi.slice(1));
	        x1 = bez1[6];
	        y1 = bez1[7];
	      } else {
	        bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
	        x1 = x1m;
	        y1 = y1m;
	      }
	      for (var j = 0, jj = path2.length; j < jj; j++) {
	        var pj = path2[j];
	        if (pj[0] == "M") {
	          x2 = x2m = pj[1];
	          y2 = y2m = pj[2];
	        } else {
	          if (pj[0] == "C") {
	            bez2 = [x2, y2].concat(pj.slice(1));
	            x2 = bez2[6];
	            y2 = bez2[7];
	          } else {
	            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
	            x2 = x2m;
	            y2 = y2m;
	          }
	          var intr = interHelper(bez1, bez2, justCount);
	          if (justCount) {
	            res += intr;
	          } else {
	            for (var k = 0, kk = intr.length; k < kk; k++) {
	              intr[k].segment1 = i;
	              intr[k].segment2 = j;
	              intr[k].bez1 = bez1;
	              intr[k].bez2 = bez2;
	            }
	            res = res.concat(intr);
	          }
	        }
	      }
	    }
	  }
	  return res;
	}

	var pathIntersection = function(path1, path2) {
	  return interPathHelper(path1, path2);
	}



	var PathUtil = {
	  toArray: parsePathString,
	  toString: path2string,
	  toCurve: path2curve,
	  toAbsolute: pathToAbsolute,
	  catmullRomToBezier: catmullRom2bezier,
	  rectPath: rectPath,
	  intersection: pathIntersection
	};

	module.exports = PathUtil;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 时间轴
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var Base = __webpack_require__(11);
	var TweenCreator = __webpack_require__(107);
	var Timeline = function(cfg) {
	  Timeline.superclass.constructor.call(this, cfg);
	  this._init();
	};

	Timeline.ATTRS = {
	  /**
	   * 运行到的时间
	   * @type {Boolean}
	   */
	  time: 0,

	  /**
	   * 创建时间
	   * @type {Number}
	   */
	  createTime: null,

	  /**
	   * 播放时间
	   * @type {Number}
	   */
	  playTime: null,

	  /**
	   * 距离上次播放的暂停间隔时间
	   * @type {Number}
	   */
	  pauseTimeSpace: 0,

	  /**
	   * 是否可被执行
	   * @type {Boolean}
	   */
	  available: false,
	  /**
	   * 画布集
	   * @type {Array}
	   */
	  canvases: [],

	  /**
	   * 补间集
	   * @type {Array}
	   */
	  tweens: [],

	  /**
	   * 结束时间
	   * @type {Number}
	   */
	  endTime: 0,

	  /**
	   * 是否自动播放
	   * @type {Boolean}
	   */
	  autoPlay: false,

	  /**
	   * 状态
	   * @type {String}
	   * silent 静默
	   * playing 播放
	   */
	  status: 'silent',

	  /**
	   * 自动绘制
	   * @type {Boolean}
	   */
	  autoDraw: true
	};

	Util.extend(Timeline, Base);

	Util.augment(Timeline, {
	  // 初始化
	  _init: function() {
	    var autoPlay = this.get('autoPlay');
	    this.set('createTime', +new Date());
	    if (autoPlay) {
	      this.play();
	    }
	  },
	  // 尝试设置结束时间
	  _trySetEndTime: function(tween) {
	    var self = this;
	    if (Util.isObject(tween)) {
	      self._setEndTime(tween);
	    } else if (Util.isArray(tween)) {
	      Util.each(tween, function(v, k) {
	        self._setEndTime(v);
	      });
	    }
	  },
	  // 尝试设置Canvas
	  _trySetCanvases: function(tween) {
	    var self = this;
	    if (Util.isObject(tween)) {
	      self._setCanvases(tween);
	    } else if (Util.isArray(tween)) {
	      Util.each(tween, function(v, k) {
	        self._setCanvases(v);
	      });
	    }
	  },
	  // 设置结束时间
	  _setEndTime: function(tween) {
	    var endTime = this.get('endTime');
	    var tweenEndTime = tween.endTime;
	    if (tweenEndTime > endTime) {
	      this.set('endTime', tweenEndTime);
	    }
	  },
	  // 设置画布
	  _setCanvases: function(tween) {
	    var canvas = tween.canvas;
	    var canvases = this.get('canvases');
	    if (canvases.indexOf(canvas) === -1) {
	      canvases.push(canvas);
	    }
	  },
	  // 重置补间
	  _resetTweens: function() {
	    var tweens = this.get('tweens');
	    tweens.sort(function(a, b) { // 需要让起始时间最小的最后重设
	      return b.get('startTime') - a.get('startTime');
	    });
	    Util.each(tweens, function(v) {
	      v.reset();
	    });
	  },
	  // 获取自身时间轴
	  _getTime: function() {
	    var playTime = this.get('playTime');
	    var pauseTimeSpace = this.get('pauseTimeSpace');
	    return +new Date() - playTime + pauseTimeSpace;
	  },
	  // 刷新 （画布刷新）
	  _refresh: function(time) {
	    var tweens = this.get('tweens');
	    var canvases = this.get('canvases');
	    var autoDraw = this.get('autoDraw');
	    var tweensStash = []; // 缓存未销毁的补间
	    var canvasesStash = []; // 缓存当前动画涉及画布
	    var canvas;
	    var tween;
	    for (var i = 0; i < tweens.length; i++) {
	      tween = tweens[i];
	      canvas = tween.canvas;
	      if (tween.needsDestroy) {
	        tween.destroy();
	      } else if (!tween.destroyed && !tween.needsDestroy) {
	        tween.tryStep(time); // 尝试运行
	      }
	      if (!tween.destroyed) {
	        tweensStash.push(tween);
	      }
	      if (!Util.inArray(canvasesStash, canvas) && !tween.destroyed) {
	        canvasesStash.push(canvas);
	      }
	    }
	    if (autoDraw) {
	      this.draw();
	    }
	    if (tweens.length > 0 && tweensStash.length === 0) {
	      this.fire('animateend');
	    }
	    this.set('canvases', canvasesStash);
	    this.set('tweens', tweensStash);
	  },
	  // 更新（时间和状态）
	  _update: function() {
	    if (!this.get('available')) {
	      return; // 不可用则强制停止所有更新
	    }
	    var self = this;
	    var tweens = self.get('tweens');
	    var time;
	    if (tweens.length > 0) {
	      time = self._getTime();
	      self._refresh(time);
	    }
	    self.fire('update');
	    Util.requestAnimationFrame(function() {
	      self._update();
	    });
	  },
	  /**
	   * 生成补间生成器
	   * @param   {Object} target 图形对象
	   * @param   {Number} startTime 开始时间
	   * @return  {Object} tweenCreator 补间生成器
	   */
	  animate: function(target, startTime) {
	    var tweenCreator = new TweenCreator({
	      target: target,
	      timeline: this,
	      startTime: startTime ? startTime : 0
	    });
	    return tweenCreator;
	  },
	  /**
	   * 添加补间
	   * @param   {Object || Array} tweens 补间
	   * @return  {Object} this
	   */
	  add: function(tween) {
	    var tweens = this.get('tweens');
	    var rst;
	    if (Util.isArray(tween)) {
	      rst = tweens.concat(tween);
	    } else if (Util.isObject(tween) && tween.type === 'tween') {
	      tweens.push(tween);
	      rst = tweens;
	    } else {
	      console.error('Timeline not Support this type');
	    }
	    this.set('tweens', rst);
	    this._trySetCanvases(tween);
	    this._trySetEndTime(tween);
	    return this;
	  },
	  /**
	   * 获取当前时间
	   * @param {Nmuber} time 自身时间轴时间点
	   */
	  getNow: function() {
	    var playTime = this.get('playTime');
	    return playTime ? (+new Date() - playTime) : 0 ;
	  },
	  /**
	   * 通过实际时间，获取时间轴时间 (同getNow, 0.3.x废弃)
	   * @param {Nmuber} time 自身时间轴时间点
	   */
	  getTime: function() {
	    var playTime = this.get('playTime');
	    return playTime ? (+new Date() - playTime) : 0 ;
	  },
	  /**
	   * 播放
	   */
	  play: function() {
	    var status = this.get('status');
	    if (status === 'silent') {
	      this.set('playTime', +new Date());
	      this.set('available', true);
	      this.set('status', 'playing');
	      this._update();
	    }
	    return this;
	  },
	  /**
	   * 停止
	   */
	  stop: function() {
	    this.set('status', 'silent');
	    this.set('available', false);
	    this.set('pauseTimeSpace', 0);
	    this._resetTweens();
	    this._refresh(0); // 画面刷新至初始态
	    this.draw();
	  },
	  /**
	   * 暂停
	   */
	  pause: function() {
	    var available = this.get('available');
	    if (available) this.set('pauseTimeSpace', +new Date() - this.get('playTime'));
	    this.set('available', false);
	    this.set('status', 'silent');
	    return this;
	  },
	  /**
	   * 重置
	   */
	  reset: function() {
	    this.set('status', 'silent');
	    this.set('available', false);
	    this.set('pauseTimeSpace', 0);
	    this.set('playTime', 0);
	    this.set('endTime', 0);
	    this.set('tweens', []);
	    this.set('canvases', []);
	  },
	  /**
	   * 绘制
	   */
	  draw: function() {
	    var canvases = this.get('canvases');
	    var canvas;
	    for (var i = 0; i < canvases.length; i++) {
	      canvas = canvases[i];
	      !canvas.get('destroyed') && canvas.draw();
	    }
	    return;
	  }
	});

	module.exports = Timeline;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 补间生成器
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	'use strict';

	var Util = __webpack_require__(1);
	var TweenUtil = __webpack_require__(57);
	var Base = __webpack_require__(11);
	var Tween = __webpack_require__(58);

	var Creator = function(cfg) {
	  Util.mix(this, cfg);
	};

	Util.augment(Creator, {
	  /**
	   * 目标图形对象
	   * @type {Object}
	   */
	  target: null,
	  /**
	   * 时间轴
	   * @type {Object}
	   */
	  timeline: null,
	  /**
	   * 开始时间
	   * @type {Number}
	   */
	  startTime: null,
	  /**
	   * 添加方法
	   * @param {Number} time 开始时间
	   * @param {Object} props 属性
	   * @param {String} easing 补间动画类型
	   * @param {Function} callBack 回调函数
	   */
	  append: function(time, props, easing, callBack) {
	    var id = Util.guid('tween_');
	    var target = this.target;
	    var tweens = this.tweens;
	    var timeline = this.timeline;
	    var startTime = this.startTime;
	    var frames = TweenUtil.getKeyFrameByProps(target, props);
	    var startKeyFrame = frames[0]; // startKeyFrame 起始帧
	    var endKeyFrame = frames[1]; // endKeyFrame   结束帧
	    var interpolations = TweenUtil.getInterpolations(startKeyFrame, endKeyFrame);
	    var tween;

	    if (!interpolations.matrix && TweenUtil.getObjectLength(interpolations.attrs) === 0 && !endKeyFrame.onUpdate) {
	      return this;
	    }

	    time = time ? time : startTime;
	    if (props && props.delay) time += props.delay;
	    tween = new Tween({
	      id: id,
	      canvas: target.get('canvas'),
	      startTime: time,
	      target: target,
	      easing: easing,
	      callBack: callBack,
	      startKeyFrame: startKeyFrame,
	      endKeyFrame: endKeyFrame,
	      interpolations: interpolations,
	      duration: props.duration ? props.duration : 1000,
	      repeat: props.repeat ? props.repeat : false,
	      destroyTarget: props.destroy ? props.destroy : false
	    });
	    timeline && timeline.add(tween); // 如果时间轴存在，则添加到时间轴
	    return this;
	  }
	});

	module.exports = Creator;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	var gUtilBase =  __webpack_require__(109);

	module.exports = gUtilBase;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

	/**
	 * @fileOverview 基础工具类
	 * @author hankaiai@126.com
	 * @author dxq613@gmail.com
	 */

	"use strict";

	var objectPrototype = Object.prototype;
	var toString = objectPrototype.toString;


	var MAX_LEVEL = 5;

	function deepMix(dst, src, level) {
	  level = level || 0;
	  for (var k in src) {
	    if (src.hasOwnProperty(k)) {
	      var value = src[k];
	      if (value !== null && Util.isObject(value)) {
	        if (!Util.isObject(dst[k])) {
	          dst[k] = {};
	        }
	        if (level < MAX_LEVEL) {
	          deepMix(dst[k], src[k], level + 1);
	        } else {
	          dst[k] = src[k];
	        }
	      } else if (Util.isArray(value)) {
	        //if(!Util.isArray(dst[k])){
	        dst[k] = [];
	        //}
	        dst[k] = dst[k].concat(value);
	      } else if (value !== undefined) {
	        dst[k] = src[k];
	      }
	    }
	  }
	}

	/**
	 * @class Util
	 * @singleton
	 * 绘图的工具类
	 */
	var Util = {

	  /**
	   * 替换字符串中的字段.
	   * @param {String} str 模版字符串
	   * @param {Object} o json data
	   * @param {RegExp} [regexp] 匹配字符串的正则表达式
	   */

	  substitute: function(str, o) {
	    if (!str || !o) {
	      return str;
	    }
	    return str.replace(/\\?\{([^{}]+)\}/g, function(match, name) {
	      if (match.charAt(0) === '\\') {
	        return match.slice(1);
	      }
	      return (o[name] === undefined) ? '' : o[name];
	    });
	  },
	  /**
	   * 使第一个字母变成大写
	   * @param  {String} s 字符串
	   * @return {String} 首字母大写后的字符串
	   */
	  ucfirst: function(s) {
	    s += '';
	    return s.charAt(0).toUpperCase() + s.substring(1);
	  },
	  /**
	   * 判断是否是字符串
	   * @return {Boolean} 是否是字符串
	   */
	  isString: function(value) {
	    return typeof value === 'string';
	  },
	  /**
	   * 判断是否数字
	   * @return {Boolean} 是否数字
	   */
	  isNumber: function(value) {
	    return typeof value === 'number';
	  },
	  /**
	   * 判断是否数字或者数字字符串，由于$.isNumberic方法会把 '123'认为数字
	   * @return {Boolean} 是否数字
	   */
	  isNumeric: function(value) {
	    return !isNaN(parseFloat(value)) && isFinite(value);
	  },
	  /**
	   * 是否是布尔类型
	   *
	   * @param {Object} value 测试的值
	   * @return {Boolean}
	   */
	  isBoolean: function(value) {
	    return typeof value === 'boolean';
	  },
	  /**
	   * 是否为函数
	   * @param  {*} fn 对象
	   * @return {Boolean}  是否函数
	   */
	  isFunction: function(fn) {
	    return typeof(fn) === 'function';
	  },
	  /**
	   * 是否数组
	   * @method
	   * @param  {*}  obj 是否数组
	   * @return {Boolean}  是否数组
	   */
	  isArray: ('isArray' in Array) ? Array.isArray : function(value) {
	    return toString.call(value) === '[object Array]';
	  },

	  /**
	   * 是否日期
	   * @param  {*}  value 对象
	   * @return {Boolean}  是否日期
	   */
	  isDate: function(value) {
	    return toString.call(value) === '[object Date]';
	  },
	  /**
	   * 对象是否为空
	   * @param  {*}  o 对象
	   * @return {Boolean}  是否不存在
	   */
	  isNull: function(o) {
	    return o === undefined || o === null;
	  },
	  /**
	   * 对象是否为空
	   * @param {*} o 对象
	   * @return {Boolean} 是否存在
	   */
	  notNull: function(o) {
	    return !Util.isNull(o);
	  },
	  /**
	   * 对象或数组是否为没有元素的空的
	   *
	   */
	  isBlank: function(o) {
	    if (Util.isArray(o)) {
	      return o.length === 0;
	    }

	    if (Util.isObject(o)) {
	      var n = 0;
	      Util.each(o, function(key, value) {
	        n++;
	      });
	      return n === 0;
	    }

	    return false;
	  },
	  /**
	   * 是否是javascript对象
	   * @param {Object} value The value to test
	   * @return {Boolean}
	   * @method
	   */
	  isObject: (toString.call(null) === '[object Object]') ?
	    function(value) {
	      // check ownerDocument here as well to exclude DOM nodes
	      return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
	    } : function(value) {
	      return toString.call(value) === '[object Object]';
	    },
	  /**
	   * 实现类的继承，通过父类生成子类
	   * @param  {Function} subclass
	   * @param  {Function} superclass 父类构造函数
	   * @param  {Object} overrides  子类的属性或者方法
	   * @return {Function} 返回的子类构造函数
	   * 示例:
	   *      @example
	   *      //父类
	   *      function base(){
	   *
	   *      }
	   *
	   *      function sub(){
	   *
	   *      }
	   *      //子类
	   *      Util.extend(sub,base,{
	   *          method : function(){
	   *
	   *          }
	   *      });
	   *
	   *      //或者
	   *      var sub = Util.extend(base,{});
	   */
	  extend: function(subclass, superclass, overrides, staticOverrides) {
	    //如果只提供父类构造函数，则自动生成子类构造函数
	    if (!Util.isFunction(superclass)) {
	      overrides = superclass;
	      superclass = subclass;
	      subclass = function() {};
	    }

	    var create = Object.create ?
	      function(proto, c) {
	        return Object.create(proto, {
	          constructor: {
	            value: c
	          }
	        });
	      } :
	      function(proto, c) {
	        function F() {}

	        F.prototype = proto;

	        var o = new F();
	        o.constructor = c;
	        return o;
	      };

	    var superObj = create(superclass.prototype, subclass); //new superclass(),//实例化父类作为子类的prototype
	    subclass.prototype = Util.mix(superObj, subclass.prototype); //指定子类的prototype
	    subclass.superclass = create(superclass.prototype, superclass);
	    Util.mix(superObj, overrides);
	    Util.mix(subclass, staticOverrides);
	    return subclass;
	  },
	  /**
	   * 复制到原型链上
	   * @param  {Function} c   类
	   * @param  {Object} obj 对象
	   */
	  augment: function(c) {

	    var args = Util.toArray(arguments);
	    for (var i = 1; i < args.length; i++) {
	      var obj = args[i];
	      if (Util.isFunction(obj)) {
	        obj = obj.prototype;
	      }
	      Util.mix(c.prototype, obj);
	    }
	  },
	  /**
	   * 转换成数组
	   * @param  {*} value 需要转换的对象
	   * @return {Array}  数组
	   */
	  toArray: function(value) {
	    if (!value || !value.length) {
	      return [];
	    }
	    return Array.prototype.slice.call(value);
	  },
	  /**
	   * 合并数据
	   * @return {Object} 将数据合并到第一个
	   */
	  mix: function() {
	    var args = Util.toArray(arguments),
	      obj = args[0];
	    if (obj === true) {
	      obj = args[1];
	      for (var i = 2; i < args.length; i++) {
	        var source = args[i];
	        deepMix(obj, source);
	      }
	    } else {
	      for (var i = 1; i < args.length; i++) {
	        var source = args[i];
	        for (var k in source) {
	          if (source.hasOwnProperty(k) && k !== 'constructor') {
	            obj[k] = source[k];
	          }
	        }
	      }
	    }
	    return obj;
	  },

	  /**
	   * 遍历数组或者对象
	   * @param {Object|Array} element/Object 数组中的元素或者对象的值
	   * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){}
	   */
	  each: function(elements, func) {
	    if (!elements) {
	      return;
	    }
	    if (Util.isObject(elements)) {
	      for (var k in elements) {
	        if (elements.hasOwnProperty(k)) {
	          var rst = func(elements[k], k);
	          if (rst === false) {
	            break;
	          }
	        }
	      }
	    } else if (elements.length) {
	      for (var i = 0; i < elements.length; i++) {
	        var rst = func(elements[i], i);
	        if (rst === false) {
	          break;
	        }
	      }
	    }
	  },
	  requestAnimationFrame: function(fn) {
	    var method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
	      return setTimeout(fn, 16);
	    };

	    return method(fn);
	  },
	  cancelAnimationFrame: function(id) {
	    var method = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(id) {
	      return clearTimeout(id);
	    };
	    return method(id);
	  }
	};


	module.exports = Util;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @fileOverview 基础工具类
	 * @author hankaiai@126.com
	 * @author dxq613@gmail.com
	 */

	'use strict';

	var Util = __webpack_require__(108);

	//将数值逼近到指定的数
	function tryFixed(v, base) {
	  var str = base.toString();
	  var index = str.indexOf('.');
	  if (index === -1) {
	    return Math.round(v);
	  }
	  var length = str.substr(index + 1).length;
	  if (length > 20) {
	    length = 20;
	  }
	  return parseFloat(v.toFixed(length));
	}

	function _mix(dist, obj) {
	  for (var k in obj) {
	    if (obj.hasOwnProperty(k) && k !== 'constructor' && obj[k] !== undefined) {
	      dist[k] = obj[k];
	    }
	  }
	}


	/**
	 * @class Util
	 * @singleton
	 * 绘图的工具类
	 */
	Util.mix(Util, {

	  mixin: function(c, mixins) {
	    if (c && mixins) {
	      c._mixins = mixins;
	      c.ATTRS = c.ATTRS || {};
	      var temp = {};
	      Util.each(mixins, function(mixin) {
	        Util.augment(c, mixin);
	        var attrs = mixin.ATTRS;
	        if (attrs) {
	          Util.mix(temp, attrs);
	        }
	      });

	      c.ATTRS = Util.mix(temp, c.ATTRS);
	    }
	  },
	  /**
	   * map 数组
	   * @param  {Array} arr 数组
	   * @return {Array} map后的数组
	   */
	  map: function(arr, func) {
	    var result = [];
	    Util.each(arr, function(value, index) {
	      result.push(func(value, index));
	    });
	    return result;
	  },
	  /**
	   * 过滤数组
	   * @param {Object|Array} element/Object 数组中的元素或者对象的值
	   * @param {Function} func 遍历的函数 function(elememt,index){} 或者 function(value,key){},如果返回true则添加到结果集
	   * @return {Array} 过滤的结果集
	   */
	  filter: function(array, func) {
	    var result = [];
	    Util.each(array, function(value, index) {
	      if (func(value, index)) {
	        result.push(value);
	      }
	    });
	    return result;
	  },
	  /**
	   * 生成唯一的Id
	   * @method
	   * @param {String} prefix 前缀
	   * @return {String} 唯一的编号
	   */
	  guid: (function() {
	    var map = {};
	    return function(prefix) {
	      prefix = prefix || 'g';
	      if (!map[prefix]) {
	        map[prefix] = 1;
	      } else {
	        map[prefix] += 1;
	      }
	      return prefix + map[prefix];
	    };
	  })(),
	  /**
	   * 数组中是否存在元素
	   * @param  {Array} arr 数组
	   * @param  {*} obj 查找的元素
	   * @return {Boolean} 是否存在
	   */
	  inArray: function(arr, value) {
	    return Util.indexOf(arr, value) !== -1;
	  },
	  /**
	   * 查找元素在数组中的位置，如果不存在则返回-1
	   * @param  {Array} arr 数组
	   * @param  {*} obj 查找的元素
	   * @return {Number} 位置
	   */
	  indexOf: function(arr, obj) {
	    var m = Array.prototype.indexOf;
	    if (m) {
	      return m.call(arr, obj);
	    }
	    var index = -1;

	    for (var i = 0; i < arr.length; i++) {
	      if (arr[i] === obj) {
	        index = i;
	        break;
	      }
	    }
	    return index;
	  },
	  /**
	   * 删除
	   */
	  remove: function(arr, obj) {
	    var index = Util.indexOf(arr, obj);
	    if (index !== -1) {
	      arr.splice(index, 1);
	    }
	  },
	  /**
	   * 清空
	   * @param  {Array} array 数组
	   */
	  empty: function(array) {
	    if (!(array instanceof(Array))) {
	      for (var i = array.length - 1; i >= 0; i--) {
	        delete array[i];
	      }
	    }
	    array.length = 0;
	  },
	  /**
	   * 2个数组是否等同
	   * @param  {Array} a1 数组1
	   * @param  {Array} a2 数组2
	   * @return {Boolean} 2个数组相等或者内部元素是否相等
	   */
	  equalsArray: function(a1, a2) {
	    if (a1 === a2) {
	      return true;
	    }
	    if (!a1 || !a2) {
	      return false;
	    }

	    if (a1.length !== a2.length) {
	      return false;
	    }
	    var rst = true;
	    for (var i = 0; i < a1.length; i++) {
	      if (a1[i] !== a2[i]) {
	        rst = false;
	        break;
	      }
	    }
	    return rst;
	  },
	  /**
	   * 封装事件，便于使用上下文this,和便于解除事件时使用
	   * @protected
	   * @param  {Object} self   对象
	   * @param  {String} action 事件名称
	   */
	  wrapBehavior: function(self, action) {
	    var method = function(e) {
	      self[action](e);
	    };
	    self['_wrap_' + action] = method;
	    return method;
	  },
	  /**
	   * 获取封装的事件
	   * @protected
	   * @param  {Object} self   对象
	   * @param  {String} action 事件名称
	   */
	  getWrapBehavior: function(self, action) {
	    return self['_wrap_' + action];
	  },
	  /**
	   * 将value的小数位长度和base保持一致
	   * @param  {Number} value 值
	   * @param  {Number} base  基准值
	   * @return {Number}  fixed后的数字
	   */
	  fixedBase: function(value, base) {
	    return tryFixed(value, base);
	  },
	  /**
	   * 返回集合对象的长度，如果是数组则返回数组的长度，如果是对象则返回对象中的属性个数
	   * @param {Array or Object} set 集合对象
	   * @return {Number} 集合对象的长度
	   */
	  length: function(set) {
	    if (Util.isArray(set)) {
	      return set.length;
	    }
	    if (Util.isObject(set)) {
	      var length = 0;
	      Util.each(set, function() {
	        length++;
	      });
	      return length;
	    }
	    return 0;
	  },
	  clone: function(obj) {
	    if (typeof obj !== 'object' || obj === null) {
	      return obj;
	    }
	    var rst;
	    if (Util.isArray(obj)) {
	      rst = [];
	      for (var i = 0, l = obj.length; i < l; i++) {
	        if (typeof obj[i] === 'object' && obj[i] != null) {
	          rst[i] = Util.clone(obj[i]);
	        } else {
	          rst[i] = obj[i];
	        }
	      }
	    } else {
	      rst = {};
	      for (var k in obj) {
	        if (typeof obj[k] === 'object' && obj[k] != null) {
	          rst[k] = Util.clone(obj[k]);
	        } else {
	          rst[k] = obj[k];
	        }
	      }
	    }

	    return rst;
	  },
	  simpleMix: function(dist, obj1, obj2, obj3) {
	    if (obj1) {
	      _mix(dist, obj1);
	    }

	    if (obj2) {
	      _mix(dist, obj2);
	    }

	    if (obj3) {
	      _mix(dist, obj3);
	    }
	    return dist;
	  }
	});

	module.exports = Util;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点缩进
	 * @author huangtonger@aliyun.com
	 */

	var AnimateUtil = __webpack_require__(25);
	var GraphUtil = __webpack_require__(4);

	module.exports = function (element) {
	  var box = GraphUtil.getBBox(element, element); // 需要apply自己的矩阵
	  var centerX = box.centerX;
	  var centerY = box.centerY;
	  AnimateUtil.scaleIn(element, centerX, centerY);
	};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点缩出
	 * @author huangtonger@aliyun.com
	 */

	var AnimateUtil = __webpack_require__(25);
	var GraphUtil = __webpack_require__(4);

	module.exports = function (element) {
	  var box = GraphUtil.getBBox(element, element); // 需要apply自己的矩阵
	  var x = box.centerX;
	  var y = box.centerY;
	  AnimateUtil.scaleOut(element, x, y);
	};

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 更新动画
	 * @author huangtonger@aliyun.com
	 */

	var Global = __webpack_require__(7);

	module.exports = function (element, props) {
	  element.set('capture', false);
	  element.animate(props, Global.updateDuration, Global.updateEasing, function () {
	    element.set('capture', true);
	  });
	};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 动画主控
	 * 核心问题：
	 * 问题一：差量对比的算法效率
	 * 问题二：确保最后一次draw canvas的结构树是正确的
	 * @author huangtonger@aliyun.com
	 */

	var Matrix = __webpack_require__(3);
	var Util = __webpack_require__(4);
	var Animate = __webpack_require__(24);
	var Matrix3 = Matrix.Matrix3;

	// 过滤掉无法做动画差值的属性
	var ReservedAttrs = {
	  text: 'text',
	  elements: 'elements',
	  rotate: 'rotate',
	  textAlign: 'textAlign',
	  textBaseline: 'textBaseline',
	  fontStyle: 'fontStyle',
	  font: 'font',
	  fontWeight: 'fontWeight',
	  fontFamily: 'fontFamily'
	};

	/**
	 * 获取变更的属性
	 * @param  {Object}             attrs0   属性1
	 * @param  {Object}             attrs1   属性2
	 * @return {Object|Boolean}     rst      diff对象或布尔值
	 */
	function getDiffAttrs(attrs0, attrs1) {
	  if (!attrs0 || !attrs1) {
	    return false;
	  }
	  var l0 = attrs0.length;
	  var l1 = attrs1.length;
	  var attrs = l1 > l0 ? attrs1 : attrs0;
	  var diffAttrs = {
	    attrs0: {},
	    attrs1: {}
	  };
	  var bool = false;
	  var attr0 = void 0;
	  var attr1 = void 0;
	  var pathString1 = void 0;
	  var pathString2 = void 0;

	  Util.each(attrs, function (attr, k) {
	    attr0 = attrs0[k];
	    attr1 = attrs1[k];
	    if (Util.isObject(attr0) || Util.isObject(attr1)) {
	      return;
	    }
	    if (k === 'path') {
	      pathString1 = Util.isString(attr0) ? attr0 : Util.pathToString(attr0);
	      pathString2 = Util.isString(attr1) ? attr1 : Util.pathToString(attr1);
	      if (pathString1 === pathString2 || pathString1.indexOf('NaN') !== -1 || pathString2.indexOf('NaN') !== -1) {
	        return;
	      }
	    }
	    if (Util.isArray(attr0) && Util.isArray(attr1) && Util.equalsArray(attr0, attr1)) {
	      return;
	    }
	    if (attr0 !== attr1 && !ReservedAttrs[k]) {
	      diffAttrs.attrs0[k] = attr0;
	      diffAttrs.attrs1[k] = attr1;
	      bool = true;
	    }
	  });
	  return bool ? diffAttrs : false;
	}

	/**
	 * 深度遍历并复制图形
	 * @param  {Object}   map        索引
	 * @param  {Array}    parent     父元素
	 * @param  {Number}   count      元素数量
	 * @return {Number}   count      元素数量
	 */
	function getElements(map, parent, count) {
	  var children = parent.get('children');
	  var shapeCfg = void 0;
	  var id = void 0;
	  Util.each(children, function (child) {
	    count++;
	    id = child.get('gid');

	    if (child.isGroup) {
	      count = getElements(map, child, count);
	    }

	    if (id) {
	      map[id] = {
	        matrix: child.getMatrix().clone(),
	        origin: child
	      };
	      shapeCfg = child.get('shapeCfg');
	      if (shapeCfg) {
	        map[id].enterAnimate = child.get('enterAnimate');
	        map[id].leaveAnimate = child.get('leaveAnimate');
	        map[id].model = shapeCfg.origin;
	      }
	      if (child.isShape) {
	        map[id].attrs = child.getAllAttrs();
	      }
	    }
	  });
	  return count;
	}

	var AnimateAssist = function AnimateAssist(cfg) {
	  Util.mix(this, cfg);
	};

	Util.augment(AnimateAssist, {

	  /**
	   * 用于做动画的Canvas
	   * @type {Array}
	   */
	  canvas: null,

	  /**
	   * 缓存集合
	   * @type {Object}
	   */
	  map0: null,

	  /**
	   * 当前集合
	   * @type {Object}
	   */
	  map1: null,

	  /**
	   * 运行
	   */
	  run: function run() {
	    this.init();
	    if (this.count < 5000) {
	      this._compare();
	      this._addTween();
	    }
	    Util.each(this.canvases, function (canvas) {
	      canvas.draw();
	    });
	  },

	  // 初始化
	  init: function init() {
	    var canvases = this.canvases;
	    var elementsStash = this.elementsStash;
	    var elements = {};
	    var count = 0;
	    elementsStash = elementsStash ? elementsStash : {};
	    Util.each(canvases, function (canvas) {
	      count += getElements(elements, canvas, 0);
	    });
	    this.elementsStash = elements;
	    this.map0 = elementsStash;
	    this.map1 = elements;
	    this.count = count;
	  },

	  // 比对元素
	  _compare: function _compare() {
	    var map0 = this.map0;
	    var map1 = this.map1;
	    var enterElements = [];
	    var leaveElements = [];
	    var updateElements = [];

	    Util.each(map1, function (v, k) {
	      if (map0[k]) {
	        if (v.origin.get('type') === map0[k].origin.get('type')) {
	          updateElements.push(k);
	        }
	      } else {
	        enterElements.push(k);
	      }
	    });
	    Util.each(map0, function (v, k) {
	      if (!map1[k]) {
	        leaveElements.push(k);
	      }
	    });
	    this.enterElements = enterElements;
	    this.leaveElements = leaveElements;
	    this.updateElements = updateElements;
	  },

	  // 添加补间
	  _addTween: function _addTween() {
	    var self = this;
	    var enterElements = this.enterElements;
	    var leaveElements = this.leaveElements;
	    var updateElements = this.updateElements;
	    var map0 = this.map0;
	    var map1 = this.map1;
	    var matrixEqualBool = void 0;
	    var diffAttrs = void 0;
	    var diffProps = void 0;
	    var e0 = void 0;
	    var e1 = void 0;

	    Util.each(enterElements, function (elementId) {
	      e1 = map1[elementId];
	      if (e1.enterAnimate) {
	        e1.enterAnimate(e1.origin, map0, map1);
	      }
	    });
	    Util.each(leaveElements, function (elementId) {
	      e0 = map0[elementId];
	      if (e0.leaveAnimate) {
	        e0.origin.getParent().add(e0.origin);
	        e0.leaveAnimate(e0.origin, map0, map1);
	      }
	    });
	    Util.each(updateElements, function (elementId) {
	      e1 = map1[elementId];
	      e0 = map0[elementId];
	      diffAttrs = getDiffAttrs(e0.attrs, e1.attrs);
	      matrixEqualBool = Matrix3.equal(e0.matrix, e1.matrix);
	      diffProps = {};
	      if (diffAttrs) {
	        // 将初始帧的图形属性设置到目标图形
	        e1.origin.attr(diffAttrs.attrs0);
	        Util.mix(diffProps, diffAttrs.attrs1);
	      }
	      if (!matrixEqualBool) {
	        // 将初始帧的图形矩阵设置到目标图形
	        e1.origin.setMatrix(e0.matrix);
	        diffProps.matrix = e1.matrix;
	      }
	      if (diffAttrs || !matrixEqualBool) {
	        Animate.update(e1.origin, diffProps, self);
	      }
	      if (e0.origin !== e1.origin) {
	        e0.origin.remove();
	      }
	    });
	  }
	});

	module.exports = AnimateAssist;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 将DOM原生事件封装成Graph事件
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);

	var EventAssist = function EventAssist(cfg) {
	  Util.mix(this, cfg);
	  this.init();
	};

	/**
	 * 添加时间监听器
	 * @param  {object}    target DOM对象
	 * @param  {Object}    eventType 事件名
	 * @param  {funtion}   callback 回调函数
	 * @return {Object}    返回对象
	 */
	function addEventListener(target, eventType, callback) {
	  if (target.addEventListener) {
	    target.addEventListener(eventType, callback, false);
	    return {
	      remove: function remove() {
	        target.removeEventListener(eventType, callback, false);
	      }
	    };
	  } else if (target.attachEvent) {
	    target.attachEvent('on' + eventType, callback);
	    return {
	      remove: function remove() {
	        target.detachEvent('on' + eventType, callback);
	      }
	    };
	  }
	}

	Util.augment(EventAssist, {
	  graph: null,
	  frontCanvas: null,
	  canvas: null,
	  currentItem: null,
	  dragitem: null,
	  rootGroup: null,
	  lastEventObj: null,
	  currentEventObj: null,
	  el: null,
	  init: function init() {
	    var graph = this.graph;
	    this.frontCanvas = graph.get('frontCanvas');
	    this.canvas = graph.get('canvas');
	    this._initEvent();
	  },
	  _initEvent: function _initEvent() {
	    var self = this;
	    var frontCanvas = self.frontCanvas;
	    var el = frontCanvas.get('el');
	    this.el = el;
	    this.domMouseEnter = addEventListener(el, 'mouseenter', Util.wrapBehavior(self, 'onDomMouseEnter'));
	    this.domMouseLeave = addEventListener(el, 'mouseleave', Util.wrapBehavior(self, 'onDomMouseLeave'));
	    this.domMouseDown = addEventListener(el, 'mousedown', Util.wrapBehavior(self, 'onMouseDown'));
	    this.domMouseUp = addEventListener(el, 'mouseup', Util.wrapBehavior(self, 'onMouseUp'));
	    this.domMouseMove = addEventListener(el, 'mousemove', Util.wrapBehavior(self, 'onMouseMove'));
	    this.domDblClick = addEventListener(el, 'dblclick', Util.wrapBehavior(self, 'onDblClick'));
	    this.domMouseWheel = addEventListener(el, 'mousewheel', Util.wrapBehavior(self, 'onMouseWheel'));
	    this.domKeyDown = addEventListener(el, 'keydown', Util.wrapBehavior(self, 'onKeyDown'));
	    this.domKeyUp = addEventListener(el, 'keyup', Util.wrapBehavior(self, 'onKeyUp'));
	    this.domContextMenu = addEventListener(el, 'contextmenu', Util.wrapBehavior(self, 'onContextMenu'));
	    this.domOnFocus = addEventListener(el, 'focus', Util.wrapBehavior(self, 'onFocus'));
	    this.domOnBlur = addEventListener(el, 'blur', Util.wrapBehavior(self, 'onBlur'));
	  },
	  _parsePoint: function _parsePoint(x, y) {
	    var pixelRatio = this.canvas.get('pixelRatio');
	    var graph = this.graph;
	    var point = {
	      x: x / pixelRatio,
	      y: y / pixelRatio
	    };
	    return graph.invertPoint(point);
	  },
	  _getEventObj: function _getEventObj(ev, canvas) {
	    var graph = this.graph;
	    var clientX = ev.clientX;
	    var clientY = ev.clientY;
	    var canvasPoint = canvas.getPointByClient(clientX, clientY);
	    var point = this._parsePoint(canvasPoint.x, canvasPoint.y);
	    var shape = canvas.getShape(canvasPoint.x, canvasPoint.y);
	    var item = graph.getItem(shape);
	    var type = void 0;

	    if (item) {
	      type = item.get('type');
	    }
	    return {
	      item: item,
	      itemType: type,
	      shape: shape,
	      x: point.x,
	      y: point.y,
	      domX: ev.offsetX,
	      domY: ev.offsetY,
	      domEvent: ev
	    };
	  },

	  // 获取抛出的事件对象
	  getEventObj: function getEventObj(ev) {
	    return {
	      item: ev.item,
	      itemType: ev.itemType,
	      x: ev.x,
	      y: ev.y,
	      domX: ev.domX,
	      domY: ev.domY,
	      shape: ev.shape,
	      toEvObj: ev.toEvObj,
	      frontEvObj: ev.frontEvObj,
	      domEvent: ev.domEvent
	    };
	  },

	  // 处理原生DOM事件
	  _processEventObj: function _processEventObj(ev) {
	    var canvas = this.canvas;
	    var frontCanvas = this.frontCanvas;
	    var currentEventObj = this.currentEventObj;

	    if (currentEventObj && Util.isObject(currentEventObj)) {
	      this.lastEventObj = Util.mix({}, currentEventObj);
	    }
	    var evObj = this._getEventObj(ev, canvas);
	    var frontEvObj = this._getEventObj(ev, frontCanvas);

	    // 前画布的元素信息覆盖后画布的信息
	    if (frontEvObj.shape) {
	      evObj.shape = frontEvObj.shape;
	    }
	    if (frontEvObj.item) {
	      evObj.item = frontEvObj.item;
	      evObj.itemType = frontEvObj.item.get('type');
	    }

	    evObj.frontEvObj = frontEvObj;
	    this.currentEventObj = evObj;
	    this.currentItem = evObj.item;
	  },
	  onFocus: function onFocus() {
	    this.graph.fire('domfocus');
	  },
	  onBlur: function onBlur() {
	    this.graph.fire('domblur');
	  },
	  onDomMouseEnter: function onDomMouseEnter(ev) {
	    this.graph.fire('dommouseenter', ev);
	  },
	  onDomMouseLeave: function onDomMouseLeave(ev) {
	    this.graph.fire('dommouseleave', ev);
	  },
	  onContextMenu: function onContextMenu(ev) {
	    this._processEventObj(ev);
	    var evObj = this.currentEventObj;
	    this.graph.fire('contextmenu', this.getEventObj(evObj));
	  },
	  onDblClick: function onDblClick(ev) {
	    this._processEventObj(ev);
	    var evObj = this.currentEventObj;
	    this.graph.fire('dblclick', this.getEventObj(evObj));
	  },
	  onKeyUp: function onKeyUp(ev) {
	    this.graph.fire('keyup', ev);
	  },
	  onKeyDown: function onKeyDown(ev) {
	    this.graph.fire('keydown', ev);
	  },
	  onMouseWheel: function onMouseWheel(ev) {
	    this._processEventObj(ev);
	    var evObj = this.currentEventObj;
	    this.graph.fire('mousewheel', this.getEventObj(evObj));
	  },
	  onMouseDown: function onMouseDown(ev) {
	    ev.preventDefault();
	    this._processEventObj(ev);
	    var evObj = this.currentEventObj;
	    if (ev.button === 0) {
	      this.pressing = true;
	      this.dragging = true;
	      this.pressingPoint = {
	        x: evObj.x,
	        y: evObj.y
	      };
	      this.graph.fire('mousedown', this.getEventObj(evObj));
	      if (evObj.item) {
	        this.graph.fire('itemmousedown', this.getEventObj(evObj));
	      }
	    }
	  },
	  onMouseUp: function onMouseUp(ev) {
	    ev.preventDefault();
	    this._processEventObj(ev);
	    var evObj = this.currentEventObj;
	    if (ev.button === 0) {
	      if (this.pressing) {
	        this.graph.fire('click', this.getEventObj(evObj));
	        if (evObj.item) {
	          this.graph.fire('itemclick', this.getEventObj(evObj));
	        }
	        this.pressing = false;
	      }
	      if (this.dragging) {
	        if (this.dragStartPoint) {
	          this.graph.fire('dragend', this.getEventObj(evObj));
	        }
	        this.dragging = false;
	      }
	      this.graph.fire('mouseup', this.getEventObj(evObj));
	      if (evObj.item) {
	        this.graph.fire('itemmouseup', this.getEventObj(evObj));
	      }
	      this.dragStartPoint = null;
	      this.dragItem = null;
	    }
	  },
	  onMouseMove: function onMouseMove(ev) {
	    ev.preventDefault();
	    this._processEventObj(ev);
	    var graph = this.graph;
	    var current = this.currentEventObj;
	    var last = this.lastEventObj;

	    if (this.pressing === true && (current.x !== last.x || current.y !== last.y)) {
	      this.pressing = false;
	    }

	    if (last && current) {
	      last.toEvObj = current;
	      current.fromEvObj = last;
	      if (!this.isSame(last, current, 'shape')) {
	        if (last.shape && !last.shape.get('destroyed')) graph.fire('mouseleave', this.getEventObj(last));
	        if (current.shape && !current.shape.get('destroyed')) graph.fire('mouseenter', this.getEventObj(current));
	      }
	      if (!this.isSame(last, current, 'item')) {
	        if (last.item && !last.item.destroyed) graph.fire('itemmouseleave', this.getEventObj(last));
	        if (current.item && !current.item.destroyed) graph.fire('itemmouseenter', this.getEventObj(current));
	      }
	    }

	    if (this.dragging) {
	      if (!this.dragStartPoint) {
	        this.dragStartPoint = {
	          x: current.x,
	          y: current.y
	        };
	        this.dragItem = current.item;
	        graph.fire('dragstart', this.getEventObj(current));
	      } else {
	        graph.fire('dragmove', this.getEventObj(current));
	      }
	    }
	    if (current.item) {
	      graph.fire('itemhover', this.getEventObj(current));
	    }
	    graph.fire('mousemove', this.getEventObj(current));
	  },
	  isSame: function isSame(ev1, ev2, name) {
	    var shape1 = ev1[name];
	    var shape2 = ev2[name];
	    return shape1 === shape2;
	  },
	  destroy: function destroy() {
	    var mouseup = this.domMouseUp;
	    var mousedown = this.domMouseDown;
	    var mousemove = this.domMouseMove;
	    var ondblclick = this.domDblClick;
	    var mousewheel = this.domMouseWheel;
	    var contextmenu = this.domContextMenu;
	    var keydown = this.domKeyDown;
	    var keyup = this.domKeyUp;
	    var focus = this.domOnFocus;
	    var blur = this.domOnBlur;
	    var dommouseleave = this.dommouseleave;
	    var domMouseEnter = this.domMouseEnter;

	    contextmenu && contextmenu.remove();
	    keyup && keyup.remove();
	    mousewheel && mousewheel.remove();
	    keydown && keydown.remove();
	    ondblclick && ondblclick.remove();
	    mouseup && mouseup.remove();
	    mousedown && mousedown.remove();
	    mousemove && mousemove.remove();
	    dommouseleave && dommouseleave.remove();
	    domMouseEnter && domMouseEnter.remove();
	    focus && focus.remove();
	    blur && blur.remove();
	  }
	});

	module.exports = EventAssist;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 栅格的辅助类
	 * @author dxq613@gmail.com
	 */

	var Util = __webpack_require__(1);

	var GridAssist = function GridAssist(cfg) {
	  Util.mix(this, cfg);
	  this.init();
	};

	Util.augment(GridAssist, {
	  /**
	   * 图形所在容器
	   * @type {Group}
	   */
	  group: null,

	  /**
	   * 是否可见
	   * @type {Boolean}
	   */
	  visible: true,

	  /**
	   * 栅格线的对象
	   * @type {Object}
	   */
	  gridEl: null,

	  /**
	   * 起点 x
	   * @type {Number}
	   */
	  minX: 0,

	  /**
	   * 起点 y
	   * @type {Number}
	   */
	  minY: 0,

	  /**
	   * 单元格的宽度
	   * @type {Number}
	   */
	  cell: 10,

	  /**
	   * 结束点 x
	   * @type {Number}
	   */
	  maxX: 1000,

	  /**
	   * 结束点 y
	   * @type {Number}
	   */
	  maxY: 1000,

	  /**
	   * 栅格线的配置信息
	   * @type {Object}
	   */
	  line: null,
	  init: function init() {
	    var self = this;
	    var group = self.group;
	    var path = self._getPath();
	    var attrs = Util.mix({}, self.line);
	    attrs.path = path;
	    var gridEl = group.addShape('path', {
	      attrs: attrs,
	      capture: false
	    });
	    gridEl.set('visible', self.visible);
	    this.gridEl = gridEl;
	  },
	  _getPath: function _getPath() {
	    var self = this;
	    var minX = self.minX;
	    var minY = self.minY;
	    var maxX = self.maxX;
	    var maxY = self.maxY;
	    var cell = self._getCell();
	    var flooX = Math.ceil(minX / cell) * cell;
	    var flooY = Math.ceil(minY / cell) * cell;
	    var path = [];
	    for (var i = 0; i <= maxX - minX; i += cell) {
	      var x = flooX + i;
	      path.push(['M', x, minY]);
	      path.push(['L', x, maxY]);
	    }
	    for (var j = 0; j <= maxY - minY; j += cell) {
	      var y = flooY + j;
	      path.push(['M', minX, y]);
	      path.push(['L', maxX, y]);
	    }
	    return path;
	  },
	  _getCell: function _getCell() {
	    var rst = this.cell ? this.cell : 10;
	    return rst;
	  },
	  update: function update(cfg) {
	    Util.mix(this, cfg);
	    var path = this._getPath();
	    var gridEl = this.gridEl;
	    gridEl.attr('path', path);
	    gridEl.set('visible', this.visible);
	  },
	  destroy: function destroy() {
	    var self = this;
	    var gridEl = self.gridEl;
	    gridEl && gridEl.remove();
	  }
	});

	module.exports = GridAssist;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 导引信息的辅助类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var IdGroup = __webpack_require__(26);

	var GuideAssist = function GuideAssist(cfg) {
	  Util.mix(this, cfg);
	  this.init();
	};

	Util.augment(GuideAssist, {
	  /**
	   * 图
	   * @type {Graph}
	   */
	  graph: null,

	  /**
	   * 导引数据
	   * @type {Array}
	   */
	  guides: [],

	  /**
	   * 上层图层
	   * @type {Group}
	   */
	  frontGuideGroup: null,

	  /**
	   * 底层图层
	   * @type {Group}
	   */
	  backGuideGroup: null,

	  /**
	   * 初始化
	   */
	  init: function init() {
	    var graph = this.graph;
	    var frontGuideGroup = graph.get('frontGroup').addGroup();
	    var backGuideGroup = graph.get('backGroup').addGroup();
	    this.frontGuideGroup = frontGuideGroup;
	    this.backGuideGroup = backGuideGroup;
	  },


	  /**
	   * 辅助连接线
	   * @param  {Object}     cfg        索引
	   */
	  link: function link(cfg) {
	    this.guides.push({
	      type: 'link',
	      cfg: cfg
	    });
	  },


	  // 绘制连接线
	  _link: function _link(cfg) {
	    var guides = this.guides;
	    var graph = this.graph;
	    var sourceNode = graph.find(cfg.source);
	    var targetNode = graph.find(cfg.target);
	    if (!sourceNode || !targetNode) {
	      return false;
	    }
	    var id = cfg.id ? cfg.id : 'guide-link-' + guides.length;
	    var frontGuideGroup = this.frontGuideGroup;
	    var group = frontGuideGroup.addGroup(IdGroup, {
	      data: {
	        type: 'link',
	        cfg: cfg
	      },
	      id: id
	    });
	    var sourceCenter = sourceNode.getCenter();
	    var targetCenter = targetNode.getCenter();
	    var sourceIntersection = sourceNode.getIntersectionByPoint(targetCenter);
	    var targetIntersection = targetNode.getIntersectionByPoint(sourceCenter);
	    var drawEdgeCfg = Util.mix({}, cfg, {
	      source: sourceNode,
	      target: targetNode,
	      points: [sourceIntersection, targetIntersection]
	    });
	    var shapeName = cfg.shape ? cfg.shape : 'line';
	    Util.drawEdge(shapeName, drawEdgeCfg, group);
	    return group;
	  },


	  /**
	   * 绘制
	   */
	  draw: function draw() {
	    var self = this;
	    var guides = this.guides;
	    Util.each(guides, function (guide) {
	      self['_' + guide.type](guide.cfg);
	    });
	  },


	  /**
	   * 清空
	   * @return {Array}  导引集合
	   */
	  save: function save() {
	    return this.guides;
	  },


	  /**
	   * 移除
	   */
	  remove: function remove() {},


	  /**
	   * 清空
	   * @param  {Object}     bool        子项是否销毁
	   */
	  clear: function clear(bool) {
	    this.frontGuideGroup.clear(bool);
	    this.backGuideGroup.clear(bool);
	  },
	  destroy: function destroy() {
	    this.frontGuideGroup.clear();
	    this.backGuideGroup.clear();
	  }
	});

	module.exports = GuideAssist;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 提示信息的辅助类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var Global = __webpack_require__(7);

	var TooltipAssist = function TooltipAssist(cfg) {
	  Util.mix(this, cfg);
	  this.init();
	};

	Util.augment(TooltipAssist, {
	  /**
	   * 图
	   * @type {Graph}
	   */
	  graph: null,

	  /**
	   * tooltipDOM
	   * @type {DOM}
	   */
	  tooltipDOM: null,

	  /**
	   * titleDOM
	   * @type {DOM}
	   */
	  titleDOM: null,

	  /**
	   * listDOM
	   * @type {DOM}
	   */
	  listDOM: null,

	  /**
	   * tooltipCSS
	   * @type {Object}
	   */
	  tooltipCSS: {
	    border: 'none',
	    'border-radius': '4px',
	    background: 'rgba(33,33,33,0.7)',
	    color: 'white',
	    'font-size': '14px',
	    margin: 0,
	    padding: '8px 16px'
	  },

	  /**
	   * titleCSS
	   * @type {Object}
	   */
	  titleCSS: {
	    margin: 0
	  },

	  /**
	   * listCSS
	   * @type {Object}
	   */
	  listCSS: {
	    margin: 0,
	    'list-style-type': 'none',
	    padding: '0px'
	  },

	  /**
	   * 标题
	   * @type {String}
	   */
	  title: '',

	  /**
	   * 水平偏移
	   * @type {Number}
	   */
	  dx: 10,

	  /**
	   * 竖直偏移
	   * @type {Number}
	   */
	  dy: 10,

	  /**
	   * 边距
	   * @type {Number}
	   */
	  margin: 10,

	  /**
	   * 分割符号
	   * @type {String}
	   */
	  split: ': ',

	  /**
	   * 定时器
	   * @type {Object}
	   */
	  timer: setTimeout(function () {}),

	  /**
	   * tooltipHtml 模版
	   * @type {String}
	   */
	  tooltipHtml: '<div class="g6-tooltip" style="position: absolute;white-space:nowrap;z-index: 5;"></div>',

	  /**
	   * titleHtml 模版
	   * @type {String}
	   */
	  titleHtml: '<h4 class="g6-tooltip-title"></h4>',

	  /**
	   * listHtml 模版
	   * @type {String}
	   */
	  listHtml: '<ul class="g6-tooltip-list"></ul>',

	  /**
	   * 使用html时，单个选项的模板
	   * @type {String}
	   */
	  liTpl: '<li><span>{name}</span>{split}{value}</li>',

	  custom: false,
	  // 初始化
	  init: function init() {
	    var custom = this.custom;
	    if (!custom) {
	      this._createDOM();
	    }
	    this._bindEvent();
	  },

	  // 生成DOM
	  _createDOM: function _createDOM() {
	    var graph = this.graph;
	    var containerDOM = graph.get('graphContainer');
	    var tooltipDOM = Util.createDOM(this.tooltipHtml, this.tooltipCSS);
	    var titleDOM = Util.createDOM(this.titleHtml, this.titleCSS);
	    var listDOM = Util.createDOM(this.listHtml, this.listCSS);
	    containerDOM.appendChild(tooltipDOM);
	    tooltipDOM.appendChild(titleDOM);
	    tooltipDOM.appendChild(listDOM);
	    tooltipDOM.hide();
	    titleDOM.innerHTML = this.title;
	    this.titleDOM = titleDOM;
	    this.listDOM = listDOM;
	    this.tooltipDOM = tooltipDOM;
	  },

	  // 绑定事件
	  _bindEvent: function _bindEvent() {
	    var graph = this.graph;
	    graph.on('itemmouseenter', Util.wrapBehavior(this, 'onMouseenter'));
	    graph.on('itemhover', Util.wrapBehavior(this, 'onItemhover'));
	    graph.on('itemmouseleave', Util.wrapBehavior(this, 'onMouseleave'));
	    graph.on('dommouseleave', Util.wrapBehavior(this, 'onDomMouseleave'));
	  },
	  _changeContent: function _changeContent(tooltipCfg) {
	    var _this = this;

	    var listDOM = this.listDOM;
	    var liTpl = this.liTpl;
	    var str = '';
	    if (!tooltipCfg) {
	      return;
	    }
	    // 如果输出不是嵌套的数组配置项，则在外包一层数组
	    if (!Util.isArray(tooltipCfg[0])) {
	      tooltipCfg = [tooltipCfg];
	    }
	    Util.each(tooltipCfg, function (v) {
	      str += Util.substitute(liTpl, {
	        name: v[0],
	        value: v[1],
	        split: _this.split
	      });
	    });
	    listDOM.innerHTML = str;
	  },
	  _getTop: function _getTop(rect0, rect1, domY) {
	    var dy = this.dy;
	    if (rect0.height * 2 >= rect1.height) {
	      return '0px';
	    }
	    if (domY < rect0.height + dy) {
	      return domY + dy + 'px';
	    }
	    return domY - rect0.height - dy + 'px';
	  },
	  _getLeft: function _getLeft(rect0, rect1, domX) {
	    var dx = this.dx;
	    if (rect0.width * 2 >= rect1.width) {
	      return '0px';
	    }
	    if (rect1.width - domX - dx < rect0.width) {
	      return domX - rect0.width - dx + 'px';
	    }
	    return domX + dx + 'px';
	  },

	  // 更改位置
	  _changePositon: function _changePositon(ev) {
	    var tooltip = this.tooltipDOM;
	    var container = this.graph.get('htmlElementContaniner');
	    var rect0 = {
	      x: 0,
	      y: 0,
	      width: tooltip.width() + tooltip.paddingRight() + tooltip.paddingLeft(),
	      height: tooltip.height() + tooltip.paddingTop() + tooltip.paddingBottom()
	    };
	    var rect1 = {
	      x: 0,
	      y: 0,
	      width: container.width(),
	      height: container.height()
	    };
	    var domX = ev.domX;
	    var domY = ev.domY;

	    tooltip.css({
	      top: this._getTop(rect0, rect1, domY),
	      left: this._getLeft(rect0, rect1, domX)
	    });
	  },

	  // 鼠标进入
	  onMouseenter: function onMouseenter(ev) {
	    var custom = this.custom;
	    if (!custom) {
	      var tooltipCfg = ev.item.getShapeCfg().tooltip;
	      if (tooltipCfg) {
	        this._changeContent(tooltipCfg);
	        this.show(ev);
	      }
	    } else {
	      this.show(ev);
	    }
	  },

	  // 鼠标悬浮
	  onItemhover: function onItemhover(ev) {
	    this._changePositon(ev);
	  },

	  // 鼠标离开
	  onMouseleave: function onMouseleave() {
	    this.hide();
	  },

	  // 鼠标离开画布
	  onDomMouseleave: function onDomMouseleave() {
	    this.hide();
	  },
	  show: function show(ev) {
	    var tooltipDOM = this.tooltipDOM;
	    var graph = this.graph;
	    var timer = this.timer; // setTimeout(function() {}, Global.wheelZoomTimeout);
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      tooltipDOM.show();
	      graph.fire('tooltipshow', ev);
	    }, Global.toolTipTimeout);
	    this.timer = timer;
	  },
	  hide: function hide() {
	    var tooltipDOM = this.tooltipDOM;
	    tooltipDOM.hide();
	  },

	  // 销毁
	  destroy: function destroy() {
	    var graph = this.graph;
	    var custom = this.custom;
	    var tooltipDOM = this.tooltipDOM;
	    !custom && tooltipDOM.destroy();
	    graph.off('itemhover', Util.getWrapBehavior(this, 'onItemhover'));
	    graph.off('mouseleave', Util.getWrapBehavior(this, 'onMouseleave'));
	  }
	});

	module.exports = TooltipAssist;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 图组基类
	 * @author huangtonger@aliyun.com
	 */

	var G = __webpack_require__(10).G;
	var Util = __webpack_require__(4);
	var gGroup = G.Group;

	var Group = function Group(cfg) {
	  Group.superclass.constructor.call(this, cfg);
	};

	Util.extend(Group, gGroup);

	Util.augment(Group, {
	  drawInner: function drawInner(context) {
	    var _this = this;

	    this.traverseChildren(function (child) {
	      var freezePoint = child.get('freezePoint');
	      var scale = _this.getMatrix().elements[0];
	      if (child.isShape && freezePoint && child.get('visible')) {
	        child.initTransform();
	        child.transform([['t', -freezePoint.x, -freezePoint.y], ['s', 1 / scale, 1 / scale], ['t', freezePoint.x, freezePoint.y]]);
	      }
	    });
	    Group.superclass.drawInner.call(this, context);
	  }
	});

	module.exports = Group;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview G Group 拓展方法
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	var Canvas = __webpack_require__(10);
	var Util = __webpack_require__(4);
	var QueryMixin = __webpack_require__(28);
	var G = Canvas.G;
	var Mixin = function Mixin() {};

	/**
	 * 遍历子节点
	 * @param  {Object}      root        根节点
	 * @param  {Function}    callback    回调函数
	 */
	function _traverseChildren(root, callback) {
	  var children = root.get('children');
	  Util.each(children, function (child) {
	    callback(child, root);
	    if (child.get('children')) {
	      _traverseChildren(child, callback);
	    }
	  });
	}

	Util.augment(Mixin, {
	  traverseChildren: function traverseChildren(callback) {
	    _traverseChildren(this, callback);
	  },

	  /**
	   * 基数排序 （稳定排序）
	   */
	  radixSort: function radixSort() {
	    var children = this.get('children');
	    this.set('children', Util.radixSort(children, function (child) {
	      return child.get('zIndex');
	    }));
	  },

	  /**
	   * 清除容器内的图形或者分组
	   * @param  {Boolean} bool 是否清除自元素
	   * @return {Object}  this 该元素对象
	   */
	  clear: function clear(bool) {
	    var children = this.get('children');
	    bool = bool !== false;
	    while (children.length !== 0) {
	      children[children.length - 1].remove(bool);
	    }
	    return this;
	  },

	  /** 通过 class 获取子集
	   * @param  {String} name 配置项名
	   * @param  {CFG.Value} value 值
	   * @return {Object} rst 子集
	   */
	  findByCFG: function findByCFG(name, value) {
	    var children = this.get('children');
	    var rst = [];
	    Util.each(children, function (v) {
	      if (v.get(name) === value) {
	        rst.push(v);
	      } else {
	        return;
	      }
	    });
	    return rst;
	  }
	});

	Util.mixin(G.Group, [Mixin, QueryMixin]);

	module.exports = Mixin;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview html 形
	 * @author huangtonger@aliyun.com
	 */

	var Canvas = __webpack_require__(10);
	var Color = __webpack_require__(16);
	var ShapeIndex = __webpack_require__(45);
	var Util = __webpack_require__(4);
	var G = Canvas.G;

	var Html = function Html(cfg) {
	  Html.superclass.constructor.call(this, cfg);
	};

	Html.ATTRS = {
	  x: 0,
	  y: 0,
	  width: 0,
	  height: 0,
	  fillOpacity: 1,
	  lineWidth: 1
	};

	function applyMatrix(p, m) {
	  var me = m.elements;
	  var x = me[0] * p.x + me[3] * p.y + me[6];
	  var y = me[1] * p.x + me[4] * p.y + me[7];

	  p.x = x;
	  p.y = y;
	  return p;
	}

	function attrMapper(attrs) {
	  var fill = attrs.fill;
	  var fillOpacity = attrs.fillOpacity;
	  var fillColor = new Color(fill);
	  if (attrs.stroke) {
	    attrs.border = '' + attrs.lineWidth + 'px solid ' + attrs.stroke;
	  }
	  if (fill && fillOpacity) {
	    attrs['background-color'] = 'rgba(' + fillColor.getR() * 255 + ', ' + fillColor.getG() * 255 + ', ' + fillColor.getB() * 255 + ', ' + fillOpacity + ')';
	    return;
	  }
	  if (fill) {
	    attrs.fill = fill;
	  }
	}

	Util.extend(Html, G.Shape);

	Util.augment(Html, {
	  canFill: true,
	  type: 'html',
	  __isPointInFill: function __isPointInFill(x, y) {
	    var bbox = this.getBBox();
	    var rx = bbox.minX;
	    var ry = bbox.minY;
	    var width = bbox.maxX - bbox.minX;
	    var height = bbox.maxY - bbox.minY;
	    return rx <= x && x <= rx + width && ry <= y && y <= ry + height;
	  },
	  getDefaultAttrs: function getDefaultAttrs() {
	    return Html.ATTRS;
	  },
	  init: function init() {
	    var canvas = this.get('canvas');
	    var attrs = this.get('attrs');
	    var autoSize = this.get('autoSize');
	    var htmlElementContaniner = canvas.get('htmlElementContaniner');
	    var html = attrs.html;
	    var cx = attrs.cx;
	    var cy = attrs.cy;
	    var dom = Util.createDOM(html, {
	      position: 'absolute',
	      padding: '0px',
	      margin: '0px',
	      visibility: 'hidden'
	    });
	    var width = void 0;
	    var height = void 0;
	    htmlElementContaniner.appendChild(dom);
	    if (autoSize) {
	      width = dom.width();
	      height = dom.height();
	      this.attr('x', cx - width / 2);
	      this.attr('y', cy - height / 2);
	      this.attr('width', width);
	      this.attr('height', height);
	    }
	    this.set('dom', dom);
	  },
	  attr: function attr(param1, param2) {
	    var attrs = this.get('attrs');

	    if (Util.isObject(param1)) {
	      Util.mix(attrs, param1);
	      attrMapper(attrs);
	      if (param1.x !== undefined || param1.y !== undefined || param1.width !== undefined || param1.height !== undefined) {
	        this.calculateBox();
	      }
	      return attrs;
	    }
	    if (!Util.isNull(param2)) {
	      attrs[param1] = param2;
	      attrMapper(attrs);
	      if (param1 === 'x' || param1 === 'y' || param1 === 'width' || param1 === 'height') {
	        this.calculateBox();
	      }
	      return this;
	    }

	    return attrs[param1];
	  },
	  calculateBox: function calculateBox() {
	    var x = this.attr('x');
	    var y = this.attr('y');
	    var width = this.attr('width');
	    var height = this.attr('height');
	    var lineWidth = this.attr('lineWidth');

	    return {
	      minX: x - lineWidth / 2,
	      minY: y - lineWidth / 2,
	      maxX: x + width + lineWidth / 2,
	      maxY: y + height + lineWidth / 2
	    };
	  },
	  isPointInPath: function isPointInPath(x, y) {
	    return this.__isPointInFill(x, y);
	  },
	  applyTransform: function applyTransform() {
	    var dom = this.get('dom');
	    var canvas = this.get('canvas');
	    var pixelRatio = canvas.get('pixelRatio');
	    var totalMatrix = this.getTotalMatrix();
	    var x = this.attr('x');
	    var y = this.attr('y');
	    var width = this.attr('width');
	    var height = this.attr('height');
	    var lt = applyMatrix({
	      x: x,
	      y: y
	    }, totalMatrix);
	    var rb = applyMatrix({
	      x: x + width,
	      y: y + height
	    }, totalMatrix);
	    dom.css({
	      left: lt.x / pixelRatio + 'px',
	      top: lt.y / pixelRatio + 'px',
	      width: (rb.x - lt.x) / pixelRatio + 'px',
	      height: (rb.y - lt.y) / pixelRatio + 'px'
	    });
	  },
	  tryAdd: function tryAdd() {
	    var canvas = this.get('canvas');
	    var htmlElementContaniner = canvas.get('htmlElementContaniner');
	    var dom = this.get('dom');
	    if (dom.parentNode !== htmlElementContaniner) {
	      htmlElementContaniner.appendChild(dom);
	    }
	  },
	  createPath: function createPath() {
	    var dom = this.get('dom');
	    var attrs = this.get('attrs');
	    this.tryAdd();
	    this.applyTransform();
	    dom.css(Util.mix({
	      visibility: 'visible'
	    }, attrs));
	  },
	  destroy: function destroy() {
	    var dom = this.get('dom');
	    if (dom) {
	      Util.isFunction(dom.g6Destroy) && dom.g6Destroy();
	      dom.destroy();
	    }
	    Html.superclass.destroy.call(this);
	  }
	});

	ShapeIndex.Html = Html;

	module.exports = Html;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview G Group 拓展方法
	 * @author huangtonger@aliyun.com
	 * @ignore
	 */

	var Util = __webpack_require__(1);
	var Canvas = __webpack_require__(10);
	var QueryMixin = __webpack_require__(28);
	var G = Canvas.G;
	var Mixin = function Mixin() {};

	Util.augment(Mixin, {
	  /**
	   * 获取所有初始化相关的属性
	   * @return {Object} rst 结果集
	   */
	  getAllAttrs: function getAllAttrs() {
	    var self = this;
	    var attrs = self.get('attrs');
	    var rst = {};
	    Util.each(attrs, function (v, k) {
	      rst[k] = self.attr(k);
	    });
	    return rst;
	  }
	});

	Util.mixin(G.Shape, [Mixin, QueryMixin]);

	module.exports = Mixin;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 网状图的入口
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Base = __webpack_require__(11);
	var Canvas = __webpack_require__(10);
	var Util = __webpack_require__(4);
	var ModeMixin = __webpack_require__(134);
	var FitViewMixin = __webpack_require__(130);
	var GraphToolMixin = __webpack_require__(131);
	var PluginMixin = __webpack_require__(135);
	var FilterMixin = __webpack_require__(129);
	var ModalMixin = __webpack_require__(133);
	var LayoutMixin = __webpack_require__(132);
	var ActiveGroupMixin = __webpack_require__(127);
	var Mapper = __webpack_require__(62);
	var Item = __webpack_require__(61);
	var GridAssist = __webpack_require__(116);
	var EventAssist = __webpack_require__(115);
	var TooltipAssist = __webpack_require__(118);
	var AnimateAssist = __webpack_require__(114);
	var GuideAssist = __webpack_require__(117);
	var Global = __webpack_require__(7);
	var SortGroup = __webpack_require__(60);
	var FreezeSizeGroup = __webpack_require__(119);
	var IdGroup = __webpack_require__(26);
	var Node = Item.Node;
	var Edge = Item.Edge;

	function createCanvas(w, h, dom) {
	  return new Canvas({
	    width: w,
	    height: h,
	    eventEnable: false,
	    containerDOM: dom
	  });
	}

	var Graph = function Graph(cfg) {
	  Graph.superclass.constructor.call(this, cfg);
	  this._init();
	};

	Graph.ATTRS = {

	  /**
	   * 图的容器id
	   * @type {String}
	   */
	  id: null,

	  /**
	   * 图的父容器
	   * @type {DOM}
	   */
	  container: null,

	  /**
	   * 图的容器
	   * @type {DOM}
	   */
	  graphContainer: null,

	  /**
	   * 宽度
	   * @type {Number}
	   */
	  width: null,

	  /**
	   * 高度
	   * @type {Number}
	   */
	  height: 500,

	  /**
	   * 当流程图处于 add 模式下，正在添加的元素类型，当前仅支持 node, edge
	   * @type {String}
	   */
	  addingType: '',

	  /**
	   * 子项缓存
	   * @type {Array}
	   */
	  itemCache: null,

	  /**
	   * 所有的节点和边的集合
	   * @type {Array}
	   */
	  items: [],

	  /**
	   * 节点
	   * @type {Array}
	   */
	  nodes: [],

	  /**
	   * 边
	   * @type {Array}
	   */
	  edges: [],

	  /**
	   * 导引
	   * @type {Array}
	   */
	  guides: [],

	  /**
	   * 画布
	   * @type {GObject}
	   */
	  canvas: null,

	  /**
	   * 事件缓存用于销毁
	   * @type {Object}
	   */
	  eventStash: {},

	  /**
	   * 上层Canvas的DOM
	   * @type {DOMobject}
	   */
	  el: null,

	  /**
	   * 是否宽度自适应
	   * @type {Boolean}
	   */
	  forceFit: false,

	  /**
	   * 栅格的配置信息
	   * @type {Object}
	   */
	  grid: true,

	  /**
	   * 导引的配置信息
	   * @type {Object}
	   */
	  guide: true,

	  /**
	   * 默认节点形
	   * @type {String}
	   */
	  defaultNodeShape: null,

	  /**
	   * 是否开启动画
	   * @type {Boolean}
	   */
	  animate: false,

	  /**
	   * 用于存储帧绘制状态数据
	   * @type {Object}
	   */
	  drawFrameObj: {},

	  /**
	   * 是否使用锚点
	   * @type {Boolean}
	   */
	  useAnchor: true,

	  /**
	   * 边是否使用排序绘制组（排序绘制用于解决文本的重叠问题）
	   * @type {Boolean}
	   */
	  useEdgeSortGroup: true,

	  /**
	   * 节点是否使用排序绘制组（排序绘制用于解决文本的重叠问题）
	   * @type {Boolean}
	   */
	  useNodeSortGroup: false,

	  /**
	   * 是否使用尺寸不变组
	   * @type {Boolean}
	   */
	  useFreezeSizeGroup: false,

	  /**
	   * 滚轮缩放尺度限制
	   * @type {Array}
	   */
	  wheelScaleLimit: [-Infinity, Infinity],

	  /**
	   * 行为信号
	   * @type {Object}
	   */
	  behaviourSignal: {},

	  /**
	   * 最大缩放比率
	   * @type {Number}
	   */
	  maxZoom: 10,

	  /**
	   * 最小缩放比率
	   * @type {Number}
	   */
	  minZoom: 0.1,

	  /**
	   * DOM 节点是否有焦点
	   * @type {Boolean}
	   */
	  domFocus: false,

	  /**
	   * tooltip DOM 节点
	   * @type {Object}
	   */
	  tooltipDOM: null,

	  /**
	   * 是否采用精准相交的锚点策略
	   * @type {Boolean}
	   */
	  preciseAnchor: false
	};

	Util.extend(Graph, Base);

	Util.mixin(Graph, [LayoutMixin, ModalMixin, FilterMixin, ActiveGroupMixin, ModeMixin, FitViewMixin, GraphToolMixin, PluginMixin]);

	Util.augment(Graph, {
	  // 初始化
	  _init: function _init() {
	    this._pluginInit();
	    this.fire('beforeinit');
	    this._initCfg();
	    this._initDOM();
	    this._initData();
	    this._initMapper();
	    this._initEvent();
	    this._initForceFit();
	    if (this.get('grid')) {
	      this._initGrid();
	    }
	    this._initModal();
	    this._initEditor();
	    this._initMode();
	    this._initLayout();
	    this._initAnimate();
	    this._initGuide();
	    this.fire('afterinit');
	  },

	  // 初始化导引
	  _initGuide: function _initGuide() {
	    var guideCfg = Util.mix({
	      graph: this,
	      guides: this.get('guides')
	    }, Global.guide, this.get('guide'));
	    var guideAssist = new GuideAssist(guideCfg);
	    this.set('guideAssist', guideAssist);
	  },

	  // 初始化栅格
	  _initGrid: function _initGrid() {
	    var gridCfg = Util.mix({
	      minX: 0,
	      minY: 0,
	      maxX: this.get('width'),
	      maxY: this.get('height'),
	      group: this.get('backGroup')
	    }, Global.grid, this.get('grid'));
	    var gridAssist = new GridAssist(gridCfg);
	    this.set('gridAssist', gridAssist);
	  },

	  // 初始化动画对象
	  _initAnimate: function _initAnimate() {
	    var animate = this.get('animate');
	    var canvas = this.get('canvas');
	    var frontCanvas = this.get('frontCanvas');
	    if (animate) {
	      this.set('animateAssist', new AnimateAssist({
	        canvases: [canvas, frontCanvas]
	      }));
	    }
	  },

	  // 初始化自适应宽度配置
	  _initForceFit: function _initForceFit() {
	    if (!this.get('width')) {
	      this.set('forceFit', true);
	    }
	    if (this.get('forceFit')) {
	      window.addEventListener('resize', Util.wrapBehavior(this, '_initForceFitEvent'));
	      this.forceFit();
	    }
	  },

	  // 自适应宽度事件
	  _initForceFitEvent: function _initForceFitEvent() {
	    var self = this;
	    var timer = setTimeout(function () {
	      self.forceFit();
	    }, 200);
	    clearTimeout(this.get('resizeTimer'));
	    this.set('resizeTimer', timer);
	  },

	  // 私有事件触发
	  _on: function _on(type, fn) {
	    var eventStash = this.get('eventStash');
	    if (!eventStash[type]) {
	      eventStash[type] = [];
	    }
	    eventStash[type].push(fn);
	    this.on(type, fn);
	  },

	  // 私有事件接触
	  _off: function _off() {
	    var self = this;
	    var eventStash = this.get('eventStash');
	    Util.each(eventStash, function (events, type) {
	      Util.each(events, function (event) {
	        self.off(type, event);
	      });
	      eventStash[type] = [];
	    });
	  },

	  // 初始化数据
	  _initData: function _initData() {
	    this.set('itemCache', {});
	    this.set('items', []);
	    this.set('nodes', []);
	    this.set('edges', []);
	  },

	  // 初始化映射器
	  _initMapper: function _initMapper() {
	    this.set('nodeMapper', new Mapper());
	    this.set('edgeMapper', new Mapper());
	  },

	  // 初始化画布
	  _initDOM: function _initDOM() {
	    var container = this.get('container');
	    if (!container) {
	      var id = this.get('id');
	      container = document.getElementById(id);
	      if (!container) {
	        throw new Error('please set the id for the graph');
	      }
	    }
	    var useEdgeSortGroup = this.get('useEdgeSortGroup');
	    var useFreezeSizeGroup = this.get('useFreezeSizeGroup');
	    var useNodeSortGroup = this.get('useNodeSortGroup');
	    var width = this.get('width');
	    var height = this.get('height');
	    var graphContainer = Util.createDOM('<div class="graph-container"></div>', {
	      position: 'relative'
	    });
	    container.appendChild(graphContainer);
	    var canvas = createCanvas(width, height, graphContainer);
	    var htmlElementContaniner = graphContainer.appendChild(Util.createDOM('<div class="graph-container-html-Elements"></div>'));
	    var frontCanvas = createCanvas(width, height, graphContainer);
	    var modalRect = frontCanvas.addShape('rect', {
	      attrs: Util.mix({}, Global.modalRectStyle),
	      visible: false,
	      capture: false
	    });
	    var frontEl = frontCanvas.get('el');
	    canvas.set('htmlElementContaniner', htmlElementContaniner);
	    htmlElementContaniner.style.overflow = 'hidden';
	    htmlElementContaniner.style.width = width + 'px';
	    htmlElementContaniner.style.height = height + 'px';
	    htmlElementContaniner.style.position = 'absolute';
	    htmlElementContaniner.style.top = 0;
	    htmlElementContaniner.style.left = 0;
	    frontEl.style.position = 'absolute';
	    frontEl.style.top = 0;
	    frontEl.style.left = 0;
	    graphContainer.style['font-family'] = Global.fontFamily;
	    var rootGroup = useFreezeSizeGroup ? canvas.addGroup(FreezeSizeGroup) : canvas.addGroup();
	    var frontCanvasRootGroup = frontCanvas.addGroup(FreezeSizeGroup);
	    var backGroup = rootGroup.addGroup();
	    var itemGroup = rootGroup.addGroup();
	    var edgeGroup = useEdgeSortGroup ? itemGroup.addGroup(SortGroup) : itemGroup.addGroup();
	    var nodeGroup = useNodeSortGroup ? itemGroup.addGroup(SortGroup) : itemGroup.addGroup();
	    var frontGroup = rootGroup.addGroup();
	    var activedRectRootGroup = frontCanvasRootGroup.addGroup({
	      capture: false
	    });
	    var delegaRootGroup = frontCanvasRootGroup.addGroup();
	    var anchorPointRootGroup = frontCanvasRootGroup.addGroup();
	    var controlPointRootGroup = frontCanvasRootGroup.addGroup();

	    rootGroup.set('gid', 'rootGroup');
	    frontCanvasRootGroup.set('gid', 'frontCanvasRootGroup');
	    backGroup.set('animate', false);
	    var modalGroup = frontCanvasRootGroup.addGroup(SortGroup, {
	      visible: false
	    });
	    this.set('rootGroup', rootGroup); // 最底层的分组，用于实现缩放、拖拽画布
	    this.set('itemGroup', itemGroup); // 子项容器
	    this.set('backGroup', backGroup); // 底层图层
	    this.set('frontGroup', frontGroup); // 上层图层
	    this.set('frontCanvasRootGroup', frontCanvasRootGroup); // 拖拽时出现的委托对象
	    this.set('controlPointRootGroup', controlPointRootGroup);
	    this.set('delegaRootGroup', delegaRootGroup);
	    this.set('activedRectRootGroup', activedRectRootGroup);
	    this.set('anchorPointRootGroup', anchorPointRootGroup);
	    this.set('nodeGroup', nodeGroup);
	    this.set('edgeGroup', edgeGroup);
	    this.set('canvas', canvas);
	    this.set('frontCanvas', frontCanvas);
	    this.set('graphContainer', graphContainer);
	    this.set('htmlElementContaniner', htmlElementContaniner);
	    this.set('container', container);
	    this.set('el', frontEl);
	    this.set('modalRect', modalRect);
	    this.set('modalGroup', modalGroup); // 模态图层
	  },

	  // 初始化事件
	  _initEvent: function _initEvent() {
	    var eventAssist = new EventAssist({
	      graph: this,
	      frontCanvas: this.get('frontCanvas'),
	      canvas: this.get('canvas'),
	      rootGroup: this.get('rootGroup')
	    });
	    this.set('eventAssist', eventAssist);
	  },
	  getViewPortBox: function getViewPortBox() {
	    var width = this.get('width');
	    var height = this.get('height');
	    var startPoint = this.invertPoint({
	      x: 0,
	      y: 0
	    });
	    var endPoint = this.invertPoint({
	      x: width,
	      y: height
	    });
	    return {
	      minX: startPoint.x,
	      minY: startPoint.y,
	      maxX: endPoint.x,
	      maxY: endPoint.y
	    };
	  },

	  // 更新栅格
	  _updateGrid: function _updateGrid() {
	    var gridAssist = this.get('gridAssist');
	    if (!gridAssist) {
	      return;
	    }
	    var box = this.getViewPortBox();
	    gridAssist.update(box);
	  },

	  // 添加节点结束
	  _afterAddItem: function _afterAddItem(id, item) {
	    var itemCache = this.get('itemCache');
	    // TODO 删除
	    this.fire('itemadd', {
	      item: item,
	      model: item.get('model')
	    });
	    this.fire('itemchange', {
	      item: item
	    });
	    itemCache[id] = item;
	  },

	  // 清空画布
	  _clearInner: function _clearInner() {
	    var guideAssist = this.get('guideAssist');
	    var itemCache = this.get('itemCache');
	    var animate = this.get('animate');
	    var htmlElementContaniner = this.get('htmlElementContaniner');
	    htmlElementContaniner.innerHTML = '';
	    Util.each(itemCache, function (item) {
	      item.destroy();
	    });
	    guideAssist.clear(!animate);
	    this.fire('afterclear');
	  },

	  // 更新边
	  _updateEdgeEnd: function _updateEdgeEnd(edge, obj, end) {
	    var self = this;
	    var itemCache = self.get('itemCache');
	    var nodeId = obj[end];
	    var node = edge.get(end);
	    if (node && node.get('id') === nodeId) {
	      return;
	    }
	    node && node.removeEdge(edge);

	    var newNode = itemCache[nodeId];
	    newNode.addEdge(edge);
	    edge.set(end, newNode);
	  },

	  // 进行布局
	  _drawInner: function _drawInner() {
	    this._drawItems();
	    this._doLayout();
	    this._drawGuides();
	  },

	  // 获取图的包围盒
	  getBBox: function getBBox() {
	    var itemGroup = this.get('itemGroup');
	    return itemGroup.getBBox();
	  },

	  // 添加子项
	  _drawItems: function _drawItems() {
	    var nodes = this.get('nodes');
	    var edges = this.get('edges');
	    this._addNodes(nodes);
	    this._addEdges(edges);
	  },
	  _drawGuides: function _drawGuides() {
	    var guideAssist = this.get('guideAssist');
	    guideAssist.draw();
	  },

	  // 读取导引数据
	  _readGuides: function _readGuides(guides) {
	    var self = this;
	    Util.each(guides, function (guide) {
	      self.get('guides').push(guide);
	    });
	  },

	  // 保存导引数据
	  _saveGuides: function _saveGuides() {
	    var guideAssist = this.get('guideAssist');
	    return guideAssist.save();
	  },

	  // 获取按group排序的激活子项
	  _getAllActived: function _getAllActived() {
	    var items = this.getAllActived();
	    items.sort(function (a, b) {
	      var group = a.get('group');
	      var bgrou = b.get('group');
	      var parent = void 0;
	      var children = void 0;
	      if (group) {
	        parent = group.get('parent');
	        children = parent.get('children');
	      }
	      return children.indexOf(group) - children.indexOf(bgrou);
	    });
	    return items;
	  },

	  /**
	   * 添加子项
	   * @param  {String} type  类型
	   * @param  {Object} model 模型
	   * @return {Object} 子项
	   */
	  addItem: function addItem(type, model) {
	    type = Util.ucfirst(type);
	    var method = '_add' + type + 's';
	    var item = this[method]([model])[0];
	    return item;
	  },

	  /**
	   * 删除子项
	   * @param  {Object}   item 子项
	   */
	  removeItem: function removeItem(item) {
	    var self = this;
	    var itemCache = self.get('itemCache');
	    if (!item || item.destroyed) {
	      return;
	    }
	    if (Util.isString(item)) {
	      item = itemCache[item];
	    }
	    var id = item.get('id');
	    this.fire('itemremove', {
	      item: item
	    });
	    delete itemCache[id];
	    if (item.get('type') === 'node') {
	      var edges = item.get('edges').slice();
	      Util.each(edges, function (edge) {
	        if (edge && !edge.destroyed) {
	          delete itemCache[edge.get('model').id];
	          self.removeItem(edge);
	        }
	      });
	    }
	    this.fire('itemchange', {
	      item: item
	    });
	    item.destroy();
	  },

	  /**
	   * 更新子项
	   * @param {Array}   item        节点数据
	   * @param {Array}   updateModel 边数据
	   * @return {Object} 子项
	   */
	  updateItem: function updateItem(item, updateModel) {
	    var itemCache = this.get('itemCache');

	    if (Util.isString(item)) {
	      item = itemCache[item];
	    }
	    var type = item.get('type');
	    var model = item.get('model');
	    Util.mix(model, updateModel);

	    if (type === 'edge') {
	      this._updateEdgeEnd(item, model, 'source');
	      this._updateEdgeEnd(item, model, 'target');
	      item.update();
	    } else if (type === 'node') {
	      item.update();
	      var edges = item.get('edges');
	      Util.each(edges, function (edge) {
	        edge.update();
	      });
	    }
	    this.fire('itemupdate', {
	      item: item,
	      model: updateModel
	    });
	    this.fire('itemchange', {
	      item: item
	    });
	    return item;
	  },

	  /**
	   * 改变最上层 canvas 的 css
	   * @param  {Object}   obj css 配置项
	   */
	  css: function css(obj) {
	    var el = this.get('el');
	    Util.each(obj, function (v, k) {
	      el.style[k] = v;
	    });
	  },

	  /**
	   * 添加节点
	   * @param  {Array}   models 节点数据模型集
	   * @return {Array}   nodes  节点集
	   */
	  _addNodes: function _addNodes(models) {
	    var self = this;
	    var nodeGroup = self.get('nodeGroup');
	    var itemCache = self.get('itemCache');
	    var animate = self.get('animate');
	    var rst = [];

	    Util.each(models, function (node) {
	      var id = node.id;
	      if (Util.isNull(id)) {
	        id = Util.guid();
	        node.id = id;
	      }
	      if (itemCache[id]) {
	        throw new Error('id: ' + id + ' 已存在！id: ' + id + ' already exist!');
	      }
	      var group = nodeGroup.addGroup(IdGroup, {
	        id: id,
	        type: 'node'
	      });
	      var nodeEl = new Node({
	        id: id,
	        graph: self,
	        group: group,
	        animate: animate,
	        model: node,
	        mapper: self.get('nodeMapper'),
	        delegaRootGroup: self.get('delegaRootGroup'),
	        useAnchor: self.get('useAnchor'),
	        controlPointRootGroup: self.get('controlPointRootGroup'),
	        activedRectRootGroup: self.get('activedRectRootGroup'),
	        anchorPointRootGroup: self.get('anchorPointRootGroup')
	      });
	      self._afterAddItem(id, nodeEl);
	      rst.push(nodeEl);
	      nodeEl.draw();
	      self.get('items').push(nodeEl);
	    });
	    return rst;
	  },

	  /**
	   * 读数据
	   * @param  {Object} cfg 配置项
	   */
	  read: function read(cfg) {
	    var self = this;
	    Util.each(cfg, function (v, k) {
	      self['_read' + Util.ucfirst(k)](v);
	    });
	  },

	  /**
	   * 保存并导出数据
	   * @return {Object} 数据模型
	   */
	  save: function save() {
	    return {
	      source: this._saveSource(),
	      guides: this._saveGuides()
	    };
	  },

	  /**
	   * 添加边
	   * @param  {Array}   models 边数据模型集
	   * @return {Array}   edges  返回边集
	   */
	  _addEdges: function _addEdges(models) {
	    var self = this;
	    var animate = self.get('animate');
	    var itemCache = self.get('itemCache');
	    var edgeGroup = self.get('edgeGroup');
	    var rst = [];
	    Util.each(models, function (edge) {
	      var id = edge.id;
	      var sourceNode = itemCache[edge.source];
	      var targetNode = itemCache[edge.target];
	      if (!sourceNode || !targetNode) {
	        throw new Error('can not find effective node in edge model');
	      }
	      if (itemCache[id]) {
	        throw new Error('id: ' + id + ' 已存在！id: ' + id + ' already exist!');
	      }
	      // 如果未指定id，则使用edge和source的id
	      if (Util.isNull(id)) {
	        id = Util.guid();
	        edge.id = id;
	      }
	      var group = edgeGroup.addGroup(IdGroup, {
	        id: id,
	        type: 'edge'
	      });
	      var edgeEl = new Edge({
	        id: id,
	        graph: self,
	        animate: animate,
	        source: sourceNode,
	        target: targetNode,
	        model: edge,
	        group: group,
	        mapper: self.get('edgeMapper'),
	        useAnchor: self.get('useAnchor'),
	        delegaRootGroup: self.get('delegaRootGroup'),
	        controlPointRootGroup: self.get('controlPointRootGroup')
	      });
	      edgeEl.draw();
	      self._afterAddItem(id, edgeEl);
	      rst.push(edgeEl);
	      self.get('items').push(edgeEl);
	    });
	    return rst;
	  },

	  /**
	   * 将 dom 坐标转为 canvas 坐标
	   * @param  {Object} point 点
	   * @return {Object} 转置后的点
	   */
	  invertPoint: function invertPoint(point) {
	    var matrix = this.get('rootGroup').getMatrix();
	    return Util.invertPoint(point, matrix);
	  },

	  /**
	   * 将 canvas 坐标转为 dom 坐标
	   * @param  {Object} point 点
	   * @return {Object} 反置后的点
	   */
	  converPoint: function converPoint(point) {
	    var matrix = this.get('rootGroup').getMatrix();
	    return Util.converPoint(point, matrix);
	  },

	  /**
	   * 自适应宽度
	   */
	  forceFit: function forceFit() {
	    var container = this.get('container');
	    var width = Util.getDOMWidth(container);
	    var height = this.get('height');
	    width !== this.get('width') && this.changeSize(width, height);
	  },

	  /**
	   * 提示信息
	   * @param  {Boolean|Object} parma 参数
	   * @return {Object} this
	   */
	  tooltip: function tooltip(parma) {
	    var tooltipAssist = this.get('tooltipAssist');
	    var tooltip = {
	      graph: this,
	      tooltipDOM: this.get('tooltipDOM')
	    };
	    if (parma) {
	      if (Util.isObject(tooltipAssist)) {
	        tooltipAssist.destroy();
	      }
	      if (Util.isObject(parma)) {
	        Util.mix(tooltip, parma);
	      }
	      tooltipAssist = new TooltipAssist(tooltip);
	      this.set('tooltipAssist', tooltipAssist);
	    } else {
	      if (tooltipAssist) {
	        tooltipAssist.destroy();
	      }
	      this.set('tooltipAssist', null);
	    }
	    return this;
	  },

	  /**
	   * 通过图形获取子项
	   * @param  {G.Shape} shape 图形
	   * @return {String}  子项
	   */
	  getItem: function getItem(shape) {
	    if (!shape) return null;
	    var group = shape.get('parent');
	    var itemCache = this.get('itemCache');
	    var id = group.get('id');
	    return itemCache[id];
	  },

	  /**
	   * 更新背景矩阵
	   * @param  {Matrix} matrix 矩阵
	   */
	  updateMatrix: function updateMatrix(matrix) {
	    var rootGroup = this.get('rootGroup');
	    var frontCanvasRootGroup = this.get('frontCanvasRootGroup');
	    var minZoom = this.get('minZoom');
	    var maxZoom = this.get('maxZoom');
	    if (matrix.elements[0] < minZoom) {
	      return;
	    }
	    if (matrix.elements[0] > maxZoom) {
	      return;
	    }
	    rootGroup.setMatrix(matrix);
	    frontCanvasRootGroup.setMatrix(matrix.clone());
	    this._updateGrid();
	    this.fire('matrixupdate', {
	      matrix: matrix
	    });
	  },

	  /**
	   * 获得缩放比率
	   * @return {Number} 缩放比率
	   */
	  getScale: function getScale() {
	    return this.getMatrix().elements[0];
	  },

	  /**
	   * 获取矩阵
	   * @return  {Matrix} 根组的矩阵
	   */
	  getMatrix: function getMatrix() {
	    var rootGroup = this.get('rootGroup');
	    return rootGroup.getMatrix();
	  },

	  /**
	   * 将节点、边设置到最前面
	   * @param  {Item}   item 设置的元素
	   * @return {Object} 自身
	   */
	  toFront: function toFront(item) {
	    var group = item.get('group');
	    var parent = group.get('parent');
	    var children = parent.get('children');
	    Util.remove(children, group);
	    children.push(group);
	    return self;
	  },

	  /**
	   * 将节点、边设置到最后面
	   * @param  {Item} item 设置的元素
	   * @return {Object} 自身
	   */
	  toBack: function toBack(item) {
	    var group = item.get('group');
	    var parent = group.get('parent');
	    var children = parent.get('children');
	    Util.remove(children, group);
	    children.unshift(group);
	    return self;
	  },

	  /**
	   * 导引接口
	   * @return {Object} 导引对象
	   */
	  guide: function guide() {
	    var guideAssist = this.get('guideAssist');
	    return guideAssist;
	  },

	  /**
	   * 注册节点信息
	   * @return {Node}       [description]
	   */
	  node: function node() {
	    return this.get('nodeMapper');
	  },

	  /**
	   * 边的信息
	   * @return {Edge} 边映射对象
	   */
	  edge: function edge() {
	    return this.get('edgeMapper');
	  },

	  /**
	   * 清除
	   */
	  clear: function clear() {
	    this._clearInner();
	    this._initMapper();
	    this._initData();
	  },

	  /**
	   * 绘制
	   * @param {Boolean} bool 执行动画
	   */
	  draw: function draw(bool) {
	    var self = this;
	    var animateAssist = self.get('animateAssist');
	    var drawFrameObj = self.get('drawFrameObj');
	    drawFrameObj.callback = function () {
	      if (self.destroyed) {
	        return;
	      }
	      if (animateAssist) {
	        if (bool !== false) {
	          animateAssist.run();
	        } else {
	          animateAssist.init();
	          self.refresh(false);
	        }
	      } else {
	        self.refresh(false);
	      }
	    };
	    Util.frameDraw(drawFrameObj);
	  },

	  /**
	   * 刷新前置画布
	   */
	  refreshFront: function refreshFront() {
	    this.get('frontCanvas').draw();
	  },

	  /**
	   * 刷新画布
	   */
	  refresh: function refresh() {
	    this.get('canvas').draw();
	    this.get('frontCanvas').draw();
	  },

	  /**
	   * 更新节点位置
	   */
	  updateNodesPosition: function updateNodesPosition() {
	    var edges = this.getEdges();
	    var nodes = this.getNodes();
	    Util.each(nodes, function (node) {
	      node.updatePosition();
	    });
	    Util.each(edges, function (edge) {
	      edge.update();
	    });
	    this.draw();
	  },

	  /**
	   * 渲染
	   */
	  render: function render() {
	    this.fire('beforerender');
	    this._drawInner();
	    this._fitView();
	    this.draw();
	    this.fire('afterrender');
	  },

	  /**
	   * 不清除映射规则，重新加载数据
	   */
	  changeData: function changeData() {
	    var array = Util.toArray(arguments);
	    this._clearInner();
	    this._initData();
	    this.source.apply(this, array);
	    this._drawInner();
	    this.draw();
	  },

	  /**
	   * 获取画布的宽度
	   * @return {Number} 画布的宽度
	   */
	  getWidth: function getWidth() {
	    return this.get('width');
	  },

	  /**
	   * 获取画布的高
	   * @return {Number} 画布的高度
	   */
	  getHeight: function getHeight() {
	    return this.get('height');
	  },

	  /**
	   * 更改画布的尺寸
	   * @param  {Number} width  宽度
	   * @param  {Number} height 高度
	   */
	  changeSize: function changeSize(width, height) {
	    if (Math.abs(width) >= Infinity || Math.abs(height) >= Infinity) {
	      console.warn('size parameter more than the maximum');
	      return;
	    }
	    var self = this;
	    var canvas = self.get('canvas');
	    var frontCanvas = self.get('frontCanvas');
	    var htmlElementContaniner = self.get('htmlElementContaniner');

	    canvas.changeSize(width, height);
	    frontCanvas.changeSize(width, height);
	    self.set('width', width);
	    self.set('height', height);
	    htmlElementContaniner.css({
	      width: width + 'px',
	      height: height + 'px'
	    });
	    self._updateGrid();
	    self.refresh();
	    self.fire('changesize', {
	      width: width,
	      height: height
	    });
	  },

	  /**
	   * 销毁图
	   */
	  destroy: function destroy() {
	    var self = this;
	    var canvas = self.get('canvas');
	    var gridAssist = self.get('gridAssist');
	    var guideAssist = self.get('guideAssist');
	    var tooltipAssist = self.get('tooltipAssist');
	    var eventAssist = self.get('eventAssist');
	    var container = self.get('container');
	    var graphContainer = self.get('graphContainer');

	    this._pluginDestroy();
	    container && container.removeChild(graphContainer);
	    eventAssist && eventAssist.destroy();
	    gridAssist && gridAssist.destroy();
	    tooltipAssist && tooltipAssist.destroy();
	    guideAssist && guideAssist.destroy();
	    canvas && canvas.destroy();
	    Graph.superclass.destroy.call(this);
	    window.removeEventListener('resize', Util.getWrapBehavior(this, '_initForceFitEvent'));
	  },

	  /**
	   * 根据节点或者边
	   * @param  {String} id 节点或者边的id
	   * @return {Object} 找到的节点或者边
	   */
	  find: function find(id) {
	    var self = this;
	    var itemCache = self.get('itemCache');
	    return itemCache[id];
	  },

	  /**
	   * 快照
	   * @return {String} base64 图片url
	   */
	  snapshot: function snapshot() {
	    var canvas = this.get('canvas');
	    var el = canvas.get('el');
	    return el.toDataURL('image/png');
	  },

	  /**
	   * 导出图片功能
	   * @param  {String} name 文件名字
	   * @return {Object} 自身
	   */
	  downloadImage: function downloadImage(name) {
	    var dataURL = this.snapshot();
	    var link = document.createElement('a');
	    var saveName = name ? name : 'chart.png';
	    link.download = saveName;
	    link.href = dataURL.replace('image/png', 'image/octet-stream');
	    link.click();
	    return this;
	  },

	  /**
	   * 显示锚点
	   * @param {Object}  node 节点
	   * @return {Object} self
	   */
	  showAnchor: function showAnchor(node) {
	    node.showAnchor();
	    this.refreshFront();
	    return this;
	  },

	  /**
	   * 隐藏锚点
	   * @param {Object} node 节点
	   * @return {Object} self
	   */
	  hideAnchor: function hideAnchor(node) {
	    node.hideAnchor();
	    this.refreshFront();
	    return this;
	  },

	  /**
	   * 设置捕获
	   * @param {Boolean} bool 开关
	   */
	  setCapture: function setCapture(bool) {
	    var rootGroup = this.get('rootGroup');
	    var frontCanvasRootGroup = this.get('frontCanvasRootGroup');
	    rootGroup.set('capture', bool);
	    frontCanvasRootGroup.set('capture', bool);
	  },

	  /**
	   * 更新锚点
	   * @param {Object}  node          节点
	   * @param {Object}  anchorIndex   目标锚点索引
	   * @param {Object}  cfg           配置项
	   * @return {Object} self
	   */
	  updateAnchor: function updateAnchor(node, anchorIndex, cfg) {
	    node.updateAnchor(anchorIndex, cfg);
	    this.refreshFront();
	    return this;
	  },

	  /**
	   * 设置锚点激活状态
	   * @param {G.Shape} shape 锚点形
	   * @return {Object} self
	   */
	  setAnchorActived: function setAnchorActived(shape) {
	    var hoverStyle = shape.get('hoverStyle');
	    shape.attr(hoverStyle);
	    this.refreshFront();
	    return this;
	  },

	  /**
	   * 取消锚点激活状态
	   * @param {G.Shape} shape 锚点形
	   * @return {Object} self
	   */
	  setAnchorUnActived: function setAnchorUnActived(shape) {
	    var style = shape.get('attrs');
	    shape.attr(style);
	    this.refreshFront();
	    return this;
	  },

	  /**
	   * 判断该 子项 是否还在 图 中
	   * @param {Item} item 子项
	   * @return {Boolean} rst
	   */
	  isInGraph: function isInGraph(item) {
	    var itemCache = this.get('itemCache');
	    var rst = false;
	    Util.each(itemCache, function (v) {
	      if (v === item) {
	        rst = true;
	      }
	    });
	    return rst;
	  },
	  _initCfg: function _initCfg() {},

	  // 初始化编辑
	  _initEditor: function _initEditor() {},

	  // 读取图数据
	  _readSource: function _readSource() {},

	  // 保存图数据
	  _saveSource: function _saveSource() {},

	  /**
	   * 更新节点或者边
	   * @param  {Object} item 节点或者边
	   * @param  {Object} obj  数据模型
	   */
	  update: function update() {},

	  /**
	   * 删除节点或者边
	   * @param  {Object} item 节点或者边
	   */
	  remove: function remove() {},

	  /**
	   * 加载数据
	   */
	  source: function source() {},

	  /**
	   * 增加子项
	   */
	  add: function add() {}
	});

	module.exports = Graph;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 边
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var Item = __webpack_require__(27);
	var Edge = function Edge(cfg) {
	  Edge.superclass.constructor.call(this, cfg);
	  this._initEnds();
	};

	Edge.ATTRS = {

	  type: 'edge',

	  /**
	   * 形状控制点
	   * @type {Array}
	   */
	  controlPoints: [null, null],

	  /**
	   * 边起的节点
	   * @type {Node}
	   */
	  source: null,

	  /**
	   * 结束的节点
	   * @type {Node}
	   */
	  target: null,

	  /**
	   * 起始的锚点的索引
	   * @type {Node}
	   */
	  sourceAnchor: null,

	  /**
	   * 结束的锚点的索引
	   * @type {Node}
	   */
	  targetAnchor: null,

	  /**
	   * 是否使用锚点
	   * @type {Boolean}
	   */
	  useAnchor: true
	};

	Util.extend(Edge, Item);

	Util.augment(Edge, {
	  // 初始化端点
	  _initEnds: function _initEnds() {
	    var self = this;
	    var source = self.get('source');
	    var target = self.get('target');
	    source && source.addEdge(self);
	    target && target.addEdge(self);
	  },

	  // 获取端点连接点
	  _getEdgePoints: function _getEdgePoints() {
	    var self = this;
	    var model = self.get('model');
	    var source = self.get('source');
	    var target = self.get('target');
	    var useAnchor = self.get('useAnchor');
	    var graph = self.get('graph');
	    var controlPoints = self.getControlPoints();
	    var sourceAnchor = model.sourceAnchor; // self.get('sourceAnchor');
	    var targetAnchor = model.targetAnchor; // self.get('targetAnchor');
	    var sourceCenter = source.getCenter();
	    var targetCenter = target ? target.getCenter() : source.getCenter();
	    var length = controlPoints.length;
	    var shapeCfg = self.getShapeCfg();
	    var shapeManger = self.get('shapeManger');
	    var firstIndex = 0;
	    var lastIndex = length - 1;
	    var preciseAnchor = graph.get('preciseAnchor');
	    var path = void 0;

	    if (!useAnchor) {
	      controlPoints[0] = {
	        x: sourceCenter.x,
	        y: sourceCenter.y
	      };
	      controlPoints[lastIndex] = {
	        x: targetCenter.x,
	        y: targetCenter.y
	      };
	      return controlPoints;
	    }

	    // 防止null存入数据模型
	    if (sourceAnchor === null) {
	      delete model.sourceAnchor;
	    }

	    // 防止null存入数据模型
	    if (targetAnchor === null) {
	      delete model.targetAnchor;
	    }

	    // 如果锚点配置信息存在，则连接到锚点
	    if (Util.isNumber(sourceAnchor) && source) {
	      sourceAnchor = source.getAnchor(sourceAnchor);
	    }

	    if (Util.isNumber(targetAnchor) && target) {
	      targetAnchor = target.getAnchor(targetAnchor);
	    }

	    // 自动计算锚点
	    if (length > 2) {
	      if (source && !sourceAnchor) {
	        sourceAnchor = source.getAnchor(controlPoints[firstIndex + 1]);
	      }
	      if (target && !targetAnchor) {
	        targetAnchor = target.getAnchor(controlPoints[lastIndex - 1]);
	      }
	    } else {
	      path = preciseAnchor && shapeManger.getPath(shapeCfg.shape, [sourceCenter, targetCenter]);
	      if (source && !sourceAnchor) {
	        if (path) {
	          // 能获取到path则根据path进行锚点截取
	          sourceAnchor = source.getAnchor(path);
	        } else {
	          // 不能获取到path则根据中心点center进行锚点截取
	          sourceAnchor = source.getAnchor(targetCenter);
	        }
	      }
	      if (target && !targetAnchor) {
	        if (path) {
	          // 能获取到path则根据path进行锚点截取
	          targetAnchor = target.getAnchor(path);
	        } else {
	          // 不能获取到path则根据中心点center进行锚点截取
	          targetAnchor = target.getAnchor(sourceCenter);
	        }
	      }
	    }

	    controlPoints[0] = {
	      x: sourceAnchor.x,
	      y: sourceAnchor.y
	    };
	    controlPoints[lastIndex] = {
	      x: targetAnchor.x,
	      y: targetAnchor.y
	    };
	    return controlPoints;
	  },

	  /**
	   * 绘制之前执行
	   */
	  beforeDraw: function beforeDraw() {
	    Edge.superclass.beforeDraw.call(this);
	    var shapeCfg = this.getShapeCfg();
	    var group = this.get('group');
	    shapeCfg.points = this._getEdgePoints();
	    shapeCfg.target = this.get('target');
	    shapeCfg.source = this.get('source');
	    group.set('controlPoints', this.get('controlPoints'));
	  },

	  /**
	   * 获取控制点 优先获取数据模型的控制点
	   * @return {Array} rst
	   */
	  getControlPoints: function getControlPoints() {
	    var model = this.get('model');
	    var rst = model.controlPoints ? model.controlPoints : this.get('controlPoints');
	    return rst;
	  },

	  /**
	   * 添加控制点
	   * @param  {Object} point 输入点
	   * @return {Number} 添加的控制点的索引
	   */
	  addControlPoint: function addControlPoint(point) {
	    var controlPoints = this.getControlPoints();
	    var minDis = Infinity;
	    var minIndex = void 0;
	    var p2 = void 0;
	    var dis = void 0;

	    Util.each(controlPoints, function (p1, i) {
	      p2 = controlPoints[i + 1];
	      if (p2) {
	        dis = Util.segmentDistance(p1, p2, point);
	        if (dis < 1) {
	          minIndex = i;
	          return false;
	        }
	        if (dis < minDis) {
	          minDis = dis;
	          minIndex = i;
	        }
	      }
	    });
	    controlPoints.splice(minIndex + 1, 0, point);
	    return minIndex;
	  },

	  /**
	   * 获取委托对象的path
	   * @param  {Object} pointInfo 点信息
	   * @return {Array}  path      路径
	   */
	  getDelegationPath: function getDelegationPath(pointInfo) {
	    var self = this;
	    var controlPoints = self.getControlPoints();
	    var index = pointInfo.controlPointIndex;
	    var lastPoint = controlPoints[index - 1];
	    var nextPoint = controlPoints[index + 1];
	    var points = [{
	      x: pointInfo.x,
	      y: pointInfo.y
	    }];
	    if (lastPoint) points.unshift(lastPoint);
	    if (nextPoint) points.push(nextPoint);
	    var path = Util.pointsToPolygon(points);
	    return path;
	  },

	  /**
	   * 销毁边和节点内部元素
	   * @protected
	   */
	  destroyItem: function destroyItem() {
	    var self = this;
	    var source = self.get('source');
	    source && !source.destroyed && source.removeEdge(self);
	    var target = self.get('target');
	    target && !target.destroyed && target.removeEdge(self);
	  },

	  /**
	   * 判断是否是端点
	   * @param  {Object|Index} point 输入点或索引
	   * @return {Number}       index 索引
	   */
	  isExtremePoint: function isExtremePoint(point) {
	    var controlPoints = this.getControlPoints();
	    var index = void 0;
	    if (Util.isObject(point)) {
	      index = controlPoints.indexOf(point);
	    }
	    if (Util.isNumber(point)) {
	      index = point;
	    }
	    return index === 0 || index === controlPoints.length - 1;
	  },

	  /**
	   * 判断是否是起始点
	   * @param  {Object|Index} point 输入点或索引
	   * @return {Number}       index 索引
	   */
	  isSourcePoint: function isSourcePoint(point) {
	    var controlPoints = this.getControlPoints();
	    var index = void 0;
	    if (Util.isObject(point)) {
	      index = controlPoints.indexOf(point);
	    }
	    if (Util.isNumber(point)) {
	      index = point;
	    }
	    return index === 0;
	  },

	  /**
	   * 判断是否是终止点
	   * @param  {Object|Index} point 输入点或索引
	   * @return {Number}       index 索引
	   */
	  isTargetPoint: function isTargetPoint(point) {
	    var controlPoints = this.getControlPoints();
	    var index = void 0;
	    if (Util.isObject(point)) {
	      index = controlPoints.indexOf(point);
	    }
	    if (Util.isNumber(point)) {
	      index = point;
	    }
	    return index === controlPoints.length - 1;
	  },
	  showAble: function showAble() {
	    var source = this.get('source');
	    var target = this.get('target');
	    return source.isVisible() && target.isVisible();
	  },

	  /**
	   *
	   * 显示
	   */
	  show: function show() {
	    if (this.showAble()) {
	      this._show();
	    }
	  },

	  /**
	   * 隐藏
	   */
	  hide: function hide() {
	    this._hide();
	  }
	});

	module.exports = Edge;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var Item = __webpack_require__(27);
	var Global = __webpack_require__(7);

	var Node = function Node(cfg) {
	  Node.superclass.constructor.call(this, cfg);
	};

	Node.ATTRS = {
	  /**
	   * 类型
	   * @type {String}
	   */
	  type: 'node',

	  /**
	   * 锚点的位置，默认4个点,每个点是一个数组，[index,percent]
	   * index是节点的bbox的第几条边，percent是在这条边的位置,如果不设置的话，自动读取定义图形中的锚点信息
	   * @type {Array}
	   */
	  // anchorPersentPoints: null,

	  /**
	   * 锚点集
	   * @type {Array}
	   */
	  anchorPoints: null,

	  /**
	   * 边集
	   * @type {Array}
	   */
	  edges: [],

	  /**
	   * 锚点所在组
	   * @type {Canvas.Group}
	   */
	  anchorGroup: null,

	  /**
	   * 包围盒缓存 减少bbox的计算
	   * @type {Object}
	   */
	  boxStash: null,

	  /**
	   * 是否使用锚点
	   * @type {Boolean}
	   */
	  useAnchor: true
	};

	Util.extend(Node, Item);

	Util.augment(Node, {
	  // 计算锚点
	  calculateAnchorPoints: function calculateAnchorPoints(bbox) {
	    var self = this;
	    var useAnchor = self.get('useAnchor');
	    if (!useAnchor) {
	      return;
	    }
	    var shapeManger = self.get('shapeManger');
	    var cfg = self.getShapeCfg();
	    var anchorPersentPoints = shapeManger.getAnchorPoints(cfg.shape, cfg, self.get('group'));
	    if (!Util.isArray(anchorPersentPoints)) {
	      return anchorPersentPoints;
	    }
	    bbox = bbox ? bbox : self.getBBox();
	    var anchorPoints = [];
	    Util.each(anchorPersentPoints, function (pointArr) {
	      var anchorPoint = Util.mix({}, {
	        x: bbox.minX + pointArr[0] * bbox.width,
	        y: bbox.minY + pointArr[1] * bbox.height
	      }, pointArr[2]);
	      anchorPoints.push(anchorPoint);
	    });
	    return anchorPoints;
	  },

	  // 计算锚点
	  _calculateAnchorPoints: function _calculateAnchorPoints() {
	    var anchorPoints = this.calculateAnchorPoints();
	    this.set('anchorPoints', anchorPoints);
	    return anchorPoints;
	  },
	  hideBox: function hideBox() {
	    var activedRectGroup = this.get('activedRectGroup');
	    activedRectGroup && activedRectGroup.remove();
	  },

	  // 显示外轮廓
	  showBox: function showBox() {
	    var bbox = this.getBBox();
	    var keyShape = this.getKeyShape();
	    var lineWidth = keyShape.attr('lineWidth');
	    var activedRectRootGroup = this.get('activedRectRootGroup');
	    var activedRectGroup = this.get('activedRectGroup');
	    activedRectGroup && activedRectGroup.remove();
	    activedRectGroup = activedRectRootGroup.addGroup({
	      zIndex: Global.zIndex.activedNodeRect,
	      id: this.get('id')
	    });
	    this.set('activedRectGroup', activedRectGroup);
	    lineWidth = Util.isNumber(lineWidth) ? lineWidth : 0;
	    activedRectGroup.addShape('rect', {
	      attrs: Util.mix({
	        x: bbox.x + lineWidth / 2,
	        y: bbox.y + lineWidth / 2,
	        width: bbox.width - lineWidth,
	        height: bbox.height - lineWidth
	      }, Global.nodeActivedBoxStyle, Global.nodeAcitvedBoxStyle) // TODO 1.3.0 删除错误配置
	    });
	  },

	  /**
	   * 获取锚点画布坐标
	   * @return {Array} anchorPoints 锚点集
	   */
	  getAnchorPoints: function getAnchorPoints() {
	    var anchorPoints = this.get('anchorPoints');
	    return anchorPoints || this._calculateAnchorPoints();
	  },

	  /**
	   * 设置图形的激活状态
	   * @param {Boolean} actived 是否激活
	   */
	  setActiveStatus: function setActiveStatus(actived) {
	    var _this = this;

	    Node.superclass.setActiveStatus.call(this, actived, function () {
	      _this.showBox();
	    }, function () {
	      _this.hideBox();
	    });
	  },

	  /**
	   * 获取中心
	   * @return {Object} point 中心
	   */
	  getCenter: function getCenter() {
	    var bbox = this.getBBox();
	    return {
	      x: bbox.centerX,
	      y: bbox.centerY
	    };
	  },

	  /**
	   * 获取位置
	   * @return {Object} point 位置
	   */
	  getPosition: function getPosition() {
	    var model = this.get('model');
	    return {
	      x: model.x,
	      y: model.y
	    };
	  },

	  /**
	   * 获取锚点
	   * @param {Number|Object|Array} param 输入是一个点则返回该点对应的锚点；输入是数字则视作锚点索引返回
	   * @return {Object} point 锚点
	   */
	  getAnchor: function getAnchor(param) {
	    var center = this.getCenter();
	    var anchorPoints = this.getAnchorPoints();
	    var interPoint = void 0;

	    if (Util.isNumber(param) && Util.isArray(anchorPoints)) {
	      return this.getAnchorByIndex(param);
	    }
	    if (Util.isObject(param)) {
	      interPoint = this.getIntersectionByPoint(param);
	    }
	    if (Util.isArray(param) || Util.isString(param)) {
	      interPoint = this.getIntersectionByPath(param);
	    }

	    if (interPoint) {
	      if (anchorPoints === 'auto') {
	        return interPoint;
	      }
	      if (Util.isArray(anchorPoints)) {
	        return Util.getSnapAnchor(this, interPoint);
	      }
	    }
	    return center;
	  },

	  /**
	   * 根据点获取截取点
	   * @param {Object} point 点
	   * @return {Object} interPoint 交点
	   */
	  getIntersectionByPoint: function getIntersectionByPoint(point) {
	    var bbox = this.getBBox();
	    var interPoint = Util.getRectIntersect(bbox, point);
	    return interPoint;
	  },
	  getRootKeyShapePath: function getRootKeyShapePath() {
	    var graph = this.get('graph');
	    var keyShape = this.getKeyShape();
	    var keyShapePath = Util.clone(keyShape.attr('path'));
	    var group = this.getGroup();
	    var rootGroup = graph.get('rootGroup');
	    keyShapePath = Util.pathToAbsolute(keyShapePath);
	    Util.each(keyShapePath, function (pathArr) {
	      var point = void 0;
	      if (pathArr[0] === 'a' || pathArr[0] === 'A') {
	        point = {
	          x: pathArr[6],
	          y: pathArr[7]
	        };
	        point = Util.applyPoint(point, group, rootGroup);
	        pathArr[6] = point.x;
	        pathArr[7] = point.y;
	      } else {
	        for (var i = 1; i < pathArr.length; i += 2) {
	          point = {
	            x: pathArr[i],
	            y: pathArr[i + 1]
	          };
	          point = Util.applyPoint(point, group, rootGroup);
	          pathArr[i] = point.x;
	          pathArr[i + 1] = point.y;
	        }
	      }
	    });
	    return keyShapePath;
	  },

	  /**
	   * 根据路径获取锚点
	   * @param {Array} path 路径
	   * @return {Object} interPoint 交点
	   */
	  getIntersectionByPath: function getIntersectionByPath(path) {
	    var keyShapePath = this.getRootKeyShapePath();
	    var intersect = Util.pathIntersection(path, keyShapePath)[0];
	    if (!intersect) {
	      var bbox = this.getBBox();
	      var rectPath = Util.getRectPath(bbox.x, bbox.y, bbox.width, bbox.height);
	      intersect = Util.pathIntersection(path, rectPath)[0];
	    }
	    return intersect;
	  },

	  /**
	   * 根据索引获取锚点
	   * @param {Number} index 索引
	   * @return {Object} rst 锚点
	   */
	  getAnchorByIndex: function getAnchorByIndex(index) {
	    var anchorPoints = this.getAnchorPoints();
	    return anchorPoints[index];
	  },

	  /**
	   * 获取控制点
	   * @public
	   * @return {Array} points 空一点
	   */
	  getControlPoints: function getControlPoints() {
	    var self = this;
	    var rect = self.getBBox();
	    var points = [];
	    points.push({
	      x: rect.x,
	      y: rect.y
	    });
	    points.push({
	      x: rect.maxX,
	      y: rect.y
	    });
	    points.push({
	      x: rect.maxX,
	      y: rect.maxY
	    });
	    points.push({
	      x: rect.x,
	      y: rect.maxY
	    });
	    return points;
	  },

	  /**
	   * 获取委托对象的path
	   * @param  {Object} pointInfo 点信息
	   * @return {Array}  path 路径
	   */
	  getDelegationPath: function getDelegationPath(pointInfo) {
	    var self = this;
	    var bbox = self.getBBox();
	    var toX = pointInfo.x;
	    var toY = pointInfo.y;
	    var size = pointInfo.size;
	    var width = bbox.width;
	    var height = bbox.height;

	    if (size) {
	      width = size[0];
	      height = size[1];
	    }
	    var path = [];
	    path.push(['M', toX - width / 2, toY - height / 2]); // 左上角
	    path.push(['L', toX + width / 2, toY - height / 2]);
	    path.push(['L', toX + width / 2, toY + height / 2]);
	    path.push(['L', toX - width / 2, toY + height / 2]);
	    path.push(['Z']);
	    return path;
	  },

	  /**
	   * 增加边
	   * @param {Edge} edge 边
	   */
	  addEdge: function addEdge(edge) {
	    this.get('edges').push(edge);
	  },

	  /**
	   * 移除边
	   * @param  {Edge} edge 边
	   */
	  removeEdge: function removeEdge(edge) {
	    Util.remove(this.get('edges'), edge);
	  },

	  /**
	   * 显示锚点
	   */
	  showAnchor: function showAnchor() {
	    var self = this;
	    var canvasAnchorPoints = self.getAnchorPoints();
	    var anchorPoints = self.get('anchorPoints');
	    var anchorPointRootGroup = self.get('anchorPointRootGroup');
	    var anchorGroup = self.get('anchorGroup');

	    anchorGroup && anchorGroup.remove(true);
	    anchorGroup = anchorPointRootGroup.addGroup({
	      zIndex: Global.zIndex.anchorPoint,
	      id: self.get('id')
	    });
	    Util.each(canvasAnchorPoints, function (point, index) {
	      anchorGroup.addShape('circle', {
	        class: 'anchor-point',
	        item: self,
	        point: point,
	        index: index,
	        anchorPoint: anchorPoints[index],
	        freezePoint: point,
	        linkable: point.linkable,
	        hoverStyle: Util.mix({}, Global.anchorPointHoverStyle, point.hoverStyle),
	        attrs: Util.mix({
	          x: point.x,
	          y: point.y
	        }, Global.anchorPointStyle, point.style)
	      });
	    });
	    this.set('anchorGroup', anchorGroup);
	  },

	  /**
	   * 隐藏锚点
	   */
	  hideAnchor: function hideAnchor() {
	    var anchorGroup = this.get('anchorGroup');
	    anchorGroup && anchorGroup.remove(true);
	    this.set('anchorGroup', null);
	  },

	  /**
	   * 更新锚点
	   * @param {Number} anchorIndex 锚点索引
	   * @param {Object} cfg         配置项
	   */
	  updateAnchor: function updateAnchor(anchorIndex, cfg) {
	    var anchorPoints = this.getAnchorPoints();
	    var anchorPoint = anchorPoints[anchorIndex];
	    if (anchorPoint) {
	      Util.mix(anchorPoint, cfg);
	    }
	    this.showAnchor();
	  },

	  /**
	   * 绘制前执行
	   */
	  beforeDraw: function beforeDraw() {
	    Node.superclass.beforeDraw.call(this);
	    var graph = this.get('graph');
	    var group = this.get('group');
	    var cfg = this.getShapeCfg();
	    group.initTransform();
	    if (graph && Util.isFunction(graph.beforeNodeDraw)) {
	      graph.beforeNodeDraw(this);
	    }
	    if (!cfg.shape) {
	      cfg.shape = graph.get('defaultNodeShape');
	    }
	    group.translate(cfg.x, cfg.y);
	    cfg.x = 0;
	    cfg.y = 0;
	  },

	  /**
	   * 绘制后执行
	   */
	  afterDraw: function afterDraw() {
	    var graph = this.get('graph');
	    var shapeObj = this.getShapeObj();
	    if (graph && Util.isFunction(graph.afterNodeDraw)) {
	      graph.afterNodeDraw(this);
	    }
	    this._calculateBBox();
	    // TODO 临时解决 将注册的 shape 的 class 设置到 item 上
	    if (shapeObj && shapeObj.class) {
	      this.set('class', shapeObj.class);
	    }
	    this._calculateAnchorPoints();
	    Node.superclass.afterDraw.call(this);
	  },

	  /**
	   * 显示
	   */
	  show: function show() {
	    var edges = this.get('edges');
	    var edge = void 0;
	    for (var i = 0; i < edges.length; i++) {
	      edge = edges[i];
	      if (!edge.isVisible() && edge.showAble()) {
	        edge._show();
	      }
	    }
	    this._show();
	  },

	  /**
	   * 隐藏
	   */
	  hide: function hide() {
	    var edges = this.get('edges');
	    var edge = void 0;
	    for (var i = 0; i < edges.length; i++) {
	      edge = edges[i];
	      if (edge.isVisible()) {
	        edge._hide();
	      }
	    }
	    this._hide();
	  },

	  /**
	   * 获取有连接的子项
	   * @return {Array} rst 结果集合
	   */
	  getLinkNodes: function getLinkNodes() {
	    var self = this;
	    var graph = self.get('graph');
	    var edges = self.get('edges');
	    var itemCache = graph.get('itemCache');
	    var rst = [];
	    var model = void 0;
	    var target = void 0;
	    var source = void 0;

	    Util.each(edges, function (v) {
	      model = v.get('model');
	      target = itemCache[model.target];
	      source = itemCache[model.source];
	      if (rst.indexOf(target) === -1 && target !== self) {
	        rst.push(target);
	      }
	      if (rst.indexOf(source) === -1 && source !== self) {
	        rst.push(source);
	      }
	    });
	    return rst;
	  },

	  /**
	   * 获取无连接的子项
	   * @return {Array} rst 结果集合
	   */
	  getUnLinkNodes: function getUnLinkNodes() {
	    var id = this.get('id');
	    var linkNodes = this.getLinkNodes();
	    var graph = this.get('graph');
	    var itemCache = graph.get('itemCache');
	    var rst = [];

	    Util.each(itemCache, function (v) {
	      if (v.get('type') === 'node') {
	        if (linkNodes.indexOf(v) === -1 && v.get('id') !== id) {
	          rst.push(v);
	        }
	      }
	    });
	    return rst;
	  },

	  /**
	   * 获取来源的子项
	   * @return {Array} rst 结果集合
	   */
	  getSourceItems: function getSourceItems() {
	    var id = this.get('id');
	    return this.getRelativeItems(function (edge) {
	      var model = edge.getModel();
	      if (model.target !== id) {
	        return false;
	      }
	      return true;
	    });
	  },

	  /**
	   * 获取去向的子项
	   * @return {Array} rst 结果集合
	   */
	  getTargetItems: function getTargetItems() {
	    var id = this.get('id');
	    return this.getRelativeItems(function (edge) {
	      var model = edge.getModel();
	      if (model.source !== id) {
	        return false;
	      }
	      return true;
	    });
	  },

	  /**
	   * 获取有关联的子项
	   * @param  {Function} filter 过滤器
	   * @return {Array} rst 结果集合
	   */
	  getRelativeItems: function getRelativeItems(filter) {
	    var self = this;
	    var id = self.get('id');
	    var graph = self.get('graph');
	    var edges = self.get('edges');
	    var itemCache = graph.get('itemCache');
	    var rst = [];
	    var target = void 0;
	    var source = void 0;
	    var model = void 0;
	    if (filter) {
	      edges = Util.filter(edges, filter);
	    }
	    rst = rst.concat(edges);
	    Util.each(edges, function (v) {
	      model = v.get('model');
	      target = itemCache[model.target];
	      source = itemCache[model.source];
	      if (rst.indexOf(target) === -1 && target.get('id') !== id) {
	        rst.push(target);
	      }
	      if (rst.indexOf(source) === -1 && source.get('id') !== id) {
	        rst.push(source);
	      }
	    });

	    return rst;
	  },

	  /**
	   * 获取边
	   * @return {Array} rst 结果
	   */
	  getEdges: function getEdges() {
	    return this.get('edges');
	  },

	  /**
	   * 获取无关联的子项
	   * @return {Array} rst 结果集合
	   */
	  getUnRelativeItems: function getUnRelativeItems() {
	    var id = this.get('id');
	    var graph = this.get('graph');
	    var itemCache = graph.get('itemCache');
	    var relativeItems = this.getRelativeItems();
	    var rst = [];

	    Util.each(itemCache, function (v) {
	      if (relativeItems.indexOf(v) === -1 && v.get('id') !== id) {
	        rst.push(v);
	      }
	    });
	    return rst;
	  },

	  /**
	   * 销毁
	   * @param {Boolean} bool 是否清空时图形对象是否销毁
	   */
	  destroy: function destroy(bool) {
	    var anchorGroup = this.get('anchorGroup');
	    var activedRectGroup = this.get('activedRectGroup');
	    anchorGroup && anchorGroup.remove();
	    activedRectGroup && activedRectGroup.remove();
	    Node.superclass.destroy.call(this, bool);
	  },

	  /**
	   * 更新位置
	   * @param {Array}  positionModel  节点数据
	   */
	  updatePosition: function updatePosition() {
	    var model = this.get('model');
	    var group = this.get('group');
	    group.initTransform();
	    group.translate(model.x, model.y);
	    this._calculateBBox();
	    this._calculateAnchorPoints();
	  }
	});

	module.exports = Node;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 完成属性映射
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Attr = function Attr(cfg) {
	  Util.mix(this, cfg);
	};

	Util.augment(Attr, {
	  /**
	   * 属性类型
	   * @type {String}
	   */
	  type: null,

	  /**
	   * 映射类型
	   * @type {String}
	   */
	  mappingType: 'auto',

	  /**
	   * 属性对应的字段名称
	   * @type {Array}
	   */
	  dims: null,

	  /**
	   * 回调函数
	   * @type {Function}
	   */
	  callback: null,

	  /**
	   * 获取属性映射的结果
	   * @param  {Object} obj 映射的对象
	   * @return {Number|String|Array} 映射结果
	   */
	  getValue: function getValue(obj) {
	    var dims = this.dims;
	    var callback = this.callback;
	    var mappingType = this.mappingType;
	    var values = null;
	    var value = null;
	    if (callback) {
	      if (mappingType === 'auto') {
	        var params = [];
	        Util.each(dims, function (dim) {
	          params.push(obj[dim]);
	        });
	        values = callback.apply(this, params);
	      } else {
	        values = callback.call(this, obj);
	      }
	    } else if (!dims) {
	      values = obj[this.type];
	    } else {
	      values = dims;
	    }
	    if (!Util.isArray(values)) {
	      values = [values];
	    }
	    if (values.length > 1) {
	      value = values;
	    } else {
	      value = values[0];
	    }
	    return value;
	  }
	});

	module.exports = Attr;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	  * @fileOverview 激活组
	  * @author dxq613@gmail.com
	  * @author huangtonger@aliyun.com
	  */

	var Util = __webpack_require__(4);
	var ActivedGroup = function ActivedGroup() {};

	Util.augment(ActivedGroup, {
	  /**
	   * @protected
	   * 是否激活
	   * @param  {Object} item 可以被激活的元素
	   * @return {Boolean} 是否激活状态
	   */
	  isItemActived: function isItemActived(item) {
	    return item.isActived();
	  },

	  /**
	   * @protected
	   * 设置激活状态
	   * @param {Object}  item    可以被激活的元素
	   * @param {Boolean} actived 是否激活
	   */
	  setItemActived: function setItemActived(item, actived) {
	    this.setItemsActived([item], actived);
	  },

	  /**
	   * @protected
	   * 设置激活状态
	   * @param {Array}   items   可以被激活的元素
	   * @param {Boolean} actived 是否激活
	   */
	  setItemsActived: function setItemsActived(items, actived) {
	    var _this = this;

	    if (items.length === 0) {
	      return;
	    }
	    if (actived !== false) {
	      Util.each(items, function (item) {
	        item.setActived();
	        _this.fire('itemactived', {
	          item: item
	        });
	      });
	    } else {
	      Util.each(items, function (item) {
	        item.clearActived();
	        _this.fire('itemunactived', {
	          item: item
	        });
	      });
	    }
	    this.refresh();
	  },

	  /**
	   * 获取激活的元素
	   * @return {Chart.Actived} 激活的元素
	   */
	  getActived: function getActived() {
	    var _this2 = this;

	    var items = this.getItems();
	    var rst = null;

	    Util.each(items, function (item) {
	      if (_this2.isItemActived(item)) {
	        rst = item;
	        return false;
	      }
	    });

	    return rst;
	  },

	  /**
	   * 获取所有的激活子项
	   * @return {Array} 结果集
	   */
	  getAllActived: function getAllActived() {
	    var _this3 = this;

	    var items = this.getItems();
	    var rst = [];

	    Util.each(items, function (item) {
	      if (_this3.isItemActived(item)) {
	        rst.push(item);
	      }
	    });

	    return rst;
	  },

	  /**
	   * 获取所有的激活子项
	   * @return {Array} 结果集
	   */
	  clearAllActived: function clearAllActived() {
	    var activedItems = this.getAllActived();
	    this.setItemsActived(activedItems, false);
	    return this;
	  }
	});

	module.exports = ActivedGroup;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 激活子项
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Actived = function Actived() {};

	Util.augment(Actived, {
	  /**
	   * @protected
	   * 设置图形的激活状态
	   * @param {Boolean} actived 是否激活
	   */
	  setActiveStatus: function setActiveStatus() {},

	  /**
	   * 是否处于激活状态
	   * @return {Boolean} 激活状态
	   */
	  isActived: function isActived() {
	    return this.get('actived');
	  },

	  /**
	   * 设置激活
	   */
	  setActived: function setActived() {
	    this.setActiveStatus(true);
	    this.set('actived', true);
	  },

	  /**
	   * 清除激活
	   */
	  clearActived: function clearActived() {
	    this.setActiveStatus(false);
	    this.set('actived', false);
	  }
	});

	module.exports = Actived;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 过滤接口
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);

	var Mixin = function Mixin() {};

	Mixin.ATTRS = {
	  nodeFilters: [],
	  edgeFilters: []
	};

	Util.augment(Mixin, {
	  _addFilter: function _addFilter(type, callback) {
	    var filters = this.get(type + 'Filters');
	    filters.push(callback);
	  },
	  _removeFilter: function _removeFilter(type, callback) {
	    var filters = this.get(type + 'Filters');
	    this.set(type + 'Filters', Util.filter(filters, function (filter) {
	      return callback !== filter;
	    }));
	  },
	  _filter: function _filter(type) {
	    var _this = this;

	    var filters = this.get(type + 'Filters');
	    var itemsModels = this.get(type + 's');
	    var item = void 0;
	    var bool = void 0;
	    Util.each(itemsModels, function (model) {
	      item = _this.find(model.id);
	      bool = true;
	      Util.each(filters, function (callback) {
	        if (bool && !callback(model)) {
	          bool = false;
	        }
	      });
	      if (!bool) {
	        item.hide();
	      } else {
	        item.show();
	      }
	    });
	    this.fire('filter');
	  },
	  addNodeFilter: function addNodeFilter(callback) {
	    this._addFilter('node', callback);
	  },
	  addEdgeFilter: function addEdgeFilter(callback) {
	    this._addFilter('edge', callback);
	  },
	  removeNodeFilter: function removeNodeFilter(callback) {
	    this._removeFilter('node', callback);
	  },
	  removeEdgeFilter: function removeEdgeFilter(callback) {
	    this._removeFilter('edge', callback);
	  },
	  filterNode: function filterNode() {
	    this._filter('node');
	  },
	  filterEdge: function filterEdge() {
	    this._filter('edge');
	  },
	  filter: function filter(type) {
	    switch (type) {
	      case 'node':
	        this.filterNode();
	        break;
	      case 'edge':
	        this.filterEdge();
	        break;
	      default:
	        this.filterNode();
	        this.filterEdge();
	        break;
	    }
	    this.draw(false);
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 视口适应方法
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Matrix = __webpack_require__(3);
	var Global = __webpack_require__(7);
	var Matrix3 = Matrix.Matrix3;

	var Mixin = function Mixin() {};

	Mixin.ATTRS = {
	  /**
	   * 视口自适应参数
	   * @type {String|Object}
	   */
	  fitView: null,

	  /**
	   * 自适应边距
	   * @type {String|Object}
	   */
	  fitViewPadding: Global.fitViewPadding
	};

	Util.augment(Mixin, {
	  /**
	   * 视口自适应
	   */
	  _fitView: function _fitView() {
	    var fitView = this.get('fitView');
	    var items = this.get('items');
	    if (Util.isString(fitView) && items.length > 0) {
	      this[fitView](false);
	    }
	    if (Util.isObject(fitView)) {
	      this.focusPoint(fitView, false);
	    }
	  },

	  /**
	   * 自动缩放
	   * @param {Number}  r       比率
	   * @param {Boolean} resize  是否要自动缩放画布
	   * @param {Object}  point   要缩放的点
	   */
	  _zoom: function _zoom(r, resize, point) {
	    var matrix = new Matrix3();
	    var width = this.get('width');
	    var height = this.get('height');
	    var minZoom = this.get('minZoom');
	    var box = this.getBBox();
	    var centerX = (box.maxX + box.minX) / 2;
	    var centerY = (box.maxY + box.minY) / 2;
	    var padding = this.get('fitViewPadding');
	    var x = centerX;
	    var y = centerY;

	    var bWidth = box.maxX - box.minX + padding * 2;
	    var bHeight = box.maxY - box.minY + padding * 2;
	    if (point) {
	      x = point.x;
	      y = point.y;
	    }
	    if (resize) {
	      width = bWidth;
	      height = bHeight;
	      this.changeSize(bWidth, bHeight);
	    }

	    if (!r) {
	      r = width / bWidth;
	      if (width / bWidth > height / bHeight) {
	        r = height / bHeight;
	      }
	    }

	    // 防止 没有节点 或者只有 一个节点时候 autoZoom 出错 或 放大尺度太大
	    if (!r || r < minZoom) {
	      r = minZoom;
	    }

	    matrix.translate(-x, -y);
	    matrix.scale(r, r);
	    matrix.translate(width / 2, height / 2);
	    this.updateMatrix(matrix);
	  },

	  /**
	   * 在某点缩放
	   * @param  {Number} x     x坐标
	   * @param  {Number} y     y坐标
	   * @param  {Number} r     缩放比率
	   */
	  zoomAt: function zoomAt(x, y, r) {
	    var matrix = new Matrix3();
	    matrix.translate(-x, -y);
	    matrix.scale(r, r);
	    matrix.translate(x, y);
	    this.updateMatrix(matrix);
	    this.draw();
	  },

	  /**
	   * 手工缩放
	   * @param  {Number}  r    缩放比率
	   * @param  {Boolean} bool 是否刷新底层画布 默认true
	   */
	  zoom: function zoom(r, bool) {
	    this._zoom(r);
	    if (bool !== false) {
	      this.draw();
	    }
	  },

	  /**
	   * 自动缩放
	   * @param  {Boolean} bool 是否刷新底层画布 默认true
	   */
	  autoZoom: function autoZoom(bool) {
	    this._zoom();
	    if (bool !== false) {
	      this.draw();
	    }
	  },

	  /**
	   * 重置缩放
	   * @param  {Boolean} bool 是否刷新底层画布 默认true
	   */
	  resetZoom: function resetZoom(bool) {
	    var matrix = new Matrix3();
	    this.updateMatrix(matrix);
	    if (bool !== false) {
	      this.draw();
	    }
	  },

	  /**
	   * 自动缩放画布
	   * @param  {Boolean} bool 是否刷新底层画布 默认true
	   */
	  autoSize: function autoSize(bool) {
	    this._zoom(undefined, true);
	    if (bool !== false) {
	      this.draw();
	    }
	  },
	  tl: function tl() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + padding, -box.minY + padding);
	    this.updateMatrix(matrix);
	  },
	  lc: function lc() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var padding = this.get('fitViewPadding');
	    var canvasHeight = this.get('height');
	    matrix.translate(-box.minX + padding, -box.minY + canvasHeight / 2 - box.height / 2);
	    this.updateMatrix(matrix);
	  },
	  bl: function bl() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var padding = this.get('fitViewPadding');
	    var canvasHeight = this.get('height');
	    matrix.translate(-box.minX + padding, -box.minY + canvasHeight - box.height - padding);
	    this.updateMatrix(matrix);
	  },
	  cc: function cc() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasHeight = this.get('height');
	    var canvasWidth = this.get('width');
	    matrix.translate(-box.minX + (canvasWidth - box.width) / 2, -box.minY + (canvasHeight - box.height) / 2);
	    this.updateMatrix(matrix);
	  },
	  tc: function tc() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasWidth = this.get('width');
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + (canvasWidth - box.width) / 2, -box.minY + padding);
	    this.updateMatrix(matrix);
	  },
	  tr: function tr() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasWidth = this.get('width');
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + canvasWidth - box.width - padding, -box.minY + padding);
	    this.updateMatrix(matrix);
	  },
	  rc: function rc() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasHeight = this.get('height');
	    var canvasWidth = this.get('width');
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + canvasWidth - box.width - padding, -box.minY + (canvasHeight - box.height) / 2);
	    this.updateMatrix(matrix);
	  },
	  br: function br() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasHeight = this.get('height');
	    var canvasWidth = this.get('width');
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + canvasWidth - box.width - padding, -box.minY + canvasHeight - box.height - padding);
	    this.updateMatrix(matrix);
	  },
	  bc: function bc() {
	    var box = this.getBBox();
	    var matrix = new Matrix3();
	    var canvasHeight = this.get('height');
	    var canvasWidth = this.get('width');
	    var padding = this.get('fitViewPadding');
	    matrix.translate(-box.minX + (canvasWidth - box.width) / 2, -box.minY + canvasHeight - box.height - padding);
	    this.updateMatrix(matrix);
	  },

	  /**
	   * 聚焦某点
	   * @param  {Object} point 点
	   * @param  {Boolean} bool 是否刷新底层画布 默认true
	   */
	  focusPoint: function focusPoint(point, bool) {
	    this._zoom(1, undefined, point);
	    if (bool !== false) {
	      this.draw();
	    }
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 图工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);

	var Mixin = function Mixin() {};

	Util.augment(Mixin, {
	  /**
	   * 判断子项是否是节点
	   * @param {Object} item 子项
	   * @return {Boolean}
	   */
	  isNode: Util.isNode,
	  /**
	   * 判断子项是否是边
	   * @param {Object} item 子项
	   * @return {Boolean}
	   */
	  isEdge: Util.isEdge,
	  /**
	   * 查询子项集
	   * @param  {Function} callback 回调函数
	   * @return {Array}    rst      结果
	   */
	  getItemsBy: function getItemsBy(callback) {
	    var itemCache = this.get('itemCache');
	    var rst = [];
	    Util.each(itemCache, function (item) {
	      if (callback(item)) {
	        rst.push(item);
	      }
	    });
	    return rst;
	  },

	  /**
	   * 获取节点
	   * @param  {Function} callback 回调函数
	   * @return {Array} 结果集
	   */
	  getNodes: function getNodes(callback) {
	    if (callback) {
	      var rst = [];
	      this.getItemsBy(function (item) {
	        if (Util.isNode(item)) {
	          rst.push(callback(item));
	        }
	      });
	      return rst;
	    }
	    return this.getItemsBy(function (item) {
	      return Util.isNode(item);
	    });
	  },

	  /**
	   * 获取边
	   * @param  {Function} callback 回调函数
	   * @return {Array} 结果集
	   */
	  getEdges: function getEdges(callback) {
	    if (callback) {
	      var rst = [];
	      this.getItemsBy(function (item) {
	        if (Util.isEdge(item)) {
	          rst.push(callback(item));
	        }
	      });
	      return rst;
	    }
	    return this.getItemsBy(function (item) {
	      return Util.isEdge(item);
	    });
	  },

	  /**
	   * 获取激活子项
	   * @return {Array} 结果集
	   */
	  getItems: function getItems() {
	    var itemCache = this.get('itemCache');
	    return Util.objectToValues(itemCache);
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 布局机制
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Mixin = function Mixin() {};
	Mixin.ATTRS = {
	  /**
	   * 布局构造函数
	   * @type {Function}
	   */
	  layoutFn: null,

	  /**
	    * 布局配置项
	    * @type {Object}
	    */
	  layoutCfg: null,

	  /**
	   * 布局对象
	   * @type {Object}
	   */
	  layout: null
	};
	Util.augment(Mixin, {
	  // 初始化布局对象
	  _initLayout: function _initLayout() {
	    var layoutFn = this.get('layoutFn');
	    var layoutCfg = this.get('layoutCfg');
	    var layout = this.get('layout');
	    if (!layout && layoutFn && layoutCfg) {
	      layout = new layoutFn(layoutCfg);
	      this.set('layout', layout);
	    }
	  },

	  /**
	   * 布局
	   */
	  layout: function layout() {},

	  // 设置节点尺寸
	  _setNodeSize: function _setNodeSize() {
	    var nodes = this.get('nodes');
	    var itemCache = this.get('itemCache');
	    Util.each(nodes, function (node) {
	      var nodeItem = itemCache[node.id];
	      var bbox = nodeItem.getBBox();
	      // 如果没有设置宽则用包围盒宽
	      node.width = bbox.width;
	      // 如果没有设置高则用包围盒高
	      node.height = bbox.height;
	    });
	  },
	  _setEdgeSize: function _setEdgeSize() {
	    var edges = this.get('edges');
	    var itemCache = this.get('itemCache');
	    Util.each(edges, function (edge) {
	      var edgeItem = itemCache[edge.id];
	      var keyShape = edgeItem.getKeyShape();
	      // 如果没有设置线宽则用关键形线宽
	      if (!Util.isNumber(edge.lineWidth)) {
	        edge.lineWidth = keyShape.attr('lineWidth');
	      }
	    });
	  },

	  // 进行进行布局
	  _doLayout: function _doLayout() {
	    var layout = this.get('layout');
	    if (!layout) {
	      return;
	    }
	    this._setNodeSize();
	    this._setEdgeSize();
	    this.layout();
	  },

	  /**
	   * 不清除映射规则，重新加载数据
	   * @param {Object} layout 布局对象
	   */
	  changeLayout: function changeLayout() /* layout */{}
	});

	module.exports = Mixin;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 模态机制
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Mixin = function Mixin() {};
	Mixin.ATTRS = {
	  modalItems: []
	};
	Util.augment(Mixin, {
	  _initModal: function _initModal() {},
	  _updateModalRect: function _updateModalRect() {
	    var modalRect = this.get('modalRect');
	    var width = this.get('width');
	    var height = this.get('height');
	    modalRect.attr({
	      x: 0,
	      y: 0,
	      width: width,
	      height: height
	    });
	  },
	  showModal: function showModal() {
	    var modalGroup = this.get('modalGroup');
	    var modalRect = this.get('modalRect');
	    this._updateModalRect();
	    modalGroup.show();
	    modalRect.show();
	    this.draw();
	  },
	  hideModal: function hideModal() {
	    var modalGroup = this.get('modalGroup');
	    var modalRect = this.get('modalRect');
	    modalGroup.hide();
	    modalRect.hide();
	    this.draw();
	  },
	  modal: function modal(items) {
	    var modalGroup = this.get('modalGroup');
	    Util.each(items, function (item) {
	      var group = item.getGroup();
	      var originParent = group.getParent();
	      group.set('originParent', originParent);
	      modalGroup.add(group);
	    });
	    this.showModal();
	    this.set('modalItems', items);
	  },
	  unModal: function unModal() {
	    var modalItems = this.get('modalItems');
	    Util.each(modalItems, function (item) {
	      var group = item.getGroup();
	      var originParent = group.get('originParent');
	      originParent.add(group);
	    });
	    this.set('modalItems', []);
	    this.hideModal();
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 模式初始化 具体实现 目前有选择模式、添加模式、拖拽模式
	 * 模式主要包含事件，样式(鼠标光标样式)
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Handler = __webpack_require__(2);

	var Mixin = function Mixin() {};

	// 合并数组（去重）
	function mergeArray(arr1, arr2) {
	  var i = void 0;
	  var j = void 0;
	  for (i = 0; i < arr1.length; i++) {
	    for (j = 0; j < arr2.length; j++) {
	      if (arr1[i] === arr2[j]) {
	        arr1.splice(i, 1);
	      }
	    }
	  }
	  for (i = 0; i < arr2.length; i++) {
	    arr1.push(arr2[i]);
	  }
	  return arr1;
	}

	// 删除数组指定元素
	function removeByValue(arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i] === val) {
	      arr.splice(i, 1);
	      break;
	    }
	  }
	}

	Mixin.ATTRS = {
	  /**
	   * 模式列表
	   * @type {Object|String}
	   * 为'none'时，则无模式
	   */
	  modes: null,

	  /**
	   * 当前处于的模式
	   * @type {String}
	   */
	  mode: 'default',

	  /**
	   * 行为过滤器
	   * @type {Array}
	   */
	  behaviourFilter: null,

	  /**
	   * 行为集
	   * @type {Array}
	   */
	  behaviours: null
	};

	Util.augment(Mixin, {
	  // 初始化模式
	  _initMode: function _initMode() {
	    var modes = this.get('modes');
	    var mode = this.get('mode');
	    if (!modes) {
	      modes = this.constructor.Mode;
	      this.set('modes', modes);
	    }
	    this.changeMode(mode);
	  },

	  // 过滤行为
	  _filterBehaviour: function _filterBehaviour(modes) {
	    var behaviourFilter = this.get('behaviourFilter');
	    var rst = {};
	    Util.each(modes, function (mode, modeName) {
	      rst[modeName] = Util.filter(mode, function (v) {
	        if (behaviourFilter.indexOf(v) !== -1) {
	          return false;
	        }
	        return true;
	      });
	    });
	    return rst;
	  },

	  // 映射模式手势
	  _mapCursor: function _mapCursor(modeName) {
	    var map = {
	      add: 'pointer',
	      drag: 'move',
	      default: 'default',
	      edit: 'default'
	    };
	    var cursor = map[modeName];
	    if (cursor) {
	      this.css({
	        cursor: map[modeName]
	      });
	    }
	  },

	  /**
	   * 过滤行为
	   * @param  {Array} filter   过滤器
	   */
	  filterBehaviour: function filterBehaviour(filter) {
	    this.set('behaviourFilter', filter);
	    this.resetMode();
	  },

	  /**
	   * 添加行为
	   * @param  {String} modeParam   模式
	   * @param  {String} behaviours  行为
	   * @return {Object} this        自身
	   */
	  addBehaviour: function addBehaviour(modeParam, behaviours) {
	    var modes = this.get('modes');
	    if (Util.isArray(modeParam)) {
	      Util.each(modes, function (mode, name) {
	        modes[name] = mergeArray(mode, modeParam);
	      });
	    } else {
	      if (modes[modeParam]) {
	        modes[modeParam] = mergeArray(modes[modeParam], behaviours);
	      } else {
	        modes[modeParam] = behaviours;
	      }
	    }
	    this.resetMode();
	    return this;
	  },

	  /**
	   * 移除行为
	   * @param  {String} modeParam   模式
	   * @param  {String} behaviours  行为
	   * @return {Object} this        自身
	   */
	  removeBehaviour: function removeBehaviour(modeParam, behaviours) {
	    var modes = this.get('modes');
	    if (Util.isArray(modeParam)) {
	      Util.each(modes, function (mode) {
	        Util.each(modeParam, function (subModeParam) {
	          removeByValue(mode, subModeParam);
	        });
	      });
	    } else {
	      if (modes[modeParam]) {
	        Util.each(behaviours, function (behaviour) {
	          removeByValue(modes[modeParam], behaviour);
	        });
	      }
	    }
	    this.resetMode();
	    return this;
	  },

	  /**
	   * 重置模式
	   */
	  resetMode: function resetMode() {
	    var mode = this.get('mode');
	    this.changeMode(mode);
	  },

	  /**
	   * 改变编辑模式
	   * @param  {String} modeName 模式名
	   */
	  changeMode: function changeMode(modeName) {
	    var modes = this.get('modes');
	    var behaviourFilter = this.get('behaviourFilter');

	    if (!modes || modes === 'none') {
	      return;
	    }

	    if (behaviourFilter) {
	      modes = this._filterBehaviour(modes);
	      // this.set('modes', modes);
	    }

	    if (modes[modeName]) {
	      Handler.resetMode(modes[modeName], this);
	      this.set('mode', modeName);
	      this._mapCursor(modeName);
	    }
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 插件机制
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Mixin = function Mixin() {};

	Mixin.ATTRS = {
	  /**
	   * 插件集
	   * @type {Array}
	   */
	  plugins: null
	};

	Util.augment(Mixin, {
	  // 图初始化前调用
	  _pluginInit: function _pluginInit() {
	    var _this = this;

	    var plugins = this.get('plugins');
	    Util.each(plugins, function (plugin) {
	      plugin.set('graph', _this);
	      plugin.init();
	    });
	  },

	  // 图销毁 destroy 时调用
	  _pluginDestroy: function _pluginDestroy() {
	    var plugins = this.get('plugins');
	    Util.each(plugins, function (plugin) {
	      plugin.destroy();
	    });
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 边的默认形状
	 * @author dxq613@gmail.com
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var Shape = __webpack_require__(29);

	Shape.registGeom('edge', {
	  defaultShapeType: 'line',
	  getPath: function getPath(type, points) {
	    var shape = this.getShape(type);
	    if (Util.isFunction(shape.getPath)) {
	      return shape.getPath(points);
	    }
	    return false;
	  }
	});

	// 注册流程图连线
	Shape.registEdge('polyLineFlow', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('polyLineFlow', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('polyLineFlow', cfg, group, true, 'line');
	  }
	});

	// 注册直线
	Shape.registEdge('line', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('line', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('line', cfg, group, false, 'line');
	  }
	});

	// 注册箭头直线
	Shape.registEdge('arrow', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('line', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('line', cfg, group, true, 'line');
	  }
	});

	// 注册HV直线
	Shape.registEdge('HV', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('HV', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('HV', cfg, group, false, 'line', false);
	  }
	});

	// 注册VH直线
	Shape.registEdge('VH', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('VH', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('VH', cfg, group, false, 'line', false);
	  }
	});

	// 注册HVH直线
	Shape.registEdge('HVH', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('HVH', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('HVH', cfg, group, false, 'line', false);
	  }
	});

	// 注册VHV直线
	Shape.registEdge('VHV', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('VHV', points, 'line');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('VHV', cfg, group, false, 'line', false);
	  }
	});

	// 注册曲线
	Shape.registEdge('smooth', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('bezierAuto', points, 'curve');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('bezierAuto', cfg, group, false, 'curve');
	  }
	});

	// 注册箭头曲线
	Shape.registEdge('smoothArrow', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('bezierAuto', points, 'curve');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('bezierAuto', cfg, group, true, 'curve');
	  }
	});

	// 注册水平三阶贝塞尔曲线
	Shape.registEdge('bezierHorizontal', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('bezierHorizontal', points, 'curve');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('bezierHorizontal', cfg, group, false, 'curve');
	  }
	});

	// 注册竖直三阶贝塞尔曲线
	Shape.registEdge('bezierVertical', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('bezierVertical', points, 'curve');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('bezierVertical', cfg, group, false, 'curve');
	  }
	});

	// 注册二阶贝塞尔曲线
	Shape.registEdge('bezierQuadratic', {
	  getPath: function getPath(points) {
	    return Util.getEdgePath('bezierQuadratic', points, 'curve');
	  },
	  draw: function draw(cfg, group) {
	    return Util.drawEdge('bezierQuadratic', cfg, group, false, 'curve', false);
	  }
	});

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 内置的节点类型
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(4);
	var Shape = __webpack_require__(29);
	var circleDiffR = 0.5 / Math.sqrt(2);

	function getDefaultAnchors() {
	  return [[0.5, 0], // 上面边的中点
	  [1, 0.5], // 右边边的中点
	  [0.5, 1], // 下边边的中点
	  [0, 0.5]];
	}

	Shape.registGeom('node', {
	  defaultShapeType: 'rect',
	  getAnchorPoints: function getAnchorPoints(type, cfg, group) {
	    var shape = this.getShape(type);
	    if (Util.isFunction(shape.getAnchorPoints)) {
	      return shape.getAnchorPoints(cfg, group);
	    }
	    return false;
	  }
	});

	Shape.registNode('rect', {
	  draw: function draw(cfg, group) {
	    return Util.drawNode('rect', cfg, group);
	  },

	  getAnchorPoints: getDefaultAnchors
	});

	Shape.registNode('rhombus', {
	  draw: function draw(cfg, group) {
	    return Util.drawNode('rhombus', cfg, group);
	  },

	  getAnchorPoints: getDefaultAnchors
	});

	Shape.registNode('text', {
	  draw: function draw(cfg, group) {
	    return Util.drawNode('text', cfg, group);
	  },

	  getAnchorPoints: getDefaultAnchors
	});

	Shape.registNode('image', {
	  draw: function draw(cfg, group) {
	    return Util.drawNode('image', cfg, group);
	  },

	  getAnchorPoints: getDefaultAnchors
	});

	// html 拓展
	Shape.registNode('html', {
	  getHtml: function getHtml(cfg) {
	    return cfg.origin.html;
	  },

	  cssSize: false,
	  draw: function draw(cfg, group) {
	    var containerDOM = Util.createDOM('<div class="g6-html-node-container"></div>');
	    var html = this.getHtml(cfg, group);
	    if (!html) {
	      html = Util.createDOM('<div></div>');
	    } else {
	      html = Util.createDOM(html);
	    }
	    containerDOM.appendChild(html);
	    cfg.html = containerDOM;
	    if (this.cssSize) {
	      cfg.size = 'auto';
	    }
	    return Util.drawNode('html', cfg, group);
	  },
	  getAnchorPoints: function getAnchorPoints() {
	    return [[0, 0.25], [0, 0.5], [0, 0.75], [1, 0.25], [1, 0.5], [1, 0.75], [0.25, 0], [0.5, 0], [0.75, 0], [0.25, 1], [0.5, 1], [0.75, 1]];
	  }
	});

	Shape.registNode('circle', {
	  draw: function draw(cfg, group) {
	    return Util.drawNode('circle', cfg, group);
	  },
	  getAnchorPoints: function getAnchorPoints() {
	    return [[0.5 - circleDiffR, 0.5 - circleDiffR], // 左上
	    [0.5, 0], // 上面边的中点
	    [0.5 + circleDiffR, 0.5 - circleDiffR], // 右上
	    [1, 0.5], // 右边边的中点
	    [0.5 + circleDiffR, 0.5 + circleDiffR], // 右下
	    [0.5, 1], // 下边边的中点
	    [0.5 - circleDiffR, 0.5 + circleDiffR], // 左下
	    [0, 0.5]];
	  }
	} // 左边边的中点
	);

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview DOM工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);

	var DOMUtil = {
	  getDOMHeight: function getDOMHeight(el) {
	    var height = Util.getStyle(el, 'height');
	    return parseFloat(height);
	  },
	  getDOMWidth: function getDOMWidth(el) {
	    var width = Util.getStyle(el, 'width');
	    return parseFloat(width);
	  },
	  getOuterHeight: function getOuterHeight(el) {
	    var height = Util.getHeight(el);
	    var bTop = parseFloat(Util.getStyle(el, 'borderTopWidth')) || 0;
	    var pTop = parseFloat(Util.getStyle(el, 'paddingTop'));
	    var pBottom = parseFloat(Util.getStyle(el, 'paddingBottom'));
	    var bBottom = parseFloat(Util.getStyle(el, 'borderBottomWidth')) || 0;
	    return height + bTop + bBottom + pTop + pBottom;
	  },
	  getOuterWidth: function getOuterWidth(el) {
	    var width = Util.getWidth(el);
	    var bLeft = parseFloat(Util.getStyle(el, 'borderLeftWidth')) || 0;
	    var pLeft = parseFloat(Util.getStyle(el, 'paddingLeft'));
	    var pRight = parseFloat(Util.getStyle(el, 'paddingRight'));
	    var bRight = parseFloat(Util.getStyle(el, 'borderRightWidth')) || 0;
	    return width + bLeft + pLeft + pRight + bRight;
	  },
	  createDOM: function createDOM(str, css) {
	    var dom = void 0;
	    if (Util.isString(str)) {
	      dom = Util.createDom(str);
	    } else {
	      dom = str;
	    }
	    dom.bbox = dom.getBoundingClientRect();

	    dom.hide = function () {
	      dom.style.visibility = 'hidden';
	      return dom;
	    };
	    dom.show = function () {
	      dom.style.visibility = 'visible';
	      return dom;
	    };
	    dom.css = function (obj) {
	      Util.modiCSS(dom, obj);
	      return dom;
	    };
	    dom.outerWidth = function () {
	      return DOMUtil.getOuterWidth(dom);
	    };
	    dom.outerHeight = function () {
	      return DOMUtil.getOuterHeight(dom);
	    };
	    dom.width = function () {
	      return DOMUtil.getDOMWidth(dom);
	    };
	    dom.height = function () {
	      return DOMUtil.getDOMHeight(dom);
	    };
	    dom.paddingLeft = function () {
	      return parseFloat(Util.getStyle(dom, 'padding-left'));
	    };
	    dom.paddingRight = function () {
	      return parseFloat(Util.getStyle(dom, 'padding-right'));
	    };
	    dom.paddingTop = function () {
	      return parseFloat(Util.getStyle(dom, 'padding-top'));
	    };
	    dom.paddingBottom = function () {
	      return parseFloat(Util.getStyle(dom, 'padding-bottom'));
	    };
	    dom.destroy = function () {
	      dom.parentNode && dom.parentNode.removeChild(dom);
	    };
	    dom.on = function (eventType, callback) {
	      dom.addEventListener(eventType, callback);
	    };
	    dom.off = function (eventType, callback) {
	      dom.removeEventListener(eventType, callback);
	    };
	    dom.attr = function (attrName) {
	      return dom.getAttribute(attrName);
	    };
	    dom.css(css);
	    return dom;
	  }
	};

	module.exports = DOMUtil;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 边工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Matrix = __webpack_require__(3);
	var MathUtil = __webpack_require__(31);
	var PathUtil = __webpack_require__(18);
	var FlowPoints = __webpack_require__(140);
	var Vector = Matrix.Vector2;

	function _isHorizontal(p1, p2) {
	  return Math.abs(p1.x - p2.x) > Math.abs(p1.y - p2.y);
	}

	function getCubicControlPoints(from, to, direct, source, target) {
	  var points = [];

	  if (direct === 'horizontal') {
	    points.push({
	      x: (from.x + to.x) * 1 / 2,
	      y: from.y
	    });
	    points.push({
	      x: (from.x + to.x) * 1 / 2,
	      y: to.y
	    });
	  } else if (direct === 'vertical') {
	    points.push({
	      x: from.x,
	      y: (from.y + to.y) * 1 / 2
	    });
	    points.push({
	      x: to.x,
	      y: (from.y + to.y) * 1 / 2
	    });
	  } else {
	    // TODO 求让箭头强制指向中心的控制点（目前指示简单判断竖直还是横向）
	    var width = Math.abs(to.x - from.x);
	    var height = Math.abs(to.y - from.y);
	    var sourceCenter = from;
	    var targetCenter = to;
	    source && source.getCenter && (sourceCenter = source.getCenter());
	    target && target.getCenter && (targetCenter = target.getCenter());
	    if (_isHorizontal(from, sourceCenter) || from === sourceCenter && height < width) {
	      points.push({
	        x: (from.x + to.x) * 1 / 2,
	        y: from.y
	      });
	    } else {
	      points.push({
	        x: from.x,
	        y: (from.y + to.y) * 1 / 2
	      });
	    }
	    if (_isHorizontal(to, targetCenter) || to === targetCenter && height < width) {
	      points.push({
	        x: (from.x + to.x) * 1 / 2,
	        y: to.y
	      });
	    } else {
	      points.push({
	        x: to.x,
	        y: (from.y + to.y) * 1 / 2
	      });
	    }
	  }
	  return points;
	}

	function getQuadraticControlPoints(from, to) {
	  var center = {
	    x: (from.x + to.x) / 2,
	    y: (from.y + to.y) / 2
	  };
	  var v1 = MathUtil.vector(to, from);
	  var v2 = v1.vertical();
	  var leg = v1.length();
	  v2.setLength(leg * (1 / 5));
	  return [Vector.add(center, v2)];
	}

	/**
	 * 三阶贝塞尔曲线
	 * @param {Array}    points 点集
	 * @param {Node}     source 始节点
	 * @param {Node}     target 终节点
	 * @param {String}   direct 方向
	 * @return {Array}   path   路径
	 */
	function getBezierCurve(points, source, target, direct) {
	  var start = points[0];
	  var end = points[points.length - 1];
	  var M = ['M', start.x, start.y];
	  var controlPoints = getCubicControlPoints(start, end, direct, source, target);
	  var sub = ['C'];
	  var path = [M];

	  Util.each(controlPoints, function (point) {
	    sub.push(point.x, point.y);
	  });
	  sub.push(end.x, end.y);
	  path.push(sub);
	  return path;
	}

	/**
	 * 获取锚点对应的虚拟box的点
	 * @param  {Object} target 节点
	 * @param  {Array} point  锚点坐标
	 * @return {[type]}        [description]
	 */
	function formatAchor(target, point) {
	  var DIFF = 10;
	  var diff = void 0;
	  var result = void 0;
	  var bbox = target.getBBox();
	  var centerX = bbox.centerX;
	  var centerY = bbox.centerY;
	  var height = bbox.height;
	  var width = bbox.width;
	  var maxX = bbox.maxX;
	  var maxY = bbox.maxY;

	  point = [point.x, point.y];

	  if (centerX === point[0]) {
	    if (point[1] >= centerY) {
	      diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	      result = [centerX, point[1] + diff];
	    } else {
	      diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	      result = [centerX, point[1] - diff];
	    }
	  }

	  if (centerY === point[1]) {
	    if (point[0] >= centerX) {
	      diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	      result = [point[0] + diff, centerY];
	    } else {
	      diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	      result = [point[0] - diff, centerY];
	    }
	  }

	  if (result) return result;

	  var diffX = Math.abs(centerX - point[0]);
	  var diffY = Math.abs(centerY - point[1]);
	  var diffLen = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
	  var resultSin = Math.asin(diffY / diffLen) * 180 / Math.PI; // 角度

	  if (point[0] >= centerX && point[0] <= maxX) {
	    // 一四象限
	    if (point[1] >= centerY && point[1] <= maxY) {
	      // 四
	      if (resultSin > 0 && resultSin <= 45) {
	        diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	        result = [point[0] + diff, point[1]];
	      } else {
	        diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	        result = [point[0], point[1] + diff];
	      }
	    } else {
	      // 一
	      if (resultSin > 0 && resultSin <= 45) {
	        diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	        result = [point[0] + diff, point[1]];
	      } else {
	        diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	        result = [point[0], point[1] - diff];
	      }
	    }
	  } else {
	    //  二三象限
	    if (point[1] >= centerY && point[1] <= maxY) {
	      // 三
	      if (resultSin > 0 && resultSin <= 45) {
	        diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	        result = [point[0] - diff, point[1]];
	      } else {
	        diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	        result = [point[0], point[1] + diff];
	      }
	    } else {
	      // 二
	      if (resultSin > 0 && resultSin <= 45) {
	        diff = DIFF + width / 2 - Math.abs(centerX - point[0]);
	        result = [point[0] - diff, point[1]];
	      } else {
	        diff = DIFF + height / 2 - Math.abs(centerY - point[1]);
	        result = [point[0], point[1] - diff];
	      }
	    }
	  }

	  return result;
	}

	var EdgeUtil = {
	  /**
	   * 画环
	   * @param {Node}     node 节点
	   * @return {Array}   path 路径
	   */
	  // ring: function(node) {
	  //   var bbox = node.getBBox();
	  //   var width = bbox.maxX - bbox.minX;
	  //   var height = bbox.maxY - bbox.minY;
	  //   var minLength = Math.min(height, width) * 3 / 8;
	  //   var ringPath = PathUtil.getEllipsePath(bbox.maxX, bbox.minY + height / 2, minLength, minLength);
	  //   return PathUtil.pathToCurve(ringPath.slice(0, 2));
	  // },
	  /**
	   * 流程图连线
	   * @param  {Array}        points 连接点的坐标
	   * @param  {Object}       source 连线的开始节点
	   * @param  {Object}       target 连线的结束节点
	   * @return {String|Array} path   路径
	   */
	  polyLineFlow: function polyLineFlow(points, source, target) {
	    var sourcePointer = formatAchor(source, points[0]);
	    var targetPointer = formatAchor(target, points[1]);

	    target = target.get('boxStash');
	    source = source.get('boxStash');

	    var pointsGroup = new FlowPoints({
	      source: source,
	      target: target,
	      sourcePosition: [points[0].x, points[0].y],
	      sourceHandlePosition: [sourcePointer[0], sourcePointer[1]],
	      targetPosition: [points[1].x, points[1].y],
	      targetHandlePosition: [targetPointer[0], targetPointer[1]]
	    });

	    pointsGroup = pointsGroup.filter(function (item) {
	      return item;
	    }).map(function (item) {
	      return {
	        x: item[0],
	        y: item[1]
	      };
	    });
	    return PathUtil.pointsToPolygon(pointsGroup);
	  },

	  /**
	   * 水平三阶贝塞尔曲线
	   * @param {Array}    points 点集
	   * @param {Node}     source 始节点
	   * @param {Node}     target 终节点
	   * @return {Array}   path   路径
	   */
	  bezierHorizontal: function bezierHorizontal(points, source, target) {
	    return getBezierCurve(points, source, target, 'horizontal');
	  },

	  /**
	   * 竖直三阶贝塞尔曲线
	   * @param {Array}    points 点集
	   * @param {Node}     source 始节点
	   * @param {Node}     target 终节点
	   * @return {Array}   path   路径
	   */
	  bezierVertical: function bezierVertical(points, source, target) {
	    return getBezierCurve(points, source, target, 'vertical');
	  },

	  /**
	   * 自动三阶贝塞尔曲线
	   * @param {Array}    points 点集
	   * @param {Node}     source 始节点
	   * @param {Node}     target 终节点
	   * @return {Array}   path   路径
	   */
	  bezierAuto: function bezierAuto(points, source, target) {
	    return getBezierCurve(points, source, target, 'auto');
	  },

	  /**
	   * 二阶贝塞尔曲线
	   * @param {Array}    points 点集
	   * @return {Array}   path   路径
	   */
	  bezierQuadratic: function bezierQuadratic(points) {
	    var start = points[0];
	    var end = points[points.length - 1];
	    var M = ['M', start.x, start.y];
	    var controlPoints = getQuadraticControlPoints(start, end);
	    var sub = ['Q'];
	    var path = [M];

	    Util.each(controlPoints, function (point) {
	      sub.push(point.x, point.y);
	    });
	    sub.push(end.x, end.y);
	    path.push(sub);
	    return path;
	  },

	  /**
	   * 直线
	   * @param  {Array}   points 点集
	   * @return {Array}   path   路径
	   */
	  line: function line(points) {
	    var path = PathUtil.pointsToPolygon(points);
	    return path;
	  },

	  /**
	   * HV 折线
	   * @param  {Array}   points 点集
	   * @return {Array}   path   路径
	   */
	  HV: function HV(points) {
	    var l = points.length;
	    var path = PathUtil.pointsToPolygon([points[0], {
	      x: points[l - 1].x,
	      y: points[0].y
	    }, points[l - 1]]);
	    return path;
	  },

	  /**
	   * VH 折线
	   * @param  {Array}   points 点集
	   * @return {Array}   path   路径
	   */
	  VH: function VH(points) {
	    var l = points.length;
	    var path = PathUtil.pointsToPolygon([points[0], {
	      x: points[0].x,
	      y: points[l - 1].y
	    }, points[l - 1]]);
	    return path;
	  },

	  /**
	   * HVH 折线
	   * @param  {Array}   points 点集
	   * @return {Array}   path   路径
	   */
	  HVH: function HVH(points) {
	    var l = points.length;
	    var path = PathUtil.pointsToPolygon([points[0], {
	      x: (points[0].x + points[l - 1].x) / 2,
	      y: points[0].y
	    }, {
	      x: (points[0].x + points[l - 1].x) / 2,
	      y: points[l - 1].y
	    }, points[l - 1]]);
	    return path;
	  },

	  /**
	   * VHV 折线
	   * @param  {Array}   points 点集
	   * @return {Array}   path   路径
	   */
	  VHV: function VHV(points) {
	    var l = points.length;
	    var path = PathUtil.pointsToPolygon([points[0], {
	      x: points[0].x,
	      y: (points[0].y + points[l - 1].y) / 2
	    }, {
	      x: points[l - 1].x,
	      y: (points[0].y + points[l - 1].y) / 2
	    }, points[l - 1]]);
	    return path;
	  }
	};

	module.exports = EdgeUtil;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(1);
	var diffHandle = 10;
	/**
	 * 连线的构造函数
	 * @param  {Object} item 配置项
	 * @return {Object} 结果
	 */
	function line(item) {
	  var me = this;
	  var source = item.source;
	  var target = item.target;
	  var sourcePosition = item.sourcePosition;
	  var targetPosition = item.targetPosition;
	  var sourceHandlePosition = item.sourceHandlePosition;
	  var targetHandlePosition = item.targetHandlePosition;

	  var maxConflictArea = me.getMaxConflictArea(Util.clone(sourceHandlePosition), Util.clone(targetHandlePosition), [source, target]);
	  var minCoor = maxConflictArea.minCoor;
	  var maxCoor = maxConflictArea.maxCoor;

	  var turnPointGroup = me.getTurnPointGroup(Util.clone(sourceHandlePosition), Util.clone(targetHandlePosition), [source, target], minCoor, maxCoor);

	  turnPointGroup = [sourcePosition, sourceHandlePosition].concat(turnPointGroup).concat([targetHandlePosition, targetPosition]);

	  return turnPointGroup;
	}

	line.prototype = {
	  /**
	   * 在冲突区域内查找和节点不冲突的拐点集合
	   * @param  {Object} sourcePosition 源节点位置
	   * @param  {Object} targetPosition 目标节点位置
	   * @param  {Array}  nodes          节点集合
	   * @param  {Object} minCoor        最小点
	   * @param  {Object} maxCoor        最大点
	   * @return {Array}  rst            结果集
	   */
	  getTurnPointGroup: function getTurnPointGroup(sourcePosition, targetPosition, nodes, minCoor, maxCoor) {
	    var me = this;
	    var result = [];
	    var source = Util.clone(sourcePosition);
	    var target = Util.clone(targetPosition);
	    /**
	     * 获取合法的向量
	     * 这里的合法是指该点与边界的链接的向量不会横跨元素
	     * 也不会经过边界
	     * @type {Array}
	     */
	    var startLineGroup = [{
	      source: source,
	      target: [source[0], minCoor.y]
	    }, {
	      source: source,
	      target: [source[0], maxCoor.y]
	    }, {
	      source: source,
	      target: [minCoor.x, source[1]]
	    }, {
	      source: source,
	      target: [maxCoor.x, source[1]]
	    }];

	    var targetLineGroup = [{
	      source: target,
	      target: [target[0], minCoor.y]
	    }, {
	      source: target,
	      target: [target[0], maxCoor.y]
	    }, {
	      source: target,
	      target: [minCoor.x, target[1]]
	    }, {
	      source: target,
	      target: [maxCoor.x, target[1]]
	    }];
	    var legalStartLineGroup = startLineGroup;
	    var legalTargetLineGroup = targetLineGroup;
	    /**
	     * 查找是否有相互垂直的向量，如果有的话直接给出交点则完成
	     * 否则需要查找平行向量，计算公式如下，分母为0时则表示平行
	     * https://www.zhihu.com/equation?tex=%5Cbegin%7Balign%7D%0A%28P_x%2C+P_y%29%3D+%5Cbigg%28%26%5Cfrac%7B%28x_1+y_2-y_1+x_2%29%28x_3-x_4%29-%28x_1-x_2%29%28x_3+y_4-y_3+x_4%29%7D%7B%28x_1-x_2%29%28y_3-y_4%29-%28y_1-y_2%29%28x_3-x_4%29%7D%2C+%5C%5C%0A+++++++++%26%5Cfrac%7B%28x_1+y_2-y_1+x_2%29%28y_3-y_4%29-%28y_1-y_2%29%28x_3+y_4-y_3+x_4%29%7D%7B%28x_1-x_2%29%28y_3-y_4%29-%28y_1-y_2%29%28x_3-x_4%29%7D%5Cbigg%29%0A%5Cend%7Balign%7D
	     * @type {[type]}
	     */
	    for (var i = 0; i < legalStartLineGroup.length; i++) {
	      for (var j = 0; j < legalTargetLineGroup.length; j++) {
	        var vector1 = legalStartLineGroup[i];
	        var vector2 = legalTargetLineGroup[j];

	        var x1 = vector1.source[0];
	        var y1 = vector1.source[1];
	        var x2 = vector1.target[0];
	        var y2 = vector1.target[1];
	        var x3 = vector2.source[0];
	        var y3 = vector2.source[1];
	        var x4 = vector2.target[0];
	        var y4 = vector2.target[1];

	        var isVector = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
	        /**
	          * 如果向量有垂直关系，得出垂直点返回即可
	          * 如果isVector为0则该向量为平行向量
	          * 如果为平行向量的话
	          * 则求交点
	          */
	        if (isVector) {
	          var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / isVector;
	          var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / isVector;
	          var resultTemp = [x, y];
	          if (!me.isCrossNode(source, resultTemp, nodes) && !me.isCrossNode(resultTemp, target, nodes)) {
	            return [[x, y]];
	          }
	        }
	      }
	    }

	    if (!me.isCrossNode(source, target, nodes) && (me.isEqual(source, target, 0) || me.isEqual(source, target, 1))) {
	      return [source, target];
	    }
	    var maxWidth = 0;
	    var maxHeight = 0;

	    Util.each(nodes, function (item) {
	      maxWidth = Math.max(maxWidth, item.width);
	      maxHeight = Math.max(maxHeight, item.height);
	    });

	    // 这里就是同侧啦
	    if (source[1] === target[1]) {
	      return [[source[0], source[1] + maxHeight * 0.8], [target[0], target[1] + maxHeight * 0.8]];
	    }
	    if (source[0] === target[0]) {
	      return [[source[0] + maxWidth * 0.8, source[1]], [target[0] + maxWidth * 0.8, target[1]]];
	    }

	    // 这里处理平行向量的情况
	    var minX = source[0] < target[0] ? source[0] : target[0];
	    var maxX = source[0] > target[0] ? source[0] : target[0];
	    var minY = source[1] < target[1] ? source[1] : target[1];
	    var maxY = source[1] > target[1] ? source[1] : target[1];

	    // 这里是x轴扫描
	    var xArray = [];
	    var xDistance = Infinity;

	    function checkItem(item) {
	      return !me.isCrossNode(item[0], item[1], nodes);
	    }

	    for (var k = minX; k < maxX; k++) {
	      var pointmin = [k, source[1]];
	      var pointmax = [k, target[1]];
	      var resultLegal = [[source, pointmin], [pointmin, pointmax], [pointmax, target]].every(checkItem);

	      if (resultLegal) {
	        // return [point1,point2];
	        xArray.push([pointmin, pointmax]);
	      }
	    }
	    // 查找x轴中离中间位置最接近的地方
	    if (xArray.length) {
	      var xArrayResult = void 0;
	      for (var l = 0; l < xArray.length; l++) {
	        var mid1 = (minX + maxX) / 2;
	        var min1 = Math.min(xDistance, Math.abs(mid1 - xArray[l][0][0]));
	        if (min1 !== xDistance) {
	          xArrayResult = xArray[l];
	          xDistance = min1;
	        }
	      }
	      return xArrayResult;
	    }

	    // 这里是y轴扫描
	    var yArray = [];
	    var yDistance = Infinity;
	    for (var m = minY; m < maxY; m++) {
	      var pointmin1 = [source[0], m];
	      var pointmax1 = [target[0], m];
	      var resultLegal1 = [[source, pointmin1], [pointmin1, pointmax1], [pointmax1, target]].every(checkItem);
	      if (resultLegal1) {
	        // return [point1,point2];
	        yArray.push([pointmin1, pointmax1]);
	      }
	    }

	    // 查找y轴中离中间位置最接近的地方
	    if (yArray.length) {
	      var yArrayResult = void 0;
	      for (var minl = 0; minl < yArray.length; minl++) {
	        var mid = (minY + maxY) / 2;
	        var min = Math.min(yDistance, Math.abs(mid - yArray[minl][0][1]));
	        if (min !== yDistance) {
	          yArrayResult = yArray[minl];
	          yDistance = min;
	        }
	      }
	      return yArrayResult;
	    }

	    // 上述条件都不满足时，则需要借助作用区域来完成操作
	    var point1 = [source[0], maxCoor.y];
	    var point2 = [target[0], maxCoor.y];
	    var point3 = [source[0], minCoor.y];
	    var point4 = [target[0], minCoor.y];
	    var point5 = [minCoor.x, minCoor.y];
	    var point6 = [maxCoor.x, minCoor.y];
	    var point7 = [minCoor.x, maxCoor.y];
	    var point8 = [maxCoor.x, maxCoor.y];

	    // 链接两点作用区域的情况
	    result = [[source, point1], [point1, point2], [point2, target]].every(checkItem);

	    if (result) {
	      return [point1, point2];
	    }
	    // 链接两点作用区域的情况
	    result = [[source, point3], [point3, point4], [point4, target]].every(checkItem);

	    if (result) {
	      return [point3, point4];
	    }
	    // 链接两点作用区域的同事需要借助作用区域边界的情况
	    var pointGrop = [point1, point2, point3, point4];
	    var turnGroup = [point5, point6, point7, point8];

	    var finalResult = me.loopFind(source, target, pointGrop, turnGroup, checkItem);
	    if (finalResult) return finalResult;

	    point1 = [minCoor.x, source[1]];
	    point2 = [minCoor.x, target[1]];
	    point3 = [maxCoor.x, source[1]];
	    point4 = [maxCoor.x, target[1]];

	    result = [[source, point1], [point1, point2], [point2, target]].every(checkItem);

	    if (result) {
	      return [point1, point2];
	    }

	    result = [[source, point3], [point3, point4], [point4, target]].every(checkItem);

	    if (result) {
	      return [point3, point4];
	    }
	    // 链接两点作用区域的同事需要借助作用区域边界的情况
	    pointGrop = [point1, point2, point3, point4];
	    finalResult = me.loopFind(source, target, pointGrop, turnGroup, checkItem);
	    if (finalResult) return finalResult;

	    point1 = [minCoor.x, source[1]];
	    point2 = [target[0], maxCoor.y];
	    point3 = [maxCoor.x, source[1]];
	    point4 = [target[0], minCoor.y];
	    // 链接两点作用区域的同事需要借助作用区域边界的情况
	    pointGrop = [point1, point2, point3, point4];
	    finalResult = me.loopFind(source, target, pointGrop, turnGroup, checkItem);
	    if (finalResult) return finalResult;

	    point1 = [source[0], maxCoor.y];
	    point2 = [minCoor.x, target[1]];
	    point3 = [source[0], minCoor.y];
	    point4 = [maxCoor.x, target[1]];
	    // 链接两点作用区域的同事需要借助作用区域边界的情况
	    pointGrop = [point1, point2, point3, point4];
	    finalResult = me.loopFind(source, target, pointGrop, turnGroup, checkItem);
	    if (finalResult) return finalResult;
	  },

	  /**
	   * 链接两点作用区域的同事需要借助作用区域边界的情况，循环查找合适边界
	   * @param  {[type]} source    开始节点
	   * @param  {[type]} target    结束节点
	   * @param  {[type]} pointGrop [description]
	   * @param  {[type]} turnGroup [description]
	   * @param  {[type]} checkItem [description]
	   * @return {[type]}           [description]
	   */
	  loopFind: function loopFind(source, target, pointGrop, turnGroup, checkItem) {
	    var me = this;
	    for (var p1 = 0; p1 < pointGrop.length - 1; p1++) {
	      for (var p2 = 1; p2 < pointGrop.length; p2++) {
	        for (var step1 = 0; step1 < turnGroup.length; step1++) {
	          if ((me.isEqual(source, pointGrop[p1], 0) || me.isEqual(source, pointGrop[p1], 1)) && (me.isEqual(target, pointGrop[p2], 0) || me.isEqual(target, pointGrop[p2], 1)) && (me.isEqual(pointGrop[p1], turnGroup[step1], 0) || me.isEqual(pointGrop[p1], turnGroup[step1], 1)) && (me.isEqual(pointGrop[p2], turnGroup[step1], 0) || me.isEqual(pointGrop[p2], turnGroup[step1], 1))) {
	            var result = [[source, pointGrop[p1]], [pointGrop[p1], turnGroup[step1]], [turnGroup[step1], pointGrop[p2]], [pointGrop[p2], target]].every(checkItem);
	            if (result) return [pointGrop[p1], turnGroup[step1], pointGrop[p2]];
	          }
	        }
	      }
	    }
	  },

	  /**
	   * 寻找最大冲突区域以及冲突内的所有的节点
	   * @param  {Object} sourcePosition 源节点位置
	   * @param  {Object} targetPosition 目标节点位置
	   * @param  {Array}  nodes          节点集
	   * @return {Object} 冲突信息
	   */
	  getMaxConflictArea: function getMaxConflictArea(sourcePosition, targetPosition, nodes) {
	    /**
	     * 初始化冲突区域为两个坐标覆盖范围
	     * 目前暂定(x1,y1)为坐标值较小
	     * (x2,y2)为坐标值较大的点
	     * 冲突检测区域为四条线
	     * line1 : x = sourcePosition[0]
	     * line2 : x = targetPosition[0]
	     * line3 : y = sourcePosition[1]
	     * line4 : y = targetPosition[1]
	     * 这四条线能够扫描到的内容就都是冲突内容需要将冲突区域扩大
	     */
	    var x1 = Math.min(sourcePosition[0], targetPosition[0]);
	    var x2 = Math.max(targetPosition[0], sourcePosition[0]);
	    var y1 = Math.min(sourcePosition[1], targetPosition[1]);
	    var y2 = Math.max(targetPosition[1], sourcePosition[1]);
	    // 最少需要循环node.length次来减少误差和避免前者被覆盖的情况
	    function checkItemLeagl(item) {
	      // 如果横跨第一条线
	      if (item.x - diffHandle <= x1 && item.x + item.width + diffHandle >= x1) {
	        x1 = item.x - diffHandle;
	      }

	      // 如果横跨第二条线
	      if (item.x - diffHandle <= x2 && item.x + item.width + diffHandle >= x2) {
	        x2 = item.x + item.width + diffHandle;
	      }

	      // 如果横跨第三条线
	      if (item.y - diffHandle <= y1 && item.y + item.height + diffHandle >= y1) {
	        y1 = item.y - diffHandle;
	      }

	      // 如果横跨第四条线
	      if (item.y - diffHandle <= y2 && item.y + item.height + diffHandle >= y2) {
	        y2 = item.y + item.height + diffHandle;
	      }

	      return item;
	    }

	    for (var i = 0; i < nodes.length; i++) {
	      nodes.map(checkItemLeagl);
	    }

	    return {
	      minCoor: {
	        x: x1,
	        y: y1
	      },
	      maxCoor: {
	        x: x2,
	        y: y2
	      }
	    };
	  },

	  /**
	   * 忽略误差
	   * @param  {Object|Array} a     对象或数组
	   * @param  {Object|Array} b     对象或数组
	   * @param  {Number}       index 索引
	   * @return {Boolean}      布尔值
	   */
	  isEqual: function isEqual(a, b, index) {
	    return Math.abs(a[index] - b[index]) <= 1;
	  },

	  /**
	   * 两点线段是否是冲突线段
	   * 冲突线段是指：线段横穿nodes中的某个元素
	   * @param  {Object}   start     开始点
	   * @param  {Object}   end       结束点
	   * @param  {Array}    nodes     点集
	   * @return {Boolean}  布尔值
	   */
	  isCrossNode: function isCrossNode(start, end, nodes) {
	    var me = this;
	    if (me.isEqual(start, end, 0)) {
	      return nodes.some(function (item) {
	        return item.x <= start[0] && item.x + item.width >= start[0] && (item.y >= start[1] && item.y <= end[1] || item.y + item.height >= start[1] && item.y + item.height <= end[1] || item.y <= start[1] && item.y + item.height >= end[1] || item.y >= start[1] && item.y + item.height <= end[1]);
	      });
	    }

	    if (me.isEqual(start, end, 1)) {
	      return nodes.some(function (item) {
	        return item.y <= start[1] && item.y + item.height >= start[1] && (item.x >= start[0] && item.x <= end[0] || item.x + item.width >= start[0] && item.x + item.width <= end[0] || item.x <= start[0] && item.x + item.width >= end[0] || item.x >= start[0] && item.x + item.width <= end[0]);
	      });
	    }
	  }
	};

	module.exports = line;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 边工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Matrix = __webpack_require__(3);
	var PathUtil = __webpack_require__(18);
	var BaseUtil = __webpack_require__(30);
	var NodeUtil = __webpack_require__(64);
	var Edge = __webpack_require__(139);
	var Global = __webpack_require__(7);
	var Vector = Matrix.Vector2;
	var PADDING = 5; // 自适应文本内边距

	function getAttrs(cfg, arrow) {
	  var rst = {};
	  rst.arrow = arrow;
	  if (cfg.color) {
	    rst.stroke = cfg.color;
	  }
	  if (cfg.size) {
	    rst.lineWidth = cfg.size;
	  }
	  return Util.mix({}, Global.edgeStyle, rst, cfg.style);
	}

	function drawLabel(cfg, group, shape) {
	  if (cfg.label) {
	    var center = void 0;
	    var attrs = void 0;
	    try {
	      center = shape.getPoint(0.5);
	    } catch (ev) {// 绘制时异常时，中断添加label

	    }
	    if (!center) {
	      return;
	    }
	    if (Util.isObject(cfg.label)) {
	      attrs = Util.mix({}, Global.edgeLabelStyle, cfg.label, {
	        x: center.x,
	        y: center.y
	      }, cfg.labelStyle);
	    } else {
	      attrs = Util.mix({}, Global.edgeLabelStyle, {
	        text: cfg.label,
	        x: center.x,
	        y: center.y
	      }, cfg.labelStyle);
	    }

	    var label = BaseUtil.drawLabel(group, attrs, Global.zIndex.edgeLabel);
	    // group.addShape('text', {
	    //   attrs: attrs,
	    //   class: 'label',
	    //   zIndex: Global.zIndex.edgeLabel
	    // });
	    var bbox = label.getBBox();
	    var labelWidth = bbox.maxX - bbox.minX;
	    var labelHeight = bbox.maxY - bbox.minY;
	    var rectWidth = labelWidth + 2 * PADDING;
	    var rectHeight = labelHeight + 2 * PADDING;
	    group.addShape('rect', {
	      attrs: Util.mix({
	        x: center.x - rectWidth / 2,
	        y: center.y - rectHeight / 2,
	        width: rectWidth,
	        height: rectHeight
	      }, Global.edgeLabelRectStyle),
	      zIndex: Global.zIndex.edgeLabelBackground
	    });
	  }
	}

	var EdgeUtil = {
	  /**
	   * 获取边的路径
	   * @param {String}   name   名称
	   * @param {Array}    points 点集
	   * @param {String}   type   线的类型 (line 直线，curve曲线)
	   * @param {Object}   source 连线的开始节点
	   * @param {Object}   target 连线的结束节点
	   * @return {G.Shape} Path
	   */
	  getEdgePath: function getEdgePath(name, points, type, source, target) {
	    // if (source && target && source === target) { // 目标和源相同则画环
	    //   return Edge.ring(source);
	    // }

	    if (points.length === 2) {
	      return Edge[name](points, source, target);
	    }

	    if (type === 'curve') {
	      return PathUtil.pointsToCurve(points);
	    }

	    return PathUtil.pointsToPolygon(points);
	  },

	  /**
	   * 画边
	   * @param {String}        name   名称
	   * @param {Object}        cfg    配置项
	   * @param {Ganvas.Group}  group  组
	   * @param {Boolean}       arrow  是否有箭头
	   * @param {String}        type   线的类型 (line 直线，curve曲线)
	   * @return {Ganvas.Shape} shape
	   */
	  drawEdge: function drawEdge(name, cfg, group, arrow, type) {
	    var attrs = getAttrs(cfg, arrow);
	    var path = EdgeUtil.getEdgePath(name, cfg.points, type, cfg.source, cfg.target);

	    attrs.path = path;
	    var shape = group.addShape('path', {
	      attrs: attrs,
	      zIndex: Global.zIndex.edge
	    });
	    drawLabel(cfg, group, shape);
	    group.radixSort();
	    return shape;
	  },

	  /**
	   * 放置箭头
	   * @param {Ganvas.Element}  element 形
	   * @param {Number}          x       位置x
	   * @param {Number}          y       位置y
	   * @param {Number}          x0      方向起点x
	   * @param {Number}          y0      方向起点y
	   * @param {Number}          x1      方向终点x
	   * @param {Number}          y1      方向终点y
	   * @return {Ganvas.Element} element 形
	   */
	  arrowTo: function arrowTo(element, x, y, x0, y0, x1, y1) {
	    var v0 = new Vector(1, 0);
	    var v = new Vector(x1 - x0, y1 - y0);
	    var angle = v.angleTo(v0, true);
	    element.transform([['r', angle], ['t', x, y]]);
	    return element;
	  },

	  /**
	   * 获取path和节点精确相交后的锚点
	   * @param {String|Array}    path 形
	   * @param {Node}            node 位置x
	   * @return {Object}         rst 点
	   */
	  snapPreciseAnchor: function snapPreciseAnchor(path, node) {
	    var intersect = node.getIntersectionByPath(path);
	    var rst = NodeUtil.getSnapAnchor(node, intersect);
	    return rst;
	  }
	};

	module.exports = EdgeUtil;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点工具类
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Global = __webpack_require__(7);
	var PathUtil = __webpack_require__(18);
	var BaseUtil = __webpack_require__(30);
	var PADDING = Global.nodePadding; // 自适应文本内边距
	var MARGIN = 5; // 自适应文本外边距
	var DEFAULTSIZE = 50; // 默认大小

	/**
	 * 获取文本配置信息
	 * @param  {Object} cfg   配置项
	 * @return {Object} label 属性
	 */
	function getNodeLabelStyle(cfg) {
	  if (Util.isObject(cfg.label)) {
	    return Util.mix({}, Global.nodeLabelStyle, cfg.label, {
	      x: cfg.x,
	      y: cfg.y
	    });
	  }
	  return Util.mix({}, Global.nodeLabelStyle, {
	    text: cfg.label,
	    x: cfg.x,
	    y: cfg.y
	  });
	}

	function locationLabel(image, label) {
	  label.attr({
	    y: label.attr('y') + image.attr('height') / 2 + MARGIN
	  });
	}

	/**
	 * 默认自适应尺寸函数
	 * @param  {Canvas.Shape} labelShape 标签的图形
	 * @return {Array}        array      长宽
	 */
	function defaultAutoFit(labelShape) {
	  var bbox = labelShape.getBBox();
	  var labelWidth = bbox.maxX - bbox.minX;
	  var labelHeight = bbox.maxY - bbox.minY;
	  var width = labelWidth + 2 * PADDING[1];
	  var height = labelHeight + 2 * PADDING[0];
	  return [width, height];
	}

	/**
	 * 获取labelShape
	 * @param  {Object}       cfg       配置项
	 * @param  {Object}       group     图组
	 * @param  {Function}     autoFit 自适应宽度回调函数
	 * @return {Canvas.Shape} 标签图形
	 */
	function getLabelShape(cfg, group, autoFit) {
	  var labelAttrs = void 0;
	  var labelShape = void 0;
	  autoFit = autoFit ? autoFit : defaultAutoFit;

	  if (!Util.isNull(cfg.label)) {
	    labelAttrs = Util.mix(getNodeLabelStyle(cfg), cfg.labelStyle);
	    labelShape = BaseUtil.drawLabel(group, labelAttrs, Global.zIndex.nodeLabel);
	    // 如果未定义宽高，则根据文本内容自适应宽度
	    if (!cfg.size) {
	      cfg.size = autoFit(labelShape);
	    }
	  }
	  if (!cfg.size) {
	    cfg.size = [DEFAULTSIZE, DEFAULTSIZE];
	  }
	  if (Util.isNumber(cfg.size)) {
	    cfg.size = [cfg.size, cfg.size];
	  }
	  return labelShape;
	}

	function getImageElement(cfg, group, img) {
	  var attrs = {
	    img: img
	  };
	  var label = void 0;
	  if (!cfg.size) {
	    cfg.size = DEFAULTSIZE;
	  }
	  attrs.width = Util.isArray(cfg.size) ? cfg.size[0] : cfg.size;
	  attrs.height = Util.isArray(cfg.size) ? cfg.size[1] : cfg.size;
	  attrs.x = cfg.x - attrs.width / 2;
	  attrs.y = cfg.y - attrs.height / 2;
	  var image = group.addShape('image', {
	    attrs: attrs,
	    zIndex: Global.zIndex.node
	  });
	  if (cfg.label) {
	    var labelAttrs = Util.mix(getNodeLabelStyle(cfg), cfg.labelStyle);
	    labelAttrs.textBaseline = 'top';
	    label = BaseUtil.drawLabel(group, labelAttrs, Global.zIndex.nodeLabel);
	    locationLabel(image, label);
	  }
	  return image;
	}

	var EdgeUtil = {
	  rect: function rect(cfg, group, attrs) {
	    getLabelShape(cfg, group);
	    var width = cfg.size[0];
	    var height = cfg.size[1];
	    var x = cfg.x - width / 2;
	    var y = cfg.y - height / 2;
	    var path = void 0;
	    if (attrs.radius) {
	      path = PathUtil.getRectPath(x, y, width, height, attrs.radius);
	    } else {
	      path = PathUtil.getRectPath(x, y, width, height);
	    }
	    var shape = group.addShape('path', {
	      attrs: {
	        path: path
	      }
	    });
	    return shape;
	  },
	  circle: function circle(cfg, group) {
	    getLabelShape(cfg, group, function (labelShape) {
	      var bbox = labelShape.getBBox();
	      var labelWidth = bbox.maxX - bbox.minX + PADDING[1] * 2;
	      var labelHeight = bbox.maxY - bbox.minY + PADDING[0] * 2;
	      var tmp = void 0;
	      var width = void 0;
	      var height = void 0;

	      var a = (labelWidth + labelHeight / 2) / 2;
	      var angle = Math.acos(labelWidth / 2 / a);
	      height = 2 * (Math.sin(angle) * a);
	      width = 2 * a;

	      if (labelWidth < labelHeight) {
	        tmp = height;
	        height = width;
	        width = tmp;
	      }

	      return [width, height];
	    });
	    var width = cfg.size[0];
	    var height = cfg.size[1];
	    var shape = group.addShape('path', {
	      attrs: {
	        path: PathUtil.getEllipsePath(cfg.x, cfg.y, width / 2, height / 2)
	      }
	    });
	    return shape;
	  },
	  text: function text(cfg, group) {
	    if (cfg.labelStyle) {
	      if (!cfg.labelStyle.fill && cfg.color) {
	        cfg.labelStyle.fill = cfg.color;
	      }
	    }
	    if (cfg.color) {
	      cfg.labelStyle = {
	        fill: cfg.color
	      };
	    }
	    if (cfg.size) {
	      if (Util.isArray(cfg.size)) {
	        cfg.labelStyle = {
	          fontSize: Math.min(cfg.size[0], cfg.size[1])
	        };
	      }
	      if (Util.isNumber(cfg.size)) {
	        cfg.labelStyle = {
	          fontSize: cfg.size
	        };
	      }
	    }
	    if (!cfg.label && cfg.label !== 0) {
	      cfg.label = ' ';
	    }
	    var shape = getLabelShape(cfg, group);
	    return shape;
	  },
	  image: function image(cfg, group) {
	    var shape = cfg.shape;
	    var img = Util.isArray(shape) ? shape[1] : shape;
	    return getImageElement(cfg, group, img);
	  },
	  rhombus: function rhombus(cfg, group) {
	    getLabelShape(cfg, group, function (labelShape) {
	      var bbox = labelShape.getBBox();
	      var labelWidth = bbox.maxX - bbox.minX + PADDING[1] * 2;
	      var labelHeight = bbox.maxY - bbox.minY + PADDING[0] * 2;
	      var a = Math.sqrt(labelWidth / 2 * labelHeight / 2);
	      var width = labelWidth + a;
	      var height = labelHeight + a;
	      return [width, height];
	    });
	    var x = cfg.x;
	    var y = cfg.y;
	    var width = cfg.size[0];
	    var height = cfg.size[1];
	    var points = [{
	      x: x,
	      y: y - height / 2
	    }, {
	      x: x + width / 2,
	      y: y
	    }, {
	      x: x,
	      y: y + height / 2
	    }, {
	      x: x - width / 2,
	      y: y
	    }];
	    var shape = group.addShape('path', {
	      attrs: {
	        path: PathUtil.pointsToPolygon(points, true)
	      }
	    });
	    return shape;
	  },
	  html: function html(cfg, group, attrs) {
	    if (cfg.size === 'auto') {
	      return group.addShape('html', {
	        attrs: Util.mix({
	          cx: cfg.x,
	          cy: cfg.y,
	          html: cfg.html
	        }, attrs),
	        autoSize: true
	      });
	    }
	    if (!cfg.size) {
	      cfg.size = [DEFAULTSIZE, DEFAULTSIZE];
	    }
	    var width = cfg.size[0];
	    var height = cfg.size[1];
	    var x = cfg.x - width / 2;
	    var y = cfg.y - height / 2;

	    return group.addShape('html', {
	      attrs: Util.mix({
	        x: x,
	        y: y,
	        width: width,
	        height: height,
	        html: cfg.html
	      }, attrs)
	    });
	  }
	};

	module.exports = EdgeUtil;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 点击激活
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.clickActive = function (graph) {
	  var item = void 0;
	  var shape = void 0;
	  graph._on('itemclick', function (ev) {
	    item = ev.item;
	    shape = ev.shape;
	    if (shape.get('clickActive') !== false) {
	      graph.clearAllActived();
	      graph.setItemActived(item);
	      graph.refreshFront();
	    }
	  });
	};

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 鼠标点击添加节点行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.clickAddNode = function (graph) {
	  HandlerUtil.addNode(graph, 'click');
	};

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 鼠标点击空白区域清除激活子项行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.clickBlankClearActive = function (graph) {
	  graph._on('click', function (ev) {
	    if (!ev.shape) {
	      graph.clearAllActived();
	      graph.refreshFront();
	    }
	  });
	};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 鼠标点击聚焦
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.clickFocus = function (graph) {
	  var el = graph.get('el');
	  el.style.outline = 'none';
	  el.setAttribute('tabindex', 1);
	  graph._on('mousedown', function () {
	    el.focus();
	  });
	  graph._on('domfocus', function () {
	    graph.set('domFocus', true);
	  });
	  graph._on('domblur', function () {
	    graph.set('domFocus', false);
	  });
	};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 点击激活
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.clickNodeActive = function (graph) {
	  var item = void 0;
	  var shape = void 0;
	  graph._on('itemclick', function (ev) {
	    item = ev.item;
	    shape = ev.shape;
	    if (ev.itemType === 'node' && shape.get('clickActive') !== false) {
	      graph.clearAllActived();
	      graph.setItemActived(item);
	      graph.refreshFront();
	    }
	  });
	};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 折叠行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.collapse = function (graph) {
	  graph._on('click', function (ev) {
	    var shape = ev.shape;
	    if (shape && shape.hasClass('collapseButton')) {
	      graph.fire('collapse', ev);
	      graph.css({
	        cursor: 'default'
	      });
	    }
	  });
	  graph._on('collapse', function (ev) {
	    var dataMap = graph.get('dataMap');
	    var item = ev.item;
	    var id = item.get('id');
	    dataMap[id].isCollapsed = true;
	    graph.clearAllActived();
	    graph.refreshFront();
	    graph.reRender();
	  });
	};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 鼠标点击添加节点行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);
	var Util = __webpack_require__(4);

	Handler.dragAddEdge = function (graph) {
	  function getDragEdge(ev) {
	    var item = ev.item;
	    var addingType = graph.get('addingType');
	    var model = graph.get('addingModel');
	    graph.fire('beforedragaddedge', ev);
	    if (item && addingType === 'edge' && graph.isNode(item) && ev.cancel !== true) {
	      model.source = item.get('id'); // 设置源
	      model.target = item.get('id'); // 设置目标
	      return graph.addItem('edge', model);
	    }
	    return undefined;
	  }
	  function getExtremePointIndex(ev, dragEdge) {
	    if (dragEdge) {
	      return 1; // 返回目标端点
	    }
	    return undefined;
	  }
	  function callBack(dragEdge, params) {
	    if (Util.objectToValues(params).length > 0) {
	      graph.updateItem(dragEdge, params);
	      graph.updateRollback();
	      graph.clearAllActived();
	      graph.setItemActived(dragEdge);
	      graph.draw(false);
	      graph.endAdd(dragEdge);
	    } else {
	      graph.removeItem(dragEdge);
	      graph.refreshFront();
	      graph.endAdd();
	    }
	  }
	  HandlerUtil.dragEdgeExtremePoint(graph, getDragEdge, getExtremePointIndex, callBack);
	};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动空白区域水平行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var dragCanvas = __webpack_require__(19);

	Handler.dragBlankX = function (graph) {
	  dragCanvas(graph, true, true, false);
	};

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动空白区域竖直行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var dragCanvas = __webpack_require__(19);

	Handler.dragBlankY = function (graph) {
	  dragCanvas(graph, true, false);
	};

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动边结束后隐藏锚点
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var Util = __webpack_require__(4);

	Handler.dragEdgeEndHideAnchor = function (graph) {
	  graph._on('dragedgeend', function (ev) {
	    Util.isNode(ev.item) && ev.item.hideAnchor(); // 如果连接到有效节点隐藏锚点
	  });
	};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动边行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);
	var Util = __webpack_require__(4);

	Handler.dragEdge = function (graph) {
	  function getDragEdge(ev) {
	    var shape = ev.shape;
	    var dragEdge = void 0;
	    if (shape && shape.hasClass('control-point')) {
	      // 点击节点边框的的点
	      dragEdge = shape.get('item');
	      if (graph.isEdge(dragEdge)) {
	        return dragEdge;
	      }
	    }
	    return undefined;
	  }

	  function getExtremePointIndex(ev, dragEdge) {
	    var shape = ev.shape;
	    var pointIndex = void 0;
	    if (dragEdge) {
	      // 点击节点边框的的点
	      pointIndex = shape.get('pointIndex');
	      if (dragEdge.isExtremePoint(pointIndex)) {
	        return pointIndex;
	      }
	    }
	    return undefined;
	  }

	  function callBack(dragEdge, params) {
	    if (Util.objectToValues(params).length > 0) {
	      graph.updateItem(dragEdge, params);
	      graph.updateRollback();
	      graph.draw(false);
	    } else {
	      graph.refreshFront();
	    }
	  }
	  HandlerUtil.dragEdgeExtremePoint(graph, getDragEdge, getExtremePointIndex, callBack);
	};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动画布隐藏边行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.dragHideEdges = function (graph) {
	  var edgeGroup = graph.get('edgeGroup');
	  graph._on('dragstart', function () {
	    edgeGroup.hide();
	    graph.draw(false);
	  });
	  graph._on('dragend', function () {
	    edgeGroup.show();
	    graph.draw(false);
	  });
	  graph._on('dommouseleave', function () {
	    edgeGroup.show();
	    graph.draw(false);
	  });
	};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动画布隐藏文本行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.dragHideTexts = function (graph) {
	  graph._on('dragstart', function () {
	    HandlerUtil.hideTexts(graph);
	  });
	  graph._on('dragend', function () {
	    HandlerUtil.showTexts(graph);
	  });
	  graph._on('dommouseleave', function () {
	    HandlerUtil.showTexts(graph);
	  });
	};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动锚点结束后隐藏锚点
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.dragNodeEndHideAnchor = function (graph) {
	  graph._on('dragnodeend', function (ev) {
	    if (ev.dragItems.length === 1) {
	      // 只拖动一个点则更新锚点
	      ev.node.showAnchor();
	    } else {
	      // 拖动多个点隐藏锚点
	      ev.node.hideAnchor();
	    }
	  });
	};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动单一锚点结束后激活节点
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.dragNodeEndSetActive = function (graph) {
	  graph._on('dragnodeend', function (ev) {
	    if (ev.dragItems.length === 1) {
	      graph.clearAllActived();
	      graph.setItemActived(ev.dragItems[0]);
	    }
	  });
	};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 拖动节点的行为
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.dragNode = function (graph) {
	  var gridAssist = graph.get('gridAssist');
	  var forceAlign = gridAssist && gridAssist.forceAlign;
	  var behaviourSignal = graph.get('behaviourSignal');
	  var dragItems = [];
	  var startPoint = null;
	  var isDrag = false;
	  var activedItems = void 0;
	  var item = void 0;
	  var shape = void 0;
	  var params = void 0;
	  var controlPoints = void 0; // 边的控制点
	  var position = void 0;
	  var bbox = void 0;

	  graph._on('mousedown', function (ev) {
	    shape = ev.shape;
	    item = ev.item;

	    if (!graph.isNode(item) || shape && shape.hasClass('control-point') || // 若是控制点
	    shape && shape.hasClass('anchor-point')) {
	      // 若是锚点
	      return;
	    }
	    startPoint = {
	      x: ev.x,
	      y: ev.y
	    };
	    if (!item.isActived()) {
	      dragItems.push(item);
	    } else {
	      activedItems = graph._getAllActived();
	      Util.each(activedItems, function (activedItem) {
	        dragItems.push(activedItem);
	      });
	    }
	  });

	  graph._on('dragmove', function (ev) {
	    if (!Util.isArray(dragItems) || dragItems.length === 0) {
	      return;
	    }
	    isDrag = true;
	    behaviourSignal.draggingNode = true;
	    Util.each(dragItems, function (dragItem) {
	      if (graph.isNode(dragItem)) {
	        bbox = dragItem.getBBox();
	        position = {
	          x: (bbox.x + bbox.maxX) / 2,
	          y: (bbox.y + bbox.maxY) / 2
	        };
	        dragItem.showDelegation({
	          x: position.x + ev.x - startPoint.x,
	          y: position.y + ev.y - startPoint.y
	        });
	      }
	    });
	    graph.refreshFront();
	  });

	  graph._on('mouseup', function (ev) {
	    if (!Util.isArray(dragItems) || dragItems.length === 0) {
	      return;
	    }
	    if (isDrag) {
	      item = ev.item;
	      // 若 subItem 已经被销毁则，滤除
	      dragItems = Util.filter(dragItems, function (subItem) {
	        return graph.isInGraph(subItem);
	      });
	      Util.each(dragItems, function (subItem) {
	        if (graph.isNode(subItem)) {
	          position = subItem.getPosition();
	          params = {
	            x: position.x + ev.x - startPoint.x,
	            y: position.y + ev.y - startPoint.y
	          };
	          // 拖拽的对象会自动放到最上面
	          if (item !== subItem && subItem && !subItem.hasClass('preventToFront')) {
	            graph.toFront(subItem);
	          }
	          // 网格对齐
	          if (forceAlign) {
	            HandlerUtil.alignPoint(params, gridAssist.cell);
	          }
	          subItem.hideDelegation();
	        } else {
	          controlPoints = subItem.getControlPoints();
	          params = {};
	          if (controlPoints.length > 2) {
	            Util.each(controlPoints, function (controlPoint, i) {
	              if (i === 0 || i === controlPoints.length - 1) {
	                // 两端点不移动
	                return;
	              }
	              controlPoint.x = controlPoint.x + ev.x - startPoint.x;
	              controlPoint.y = controlPoint.y + ev.y - startPoint.y;
	              if (forceAlign) {
	                HandlerUtil.alignPoint(controlPoint, gridAssist.cell);
	              }
	            });
	            params = {
	              controlPoints: controlPoints
	            };
	          }
	        }
	        graph.updateItem(subItem, params);

	        if (graph.isNode(subItem)) {
	          // 更新锚点
	          graph.fire('dragnodeend', {
	            dragItems: dragItems,
	            node: subItem
	          });
	        }
	      });
	      graph.updateRollback();
	      graph.draw(false);
	    }

	    startPoint = null;
	    item = undefined;
	    position = undefined;
	    controlPoints = undefined;
	    activedItems = undefined;
	    params = undefined;
	    dragItems = [];
	    isDrag = false;
	    behaviourSignal.draggingNode = undefined;
	  });
	};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 悬浮锚点触发激活态
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.hoverAnchorSetActived = function (graph) {
	  var shape = void 0;
	  graph._on('mouseenter', function (ev) {
	    shape = ev.shape;
	    if (shape && shape.hasClass('anchor-point')) {
	      graph.setAnchorActived(shape);
	    }
	  });
	  graph._on('mouseleave', function (ev) {
	    shape = ev.shape;
	    if (shape && shape.hasClass('anchor-point')) {
	      graph.setAnchorUnActived(shape);
	    }
	  });
	};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 悬浮节点显示锚点
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.hoverNodeShowAnchor = function (graph) {
	  var behaviourSignal = graph.get('behaviourSignal');
	  var timer = void 0;
	  graph._on('itemmouseenter', function (ev) {
	    if (ev.itemType === 'node' && !behaviourSignal.draggingNode) {
	      timer = setTimeout(function () {
	        !graph.destroyed && graph.showAnchor(ev.item);
	      }, 200);
	    }
	  });
	  graph._on('itemmouseleave', function (ev) {
	    if (ev.itemType === 'node') {
	      clearTimeout(timer);
	      !graph.destroyed && graph.hideAnchor(ev.item);
	    }
	  });
	};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 鼠标点击添加节点行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.mouseupAddNode = function (graph) {
	  HandlerUtil.addNode(graph, 'mouseup');
	};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 多选行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var Global = __webpack_require__(7);
	var Util = __webpack_require__(4);

	Handler.multiSelect = function (graph) {
	  var frontCanvasRootGroup = graph.get('frontCanvasRootGroup');
	  var behaviourSignal = graph.get('behaviourSignal');
	  var isInRect = false; // 是否点在矩形框内标识
	  var activeItems = [];
	  var itemCache = void 0;
	  var bbox = void 0;
	  var cornerPoints = void 0;
	  var item = void 0;
	  var shape = void 0; // 前方画布的图形
	  var frameRect = void 0; // G 框选框
	  var startPoint = void 0;
	  var minX = void 0;
	  var minY = void 0;
	  var maxX = void 0;
	  var maxY = void 0;

	  graph._on('mousedown', function (ev) {
	    item = ev.item;
	    shape = ev.shape;
	    if (item || frameRect || shape) {
	      return;
	    }
	    startPoint = {
	      x: ev.x,
	      y: ev.y
	    };
	    frameRect = frontCanvasRootGroup.addShape('rect', {
	      attrs: Global.frameRectStyle
	    });
	    behaviourSignal.frameSelecting = true;
	  });

	  graph._on('dragmove', function (ev) {
	    if (!frameRect) {
	      return;
	    }
	    minX = Math.min(startPoint.x, ev.x);
	    minY = Math.min(startPoint.y, ev.y);
	    maxX = Math.max(startPoint.x, ev.x);
	    maxY = Math.max(startPoint.y, ev.y);
	    frameRect.attr({
	      x: minX,
	      y: minY,
	      width: maxX - minX,
	      height: maxY - minY
	    });

	    graph.refreshFront();
	  });

	  graph._on('mouseup', function () {
	    if (!frameRect) {
	      return;
	    }
	    itemCache = graph.get('itemCache');
	    Util.each(itemCache, function (itemc) {
	      bbox = itemc.getBBox();
	      cornerPoints = [{
	        x: bbox.x,
	        y: bbox.y
	      }, {
	        x: bbox.x,
	        y: bbox.maxY
	      }, {
	        x: bbox.maxX,
	        y: bbox.y
	      }, {
	        x: bbox.maxX,
	        y: bbox.maxY
	      }];

	      Util.each(cornerPoints, function (cornerPoint, k) {
	        isInRect = Util.isInRect(cornerPoint, minX, minY, maxX, maxY);
	        if (graph.isNode(itemc)) {
	          // 若是节点则有一个顶点在框内则选中
	          if (isInRect) {
	            activeItems.push(itemc);
	            // graph.setItemActived(itemc);
	            return false;
	          }
	        } else {
	          // 若是边则需要所有顶点在框内则选中
	          if (!isInRect) {
	            return false;
	          }
	          if (k === cornerPoints.length - 1) {
	            activeItems.push(itemc);
	            // graph.setItemActived(itemc);
	          }
	        }
	      });
	    });
	    graph.clearAllActived();
	    graph.setItemsActived(activeItems);
	    frameRect.remove(true);
	    graph.refreshFront();
	    behaviourSignal.frameSelecting = undefined;
	    item = undefined;
	    frameRect = undefined; // G 框选框
	    startPoint = undefined;
	    minX = undefined;
	    minY = undefined;
	    maxX = undefined;
	    maxY = undefined;
	    activeItems = [];
	  });
	};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 边变型行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);
	var Util = __webpack_require__(4);

	Handler.resizeEdge = function (graph) {
	  var gridAssist = graph.get('gridAssist');
	  var forceAlign = gridAssist && gridAssist.forceAlign;
	  var item = void 0;
	  var actived = void 0;
	  var controlEdge = void 0;
	  var controlPoint = void 0;
	  var controlPoints = void 0;
	  var lastPoint = void 0;
	  var nextPoint = void 0;
	  var point = void 0;
	  var params = void 0;
	  var controlPointIndex = void 0;
	  var pointInfo = void 0;
	  var shape = void 0; // 当前上层画布shape

	  graph._on('click', function (ev) {
	    item = ev.item;
	    actived = graph.getActived();
	    shape = ev.shape;
	    if (!graph.isEdge(item) || !(item === actived) || shape && shape.hasClass('control-point')) {
	      return;
	    }
	    item.addControlPoint({
	      x: ev.x,
	      y: ev.y
	    });
	    controlPoints = item.getControlPoints();
	    graph.updateItem(item, {
	      controlPoints: controlPoints
	    });
	    graph.updateRollback();
	    graph.refreshFront();
	  });

	  graph._on('mousedown', function (ev) {
	    shape = ev.shape;
	    if (shape && shape.hasClass('control-point')) {
	      // 点击节点边框的的点
	      controlEdge = shape.get('item');
	      if (!graph.isEdge(controlEdge)) {
	        controlEdge = undefined;
	        return;
	      }
	      controlPointIndex = shape.get('pointIndex');
	      if (controlEdge.isExtremePoint(controlPointIndex)) {
	        controlEdge = undefined;
	        controlPointIndex = undefined;
	        return;
	      }
	      controlPoint = shape.get('point');
	      controlPoints = controlEdge.getControlPoints();
	      lastPoint = controlPoints[controlPointIndex - 1];
	      nextPoint = controlPoints[controlPointIndex + 1];
	    }
	  });
	  graph._on('dragmove', function (ev) {
	    if (!graph.isEdge(controlEdge)) {
	      return;
	    }
	    item = ev.item;
	    pointInfo = {
	      x: ev.x,
	      y: ev.y,
	      controlPointIndex: controlPointIndex
	    };
	    if (Util.isInSegment(lastPoint, nextPoint, pointInfo)) {
	      pointInfo.stroke = 'red';
	    } else {
	      pointInfo.stroke = 'blue';
	    }
	    controlEdge.showDelegation(pointInfo);
	    graph.refreshFront();
	  });
	  graph._on('mouseup', function (ev) {
	    if (!graph.isEdge(controlEdge)) {
	      return;
	    }
	    item = ev.item;
	    point = {
	      x: ev.x,
	      y: ev.y
	    };
	    params = {};

	    controlEdge.hideDelegation();

	    if (Util.isInSegment(lastPoint, nextPoint, point)) {
	      // 共线消除节点
	      controlPoints.splice(controlPointIndex, 1);
	    } else {
	      if (controlPointIndex !== 0 && controlPointIndex !== controlPoints.length - 1) {
	        controlPoint.x = point.x;
	        controlPoint.y = point.y;
	        if (forceAlign) HandlerUtil.alignPoint(controlPoint, gridAssist.cell);
	        params.controlPoints = controlPoints;
	      }
	    }

	    graph.updateItem(controlEdge, params);
	    graph.updateRollback();

	    graph.draw(false);
	    item = undefined;
	    actived = undefined;
	    controlEdge = undefined;
	    controlPoint = undefined;
	    controlPoints = undefined;
	    lastPoint = undefined;
	    nextPoint = undefined;
	    point = undefined;
	    params = undefined;
	    controlPointIndex = undefined;
	    pointInfo = undefined;
	    shape = undefined;
	  });
	};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 节点变型行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.resizeNode = function (graph) {
	  var behaviourSignal = graph.get('behaviourSignal');
	  var isControl = false; // 没移动不control
	  var shape = void 0;
	  var point = void 0;
	  var size = void 0;
	  var pointInfo = void 0;
	  var controlNode = void 0;
	  var controlPoint = void 0;
	  var controlPointIndex = void 0;

	  graph._on('mousedown', function (ev) {
	    shape = ev.shape;
	    if (shape && shape.hasClass('control-point')) {
	      // 点击节点边框的的点
	      controlNode = shape.get('item');
	      controlPoint = shape.get('point');
	      controlPointIndex = shape.get('pointIndex');
	    }
	  });
	  graph._on('dragmove', function (ev) {
	    if (!graph.isNode(controlNode)) {
	      return;
	    }
	    isControl = true;
	    behaviourSignal.resizingNode = true;
	    point = {
	      x: ev.x,
	      y: ev.y
	    };
	    pointInfo = HandlerUtil.getControlInfo(point, controlPointIndex, controlPoint, controlNode, 'frontCanvas');
	    size = pointInfo.size;
	    if (size[0] > 5 && size[1] > 5) {
	      controlNode.showDelegation(pointInfo);
	      graph.refreshFront();
	    }
	  });
	  graph._on('mouseup', function (ev) {
	    if (!graph.isNode(controlNode)) {
	      return;
	    }
	    if (isControl) {
	      point = {
	        x: ev.x,
	        y: ev.y
	      };
	      pointInfo = HandlerUtil.getControlInfo(point, controlPointIndex, controlPoint, controlNode);
	      size = pointInfo.size;
	      if (size[0] > 5 && size[1] > 0) {
	        graph.updateItem(controlNode, pointInfo);
	        graph.updateRollback();
	      }
	      controlNode.hideDelegation();
	      graph.draw(false);
	    }
	    behaviourSignal.resizingNode = undefined;
	    shape = undefined;
	    point = undefined;
	    size = undefined;
	    pointInfo = undefined;
	    controlNode = undefined;
	    controlPoint = undefined;
	    isControl = false;
	    controlPointIndex = undefined;
	  });
	};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 快捷键行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.shortcut = function (graph) {
	  var isPress = false;

	  graph._on('keydown', function (ev) {
	    if (ev.keyCode === 32) {
	      if (isPress) {
	        return;
	      }
	      isPress = true;
	      if (graph.get('mode') === 'drag') {
	        graph.changeMode('edit');
	      } else {
	        graph.changeMode('drag');
	      }
	      isPress = true;
	    }
	    // cmd + c
	    if (ev.metaKey && ev.keyCode === 67) {
	      graph.copy();
	      return;
	    }
	    // cmd + v
	    if (ev.metaKey && ev.keyCode === 86) {
	      graph.paste();
	      return;
	    }
	    // cmd + alt + z
	    if (ev.metaKey && ev.altKey && ev.keyCode === 90) {
	      graph.redo();
	      return;
	    }
	    // cmd + z
	    if (ev.metaKey && ev.keyCode === 90) {
	      graph.updo();
	      return;
	    }

	    // ctrl + c
	    if (ev.ctrlKey && ev.keyCode === 67) {
	      graph.copy();
	      return;
	    }

	    // ctrl + v
	    if (ev.ctrlKey && ev.keyCode === 86) {
	      graph.paste();
	      return;
	    }

	    // ctrl + alt + z
	    if (ev.ctrlKey && ev.altKey && ev.keyCode === 90) {
	      graph.redo();
	      return;
	    }

	    // ctrl + z
	    if (ev.ctrlKey && ev.keyCode === 90) {
	      graph.updo();
	      return;
	    }

	    // delete
	    if (ev.keyCode === 8 || ev.keyCode === 46) {
	      graph.del();
	      return;
	    }
	  });
	  graph._on('keyup', function () {
	    isPress = false;
	  });
	};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 展开行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);

	Handler.spreadout = function (graph) {
	  graph._on('click', function (ev) {
	    var shape = ev.shape;
	    if (shape && shape.hasClass('spreadoutButton')) {
	      graph.fire('spreadout', ev);
	      graph.css({
	        cursor: 'default'
	      });
	    }
	  });
	  graph._on('spreadout', function (ev) {
	    var dataMap = graph.get('dataMap');
	    var item = ev.item;
	    var id = item.get('id');
	    dataMap[id].isCollapsed = false;
	    graph.clearAllActived();
	    graph.refreshFront();
	    graph.reRender();
	  });
	};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 缩放自动隐藏或显示文本标签
	 * 视觉上小于 20 * 20 隐藏文本标签
	 * 鼠标进入显示文本标签（无论多小）
	 * 鼠标移出隐藏文本标签（视觉尺寸小于阈值）
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.wheelZoomAutoTexts = function (graph) {
	  graph.on('afterrender', function () {
	    HandlerUtil.autoTexts(graph);
	  });
	  graph.on('wheelzoomend', function () {
	    HandlerUtil.autoTexts(graph);
	  });
	  graph.on('itemmouseenter', function (ev) {
	    if (ev.itemType === 'node') {
	      HandlerUtil.showText(ev.item);
	      graph.draw(false);
	    }
	  });
	  graph.on('itemmouseleave', function (ev) {
	    if (ev.itemType === 'node') {
	      var group = ev.item.getGroup();
	      group.traverseChildren(function (child) {
	        var autoTextHide = child.get('autoTextHide');
	        if (child.type === 'text' && autoTextHide !== false) {
	          child.hide();
	        }
	      });
	      graph.draw(false);
	    }
	  });
	};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 缩放隐藏边行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.onWheelZoomEdges = function (graph) {
	  var edgeGroup = graph.get('edgeGroup');
	  HandlerUtil.onWheelZoom(graph, function () {
	    edgeGroup.hide();
	    graph.draw(false);
	  }, function () {
	    edgeGroup.show();
	    graph.draw(false);
	  });
	};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 缩放隐藏文本行为
	 * @author huangtonger@aliyun.com
	 */

	var Handler = __webpack_require__(2);
	var HandlerUtil = __webpack_require__(9);

	Handler.onWheelZoomTexts = function (graph) {
	  HandlerUtil.onWheelZoom(graph, function () {
	    HandlerUtil.hideTexts(graph);
	  }, function () {
	    HandlerUtil.showTexts(graph);
	  });
	};

/***/ }),
/* 170 */
/***/ (function(module, exports) {

	"use strict";

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// wrap tree node
	// TODO considering size
	var WrappedTree = function WrappedTree(height) {
	  var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  _classCallCheck(this, WrappedTree);

	  var me = this;
	  me.x = me.y = 0;
	  me.leftChild = me.rightChild = null;
	  me.height = height || 0;
	  me.children = children;
	};

	var DEFAULT_OPTIONS = {
	  isHorizontal: true,
	  nodeSep: 20,
	  nodeSize: 20,
	  rankSep: 200,
	  subTreeSep: 10
	};

	function convertBack(converted /* WrappedTree */, root /* TreeNode */, isHorizontal) {
	  if (isHorizontal) {
	    root.x = converted.x;
	    root.y = converted.y;
	  } else {
	    root.x = converted.y;
	    root.y = converted.x;
	  }
	  converted.children.forEach(function (child, i) {
	    convertBack(child, root.children[i], isHorizontal);
	  });
	}

	module.exports = function (root) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  options = _extends({}, DEFAULT_OPTIONS, options);

	  var maxDepth = 0;
	  function wrappedTreeFromNode(n) {
	    if (!n) return null;
	    n.width = 0;
	    if (n.depth && n.depth > maxDepth) {
	      maxDepth = n.depth; // get the max depth
	    }
	    var children = n.children;
	    var childrenCount = children.length;
	    var t = new WrappedTree(n.height, []);
	    children.forEach(function (child, i) {
	      var childWT = wrappedTreeFromNode(child);
	      t.children.push(childWT);
	      if (i === 0) {
	        // t.leftChild = childWT.leftChild ? childWT.leftChild : childWT
	        t.leftChild = childWT;
	      }
	      if (i === childrenCount - 1) {
	        // t.rightChild = childWT.rightChild ? childWT.rightChild : childWT
	        t.rightChild = childWT;
	      }
	    });
	    t.originNode = n;
	    t.isLeaf = n.isLeaf();
	    return t;
	  }

	  function getDrawingDepth(t) {
	    if (t.isLeaf || t.children.length === 0) {
	      t.drawingDepth = maxDepth;
	    } else {
	      var depths = t.children.map(function (child) {
	        return getDrawingDepth(child);
	      });
	      var minChildDepth = Math.min.apply(null, depths);
	      t.drawingDepth = minChildDepth - 1;
	    }
	    return t.drawingDepth;
	  }

	  var prevLeaf = void 0;

	  function position(t) {
	    t.x = t.drawingDepth * options.rankSep;
	    if (t.isLeaf) {
	      t.y = 0;
	      if (prevLeaf) {
	        t.y = prevLeaf.y + prevLeaf.height + options.nodeSep;
	        if (t.originNode.parent !== prevLeaf.originNode.parent) {
	          t.y += options.subTreeSep;
	        }
	      }
	      prevLeaf = t;
	    } else {
	      t.children.forEach(function (child) {
	        position(child);
	      });
	      t.y = (t.leftChild.y + t.rightChild.y) / 2;
	    }
	  }

	  // wrap node
	  var wt = wrappedTreeFromNode(root);
	  // get depth for drawing
	  getDrawingDepth(wt);
	  // get position
	  position(wt);
	  // get x, y
	  convertBack(wt, root, options.isHorizontal);
	  return root;
	};

/***/ }),
/* 171 */
/***/ (function(module, exports) {

	"use strict";

	var DEFAULT_INDENT = 20;
	function positionNode(node, previousNode, dx) {
	  node.x += dx * node.depth;
	  node.y = previousNode ? previousNode.y + previousNode.height : 0;
	}
	module.exports = function (root) {
	  var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_INDENT;

	  var previousNode = null;
	  root.eachNode(function (node) {
	    positionNode(node, previousNode, indent);
	    previousNode = node;
	  });
	};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var TreeLayout = __webpack_require__(14);
	var nonLayeredTidyTree = __webpack_require__(69);
	var doTreeLayout = __webpack_require__(32);

	var CompactBoxTreeLayout = function (_TreeLayout) {
	  _inherits(CompactBoxTreeLayout, _TreeLayout);

	  function CompactBoxTreeLayout() {
	    _classCallCheck(this, CompactBoxTreeLayout);

	    return _possibleConstructorReturn(this, _TreeLayout.apply(this, arguments));
	  }

	  CompactBoxTreeLayout.prototype.execute = function execute() {
	    _TreeLayout.prototype._prepareRoot.call(this);
	    var me = this;
	    me.options.forceAlign = 'R';
	    return doTreeLayout(me.rootNode, me.options, nonLayeredTidyTree);
	  };

	  return CompactBoxTreeLayout;
	}(TreeLayout);

	module.exports = CompactBoxTreeLayout;

/***/ }),
/* 173 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = {
	  T: { // center of top border
	    x: 0.5,
	    y: 0
	  },
	  R: { // center of right border
	    x: 1,
	    y: 0.5
	  },
	  B: { // center of bottom border
	    x: 0.5,
	    y: 1
	  },
	  L: { // center of left border
	    x: 0,
	    y: 0.5
	  },
	  // C: { // center of shape
	  //   x: 0.5,
	  //   y: 0.5
	  // },
	  C: null
	};

/***/ }),
/* 174 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = ['LR', // left to right
	'RL', // right to left
	'TB', // top to bottom
	'BT', // bottom to top
	'H', // horizontal
	'V'];

/***/ }),
/* 175 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = ['LR', // left to right
	'RL', // right to left
	'H', // horizontal
	'L', // horizontal
	'R'];

/***/ }),
/* 176 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = 18;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var TreeLayout = __webpack_require__(14);
	var dendrogram = __webpack_require__(170);
	var doTreeLayout = __webpack_require__(32);

	var DendrogramLayout = function (_TreeLayout) {
	  _inherits(DendrogramLayout, _TreeLayout);

	  function DendrogramLayout() {
	    _classCallCheck(this, DendrogramLayout);

	    return _possibleConstructorReturn(this, _TreeLayout.apply(this, arguments));
	  }

	  DendrogramLayout.prototype.execute = function execute() {
	    _TreeLayout.prototype._prepareRoot.call(this);
	    var me = this;
	    var root = me.rootNode;
	    var options = me.options;
	    root.width = 0;
	    doTreeLayout(root, options, dendrogram);
	    return root;
	  };

	  return DendrogramLayout;
	}(TreeLayout);

	module.exports = DendrogramLayout;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var TreeLayout = __webpack_require__(14);
	var indentedTree = __webpack_require__(171);
	var setAnchors = __webpack_require__(71);
	var separateTree = __webpack_require__(70);

	var VALID_DIRECTIONS = ['LR', // left to right
	'RL', // right to left
	'H'];
	var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

	var IndentedTreeLayout = function (_TreeLayout) {
	  _inherits(IndentedTreeLayout, _TreeLayout);

	  function IndentedTreeLayout() {
	    _classCallCheck(this, IndentedTreeLayout);

	    return _possibleConstructorReturn(this, _TreeLayout.apply(this, arguments));
	  }

	  IndentedTreeLayout.prototype.execute = function execute() {
	    _TreeLayout.prototype._prepareRoot.call(this);
	    var me = this;
	    var root = me.rootNode;
	    var options = me.options;
	    options.isHorizontal = true;
	    var indent = options.indent;
	    me.options.forceAlign = 'R';
	    var direction = options.direction || DEFAULT_DIRECTION;
	    if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
	      throw new TypeError('Invalid direction: ' + direction);
	    }
	    if (direction === VALID_DIRECTIONS[0]) {
	      // LR
	      indentedTree(root, indent);
	      setAnchors(root, 'L', 'L', options);
	    } else if (direction === VALID_DIRECTIONS[1]) {
	      // RL
	      indentedTree(root, indent);
	      root.right2left();
	      setAnchors(root, 'R', 'R', options);
	    } else if (direction === VALID_DIRECTIONS[2]) {
	      // H
	      // separate into left and right trees
	      var _separateTree = separateTree(root, options),
	          left = _separateTree.left,
	          right = _separateTree.right;

	      indentedTree(left, indent);
	      left.right2left();
	      setAnchors(left, 'R', 'R', options);
	      indentedTree(right, indent);
	      setAnchors(right, 'L', 'L', options);
	      var bbox = left.getBoundingBox();
	      right.translate(bbox.width, 0);
	      root.x = right.x - root.width / 2;
	      setAnchors(root, 'B', 'B', options, true);
	    }
	    root.eachNode(function (node) {
	      var data = node.data;
	      data.x = node.x + node.width / 2 + node.hgap;
	      data.y = node.y + node.height / 2 + node.vgap;
	      data.align = node.align;
	      data.inAnchor = node.inAnchor ? [node.inAnchor.x, node.inAnchor.y] : null;
	      data.outAnchor = node.outAnchor ? [node.outAnchor.x, node.outAnchor.y] : null;
	    });
	    return root;
	  };

	  return IndentedTreeLayout;
	}(TreeLayout);

	module.exports = IndentedTreeLayout;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Node = __webpack_require__(33);
	var TreeLayout = __webpack_require__(14);
	var nonLayeredTidyTree = __webpack_require__(69);
	var doTreeLayout = __webpack_require__(32);

	var DEFAULT_OPTIONS = {
	  nodeSize: 20,
	  nodeSep: 20,
	  rankSep: 200
	  /*
	   * TODO handle width, height, hgap, vgap, etc.
	   */
	};

	var CompactBoxTreeLayout = function (_TreeLayout) {
	  _inherits(CompactBoxTreeLayout, _TreeLayout);

	  function CompactBoxTreeLayout() {
	    _classCallCheck(this, CompactBoxTreeLayout);

	    return _possibleConstructorReturn(this, _TreeLayout.apply(this, arguments));
	  }

	  CompactBoxTreeLayout.prototype.execute = function execute() {
	    _TreeLayout.prototype._prepareRoot.call(this);
	    var me = this;
	    var options = _extends({}, DEFAULT_OPTIONS, me.options);
	    var size = options.nodeSize || DEFAULT_OPTIONS.nodeSize;
	    var nodeSep = options.nodeSep || DEFAULT_OPTIONS.nodeSep;
	    var rankSep = options.rankSep || DEFAULT_OPTIONS.rankSep;
	    me.rootNode = new Node(me.root, _extends(options, {
	      getWidth: function getWidth() {
	        return size;
	      },
	      getHeight: function getHeight() {
	        return size;
	      },
	      getHGap: function getHGap() {
	        return rankSep;
	      },
	      getVGap: function getVGap() {
	        return nodeSep;
	      }
	    }));
	    var root = me.rootNode;
	    doTreeLayout(root, options, nonLayeredTidyTree);
	    return root;
	  };

	  return CompactBoxTreeLayout;
	}(TreeLayout);

	module.exports = CompactBoxTreeLayout;

/***/ }),
/* 180 */
/***/ (function(module, exports) {

	'use strict';

	var reverse = {
	  R: 'L',
	  L: 'R',
	  T: 'B',
	  B: 'T'
	};

	module.exports = function (direction) {
	  return reverse[direction];
	};

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var treeHorizontalDirections = __webpack_require__(175);

	module.exports = function (direction) {
	  return treeHorizontalDirections.indexOf(direction) > -1;
	};

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 网图行为选择器
	 * @author huangtonger@aliyun.com
	 */

	__webpack_require__(65);
	__webpack_require__(143);
	__webpack_require__(147);
	__webpack_require__(144);
	__webpack_require__(161);
	__webpack_require__(145);
	__webpack_require__(149);
	__webpack_require__(66);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(19);
	__webpack_require__(153);
	__webpack_require__(152);
	__webpack_require__(154);
	__webpack_require__(155);
	__webpack_require__(158);
	__webpack_require__(156);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(162);
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(67);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(157);
	__webpack_require__(146);
	__webpack_require__(167);

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 编辑器相关
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Graph = __webpack_require__(13);
	var GraphUtil = Graph.Util;
	var ROLLBACK = {
	  max: 5, // max 5
	  current: 0, // 当前栈
	  cache: []
	};
	var CLIPBOARD = {
	  nodes: [],
	  edges: []
	};

	var Mixin = function Mixin() {};

	Mixin.ATTRS = {
	  /**
	   * 剪贴板
	   * @type {Object}
	   */
	  clipboard: false,

	  /**
	   * 回滚存储
	   * @type {Object}
	   */
	  rollback: false
	};

	Util.augment(Mixin, {
	  _initEditor: function _initEditor() {
	    var rollback = this.get('rollback');
	    var clipboard = this.get('clipboard');
	    if (rollback) {
	      if (Util.isObject(rollback)) {
	        this.set('rollback', Util.mix({}, ROLLBACK, rollback));
	      } else {
	        this.set('rollback', Util.clone(ROLLBACK));
	      }
	    }
	    if (clipboard) {
	      this.set('clipboard', Util.clone(CLIPBOARD));
	    }
	  },

	  // 更新数据
	  _changeData: function _changeData(nodes, edges) {
	    this._clearInner();
	    this._initData();
	    this.source(nodes, edges);
	    this.render(false);
	  },

	  // 更新回退栈
	  updateRollback: function updateRollback() {
	    var rollback = this.get('rollback');
	    if (!Util.isObject(rollback)) {
	      return;
	    }
	    var current = rollback.current;
	    var cache = rollback.cache;
	    var max = rollback.max;
	    var l = cache.length;
	    var now = this.save().source;
	    cache.splice(0, current, now);
	    if (l > max) {
	      cache.splice(max, l - max + 1);
	    }
	    rollback.current = 0;
	  },

	  /**
	   * 复制
	   */
	  copy: function copy() {
	    var self = this;
	    var activeItems = self.getAllActived();
	    var clipboard = self.get('clipboard');
	    var copyMap = {};
	    var model = void 0;
	    var target = void 0;
	    var source = void 0;

	    clipboard.nodes = [];
	    clipboard.edges = [];

	    Util.each(activeItems, function (activeItem) {
	      model = Util.mix(true, {}, activeItem.get('model'), {
	        id: GraphUtil.guid()
	      });
	      copyMap[activeItem.get('model').id] = model.id;
	      if (self.isNode(activeItem)) {
	        model.x += 10;
	        model.y -= 10;
	        clipboard.nodes.push(model);
	      } else {
	        target = activeItem.get('model').target;
	        source = activeItem.get('model').source;
	        target = self.find(target);
	        source = self.find(source);
	        if (activeItems.indexOf(target) !== -1 && activeItems.indexOf(source) !== -1) {
	          if (model.controlPoints) {
	            Util.each(model.controlPoints, function (point, i) {
	              model.controlPoints[i] = {
	                x: point.x += 10,
	                y: point.y -= 10
	              };
	            });
	          }
	          model.target = copyMap[model.target];
	          model.source = copyMap[model.source];
	          clipboard.edges.push(model);
	        }
	      }
	    });
	    this.refresh();
	  },

	  /**
	   * 粘贴
	   */
	  paste: function paste() {
	    var self = this;
	    var clipboard = self.get('clipboard');
	    var arr = self._addNodes(clipboard.nodes);
	    arr = arr.concat(self._addEdges(clipboard.edges));
	    self.clearAllActived();
	    self.setItemsActived(arr);
	    clipboard.nodes = []; // 清空剪贴板
	    clipboard.edges = []; // 清空剪贴板
	    self.updateRollback();
	    this.refresh();
	  },

	  /**
	   * 删除
	   */
	  del: function del() {
	    var self = this;
	    var activeItems = self.getAllActived();
	    Util.each(activeItems, function (item) {
	      self.removeItem(item);
	    });
	    this.updateRollback();
	    this.refresh();
	  },
	  undo: function undo() {
	    var rollback = this.get('rollback');
	    if (!Util.isObject(rollback)) {
	      return;
	    }
	    var cache = rollback.cache;
	    var current = rollback.current;
	    var toIndex = current + 1;
	    var toData = cache[toIndex];
	    if (cache.length === 0 || !toData) {
	      return;
	    }
	    toData = Util.clone(toData);
	    this._changeData(toData.nodes, toData.edges);
	    rollback.current = toIndex;
	    this.refresh();
	  },

	  /**
	   * 撤销
	   * 拼写错误兼容
	   */
	  updo: function updo() {
	    this.undo();
	  },

	  /**
	   * 重做
	   */
	  redo: function redo() {
	    var rollback = this.get('rollback');
	    if (!Util.isObject(rollback)) {
	      return;
	    }
	    var cache = rollback.cache;
	    var current = rollback.current;
	    var toIndex = current - 1;
	    var toData = cache[toIndex];
	    if (cache.length === 0 || !toData) {
	      return;
	    }
	    toData = Util.clone(toData);
	    this._changeData(toData.nodes, toData.edges);
	    rollback.current = toIndex;
	    this.refresh();
	  },

	  /**
	   * 添加元素的类型
	   * @param  {String} itemType 元素类型
	   * @param  {Object} model    数据模型
	   */
	  beginAdd: function beginAdd(itemType, model) {
	    this.changeMode('add');
	    this.set('addingType', itemType);
	    this.set('addingModel', model);
	  },

	  /**
	   * @param  {Item} item 元素类型
	   * 结束添加元素
	   */
	  endAdd: function endAdd(item) {
	    this.changeMode('edit');
	    this.set('addingType', '');
	    this.set('addingModel', null);
	    if (item) {
	      this.fire('afteradd', {
	        item: item
	      });
	    }
	  }
	});

	module.exports = Mixin;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 网图 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Net = __webpack_require__(185);
	__webpack_require__(182);
	Net.Mode = {
	  // 默认模式
	  default: ['dragNode', 'dragEdge', 'dragBlank', 'clickBlankClearActive', 'resizeEdge', 'clickActive', 'resizeNode', 'wheelZoom', 'dragNodeEndSetActive', 'clickFocus'],
	  // 编辑模式
	  edit: ['dragNode', 'dragEdge', 'clickBlankClearActive', 'clickFocus', 'resizeEdge', 'clickActive', 'dragNodeEndSetActive', 'multiSelect', 'resizeNode', 'shortcut', 'wheelZoom', 'hoverNodeShowAnchor', 'hoverAnchorSetActived', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor'],
	  // 拖动模式（查看模式）
	  drag: ['shortcut', 'dragCanvas', 'wheelZoom', 'clickFocus'],
	  // 添加模式
	  add: ['clickAddNode', 'dragAddEdge', 'hoverAnchorSetActived', 'hoverNodeShowAnchor'],
	  // 复杂模式 TODO:（应被图分析模式，后期大版本升级去掉） need delete
	  complicated: ['dragCanvas', 'wheelZoom', 'dragHideEdges', 'wheelZoomHideEdges'],
	  // 图分析模式
	  analysis: ['dragCanvas', 'wheelZoom', 'clickFocus', 'dragHideEdges', 'wheelZoomAutoTexts', 'wheelZoomHideEdges', 'wheelZoomHideTexts'],
	  // 空模式
	  none: []
	};

	module.exports = Net;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 网图
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var EditorMixin = __webpack_require__(183);
	var Graph = __webpack_require__(13);

	var Net = function Net(cfg) {
	  Net.superclass.constructor.call(this, cfg);
	};

	Net.ATTRS = {
	  /**
	   * 默认节点形
	   * @type {String}
	   */
	  defaultNodeShape: 'rect',

	  /**
	   * 参与布局边过滤器
	   * @type {String}
	   */
	  layoutEdgeFilter: null,

	  /**
	   * 参与布局节点过滤器
	   * @type {String}
	   */
	  layoutNodeFilter: null
	};

	Util.extend(Net, Graph);

	Util.mixin(Net, [EditorMixin]);

	Util.augment(Net, {
	  _initCfg: function _initCfg() {
	    var mode = this.get('mode');
	    if (mode === 'analysis') {
	      this.set('useAnchor', false);
	      this.set('useFreezeSizeGroup', true);
	      this.set('useEdgeSortGroup', false);
	      this.set('grid', null);
	    }

	    if (mode === 'edit') {
	      this.set('wheelScaleLimit', [0.5, 4]);
	      this.set('rollback', true);
	      this.set('clipboard', true);
	    }
	    Net.superclass._initCfg.call(this);
	  },

	  // 读数据
	  _readSource: function _readSource(data) {
	    this.source(data.nodes, data.edges);
	  },

	  /**
	   * 加载数据
	   * @param {Array}  nodes  节点数据
	   * @param {Array}  edges  边数据
	   */
	  source: function source(nodes, edges) {
	    if (Util.isObject(nodes)) {
	      this.set('nodes', nodes.nodes);
	      this.set('edges', nodes.edges);
	    } else {
	      this.set('nodes', nodes);
	      this.set('edges', edges);
	    }
	  },

	  /**
	   * 导出图的数据，包含节点、边信息
	   * @return {Object} 导出图形数据
	   */
	  _saveSource: function _saveSource() {
	    var self = this;
	    var nodes = [];
	    var edges = [];
	    var nodeGroup = self.get('nodeGroup');
	    var edgeGroup = self.get('edgeGroup');
	    var itemCache = self.get('itemCache');

	    function exportItem(group, arr) {
	      Util.each(group.get('children'), function (subGroup) {
	        var id = subGroup.get('id');
	        var nodeEl = itemCache[id];
	        arr.push(nodeEl.get('model'));
	      });
	    }
	    exportItem(nodeGroup, nodes);
	    exportItem(edgeGroup, edges);

	    return Util.clone({
	      nodes: nodes,
	      edges: edges
	    });
	  },

	  /**
	   * 获取参与布局的节点集合
	   * @return {Array} 节点集合
	   */
	  getLayoutNodes: function getLayoutNodes() {
	    var nodes = this.getNodes(function (node) {
	      return node.getModel();
	    });
	    var layoutNodeFilter = this.get('layoutNodeFilter');
	    if (layoutNodeFilter) {
	      return Util.filter(nodes, layoutNodeFilter);
	    }
	    return nodes;
	  },

	  /**
	   * 获取参与布局的边集合
	   * @return {Array} 边集合
	   */
	  getLayoutEdges: function getLayoutEdges() {
	    var edges = this.getEdges(function (edge) {
	      return edge.getModel();
	    });
	    var layoutEdgeFilter = this.get('layoutEdgeFilter');
	    if (layoutEdgeFilter) {
	      return Util.filter(edges, layoutEdgeFilter);
	    }
	    return edges;
	  },

	  /**
	   * 布局
	   */
	  layout: function layout() {
	    var layout = this.get('layout');
	    var nodes = this.getLayoutNodes();
	    var edges = this.getLayoutEdges();
	    if (Util.isObject(layout)) {
	      layout.nodes = nodes;
	      layout.edges = edges;
	      layout.graphHeight = this.get('height');
	      layout.graphWidth = this.get('width');
	      layout.execute();
	    } else if (Util.isFunction(layout)) {
	      layout(nodes, edges);
	    }
	    this.updateNodesPosition();
	  },

	  /**
	   * 不清除映射规则，重新加载数据
	   * @param {Object} layout 布局对象
	   */
	  changeLayout: function changeLayout(layout) {
	    this.set('layout', layout);
	    this.layout();
	  },

	  /**
	   * 渲染
	   * @param {Object} rollback 回退对象
	   */
	  render: function render(rollback) {
	    if (rollback === undefined) {
	      rollback = this.get('rollback');
	    }
	    Net.superclass.render.call(this);
	    if (rollback !== false) {
	      this.updateRollback();
	    }
	  },

	  /**
	   * 增加节点、边
	   * @param  {String} type 类型：node ,edge
	   * @param  {Object} obj  配置项
	   * @return {Item}   item 子项
	   */
	  add: function add(type, obj) {
	    var self = this;
	    var arr = void 0;
	    if (type === 'node') {
	      arr = self._addNodes([obj]);
	    } else if (type === 'edge') {
	      arr = self._addEdges([obj]);
	    }
	    this.draw();
	    return arr[0];
	  },

	  /**
	   * 更新节点或者边
	   * @param  {Object} item 节点或者边
	   * @param  {Object} obj  数据模型
	   */
	  update: function update(item, obj) {
	    this.updateItem(item, obj);
	    this.draw();
	  },

	  /**
	   * 删除节点或者边
	   * @param  {Object} item 节点或者边
	   */
	  remove: function remove(item) {
	    this.removeItem(item);
	    this.draw();
	  }
	});

	module.exports = Net;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview track g6
	 * 体验改善计划
	 * @author huangtonger@aliyun.com
	 */

	var Monitor = __webpack_require__(59);
	var config = {
	  g6: true,
	  version: '1.2.1-beta.7',
	  page_type: 'syslog'
	};
	// 延迟发送请求
	setTimeout(function () {
	  if (Monitor.tracking) {
	    var m = new Monitor();
	    m.log(config);
	  }
	}, 100);

	module.exports = config;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 树图行为选择器
	 * @author huangtonger@aliyun.com
	 */

	__webpack_require__(66);
	__webpack_require__(148);
	__webpack_require__(166);
	__webpack_require__(65);
	__webpack_require__(67);

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 树图 入口文件
	 * @author huangtonger@aliyun.com
	 */

	var Graph = __webpack_require__(13);
	var Tree = __webpack_require__(189);
	__webpack_require__(187);
	Tree.Mode = {
	  // 默认模式
	  default: ['dragBlank', 'collapse', 'spreadout', 'buttonPointer', 'wheelZoom'],
	  // 空模式
	  none: []
	};
	Graph.registNode('tree-node', {
	  style: function style() {
	    return {
	      fillOpacity: 1
	    };
	  }
	}, 'rect');
	module.exports = Tree;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @fileOverview 树图
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Layout = __webpack_require__(68);
	var Animate = __webpack_require__(24);
	var TreeUtil = __webpack_require__(190);
	var Global = __webpack_require__(7);
	var Graph = __webpack_require__(13);
	var AnimateUtil = Animate.Util;
	var GraphUtil = Graph.Util;

	var Tree = function Tree(cfg) {
	  Tree.superclass.constructor.call(this, cfg);
	};

	Tree.ATTRS = {
	  /**
	   * 布局构造函数
	   * @type {Function}
	   */
	  layoutFn: Layout.CompactBoxTree,

	  /**
	   * 布局配置项
	   * @type {Object}
	   */
	  layoutCfg: {
	    direction: 'LR',
	    getHGap: function getHGap() {
	      return 40;
	    },
	    getVGap: function getVGap() {
	      return 10;
	    }
	  },

	  /**
	   * 布局对象
	   * @type {Object}
	   */
	  layout: null,

	  /**
	   * 栅格的配置信息
	   * @type {Object}
	   */
	  grid: null,

	  /**
	   * 原始数据
	   * @type {Array}
	   */
	  data: null,

	  /**
	   * 原始数据索引
	   * @type {Array}
	   */
	  dataMap: null,

	  /**
	   * 是否显示按钮
	   * @type {Boolean}
	   */
	  showButton: true,

	  /**
	   * 默认节点形
	   * @type {String}
	   */
	  defaultNodeShape: 'tree-node',

	  /**
	   * 是否开启动画
	   * @type {Boolean}
	   */
	  animate: true
	};

	Util.extend(Tree, Graph);

	Util.augment(Tree, {
	  // 读数据
	  _readSource: function _readSource(data) {
	    this.source(data);
	  },

	  // 存数据
	  _saveSource: function _saveSource() {
	    var data = this.get('data');
	    var rst = TreeUtil.clone(data, {
	      parent: true // 导出数据过滤 parent 字段
	    });
	    return rst;
	  },

	  // 建数据索引
	  _createMap: function _createMap(data) {
	    var map = {};
	    TreeUtil.traverseTree(data, function (node, parent) {
	      if (!node.id) {
	        node.id = GraphUtil.guid();
	      }
	      if (parent) {
	        node.parent = parent;
	      } else {
	        data.root = true;
	      }
	      map[node.id] = node;
	    });
	    return map;
	  },

	  // 布局
	  layout: function layout() {
	    var layout = this.get('layout');
	    var data = this.get('data');
	    if (Util.isObject(layout)) {
	      layout.execute();
	    } else if (Util.isFunction(layout)) {
	      layout(data);
	    }
	    this.updateNodesPosition();
	  },

	  /**
	   * 加载数据
	   * @param {Array} data 数据源
	   */
	  source: function source(data) {
	    var dataMap = this._createMap(data);
	    var layout = this.get('layout');
	    var nodes = void 0;
	    var edges = void 0;
	    if (!Util.isObject(layout)) {
	      nodes = [];
	      edges = [];
	      TreeUtil.traverseTree(data, function (node, parent) {
	        nodes.push(node);
	        if (parent) {
	          edges.push({
	            id: parent.id + '-' + node.id,
	            source: parent.id,
	            target: node.id
	          });
	        }
	      }, function (node) {
	        return node.isCollapsed;
	      });
	    } else {
	      layout.root = data;
	      nodes = layout.getNodes();
	      edges = layout.getEdges();
	    }
	    this.set('data', data);
	    this.set('dataMap', dataMap);
	    this.set('nodes', nodes);
	    this.set('edges', edges);
	  },

	  /**
	   * 原数据对象不发生改变情况下重绘
	   */
	  reRender: function reRender() {
	    var data = this.get('data');
	    this.clearAllActived();
	    this.refreshFront();
	    this._clearInner();
	    this._initData();
	    this.source(data);
	    this._drawInner();
	    this.draw();
	  },

	  /**
	   * 入场动画
	   * @param {Canvas.Group} group 图组
	   * @param {Object}       map0  索引表
	   * @param {Object}       map1  索引表
	   */
	  enterAnimate: function enterAnimate(group, map0, map1) {
	    var box = GraphUtil.getBBox(group, group); // 需要apply自己的矩阵
	    var centerX = box.centerX;
	    var centerY = box.centerY;
	    var cfg = group.get('shapeCfg');
	    var origin = cfg.origin;
	    var start = void 0;
	    if (group.get('type') === 'node') {
	      start = TreeUtil.getButtonPoint(origin, map0, centerX, centerY);
	    } else {
	      start = TreeUtil.getButtonPoint(map1[origin.target].model, map0, centerX, centerY);
	    }
	    AnimateUtil.scaleIn(group, start.x, start.y, centerX, centerY);
	  },

	  /**
	   * 退场动画
	   * @param {Canvas.Group} group 图组
	   * @param {Object}       map0  销毁前图形索引表
	   * @param {Object}       map1  销毁后图形索引表
	   */
	  leaveAnimate: function leaveAnimate(group, map0, map1) {
	    var box = GraphUtil.getBBox(group, group); // 需要apply自己的矩阵
	    var centerX = box.centerX;
	    var centerY = box.centerY;
	    var cfg = group.get('shapeCfg');
	    var origin = cfg.origin;
	    var start = void 0;
	    if (group.get('type') === 'node') {
	      start = TreeUtil.getButtonPoint(origin, map1, centerX, centerY);
	    } else {
	      start = TreeUtil.getButtonPoint(map0[origin.target].model, map1, centerX, centerY);
	    }
	    AnimateUtil.scaleOut(group, start.x, start.y);
	  },

	  /**
	   * 节点 绘制完成之前
	   * @param  {Item} node 节点
	   */
	  beforeNodeDraw: function beforeNodeDraw(node) {
	    var self = this;
	    var cfg = node.getShapeCfg();
	    var layout = self.get('layout');
	    if (Util.isObject(layout)) {
	      cfg.direction = layout.options.direction;
	    }
	    node.addChild = function (model) {
	      return self.add(node.get('id'), model);
	    };
	  },

	  /**
	   * 节点 绘制完成之后
	   * @param  {Item} node 节点
	   */
	  afterNodeDraw: function afterNodeDraw(node) {
	    var showButton = this.get('showButton');
	    var group = node.get('group');
	    var cfg = node.getShapeCfg();
	    var keyShape = node.getKeyShape();
	    var shapeObj = node.get('shapeObj');
	    var origin = cfg.origin;
	    var bbox = keyShape.getBBox();
	    var inAnchor = origin.inAnchor;
	    var outAnchor = origin.outAnchor;
	    var quadrant = void 0;
	    // 布局中若无 inAnchor 参数则不绘制加减号
	    if (!inAnchor) {
	      return;
	    }
	    shapeObj.getAnchorPoints = function () {
	      return [inAnchor, outAnchor];
	    };
	    var anchorPoints = node.calculateAnchorPoints(bbox);
	    if (!origin.root && anchorPoints) {
	      quadrant = GraphUtil.getpointInRectQuadrant(bbox, anchorPoints[1]);
	      switch (quadrant) {
	        case 0:
	          cfg.buttonX = anchorPoints[1].x;
	          cfg.buttonY = anchorPoints[1].y - Global.treeButtonRadius;
	          break;
	        case 1:
	          cfg.buttonX = anchorPoints[1].x + Global.treeButtonRadius;
	          cfg.buttonY = anchorPoints[1].y;
	          break;
	        case 2:
	          cfg.buttonX = anchorPoints[1].x;
	          cfg.buttonY = anchorPoints[1].y + Global.treeButtonRadius;
	          break;
	        case 3:
	          cfg.buttonX = anchorPoints[1].x - Global.treeButtonRadius;
	          cfg.buttonY = anchorPoints[1].y;
	          break;
	        default:
	          cfg.buttonX = anchorPoints[1].x;
	          cfg.buttonY = anchorPoints[1].y;
	      }

	      if (origin.isCollapsed) {
	        cfg.buttonType = 'plus';
	      } else {
	        cfg.buttonType = 'minus';
	      }

	      if (!showButton) {
	        group.set('buttonX', (bbox.minX + bbox.maxX) / 2);
	        group.set('buttonY', (bbox.minY + bbox.maxY) / 2);
	        return;
	      }
	      if (origin.children && origin.children.length !== 0) {
	        TreeUtil.drawButton(cfg, group);
	      }
	      group.set('buttonX', cfg.buttonX);
	      group.set('buttonY', cfg.buttonY);
	    }
	  },

	  /**
	   * 不清除映射规则，重新加载数据
	   * @param {Object} layout 布局对象
	   */
	  changeLayout: function changeLayout(layout) {
	    this.set('layout', layout);
	    this.reRender();
	  },

	  /**
	   * 添加子元素
	   * @param  {String} parentId  父节点 ID
	   * @param  {Object} model     子元素数据模型
	   * @return {Object} 子项
	   */
	  add: function add(parentId, model) {
	    var dataMap = this.get('dataMap');
	    var parent = dataMap[parentId];

	    var id = model.id;
	    if (!id) {
	      id = Util.guid();
	      model.id = id;
	    }

	    if (Util.isArray(parent.children)) {
	      parent.children.push(model);
	    } else {
	      parent.children = [model];
	    }
	    this.reRender();
	    return this.find(id);
	  },

	  /**
	   * 移除元素
	   * @param  {Object|String} item  要删除的节点 ID
	   * @return {Object}        自身
	   */
	  remove: function remove(item) {
	    var dataMap = this.get('dataMap');
	    var children = void 0;

	    if (Util.isString(item)) {
	      item = dataMap[item];
	    }
	    var parent = item.parent;
	    if (parent) {
	      children = parent.children;
	      parent.children = Util.filter(children, function (v) {
	        if (item === v) {
	          return false;
	        }
	        return true;
	      });
	    } else {
	      // 删除根节点直接置入空对象
	      this.source({});
	    }
	    this.reRender();
	    return this;
	  },

	  /**
	   * 更新元素
	   * @param  {Object|String} item  要更新的节点 ID
	   * @param  {Object}        model 数据模型
	   * @return {Object}        子项
	   */
	  update: function update(item, model) {
	    Tree.superclass.updateItem.call(this, item, model);
	    this.reRender();
	    return item;
	  },
	  _checkData: function _checkData(data) {
	    return data && Util.isObject(data) && GraphUtil.objectToValues(data).length > 0;
	  }
	});

	module.exports = Tree;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * @fileOverview 树图工具
	 * @author huangtonger@aliyun.com
	 */

	var Util = __webpack_require__(1);
	var Graph = __webpack_require__(13);
	var Global = __webpack_require__(7);
	var GraphUtil = Graph.Util;

	var TreeUtil = {
	  // 遍历树
	  traverseTree: function traverseTree(node, callback, condition, parent) {
	    var children = node.children;
	    callback(node, parent);
	    if (condition && condition(node)) {
	      return;
	    }
	    if (children) {
	      Util.each(children, function (child) {
	        TreeUtil.traverseTree(child, callback, condition, node);
	      });
	    }
	  },

	  // 获取老图形父元素按钮点坐标
	  getButtonPoint: function getButtonPoint(child, map, centerX, centerY) {
	    var parent = child.parent;
	    var group = void 0;

	    while (child && parent && !map[parent.id]) {
	      parent = parent.parent;
	    }
	    if (parent) {
	      group = map[parent.id].origin;
	      return GraphUtil.applyPoint({
	        x: group.get('buttonX'),
	        y: group.get('buttonY')
	      }, group);
	    }
	    return {
	      x: centerX,
	      y: centerY
	    };
	  },

	  // 复制数据
	  clone: function clone(obj, filter) {
	    var rst = void 0;
	    if (Util.isArray(obj)) {
	      rst = [];
	      for (var i = 0, l = obj.length; i < l; i++) {
	        if (_typeof(obj[i]) === 'object' && obj[i] !== null) {
	          rst[i] = TreeUtil.clone(obj[i], filter);
	        } else {
	          rst[i] = obj[i];
	        }
	      }
	    } else {
	      rst = {};
	      for (var k in obj) {
	        if (!filter[k]) {
	          if (_typeof(obj[k]) === 'object' && obj[k] !== null) {
	            rst[k] = TreeUtil.clone(obj[k], filter);
	          } else {
	            rst[k] = obj[k];
	          }
	        }
	      }
	    }

	    return rst;
	  },

	  // 画按钮
	  drawButton: function drawButton(cfg, group) {
	    if (cfg.buttonType === 'plus') {
	      TreeUtil.drawspreadoutButton(cfg.buttonX, cfg.buttonY, Global.treeButtonRadius, Global.treeButtonPadding, group);
	    } else {
	      TreeUtil.drawcollapseButton(cfg.buttonX, cfg.buttonY, Global.treeButtonRadius, Global.treeButtonPadding, group);
	    }
	  },

	  // 画加号
	  drawspreadoutButton: function drawspreadoutButton(x, y, r, p, group) {
	    var ri = r - p;
	    var shape = group.addShape('path', {
	      attrs: Util.mix({}, {
	        path: [['M', 0, 0 - r], ['a', r, r, 0, 1, 1, 0, 2 * r], ['a', r, r, 0, 1, 1, 0, -2 * r], ['z'], ['M', 0 - ri, 0], ['L', 0 + ri, 0], ['M', 0, 0 - ri], ['L', 0, 0 + ri]]
	      }, Global.treeButtonStyle),
	      clickActive: false,
	      class: 'spreadoutButton'
	    });
	    shape.translate(x, y);
	    return shape;
	  },

	  // 画减号
	  drawcollapseButton: function drawcollapseButton(x, y, r, p, group) {
	    var ri = r - p;
	    var shape = group.addShape('path', {
	      attrs: Util.mix({}, {
	        path: [['M', 0, 0 - r], ['a', r, r, 0, 1, 1, 0, 2 * r], ['a', r, r, 0, 1, 1, 0, -2 * r], ['z'], ['M', 0 - ri, 0], ['L', 0 + ri, 0]]
	      }, Global.treeButtonStyle),
	      clickActive: false,
	      class: 'collapseButton'
	    });
	    shape.translate(x, y);
	    return shape;
	  }
	};

	module.exports = TreeUtil;

/***/ })
/******/ ])
});
;