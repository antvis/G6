---
title: Event Listener
order: 11
---

### Graph.off()

Remove all event listeners

```typescript
off(): this;
```

<details><summary>View Parameters</summary>

**Returns**:

- **Type:** this

- **Description:** Graph 实例

</details>

### <Badge type="warning">Overload</Badge> Graph.off(eventName)

Remove all listeners for the specified event

```typescript
off(eventName: string): this;
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

eventName

</td><td>

string

</td><td>

事件名称

</td></tr>
</tbody></table>

**Returns**:

- **Type:** this

- **Description:** Graph 实例

</details>

### <Badge type="warning">Overload</Badge> Graph.off(eventName, callback)

Remove event listener

```typescript
off(eventName: string, callback: (...args: any[]) => void): this;
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

eventName

</td><td>

string

</td><td>

事件名称

</td></tr>
<tr><td>

callback

</td><td>

(...args: any[]) =&gt; void

</td><td>

回调函数

</td></tr>
</tbody></table>

**Returns**:

- **Type:** this

- **Description:** Graph 实例

</details>

### Graph.on(eventName, callback, once)

Listen to events

```typescript
on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void, once?: boolean): this;
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

eventName

</td><td>

string

</td><td>

事件名称

</td></tr>
<tr><td>

callback

</td><td>

(event: T) =&gt; void

</td><td>

回调函数

</td></tr>
<tr><td>

once

</td><td>

boolean

</td><td>

是否只监听一次

</td></tr>
</tbody></table>

**Returns**:

- **Type:** this

- **Description:** Graph 实例

</details>

### Graph.once(eventName, callback)

Listen to events once

```typescript
once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void): this;
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

eventName

</td><td>

string

</td><td>

事件名称

</td></tr>
<tr><td>

callback

</td><td>

(event: T) =&gt; void

</td><td>

回调函数

</td></tr>
</tbody></table>

**Returns**:

- **Type:** this

- **Description:** Graph 实例

</details>
