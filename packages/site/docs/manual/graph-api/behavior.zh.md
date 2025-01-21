---
title: 交互
order: 8
---

### Graph.getBehaviors()

获取交互配置

```typescript
getBehaviors(): BehaviorOptions;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：** (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[]

- **描述：** 交互配置

</details>

### Graph.setBehaviors(behaviors)

设置交互

```typescript
setBehaviors(behaviors: BehaviorOptions | ((prev: BehaviorOptions) => BehaviorOptions)): void;
```

设置的交互会全量替换原有的交互，如果需要新增交互可以使用如下方式：

```typescript
graph.setBehaviors((behaviors) => [...behaviors, { type: 'zoom-canvas' }]);
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

behaviors

</td><td>

(string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[] \| ((prev: (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[]) =&gt; (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[])

</td><td>

交互配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>

### Graph.updateBehavior(behavior)

更新指定的交互配置

```typescript
updateBehavior(behavior: UpdateBehaviorOption): void;
```

如果要更新一个交互，那么必须在交互配置中指定 key 字段，例如：

```typescript
{
  behaviors: [{ type: 'zoom-canvas', key: 'zoom-canvas' }];
}

graph.updateBehavior({ key: 'zoom-canvas', enable: false });
```

<details><summary>相关参数</summary>

<table><thead><tr><th>

参数

</th><th>

类型

</th><th>

描述

</th></tr></thead>
<tbody><tr><td>

behavior

</td><td>

UpdateBehaviorOption

</td><td>

交互配置

</td></tr>
</tbody></table>

**返回值**：

- **类型：** void

</details>
