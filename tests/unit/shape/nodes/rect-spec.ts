import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('rect test', () => {
  describe('default rect test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'rect',
      },
    };
    const graph = new Graph(cfg);
    it('default rect config', () => {
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
      expect(keyShape.attr('width')).toEqual(100);
      expect(keyShape.attr('stroke')).toEqual('#5B8FF9');
      expect(keyShape.attr('fill')).toEqual('#C6E5FF');
    });

    it('rect with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'rect',
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

  describe('rect with linkPoints', () => {
    it('rect with linkPoints', () => {
      const cfg = {
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'rect',
          size: 35,
          style: {
            fill: 'blue',
          },
          linkPoints: {
            top: true,
            bottom: true,
            left: true,
            right: true,
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
            label: 'rect',
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
      expect(keyShape.attr('width')).toEqual(35);
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
          type: 'rect',
          size: 50,
          style: {
            fill: 'red',
            stroke: '#ccc',
            lineWidth: 5,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'rect',
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
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toBe(30);
      expect(keyShape.attr('height')).toBe(30);
      expect(keyShape.attr('fill')).toBe('steelblue');
      expect(keyShape.attr('lineWidth')).toBe(5);

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
            label: 'old rect label',
            type: 'rect',
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
        label: 'new rect label',
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
      expect(label.attr('text')).toEqual('new rect label');
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
      expect(label.attr('text')).toEqual('new rect label');
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
            type: 'rect',
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
        label: 'new rect label',
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
      expect(label.attr('text')).toEqual('new rect label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
