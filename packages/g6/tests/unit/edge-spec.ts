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
import { upsertShape } from '../../src/util/shape';

const container = document.createElement('div');
document.querySelector('body')!.appendChild(container);

let graph: IGraph<any>;

describe('edge item', () => {
  it('new graph with two nodes and one edge', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      modes: {
        default: ['drag-node'],
      },
      data: {
        nodes: [
          {
            id: 'node1',
            data: {
              x: 100,
              y: 100,
            },
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
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update edge label', (done) => {
    const padding = [4, 16, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
        },
        labelBackgroundShape: {
          radius: 10,
          padding,
          fill: '#f00',
        },
        iconShape: {
          text: 'A',
          fill: '#f00',
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    const fill = edgeItem.shapeMap.labelShape.attributes.fill;
    expect(fill).toBe('rgba(0,0,0,0.85)');
    expect(edgeItem.shapeMap.labelShape.attributes.transform).toBe(
      'rotate(45)',
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.transform).toBe(
      'rotate(45)',
    );
    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.height).toBe(
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
      edgeItem.shapeMap.labelShape.attributes.x -
        edgeItem.shapeMap.labelBackgroundShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds =
      edgeItem.shapeMap.labelBackgroundShape.getGeometryBounds();
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
    expect(edgeItem.shapeMap.labelBackgroundShape).toBe(undefined);
    done();
  });
  it('update edge icon', (done) => {
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
          text: '',
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#f00',
          fontSize: 20,
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    let { labelShape, iconShape, labelBackgroundShape } = edgeItem.shapeMap;
    expect(iconShape.attributes.x + iconShape.attributes.width + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(
      labelBackgroundShape.attributes.transform,
    );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.height / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#f00',
          fontWeight: 800,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(
      labelBackgroundShape.attributes.transform,
    );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.fontSize / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
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
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    expect(iconShape.attributes.transform).toBe(
      labelShape.attributes.transform,
    );
    expect(iconShape.attributes.y + iconShape.attributes.fontSize / 2).toBe(
      labelBackgroundShape.getGeometryBounds().center[1] +
        labelBackgroundShape.attributes.y,
    );
    graph.destroy();
    done();
  });
});

describe('edge mapper', () => {
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
      const edge1 = graph.itemController.itemMap.get('edge1');
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      let edge2 = graph.itemController.itemMap.get('edge2');
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#f00');

      // update user data
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          buStatus: true,
        },
      });
      edge2 = graph.itemController.itemMap.get('edge2');
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
            formatter: (innerModel) =>
              innerModel.data.buStatus ? '#0f0' : '#f00',
          },
          lineWidth: 5,
          lineDash: {
            fields: ['buStatus', 'buType'],
            formatter: (innerModel) =>
              innerModel.data.buStatus || innerModel.data.buType
                ? undefined
                : [5, 5],
          },
        },
        labelShape: {
          text: {
            fields: ['buName', 'buType'],
            formatter: (innerModel) =>
              `${innerModel.data.buName}-${innerModel.data.buType}`,
          },
        },
      },
    } as any);
    graph.read(clone(data));
    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap.get('edge1');
      expect(edge1.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      expect(edge1.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(edge1.shapeMap.keyShape.attributes.lineDash).toBe('');
      expect(edge1.shapeMap.labelShape.attributes.text).toBe('edge-1-1');
      let edge2 = graph.itemController.itemMap.get('edge2');
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#f00');
      expect(edge2.shapeMap.keyShape.attributes.lineWidth).toBe(5);
      expect(JSON.stringify(edge2.shapeMap.keyShape.attributes.lineDash)).toBe(
        '[5,5]',
      );
      expect(edge2.shapeMap.labelShape.attributes.text).toBe('edge-2-0');

      // update user data
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          buStatus: true,
          buName: 'newedge2name',
        },
      });
      edge2 = graph.itemController.itemMap.get('edge2');
      expect(edge2.shapeMap.keyShape.attributes.stroke).toBe('#0f0');
      expect(edge2.shapeMap.keyShape.attributes.lineDash).toBe('');
      expect(edge2.shapeMap.labelShape.attributes.text).toBe('newedge2name-0');

      graph.destroy();
      done();
    });
  });
});

