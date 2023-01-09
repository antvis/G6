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
export interface BehaviorRegistry {
  [name: string]: Behavior;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example BehaviorOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type BehaviorOptionsOf<B extends BehaviorRegistry> = keyof B | {
  [K in keyof B]: B[K] extends { new(options: infer O): any } ? O & { type: K } : never;
}[keyof B];

/**
 * TODO: interaction specification
 */
export interface BehaviorSpecification { }