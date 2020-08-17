import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('triangle test', () => {
  describe('default triangle test', () => {
    it('default config', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'triangle',
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // modelRect + label + description + logoIcon + stateIcon + preRect
      expect(group.getCount()).toEqual(2);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('#C6E5FF');

      const label = group.find((g) => {
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
        defaultNode: {
          type: 'triangle',
          style: {
            fill: 'red',
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old label',
            x: 100,
            y: 100,
          },
        ],
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
          lineWidth: 2,
        },
      });
      const label = node.get('group').get('children')[1];
      expect(label.attr('text')).toEqual('new label');
      expect(keyShape.attr('fill')).toEqual('blue');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('linkPoint test', () => {
    it('draw linkPoints with up direction', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            linkPoints: {
              top: true,
              left: true,
              right: true,
            },
            type: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with down direction', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            direction: 'down',
            linkPoints: {
              bottom: true,
              left: true,
              right: true,
            },
            type: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with left direction', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            direction: 'left',
            linkPoints: {
              bottom: true,
              left: true,
              top: true,
            },
            type: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with right direction', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            direction: 'right',
            linkPoints: {
              bottom: true,
              right: true,
              top: true,
            },
            type: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('linkPoints update from show to hide', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            linkPoints: {
              top: true,
              left: true,
            },
            type: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // triangle + label + linkPoints * 2
      expect(group.getCount()).toEqual(4);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);

      node.update({
        direction: 'down',
        linkPoints: {
          left: false,
          right: true,
          bottom: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint = group.find((g) => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint).toBe(null);
      const rightPoint = group.find((g) => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);
      expect(rightPoint.attr('r')).toBe(5);
      expect(rightPoint.attr('fill')).toBe('#f00');
      expect(rightPoint.attr('stroke')).toBe('#0f0');
      expect(rightPoint.attr('lineWidth')).toBe(2);
      const bottomPoint = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        direction: 'left',
        linkPoints: {
          left: false,
          top: true,
          size: 10,
          fill: '#f00',
          stroke: '#0f0',
          lineWidth: 2,
        },
      });
      const leftPoint2 = group.find((g) => {
        return g.get('className') === 'link-point-left';
      });
      expect(leftPoint2).toBe(null);
      const topPoint2 = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint2).not.toBe(null);
      const rightPoint2 = group.find((g) => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint2).not.toBe(null);

      node.update({
        direction: 'right',
        linkPoints: {
          stroke: '#000',
        },
      });

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
          type: 'triangle',
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
            label: 'triangle',
            x: 200,
            y: 100,
            color: '#00f',
            style: {
              lineWidth: 3,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      node.update({
        color: '#0ff',
        style: {
          fill: 'black',
        },
      });
      const group = node.get('group');
      expect(group.getCount()).toEqual(3);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('stroke')).toBe('#0ff');
      expect(keyShape.attr('fill')).toBe('black');
      // expect the un-reset attribute to be kept as previous
      expect(keyShape.attr('lineWidth')).toBe(3);

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
            type: 'triangle',
            id: 'node',
            label: 'old triangle label',
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
        label: 'new triangle label',
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
      expect(label.attr('text')).toEqual('new triangle label');
      expect(label.attr('fill')).toEqual('#ff0');

      node.update({
        labelCfg: {
          position: 'center',
          style: {
            stroke: 'black',
            lineWidth: 3,
          },
        },
      });
      expect(label.attr('text')).toEqual('new triangle label');
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
            type: 'triangle',
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
        label: 'triangle label',
      });

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('triangle label');

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
            type: 'triangle',
            label: 'triangle',
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
        return g.get('className') === 'triangle-icon';
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
  });
});
