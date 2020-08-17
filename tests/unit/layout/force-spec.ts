import G6 from '../../../src';
import dataset from './data';
import * as d3Force from 'd3-force';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('force layout', () => {
  it('force layout with default configs, test emit afterlayout', (done) => {
    const node = data.nodes[0];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.on('afterlayout', () => {
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
    expect(node.x).not.toEqual(undefined);
    expect(node.y).not.toEqual(undefined);
  });

  it('force layout with tick and onLayoutEnd', (done) => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x: number;
    let y: number;
    let count = 0;
    let isEnd = false;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        onTick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          expect(node.x);
          expect(node.y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
          isEnd = true;
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.on('afterlayout', () => {
      expect(count > 30).toEqual(true);
      expect(isEnd === true).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('force with fixed edgeStrength, nodeStrength, preventOverlap', (done) => {
    const node = data.nodes[0];
    const edge = data.edges[0];
    let x: number;
    let y: number;
    let count = 0;
    let isEnd = false;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        linkDistance: 140,
        edgeStrength: 0.5,
        nodeStrength: -30,
        preventOverlap: true,
        onTick() {
          count++;
          expect(node.x !== x);
          expect(node.y !== y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
          x = node.x;
          y = node.y;
        },
        onLayoutEnd() {
          isEnd = true;
          expect(node.x);
          expect(node.y);
          expect(edge.x).toEqual(undefined);
          expect(edge.y).toEqual(undefined);
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });

    graph.on('afterlayout', () => {
      expect(count > 30).toEqual(true);
      expect(isEnd === true).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with number nodeSpacing', (done) => {
    let isEnd = false;
    const nodeSpacing = 10;
    const nodeSize = 10;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSpacing,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: nodeSize },
    });

    graph.on('afterlayout', () => {
      expect(isEnd === true).toEqual(true);
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      expect(dist >= nodeSize / 2 + nodeSpacing).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and array node size', (done) => {
    let isEnd = false;
    const nodeSpacing = (d) => {
      return d.size[0] / 2;
    };

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSpacing,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      const randomWidth = 10 + Math.random() * 20;
      const randomHeight = 5 + Math.random() * 5;
      node.size = [randomWidth, randomHeight];
      node.type = 'rect';
    });
    graph.on('afterlayout', () => {
      expect(isEnd === true).toEqual(true);
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      const mindist =
        node0.size[0] / 2 + node1.size[1] / 2 + nodeSpacing(node0) + nodeSpacing(node1);
      expect(dist >= mindist).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and function nodeSize', (done) => {
    //
    let isEnd = false;
    const nodeSpacing = (d) => {
      return d.dsize[0] / 3;
    };
    const nodeSize = (d) => {
      return d.dsize[0];
    };

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSpacing,
        nodeSize,
        alphaDecay: 0.3,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      defaultNode: {
        size: [30, 15],
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node) => {
      node.dsize = [30, 15];
      node.type = 'rect';
    });

    graph.on('afterlayout', () => {
      expect(isEnd === true).toEqual(true);
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      const mindist =
        node0.dsize[0] / 2 + node1.dsize[1] / 2 + nodeSpacing(node0) + nodeSpacing(node1);
      expect(dist >= mindist).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and array nodeSize', (done) => {
    let isEnd = false;
    const nodeSize = [30, 18];

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize,
        alphaDecay: 0.3,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      defaultNode: {
        size: nodeSize,
      },
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', () => {
      expect(isEnd === true).toEqual(true);
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      const mindist = nodeSize[0];
      expect(dist >= mindist).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and number nodeSize', (done) => {
    let isEnd = false;
    const nodeSize = 30;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        preventOverlap: true,
        nodeSize,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      defaultNode: {
        size: nodeSize,
      },
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', () => {
      expect(isEnd === true).toEqual(true);
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      const mindist = nodeSize;
      expect(dist >= mindist).toEqual(true);
      graph.destroy();
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('force re-execute, isTicking', (done) => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const forceLayout = graph.get('layoutController').layoutMethod;
    forceLayout.execute(); // re execute when it is ticking

    setTimeout(() => {
      const node0 = data.nodes[0];
      expect(node0.x).not.toEqual(NaN);
      expect(node0.y).not.toEqual(NaN);
      forceLayout.forceSimulation.stop();
      graph.destroy();
      done();
    }, 300);
  });
});

describe('update and simulation', () => {
  it('force update layout', (done) => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const forceLayout = graph.get('layoutController').layoutMethod;
    expect(forceLayout.linkDistance).toEqual(50); // default value
    expect(forceLayout.preventOverlap).toEqual(false);

    setTimeout(() => {
      graph.updateLayout({
        linkDistance: 100,
        preventOverlap: true,
        alphaDecay: 0.8,
      });
      expect(forceLayout.linkDistance).toEqual(100);
      expect(forceLayout.preventOverlap).toEqual(true);
      const simulation = forceLayout.forceSimulation;
      simulation.stop();
      done();
    }, 300);
  });
  it('assign simualtion', (done) => {
    const center = [300, 300];
    const nodeForce = d3Force.forceManyBody();
    const forceSimulation = d3Force
      .forceSimulation()
      .nodes(data.nodes)
      .force('center', d3Force.forceCenter(center[0], center[1]))
      .force('charge', nodeForce)
      .alpha(0.3)
      .alphaDecay(0.028)
      .alphaMin(0.1);
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'force',
        forceSimulation,
        preventOverlap: true,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    setTimeout(() => {
      const node0 = data.nodes[0];
      expect(node0.x).not.toEqual(NaN);
      expect(node0.y).not.toEqual(NaN);
      graph.destroy();
      done();
    }, 300);
  });
});
