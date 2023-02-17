import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import G6, { EdgeDisplayModel, GraphData, IGraph, NodeDisplayModel } from '../../src/index';
import { LineEdge } from '../../src/stdlib/item/edge';
import { CircleNode } from '../../src/stdlib/item/node';
import { BaseNode } from '../../src/stdlib/item/node/base';
import { NodeModelData, NodeShapeMap } from '../../src/types/node';
import { extend } from '../../src/util/extend';
import { upsertShape } from '../../src/util/shape';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

xdescribe('node item', () => {
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
            data: { x: 100, y: 200 },
          },
        ],
      },
    });

    graph.on('afterrender', () => {
      const nodeItem = graph.itemController.itemMap['node1'];
      expect(nodeItem).not.toBe(undefined);
      expect(nodeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update node label', () => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: {
          text: 'node-label',
          position: 'left',
          background: {},
        },
      },
    });
    const nodeItem = graph.itemController.itemMap['node1'];
    expect(nodeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.labelShape.attributes.text).toBe('node-label');
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#000');
    expect(nodeItem.shapeMap.labelBgShape).not.toBe(undefined);
    const labelBounds = nodeItem.shapeMap.labelShape.getGeometryBounds();
    expect(nodeItem.shapeMap.labelBgShape.attributes.x).toBe(
      labelBounds.min[0] + nodeItem.shapeMap.labelShape.attributes.x - 4,
    );
    expect(nodeItem.shapeMap.labelBgShape.attributes.y).toBe(
      labelBounds.min[1] + nodeItem.shapeMap.labelShape.attributes.y - 4,
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
    expect(nodeItem.shapeMap.labelBgShape).toBe(undefined);
  });
  it('update node icon', () => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
    });
    const nodeItem = graph.itemController.itemMap['node1'];
    expect(nodeItem.shapeMap.iconShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.iconShape.attributes.width).toBe(15);
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
    expect(nodeItem.shapeMap.iconShape.attributes.fontSize).toBe(12);
    expect(nodeItem.shapeMap.iconShape.nodeName).toBe('text');
    graph.destroy();
  });
});

xdescribe('edge item', () => {
  let graph: IGraph<any>;
  it('new graph with two nodes and one edge', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 100, keyShape: { opacity: 0.1 } },
          },
          {
            id: 'node2',
            data: { x: 300, y: 300 },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            data: {},
          },
        ],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap['edge1'];
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update edge label', () => {
    const padding = [4, 8, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
          position: 'middle',
          background: {
            radius: 10,
            padding,
          },
        },
      },
    });
    const edgeItem = graph.itemController.itemMap['edge1'];
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#000');
    expect(edgeItem.shapeMap.labelShape.attributes.transform).toBe('rotate(45)');
    expect(edgeItem.shapeMap.labelBgShape.attributes.transform).toBe('rotate(45)');
    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBgShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBgShape.attributes.height).toBe(
      labelBounds.max[1] - labelBounds.min[1] + padding[0] + padding[2],
    );

    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          fill: '#00f',
          position: 'start',
        },
      },
    });
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');
    expect(
      edgeItem.shapeMap.labelShape.attributes.x - edgeItem.shapeMap.labelBgShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds = edgeItem.shapeMap.labelBgShape.getGeometryBounds();
    const labelBgWidth = labelBgBounds.max[0] - labelBgBounds.min[0];
    const labelBgHeight = labelBgBounds.max[1] - labelBgBounds.min[1];
    expect(labelBgWidth - labelWidth).toBe(padding[1] + padding[3]);
    expect(labelBgHeight - labelHeight).toBe(padding[0] + padding[2]);

    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: undefined,
      },
    });
    expect(edgeItem.shapeMap.labelShape).toBe(undefined);
    expect(edgeItem.shapeMap.labelBgShape).toBe(undefined);
  });
  it('update edge icon', () => {
    // add image icon to follow the label at path's center
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'abcddd',
          fill: '#f00',
          position: 'center',
        },
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#fff',
        },
      },
    });
    const edgeItem = graph.itemController.itemMap['edge1'];
    let labelShape = edgeItem.shapeMap['labelShape'];
    let iconShape = edgeItem.shapeMap['iconShape'];
    expect(iconShape.attributes.x + iconShape.attributes.width + 4).toBe(
      labelShape.getGeometryBounds().min[0] + labelShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(labelShape.attributes.transform);
    expect(iconShape.attributes.y + iconShape.attributes.height / 2 - 2).toBe(
      labelShape.getGeometryBounds().center[1] + labelShape.attributes.y,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#fff',
          fontWeight: 500,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    expect(iconShape.attributes.x + iconShape.attributes.width + 4).toBe(
      labelShape.getGeometryBounds().min[0] + labelShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(labelShape.attributes.transform);
    expect(iconShape.attributes.y + iconShape.attributes.height / 2 - 2).toBe(
      labelShape.getGeometryBounds().center[1] + labelShape.attributes.y,
    );

    // move label to the start, and the icon follows
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          position: 'start',
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    expect(iconShape.attributes.x + iconShape.attributes.width + 4).toBe(
      labelShape.getGeometryBounds().min[0] + labelShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(labelShape.attributes.transform);
    expect(iconShape.attributes.y + iconShape.attributes.height / 2 - 2).toBe(
      labelShape.getGeometryBounds().center[1] + labelShape.attributes.y,
    );
    graph.destroy();
  });
});

