import {
  Circle,
  CircleCombo,
  Cubic,
  CubicHorizontal,
  CubicRadial,
  CubicVertical,
  Diamond,
  Donut,
  Ellipse,
  ExtensionCategory,
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
} from '@/src';
import { dark, light } from '@/src/themes';
import { Circle as GCircle } from '@antv/g';
import { pick } from '@antv/util';

describe('registry', () => {
  it('registerBuiltInPlugins', () => {
    expect(getExtensions(ExtensionCategory.NODE)).toEqual({
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
    expect(getExtensions(ExtensionCategory.EDGE)).toEqual({
      cubic: Cubic,
      line: Line,
      polyline: Polyline,
      quadratic: Quadratic,
      'cubic-horizontal': CubicHorizontal,
      'cubic-vertical': CubicVertical,
      'cubic-radial': CubicRadial,
    });
    expect(getExtensions(ExtensionCategory.COMBO)).toEqual({
      circle: CircleCombo,
      rect: RectCombo,
    });
    expect(getExtensions(ExtensionCategory.THEME)).toEqual({
      dark,
      light,
    });
  });

  it('register, getPlugin, getPlugins', () => {
    class CircleNode {}
    class RectNode {}
    class Edge {}
    register(ExtensionCategory.NODE, 'circle-node', CircleNode as any);
    register(ExtensionCategory.NODE, 'rect-node', RectNode as any);
    register(ExtensionCategory.EDGE, 'line-edge', Edge as any);
    expect(getExtension(ExtensionCategory.NODE, 'circle-node')).toEqual(CircleNode);
    expect(getExtension(ExtensionCategory.NODE, 'rect-node')).toEqual(RectNode);
    expect(getExtension(ExtensionCategory.NODE, 'diamond-node')).toEqual(undefined);
    expect(getExtension(ExtensionCategory.EDGE, 'line-edge')).toEqual(Edge);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    register(ExtensionCategory.NODE, 'circle-node', CircleNode as any);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(0);

    consoleErrorSpy.mockRestore();

    expect(pick(getExtensions(ExtensionCategory.NODE), ['circle-node', 'rect-node'])).toEqual({
      'circle-node': CircleNode,
      'rect-node': RectNode,
    });
  });

  it('override', () => {
    class CircleNode {}
    class RectNode {}
    register(ExtensionCategory.NODE, 'circle-node', CircleNode as any);
    register(ExtensionCategory.NODE, 'circle-node', RectNode as any, true);
    expect(getExtension(ExtensionCategory.NODE, 'circle-node')).toEqual(RectNode);
  });

  it('register shape', () => {
    const shapes = getExtensions(ExtensionCategory.SHAPE);
    expect(Object.keys(shapes)).toEqual([
      'circle',
      'ellipse',
      'group',
      'html',
      'image',
      'line',
      'path',
      'polygon',
      'polyline',
      'rect',
      'text',
      'label',
      'badge',
    ]);

    register(ExtensionCategory.SHAPE, 'circle-shape', GCircle);

    expect(getExtension(ExtensionCategory.SHAPE, 'circle-shape')).toEqual(GCircle);
  });
});
