import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix';
import each from '@antv/util/lib/each';
import isArray from '@antv/util/lib/is-array';
import isObject from '@antv/util/lib/is-object';
import isString from '@antv/util/lib/is-string';
import upperFirst from '@antv/util/lib/upper-first';
import Edge from '@g6/item/edge';
import Node from '@g6/item/node';
var NODE = 'node';
var EDGE = 'edge';
var CFG_PREFIX = 'default';
var MAPPER_SUFFIX = 'Mapper';
var STATE_SUFFIX = 'stateStyles';
var hasOwnProperty = Object.hasOwnProperty;
var ItemController = /** @class */ (function () {
    function ItemController(graph) {
        this.graph = graph;
        this.destroyed = false;
    }
    /**
     * 增加 Item 实例
     *
     * @param {ITEM_TYPE} type 实例类型，node 或 edge
     * @param {(NodeConfig & EdgeConfig)} model 数据模型
     * @returns {(Item)}
     * @memberof ItemController
     */
    ItemController.prototype.addItem = function (type, model) {
        var graph = this.graph;
        var parent = graph.get(type + 'Group') || graph.get('group');
        var upperType = upperFirst(type);
        var item;
        var styles = graph.get(type + upperFirst(STATE_SUFFIX)) || {};
        var defaultModel = graph.get(CFG_PREFIX + upperType);
        var mapper = graph.get(type + MAPPER_SUFFIX);
        if (mapper) {
            var mappedModel = mapper(model);
            if (mappedModel[STATE_SUFFIX]) {
                styles = mappedModel[STATE_SUFFIX];
                delete mappedModel[STATE_SUFFIX];
            }
            // 如果配置了 defaultEdge 或 defaultNode，则将默认配置的数据也合并进去
            model = deepMix({}, defaultModel, model, mappedModel);
        }
        else if (defaultModel) {
            // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
            each(defaultModel, function (val, cfg) {
                if (!hasOwnProperty.call(model, cfg)) {
                    if (isObject(val)) {
                        model[cfg] = clone(val);
                    }
                    else {
                        model[cfg] = defaultModel[cfg];
                    }
                }
            });
        }
        graph.emit('beforeadditem', { type: type, model: model });
        if (type === EDGE) {
            var source = model.source;
            var target = model.target;
            if (source && isString(source)) {
                source = graph.findById(source);
            }
            if (target && isString(target)) {
                target = graph.findById(target);
            }
            if (!source || !target) {
                console.warn('The source or target node of edge ' + model.id + ' does not exist!');
                return;
            }
            item = new Edge({
                model: model,
                source: source,
                target: target,
                styles: styles,
                linkCenter: graph.get('linkCenter'),
                group: parent.addGroup()
            });
        }
        else if (type === NODE) {
            item = new Node({
                model: model,
                styles: styles,
                group: parent.addGroup()
            });
        }
        graph.get(type + 's').push(item);
        graph.get('itemMap')[item.get('id')] = item;
        graph.autoPaint();
        graph.emit('afteradditem', { item: item, model: model });
        return item;
    };
    /**
     * 更新节点或边
     *
     * @param {Item} item ID 或 实例
     * @param {(EdgeConfig | NodeConfig)} cfg 数据模型
     * @returns
     * @memberof ItemController
     */
    ItemController.prototype.updateItem = function (item, cfg) {
        var graph = this.graph;
        if (isString(item)) {
            item = graph.findById(item);
        }
        if (!item || item.destroyed) {
            return;
        }
        // 更新的 item 的类型
        var type = item.getType();
        var mapper = graph.get(type + MAPPER_SUFFIX);
        var model = item.getModel();
        if (mapper) {
            var result = deepMix({}, model, cfg);
            var mappedModel = mapper(result);
            // 将 update 时候用户传入的参数与mapperModel做deepMix，以便复用之前设置的参数值
            var newModel = deepMix({}, model, mappedModel, cfg);
            if (mappedModel[STATE_SUFFIX]) {
                item.set('styles', newModel[STATE_SUFFIX]);
                delete newModel[STATE_SUFFIX];
            }
            each(newModel, function (val, key) {
                cfg[key] = val;
            });
        }
        else {
            // merge update传进来的对象参数，model中没有的数据不做处理，对象和字符串值也不做处理，直接替换原来的
            each(cfg, function (val, key) {
                if (model[key]) {
                    if (isObject(val) && isArray(val)) {
                        cfg[key] = Object.assign({}, model[key], cfg[key]);
                    }
                }
            });
        }
        // emit beforeupdateitem 事件
        graph.emit('beforeupdateitem', { item: item, cfg: cfg });
        if (type === EDGE) {
            // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
            if (cfg.source) {
                var source = cfg.source;
                if (isString(source)) {
                    source = graph.findById(source);
                }
                item.setSource(source);
            }
            if (cfg.target) {
                var target = cfg.target;
                if (isString(target)) {
                    target = graph.findById(target);
                }
                item.setTarget(target);
            }
        }
        item.update(cfg);
        if (type === NODE) {
            var autoPaint = graph.get('autoPaint');
            graph.setAutoPaint(false);
            var edges = item.getEdges();
            each(edges, function (edge) {
                graph.refreshItem(edge);
            });
            graph.setAutoPaint(autoPaint);
        }
        graph.autoPaint();
        graph.emit('afterupdateitem', { item: item, cfg: cfg });
    };
    /**
     * 删除指定的节点或边
     *
     * @param {Item} item item ID 或实例
     * @returns {void}
     * @memberof ItemController
     */
    ItemController.prototype.removeItem = function (item) {
        var graph = this.graph;
        if (isString(item)) {
            item = graph.findById(item);
        }
        if (!item || item.destroyed) {
            return;
        }
        graph.emit('beforeremoveitem', { item: item });
        var type = item.getType();
        var items = graph.get(item.getType() + 's');
        var index = items.indexOf(item);
        items.splice(index, 1);
        var itemId = item.get('id');
        var itemMap = graph.get('itemMap');
        delete itemMap[itemId];
        if (type === NODE) {
            // 若移除的是节点，需要将与之相连的边一同删除
            var edges = item.getEdges();
            for (var i = edges.length; i >= 0; i--) {
                graph.removeItem(edges[i]);
            }
        }
        item.destroy();
        graph.autoPaint();
        graph.emit('afterremoveitem', { item: item });
    };
    /**
     * 更新 item 状态
     *
     * @param {Item} item Item 实例
     * @param {string} state 状态名称
     * @param {boolean} enabled 是否启用状态
     * @returns {void}
     * @memberof ItemController
     */
    ItemController.prototype.setItemState = function (item, state, enabled) {
        var graph = this.graph;
        if (item.hasState(state) === enabled) {
            return;
        }
        graph.emit('beforeitemstatechange', { item: item, state: state, enabled: enabled });
        item.setState(state, enabled);
        graph.autoPaint();
        graph.emit('afteritemstatechange', { item: item, state: state, enabled: enabled });
    };
    /**
     * 清除所有指定的状态
     *
     * @param {Item} item Item 实例
     * @param {string[]} states 状态名称集合
     * @memberof ItemController
     */
    ItemController.prototype.clearItemStates = function (item, states) {
        var graph = this.graph;
        if (isString(item)) {
            item = graph.findById(item);
        }
        graph.emit('beforeitemstatesclear', { item: item, states: states });
        item.clearStates(states);
        graph.autoPaint();
        graph.emit('afteritemstatesclear', { item: item, states: states });
    };
    /**
     * 刷新指定的 Item
     *
     * @param {Item} item Item ID 或 实例
     * @memberof ItemController
     */
    ItemController.prototype.refreshItem = function (item) {
        var graph = this.graph;
        if (isString(item)) {
            item = graph.findById(item);
        }
        graph.emit('beforeitemrefresh', { item: item });
        // 调用 Item 的 refresh 方法，实现刷新功能
        item.refresh();
        graph.autoPaint();
        graph.emit('afteritemrefresh', { item: item });
    };
    /**
     * 改变Item的显示状态
     *
     * @param {Item} item Item ID 或 实例
     * @param {boolean} visible 是否显示
     * @memberof ItemController
     */
    ItemController.prototype.changeItemVisibility = function (item, visible) {
        var self = this;
        var graph = self.graph;
        if (isString(item)) {
            item = graph.findById(item);
        }
        graph.emit('beforeitemvisibilitychange', { item: item, visible: visible });
        item.changeVisibility(visible);
        if (item.getType() === NODE) {
            var autoPaint = graph.get('autoPaint');
            graph.setAutoPaint(false);
            var edges = item.getEdges();
            each(edges, function (edge) {
                // 若隐藏节点，则将与之关联的边也隐藏
                // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
                if (visible && (!(edge.get('source').isVisible() && edge.get('target').isVisible()))) {
                    return;
                }
                self.changeItemVisibility(edge, visible);
            });
            graph.setAutoPaint(autoPaint);
        }
        graph.autoPaint();
        graph.emit('afteritemvisibilitychange', { item: item, visible: visible });
    };
    ItemController.prototype.destroy = function () {
        this.graph = null;
        this.destroyed = true;
    };
    return ItemController;
}());
export default ItemController;
//# sourceMappingURL=item.js.map