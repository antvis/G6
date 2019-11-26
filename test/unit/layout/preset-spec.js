const expect = require('chai').expect;
const G6 = require('../../../src');

const div = document.createElement('div');
div.id = 'preset-spec';
document.body.appendChild(div);

const data = {
  nodes: [{
    id: '0',
    label: '0',
    x: 100,
    y: 30
  },
  {
    id: '1',
    label: '1',
    x: 150,
    y: 80
  },
  {
    id: '2',
    label: '2',
    x: 50,
    y: 80
  }],
  edges: [{
    source: '0',
    target: '1'
  },
  {
    source: '0',
    target: '2'
  }, {
    source: '2',
    target: '1'
  }]
};

const data2 = {
  nodes: [{
    id: '0',
    label: '0',
    x: 200,
    y: 130
  },
  {
    id: 'n1',
    label: 'n1',
    x: 250,
    y: 180
  },
  {
    id: 'n2',
    label: 'n2',
    x: 150,
    y: 180
  },
  {
    id: 'n3',
    label: 'n3',
    x: 200,
    y: 210
  }],
  edges: [{
    source: '0',
    target: 'n1'
  },
  {
    source: '0',
    target: 'n2'
  },
  {
    source: 'n2',
    target: 'n1'
  },
  {
    source: 'n2',
    target: 'n3'
  }]
};

describe.only('preset layout', () => {
  it('new graph without layout but has positions', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).to.equal(100);
    expect(graph.getNodes()[0].getModel().y).to.equal(30);
    expect(graph.getNodes()[1].getModel().x).to.equal(150);
    expect(graph.getNodes()[1].getModel().y).to.equal(80);

    let painted = false;
    graph.one('afterpaint', function() {
      painted = true;
    });
    graph.changeData(data2);
    expect(graph.getNodes()[0].getModel().x).to.equal(200);
    expect(graph.getNodes()[0].getModel().y).to.equal(130);
    expect(graph.getNodes()[1].getModel().x).to.equal(250);
    expect(graph.getNodes()[1].getModel().y).to.equal(180);
    expect(painted).to.be.true;
    graph.destroy();
  });
});
