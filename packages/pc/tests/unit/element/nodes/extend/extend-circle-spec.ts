import { Graph, registerNode } from '../../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node with getCustomConfig function, extend circle', () => {
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
      'circle',
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
    expect(keyShape.attr('r')).toEqual(10);
    expect(keyShape.attr('stroke')).toEqual('blue');
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('lineWidth')).toEqual(10);
    graph.destroy();
  });
  it('getCustomConfig return new icon', () => {
    registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            icon: {
              show: true,
              img: 'customsrc',
              width: 20,
              height: 20,
            },
          };
        },
      },
      'circle',
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
    expect(keyShape.attr('r')).toEqual(10);
    expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
    expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');
    expect(keyShape.attr('lineWidth')).toEqual(1);

    const icon = group.find((g) => {
      return g.get('className') === 'custom-node-icon';
    });
    expect(icon).not.toBe(undefined);
    expect(icon.attr('img')).toEqual('customsrc');
    expect(icon.attr('width')).toEqual(20);
    expect(icon.attr('height')).toEqual(20);
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
      'circle',
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
    expect(keyShape.attr('r')).toEqual(10);
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
      'circle',
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
    expect(keyShape.attr('r')).toEqual(10);
    expect(keyShape.attr('lineWidth')).toEqual(1);

    const markTop = group.find((g) => {
      return g.get('className') === 'link-point-top';
    });
    expect(markTop).not.toBe(null);
    expect(markTop.attr('r')).toEqual(10);
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
              icon: {
                show: true,
              },
            };
          },
        },
        'circle',
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
      expect(group.getCount()).toEqual(3);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('r')).toBe(15);
      expect(keyShape.attr('fill')).toBe('steelblue');
      expect(keyShape.attr('lineWidth')).toBe(5);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update icon', () => {
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              icon: {
                show: true,
                width: 20,
                height: 20,
              },
            };
          },
        },
        'circle',
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
      let group = node.get('group');

      expect(group.getCount()).toEqual(3);
      let icon = group.find((g) => {
        return g.get('className') === 'custom-node-icon';
      });
      expect(icon.attr('width')).toEqual(20);
      expect(icon.attr('x')).toEqual(-10);
      expect(icon.attr('y')).toEqual(-10);
      expect(icon.attr('img')).toEqual(
        'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
      );

      const newImg =
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mt47RKxGy8kAAAAAAAAAAABkARQnAQ';
      node.update({
        icon: {
          show: true,
          img: newImg,
          width: 50,
          height: 50,
        },
      });
      // 更新之后的名字变成了 custom-node-icon
      icon = group.find((g) => {
        return g.get('className') === 'custom-node-icon';
      });
      expect(group.getCount()).toEqual(3);
      expect(icon.attr('width')).toEqual(50);
      expect(icon.attr('x')).toEqual(-25);
      expect(icon.attr('y')).toEqual(-25);
      expect(icon.attr('img')).toEqual(newImg);

      node.update({
        icon: {
          width: 80,
        },
      });
      group = node.get('group');
      expect(group.getCount()).toEqual(3);
      expect(icon.attr('width')).toEqual(80);
      expect(icon.attr('x')).toEqual(-40);

      node.update({
        icon: {
          show: false,
        },
      });
      group = node.get('group');
      expect(group.getCount()).toEqual(2);
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
        'circle',
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
        label: 'new circle label',
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
      expect(label.attr('text')).toEqual('new circle label');
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
        'circle',
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
        label: 'new circle label',
      });
      label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new circle label');
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
      expect(label.attr('text')).toEqual('new circle label');
      expect(label.attr('fill')).toEqual('#ff0');
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label, linkPoints, icon from none', () => {
      registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              icon: {
                img:
                  'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mt47RKxGy8kAAAAAAAAAAABkARQnAQ',
              },
            };
          },
        },
        'circle',
      );
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          size: 50,
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

      graph.on('node:mouseenter', (e) => {
        const item = e.item;
        item.update({
          label: 'Circle',
          labelCfg: {
            position: 'bottom',
            offset: 10,
            style: {
              fill: '#333',
            },
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            fill: '#fff',
            size: 5,
          },
          icon: {
            show: true,
          },
        });
      });

      graph.on('node:mouseleave', (e) => {
        const item = e.item;
        item.update({
          label: ' ',
          labelCfg: {
            style: {
              fill: '#333',
            },
          },
          linkPoints: {
            top: false,
            bottom: false,
            left: false,
            right: false,
            fill: '#fff',
            size: 5,
          },
          icon: {
            show: false,
          },
        });
      });
    });
    it('update label, linkPoints, icon from none', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        // defaultNode: {
        //   size: 50
        // }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            type: 'modelRect',
            label: 'modelRect',
            description: 'description',
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      graph.on('node:mouseenter', (e) => {
        const item = e.item;
        item.update({
          descriptionCfg: {
            style: {
              fill: 'steelblue',
            },
          },
          stateIcon: {
            show: true,
          },
        });
      });

      graph.on('node:mouseleave', (e) => {
        const item = e.item;
        item.update({
          descriptionCfg: {
            style: {
              fill: '#bfbfbf',
            },
          },
          stateIcon: {
            show: false,
          },
        });
      });
    });
  });
});
