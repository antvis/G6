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
import { getExtension, getExtensions, register } from '@/src/registry';
import { dark, light } from '@/src/themes';
import { pick } from '@antv/util';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    expect(getExtensions('node')).toEqual({
      circle: Circle,
      ellipse: Ellipse,
      image: Image,
      rect: Rect,
      star: Star,
      triangle: Triangle,
    });
    expect(getExtensions('edge')).toEqual({
      cubic: Cubic,
      line: Line,
      polyline: Polyline,
      quadratic: Quadratic,
      'cubic-horizontal': CubicHorizontal,
      'cubic-vertical': CubicVertical,
    });
    expect(getExtensions('combo')).toEqual({
      circle: CircleCombo,
    });
    expect(getExtensions('theme')).toEqual({
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
    expect(getExtension('node', 'circle-node')).toEqual(CircleNode);
    expect(getExtension('node', 'rect-node')).toEqual(RectNode);
    expect(getExtension('node', 'diamond-node')).toEqual(undefined);
    expect(getExtension('edge', 'line-edge')).toEqual(Edge);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    register('node', 'circle-node', CircleNode as any);
    expect(consoleErrorSpy.mock.calls[0][0]).toBe('The extension circle-node of node has been registered before.');

    consoleErrorSpy.mockRestore();

    expect(pick(getExtensions('node'), ['circle-node', 'rect-node'])).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
