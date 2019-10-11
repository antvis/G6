const expect = require('chai').expect;
const G6 = require('../../../../src');

function numberEqual(a, b, gap) {
  return Math.abs(a - b) <= (gap || 0.001);
}

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' },
    { id: '6', label: '6' },
    { id: '7', label: '7' },
    { id: '8', label: '8' },
    { id: '9', label: '9' }
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '0', target: '4' },
    { source: '0', target: '5' },
    { source: '0', target: '7' },
    { source: '0', target: '8' },
    { source: '0', target: '9' },
    { source: '2', target: '3' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '5', target: '6' }
  ]
};


const data2 = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' }
  ],
  edges: [
    { id: 'e1', source: '0', target: '1' },
    { id: 'e2', source: '0', target: '2' },
    { id: 'e3', source: '0', target: '3' },
    { id: 'e4', source: '0', target: '4' },
    { id: 'e5', source: '0', target: '5' }
  ]
};

describe.only('layout controller', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500,
    animate: true
  });
  it('new graph without layout', () => {
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x).not.to.be.undefined;
    expect(graph.getNodes()[0].getModel().y).not.to.be.undefined;
    expect(graph.getNodes()[1].getModel().x).not.to.be.undefined;
    expect(graph.getNodes()[1].getModel().y).not.to.be.undefined;
  });
  it('change layout with configurations', () => {
    const radius = 100;
    graph.updateLayout({
      type: 'circular',
      radius,
      startAngle: Math.PI / 4,
      endAngle: Math.PI,
      divisions: 5,
      ordering: 'degree'
    });
    const center = [ graph.get('width') / 2, graph.get('height') / 2 ];
    const node = graph.getNodes()[0].getModel();
    const dist = (node.x - center[0]) * (node.x - center[0])
    + (node.y - center[1]) * (node.y - center[1]);
    expect(numberEqual(dist, radius * radius)).to.be.true;
  });
  it('change configurations', () => {
    const startRadius = 10;
    const endRadius = 300;
    graph.updateLayout({
      radius: null,
      startRadius,
      endRadius,
      divisions: 1,
      startAngle: 0,
      endAngle: 2 * Math.PI,
      ordering: 'topology'
    });
    const center = [ graph.get('width') / 2, graph.get('height') / 2 ];
    const nodes = graph.getNodes();
    const firstNode = nodes[0].getModel();
    const lastNode = nodes[nodes.length - 1].getModel();
    const firstDist = (firstNode.x - center[0]) * (firstNode.x - center[0])
    + (firstNode.y - center[1]) * (firstNode.y - center[1]);
    const lastDist = (lastNode.x - center[0]) * (lastNode.x - center[0])
    + (lastNode.y - center[1]) * (lastNode.y - center[1]);
    expect(numberEqual(firstDist, startRadius * startRadius)).to.be.true;
    expect(numberEqual(lastDist, endRadius * endRadius)).to.be.true;
  });
  it('change layout without configurations', () => {
    graph.updateLayout('fruchterman');
    const layoutCfg = graph.get('layout');
    const layoutType = layoutCfg.type;
    const node = graph.getNodes()[0].getModel();
    expect(node.x).not.to.be.undefined;
    expect(node.y).not.to.be.undefined;
    expect(layoutType).to.equal('fruchterman');
    expect(Object.getOwnPropertyNames(layoutCfg).length).to.equal(1);
  });
  it('change data', () => {
    graph.data(data);
    graph.render();
    setTimeout(() => {
      graph.changeData(data2);
    }, 1000);
    const layoutCfg = graph.get('layout');
    const layoutType = layoutCfg.type;
    const node = graph.getNodes()[0].getModel();
    expect(node.x).not.to.be.undefined;
    expect(node.y).not.to.be.undefined;
    expect(layoutType).to.equal('fruchterman');
    expect(Object.getOwnPropertyNames(layoutCfg).length).to.equal(1);
  });
  it('change data without data', () => {
    graph.changeData({});
    const layoutCfg = graph.get('layout');
    const layoutType = layoutCfg.type;
    const nodeItem = graph.getNodes()[0];
    expect(nodeItem).to.be.undefined;
    expect(layoutType).to.equal('fruchterman');
    expect(Object.getOwnPropertyNames(layoutCfg).length).to.equal(1);
  });
  it('default layout without data and destroy', () => {
    const graph2 = new G6.Graph({
      container: div,
      width: 500,
      height: 500
    });
    graph2.data({});
    graph2.render();
    const layoutController = graph2.get('layoutController');
    expect(layoutController).not.to.be.undefined;
    graph2.destroy();
    expect(layoutController.destroyed).to.be.true;
  });
});
