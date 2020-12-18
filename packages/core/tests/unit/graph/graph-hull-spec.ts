import Graph from '../implement-graph';

const div = document.createElement('div');
div.id = 'hull-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
      x: 100,
      y: 100,
      group: 1,
    },
    {
      id: '2',
      label: '公司2',
      x: 120,
      y: 100,
      group: 1,
    },
    {
      id: '3',
      label: '公司3',
      x: 150,
      y: 100,
      group: 1,
    },
    {
      id: '4',
      label: '公司4',
      x: 80,
      y: 150,
      group: 1,
    },
    {
      id: '5',
      label: '公司5',
      x: 100,
      y: 180,
      group: 2,
    },
    {
      id: '6',
      label: '公司6',
      x: 100,
      y: 210,
      group: 2,
    },
    {
      id: '7',
      label: '公司7',
      x: 300,
      y: 100,
      group: 2,
    },
    {
      id: '8',
      label: '公司8',
      x: 200,
      y: 300,
      group: 2,
    },
    {
      id: '9',
      label: '公司9',
      x: 190,
      y: 400,
      group: 2,
    },
  ],
  edges: [
    {
      source: '1',
      target: '1',
      type: 'loop',
    },
    {
      source: '2',
      target: '2',
      type: 'loop',
    },
    {
      source: '1',
      target: '2',
      data: {
        type: 'A',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '3',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '2',
      target: '5',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '5',
      target: '6',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '3',
      target: '4',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '4',
      target: '7',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '8',
      data: {
        type: 'B',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
    {
      source: '1',
      target: '9',
      data: {
        type: 'C',
        amount: '100,000 元',
        date: '2019-08-03',
      },
    },
  ],
};

describe('graph hull', () => {
  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
  });

  graph.data(data);
  graph.render();
  const members = graph.getNodes().filter((node) => node.getModel().group === 2);
  const nonMembers = graph.getNodes().filter((node) => node.getModel().group === 1);
  it('add a convex hull', () => {
    graph.createHull({
      id: 'hull1',
      members,
      type: 'round-convex',
    });
  });
  it('add a bubble hull', () => {
    graph.createHull({
      id: 'hull2',
      nonMembers: members,
      members: nonMembers,
      type: 'bubble',
      padding: 10,
      style: {
        fill: 'pink',
        stroke: 'red',
      },
    });
    const hulls = Object.values(graph.getHulls());
    expect(hulls.length).toEqual(2);
  });
  it('update a convex hull', () => {
    const convexHull = graph.getHullById('hull1');
    convexHull.updateCfg({
      style: {
        fill: 'lightgreen',
        stroke: 'green',
      },
      // TODO 如果这里设置为 15，会导致 convexHull.contain('4') 结果为 true
      padding: 5,
    });

    expect(convexHull.contain('4')).toEqual(false);
    convexHull.addMember('4');
    expect(convexHull.contain('4')).toEqual(true);
    convexHull.updateCfg({
      type: 'bubble',
    });
    expect(convexHull.contain('4')).toEqual(true);
  });
  it('update a bubble hull', () => {
    const bubbleHull = graph.getHullById('hull2');
    expect(bubbleHull.contain('6')).toEqual(false);
    bubbleHull.removeNonMember('6');
    expect(bubbleHull.nonMembers.indexOf(graph.findById('6')) === -1).toEqual(true);
    expect(bubbleHull.contain('4')).toEqual(true);
    bubbleHull.removeMember('4');
    expect(bubbleHull.contain('4')).toEqual(false);
    bubbleHull.updateStyle({
      opacity: 0.4,
      fill: 'white',
    });
    bubbleHull.updateData(members, nonMembers);
    expect(bubbleHull.contain('5')).toEqual(true);
    bubbleHull.addNonMember('5');
    expect(bubbleHull.contain('5')).toEqual(false);
  });
  it('hull with one member node', () => {
    graph.createHull({
      id: 'hull3',
      members: [graph.getNodes()[0]],
      type: 'round-convex',
    });
    const hulls = Object.values(graph.getHulls());
    expect(hulls.length).toEqual(3);
  });
  it('remove hull', () => {
    let hullShapes = graph.get('hullGroup').get('children');
    expect(hullShapes.length).toEqual(3);

    expect(graph.getHulls()['hull2']).toBeDefined();
    graph.removeHull('hull2');
    hullShapes = graph.get('hullGroup').get('children');
    expect(hullShapes.length).toEqual(2);
    expect(graph.getHulls()['hull2']).not.toBeDefined();
  });
});
