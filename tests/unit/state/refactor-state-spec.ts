import G6 from '../../../src';
import '../../../src/behavior';
import isPlainObject from '@antv/util/lib/is-plain-object'

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

G6.registerNode('self-node', {
  draw(cfg, group) {
    const styles = this.getShapeStyle(cfg)
    // debugger
    const keyShapeStyle = {}
    for(const key in styles) {
      const style = styles[key]
      if(!isPlainObject(style)) {
        keyShapeStyle[key] = style
      }
    }

    // console.log('draw shape：', styles, keyShapeStyle)
    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        ...keyShapeStyle,
        r: 20,
        fill: 'red',
      },
      name: 'main-node'
    })

    group.addShape('circle', {
      attrs: {
        r: 5,
        fill: 'blue',
        x: 10,
        y: 5
      },
      name: 'sub-node'
    })

    return keyShape
  }
}, 'single-node')

describe('graph', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        x: 200,
        y: 100,
      },
    ],
  };

  it.only('global nodeStateStyles and defaultNode, state change with opacity changed', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'selfCircle:selected': {
          'main-node':{
            stroke: '#000',
            lineWidth: 3
          },
          'sub-node': {
            stroke: 'green',
            lineWidth: 3
          }
        },
        select: {
          stroke: 'green',
          lineWidth: 5
        },
        hover: {
          opacity: 0.3
        },
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          // fill: 'steelblue',
          opacity: 0.8,
          'sub-node': {
            lineWidth: 5
          }
        },
        icon: {
          show: true
        }
      },
    });
    graph.data(data);
    graph.render();
    graph.addItem('node', { id: 'node3', x: 100, y: 200 });
    graph.on('node:mouseenter1', e => {
      const item = e.item;
      // graph.setItemState(item, 'hover', true);
      graph.setItemState(item, 'select', true);
      // graph.setItemState(item, 'selfCircle', 'selected')
      // const keyShape = item.getKeyShape();
      // expect(keyShape.attr('opacity')).toEqual(0.8);
      // expect(keyShape.attr('fill')).toEqual('steelblue');
    });
    graph.on('node:click', e => {
      const item = e.item;
      debugger
      // graph.setItemState(item, 'hover', false);
      // graph.setItemState(item, 'select', false);

      graph.updateItem(item, {
        style: {
          fill: 'pink'
        }
      })
      // graph.clearItemStates(item, 'selfCircle:selected')
      const keyShape = item.getKeyShape();
      // expect(keyShape.attr('opacity')).toEqual(1);
      // expect(keyShape.attr('fill')).toEqual('steelblue');
    });
    // graph.destroy();
  });

  // setState to change the height, when the state is restored, the height can not be restored though the attrs are correct.
  // wait for G to repair this problem
  it('global nodeStateStyles and defaultNode, state change with fill/r/width/height/stroke changed', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        hover: {
          // fill: '#f00',
          // stroke: '#0f0',
          // lineWidth: 3,
          // r: 50,
          // width: 50,
          // height: 20
        },
      },
      defaultNode: {
        // size: 25,
        style: {
          // lineWdith: 1,

          width: 30,
          height: 30,
        },
      },
    });
    // const canvas = graph.get('canvas');
    // canvas.set('localRefresh', false);
    graph.data(data);
    graph.render();
    const node3 = graph.addItem('node', { id: 'node3', x: 100, y: 150, type: 'rect' });
    graph.paint();
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
    });
    graph.destroy();
  });

  it('global defaultNode and stateStyle in data, state change with fill/r/width/height/stroke changed', () => {
    const data2 = {
      nodes: [
        {
          id: 'circle',
          x: 100,
          y: 100,
          stateStyles: {
            hover: {
              lineWidth: 3,
            },
          },
        },
        {
          id: 'rect',
          x: 200,
          y: 100,
          type: 'rect',
          stateStyles: {
            hover: {
              lineWidth: 3,
              stroke: '#0f0',
            },
          },
        },
        {
          id: 'triangle',
          x: 300,
          y: 100,
          type: 'triangle',
        },
        {
          id: 'ellipse',
          x: 400,
          y: 100,
          type: 'ellipse',
          stateStyles: {
            hover: {
              lineWidth: 3,
              fillOpacity: 0.5,
            },
          },
        },
        {
          id: 'diamond',
          x: 100,
          y: 200,
          type: 'diamond',
          stateStyles: {
            hover: {
              strokeOpacity: 0.3,
            },
          },
        },
        {
          // when there is stroke, shadow layer error - G
          id: 'star',
          x: 200,
          y: 200,
          type: 'star',
          stateStyles: {
            hover: {
              lineWidth: 3,
              shadowColor: '#00f',
              shadowBlur: 10,
              shadowOffsetX: 10,
              shadowOffsetY: -10,
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          stroke: '#f00',
          lineWidth: 1,
        },
      },
    });
    graph.data(data2);
    graph.render();
    graph.paint();
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      const id = item.getModel().id;
      const keyShape = item.getKeyShape();
      const attrs = keyShape.attr();
      switch (id) {
        case 'circle':
          expect(attrs.lineWidth).toEqual(3);
          expect(attrs.stroke).toEqual('#f00');
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
        case 'rect':
          expect(attrs.lineWidth).toEqual(3);
          expect(attrs.stroke).toEqual('#0f0');
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
        case 'triangle':
          expect(attrs.lineWidth).toEqual(1);
          expect(attrs.stroke).toEqual('#f00');
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
        case 'ellipse':
          expect(attrs.lineWidth).toEqual(3);
          expect(attrs.fillOpacity).toEqual(0.5);
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
        case 'diamond':
          expect(attrs.lineWidth).toEqual(1);
          expect(attrs.strokeOpacity).toEqual(0.3);
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
        case 'star':
          expect(attrs.lineWidth).toEqual(3);
          expect(attrs.shadowColor).toEqual('#00f');
          expect(attrs.shadowBlur).toEqual(10);
          expect(attrs.shadowOffsetX).toEqual(10);
          expect(attrs.shadowOffsetY).toEqual(-10);
          expect(attrs.fill).toEqual('#C6E5FF');
          break;
      }
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
    });
    graph.getNodes().forEach(node => {
      graph.emit('node:mouseenter', { item: node });
      graph.emit('node:mouseleave', { item: node });
    });
    graph.destroy();
  });

  it('global defaultNode and multiple stateStyle in data', () => {
    const data2 = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          stateStyles: {
            hover: {
              lineWidth: 3,
            },
            state1: {
              lineWidth: 5,
              fill: '#f00',
            },
            state2: {
              stroke: '#0f0',
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          stroke: '#f00',
          lineWidth: 1,
        },
      },
    });
    graph.data(data2);
    graph.render();
    const node = graph.getNodes()[0];
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      expect(item.hasState('hover')).toEqual(true);
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
      expect(item.hasState('state1')).toEqual(true);
      expect(item.hasState('hover')).toEqual(false);
    });
    graph.on('node:click', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
    });
    graph.on('canvas:click', () => {
      graph.getNodes().forEach(node => {
        graph.setItemState(node, 'state1', false);
        expect(node.hasState('state1')).toEqual(false);
      });
    });
    graph.emit('node:mouseenter', { item: node });
    graph.emit('node:click', { item: node });
    graph.emit('node:mouseleave', { item: node });
    graph.emit('canvas:click', {});
    graph.destroy();
  });

  it('updateItem and state', () => {
    const data2 = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          stateStyles: {
            state1: {
              lineWidth: 5,
              fill: '#00f',
              stroke: '#0ff',
              width: 30,
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        style: {
          stroke: '#f00',
          lineWidth: 1,
        },
      },
    });
    graph.data(data2);
    graph.render();
    const node = graph.getNodes()[0];
    graph.updateItem(node, {
      type: 'rect',
      size: [50, 30],
      style: {
        fill: '#0f0',
      },
    });
    expect(node.getKeyShape().attr('fill')).toEqual('#0f0');
    expect(node.getKeyShape().attr('lineWidth')).toEqual(1);

    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', false);
      expect(item.hasState('state1')).toEqual(false);
    });
    graph.emit('node:mouseenter', { item: node });
    graph.emit('node:mouseleave', { item: node });
    graph.destroy();
  });

  it('combine nodeStateStyles on Graph and stateStyles in data', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          stateStyles: {
            state1: {
              fill: '#f00',
              shadowColor: '#0f0',
              shadowBlur: 10,
            },
          },
        },
        {
          id: 'node2',
          x: 200,
          y: 100,
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        state1: {
          fill: '#0f0',
        },
      },
    });
    graph.data(data);
    graph.render();
    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
      const keyShape = item.getKeyShape();
      const id = item.getModel().id;
      switch (id) {
        case 'node1':
          expect(keyShape.attr('lineWidth')).toEqual(1);
          expect(keyShape.attr('fill')).toEqual('#f00');
          expect(keyShape.attr('shadowColor')).toEqual('#0f0');
          expect(keyShape.attr('shadowBlur')).toEqual(10);
          break;
        case 'node2':
          expect(keyShape.attr('lineWidth')).toEqual(1);
          expect(keyShape.attr('fill')).toEqual('#0f0');
          expect(keyShape.attr('shadowColor')).toEqual(undefined);
          expect(keyShape.attr('shadowBlur')).toEqual(undefined);
          break;
      }
    });
    graph.on('node:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', false);
      expect(item.hasState('state1')).toEqual(false);
    });
    graph.getNodes().forEach(node => {
      graph.emit('node:mouseenter', { item: node });
      graph.emit('node:mouseleave', { item: node });
    });
    graph.destroy();
  });
});
