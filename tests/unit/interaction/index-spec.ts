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

  // div.focus();
  it('test interaction', () => {
    expect(getTranslate(graph)).toEqual({x: 0, y: 0});

    graph.emit('keydown', {key: 'ArrowDown', preventDefault() {}});
    expect(getTranslate(graph)).not.toEqual({x: 0, y: 0});
  });

});