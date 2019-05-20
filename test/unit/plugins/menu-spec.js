const expect = require('chai').expect;
const Simulate = require('event-simulate');
const G6 = require('../../../src');
const Menu = require('../../../plugins/menu');

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
        expect(isNaN(e.canvasX));
        expect(isNaN(e.canvasY));
      },
      onHide() {
        count++;
        return hide;
      },
      getContent(e) {
        expect(e).not.to.be.undefined;
        return 'test menu';
      }
    });
    menu.initPlugin(graph);
    expect(div.childNodes.length).to.equal(2);
    const container = div.childNodes[1];
    expect(container.className).to.equal('g6-analyzer-menu');
    expect(container.style.visibility).to.equal('hidden');
    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });
    expect(container.style.visibility).to.equal('visible');
    expect(container.innerHTML).to.equal('test menu');
    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });
    expect(container.style.visibility).to.equal('hidden');
    expect(count).to.equal(1);
    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });
    hide = false;
    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });
    expect(container.style.visibility).to.equal('visible');
    menu.destroyPlugin();
    Simulate.simulate(document.body, 'click', {
      clientY: 10,
      clientX: 10
    });
    expect(count).to.equal(2);
    expect(div.childNodes.length).to.equal(1);
  });
  it('create menu outside', () => {
    const div = document.createElement('div');
    div.style.width = '200px';
    div.style.height = '200px';
    div.style.visibility = 'hidde';
    document.body.appendChild(div);
    const menu = new Menu({
      createDOM: false,
      menu: div,
      onShow(e) {
        div.style.left = e.canvasX + 'px';
        div.style.top = e.canvasY + 'px';
        div.style.visibility = 'visible';
      },
      onHide() {
        div.style.visibility = 'hidden';
      }
    });
    menu.initPlugin(graph);
    graph.emit('contextmenu', { canvasX: 0, canvasY: 0 });
    expect(div.style.left).to.equal('0px');
    expect(div.style.top).to.equal('0px');
    expect(div.style.visibility).to.equal('visible');
    Simulate.simulate(document.body, 'click', {
      clientY: 0,
      clientX: 0
    });
    expect(div.style.visibility).to.equal('hidden');
    graph.emit('contextmenu', { canvasX: 400, canvasY: 400 });
    expect(div.style.left).to.equal('300px');
    expect(div.style.top).to.equal('300px');
    expect(div.style.visibility).to.equal('visible');
    menu.destroyPlugin();
  });
});
