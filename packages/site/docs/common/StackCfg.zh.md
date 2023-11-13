```ts
type StackCfg = {
  /** 历史栈允许存储的最大步数。*/
  stackSize?: number;
  /** 默认是否允许入栈。*/
  stackActive?: boolean;
  /** 需要排除入栈的 API 名称，此处配置的优先级最高。*/
  excludes?: string[];
  /** 需要入栈的 API 名称，此处配置的优先级最高。*/
  includes?: string[];
  /** 是否忽略所有的新增数据操作。*/
  ignoreAdd?: boolean;
  /** 是否忽略所有的删除数据操作。*/
  ignoreRemove?: boolean;
  /** 是否忽略所有的更新数据操作。*/
  ignoreUpdate?: boolean;
  /** 是否忽略所有的元素状态变更操作。*/
  ignoreStateChange?: boolean;
  /** 是否忽略所有的层级变更操作。*/
  ignoreLayerChange?: boolean;
  /** 是否忽略所有的渲染变更操作。*/
  ignoreDisplayChange?: boolean;
};
```