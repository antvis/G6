import type { DragCanvasOptions } from './drag-canvas';
import type { ZoomCanvasOptions } from './zoom-canvas';

export { BaseBehavior } from './base-behavior';
export { DragCanvas } from './drag-canvas';
export { ZoomCanvas } from './zoom-canvas';

export type { BaseBehaviorOptions } from './base-behavior';
export type { DragCanvasOptions, ZoomCanvasOptions };
export type BuiltInBehaviorOptions = DragCanvasOptions | ZoomCanvasOptions;
