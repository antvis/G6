import { BehaviorRegistry } from "../types/behavior";
import Graph from '../runtime/graph';
import registery from '../stdlib';

/**
 * Extend graph class with custom libs (extendLibrary), and extendLibrary will be merged into useLib.
 * B1 is the Behavior lib from user, B2 is the Behavior lib of the graph to be extended(built-in graph)
 * TODO: more templates, and might be merged to be two templates for the whole extendLibrary
 * @param GraphClass graph class to be extended
 * @param extendLibrary custom libs to extend
 * @returns extended graph class
 */
export const extend = <B1 extends BehaviorRegistry, B2 extends BehaviorRegistry>(
  GraphClass: typeof Graph<B2>,
  extendLibrary: {
    behaviors?: B1,
  }
): typeof Graph<B1 & B2> => {
  // merged the extendLibrary to useLib for global usage
  Object.keys(extendLibrary).forEach(cat => {
    registery.useLib[cat] = Object.assign({}, registery.useLib[cat], extendLibrary[cat] || {});
  });
  // @ts-expect-error
  return GraphClass;
}