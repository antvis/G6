import Graph from '../../../../src/graph/graph'
import '../../../../src/shape/node'
import '../../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('star test', () => {
  describe('default star test', () => {
    it('default config', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'star'
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'star',
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
      // star + label
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
          shape: 'star',
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
      // star + label
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
            label: 'star',
            linkPoints: {
              top: true,
              left: true
            },
            shape: 'star',
            x: 100,
            y: 200
          }
        ]
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // star + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);
      
      node.update({
        linkPoints: {
          top: false,
          leftBottom: true
        }
      });
      const topPoint = group.find(g => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find(g => {
        return g.get('className') === 'link-point-left-bottom';
      });
      expect(bottomPoint).not.toBe(null);

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
      const bottomPoint2 = group.find(g => {
        return g.get('className') === 'link-point-left-bottom';
      });
      expect(bottomPoint2).not.toBe(null);

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
      const bottomPoint3 = group.find(g => {
        return g.get('className') === 'link-point-left-bottom';
      });
      expect(bottomPoint3.attr('r')).toBe(10);
      expect(bottomPoint3.attr('fill')).toBe('#f00');
      expect(bottomPoint3.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
