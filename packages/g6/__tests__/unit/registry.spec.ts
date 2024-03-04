import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicVertical,
  Ellipse,
  Image,
  Line,
  Polyline,
  Quadratic,
  Rect,
  Star,
  Triangle,
} from '@/src/elements';
import { getPlugin, getPlugins, register } from '@/src/registry';
import { dark, light } from '@/src/themes';
import { pick } from '@antv/util';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
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
      'cubic-horizontal': CubicHorizontal,
      'cubic-vertical': CubicVertical,
    });
    expect(getPlugins('combo')).toEqual({
      circle: CircleCombo,
    });
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
    register('edge', 'line-edge', Edge as any);
    expect(getPlugin('node', 'circle-node')).toEqual(CircleNode);
    expect(getPlugin('node', 'rect-node')).toEqual(RectNode);
    expect(getPlugin('node', 'diamond-node')).toEqual(undefined);
    expect(getPlugin('edge', 'line-edge')).toEqual(Edge);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    register('node', 'circle-node', CircleNode as any);
    expect(consoleErrorSpy.mock.calls[0][0]).toBe('The plugin circle-node of node has been registered before.');

    consoleErrorSpy.mockRestore();

    expect(pick(getPlugins('node'), ['circle-node', 'rect-node'])).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
