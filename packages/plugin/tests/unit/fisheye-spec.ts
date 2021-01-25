import G6 from '@antv/g6';
import Fisheye from '../../src/fisheye';

const div = document.createElement('div');
div.id = 'fisheye-spec';
document.body.appendChild(div);

describe('fisheye', () => {
  const graph = new G6.Graph({
    container: div,
    width: 800,
    height: 600,
  });

  graph.addItem('node', { id: '0', x: 100, y: 100 });
  graph.addItem('node', { id: '1', x: 200, y: 200 });

  it('default fisheye', () => {
    const fisheye = new Fisheye();
    graph.addPlugin(fisheye);
    graph.emit('mousemove', { x: 100, y: 100 });
    const node0 = graph.getNodes()[0].getModel();
    const node1 = graph.getNodes()[1].getModel();

    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(246.44660940672625);
    expect(node1.y).toEqual(246.44660940672625);

    graph.emit('mousemove', { x: 200, y: 200 });
    expect(node0.x).toEqual(53.55339059327375);
    expect(node0.y).toEqual(53.55339059327375);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    fisheye.clear();
    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    graph.removePlugin(fisheye);
  });

  it('fisheye with click and wheel to adjust r and drag to adjust d', () => {
    const fisheye = new Fisheye({
      trigger: 'click',
      scaleRBy: 'wheel',
      scaleDBy: 'drag',
    });
    graph.addPlugin(fisheye);
    graph.emit('click', { x: 100, y: 100 });
    const node0 = graph.getNodes()[0].getModel();
    const node1 = graph.getNodes()[1].getModel();

    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(246.44660940672625);
    expect(node1.y).toEqual(246.44660940672625);

    graph.emit('click', { x: 200, y: 200 });
    expect(node0.x).toEqual(53.55339059327375);
    expect(node0.y).toEqual(53.55339059327375);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    // wheel to adjust the radius
    expect(fisheye.get('r')).toEqual(300);
    const lens = fisheye.get('delegate');
    const clientPos = graph.getClientByPoint(200, 200);
    lens.emit('mousewheel', { clientX: clientPos.x, clientY: clientPos.y });
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: 120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(fisheye.get('r')).toEqual(315.7894736842105);
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: -120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(fisheye.get('r')).toEqual(300);

    // drag to adjust the magnify coefficient
    expect(fisheye.get('d')).toEqual(1.5);
    lens.emit('dragstart', { x: 200, y: 200 });
    lens.emit('drag', { x: 250, y: 250 });
    expect(fisheye.get('d')).toEqual(1.6);
    expect(node0.x).toEqual(51.78827985608831);
    expect(node0.y).toEqual(51.78827985608831);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    fisheye.clear();
    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    graph.removePlugin(fisheye);
  });

  it('fisheye with click and drag to adjust r and wheel to adjust d', () => {
    const fisheye = new Fisheye({
      trigger: 'click',
      scaleRBy: 'drag',
      scaleDBy: 'wheel',
    });
    graph.addPlugin(fisheye);
    graph.emit('click', { x: 100, y: 100 });
    const node0 = graph.getNodes()[0].getModel();
    const node1 = graph.getNodes()[1].getModel();

    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(246.44660940672625);
    expect(node1.y).toEqual(246.44660940672625);

    graph.emit('click', { x: 200, y: 200 });
    expect(node0.x).toEqual(53.55339059327375);
    expect(node0.y).toEqual(53.55339059327375);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    // drag to adjust the radius
    expect(fisheye.get('r')).toEqual(300);
    const lens = fisheye.get('delegate');
    lens.emit('dragstart', { x: 200, y: 200 });
    lens.emit('drag', { x: 250, y: 250 });
    expect(fisheye.get('r')).toEqual(315.7894736842105);

    // wheel to adjust the magnify coefficient
    expect(fisheye.get('d')).toEqual(1.5);
    const clientPos = graph.getClientByPoint(200, 200);
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: 120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(fisheye.get('d')).toEqual(1.6);
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: -120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(fisheye.get('d')).toEqual(1.5);
    fisheye.updateParams({ d: fisheye.get('maxD') });
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: 120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(fisheye.get('d')).toEqual(fisheye.get('maxD'));

    expect(node0.x).toEqual(50.45623787117094);
    expect(node0.y).toEqual(50.45623787117094);

    fisheye.clear();
    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    graph.removePlugin(fisheye);
  });

  it('fisheye with drag, updateParams', () => {
    const fisheye = new Fisheye({
      trigger: 'drag',
    });
    graph.addPlugin(fisheye);
    const node0 = graph.getNodes()[0].getModel();
    const node1 = graph.getNodes()[1].getModel();

    graph.emit('click', { x: 100, y: 100 });
    const lens = fisheye.get('delegate');

    lens.emit('dragstart', { x: 100, y: 100 });
    lens.emit('drag', { x: 200, y: 200 });
    expect(node0.x).toEqual(53.55339059327375);
    expect(node0.y).toEqual(53.55339059327375);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    fisheye.updateParams({
      d: 3,
      r: 100,
      // maxD: 10,
      // minD: 0.1,
      // maxR: 500,
      // minR: 10
    });
    expect(fisheye.get('r')).toEqual(100);
    expect(fisheye.get('r2')).toEqual(10000);
    expect(fisheye.get('d')).toEqual(3);

    fisheye.clear();
    expect(node0.x).toEqual(100);
    expect(node0.y).toEqual(100);
    expect(node1.x).toEqual(200);
    expect(node1.y).toEqual(200);

    graph.removePlugin(fisheye);
  });
});
