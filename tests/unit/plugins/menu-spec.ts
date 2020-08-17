import G6 from '../../../src';
const div = document.createElement('div');
div.id = 'menu';
document.body.appendChild(div);

describe('menu', () => {
  it('menu with default', () => {
    const menu = new G6.Menu({
      handleMenuClick: (target, item) => {
        console.log(target, item);
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [menu],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
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
    // graph.destroy()
  });
  it('menu with dom', () => {
    const menu = new G6.Menu({
      getContent(e) {
        const outDiv = document.createElement('div');
        outDiv.style.width = '180px';
        outDiv.innerHTML = `<ul>
          <li>测试01</li>
          <li>测试01</li>
          <li>测试01</li>
          <li>测试01</li>
          <li>测试01</li>
        </ul>`;
        return outDiv;
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [menu],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
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
  it('menu with string', () => {
    const menu = new G6.Menu({
      getContent(graph1) {
        console.log('graph', graph1);
        return `<ul>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>`;
      },
      handleMenuClick(target, item) {
        console.log(target, item);
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [menu],
      modes: {
        default: ['drag-node', 'zoom-canvas', 'drag-canvas'],
      },
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
