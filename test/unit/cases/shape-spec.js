const Graph = require('../../../src/graph');
const Shape = require('../../../src/shape/');
const data = require('../../fixtures/sample-graph-data.json');
const expect = require('chai').expect;
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'cases/shape-spec.js');
document.body.appendChild(div);
// graph.zoom({ x: 10, y: 10 }, 4);
describe('shape user cases test', () => {
  it('default shape', () => {
    Shape.registerNode('customNode', {
      draw(item) {
        return item.group.addShape('circle', {
          attrs: {
            x: 10,
            y: 10,
            r: 10,
            fill: 'red'
          }
        });
      }
    });
    Shape.registerEdge('customEdge', {
      draw(item) {
        return item.group.addShape('line', {
          attrs: {
            x1: 10,
            y1: 10,
            x2: 50,
            y2: 50,
            stroke: 'red'
          }
        });
      }
    });
    Shape.registerGroup('customGroup', {
      draw(item) {
        return item.group.addShape('circle', {
          attrs: {
            x: 60,
            y: 60,
            r: 10,
            fill: 'blue'
          }
        });
      }
    });
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      nodeDefaultShape: 'customNode',
      edgeDefaultShape: 'customEdge',
      groupDefaultShape: 'customGroup'
    });
    graph.source(data);
    graph.render();
    expect(graph.find('node1').shapeObj.type).equal('customNode');
    expect(graph.find('node2->node1').shapeObj.type).equal('customEdge');
    expect(graph.find('group1').shapeObj.type).equal('customGroup');
    graph.destroy();
  });
  it('registerGruide link', () => {
    // Shape.registerGuide('link', {
    //   draw(item) {
    //     const model = item.getModel();
    //     const map = item.getDataMap();
    //     const cfg = item.getMappingCfg();
    //     const group = item.getGraphicGroup();
    //     const source = map[model.source].item;
    //     const target = map[model.target].item;
    //     const sourceBox = source.getBBox();
    //     const targetBox = target.getBBox();
    //     const line = group.addShape('line', {
    //       attrs: {
    //         x1: sourceBox.centerX,
    //         x2: targetBox.centerX,
    //         y1: sourceBox.centerY,
    //         y2: targetBox.centerY,
    //         stroke: 'red',
    //       },
    //     });
    //     const center = line.getPoint(0.5);
    //     group.addShape('text', {
    //       attrs: {
    //         x: center.x,
    //         y: center.y,
    //         text: cfg.label,
    //         textAlign: 'center',
    //         fill: 'orange',
    //       },
    //     });
    //   },
    // });
  });
});

