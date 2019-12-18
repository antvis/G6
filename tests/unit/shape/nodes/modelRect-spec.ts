import Graph from '../../../../src/graph/graph'
import '../../../../src/shape/node'
import '../../../../src/shape/nodes'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('model rect test', () => {
  describe('default model rect test', () => {
    it('default config', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'modelRect'
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是一段很长很长很长的描述文本',
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
      expect(group.getCount()).toEqual(6);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toEqual(185);
      expect(keyShape.attr('height')).toEqual(70);
      expect(keyShape.attr('fill')).toEqual('#ffffff');
      expect(keyShape.attr('radius')).toEqual(5);

      const preRect = group.find(g => {
        return g.get('className') === 'pre-rect';
      });
      expect(preRect).not.toBe(undefined);
      expect(preRect.attr('x')).toEqual(-92.5);
      expect(preRect.attr('y')).toEqual(-35);
      expect(preRect.attr('width')).toEqual(4);
      expect(preRect.attr('fill')).toEqual('#40a9ff');

      const logoIcon = group.find(g => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon).not.toBe(undefined);
      expect(logoIcon.attr('width')).toEqual(16);
      expect(logoIcon.attr('img')).toEqual('https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg');

      const stateIcon = group.find(g => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon).not.toBe(undefined);
      expect(stateIcon.attr('width')).toEqual(16);
      expect(stateIcon.attr('img')).toEqual('https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg');

      const label = group.find(g => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(undefined);
      expect(label.attr('fill')).toEqual('#595959');
      expect(label.attr('fontSize')).toEqual(14);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update keyShape style and not description text', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'modelRect',
          style: {
            fill: 'red'
          },
          preRect: {
            width: 6
          }
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
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
      // modelRect + label + logoIcon + stateIcon + preRect
      expect(group.getCount()).toEqual(5);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('red');

      const preRect = group.find(g => {
        return g.get('className') === 'pre-rect';
      });
      expect(preRect).not.toBe(undefined);
      expect(preRect.attr('width')).toEqual(6);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('icon and linkPoint test', () => {
    it('icon and linkPoints test', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        pixelRatio: 2,
        defaultNode: {
          shape: 'modelRect',
          logoIcon: {
            show: false
          },
          stateIcon: {
            width: 25,
            height: 25
          },
          linkPoints: {
            top: true,
            bottom: true
          }
        }
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是很长很长很长的一段长文本',
            x: 300,
            y: 100
          }
        ]
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // modelRect + label + description + stateIcon + preRect + linkPoints * 2
      expect(group.getCount()).toEqual(7);
      const logoIcon = group.find(g => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon).toBe(null);

      const stateIcon = group.find(g => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon).not.toBe(undefined);
      expect(stateIcon.attr('width')).toEqual(25);
      expect(stateIcon.attr('height')).toEqual(25);

      const markLeft = group.find(g => {
        return g.get('className') === 'rect-mark-left';
      });
      expect(markLeft).toBe(null);

      const markTop = group.find(g => {
        return g.get('className') === 'rect-mark-top';
      });
      expect(markTop).not.toBe(undefined);
      expect(markTop.attr('r')).toEqual(3);
      expect(markTop.attr('y')).toEqual(-35);

      const markBottom = group.find(g => {
        return g.get('className') === 'rect-mark-bottom';
      });
      expect(markBottom).not.toBe(undefined);
      expect(markBottom.attr('y')).toEqual(35);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