describe('state', () => {
  it('edge state', (done) => {
    const graph = new Graph({
      container,
      width: 500,
      height: 500,
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
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            opacity: 0.5,
          },
        },
      },
    });
    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);

      graph.destroy();
      done();
    });
  });
  it('edge state with assigned style', (done) => {
    const graph = new Graph({
      container,
      width: 500,
      height: 500,
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
            data: {
              keyShape: {
                stroke: '#f00',
                lineDash: [2, 2],
              },
            },
          },
          {
            id: 'edge2',
            source: 'node1',
            target: 'node3',
            data: {
              keyShape: {
                stroke: '#f00',
                lineDash: [2, 2],
              },
            },
          },
        ],
      },
      edgeState: {
        selected: {
          keyShape: {
            stroke: '#0f0',
            lineWidth: 2,
          },
        },
        highlight: {
          keyShape: {
            stroke: '#00f',
            opacity: 0.5,
          },
        },
      },
    });
    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        JSON.stringify(
          graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
            .lineDash,
        ),
      ).toBe('[2,2]');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#f00');
      expect(
        JSON.stringify(
          graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
            .lineDash,
        ),
      ).toBe('[2,2]');

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        JSON.stringify(
          graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
            .lineDash,
        ),
      ).toBe('[2,2]');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        JSON.stringify(
          graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
            .lineDash,
        ),
      ).toBe('[2,2]');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#f00');
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#f00');

      // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
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
      );
    }
    public drawOtherShapes(
      model: NodeDisplayModel,
      shapeMap: NodeShapeMap,
      diffData?: { oldData: NodeModelData; newData: NodeModelData },
    ) {
      return {
        extraShape: upsertShape(
          'circle',
          'extraShape',
          {
            r: 4,
            fill: '#0f0',
            x: -20,
            y: 0,
          },
          shapeMap,
        ),
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
            ...model.data?.otherShapes?.buShape, // merged style from mappers and states
          },
          shapeMap,
        ),
      };
    }
  }
  const CustomGraph = extend(Graph, {
    nodes: {
      'custom-node2': CustomNode,
    },
    edges: {
      'custom-edge2': CustomEdge,
    },
  });
  it('custom edge with setState', (done) => {
    const graph = new CustomGraph({
      container,
      width: 500,
      height: 500,
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200, type: 'custom-node2' },
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
      },
      edgeState: {
        selected: {
          keyShape: {
            lineWidth: 2,
            stroke: '#00f',
          },
          otherShapes: {
            buShape: {
              fill: '#fff',
            },
          },
        },
      },
    });
    graph.on('afterrender', () => {
      const edge1 = graph.itemController.itemMap.get('edge1');
      graph.setItemState('edge1', 'selected', true);
      expect(edge1.shapeMap.keyShape.style.stroke).toBe('#00f');
      expect(edge1.shapeMap.keyShape.style.lineWidth).toBe(2);
      expect(edge1.shapeMap.buShape.style.fill).toBe('#fff');

      const edge2 = graph.itemController.itemMap.get('edge2');
      graph.setItemState('edge2', 'selected', true);
      expect(edge2.shapeMap.keyShape.style.stroke).toBe('#00f');
      expect(edge2.shapeMap.keyShape.style.lineWidth).toBe(2);

      // update node type
      graph.updateData('edge', {
        id: 'edge2',
        data: {
          type: 'custom-edge2',
        },
      });
      expect(edge2.shapeMap.buShape).not.toBe(undefined);
      expect(edge2.shapeMap.keyShape.style.stroke).toBe('#00f');
      expect(edge2.shapeMap.keyShape.style.lineWidth).toBe(2);
      expect(edge2.shapeMap.buShape.style.fill).toBe('#fff');

      graph.clearItemState(['edge2'], ['selected']);
      expect(edge2.shapeMap.keyShape.style.stroke).not.toBe('#00f');
      expect(edge2.shapeMap.keyShape.style.lineWidth).toBe(1);
      expect(edge2.shapeMap.buShape.style.fill).toBe('#0f0');

      graph.destroy();
      done();
    });
  });
});

