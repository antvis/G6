const G6 = require('../../../src/index');
const Global = require('../../../src/global');
const Graph = G6.Graph;
const expect = require('chai').expect;
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');

const div = document.createElement('div');
document.body.appendChild(div);
div.setAttribute('data-test-spec', 'cases/anchor-spec.js');
const width = 500;
const height = 500;

const graph = new Graph({
  container: div,
  width,
  height
});

graph.source(Util.clone(data));

graph.render();

// graph.on('click', ev => {
//   console.log(ev.x, ev.y, ev.item);
// });

// anchor 测试
describe('anchor user case test', () => {
  it('node anchor getAnchorPoints', () => {
    G6.registerNode('test1', {
      anchor: getDefaultAnchors
    });
    const tmpData = Util.clone(data);
    tmpData.nodes = tmpData.nodes.map(item => {
      item.shape = 'test1';
      return item;
    });
    graph.read(tmpData);

    const id = 'node3';
    const node = graph.find(id);
    const anchorPoints = node.getAnchorPoints();
    const pts = [{ x: 400, y: 79.5, index: 0 }, { x: 420.5, y: 100, index: 1 }, { x: 400, y: 120.5, index: 2 }, { x: 379.5, y: 100, index: 3 }];
    const isEqual = Util.isEqual(pts, anchorPoints);
    expect(isEqual).to.equal(true);
    anchorPoints.forEach((item, index) => {
      expect(Util.isEqual(pts[index], node.getAnchorPoints(index))).to.equal(true);
    });
  });
  it('node anchor getLinkPoints', () => {
    G6.registerNode('test2', {
      draw(item) {
        const model = item.getModel();
        const group = item.getGraphicGroup();
        const size = this.getSize(item);
        const path = Util.getEllipsePath(0, 0, size[0] / 2, size[1] / 2);
        const keyShape = drawKeyShape(model, group, path);
        return keyShape;
      },
      anchor: getDefaultAnchors()
    });
    const tmpData = Util.clone(data);
    tmpData.nodes = tmpData.nodes.map(item => {
      item.shape = 'test2';
      return item;
    });
    graph.read(tmpData);
    const point = {
      x: 374,
      y: 70
    };
    const id = 'node3';
    const node = graph.find(id);
    const linkPoints = node.getLinkPoints(point).map(item => {
      return {
        ...item,
        arc: item.arc.toFixed(2)
      };
    });
    const pts = [
      { x: 400, y: 79.5, index: 0, arc: 0.7140906986121579 },
      { x: 379.5, y: 100, index: 3, arc: 0.8567056281827387 },
      { x: 420.5, y: 100, index: 1, arc: 2.2848870254070546 },
      { x: 400, y: 120.5, index: 2, arc: 2.427501954977635 }
    ]
      .map(item => {
        return {
          ...item,
          arc: item.arc.toFixed(2)
        };
      });
    expect(Util.isEqual(pts, linkPoints)).to.equal(true);

    const anchorPoints = [{ x: 400, y: 79.5, index: 0 }, { x: 420.5, y: 100, index: 1 }, { x: 400, y: 120.5, index: 2 }, { x: 379.5, y: 100, index: 3 }];
    anchorPoints.forEach((item, index) => {
      expect(Util.isEqual([ anchorPoints[index] ], node.getLinkPoints(index))).to.equal(true);
    });
  });

  it('node anchor getLinkPoint when default anchor type circle', () => {
    G6.registerNode('test3', {
      anchor: {
        type: 'circle'
      }
    });

    const tmpData = Util.clone(data);
    tmpData.nodes = tmpData.nodes.map(item => {
      item.shape = 'test3';
      return item;
    });
    graph.read(tmpData);
    const point = {
      x: 374,
      y: 70
    };
    const id = 'node3';
    const node = graph.find(id);
    const linkPoints = node.getLinkPoints(point).map(item => {
      return {
        x: item.x.toFixed(0),
        y: item.y.toFixed(0)
      };
    });
    expect(Util.isEqual(linkPoints, [{ x: '387', y: '85' }])).to.equal(true);
  });

  it('node anchor getLinkPoint when default anchor type rect ', () => {
    G6.registerNode('test', {
      anchor: {
        intersectBox: 'rect'
      }
    });

    const tmpData = Util.clone(data);
    tmpData.nodes = tmpData.nodes.map(item => {
      item.shape = 'test';
      return item;
    });
    graph.read(tmpData);
    const point = {
      x: 374,
      y: 70
    };
    const id = 'node3';
    const node = graph.find(id);
    const linkPoints = node.getLinkPoints(point).map(item => {
      return {
        x: item.x.toFixed(0),
        y: item.y.toFixed(0)
      };
    });
    graph.destroy();
    expect(Util.isEqual(linkPoints, [{ x: '382', y: '80' }])).to.equal(true);
  });

});

function drawKeyShape(model, group, path) {
  return group.addShape('path', {
    attrs: Util.mix(true, {}, Global.nodeStyle, {
      path,
      fill: model.color,
      stroke: model.color
    }, model.style)
  });
}

function getDefaultAnchors() {
  return [
    [ 0.5, 0 ], // 上面边的中点
    [ 1, 0.5 ], // 右边边的中点
    [ 0.5, 1 ], // 下边边的中点
    [ 0, 0.5 ] // 左边边的中点
  ];
}
