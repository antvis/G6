import { Renderer } from '@antv/g-canvas';
import type { G6Spec } from '../../src/spec';
import type { DataOption } from '../../src/spec/data';
import type { ComboOption, EdgeOption, NodeOption } from '../../src/spec/element';
import type { LayoutOption } from '../../src/spec/layout';
import type { ModeOption } from '../../src/spec/mode';
import type { OptimizeOption } from '../../src/spec/optimize';
import type { ThemeOption } from '../../src/spec/theme';
import type { SpecGenerics } from '../../src/spec/types';
import type { WidgetOption } from '../../src/spec/widget';
import type { EmptyObject } from '../../src/types/types';

// for type check
describe('spec', () => {
  it('spec', () => {
    const spec: G6Spec<{
      behavior: 'my-behavior';
      state: 'state1' | 'state2';
      theme: 'red' | 'blue';
      palette: 'blue' | 'green';
      data: {
        node: {
          data: {
            value: number;
          };
          style: {
            /**
             * type description
             */
            nodeStyle?: string;
          };
        };
        edge: {
          data: {
            weight: number;
          };
          style: {
            edgeStyle?: string;
          };
        };
        combo: {
          data: {
            value: number;
          };
          style: {
            comboStyle?: string;
          };
        };
      };
      widget:
        | {
            type: 'my-widget';
            text?: string;
            value: number;
          }
        | {
            type: 'another-widget';
            /**
             * text description
             */
            text: string;
            value: number;
          };
    }> = {
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
          default: {
            enter: {
              type: 'fade-in',
            },
          },
        },
        palette: {
          type: 'group',
          field: 'field',
          color: 'green',
        },
      },
      theme: 'red',
      mode: ['drag-canvas', 'my-behavior'],
      widget: ['my-widget', { type: 'another-widget', text: 'text', value: 1 }],
      optimize: {
        tileFirstRender: true,
      },
    };

    expect(spec).toBeTruthy();
  });

  it('infer', () => {
    class Graph<T extends SpecGenerics> {
      #spec: G6Spec<T>;

      constructor(spec: G6Spec<T>) {
        this.#spec = spec;
      }

      public getData(): NonNullable<G6Spec<T>['data']> {
        return this.#spec.data!;
      }

      public setData(data: G6Spec<T>['data']) {
        this.#spec.data = data;
      }
    }

    const anySpec: G6Spec = {
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

    const anyGraph = new Graph(anySpec);
    const anyData = anyGraph.getData();

    // type of anyData.nodes[0].data.value is any
    expect(anyData.nodes?.[0].data?.value).toBeTruthy();

    const typeSpec: G6Spec<{ data: { node: { data: { value: number }; style: { fill: string } } } }> = {
      data: {
        nodes: [{ id: 'node-1', data: { value: 1 }, style: { fill: 'red' } }],
      },
    };

    const typeGraph = new Graph(typeSpec);
    const typeData = typeGraph.getData();

    // type of typeData.nodes[0].data.value is number
    expect(typeData.nodes?.[0].data?.value).toBeTruthy();
  });

  it('data', () => {
    const data: DataOption<{
      node: { style: { x: number; fill: string } };
      edge: { style: { stroke: string } };
      combo: { style: { x: number; fill: string } };
    }> = {
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

    const registerTheme: ThemeOption<'ghost'> = 'ghost';
    expect(registerTheme).toBeTruthy();
  });

  it('behavior', () => {
    const builtInBehavior: ModeOption = ['orbit-canvas-3d'];
    expect(builtInBehavior).toBeTruthy();

    const registerBehavior: ModeOption<'my-behavior'> = ['drag-canvas', 'my-behavior'];
    expect(registerBehavior).toBeTruthy();
  });

  it('layout', () => {
    const builtInLayout: LayoutOption = {
      type: 'concentric',
      clockwise: true,
      height: 100,
    };
    expect(builtInLayout).toBeTruthy();

    type RegisterLayout = LayoutOption<
      EmptyObject,
      { type: 'layout1'; param: number } | { type: 'layout2'; args: boolean }
    >;

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

    const pipeLayout: LayoutOption<{ data: { value: number } }> = [
      {
        type: 'force',
        nodesFilter: (node) => node.data!.value > 1,
      },
    ];
    expect(pipeLayout).toBeTruthy();
  });

  it('node', () => {
    const registerNode: NodeOption<{ style: { nodeStyle: string } }, 'state1' | 'state2'> = {
      style: {
        nodeStyle: (model) => model.style?.nodeStyle || 'white',
      },
      state: {
        state1: {
          nodeStyle: (data) => data.style?.nodeStyle || 'white',
        },
      },
      animate: {
        default: {
          enter: {
            type: 'fade-in',
            delay: 100,
          },
        },
        state1: {
          show: {
            type: 'wave-in',
            duration: 100,
          },
        },
      },
      palette: 'spectral',
    };

    expect(registerNode).toBeTruthy();
  });

  it('edge', () => {
    const registerEdge: EdgeOption<{ style: { edgeStyle: string } }, 'state1' | 'state2', 'my-palette'> = {
      style: {
        edgeStyle: (model) => model.style?.edgeStyle || 'white',
      },
      state: {
        state1: {
          edgeStyle: 'red',
        },
      },
      animate: {
        default: {
          enter: {
            type: 'fade-in',
            delay: 100,
          },
        },
        state1: {
          show: {
            type: 'wave-in',
            duration: 100,
          },
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
    const registerCombo: ComboOption<{ style: { comboStyle: string } }, 'state1' | 'state2'> = {
      style: {
        comboStyle: (model) => model.style?.comboStyle || 'white',
      },
      state: {
        state1: {
          comboStyle: 'red',
        },
      },
      animate: {
        default: {
          enter: {
            type: 'fade-in',
            delay: 100,
          },
        },
        state1: {
          show: {
            type: 'wave-in',
            duration: 100,
          },
        },
      },
    };

    expect(registerCombo).toBeTruthy();
  });

  it('widget', () => {
    const builtInWidget: WidgetOption = ['hull', { type: 'grid' }];
    expect(builtInWidget).toBeTruthy();

    type RegisterWidget1 = {
      type: 'widget1';
      option1: string;
    };
    type RegisterWidget2 = {
      type: 'widget2';
      option2: number;
    };
    const registerWidget: WidgetOption<RegisterWidget1 | RegisterWidget2> = [
      'widget1',
      { type: 'widget2', option2: 1 },
      'grid',
      { type: 'tooltip' },
    ];

    expect(registerWidget).toBeTruthy();
  });

  it('optimize', () => {
    const optimize: OptimizeOption = {
      tileFirstRender: true,
    };

    expect(optimize).toBeTruthy();
  });
});
