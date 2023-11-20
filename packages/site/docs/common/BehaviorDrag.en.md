## delegateStyle

**Type**:

```ts
type delegateStyle = {
  fill?: string;
  stroke?: string;
  lineWidth?: number;
  lineDash?: number[];
  opacity?: number;
};
```

**Default**:

```json
{
  "fill": "#F3F9FF",
  "fillOpacity": 0.5,
  "stroke": "#1890FF",
  "strokeOpacity": 0.9,
  "lineDash": [5, 5]
}
```

**Required**: false

**Description**: The style of the temporary rectangle

<embed src="./BehaviorEventName.en.md"></embed>

## enableTransient

**Type**: `boolean`

**Default**: `true`

Whether to render the interaction target to the transient layer

## enableDelegate

**Type**: `boolean`

**Default**: `false`

Whether to render a delegate rectangle shape when dragging

<img alt="enable delegate" src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ajOlSJlLPpAAAAAAAAAAAAAADmJ7AQ/original
" height='300'/>

## hideRelatedEdges

**Type**: `boolean`

**Default**: `false`

Whether to hide the related edges when dragging

## selectedState

**Type**: `string`

**Default**: `selected`

Switch to this state when dragging

<embed src="./Throttle.en.md"></embed>

## updateComboStructure

**Type**: `boolean`

**Default**: `true`

Whether to update the structure of the combo when dragging

<embed src="./BehaviorShouldBegin.en.md"></embed>
