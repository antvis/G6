import G6 from '@antv/g6';
import Simulate from 'event-simulate';
import Minimap from '../../src/minimap';

export function mathEqual(a: number, b: number, threshold: number = 1) {
  return Math.abs(a - b) < threshold;
}

const cdata = {
  nodes: [
    {
      id: '0',
      label: '0',
    },
    {
      id: '1',
      label: '1',
    },
    {
      id: '2',
      label: '2',
    },
    {
      id: '3',
      label: '3',
    },
    {
      id: '4',
      label: '4',
    },
    {
      id: '5',
      label: '5',
    },
    {
      id: '6',
      label: '6',
    },
    {
      id: '7',
      label: '7',
    },
    {
      id: '8',
      label: '8',
    },
    {
      id: '9',
      label: '9',
    },
    {
      id: '10',
      label: '10',
    },
    {
      id: '11',
      label: '11',
    },
    {
      id: '12',
      label: '12',
    },
    {
      id: '13',
      label: '13',
    },
    {
      id: '14',
      label: '14',
    },
    {
      id: '15',
      label: '15',
    },
    {
      id: '16',
      label: '16',
    },
    {
      id: '17',
      label: '17',
    },
    {
      id: '18',
      label: '18',
    },
    {
      id: '19',
      label: '19',
    },
    {
      id: '20',
      label: '20',
    },
    {
      id: '21',
      label: '21',
    },
    {
      id: '22',
      label: '22',
    },
    {
      id: '23',
      label: '23',
    },
    {
      id: '24',
      label: '24',
    },
    {
      id: '25',
      label: '25',
    },
    {
      id: '26',
      label: '26',
    },
    {
      id: '27',
      label: '27',
    },
    {
      id: '28',
      label: '28',
    },
    {
      id: '29',
      label: '29',
    },
    {
      id: '30',
      label: '30',
    },
    {
      id: '31',
      label: '31',
    },
    {
      id: '32',
      label: '32',
    },
    {
      id: '33',
      label: '33',
    },
  ],
  edges: [
    {
      source: '0',
      target: '1',
    },
    {
      source: '0',
      target: '2',
    },
    {
      source: '0',
      target: '3',
    },
    {
      source: '0',
      target: '4',
    },
    {
      source: '0',
      target: '5',
    },
    {
      source: '0',
      target: '7',
    },
    {
      source: '0',
      target: '8',
    },
    {
      source: '0',
      target: '9',
    },
    {
      source: '0',
      target: '10',
    },
    {
      source: '0',
      target: '11',
    },
    {
      source: '0',
      target: '13',
    },
    {
      source: '0',
      target: '14',
    },
    {
      source: '0',
      target: '15',
    },
    {
      source: '0',
      target: '16',
    },
    {
      source: '2',
      target: '3',
    },
    {
      source: '4',
      target: '5',
    },
    {
      source: '4',
      target: '6',
    },
    {
      source: '5',
      target: '6',
    },
    {
      source: '7',
      target: '13',
    },
    {
      source: '8',
      target: '14',
    },
    {
      source: '9',
      target: '10',
    },
    {
      source: '10',
      target: '22',
    },
    {
      source: '10',
      target: '14',
    },
    {
      source: '10',
      target: '12',
    },
    {
      source: '10',
      target: '24',
    },
    {
      source: '10',
      target: '21',
    },
    {
      source: '10',
      target: '20',
    },
    {
      source: '11',
      target: '24',
    },
    {
      source: '11',
      target: '22',
    },
    {
      source: '11',
      target: '14',
    },
    {
      source: '12',
      target: '13',
    },
    {
      source: '16',
      target: '17',
    },
    {
      source: '16',
      target: '18',
    },
    {
      source: '16',
      target: '21',
    },
    {
      source: '16',
      target: '22',
    },
    {
      source: '17',
      target: '18',
    },
    {
      source: '17',
      target: '20',
    },
    {
      source: '18',
      target: '19',
    },
    {
      source: '19',
      target: '20',
    },
    {
      source: '19',
      target: '33',
    },
    {
      source: '19',
      target: '22',
    },
    {
      source: '19',
      target: '23',
    },
    {
      source: '20',
      target: '21',
    },
    {
      source: '21',
      target: '22',
    },
    {
      source: '22',
      target: '24',
    },
    {
      source: '22',
      target: '25',
    },
    {
      source: '22',
      target: '26',
    },
    {
      source: '22',
      target: '23',
    },
    {
      source: '22',
      target: '28',
    },
    {
      source: '22',
      target: '30',
    },
    {
      source: '22',
      target: '31',
    },
    {
      source: '22',
      target: '32',
    },
    {
      source: '22',
      target: '33',
    },
    {
      source: '23',
      target: '28',
    },
    {
      source: '23',
      target: '27',
    },
    {
      source: '23',
      target: '29',
    },
    {
      source: '23',
      target: '30',
    },
    {
      source: '23',
      target: '31',
    },
    {
      source: '23',
      target: '33',
    },
    {
      source: '32',
      target: '33',
    },
  ],
};
const div = document.createElement('div');
div.id = 'minimap';
document.body.appendChild(div);
const container = document.createElement('div');
container.id = 'minimap-container';
div.appendChild(container);

const isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const dragEvent = isFireFox ? 'dragover' : 'drag';

describe('minimap', () => {
  it('minimap with default settings & destroy', (done) => {
    const minimap = new Minimap({ size: [200, 200] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        type: 'line',
        style: {
          endArrow: {
            path: 'M 10,0 L -10,-10 L -10,10 Z',
            d: 10,
          },
        },
      },
      modes: {
        default: [
          {
            type: 'drag-node',
            delegate: false,
          },
          'zoom-canvas',
          'click-select',
          'drag-canvas',
        ],
      },
      plugins: [minimap],
    });

    graph.addItem('node', { id: 'node1', label: 'text1', x: 50, y: 50 });
    graph.addItem('node', { id: 'node2', label: 'text2', x: 120, y: 150 });
    graph.addItem('node', { id: 'node3', label: 'text3', x: 150, y: 190 });
    graph.addItem('node', { id: 'node4', label: 'text4', x: 220, y: 250 });
    graph.addItem('edge', { id: 'edge1', source: 'node1', target: 'node2' });
    const canvas = minimap.getCanvas();
    expect(canvas).not.toBe(undefined);
    expect(canvas.get('width')).toEqual(200);
    expect(canvas.get('height')).toEqual(200);

    const viewport = minimap.getViewport();
    expect(viewport).not.toBe(undefined);
    expect(viewport.className.indexOf('g6-minimap-viewport') >= 0).toBe(true);

    // 缩小的时候，viewport已经最大了，不会更大
    graph.zoom(0.5, { x: 250, y: 250 });
    expect(viewport.style.left).toEqual('0px');
    expect(viewport.style.top).toEqual('0px');
    expect(viewport.style.width).toEqual('200px');
    expect(viewport.style.height).toEqual('200px');

    graph.zoom(2.5, { x: 250, y: 250 });

    setTimeout(() => {
      const left = parseFloat(viewport.style.left.substr(0, viewport.style.left.length - 2));
      const top = parseFloat(viewport.style.top.substr(0, viewport.style.top.length - 2));
      const width = parseFloat(viewport.style.width.substr(0, viewport.style.width.length - 2));
      const height = parseFloat(viewport.style.height.substr(0, viewport.style.height.length - 2));
      expect(mathEqual(left, 42)).toBe(true);
      expect(mathEqual(top, 32)).toBe(true);
      expect(mathEqual(width, 158)).toBe(true);
      expect(mathEqual(height, 167)).toBe(true);

      graph.zoom(2.5, { x: 250, y: 250 });
      setTimeout(() => {
        const left = parseFloat(viewport.style.left.substr(0, viewport.style.left.length - 2));
        const top = parseFloat(viewport.style.top.substr(0, viewport.style.top.length - 2));
        const width = parseFloat(viewport.style.width.substr(0, viewport.style.width.length - 2));
        const height = parseFloat(
          viewport.style.height.substr(0, viewport.style.height.length - 2),
        );

        expect(mathEqual(left, 105, 5)).toBe(true);
        expect(mathEqual(top, 95, 5)).toBe(true);
        expect(mathEqual(width, 85, 5)).toBe(true);
        expect(mathEqual(height, 85, 5)).toBe(true);

        minimap.destroyPlugin();

        const container: HTMLElement = div.childNodes[1] as HTMLElement;
        expect(container.innerHTML).toEqual('');

        done();
      }, 100);
    }, 100);
  });
  it('move viewport', (done) => {
    const minimap = new Minimap({ size: [200, 200] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
      modes: {
        default: ['zoom-canvas', 'drag-canvas'],
      },
    });
    const data = {
      nodes: [
        {
          id: '1',
          x: 50,
          y: 80,
        },
        {
          id: '2',
          x: 140,
          y: 100,
        },
        {
          id: '3',
          x: 250,
          y: 250,
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
      ],
    };
    graph.data(data);
    graph.render();

    const viewport = minimap.getViewport();

    graph.zoom(2, { x: 250, y: 250 });
    graph.translate(50, 50);

    setTimeout(() => {
      expect(viewport.style.left).toEqual('40.7749px');
      expect(viewport.style.top).toEqual('40.7749px');
      expect(viewport.style.width).toEqual('92.2509px');
      expect(viewport.style.height).toEqual('92.2509px');

      Simulate.simulate(viewport, 'dragstart', {
        clientX: 100,
        clientY: 100,
        target: viewport,
      });

      Simulate.simulate(viewport, dragEvent, {
        clientX: 98,
        clientY: 91,
      });

      Simulate.simulate(viewport, 'dragend', {
        clientX: 98,
        clientY: 91,
      });

      setTimeout(() => {
        expect(viewport.style.left).toEqual('38.7749px');
        expect(viewport.style.top).toEqual('31.7749px');
        expect(viewport.style.width).toEqual('92.2509px');
        expect(viewport.style.height).toEqual('92.2509px');
        const matrix = graph.get('group').getMatrix();
        expect(matrix[0]).toEqual(2);
        expect(matrix[4]).toEqual(2);
        graph.destroy();
        done();
      }, 300);
    }, 300);
  });
  it('invalid dom event', () => {
    const minimap = new Minimap({ size: [200, 200] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
      modes: {
        default: ['zoom-canvas'],
      },
    });
    const data = {
      nodes: [
        {
          id: '1',
          x: 50,
          y: 80,
        },
        {
          id: '2',
          x: 140,
          y: 100,
        },
      ],
      edges: [
        {
          source: '1',
          target: '2',
        },
      ],
    };
    graph.data(data);
    graph.render();

    const viewport = minimap.getContainer();

    Simulate.simulate(viewport, dragEvent, {
      clientX: 100,
      clientY: 100,
    });

    viewport.style.width = '300px';
    Simulate.simulate(viewport, 'dragstart', {
      clientX: 100,
      clientY: 100,
      target: null,
    });
  });
  it('delegate type of minimap', (done) => {
    const minimap = new Minimap({
      size: [200, 200],
      type: 'delegate',
      delegateStyle: {
        fill: '#fff',
      },
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
    });

    const nodeBBox = graph.addItem('node', { id: 'node', x: 100, y: 100, size: 16 }).getBBox();

    const canvas = minimap.getCanvas();
    setTimeout(() => {
      const delegateShape = canvas.get('children')[0].get('children')[0];
      expect(delegateShape.attr('x')).toEqual(nodeBBox.minX);
      expect(delegateShape.attr('y')).toEqual(nodeBBox.minY);
      expect(delegateShape.attr('width')).toEqual(nodeBBox.width);
      expect(delegateShape.attr('height')).toEqual(nodeBBox.height);
      expect(delegateShape.attr('fill')).toEqual('#fff');
      expect(delegateShape.attr('stroke')).toEqual('#096dd9');
      graph.destroy();
      done();
    }, 100);
  });
  it('minimap container', () => {
    const minimap = new Minimap({
      container,
      size: [200, 200],
      className: 'test-className',
    });

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
      modes: {
        default: [
          {
            type: 'drag-node',
            delegate: false,
          },
          'zoom-canvas',
          'click-select',
          'drag-canvas',
        ],
      },
    });

    const minimapContainer: HTMLElement = container.childNodes[0] as HTMLElement;
    expect(minimapContainer.childNodes).not.toBe(undefined);
    expect(minimapContainer.className).toEqual('test-className');
    expect(minimapContainer.style.width).toEqual('200px');
    expect(minimapContainer.style.width).toEqual('200px');

    const minimapContainerNode = minimapContainer.childNodes[0] as HTMLElement;
    expect(minimapContainerNode.tagName).toEqual('DIV');
    expect(minimapContainerNode.style.position).toEqual('relative');
    expect(minimapContainerNode.childNodes[0]).toEqual(minimap.getCanvas().get('el'));

    graph.destroy();
    expect(container.innerHTML).toEqual('');
  });
  it('canvas minX minY < 0', (done) => {
    const minimap = new Minimap({
      size: [200, 200],
    });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
      defaultNode: {
        size: 60,
      },
      modes: {
        default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
      },
    });
    graph.addItem('node', { id: 'node1', x: -50, y: -50 });

    setTimeout(() => {
      const canvas = minimap.getCanvas();
      const group = canvas.get('children')[0];
      const matrix = group.getMatrix();

      expect(matrix[6] - 30 < 1).toBe(false);
      expect(matrix[7] - 30 < 1).toBe(false);
      graph.destroy();
      done();
    }, 100);
  });
  it('keyShapeOnly minimap', (done) => {
    const minimap = new Minimap({ size: [200, 200], type: 'keyShape' });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
    });
    graph.addItem('node', { id: 'node1', label: 'text1', x: 50, y: 50 });
    graph.addItem('node', { id: 'node2', label: 'text2', x: 120, y: 150 });
    graph.addItem('edge', { id: 'edge1', source: 'node1', target: 'node2' });

    const canvas = minimap.getCanvas();
    setTimeout(() => {
      const shapeGroup = canvas.get('children')[0].get('children');
      expect(shapeGroup.length).toEqual(3);
      expect(shapeGroup[0].attr('path')).not.toBe(undefined);
      expect(shapeGroup[1].attr('x')).toEqual(50);
      expect(shapeGroup[1].attr('y')).toEqual(50);
      expect(shapeGroup[2].attr('x')).toEqual(120);
      expect(shapeGroup[2].attr('y')).toEqual(150);
      graph.destroy();
      done();
    }, 100);
  });
  it('get minimap container', () => {
    const minimap = new Minimap({ size: [200, 200], type: 'keyShape' });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
    });

    const container = minimap.getContainer();
    expect(container).not.toBe(undefined);
    expect(container.className).toBe('g6-minimap');
    graph.destroy();
  });
  it('minimap beforeanimate afteranimate', () => {
    const minimap = new Minimap({ size: [200, 200] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
    });

    graph.emit('beforeanimate');
    expect(minimap.get('refresh')).toBe(false);
    graph.emit('afteranimate');
    expect(minimap.get('refresh')).toBe(true);
    graph.destroy();
  });
});

