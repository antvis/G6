const expect = require('chai').expect;
const G6 = require('../../../../src');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe.only('model rect test', () => {
  describe('default model rect test', () => {
    it('default config', () => {
      const graph = new G6.Graph({
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
      expect(group.getCount()).eql(6);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).eql(185);
      expect(keyShape.attr('height')).eql(70);
      expect(keyShape.attr('fill')).eql('#ffffff');
      expect(keyShape.attr('radius')).eql(5);

      const preRect = group.findByClassName('pre-rect');
      expect(preRect).not.to.be.undefined;
      expect(preRect.attr('x')).eql(-92.5);
      expect(preRect.attr('y')).eql(-35);
      expect(preRect.attr('width')).eql(4);
      expect(preRect.attr('fill')).eql('#40a9ff');

      const logoIcon = group.findByClassName('rect-logo-icon');
      expect(logoIcon).not.to.be.undefined;
      expect(logoIcon.attr('width')).eql(16);
      expect(logoIcon.attr('img')).eql('https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg');

      const stateIcon = group.findByClassName('rect-state-icon');
      expect(stateIcon).not.to.be.undefined;
      expect(stateIcon.attr('width')).eql(16);
      expect(stateIcon.attr('img')).eql('https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg');

      const label = group.findByClassName('node-label');
      expect(label).not.to.be.undefined;
      expect(label.attr('fill')).eql('#595959');
      expect(label.attr('fontSize')).eql(14);

      graph.destroy();
      expect(graph.destroyed).to.be.true;
    });
    it('update keyShape style and not description text', () => {
      const graph = new G6.Graph({
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
      expect(group.getCount()).eql(5);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).eql('red');

      const preRect = group.findByClassName('pre-rect');
      expect(preRect).not.to.be.undefined;
      expect(preRect.attr('width')).eql(6);
      graph.destroy();
      expect(graph.destroyed).to.be.true;
    });
  });

  describe('icon and linkPoint test', () => {
    it('icon and linkPoints test', () => {
      const graph = new G6.Graph({
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
      expect(group.getCount()).eql(7);
      const logoIcon = group.findByClassName('rect-logo-icon');
      expect(logoIcon).to.be.null;

      const stateIcon = group.findByClassName('rect-state-icon');
      expect(stateIcon).not.to.be.undefined;
      expect(stateIcon.attr('width')).eql(25);
      expect(stateIcon.attr('height')).eql(25);

      const markLeft = group.findByClassName('rect-mark-left');
      expect(markLeft).to.be.null;

      const markTop = group.findByClassName('rect-mark-top');
      expect(markTop).not.to.be.undefined;
      expect(markTop.attr('r')).eql(3);
      expect(markTop.attr('y')).eql(-35);

      const markBottom = group.findByClassName('rect-mark-bottom');
      expect(markBottom).not.to.be.undefined;
      expect(markBottom.attr('y')).eql(35);
      graph.destroy();
      expect(graph.destroyed).to.be.true;
    });
  });
});
