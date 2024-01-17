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

## materialProps

**类型**：`MaterialProps`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    MaterialProps
  </summary>

```ts
type MaterialProps = {
  /** 是否绘制 wireframe，常用于直观展示三角面 */
  wireframe?: boolean;
  /** 开启 wireframe 后可指定颜色，默认为 'black' */
  wireframeColor?: string;
  /** 开启 wireframe 后可指定线宽，默认为 1 */
  wireframeLineWidth?: number;
  /**
   * 开启 面剔除
   * 0：不剔除
   * 1：正面剔除
   * 2：背面剔除
   * 3：正背面剔除
   */
  cullMode?: number;
};
```

</details>

**默认值**：`object`

<details>
  <summary style="color: #873bf4; cursor: pointer;">
    object
  </summary>

```json
{
  "wireframe": false,
  "wireframeColor": "black",
  "wireframeLineWidth": 1,
  "cullMode": 0
}
```

</details>

材质相关属性
