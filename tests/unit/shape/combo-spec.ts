/**
 * @fileOverview 内置节点的测试
 * @author dxq613@gmai.com
 */

import Shape from '../../../src/shape/shape';
import Canvas from '@antv/g-canvas/lib/canvas';
import { translate } from '../../../src/util/math';
import '../../../src/shape/combo';
import '../../../src/shape/combos';
import Combo from '../../../src/item/combo';

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

  describe('nodes test', () => {
    const factory = Shape.getFactory('combo');
    it('circle no label', () => {
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
      expect(shape.attr('r')).toBe(45); // size / 2 + padding
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
          label: '你好，我好，大家好',
        },
        group,
      );
      canvas.draw();
      expect(group.getCount()).toBe(2);
    });

    it('rect', () => {
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

    it('update', () => {
      const group = canvas.addGroup({
        id: 'rect',
      });
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Combo({
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
      factory.baseUpdate(
        'rect',
        {
          style: {
            fill: 'red',
          },
        },
        item,
      );
      const shape = group.get('children')[0];
      expect(shape.attr('fill')).toBe('red');
      expect(shape.attr('width')).toBe(80);
      expect(group.getCount()).toBe(1);
      factory.baseUpdate(
        'rect',
        {
          style: {
            fill: 'blue',
          },
          label: 'new rect',
        },
        item,
      );
      expect(group.getCount()).toBe(2);
      const label = group.get('children')[1];
      expect(label.attr('text')).toBe('new rect');
      factory.baseUpdate(
        'rect',
        {
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
          fill: 'steelblue',
        },
      });
      // since the update is animated, check it after 300ms
      setTimeout(() => {
        expect(shape.attr('fill')).toBe('steelblue');
      }, 300);
    });

    it('active', () => {
      const rectGroup = canvas.addGroup({
        id: 'rect-active',
      });
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Combo({
        model: {
          id: 'rectnode',
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

    it('label position', () => {
      const group = canvas.addGroup();
      translate(group, { x: 200, y: 200 });
      const model = {
        color: 'green',
        label: 'circle position',
        labelCfg: {
          position: 'top',
          offset: 5,
        },
      };
      factory.draw('circle', model, group);

      // 伪造 item
      const item = new Combo({
        model,
        group,
      });

      const label = group.get('children')[1];
      expect(label.attr('x')).toBe(0);
    });
    it('clear', () => {
      canvas.destroy();
    });
  });
});
