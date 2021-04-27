import G6 from '../../../src';
import dataset from './data';

const data = dataset.data;

const div = document.createElement('div');
div.id = 'gForce-layout';
document.body.appendChild(div);

describe('gForce layout', () => {
  it('gForce layout with default configs, test emit afterlayout', (done) => {
    const node = data.nodes[0];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'gForce',
        minMovement: 0.2,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.on('afterlayout', () => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    });
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 300);
    graph.data(data);
    graph.render();
    expect(node.x).not.toEqual(undefined);
    expect(node.y).not.toEqual(undefined);
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
        type: 'gForce',
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
      if (!graph || graph.destroyed) return;
      expect(count > 30).toEqual(true);
      expect(isEnd === true).toEqual(true);
      graph.destroy();
      done();
    });
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);
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
        type: 'gForce',
        preventOverlap: true,
        nodeSpacing,
        minMovement: 0.1,
        onLayoutEnd() {
          isEnd = true;
        },
      },
      width: 500,
      height: 500,
      defaultNode: { size: nodeSize },
    });

    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);

    graph.on('afterlayout', () => {
      if (!graph || graph.destroyed) return;
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
        type: 'gForce',
        preventOverlap: true,
        minMovement: 0.1,
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
      if (!graph || graph.destroyed) return;
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
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);
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
        type: 'gForce',
        preventOverlap: true,
        nodeSpacing,
        nodeSize,
        minMovement: 0.1,
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
      if (!graph || graph.destroyed) return;
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
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and array nodeSize', (done) => {
    let isEnd = false;
    const nodeSize = [30, 18];

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'gForce',
        preventOverlap: true,
        nodeSize,
        minMovement: 0.1,
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
      if (!graph || graph.destroyed) return;
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
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and number nodeSize', (done) => {
    let isEnd = false;
    const nodeSize = 30;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'gForce',
        preventOverlap: true,
        nodeSize,
        minMovement: 0.1,
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
    setTimeout(() => {
      if (!graph || graph.destroyed) return;
      graph.destroy();
      done();
    }, 200);
    graph.data(data);
    graph.render();
  });
});
