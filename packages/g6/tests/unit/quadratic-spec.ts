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
        type: 'quadratic'
      }
    }
  ]
};

const edge: ((data: any) => any) = (edgeInnerModel: any) => {

  const { id, data } = edgeInnerModel
  return {
    id,
    data: {
      keyShape: {
        controlPoints: [0, 0],
        curvePosition: 0.5,
        curveOffset: [10, 10],
        stroke: 'blue'
      },
      // iconShape: {
      //    // img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      //     text: 'label',
      //     fill: 'blue'
      // },
      labelShape: {
        text: 'label',
        position: 'middle',
        fill: 'blue'
      },
      labelBackgroundShape: {
        fill: 'white'
      },
      ...data,
    }
  }
}

describe('edge item', () => {
  it('new graph with two nodes and one edge', (done) => {
    graph = new G6.Graph({
      container,
      width,
      height,
      data,
      type: 'graph',
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
              r: 16
            },
          }
        }
      },
      edge,
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap['edge1'];
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape.attributes.text).toBe('label');
      expect(edgeItem.shapeMap.labelShape.attributes.position).toBe('middle');
      expect(edgeItem.shapeMap.labelShape.attributes.fill).toBe('blue');
      expect(edgeItem.labelBackgroundShape.attributes.fill).toBe('white');
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
    const edgeItem = graph.itemController.itemMap['edge1'];
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
    const edgeItem = graph.itemController.itemMap['edge1'];
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

