const G6 = require('../../../src/index');
const div = document.createElement('div');
document.body.appendChild(div);
describe('handler test', () => {
  it('handler test', () => {
    G6.registerBehaviour('aaa', () => {});
    G6.registerBehaviour('bbb', () => {}, [ 'aaa' ]);
    G6.registerBehaviour('ccc', () => {}, [ 'bbb', 'aaa' ]);
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
      }, {
        id: 'node2',
        x: 300,
        y: 200
      }],
      edges: [{
        target: 'node2',
        source: 'node1'
      }]
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [ 'aa', 'ccc' ]
      }
    });
    graph.read(data);
    graph.destroy();
  });
});
