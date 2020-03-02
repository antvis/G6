import G6 from '../../../src';
import '../../../src/behavior';
import isPlainObject from '@antv/util/lib/is-plain-object'
import { GraphData } from '../../../src/types'

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

G6.registerNode('self-node', {
  draw(cfg, group) {
    const styles = this.getShapeStyle(cfg)
    const keyShapeStyle = {}
    for(const key in styles) {
      const style = styles[key]
      if(!isPlainObject(style)) {
        keyShapeStyle[key] = style
      }
    }

    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        fill: 'red',
        y: 0,
        ...keyShapeStyle,
        r: 20,
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

    group.addShape('text', {
      attrs: {
        text: '文本',
        x: -15,
        y: 10,
        stroke: 'green'
      },
      name: 'node-text'
    })

    return keyShape
  }
}, 'single-node')

G6.registerNode('keyshape-not-attribute', {
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

    const keyShape = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        fill: 'red',
        ...keyShapeStyle,
        r: 20,
      },
      // name: 'main-node'
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

describe('graph refactor states', () => {
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

  it('compatible true/false states', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        select: {
          stroke: 'red',
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
          fill: 'steelblue',
          opacity: 0.8
        }
      },
    });
    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      graph.setItemState(item, 'select', true);
    });
    graph.on('node:click', e => {
      const item = e.item;
      
      graph.setItemState(item, 'hover', false);
      graph.setItemState(item, 'select', false);
    });

    const item = graph.findById('node1')
    graph.setItemState(item, 'select', true);
    expect(item.hasState('select')).toBe(true)
    expect(item.getStates()).toEqual(['select'])

    const keyShape = item.getKeyShape();
    expect(keyShape.attr('opacity')).toEqual(0.8);
    expect(keyShape.attr('fill')).toEqual('steelblue');
    expect(keyShape.attr('lineWidth')).toBe(5)
    expect(keyShape.attr('stroke')).toEqual('red')

    graph.setItemState(item, 'hover', true)
    expect(item.hasState('hover')).toBe(true)
    expect(item.getStates()).toEqual(['select', 'hover'])
    expect(keyShape.attr('opacity')).toEqual(0.3);

    // remove select states
    graph.setItemState(item, 'select', false)
    expect(item.hasState('select')).toBe(false)
    expect(item.getStates()).toEqual(['hover'])
    expect(keyShape.attr('lineWidth')).toBe(1)
    console.log(keyShape.attr())
    expect(keyShape.attr('stroke')).toBe(undefined)

    // remove hover states
    graph.setItemState(item, 'hover', false)
    expect(item.hasState('hover')).toBe(false)
    expect(item.getStates()).toEqual([])
    expect(keyShape.attr('opacity')).toEqual(0.8);
    graph.destroy();
  });

  it('multivalued & muted', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'selfCircle:selected': {
          'main-node':{
            fill: '#000',
            stroke: 'yellow',
            lineWidth: 3
          },
          'sub-node': {
            fill: 'green',
            stroke: 'yellow',
            lineWidth: 3
          }
        },
        'selfCircle:hover': {
          'main-node':{
            fill: 'green'
          },
          // 两种都支持
          // fill: 'green',
          'sub-node': {
            fill: '#fff'
          }
        }
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          opacity: 0.8
        }
      },
    });
    graph.data(data);
    graph.render();
    graph.addItem('node', { id: 'node3', x: 100, y: 200 });

    const item = graph.findById('node3')
    graph.setItemState(item, 'selfCircle', 'selected')
    graph.setItemState(item, 'selfCircle', 'hover')
    // 多值且互斥，此时只有 selfCircle:hover 一个状态
    expect(item.getStates().length).toBe(1)
    expect(item.getStates()[0]).toEqual('selfCircle:hover')

    const keyShape = item.getKeyShape()
    expect(keyShape.attr('fill')).toEqual('green')
    // default value
    expect(keyShape.attr('lineWidth')).toEqual(1)
    expect(keyShape.attr('opacity')).toEqual(0.8)

    const group = item.getContainer()
    const subShape = group.find(element => element.get('name') === 'sub-node')
    expect(subShape.attr('fill')).toEqual('#fff')
    // default value
    expect(subShape.attr('lineWidth')).toEqual(1)

    graph.destroy();
  });

  it('multivalued & muted, keyshape not name attribute', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'selfCircle:selected': {
          fill: '#000',
          stroke: 'yellow',
          lineWidth: 3,
          'sub-node': {
            fill: 'green',
            stroke: 'yellow',
            lineWidth: 3
          }
        },
        'selfCircle:hover': {
          'main-node':{
            fill: 'green'
          },
          // 两种都支持
          fill: 'green',
          'sub-node': {
            fill: '#fff'
          }
        }
      },
      defaultNode: {
        size: 25,
        shape: 'keyshape-not-attribute',
        style: {
          opacity: 0.8
        }
      },
    });
    graph.data(data);
    graph.render();

    const item = graph.findById('node2')
    graph.setItemState(item, 'selfCircle', 'hover')
    graph.setItemState(item, 'selfCircle', 'selected')

    // 多值且互斥，此时只有 selfCircle:hover 一个状态
    expect(item.getStates().length).toBe(1)
    expect(item.getStates()[0]).toEqual('selfCircle:selected')

    const keyShape = item.getKeyShape()
    expect(keyShape.attr('fill')).toEqual('#000')
    expect(keyShape.attr('stroke')).toEqual('yellow')
    expect(keyShape.attr('lineWidth')).toEqual(3)
    // default value
    expect(keyShape.attr('opacity')).toEqual(0.8)

    const group = item.getContainer()
    const subShape = group.find(element => element.get('name') === 'sub-node')
    expect(subShape.attr('fill')).toEqual('green')
    expect(subShape.attr('stroke')).toEqual('yellow')
    expect(subShape.attr('lineWidth')).toEqual(3)

    graph.destroy();
  });

  it('mixed use mulituvalued & Tow value states', () => {
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
            lineWidth: 3,
            fill: '#000'
          }
        },
        'selfCircle:hover': {
          'main-node':{
            stroke: 'green',
            fill: 'yellow'
          },
          'sub-node': {
            stroke: '#fff'
          }
        },
        select: {
          stroke: 'blue',
          lineWidth: 5,
          strokeOpacity: 0.8
        },
        hover: {
          opacity: 0.3,
          'sub-node': {
            fill: '#00d6b2'
          }
        },
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          // fill: 'steelblue',
          opacity: 0.8
        }
      },
    });
    graph.data(data);
    graph.render();

    const item = graph.findById('node2')
    graph.setItemState(item, 'hover', true);
    graph.setItemState(item, 'select', true)
    graph.setItemState(item, 'selfCircle', 'hover')
    graph.setItemState(item, 'selfCircle', 'selected')

    expect(item.getStates().length).toBe(3)
    expect(item.hasState('selfCircle:hover')).toBe(false)

    // 执行上面的状态设置以后，节点样式为 原始样式 & hover & select & selfCircle:selected 样式
    const keyShape = item.getKeyShape()
    expect(keyShape.attr('stroke')).toEqual('#000')
    expect(keyShape.attr('lineWidth')).toEqual(3)
    expect(keyShape.attr('strokeOpacity')).toEqual(0.8)
    expect(keyShape.attr('opacity')).toEqual(0.3)

    const group = item.getContainer()
    const subShape = group.find(element => element.get('name') === 'sub-node')
    expect(subShape.attr('fill')).toEqual('#000')
    expect(subShape.attr('stroke')).toEqual('green')
    expect(subShape.attr('lineWidth')).toEqual(3)
    
    graph.destroy();
  });

  it('clear mulituvalued & Tow value states', () => {
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
            lineWidth: 3,
            fill: '#000'
          }
        },
        'selfCircle:hover': {
          'main-node':{
            stroke: 'green',
            fill: 'yellow'
          },
          'sub-node': {
            stroke: '#fff'
          }
        },
        select: {
          stroke: 'blue',
          lineWidth: 5,
          strokeOpacity: 0.8
        },
        hover: {
          opacity: 0.3,
          'sub-node': {
            fill: '#00d6b2'
          }
        },
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          opacity: 0.8
        }
      },
    });
    graph.data(data);
    graph.render();

    const item = graph.findById('node2')
    graph.setItemState(item, 'hover', true)
    graph.setItemState(item, 'select', true)
    expect(item.getStates().length).toBe(2)
    expect(item.hasState('select')).toBe(true)

    const keyShape = item.getKeyShape()
    expect(keyShape.attr('stroke')).toEqual('blue')
    expect(keyShape.attr('lineWidth')).toEqual(5)
    expect(keyShape.attr('opacity')).toEqual(0.3)

    graph.clearItemStates(item, 'select')
    expect(item.getStates().length).toBe(1)
    expect(item.hasState('select')).toBe(false)
    expect(keyShape.attr('stroke')).toEqual(undefined)
    expect(keyShape.attr('lineWidth')).toEqual(1)
    expect(keyShape.attr('opacity')).toEqual(0.3)

    graph.setItemState(item, 'selfCircle', 'selected')

    // 现在只有 hover 和 selfCircle:selected 两个状态
    expect(keyShape.attr('stroke')).toEqual('#000')
    expect(keyShape.attr('lineWidth')).toEqual(3)

    const group = item.getContainer()
    const subShape = group.find(element => element.get('name') === 'sub-node')
    expect(subShape.attr('fill')).toEqual('#000')
    expect(subShape.attr('stroke')).toEqual('green')
    expect(subShape.attr('lineWidth')).toEqual(3)

    // 清除现有的所有状态
    graph.clearItemStates(item, ['hover', 'selfCircle:selected'])
    expect(item.getStates().length).toBe(0)
    expect(item.hasState('hover')).toBe(false)
    expect(item.hasState('selfCircle:selected')).toBe(false)
    expect(keyShape.attr('stroke')).toEqual(undefined)
    expect(subShape.attr('fill')).toEqual('blue')

    // 设置 selfCircle:hover，目前只有这一个状态
    graph.setItemState(item, 'selfCircle', 'hover')
    expect(item.getStates().length).toBe(1)
    expect(item.hasState('selfCircle:hover')).toBe(true)

    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('fill')).toEqual('yellow')
    expect(subShape.attr('stroke')).toEqual('#fff')
    // default lineWidth value
    expect(keyShape.attr('lineWidth')).toEqual(1)
    expect(subShape.attr('lineWidth')).toEqual(1)

    graph.clearItemStates(item, ['selfCircle:hover'])
    expect(item.getStates().length).toBe(0)
    expect(item.hasState('selfCircle:hover')).toBe(false)
    expect(keyShape.attr('fill')).not.toEqual('yellow')
    expect(subShape.attr('stroke')).not.toEqual('#fff')

    graph.setItemState(item, 'hover', true)
    expect(item.hasState('hover')).toBe(true)
    expect(subShape.attr('fill')).toEqual('#00d6b2')

    graph.clearItemStates(item, ['hover'])
    expect(item.hasState('hover')).toBe(false)
    
    graph.destroy();
  });

  it('different nodes support different states', () => {
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
        'selfCircle:hover': {
          'main-node':{
            stroke: 'green'
          },
          'sub-node': {
            stroke: '#fff'
          }
        }
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          opacity: 0.8
        }
      },
    });

    const data1: GraphData = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
          stateStyles: {
            'selfCircle:selected': {
              'main-node': {
                stroke: '#c00',
                lineWidth: 2
              },
              'sub-node': {
                stroke: '#f8ac30'
              }
            }
          }
        },
        {
          id: 'node2',
          x: 200,
          y: 100,
          stateStyles: {
            'selfCircle:selected': {
              'main-node': {
                stroke: '#55f830',
                lineWidth: 5
              },
              'sub-node': {
                stroke: '#1cd8a7'
              }
            }
          }
        },
      ],
    };
    graph.data(data1);
    graph.render();
    graph.addItem('node', { id: 'node3', x: 100, y: 150, type: 'rect' });

    graph.paint();

    const node1 = graph.findById('node1')
    graph.setItemState(node1, 'selfCircle', 'selected')
    expect(node1.hasState('selfCircle:selected')).toBe(true)
    const keyshape1 = node1.getKeyShape()
    expect(keyshape1.attr('stroke')).toEqual('#c00')
    expect(keyshape1.attr('lineWidth')).toEqual(2)

    const group1 = node1.getContainer()
    const shape1 = group1.find(ele => ele.get('name') === 'sub-node')
    expect(shape1.attr('stroke')).toEqual('#f8ac30')

    const node2 = graph.findById('node2')
    graph.setItemState(node2, 'selfCircle', 'selected')
    expect(node2.hasState('selfCircle:selected')).toBe(true)
    const keyshape2 = node2.getKeyShape()
    expect(keyshape2.attr('stroke')).toEqual('#55f830')
    expect(keyshape2.attr('lineWidth')).toEqual(5)

    const group2 = node2.getContainer()
    const shape2 = group2.find(ele => ele.get('name') === 'sub-node')
    expect(shape2.attr('stroke')).toEqual('#1cd8a7')

    const node3 = graph.findById('node3')
    graph.setItemState(node3, 'selfCircle', 'selected')
    expect(node3.hasState('selfCircle:selected')).toBe(true)
    const keyshape3 = node3.getKeyShape()
    expect(keyshape3.attr('stroke')).toEqual('#000')
    expect(keyshape3.attr('lineWidth')).toEqual(3)

    const group3 = node3.getContainer()
    const shape3 = group3.find(ele => ele.get('name') === 'sub-node')
    expect(shape3.attr('stroke')).toEqual('green')
    expect(shape3.attr('lineWidth')).toEqual(3)

    // 清除 node1 的状态
    graph.clearItemStates(node1, ['selfCircle:selected'])
    expect(node1.getStates().length).toBe(0)
    expect(keyshape1.attr('lineWidth')).toEqual(1)

    graph.destroy();
  });

  it('update item style & sub element style, also support update states style', () => {
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
        'selfCircle:hover': {
          'main-node':{
            stroke: 'green'
          },
          'sub-node': {
            stroke: '#fff'
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
          opacity: 0.8
        }
      },
    });

    const data2 = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100
        }
      ]
    }
    
    graph.data(data2);
    graph.render();

    const item = graph.findById('node1')
    graph.setItemState(item, 'selfCircle', 'hover')
    expect(item.hasState('selfCircle:hover')).toBe(true)
    
    const keyShape = item.getKeyShape()
    console.log('state style', graph.get('styles'), keyShape)

    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('fill')).toEqual('red')

    const group = item.getContainer()
    const subShape = group.find(ele => ele.get('name') === 'sub-node')
    expect(subShape.attr('stroke')).toEqual('#fff')

    graph.clearItemStates(item, ['selfCircle:hover'])
    expect(item.hasState('selfCircle:hover')).toBe(false)
    expect(item.getStates().length).toBe(0)
    expect(keyShape.attr('stroke')).toEqual(undefined)
    expect(subShape.attr('stroke')).toEqual(undefined)

    graph.updateItem(item, {
      style: {
        fill: 'yellow',
        'sub-node': {
          fill: 'green'
        }
      },
      stateStyles: {
        'selfCircle:hover': {
          'main-node':{
            stroke: 'green'
          },
          'sub-node': {
            stroke: 'blue'
          }
        }
      }
    })

    // keyShape fill 为 yellow，子元素 sub-node fill 为 green，其他属性值保持不变
    
    expect(keyShape.attr('fill')).toEqual('yellow')
    expect(keyShape.attr('opacity')).toEqual(0.8)

    expect(subShape.attr('fill')).toEqual('green')
    expect(subShape.attr('stroke')).toBe(undefined)

    graph.setItemState(item, 'selfCircle', 'hover')
    expect(item.hasState('selfCircle:hover')).toBe(true)
    expect(keyShape.attr('stroke')).toEqual('green')
    expect(subShape.attr('stroke')).toBe('blue')

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
