---
title: Behavior
order: 8
---

### Graph.getBehaviors()

Get behaviors options

```typescript
getBehaviors(): BehaviorOptions;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[]

- **Description:** 交互配置

</details>

### Graph.setBehaviors(behaviors)

Set behaviors

```typescript
setBehaviors(behaviors: BehaviorOptions | ((prev: BehaviorOptions) => BehaviorOptions)): void;
```

The set behavior will completely replace the original behavior. If you need to add behavior, you can use the following method:

```typescript
graph.setBehaviors((behaviors) => [...behaviors, { type: 'zoom-canvas' }]);
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

behaviors

</td><td>

(string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[] \| ((prev: (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[]) =&gt; (string \| CustomBehaviorOption \| ((this:Graph) =&gt;CustomBehaviorOption))[])

</td><td>

交互配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>

### Graph.updateBehavior(behavior)

Update specified behavior options

```typescript
updateBehavior(behavior: UpdateBehaviorOption): void;
```

If you want to update a behavior, you must specify the key field in the behavior options, for example:

```typescript
{
  behaviors: [{ type: 'zoom-canvas', key: 'zoom-canvas' }];
}

graph.updateBehavior({ key: 'zoom-canvas', enable: false });
```

<details><summary>View Parameters</summary>

<table><thead><tr><th>

Parameter

</th><th>

Type

</th><th>

Description

</th></tr></thead>
<tbody><tr><td>

behavior

</td><td>

UpdateBehaviorOption

</td><td>

交互配置

</td></tr>
</tbody></table>

**Returns**:

- **Type:** void

</details>
