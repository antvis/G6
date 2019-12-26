/**
 * @fileOverview 自定义 Shape 的基类
 * @author dxq613@gmail.com
 */
import { upperFirst } from '@antv/util';
var cache = {}; // ucfirst 开销过大，进行缓存
// 首字母大写
function ucfirst(str) {
    if (!cache[str]) {
        cache[str] = upperFirst(str);
    }
    return cache[str];
}
/**
 * 工厂方法的基类
 * @type Shape.FactoryBase
 */
var ShapeFactoryBase = {
    /**
     * 默认的形状，当没有指定/匹配 shapeType 时，使用默认的
     * @type {String}
     */
    defaultShapeType: 'defaultType',
    /**
     * 形状的 className，用于搜索
     * @type {String}
     */
    className: null,
    /**
     * 获取绘制 Shape 的工具类，无状态
     * @param  {String} type 类型
     * @return {Shape} 工具类
     */
    getShape: function (type) {
        var self = this;
        var shape = self[type] || self[self.defaultShapeType];
        return shape;
    },
    /**
     * 绘制图形
     * @param  {String} type  类型
     * @param  {Object} cfg 配置项
     * @param  {G.Group} group 图形的分组
     * @return {G.Shape} 图形对象
     */
    draw: function (type, cfg, group) {
        var shape = this.getShape(type);
        var rst = shape.draw(cfg, group);
        shape.afterDraw(cfg, group, rst);
        return rst;
    },
    /**
     * 更新
     * @param  {String} type  类型
     * @param  {Object} cfg 配置项
     * @param  {G6.Item} item 节点、边、分组等
     */
    update: function (type, cfg, item) {
        var shape = this.getShape(type);
        if (shape.update) { // 防止没定义 update 函数
            shape.update(cfg, item);
            shape.afterUpdate(cfg, item);
        }
    },
    /**
     * 设置状态
     * @param {String} type  类型
     * @param {String} name  状态名
     * @param {String | Boolean} value 状态值
     * @param {G6.Item} item  节点、边、分组等
     */
    setState: function (type, name, value, item) {
        var shape = this.getShape(type);
        shape.setState(name, value, item);
    },
    /**
     * 是否允许更新，不重新绘制图形
     * @param  {String} type 类型
     * @return {Boolean} 是否允许使用更新
     */
    shouldUpdate: function (type) {
        var shape = this.getShape(type);
        return !!shape.update;
    },
    getControlPoints: function (type, cfg) {
        var shape = this.getShape(type);
        return shape.getControlPoints(cfg);
    },
    /**
     * 获取控制点
     * @param {String} type 节点、边类型
     * @param  {Object} cfg 节点、边的配置项
     * @return {Array|null} 控制点的数组,如果为 null，则没有控制点
     */
    getAnchorPoints: function (type, cfg) {
        var shape = this.getShape(type);
        return shape.getAnchorPoints(cfg);
    }
};
var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.registerFactory = function (factoryType, cfg) {
        var className = ucfirst(factoryType);
        var factoryBase = ShapeFactoryBase;
        var shapeFactory = Object.assign({}, factoryBase, cfg);
        Shape[className] = shapeFactory;
        shapeFactory.className = className;
        // addRegister(shapeFactory)
        return shapeFactory;
    };
    Shape.getFactory = function (factoryType) {
        // const self = this
        var className = ucfirst(factoryType);
        return Shape[className];
    };
    Shape.registerNode = function (shapeType, nodeDefinition, extendShapeType) {
        var shapeFactory = Shape.Node;
        extendShapeType = extendShapeType ? extendShapeType : 'single-node';
        var extendShape = shapeFactory.getShape(extendShapeType);
        var shapeObj = Object.assign({}, extendShape, nodeDefinition);
        shapeObj.type = shapeType;
        shapeObj.itemType = 'node';
        shapeFactory[shapeType] = shapeObj;
        return shapeObj;
    };
    Shape.registerEdge = function (shapeType, edgeDefinition, extendShapeType) {
        var shapeFactory = Shape.Edge;
        extendShapeType = extendShapeType ? extendShapeType : 'single-edge';
        var extendShape = shapeFactory.getShape(extendShapeType);
        var shapeObj = Object.assign({}, extendShape, edgeDefinition);
        shapeObj.type = shapeType;
        shapeObj.itemType = 'edge';
        shapeFactory[shapeType] = shapeObj;
        return shapeObj;
    };
    return Shape;
}());
export default Shape;
// 注册 Node 的工厂方法
Shape.registerFactory('node', {
    defaultShapeType: 'circle'
});
// 注册 Edge 的工厂方法
Shape.registerFactory('edge', {
    defaultShapeType: 'line'
});
//# sourceMappingURL=shape.js.map