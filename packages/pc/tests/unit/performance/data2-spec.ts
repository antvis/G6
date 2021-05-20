import { Graph } from '../../../src';

/* nodes: 7167, edges: 5421, shapes: 19755 */

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      labelCfg: {
        style: {
          fontSize: 2
        }
      },
      style: {
        lineWidth: 0.3
      }
    },
    modes: {
      default: ['zoom-canvas', 'drag-canvas']
    }
  });
  it('first render', () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/f0b6af53-7013-40ea-ae12-a24c89a0f960.json')
    .then((res) => res.json())
    .then((data) => {
      const begin = performance.now();
      graph.once('afterrender', e => {
        console.log('render time:', performance.now() - begin);
      })
      graph.data(data);
      graph.render();
    });
  });
});