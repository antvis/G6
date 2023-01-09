import { BehaviorRegistry } from "../types/behavior";
import Graph from '../runtime/graph';

export const extend = <B extends BehaviorRegistry>(
  G6Class: typeof Graph,
  extendObject: {}
): typeof Graph<B> => {
  return G6Class;
}