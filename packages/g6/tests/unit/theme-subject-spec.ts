// @ts-nocheck

import G6, { GraphData, IGraph } from '../../src/index';
import LightTheme from '../../src/stdlib/theme/light';

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
  it('subject theme solver', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
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
      theme: {
        type: 'subject',
        base: 'light',
        baseColor: '#fff',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: ['#f00', '#0f0', '#00f'],
          },
          edge: {
            dataTypeField: 'edt',
            palette: ['#f00', '#0f0'],
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      let node = graph.itemController.itemMap.get('node1');
      let nodeKeyShape = node.shapeMap.keyShape;
      let { fill: keyShapeFill, stroke: keyShapeStroke } = nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(255, 230, 230)');
      expect(keyShapeStroke).toBe('#f00');

      node = graph.itemController.itemMap.get('node2');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(230, 255, 230)');
      expect(keyShapeStroke).toBe('#0f0');

      node = graph.itemController.itemMap.get('node3');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(230, 230, 255)');
      expect(keyShapeStroke).toBe('#00f');

      graph.setItemState('node3', 'selected', true);
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      const { lineWidth: keyShapeLineWidth, shadowColor: keyShapeShadowColor } =
        nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(230, 230, 255)');
      expect(keyShapeStroke).toBe('#00f');
      expect(keyShapeLineWidth).toBe(4);
      expect(keyShapeShadowColor).toBe('#00f');

      let edge = graph.itemController.itemMap.get('edge1');
      let edgeKeyShape = edge.shapeMap.keyShape;
      let { stroke: edgeKeyShapeStroke } = edgeKeyShape.style;
      expect(edgeKeyShapeStroke).toBe('rgb(255, 153, 153)');

      graph.setItemState('edge1', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('#f00');
      expect(edgeKeyShape.style.lineWidth).toBe(2);

      // edge without dataType, follow the first pallete
      edge = graph.itemController.itemMap.get('edge3');
      edgeKeyShape = edge.shapeMap.keyShape;
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('rgb(255, 153, 153)');

      graph.setItemState('edge3', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('#f00');
      expect(edgeKeyShape.style.lineWidth).toBe(2);

      graph.destroy();
      done();
    });
  });
  it('subject theme solver with map spec', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
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
      theme: {
        type: 'subject',
        base: 'light',
        baseColor: '#fff',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: {
              a: '#f00',
              b: '#0f0',
              c: '#00f',
            },
          },
          edge: {
            dataTypeField: 'edt',
            palette: {
              1: '#f00',
              2: '#0f0',
            },
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      let node = graph.itemController.itemMap.get('node1');
      let nodeKeyShape = node.shapeMap.keyShape;
      let { fill: keyShapeFill, stroke: keyShapeStroke } = nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(255, 230, 230)');
      expect(keyShapeStroke).toBe('#f00');

      node = graph.itemController.itemMap.get('node2');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(230, 255, 230)');
      expect(keyShapeStroke).toBe('#0f0');

      node = graph.itemController.itemMap.get('node3');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(230, 230, 255)');
      expect(keyShapeStroke).toBe('#00f');

      graph.setItemState('node3', 'selected', true);
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      const { lineWidth: keyShapeLineWidth, shadowColor: keyShapeShadowColor } =
        nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(230, 230, 255)');
      expect(keyShapeStroke).toBe('#00f');
      expect(keyShapeLineWidth).toBe(4);
      expect(keyShapeShadowColor).toBe('#00f');

      // node without dataType, follow the default(light) pallete
      node = graph.itemController.itemMap.get('node4');
      const { keyShape } = node.shapeMap;
      keyShapeStroke = keyShape.style.stroke;
      expect(keyShapeStroke).toBe(
        LightTheme.node.styles[0].default.keyShape.stroke,
      );

      graph.setItemState('node4', 'selected', true);
      keyShapeStroke = keyShape.style.stroke;
      expect(keyShapeStroke).toBe(
        LightTheme.node.styles[0].selected.keyShape.stroke,
      );
      expect(keyShape.style.lineWidth).toBe(
        LightTheme.node.styles[0].selected.keyShape.lineWidth,
      );

      let edge = graph.itemController.itemMap.get('edge1');
      let { keyShape: edgeKeyShape } = edge.shapeMap;
      let { stroke: edgeKeyShapeStroke } = edgeKeyShape.style;
      expect(edgeKeyShapeStroke).toBe('rgb(255, 153, 153)');

      graph.setItemState('edge1', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('#f00');
      expect(edgeKeyShape.style.lineWidth).toBe(2);

      // edge without dataType, follow the default(light) pallete
      edge = graph.itemController.itemMap.get('edge3');
      edgeKeyShape = edge.shapeMap.keyShape;
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe(
        LightTheme.edge.styles[0].default.keyShape.stroke,
      );

      graph.setItemState('edge3', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe(
        LightTheme.edge.styles[0].selected.keyShape.stroke,
      );
      expect(edgeKeyShape.style.lineWidth).toBe(
        LightTheme.edge.styles[0].selected.keyShape.lineWidth,
      );

      graph.destroy();
      done();
    });
  });
  it('subject theme solver with dark base', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
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
      theme: {
        type: 'subject',
        base: 'dark',
        baseColor: '#777',
        specification: {
          node: {
            dataTypeField: 'dt',
            palette: ['#f00', '#0f0', '#00f'],
          },
          edge: {
            dataTypeField: 'edt',
            palette: ['#f00', '#0f0'],
          },
        },
      },
    });
    graph.on('afterlayout', () => {
      let node = graph.itemController.itemMap.get('node1');
      let nodeKeyShape = node.shapeMap.keyShape;
      let { fill: keyShapeFill, stroke: keyShapeStroke } = nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(146, 95, 95)');
      expect(keyShapeStroke).toBe('rgb(228, 24, 24)');

      node = graph.itemController.itemMap.get('node2');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(95, 146, 95)');
      expect(keyShapeStroke).toBe('rgb(24, 228, 24)');

      node = graph.itemController.itemMap.get('node3');
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      expect(keyShapeFill).toBe('rgb(95, 95, 146)');
      expect(keyShapeStroke).toBe('rgb(24, 24, 228)');

      graph.setItemState('node3', 'selected', true);
      nodeKeyShape = node.shapeMap.keyShape;
      keyShapeFill = nodeKeyShape.style.fill;
      keyShapeStroke = nodeKeyShape.style.stroke;
      const { lineWidth: keyShapeLineWidth, shadowColor: keyShapeShadowColor } =
        nodeKeyShape.style;
      expect(keyShapeFill).toBe('rgb(95, 95, 146)');
      expect(keyShapeStroke).toBe('#00f');
      expect(keyShapeLineWidth).toBe(4);
      expect(keyShapeShadowColor).toBe('#00f');

      let edge = graph.itemController.itemMap.get('edge1');
      let { keyShape: edgeKeyShape } = edge.shapeMap;
      let { stroke: edgeKeyShapeStroke } = edgeKeyShape.style;
      expect(edgeKeyShapeStroke).toBe('rgb(228, 24, 24)');

      graph.setItemState('edge1', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('#f00');
      expect(edgeKeyShape.style.lineWidth).toBe(2);

      // edge without dataType, follow the first pallete
      edge = graph.itemController.itemMap.get('edge3');
      edgeKeyShape = edge.shapeMap.keyShape;
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('rgb(228, 24, 24)');

      graph.setItemState('edge3', 'selected', true);
      edgeKeyShapeStroke = edgeKeyShape.style.stroke;
      expect(edgeKeyShapeStroke).toBe('#f00');
      expect(edgeKeyShape.style.lineWidth).toBe(2);

      graph.destroy();
      done();
    });
  });
});
