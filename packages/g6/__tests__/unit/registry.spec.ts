import { pick } from '@antv/util';
import { Circle, Cubic, Ellipse, Image, Line, Polyline, Quadratic, Rect, Star, Triangle } from '../../src/elements';
import { getPlugin, getPlugins, register, registerBuiltInPlugins } from '../../src/registry';
import { dark, light } from '../../src/themes';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    registerBuiltInPlugins();

    expect(getPlugins('node')).toEqual({
      circle: Circle,
      ellipse: Ellipse,
      image: Image,
      rect: Rect,
      star: Star,
      triangle: Triangle,
    });
    expect(getPlugins('edge')).toEqual({
      cubic: Cubic,
      line: Line,
      polyline: Polyline,
      quadratic: Quadratic,
    });
    expect(getPlugins('combo')).toEqual({});
    expect(getPlugins('theme')).toEqual({
      dark,
      light,
    });
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

    const error = console.error;
    console.error = jest.fn();

    register('node', 'circle-node', CircleNode as any);
    // @ts-expect-error mock exists on jest.fn()
    expect(console.error.mock.calls[0][0]).toBe('The plugin circle-node of node has been registered before.');
    console.error = error;

    expect(pick(getPlugins('node'), ['circle-node', 'rect-node'])).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