xdescribe('node mapper', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        data: { x: 100, y: 200, buStatus: true, buType: 1 },
      },
      {
        id: 'node2',
        data: { x: 100, y: 300, buStatus: false, buType: 0 },
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
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      let node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#f00');

      // update user data
      graph.updateData('node', {
        id: 'node2',
        data: {
          buStatus: true,
        },
      });
      node2 = graph.itemController.itemMap['node2'];
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
            formatter: (innerModel) => (innerModel.data.buStatus ? '#0f0' : '#f00'),
          },
          lineWidth: 5,
          stroke: {
            fields: ['buStatus', 'buType'],
            formatter: (innerModel) =>
              innerModel.data.buStatus || innerModel.data.buType ? '#fff' : '#000',
          },
        },
        labelShape: {},
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      expect(node1.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(node1.shapeMap.keyShape.attributes.stroke).toBe('#fff');
      let node2 = graph.itemController.itemMap['node2'];
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
      node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.keyShape.attributes.fill).toBe('#0f0');
      expect(node2.shapeMap.keyShape.attributes.stroke).toBe('#fff');

      graph.destroy();
      done();
    });
  });
});

xdescribe('edge mapper', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        data: { x: 100, y: 200 },
      },
      {
        id: 'node2',
        data: { x: 100, y: 300 },
      },
      {
        id: 'node3',
        data: { x: 200, y: 300 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: { buStatus: true, buType: 1, buName: 'edge-1' },
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node3',
        data: { buStatus: false, buType: 0, buName: 'edge-2' },
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
      edge: (innerModel) => {
        const { x, y, buStatus } = innerModel.data;
        return {
          ...innerModel,
          data: {
            x,
            y,
            keyShape: {
              stroke: buStatus ? '#0f0' : '#f00',
            },
          },
        };
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      let edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#f00');

      // update user data
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          buStatus: true,
        },
      });
      edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#0f0');

      graph.destroy();
      done();
    });
  });
  it('value and encode mapper', (done) => {
    const graph = new G6.Graph({
      ...graphConfig,
      edge: {
        keyShape: {
          stroke: {
            fields: ['buStatus'],
            formatter: (innerModel) => (innerModel.data.buStatus ? '#0f0' : '#f00'),
          },
          lineWidth: 5,
          lineDash: {
            fields: ['buStatus', 'buType'],
            formatter: (innerModel) =>
              innerModel.data.buStatus || innerModel.data.buType ? undefined : [5, 5],
          },
        },
        labelShape: {
          text: {
            fields: ['buName', 'buType'],
            formatter: (innerModel) => `${innerModel.data.buName}-${innerModel.data.buType}`,
          },
        },
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(edge1.shapeMap.keyShape.attributes.lineDash).toBe('');
      expect(edge1.shapeMap.labelShape.attributes.text).toBe('edge-1-1');
      let edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#f00');
      expect(edge2.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(JSON.stringify(edge2.shapeMap.keyShape.attributes.lineDash)).toBe('[5,5]');
      expect(edge2.shapeMap.labelShape.attributes.text).toBe('edge-2-0');

      // update user data
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          buStatus: true,
          buName: 'newedge2name',
        },
      });
      edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      expect(edge2.shapeMap.keyShape.attributes.lineDash).toBe('');
      expect(edge2.shapeMap.labelShape.attributes.text).toBe('newedge2name-0');

      graph.destroy();
      done();
    });
  });
});

describe('register node', () => {
  it('custom node extends circle', (done) => {
    class CustomNode extends CircleNode {
      public drawLabelShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { oldData: NodeModelData; newData: NodeModelData },
      ) {
        const extraShape = upsertShape(
          'circle',
          'extraShape',
          {
            r: 4,
            fill: '#0f0',
            x: -20,
            y: 0,
          },
          shapeMap,
        );
        const labelShape = upsertShape(
          'text',
          'labelShape',
          {
            text: 'it-is-custom-node',
          },
          shapeMap,
        );
        return { labelShape, extraShape };
      }
    }
    class CustomEdge extends LineEdge {
      public afterDraw(
        model: EdgeDisplayModel,
        shapeMap: { [shapeId: string]: DisplayObject<any, any> },
        shapesChanged?: string[],
      ): { [otherShapeId: string]: DisplayObject } {
        const { keyShape } = shapeMap;
        const point = keyShape.getPoint(0.3);
        return {
          buShape: upsertShape(
            'rect',
            'buShape',
            {
              width: 6,
              height: 6,
              x: point.x,
              y: point.y,
              fill: '#0f0',
            },
            shapeMap,
          ),
        };
      }
    }
    const CustomGraph = extend(G6.Graph, {
      nodes: {
        'custom-node': CustomNode,
      },
      edges: {
        'custom-edge': CustomEdge,
      },
    });

    // TODO: G6.Graph is modified unexpectively
    const graph = new CustomGraph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200, labelShape: {}, type: 'custom-node' },
          },
          {
            id: 'node2',
            data: { x: 100, y: 300, labelShape: {} },
          },
          {
            id: 'node3',
            data: { x: 200, y: 300 },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            data: { type: 'custom-edge' },
          },
          {
            id: 'edge2',
            source: 'node1',
            target: 'node3',
            data: {},
          },
        ],
      },
      node: {
        type: 'custom-node',
      },
    });
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.extraShape).not.toBe(undefined);
      const node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.extraShape).toBe(undefined);

      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.buShape).not.toBe(undefined);
      const edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.buShape).toBe(undefined);

      // TODO: other shapes
      // TODO: node/edge type on spec

      done();
    });
  });
});
