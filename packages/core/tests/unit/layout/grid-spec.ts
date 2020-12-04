import G6 from '../../../src';
const data = {
  nodes: [
    { id: '0', name: '0' },
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6', name: '6' },
    { id: '7', name: '7' },
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '1', target: '2' },
    { source: '2', target: '3' },
    { source: '3', target: '4' },
    { source: '5', target: '6' },
    { source: '6', target: '7' },
  ],
};

const div = document.createElement('div');
div.id = 'grid-layout';
document.body.appendChild(div);

describe('grid layout', () => {
  it('grid layout with default configs', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x != null).toEqual(true);
    graph.destroy();
  });

  it('grid layout with no node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
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

  it('grid layout with one node', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
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
    const nodeModel = graph.getNodes()[0].getModel();
    expect(nodeModel.x).toEqual(250);
    expect(nodeModel.y).toEqual(250);
    graph.destroy();
  });

  it('grid layout with fixed columns', () => {
    const graph = new G6.Graph({
      container: div,
      // 4 rows , 2 columns
      layout: {
        type: 'grid',
        cols: 2,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(
      graph.getNodes()[0].getModel().x != null && graph.getNodes()[0].getModel().y != null,
    ).toEqual(true);
    expect(
      graph.getNodes()[2].getModel().x != null && graph.getNodes()[2].getModel().y != null,
    ).toEqual(true);
    expect(graph.getNodes()[0].getModel().x === graph.getNodes()[2].getModel().x).toEqual(true);
    expect(graph.getNodes()[0].getModel().y > graph.getNodes()[2].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with fixed rows', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 2,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(
      graph.getNodes()[3].getModel().x != null && graph.getNodes()[3].getModel().y != null,
    ).toEqual(true);
    expect(
      graph.getNodes()[7].getModel().x != null && graph.getNodes()[7].getModel().y != null,
    ).toEqual(true);
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with fixed cols and rows, rows*cols>nodes, situation 1', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 2,
        cols: 6,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[2].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[2].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with fixed cols and rows, rows*cols>nodes, situation 2', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 3,
        cols: 4,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with fixed cols and rows, rows*cols<nodes, situation 1', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 2,
        cols: 2,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    expect(graph.getNodes()[5].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[5].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with fixed cols and rows, rows*cols<nodes, situation 2', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        rows: 2,
        cols: 3,
        sortBy: 'id',
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[7].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y > graph.getNodes()[7].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with condense', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        condense: true,
      },
      defaultNode: {
        size: [10, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[1].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[1].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with preventOverlap', () => {
    const dataWithoutPos: { nodes: object; edges: object } = {
      nodes: [
        { id: '0', name: '0' },
        { id: '1', name: '1' },
        { id: '2', name: '2' },
        { id: '3', name: '3' },
        { id: '4', name: '4' },
        { id: '5', name: '5' },
        { id: '6', name: '6' },
        { id: '7', name: '7' },
      ],
      edges: [
        { source: '0', target: '1' },
        { source: '1', target: '2' },
        { source: '2', target: '3' },
        { source: '3', target: '4' },
        { source: '5', target: '6' },
        { source: '6', target: '7' },
      ],
    };
    const gridLayout = new G6.Layout['grid']({
      preventOverlap: true,
    });
    gridLayout.init(dataWithoutPos);
    gridLayout.execute();
    expect(dataWithoutPos.nodes[0].x).not.toEqual(undefined);
    expect(dataWithoutPos.nodes[0].y).not.toEqual(undefined);
  });

  it('grid layout with preventOverlap, nodeSize is an array', () => {
    data.nodes.forEach((node) => {
      node['size'] = undefined;
    });
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        nodeSize: [20, 10],
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[1].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[1].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with preventOverlap, nodeSize is null', () => {
    const graph = new G6.Graph({
      container: div,
      // 2 rows , 4 columns
      layout: {
        type: 'grid',
        nodeSize: null,
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[1].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[1].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    graph.destroy();
  });

  it('grid layout with position function', () => {
    let rows = 0;
    data.nodes.forEach((node, i) => {
      node['col'] = i % 3;
      node['row'] = rows;
      if (node['col'] === 2) rows++;
    });
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
        position: (d) => {
          return {
            row: d['row'],
            col: d['col'],
          };
        },
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[0].getModel().x === graph.getNodes()[3].getModel().x).toEqual(true);
    expect(graph.getNodes()[0].getModel().y < graph.getNodes()[3].getModel().y).toEqual(true);
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    graph.destroy();
  });
  it('grid layout with position function, col undefined', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
        position: (d) => {
          return {
            row: d['row'],
          };
        },
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[1].getModel().x === graph.getNodes()[3].getModel().x).toEqual(true);
    expect(graph.getNodes()[1].getModel().y < graph.getNodes()[3].getModel().y).toEqual(true);
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    graph.destroy();
  });
  it('grid layout with position function, row undefined', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'grid',
        position: (d) => {
          return {
            col: d['col'],
          };
        },
      },
      width: 500,
      height: 500,
    });
    graph.data(data);
    graph.render();
    expect(graph.getNodes()[3].getModel().x === graph.getNodes()[6].getModel().x).toEqual(true);
    expect(graph.getNodes()[3].getModel().y < graph.getNodes()[6].getModel().y).toEqual(true);
    expect(graph.getNodes()[6].getModel().x === graph.getNodes()[0].getModel().x).toEqual(true);
    expect(graph.getNodes()[6].getModel().y < graph.getNodes()[0].getModel().y).toEqual(true);
    graph.destroy();
  });
});
