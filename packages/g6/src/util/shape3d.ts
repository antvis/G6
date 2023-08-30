import { DisplayObject, Group } from '@antv/g';
import {
  SphereGeometry,
  CubeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
} from '@antv/g-plugin-3d';
import { EdgeShapeMap } from '../types/edge';
import { NodeShapeMap } from '../types/node';
import { GShapeStyle, SHAPE_TYPE, SHAPE_TYPE_3D } from '../types/item';
import {
  LOCAL_BOUNDS_DIRTY_FLAG_KEY,
  createShape,
  isStyleAffectBBox,
} from './shape';

const GeometryTagMap = {
  sphere: SphereGeometry,
  cubic: CubeGeometry,
  plane: PlaneGeometry,
};

const GEOMETRY_SIZE = 10;

export const createShape3D = (
  type: SHAPE_TYPE_3D | SHAPE_TYPE,
  style: GShapeStyle,
  id: string,
  device: any,
) => {
  // It is not a 3d Shape but 2d.
  if (!GeometryTagMap[type]) {
    return createShape(type as SHAPE_TYPE, style, id);
  }

  // materialType: 'lambert' | 'phong' | 'basic', TODO: type
  const { materialType = 'lambert', ...otherStyles } = style as any;
  if (!device.GeometryCache) {
    device.GeometryCache = {};
  }

  // Share the same geometry & material between meshes.
  let cachedGeometry = device.GeometryCache[type];
  if (!cachedGeometry) {
    cachedGeometry = device.GeometryCache[type] = new GeometryTagMap[type](
      device,
      {
        radius: GEOMETRY_SIZE,
        latitudeBands: 32,
        longitudeBands: 32,
      },
    );
  }

  if (!device.MaterialCache) {
    device.MaterialCache = {};
  }
  if (!device.MaterialCache[materialType as string]) {
    switch (materialType) {
      case 'basic':
        device.MaterialCache[materialType as string] = new MeshBasicMaterial(
          device,
        );
        break;
      case 'phong':
        const materialProps = {
          shininess: 30,
        };
        device.MaterialCache[materialType as string] = new MeshPhongMaterial(
          device,
          materialProps,
        );
      case 'lambert':
      default: {
        device.MaterialCache[materialType as string] = new MeshLambertMaterial(
          device,
        );
        break;
      }
    }
  }

  const shape = new Mesh({
    style: {
      visibility: 'visible',
      strokeOpacity: 0,
      ...otherStyles,
      geometry: cachedGeometry,
      material: device.MaterialCache[materialType as string],
    },
    id,
  });

  // set origin for shape
  shape.setOrigin(0, 0, 0);

  // Scale the shape to the correct size.
  switch (type) {
    case 'cube':
      shape.scale([
        style.width / GEOMETRY_SIZE,
        style.height / GEOMETRY_SIZE,
        style.depth / GEOMETRY_SIZE,
      ]);
      break;
    case 'plane':
      shape.scale([style.width / GEOMETRY_SIZE, style.depth / GEOMETRY_SIZE]);
      break;
    case 'sphere':
    default: {
      const scaling =
        (((style as any).r || style.radius) as number) / GEOMETRY_SIZE;
      shape.scale(scaling);
    }
  }

  return shape;
};

export const upsertShape3D = (
  type: SHAPE_TYPE_3D | SHAPE_TYPE,
  id: string,
  style: GShapeStyle,
  shapeMap: { [shapeId: string]: DisplayObject },
  device: any,
): DisplayObject => {
  let shape = shapeMap[id];
  if (!shape) {
    // @ts-ignore
    shape = createShape3D(type, style, id, device);
    shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
  } else if (shape.nodeName !== type) {
    shape.remove();
    // @ts-ignore
    shape = createShape3D(type, style, id, device);
    shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
  } else {
    const updateStyles = {};
    const oldStyles = shape.attributes;
    Object.keys(style).forEach((key) => {
      if (oldStyles[key] !== style[key]) {
        updateStyles[key] = style[key];
        shape.style[key] = style[key];
      }
    });
    if (isStyleAffectBBox(type, updateStyles)) {
      shape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, true);
    }
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
  removeDiff = true,
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
