import { Circle, DisplayObject, Ellipse, Group, IElement, Line, Polygon, Polyline, Rect } from "@antv/g";

const shapeMap = {
  'circle': Circle,
  'rect': Rect,
  'ellipse': Ellipse,
  'polygon': Polygon,
  'line': Line,
  'polyline': Polyline
}

export const addShape = (
  type: string,
  style: { [shapeAttr: string]: unknown },
  id: string,
  group: Group
): IElement => {
  let shape = group.getElementById(id);
  if (!shape) {
    const ShapeClass = shapeMap[type];
    shape = new ShapeClass({ style, id, autoUpdate: true });
    group.appendChild(shape);
  } else {
    Object.keys(style).forEach(key => {
      shape.style[key] = style[key];
    });
  }
  return shape;
}