/**
 * @fileOverview 内置节点的测试
 * @author dxq613@gmai.com
 */

import Shape from '../../../src/shape/shape'
import Global from '../../../src/global';
import Canvas from '@antv/g-canvas/lib/canvas';
import { translate } from '../../../src/util/math'
import '../../../src/shape/node'
import '../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'node-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  container: 'node-shape',
  width: 500,
  height: 500
});

describe('shape node test', () => {
  describe('basic method test', () => {
    it('get factory', () => {
      const factory = Shape.getFactory('node');
      expect(factory).not.toBe(undefined);
    });
    it('get default', () => {
      const factory = Shape.getFactory('node');
      const shape = factory.getShape();
      expect(shape.type).toBe('circle');
    });
  });

  describe('nodes test', () => {
    const factory = Shape.getFactory('node');
    it('circle no label', () => {
      const group = canvas.addGroup();
      translate(group, { x: 50, y: 50 })
      const shape = factory.draw('circle', {
        size: 40,
        color: 'red'
      }, group);
      canvas.draw();
      expect(shape.attr('r')).toBe(20);
      expect(group.getCount()).toBe(1);
    });

    it('circle with label', () => {
      const group = canvas.addGroup();
      translate(group, { x: 50, y: 100 })
      factory.draw('circle', {
        size: 20,
        color: 'blue',
        label: '你好，我好，大家好'
      }, group);
      canvas.draw();
      expect(group.getCount()).toBe(2);
    });

    it('ellipse', () => {
      const group = canvas.addGroup();
      translate(group, { x: 100, y: 50 })
      const shape = factory.draw('ellipse', {
        size: [ 40, 20 ],
        color: 'yellow',
        label: 'ellipse'
      }, group);
      canvas.draw();
      expect(shape.attr('rx')).toBe(20);
      expect(shape.attr('ry')).toBe(10);
      expect(group.getCount()).toBe(2);
    });

    it('rect', () => {
      const group = canvas.addGroup({
        id: 'rect'
      });
      translate(group, { x: 100, y: 100 })
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
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      const label = group.get('children')[1];
      expect(label.attr('fill')).toBe('white');
      expect(group.getCount()).toBe(2);
    });

    it('image', () => {
      const group = canvas.addGroup();
      translate(group, { x: 150, y: 100 })
      const shape = factory.draw('image', {
        size: [ 40, 20 ],
        label: 'my custom image',
        shape: 'image',
        img: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png'
      }, group);
      canvas.draw();
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      expect(shape.attr('img')).not.toBe(undefined);
      const label = group.get('children')[1];
      expect(label.attr('x')).toBe(0);
      expect(label.attr('y')).toBe(10 + Global.nodeLabel.offset);
      expect(group.getCount()).toBe(2);
    });

    // TODO: wait for getByClassName defined by G
    // it('update', () => {
    //   const rectGroup = canvas.findById('rect');
    //   const shape = rectGroup.get('children')[0];
		// 	// 伪造 item, 仅测试接口和图形的变化，不测试一致性
    //   const item = {
    //     getContainer() {
    //       return rectGroup;
    //     }
    //   };
    //   factory.update('rect', {
    //     size: [ 100, 50 ],
    //     style: {
    //       fill: 'red'
    //     }
    //   }, item);
    //   expect(shape.attr('x')).toBe(-50);
    //   expect(shape.attr('y')).toBe(-25);
    //   expect(shape.attr('width')).toBe(100);
    //   expect(rectGroup.getCount()).toBe(1);
    //   factory.update('rect', {
    //     size: [ 50, 30 ],
    //     style: {
    //       fill: 'red'
    //     },
    //     label: 'new rect'
    //   }, item);

    //   expect(rectGroup.getCount()).toBe(2);
    //   const label = rectGroup.get('children')[1];
    //   expect(label.attr('text')).toBe('new rect');
    //   factory.update('rect', {
    //     size: [ 50, 30 ],
    //     style: {
    //       fill: 'red'
    //     },
    //     label: 'old rect'
    //   }, item);
    //   expect(label.attr('text')).toBe('old rect');
    //   canvas.draw();
    // });


    // TODO: wait for g findById
    
    // xit('active', () => {
    //   const rectGroup = canvas.findById('rect');
    //   const shape = rectGroup.get('children')[0];
		// 	// 伪造 item, 仅测试接口和图形的变化，不测试一致性
    //   const item = {
    //     getContainer() {
    //       return rectGroup;
    //     },
    //     get() {
    //       return '';
    //     }
    //   };

    //   expect(shape.attr('fillOpacity')).toBe(1);
    //   factory.setState('rect', 'active', true, item);
    //   expect(shape.attr('fillOpacity')).toBe(Global.nodeStateStyle.active.fillOpacity);
    //   expect(shape.attr('fillOpacity')).not.toBe(1);
    //   factory.setState('rect', 'active', false, item);
    //   expect(shape.attr('fillOpacity')).toBe(1);
    // });

    // xit('selected', () => {
    //   const rectGroup = canvas.findById('rect');
    //   const shape = rectGroup.get('children')[0];
		// 	// 伪造 item, 仅测试接口和图形的变化，不测试一致性
    //   const item = {
    //     getContainer() {
    //       return rectGroup;
    //     },
    //     get() {
    //       return '';
    //     }
    //   };
    //   expect(shape.attr('lineWidth')).toBe(1);
    //   factory.setState('rect', 'selected', true, item);

    //   expect(shape.attr('lineWidth')).toBe(Global.nodeStateStyle.selected.lineWidth);
    //   factory.setState('rect', 'selected', false, item);
    //   expect(shape.attr('lineWidth')).toBe(1);

    // });

    it('label position', () => {
      const group = canvas.addGroup();
      translate(group, { x: 200, y: 200 });
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
      expect(label.attr('x')).toBe(0);
      expect(label.attr('y')).toBe(-10 - Global.nodeLabel.offset);

      // TODO: wait for getByClassName defined by G
      // factory.update('ellipse', {
      //   size: [ 60, 20 ],
      //   color: 'green',
      //   label: 'ellipse position',
      //   labelCfg: {
      //     position: 'left'
      //   }
      // }, item);
      // expect(label.attr('y')).toBe(0);
      // expect(label.attr('x')).toBe(-30 - Global.nodeLabel.offset);

      // factory.update('ellipse', {
      //   size: [ 60, 20 ],
      //   color: 'green',
      //   label: 'ellipse position',
      //   labelCfg: {
      //     position: 'right'
      //   }
      // }, item);
      // expect(label.attr('y')).toBe(0);
      // expect(label.attr('x')).toBe(30 + Global.nodeLabel.offset);

      // factory.update('ellipse', {
      //   size: [ 60, 20 ],
      //   color: 'green',
      //   label: 'ellipse position',
      //   labelCfg: {
      //     position: 'right',
      //     offset: 20
      //   }
      // }, item);
      // expect(label.attr('y')).toBe(0);
      // expect(label.attr('x')).toBe(30 + 20);

      // factory.update('ellipse', {
      //   size: [ 60, 20 ],
      //   color: 'green',
      //   label: 'ellipse position',
      //   labelCfg: {
      //     position: 'right',
      //     offset: 0
      //   }
      // }, item);
      // expect(label.attr('y')).toBe(0);
      // expect(label.attr('x')).toBe(30);
      // canvas.draw();
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
      expect(keyShape.attr('fill')).toEqual('#91d5ff');
      expect(keyShape.attr('stroke')).toEqual('green');
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
      expect(keyShape.attr('fill')).toEqual('#91d5ff');
      expect(keyShape.attr('stroke')).toEqual('green');
    });
    it('clear', () => {
      canvas.destroy();
    });
  });
});
