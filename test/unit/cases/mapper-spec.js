const Graph = require('../../../src/graph');
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');
const expect = require('chai').expect;
const div = document.createElement('div');
div.setAttribute('data-test-spec', 'cases/mapper-spec.js');
document.body.appendChild(div);
describe('mapping user cases test', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500
  });
  graph.node()
    .label(model => {
      return model.id;
    })
    .size(20);
  graph.group().label('group');
  graph.edge().label(model => {
    return model.id;
  });
  graph.guide().label(model => {
    return model.id;
  });
  graph.source(Util.clone(data));
  graph.render();
  it('node mapping', () => {
    const nodes = graph.getNodes();
    Util.each(nodes, node => {
      const model = node.getModel();
      if (model.label) {
        expect(model.label).equal(model.label);
      } else {
        expect(model.label).equal(model.id);
      }
      if (model.size) {
        expect(model.size).equal(model.size);
      } else {
        expect(model.size).equal(20);
      }
    });
  });

  it('edge mapping', () => {
    const edges = graph.getEdges();
    Util.each(edges, edge => {
      const model = edge.getModel();
      if (model.label) {
        expect(model.label).equal(model.label);
      } else {
        expect(model.label).equal(model.id);
      }
    });
  });

  it('group mapping', () => {
    const groups = graph.getGroups();
    Util.each(groups, group => {
      const model = group.getModel();
      if (model.label) {
        expect(model.label).equal(model.label);
      } else {
        expect(model.label).equal('group');
      }
    });
  });

  it('guide mapping', () => {
    const guides = graph.getGuides();
    Util.each(guides, guide => {
      const model = guide.getModel();
      if (model.label) {
        expect(model.label).equal(model.label);
      } else {
        expect(model.label).equal(model.id);
      }
    });
  });

  it('destroy test graph', () => {
    graph.destroy();
  });
});

