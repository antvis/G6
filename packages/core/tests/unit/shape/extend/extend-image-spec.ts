import Graph from '../../implement-graph';
import { registerNode } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node with getCustomConfig function, extend image', () => {
  it('getCustomConfig return new size', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
        },
      ],
    };
    registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            size: 300,
          };
        },
      },
      'image',
    );
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
    const nodes = graph.getNodes();
    expect(nodes.length).toEqual(1);
    const node = nodes[0];
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('width')).toEqual(300);
    expect(keyShape.attr('img')).toEqual(
      'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eD7nT6tmYgAAAAAAAAAAAABkARQnAQ',
    );
    graph.destroy();
  });
  it('getCustomConfig return new labelCfg style', () => {
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
    registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            labelCfg: {
              style: {
                fill: 'red',
              },
            },
          };
        },
      },
      'image',
    );
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
    const nodes = graph.getNodes();
    expect(nodes.length).toEqual(1);
    const node = nodes[0];
    const group = node.get('group');
    expect(group.getCount()).toEqual(2);

    const label = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(label).not.toBe(undefined);
    expect(label.attr('fill')).toEqual('red');
    const type = label.get('type');
    expect(type).toEqual('text');
    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  describe('clip', () => {
    it('default clip', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              size: 150,
              clipCfg: {
                show: true,
              },
              style: {
                shadowColor: '#ccc',
                shadowBlur: 10,
              },
            };
          },
        },
        'image',
      );
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

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('r')).toEqual(50);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('circle clip and update', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              clipCfg: {
                show: true,
                type: 'circle',
                r: 10,
              },
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          size: 150,
        },
      });
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('r')).toEqual(10);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('rect clip and update', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              clipCfg: {
                show: true,
                type: 'rect',
                width: 100,
                height: 50,
                x: -50,
              },
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          size: 150,
        },
      });
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('width')).toEqual(100);
      expect(nodeShape.get('clipShape').attr('height')).toEqual(50);
      expect(nodeShape.get('clipShape').attr('x')).toEqual(-100);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('ellipse clip and update', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              clipCfg: {
                show: true,
                type: 'ellipse',
                rx: 100,
                ry: 50,
                x: -50,
              },
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          size: 150,
        },
      });
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('rx')).toEqual(100);
      expect(nodeShape.get('clipShape').attr('ry')).toEqual(50);
      expect(nodeShape.get('clipShape').attr('x')).toEqual(-50);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('polygon clip and update', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
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
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          size: 150,
        },
      });
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

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('path clip and update', () => {
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
      const clipPath = [['M', 0, 0], ['L', -75, 200], ['L', 75, 200], ['Z']];
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              clipCfg: {
                show: true,
                type: 'path',
                path: clipPath,
              },
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
          size: 150,
        },
      });
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const nodeShape = node.get('group').get('children')[0];
      expect(nodeShape.get('clipShape').attr('path')).toEqual(clipPath);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('update', () => {
    it('update style', () => {
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
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              size: 150,
              style: {
                shadowColor: '#ccc',
                shadowBlur: 10,
              },
            };
          },
        },
        'image',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',

          style: {
            shadowColor: '#ccc',
            shadowBlur: 10,
          },
        },
      });

      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toBe(150);
      expect(keyShape.attr('height')).toBe(150);
      expect(keyShape.attr('shadowColor')).toBe('#ccc');

      node.update({
        size: 30,
        style: {
          shadowColor: '#f00',
        },
      });
      expect(keyShape.attr('width')).toBe(30);
      expect(keyShape.attr('height')).toBe(30);
      expect(keyShape.attr('shadowColor')).toBe('#f00');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old image label',
            x: 200,
            y: 100,
          },
        ],
      };
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              labelCfg: {
                style: {
                  fill: 'red',
                },
              },
            };
          },
        },
        'image',
      );
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

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('old image label');
      expect(label.attr('fill')).toEqual('red');

      node.update({
        label: 'new image label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
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
      const data = {
        nodes: [
          {
            id: 'node',
            x: 200,
            y: 100,
          },
        ],
      };
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              labelCfg: {
                style: {
                  fill: 'red',
                },
              },
            };
          },
        },
        'image',
      );
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
