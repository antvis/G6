---
title: 如何在 G6 中给元素设置渐变色
order: 7
---

G6 提供**线性渐变**，**环形渐变**两种形式。

### 线性渐变
#### 示例
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*lX-fSbaOrn0AAAAAAAAAAABkARQnAQ' width='750' />
> 说明：l 表示使用线性渐变，绿色的字体为可变量，由用户自己填写。

#### 用法
```
// 使用渐变色描边，渐变角度为 0，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
stroke: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
```

### 环形渐变
#### 示例
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*U68WTpjAqscAAAAAAAAAAABkARQnAQ' width='750' />
> 说明：r 表示使用放射状渐变，绿色的字体为可变量，由用户自己填写，开始圆的 x y r 值均为相对值，0 至 1 范围。

#### 用法

```
// 使用渐变色填充，渐变起始圆的圆心坐标为被填充物体的包围盒中心点，半径为(包围盒对角线长度 / 2) 的 0.1 倍，渐变的起始点颜色 #ffffff，中点的渐变色为 #7ec2f3，结束的渐变色为 #1890ff
fill: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'
```
