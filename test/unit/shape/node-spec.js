/**
 * @fileOverview 内置节点的测试
 * @author dxq613@gmai.com
 */

const { Canvas } = require('@antv/g/lib');
const Shape = require('../../../src/shape/shape');
const Global = require('../../../src/global');
require('../../../src/shape/node');
const expect = require('chai').expect;
const div = document.createElement('div');
div.id = 'node-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  containerId: 'node-shape',
  width: 500,
  height: 500
});

describe('shape node test', () => {
  describe('basic method test', () => {
    it('get factory', () => {
      const factory = Shape.getFactory('node');
      expect(factory).not.eql(undefined);
    });
    it('get default', () => {
      const factory = Shape.getFactory('node');
      const shape = factory.getShape();
      expect(shape.type).eql('circle');
    });
  });

  describe('nodes test', () => {
    const factory = Shape.getFactory('node');
    it('circle no label', () => {
      const group = canvas.addGroup();
      group.translate(50, 50);
      const shape = factory.draw('circle', {
        size: 40,
        color: 'red'
      }, group);
      canvas.draw();
      expect(shape.attr('r')).eql(20);
      expect(group.getCount()).eql(1);
    });

    it('circle with label', () => {
      const group = canvas.addGroup();
      group.translate(50, 100);
      factory.draw('circle', {
        size: 20,
        color: 'blue',
        label: '你好，我好，大家好'
      }, group);
      canvas.draw();
      expect(group.getCount()).eql(2);
    });

    it('ellipse', () => {
      const group = canvas.addGroup();
      group.translate(100, 50);
      const shape = factory.draw('ellipse', {
        size: [ 40, 20 ],
        color: 'yellow',
        label: 'ellipse'
      }, group);
      canvas.draw();
      expect(shape.attr('rx')).eql(20);
      expect(shape.attr('ry')).eql(10);
      expect(group.getCount()).eql(2);
    });

    it('rect', () => {
      const group = canvas.addGroup({
        id: 'rect'
      });
      group.translate(100, 100);
      const shape = factory.draw('rect', {
        size: [ 40, 20 ],
        color: 'yellow',
        label: 'rect',
        labelCfg: {
          style: {
            fill: 'white'
          }
        },
        style: {
          fill: 'red'
        }
      }, group);
      canvas.draw();
      expect(shape.attr('x')).eql(-20);
      expect(shape.attr('y')).eql(-10);
      const label = group.get('children')[1];
      expect(label.attr('fill')).eql('white');
      expect(group.getCount()).eql(2);
    });

    it('image', () => {
      const group = canvas.addGroup();
      group.translate(150, 100);
      const shape = factory.draw('image', {
        size: [ 40, 20 ],
        label: 'my custom image',
        shape: 'image',
        img: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png'
      }, group);
      canvas.draw();
      expect(shape.attr('x')).eql(-20);
      expect(shape.attr('y')).eql(-10);
      expect(shape.attr('img')).not.eql(undefined);
      const label = group.get('children')[1];
      expect(label.attr('x')).eql(0);
      expect(label.attr('y')).eql(10 + Global.nodeLabel.offset);
      expect(group.getCount()).eql(2);
    });

    it('update', () => {
      const rectGroup = canvas.findById('rect');
      const shape = rectGroup.get('children')[0];
			// 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = {
        getContainer() {
          return rectGroup;
        }
      };
      factory.update('rect', {
        size: [ 100, 50 ],
        style: {
          fill: 'red'
        }
      }, item);
      expect(shape.attr('x')).eql(-50);
      expect(shape.attr('y')).eql(-25);
      expect(shape.attr('width')).eql(100);
      expect(rectGroup.getCount()).eql(1);
      factory.update('rect', {
        size: [ 50, 30 ],
        style: {
          fill: 'red'
        },
        label: 'new rect'
      }, item);

      expect(rectGroup.getCount()).eql(2);
      const label = rectGroup.get('children')[1];
      expect(label.attr('text')).eql('new rect');
      factory.update('rect', {
        size: [ 50, 30 ],
        style: {
          fill: 'red'
        },
        label: 'old rect'
      }, item);
      expect(label.attr('text')).eql('old rect');
      canvas.draw();
    });

    xit('active', () => {
      const rectGroup = canvas.findById('rect');
      const shape = rectGroup.get('children')[0];
			// 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = {
        getContainer() {
          return rectGroup;
        },
        get() {
          return '';
        }
      };

      expect(shape.attr('fillOpacity')).eql(1);
      factory.setState('rect', 'active', true, item);
      expect(shape.attr('fillOpacity')).eql(Global.nodeStateStyle.active.fillOpacity);
      expect(shape.attr('fillOpacity')).not.eql(1);
      factory.setState('rect', 'active', false, item);
      expect(shape.attr('fillOpacity')).eql(1);
    });

    xit('selected', () => {
      const rectGroup = canvas.findById('rect');
      const shape = rectGroup.get('children')[0];
			// 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = {
        getContainer() {
          return rectGroup;
        },
        get() {
          return '';
        }
      };
      expect(shape.attr('lineWidth')).eql(1);
      factory.setState('rect', 'selected', true, item);

      expect(shape.attr('lineWidth')).eql(Global.nodeStateStyle.selected.lineWidth);
      factory.setState('rect', 'selected', false, item);
      expect(shape.attr('lineWidth')).eql(1);

    });

    it('label position', () => {
      const group = canvas.addGroup();
      group.translate(200, 200);
      factory.draw('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'top'
        }
      }, group);
      const item = {
        getContainer() {
          return group;
        },
        get() {
          return '';
        }
      };
      const label = group.get('children')[1];
      expect(label.attr('x')).eql(0);
      expect(label.attr('y')).eql(-10 - Global.nodeLabel.offset);

      factory.update('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'left'
        }
      }, item);
      expect(label.attr('y')).eql(0);
      expect(label.attr('x')).eql(-30 - Global.nodeLabel.offset);

      factory.update('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'right'
        }
      }, item);
      expect(label.attr('y')).eql(0);
      expect(label.attr('x')).eql(30 + Global.nodeLabel.offset);

      factory.update('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'right',
          offset: 20
        }
      }, item);
      expect(label.attr('y')).eql(0);
      expect(label.attr('x')).eql(30 + 20);

      factory.update('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'right',
          offset: 0
        }
      }, item);
      expect(label.attr('y')).eql(0);
      expect(label.attr('x')).eql(30);
      canvas.draw();
    });
    it('change global node style', () => {
      let group = canvas.addGroup();
      let keyShape = factory.draw('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'top'
        }
      }, group);
      expect(keyShape.attr('fill')).to.equal('#fff');
      expect(keyShape.attr('stroke')).to.equal('green');
      Global.defaultNode.style = {
        fill: '#333',
        stroke: '#666'
      };
      group = canvas.addGroup();
      keyShape = factory.draw('ellipse', {
        size: [ 60, 20 ],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'top'
        }
      }, group);
      expect(keyShape.attr('fill')).to.equal('#333');
      expect(keyShape.attr('stroke')).to.equal('#666');
    });
    it('clear', () => {
      canvas.destroy();
    });
  });
});
