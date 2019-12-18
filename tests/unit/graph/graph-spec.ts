
import '../../../src/behavior'
import Graph from '../../../src/graph/graph'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('graph', () => {
  it('modes', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      modes: {
        default: ['drag-canvas']
      }
    });

    // graph.on('canvas:click', evt => {
    //   debugger
    //   console.log(evt)
    // })
    graph.emit('canvas:click', { type: 'click'})

  })
})