// test cubic edge
describe('cubic-edge unit test', () => {
  const width = document.getElementById('container')?.clientWidth;
  const height = document.getElementById('container')?.clientHeight;

  // default data: 2 nodes, 1 cubic-edge
  const defaultData = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'cubic-edge',
        },
      },
    ],
  };

  it('new graph with two nodes and one cubic-edge', (done) => {
    graph = new Graph({
      container,
      width,
      height,
      data: defaultData,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });

  it('update cubic-edge label', (done) => {
    const padding = [4, 16, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
        },
        labelBackgroundShape: {
          radius: 10,
          padding,
          fill: '#f00',
        },
        iconShape: {
          text: 'A',
          fill: '#f00',
        },
      },
    });

    let edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    const fill = edgeItem.shapeMap.labelShape.attributes.fill;
    expect(fill).toBe('rgba(0,0,0,0.85)');

    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.height).toBe(
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

    edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');
    expect(
      edgeItem.shapeMap.labelShape.attributes.x -
        edgeItem.shapeMap.labelBackgroundShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds =
      edgeItem.shapeMap.labelBackgroundShape.getGeometryBounds();
    const labelBgWidth = labelBgBounds.max[0] - labelBgBounds.min[0];
    const labelBgHeight = labelBgBounds.max[1] - labelBgBounds.min[1];
    expect(labelBgWidth - labelWidth).toBe(padding[1] + padding[3]);
    expect(labelBgHeight - labelHeight).toBe(padding[0] + padding[2]);

    // TODO: test set edge to undefine
    // graph.updateData('edge', {
    //   id: 'edge1',
    //   data: {
    //     labelShape: undefined,
    //   },
    // });

    // edgeItem = graph.itemController.itemMap.get('edge1');
    // expect(edgeItem.shapeMap.labelShape).toBe(undefined);
    // expect(edgeItem.shapeMap.labelBackgroundShape).toBe(undefined);

    done();
  });

  it('update cubic-edge icon', (done) => {
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
          text: '',
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#f00',
          fontSize: 20,
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    let { labelShape, iconShape, labelBackgroundShape } = edgeItem.shapeMap;
    expect(iconShape.attributes.x + iconShape.attributes.width + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );

    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.height / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#f00',
          fontWeight: 800,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.fontSize / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
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
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );

    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelShape.attributes.transform,
    // );
    expect(iconShape.attributes.y + iconShape.attributes.fontSize / 2).toBe(
      labelBackgroundShape.getGeometryBounds().center[1] +
        labelBackgroundShape.attributes.y,
    );
    graph.destroy();
    done();
  });

  it('set cubic-edge state', (done) => {
    const stateData = {
      nodes: [
        {
          id: 'node1',
          data: {
            x: 100,
            y: 100,
          },
        },
        {
          id: 'node2',
          data: { x: 300, y: 350 },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {
            type: 'cubic-horizontal-edge',
            keyShape: {
              stroke: '#f00',
              lineDash: [2, 2],
            },
          },
          edgeState: {
            selected: {
              keyShape: {
                stroke: '#0f0',
                lineWidth: 2,
              },
            },
            highlight: {
              keyShape: {
                stroke: '#00f',
                opacity: 0.5,
              },
            },
          },
        },
      ],
    };

    graph = new Graph({
      container,
      width: 500,
      height: 500,
      data: stateData,
      modes: {
        // Supported behavior
        default: ['activate-relations'],
      },
    });

    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);
    });

    graph.destroy();
    done();
  });
});

// test cubic horizon edge
describe('cubic-horizontal-edge unit test', () => {
  const width = document.getElementById('container')?.clientWidth;
  const height = document.getElementById('container')?.clientHeight;

  // default data: 2 nodes, 1 cubic-edge
  const defaultData = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'cubic-horizontal-edge',
        },
      },
    ],
  };

  it.only('new graph with two nodes and one cubic-horizontal-edge', (done) => {
    graph = new Graph({
      container,
      width,
      height,
      data: defaultData,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });

  it.only('update cubic-horizontal-edge label', (done) => {
    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);
    });

    graph.destroy();
    done();
  });
});

