import G6 from '../../../src';
import dataset from './data';
import * as d3Force from 'd3-force';
import { isFunction } from 'util';

const data = dataset.comboData;

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('no node and one node', () => {
  it('layout without node', (done) => {
    const testData = {};
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
      },
      width: 500,
      height: 500,
    });
    graph.data(testData);
    graph.render();
    done();
  });
  it('layout with one node', (done) => {
    const testData = {
      nodes: [
        {
          id: 'node',
          x: 0,
          y: 0,
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
      },
      width: 500,
      height: 500,
    });
    graph.on('afterlayout', () => {
      expect(testData.nodes[0].x).toBe(250);
      expect(testData.nodes[0].y).toBe(250);
      done();
    });
    graph.data(testData);
    graph.render();
  });
});

describe('combo force layout', () => {
  it('combo force layout with default configs, emit afterlayout', (done) => {
    const node = data.nodes[0];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });

    graph.on('afterlayout', () => {
      expect(node.x).not.toEqual(undefined);
      expect(node.y).not.toEqual(undefined);
      expect(node.x).not.toEqual(NaN);
      expect(node.y).not.toEqual(NaN);
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('force with fixed edgeStrength, nodeStrength, preventOverlap', (done) => {
    const node = data.nodes[0];

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
        linkDistance: 140,
        edgeStrength: 0.5,
        nodeStrength: 30,
        preventOverlap: true,
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
    });
    graph.on('afterlayout', () => {
      expect(node.x).not.toEqual(undefined);
      expect(node.y).not.toEqual(undefined);
      expect(node.x).not.toEqual(NaN);
      expect(node.y).not.toEqual(NaN);
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with number nodeSpacing', (done) => {
    const nodeSpacing = 10;
    const comboSpacing = 20;
    const nodeSize = 10;

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
        preventOverlap: true,
        nodeSpacing,
        comboSpacing,
      },
      width: 500,
      height: 500,
      defaultNode: { size: nodeSize },
    });
    graph.on('afterlayout', () => {
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      expect(dist >= nodeSize / 2 + nodeSpacing).toEqual(true);
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('preventOverlap with function nodeSpacing and array node size', (done) => {
    const nodeSpacing = (d) => {
      return d.size[0] / 2;
    };

    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
        preventOverlap: true,
        nodeSpacing,
        maxIteration: 300,
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
      const node0 = data.nodes[0];
      const node1 = data.nodes[1];
      const dist = Math.sqrt(
        (node0.x - node1.x) * (node0.x - node1.x) + (node0.y - node1.y) * (node0.y - node1.y),
      );
      const mindist =
        node0.size[0] / 2 + node1.size[1] / 2 + nodeSpacing(node0) + nodeSpacing(node1);
      expect(dist >= mindist).toEqual(true);
      done();
    });
    graph.data(data);
    graph.render();
  });

  it('force re-execute, isTicking', (done) => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
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
      graph.destroy();
      done();
    }, 300);
  });
});

describe('undefined configurations and update layout', () => {
  it('undefined configurations and update layout', (done) => {
    data.nodes.push({
      id: 'newnode',
    });
    data.combos.push({
      id: 'newcombo',
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'comboForce',
        preventComboOverlap: false,
        preventNodeOverlap: false,
        collideStrength: 1,
        nodeCollideStrength: null,
        nodeSize: [10, 10],
        comboSpacing: null,
        comboPadding: [20, 20, 10, 10],
        linkDistance: null,
        linkStrength: null,
        nodeStrength: null,
        comboGravity: null,
      },
      width: 1000,
      height: 1000,
    });
    graph.data(data);
    graph.render();
    const forceLayout = graph.get('layoutController').layoutMethod;
    expect(isFunction(forceLayout.linkDistance)).toEqual(true);
    expect(forceLayout.linkDistance()).toEqual(10);
    expect(forceLayout.preventOverlap).toEqual(false);

    setTimeout(() => {
      graph.hideItem(graph.getCombos()[0]);
      graph.hideItem(graph.getNodes()[30]);
      graph.updateLayout({
        linkDistance: 100,
        preventOverlap: true,
        alphaDecay: 0.8,
        nodeSize: 10,
        comboPadding: null,
      });
      expect(isFunction(forceLayout.linkDistance)).toEqual(true);
      expect(forceLayout.linkDistance()).toEqual(100);
      expect(forceLayout.preventOverlap).toEqual(true);
      done();
    }, 300);
  });
});
