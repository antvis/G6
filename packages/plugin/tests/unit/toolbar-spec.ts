import G6 from '@antv/g6';
import ToolBar from '../../src/toolBar';

const div = document.createElement('div');
div.id = 'toolbar';
document.body.appendChild(div);

describe('toolbar', () => {
  it('default config', () => {
    const toolbar = new ToolBar();
    expect(toolbar.get('getContent')()).not.toBe(null);

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [toolbar],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      enabledStack: true,
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          x: 300,
          y: 100,
        },
      ],
    };

    graph.data(data);
    graph.render();

    // redo 后，undo stack 有一条数据
    let stackData = graph.getStackData();
    let undoStack = stackData.undoStack;
    let redoStack = stackData.redoStack;

    expect(undoStack.length).toBe(0);
    expect(redoStack.length).toBe(0);

    // update 后，undo stack 中有 2 条数据，一条 render，一条 update
    graph.update('node1', {
      x: 120,
      y: 200,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(1);

    let firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('update');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');
    expect(firstStackData.data.after.nodes[0].x).toEqual(120);
    expect(firstStackData.data.after.nodes[0].y).toEqual(200);

    // 执行 update 后，undo stack 中有3条数据
    graph.update('node2', {
      x: 120,
      y: 350,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(2);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('update');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node2');
    expect(firstStackData.data.after.nodes[0].x).toEqual(120);
    expect(firstStackData.data.after.nodes[0].y).toEqual(350);

    // addItem 后，undo 栈中有4条数据，1个render、2个update、1个add
    graph.addItem('node', {
      id: 'node3',
      label: 'node3',
      x: 150,
      y: 150,
    });

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(3);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('add');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node3');
    expect(firstStackData.data.after.nodes[0].x).toEqual(150);
    expect(firstStackData.data.after.nodes[0].y).toEqual(150);

    // hideItem 后，undo 栈中有5条数据，1个render、2个update、1个add、1个visible
    graph.hideItem('node1');

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(4);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('visible');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');

    // remove 后，undo 栈中有6条数据，1个render、2个update、1个add、1个visible、1个delete
    graph.remove('node2');

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    expect(undoStack.length).toBe(5);

    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('delete');
    expect(firstStackData.data.before.nodes[0].id).toEqual('node2');
    expect(firstStackData.data.before.nodes[0].itemType).toEqual('node');

    // 第一次 undo 后，撤销 remove node2 操作
    toolbar.undo();

    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    redoStack = stackData.redoStack;
    expect(undoStack.length).toBe(4);
    expect(redoStack.length).toBe(1);

    firstStackData = redoStack[0];
    expect(firstStackData.action).toEqual('delete');
    expect(firstStackData.data.before.nodes[0].id).toEqual('node2');
    expect(firstStackData.data.before.nodes[0].itemType).toEqual('node');

    // 此时 undo stack 中第一个元素应该是 visible node1 的数据
    firstStackData = undoStack[0];
    expect(firstStackData.action).toEqual('visible');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');

    // 第二次 undo 后，撤销 hide node1 的操作
    toolbar.undo();
    stackData = graph.getStackData();
    undoStack = stackData.undoStack;
    redoStack = stackData.redoStack;
    expect(undoStack.length).toBe(3);
    expect(redoStack.length).toBe(2);

    firstStackData = redoStack[0];
    expect(firstStackData.action).toEqual('visible');
    expect(firstStackData.data.after.nodes[0].id).toEqual('node1');

    graph.destroy();
  });
  it('test default config', () => {
    const toolbar = new ToolBar();
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [toolbar],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      enabledStack: true,
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          label: 'node2',
          x: 300,
          y: 100,
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.destroy();
  });
  it('set config', () => {
    const tc = document.createElement('div');
    tc.id = 'toolbarContainer';
    document.body.appendChild(tc);
    const toolbar = new ToolBar({
      container: tc,
      className: 'g6-xxxy',
      getContent: () => {
        return `
          <ul>
            <li code='add'>测试</li>
            <li code='undo'>撤销</li>
          </ul>
        `;
      },
      handleClick: (code, graph) => {
        if (code === 'add') {
          graph.addItem('node', {
            id: 'node2',
            label: 'node2',
            x: 300,
            y: 150,
          });
        } else if (code === 'undo') {
          toolbar.undo();
        }
      },
    });
    expect(toolbar.get('getContent')()).not.toBe(null);

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [toolbar],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
      enabledStack: true,
    });

    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };

    graph.data(data);
    graph.render();

    graph.destroy();
  });
});
