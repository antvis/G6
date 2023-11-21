<details>

<summary style="color: #873bf4; cursor: pointer">ArrowProps</summary>

```typescript
type ArrowType = 'triangle' | 'circle' | 'diamond' | 'rect' | 'vee' | 'triangle-rect' | 'simple';

type ArrowStyle = PathStyleProps & {
  type: ArrowType;
  width: number;
  height: number;
  offset?: number;
};

type ArrowProps = {
  /**
   * 边的起始端箭头
   */
  startArrow?: boolean | ArrowStyle;
  /**
   * 边的结束端箭头
   */
  endArrow?: boolean | ArrowStyle;
};
```

`ArrowType` 可选值如下：

| 类型名称          | 效果                                                                                                                   |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `'simple'`        | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*yOWMQaMVw7QAAAAAAAAAAAAADmJ7AQ/original" width=250 /> |
|                   |
| `'triangle'`      | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*GMbvSrBQWV0AAAAAAAAAAAAADmJ7AQ/original" width=240 /> |
| `'circle'`        | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DDnWQJFM9ZsAAAAAAAAAAAAADmJ7AQ/original" width=250 /> |
| `'diamond'`       | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*OwA9RL3i4FUAAAAAAAAAAAAADmJ7AQ/original" width=250 /> |
| `'rect'`          | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*JfstQYm4_g4AAAAAAAAAAAAADmJ7AQ/original" width=240 /> |
| `'vee'`           | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NlzeT4JPlSMAAAAAAAAAAAAADmJ7AQ/original" width=240 /> |
| `'triangle-rect'` | <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*v4EHSo5o5RAAAAAAAAAAAAAADmJ7AQ/original" width=240 /> |

</details>
