// @ts-nocheck

import { clone } from '@antv/util';
import { BuiltinTheme } from '../../src/constant';
import G6, { GraphData, IGraph } from '../../src/index';
const container = document.createElement('div');
document.querySelector('body').appendChild(container);

const data: GraphData = {
  nodes: [
    { id: 'node1', data: { x: 100, y: 200, dt: 'a' } },
    { id: 'node2', data: { x: 200, y: 250, dt: 'b' } },
    { id: 'node3', data: { x: 300, y: 200, dt: 'c' } },
    { id: 'node4', data: { x: 300, y: 250, } },
  ],
  edges: [
    { id: 'edge1', source: 'node1', target: 'node2', data: {} },
    { id: 'edge2', source: 'node1', target: 'node3', data: {} },
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
        type: 'grid'
      },
      node: {
        labelShape: {
          text: {
            fields: ['id'],
            formatter: model => model.id
          }
        }
      },
    });
    graph.on('afterlayout', () => {
      const node = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape, labelShape: nodeLabelShape } = node.shapeMap;
      expect(nodeKeyShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.keyShape.fill);
      expect(nodeLabelShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.labelShape.fill);

      // set state, should response with default theme state style
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.keyShape.fill);
      expect(nodeLabelShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.labelShape.fill);
      graph.clearItemState('node1');
      expect(nodeKeyShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.keyShape.fill);
      expect(nodeLabelShape.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.labelShape.fill);

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
        type: 'grid'
      },
      node: {
        labelShape: {
          text: {
            fields: ['dt'],
            formatter: model => model.data.dt
          }
        }
      },
      theme: {
        type: 'spec',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: { 'a': '#f00', 'b': '#0f0', 'c': '#00f'},
            getStyleSets: palette => {
              const styleSetsMap = {};
              Object.keys(palette).forEach(dataType => {
                const color = palette[dataType];
                styleSetsMap[dataType] = {
                  default: {
                    keyShape: { fill: color },
                    labelShape: { fill: color }
                  },
                  state1: {
                    keyShape: { fill: '#000' },
                  },
                  state2: {
                    keyShape: { stroke: '#f00' },
                  },
                  state3: {
                    keyShape: { fill: '#ff0' },
                  }
                }
              });
              return styleSetsMap;
            }
          }
        }
      }
    });
    graph.on('afterlayout', () => {
      // canvas style
      expect(graph.backgroundCanvas.getContextService().getDomElement().style.backgroundColor).toBe('rgb(255, 255, 255)'); // = rgb format of BuiltinTheme.light.canvas.backgroundColor

      const node1 = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape1, labelShape: nodeLabelShape1 } = node1.shapeMap;
      expect(nodeKeyShape1.style.fill).toBe('#f00');
      expect(nodeLabelShape1.style.fill).toBe('#f00');
      const node2 = graph.itemController.itemMap['node2'];
      const { keyShape: nodeKeyShape2, labelShape: nodeLabelShape2 } = node2.shapeMap;
      expect(nodeKeyShape2.style.fill).toBe('#0f0');
      expect(nodeLabelShape2.style.fill).toBe('#0f0');
      const node3 = graph.itemController.itemMap['node3'];
      const { keyShape: nodeKeyShape3, labelShape: nodeLabelShape3 } = node3.shapeMap;
      expect(nodeKeyShape3.style.fill).toBe('#00f');
      expect(nodeLabelShape3.style.fill).toBe('#00f');
      // node4 has no mapped palette, buitin theme take effects
      const node4 = graph.itemController.itemMap['node4'];
      const { keyShape: nodeKeyShape4, labelShape: nodeLabelShape4 } = node4.shapeMap;
      expect(nodeKeyShape4.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.keyShape.fill);
      expect(nodeLabelShape4.style.fill).toBe(BuiltinTheme.light.node.styles[0].default.labelShape.fill);

      // update dataType
      graph.updateData('node', {
        id: 'node1',
        data: {
          dt: 'b'
        }
      });
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');

      // setState with state in builtin theme
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.keyShape.fill);
      expect(nodeLabelShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.labelShape.fill);

      graph.setItemState('node1', 'state1', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeLabelShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.labelShape.fill);
      graph.setItemState('node1', 'state2', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');
      graph.setItemState('node1', 'state3', true);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');

      // clear one state
      graph.clearItemState('node1', ['state2']);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe(BuiltinTheme.light.node.styles[0].default.keyShape.stroke);

      // clear all states
      graph.clearItemState('node1');
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');

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
        type: 'grid'
      },
      node: {
        labelShape: {
          text: {
            fields: ['id'],
            formatter: model => model.id
          }
        }
      },
      theme: {
        type: 'spec',
        base: 'light',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: ['#f00', '#0f0', '#00f'],
            getStyleSets: palette => {
              return palette.map(color => ({
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
                }
              }));
            }
          }
        }
      }
    });
    console.log('data', data, BuiltinTheme.light);
    graph.on('afterlayout', () => {
      const node1 = graph.itemController.itemMap['node1'];
      const { keyShape: nodeKeyShape1, labelShape: nodeLabelShape1 } = node1.shapeMap;
      expect(nodeKeyShape1.style.fill).toBe('#f00');
      expect(nodeLabelShape1.style.fill).toBe('#f00');
      const node2 = graph.itemController.itemMap['node2'];
      const { keyShape: nodeKeyShape2, labelShape: nodeLabelShape2 } = node2.shapeMap;
      expect(nodeKeyShape2.style.fill).toBe('#0f0');
      expect(nodeLabelShape2.style.fill).toBe('#0f0');
      const node3 = graph.itemController.itemMap['node3'];
      const { keyShape: nodeKeyShape3, labelShape: nodeLabelShape3 } = node3.shapeMap;
      expect(nodeKeyShape3.style.fill).toBe('#00f');
      expect(nodeLabelShape3.style.fill).toBe('#00f');
      // node4 has no mapped palette, buitin theme take effects
      const node4 = graph.itemController.itemMap['node4'];
      const { keyShape: nodeKeyShape4, labelShape: nodeLabelShape4 } = node4.shapeMap;
      // different from map, undefined data type value will be regarded as a value to find corresponding color in palette. That is because g6 doesn't know if the value undefined is the real value or not
      expect(nodeKeyShape4.style.fill).toBe('#f00');
      expect(nodeLabelShape4.style.fill).toBe('#f00');

      // update dataType
      graph.updateData('node', {
        id: 'node1',
        data: {
          dt: 'b'
        }
      });
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');

      // setState with state in builtin theme
      graph.setItemState('node1', 'selected', true);
      expect(nodeKeyShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.keyShape.fill);
      expect(nodeLabelShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.labelShape.fill);

      graph.setItemState('node1', 'state1', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeLabelShape1.style.fill).toBe(BuiltinTheme.light.node.styles[0].selected.labelShape.fill);
      graph.setItemState('node1', 'state2', true);
      expect(nodeKeyShape1.style.fill).toBe('#000');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');
      graph.setItemState('node1', 'state3', true);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe('#f00');

      // clear one state
      graph.clearItemState('node1', ['state2']);
      expect(nodeKeyShape1.style.fill).toBe('#ff0');
      expect(nodeKeyShape1.style.stroke).toBe(BuiltinTheme.light.node.styles[0].default.keyShape.stroke);

      // clear all states
      graph.clearItemState('node1');
      expect(nodeKeyShape1.style.fill).toBe('#0f0');
      expect(nodeLabelShape1.style.fill).toBe('#0f0');
      graph.destroy();
      done();
    });
  });
  // TODO: edge tests
});
