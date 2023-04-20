import { Behavior } from '../../types/behavior';

/**
 * TODO: implement drag-canvas behavior
 */
interface DragCanvasOptions {
  key?: string;
  assistKey?: 'ctrl' | 'shift';
}
export default class DragCanvas extends Behavior {
  constructor(options: DragCanvasOptions) {
    super(options);
  }

  getEvents() {
    return {};
  }
}
