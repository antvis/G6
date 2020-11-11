import G6 from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('register node with getCustomConfig function, extend star', () => {
  const data = {
    nodes: [
      {
        id: 'node',
        label: 'star',
        x: 100,
        y: 100,
      },
    ],
  };
  it('getCustomConfig return new style', () => {
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
      'star',
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
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('stroke')).toEqual('blue');
    expect(keyShape.attr('fill')).toEqual('red');
    expect(keyShape.attr('lineWidth')).toEqual(10);
    graph.destroy();
  });
  it('getCustomConfig return new linkPoints', () => {
    G6.registerNode(
      'custom-node',
      {
        getCustomConfig() {
          return {
            linkPoints: {
              right: true,
              leftBottom: true,
              rightBottom: true,
              fill: 'red',
              size: 20,
            },
          };
        },
      },
      'star',
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
    // star + label
    expect(group.getCount()).toEqual(5);
    const keyShape = node.getKeyShape();
    expect(keyShape.attr('fill')).toEqual('rgb(239, 244, 255)');

    const leftbottom = group.find((g) => {
      return g.get('className') === 'link-point-left-bottom';
    });
    expect(leftbottom).not.toBe(null);
    expect(leftbottom.attr('fill')).toEqual('red');

    const rightbottom = group.find((g) => {
      return g.get('className') === 'link-point-right-bottom';
    });
    expect(rightbottom).not.toBe(null);
    expect(rightbottom.attr('fill')).toEqual('red');

    const right = group.find((g) => {
      return g.get('className') === 'link-point-right';
    });
    expect(right).not.toBe(null);
    expect(right.attr('fill')).toEqual('red');

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });
  describe('linkPoint test', () => {
    it('linkPoints update from show to hide', () => {
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {
              linkPoints: {
                top: true,
                left: true,
              },
            };
          },
        },
        'star',
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
            label: 'star',
            x: 100,
            y: 200,
          },
        ],
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
          leftBottom: true,
        },
      });
      const topPoint = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find((g) => {
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
      const bottomPoint2 = group.find((g) => {
        return g.get('className') === 'link-point-left-bottom';
      });
      expect(bottomPoint2).not.toBe(null);

      node.update({
        linkPoints: {
          left: false,
          top: true,
          size: 20,
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
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint3 = group.find((g) => {
        return g.get('className') === 'link-point-left-bottom';
      });
      expect(bottomPoint3.attr('r')).toBe(10);
      expect(bottomPoint3.attr('fill')).toBe('#f00');
      expect(bottomPoint3.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
  describe('update', () => {
    it('update styles', () => {
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {};
          },
        },
        'star',
      );
      const graph = new G6.Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'custom-node',
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
            label: 'star',
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
      const data = {
        nodes: [
          {
            id: 'node',
            label: 'old star label',
            x: 200,
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
        'star',
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
      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('old star label');
      expect(label.attr('fill')).toEqual('red');

      node.update({
        label: 'new star label',
        labelCfg: {
          style: {
            fill: '#ff0',
          },
        },
      });
      expect(label).not.toEqual(null);
      expect(label.attr('text')).toEqual('new star label');
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
      expect(label.attr('text')).toEqual('new star label');
      expect(label.attr('fill')).toEqual('#ff0');
      expect(label.attr('stroke')).toEqual('black');
      expect(label.attr('lineWidth')).toEqual(3);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update label from none', () => {
      const data = {
        nodes: [
          {
            id: 'node',
            x: 200,
            y: 100,
          },
        ],
      };
      G6.registerNode(
        'custom-node',
        {
          getCustomConfig() {
            return {};
          },
        },
        'star',
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
      node.update({
        label: 'new star label',
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
      expect(label.attr('text')).toEqual('new star label');
      expect(label.attr('fill')).toEqual('#ff0');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('update icon', () => {
      const newImg =
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*mt47RKxGy8kAAAAAAAAAAABkARQnAQ';
      const data = {
        nodes: [
          {
            id: 'node',
            x: 200,
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
                img: 'old-img',
              },
            };
          },
        },
        'star',
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
      let icon = group.find((g) => {
        return g.get('className') === 'custom-node-icon';
      });
      expect(icon).toEqual(null);

      node.update({
        icon: {
          show: true,
          width: 50,
          height: 50,
          img: newImg,
        },
      });
      expect(group.getCount()).toEqual(2);
      icon = group.find((g) => {
        return g.get('className') === 'custom-node-icon';
      });
      expect(icon).not.toEqual(null);
      expect(icon.attr('width')).toEqual(50);
      expect(icon.attr('img')).toEqual(newImg);
      expect(icon.attr('x')).toEqual(-25);
      expect(icon.attr('y')).toEqual(-25);

      node.update({
        icon: {
          width: 80,
          height: 80,
        },
      });
      expect(icon.attr('width')).toEqual(80);
      expect(icon.attr('x')).toEqual(-40);
      expect(icon.attr('y')).toEqual(-40);

      node.update({
        icon: {
          show: false,
        },
      });
      expect(group.getCount()).toEqual(1);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
