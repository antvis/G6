import { BehaviorOptionsOf, BehaviorRegistry } from 'types/behavior';
import { isArrayOverlap } from './array';
import { isString } from '@antv/util';

const TREE_BEHAVIORS = ['collapse-expand-tree'];
export const hasTreeBehaviors = (
  behaviors: BehaviorOptionsOf<BehaviorRegistry>[],
) => {
  if (!behaviors?.length) return false;
  const behaviorTypes = behaviors
    .map((behavior) => (isString(behavior) ? behavior : behavior.type))
    .filter(Boolean);
  return isArrayOverlap(TREE_BEHAVIORS, behaviorTypes);
};
