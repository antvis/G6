/**
 * Base behavior.
 * Two implementing ways: getSpec or getEvents
 */
abstract class Behavior {
  constructor() { };
  getSpec: () => BehaviorSpecification;
  getEvents: () => {
    [eventName: string]: string
  };
  destroy: () => void;
}

/** Behavior regisry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export type BehaviorRegistry = Record<string, Behavior>;
// {
//   [name: string]: Behavior;
// }

/**
 * Type gymnastics, input registry table, output configure type.
 * @example BehaviorOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type BehaviorOptionsOf<B extends BehaviorRegistry = {}> = Extract<keyof B, string> | {
  [K in keyof B]: B[K] extends { new(options: infer O): any } ? O & { type: K } : never;
}[Extract<keyof B, string>];

/**
 * TODO: interaction specification
 */
export interface BehaviorSpecification { }