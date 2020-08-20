import G6 from '../../../src';
import Simulate from 'event-simulate';

const div = document.createElement('div');
div.id = 'image-minimap-spec';
document.body.appendChild(div);

describe('image minimap', () => {
  let graph;
  const minimap = new G6.ImageMinimap({
    width: 200,
    padding: 10,
    graphImg: 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*DcGMQ7AN3Z0AAAAAAAAAAABkARQnAQ',
  });
  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
    .then((res) => res.json())
    .then((data) => {
      graph = new G6.TreeGraph({
        container: div,
        width: 800,
        height: 600,
        plugins: [minimap],
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF',
          },
        },
        layout: {
          type: 'dendrogram',
          direction: 'LR', // H / V / LR / RL / TB / BT
          nodeSep: 30,
          rankSep: 100,
        },
      });
      graph.node(function (node) {
        return {
          label: node.id,
          labelCfg: {
            position: node.children && node.children.length > 0 ? 'left' : 'right',
            offset: 5,
          },
        };
      });
      graph.data(data);
      graph.render();
    });

  it('default image minimap', done => {
    setTimeout(() => {
      const container = minimap.getContainer();
      expect(container).not.toBe(undefined);
      const viewport = minimap.getViewport();
      expect(viewport).not.toBe(undefined);
      expect(viewport.style.left).toEqual('62.3249px');
      expect(viewport.style.top).toEqual('90.1585px');
      expect(viewport.style.width).toEqual('137.675px');
      expect(viewport.style.height).toEqual('59.8415px');

      Simulate.simulate(viewport, 'mousedown', {
        clientX: 100,
        clientY: 100,
        target: viewport,
      });

      Simulate.simulate(viewport, 'mousemove', {
        clientX: 50,
        clientY: 100,
      });

      Simulate.simulate(viewport, 'mouseup', {
        clientX: 50,
        clientY: 100,
      });
      console.log(viewport.style.left, viewport.style.top, viewport.style.width, viewport.style.height)

      expect(viewport.style.left).toEqual('29.6865px');
      expect(viewport.style.top).toEqual('90.1585px');
      expect(viewport.style.width).toEqual('158.52px');
      expect(viewport.style.height).toEqual('59.8415px');

      minimap.updateGraphImg(
        'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ',
      );
      const imgDOM = minimap.get('imgDOM');
      expect(imgDOM.src).toEqual('https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7QSRRJwAWxQAAAAAAAAAAABkARQnAQ');

      graph.destroy();
      expect(minimap.destroyed).toEqual(true)

      done();
    }, 800);
  });
});
