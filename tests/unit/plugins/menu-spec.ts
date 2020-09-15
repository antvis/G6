import G6 from '../../../src';
import { G6GraphEvent } from '../../../src/interface/behavior';
import { IG6GraphEvent } from '../../../src/types';
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
    graph.destroy()
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
      getContent(evt) {
        return `<ul>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>`;
      },
      handleMenuClick(target, item) {
        // console.log(target, item);
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

    const event = new G6GraphEvent('contextmenu', {
      item: graph.getNodes()[0],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
    } as IG6GraphEvent);
    graph.emit('contextmenu', event)
    const menuDOM = document.getElementsByClassName('g6-component-contextmenu')[0];
    expect(menuDOM.style.visibility).toEqual('visible')
    // 将被自动加上 graph contianer 的 offsetTop offsetLeft
    // expect(menuDOM.style.top).toEqual('165px') // 在全量跑测试时不能确定
    // expect(menuDOM.style.left).toEqual('115px')

    graph.destroy();
  });
  it('menu with false shouldBegin', () => {
    let menuDOM = document.getElementsByClassName('g6-component-contextmenu')[0];
    if (menuDOM) menuDOM.remove();
    const menu = new G6.Menu({
      getContent(evt) {
        return `<ul>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>`;
      },
      shouldBegin(e) {
        console.log('shouldBegin', e.item, e.item.getID() === 'node1')
        if (e.item.getID() === 'node1') return false;
        return true;
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
          id: 'node0',
          label: 'node0',
          x: 100,
          y: 100,
        },
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 200,
        },
      ],
    };
    graph.data(data);
    graph.render();

    const event = new G6GraphEvent('contextmenu', {
      item: graph.getNodes()[1],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
    } as IG6GraphEvent);
    graph.emit('contextmenu', event)
    menuDOM = document.getElementsByClassName('g6-component-contextmenu')[0];
    expect(menuDOM.style.visibility).toEqual('hidden')

    const event2 = new G6GraphEvent('contextmenu', {
      item: graph.getNodes()[0],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
    } as IG6GraphEvent);
    graph.emit('contextmenu', event2)
    menuDOM = document.getElementsByClassName('g6-component-contextmenu')[0];
    expect(menuDOM.style.visibility).toEqual('visible')

    graph.destroy();
  });
});
