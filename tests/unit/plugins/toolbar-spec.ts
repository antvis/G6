import G6 from '../../../src';
import { IGraph } from '../../../src/interface/graph';
const div = document.createElement('div');
div.id = 'toolbar';
document.body.appendChild(div);

describe('toolbar', () => {
  it('default config', () => {
    const toolbar = new G6.ToolBar();
    expect(toolbar.get('getContent')()).not.toBe(null)

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [toolbar],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100
        }
      ]
    }

    graph.data(data)
    graph.render()
  })
  it('set config', () => {
    const tc = document.createElement('div');
    tc.id = 'toolbarContainer';
    document.body.appendChild(tc);
    const toolbar = new G6.ToolBar({
      container: tc,
      getContent: () => {
        return `
          <ul>
            <li code='add'>测试</li>
            <li code='undo'>撤销</li>
          </ul>
        `
      },
      handleClick: (code, graph) => {
        if (code === 'add') {
          graph.addItem('node', {
            id: 'node2',
            label: 'node2',
            x: 300,
            y: 150
          })
        } else if (code === 'undo') {
          graph.undo()
        }
      }
    });
    expect(toolbar.get('getContent')()).not.toBe(null)

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [toolbar],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas']
      }
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100
        }
      ]
    }

    graph.data(data)
    graph.render()
  })
});
