/**
 * @fileOverview Shape 工厂方法的测试
 * @author dxq613@gmai.com
 */

import G6 from '../../../src';
import { Circle } from '@antv/g';
import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 50,
        y: 50,
      },
      {
        id: 'node2',
        x: 250,
        y: 50,
      },
    ],
    edges: [
      {
        source: 'node1',
        target: 'node2',
      },
    ],
  };
  it('shape test without extended shape and draw function, update the node', () => {
    G6.registerNode('custom-node', {
      drawShape(cfg, group) {
        let fill = '#87e8de';
        if (cfg.style && cfg.style.fill) {
          fill = cfg.style.fill;
        }
        const keyShape = new Circle({
          attrs: {
            x: 0,
            y: 0,
            r: 30,
            fill,
          },
        });
        group.appendChild(keyShape);

        return keyShape;
      },
    });
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'custom-node',
      },
    });
    graph.data(data);
    graph.render();
    const node = graph.getNodes()[0];
    expect(node.getModel().x).not.toBe(undefined);
    expect(node.getModel().y).not.toBe(undefined);
    node.update({
      style: {
        fill: 'steelblue',
      },
    });
    expect(node.get('group').children[0].attr('fill')).toBe('steelblue');
    graph.destroy();
  });
  it('register node without draw and drawShape, extend circle', () => {
    G6.registerNode(
      'custom-node2',
      {
        setState(name, value, item) {
          // TODO 没有进来
          console.log('set state', name, value)
          const group = item.getContainer();
          const shape = group.children[0]; // 顺序根据 draw 时确定
          if (name === 'active') {
            if (value) {
              shape.attr({
                stroke: 'red',
                lineWidth: 2
              });
            } else {
              shape.attr({
                stroke: '#333',
                lineWidth: 2
              });
            }
          }
        },
      },
      'circle',
    );
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
    });
    data.nodes.forEach(node => {
      node.type = 'custom-node2'
    })
    graph.data(data);
    graph.render();
    const node = graph.getNodes()[0]
    debugger
    graph.setItemState(node, 'active', true);
    expect(node.hasState('active')).toBe(true);
    expect(node.getKeyShape().attr('stroke')).toBe('red');
    expect(node.getKeyShape().attr('lineWidth')).toBe(2);
    expect(node.getKeyShape().attr('fill')).toBe('steelblue');

    graph.setItemState(node, 'active', false);
    expect(node.hasState('active')).toBe(false);
    expect(node.getKeyShape().attr('stroke')).toBe('#333');
    expect(node.getKeyShape().attr('lineWidth')).toBe(2);
    expect(node.getKeyShape().attr('fill')).toBe('steelblue');

    expect(node.getModel().x).not.toBe(undefined);
    expect(node.getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('register edge without draw and drawShape function, extend quadratic', () => {
    // TODO: 拓展的边没有画出来
    G6.registerEdge(
      'custom-edge',
      {
        getControlPoints(cfg) {
          const controlPoints = []; // 指定controlPoints
          const level = -5; // 从 -10， 10
          const offset = level * -25; // 根据不同的level 计算不同的偏移
          const { startPoint, endPoint } = cfg;
          const innerPoint = G6.Util.getControlPoint(startPoint, endPoint, 0.5, offset);
          controlPoints.push(innerPoint);
          return controlPoints;
        },
      },
      'quadratic',
    );
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
    });
    data.edges.forEach(edge => {
      edge.type = 'custom-edge';
    })
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    const path = edge.getKeyShape().attr('path');
    console.log(path)
    expect(path[0][1]).toBe(56.871645523098664);
    expect(path[1][0]).toBe('Q');
    expect(path[1][1]).toBe(150);
    expect(path[1][2]).toBe(183.58955690387333);
    expect(graph.getNodes()[0].getModel().x).not.toBe(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toBe(undefined);
    graph.destroy();
  });
});
