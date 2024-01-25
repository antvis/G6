import { Renderer } from '@antv/g-canvas';
import type { G6Spec } from '../../src/spec';
import type { DataOption } from '../../src/spec/data';
import type { ComboOption, EdgeOption, NodeOption } from '../../src/spec/element';
import type { LayoutOption } from '../../src/spec/layout';
import type { ModeOption } from '../../src/spec/mode';
import type { OptimizeOption } from '../../src/spec/optimize';
import type { ThemeOption } from '../../src/spec/theme';
import type { WidgetOption } from '../../src/spec/widget';

// for type check
describe('spec', () => {
  it('spec', () => {
    const spec: G6Spec = {
      width: 800,
      height: 600,
      renderer: () => {
        return new Renderer();
      },
      devicePixelRatio: 2,
      autoResize: true,
      autoFit: {
        type: 'view',
        rules: {},
      },
      padding: [10, 10],
      zoom: 1.2,
      zoomRange: [0.5, 2],
      data: {
        nodes: [
          {
            id: 'node-1',
            data: {
              value: 1,
            },
            style: {
              nodeStyle: 'red',
            },
          },
        ],
        edges: [],
        combos: [],
      },
      node: {
        style: {
          nodeStyle: 'blue',
        },
        state: {
          state1: {
            nodeStyle: 'green',
          },
        },
        animate: {
          enter: {
            type: 'fade-in',
          },
        },
        palette: {
          type: 'group',
          field: 'field',
          color: 'brBG',
        },
      },
      theme: 'light',
      mode: ['drag-canvas', 'my-behavior'],
      widget: ['my-widget', { type: 'another-widget', text: 'text', value: 1 }],
      optimize: {
        tileFirstRender: true,
      },
    };

    expect(spec).toBeTruthy();
  });

  it('infer', () => {
    class Graph {
      #spec: G6Spec;

      constructor(spec: G6Spec) {
        this.#spec = spec;
      }

      public getData(): NonNullable<G6Spec['data']> {
        return this.#spec.data!;
      }

      public setData(data: G6Spec['data']) {
        this.#spec.data = data;
      }
    }

    const anySpec = {
      data: {
        nodes: [
          {
            id: 'node-1',
            data: { value: 1 },
            style: { fill: 'red' },
          },
        ],
      },
    };

    const graph = new Graph(anySpec);
    const data = graph.getData();

    expect(data.nodes?.[0].data?.value).toBeTruthy();
  });

  it('data', () => {
    const data: DataOption = {
      nodes: [
        { id: 'node-1' },
        { id: 'node-2', data: { value: 1, field: 'A' } },
        { id: 'node-3', data: { value: 2 }, style: { x: 1, fill: 'red', y: 1, opacity: 0.1 } },
      ],
      edges: [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          data: { value: 1, field: 'A' },
          style: { stroke: 'red' },
        },
        { id: 'edge-2', source: 'node-1', target: 'node-3' },
      ],
      combos: [
        { id: 'combo-1' },
        { id: 'combo-2', data: { value: 1, field: 'A' } },
        { id: 'combo-3', data: { value: 2 }, style: { x: 1, fill: 'red' } },
      ],
    };

    expect(data).toBeTruthy();
  });

  it('theme', () => {
    const builtInTheme: ThemeOption = 'light';
    expect(builtInTheme).toBeTruthy();

    const registerTheme: ThemeOption = 'ghost';
    expect(registerTheme).toBeTruthy();
  });

  it('behavior', () => {
    const builtInBehavior: ModeOption = ['orbit-canvas-3d'];
    expect(builtInBehavior).toBeTruthy();

    const registerBehavior: ModeOption = ['drag-canvas', 'my-behavior'];
    expect(registerBehavior).toBeTruthy();
  });

  it('layout', () => {
    const builtInLayout: LayoutOption = {
      type: 'concentric',
      clockwise: true,
      height: 100,
    };
    expect(builtInLayout).toBeTruthy();

    type RegisterLayout = LayoutOption;

    const registerLayout1: RegisterLayout = {
      type: 'layout1',
      param: 1,
    };
    expect(registerLayout1).toBeTruthy();

    const registerLayout2: RegisterLayout = {
      type: 'layout2',
      args: true,
    };
    expect(registerLayout2).toBeTruthy();

    const pipeLayout: LayoutOption = [
      {
        type: 'force',
        nodesFilter: (node) => node.data!.value > 1,
      },
    ];
    expect(pipeLayout).toBeTruthy();
  });

  it('node', () => {
    const registerNode: NodeOption = {
      style: {
        nodeStyle: (model) => model.style?.nodeStyle || 'white',
      },
      state: {
        state1: {
          nodeStyle: (data) => data.style?.nodeStyle || 'white',
        },
      },
      animate: {
        enter: {
          type: 'fade-in',
          delay: 100,
        },
        show: {
          type: 'wave-in',
          duration: 100,
        },
      },
      palette: 'spectral',
    };

    expect(registerNode).toBeTruthy();
  });

  it('edge', () => {
    const registerEdge: EdgeOption = {
      style: {
        edgeStyle: (model) => model.style?.edgeStyle || 'white',
      },
      state: {
        state1: {
          edgeStyle: 'red',
        },
      },
      animate: {
        enter: {
          type: 'fade-in',
          delay: 100,
        },
        show: {
          type: 'wave-in',
          duration: 100,
        },
      },
      palette: {
        type: 'group',
        color: 'my-palette',
        invert: true,
      },
    };

    expect(registerEdge).toBeTruthy();
  });

  it('combo', () => {
    const registerCombo: ComboOption = {
      style: {
        comboStyle: (model) => model.style?.comboStyle || 'white',
      },
      state: {
        state1: {
          comboStyle: 'red',
        },
      },
      animate: {
        enter: {
          type: 'fade-in',
          delay: 100,
        },
        show: {
          type: 'wave-in',
          duration: 100,
        },
      },
    };

    expect(registerCombo).toBeTruthy();
  });

  it('widget', () => {
    const builtInWidget: WidgetOption = ['hull', { type: 'grid' }];
    expect(builtInWidget).toBeTruthy();

    const registerWidget: WidgetOption = ['widget1', { type: 'widget2', option2: 1 }, 'grid', { type: 'tooltip' }];

    expect(registerWidget).toBeTruthy();
  });

  it('optimize', () => {
    const optimize: OptimizeOption = {
      tileFirstRender: true,
    };

    expect(optimize).toBeTruthy();
  });
});
