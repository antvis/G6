import type { Graph, Label, Title } from '@/src';
import { pluginTitle } from '@@/demos';
import { createDemoGraph } from '../../utils';

describe('plugin title', () => {
  let graph: Graph;
  let titlePlugin: Title;

  const executeTest = () => {
    expect(typeof titlePlugin).toBe('object');

    const [width] = graph.getSize();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [titleLabel, subtitleLabel] = titlePlugin.canvas.getRoot().childNodes;

    const titleAttr = (titleLabel as Label).attributes;
    const titleX = titleAttr.x;
    expect(titleX).toBe(width / 2);

    const subtitleAttr = (subtitleLabel as Label).attributes;
    const subtitleX = subtitleAttr.x;
    expect(subtitleX).toBe(width / 2);

    expect(titleAttr.text).toBe('这是一个标题这是一个标题');
    expect(subtitleAttr.text).toBe('这是一个副标');

    expect(titleAttr.fontSize).toBe(28);
    expect(subtitleAttr.fill).toBe('#2989FF');
  };

  beforeAll(async () => {
    graph = await createDemoGraph(pluginTitle);
    titlePlugin = graph.getPluginInstance('title');
  });

  it('title', executeTest);

  afterAll(() => {
    graph.destroy();
  });
});
