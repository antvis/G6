import { BaseLayout, ExtensionCategory, Graph, register } from '@antv/g6';

import type { BaseLayoutOptions, GraphData } from '@antv/g6';

interface CustomLayoutOptions extends BaseLayoutOptions {
  onTick: (data: GraphData) => void;
}

class CustomIterativeLayout extends BaseLayout<CustomLayoutOptions> {
  public id = 'custom-layout';

  private tickCount = 0;

  private data?: GraphData;

  private timer?: number;

  private resolve?: () => void;

  private promise?: Promise<void>;

  async execute(data: GraphData, options: CustomLayoutOptions): Promise<GraphData> {
    const { onTick } = { ...this.options, ...options };

    this.tickCount = 0;
    this.data = data;

    this.promise = new Promise((resolve) => {
      this.resolve = resolve;
    });

    this.timer = window.setInterval(() => {
      onTick(this.simulateTick());
      if (this.tickCount === 10) this.stop();
    }, 200);

    await this.promise;

    return this.simulateTick();
  }

  simulateTick = () => {
    const x = this.tickCount++ % 2 === 0 ? 50 : 150;

    return {
      nodes: (this?.data?.nodes || []).map((node, index) => ({
        id: node.id,
        style: { x, y: 100 + index * 30 },
      })),
    };
  };

  tick = () => {
    return this.simulateTick();
  };

  stop = () => {
    clearInterval(this.timer);
    this.resolve?.();
  };
}

export const layoutCustomIterative: TestCase = async (context) => {
  register(ExtensionCategory.LAYOUT, 'custom-iterative', CustomIterativeLayout);

  const graph = new Graph({
    ...context,
    data: {
      nodes: Array.from({ length: 10 }).map((_, i) => ({ id: i })),
    },
    layout: {
      type: 'custom-iterative',
      gap: 10,
    },
  });

  await graph.render();

  return graph;
};
