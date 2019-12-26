import each from '@antv/util/lib/each';
import isNil from '@antv/util/lib/is-nil';
import isPlainObject from '@antv/util/lib/is-plain-object';
import isString from '@antv/util/lib/is-string';
import uniqueId from '@antv/util/lib/unique-id';
import { getBBox } from '@g6/util/graphic';
import { translate } from '@g6/util/math';
import Shape from '@g6/shape/shape';
var CACHE_BBOX = 'bboxCache';
var RESERVED_STYLES = ['fillStyle', 'strokeStyle',
    'path', 'points', 'img', 'symbol'];
var ItemBase = /** @class */ (function () {
    function ItemBase(cfg) {
        this._cfg = {};
        this.defaultCfg = {
            /**
             * id
             * @type {string}
             */
            id: null,
            /**
             * 类型
             * @type {string}
             */
            type: 'item',
            /**
             * data model
             * @type {object}
             */
            model: {},
            /**
             * g group
             * @type {G.Group}
             */
            group: null,
            /**
             * is open animate
             * @type {boolean}
             */
            animate: false,
            /**
             * visible - not group visible
             * @type {boolean}
             */
            visible: true,
            /**
             * locked - lock node
             * @type {boolean}
             */
            locked: false,
            /**
             * capture event
             * @type {boolean}
             */
            event: true,
            /**
             * key shape to calculate item's bbox
             * @type object
             */
            keyShape: null,
            /**
             * item's states, such as selected or active
             * @type Array
             */
            states: []
        };
        this.destroyed = false;
        this._cfg = Object.assign(this.defaultCfg, this.getDefaultCfg(), cfg);
        var group = cfg.group;
        group.set('item', this);
        var id = this.get('model').id;
        if (!id) {
            id = uniqueId(this.get('type'));
        }
        this.set('id', id);
        group.set('id', id);
        this.init();
        this.draw();
    }
    /**
     * 根据 keyshape 计算包围盒
     */
    ItemBase.prototype.calculateBBox = function () {
        var keyShape = this.get('keyShape');
        var group = this.get('group');
        // 因为 group 可能会移动，所以必须通过父元素计算才能计算出正确的包围盒
        var bbox = getBBox(keyShape, group);
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
        bbox.centerX = (bbox.minX + bbox.maxX) / 2;
        bbox.centerY = (bbox.minY + bbox.maxY) / 2;
        return bbox;
    };
    /**
     * draw shape
     */
    ItemBase.prototype.drawInner = function () {
        var self = this;
        var shapeFactory = self.get('shapeFactory');
        var group = self.get('group');
        var model = self.get('model');
        group.clear();
        if (!shapeFactory) {
            return;
        }
        self.updatePosition(model);
        var cfg = self.getShapeCfg(model); // 可能会附加额外信息
        var shapeType = cfg.shape;
        var keyShape = shapeFactory.draw(shapeType, cfg, group);
        if (keyShape) {
            keyShape.isKeyShape = true;
            self.set('keyShape', keyShape);
            self.set('originStyle', this.getKeyShapeStyle());
        }
        // 防止由于用户外部修改 model 中的 shape 导致 shape 不更新
        this.set('currentShape', shapeType);
        this.resetStates(shapeFactory, shapeType);
    };
    /**
     * reset shape states
     * @param shapeFactory
     * @param shapeType
     */
    ItemBase.prototype.resetStates = function (shapeFactory, shapeType) {
        var self = this;
        var states = self.get('states');
        each(states, function (state) {
            shapeFactory.setState(shapeType, state, true, self);
        });
    };
    ItemBase.prototype.init = function () {
        // TODO 实例化工厂方法，需要等 Shape 重构完成
        var shapeFactory = Shape.getFactory(this.get('type'));
        this.set('shapeFactory', shapeFactory);
    };
    /**
     * 获取属性
     * @internal 仅内部类使用
     * @param  {String} key 属性名
     * @return {object | string | number} 属性值
     */
    ItemBase.prototype.get = function (key) {
        return this._cfg[key];
    };
    /**
     * 设置属性
     * @internal 仅内部类使用
     * @param {String|Object} key 属性名，也可以是对象
     * @param {object | string | number} val 属性值
     */
    ItemBase.prototype.set = function (key, val) {
        if (isPlainObject(key)) {
            this._cfg = Object.assign({}, this._cfg, key);
        }
        else {
            this._cfg[key] = val;
        }
    };
    ItemBase.prototype.getDefaultCfg = function () {
        return {};
    };
    /**
     * 更新/刷新等操作后，清除 cache
     */
    ItemBase.prototype.clearCache = function () {
        this.set(CACHE_BBOX, null);
    };
    /**
     * 渲染前的逻辑，提供给子类复写
     */
    ItemBase.prototype.beforeDraw = function () {
    };
    /**
     * 渲染后的逻辑，提供给子类复写
     */
    ItemBase.prototype.afterDraw = function () {
    };
    /**
     * 更新后做一些工作
     */
    ItemBase.prototype.afterUpdate = function () {
    };
    /**
     * draw shape
     */
    ItemBase.prototype.draw = function () {
        this.beforeDraw();
        this.drawInner();
        this.afterDraw();
    };
    ItemBase.prototype.getKeyShapeStyle = function () {
        var keyShape = this.getKeyShape();
        if (keyShape) {
            var styles_1 = {};
            each(keyShape.attr(), function (val, key) {
                if (RESERVED_STYLES.indexOf(key) < 0) {
                    styles_1[key] = val;
                }
            });
            return styles_1;
        }
    };
    // TODO 确定还是否需要该方法
    ItemBase.prototype.getShapeCfg = function (model) {
        var styles = this.get('styles');
        if (styles && styles.default) {
            // merge graph的item样式与数据模型中的样式
            var newModel = Object.assign({}, model);
            newModel.style = Object.assign({}, styles.default, model.style);
            return newModel;
        }
        return model;
    };
    /**
     * 获取指定状态的样式，去除了全局样式
     * @param state 状态名称
     */
    ItemBase.prototype.getStateStyle = function (state) {
        var styles = this.get('styles');
        var stateStyle = styles && styles[state];
        return stateStyle;
    };
    /**
     * get keyshape style
     */
    ItemBase.prototype.getOriginStyle = function () {
        return this.get('originStyle');
    };
    ItemBase.prototype.getCurrentStatesStyle = function () {
        var self = this;
        var originStyle = self.getOriginStyle();
        each(self.getStates(), function (state) {
            Object.assign(originStyle, self.getStateStyle(state));
        });
        return originStyle;
    };
    /**
     * 更改元素状态， visible 不属于这个范畴
     * @internal 仅提供内部类 graph 使用
     * @param {String} state 状态名
     * @param {Boolean} enable 节点状态值
     */
    ItemBase.prototype.setState = function (state, enable) {
        var states = this.get('states');
        var shapeFactory = this.get('shapeFactory');
        var index = states.indexOf(state);
        if (enable) {
            if (index > -1) {
                return;
            }
            states.push(state);
        }
        else if (index > -1) {
            states.splice(index, 1);
        }
        if (shapeFactory) {
            var model = this.get('model');
            shapeFactory.setState(model.shape, state, enable, this);
        }
    };
    // TODO 
    ItemBase.prototype.clearStates = function (states) {
        var self = this;
        var originStates = self.getStates();
        var shapeFactory = self.get('shapeFactory');
        var shape = self.get('model').shape;
        if (!states) {
            self.set('states', []);
            shapeFactory.setState(shape, originStates[0], false, self);
            return;
        }
        if (isString(states)) {
            states = [states];
        }
        var newStates = originStates.filter(function (state) {
            shapeFactory.setState(shape, state, false, self);
            if (states.indexOf(state) >= 0) {
                return false;
            }
            return true;
        });
        self.set('states', newStates);
    };
    /**
     * 节点的图形容器
     * @return {G.Group} 图形容器
     */
    ItemBase.prototype.getContainer = function () {
        return this.get('group');
    };
    /**
     * 节点的关键形状，用于计算节点大小，连线截距等
     * @return {G.Shape} 关键形状
     */
    ItemBase.prototype.getKeyShape = function () {
        return this.get('keyShape');
    };
    /**
     * 节点数据模型
     * @return {Object} 数据模型
     */
    ItemBase.prototype.getModel = function () {
        return this.get('model');
    };
    /**
     * 节点类型
     * @return {string} 节点的类型
     */
    ItemBase.prototype.getType = function () {
        return this.get('type');
    };
    /**
     * 是否是 Item 对象，悬空边情况下进行判定
     */
    ItemBase.prototype.isItem = function () {
        return true;
    };
    /**
     * 获取当前元素的所有状态
     * @return {Array} 元素的所有状态
     */
    ItemBase.prototype.getStates = function () {
        return this.get('states');
    };
    /**
     * 当前元素是否处于某状态
     * @param {String} state 状态名
     * @return {Boolean} 是否处于某状态
     */
    ItemBase.prototype.hasState = function (state) {
        var states = this.getStates();
        return states.indexOf(state) >= 0;
    };
    /**
     * 刷新一般用于处理几种情况
     * 1. item model 在外部被改变
     * 2. 边的节点位置发生改变，需要重新计算边
     *
     * 因为数据从外部被修改无法判断一些属性是否被修改，直接走位置和 shape 的更新
     */
    ItemBase.prototype.refresh = function () {
        var model = this.get('model');
        // 更新元素位置
        this.updatePosition(model);
        // 更新元素内容，样式
        this.updateShape();
        // 做一些更新之后的操作
        this.afterUpdate();
        // 清除缓存
        this.clearCache();
    };
    ItemBase.prototype.isOnlyMove = function (cfg) {
        return false;
    };
    /**
     * 将更新应用到 model 上，刷新属性
     * @internal 仅提供给 Graph 使用，外部直接调用 graph.update 接口
     * @param  {Object} cfg       配置项，可以是增量信息
     */
    ItemBase.prototype.update = function (cfg) {
        var model = this.get('model');
        var originPosition = { x: model.x, y: model.y };
        // 直接将更新合到原数据模型上，可以保证用户在外部修改源数据然后刷新时的样式符合期待。
        Object.assign(model, cfg);
        // isOnlyMove 仅用于node
        var onlyMove = this.isOnlyMove(cfg);
        // 仅仅移动位置时，既不更新，也不重绘
        if (onlyMove) {
            this.updatePosition(model);
        }
        else {
            // 如果 x,y 有变化，先重置位置
            if (originPosition.x !== model.x || originPosition.y !== model.y) {
                this.updatePosition(model);
            }
            this.updateShape();
        }
        this.afterUpdate();
        this.clearCache();
    };
    /**
     * 更新元素内容，样式
     */
    ItemBase.prototype.updateShape = function () {
        var shapeFactory = this.get('shapeFactory');
        var model = this.get('model');
        var shape = model.shape;
        // 判定是否允许更新
        // 1. 注册的节点允许更新
        // 2. 更新后的 shape 等于原先的 shape
        if (shapeFactory.shouldUpdate(shape) && shape === this.get('currentShape')) {
            var updateCfg = this.getShapeCfg(model);
            shapeFactory.update(shape, updateCfg, this);
        }
        else {
            // 如果不满足上面两种状态，重新绘制
            this.draw();
        }
        this.set('originStyle', this.getKeyShapeStyle());
        // 更新后重置节点状态
        this.resetStates(shapeFactory, shape);
    };
    /**
     * 更新位置，避免整体重绘
     * @param {object} cfg 待更新数据
     */
    ItemBase.prototype.updatePosition = function (cfg) {
        var model = this.get('model');
        var x = isNil(cfg.x) ? model.x : cfg.x;
        var y = isNil(cfg.y) ? model.y : cfg.y;
        var group = this.get('group');
        if (isNil(x) || isNil(y)) {
            return;
        }
        group.resetMatrix();
        // G 4.0 element 中移除了矩阵相关方法，详见https://www.yuque.com/antv/blog/kxzk9g#4rMMV
        translate(group, { x: x, y: y });
        model.x = x;
        model.y = y;
        this.clearCache(); // 位置更新后需要清除缓存
    };
    /**
     * 获取元素的包围盒
     * @return {Object} 包含 x,y,width,height, centerX, centerY
     */
    ItemBase.prototype.getBBox = function () {
        // 计算 bbox 开销有些大，缓存
        var bbox = this.get(CACHE_BBOX);
        if (!bbox) {
            bbox = this.calculateBBox();
            this.set(CACHE_BBOX, bbox);
        }
        return bbox;
    };
    /**
     * 将元素放到最前面
     */
    ItemBase.prototype.toFront = function () {
        this.get('group').toFront();
    };
    /**
     * 将元素放到最后面
     */
    ItemBase.prototype.toBack = function () {
        this.get('group').toBack();
    };
    /**
     * 显示元素
     */
    ItemBase.prototype.show = function () {
        this.changeVisibility(true);
    };
    /**
     * 隐藏元素
     */
    ItemBase.prototype.hide = function () {
        this.changeVisibility(false);
    };
    /**
     * 更改是否显示
     * @param  {Boolean} visible 是否显示
     */
    ItemBase.prototype.changeVisibility = function (visible) {
        var group = this.get('group');
        if (visible) {
            group.show();
        }
        else {
            group.hide();
        }
        this.set('visible', visible);
    };
    /**
     * 元素是否可见
     */
    ItemBase.prototype.isVisible = function () {
        return this.get('visible');
    };
    /**
     * 是否拾取及出发该元素的交互事件
     * @param {Boolean} enable 标识位
     */
    ItemBase.prototype.enableCapture = function (enable) {
        var group = this.get('group');
        if (group) {
            group.attr('capture', enable);
        }
    };
    ItemBase.prototype.destroy = function () {
        if (!this.destroyed) {
            var animate = this.get('animate');
            var group = this.get('group');
            if (animate) {
                group.stopAnimate();
            }
            group.remove();
            this._cfg = null;
            this.destroyed = true;
        }
    };
    return ItemBase;
}());
export default ItemBase;
//# sourceMappingURL=item.js.map