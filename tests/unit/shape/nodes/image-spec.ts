import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';
import '../../../../src/shape/edge';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('image test', () => {
  describe('default image test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'image',
      },
    };
    const graph = new Graph(cfg);
    it('default image config', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            x: 100,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toEqual(200);
      expect(keyShape.attr('img')).toEqual(
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
      );
    });

    it('image with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(undefined);
      expect(label.attr('fill')).toEqual('#595959');
      const type = label.get('type');
      expect(type).toEqual('text');
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('clip', () => {
    it('default clip', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
          style: {
            shadowColor: '#ccc',
            shadowBlur: 10,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('r')).toEqual(50);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('circle clip and update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
              type: 'circle',
              r: 10,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('r')).toEqual(10);

      // node.update({
      //   clipCfg: {
      //     r: 50,
      //     x: -100
      //   }
      // })
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('rect clip and update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
              type: 'rect',
              width: 100,
              height: 50,
              x: -50,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('width')).toEqual(100);
      expect(nodeShape.get('clipShape').attr('height')).toEqual(50);
      expect(nodeShape.get('clipShape').attr('x')).toEqual(-100);

      // node.update({
      //   clipCfg: {
      //   }
      // })
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('ellipse clip and update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
              type: 'ellipse',
              rx: 100,
              ry: 50,
              x: -50,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('rx')).toEqual(100);
      expect(nodeShape.get('clipShape').attr('ry')).toEqual(50);
      expect(nodeShape.get('clipShape').attr('x')).toEqual(-50);

      // node.update({
      //   clipCfg: {
      //   }
      // })
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('polygon clip and update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
              type: 'polygon',
              points: [
                [10, 20],
                [15, 15],
                [30, 12],
                [40, 50],
                [10, 20],
              ],
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('points')).toEqual([
        [10, 20],
        [15, 15],
        [30, 12],
        [40, 50],
        [10, 20],
      ]);

      // node.update({
      //   clipCfg: {
      //   }
      // })
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('path clip and update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
        },
      });
      const clipPath = [['M', 0, 0], ['L', -75, 200], ['L', 75, 200], ['Z']];
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
            clipCfg: {
              show: true,
              type: 'path',
              path: clipPath,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('path')).toEqual(clipPath);

      // node.update({
      //   clipCfg: {
      //   }
      // })
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('update', () => {
    it('update style', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'image',
          size: 150,
          style: {
            shadowColor: '#ccc',
            shadowBlur: 10,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'image',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      node.update({
        size: 30,
        style: {
          shadowColor: '#f00',
        },
      });
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toBe(30);
      expect(keyShape.attr('height')).toBe(30);
      expect(keyShape.attr('shadowColor')).toBe('#f00');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old image label',
            type: 'image',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      node.update({
        label: 'new image label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('fill')).toEqual('#ff0');

      // test if it will keep the current fill without setting
      node.update({
        labelCfg: {
          position: 'center',
          style: {
            stroke: 'black',
            lineWidth: 3,
          },
        },
      });
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('lineWidth')).toEqual(3);
      expect(label.attr('stroke')).toEqual('black');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label from none', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            type: 'image',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      node.update({
        label: 'new image label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new image label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
