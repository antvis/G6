import { Graph } from '../../../../src';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('donut test', () => {
  const cfg = {
    container: div,
    width: 500,
    height: 500,
    defaultNode: {
      type: 'donut',
      size: 50,
      style: {
        fill: '#bae637',
        stroke: '#eaff8f',
        lineWidth: 5,
      },
      linkPoints: {
        top: true,
        bottom: true,
        left: true,
        right: true,
        fill: '#fff',
        size: 5,
      },
      icon: {
        show: true,
        //img: '...', 可更换为其他图片地址
        width: 25,
        height: 25,
      },
      labelCfg: {
        position: 'bottom',
        offset: 10,
        style: {
          // ... 文本样式的配置
        },
      }
    },
    modes: {
      default: ['drag-node']
    }
  };
  const graph = new Graph(cfg);
  it('default donut config', () => {
    const data = {
      nodes: [
        {
          id: 'node',
          x: 100,
          y: 100,
          label: 'donut',
          donutAttrs: {
            prop1: 10,
            prop2: 20,
            prop3: 25,
            prop4: 10,
            prop5: 20,
          },
          donutColorMap: {
            prop1: '#8eaade',
            prop2: '#55a9f2',
            prop3: '#0d47b5',
            prop4: '#7b8085',
            prop5: '#003870'
          },
        },
      ],
    };
    graph.data(data);
    graph.render();

    const donutGroup = graph.getNodes()[0].getContainer();
    expect(donutGroup.get('children').length).toBe(12)

  });
  it('update donut with same number of donutAttrs', () => {
    const prevFanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));
    graph.updateItem('node', {
      donutAttrs: {
        prop1: 20,
        prop2: 10,
        prop3: 15,
        prop4: 20,
        prop5: 20
      },
    });
    const fanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));

    // same objects as previous
    expect(fanShapes.length).toBe(prevFanShapes.length);
    fanShapes.forEach((shape, i) => expect(shape).toBe(prevFanShapes[i]));
  });
  it('update donut with more donutAttrs', () => {
    const prevFanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));
    graph.updateItem('node', {
      donutAttrs: {
        prop1: 20 + Math.random(),
        prop2: 10 + Math.random(),
        prop3: 15 + Math.random(),
        prop4: 20 + Math.random(),
        prop5: 20 + Math.random(),
        prop6: 0 + Math.random()
      },
    });
    const fanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));

    // 0-4 same objects as previous, one new object
    expect(fanShapes.length).toBe(prevFanShapes.length + 1);
    prevFanShapes.forEach((shape, i) => expect(shape).toBe(fanShapes[i]));
  });
  it('update donut with less donutAttrs', () => {
    const prevFanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));
    graph.updateItem('node', {
      donutAttrs: {
        prop1: 20 + Math.random(),
        prop2: 10 + Math.random(),
        prop3: 15 + Math.random(),
        prop4: undefined, // set to undefined or 0 to remove the shape
        prop5: 0,
        prop6: 0
      },
    });
    const fanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));

    // 0-2 same objects as previous
    expect(fanShapes.length).toBe(prevFanShapes.length - 3);
    fanShapes.forEach((shape, i) => expect(shape).toBe(prevFanShapes[i]));
  });
  it('update donut radius', () => {
    graph.updateItem('node', {
      size: 150
    });
    const fanShapes = Object.values(graph.findById('node').getContainer()['shapeMap']).filter(shape => shape.get('name').includes('fan-shape-'));
    expect(fanShapes[0].attr('path')[0][1]).toBe(150 / 2 * 1.6 / 2); // (keyShapeR + 0.6 * keyShapeR) / 2
    expect(fanShapes[0].attr('lineWidth')).toBe(150 / 2 * (1 - 0.6)); // keyShapeR - 0.6 * keyShapeR
    graph.destroy();
  });
});