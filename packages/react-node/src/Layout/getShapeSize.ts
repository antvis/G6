import { GPath } from '@/ReactNode/Shape/common';

type SizeOfShape = {
  type: string;
  width: number;
  height: number;
};

const XYPath = ['L', 'M', 'C', 'S', 'Q', 'T', 'V'];
const xyPath = XYPath.map((e) => e.toLocaleLowerCase());

const convertPathToPoints = (path: GPath[]) => {
  const points: [number, number][] = [];
  path.forEach(function (seg) {
    const [command, ...numbers] = seg;
    let [lastPoint] = points.slice(-1);
    if (!lastPoint) {
      lastPoint = [0, 0];
    }
    if (XYPath.includes(command)) {
      const [x, y] = numbers.slice(-2);
      points.push([x, y]);
    } else if (xyPath.includes(command)) {
      const [x, y] = numbers.slice(-2);
      points.push([x + lastPoint[0], y + lastPoint[1]]);
    } else if (command === 'H') {
      const [x] = numbers.slice(-1);
      points.push([x, lastPoint[0]]);
    } else if (command === 'h') {
      const [x] = numbers.slice(-1);
      points.push([x + lastPoint[0], lastPoint[1]]);
    } else if (command === 'V') {
      const [y] = numbers.slice(-1);
      points.push([lastPoint[0], y]);
    } else if (command === 'v') {
      const [y] = numbers.slice(-1);
      points.push([lastPoint[0], lastPoint[1] + y]);
    }
  });
  return points;
};

const getPointsSize = (points: [number, number][]) => {
  let [xmax, ymax, xmin, ymin] = [0, 0, 0, 0];

  points.forEach(([x, y]) => {
    if (x > xmax) {
      xmax = x;
    }
    if (y > ymax) {
      ymax = y;
    }
    if (x < xmin) {
      xmin = x;
    }
    if (y < ymin) {
      ymin = y;
    }
  });

  return [xmax - xmin, ymax - ymin];
};

const canvasRef: {
  context?: CanvasRenderingContext2D;
  timeoutSig?: ReturnType<typeof setTimeout>;
  canvas?: HTMLCanvasElement;
} = {};

const getCanvasContext = () => {
  let context: CanvasRenderingContext2D | null;
  if (canvasRef.context) {
    context = canvasRef.context;
  } else {
    const canvas = document?.createElement('canvas');
    if (!canvas) {
      return null;
    }
    context = canvas.getContext('2d');
    if (context) {
      canvasRef.canvas = canvas;
      canvasRef.context = context;
    }
  }
  return context;
};

const getTextSize = (
  text: string,
  attrs: {
    fontSize?: number;
    fontFamily?: string;
    lineHeight?: number;
    [key: string]: any;
  },
) => {
  const textArr = text.split('\n');
  const height =
    (attrs.fontSize || 12) * textArr.length * (attrs.lineHeight || 1);
  // Try to get canvas to measure text
  const context = getCanvasContext();
  if (context) {
    context.font = `${attrs.fontWeight || 'normal'} ${attrs.fontSize || 12}px ${
      attrs.fontFamily || ''
    }`;
    let width = 0;
    for (let i = 0; i < textArr.length; i += 1) {
      width = Math.max(width, context.measureText(textArr[i]).width);
    }
    return [(width * (attrs.fontSize || 12)) / 10, height];
  }
  // fallback solution
  return [
    Math.max.apply(
      Math,
      textArr.map((str) => str.length * (attrs.fontSize || 12)),
    ),
    height,
  ];
};

const getSizeOfShape = (
  type: string,
  attrs: Partial<{
    path: GPath[];
    width: number | string;
    height: number | string;
    r: number;
    rx: number;
    ry: number;
    points: [number, number][];
    text: string;
  }>,
): SizeOfShape => {
  switch (type) {
    case 'rect':
    case 'image':
      return {
        type,
        width: Number(attrs.width) || 0,
        height: Number(attrs.height) || 0,
      };
    case 'circle':
    case 'marker':
      return {
        type,
        width: (attrs.r || 0) * 2,
        height: (attrs.r || 0) * 2,
      };
    case 'ellipse':
      return {
        type,
        width: (attrs.rx || 0) * 2,
        height: (attrs.ry || 0) * 2,
      };
    case 'path':
      const pathSize = getPointsSize(convertPathToPoints(attrs.path || []));
      return {
        type,
        width: pathSize[0],
        height: pathSize[1],
      };
    case 'polygon':
      const polygonSize = getPointsSize(attrs.points || []);
      return {
        type,
        width: polygonSize[0],
        height: polygonSize[1],
      };
    case 'text':
      const textSize = getTextSize(attrs.text || '', attrs);
      return {
        type,
        width: textSize[0],
        height: textSize[1],
      };
    default:
      return {
        type,
        width: 0,
        height: 0,
      };
  }
};

export default getSizeOfShape;
