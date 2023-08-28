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
const width = document.getElementById('container')?.clientWidth;
const height = document.getElementById('container')?.clientHeight;
document.querySelector('body').appendChild(container);

let graph: IGraph<any>;

const data = {
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
        type: 'quadratic-edge',
      },
    },
  ],
};

const edge: (data: any) => any = (edgeInnerModel: any) => {
  const { id, data } = edgeInnerModel;
  return {
    id,
    data: {
      keyShape: {
        controlPoints: [0, 0],
        curvePosition: 0.5,
        curveOffset: [10, 10],
        stroke: 'blue',
      },
      labelShape: {
        text: 'label',
        fill: 'blue',
      },
      labelBackgroundShape: {
        fill: 'white',
      },
      ...data,
    },
  };
};

describe('edge item', () => {
  it('new graph with two nodes and one edge', (done) => {
    graph = new G6.Graph({
      container,
      width,
      height,
      data,
      modes: {
        default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      node: (nodeInnerModel: any) => {
        const { id, data } = nodeInnerModel;
        return {
          id,
          data: {
            ...data,
            keyShape: {
              r: 16,
            },
          },
        };
      },
      edge,
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap.get('edge1');
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('label');
      expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('blue');
      expect(edgeItem.shapeMap.labelBackgroundShape.attributes.fill).toBe(
        'white',
      );
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

describe('state', () => {
  it('edge state selected', (done) => {
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

  it('edge state active', (done) => {
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
        active: {
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
      expect(graph.findIdByState('edge', 'active').length).toBe(0);
      graph.setItemState('edge1', 'active', true);
      expect(graph.findIdByState('edge', 'active').length).toBe(1);
      expect(graph.findIdByState('edge', 'active')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'active', false);
      expect(graph.findIdByState('edge', 'active').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'active', true);
      expect(graph.findIdByState('edge', 'active').length).toBe(2);
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
      graph.setItemState('edge1', 'active', false);
      expect(graph.findIdByState('edge', 'active').length).toBe(1);
      expect(graph.findIdByState('edge', 'active')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'active', false);
      expect(graph.findIdByState('edge', 'active').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      graph.setItemState(['edge2', 'edge1'], ['active', 'highlight'], true);
      expect(graph.findIdByState('edge', 'active').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from active and highlight
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
      expect(graph.findIdByState('edge', 'active').length).toBe(0);
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

  it('edge state highlight', (done) => {
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
        highlight: {
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
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      graph.setItemState('edge1', 'highlight', true);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(1);
      expect(graph.findIdByState('edge', 'highlight')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      graph.setItemState('edge1', 'highlight', false);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'highlight', true);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .stroke,
      ).toBe('#00f');
      graph.setItemState('edge1', 'highlight', false);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(1);
      expect(graph.findIdByState('edge', 'highlight')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'highlight', false);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      graph.setItemState(['edge2', 'edge1'], ['highlight', 'highlight'], true);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from highlight and highlight
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
      expect(graph.findIdByState('edge', 'highlight').length).toBe(0);
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

  it('edge state inactive', (done) => {
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
        inactive: {
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
      expect(graph.findIdByState('edge', 'inactive').length).toBe(0);
      graph.setItemState('edge1', 'inactive', true);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(1);
      expect(graph.findIdByState('edge', 'inactive')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'inactive', false);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'inactive', true);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(2);
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
      graph.setItemState('edge1', 'inactive', false);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(1);
      expect(graph.findIdByState('edge', 'inactive')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'inactive', false);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      graph.setItemState(['edge2', 'edge1'], ['inactive', 'highlight'], true);
      expect(graph.findIdByState('edge', 'inactive').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from inactive and highlight
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
      expect(graph.findIdByState('edge', 'inactive').length).toBe(0);
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

  it('edge state disable', (done) => {
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
        disable: {
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
      expect(graph.findIdByState('edge', 'disable').length).toBe(0);
      graph.setItemState('edge1', 'disable', true);
      expect(graph.findIdByState('edge', 'disable').length).toBe(1);
      expect(graph.findIdByState('edge', 'disable')[0]).toBe('edge1');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(2);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .stroke,
      ).toBe('#0f0');
      graph.setItemState('edge1', 'disable', false);
      expect(graph.findIdByState('edge', 'disable').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      // set multiple edges state
      graph.setItemState(['edge1', 'edge2'], 'disable', true);
      expect(graph.findIdByState('edge', 'disable').length).toBe(2);
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
      graph.setItemState('edge1', 'disable', false);
      expect(graph.findIdByState('edge', 'disable').length).toBe(1);
      expect(graph.findIdByState('edge', 'disable')[0]).toBe('edge2');
      expect(
        graph.itemController.itemMap.get('edge1').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);
      graph.setItemState(['edge1', 'edge2'], 'disable', false);
      expect(graph.findIdByState('edge', 'disable').length).toBe(0);
      expect(
        graph.itemController.itemMap.get('edge2').shapeMap.keyShape.style
          .lineWidth,
      ).toBe(1);

      graph.setItemState(['edge2', 'edge1'], ['disable', 'highlight'], true);
      expect(graph.findIdByState('edge', 'disable').length).toBe(2);
      expect(graph.findIdByState('edge', 'highlight').length).toBe(2);
      // should be merged styles from disable and highlight
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
      expect(graph.findIdByState('edge', 'disable').length).toBe(0);
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
});
