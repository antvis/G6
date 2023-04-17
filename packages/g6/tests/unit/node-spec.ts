// @ts-nocheck

import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import G6, {
  EdgeDisplayModel,
  Graph,
  IGraph,
  NodeDisplayModel,
} from '../../src/index';
import { LineEdge } from '../../src/stdlib/item/edge';
import { CircleNode } from '../../src/stdlib/item/node';
import { NodeModelData, NodeShapeMap } from '../../src/types/node';
import { extend } from '../../src/util/extend';
import { State } from '../../src/types/item';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

let CustomGraph;

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
    const nodeItem = graph.itemController.itemMap['node1'];
    expect(nodeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.labelShape.attributes.text).toBe('node-label');
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#000');
    expect(nodeItem.shapeMap.labelBackgroundShape).not.toBe(undefined);
    const labelBounds = nodeItem.shapeMap.labelShape.getGeometryBounds();
    expect(nodeItem.shapeMap.labelBackgroundShape.attributes.x).toBe(
      labelBounds.min[0] + nodeItem.shapeMap.labelShape.attributes.x - 4,
    );
    expect(nodeItem.shapeMap.labelBackgroundShape.attributes.y).toBe(
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
    const nodeItem = graph.itemController.itemMap['node1'];
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

describe('register node', () => {
  it('custom node extends circle', (done) => {
    class CustomNode extends CircleNode {
      public defaultStyles = {
        keyShape: {
          r: 25,
          x: 0,
          y: 0,
          fill: '#ff0',
          lineWidth: 0,
          stroke: '#0f0',
        },
      };
      public drawLabelShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { oldData: NodeModelData; newData: NodeModelData },
      ) {
        const { labelShape: propsLabelStyle } = model.data;
        const labelStyle = Object.assign(
          {},
          this.defaultStyles.labelShape,
          propsLabelStyle,
        );
        return this.upsertShape(
          'text',
          'labelShape',
          {
            ...labelStyle,
            text: model.id,
          },
          shapeMap,
          model,
        ).shape;
      }
      public drawOtherShapes(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { oldData: NodeModelData; newData: NodeModelData },
      ) {
        return {
          extraShape: this.upsertShape(
            'circle',
            'extraShape',
            {
              r: 4,
              fill: '#0f0',
              x: -20,
              y: 0,
            },
            shapeMap,
            model,
          ).shape,
        };
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
          buShape: this.upsertShape(
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
            model,
          ).shape,
        };
      }
    }
    CustomGraph = extend(G6.Graph, {
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
            data: { x: 100, y: 200, type: 'custom-node' },
          },
          {
            id: 'node2',
            data: { x: 100, y: 300, type: 'circle-node' },
          },
          {
            id: 'node3',
            data: { x: 200, y: 300, labelShape: undefined },
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
        // affect the nodes without type field in their data object, which means configurations in the user data has higher priority than that in the mapper
        type: 'custom-node',
        // affect the nodes without labelShape field in their data object, which means configurations in the user data has higher priority than that in the mapper
        labelShape: {},
        otherShapes: {},
      },
    });
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.extraShape).not.toBe(undefined);
      expect(node1.shapeMap.keyShape.style.r).toBe(25);
      const node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.extraShape).toBe(undefined);
      const node3 = graph.itemController.itemMap['node3'];
      // labelShape is assigned with undefined in node3's data, shapes defined in drawLabelShape will be undefined
      expect(node3.shapeMap.extraShape).not.toBe(undefined);
      expect(node3.shapeMap.keyShape.style.r).toBe(25);

      const edge1 = graph.itemController.itemMap['edge1'];
      expect(edge1.shapeMap.buShape).not.toBe(undefined);
      const edge2 = graph.itemController.itemMap['edge2'];
      expect(edge2.shapeMap.buShape).toBe(undefined);

      // update node type
      graph.updateData('node', {
        id: 'node2',
        data: {
          type: 'custom-node',
        },
      });
      expect(node2.shapeMap.extraShape).not.toBe(undefined);
      expect(node2.shapeMap.keyShape.style.r).toBe(25);

      // update edge type
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          type: 'custom-edge',
        },
      });
      expect(edge2.shapeMap.buShape).not.toBe(undefined);
      graph.destroy();
      done();
    });
  });
  it('update node type with different keyShape shape type and other shapes', (done) => {
    class CustomNode extends CircleNode {
      public defaultStyles = {
        keyShape: {
          width: 50,
          height: 25,
          x: 0,
          y: 0,
          fill: '#ff0',
          lineWidth: 0,
          stroke: '#0f0',
          opacity: 0.6,
        },
      };
      public drawKeyShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { oldData: NodeModelData; newData: NodeModelData },
      ) {
        const keyShapeStyle = Object.assign(
          {},
          this.defaultStyles.keyShape,
          model.data.labelShape,
        );
        return this.upsertShape(
          'rect',
          'keyShape',
          keyShapeStyle,
          shapeMap,
          model,
        ).shape;
      }
      public drawOtherShapes(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { oldData: NodeModelData; newData: NodeModelData },
      ) {
        const testShape = this.upsertShape(
          'line',
          'testShape',
          {
            x1: 0,
            y1: 10,
            x2: 50,
            y2: 10,
            stroke: '#f00',
            lineWidth: 2,
          },
          shapeMap,
          model,
        ).shape;
        return { testShape };
      }
    }
    CustomGraph = extend(CustomGraph, {
      nodes: {
        'custom-node1': CustomNode,
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
            data: { x: 100, y: 200, type: 'custom-node1' },
          },
          {
            id: 'node2',
            data: { x: 100, y: 300, type: 'circle-node' },
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
            data: {},
          },
        ],
      },
      node: {
        // affect the nodes without type field in their data object, which means configurations in the user data has higher priority than that in the mapper
        type: 'custom-node1',
        // affect the nodes without labelShape field in their data object, which means configurations in the user data has higher priority than that in the mapper
        labelShape: {},
        otherShapes: {},
      },
    });
    graph.on('afterrender', (e) => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.testShape).not.toBe(undefined);
      expect(node1.shapeMap.keyShape.nodeName).toBe('rect');
      const node3 = graph.itemController.itemMap['node3'];
      expect(node3.shapeMap.testShape).not.toBe(undefined);
      expect(node3.shapeMap.keyShape.nodeName).toBe('rect');

      let node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.testShape).toBe(undefined);
      expect(node2.shapeMap.keyShape.nodeName).toBe('circle');

      // update circle-node to custom-node
      graph.updateData('node', {
        id: 'node2',
        data: {
          type: 'custom-node1',
        },
      });
      node2 = graph.itemController.itemMap['node2'];
      expect(node2.shapeMap.testShape).not.toBe(undefined);
      expect(node2.shapeMap.keyShape.nodeName).toBe('rect');

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
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);

      // set multiple nodes state
      graph.setItemState(['node1', 'node2'], 'selected', true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(1);
      expect(graph.findIdByState('node', 'selected')[0]).toBe('node2');
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);
      graph.setItemState(['node1', 'node2'], 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);

      // set multiple states
      graph.setItemState(['node1', 'node2'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(graph.findIdByState('node', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['node1', 'node2']);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(graph.findIdByState('node', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.r,
      ).toBe(16);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.opacity,
      ).toBe(1);

      graph.destroy();
      done();
    });
  });
  it('node state with assigned style', (done) => {
    const graph = new Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: {
              x: 100,
              y: 200,
              keyShape: { fill: '#fff', stroke: '#fff' },
            },
          },
          {
            id: 'node2',
            data: {
              x: 100,
              y: 300,
              keyShape: { fill: '#fff', stroke: '#fff' },
            },
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
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);

      // set multiple nodes state
      graph.setItemState(['node1', 'node2'], 'selected', true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.stroke,
      ).toBe('#0f0');
      graph.setItemState('node1', 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(1);
      expect(graph.findIdByState('node', 'selected')[0]).toBe('node2');
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);
      graph.setItemState(['node1', 'node2'], 'selected', false);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);

      // set multiple states
      graph.setItemState(['node1', 'node2'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('node', 'selected').length).toBe(2);
      expect(graph.findIdByState('node', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.lineWidth,
      ).toBe(3);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.r,
      ).toBe(30);
      expect(
        graph.itemController.itemMap['node2'].shapeMap.keyShape.style.opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['node1', 'node2']);
      expect(graph.findIdByState('node', 'selected').length).toBe(0);
      expect(graph.findIdByState('node', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.r,
      ).toBe(16);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.lineWidth,
      ).toBe(0);
      expect(
        graph.itemController.itemMap['node1'].shapeMap.keyShape.style.opacity,
      ).toBe(1);

      graph.destroy();
      done();
    });
  });
  class CustomNode extends CircleNode {
    public defaultStyles = {
      keyShape: {
        r: 25,
        x: 0,
        y: 0,
        fill: '#ff0',
        lineWidth: 0,
        stroke: '#0f0',
      },
    };
    public drawLabelShape(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?: { oldData: NodeModelData; newData: NodeModelData },
    ) {
      const { labelShape: propsLabelStyle } = model.data;
      const labelStyle = Object.assign(
        {},
        this.defaultStyles.labelShape,
        propsLabelStyle,
      );
      return this.upsertShape(
        'text',
        'labelShape',
        {
          ...labelStyle,
          text: model.id,
        },
        shapeMap,
        model,
      ).shape;
    }
    public drawOtherShapes(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?:
        | { previous: NodeModelData; current: NodeModelData }
        | undefined,
      diffState?: { previous: State[]; current: State[] } | undefined,
    ): { [id: string]: DisplayObject<any, any> } {
      const extraShape = this.upsertShape(
        'circle',
        'extraShape',
        {
          r: 4,
          fill: '#0f0',
          x: -20,
          y: 0,
        },
        shapeMap,
        model,
      ).shape;
      return { extraShape };
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
        buShape: this.upsertShape(
          'rect',
          'buShape',
          {
            width: 6,
            height: 6,
            x: point.x,
            y: point.y,
            fill: '#0f0',
            ...model.data?.otherShapes?.buShape, // merged style from mappers and states
          },
          shapeMap,
          model,
        ).shape,
      };
    }
  }
  CustomGraph = extend(CustomGraph, {
    nodes: {
      'custom-node2': CustomNode,
    },
    edges: {
      'custom-edge2': CustomEdge,
    },
  });

  it('custom node with setState', (done) => {
    const graph = new CustomGraph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: {
              x: 100,
              y: 200,
              type: 'custom-node2',
              keyShape: { fill: '#f00' },
              tag: 1,
            },
          },
          {
            id: 'node2',
            data: { x: 100, y: 300, type: 'circle-node' },
          },
          {
            id: 'node3',
            data: { x: 200, y: 300, labelShape: undefined },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            data: { type: 'custom-edge2' },
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
        // affect the nodes without type field in their data object, which means configurations in the user data has higher priority than that in the mapper
        type: 'custom-node2',
        // affect the nodes without labelShape field in their data object, which means configurations in the user data has higher priority than that in the mapper
        labelShape: {},
        otherShapes: {},
      },
      nodeState: {
        selected: {
          keyShape: {
            fill: '#00f',
            lineWidth: 2,
            stroke: '#fff',
          },
          labelShape: {
            fill: '#fff',
          },
        },
      },
    });
    graph.on('afterrender', () => {
      const node1 = graph.itemController.itemMap['node1'];
      expect(node1.shapeMap.extraShape).not.toBe(undefined);
      graph.setItemState('node1', 'selected', true);
      expect(node1.shapeMap.labelShape.style.fill).toBe('#fff');
      expect(node1.shapeMap.keyShape.style.fill).toBe('#00f');
      expect(node1.shapeMap.keyShape.style.stroke).toBe('#fff');
      expect(node1.shapeMap.keyShape.style.lineWidth).toBe(2);

      const node2 = graph.itemController.itemMap['node2'];
      graph.setItemState('node2', 'selected', true);
      expect(node2.shapeMap.extraShape).toBe(undefined);
      expect(node2.shapeMap.keyShape.style.fill).toBe('#00f');
      expect(node2.shapeMap.keyShape.style.stroke).toBe('#fff');
      expect(node2.shapeMap.keyShape.style.lineWidth).toBe(2);

      // update node type
      graph.updateData('node', {
        id: 'node2',
        data: {
          type: 'custom-node2',
        },
      });
      expect(node2.shapeMap.extraShape).not.toBe(undefined);
      expect(node2.shapeMap.keyShape.style.r).toBe(25);
      expect(node2.shapeMap.keyShape.style.fill).toBe('#00f');
      expect(node2.shapeMap.keyShape.style.stroke).toBe('#fff');
      expect(node2.shapeMap.keyShape.style.lineWidth).toBe(2);

      graph.destroy();
      done();
    });
  });
});
