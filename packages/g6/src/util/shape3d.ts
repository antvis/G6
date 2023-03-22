import {
  DisplayObject,
  Group,
} from '@antv/g';
import {
  SphereGeometry,
  CubeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
} from '@antv/g-plugin-3d';
import { EdgeShapeMap } from '../types/edge';
import { NodeShapeMap } from '../types/node';

const GeometryTagMap = {
  sphere: SphereGeometry,
  cubic: CubeGeometry,
};

export const createShape3D = (type: string, style: { [shapeAttr: string]: unknown }, id: string, device: any) => {
  const GeometryClass = GeometryTagMap[type];
  const geometry = new GeometryClass(device, {
    radius: style.r || style.radius || 20,
    latitudeBands: 32,
    longitudeBands: 32,
  });
  const basicMaterial = new MeshPhongMaterial(device);
  // const basicMaterial = new MeshBasicMaterial(device);

  const shape = new Mesh({
    style: {
      ...style,
      geometry,
      material: basicMaterial,
    },
    id,
    autoUpdate: true
  });

  console.log('create3d', style, device, geometry, shape);
  return shape;
};

export const upsertShape3D = (
  type: string,
  id: string,
  style: { [shapeAttr: string]: unknown },
  shapeMap: { [shapeId: string]: DisplayObject },
  device: any,
): DisplayObject => {
  let shape = shapeMap[id];
  if (!shape) {
    shape = createShape3D(type, style, id, device);
  } else if (shape.nodeName !== type) {
    shape.remove();
    shape = createShape3D(type, style, id, device);
  } else {
    Object.keys(style).forEach((key) => {
      shape.style[key] = style[key];
    });
  }
  shapeMap[id] = shape;
  return shape;
};

/**
 * Update shapes in the intersaction of prevShapeMap and newShapeMap;
 * Remove shapes in the prevShapeMap - newShapeMap (if removeDiff is true);
 * Add shapes in the newShapeMap - prevShapeMap;
 * @param prevShapeMap previous shape map
 * @param newShapeMap new shape map
 * @param group container group
 * @returns merged shape map
 */
export const updateShapes3D = (
  prevShapeMap: { [id: string]: DisplayObject },
  newShapeMap: { [id: string]: DisplayObject },
  group: Group,
  removeDiff: boolean = true,
  shouldUpdate: (id: string) => boolean = () => true,
): NodeShapeMap | EdgeShapeMap => {
  const tolalMap = {
    ...prevShapeMap,
    ...newShapeMap,
  };
  const finalShapeMap = {
    ...prevShapeMap,
  };
  Object.keys(tolalMap).forEach((id) => {
    const prevShape = prevShapeMap[id];
    const newShape = newShapeMap[id];
    if (newShape && !shouldUpdate(id)) return;
    if (prevShape && newShape) {
      // update intersaction
      finalShapeMap[id] = newShape;
      if (prevShape !== newShape) {
        prevShape.remove();
      }
      group.appendChild(newShape);
    } else if (!prevShape && newShape) {
      // add newShapeMap - prevShapeMap
      finalShapeMap[id] = newShape;
      group.appendChild(newShape);
    } else if (prevShape && !newShape && removeDiff) {
      // remove prevShapeMap - newShapeMap
      delete finalShapeMap[id];
      prevShape.remove();
    }
  });
  return finalShapeMap as NodeShapeMap;
};
