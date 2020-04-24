import { Graph } from '../../../src';
import { registerInteraction, createInteraction } from '../../../src/interaction/';
import { getTranslate } from '../util/util';

describe('test interaction', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  function isWheelDown(event) {
    event.preventDefault();
    return event.originalEvent.deltaY > 0;
  }

  registerInteraction('zoom', {
    start: [
      {trigger: 'mousewheel', isEnable(context) {
        return isWheelDown(context.event);
      }, action: 'zoom:zoomOut', throttle: { wait: 30, leading: true, trailing: false }},
      {trigger: 'mousewheel', isEnable(context) {
        return !isWheelDown(context.event);
      }, action: 'zoom:zoomIn', throttle: { wait: 30, leading: true, trailing: false }},
    ]
  });

  registerInteraction('key-move', {
    start: [
      {trigger: 'keydown', isEnable(context) {
        context.event.preventDefault();
        return context.event.key === 'ArrowDown';
      }, action: 'move-direction:down'},
      {trigger: 'keydown', isEnable(context) {
        context.event.preventDefault();
        return context.event.key === 'ArrowUp';
      }, action: 'move-direction:up'},
      {trigger: 'keydown', isEnable(context) {
        context.event.preventDefault();
        return context.event.key === 'ArrowLeft';
      }, action: 'move-direction:left'},
      {trigger: 'keydown', isEnable(context) {
        context.event.preventDefault();
        return context.event.key === 'ArrowRight';
      }, action: 'move-direction:right'},
    ]
  });

  registerInteraction('canvas-move', {
    start: [
      {
        trigger: 'mousedown',
        action: 'move:start',
        isEnable(context) {
          return !context.event.shape;
        }
      }
    ],
    processing: [
      {
        trigger: 'mousemove',
        action: 'move:move'
      }
    ],
    end: [
      {
        trigger: 'mouseup',
        action: 'move:end'
      }
    ]
  })

  registerInteraction('dragNode', {
    start: [
      {
        trigger: 'node:dragstart',
        action: 'move-node-delegate:start'
      }
    ],
    processing: [
      {
        trigger: 'node:drag',
        action: 'move-node-delegate:move'
      }
    ],
    end: [
      {
        trigger: 'node:dragend',
        action: 'move-node-delegate:end'
      }
    ]
  })

  registerInteraction('select', {
    start: [
      {
        trigger: 'node:click',
        action: 'select:click'
      }
    ]
  })

  // registerInteraction('key-move', {
  //   start: [
  //     {trigger: 'mousedown',action: 'move:start'},
      
  //   ],
  //   processing: [
  //     {trigger: 'mousemove',action: 'move:move'},
      
  //   ],
  //   end: [
  //     //{trigger: 'mouseup',action: 'move:end'},
  //     {trigger: 'document:mouseup', action: 'move:end'}
  //   ]
    
  // });

  const graph = new Graph({
    container: div,
    width: 500,
    height: 500,
    nodeStateStyles: {
      selected: {
        fill: 'red'
      }
    }
  });

  const data = {
    nodes: [
      {
        id: 'node1',
        label: 'node1',
      },
      {
        id: 'node2',
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node1',
      },
      {
        id: 'edge3',
        source: 'node2',
        target: 'node2',
      },
    ],
  };

  graph.data(data);
  graph.render();

  const interaction = createInteraction('zoom');
  interaction.bind(graph);

  const interaction1 = createInteraction('key-move');
  interaction1.bind(graph);

  const interaction2 = createInteraction('canvas-move')
  interaction2.bind(graph)

  const interaction3 = createInteraction('dragNode')
  interaction3.bind(graph)

  const interaction4 = createInteraction('select')
  interaction4.bind(graph)

  // div.focus();
  it('test interaction', () => {
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});

    graph.emit('keydown', {key: 'ArrowDown', preventDefault() {}});
    expect(getTranslate(graph)).not.toEqual({x: 0, y: 0});
  });

});