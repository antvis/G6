const { Canvas } = require('@antv/g/lib');
const Shape = require('../../../src/shape/shape');
require('../../../src/shape/edge');
const expect = require('chai').expect;
const div = document.createElement('div');
div.id = 'edge-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'edge-shape',
  width: 600,
  height: 600
});

describe('shape edge test', () => {
  describe('basic method test', () => {
    it('get factory', () => {
      const factory = Shape.getFactory('edge');
      expect(factory).not.eql(undefined);
    });
    it('get default', () => {
      const factory = Shape.getFactory('edge');
      const shape = factory.getShape();
      expect(shape.type).eql('line');
    });
  });

  describe('line test', () => {
    const factory = Shape.getFactory('edge');
    it('line without label', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('line', {
        startPoint: { x: 50, y: 50 },
        endPoint: { x: 100, y: 100 },
        color: 'red'
      }, group);
      canvas.draw();
      const path = shape.attr('path');
      expect(shape.attr('stroke')).eql('red');
      expect(path.length).eql(2);
      expect(path[0]).eqls([ 'M', 50, 50 ]);
      expect(group.getCount()).eql(1);
    });

    it('line with label', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('line', {
        startPoint: { x: 150, y: 50 },
        endPoint: { x: 100, y: 100 },
        color: 'blue',
        label: '这是一条线'
      }, group);

      expect(shape.attr('path').length).eql(2);
      const label = group.get('children')[1];
      expect(label.attr('x')).eql((100 + 150) / 2);
      expect(label.attr('y')).eql((100 + 50) / 2);
      expect(group.getCount()).eql(2);
      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        }
      };
      factory.update('shape', {
        startPoint: { x: 150, y: 50 },
        endPoint: { x: 100, y: 100 },
        color: 'blue',
        label: '这是一条线',
        labelCfg: {
          position: 'start'
        }
      }, item);
      canvas.draw();
      expect(label.attr('x')).eql(150);
      expect(label.attr('y')).eql(50);
      factory.update('shape', {
        startPoint: { x: 150, y: 50 },
        endPoint: { x: 100, y: 100 },
        color: 'blue',
        label: '这是一条线',

        labelCfg: {
          position: 'end'
        }
      }, item);
      canvas.draw();
      expect(label.attr('x')).eql(100);
      expect(label.attr('y')).eql(100);
    });

    it('update points', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('line', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 150, y: 100 },
        color: 'yellow',
        label: '这是另一条线'
      }, group);
      expect(shape.attr('path')[0]).eqls([ 'M', 200, 200 ]);
      expect(group.getCount()).eql(2);
      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        }
      };
      factory.update('line', {
        startPoint: { x: 300, y: 300 },
        endPoint: { x: 250, y: 200 },
        color: 'pink',
        label: '这是不是另一条线'
      }, item);

      expect(shape.attr('path')[0]).eqls([ 'M', 300, 300 ]);
      const label = group.get('children')[1];
      expect(label.attr('x')).eql((300 + 250) / 2);
      expect(label.attr('y')).eql((300 + 200) / 2);

      canvas.draw();
    });

    it('polyline', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('polyline', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 150, y: 100 },
        controlPoints: [{ x: 170, y: 160 }],
        color: 'green',
        label: '这是一条折线'
      }, group);
      const path = shape.attr('path');
      expect(path.length).eql(3);
      expect(path[1]).eql([ 'L', 170, 160 ]);
    });

    it('quadratic', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('quadratic', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 150, y: 100 },
        controlPoints: [{ x: 220, y: 160 }],
        color: 'green',
        label: '这是一条曲线'
      }, group);
      const path = shape.attr('path');
      expect(path.length).eql(2);
      expect(path[1]).eql([ 'Q', 220, 160, 150, 100 ]);

      const group1 = canvas.addGroup();
      const shape1 = factory.draw('quadratic', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 100, y: 100 },
        color: 'red',
        label: 'xxxx',
        labelCfg: {
          autoRotate: true
        }
      }, group1);
      expect(shape1.attr('path').length).eql(2);
      const sqrt2 = Math.sqrt(2);
      expect(shape1.attr('path')[1]).eqls([ 'Q', 150 - 20 * sqrt2 / 2, 150 + 20 * sqrt2 / 2, 100, 100 ]);
      canvas.draw();
    });

    it('cubic', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('cubic', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 150, y: 100 },
        controlPoints: [{ x: 220, y: 200 }, { x: 170, y: 100 }],
        color: 'red'
      }, group);
      const path = shape.attr('path');
      expect(path.length).eql(2);
      expect(path[1]).eql([ 'C', 220, 200, 170, 100, 150, 100 ]);

      const shape1 = factory.draw('cubic', {
        startPoint: { x: 200, y: 200 },
        endPoint: { x: 150, y: 100 },
        color: 'blue'
      }, group);
      expect(shape1.attr('path').length).eql(2);
      canvas.draw();
    });

    it('cubic vertical', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('cubic-vertical', {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 150, y: 150 },
        color: 'red'
      }, group);

      expect(shape.attr('path')[1]).eql([ 'C', 0, 75, 150, 75, 150, 150 ]);
      canvas.draw();
    });

    it('cubic horizontal', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('cubic-horizontal', {
        startPoint: { x: 0, y: 0 },
        endPoint: { x: 150, y: 150 },
        color: 'red'
      }, group);

      expect(shape.attr('path')[1]).eql([ 'C', 75, 0, 75, 150, 150, 150 ]);
      canvas.draw();
    });

    it('clear', () => {
      canvas.clear();
    });
  });

  describe('label align', () => {
    const factory = Shape.getFactory('edge');
    function getPoint(center, radius, angle) {
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
      };
    }
    it('not auto rotate, middle', () => {
      const center = { x: 100, y: 100 };
      for (let i = 0; i < 360; i += 45) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 20, angle);
        const endPoint = getPoint(center, 60, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            style: {
              stroke: 'white',
              lineWidth: 5
            }

          }
        }, group);
        const label = group.get('children')[1];
        expect(label.attr('textAlign')).eql('center');

        expect(label.attr('stroke')).eql('white');
      }
      canvas.draw();
    });

    it('not auto rotate, start', () => {
      const center = { x: 250, y: 100 };
      canvas.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue'
        }
      });
      for (let i = 0; i < 360; i += 30) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          labelCfg: {
            position: 'start'
          },
          style: {
            endArrow: true
          }
        }, group);
        const label = group.get('children')[1];
        if (angle < 1 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('start');
        }
        if (angle > 1 / 2 * Math.PI && angle < 3 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('end');
        }
				// expect(label.attr('textAlign')).eql('center');
      }
      canvas.draw();
    });

    it('not auto rotate, end', () => {
      const center = { x: 450, y: 100 };
      canvas.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue'
        }
      });
      for (let i = 0; i < 360; i += 30) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            position: 'end'
          }
        }, group);
        const label = group.get('children')[1];
        if (angle < 1 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('end');
        }
        if (angle > 1 / 2 * Math.PI && angle < 3 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('start');
        }
				// expect(label.attr('textAlign')).eql('center');
      }
      canvas.draw();
    });


    it('auto rotate, middle', () => {
      const center = { x: 100, y: 300 };
      for (let i = 0; i < 360; i += 45) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 20, angle);
        const endPoint = getPoint(center, 60, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            autoRotate: true
          }
        }, group);
        const label = group.get('children')[1];
        expect(label.attr('textAlign')).eql('center');
      }
      canvas.draw();
    });

    it('auto rotate, start', () => {
      const center = { x: 250, y: 300 };
      canvas.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue'
        }
      });
      for (let i = 0; i < 360; i += 30) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            position: 'start',
            autoRotate: true
          }
        }, group);
        const label = group.get('children')[1];
        if (angle < 1 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('start');
        }
        if (angle > 1 / 2 * Math.PI && angle < 3 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('end');
        }
				// expect(label.attr('textAlign')).eql('center');
      }
      canvas.draw();
    });

    it('auto rotate, end', () => {
      const center = { x: 450, y: 300 };
      canvas.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue'
        }
      });
      for (let i = 0; i < 360; i += 30) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = canvas.addGroup();
        const shape = factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            position: 'end',
            autoRotate: true
          }
        }, group);
        const label = group.get('children')[1];
        if (angle < 1 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('end');
        }
        if (angle > 1 / 2 * Math.PI && angle < 3 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('start');
        }
        const point = shape.getPoint(1);
        expect(label.attr('x')).eql(point.x);
        expect(label.attr('y')).eql(point.y);
      }
      canvas.draw();
    });

    it('curve rotate center', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('cubic', {
        startPoint: { x: 100, y: 400 },
        endPoint: { x: 200, y: 400 },
        controlPoints: [{ x: 120, y: 380 }, { x: 160, y: 420 }],
        color: 'blue',
        label: 'curve in center',
        labelCfg: {
          autoRotate: true
        }
      }, group);
      const path = shape.attr('path');
      const label = group.get('children')[1];
      expect(path.length).eql(2);
      const point = shape.getPoint(0.5);
      expect(point.x).eql(label.attr('x'));
      expect(point.y).eql(label.attr('y'));

      canvas.draw();
    });

    it('curve rotate start', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('cubic', {
        startPoint: { x: 220, y: 400 },
        endPoint: { x: 320, y: 400 },
        controlPoints: [{ x: 230, y: 380 }, { x: 280, y: 420 }],
        color: 'blue',
        label: 'start',
        labelCfg: {
          position: 'start',
          autoRotate: true
        }
      }, group);
      const path = shape.attr('path');
      const label = group.get('children')[1];
      expect(path.length).eql(2);
      const point = shape.getPoint(0);
      expect(point.x).eql(label.attr('x'));
      expect(point.y).eql(label.attr('y'));
      expect(label.attr('rotate')).not.eql(0);
      canvas.draw();
    });

    it('text on line, text refX and refY', () => {
      const center = { x: 250, y: 500 };
      canvas.addShape('circle', {
        attrs: {
          x: center.x,
          y: center.y,
          r: 40,
          stroke: 'blue'
        }
      });
      for (let i = 0; i < 360; i += 30) {
        const angle = i / 180 * Math.PI;
        const startPoint = getPoint(center, 40, angle);
        const endPoint = getPoint(center, 80, angle);
        const group = canvas.addGroup();
        factory.draw('line', {
          startPoint,
          endPoint,
          color: 'red',
          label: i.toString(),
          style: {
            endArrow: true
          },
          labelCfg: {
            position: 'start',
            autoRotate: true,
            refX: 4,
            refY: 5
          }
        }, group);
        const label = group.get('children')[1];
        if (angle < 1 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('start');
        }
        if (angle > 1 / 2 * Math.PI && angle < 3 / 2 * Math.PI) {
          expect(label.attr('textAlign')).eql('end');
        }
				// expect(label.attr('textAlign')).eql('center');
      }
      canvas.draw();
    });

    function distance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    function equal(x1, x2) {
      return Math.abs(x1 - x2) < 0.0001;
    }

    it('text on curve, text refX and refY', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('spline', {
        startPoint: { x: 220, y: 400 },
        endPoint: { x: 320, y: 400 },
        controlPoints: [{ x: 230, y: 380 }, { x: 280, y: 420 }],
        color: 'pink',
        label: 'center',
        labelCfg: {
          position: 'center',
          autoRotate: true,
          refX: 3,
          refY: 4
        }
      }, group);
      const point = shape.getPoint(0.5);
      const label = group.get('children')[1];
      // 3*3 + 4*4 = 5*5
      expect(equal(distance(point, { x: label.attr('x'), y: label.attr('y') }), 5)).eql(true);
      canvas.draw();
    });

    it('text offset only one dim', () => {
      const group = canvas.addGroup();
      const shape = factory.draw('line', {
        startPoint: { x: 220, y: 400 },
        endPoint: { x: 320, y: 400 },
        color: 'pink',
        label: 'center',
        labelCfg: {
          position: 'center',
          autoRotate: true,
          refX: 5
        }
      }, group);
      const point = shape.getPoint(0.5);
      const label = group.get('children')[1];
      expect(equal(distance(point, { x: label.attr('x'), y: label.attr('y') }), 5)).eql(true);
    });
  });
});
