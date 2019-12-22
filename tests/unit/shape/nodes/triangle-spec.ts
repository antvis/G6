import Graph from '../../../../src/graph/graph'
import '../../../../src/shape/node'
import '../../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('triangle test', () => {
  describe('default triangle test', () => {
    it('default config', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'triangle'
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // modelRect + label + description + logoIcon + stateIcon + preRect
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('#91d5ff');

      const label = group.find(g => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(null);
      expect(label.attr('fill')).toEqual('#595959');
      expect(label.attr('fontSize')).toEqual(12);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update keyShape style', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'triangle',
          style: {
            fill: 'red'
          }
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old label',
            x: 100,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // triangle + label
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('red');

      node.update({
        label: 'new label',
        style: {
          fill: 'blue',
          lineWidth: 2
        }
      });
      const label = node.get('group').get('children')[1];
      expect(label.attr('text')).toEqual('new label');
      expect(keyShape.attr('fill')).toEqual('blue');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('linkPoint test', () => {
    it('linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            linkPoints: {
              top: true,
              left: true
            },
            shape: 'triangle',
            x: 100,
            y: 200
          }
        ]
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);
      
      node.update({
        linkPoints: {
          top: false
        }
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);

      node.update({
        linkPoints: {
          left: false,
          right: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2
        }
      });
      const leftPoint = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).toBe(null);
      const rightPoint = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);
      expect(rightPoint.attr('r')).toBe(10);
      expect(rightPoint.attr('fill')).toBe('#f00');
      expect(rightPoint.attr('stroke')).toBe('#0f0');
      expect(rightPoint.attr('lineWidth')).toBe(2);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2
        }
      });
      const leftPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find(g => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          stroke: '#000',
        }
      });

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
