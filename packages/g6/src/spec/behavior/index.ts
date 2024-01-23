import type {
  ClickSelectOptions,
  CollapseExpandComboOptions,
  DragCanvasOptions,
  DragComboOptions,
  DragNodeOptions,
  ZoomCanvasOptions,
} from '../../plugin/behavior';

export type BehaviorOptions = Abbr<BuiltInBehavior | CustomBehavior>[];

type CustomBehavior = STDBehavior;

export type STDBehavior = {
  type: string;
  [key: string]: any;
};

type BuiltInBehavior =
  | DragCanvasBehavior
  | ZoomCanvasBehavior
  | DragNodeBehavior
  | DragComboBehavior
  | CollapseExpandComboBehavior
  | ClickSelectBehavior;

interface DragCanvasBehavior extends DragCanvasOptions {
  type: 'drag-canvas';
}

interface ZoomCanvasBehavior extends ZoomCanvasOptions {
  type: 'zoom-canvas';
}

interface DragNodeBehavior extends DragNodeOptions {
  type: 'drag-node';
}

interface DragComboBehavior extends DragComboOptions {
  type: 'drag-combo';
}

interface CollapseExpandComboBehavior extends CollapseExpandComboOptions {
  type: 'collapse-expand-combo';
}

interface ClickSelectBehavior extends ClickSelectOptions {
  type: 'click-select';
}

type Abbr<R extends STDBehavior> = (R & { key?: string }) | R['type'];
