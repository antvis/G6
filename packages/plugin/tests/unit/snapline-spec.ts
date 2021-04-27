import G6 from '@antv/g6';
import SnapLine from '../../src/snapline';

const div = document.createElement('div');
div.id = 'snapline-spec';
document.body.appendChild(div);

describe('snapline', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
        label: 'node2',
      },
      {
        id: 'node3',
        label: 'node3',
      },
      {
        id: 'node4',
        label: 'node4',
      },
      {
        id: 'node5',
        label: 'node5',
      },
    ],
  };

  it('default snapLine', () => {
    const snapline = new SnapLine();
    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 300,
      defaultNode: {
        size: 40,
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      plugins: [snapline],
    });

    graph.data(data);
    graph.render();

    const plugins = graph.get('plugins');
    expect(plugins.length).toBe(1);
    const plugin = plugins[0];
    expect(plugin).not.toBe(undefined);
    const line = plugin.get('line');
    expect(line.stroke).toEqual('#FA8C16');
    expect(line.lineWidth).toBe(1);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });

  it('custom snapline', () => {
    const snapline = new SnapLine({
      line: {
        stroke: 'red',
        lineWidth: 3,
      },
      itemAlignType: true,
    });
    const graph = new G6.Graph({
      container: div,
      width: 400,
      height: 300,
      defaultNode: {
        size: 40,
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      plugins: [snapline],
    });

    graph.data(data);
    graph.render();
    const plugins = graph.get('plugins');
    expect(plugins.length).toBe(1);
    const plugin = plugins[0];
    expect(plugin).not.toBe(undefined);
    const line = plugin.get('line');
    expect(line.stroke).toEqual('red');
    expect(line.lineWidth).toBe(3);

    graph.destroy();
    expect(graph.destroyed).toBe(true);
  });
});
