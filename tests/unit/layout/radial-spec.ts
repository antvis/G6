import G6 from '../../../src';
import { numberEqual } from './util';
import MDS from '../../../src/layout/radial/mds'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

const data: any = {
  nodes: [
    { id: '0', label: '0' },
    { id: '1', label: '1' },
    { id: '2', label: '2' },
    { id: '3', label: '3' },
    { id: '4', label: '4' },
    { id: '5', label: '5' },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '3',
      target: '4',
    },
  ],
};

describe('radial', () => {
  it('new graph with radial layout, without configurations', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    const center = [graph.get('width') / 2, graph.get('height') / 2];
    const focusNode = graph.getNodes()[0].getModel();
    expect(numberEqual(focusNode.x, center[0])).toEqual(true);
    expect(numberEqual(focusNode.y, center[1])).toEqual(true);
    graph.destroy();
  });
  it('new graph with radial layout, with configurations', () => {
    const unitRadius = 100;
    const fnIndex = 1;
    const focusNode = data.nodes[fnIndex];
    const center = [250, 250];
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        center,
        maxIteration: 100,
        focusNode,
        unitRadius,
        linkDistance: 100,
      },
      modes: {
        default: ['drag-node', 'drag-canvas'],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const oneStepNode = data.nodes[0];
    const DistFnToOneStepNode =
      (oneStepNode.x - focusNode.x) * (oneStepNode.x - focusNode.x) +
      (oneStepNode.y - focusNode.y) * (oneStepNode.y - focusNode.y);
    const twoStepNode = data.nodes[2];
    const DistFnToTwoStepNode =
      (twoStepNode.x - focusNode.x) * (twoStepNode.x - focusNode.x) +
      (twoStepNode.y - focusNode.y) * (twoStepNode.y - focusNode.y);
    const descreteNode = data.nodes[5];
    const DistFnToDescreteNode =
      (descreteNode.x - focusNode.x) * (descreteNode.x - focusNode.x) +
      (descreteNode.y - focusNode.y) * (descreteNode.y - focusNode.y);
    const descreteComNode1 = data.nodes[3];
    const DistFnToDescreteComNode1 =
      (descreteComNode1.x - focusNode.x) * (descreteComNode1.x - focusNode.x) +
      (descreteComNode1.y - focusNode.y) * (descreteComNode1.y - focusNode.y);
    const descreteComNode2 = data.nodes[4];
    const DistFnToDescreteComNode2 =
      (descreteComNode2.x - focusNode.x) * (descreteComNode2.x - focusNode.x) +
      (descreteComNode2.y - focusNode.y) * (descreteComNode2.y - focusNode.y);
    expect(numberEqual(DistFnToOneStepNode, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToTwoStepNode, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteNode, 9 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteComNode1, 9 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteComNode2, 16 * unitRadius * unitRadius)).toEqual(true);

    graph.destroy();
  });

  it('radial layout with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: []
    });
    graph.render();
    graph.destroy();
  });

  it('radial layout with one node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
      },
      width: 500,
      height: 500,
    });
    graph.data({
      nodes: [{
        id: 'node'
      }]
    });
    graph.render();
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(250);
    expect(nodeModel.y).toEqual(250);
    graph.destroy();
  });

  it('focus on descrete node, prevent overlapping', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];//data.nodes[5];//'5';
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode: '5',
        unitRadius,
        preventOverlap: true,
        maxPreventOverlapIteration: 800
      },
      defaultNode: {
        size: nodeSize
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const descreteCom1Node1 = data.nodes[0];
    const DistFnToDescreteCom1Node1 =
      (descreteCom1Node1.x - focusNode.x) * (descreteCom1Node1.x - focusNode.x) +
      (descreteCom1Node1.y - focusNode.y) * (descreteCom1Node1.y - focusNode.y);
    const descreteCom1Node2 = data.nodes[1];
    const DistFnToDescreteCom1Node2 =
      (descreteCom1Node2.x - focusNode.x) * (descreteCom1Node2.x - focusNode.x) +
      (descreteCom1Node2.y - focusNode.y) * (descreteCom1Node2.y - focusNode.y);
    const descreteCom2Node1 = data.nodes[3];
    const DistFnToDescreteCom2Node1 =
      (descreteCom2Node1.x - focusNode.x) * (descreteCom2Node1.x - focusNode.x) +
      (descreteCom2Node1.y - focusNode.y) * (descreteCom2Node1.y - focusNode.y);
    const descreteCom2Node2 = data.nodes[4];
    const DistFnToDescreteCom2Node2 =
      (descreteCom2Node2.x - focusNode.x) * (descreteCom2Node2.x - focusNode.x) +
      (descreteCom2Node2.y - focusNode.y) * (descreteCom2Node2.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteCom1Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom1Node2, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node2, 4 * unitRadius * unitRadius)).toEqual(true);

    // non overlap
    const overlapDist1 =
      (descreteCom1Node1.x - descreteCom2Node1.x) * (descreteCom1Node1.x - descreteCom2Node1.x) +
      (descreteCom1Node1.y - descreteCom2Node1.y) * (descreteCom1Node1.y - descreteCom2Node1.y);
    expect(overlapDist1 > nodeSize * nodeSize).toEqual(true);

    graph.destroy();
  });


  it('focus on descrete node, prevent overlapping with number nodeSpacing', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true,
        nodeSpacing: 10,
        nodeSize,
        maxPreventOverlapIteration: 800
      },
      defaultNode: {
        size: nodeSize
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const descreteCom1Node1 = data.nodes[0];
    const DistFnToDescreteCom1Node1 =
      (descreteCom1Node1.x - focusNode.x) * (descreteCom1Node1.x - focusNode.x) +
      (descreteCom1Node1.y - focusNode.y) * (descreteCom1Node1.y - focusNode.y);
    const descreteCom1Node2 = data.nodes[1];
    const DistFnToDescreteCom1Node2 =
      (descreteCom1Node2.x - focusNode.x) * (descreteCom1Node2.x - focusNode.x) +
      (descreteCom1Node2.y - focusNode.y) * (descreteCom1Node2.y - focusNode.y);
    const descreteCom2Node1 = data.nodes[3];
    const DistFnToDescreteCom2Node1 =
      (descreteCom2Node1.x - focusNode.x) * (descreteCom2Node1.x - focusNode.x) +
      (descreteCom2Node1.y - focusNode.y) * (descreteCom2Node1.y - focusNode.y);
    const descreteCom2Node2 = data.nodes[4];
    const DistFnToDescreteCom2Node2 =
      (descreteCom2Node2.x - focusNode.x) * (descreteCom2Node2.x - focusNode.x) +
      (descreteCom2Node2.y - focusNode.y) * (descreteCom2Node2.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteCom1Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom1Node2, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node2, 4 * unitRadius * unitRadius)).toEqual(true);

    // non overlap
    const overlapDist1 =
      (descreteCom1Node1.x - descreteCom2Node1.x) * (descreteCom1Node1.x - descreteCom2Node1.x) +
      (descreteCom1Node1.y - descreteCom2Node1.y) * (descreteCom1Node1.y - descreteCom2Node1.y);
    expect(overlapDist1 > nodeSize * nodeSize).toEqual(true);

    graph.destroy();
  });

  it('focus on descrete node, prevent overlapping with function nodeSpacing', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true,
        nodeSpacing: d => {
          return 5;
        },
        nodeSize: [nodeSize, nodeSize],
      },
      defaultNode: {
        size: nodeSize
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const descreteCom1Node1 = data.nodes[0];
    const DistFnToDescreteCom1Node1 =
      (descreteCom1Node1.x - focusNode.x) * (descreteCom1Node1.x - focusNode.x) +
      (descreteCom1Node1.y - focusNode.y) * (descreteCom1Node1.y - focusNode.y);
    const descreteCom1Node2 = data.nodes[1];
    const DistFnToDescreteCom1Node2 =
      (descreteCom1Node2.x - focusNode.x) * (descreteCom1Node2.x - focusNode.x) +
      (descreteCom1Node2.y - focusNode.y) * (descreteCom1Node2.y - focusNode.y);
    const descreteCom2Node1 = data.nodes[3];
    const DistFnToDescreteCom2Node1 =
      (descreteCom2Node1.x - focusNode.x) * (descreteCom2Node1.x - focusNode.x) +
      (descreteCom2Node1.y - focusNode.y) * (descreteCom2Node1.y - focusNode.y);
    const descreteCom2Node2 = data.nodes[4];
    const DistFnToDescreteCom2Node2 =
      (descreteCom2Node2.x - focusNode.x) * (descreteCom2Node2.x - focusNode.x) +
      (descreteCom2Node2.y - focusNode.y) * (descreteCom2Node2.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteCom1Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom1Node2, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node2, 4 * unitRadius * unitRadius)).toEqual(true);

    // non overlap
    const overlapDist1 =
      (descreteCom1Node1.x - descreteCom2Node1.x) * (descreteCom1Node1.x - descreteCom2Node1.x) +
      (descreteCom1Node1.y - descreteCom2Node1.y) * (descreteCom1Node1.y - descreteCom2Node1.y);
    expect(overlapDist1 > nodeSize * nodeSize).toEqual(true);

    graph.destroy();
  });

  it('preventOverlap, node size is array', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    const nodeSize = [40, 20];
    data.nodes.forEach(node => {
      node.size = nodeSize
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const descreteCom1Node1 = data.nodes[0];
    const DistFnToDescreteCom1Node1 =
      (descreteCom1Node1.x - focusNode.x) * (descreteCom1Node1.x - focusNode.x) +
      (descreteCom1Node1.y - focusNode.y) * (descreteCom1Node1.y - focusNode.y);
    const descreteCom1Node2 = data.nodes[1];
    const DistFnToDescreteCom1Node2 =
      (descreteCom1Node2.x - focusNode.x) * (descreteCom1Node2.x - focusNode.x) +
      (descreteCom1Node2.y - focusNode.y) * (descreteCom1Node2.y - focusNode.y);
    const descreteCom2Node1 = data.nodes[3];
    const DistFnToDescreteCom2Node1 =
      (descreteCom2Node1.x - focusNode.x) * (descreteCom2Node1.x - focusNode.x) +
      (descreteCom2Node1.y - focusNode.y) * (descreteCom2Node1.y - focusNode.y);
    const descreteCom2Node2 = data.nodes[4];
    const DistFnToDescreteCom2Node2 =
      (descreteCom2Node2.x - focusNode.x) * (descreteCom2Node2.x - focusNode.x) +
      (descreteCom2Node2.y - focusNode.y) * (descreteCom2Node2.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteCom1Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom1Node2, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node2, 4 * unitRadius * unitRadius)).toEqual(true);

    // non overlap
    const overlapDist1 =
      (descreteCom1Node1.x - descreteCom2Node1.x) * (descreteCom1Node1.x - descreteCom2Node1.x) +
      (descreteCom1Node1.y - descreteCom2Node1.y) * (descreteCom1Node1.y - descreteCom2Node1.y);
    expect(overlapDist1 > nodeSize[0] * nodeSize[0]).toEqual(true);
    expect(overlapDist1 > nodeSize[1] * nodeSize[1]).toEqual(true);
    graph.destroy();
  });

  it('preventOverlap, no nodeSize, no data size', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    data.nodes.forEach(node => {
      node.size = undefined;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const descreteCom1Node1 = data.nodes[0];
    const DistFnToDescreteCom1Node1 =
      (descreteCom1Node1.x - focusNode.x) * (descreteCom1Node1.x - focusNode.x) +
      (descreteCom1Node1.y - focusNode.y) * (descreteCom1Node1.y - focusNode.y);
    const descreteCom1Node2 = data.nodes[1];
    const DistFnToDescreteCom1Node2 =
      (descreteCom1Node2.x - focusNode.x) * (descreteCom1Node2.x - focusNode.x) +
      (descreteCom1Node2.y - focusNode.y) * (descreteCom1Node2.y - focusNode.y);
    const descreteCom2Node1 = data.nodes[3];
    const DistFnToDescreteCom2Node1 =
      (descreteCom2Node1.x - focusNode.x) * (descreteCom2Node1.x - focusNode.x) +
      (descreteCom2Node1.y - focusNode.y) * (descreteCom2Node1.y - focusNode.y);
    const descreteCom2Node2 = data.nodes[4];
    const DistFnToDescreteCom2Node2 =
      (descreteCom2Node2.x - focusNode.x) * (descreteCom2Node2.x - focusNode.x) +
      (descreteCom2Node2.y - focusNode.y) * (descreteCom2Node2.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteCom1Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom1Node2, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node1, unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteCom2Node2, 4 * unitRadius * unitRadius)).toEqual(true);

    // non overlap
    const overlapDist1 =
      (descreteCom1Node1.x - descreteCom2Node1.x) * (descreteCom1Node1.x - descreteCom2Node1.x) +
      (descreteCom1Node1.y - descreteCom2Node1.y) * (descreteCom1Node1.y - descreteCom2Node1.y);
    expect(overlapDist1 > 100).toEqual(true);
    expect(overlapDist1 > 100).toEqual(true);
    graph.destroy();
  });

  it('sort by data', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        sortBy: 'data',
        preventOverlap: true,
        maxPreventOverlapIteration: 1200
      },
      defaultNode: {
        size: nodeSize
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const node1 = data.nodes[1];
    const node2 = data.nodes[2];
    const node4 = data.nodes[4];
    const overlapDist1 =
      (node1.x - node2.x) * (node1.x - node2.x) +
      (node1.y - node2.y) * (node1.y - node2.y);
    const overlapDist2 =
      (node1.x - node4.x) * (node1.x - node4.x) +
      (node1.y - node4.y) * (node1.y - node4.y);
    expect(overlapDist1 < overlapDist2).toEqual(true);
    graph.destroy();
  });

  it('sort by sortProperty', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5];
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        sortBy: 'sortProperty',
        preventOverlap: true,
        maxPreventOverlapIteration: 1200
      },
      defaultNode: {
        size: nodeSize
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node, i) => {
      node['sortProperty'] = i % 2;
    });
    graph.data(data);
    graph.render();

    const node1 = data.nodes[1];
    const node2 = data.nodes[2];
    const node4 = data.nodes[4];
    const overlapDist1 =
      (node1.x - node2.x) * (node1.x - node2.x) +
      (node1.y - node2.y) * (node1.y - node2.y);
    const overlapDist2 =
      (node2.x - node4.x) * (node2.x - node4.x) +
      (node2.y - node4.y) * (node2.y - node4.y);
    expect(overlapDist1 > overlapDist2).toEqual(true);
    graph.destroy();
  });
});

