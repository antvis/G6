import type { BaseBehavior } from './base-behavior';
import type { DragCanvasOptions } from './drag-canvas';
import type { ScrollCanvasOptions } from './scroll-canvas';
import type { ZoomCanvasOptions } from './zoom-canvas';

export type BuiltInBehaviorOptions = DragCanvasOptions | ZoomCanvasOptions | ScrollCanvasOptions;
export type Behavior = BaseBehavior<any>;
