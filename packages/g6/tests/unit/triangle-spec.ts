// @ts-nocheck

import { clone } from '@antv/util';
import G6, { Graph, IGraph } from '../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);
const type = 'triangle-node';
describe('node item', () => {
  let graph: IGraph<any>;
  it('new graph with one node', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200, type },
          },
        ],
      },
    });

    graph.on('afterrender', () => {
      const nodeItem = graph.itemController.itemMap.get('node1');
      expect(nodeItem).not.toBe(undefined);
      expect(nodeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update node label', (done) => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: {
          text: 'node-label',
          position: 'left',
        },
        labelBackgroundShape: {},
      },
    });
    const nodeItem = graph.itemController.itemMap.get('node1');
    expect(nodeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.labelShape.attributes.text).toBe('node-label');
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#000');
    expect(nodeItem.shapeMap.labelBackgroundShape).not.toBe(undefined);
    const labelBounds = nodeItem.shapeMap.labelShape.getGeometryBounds();
    expect(nodeItem.shapeMap.labelBackgroundShape.attributes.x).toBe(
      labelBounds.min[0] + nodeItem.shapeMap.labelShape.attributes.x - 4,
    );
    expect(nodeItem.shapeMap.labelBackgroundShape.attributes.y).toBe(
      labelBounds.min[1] + nodeItem.shapeMap.labelShape.attributes.y - 2,
    );

    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: {
          fill: '#00f',
        },
      },
    });
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');

    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: undefined,
      },
    });
    expect(nodeItem.shapeMap.labelShape).toBe(undefined);
    expect(nodeItem.shapeMap.labelBackgroundShape).toBe(undefined);
    done();
  });
  it('update node icon', (done) => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
    });
    const nodeItem = graph.itemController.itemMap.get('node1');
    expect(nodeItem.shapeMap.iconShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.iconShape.attributes.width).toBe(16);
    expect(nodeItem.shapeMap.iconShape.nodeName).toBe('image');

    graph.updateData('node', {
      id: 'node1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#fff',
          fontWeight: 500,
        },
      },
    });
    expect(nodeItem.shapeMap.iconShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.iconShape.attributes.text).toBe('A');
    expect(nodeItem.shapeMap.iconShape.attributes.fontSize).toBe(16);
    expect(nodeItem.shapeMap.iconShape.nodeName).toBe('text');
    graph.destroy();
    done();
  });
});

describe('node mapper', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        data: { x: 100, y: 200, buStatus: true, buType: 1, type },
      },
      {
        id: 'node2',
        data: { x: 100, y: 300, buStatus: false, buType: 0, type },
      },
    ],
  };
  const graphConfig = {
    container,
    width: 500,
    height: 500,
    type: 'graph',
  };
  it('function mapper', (done) => {
    const graph = new G6.Graph({
      ...graphConfig,
      node: (innerModel) => {
        const { x, y, buStatus } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            keyShape: {
              fill: buStatus ? '#0f0' : '#f00',
            },
          },
        };
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap.get('node1');
      expect(node1.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      let node2 = graph.itemController.itemMap.get('node2');
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#f00');

      // update user data
      graph.updateData('node', {
        id: 'node2',
        data: {
          buStatus: true,
        },
      });
      node2 = graph.itemController.itemMap.get('node2');
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#0f0');

      graph.destroy();
      done();
    });
  });
  it('value and encode mapper', (done) => {
    const graph = new G6.Graph({
      ...graphConfig,
      node: {
        keyShape: {
          fill: {
            fields: ['buStatus'],
            formatter: (innerModel) =>
              innerModel.data.buStatus ? '#0f0' : '#f00',
          },
          lineWidth: 5,
          stroke: {
            fields: ['buStatus', 'buType'],
            formatter: (innerModel) =>
              innerModel.data.buStatus || innerModel.data.buType
                ? '#fff'
                : '#000',
          },
        },
        labelShape: {},
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap.get('node1');
      expect(node1.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(node1.shapeMap.keyShape.attributes.stroke).toBe('#fff');
      let node2 = graph.itemController.itemMap.get('node2');
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#f00');
      expect(node2.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(node2.shapeMap.keyShape.attributes.stroke).toBe('#000');

      // update user data
      graph.updateData('node', {
        id: 'node2',
        data: {
          buStatus: true,
        },
      });
      node2 = graph.itemController.itemMap.get('node2');
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      expect(node2.shapeMap.keyShape.attributes.stroke).toBe('#fff');

      graph.destroy();
      done();
    });
  });
});

describe('state', () => {
  it('node state', (done) => {
    const graph = new Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200, type },
          },
          {
            id: 'node2',
            data: { x: 100, y: 300, type },
          },
          {
            id: 'node3',
            data: { x: 200, y: 300, type },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            data: {},
          },
          {
            id: 'edge2',
            source: 'node1',
            target: 'node3',
            data: {},
          },
        ],
      },
      nodeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            r: 30,
            opacity: 0.5,
          },
        },
      },
    });
    graph.on('afterrender', () => {
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      graph.setItemState('node1', 'selected', true);
      expect(graph.findIdByState('node', 'selected').length).toBe(1);
      expect(graph.findIdByState('node', 'selected')[0]).toBe('node1');
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(0);

      // set multiple nodes state
      graph.setItemState(['node1', 'node2'], 'selected', true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(1);
      expect(graph.findIdByState('node', 'selected')[0]).toBe('node2');
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(0);
      graph.setItemState(['node1', 'node2'], 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(0);

      // set multiple states
      graph.setItemState(['node1', 'node2'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(graph.findIdByState('node', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap.get('node2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['node1', 'node2']);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(graph.findIdByState('node', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style.r,
      ).toBe(16);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(0);
      expect(
        graph.itemController.itemMap.get('node1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);

      graph.destroy();
      done();
    });
  });
});
