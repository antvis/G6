import { BUILT_IN_EDGES, BUILT_IN_NODES } from '../../src/elements';
import { getPlugin, getPlugins, register, registerBuiltInPlugins } from '../../src/registry';
import { BUILT_IN_THEMES } from '../../src/themes';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    registerBuiltInPlugins();

    expect(getPlugins('node')).toEqual(BUILT_IN_NODES);
    expect(getPlugins('edge')).toEqual(BUILT_IN_EDGES);
    expect(getPlugins('combo')).toEqual({});
    expect(getPlugins('theme')).toEqual(BUILT_IN_THEMES);
  });

  it('register, getPlugin, getPlugins', () => {
    class CircleNode {}
    class RectNode {}
    class Edge {}
    register('node', 'circle-node', CircleNode as any);
    register('node', 'rect-node', RectNode as any);
    register('edge', 'line-edge', Edge);
    expect(getPlugin('node', 'circle-node')).toEqual(CircleNode);
    expect(getPlugin('node', 'rect-node')).toEqual(RectNode);
    expect(getPlugin('node', 'diamond-node')).toEqual(undefined);
    expect(getPlugin('edge', 'line-edge')).toEqual(Edge);

    expect(() => {
      register('node', 'circle-node', CircleNode as any);
    }).toThrow();

    expect(getPlugins('node')).toEqual({
      ...BUILT_IN_NODES,
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
