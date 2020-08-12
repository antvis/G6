// 注意：这里不能直接require原始的src文件，而要使用build后的文件，因为web worker代码是通过worker-loader内联进来的
import G6 from '../../../src';
import dataset from './data';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'force-layout-web-worker';
document.body.appendChild(div);

describe('force layout(web worker)', function() {
  // this.timeout(10000);

  it('force layout(web worker) with default configs', done => {
    const node = data.nodes[0];
    let count = 0;
    let ended = false;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        onTick() {
          count++;
          expect(node.x).not.toEqual(undefined);
          expect(node.y).not.toEqual(undefined);
        },
        onLayoutEnd() {
          ended = true;
        },
        // use web worker to layout
        workerEnabled: true,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      expect(node.x).not.toEqual(undefined);
      expect(node.y).not.toEqual(undefined);
      expect(count >= 1).toEqual(true);
      expect(ended).toEqual(true);
      graph.destroy();
      done();
    });
  });
});
