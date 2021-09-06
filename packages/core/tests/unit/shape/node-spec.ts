/**
 * @fileOverview 内置节点的测试
 * @author dxq613@gmai.com
 */

import Shape from '../../../src/element/shape';
import Global from '../../../src/global';
import Node from '../../../src/item/node';
import { translate } from '../../../src/util/math';
import '../../../src/element/node';
import '../../../src/element/nodes';

import G, { Path, Canvas, Group, Rect } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

const div = document.createElement('div');
div.id = 'node-spec';
document.body.appendChild(div);

const canvasRenderer = new CanvasRenderer();

// create a canvas
const canvas = new Canvas({
  ...{ renderer: canvasRenderer },
  container: div,
  width: 500,
  height: 500,
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
      expect(shape.type).toBe('simple-circle');
    });
  });

  describe('nodes test', () => {
    const factory = Shape.getFactory('node');
    it('circle no label', () => {
      const group = new Group();
      canvas.appendChild(group);
      group.setPosition([50, 50, 500]);
      const shape = factory.draw(
        'circle',
        {
          size: 40,
          color: 'red',
        },
        group,
      );
      expect(shape.attr('r')).toBe(20);
      expect(group.getCount()).toBe(1);
      expect(group.getPosition()[0]).toBe(50);
      expect(group.getPosition()[1]).toBe(50);
    });

    it('circle with label', () => {
      const group = new Group();
      canvas.appendChild(group);
      group.setPosition([50, 100, 500]);
      factory.draw(
        'simple-circle',
        {
          size: 20,
          color: 'blue',
          label: '你好，我好，大家好',
          labelCfg: {
            position: 'top',
          },
        },
        group,
      );
      expect(group.getCount()).toBe(2);
    });

    it('rect', () => {
      const group = new Group({
        id: 'rect',
      });
      canvas.appendChild(group);
      group.setPosition([100, 100, 500]);
      const shape = factory.draw(
        'simple-rect',
        {
          size: [40, 20],
          color: 'yellow',
          label: 'rect',
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
      );
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      const label = group.children[1];
      expect(label.attr('fill')).toBe('white');
      expect(group.getCount()).toBe(2);
    });

    it('image', () => {
      const group = new Group();
      canvas.appendChild(group);
      group.setPosition([150, 100, 500]);
      const shape = factory.draw(
        'image',
        {
          size: [40, 20],
          label: 'my custom image',
          type: 'image',
          img: 'https://img.alicdn.com/tfs/TB1_uT8a5ERMeJjSspiXXbZLFXa-143-59.png',
        },
        group,
      );
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      expect(shape.attr('img')).not.toBe(undefined);
      const label = group.children[1];
      expect(label.attr('x')).toBe(0);
      expect(label.attr('y')).toBe(10 + Global.nodeLabel.offset);
      expect(group.getCount()).toBe(2);
    });

    it('update', () => {
      const group = new Group({
        id: 'rect',
      });
      canvas.appendChild(group);
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Node({
        model: {
          size: [40, 20],
          color: 'yellow',
          type: 'simple-rect',
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
        'simple-rect',
        {
          size: [100, 50],
          style: {
            fill: 'red',
          },
        },
        item,
      );
      const shape = group.children[0];
      expect(shape.attr('x')).toBe(-50);
      expect(shape.attr('y')).toBe(-25);
      expect(shape.attr('width')).toBe(100);
      expect(group.getCount()).toBe(1);
      factory.baseUpdate(
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
      const label = group.children[1];
      expect(label.attr('text')).toBe('new rect');
      factory.baseUpdate(
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
          fill: 'steelblue',
        },
      });
      expect(shape.attr('fill')).toBe('steelblue');
    });

    it('active', () => {
      const rectGroup = canvas.getRoot().getElementById('rect');
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Node({
        model: {
          id: 'rectnode',
          size: [40, 20],
          type: 'simple-rect',
          stateStyles: {
            active: {
              fillOpacity: 0.8,
            },
          },
        },
        group: rectGroup,
      });
      const shape = rectGroup.children[0];

      expect(shape.attr('fillOpacity')).toBe(1);
      factory.setState('rectnode', 'active', true, item);
      expect(shape.attr('fillOpacity')).not.toBe(1);
      factory.setState('rectnode', 'active', false, item);
      expect(shape.attr('fillOpacity')).toBe(1);
    });

    it('selected', () => {
      const group = new Group({
        id: 'rect',
      });
      canvas.appendChild(group);
      // 伪造 item, 仅测试接口和图形的变化，不测试一致性
      const item = new Node({
        model: {
          id: 'node',
          stateStyles: {
            selected: {
              lineWidth: 2,
            },
          },
        },
        group,
      });
      const shape = group.children[0];
      expect(shape.attr('lineWidth')).toBe(1);
      factory.setState('node', 'selected', true, item);
      expect(shape.attr('lineWidth')).toBe(2);

      factory.setState('node', 'selected', false, item);
      expect(shape.attr('lineWidth')).toBe(1);
    });

    it('clear', () => {
      canvas.destroy();
    });
  });
});
