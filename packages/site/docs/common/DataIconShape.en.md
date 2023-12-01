### iconShape

**Type**: `IconShape`

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

- [TextStyleProps](/en/apis/shape/text-style-props)

- [ImageStyleProps](/en/apis/shape/image-style-props)

Icon Shape, can be an image or text, with text supporting [iconfont](/en/manual/advanced/iconfont)