describe('minimap with hidden shape', () => {
  G6.registerNode(
    'my-node',
    {
      drawShape: (cfg, group) => {
        const mainGroup = group.addGroup({
          id: 'main-group',
        });
        const rect = mainGroup.addShape('rect', {
          attrs: {
            fill: '#fff',
          },
          name: 'main-box',
        });

        const shape = mainGroup.addShape('rect', {
          attrs: {
            fill: '#fff',
            stroke: '#FA8C16',
            radius: 4,
          },
          name: 'main-shape',
        });

        if (cfg.open) {
          mainGroup.addShape('rect', {
            attrs: {
              x: 0,
              y: -4,
              width: 266,
              height: 4,
              fill: '#FA8C16',
              stroke: '#FA8C16',
              radius: [6, 6, 0, 0],
            },
            name: 'css-rect',
          });
        } else {
          mainGroup.addShape('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: 4,
              height: 40,
              fill: '#FA8C16',
              stroke: '#FA8C16',
              radius: [6, 0, 0, 6],
            },
            name: 'css-rect',
          });
        }
        const text = mainGroup.addShape('text', {
          attrs: {
            text: '文本0',
            x: 14,
            y: 20,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#666',
            fontSize: 14,
          },

          name: 'rect-shape',
          zIndex: 0,
        });

        const detailGroup = group.addGroup({
          id: 'detail-group',
        });
        detailGroup.addShape('text', {
          attrs: {
            text: '文本1',
            x: 14,
            y: 46,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#666',
          },
          name: 'desc',
        });
        detailGroup.addShape('text', {
          attrs: {
            text: '文本2',
            x: 14,
            y: 66,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#666',
          },
          name: 'dbName',
        });
        detailGroup.addShape('text', {
          attrs: {
            text: '文本3',
            x: 134,
            y: 66,
            textAlign: 'left',
            textBaseline: 'middle',
            fill: '#666',
          },
          name: 'dbType',
        });
        detailGroup.addShape('image', {
          attrs: {
            x: 0,
            y: 60,
            width: 16,
            height: 16,
            img:
              'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png',
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: 'btn',
          data: cfg.detail,
        });
        if (cfg.open) {
          detailGroup.show();
          rect.attr({
            x: 0,
            y: 0,
            width: 280,
            height: 134,
          });
          shape.attr({
            x: 0,
            y: 0,
            width: 266,
            height: 134,
          });
        } else {
          detailGroup.hide();
          rect.attr({
            x: 0,
            y: 0,
            width: 280,
            height: 40,
          });
          shape.attr({
            x: 0,
            y: 0,
            width: 266,
            height: 40,
          });
        }

        return rect;
      },
      update: undefined,
    },
    'single-node',
  );

  it('svg renderer, minimap with hidden shape in custom node', (done) => {
    const minimap = new Minimap({ size: [200, 200] });
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      plugins: [minimap],
      renderer: 'svg',
      defaultNode: {
        type: 'my-node',
      },
    });

    graph.addItem('node', { id: 'node1', label: 'text1', x: 50, y: 50, open: true });
    graph.addItem('node', { id: 'node2', label: 'text2', x: 120, y: 150, open: true });
    graph.addItem('node', { id: 'node3', label: 'text3', x: 150, y: 190 });
    graph.addItem('node', { id: 'node4', label: 'text4', x: 220, y: 250 });

    setTimeout(() => {
      const minimapCanvas = minimap.getCanvas();
      const minimapRootGroup = minimapCanvas.get('children')[0];
      expect(
        minimapRootGroup.get('children')[2].get('children')[3].get('children')[1].get('visible'),
      ).toBe(false);
      done();
    }, 100);
  });
});
