import G6, { Graph, TreeGraph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('dragenter dragleave', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 100
    }, {
      id: 'node2',
      x: 200,
      y: 100
    }],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node']
    }
  });
  graph.data(data);
  graph.render();
  it('dragenter', () => {
    graph.on('node:dragenter', e => {
      console.log('dragenter')
    });
    graph.on('node:dragleave', e => {
      console.log('dragleave')
    });
    graph.on('node:mouseenter', e => {
      console.log('mouseenter')
    });
    graph.on('node:mouseleave', e => {
      console.log('mouseleave')
    });
    graph.on('node:dragover', e => {
      console.log('dragover')
    });
    graph.destroy();
  });
});

// closes: #1026
describe('empty data array + fitview', () => {
  const data = {
    nodes: [],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    fitView: true
  });
  graph.data(data);
  it('empty data array + fitview', () => {
    graph.render();
  });
});



// closes: #1301
describe('change data with rect node', () => {
  const data = {
    nodes: [{
      name: "source",
      id: "source",
      label: "source",
      type: 'rect',
      x: 100,
      y: 100,
      //size: [60, 60],
      style: {
        width: 60,
        height: 20,
      }
    }],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500
  });
  graph.data(data);
  it('change data', () => {
    graph.render();
    graph.changeData(data);
  });
});