import G6 from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node with getCustomConfig function, extend triangle', () => {
  it('getCustomConfig return new style', () => {
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
    G6.registerNode(
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
      'triangle',
    );
    const graph = new G6.Graph({
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
    // modelRect + label + description + logoIcon + stateIcon + preRect
    expect(group.getCount()).toEqual(2);
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('stroke')).toEqual('blue');
    expect(keyShape.attr('lineWidth')).toEqual(10);

    const label = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(label).not.toBe(null);
    expect(label.attr('fill')).toEqual('#595959');
    expect(label.attr('fontSize')).toEqual(12);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });
  it('getCustomConfig return new labelCfg style', () => {
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
    G6.registerNode(
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
      'triangle',
    );
    const graph = new G6.Graph({
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
    expect(keyShape.attr('stroke')).toEqual('#5B8FF9');
    expect(keyShape.attr('fill')).toEqual('#C6E5FF');
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
  it('getCustomConfig return new icon', () => {
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
    G6.registerNode(
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
      'triangle',
    );
    const graph = new G6.Graph({
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
    expect(keyShape.attr('stroke')).toEqual('#5B8FF9');
    expect(keyShape.attr('fill')).toEqual('#C6E5FF');
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
  it('update keyShape style', () => {
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
    G6.registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            style: {
              fill: 'red',
            },
          };
        },
      },
      'triangle',
    );
    const graph = new G6.Graph({
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
  describe('linkPoint test', () => {
    it('draw linkPoints with up direction', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              linkPoints: {
                top: true,
                left: true,
                right: true,
              },
            };
          },
        },
        'triangle',
      );
      const graph = new G6.Graph({
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
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with down direction', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              direction: 'down',
              linkPoints: {
                bottom: true,
                left: true,
                right: true,
              },
            };
          },
        },
        'triangle',
      );
      const graph = new G6.Graph({
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
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with left direction', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              direction: 'left',
              linkPoints: {
                bottom: true,
                left: true,
                top: true,
              },
            };
          },
        },
        'triangle',
      );
      const graph = new G6.Graph({
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
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('draw linkPoints with right direction', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'triangle',
            x: 100,
            y: 200,
          },
        ],
      };
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              direction: 'right',
              linkPoints: {
                bottom: true,
                right: true,
                top: true,
              },
            };
          },
        },
        'triangle',
      );
      const graph = new G6.Graph({
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
      // triangle + label + linkPoints * 3
      expect(group.getCount()).toEqual(5);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });

    it('linkPoints update from show to hide', () => {
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              linkPoints: {
                top: true,
                left: true,
                fill: 'red',
                stroke: 'green',
              },
            };
          },
        },
        'triangle',
      );
      const graph = new G6.Graph({
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
            label: 'triangle',
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
      expect(rightPoint.attr('fill')).toBe('red');
      expect(rightPoint.attr('stroke')).toBe('green');
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
});
