/**
 * @fileOverview 内置节点的测试
 * @author dxq613@gmai.com
 */

import Shape from '../../../src/shape/shape';
import Global from '../../../src/global';
import Canvas from '@antv/g-canvas/lib/canvas';
import Node from '../../../src/item/node';
import { translate } from '../../../src/util/math';
import Graph from '../../../src/graph/graph';
import '../../../src/shape/combo';
import '../../../src/shape/combos';
import { IGroup } from '@antv/g-canvas/lib/interfaces';

const div = document.createElement('div');
div.id = 'combo-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  container: 'combo-shape',
  width: 500,
  height: 500,
});

describe('combo node test', () => {
  describe('basic method test', () => {
    it('get factory', () => {
      const factory = Shape.getFactory('combo');
      expect(factory).not.toBe(undefined);
    });
    it('get default', () => {
      const factory = Shape.getFactory('combo');
      const shape = factory.getShape();
      expect(shape.type).toBe('circle');
    });
  });

  describe.only('nodes test', () => {
    const factory = Shape.getFactory('combo');
    it.only('circle no label', () => {
      const group = canvas.addGroup();
      translate(group, { x: 50, y: 50 });
      const shape = factory.draw(
        'circle',
        {
          size: 40,
          color: 'red',
        },
        group,
      );
      canvas.draw();
      expect(shape.attr('r')).toBe(20);
      expect(group.getCount()).toBe(1);
    });

    it('circle with label', () => {
      const group = canvas.addGroup();
      translate(group, { x: 150, y: 100 });
      factory.draw(
        'circle',
        {
          size: 200,
          color: 'blue',
          label: '你好，我好，大家好'
        },
        group,
      );
      canvas.draw();
      expect(group.getCount()).toBe(2);
    });

    it.only('rect', () => {
      const group = canvas.addGroup({
        id: 'rect',
      });
      translate(group, { x: 100, y: 100 });
      const shape = factory.draw(
        'rect',
        {
          size: [200, 120],
          label: 'rect',
        },
        group,
      );
      canvas.draw();
      // expect(shape.attr('x')).toBe(-20);
      // expect(shape.attr('y')).toBe(-10);
      // const label = group.get('children')[1];
      // expect(label.attr('fill')).toBe('white');
      // expect(group.getCount()).toBe(2);
    });

    xit('update', () => {
      const group = canvas.addGroup({
        id: 'rect',
      });
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Node({
        model: {
          size: [40, 20],
          color: 'yellow',
          type: 'rect',
          labelCfg: {
            style: {
              fill: 'white',
            },
          },
          style: {
            fill: 'red',
          },
        },
        group,
      });
      factory.update(
        'rect',
        {
          size: [100, 50],
          style: {
            fill: 'red',
          },
        },
        item,
      );
      const shape = group.get('children')[0];
      expect(shape.attr('x')).toBe(-50);
      expect(shape.attr('y')).toBe(-25);
      expect(shape.attr('width')).toBe(100);
      expect(group.getCount()).toBe(1);
      factory.update(
        'rect',
        {
          size: [50, 30],
          style: {
            fill: 'red',
          },
          label: 'new rect',
        },
        item,
      );
      expect(group.getCount()).toBe(2);
      const label = group.get('children')[1];
      expect(label.attr('text')).toBe('new rect');
      factory.update(
        'rect',
        {
          size: [50, 30],
          style: {
            fill: 'red',
          },
          label: 'old rect',
        },
        item,
      );
      expect(label.attr('text')).toBe('old rect');

      item.update({
        style: {
          fill: 'steelblue'
        }
      });
      expect(shape.attr('fill')).toBe('steelblue');
      canvas.draw();
    });

    xit('active', () => {
      const rectGroup = canvas.findById('rect') as IGroup;
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Node({
        model: {
          id: 'rectnode',
          size: [40, 20],
          type: 'rect',
          stateStyles: {
            active: {
              fillOpacity: 0.8,
            },
          },
        },
        group: rectGroup,
      });
      const shape = rectGroup.get('children')[0];

      expect(shape.attr('fillOpacity')).toBe(1);
      factory.setState('rectnode', 'active', true, item);
      expect(shape.attr('fillOpacity')).not.toBe(1);
      factory.setState('rectnode', 'active', false, item);
      expect(shape.attr('fillOpacity')).toBe(1);
    });

    xit('label position', () => {
      const group = canvas.addGroup();
      translate(group, { x: 200, y: 200 });
      const model = {
        size: [60, 20],
        color: 'green',
        label: 'circle position',
        labelCfg: {
          position: 'top',
          offset: 5,
        },
      };
      factory.draw('circle', model, group);

      // 伪造 item
      const item = new Node({
        model,
        group,
      });

      const label = group.get('children')[1];
      expect(label.attr('x')).toBe(0);
      expect(label.attr('y')).toBe(-10 - Global.nodeLabel.offset);

      factory.update(
        'ellipse',
        {
          size: [60, 20],
          color: 'green',
          label: 'ellipse position',
          labelCfg: {
            position: 'left',
          },
        },
        item,
      );
      expect(label.attr('y')).toBe(0);
      expect(label.attr('x')).toBe(-30 - Global.nodeLabel.offset);

      factory.update(
        'ellipse',
        {
          size: [60, 20],
          color: 'green',
          label: 'ellipse position',
          labelCfg: {
            position: 'right',
          },
        },
        item,
      );
      expect(label.attr('y')).toBe(0);
      expect(label.attr('x')).toBe(30 + Global.nodeLabel.offset);

      factory.update(
        'ellipse',
        {
          size: [60, 20],
          color: 'green',
          label: 'ellipse position',
          labelCfg: {
            position: 'right',
            offset: 20,
          },
        },
        item,
      );
      expect(label.attr('y')).toBe(0);
      expect(label.attr('x')).toBe(30 + 20);

      factory.update(
        'ellipse',
        {
          size: [60, 20],
          color: 'green',
          label: 'ellipse position',
          labelCfg: {
            position: 'right',
            offset: 0,
          },
        },
        item,
      );
      expect(label.attr('y')).toBe(0);
      expect(label.attr('x')).toBe(30);
      canvas.draw();
    });
    it('clear', () => {
      canvas.destroy();
    });

  });
});
