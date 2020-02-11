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
        y: 50
      },
      {
        id: 'node2' ,
        x: 250,
        y: 50
      },
    ],
    edges: [{
      source: 'node1',
      target: 'node2'
    }]
  }
  it('shape test wihout extended shape and draw function', () => {
    G6.registerNode('custom-node', {
      drawShape(cfg, group) {
        const keyShape = group.addShape('circle', {
        attrs: {
            x: 0,
            y: 0,
            r: 30,
            fill: '#87e8de'
        }
        });
        const circle = group.addShape('circle', {
        attrs: {
            x: 0,
            y: 0,
            r: 10,
            fill: '#ff0000'
        },
        className: 'test-circle'
        });

        return keyShape;
      },
      afterDraw(cfg, group) {
        const foundShape = group.findByClassName('test-circle');
        expect(foundShape.attr('r')).toBe(10);
        expect(foundShape.attr('fill')).toBe('#ff0000');
      }
    }, 'single-node');
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'custom-node'
      }
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.toBe(undefined);
    expect(graph.getNodes()[0].getModel().y).not.toBe(undefined);
    graph.destroy();
  });
});
