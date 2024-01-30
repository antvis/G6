import { circle, diamond, rect, simple, triangle, triangleRect, vee } from '../elements/shapes';

export const BUILT_IN_PLUGINS = {
  node: {},
  edge: {},
  combo: {},
  theme: {},
  layout: {},
  behavior: {},
  widget: {},
  animation: {},
  arrow: {
    triangle: triangle,
    circle: circle,
    diamond: diamond,
    vee: vee,
    rect: rect,
    triangleRect: triangleRect,
    simple: simple,
  },
};
