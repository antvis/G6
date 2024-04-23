import { groupBy } from '@antv/util';
import { ChangeType } from '../constants';
import type { DataAdded, DataChange, DataChanges, DataRemoved, DataUpdated, ID } from '../types';
import { idOf } from './id';

/**
 * <zh/> 对数据操作进行约简
 *
 * <en/> Reduce data changes
 * @param changes - <zh/> 数据操作 | <en/> data changes
 * @returns <zh/> 约简后的数据操作 | <en/> reduced data changes
 */
export function reduceDataChanges(changes: DataChange[]): DataChange[] {
  const results = {
    Added: new Map<ID, DataAdded>(),
    Updated: new Map<ID, DataUpdated>(),
    Removed: new Map<ID, DataRemoved>(),
  };

  changes.forEach((change) => {
    const { type, value } = change;
    const id = idOf(value);

    if (type === 'NodeAdded' || type === 'EdgeAdded' || type === 'ComboAdded') {
      results.Added.set(id, change);
    } else if (type === 'NodeUpdated' || type === 'EdgeUpdated' || type === 'ComboUpdated') {
      // 如果存在 Added，将当前操作置为 Added 操作
      // If there is an Added operation, set the current operation to Added
      if (results.Added.has(id)) {
        results.Added.set(id, { type: type.replace('Updated', 'Added'), value } as DataAdded);
      }
      // 如果存在 Updated，将当前操作置为 Updated 操作，但使用更早版本的 original
      // If there is an Updated operation, set the current operation to Updated, but use an earlier version of original
      else if (results.Updated.has(id)) {
        const { original } = results.Updated.get(id)!;
        results.Updated.set(id, { type, value, original } as DataUpdated);
      } else if (results.Removed.has(id)) {
        // 如果存在 Removed，不做任何操作
        // If there is a Removed operation, do nothing
      } else results.Updated.set(id, change);
    } else if (type === 'NodeRemoved' || type === 'EdgeRemoved' || type === 'ComboRemoved') {
      // 如果存在 Added 或者 Updated 的操作，删除 Removed 操作
      // If there is an Added or Updated operation, delete the Removed operation
      if (results.Added.has(id)) {
        results.Added.delete(id);
      } else if (results.Updated.has(id)) {
        results.Updated.delete(id);
        results.Removed.set(id, change);
      } else {
        results.Removed.set(id, change);
      }
    }
  });

  // 顺序并不重要
  // The order is not important
  return [
    ...Array.from(results.Added.values()),
    ...Array.from(results.Updated.values()),
    ...Array.from(results.Removed.values()),
  ];
}

/**
 * <zh/> 对数据操作进行分类
 *
 * <en/> Classify data changes
 * @param changes - <zh/> 数据操作 | <en/> data changes
 * @returns <zh/> 分类后的数据操作 | <en/> classified data changes
 */
export function groupByChangeType(changes: DataChange[]): DataChanges {
  const {
    NodeAdded = [],
    NodeUpdated = [],
    NodeRemoved = [],
    EdgeAdded = [],
    EdgeUpdated = [],
    EdgeRemoved = [],
    ComboAdded = [],
    ComboUpdated = [],
    ComboRemoved = [],
  } = groupBy(changes, (change) => change.type) as unknown as Record<`${ChangeType}`, DataChange[]>;

  return {
    add: {
      nodes: NodeAdded,
      edges: EdgeAdded,
      combos: ComboAdded,
    },
    update: {
      nodes: NodeUpdated,
      edges: EdgeUpdated,
      combos: ComboUpdated,
    },
    remove: {
      nodes: NodeRemoved,
      edges: EdgeRemoved,
      combos: ComboRemoved,
    },
  } as DataChanges;
}
