const Shape = require('./shape');
const SingleShapeMixin = require('./single-shape-mixin');
const Util = require('../util/index');
const Global = require('../global');

// 注册 Node 的工厂方法
Shape.registerFactory('anchor', {
  defaultShapeType: 'circle'
});

const singleAnchorDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'anchor',
  shapeType: 'anchor',
  getCircleStyle(cfg) {
    const { x, y } = cfg;
    return {
      x,
      y,
      r: 5,
      fill: '#FFF',
      stroke: '#666',
      role: 'circle',
    };
  },
  drawShape(cfg = {}, group) {
    const circle = group.addShape('circle', {
      attrs: this.getCircleStyle(cfg),
    });
    circle.set('updateMethod', 'getCircleStyle');
    // circle.hide()

    // 这里set 到group 方便update attr 或者setState时调用
    group.set('circle', circle);

    circle.toFront();

    return group;
  },
  update(cfg, item) {
    const group = item.getContainer();

    // 获取 子shape 实例.
    const list = group.get('children');
    const circle = group.get('circle');

    // 遍历shape实例更新属性.
    list.reverse().forEach(shape => {
      const updateMethod = shape.get('updateMethod');
      let style;
      // 计算最新的样式
      style = this[updateMethod](cfg);
      // 只更新坐标
      const { x, y } = style;
      shape.attr({ x, y });
    });
    circle.toFront();
  }
});

Shape.registerAnchor('default-anchor', singleAnchorDefinition);