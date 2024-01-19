import { isString } from '@antv/util';
import { isArrayOverlap } from './array';

const TREE_BEHAVIORS = ['collapse-expand-tree'];
/**
 *
 * @param behaviors
 */
export function hasTreeBehaviors(behaviors: any[]) {
  if (!behaviors?.length) return false;
  const behaviorTypes = behaviors.map((behavior) => (isString(behavior) ? behavior : behavior.type)).filter(Boolean);
  return isArrayOverlap(TREE_BEHAVIORS, behaviorTypes);
}
