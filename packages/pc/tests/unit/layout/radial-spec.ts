import G6 from '../../../src';
import { numberEqual } from './util';

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
    graph.on('afterlayout', () => {
      const center = [graph.get('width') / 2, graph.get('height') / 2];
      const focusNode = graph.getNodes()[0].getModel();
      expect(numberEqual(focusNode.x, center[0])).toEqual(true);
      expect(numberEqual(focusNode.y, center[1])).toEqual(true);
      graph.destroy();
    });
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
    graph.on('afterlayout', () => {
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
      nodes: [],
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
      nodes: [
        {
          id: 'node',
        },
      ],
    });
    graph.render();
    graph.on('afterlayout', () => {
      const nodeModel = graph.getNodes()[0].getModel();
      expect(nodeModel.x).toEqual(250);
      expect(nodeModel.y).toEqual(250);
      graph.destroy();
    });
  });

  it('focus on descrete node, prevent overlapping', () => {
    const unitRadius = 100;
    const focusNode = data.nodes[5]; //data.nodes[5];//'5';
    const nodeSize = 40;
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode: '5',
        unitRadius,
        preventOverlap: true,
        maxPreventOverlapIteration: 800,
      },
      defaultNode: {
        size: nodeSize,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();

    graph.on('afterlayout', () => {
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
        maxPreventOverlapIteration: 800,
      },
      defaultNode: {
        size: nodeSize,
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
        nodeSpacing: (d) => {
          return 5;
        },
        nodeSize: [nodeSize, nodeSize],
      },
      defaultNode: {
        size: nodeSize,
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
    data.nodes.forEach((node) => {
      node.size = nodeSize;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true,
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
    data.nodes.forEach((node) => {
      node.size = undefined;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
        focusNode,
        unitRadius,
        preventOverlap: true,
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
        maxPreventOverlapIteration: 1200,
      },
      defaultNode: {
        size: nodeSize,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      const node1 = data.nodes[1];
      const node2 = data.nodes[2];
      const node4 = data.nodes[4];
      const overlapDist1 =
        (node1.x - node2.x) * (node1.x - node2.x) + (node1.y - node2.y) * (node1.y - node2.y);
      const overlapDist2 =
        (node1.x - node4.x) * (node1.x - node4.x) + (node1.y - node4.y) * (node1.y - node4.y);
      expect(overlapDist1 < overlapDist2).toEqual(true);
      graph.destroy();
    });
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
        maxPreventOverlapIteration: 1200,
      },
      defaultNode: {
        size: nodeSize,
      },
      width: 500,
      height: 500,
    });
    data.nodes.forEach((node, i) => {
      node['sortProperty'] = i % 2;
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      const node1 = data.nodes[1];
      const node2 = data.nodes[2];
      const node4 = data.nodes[4];
      const overlapDist1 =
        (node1.x - node2.x) * (node1.x - node2.x) + (node1.y - node2.y) * (node1.y - node2.y);
      const overlapDist2 =
        (node2.x - node4.x) * (node2.x - node4.x) + (node2.y - node4.y) * (node2.y - node4.y);
      expect(overlapDist1 > overlapDist2).toEqual(true);
      graph.destroy();
    });
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
        default: ['drag-canvas', 'drag-node'],
      },
      defaultNode: {
        size: 30,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
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
        size: 30,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      const radialLayout = graph.get('layoutController').layoutMethods[0];
      expect(radialLayout.focusNode.id).toEqual('0');
      graph.destroy();
    });
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
        size: 30,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    graph.on('afterlayout', () => {
      const radialLayout = graph.get('layoutController').layoutMethods[0];
      expect(radialLayout.focusNode.id).toEqual('0');
      graph.destroy();
    });
  });

  it('instantiate layout', () => {
    const unitRadius = 50;
    const radialLayout = new G6.Layout['radial']({
      unitRadius,
      preventOverlap: true,
      maxPreventOverlapIteration: null,
      sortBy: 'sortProperty',
      center: [250, 250],
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
      container: div,
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
      center: [0, 250],
    });
    radialLayout.init(data);
    radialLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div,
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
      preventOverlap: true,
    });
    radialLayout.init(data);
    radialLayout.execute();

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div,
    });
    data.nodes.forEach((node) => {
      delete node.size;
    });
    graph.data(data);
    graph.render();
    expect(data.nodes[0].x).not.toEqual(NaN);
    expect(data.nodes[0].y).not.toEqual(NaN);
    graph.destroy();
  });

  it('radial with data sort', () => {
    const data2: any = {
      nodes: [
        {
          id: '0',
          label: '0',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '1',
          label: '1',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '2',
          label: '2',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '3',
          label: '3',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '4',
          label: '4',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '5',
          label: '5',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '6',
          label: '6',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '7',
          label: '7',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '8',
          label: '8',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '9',
          label: '9',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '10',
          label: '10',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '11',
          label: '11',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '12',
          label: '12',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '13',
          label: '13',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '14',
          label: '14',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '15',
          label: '15',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '16',
          label: '16',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '17',
          label: '17',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '18',
          label: '18',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '19',
          label: '19',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '20',
          label: '20',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '21',
          label: '21',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '22',
          label: '22',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '23',
          label: '23',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '24',
          label: '24',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '25',
          label: '25',
          sortAttr: 0,
          sortAttr2: 'a',
        },
        {
          id: '26',
          label: '26',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '27',
          label: '27',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '28',
          label: '28',
          sortAttr: 3,
          sortAttr2: 'd',
        },
        {
          id: '29',
          label: '29',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '30',
          label: '30',
          sortAttr: 2,
          sortAttr2: 'c',
        },
        {
          id: '31',
          label: '31',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '32',
          label: '32',
          sortAttr: 1,
          sortAttr2: 'b',
        },
        {
          id: '33',
          label: '33',
          sortAttr: 0,
          sortAttr2: 'a',
        },
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
          source: '0',
          target: '3',
        },
        {
          source: '0',
          target: '4',
        },
        {
          source: '0',
          target: '5',
        },
        {
          source: '0',
          target: '7',
        },
        {
          source: '0',
          target: '8',
        },
        {
          source: '0',
          target: '9',
        },
        {
          source: '0',
          target: '10',
        },
        {
          source: '0',
          target: '11',
        },
        {
          source: '0',
          target: '13',
        },
        {
          source: '0',
          target: '14',
        },
        {
          source: '0',
          target: '15',
        },
        {
          source: '0',
          target: '16',
        },
        {
          source: '2',
          target: '3',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '4',
          target: '6',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '7',
          target: '13',
        },
        {
          source: '8',
          target: '14',
        },
        {
          source: '9',
          target: '10',
        },
        {
          source: '10',
          target: '22',
        },
        {
          source: '10',
          target: '14',
        },
        {
          source: '10',
          target: '12',
        },
        {
          source: '10',
          target: '24',
        },
        {
          source: '10',
          target: '21',
        },
        {
          source: '10',
          target: '20',
        },
        {
          source: '11',
          target: '24',
        },
        {
          source: '11',
          target: '22',
        },
        {
          source: '11',
          target: '14',
        },
        {
          source: '12',
          target: '13',
        },
        {
          source: '16',
          target: '17',
        },
        {
          source: '16',
          target: '18',
        },
        {
          source: '16',
          target: '21',
        },
        {
          source: '16',
          target: '22',
        },
        {
          source: '17',
          target: '18',
        },
        {
          source: '17',
          target: '20',
        },
        {
          source: '18',
          target: '19',
        },
        {
          source: '19',
          target: '20',
        },
        {
          source: '19',
          target: '33',
        },
        {
          source: '19',
          target: '22',
        },
        {
          source: '19',
          target: '23',
        },
        {
          source: '20',
          target: '21',
        },
        {
          source: '21',
          target: '22',
        },
        {
          source: '22',
          target: '24',
        },
        {
          source: '22',
          target: '25',
        },
        {
          source: '22',
          target: '26',
        },
        {
          source: '22',
          target: '23',
        },
        {
          source: '22',
          target: '28',
        },
        {
          source: '22',
          target: '30',
        },
        {
          source: '22',
          target: '31',
        },
        {
          source: '22',
          target: '32',
        },
        {
          source: '22',
          target: '33',
        },
        {
          source: '23',
          target: '28',
        },
        {
          source: '23',
          target: '27',
        },
        {
          source: '23',
          target: '29',
        },
        {
          source: '23',
          target: '30',
        },
        {
          source: '23',
          target: '31',
        },
        {
          source: '23',
          target: '33',
        },
        {
          source: '32',
          target: '33',
        },
      ],
    };

    const graph = new G6.Graph({
      width: 500,
      height: 500,
      container: div,
      layout: {
        type: 'radial',
        center: [250, 250],
        preventOverlap: true,
        sortBy: 'sortAttr2',
        sortStrength: 100,
      },
      modes: {
        default: ['drag-node'],
      },
    });
    const colors = ['#e5e5e5', 'green', '#5AD8A6', 'rgb(95, 149, 255)'];
    const colorsObj = { a: '#e5e5e5', b: 'green', c: '#5AD8A6', d: 'rgb(95, 149, 255)' };
    data2.nodes.forEach((node) => {
      node.size = 15;
      node.label = ' ';
      node.style = {
        lineWidth: 3,
        fill: '#fff',
        stroke: colors[node.sortAttr2] || colorsObj[node.sortAttr2],
      };
    });
    graph.data(data2);
    graph.render();
  });
});
