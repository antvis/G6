/**
 * @fileOverview shape base class
 * @author huangtonger@aliyun.com
 */


const Util = require('../util/');
const Shape = {};

const ShapeBase = {
  draw() {}
};

const ShapeManagerBase = {
  defaultShapeType: null,
  getShape(type, inputDefaultShape) {
    const shape = this[type] || this[inputDefaultShape] || this[this.defaultShapeType] || ShapeBase;
    return shape;
  },
  getExtendShape(extendShapeName, defaultShapeType) {
    if (Util.isArray(extendShapeName)) {
      let rst = {};
      extendShapeName.forEach(subExtendShapeName => {
        if (this[subExtendShapeName]) {
          rst = Util.mix({}, rst, this.getShape(subExtendShapeName, defaultShapeType));
        }
      });
      return rst;
    }
    return this.getShape(extendShapeName, defaultShapeType);
  }
};

Shape.registerShapeManager = function(type, cfg) {
  const shapeManager = Util.mix({}, ShapeManagerBase, cfg);
  const Type = Util.upperFirst(type);
  Shape[Type] = shapeManager;
  Shape['register' + Type] = function(shapeType, cfg, extendShapeName, defaultShapeType) {
    // if (shapeManager[shapeType]) {
    //   throw new Error(shapeType + ' was already exist, please choose another name.');
    // }
    if (Util.isNil(extendShapeName) && Util.isNil(defaultShapeType)) {
      extendShapeName = shapeType;
    }
    const extendShape = shapeManager.getExtendShape(extendShapeName, defaultShapeType);
    const shapeObj = Util.mix(true, {}, extendShape, cfg);
    shapeObj.type = shapeType;
    shapeManager[shapeType] = shapeObj;
    return shapeObj;
  };
  return shapeManager;
};

module.exports = Shape;
