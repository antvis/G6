import G6, { GraphData, IGraph } from '../../src/index';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

xdescribe('node item', () => {
  let graph: IGraph<any>;
  it('new graph with one node', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 200 },
          },
        ],
      },
    });

    graph.on('afterrender', () => {
      const nodeItem = graph.itemController.itemMap['node1'];
      expect(nodeItem).not.toBe(undefined);
      expect(nodeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update node label', () => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: {
          text: 'node-label',
          position: 'left',
        },
      },
    });
    const nodeItem = graph.itemController.itemMap['node1'];
    expect(nodeItem.shapeMap.labelShape).not.toBe(undefined);
    expect(nodeItem.shapeMap.labelShape.attributes.text).toBe('node-label');
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#000');

    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: {
          fill: '#00f',
        },
      },
    });
    expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');

    graph.updateData('node', {
      id: 'node1',
      data: {
        labelShape: undefined,
      },
    });
    expect(nodeItem.shapeMap.labelShape).toBe(undefined);
  });
  it('update node icon', () => {
    graph.updateData('node', {
      id: 'node1',
      data: {
        iconShape: {
          img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
        },
      },
    });

    graph.updateData('node', {
      id: 'node1',
      data: {
        iconShape: {
          text: 'A',
          fill: '#fff',
          fontWeight: 500,
        },
      },
    });
  });
});

describe('edge item', () => {
  let graph: IGraph<any>;
  it('new graph with two nodes and one edge', (done) => {
    graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          {
            id: 'node1',
            data: { x: 100, y: 100 },
          },
          {
            id: 'node2',
            data: { x: 300, y: 300 },
          },
        ],
        edges: [
          {
            id: 'edge1',
            source: 'node1',
            target: 'node2',
            data: {},
          },
        ],
      },
    });

    graph.on('afterrender', () => {
      const edgeItem = graph.itemController.itemMap['edge1'];
      expect(edgeItem).not.toBe(undefined);
      expect(edgeItem.shapeMap.labelShape).toBe(undefined);
      done();
    });
  });
  it('update edge label', () => {
    graph.updateData('edge', {
      id: 'edge1',
      data: {
        labelShape: {
          text: 'edge-label',
          position: 'start',
          // background: {}, // TODO
        },
      },
    });
    const edgeitem = graph.itemController.itemMap['edge1'];
    expect(edgeitem.shapeMap.labelShape).not.toBe(undefined);
    expect(edgeitem.shapeMap.labelShape.attributes.text).toBe('edge-label');
    expect(edgeitem.shapeMap.labelShape.attributes.fill).toBe('#000');

    // graph.updateData('node', {
    //   id: 'node1',
    //   data: {
    //     labelShape: {
    //       fill: '#00f',
    //     },
    //   },
    // });
    // expect(nodeItem.shapeMap.labelShape.attributes.fill).toBe('#00f');

    // graph.updateData('node', {
    //   id: 'node1',
    //   data: {
    //     labelShape: undefined,
    //   },
    // });
    // expect(nodeItem.shapeMap.labelShape).toBe(undefined);
  });
  // it('update node icon', () => {
  //   graph.updateData('node', {
  //     id: 'node1',
  //     data: {
  //       iconShape: {
  //         img: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
  //       },
  //     },
  //   });

  //   graph.updateData('node', {
  //     id: 'node1',
  //     data: {
  //       iconShape: {
  //         text: 'A',
  //         fill: '#fff',
  //         fontWeight: 500,
  //       },
  //     },
  //   });
  // });
});
