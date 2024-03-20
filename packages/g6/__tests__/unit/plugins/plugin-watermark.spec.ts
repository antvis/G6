import { pluginWatermark, pluginWatermarkImage } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

// Skip it because it's not working in the test environment.
describe.skip('plugin watermark', () => {
  it('watermark text', async () => {
    const graph = await createDemoGraph(pluginWatermark);
    expect(graph.getPlugins()).toEqual([{ type: 'watermark', text: 'hello, \na watermark.', textFontSize: 12 }]);
    expect(graph.getCanvas().getContainer()?.style.backgroundImage).toContain('data:image/png;base64');

    graph.destroy();
    expect(graph.getCanvas().getContainer()?.style.backgroundImage).toBeFalsy();
  });

  it('watermark image', async () => {
    const graph = await createDemoGraph(pluginWatermarkImage);
    expect(graph.getPlugins()).toEqual([
      {
        type: 'watermark',
        width: 100,
        height: 100,
        imageURL: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
      },
    ]);
    expect(graph.getCanvas().getContainer()?.style.backgroundImage).toContain('data:image/png;base64');

    graph.destroy();
    expect(graph.getCanvas().getContainer()?.style.backgroundImage).toBeFalsy();
  });
});
