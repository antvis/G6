import G6 from '@antv/g6';
import Ruler from '../../src/ruler';

const div = document.createElement('div');
div.id = 'ruler-spec';
document.body.appendChild(div);


describe('ruler', () => {
  const ruler = new Ruler();
  const graph = new G6.Graph({
    container: div,
    width: 800,
    height: 600,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    },
    plugins: [ruler],
  });

  graph.addItem('node', { x: 100, y: 100 });
  graph.addItem('node', { x: -100, y: -100 });

  it('ruler', () => {
    const container = ruler.getContainer();

    expect(container).not.toBe(undefined);
    expect(container.childNodes.length).toEqual(3);

    ruler.resetRulerSize(800)
    expect(ruler.get("width")).toEqual(800);

    ruler.changeVisible(false)
    expect(ruler.get("visible")).toEqual(false);
    expect(container.style.display).toEqual('none');

    ruler.changeLockZoom(false)
    expect(ruler.get("lockZoom")).toEqual(false);
    
  });
  it('ruler destroy', () => {
    const container = graph.get('container');
    expect(container.childNodes.length).toEqual(2);

    graph.destroy();
    expect(container.childNodes.length).toEqual(0);
  });
});
