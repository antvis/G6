### otherShapes

**类型**：`OtherShapes`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    OtherShapes
  </summary>
 
```ts
type OtherShapes = {
  // key 为图形 id，规范格式为 xxShape
  // value 为图形样式、动画配置
  [shapeId: string]: ShapeStyleProps;
}
```
</details>

- [图形样式](/apis/shape/overview)

不在 G6 定义的规范节点中可能存在的图形。自定义节点中的其他图形应当定义和配置在 `otherShapes` 中。
