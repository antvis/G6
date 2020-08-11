import { Graph } from '../../../src';
import data0 from './data/auto-layout-test0'
import data1 from './data/auto-layout-test1'
import data2 from './data/auto-layout-test2'
import data3 from './data/auto-layout-test3'
import data4 from './data/auto-layout-test4'
import data5 from './data/auto-layout-test5'
import data6 from './data/auto-layout-test6'
import data7 from './data/auto-layout-test7'
import data8 from './data/auto-layout-test8'

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('random data layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data0);
  var sortedLayoutProb = globalGraph.autoLayout();
});

describe('connected low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data1);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 1', () => {
    expect(sortedLayoutProb[0][0]).toBe("concentric");
  });
});

describe('dense high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data2);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 2', () => {
    expect(sortedLayoutProb[0][0]).toBe("mds");
  });
});

describe('dense low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data3);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 3', () => {
    expect(sortedLayoutProb[0][0]).toBe("mds");
  });
});

describe('normal high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data4);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 4', () => {
    expect(sortedLayoutProb[0][0]).toBe("fruchterman");
  });
});

describe('normal low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data5);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 5', () => {
    expect(sortedLayoutProb[0][0]).toBe("fruchterman");
  });
});

describe('sparse high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data6);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 6', () => {
    expect(sortedLayoutProb[0][0]).toBe("force");
  });
});

describe('sparse low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data7);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 7', () => {
    expect(sortedLayoutProb[0][0]).toBe("force");
  });
});

describe('grid low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 600,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  globalGraph.data(data8);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout 8', () => {
    expect(sortedLayoutProb[0][0]).toBe("grid");
  });
});

describe('dataset layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node', 'drag-canvas'],
    },
  });

  fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then(res => res.json())
  .then(data => {
    globalGraph.data({
      nodes: data.nodes,
      edges: data.edges.map(function(edge, i) {
        edge.id = 'edge' + i;
        return Object.assign({}, edge);
      }),
    })
    globalGraph.autoLayout();
  })

});