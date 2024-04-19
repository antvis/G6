import { Canvas, CanvasConfig } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragNDropPlugin } from '@antv/g-plugin-dragndrop';

export type Datum = Record<string, any>;

/**
 * <zh> 创建 canvas 对象.
 *
 * <en> Create canvas.
 * @param container HTMLElement
 * @param width number
 * @param height number
 * @param pixelRatio number
 * @param canvasConfig CanvasConfig
 * @returns Canvas
 */
export function createCanvas(
  container: HTMLElement,
  width: number,
  height: number,
  pixelRatio?: number,
  canvasConfig: Partial<CanvasConfig> = {},
): Canvas {
  const renderer = new CanvasRenderer();

  renderer.registerPlugin(
    new DragNDropPlugin({
      isDocumentDraggable: true,
      isDocumentDroppable: true,
      dragstartDistanceThreshold: 10,
      dragstartTimeThreshold: 100,
    }),
  );

  return new Canvas({
    container,
    width,
    height,
    devicePixelRatio: pixelRatio,
    renderer,
    supportsMutipleCanvasesInOneContainer: true,
    ...canvasConfig,
  });
}

/**
 * <zh> 水平方向的位置转化为 timebar 外部 dom 对应样式.
 *
 * <en> The horizontal position is converted to a timebar external dom corresponding style.
 * @param position 'bottom' | 'top'
 * @param bound [number, number]
 * @returns string
 */
export function parseLevelPositionToStyle(position: 'bottom' | 'top', bound: [number, number]) {
  let style = 'position:relative;';

  if (position === 'top') {
    style += `top:0;`;
  } else {
    style += `bottom:-${bound[1]}px;`;
  }

  return style;
}

/**
 *
 * @param datum
 * @param optionsKeys
 * @param defaultValue
 */
export function tryToGet<T = any>(datum: Datum, optionsKeys: string[], defaultValue?: T) {
  for (let i = 0; i < optionsKeys.length; i++) {
    const key = optionsKeys[i];
    const val = datum?.[key] as T;
    if (val) return val;
  }
  return defaultValue;
}