// test cubic horizon edge
describe('cubic-horizontal-edge unit test', () => {
  const width = document.getElementById('container')?.clientWidth;
  const height = document.getElementById('container')?.clientHeight;

  // default data: 2 nodes, 1 cubic-edge
  const defaultData = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'cubic-horizontal-edge',
        },
      },
    ],
  };

  it.only('new graph with two nodes and one cubic-horizontal-edge', (done) => {
    graph = new Graph({
      container,
      width,
      height,
      data: defaultData,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });

  it.only('update cubic-horizontal-edge label', (done) => {
    const padding = [4, 16, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
        },
        labelBackgroundShape: {
          radius: 10,
          padding,
          fill: '#f00',
        },
        iconShape: {
          text: 'A',
          fill: '#f00',
        },
      },
    });

    let edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    const fill = edgeItem.shapeMap.labelShape.attributes.fill;
    expect(fill).toBe('rgba(0,0,0,0.85)');

    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.height).toBe(
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

    edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');
    expect(
      edgeItem.shapeMap.labelShape.attributes.x -
        edgeItem.shapeMap.labelBackgroundShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds =
      edgeItem.shapeMap.labelBackgroundShape.getGeometryBounds();
    const labelBgWidth = labelBgBounds.max[0] - labelBgBounds.min[0];
    const labelBgHeight = labelBgBounds.max[1] - labelBgBounds.min[1];
    expect(labelBgWidth - labelWidth).toBe(padding[1] + padding[3]);
    expect(labelBgHeight - labelHeight).toBe(padding[0] + padding[2]);

    // TODO: test set edge to undefine
    // graph.updateData('edge', {
    //   id: 'edge1',
    //   data: {
    //     labelShape: undefined,
    //   },
    // });

    // edgeItem = graph.itemController.itemMap.get('edge1');
    // expect(edgeItem.shapeMap.labelShape).toBe(undefined);
    // expect(edgeItem.shapeMap.labelBackgroundShape).toBe(undefined);

    done();
  });

  it.only('update cubic-horizontal-edge icon', (done) => {
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
          text: '',
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#f00',
          fontSize: 20,
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    let { labelShape, iconShape, labelBackgroundShape } = edgeItem.shapeMap;
    expect(iconShape.attributes.x + iconShape.attributes.width + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );

    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.height / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#f00',
          fontWeight: 800,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.fontSize / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
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
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelShape.attributes.transform,
    // );
    expect(iconShape.attributes.y + iconShape.attributes.fontSize / 2).toBe(
      labelBackgroundShape.getGeometryBounds().center[1] +
        labelBackgroundShape.attributes.y,
    );
    graph.destroy();
    done();
  });

  it.only('set cubic-horizontal-edge state', (done) => {
    const stateData = {
      nodes: [
        {
          id: 'node1',
          data: {
            x: 100,
            y: 100,
          },
        },
        {
          id: 'node2',
          data: { x: 300, y: 350 },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {
            type: 'cubic-horizontal-edge',
            keyShape: {
              stroke: '#f00',
              lineDash: [2, 2],
            },
          },
          edgeState: {
            selected: {
              keyShape: {
                stroke: '#0f0',
                lineWidth: 2,
              },
            },
            highlight: {
              keyShape: {
                stroke: '#00f',
                opacity: 0.5,
              },
            },
          },
        },
      ],
    };

    graph = new Graph({
      container,
      width: 500,
      height: 500,
      data: stateData,
      modes: {
        default: ['activate-relations'],
      },
    });

    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);
    });

    graph.destroy();
    done();
  });
});

