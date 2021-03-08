import G6 from '@antv/g6'; // , { G6GraphEvent, IG6GraphEvent }
import Menu from '../../src/menu';

const div = document.createElement('div');
div.id = 'menu';
document.body.appendChild(div);

describe('menu', () => {
  it('menu with default', () => {
    const menu = new Menu({
      handleMenuClick: (target, item) => {},
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
  });
  it('menu with dom', () => {
    const menu = new Menu({
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
      className: 'g6-custom-menu',
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
  });

  it('menu with string', () => {
    const menu = new Menu({
      getContent(evt) {
        return `<ul>
        <li title='1'>测试02</li>
        <li title='2'>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
        <li>测试02</li>
      </ul>`;
      },
      className: 'menu-string-test',
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

    // const event = new G6GraphEvent('contextmenu', {
    //   item: graph.getNodes()[0],
    //   canvasX: 100,
    //   canvasY: 100,
    //   bubbles: false,
    // } as IG6GraphEvent);
    const event = {
      type: 'contextmenu',
      item: graph.getNodes()[0],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    graph.emit('contextmenu', event);
    // getElementsByClassName only returns HTMLCollection<Element>
    const menuDOM = (document.getElementsByClassName(
      'menu-string-test',
    ) as HTMLCollectionOf<HTMLElement>)[0];
    expect(menuDOM.style.visibility).toEqual('visible');
  });
  it('menu with false shouldBegin', () => {
    let menuDOM = (document.getElementsByClassName(
      'g6-component-contextmenu',
    ) as HTMLCollectionOf<HTMLElement>)[0];
    if (menuDOM) menuDOM.remove();
    const menu = new Menu({
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
        // console.log('shouldBegin', e.item, e.item.getID() === 'node1')
        if (e.item.getID() === 'node1') return false;
        return true;
      },
      className: 'menu-should-begin-false',
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

    // const event = new G6GraphEvent('contextmenu', {
    //   item: graph.getNodes()[1],
    //   canvasX: 100,
    //   canvasY: 100,
    //   bubbles: false,
    // } as IG6GraphEvent);
    const event = {
      type: 'contextmenu',
      item: graph.getNodes()[1],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    graph.emit('contextmenu', event);
    menuDOM = (document.getElementsByClassName(
      'menu-should-begin-false',
    ) as HTMLCollectionOf<HTMLElement>)[0];

    expect(menuDOM.style.visibility).toEqual('hidden');

    // const event2 = new G6GraphEvent('contextmenu', {
    //   item: graph.getNodes()[0],
    //   canvasX: 100,
    //   canvasY: 100,
    //   bubbles: false,
    // } as IG6GraphEvent);

    const event2 = {
      type: 'contextmenu',
      item: graph.getNodes()[0],
      canvasX: 100,
      canvasY: 100,
      bubbles: false,
      preventDefault: () => {},
      stopPropagation: () => {},
    };
    graph.emit('contextmenu', event2);
    menuDOM = (document.getElementsByClassName(
      'menu-should-begin-false',
    ) as HTMLCollectionOf<HTMLElement>)[0];
    expect(menuDOM.style.visibility).toEqual('visible');
  });
});
