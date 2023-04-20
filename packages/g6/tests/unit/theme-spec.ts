// @ts-nocheck

import { clone } from '@antv/util';
import G6, { GraphData, IGraph } from '../../src/index';
import { CircleNode } from '../../src/stdlib/item/node';
import { LineEdge } from '../../src/stdlib/item/edge';
import LightTheme from '../../src/stdlib/theme/light';
import { extend } from '../../src/util/extend';
import { upsertShape } from '../../src/util/shape';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const data: GraphData = {
  nodes: [
    { id: 'node1', data: { x: 100, y: 200, dt: 'a' } },
    { id: 'node2', data: { x: 200, y: 250, dt: 'b' } },
    { id: 'node3', data: { x: 300, y: 200, dt: 'c' } },
    { id: 'node4', data: { x: 300, y: 250 } },
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: { edt: '1' } },
    { id: 'edge2', source: 'node1', target: 'node3', data: { edt: '2' } },
    { id: 'edge3', source: 'node1', target: 'node4', data: {} },
  ],
};

describe('theme', () => {
  let graph: IGraph<any>;
  it('graph with default theme(spec)', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'grid',
      },
      node: {
        labelShape: {
          text: {
            fields: ['id'],
            formatter: (model) => model.id,
          },
        },
      },
      edge: {
        labelShape: {
          text: {
            fields: ['edt'],
            formatter: (model) => model.data.edt,
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      const node = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape, labelShape: nodeLabelShape } =
        node.shapeMap;
      expect(nodeKeyShape.style.fill).toBe(
        LightTheme.node.styles[0].default.keyShape.fill,
      );
      expect(nodeLabelShape.style.fontWeight).toBe(
        LightTheme.node.styles[0].default.labelShape.fontWeight,
      );
      const edge = graph.itemController.itemMap['edge1'];
      const { keyShape: edgeKeyShape, labelShape: edgeLabelShape } =
        edge.shapeMap;
      expect(edgeKeyShape.style.stroke).toBe(
        LightTheme.edge.styles[0].default.keyShape.stroke,
      );
      expect(edgeLabelShape.style.fontWeight).toBe(
        LightTheme.edge.styles[0].default.labelShape.fontWeight,
      );

      // set state, should response with default theme state style
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape.style.fill).toBe(
        LightTheme.node.styles[0].selected.keyShape.fill,
      );
      expect(nodeLabelShape.style.fontWeight).toBe(
        LightTheme.node.styles[0].selected.labelShape.fontWeight,
      );
      graph.clearItemState('node1');
      expect(nodeKeyShape.style.fill).toBe(
        LightTheme.node.styles[0].default.keyShape.fill,
      );
      expect(nodeLabelShape.style.fontWeight).toBe(
        LightTheme.node.styles[0].default.labelShape.fontWeight,
      );

      graph.setItemState('edge1', 'selected', true);
      expect(edgeKeyShape.style.stroke).toBe(
        LightTheme.edge.styles[0].selected.keyShape.stroke,
      );
      expect(edgeKeyShape.style.lineWidth).toBe(
        LightTheme.edge.styles[0].selected.keyShape.lineWidth,
      );
      console.log(
        'xssx',
        edgeLabelShape.style.fontWeight,
        LightTheme.edge.styles[0].default.labelShape.fontWeight,
      );
      expect(edgeLabelShape.style.fill).toBe(
        LightTheme.edge.styles[0].default.labelShape.fill,
      ); // no change in theme def

      graph.destroy();
      done();
    });
  });
  it('graph with spec theme and custom specification with object palette', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: clone(data),
      layout: {
        type: 'grid',
      },
      node: {
        labelShape: {
          text: {
            fields: ['dt'],
            formatter: (model) => model.data.dt,
          },
        },
      },
      edge: {
        labelShape: {
          text: {
            fields: ['edt'],
            formatter: (model) => model.data.edt,
          },
        },
      },
      theme: {
        type: 'spec',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: { a: '#f00', b: '#0f0', c: '#00f' },
            getStyleSets: (palette) => {
              const styleSetsMap = {};
              Object.keys(palette).forEach((dataType) => {
                const color = palette[dataType];
                styleSetsMap[dataType] = {
                  default: {
                    keyShape: { fill: color },
                    labelShape: { fill: color },
                  },
                  state1: {
                    keyShape: { fill: '#000' },
                  },
                  state2: {
                    keyShape: { stroke: '#f00' },
                  },
                  state3: {
                    keyShape: { fill: '#ff0' },
                  },
                };
              });
              return styleSetsMap;
            },
          },
          edge: {
            dataTypeField: 'edt',
            palette: { '1': '#f00', '2': '#0f0' },
            getStyleSets: (palette) => {
              const styleSetsMap = {};
              Object.keys(palette).forEach((dataType) => {
                const color = palette[dataType];
                styleSetsMap[dataType] = {
                  default: {
                    keyShape: { stroke: color },
                    labelShape: { fill: color },
                  },
                  state1: {
                    keyShape: { stroke: '#000' },
                  },
                  state2: {
                    keyShape: { lineDash: [5, 5] },
                  },
                  state3: {
                    keyShape: { stroke: '#ff0' },
                  },
                };
              });
              return styleSetsMap;
            },
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      // canvas style
      expect(
        graph.backgroundCanvas.getContextService().getDomElement().style
          .backgroundColor,
      ).toBe('rgb(255, 255, 255)'); // = rgb format of LightTheme.canvas.backgroundColor

      const node1 = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape1, labelShape: nodeLabelShape1 } =
        node1.shapeMap;
      expect(nodeKeyShape1.style.fill).toBe('#f00');
      expect(nodeLabelShape1.style.fill).toBe('#f00');
      const node2 = graph.itemController.itemMap['node2'];
      const { keyShape: nodeKeyShape2, labelShape: nodeLabelShape2 } =
        node2.shapeMap;
      expect(nodeKeyShape2.style.fill).toBe('#0f0');
      expect(nodeLabelShape2.style.fill).toBe('#0f0');
      const node3 = graph.itemController.itemMap['node3'];
      const { keyShape: nodeKeyShape3, labelShape: nodeLabelShape3 } =
        node3.shapeMap;
      expect(nodeKeyShape3.style.fill).toBe('#00f');
      expect(nodeLabelShape3.style.fill).toBe('#00f');
      // node4 has no mapped palette, buitin theme take effects
      const node4 = graph.itemController.itemMap['node4'];
      const { keyShape: nodeKeyShape4, labelShape: nodeLabelShape4 } =
        node4.shapeMap;
      expect(nodeKeyShape4.style.fill).toBe(
        LightTheme.node.styles[0].default.keyShape.fill,
      );
      expect(nodeLabelShape4.style.fontWeight).toBe(
        LightTheme.node.styles[0].default.labelShape.fontWeight,
      );

      // edges
      const edge1 = graph.itemController.itemMap['edge1'];
      const { keyShape: edgeKeyShape1, labelShape: edgeLabelShape1 } =
        edge1.shapeMap;
      expect(edgeKeyShape1.style.stroke).toBe('#f00');
      expect(edgeLabelShape1.style.fill).toBe('#f00');
      const edge2 = graph.itemController.itemMap['edge2'];
      const { keyShape: edgeKeyShape2, labelShape: edgeLabelShape2 } =
        edge2.shapeMap;
      expect(edgeKeyShape2.style.stroke).toBe('#0f0');
      expect(edgeLabelShape2.style.fill).toBe('#0f0');
      // edge3 has no mapped palette, buitin theme take effects
      const edge3 = graph.itemController.itemMap['edge3'];
      const { keyShape: edgeKeyShape4, labelShape: edgeLabelShape4 } =
        edge3.shapeMap;
      expect(edgeKeyShape4.style.stroke).toBe(
        LightTheme.edge.styles[0].default.keyShape.stroke,
      );
      expect(edgeLabelShape4.style.fontWeight).toBe(
        LightTheme.edge.styles[0].default.labelShape.fontWeight,
      );

      // update node dataType
      graph.updateData('node', {
        id: 'node1',
        data: {
          dt: 'b',
        },
      });
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');

      // update edge dataType
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          edt: '2',
        },
      });
      expect(edgeKeyShape1.style.stroke).toBe('#0f0');
      expect(edgeLabelShape1.style.fill).toBe('#0f0');

      // node setState with state in builtin theme
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape1.style.fill).toBe(
        LightTheme.node.styles[0].selected.keyShape.fill,
      );
      expect(nodeLabelShape1.style.fontWeight).toBe(
        LightTheme.node.styles[0].selected.labelShape.fontWeight,
      );
      // edge setState with state in builtin theme
      graph.setItemState('edge1', 'selected', true);
      expect(edgeKeyShape1.style.stroke).toBe(
        LightTheme.edge.styles[0].selected.keyShape.stroke,
      );
      expect(edgeLabelShape1.style.fill).toBe('#0f0'); // not assigned in selected theme
      expect(edgeLabelShape1.style.fontWeight).toBe(
        LightTheme.edge.styles[0].selected.labelShape.fontWeight,
      );

      // node setState with state in configured spec
      graph.setItemState('node1', 'state1', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeLabelShape1.style.fontWeight).toBe(
        LightTheme.node.styles[0].selected.labelShape.fontWeight,
      );
      graph.setItemState('node1', 'state2', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');
      graph.setItemState('node1', 'state3', true);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');

      // edge setState with state in configured spec
      graph.setItemState('edge1', 'state1', true);
      expect(edgeKeyShape1.style.stroke).toBe('#000');
      expect(edgeKeyShape1.style.lineWidth).toBe(2);
      expect(edgeLabelShape1.style.fontWeight).toBe(
        LightTheme.edge.styles[0].selected.labelShape.fontWeight,
      );
      graph.setItemState('edge1', 'state2', true);
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.stroke).toBe('#000');
      expect(edgeKeyShape1.style.lineWidth).toBe(2);
      graph.setItemState('edge1', 'state3', true);
      expect(edgeKeyShape1.style.stroke).toBe('#ff0');
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.lineWidth).toBe(2);

      // clear node's one state
      graph.clearItemState('node1', ['state2']);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe(
        LightTheme.node.styles[0].default.keyShape.stroke,
      );
      // clear edge's one state, state1 + state3 is kept
      graph.clearItemState('edge1', ['state2']);
      expect(edgeKeyShape1.style.stroke).toBe('#ff0');
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.lineWidth).toBe(2);

      // clear all states
      graph.clearItemState('node1');
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');
      graph.clearItemState('edge1');
      expect(edgeKeyShape1.style.stroke).toBe('#0f0');
      expect(edgeLabelShape1.style.fill).toBe('#0f0');

      graph.destroy();
      done();
    });
  });
  it('graph with spec theme and custom specification with array palette', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: clone(data),
      layout: {
        type: 'grid',
      },
      node: {
        labelShape: {
          text: {
            fields: ['dt'],
            formatter: (model) => model.data.dt,
          },
        },
      },
      edge: {
        labelShape: {
          text: {
            fields: ['edt'],
            formatter: (model) => model.data.edt,
          },
        },
      },
      theme: {
        type: 'spec',
        base: 'light',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: ['#f00', '#0f0', '#00f'],
            getStyleSets: (palette) => {
              return palette.map((color) => ({
                default: {
                  keyShape: { fill: color },
                  labelShape: { fill: color },
                },
                state1: {
                  keyShape: { fill: '#000' },
                },
                state2: {
                  keyShape: { stroke: '#f00' },
                },
                state3: {
                  keyShape: { fill: '#ff0' },
                },
              }));
            },
          },
          edge: {
            dataTypeField: 'edt',
            palette: ['#f00', '#0f0'],
            getStyleSets: (palette) => {
              return palette.map((color) => ({
                default: {
                  keyShape: { stroke: color },
                  labelShape: { fill: color },
                },
                state1: {
                  keyShape: { stroke: '#000' },
                },
                state2: {
                  keyShape: { lineDash: [5, 5] },
                },
                state3: {
                  keyShape: { stroke: '#ff0' },
                },
              }));
            },
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      const node1 = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape1, labelShape: nodeLabelShape1 } =
        node1.shapeMap;
      expect(nodeKeyShape1.style.fill).toBe('#f00');
      expect(nodeLabelShape1.style.fill).toBe('#f00');
      const node2 = graph.itemController.itemMap['node2'];
      const { keyShape: nodeKeyShape2, labelShape: nodeLabelShape2 } =
        node2.shapeMap;
      expect(nodeKeyShape2.style.fill).toBe('#0f0');
      expect(nodeLabelShape2.style.fill).toBe('#0f0');
      const node3 = graph.itemController.itemMap['node3'];
      const { keyShape: nodeKeyShape3, labelShape: nodeLabelShape3 } =
        node3.shapeMap;
      expect(nodeKeyShape3.style.fill).toBe('#00f');
      expect(nodeLabelShape3.style.fill).toBe('#00f');
      // node4 has no mapped palette, buitin theme take effects
      const node4 = graph.itemController.itemMap['node4'];
      const { keyShape: nodeKeyShape4, labelShape: nodeLabelShape4 } =
        node4.shapeMap;
      // different from map, undefined data type value will be regarded as a value to find corresponding color in palette. That is because g6 doesn't know if the value undefined is the real value or not
      expect(nodeKeyShape4.style.fill).toBe('#f00');
      expect(nodeLabelShape4.style.fill).toBe('#f00');

      // edges
      const edge1 = graph.itemController.itemMap['edge1'];
      const { keyShape: edgeKeyShape1, labelShape: edgeLabelShape1 } =
        edge1.shapeMap;
      expect(edgeKeyShape1.style.stroke).toBe('#f00');
      expect(edgeLabelShape1.style.fill).toBe('#f00');
      const edge2 = graph.itemController.itemMap['edge2'];
      const { keyShape: edgeKeyShape2, labelShape: edgeLabelShape2 } =
        edge2.shapeMap;
      expect(edgeKeyShape2.style.stroke).toBe('#0f0');
      expect(edgeLabelShape2.style.fill).toBe('#0f0');
      // edge3 has no mapped palette, buitin theme take effects
      const edge3 = graph.itemController.itemMap['edge3'];
      const { keyShape: edgeKeyShape3 } = edge3.shapeMap;
      expect(edgeKeyShape3.style.stroke).toBe('#f00');

      // update node dataType
      graph.updateData('node', {
        id: 'node1',
        data: {
          dt: 'b',
        },
      });
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');

      // update edge dataType
      graph.updateData('edge', {
        id: 'edge1',
        data: {
          edt: '2',
        },
      });
      expect(edgeKeyShape1.style.stroke).toBe('#0f0');
      expect(edgeLabelShape1.style.fill).toBe('#0f0');

      // node setState with state in builtin theme
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape1.style.fill).toBe(
        LightTheme.node.styles[0].selected.keyShape.fill,
      );
      expect(nodeLabelShape1.style.fontWeight).toBe(
        LightTheme.node.styles[0].selected.labelShape.fontWeight,
      );
      // edge setState with state in builtin theme
      graph.setItemState('edge1', 'selected', true);
      expect(edgeKeyShape1.style.stroke).toBe(
        LightTheme.edge.styles[0].selected.keyShape.stroke,
      );
      expect(edgeLabelShape1.style.fill).toBe('#0f0'); // not assigned in selected theme
      expect(edgeLabelShape1.style.fontWeight).toBe(
        LightTheme.edge.styles[0].selected.labelShape.fontWeight,
      );

      // node setState with state in configured spec
      graph.setItemState('node1', 'state1', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeLabelShape1.style.fontWeight).toBe(
        LightTheme.node.styles[0].selected.labelShape.fontWeight,
      );
      graph.setItemState('node1', 'state2', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');
      graph.setItemState('node1', 'state3', true);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');

      // edge setState with state in configured spec
      graph.setItemState('edge1', 'state1', true);
      expect(edgeKeyShape1.style.stroke).toBe('#000');
      expect(edgeKeyShape1.style.lineWidth).toBe(2);
      expect(edgeLabelShape1.style.fontWeight).toBe(
        LightTheme.edge.styles[0].selected.labelShape.fontWeight,
      );
      graph.setItemState('edge1', 'state2', true);
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.stroke).toBe('#000');
      expect(edgeKeyShape1.style.lineWidth).toBe(2);
      graph.setItemState('edge1', 'state3', true);
      expect(edgeKeyShape1.style.stroke).toBe('#ff0');
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.lineWidth).toBe(2);

      // clear node's one state
      graph.clearItemState('node1', ['state2']);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe(
        LightTheme.node.styles[0].default.keyShape.stroke,
      );

      // clear edge's one state, state1 + state3 is kept
      graph.clearItemState('edge1', ['state2']);
      expect(edgeKeyShape1.style.stroke).toBe('#ff0');
      expect(JSON.stringify(edgeKeyShape1.style.lineDash)).toBe(
        JSON.stringify([5, 5]),
      );
      expect(edgeKeyShape1.style.lineWidth).toBe(2);

      // clear all states
      graph.clearItemState('node1');
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');
      graph.clearItemState('edge1');
      expect(edgeKeyShape1.style.stroke).toBe('#0f0');
      expect(edgeLabelShape1.style.fill).toBe('#0f0');
      graph.destroy();
      done();
    });
  });
  it('theme on custom node and custom edge', (done) => {
    class CustomNode extends CircleNode {
      public defaultStyles = {
        keyShape: {
          r: 25,
          x: 0,
          y: 0,
        },
      };
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
        const { labelShape: labelStyle } = this.mergedStyles;
        const labelShape = upsertShape(
          'text',
          'labelShape',
          {
            ...labelStyle,
            text: model.id,
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
        'theme-spec-custom-node': CustomNode,
      },
      edges: {
        'theme-spec-custom-edge': CustomEdge,
      },
    });
    graph = new CustomGraph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data,
      layout: {
        type: 'grid',
      },
      node: {
        type: 'theme-spec-custom-node',
        labelShape: {
          text: {
            fields: ['id'],
            formatter: (model) => model.id,
          },
        },
      },
      edge: {
        type: 'theme-spec-custom-edge',
        labelShape: {
          text: {
            fields: ['edt'],
            formatter: (model) => model.data.edt,
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      // custom node's and edge's keyShape follow the light theme
      const node = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape, labelShape: nodeLabelShape } =
        node.shapeMap;
      expect(nodeKeyShape.style.fill).toBe(
        LightTheme.node.styles[0].default.keyShape.fill,
      );
      expect(nodeLabelShape.style.fontWeight).toBe(
        LightTheme.node.styles[0].default.labelShape.fontWeight,
      );
      const edge = graph.itemController.itemMap['edge1'];
      const { keyShape: edgeKeyShape, labelShape: edgeLabelShape } =
        edge.shapeMap;
      expect(edgeKeyShape.style.stroke).toBe(
        LightTheme.edge.styles[0].default.keyShape.stroke,
      );
      expect(edgeLabelShape.style.fontWeight).toBe(
        LightTheme.edge.styles[0].default.labelShape.fontWeight,
      );
      graph.destroy();
      done();
    });
  });
});
