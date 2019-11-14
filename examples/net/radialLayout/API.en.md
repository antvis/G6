---
title: API
---

## center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of graph<br />**Required**: false<br />**Explanation**: The center of the layout

## linkDistance
**Type**: Number<br />**Default**: 50<br />**Required**: false<br />**Explanation**: Edge length

## maxIteration
**Type**: Number<br />**Default**: 1000<br />**Required**: false<br />**Explanation**: The max number of iteration to stop

## focusNode
**Type**: String | Object<br />**Default**: null<br />**Required**: false<br />**Explanation**: The focus node of the radial layout. If it is not assigned, the first node in the data will take effect. This parameter can be the node's id as String, or the node object.

## unitRadius
**Type**: Number<br />**Default**: 100<br />**Required**: false<br />**Explanation**: The distance between circles. If it is not assigned, this algorithm will calculate a value to fill the whole canvas.

## preventOverlap
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Switch to prevent the node overlappings. It should be used with [`nodeSize`](https://www.yuque.com/antv/g6/ngp0vg#xWjHN). Only if the `nodeSize` is assigned, the collide detection will take effect.

## nodeSize
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The size of the node(diameter). It will be used in collide dectection for preventing node overlappings.

## maxPreventOverlapIteration
**Type**: Number<br />**Default**: 200<br />**Required**: false<br />**Explanation**: The max number of iterations to stop the prevent node overlappings.

## strictRadial
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Explanation**: Whether layout the radial strictly, which means place the nodes with same level on a circle strictly. It will take effect while `preventOverlap` is `true`.

- When `preventOverlap` is `true` and `strictRadial` is `false`, this algorithm will try to place the overlapped nodes alone a circle without overlappings as much as possible. But the overlappings might not be able to avoid while there are too many nodes in a small circle.
- When `preventOverlap` is `true` and `strictRadial` is `true`, this algorithm allows offsets between nodes on the same level to prevent node overlappings.

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571823019221-9dca17b5-de09-4a1f-bc2e-d3449bcf3b15.png#align=left&display=inline&height=99&name=image.png&originHeight=782&originWidth=1708&search=&size=618660&status=done&width=217)        ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571822948753-8770ced2-4d49-4e32-8b63-d4274b3d954b.png#align=left&display=inline&height=115&name=image.png&originHeight=1022&originWidth=1730&search=&size=777561&status=done&width=194)      ![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571822993803-287544ef-2b0a-4187-862b-39d9cba314c5.png#align=left&display=inline&height=113&name=image.png&originHeight=920&originWidth=1716&search=&size=709533&status=done&width=210)
> （Left）preventOverlap = false。（Center）preventOverlap = false，strictRadial = true。（Right）preventOverlap = false，strictRadial = false。

