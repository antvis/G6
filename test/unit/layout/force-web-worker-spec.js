const expect = require('chai').expect;
// 注意：这里不能直接require原始的src文件，而要使用build后的文件，因为web worker代码是通过worker-loader内联进来的。
const G6 = require('../../../build/g6');
const data = require('./data.json');

const div = document.createElement('div');
div.id = 'force-layout-web-worker';
document.body.appendChild(div);

describe.only('force layout(web worker)', function() {
  this.timeout(10000);

  it('force layout(web worker) with default configs', function(done) {
    const node = data.nodes[0];
    let count = 0;
    let ended = false;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        onTick() {
          count++;
          expect(node.x).to.not.be.undefined;
          expect(node.y).to.not.be.undefined;
        },
        onLayoutEnd() {
          ended = true;
        },
        // use web worker to layout
        workerEnabled: true
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 }
    });
    graph.data(data);
    graph.on('afterlayout', () => {
      expect(node.x).to.not.be.undefined;
      expect(node.y).to.not.be.undefined;
      expect(count >= 1).to.be.true;
      expect(ended).to.be.true;
      graph.destroy();
      done();
    });
    graph.render();
  });
});
