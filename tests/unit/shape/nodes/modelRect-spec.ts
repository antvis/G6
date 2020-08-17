import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('model rect test', () => {
  describe('default model rect test', () => {
    it('default config', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'modelRect',
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是一段很长很长很长的描述文本',
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
      expect(group.getCount()).toEqual(6);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('width')).toEqual(185);
      expect(keyShape.attr('height')).toEqual(70);
      expect(keyShape.attr('fill')).toEqual('#ffffff');
      expect(keyShape.attr('radius')).toEqual(5);

      const preRect = group.find((g) => {
        return g.get('className') === 'pre-rect';
      });
      expect(preRect).not.toBe(null);
      expect(preRect.attr('x')).toEqual(-92.5);
      expect(preRect.attr('y')).toEqual(-35);
      expect(preRect.attr('width')).toEqual(4);
      expect(preRect.attr('fill')).toEqual('#40a9ff');

      const logoIcon = group.find((g) => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon).not.toBe(null);
      expect(logoIcon.attr('width')).toEqual(16);
      expect(logoIcon.attr('img')).toEqual(
        'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
      );

      const stateIcon = group.find((g) => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon).not.toBe(null);
      expect(stateIcon.attr('width')).toEqual(16);
      expect(stateIcon.attr('img')).toEqual(
        'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
      );

      const label = group.find((g) => {
        return g.get('className') === 'node-label';
      });
      expect(label).not.toBe(null);
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
        defaultNode: {
          type: 'modelRect',
          style: {
            fill: 'red',
          },
          preRect: {
            width: 6,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
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
      // modelRect + label + logoIcon + stateIcon + preRect
      expect(group.getCount()).toEqual(5);
      const keyShape = node.getKeyShape();
      expect(keyShape.attr('fill')).toEqual('red');

      const preRect = group.find((g) => {
        return g.get('className') === 'pre-rect';
      });
      expect(preRect).not.toBe(null);
      expect(preRect.attr('width')).toEqual(6);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  it('update label and description from none to show', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'modelRect',
      },
    });
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

    const item = graph.getNodes()[0];
    const group = item.get('group');
    expect(group.getCount()).toEqual(4);
    const descriptionPaddingTop = 5;

    const labelShapeBeforeUpdated = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(labelShapeBeforeUpdated).toBe(null);
    const descriptionShapeBeforeUpdated = group.find((g) => {
      return g.get('className') === 'rect-description';
    });
    expect(descriptionShapeBeforeUpdated).toBe(null);

    item.update({
      label: '主题是modelRect',
      labelCfg: {
        style: {
          fill: '#0f0',
        },
      },
      description: '这里是一段很长很长很长的描述文本',
      descriptionCfg: {
        style: {
          fill: '#f00',
          fontSize: 20,
        },
        paddingTop: descriptionPaddingTop,
      },
    });

    // // modelRect + label + description + logoIcon + stateIcon + preRect
    expect(group.getCount()).toEqual(6);

    const labelShape = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(labelShape).not.toBe(null);
    expect(labelShape.attr('fill')).toEqual('#0f0');
    expect(labelShape.attr('fontSize')).toEqual(14);
    expect(labelShape.attr('x')).toEqual(-46.5);
    expect(labelShape.attr('y')).toEqual(-5);

    const descriptionShape = group.find((g) => {
      return g.get('className') === 'rect-description';
    });
    expect(descriptionShape).not.toBe(null);
    expect(descriptionShape.attr('fill')).toEqual('#f00');
    expect(descriptionShape.attr('fontSize')).toEqual(20);
    expect(descriptionShape.attr('x')).toEqual(-46.5);
    expect(descriptionShape.attr('y')).toEqual(17 + descriptionPaddingTop);

    const logoIcon = group.find((g) => {
      return g.get('className') === 'rect-logo-icon';
    });
    expect(logoIcon).not.toBe(null);
    expect(logoIcon.attr('width')).toEqual(16);
    expect(logoIcon.attr('img')).toEqual(
      'https://gw.alipayobjects.com/zos/basement_prod/4f81893c-1806-4de4-aff3-9a6b266bc8a2.svg',
    );

    const stateIcon = group.find((g) => {
      return g.get('className') === 'rect-state-icon';
    });
    expect(stateIcon).not.toBe(null);
    expect(stateIcon.attr('width')).toEqual(16);
    expect(stateIcon.attr('img')).toEqual(
      'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
    );

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('update label, description, and logoIcon', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'modelRect',
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          label: 'old label',
          description: 'old description',
          x: 100,
          y: 100,
        },
      ],
    };
    graph.data(data);
    graph.render();

    const item = graph.getNodes()[0];
    const group = item.get('group');
    expect(group.getCount()).toEqual(6);

    const labelShapeBeforeUpdated = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(labelShapeBeforeUpdated).not.toBe(null);
    expect(labelShapeBeforeUpdated.attr('text')).toBe('old label');
    const descriptionShapeBeforeUpdated = group.find((g) => {
      return g.get('className') === 'rect-description';
    });
    expect(descriptionShapeBeforeUpdated).not.toBe(null);
    expect(descriptionShapeBeforeUpdated.attr('text')).toBe('old description');

    item.update({
      label: 'new label',
      labelCfg: {
        style: {
          fill: '#0f0',
        },
      },
      description: 'new description',
      descriptionCfg: {
        style: {
          fill: '#f00',
        },
      },
      logoIcon: {
        show: false,
      },
    });

    // modelRect + label + description + logoIcon + stateIcon + preRect
    expect(group.getCount()).toEqual(5);

    const labelShape = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    expect(labelShape).not.toBe(null);
    expect(labelShape.attr('fill')).toEqual('#0f0');
    expect(labelShape.attr('text')).toEqual('new label');
    expect(labelShape.attr('fontSize')).toEqual(14);
    expect(labelShape.attr('x')).toEqual(-62.5);
    expect(labelShape.attr('y')).toEqual(-5);

    const descriptionShape = group.find((g) => {
      return g.get('className') === 'rect-description';
    });
    expect(descriptionShape).not.toBe(null);
    expect(descriptionShape.attr('fill')).toEqual('#f00');
    expect(descriptionShape.attr('text')).toEqual('new description');
    expect(descriptionShape.attr('x')).toEqual(-62.5);
    expect(descriptionShape.attr('y')).toEqual(17);

    const logoIcon = group.find((g) => {
      return g.get('className') === 'rect-logo-icon';
    });
    expect(logoIcon).toBe(null);

    const stateIcon = group.find((g) => {
      return g.get('className') === 'rect-state-icon';
    });
    expect(stateIcon).not.toBe(null);
    expect(stateIcon.attr('width')).toEqual(16);
    expect(stateIcon.attr('img')).toEqual(
      'https://gw.alipayobjects.com/zos/basement_prod/300a2523-67e0-4cbf-9d4a-67c077b40395.svg',
    );

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('update label and description, keep the current unchanged part', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'modelRect',
      },
    });
    const data = {
      nodes: [
        {
          id: 'node',
          label: 'old label',
          description: 'old description',
          x: 100,
          y: 100,
        },
      ],
    };
    graph.data(data);
    graph.render();

    const node = graph.getNodes()[0];
    const group = node.get('group');

    node.update({
      label: 'new label',
      labelCfg: {
        style: {
          fill: '#ff0',
        },
      },
      descriptionCfg: {
        style: {
          fill: '#000',
          shadowColor: '#000',
          shadowBlur: 5,
        },
      },
    });

    const label = group.find((g) => {
      return g.get('className') === 'node-label';
    });
    const description = group.find((g) => {
      return g.get('className') === 'rect-description';
    });
    expect(label).not.toEqual(null);
    expect(label.attr('text')).toEqual('new label');
    expect(label.attr('fill')).toEqual('#ff0');
    expect(description.attr('fill')).toEqual('#000');
    expect(description.attr('shadowBlur')).toEqual(5);

    // test if it will keep the current fill without setting
    node.update({
      labelCfg: {
        position: 'center',
        style: {
          stroke: 'black',
          lineWidth: 3,
        },
      },
      descriptionCfg: {
        style: {
          shadowOffsetX: 10,
          shadowOffsetY: 10,
        },
      },
    });
    expect(label.attr('text')).toEqual('new label');
    expect(label.attr('fill')).toEqual('#ff0');
    expect(label.attr('stroke')).toEqual('black');
    expect(label.attr('lineWidth')).toEqual(3);
    expect(description.attr('fill')).toEqual('#000');
    expect(description.attr('shadowBlur')).toEqual(5);
    expect(description.attr('shadowOffsetX')).toEqual(10);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  describe('icon and linkPoint test', () => {
    it('icon and linkPoints(top bottom)', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'modelRect',
          logoIcon: {
            show: false,
          },
          stateIcon: {
            width: 25,
            height: 25,
          },
          linkPoints: {
            top: true,
            bottom: true,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是很长很长很长的一段长文本',
            x: 300,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // modelRect + label + description + stateIcon + preRect + linkPoints * 2
      expect(group.getCount()).toEqual(7);
      const logoIcon = group.find((g) => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon).toBe(null);

      const stateIcon = group.find((g) => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon).not.toBe(null);
      expect(stateIcon.attr('width')).toEqual(25);
      expect(stateIcon.attr('height')).toEqual(25);

      const markLeft = group.find((g) => {
        return g.get('className') === 'link-point-left';
      });
      expect(markLeft).toBe(null);

      const markTop = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(markTop).not.toBe(null);
      expect(markTop.attr('r')).toEqual(5);
      expect(markTop.attr('y')).toEqual(-35);

      const markBottom = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(markBottom).not.toBe(null);
      expect(markBottom.attr('y')).toEqual(35);
      // graph.destroy();
      // expect(graph.destroyed).toBe(true);
    });
    it('icon and linkPoints(left right)', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
        defaultNode: {
          type: 'modelRect',
          linkPoints: {
            left: true,
            right: true,
          },
        },
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是很长很长很长的一段长文本',
            x: 300,
            y: 100,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const nodes = graph.getNodes();
      const node = nodes[0];
      const group = node.get('group');
      // modelRect + label + description + stateIcon + logoIcon + preRect + linkPoints * 2
      expect(group.getCount()).toEqual(8);
      const markLeft = group.find((g) => {
        return g.get('className') === 'link-point-left';
      });
      expect(markLeft).not.toBe(null);
      expect(markLeft.attr('r')).toEqual(5);
      expect(markLeft.attr('y')).toEqual(0);

      const markTop = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(markTop).toBe(null);

      const markBottom = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(markBottom).toBe(null);

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
            label: '主题是modelRect',
            description: '这里是很长很长很长的一段长文本',
            linkPoints: {
              top: true,
              bottom: true,
            },
            type: 'modelRect',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // modelRect + label + description + stateIcon + logoIcon + preRect + linkPoints * 2
      expect(group.getCount()).toEqual(8);

      node.update({
        linkPoints: {
          top: false,
        },
      });
      const topPoint = group.find((g) => {
        return g.get('className') === 'link-point-top';
      });
      expect(topPoint).toBe(null);
      const bottomPoint = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint).not.toBe(null);

      node.update({
        linkPoints: {
          left: true,
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
      expect(leftPoint).not.toBe(null);
      expect(leftPoint.attr('r')).toBe(5);
      expect(leftPoint.attr('fill')).toBe('#f00');
      expect(leftPoint.attr('stroke')).toBe('#0f0');
      expect(leftPoint.attr('lineWidth')).toBe(2);
      const rightPoint = group.find((g) => {
        return g.get('className') === 'link-point-right';
      });
      expect(rightPoint).not.toBe(null);

      node.update({
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
        linkPoints: {
          stroke: '#000',
        },
      });
      const bottomPoint2 = group.find((g) => {
        return g.get('className') === 'link-point-bottom';
      });
      expect(bottomPoint2.attr('r')).toBe(5);
      expect(bottomPoint2.attr('fill')).toBe('#f00');
      expect(bottomPoint2.attr('stroke')).toBe('#000');

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
    it('icons update', () => {
      const graph = new Graph({
        container: div,
        width: 500,
        height: 500,
      });
      const data = {
        nodes: [
          {
            id: 'node',
            label: '主题是modelRect',
            description: '这里是很长很长很长的一段长文本',
            stateIcon: {
              show: true,
            },
            logoIcon: {
              show: false,
            },
            type: 'modelRect',
            x: 100,
            y: 200,
          },
        ],
      };
      graph.data(data);
      graph.render();

      const node = graph.getNodes()[0];
      const group = node.get('group');
      // modelRect + label + description + stateIcon  + preRect
      expect(group.getCount()).toEqual(5);

      node.update({
        stateIcon: {
          show: false,
        },
        logoIcon: {
          show: true,
        },
      });
      const stateIcon = group.find((g) => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon).toBe(null);

      const logoIcon = group.find((g) => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon).not.toBe(null);
      expect(logoIcon.attr('x')).toBe(-76.5);

      node.update({
        stateIcon: {
          show: true,
        },
      });
      const stateIcon2 = group.find((g) => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon2).not.toBe(null);
      expect(stateIcon2.attr('x')).toBe(71.5);

      // update the stateIcon
      node.update({
        stateIcon: {
          offset: -10,
          // to use the offset
          x: null,
          y: null,
        },
        logoIcon: {
          offset: 30,
          // to use the offset
          x: null,
          y: null,
        },
        labelCfg: {
          offset: 60,
        },
      });
      const stateIcon3 = group.find((g) => {
        return g.get('className') === 'rect-state-icon';
      });
      expect(stateIcon3.attr('x')).toBe(66.5);

      const logoIcon3 = group.find((g) => {
        return g.get('className') === 'rect-logo-icon';
      });
      expect(logoIcon3.attr('x')).toBe(-46.5);

      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });
});
