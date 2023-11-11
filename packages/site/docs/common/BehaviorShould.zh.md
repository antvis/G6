<embed src="./BehaviorShouldBegin.zh.md"></embed>

## shouldUpdate

**类型**：

```ts
type shouldUpdate = (event: IG6GraphEvent) => boolean;
```

**默认值**：`() => true`

**是否必须**：false

**说明**：是否允许当前节点更新交互状态。返回 false 时，需要手动监听事件和更新状态

<embed src="./IG6GraphEvent.zh.md"></embed>
