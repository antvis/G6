import { Graph } from '../../../src';
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

describe('connected low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data1);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("concentric");
  });
  globalGraph.render();
});

describe('dense high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data2);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("mds");
  });
  globalGraph.render();
});

describe('dense low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data3);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("mds");
  });
  globalGraph.render();
});

describe('normal high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data4);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("fruchterman");
  });
  globalGraph.render();
});

describe('normal low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data5);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("fruchterman");
  });
  globalGraph.render();
});

describe('sparse high layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data6);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("fruchterman");
  });
  globalGraph.render();
});

describe('sparse low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data7);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("grid");
  });
  globalGraph.render();
});

describe('grid low layout', () => {
  const globalGraph = new Graph({
    container: div,
    width: 600,
    height: 800,
    modes: {
      default: ['drag-node'],
    },
  });

  globalGraph.data(data8);
  var sortedLayoutProb = globalGraph.autoLayout();
  it('best layout', () => {
    expect(sortedLayoutProb[0][0]).toBe("grid");
  });
  globalGraph.render();
});