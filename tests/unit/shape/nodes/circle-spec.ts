import Graph from '../../../../src/graph/graph'
import '../../../../src/shape/node'
import '../../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('circle test', () => {
  describe('default circle test', () => {
    const cfg = {
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      defaultNode: {
        shape: 'circle'
      }
    };
    const graph = new Graph(cfg);
    it('default circle config', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            x: 100,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('r')).toEqual(30);
      expect(keyShape.attr('stroke')).toEqual('#91d5ff');
      expect(keyShape.attr('fill')).toEqual('#91d5ff');
    });

    it('circle with label', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
            x: 200,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      expect(nodes.length).toEqual(1);
      const node = nodes[0];
      const group = node.get('group');
      expect(group.getCount()).toEqual(2);

      const label = group.find(g => {
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

  describe('circle with icon and linkPoints', () => {
    it('circle with icon', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'circle',
          size: 50,
          style: {
            fill: 'red',
            stroke: '#ccc'
          },
          icon: {
            show: true
          }
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
            x: 200,
            y: 100
          }
        ]
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

      const icon = group.find(g => {
        return g.get('className') === 'circle-icon';
      });
      expect(icon).not.toBe(undefined);
      expect(icon.attr('img')).toEqual('https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg');
      expect(icon.attr('width')).toEqual(16);
      expect(icon.attr('height')).toEqual(16);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('circle with linkPoints', () => {
      const cfg = {
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'circle',
          size: 35,
          style: {
            fill: 'blue'
          },
          linkPoints: {
            top: true,
            bottom: true,
            fill: '#fff',
            size: 5
          }
        }
      };
      const graph = new Graph(cfg);
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'circle',
            x: 200,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');

      expect(group.getCount()).toEqual(4);

      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('blue');
      expect(keyShape.attr('stroke')).toEqual('#91d5ff');
      expect(keyShape.attr('r')).toEqual(17.5);
      expect(keyShape.attr('lineWidth')).toEqual(1);

      const markTop = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(markTop).not.toBe(null);
      expect(markTop.attr('r')).toEqual(5);
      expect(markTop.attr('fill')).toEqual('#fff');

      const markBottom = group.find(g => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(markBottom).not.toBe(null);

      let hasTrigger = false;
      expect(hasTrigger).toBe(false);
      graph.on('node:mouseenter', evt => {
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
});
