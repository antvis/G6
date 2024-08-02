import { pluginWatermark, pluginWatermarkImage } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('plugin watermark', () => {
  it('watermark text', async () => {
    const graph = await createDemoGraph(pluginWatermark);
    const container = graph.getCanvas().getContainer()!;

    const el = container.querySelector('.g6-watermark') as HTMLDivElement;

    expect(graph.getPlugins()).toEqual([{ type: 'watermark', text: 'hello, \na watermark.', textFontSize: 12 }]);
    expect(el.style.backgroundImage).toContain('data:image/png;base64');

    await graph.destroy();
    expect(container.querySelector('.g6-watermark')).toBeFalsy();
  });

  it('watermark image', async () => {
    const graph = await createDemoGraph(pluginWatermarkImage);
    const container = graph.getCanvas().getContainer()!;

    expect(graph.getPlugins()).toEqual([
      {
        type: 'watermark',
        width: 100,
        height: 100,
        imageURL: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*7svFR6wkPMoAAAAAAAAAAAAADmJ7AQ/original',
      },
    ]);
    await graph.destroy();
    expect(container.querySelector('.g6-watermark')).toBeFalsy();
  });
});
