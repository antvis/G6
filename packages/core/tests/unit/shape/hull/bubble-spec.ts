import Graph from '../../implement-graph';

const div = document.createElement('div');
div.id = 'hull-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    { id: 'node0', size: 50, x: 50, y: 50 },
    { id: 'node1', size: 30, x: 80, y: 50 },
    { id: 'node2', size: 30, x: 150, y: 50 },
    { id: 'node3', size: 30, x: 50, y: 100 },
    { id: 'node4', size: 30, isLeaf: true, x: 50, y: 150 },
    { id: 'node5', size: 30, isLeaf: true, x: 50, y: 250 },
    { id: 'node6', size: 15, isLeaf: true, x: 250, y: 50 },
    { id: 'node7', size: 15, isLeaf: true, x: 50, y: 350 },
    { id: 'node8', size: 15, isLeaf: true, x: 350, y: 50 },
    { id: 'node9', size: 15, isLeaf: true, x: 50, y: 450 },
    { id: 'node10', size: 15, isLeaf: true, x: 550, y: 50 },
    { id: 'node11', size: 15, isLeaf: true, x: 80, y: 50 },
    { id: 'node12', size: 15, isLeaf: true, x: 231, y: 50 },
    { id: 'node13', size: 15, isLeaf: true, x: 201, y: 50 },
    { id: 'node14', size: 15, isLeaf: true, x: 50, y: 201 },
    { id: 'node15', size: 15, isLeaf: true, x: 50, y: 190 },
    { id: 'node16', size: 15, isLeaf: true, x: 50, y: 209 },
  ],
  edges: [
    { source: 'node0', target: 'node1' },
    { source: 'node0', target: 'node2' },
    { source: 'node0', target: 'node3' },
    { source: 'node0', target: 'node4' },
    { source: 'node0', target: 'node5' },
    { source: 'node1', target: 'node6' },
    { source: 'node1', target: 'node7' },
    { source: 'node2', target: 'node8' },
    { source: 'node2', target: 'node9' },
    { source: 'node2', target: 'node10' },
    { source: 'node2', target: 'node11' },
    { source: 'node2', target: 'node12' },
    { source: 'node2', target: 'node13' },
    { source: 'node3', target: 'node14' },
    { source: 'node3', target: 'node15' },
    { source: 'node3', target: 'node16' },
  ],
};
const nodes = data.nodes;

describe('test bubble hull', () => {
  let graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: (d) => {
        if (d.source.id === 'node0') {
          return 300;
        }
        return 60;
      },
      nodeStrength: (d) => {
        if (d.isLeaf) {
          return -50;
        }
        return -10;
      },
      edgeStrength: (d) => {
        if (d.source.id === 'node1' || d.source.id === 'node2' || d.source.id === 'node3') {
          return 0.7;
        }
        return 0.1;
      },
    },
  });
  graph.data({
    nodes,
    edges: data.edges.map(function (edge, i) {
      edge['id'] = 'edge' + i;
      return Object.assign({}, edge);
    }),
  });
  graph.render();

  it('test genBubbleSet', () => {
    let centerNodes = graph.getNodes().filter((node) => !node.getModel().isLeaf);
    let leafGroup = graph.getNodes().filter((node) => node.getModel().isLeaf);
    const hull = graph.createHull({
      id: 'centerNode-hull',
      type: 'bubble',
      members: centerNodes,
      nonMembers: leafGroup,
      padding: 10,
      bubbleCfg: {
        morphBuffer: 10,
        pixelGroupSize: 4,
        maxMarchingIterations: 1000,
        maxRoutingIterations: 100,
        nodeR0: 10,
        nodeR1: 15,
        edgeR0: 5,
        edgeR1: 10,
        nodeInfluenceFactor: 5,
        negativeNodeInfluenceFactor: 5,
        edgeInfluenceFactor: 5,
        memberInfluenceFactor: 5,
        nonMemberInfluenceFactor: 1,
      },
    });
    expect(hull.members.length).toEqual(4);
    expect(hull.nonMembers.length).toEqual(13);
  });
});