// test cubic horizon edge
describe('cubic-vertical-edge unit test', () => {
  const width = document.getElementById('container')?.clientWidth;
  const height = document.getElementById('container')?.clientHeight;

  // default data: 2 node + 1 cubic-edge
  const defaultData = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'cubic-vertical-edge',
        },
      },
    ],
  };

  it.only('new graph with two nodes and one cubic-vertical-edge', (done) => {
    graph = new Graph({
      container,
      width,
      height,
      data: defaultData,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });

  it.only('update cubic-vertical-edge label', (done) => {
    const padding = [4, 16, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
        },
        labelBackgroundShape: {
          radius: 10,
          padding,
          fill: '#f00',
        },
        iconShape: {
          text: 'A',
          fill: '#f00',
        },
      },
    });

    let edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    const fill = edgeItem.shapeMap.labelShape.attributes.fill;
    expect(fill).toBe('rgba(0,0,0,0.85)');

    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.height).toBe(
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

    edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');
    expect(
      edgeItem.shapeMap.labelShape.attributes.x -
        edgeItem.shapeMap.labelBackgroundShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds =
      edgeItem.shapeMap.labelBackgroundShape.getGeometryBounds();
    const labelBgWidth = labelBgBounds.max[0] - labelBgBounds.min[0];
    const labelBgHeight = labelBgBounds.max[1] - labelBgBounds.min[1];
    expect(labelBgWidth - labelWidth).toBe(padding[1] + padding[3]);
    expect(labelBgHeight - labelHeight).toBe(padding[0] + padding[2]);

    // TODO: test set edge to undefine
    // graph.updateData('edge', {
    //   id: 'edge1',
    //   data: {
    //     labelShape: undefined,
    //   },
    // });

    // edgeItem = graph.itemController.itemMap.get('edge1');
    // expect(edgeItem.shapeMap.labelShape).toBe(undefined);
    // expect(edgeItem.shapeMap.labelBackgroundShape).toBe(undefined);

    done();
  });

  it.only('update cubic-vertical-edge icon', (done) => {
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
          text: '',
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#f00',
          fontSize: 20,
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    let { labelShape, iconShape, labelBackgroundShape } = edgeItem.shapeMap;
    expect(iconShape.attributes.x + iconShape.attributes.width + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );

    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.height / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#f00',
          fontWeight: 800,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.fontSize / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
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
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelShape.attributes.transform,
    // );
    expect(iconShape.attributes.y + iconShape.attributes.fontSize / 2).toBe(
      labelBackgroundShape.getGeometryBounds().center[1] +
        labelBackgroundShape.attributes.y,
    );
    graph.destroy();
    done();
  });

  it.only('set cubic-vertical-edge state', (done) => {
    const stateData = {
      nodes: [
        {
          id: 'node1',
          data: {
            x: 100,
            y: 100,
          },
        },
        {
          id: 'node2',
          data: { x: 300, y: 350 },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {
            type: 'cubic-horizontal-edge',
            keyShape: {
              stroke: '#f00',
              lineDash: [2, 2],
            },
          },
          edgeState: {
            selected: {
              keyShape: {
                stroke: '#0f0',
                lineWidth: 2,
              },
            },
            highlight: {
              keyShape: {
                stroke: '#00f',
                opacity: 0.5,
              },
            },
          },
        },
      ],
    };

    graph = new Graph({
      container,
      width: 500,
      height: 500,
      data: stateData,
      modes: {
        default: ['activate-relations'],
      },
    });

    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);
    });

    graph.destroy();
    done();
  });
});

