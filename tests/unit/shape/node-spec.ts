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
import '../../../src/shape/node';
import '../../../src/shape/nodes';
import { IGroup } from '@antv/g-canvas/lib/interfaces';

const div = document.createElement('div');
div.id = 'node-shape';
document.body.appendChild(div);

const canvas = new Canvas({
  container: 'node-shape',
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
      expect(shape.type).toBe('circle');
    });
  });

  describe('nodes test', () => {
    const factory = Shape.getFactory('node');
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
      expect(shape.attr('r')).toBe(20);
      expect(group.getCount()).toBe(1);
    });

    it('circle with label', () => {
      const group = canvas.addGroup();
      translate(group, { x: 50, y: 100 });
      factory.draw(
        'circle',
        {
          size: 20,
          color: 'blue',
          label: '你好，我好，大家好',
        },
        group,
      );
      canvas.draw();
      expect(group.getCount()).toBe(2);
    });

    it('ellipse', () => {
      const group = canvas.addGroup();
      translate(group, { x: 100, y: 50 });
      const shape = factory.draw(
        'ellipse',
        {
          size: [40, 20],
          color: 'yellow',
          label: 'ellipse',
        },
        group,
      );
      canvas.draw();
      expect(shape.attr('rx')).toBe(20);
      expect(shape.attr('ry')).toBe(10);
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
      canvas.draw();
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      const label = group.get('children')[1];
      expect(label.attr('fill')).toBe('white');
      expect(group.getCount()).toBe(2);
    });

    it('image', () => {
      const group = canvas.addGroup();
      translate(group, { x: 150, y: 100 });
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
      canvas.draw();
      expect(shape.attr('x')).toBe(-20);
      expect(shape.attr('y')).toBe(-10);
      expect(shape.attr('img')).not.toBe(undefined);
      const label = group.get('children')[1];
      expect(label.attr('x')).toBe(0);
      expect(label.attr('y')).toBe(10 + Global.nodeLabel.offset);
      expect(group.getCount()).toBe(2);
    });

    it('update', () => {
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

    it('active', () => {
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

    it('selected', () => {
      const group = canvas.addGroup({
        id: 'rect',
      });
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
      const shape = group.get('children')[0];
      expect(shape.attr('lineWidth')).toBe(1);
      factory.setState('node', 'selected', true, item);
      expect(shape.attr('lineWidth')).toBe(2);

      factory.setState('node', 'selected', false, item);
      expect(shape.attr('lineWidth')).toBe(1);
    });

    it('label position', () => {
      const group = canvas.addGroup();
      translate(group, { x: 200, y: 200 });
      const model = {
        size: [60, 20],
        color: 'green',
        label: 'ellipse position',
        labelCfg: {
          position: 'top',
          offset: 5,
        },
      };
      factory.draw('ellipse', model, group);

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

    it('rect linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'rect',
            linkPoints: {
              top: true,
              bottom: true,
            },
            type: 'rect',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // rect + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: true,
          right: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).not.toBe(null);
      expect(leftPoint.attr('r')).toBe(5);
      expect(leftPoint.attr('fill')).toBe('#f00');
      expect(leftPoint.attr('stroke')).toBe('#0f0');
      expect(leftPoint.attr('lineWidth')).toBe(2);
      const rightPoint = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint2 = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint2.attr('r')).toBe(5);
      expect(bottomPoint2.attr('fill')).toBe('#f00');
      expect(bottomPoint2.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('ellipse linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'ellipse',
            linkPoints: {
              top: true,
              bottom: true,
            },
            type: 'ellipse',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // rect + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: true,
          right: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).not.toBe(null);
      expect(leftPoint.attr('r')).toBe(5);
      expect(leftPoint.attr('fill')).toBe('#f00');
      expect(leftPoint.attr('stroke')).toBe('#0f0');
      expect(leftPoint.attr('lineWidth')).toBe(2);
      const rightPoint = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint2 = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint2.attr('r')).toBe(5);
      expect(bottomPoint2.attr('fill')).toBe('#f00');
      expect(bottomPoint2.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('diamond linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'diamond',
            linkPoints: {
              top: true,
              bottom: true,
            },
            type: 'diamond',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // rect + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: true,
          right: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).not.toBe(null);
      expect(leftPoint.attr('r')).toBe(5);
      expect(leftPoint.attr('fill')).toBe('#f00');
      expect(leftPoint.attr('stroke')).toBe('#0f0');
      expect(leftPoint.attr('lineWidth')).toBe(2);
      const rightPoint = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint2 = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint2.attr('r')).toBe(5);
      expect(bottomPoint2.attr('fill')).toBe('#f00');
      expect(bottomPoint2.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('circle linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
            linkPoints: {
              top: true,
              bottom: true,
            },
            type: 'circle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // rect + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: true,
          right: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).not.toBe(null);
      expect(leftPoint.attr('r')).toBe(5);
      expect(leftPoint.attr('fill')).toBe('#f00');
      expect(leftPoint.attr('stroke')).toBe('#0f0');
      expect(leftPoint.attr('lineWidth')).toBe(2);
      const rightPoint = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint2 = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint2.attr('r')).toBe(5);
      expect(bottomPoint2.attr('fill')).toBe('#f00');
      expect(bottomPoint2.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