describe('radial layout', () => {
  it('new graph with radial layout, with focusnode id', () => {
    const unitRadius = 100;
    const focusNodeId = '3';
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode: focusNodeId,
        unitRadius,
      },
      modes: {
        default: [ 'drag-canvas', 'drag-node' ]
      },
      defaultNode: {
        size: 30
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const focusNode = graph.findById(focusNodeId).getModel();
    const descreteNode = data.nodes[5];
    const DistFnToDescreteNode =
      (descreteNode.x - focusNode.x) * (descreteNode.x - focusNode.x) +
      (descreteNode.y - focusNode.y) * (descreteNode.y - focusNode.y);
    const descreteComNode1 = data.nodes[0];
    const DistFnToDescreteComNode1 =
      (descreteComNode1.x - focusNode.x) * (descreteComNode1.x - focusNode.x) +
      (descreteComNode1.y - focusNode.y) * (descreteComNode1.y - focusNode.y);
    const descreteComNode2 = data.nodes[1];
    const DistFnToDescreteComNode2 =
      (descreteComNode2.x - focusNode.x) * (descreteComNode2.x - focusNode.x) +
      (descreteComNode2.y - focusNode.y) * (descreteComNode2.y - focusNode.y);
    const descreteComNode3 = data.nodes[2];
    const DistFnToDescreteComNode3 =
      (descreteComNode3.x - focusNode.x) * (descreteComNode3.x - focusNode.x) +
      (descreteComNode3.y - focusNode.y) * (descreteComNode3.y - focusNode.y);
    expect(numberEqual(DistFnToDescreteNode, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteComNode1, 4 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteComNode2, 9 * unitRadius * unitRadius)).toEqual(true);
    expect(numberEqual(DistFnToDescreteComNode3, 9 * unitRadius * unitRadius)).toEqual(true);

    graph.destroy();
  });

  it('focus node does not exist', () => {
    const unitRadius = 100;
    const focusNodeId = 'test'; // does not exist in data
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode: focusNodeId,
        unitRadius,
      },
      defaultNode: {
        size: 30
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const radialLayout = graph.get('layoutController').layoutMethod;
    expect(radialLayout.focusNode.id).toEqual('0');
    graph.destroy();
  });

  it('focus node undefined', () => {
    const unitRadius = 100;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode: undefined,
        unitRadius,
      },
      defaultNode: {
        size: 30
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    const radialLayout = graph.get('layoutController').layoutMethod;
    expect(radialLayout.focusNode.id).toEqual('0');
    graph.destroy();
  });

  it('instantiate layout', () => {
    const unitRadius = 50;
    const radialLayout = new G6.Layout['radial']({
      unitRadius,
      preventOverlap: true,
      maxPreventOverlapIteration: null,
      sortBy: 'sortProperty',
      center: [250, 250]
    });
    data.nodes.forEach((node, i) => {
      node['sortProperty'] = '' + (i % 3);
    });
    radialLayout.init(data);
    radialLayout.execute();
    const focusNode = data.nodes[0];

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div
    });
    graph.data(data);
    graph.render();

    const descreteNode = data.nodes[5];
    const DistFnToDescreteNode =
      (descreteNode.x - focusNode.x) * (descreteNode.x - focusNode.x) +
      (descreteNode.y - focusNode.y) * (descreteNode.y - focusNode.y);
    const descreteComNode1 = data.nodes[1];
    const DistFnToDescreteComNode1 =
      (descreteComNode1.x - focusNode.x) * (descreteComNode1.x - focusNode.x) +
      (descreteComNode1.y - focusNode.y) * (descreteComNode1.y - focusNode.y);
    const descreteComNode2 = data.nodes[4];
    const DistFnToDescreteComNode2 =
      (descreteComNode2.x - focusNode.x) * (descreteComNode2.x - focusNode.x) +
      (descreteComNode2.y - focusNode.y) * (descreteComNode2.y - focusNode.y);
    const descreteComNode3 = data.nodes[2];
    const DistFnToDescreteComNode3 =
      (descreteComNode3.x - focusNode.x) * (descreteComNode3.x - focusNode.x) +
      (descreteComNode3.y - focusNode.y) * (descreteComNode3.y - focusNode.y);
    expect(numberEqual(Math.sqrt(DistFnToDescreteNode), 2 * unitRadius)).toEqual(true);
    expect(numberEqual(Math.sqrt(DistFnToDescreteComNode1), unitRadius)).toEqual(true);
    expect(numberEqual(Math.sqrt(DistFnToDescreteComNode2), 3 * unitRadius)).toEqual(true);
    expect(numberEqual(Math.sqrt(DistFnToDescreteComNode3), unitRadius)).toEqual(true);
    graph.destroy();
  });
  it('instantiate layout with center on the left', () => {
    const radialLayout = new G6.Layout['radial']({
      center: [0, 250]
    });
    radialLayout.init(data);
    radialLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x).not.toEqual(NaN);
    expect(data.nodes[0].y).not.toEqual(NaN);
    graph.destroy();
  });

  it('instantiate layout with center on the top', () => {
    const radialLayout = new G6.Layout['radial']({
      center: [250, 0],
      preventOverlap: true
    });
    radialLayout.init(data);
    radialLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div
    });
    data.nodes.forEach(node => {
      delete node.size;
    })
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x).not.toEqual(NaN);
    expect(data.nodes[0].y).not.toEqual(NaN);
    graph.destroy();
  });

  it('mds try catch', () => {
    const mds = new MDS({ distances: [[0, 0]], linkDistance: 10 });
    const positions = mds.layout();
    expect(positions[0][0]).not.toEqual(NaN);
    expect(positions[0][1]).not.toEqual(NaN);
  });
});
