import {
  formatPadding, isViewportChanged,
  processParallelEdges, cloneEvent,
  isNaN, calculationItemsBBox
} from '../../../src/util/base';
import { IG6GraphEvent } from '../../../src/types';
import { G6GraphEvent } from '../../../src/interface/behavior';
import G6 from '../../../src';

describe('base util', () => {
  it('formatPadding', () => {
    let padding = formatPadding(5);
    expect(padding).toEqual([5, 5, 5, 5]);

    padding = formatPadding('10');
    expect(padding).toEqual([10, 10, 10, 10]);

    padding = formatPadding([5]);
    expect(padding).toEqual([5, 5, 5, 5]);

    padding = formatPadding([5, 10]);
    expect(padding).toEqual([5, 10, 5, 10]);

    padding = formatPadding([5, 10, 15]);
    expect(padding).toEqual([5, 10, 15, 10]);

    padding = formatPadding([5, 10, 15, 20]);
    expect(padding).toEqual([5, 10, 15, 20]);
  });

  it('isViewportChanged', () => {
    let isChanged = isViewportChanged(null);
    expect(isChanged).toBe(false);

    isChanged = isViewportChanged([1, 0, 0, 0, 1, 0, 0, 0, 1]);
    expect(isChanged).toBe(false);

    isChanged = isViewportChanged([1, 0, 0, 0.5, 1, 0, 0, 0, 1]);
    expect(isChanged).toBe(true);
  });

  it('processParallelEdges', () => {
    const edges: any = [{ source: 0, target: 1 }, { source: 0, target: 1 }]
    processParallelEdges(edges);
    expect(edges[0].type).toEqual('quadratic');
    expect(edges[1].type).toEqual('quadratic');
    expect(edges[0].curveOffset).toEqual(15);
    expect(edges[1].curveOffset).toEqual(-15);

    edges.push({ source: 1, target: 0 });
    processParallelEdges(edges);
    console.log(edges);
    expect(edges[2].type).toEqual('quadratic');
    expect(edges[0].curveOffset).toEqual(0);
    expect(edges[1].curveOffset).toEqual(-30);
    expect(edges[2].curveOffset).toEqual(-30);

    edges.push({ source: 0, target: 0 });
    edges.push({ source: 0, target: 0 });
    processParallelEdges(edges);
    expect(edges[3].type).toEqual('loop');
    expect(edges[4].type).toEqual('loop');
    expect(edges[3].loopCfg.position).toEqual('top');
    expect(edges[4].loopCfg.position).toEqual('top-right');
  });

  it('cloneEvent', () => {
    const event = new G6GraphEvent('click', {
      clientX: Math.random(), clientY: Math.random(),
      x: Math.random(), y: Math.random(),
      bubbles: false,
    } as IG6GraphEvent);
    const cEvent = cloneEvent(event);
    expect(cEvent.type).toEqual(event.type);
    expect(cEvent.clientX).toEqual(event.clientX);
    expect(cEvent.clientY).toEqual(event.clientY);
    expect(cEvent.x).toEqual(event.x);
    expect(cEvent.y).toEqual(event.y);
    expect(cEvent.bubbles).toEqual(true);
  });

  it('isNaN', () => {
    expect(isNaN(NaN)).toEqual(true);
    expect(isNaN(undefined)).toEqual(true);
    expect(isNaN(null)).toEqual(false);
    expect(isNaN('')).toEqual(false);
    expect(isNaN(1)).toEqual(false);
  });

  it('calculationItemsBBox', () => {
    const div = document.createElement('div');
    div.id = 'base-spec';
    document.body.appendChild(div);
    const graph = new G6.Graph({
      container: div,
      width: 800,
      height: 600,
    });
    graph.addItem('node', { x: 100, y: 100 });
    graph.addItem('node', { x: -100, y: -100 });
    const bbox = calculationItemsBBox(graph.getNodes());
    expect(bbox.height).toBe(222);
    expect(bbox.width).toBe(222);
    expect(bbox.minX).toBe(-110.5);
    expect(bbox.minY).toBe(-110.5);
    expect(bbox.maxX).toBe(110.5);
    expect(bbox.maxY).toBe(110.5);
    expect(bbox.x).toBe(-111);
    expect(bbox.y).toBe(-111);
  });
});
