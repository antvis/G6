import { IG6GraphEvent } from './event';
import { IGraph } from './graph';

export interface BehaviorOption {
  key?: string;
}
/**
 * Base behavior.
 * TODO: Support spec mode.
 */
export abstract class Behavior {
  graph: IGraph;
  options: any;
  constructor(options: any) {
    this.options = options;
  }
  abstract getEvents(): {
    [eventName: string]: (event: IG6GraphEvent) => void;
  };
  updateConfig = (options: any) => {
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
  [type: string]: typeof Behavior;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example BehaviorOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type BehaviorOptionsOf<B extends BehaviorRegistry = {}> =
  | Extract<keyof B, string>
  | {
      [K in keyof B]: B[K] extends { new (options: infer O): any }
        ? { type: K; key: string } & O
        : { type: K; key: string };
    }[Extract<keyof B, string>];

/**
 * TODO: interaction specification
 */
export interface BehaviorSpecification {}
