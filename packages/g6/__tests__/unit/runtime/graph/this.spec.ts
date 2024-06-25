import { createGraph } from '@@/utils';

describe('this pointer', () => {
  it('element mapper', async () => {
    const graph = createGraph({
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

    const test = jest.fn((instance) => {
      expect(instance).toBe(graph);
    });

    const node = {
      type: function () {
        test(this); // 3 times
        return 'circle';
      },
      style: {
        fill: function () {
          test(this); // 3 times
          return 'red';
        },
      },
      state: {
        selected: {
          fill: function () {
            test(this); // 1 time
            return 'yellow';
          },
        },
      },
    };
    const edge = {
      type: function () {
        test(this); // 1 time
        return 'line';
      },
      style: {
        stroke: function () {
          test(this); // 1 time
          return 'blue';
        },
      },
      state: {
        activate: {
          stroke: function () {
            test(this); // 1 time
            return 'orange';
          },
        },
      },
    };
    const combo = {
      type: function () {
        test(this); // 1 time
        return 'circle';
      },
      style: {
        fill: function () {
          test(this); // 1 time
          return 'green';
        },
      },
      state: {
        disabled: {
          fill: function () {
            test(this); // 1 time
            return 'purple';
          },
        },
      },
    };

    graph.setNode(node);
    graph.setEdge(edge);
    graph.setCombo(combo);

    await graph.render();

    graph.setNode({
      style: function () {
        test(this); // 3 times
        return {};
      },
      state: {
        selected: function () {
          test(this); // 1 time
          return {};
        },
      },
    });

    graph.setEdge({
      state: {
        activate: {
          fill: function () {
            test(this); // 1 time
            return 'pink';
          },
        },
      },
    });

    graph.setCombo({});

    await graph.render();

    expect(test).toHaveBeenCalledTimes(18);
  });

  it('behavior, plugin, transform', async () => {
    const test = jest.fn((instance) => {
      expect(instance).toBe(graph);
    });

    const graph = createGraph({
      behaviors: [
        'click-select',
        function () {
          test(this);
          return {
            type: 'drag-element',
          };
        },
      ],
      plugins: [
        'history',
        function () {
          test(this);
          return {
            type: 'tooltip',
          };
        },
      ],
      transforms: [
        function () {
          test(this);
          return {
            type: 'parallel-edges',
          };
        },
      ],
    });

    await graph.render();

    expect(test).toHaveBeenCalledTimes(3);
  });
});
