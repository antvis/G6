import { uniqueId } from "@antv/util";

export interface BehaviorOption {
  key?: string;
}
/**
 * Base behavior.
 * Two implementing ways: getSpec or getEvents
 */
export abstract class Behavior {
  protected key: string;
  protected options: BehaviorOption = {};
  constructor(options: BehaviorOption) {
    this.key = options.key || uniqueId();
    this.options = options;
  };
  public getKey = () => this.key;
  abstract getSpec(): BehaviorSpecification;
  abstract getEvents(): {
    [eventName: string]: string
  };
  public updateConfig = (options: BehaviorOption) => {
    this.options = Object.assign(this.options, options);
  }
  abstract destroy(): void;
}

/** Behavior regisry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface BehaviorRegistry {
  [type: string]: typeof Behavior;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example BehaviorOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type BehaviorOptionsOf<B extends BehaviorRegistry = {}> = Extract<keyof B, string> | {
  [K in keyof B]: B[K] extends { new(options: infer O): any } ? O & { type: K, key: string } : never;
}[Extract<keyof B, string>];

export type BehaviorObjectOptionsOf<B extends BehaviorRegistry = {}> = {
  [K in keyof B]: B[K] extends { new(options: infer O): any } ? O & { type: K, key: string } : never;
}[Extract<keyof B, string>];

/**
 * TODO: interaction specification
 */
export interface BehaviorSpecification { }