### iconShape

**类型**：`IconShape`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    IconShape
  </summary>

```ts
type IconShape = Partial<
  TextStyleProps &
    ImageStyleProps &
    ShapeStyle & {
      offsetX?: number;
      offsetY?: number;
      lod?: number;
    }
>;
```

</details>

- [TextStyleProps](/apis/shape/text-style-props)

- [ImageStyleProps](/apis/shape/image-style-props)

图标图形，可以是图片或文本，文本支持 [iconfont](/manual/advanced/iconfont)
