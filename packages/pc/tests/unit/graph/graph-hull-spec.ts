import { Graph } from '../../../src';

const div = document.createElement('div');
div.id = 'hull-spec';
document.body.appendChild(div);

const data = {
  nodes: [
    {
      id: '1',
      label: '公司1',
      group: 1,
    },
    {
      id: '2',
      label: '公司2',
      group: 1,
    },
    {
      id: '3',
      label: '公司3',
      group: 1,
    },
    {
      id: '4',
      label: '公司4',
      group: 1,
    },
    {
      id: '5',
      label: '公司5',
      group: 2,
    },
    {
      id: '6',
      label: '公司6',
      group: 2,
    },
    {
      id: '7',
      label: '公司7',
      group: 2,
    },
    {
      id: '8',
      label: '公司8',
      group: 2,
    },
    {
      id: '9',
      label: '公司9',
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
    modes: {
      default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
    },
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
      padding: 15,
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
    // debugger
    bubbleHull.contain('4');

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
  it('remove hull', () => {
    let hullShapes = graph.get('hullGroup').get('children');
    expect(hullShapes.length).toEqual(2);

    expect(graph.getHulls()['hull2']).toBeDefined();
    graph.removeHull('hull2');
    hullShapes = graph.get('hullGroup').get('children');
    expect(hullShapes.length).toEqual(1);
    expect(graph.getHulls()['hull2']).not.toBeDefined();
    graph.destroy();
  });
});

describe('graph hull', () => {
  const data2 = {
    nodes: [
      {
        id: '1',
        label: '公司1',
        group: 1,
      },
      {
        id: '2',
        label: '公司2',
        group: 1,
      },
      {
        id: '3',
        label: '公司3',
        group: 1,
      },
      {
        id: '4',
        label: '公司4',
        group: 1,
      },
      {
        id: '5',
        label: '公司5',
        group: 2,
      },
      {
        id: '6',
        label: '公司6',
        group: 2,
      },
      {
        id: '7',
        label: '公司7',
        group: 2,
      },
      {
        id: '8',
        label: '公司8',
        group: 2,
      },
      {
        id: '9',
        label: '公司9',
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
  const graph = new Graph({
    container: div,
    width: 800,
    height: 400,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    fitView: true,
    layout: {
      type: 'grid',
    },
  });
  graph.data(data2);
  graph.render();
  it('unshift problem', () => {
    graph.createHull({
      id: 'hull1',
      type: 'smooth-convex',
      padding: 15,
      members: ['1', '2', '4'],
    });
    expect(graph.getHulls()['hull1']).not.toBe('undefined');
    graph.destroy();
  });
});
