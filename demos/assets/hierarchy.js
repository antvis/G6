(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Hierarchy"] = factory();
	else
		root["Hierarchy"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(7);

module.exports = {
  assign: assign
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = __webpack_require__(3);

var Layout =
/*#__PURE__*/
function () {
  function Layout(root, options) {
    if (options === void 0) {
      options = {};
    }

    var me = this;
    me.options = options;
    me.rootNode = hierarchy(root, options);
  }

  var _proto = Layout.prototype;

  _proto.execute = function execute() {
    throw new Error('please override this method');
  };

  return Layout;
}();

module.exports = Layout;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var separateTree = __webpack_require__(4);

var VALID_DIRECTIONS = ['LR', // left to right
'RL', // right to left
'TB', // top to bottom
'BT', // bottom to top
'H', // horizontal
'V' // vertical
];
var HORIZONTAL_DIRECTIONS = ['LR', 'RL', 'H'];

var isHorizontal = function isHorizontal(direction) {
  return HORIZONTAL_DIRECTIONS.indexOf(direction) > -1;
};

var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

module.exports = function (root, options, layoutAlgrithm) {
  var direction = options.direction || DEFAULT_DIRECTION;
  options.isHorizontal = isHorizontal(direction);

  if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
    throw new TypeError("Invalid direction: " + direction);
  }

  if (direction === VALID_DIRECTIONS[0]) {
    // LR
    layoutAlgrithm(root, options);
  } else if (direction === VALID_DIRECTIONS[1]) {
    // RL
    layoutAlgrithm(root, options);
    root.right2left();
  } else if (direction === VALID_DIRECTIONS[2]) {
    // TB
    layoutAlgrithm(root, options);
  } else if (direction === VALID_DIRECTIONS[3]) {
    // BT
    layoutAlgrithm(root, options);
    root.bottom2top();
  } else if (direction === VALID_DIRECTIONS[4] || direction === VALID_DIRECTIONS[5]) {
    // H or V
    // separate into left and right trees
    var _separateTree = separateTree(root, options),
        left = _separateTree.left,
        right = _separateTree.right; // do layout for left and right trees


    layoutAlgrithm(left, options);
    layoutAlgrithm(right, options);
    options.isHorizontal ? left.right2left() : left.bottom2top(); // combine left and right trees

    right.translate(left.x - right.x, left.y - right.y); // translate root

    root.x = left.x;
    root.y = right.y;
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

  //root.translate(-(root.x + root.width / 2 + root.hgap), -(root.y + root.height / 2 + root.vgap));
  return root;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-cond-assign */
var util = __webpack_require__(0);

var PEM = 18;
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

function Node(data, options) {
  var me = this;
  me.vgap = me.hgap = 0;
  if (data instanceof Node) return data;
  me.data = data;
  /*
   * Gaps: filling space between nodes
   * (x, y) ----------------------
   * |            vgap            |
   * |    --------------------    h
   * | h |                    |   e
   * | g |                    |   i
   * | a |                    |   g
   * | p |                    |   h
   * |   ---------------------    t
   * |                            |
   *  -----------width------------
   */

  var hgap = options.getHGap(data);
  var vgap = options.getVGap(data);
  me.width = options.getWidth(data);
  me.height = options.getHeight(data);
  me.id = options.getId(data);
  me.x = me.y = 0;
  me.depth = 0;

  if (!me.children) {
    me.children = [];
  }

  me.addGap(hgap, vgap);
  return me;
}

util.assign(Node.prototype, {
  isRoot: function isRoot() {
    return this.depth === 0;
  },
  isLeaf: function isLeaf() {
    return this.children.length === 0;
  },
  addGap: function addGap(hgap, vgap) {
    var me = this;
    me.hgap += hgap;
    me.vgap += vgap;
    me.width += 2 * hgap;
    me.height += 2 * vgap;
  },
  eachNode: function eachNode(callback) {
    // Depth First traverse
    var me = this;
    var nodes = [me];
    var current;

    while (current = nodes.pop()) {
      callback(current);
      nodes = nodes.concat(current.children);
    }
  },
  DFTraverse: function DFTraverse(callback) {
    // Depth First traverse
    this.eachNode(callback);
  },
  BFTraverse: function BFTraverse(callback) {
    // Breadth First traverse
    var me = this;
    var nodes = [me];
    var current;

    while (current = nodes.shift()) {
      callback(current);
      nodes = nodes.concat(current.children);
    }
  },
  getBoundingBox: function getBoundingBox() {
    // BBox for just one tree node
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
  },
  // translate
  translate: function translate(tx, ty) {
    if (tx === void 0) {
      tx = 0;
    }

    if (ty === void 0) {
      ty = 0;
    }

    this.eachNode(function (node) {
      node.x += tx;
      node.y += ty;
    });
  },
  right2left: function right2left() {
    var me = this;
    var bb = me.getBoundingBox();
    me.eachNode(function (node) {
      node.x = node.x - (node.x - bb.left) * 2 - node.width; // node.x = - node.x;
    });
    me.translate(bb.width, 0);
  },
  bottom2top: function bottom2top() {
    var me = this;
    var bb = me.getBoundingBox();
    me.eachNode(function (node) {
      node.y = node.y - (node.y - bb.top) * 2 - node.height; // node.y = - node.y;
    });
    me.translate(0, bb.height);
  }
});

function hierarchy(data, options, isolated) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
  var root = new Node(data, options);
  var nodes = [root];
  var node;

  if (!isolated && !data.collapsed) {
    while (node = nodes.pop()) {
      if (!node.data.collapsed) {
        var children = options.getChildren(node.data);
        var length = children ? children.length : 0;
        node.children = new Array(length);

        if (children && length) {
          for (var i = 0; i < length; i++) {
            var child = new Node(children[i], options);
            node.children[i] = child;
            nodes.push(child);
            child.parent = node;
            child.depth = node.depth + 1;
          }
        }
      }
    }
  }

  return root;
}

module.exports = hierarchy;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = __webpack_require__(3);

module.exports = function (root, options) {
  // separate into left and right trees
  var left = hierarchy(root.data, options, true); // root only

  var right = hierarchy(root.data, options, true); // root only
  // automatically

  var treeSize = root.children.length;
  var rightTreeSize = Math.round(treeSize / 2); // separate left and right tree by meta data

  var getSide = options.getSide || function (child, index) {
    if (index < rightTreeSize) {
      return 'right';
    }

    return 'left';
  };

  for (var i = 0; i < treeSize; i++) {
    var child = root.children[i];
    var side = getSide(child, i);

    if (side === 'right') {
      right.children.push(child);
    } else {
      left.children.push(child);
    }
  }

  left.eachNode(function (node) {
    if (!node.isRoot()) {
      node.side = 'left';
    }
  });
  right.eachNode(function (node) {
    if (!node.isRoot()) {
      node.side = 'right';
    }
  });
  return {
    left: left,
    right: right
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var hierarchy = {
  compactBox: __webpack_require__(6),
  dendrogram: __webpack_require__(9),
  indented: __webpack_require__(11),
  mindmap: __webpack_require__(13)
};
module.exports = hierarchy;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var nonLayeredTidyTree = __webpack_require__(8);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var CompactBoxTreeLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(CompactBoxTreeLayout, _TreeLayout);

  function CompactBoxTreeLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = CompactBoxTreeLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    return doTreeLayout(me.rootNode, me.options, nonLayeredTidyTree);
  };

  return CompactBoxTreeLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function compactBoxLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new CompactBoxTreeLayout(root, options).execute();
}

module.exports = compactBoxLayout;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function _mix(dist, obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key];
    }
  }
}

