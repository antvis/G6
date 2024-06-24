import { createGraph } from '@@/utils';

describe('this pointer', () => {
  it('element mapper', async () => {
    const graph = await createGraph({
      data: {
        nodes: [
          { id: 'node-0', combo: 'combo-0', style: { x: 100, y: 100 }, states: ['selected'] },
          { id: 'node-1', combo: 'combo-0', style: { x: 150, y: 100 } },
          { id: 'node-2', style: { x: 250, y: 100 } },
        ],
        edges: [{ source: 'node-1', target: 'node-2', states: ['activate'] }],
        combos: [{ id: 'combo-0', states: ['disabled'] }],
      },
    });

    await graph.render();

    const node = {
      type: function () {
        expect(this).toBe(graph);
        return 'circle';
      },
      style: {
        fill: function () {
          expect(this).toBe(graph);
          return 'red';
        },
      },
      state: {
        selected: {
          fill: function () {
            expect(this).toBe(graph);
            return 'yellow';
          },
        },
      },
    };
    const edge = {
      type: function () {
        expect(this).toBe(graph);
        return 'line';
      },
      style: {
        stroke: function () {
          expect(this).toBe(graph);
          return 'blue';
        },
      },
      state: {
        activate: {
          stroke: function () {
            expect(this).toBe(graph);
            return 'orange';
          },
        },
      },
    };
    const combo = {
      type: function () {
        expect(this).toBe(graph);
        return 'circle';
      },
      style: {
        fill: function () {
          expect(this).toBe(graph);
          return 'green';
        },
      },
      state: {
        disabled: {
          fill: function () {
            expect(this).toBe(graph);
            return 'purple';
          },
        },
      },
    };

    graph.setNode(node);
    graph.setEdge(edge);
    graph.setCombo(combo);

    await graph.render();
  });
});
