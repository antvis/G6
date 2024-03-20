import { pluginWatermark } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('plugin watermark', () => {
  it('watermark css', async () => {
    const graph = await createDemoGraph(pluginWatermark);
    expect(graph.getPlugins()).toEqual([{ type: 'watermark', text: 'hello, \na watermark.', textFontSize: 24 }]);
  });
});
