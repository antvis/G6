import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicVertical,
  Diamond,
  Donut,
  Ellipse,
  HTML,
  Hexagon,
  Image,
  Line,
  Polyline,
  Quadratic,
  Rect,
  RectCombo,
  Star,
  Triangle,
  getExtension,
  getExtensions,
  register,
} from '@antv/g6';
import { pick } from '@antv/util';
import { dark, light } from '@g6/themes';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    expect(getExtensions('node')).toEqual({
      circle: Circle,
      ellipse: Ellipse,
      image: Image,
      rect: Rect,
      star: Star,
      triangle: Triangle,
      diamond: Diamond,
      donut: Donut,
      hexagon: Hexagon,
      html: HTML,
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
      rect: RectCombo,
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
    expect(consoleErrorSpy).toHaveBeenCalledTimes(0);

    consoleErrorSpy.mockRestore();

    expect(pick(getExtensions('node'), ['circle-node', 'rect-node'])).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });
});
