---
title: Plane 平面
order: 11
---

默认躺在 XZ 平面上

<img alt="plane" src="https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*jN9zQp3RflAAAAAAAAAAAAAAARQnAQ" height='200'/>

## width

**类型**：`number`

**默认值**：`100`

宽度

## depth

**类型**：`number`

**默认值**：`100`

深度

## widthSegments

**类型**：`number`

**默认值**：`5`

宽度分段数

## depthSegments

**类型**：`number`

**默认值**：`5`

深度分段数

## materialType

**类型**：`'basic' | 'phong' | 'lambert'`

**默认值**：`basic`

材质类型

## materialProps 材质相关属性

### wireframe

**类型**：`boolean`

**默认值**：`false`

是否绘制 wireframe，常用于直观展示三角面

### wireframeColor

**类型**：`string`

**默认值**：`black`

开启 wireframe 后可指定颜色，默认为 'black'

### wireframeLineWidth

**类型**：`number`

**默认值**：`1`

开启 wireframe 后可指定线宽，默认为 1

### cullMode

**类型**：`number`

**默认值**：`0`

开启 面剔除，默认为 0，即不剔除，1 为正面剔除，2 为背面剔除, 3 为正背面剔除

