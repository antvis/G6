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
**Type**: Boolean<br />**Default**: false<br />**Required**: false<br />**Explanation**: Switch to prevent the node overlappings. It should be used with `nodeSize`. Only if the `nodeSize` is assigned, the collide detection will take effect.

## nodeSize
**Type**: Number<br />**Default**: 10<br />**Required**: false<br />**Explanation**: The size of the node(diameter). It will be used in collide dectection for preventing node overlappings.

## maxPreventOverlapIteration
**Type**: Number<br />**Default**: 200<br />**Required**: false<br />**Explanation**: The max number of iterations to stop the prevent node overlappings.

## strictRadial
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Explanation**: Whether to layout the radial strictly, which means place the nodes with same level on a circle strictly. It will take effect while `preventOverlap` is `true`.

- When `preventOverlap` is `true` and `strictRadial` is `false`, this algorithm will try to place the overlapped nodes alone a circle without overlappings as much as possible. But the overlappings might not be able to avoid while there are too many nodes in a small circle.
- When `preventOverlap` is `true` and `strictRadial` is `true`, this algorithm allows offsets between nodes on the same level to prevent node overlappings.

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*j-7IRp5qhxcAAAAAAAAAAABkARQnAQ' width=217/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5pVjQ6uRSyEAAAAAAAAAAABkARQnAQ' width=194/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IpMeTr6Lqv0AAAAAAAAAAABkARQnAQ' width=210/>
> （Left）preventOverlap = false。（Center）preventOverlap = false，strictRadial = true。（Right）preventOverlap = false，strictRadial = false。

