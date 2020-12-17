// @ts-ignore
const { G2 } = require('@antv/g2plot/dist/g2plot.min.js');

type Point = { x: number; y: number };

G2.registerShape('interval', 'waterdrop', {
  draw(shapeInfo: any, container: any) {
    const getDistance = (p1: Point, p2: Point) => {
      const pow = (x: number) => x * x;
      return Math.sqrt(pow(p1.x - p2.x) + pow(p1.y - p2.y));
    };
    const center = (this as any).coordinate.getCenter();
    const points = shapeInfo.points.map((p: Point) =>
      (this as any).parsePoint(p),
    );
    const distance = getDistance(points[1], points[2]);
    const strokeWidth = shapeInfo.style?.lineWidth;
    const fillOpacity = shapeInfo.style?.fillOpacity || 0.75;
    const inleft = points[0].x < points[1].x;
    const inbottom = points[0].y < points[1].y;
    let startColor = shapeInfo.color;
    let endColor = '#fff';
    if (inleft) {
      startColor = '#fff';
      endColor = shapeInfo.color;
    }

    const offsetX = (strokeWidth / 2) * (inleft ? -1 : 1);
    const offsetY = (strokeWidth / 2) * (inbottom ? 1 : -1);
    const waterdrop = container.addShape({
      type: 'path',
      attrs: {
        path: [
          ['M', points[2].x + offsetX, points[2].y + offsetY],
          ['L', center.x, center.y],
          ['L', points[1].x + offsetX, points[1].y + offsetY],
          [
            'A',
            distance / 2,
            distance / 2,
            0,
            1,
            1,
            points[2].x + offsetX,
            points[2].y + offsetY,
          ],
          ['L', points[2].x + offsetX, points[2].y + offsetY],
          ['Z'],
        ],
        fill: `l(0): 0:${startColor} 1:${endColor}`,
        stroke: shapeInfo.style?.stroke,
        lineWidth: strokeWidth,
        fillOpacity,
      },
    });
    waterdrop.animate(
      {
        strokeOpacity: 0.8,
        fillOpacity: fillOpacity * 0.75,
      },
      {
        duration: 1500,
        easing: 'easeLinear',
        repeat: true,
      },
    );
    return container;
  },
});