var mix = function mix(dist, src1, src2, src3) {
  if (src1) _mix(dist, src1);
  if (src2) _mix(dist, src2);
  if (src3) _mix(dist, src3);
  return dist;
};

module.exports = mix;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// wrap tree node
function WrappedTree(w, h, y, c) {
  if (c === void 0) {
    c = [];
  }

  var me = this; // size

  me.w = w || 0;
  me.h = h || 0; // position

  me.y = y || 0;
  me.x = 0; // children

  me.c = c || [];
  me.cs = c.length; // modified

  me.prelim = 0;
  me.mod = 0;
  me.shift = 0;
  me.change = 0; // left/right tree

  me.tl = null;
  me.tr = null; // extreme left/right tree

  me.el = null;
  me.er = null; // modified left/right tree

  me.msel = 0;
  me.mser = 0;
}

WrappedTree.fromNode = function (root, isHorizontal) {
  if (!root) return null;
  var children = [];
  root.children.forEach(function (child) {
    children.push(WrappedTree.fromNode(child, isHorizontal));
  });
  if (isHorizontal) return new WrappedTree(root.height, root.width, root.x, children);
  return new WrappedTree(root.width, root.height, root.y, children);
}; // node utils


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

function convertBack(converted
/* WrappedTree */
, root
/* TreeNode */
, isHorizontal) {
  if (isHorizontal) {
    root.y = converted.x;
  } else {
    root.x = converted.x;
  }

  converted.c.forEach(function (child, i) {
    convertBack(child, root.children[i], isHorizontal);
  });
}

