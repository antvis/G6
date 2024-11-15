import type { IRenderer } from '@antv/g';
import { Canvas as GCanvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { Canvas } from '../../runtime/canvas';
import type { Placement } from '../../types';
import { parsePlacement } from '../../utils/placement';
import { createPluginContainer } from './dom';

interface Options {
  /** <zh/> 插件宽度 | <en/> Plugin width */
  width: number;
  /** <zh/> 插件高度 | <en/> Plugin height */
  height: number;
  /** <zh/> 渲染器 | <en/> Render */
  renderer?: IRenderer;
  /** <zh/> 插件放置位置 | <en/> Plugin placement */
  placement: Placement;
  /** <zh/> 插件类名 | <en/> Plugin class name */
  className: string;
  /** <zh/> 指定插件放置容器 | <en/> Specify the plugin placement container */
  container?: string | HTMLElement;
  /** <zh/> 容器样式 | <en/> Container style */
  containerStyle?: Partial<CSSStyleDeclaration>;
  /** <zh/> G6 画布 | <en/> G6 canvas */
  graphCanvas: Canvas;
}

/**
 * <zh/> 创建插件画布
 *
 * <en/> Create a plugin canvas
 * @param options - <zh/> 配置项 | <en/> options
 * @returns <zh/> [容器, 画布] | <en/> [container, canvas]
 */
export function createPluginCanvas(options: Options): [HTMLElement, GCanvas] {
  const { width, height, renderer, containerStyle } = options;
  const $container = getContainer(options);
  const [x, y] = computePosition(options);

  Object.assign($container.style, {
    position: 'absolute',
    left: x + 'px',
    top: y + 'px',
    width: width + 'px',
    height: height + 'px',
    ...containerStyle,
  });

  const canvas = new GCanvas({
    width,
    height,
    container: $container,
    renderer: renderer || new Renderer(),
  });

  return [$container, canvas];
}

/**
 * <zh/> 获取容器
 *
 * <en/> Get container
 * @param options - <zh/> 配置项 | <en/> options
 * @returns <zh/> 容器 | <en/> container
 */
function getContainer(options: Options) {
  const { container, className, graphCanvas } = options;
  if (container) {
    return typeof container === 'string' ? document.getElementById(container)! : container;
  }

  const $container = createPluginContainer(className, false);
  graphCanvas.getContainer()?.appendChild($container);
  return $container;
}

/**
 * <zh/> 计算容器位置
 *
 * <en/> Compute the position of the container
 * @param options - <zh/> 配置项 | <en/> options
 * @returns <zh/> 位置 | <en/> position
 */
function computePosition(options: Options) {
  const { width, height, placement, graphCanvas } = options;
  const [W, H] = graphCanvas.getSize();
  const [xRatio, yRatio] = parsePlacement(placement);
  return [xRatio * (W - width), yRatio * (H - height)];
}
