[概述 - v5.0.0-alpha.9](../README.zh.md) / [模块](../modules.zh.md) / [类型](../modules/types.zh.md ) / 节点编码 

 # 接口：NodeEncode 

 [类型](../modules/types.zh.md).NodeEncode 

 ＃＃ 等级制度 

 - `NodeShapesEncode` 

   ↳ **`节点编码`** 

 ＃＃ 特性 

 ### 锚定形状 

 • `可选` **anchorShapes**：`编码`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>[]\> \| `ShapeAttrEncode`[] 

 ####继承自 

 NodeShapesEncode.anchorShapes 

 #### 定义于 

 [类型/node.ts:156](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L156) 

 ___ 

 ### 动画 

 • `可选` **动画**：`IAnimates` 

 #### 定义于 

 [类型/node.ts:161](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L161) 

 ___ 

 ### 徽章形状 

 • `可选` **badgeShapes**：`Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>[]\> \| `ShapeAttrEncode`[] 

 ####继承自 

 NodeShapesEncode.badgeShapes 

 #### 定义于 

 [类型/node.ts:157](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L157) 

 ___ 

 ### 图标形状 

 • `可选` **iconShape**：`ShapeAttrEncode` \| `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps ` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>\> 

 ####继承自 

 NodeShapesEncode.iconShape 

 #### 定义于 

 [类型/item.ts:89](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/item.ts#L89) 

 ___ 

 ### keyShape 

 • `可选` **keyShape**：`ShapeAttrEncode` \| `Encode`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps ` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>\> 

 ####继承自 

 NodeShapesEncode.keyShape 

 #### 定义于 

 [类型/item.ts:88](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/item.ts#L88) 

 ___ 

 ### 标签背景形状 

 • `可选` **labelBackgroundShape**：`编码`<`Partial`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>[]\> \| `ShapeAttrEncode`[] 

 ####继承自 

 NodeShapesEncode.labelBackgroundShape 

 #### 定义于 

 [类型/node.ts:155](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L155) 

 ___ 

 ### 标签形状 

 • `可选` **labelShape**：`编码`<`部分`<`CircleStyleProps` & `RectStyleProps` & `EllipseStyleProps` & `PolygonStyleProps` & `LineStyleProps` & `PolylineStyleProps` & `TextStyleProps` & `ImageStyleProps` & `PathStyleProps` & `SphereGeometryProps` & `CubeGeometryProps` & `PlaneGeometryProps` & { `动画？`: `IAnimates` ; `lod?`: `数字`; `可见？`: `布尔值` }\>\> \| `NodeLabelShapeAttrEncode` 

 ####继承自 

 NodeShapesEncode.labelShape 

 #### 定义于 

 [类型/node.ts:154](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L154) 

 ___ 

 ### 其他形状 

 • `可选` **otherShapes**：`对象` 

 #### 索引签名 

 ▪ [shapeId: `string`]: { `[shapeAtrr: string]`: `未知` \| `编码`<`未知`\>; `animates`: `IAnimates` \| `编码`<`IAnimates`\> } 

 ####继承自 

 NodeShapesEncode.otherShapes 

 #### 定义于 

 [类型/item.ts:90](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/item.ts#L90) 

 ___ 

 ＃＃＃ 类型 

 • `可选` **类型**：`字符串` \| `编码`<`字符串`\> 

 #### 定义于 

 [类型/node.ts:160](https://github.com/antvis/G6/blob/c9548251ff/packages/g6/src/types/node.ts#L160)