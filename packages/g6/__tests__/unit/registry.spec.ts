import { getPlugin, getPlugins, register, registerBuiltInPlugins } from '../../src/registry';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    registerBuiltInPlugins();

    // TODO 在变更内置插件后更新此用例 / update this when we have more built-in plugins
    expect(getPlugins('node')).toEqual({});
    expect(getPlugins('edge')).toEqual({});
    expect(getPlugins('combo')).toEqual({});
    expect(getPlugins('theme')).toEqual({});
  });

  it('register, getPlugin, getPlugins', () => {
    class CircleNode {}
    class RectNode {}
    class Edge {}
    register('node', 'circle-node', CircleNode);
    register('node', 'rect-node', RectNode);
    register('edge', 'edge', Edge);
    expect(getPlugin('node', 'circle-node')).toEqual(CircleNode);
    expect(getPlugin('node', 'rect-node')).toEqual(RectNode);
    expect(getPlugin('node', 'diamond-node')).toEqual(undefined);
    expect(getPlugin('edge', 'edge')).toEqual(Edge);

    expect(() => {
      register('node', 'circle-node', CircleNode);
    }).toThrow();

    expect(getPlugins('node')).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
