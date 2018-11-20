const Graph = require('../../../src/graph');
const expect = require('chai').expect;
const Util = require('../../../src/util/');
const data = require('../../fixtures/sample-graph-data.json');
const Simulate = require('event-simulate');
const G6 = require('../../../src/index');
// 事件测试
describe('graph behaviour-mode user cases test', () => {
  it('behaviour-mode: test', () => {
    // registerBehaviour
    G6.registerBehaviour('test-1', graph => {
      graph.behaviourOn('click', () => {
        expect(graph.get('modes')[graph.get('mode')].indexOf('test-1')).not.to.equal(-1);
      });
    });
    G6.registerBehaviour('test-2', graph => {
      graph.behaviourOn('click', () => {
        expect(graph.get('modes')[graph.get('mode')].indexOf('test-2')).not.to.equal(-1);
      });
    });
    const div = document.createElement('div');
    div.id = 'behaviour-chart';
    document.body.appendChild(div);
    const width = 500;
    const height = 500;
    const graph = new Graph({
      container: div,
      width,
      height,
      modes: {
        default: [ 'test-1' ],
        edit: [ 'test-2' ]
      }
    });
    graph.source(Util.clone(data));
    graph.render();

    const canvas = graph.getCanvas();
    const el = canvas.get('el');
    const point = { x: 10, y: 20 };
    const client = canvas.getClientByPoint(point.x, point.y);
    click(client, el);
    graph.changeMode('edit');
    click(client, el);
    // 重复添加
    graph.addBehaviour('test-2');
    click(client, el);
    // 单个行为添加
    graph.addBehaviour('test-1');
    click(client, el);
    // 数组添加
    graph.addBehaviour([ 'test-1', 'test-2' ]);
    click(client, el);
    // 单个删除
    graph.removeBehaviour('test-1');
    click(client, el);
    // 群组删除
    graph.removeBehaviour([ 'test-1', 'test-2' ]);
    click(client, el);
    graph.destroy();
  });
});
function click(client, el) {
  // 模拟单击事件
  Simulate.simulate(el, 'mousedown', {
    clientX: client.clientX,
    clientY: client.clientY
  });
  Simulate.simulate(el, 'mouseup', {
    clientX: client.clientX,
    clientY: client.clientY
  });
}
