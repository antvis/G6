// 注意：这里不能直接require原始的src文件，而要使用build后的文件，因为web worker代码是通过worker-loader内联进来的
import G6 from '../../../src';
import dataset from './data';
import { mathEqual } from './util';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'layout-web-worker';
document.body.appendChild(div);

// jest.setTimeout(10000)

describe('layout using web worker', function() {
  it('change layout', function(done) {
    const node = data.nodes[0];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'circular',
        // use web worker to layout
        workerEnabled: true,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });

    graph.data(data);
    // 下面的 graph.updateLayout又会触发一次afterLayout，为了避免这里的 event handler重复执行，用了 graph.once
    graph.once('afterlayout', () => {
      expect(mathEqual(node.x, 500)).toEqual(true);
      expect(mathEqual(node.y, 250)).toEqual(true);
      callback();
    });
    graph.render();
    setTimeout(() => {
      callback();
    }, 1000);

    function callback() {
      let count = 0;
      let ended = false;

      // 只执行一次
      graph.once('afterlayout', () => {
        expect(node.x).not.toEqual(undefined);
        expect(node.y).not.toEqual(undefined);
        expect(count >= 1).toEqual(true);
        expect(ended).toEqual(true);
        graph.destroy();
        done();
      });
      graph.updateLayout({
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
      });
    }
  });
});
