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

describe.only('radial', () => {
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
  it('focus on descrete node, prevent overlapping', () => {
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
        nodeSize,
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
});
