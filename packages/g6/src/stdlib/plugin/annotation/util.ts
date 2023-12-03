import { PathArray } from '@antv/util';
import { getControlPoint } from '../../../util/path';

export const getPathItem2Card = (item, cardBBox, graph, annotationCanvas) => {
  let itemLinkPoints;
  const itemType = item.getType();
  if (itemType === 'edge') {
    itemLinkPoints = [item.shapeMap.keyShape.getPoint(0.5)]
  } else {
    const bbox = item.shapeMap.keyShape.getBBox();
    const minX = bbox.left,
      minY = bbox.top,
      maxX = bbox.right,
      maxY = bbox.bottom;
    itemLinkPoints = {
      left: { x: minX, y: (minY + maxY) / 2 },
      right: { x: maxX, y: (minY + maxY) / 2 },
      top: { x: (minX + maxX) / 2, y: minY },
      bottom: { x: (minX + maxX) / 2, y: maxY },
    };
  }

  // 由 graph 所在 canvas 转换为 Client 坐标系，然后再由 annotation 所在 canvas 转换为绘制坐标系
  Object.keys(itemLinkPoints).forEach((key) => {
    const { x, y } = itemLinkPoints[key];
    const clientPos = graph.canvas.viewport2Client({ x, y });
    itemLinkPoints[key] = annotationCanvas.client2Viewport({
      x: clientPos.x,
      y: clientPos.y,
    });
  });

  const {
    top: cardTop = 0,
    left: cardLeft = 0,
    right: cardRight = 0,
    bottom: cardBottom = 0,
  } = cardBBox;
  const cardLinkPoints = {
    left: annotationCanvas.client2Viewport({
      x: cardLeft,
      y: (cardTop + cardBottom) / 2,
    }),
    right: annotationCanvas.client2Viewport({
      x: cardRight,
      y: (cardTop + cardBottom) / 2,
    }),
    top: annotationCanvas.client2Viewport({
      x: (cardLeft + cardRight) / 2,
      y: cardTop,
    }),
    bottom: annotationCanvas.client2Viewport({
      x: (cardLeft + cardRight) / 2,
      y: cardBottom,
    }),
  };
  return getPath(itemLinkPoints, cardLinkPoints) as PathArray;
};

const getPath = (startPoints, endPoints) => {
  let startPoint,
    endPoint,
    posKeys,
    distance = Infinity;
  Object.keys(startPoints).forEach((skey) => {
    const spos = startPoints[skey];
    Object.keys(endPoints).forEach((ekey) => {
      const epos = endPoints[ekey];
      const xdist = spos.x - epos.x;
      const ydist = spos.y - epos.y;
      const dist = xdist * xdist + ydist * ydist;
      if (distance > dist) {
        distance = dist;
        startPoint = spos;
        endPoint = epos;
        posKeys = [skey, ekey];
      }
    });
  });
  const curveOffset = 20;
  const controlPoint = getControlPoint(startPoint, endPoint, 0.5, curveOffset);
  return [
    ['M', startPoint.x, startPoint.y],
    ['Q', controlPoint.x, controlPoint.y, endPoint.x, endPoint.y],
    // ['L', endPoint.x, endPoint.y],
  ];
};

export const px2Num = (px) => Number(px.replace(/\s+|px/gi, '')) || 0;
