import G6, { Graph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('edge click state', () => {
  it('edge ', () => {
    const data = {
      nodes: [
        {
          id: '0',
          // label: 'click here and you get 2 click events',
          x: 100,
          y: 100,
        },
      ],
      edges: [],
    };
    
    const container = document.getElementById('container');
    const graph = new G6.Graph({
      container: 'container',
      width: container.scrollWidth,
      height: container.scrollHeight || 500,
      modes: {
        default: ['drag-node', 'drag-canvas', 'click-select']
      }
    });
    
    graph.changeData(data);

    graph.on('canvas:click', e => {
      console.log('click')
    })
    graph.get('canvas').on('click', e => {
      console.log('canvasclick')
    })
    
    // graph.get('canvas').on('click', e => {
    //   console.log('canvas lis')
    // })
    // graph.on('node:mousedown', e => {
    //   console.log('e.target', e.target)
    //   console.log('mousedown')
    // })
    // graph.on('node:mousemove', e => {
    //   console.log('mousemove')
    // })
    // graph.on('node:mouseup', e => {
    //   console.log('mouseup')
    // })

    // graph.get('canvas').on('circle-keyShape:mousedown', e => {
    //   console.log('canvas circle mousedown');
    // })

    // graph.get('canvas').on('circle-keyShape:mousemove', e => {
    //   console.log('canvas circle mousemove');
    // })

    // graph.get('canvas').on('circle-keyShape:mouseup', e => {
    //   console.log('canvas circle mouseup');
    // })

    setTimeout(() => {
      const dom = document.getElementsByClassName('test-result-suit-title')[0];
      console.log('dom', dom, document.getElementsByClassName('test-result-suit-title'))
      dom.addEventListener('mousedown', e => {
        console.log('dom mousedown');
      })
      dom.addEventListener('mousemove', e => {
        console.log('dom mousemove');
      })
      dom.addEventListener('mouseup', e => {
        console.log('dom mouseup');
      })
    }, 1000)

  });
});