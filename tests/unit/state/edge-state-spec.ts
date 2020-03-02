import G6 from '../../../src';
import '../../../src/behavior';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph edge states', () => {
  it('global edgeStateStyles and defaultEdge, state change with opacity changed', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'polyline',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'quadratic',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'cubic',
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      edgeStateStyles: {
        hover: {
          opacity: 0.3,
          lineWidth: 5,
        },
      },
      defaultEdge: {
        style: {
          stroke: 'steelblue',
          lineWidth: 3,
        },
      },
    });
    graph.data(data);
    graph.render();
    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      expect(item.hasState('hover')).toEqual(true);
      const keyShape = item.getKeyShape();
      expect(keyShape.attr('opacity')).toEqual(0.3);
      expect(keyShape.attr('lineWidth')).toEqual(5);
      expect(keyShape.attr('stroke')).toEqual('steelblue');
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
      expect(item.hasState('hover')).toEqual(false);
      const keyShape = item.getKeyShape();
      expect(keyShape.attr('opacity')).toEqual(1);
      expect(keyShape.attr('lineWidth')).toEqual(3);
      expect(keyShape.attr('stroke')).toEqual('steelblue');
    });
    const lineEdge = graph.getEdges()[0];
    const polylineEdge = graph.getEdges()[1];
    const quadraticEdge = graph.getEdges()[2];
    const cubicEdge = graph.getEdges()[3];
    graph.emit('edge:mouseenter', { item: lineEdge });
    graph.emit('edge:mouseenter', { item: polylineEdge });
    graph.emit('edge:mouseenter', { item: quadraticEdge });
    graph.emit('edge:mouseenter', { item: cubicEdge });

    graph.emit('edge:mouseleave', { item: lineEdge });
    graph.emit('edge:mouseleave', { item: polylineEdge });
    graph.emit('edge:mouseleave', { item: quadraticEdge });
    graph.emit('edge:mouseleave', { item: cubicEdge });
    graph.destroy();
  });

  it('global edgeStateStyles and defaultEdge, state change with fill/r/width/height/stroke changed', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'polyline',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'quadratic',
        },
        {
          source: 'node1',
          target: 'node2',
          type: 'cubic',
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      edgeStateStyles: {
        hover: {
          shadowColor: '#f00',
          shadowBlur: 10,
          shadowOffsetX: 10,
          shadowOffsetY: 20,
        },
      },
      defaultEdge: {
        size: 10,
      },
    });
    graph.data(data);
    graph.render();
    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      const keyShape = item.getKeyShape();
      expect(keyShape.attr('shadowColor')).toEqual('#f00');
      expect(keyShape.attr('shadowBlur')).toEqual(10);
      expect(keyShape.attr('shadowOffsetX')).toEqual(10);
      expect(keyShape.attr('shadowOffsetY')).toEqual(20);
      expect(keyShape.attr('lineWidth')).toEqual(10);
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
      const keyShape = item.getKeyShape();
      expect(keyShape.attr('shadowColor')).toEqual(undefined);
      expect(keyShape.attr('shadowBlur')).toEqual(undefined);
      expect(keyShape.attr('shadowOffsetX')).toEqual(undefined);
      expect(keyShape.attr('shadowOffsetY')).toEqual(undefined);
      expect(keyShape.attr('lineWidth')).toEqual(10);
    });

    const lineEdge = graph.getEdges()[0];
    const polylineEdge = graph.getEdges()[1];
    const quadraticEdge = graph.getEdges()[2];
    const cubicEdge = graph.getEdges()[3];

    graph.emit('edge:mouseenter', { item: lineEdge });
    graph.emit('edge:mouseenter', { item: polylineEdge });
    graph.emit('edge:mouseenter', { item: quadraticEdge });
    graph.emit('edge:mouseenter', { item: cubicEdge });

    graph.emit('edge:mouseleave', { item: lineEdge });
    graph.emit('edge:mouseleave', { item: polylineEdge });
    graph.emit('edge:mouseleave', { item: quadraticEdge });
    graph.emit('edge:mouseleave', { item: cubicEdge });
    graph.destroy();
  });

  it('global defaultEdgeand stateStyle in data, state change with fill/r/width/height/stroke changed', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
      ],
      edges: [
        {
          id: 'line',
          source: 'node1',
          target: 'node2',
          stateStyles: {
            hover: {
              lineWidth: 5,
            },
          },
        },
        {
          id: 'polyline',
          source: 'node1',
          target: 'node2',
          type: 'polyline',
          stateStyles: {
            hover: {
              stroke: '#0f0',
            },
          },
        },
        {
          id: 'quadratic',
          source: 'node1',
          target: 'node2',
          type: 'quadratic',
          stateStyles: {
            hover: {
              opacity: 0.3,
            },
          },
        },
        {
          id: 'cubic',
          source: 'node1',
          target: 'node2',
          type: 'cubic',
          stateStyles: {
            hover: {
              shadowColor: '#00f',
              shadowBlur: 15,
              shadowOffsetX: 5,
              shadowOffsetY: 25,
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        style: {
          lineAppendWidth: 5,
          stroke: '#aaa',
          lineWidth: 1,
        },
      },
    });
    graph.data(data);
    graph.render();
    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', true);
      expect(item.hasState('hover')).toEqual(true);
      const keyShape = item.getKeyShape();
      const model = item.getModel();
      switch (model.id) {
        case 'line':
          expect(keyShape.attr('lineWidth')).toEqual(5);
          expect(keyShape.attr('stroke')).toEqual('#aaa');
          break;
        case 'polyline':
          expect(keyShape.attr('lineWidth')).toEqual(1);
          expect(keyShape.attr('stroke')).toEqual('#0f0');
          break;
        case 'quadratic':
          expect(keyShape.attr('opacity')).toEqual(0.3);
          expect(keyShape.attr('lineWidth')).toEqual(1);
          break;
        case 'cubic':
          expect(keyShape.attr('shadowColor')).toEqual('#00f');
          expect(keyShape.attr('shadowBlur')).toEqual(15);
          expect(keyShape.attr('shadowOffsetX')).toEqual(5);
          expect(keyShape.attr('shadowOffsetY')).toEqual(25);
          expect(keyShape.attr('lineWidth')).toEqual(1);
          break;
      }
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'hover', false);
      expect(item.hasState('hover')).toEqual(false);
      const keyShape = item.getKeyShape();
      const curOpacity = keyShape.attr('shadowColor');
      const curShadowBlur = keyShape.attr('shadowBlur');
      const curShadowOffsetX = keyShape.attr('shadowBlur');
      const curShadowOffsetY = keyShape.attr('shadowBlur');
      expect(curOpacity === undefined || curOpacity === null).toEqual(true);
      expect(curShadowBlur === undefined || curShadowBlur === null).toEqual(true);
      expect(curShadowOffsetX === undefined || curShadowOffsetX === null).toEqual(true);
      expect(curShadowOffsetY === undefined || curShadowOffsetY === null).toEqual(true);
      expect(keyShape.attr('lineWidth')).toEqual(1);
      expect(keyShape.attr('stroke')).toEqual('#aaa');
    });
    const lineEdge = graph.getEdges()[0];
    const polylineEdge = graph.getEdges()[1];
    const quadraticEdge = graph.getEdges()[2];
    const cubicEdge = graph.getEdges()[3];
    graph.emit('edge:mouseenter', { item: lineEdge });
    graph.emit('edge:mouseenter', { item: polylineEdge });
    graph.emit('edge:mouseenter', { item: quadraticEdge });
    graph.emit('edge:mouseenter', { item: cubicEdge });

    graph.emit('edge:mouseleave', { item: lineEdge });
    graph.emit('edge:mouseleave', { item: polylineEdge });
    graph.emit('edge:mouseleave', { item: quadraticEdge });
    graph.emit('edge:mouseleave', { item: cubicEdge });
    graph.destroy();
  });

  it('global defaultNode and multiple stateStyle in data', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          stateStyles: {
            state1: {
              lineWidth: 3,
            },
            state2: {
              lineWidth: 5,
              stroke: '#f00',
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        style: {
          lineWidth: 1,
          lineAppendWidth: 5,
        },
      },
    });
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(3);
      expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', false);
      expect(item.hasState('state2')).toEqual(true);
      expect(item.hasState('state1')).toEqual(false);
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(5);
      expect(keyShape.attr('stroke')).toEqual('#f00');
    });
    graph.on('edge:click', e => {
      const item = e.item;
      graph.setItemState(item, 'state2', !item.hasState('state2'));
      expect(item.hasState('state2')).toEqual(true);
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(5);
      expect(keyShape.attr('stroke')).toEqual('#f00');
    });
    graph.on('canvas:click', () => {
      graph.getEdges().forEach(edge => {
        graph.setItemState(edge, 'state2', false);
        expect(edge.hasState('state2')).toEqual(false);
        const keyShape = edge.getKeyShape();
        expect(keyShape.attr('lineWidth')).toEqual(1);
        expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
      });
    });
    graph.emit('edge:mouseenter', { item: edge });
    graph.emit('edge:click', { item: edge });
    graph.emit('edge:mouseleave', { item: edge });
    graph.emit('canvas:click', {});
    graph.destroy();
  });

  it('updateItem and state', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          stateStyles: {
            state1: {
              lineWidth: 3,
              stroke: '#f00',
            },
            state2: {
              lineWidth: 5,
              stroke: '#00f',
            },
          },
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        style: {
          lineWidth: 1,
        },
      },
    });
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    graph.updateItem(edge, {
      type: 'cubic',
      style: {
        stroke: '#0f0',
      },
    });
    expect(edge.getKeyShape().attr('stroke')).toEqual('#0f0');
    expect(edge.getKeyShape().attr('lineWidth')).toEqual(1);

    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', false);
      expect(item.hasState('state1')).toEqual(false);
      expect(item.hasState('state2')).toEqual(true);
    });
    graph.on('edge:click', e => {
      const item = e.item;
      graph.setItemState(item, 'state2', true);
      expect(item.hasState('state1')).toEqual(true);
      expect(item.hasState('state2')).toEqual(true);
    });
    graph.on('canvas:click', () => {
      graph.getEdges().forEach(edge => {
        graph.setItemState(edge, 'state2', false);
        expect(edge.hasState('state1')).toEqual(false);
        expect(edge.hasState('state2')).toEqual(false);
      });
    });
    graph.emit('node:mouseenter', { item: edge });
    graph.emit('node:click', { item: edge });
    graph.emit('node:mouseleave', { item: edge });
    graph.emit('canvas:click', {});
    graph.destroy();
  });

  it('combine edgeStateStyles on Graph and stateStyles in data', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 100,
          y: 100,
        },
        {
          id: 'node2',
          x: 300,
          y: 300,
        },
        {
          id: 'node3',
          x: 400,
          y: 100,
        },
      ],
      edges: [
        {
          id: 'edge1',
          source: 'node1',
          target: 'node2',
          stateStyles: {
            state1: {
              lineWidth: 3,
              stroke: '#f00',
              shadowColor: '#0f0',
              shadowBlur: 10,
            },
          },
        },
        {
          id: 'edge2',
          source: 'node2',
          target: 'node3',
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      edgeStateStyles: {
        state1: {
          lineWidth: 7,
        },
      },
    });
    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];
    graph.on('edge:mouseenter', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', true);
      expect(item.hasState('state1')).toEqual(true);
      const keyShape = item.getKeyShape();
      const id = item.getModel().id;
      switch (id) {
        case 'edge1':
          expect(keyShape.attr('lineWidth')).toEqual(3);
          expect(keyShape.attr('stroke')).toEqual('#f00');
          expect(keyShape.attr('shadowColor')).toEqual('#0f0');
          expect(keyShape.attr('shadowBlur')).toEqual(10);
          break;
        case 'edge2':
          expect(keyShape.attr('lineWidth')).toEqual(7);
          expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
          break;
      }
    });
    graph.on('edge:mouseleave', e => {
      const item = e.item;
      graph.setItemState(item, 'state1', false);
      expect(item.hasState('state1')).toEqual(false);
    });
    graph.emit('edge:mouseenter', { item: edge });
    graph.emit('edge:mouseleave', { item: edge });
    graph.destroy();
  });
});
