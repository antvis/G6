import { Graph, registerNode } from '../../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node with getCustomConfig function, extend rect', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
        x: 50,
        y: 50,
      },
      {
        id: 'node2',
        label: 'node2',
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
  it('getCustomConfig return new style', () => {
    registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            style: {
              fill: 'red',
              stroke: 'blue',
              lineWidth: 10,
            },
          };
        },
      },
      'rect',
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
    const node = graph.getNodes()[0];
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('blue');
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('lineWidth')).toEqual(10);
    graph.destroy();
  });
  it('getCustomConfig return new labelCfg style', () => {
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
      'rect',
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
    const node = graph.getNodes()[0];
    const group = node.get('group');
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
    expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');
    expect(keyShape.attr('lineWidth')).toEqual(1);

    const label = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(label).not.toBe(undefined);
    expect(label.attr('fill')).toEqual('red');
    const type = label.get('type');
    expect(type).toEqual('text');
    graph.destroy();
  });
  it('getCustomConfig return new linkPoints', () => {
    registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            linkPoints: {
              top: true,
              bottom: true,
              left: true,
              fill: 'red',
              size: 20,
            },
          };
        },
      },
      'simplerect',
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

    expect(group.getCount()).toEqual(5);

    const keyShape = node.getKeyShape();
    expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');
    expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
    expect(keyShape.attr('lineWidth')).toEqual(1);

    const markTop = group.find((g) => {
      return g.get('className') === 'link-point-top';
    });
    expect(markTop).not.toBe(null);
    expect(markTop.attr('fill')).toEqual('red');

    const markBottom = group.find((g) => {
      return g.get('className') === 'link-point-bottom';
    });
    expect(markBottom).not.toBe(null);

    let hasTrigger = false;
    expect(hasTrigger).toBe(false);
    graph.on('node:mouseenter', (evt) => {
      hasTrigger = (evt as any).hasTrigger;
      graph.setItemState(evt.item, 'hover', true);
    });
    graph.emit('node:mouseenter', { hasTrigger: true, item: node });

    expect(hasTrigger).toBe(true);
    expect(keyShape.attr('lineWidth')).toEqual(1);

    graph.destroy();
  });
  describe('update', () => {
    it('update styles', () => {
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              size: 50,
              style: {
                fill: 'red',
                stroke: '#ccc',
                lineWidth: 5,
              },
            };
          },
        },
        'rect',
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
      node.update({
        size: 30,
        color: 'black',
        style: {
          fill: 'steelblue',
        },
      });
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toBe('steelblue');
      expect(keyShape.attr('lineWidth')).toBe(5);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label', () => {
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
        'rect',
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
      expect(label.attr('text')).toEqual('node1');
      expect(label.attr('fill')).toEqual('red');

      node.update({
        label: '',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });

      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('');
      expect(label.attr('fill')).toEqual('#ff0');

      node.update({
        label: 'new rect label',
      });
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
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');
      expect(label.attr('stroke')).toEqual('black');
      expect(label.attr('lineWidth')).toEqual(3);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label from none', () => {
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
        'rect',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
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
      let label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).toEqual(null);

      node.update({
        label: 'new rect label',
      });
      label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('red');

      node.update({
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });
      label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
