import { IG6GraphEvent } from './event';
import { Graph } from './graph';

export abstract class Behavior<O extends Record<string, any> = Record<string, any>> {
  static type: string;
  graph: Graph;
  options: O;
  constructor(options: O) {
    this.options = options;
  }
  abstract getEvents(): {
    [eventName: string]: (event: IG6GraphEvent) => void;
  };
  updateConfig = (options: O) => {
    this.options = Object.assign(this.options, options);
  };
  destroy() {}
}

/**
 * Behavior registry table.
 * @example
 * { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface BehaviorRegistry {
  [type: string]: Behavior<any>;
}
