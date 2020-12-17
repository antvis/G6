import '../../../src/behavior';
import Graph from '../../../src/graph/graph';

const div = document.createElement('div');
div.id = 'shortcuts-spec';
document.body.appendChild(div);

describe('shortcuts-call', () => {
  it('default shortcuts-call', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: ['shortcuts-call'],
      },
    });
    const node = graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });

    graph.emit('keydown', { key: 'ctrl' });
    graph.emit('keydown', { key: '1' });
    graph.emit('keyup');
    const matrix = graph.getGroup().getMatrix();
    expect(matrix[6]).toBe(200);
    expect(matrix[7]).toBe(200);

    graph.destroy();
  });
  it('Zoom 2', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      modes: {
        default: [
          {
            type: 'shortcuts-call',
            functionName: 'zoom',
            functionParams: [2],
          },
        ],
      },
    });
    graph.addItem('node', {
      color: '#666',
      x: 50,
      y: 50,
      size: 20,
      style: { lineWidth: 2, fill: '#666' },
    });

    graph.emit('keydown', { key: 'ctrl' });
    graph.emit('keydown', { key: '1' });
    graph.emit('keyup');
    const matrix = graph.getGroup().getMatrix();
    expect(matrix[0]).toBe(2);
    expect(matrix[4]).toBe(2);

    graph.destroy();
  });
});
