---
title: API
---
#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- TB —— 根节点在上，往下布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833657395-7b291d7b-5408-41fa-bfb6-533ef39250ad.png#align=left&display=inline&height=59&name=image.png&originHeight=744&originWidth=1786&search=&size=397159&status=done&width=141)

- BT —— 根节点在下，往上布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833676794-31f862f3-8cb5-412e-81d4-2ac246e37c0d.png#align=left&display=inline&height=60&name=image.png&originHeight=762&originWidth=1790&search=&size=390312&status=done&width=140)

- LR —— 根节点在左，往右布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833574730-5d76d7a2-0e82-4ef7-a7d9-a45efd5b6b30.png#align=left&display=inline&height=119&name=image.png&originHeight=906&originWidth=518&search=&size=164555&status=done&width=68)

- RL —— 根节点在右，往左布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833593889-e98c6f6d-0c38-4408-a4c0-ba83d0bbba74.png#align=left&display=inline&height=115&name=image.png&originHeight=932&originWidth=454&search=&size=154391&status=done&width=56)

- H —— 根节点在中间，水平对称布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833726277-822e5104-2189-4fe4-bcdc-7b43d183d541.png#align=left&display=inline&height=110&name=image.png&originHeight=906&originWidth=824&search=&size=226469&status=done&width=100)

- V —— 根节点在中间，垂直对称布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833702068-8f409559-1765-4154-bd4d-bb782de8cd23.png#align=left&display=inline&height=92&name=image.png&originHeight=924&originWidth=1028&search=&size=314177&status=done&width=102)

#### getWidth
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的宽度

#### getHeight
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**是否必须**：false<br />**说明**：每个节点的高度

#### getHGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的水平间隙

#### getVGap
**类型**：Number | Function<br />**示例**：
```javascript
(d) => {
  // d 是一个节点
  if (d.id === 'testId') return 50
  return 100;
}
```
**默认值**：18<br />**是否必须**：false<br />**说明**：每个节点的垂直间隙

#### radial
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833817425-f944eadd-fd68-4107-8425-81c1c9bd1ce4.png#align=left&display=inline&height=175&name=image.png&originHeight=886&originWidth=990&search=&size=213310&status=done&width=195)