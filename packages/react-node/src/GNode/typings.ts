import type { Renderer as CanvasRenderer } from '@antv/g-canvas';
import type { Renderer as SVGRenderer } from '@antv/g-svg';
import type { Renderer as WebGLRenderer } from '@antv/g-webgl';

export type Renderer = CanvasRenderer | SVGRenderer | WebGLRenderer;
