import Simulate from 'event-simulate';
import Menu from '../../../src/plugins/menu';
import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'menu';

describe('menu', () => {
  const graph = new G6.Graph({
    container: div,
    width: 500,
    height: 500
  });
  it('init & destroy', () => {
    let count = 0;
    let hide = true;
    const menu = new Menu({
      onShow(e) {
        expect(isNaN(e.canvasX)).toBe(false);
        expect(isNaN(e.canvasY)).toBe(false);
        return true
      },
      onHide() {
        count++;
        return hide;
      },
      getContent(e) {
        expect(e).not.toBe(undefined);
        return 'test menu';
      }
    });

    menu.initPlugin(graph);

    expect(div.childNodes.length).toEqual(2);

    const container: HTMLDivElement = div.childNodes[1] as HTMLDivElement;

    expect(container.className).toEqual('g6-analyzer-menu');
    expect(container.style.visibility).toEqual('hidden');

    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });

    expect(container.style.visibility).toEqual('visible');
    expect(container.innerHTML).toEqual('test menu');

    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });

    expect(container.style.visibility).toEqual('hidden');
    expect(count).toEqual(1);

    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });

    hide = false;
    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });

    expect(container.style.visibility).toEqual('visible');

    menu.destroyPlugin();
    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });

    expect(count).toEqual(2);
    expect(div.childNodes.length).toEqual(1);
  });
  it('create menu outside', () => {
    const outDiv = document.createElement('div');
    outDiv.style.width = '200px';
    outDiv.style.height = '200px';
    outDiv.style.visibility = 'hidde';
    document.body.appendChild(outDiv);

    const menu = new Menu({
      createDOM: false,
      menu: outDiv,
      getContent(e) {
        expect(e).not.toBe(undefined);
        return 'test menu';
      },
      onShow(e) {
        outDiv.style.left = e.canvasX + 'px';
        outDiv.style.top = e.canvasY + 'px';
        outDiv.style.visibility = 'visible';
        return true
      },
      onHide() {
        outDiv.style.visibility = 'hidden';
        return false
      }
    });

    menu.initPlugin(graph);
    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });

    expect(outDiv.style.left).toEqual('0px');
    expect(outDiv.style.top).toEqual('0px');
    expect(outDiv.style.visibility).toEqual('visible');

    Simulate.simulate(document.body, 'click', {
      clientY: 0,
      clientX: 0
    });

    expect(outDiv.style.visibility).toEqual('hidden');

    graph.emit('contextmenu', { canvasX: 400, canvasY: 400 });

    expect(outDiv.style.left).toEqual('300px');
    expect(outDiv.style.top).toEqual('300px');
    expect(outDiv.style.visibility).toEqual('visible');
    
    menu.destroyPlugin();
  });
});