function layer(node, isHorizontal, d) {
  if (d === void 0) {
    d = 0;
  }

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

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

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
  } // do layout


  layer(root, isHorizontal);
  var wt = WrappedTree.fromNode(root, isHorizontal);
  firstWalk(wt);
  secondWalk(wt, 0);
  convertBack(wt, root, isHorizontal);
  normalize(root, isHorizontal);
  return root;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var dendrogram = __webpack_require__(10);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var DendrogramLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(DendrogramLayout, _TreeLayout);

  function DendrogramLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = DendrogramLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    me.rootNode.width = 0;
    return doTreeLayout(me.rootNode, me.options, dendrogram);
  };

  return DendrogramLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function dendrogramLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new DendrogramLayout(root, options).execute();
}

module.exports = dendrogramLayout;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// wrap tree node
// TODO considering size
var util = __webpack_require__(0);

function WrappedTree(height, children) {
  if (height === void 0) {
    height = 0;
  }

  if (children === void 0) {
    children = [];
  }

  var me = this;
  me.x = me.y = 0;
  me.leftChild = me.rightChild = null;
  me.height = 0;
  me.children = children;
}

var DEFAULT_OPTIONS = {
  isHorizontal: true,
  nodeSep: 20,
  nodeSize: 20,
  rankSep: 200,
  subTreeSep: 10
};

function convertBack(converted
/* WrappedTree */
, root
/* TreeNode */
, isHorizontal) {
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

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
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

  var prevLeaf;

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
  } // wrap node


  var wt = wrappedTreeFromNode(root); // get depth for drawing

  getDrawingDepth(wt); // get position

  position(wt); // get x, y

  convertBack(wt, root, options.isHorizontal);
  return root;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var indentedTree = __webpack_require__(12);

var separateTree = __webpack_require__(4);

var util = __webpack_require__(0);

var VALID_DIRECTIONS = ['LR', // left to right
'RL', // right to left
'H' // horizontal
];
var DEFAULT_DIRECTION = VALID_DIRECTIONS[0];

var IndentedLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(IndentedLayout, _TreeLayout);

  function IndentedLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = IndentedLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    var options = me.options;
    var root = me.rootNode;
    options.isHorizontal = true;
    var indent = options.indent;
    var direction = options.direction || DEFAULT_DIRECTION;

    if (direction && VALID_DIRECTIONS.indexOf(direction) === -1) {
      throw new TypeError("Invalid direction: " + direction);
    }

    if (direction === VALID_DIRECTIONS[0]) {
      // LR
      indentedTree(root, indent);
    } else if (direction === VALID_DIRECTIONS[1]) {
      // RL
      indentedTree(root, indent);
      root.right2left();
    } else if (direction === VALID_DIRECTIONS[2]) {
      // H
      // separate into left and right trees
      var _separateTree = separateTree(root, options),
          left = _separateTree.left,
          right = _separateTree.right;

      indentedTree(left, indent);
      left.right2left();
      indentedTree(right, indent);
      var bbox = left.getBoundingBox();
      right.translate(bbox.width, 0);
      root.x = right.x - root.width / 2;
    }

    return root;
  };

  return IndentedLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function indentedLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new IndentedLayout(root, options).execute();
}

module.exports = indentedLayout;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var DEFAULT_INDENT = 20;