// test cubic horizon edge
describe('cubic-vertical-edge unit test', () => {
  const width = document.getElementById('container')?.clientWidth;
  const height = document.getElementById('container')?.clientHeight;

  // default data: 2 node + 1 cubic-edge
  const defaultData = {
    nodes: [
      {
        id: 1,
        data: {
          x: 100,
          y: 100,
          type: 'circle-node',
        },
      },
      {
        id: 2,
        data: {
          x: 200,
          y: 100,
          type: 'circle-node',
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 1,
        target: 2,
        data: {
          type: 'cubic-vertical-edge',
        },
      },
    ],
  };

  it.only('new graph with two nodes and one cubic-vertical-edge', (done) => {
    graph = new Graph({
      container,
      width,
      height,
      data: defaultData,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });

  it.only('update cubic-vertical-edge label', (done) => {
    const padding = [4, 16, 4, 8];
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
        },
        labelBackgroundShape: {
          radius: 10,
          padding,
          fill: '#f00',
        },
        iconShape: {
          text: 'A',
          fill: '#f00',
        },
      },
    });

    let edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    const fill = edgeItem.shapeMap.labelShape.attributes.fill;
    expect(fill).toBe('rgba(0,0,0,0.85)');

    let labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.width).toBe(
      labelBounds.max[0] - labelBounds.min[0] + padding[1] + padding[3],
    );
    expect(edgeItem.shapeMap.labelBackgroundShape.attributes.height).toBe(
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

    edgeItem = graph.itemController.itemMap.get('edge1');
    expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');
    expect(
      edgeItem.shapeMap.labelShape.attributes.x -
        edgeItem.shapeMap.labelBackgroundShape.attributes.x,
    ).toBe(padding[3]);
    labelBounds = edgeItem.shapeMap.labelShape.getGeometryBounds();
    const labelWidth = labelBounds.max[0] - labelBounds.min[0];
    const labelHeight = labelBounds.max[1] - labelBounds.min[1];
    const labelBgBounds =
      edgeItem.shapeMap.labelBackgroundShape.getGeometryBounds();
    const labelBgWidth = labelBgBounds.max[0] - labelBgBounds.min[0];
    const labelBgHeight = labelBgBounds.max[1] - labelBgBounds.min[1];
    expect(labelBgWidth - labelWidth).toBe(padding[1] + padding[3]);
    expect(labelBgHeight - labelHeight).toBe(padding[0] + padding[2]);

    // TODO: test set edge to undefine
    // graph.updateData('edge', {
    //   id: 'edge1',
    //   data: {
    //     labelShape: undefined,
    //   },
    // });

    // edgeItem = graph.itemController.itemMap.get('edge1');
    // expect(edgeItem.shapeMap.labelShape).toBe(undefined);
    // expect(edgeItem.shapeMap.labelBackgroundShape).toBe(undefined);

    done();
  });

  it.only('update cubic-vertical-edge icon', (done) => {
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
          text: '',
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
          // text: 'A',
          fill: '#f00',
          fontSize: 20,
        },
      },
    });
    const edgeItem = graph.itemController.itemMap.get('edge1');
    let { labelShape, iconShape, labelBackgroundShape } = edgeItem.shapeMap;
    expect(iconShape.attributes.x + iconShape.attributes.width + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );

    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.height / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
    );

    // update icon to be a text
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#f00',
          fontWeight: 800,
        },
      },
    });
    labelShape = edgeItem.shapeMap['labelShape'];
    iconShape = edgeItem.shapeMap['iconShape'];
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelBackgroundShape.attributes.transform,
    // );
    expect(
      Math.floor(iconShape.attributes.y + iconShape.attributes.fontSize / 2),
    ).toBeCloseTo(
      Math.floor(
        labelBackgroundShape.getGeometryBounds().center[1] +
          labelBackgroundShape.attributes.y,
      ),
      0.01,
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
    labelBackgroundShape = edgeItem.shapeMap['labelBackgroundShape'];
    expect(iconShape.attributes.x + iconShape.attributes.fontSize + 6).toBe(
      labelBackgroundShape.getGeometryBounds().min[0] +
        labelBackgroundShape.attributes.x,
    );
    // TODO: test transform
    // expect(iconShape.attributes.transform).toBe(
    //   labelShape.attributes.transform,
    // );
    expect(iconShape.attributes.y + iconShape.attributes.fontSize / 2).toBe(
      labelBackgroundShape.getGeometryBounds().center[1] +
        labelBackgroundShape.attributes.y,
    );
    graph.destroy();
    done();
  });

  it.only('set cubic-vertical-edge state', (done) => {
    const stateData = {
      nodes: [
        {
          id: 'node1',
          data: {
            x: 100,
            y: 100,
          },
        },
        {
          id: 'node2',
          data: { x: 300, y: 350 },
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          data: {
            type: 'cubic-horizontal-edge',
            keyShape: {
              stroke: '#f00',
              lineDash: [2, 2],
            },
          },
          edgeState: {
            selected: {
              keyShape: {
                stroke: '#0f0',
                lineWidth: 2,
              },
            },
            highlight: {
              keyShape: {
                stroke: '#00f',
                opacity: 0.5,
              },
            },
          },
        },
      ],
    };

    graph = new Graph({
      container,
      width: 500,
      height: 500,
      data: stateData,
      modes: {
        default: ['activate-relations'],
      },
    });

    graph.on('afterrender', () => {
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      graph.setItemState('edge1', 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'selected', true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(1);
      expect(graph.findIdByState('edge', 'selected')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'selected', false);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // // set multiple states
      graph.setItemState(['edge2', 'edge1'], ['selected', 'highlight'], true);
      expect(graph.findIdByState('edge', 'selected').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from selected and highlight
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .opacity,
      ).toBe(0.5);

      // clear states
      graph.clearItemState(['edge1', 'edge2']);
      expect(graph.findIdByState('edge', 'selected').length).toBe(0);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .opacity,
      ).toBe(1);
    });

    graph.destroy();
    done();
  });
});
