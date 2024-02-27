import type { BaseBehavior } from './base-behavior';
import type { DragCanvasOptions } from './drag-canvas';
import type { ZoomCanvasOptions } from './zoom-canvas';

export type BuiltInBehaviorOptions = DragCanvasOptions | ZoomCanvasOptions;
export type Behavior = BaseBehavior<any>;
