/**
 * @fileOverview Shape 工厂方法的测试
 * @author dxq613@gmai.com
 */

import G6 from '../../../src';

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
  it('shape test wihout extended shape and draw function', () => {
    G6.registerNode('custom-node', {
      drawShape(cfg, group) {
        const keyShape = group.addShape('circle', {
          attrs: {
            x: 0,
            y: 0,
            r: 30,
            fill: '#87e8de',
          },
        });

        return keyShape;
      },
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'custom-node',
      },
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toBe(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('register node wihout draw and drawShape, extend circle', () => {
    G6.registerNode(
      'custom-node',
      {
        setState(name, value, item) {
          const group = item.getContainer();
          const shape = group.get('children')[0]; // 顺序根据 draw 时确定
          if (name === 'active') {
            if (value) {
              shape.attr('stroke', 'red');
            } else {
              shape.attr('stroke', '#333');
            }
          }
        },
      },
      'circle',
    );
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'custom-node',
      },
    });
    graph.data(data);
    graph.render();
    graph.on('node:click', evt => {
      const { item } = evt;
      graph.setItemState(item, 'active', true);
    });
    graph.on('canvas:click', evt => {
      graph.getNodes().forEach(node => {
        graph.setItemState(node, 'active', false);
      });
    });
    expect(graph.getNodes()[0].getModel().x).not.toBe(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toBe(undefined);
    graph.destroy();
  });
  it('register edge wihout draw and drawShape function, extend quadratic', () => {
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
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        type: 'custom-edge',
      },
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toBe(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toBe(undefined);
  });
});
