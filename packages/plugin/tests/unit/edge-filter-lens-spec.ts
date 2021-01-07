import G6 from '@antv/g6';
import EdgeFilterLens from '../../src/edgeFilterLens';

const mathEqual = (a: number, b: number) => {
  return Math.abs(a - b) < 1;
};

const div = document.createElement('div');
div.id = 'filter-spec';
document.body.appendChild(div);

describe('edge filter lens', () => {
  const graph = new G6.Graph({
    container: div,
    width: 800,
    height: 600,
  });

  graph.addItem('node', { id: '0', x: 100, y: 100 });
  graph.addItem('node', { id: '1', x: 200, y: 200 });
  graph.addItem('node', { id: '2', x: 130, y: 100 });
  graph.addItem('edge', { source: '0', target: '1', size: 1 });
  graph.addItem('edge', { source: '0', target: '2', size: 1 });

  it('default edge filter lens(mousemove),  and shouldShow and show edge label, updateParams', () => {
    const filter = new EdgeFilterLens({
      type: 'only-source',
      r: 20,
      shouldShow: (e) => {
        return e.size === 3;
      },
    });
    graph.addPlugin(filter);
    graph.emit('mousemove', { x: 100, y: 100 });
    let vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(5);
    let textCount = 0,
      pathCount = 0,
      groupCount = 0;
    vShapes.forEach((shape) => {
      const shapeType = shape.get('type');
      if (shapeType === 'text') textCount++;
      else if (shapeType === 'path') pathCount++;
      else groupCount++;
    });
    expect(textCount).toEqual(2);
    expect(pathCount).toEqual(2);
    expect(groupCount).toEqual(1);

    filter.updateParams({ r: 50, minR: 5, maxR: 500, scaleRBy: 'wheel' });
    graph.emit('mousemove', { x: 100, y: 100 });
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(5);
    textCount = 0;
    pathCount = 0;
    groupCount = 0;
    vShapes.forEach((shape) => {
      const shapeType = shape.get('type');
      if (shapeType === 'text') textCount++;
      else if (shapeType === 'path') pathCount++;
      else groupCount++;
    });
    expect(textCount).toEqual(1);
    expect(pathCount).toEqual(1);
    expect(groupCount).toEqual(3);

    filter.clear();
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(0);

    graph.removePlugin(filter);
  });

  it('filter lens with click and wheel to adjust r', () => {
    const filter = new EdgeFilterLens({
      trigger: 'click',
      scaleRBy: 'wheel',
    });
    graph.addPlugin(filter);
    graph.emit('click', { x: 300, y: 300 });
    let vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(0);

    graph.emit('click', { x: 110, y: 100 });
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(3);

    graph.emit('click', { x: 200, y: 200 });
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(1);

    // wheel to adjust the radius
    expect(filter.get('r')).toEqual(60);
    const lens = filter.get('delegate');
    const clientPos = graph.getClientByPoint(200, 200);
    lens.emit('mousewheel', { clientX: clientPos.x, clientY: clientPos.y });
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: 120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(mathEqual(filter.get('r'), 63)).toEqual(true);
    lens.emit('mousewheel', {
      originalEvent: { wheelDelta: -120 },
      clientX: clientPos.x,
      clientY: clientPos.y,
    });
    expect(mathEqual(filter.get('r'), 60)).toEqual(true);

    filter.clear();
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(0);
    expect(lens.destroyed).toEqual(true);

    graph.removePlugin(filter);
  });

  it.only('filter lens with drag', () => {
    graph.addItem('node', { id: '3', x: 130, y: 60, label: '3' });
    graph.addItem('node', { id: '4', x: 130, y: 120, label: '4' });
    graph.addItem('edge', { source: '0', target: '3', size: 3, label: 'a' });
    graph.addItem('edge', { source: '0', target: '4', size: 3, label: 'a' });

    const filter = new EdgeFilterLens({
      trigger: 'drag',
    });
    graph.addPlugin(filter);
    graph.emit('click', { x: 100, y: 100 });
    const lens = filter.get('delegate');
    lens.emit('dragstart', { x: 110, y: 100 });

    lens.emit('drag', { x: 300, y: 300 });
    let vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(0);

    lens.emit('drag', { x: 110, y: 100 });
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(9);

    lens.emit('drag', { x: 200, y: 200 });
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(1);

    filter.clear();
    vShapes = filter.get('vShapes');
    expect(vShapes.length).toEqual(0);
    expect(lens.destroyed).toEqual(true);

    graph.removePlugin(filter);
  });
});
