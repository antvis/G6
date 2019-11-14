---
title: API
---

## center
**Type**: Array<br />**Example**: [ 0, 0 ]<br />**Default**: The center of the graph<br />**Required**: false<br />**Explanation**: The center of the layout

## radius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Explanation**: The radius of the circle. If the radius is assigned a value, the startRadius and endRadius will not take effect

## startRadius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Explanation**: The start radius of spiral style layout

## endRadius
**Type**: Number<br />**Default**: null<br />**Required**: false<br />**Explanation**: The end radius of spiral style layout

## clockwise
**Type**: Boolean<br />**Default**: true<br />**Required**: false<br />**Explanation**: If layout the nodes by clockwise

## divisions
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Explanation**: The number of divisions on the circle. It will takes effect while endRadius - startRadius != 0

## ordering
**Type**: String<br />**Default**: false<br />**可选值**: null | 'topology' | 'degree'<br />**Required**: false<br />**Explanation**: The nodes will be ordered according to this parameter. null means order the nodes in data order/ 'topology' means order the node by topology. 'degree' means order the nods by their degrees.

## angleRatio
**Type**: Number<br />**Default**: 1<br />**Required**: false<br />**Explanation**: How many 2*PI between the first node to the last node.