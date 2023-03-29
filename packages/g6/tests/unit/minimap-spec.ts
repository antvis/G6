import G6 from '../../src/index';

const container = document.createElement('div');
document.querySelector('body').appendChild(container);

// TODO
describe('plugin', () => {
  it('minimap with string config', () => {
    const graph = new G6.Graph({
      container,
      width: 500,
      height: 500,
      type: 'graph',
      data: {
        nodes: [
          { id: 'node1', data: { x: 100, y: 200 } },
          { id: 'node2', data: { x: 200, y: 250 } }
        ],
        edges: [
          { id: 'edge1', source: 'node1', target: 'node2', data: { } }
        ]
      },
      node: {
        labelShape: {
          text: {
            fields: ['id'],
            formatter: (model) => {
              return model.id
            }
          }
        }
      },
      modes: {
        default: ['brush-select'],
      },
      plugins: ['minimap']
    });
    graph.on('afterlayout', e => {
      graph.zoom(3);
      graph.translate(50, 250);
      // graph.addData('node', [{ id: 'node3', data: { x: 50, y: 150 }}])
      // graph.updateData('node', [{ id: 'node3', data: { x: 150, y: 50 }}])
      // graph.removeData('node', 'node3')
    });
  });
});
