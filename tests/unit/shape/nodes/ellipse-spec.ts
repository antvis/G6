import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('ellipse test', () => {
  describe('default ellipse test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'ellipse',
      },
    };
    const graph = new Graph(cfg);
    it('default ellipse config', () => {
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
      expect(keyShape.attr('rx')).toEqual(60);
      expect(keyShape.attr('ry')).toEqual(30);
      expect(keyShape.attr('stroke')).toEqual('#5B8FF9');
      expect(keyShape.attr('fill')).toEqual('#C6E5FF');
    });

    it('ellipse with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'ellipse',
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

  describe('ellipse with icon and linkPoints', () => {
    it('ellipse with icon', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'ellipse',
          size: [50, 30],
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
            label: 'ellipse',
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
      // ellipse + icon + label
      expect(group.getCount()).toEqual(3);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('red');
      expect(keyShape.attr('stroke')).toEqual('#ccc');
      expect(keyShape.attr('rx')).toEqual(25);
      expect(keyShape.attr('ry')).toEqual(15);

      const icon = group.find((g) => {
        return g.get('className') === 'ellipse-icon';
      });
      expect(icon).not.toBe(undefined);
      expect(icon.attr('img')).toEqual(
        'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      );
      expect(icon.attr('width')).toEqual(36);
      expect(icon.attr('height')).toEqual(36);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('ellipse with linkPoints', () => {
      const cfg = {
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'ellipse',
          size: [35, 10],
          style: {
            fill: 'blue',
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
            fill: '#fff',
            size: 5,
          },
        },
      };
      const graph = new Graph(cfg);
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'ellipse',
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

      expect(group.getCount()).toEqual(6);

      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('blue');
      expect(keyShape.attr('stroke')).toEqual('#5B8FF9');
      expect(keyShape.attr('rx')).toEqual(17.5);
      expect(keyShape.attr('ry')).toEqual(5);
      expect(keyShape.attr('lineWidth')).toEqual(1);

      const markTop = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(markTop).not.toBe(null);
      expect(markTop.attr('r')).toEqual(2.5);
      expect(markTop.attr('fill')).toEqual('#fff');

      const markBottom = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(markBottom).not.toBe(null);

      let hasTrigger = false;
      expect(hasTrigger).toBe(false);
      graph.on('node:mouseenter', (evt) => {
        hasTrigger = evt.hasTrigger;
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
          type: 'ellipse',
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
            label: 'ellipse',
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
      expect(keyShape.attr('rx')).toBe(15);
      expect(keyShape.attr('ry')).toBe(15);
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
            label: 'ellipse',
            type: 'ellipse',
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
        return g.get('className') === 'ellipse-icon';
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
            label: 'old ellipse label',
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
        label: 'new ellipse label',
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
      expect(label.attr('text')).toEqual('new ellipse label');
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
      expect(label.attr('text')).toEqual('new ellipse label');
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
        label: 'new ellipse label',
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
      expect(label.attr('text')).toEqual('new ellipse label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