function positionNode(node, previousNode, dx) {
  node.x += dx * node.depth;
  node.y = previousNode ? previousNode.y + previousNode.height : 0;
}

module.exports = function (root, indent) {
  if (indent === void 0) {
    indent = DEFAULT_INDENT;
  }

  var previousNode = null;
  root.eachNode(function (node) {
    positionNode(node, previousNode, indent);
    previousNode = node;
  });
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var TreeLayout = __webpack_require__(1);

var mindmap = __webpack_require__(14);

var doTreeLayout = __webpack_require__(2);

var util = __webpack_require__(0);

var MindmapLayout =
/*#__PURE__*/
function (_TreeLayout) {
  _inheritsLoose(MindmapLayout, _TreeLayout);

  function MindmapLayout() {
    return _TreeLayout.apply(this, arguments) || this;
  }

  var _proto = MindmapLayout.prototype;

  _proto.execute = function execute() {
    var me = this;
    return doTreeLayout(me.rootNode, me.options, mindmap);
  };

  return MindmapLayout;
}(TreeLayout);

var DEFAULT_OPTIONS = {};

function mindmapLayout(root, options) {
  options = util.assign({}, DEFAULT_OPTIONS, options);
  return new MindmapLayout(root, options).execute();
}

module.exports = mindmapLayout;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(0);

function secondWalk(node, options) {
  var totalHeight = 0;

  if (!node.children.length) {
    totalHeight = node.height;
  } else {
    node.children.forEach(function (c) {
      totalHeight += secondWalk(c, options);
    });
  }

  node._subTreeSep = options.getSubTreeSep(node.data);
  node.totalHeight = Math.max(node.height, totalHeight) + 2 * node._subTreeSep;
  return node.totalHeight;
}

function thirdWalk(node) {
  var children = node.children;
  var len = children.length;

  if (len) {
    children.forEach(function (c) {
      thirdWalk(c);
    });
    var first = children[0];
    var last = children[len - 1];
    var childrenHeight = last.y - first.y + last.height;
    var childrenTotalHeight = 0;
    children.forEach(function (child) {
      childrenTotalHeight += child.totalHeight;
    });

    if (childrenHeight > node.height) {
      // 当子节点总高度大于父节点高度
      node.y = first.y + childrenHeight / 2 - node.height / 2;
    } else if (children.length !== 1 || node.height > childrenTotalHeight) {
      // 多于一个子节点或者父节点大于所有子节点的总高度
      var offset = node.y + (node.height - childrenHeight) / 2 - first.y;
      children.forEach(function (c) {
        c.translate(0, offset);
      });
    } else {
      // 只有一个子节点
      node.y = (first.y + first.height / 2 + last.y + last.height / 2) / 2 - node.height / 2;
    }
  }
}

var DEFAULT_OPTIONS = {
  getSubTreeSep: function getSubTreeSep() {
    return 0;
  }
};

module.exports = function (root, options) {
  if (options === void 0) {
    options = {};
  }

  options = util.assign({}, DEFAULT_OPTIONS, options);
  root.parent = {
    x: 0,
    width: 0,
    height: 0,
    y: 0
  }; // first walk

  root.BFTraverse(function (node) {
    node.x = node.parent.x + node.parent.width; // simply get x
  });
  root.parent = null; // second walk

  secondWalk(root, options); // assign sub tree totalHeight
  // adjusting
  // separating nodes

  root.startY = 0;
  root.y = root.totalHeight / 2 - root.height / 2;
  root.eachNode(function (node) {
    var children = node.children;
    var len = children.length;

    if (len) {
      var first = children[0];
      first.startY = node.startY + node._subTreeSep;

      if (len === 1) {
        first.y = node.y + node.height / 2 - first.height / 2;
      } else {
        first.y = first.startY + first.totalHeight / 2 - first.height / 2;

        for (var i = 1; i < len; i++) {
          var c = children[i];
          c.startY = children[i - 1].startY + children[i - 1].totalHeight;
          c.y = c.startY + c.totalHeight / 2 - c.height / 2;
        }
      }
    }
  }); // third walk

  thirdWalk(root);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=hierarchy.js.map
