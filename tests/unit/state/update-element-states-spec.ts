import G6 from '../../../src';
import '../../../src/behavior';
import isPlainObject from '@antv/util/lib/is-plain-object'

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
        fill: 'pink',
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

describe('update', () => {

  it('setItemState, then updateItem', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        hover: {
          opacity: 0.3
        },
      },
      defaultNode: {
        size: 25,
        style: {
          fill: 'steelblue',
          opacity: 1
        }
      },
    });
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
    graph.data(data);
    graph.render();

    const item = graph.findById('node1')
    graph.setItemState(item, 'hover', true)
    expect(item.hasState('hover')).toBe(true)

    const keyShape = item.getKeyShape()
    expect(keyShape.attr('fill')).toEqual('steelblue')

    graph.updateItem(item, {
      style: {
        stroke: 'green',
        opacity: 0.5
      }
    })
    expect(keyShape.attr('stroke')).toEqual('green')

    // updateItem 后还存在 hover 状态
    expect(item.hasState('hover')).toBe(true)
    expect(item.getStates().length).toBe(1)
    expect(keyShape.attr('opacity')).toEqual(0.3)

    graph.clearItemStates(item, 'hover')
    expect(item.hasState('hover')).toBe(false)
    expect(item.getStates().length).toBe(0)
    expect(keyShape.attr('opacity')).toEqual(0.5)
  })

  it('updateItem, then setItemState', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'comCircle:selected': {
          fill: 'red'
        },
        hover: {
          opacity: 0.3,
          fill: 'blue'
        },
      },
      defaultNode: {
        size: 25,
        style: {
          fill: 'steelblue',
          opacity: 1
        },
        icon: {
          show: true
        }
      },
    });
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
    graph.data(data);
    graph.render();

    const item = graph.findById('node1')
    graph.setItemState(item, 'comCircle', 'selected')
    expect(item.hasState('comCircle:selected')).toBe(true)
    expect(item.getStates().length).toBe(1)

    // state: conCircle:selected 
    // fill: red
    const keyShape = item.getKeyShape()
    expect(keyShape.attr('fill')).toEqual('red')

    graph.clearItemStates(item, 'comCircle:selected')
    expect(item.hasState('comCircle:selected')).toBe(false)
    expect(item.getStates().length).toBe(0)

    // 内置 circle 默认的 stroke
    expect(keyShape.attr('stroke')).toEqual('#5B8FF9')
    expect(keyShape.attr('fill')).toEqual('steelblue')

    graph.updateItem(item, {
      style: {
        fill: 'green',
        stroke: 'green',
        opacity: 0.5
      },
      stateStyles: {
        hover: {
          opacity: 0.6,
          stroke: '#ccc'
        }
      }
    })

    // 此时没有 states，以 update 样式为准
    expect(keyShape.attr('fill')).toEqual('green')
    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('opacity')).toEqual(0.5)

    // 设置 hover states
    graph.setItemState(item, 'hover', true)
    expect(item.hasState('hover')).toBe(true)
    expect(item.getStates().length).toBe(1)

    expect(keyShape.attr('stroke')).toEqual('#ccc')
    expect(keyShape.attr('opacity')).toEqual(0.6)
    // setItemState 之前，已经设置了fill
    expect(keyShape.attr('fill')).toEqual('green')

    // 清除 hover states 后，无任何 states，恢复 update 后的样式
    graph.clearItemStates(item, 'hover')
    expect(item.hasState('hover')).toBe(false)
    expect(item.getStates().length).toBe(0)

    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('opacity')).toEqual(0.5)
    expect(keyShape.attr('fill')).toEqual('green')

    graph.destroy()
    expect(graph.destroyed).toBe(true)
  })

  it('many times setItemState & updateItem width default node', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'comCircle:selected': {
          fill: 'red',
          'circle-icon': {
            stroke: 'green'
          }
        },
        hover: {
          opacity: 0.3,
          fill: 'blue'
        },
      },
      defaultNode: {
        size: 25,
        style: {
          fill: 'steelblue',
          opacity: 1
        },
        icon: {
          show: true
        }
      },
    });
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
    graph.data(data);
    graph.render();

    const item = graph.findById('node1')
    debugger
    graph.setItemState(item, 'hover', true)
    graph.setItemState(item, 'comCircle', 'selected')
    expect(item.hasState('hover')).toBe(true)
    expect(item.hasState('comCircle:selected')).toBe(true)
    expect(item.getStates().length).toBe(2)

    // state: hover -> conCircle:selected 
    // opacity: 0.3 fill: red
    const keyShape = item.getKeyShape()
    expect(keyShape.attr('opacity')).toEqual(0.3)
    expect(keyShape.attr('fill')).toEqual('red')

    graph.updateItem(item, {
      style: {
        fill: 'green',
        stroke: 'green',
        opacity: 0.5
      },
      stateStyles: {
        hover: {
          opacity: 0.6,
          stroke: '#ccc'
        }
      }
    })

    // updateItem 后 由于存在 hover 及 conCircle:selected 两个 state，
    // 本来应该只有 stroke: green 生效，但由于更新了 hover state，则 update 的所有都不生效
    const hoverState = item.getStateStyle('hover')
    expect(hoverState.opacity).toBe(0.6)
    expect(hoverState.stroke).toEqual('#ccc')

    expect(keyShape.attr('stroke')).toEqual('#ccc')
    expect(keyShape.attr('opacity')).toEqual(0.6)
    expect(keyShape.attr('fill')).toEqual('red')

    // 清除 hover state，只剩一个 conCircle:selected，
    // 则 update 后的 stroke 和 opacity 会生效，而 fill 则使用 conCircle:selected 的值

    graph.clearItemStates(item, 'hover')
    expect(item.hasState('hover')).toBe(false)
    expect(item.hasState('comCircle:selected')).toBe(true)
    expect(item.getStates().length).toBe(1)

    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('opacity')).toEqual(0.5)
    expect(keyShape.attr('fill')).toEqual('red')

    // 清除 comCircle:selected 状态后，则没有任何状态，样式以 update 的为准
    graph.clearItemStates(item, 'comCircle:selected')
    expect(item.hasState('comCircle:selected')).toBe(false)
    expect(item.getStates().length).toBe(0)

    expect(keyShape.attr('fill')).toEqual('green')
    expect(keyShape.attr('opacity')).toEqual(0.5)

    graph.destroy()
    expect(graph.destroyed).toBe(true)
  })

  it('many times setItemState & updateItem width register node', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        'register:selected': {
          'main-node': {
            fill: 'red',
            opacity: 0.7
          },
          'sub-node': {
            fill: '#000',
            opacity: 0.2
          },
          'node-text': {
            stroke: 'green',
            fontSize: 20
          }
        },
        hover: {
          opacity: 0.3,
          fill: 'blue'
        },
      },
      defaultNode: {
        size: 25,
        shape: 'self-node',
        style: {
          opacity: 1
        }
      },
    });
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
    graph.data(data);
    graph.render();

    const item = graph.findById('node1')
    const keyShape = item.getKeyShape()
    expect(keyShape.attr('fill')).toEqual('pink')
    expect(keyShape.attr('opacity')).toBe(1)

    const group = item.getContainer()
    const subNode = group.find(ele => ele.get('name') === 'sub-node')
    expect(subNode.attr('fill')).toEqual('blue')

    const text = group.find(ele => ele.get('name') === 'node-text')
    expect(text.attr('stroke')).toEqual('green')

    graph.setItemState(item, 'hover', true)
    expect(item.hasState('hover')).toBe(true)
    expect(item.getStates().length).toBe(1)

    // state: hover 
    // opacity: 0.3 fill: blue
    expect(keyShape.attr('opacity')).toEqual(0.3)
    expect(keyShape.attr('fill')).toEqual('blue')

    // 更新 item 之前已有 hover 状态
    graph.updateItem(item, {
      style: {
        fill: 'green',
        stroke: 'green',
        opacity: 0.5,
        'node-text': {
          stroke: 'yellow'
        }
      },
      stateStyles: {
        hover: {
          opacity: 0.6,
          stroke: '#ccc'
        },
        xxx: {
          opacity: 0.1,
          'node-text': {
            stroke: 'blue'
          }
        }
      }
    })

    // updateItem 后 由于存在 hover state，
    // 本来应该生效的 opacity 和 stroke 都不生效，update 中的 hover state 会覆盖 实例化 graph 时候定义的
    const hoverState = item.getStateStyle('hover')
    expect(hoverState.opacity).toBe(0.6)
    expect(hoverState.stroke).toEqual('#ccc')

    expect(keyShape.attr('stroke')).toEqual('#ccc')
    expect(keyShape.attr('opacity')).toEqual(0.6)
    // update item 时的 fill 生效
    expect(keyShape.attr('fill')).toEqual('green')

    // 更新以后，text-node 的 stroke 发生了改变
    expect(text.attr('stroke')).toEqual('yellow')

    // sub-node 不发生改变
    expect(subNode.attr('fill')).toEqual('blue')

    // 设置 register:selected states，会覆盖 hover states 中的以下属性：
    // main-node：fill、opacity
    // sub-node：fill、opacity
    // text-node：fontSize、stroke
    graph.setItemState(item, 'register', 'selected')
    expect(item.hasState('register:selected')).toBe(true)
    expect(item.getStates().length).toBe(2)

    expect(keyShape.attr('fill')).toEqual('red')
    expect(keyShape.attr('opacity')).toEqual(0.7)
    expect(subNode.attr('fill')).toEqual('#000')
    expect(subNode.attr('opacity')).toEqual(0.2)
    expect(text.attr('fontSize')).toBe(20)
    expect(text.attr('stroke')).toEqual('green')


    // 清除 hover 和 register:selected，则 update 后的属性生效
    graph.clearItemStates(item, ['register:selected', 'hover'])
    expect(item.hasState('register:selected')).toBe(false)
    expect(item.getStates().length).toBe(0)

    expect(keyShape.attr('fill')).toEqual('green')
    expect(keyShape.attr('stroke')).toEqual('green')
    expect(keyShape.attr('opacity')).toEqual(0.5)
    expect(text.attr('stroke')).toEqual('yellow')

    graph.setItemState(item, 'xxx', true)
    expect(keyShape.attr('opacity')).toEqual(0.1)
    expect(text.attr('stroke')).toEqual('blue')

    graph.destroy()
    expect(graph.destroyed).toBe(true)
  })
})