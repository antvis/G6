---
title: 事件监听
order: 11
---

### Graph.off()

移除全部事件监听

```typescript
off(): this;
```

<details><summary>相关参数</summary>

**返回值**：

- **类型：**this

- **描述：**Graph 实例

</details>

### <Badge type="warning">Overload</Badge> Graph.off(eventName)

移除指定事件的全部监听

```typescript
off(eventName: string): this;
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

eventName

</td><td>

string

</td><td>

事件名称

</td></tr>
</tbody></table>

**返回值**：

- **类型：**this

- **描述：**Graph 实例

</details>

### <Badge type="warning">Overload</Badge> Graph.off(eventName, callback)

移除事件监听

```typescript
off(eventName: string, callback: (...args: any[]) => void): this;
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

**返回值**：

- **类型：**this

- **描述：**Graph 实例

</details>

### Graph.on(eventName, callback, once)

监听事件

```typescript
on<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void, once?: boolean): this;
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

**返回值**：

- **类型：**this

- **描述：**Graph 实例

</details>

### Graph.once(eventName, callback)

一次性监听事件

```typescript
once<T extends IEvent = IEvent>(eventName: string, callback: (event: T) => void): this;
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

**返回值**：

- **类型：**this

- **描述：**Graph 实例

</details>
