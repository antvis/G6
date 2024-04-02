import { isObject } from '@antv/util';
import type { GraphData } from '../../spec';
import type { DataChange, DataChanges, ElementDatum } from '../../types';
import { inferDefaultValue } from '../../utils/animation';
import { groupByChangeType, reduceDataChanges } from '../../utils/change';

export type Command = {
  current: CommandData;
  original: CommandData;
  animation: boolean;
};

export type CommandData = {
  add: GraphData;
  update: GraphData;
  remove: GraphData;
};

/**
 * <zh/> 对齐两个对象的字段。若目标对象缺少字段，则会添加默认值。
 *
 * <en/> Align the fields of two objects. If the target object lacks fields, default values will be added.
 * @param refObject - <zh/> 参考对象 ｜ <en/> Reference object
 * @param targetObject - <zh/> 目标对象 ｜ <en/> Target object
 */
export function alignFields(refObject: Record<string, any>, targetObject: Record<string, any>) {
  for (const key in refObject) {
    if (isObject(refObject[key]) && !Array.isArray(refObject[key]) && refObject[key] !== null) {
      if (!targetObject[key]) targetObject[key] = {};
      alignFields(refObject[key], targetObject[key]);
    } else if (!targetObject[key]) {
      targetObject[key] = inferDefaultValue(key);
    }
  }
}

/**
 * <zh/> 解析数据变更为历史记录命令
 *
 * <en/> Parse data changes into history commands
 * @param changes - <zh/> 数据变更 ｜ <en/> Data changes
 * @param animation - <zh/> 是否开启动画 ｜ <en/> Whether to enable animation
 * @returns <zh/> 历史记录命令 ｜ <en/> History command
 */
export function parseCommand(changes: DataChange[], animation = false): Command {
  const cmd = {
    animation,
    current: { add: [], update: [], remove: [] },
    original: { add: [], update: [], remove: [] },
  } as Command;

  const { add, update, remove } = groupByChangeType(reduceDataChanges(changes));

  (['nodes', 'edges', 'combos'] as const).forEach((category) => {
    if (update[category]) {
      update[category].forEach((item: DataChanges['update'][typeof category][number]) => {
        const newValue = { ...item.value };
        const newOriginal = { ...item.original };
        alignFields(newValue, newOriginal);
        cmd.current.update[category] ||= [];
        (cmd.current.update[category] as ElementDatum[]).push(newValue);
        cmd.original.update[category] ||= [];
        (cmd.original.update[category] as ElementDatum[]).push(newOriginal);
      });
    }

    if (add[category]) {
      add[category].forEach((item: DataChanges['add'][typeof category][number]) => {
        const newValue = { ...item.value };
        cmd.current.add[category] ||= [];
        (cmd.current.add[category] as ElementDatum[]).push(newValue);
        cmd.original.remove[category] ||= [];
        (cmd.original.remove[category] as ElementDatum[]).push(newValue);
      });
    }

    if (remove[category]) {
      remove[category].forEach((item: DataChanges['remove'][typeof category][number]) => {
        const newValue = { ...item.value };
        cmd.current.remove[category] ||= [];
        (cmd.current.remove[category] as ElementDatum[]).push(newValue);
        cmd.original.add[category] ||= [];
        (cmd.original.add[category] as ElementDatum[]).push(newValue);
      });
    }
  });

  return cmd;
}
