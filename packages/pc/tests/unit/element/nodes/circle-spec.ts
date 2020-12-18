import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('circle test', () => {
  describe('default circle test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'circle',
      },
    };
    const graph = new Graph(cfg);
    it('default circle config', () => {
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
      expect(keyShape.attr('r')).toEqual(10);
      expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
      expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');
    });

    it('circle with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
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
      expect(label.attr('fill')).toEqual('#000');
      const type = label.get('type');
      expect(type).toEqual('text');
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('circle with icon and linkPoints', () => {
    it('circle with icon', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'circle',
          size: 50,
          style: {
            fill: 'red',
            stroke: '#ccc',
          },
          icon: {
            show: true,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
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
      // circle + icon + label
      expect(group.getCount()).toEqual(3);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('red');
      expect(keyShape.attr('stroke')).toEqual('#ccc');
      expect(keyShape.attr('r')).toEqual(25);

      const icon = group.find((g) => {
        return g.get('className') === 'circle-icon';
      });
      expect(icon).not.toBe(undefined);
      expect(icon.attr('img')).toEqual(
        'https://gw.alipayobjects.com/zos/bmw-prod/5d015065-8505-4e7a-baec-976f81e3c41d.svg',
      );
      expect(icon.attr('width')).toEqual(20);
      expect(icon.attr('height')).toEqual(20);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('circle with linkPoints', () => {
      const cfg = {
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'circle',
          size: 35,
          style: {
            fill: 'blue',
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            fill: '#fff',
            size: 10,
          },
        },
      };
      const graph = new Graph(cfg);
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
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

      expect(group.getCount()).toEqual(5);

      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('blue');
      expect(keyShape.attr('stroke')).toEqual('rgb(95, 149, 255)');
      expect(keyShape.attr('r')).toEqual(17.5);
      expect(keyShape.attr('lineWidth')).toEqual(1);

      const markTop = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(markTop).not.toBe(null);
      expect(markTop.attr('r')).toEqual(5);
      expect(markTop.attr('fill')).toEqual('#fff');

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
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('update', () => {
    it('update styles', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'circle',
          size: 50,
          style: {
            fill: 'red',
            stroke: '#ccc',
            lineWidth: 5,
          },
          icon: {
            show: true,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
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
            x: 200,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
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
      let group = node.get('group');
      expect(group.getCount()).toEqual(3);
      const icon = group.find((g) => {
        return g.get('className') === 'circle-icon';
      });
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
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old circle label',
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
        label: '',
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
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
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
      node.update({
        label: 'new circle label',
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
      expect(label.attr('text')).toEqual('new circle label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label, linkPoints, icon from none', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          size: 50,
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
