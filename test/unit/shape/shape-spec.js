/**
 * @fileOverview Shape 工厂方法的测试
 * @author dxq613@gmai.com
 */

const Shape = require('../../../src/shape/shape');
const expect = require('chai').expect;

describe('shape test', () => {
  it('register factory', () => {
    Shape.registerFactory('test', {
      defaultShapeType: 't1'
    });

    expect(Shape.Test).not.eql(undefined);
    expect(Shape.registerTest).not.eql(undefined);
  });

  it('get factory', () => {
    const factory = Shape.getFactory('test');
    expect(factory).not.eql(undefined);
  });

  it('register shape', () => {
    Shape.registerTest('t1', {});
    const factory = Shape.getFactory('test');
    const shape = factory.getShape('t1');
    expect(shape.type).eql('t1');
    expect(factory.getShape()).eql(shape);
  });

  it('not allow update', () => {
    const factory = Shape.getFactory('test');
    let isDraw = false;
    let afterDraw = false;
    Shape.registerTest('t2', {
      draw() {
        isDraw = true;
      },
      afterDraw() {
        afterDraw = true;
      }
    });
    expect(factory.shouldUpdate('t2')).eql(false);
    factory.draw('t2', {});
    factory.update('t2');
    expect(isDraw).eql(true);
    expect(afterDraw).eql(true);
  });

  it('allow update', () => {
    const factory = Shape.getFactory('test');
    let isUpdate = false;
    Shape.registerTest('t3', {
      update() {
        isUpdate = true;
      }
    });
    expect(factory.shouldUpdate('t3')).eql(true);
    factory.update('t3');
    expect(isUpdate).eql(true);
  });

  it('extend shape', () => {
    const factory = Shape.getFactory('test');
    let isUpdate = false;
    let isAfterUpdate = false;
    Shape.registerTest('t4', {
      draw() {},
      update() { isUpdate = true; },
      afterUpdate() { isAfterUpdate = true; }
    }, 't3');
    expect(factory.shouldUpdate('t4')).eql(true);
    factory.update('t4');
    expect(isUpdate).to.be.true;
    expect(isAfterUpdate).to.be.true;
  });

  it('getControlPoints', () => {
    const factory = Shape.getFactory('test');
    expect(factory.getControlPoints('t4', {})).eql(undefined);
    expect(factory.getControlPoints('t4', { controlPoints: [{}, {}] }).length).eql(2);
  });


  it('clear', () => {
    delete Shape.Test;
    delete Shape.registerTest;
    expect(Shape.getFactory('test')).eql(undefined);
  });
});
