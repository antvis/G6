---
title: 时间轴 TimeBar
order: 1
---

## 定义

时间轴组件基于普通缩略轴演变而来，它是有效展示动态时序数据、分析图数据的组件。该组件可以让用户快速、直观地观察事件序列以及它们之间的联系。用户可以播放时间来发现异常和探寻模式，推动调查并揭示数据中隐藏的故事。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ZvYDQbI08M8AAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

## 何时使用

如果需要观察一定时间内图数据的演变情况，分析变化趋势时，建议开启时间轴组件。例：在金融风控领域，保险公司和金融机构的反欺诈人员通过图可视化分析三个月内的案件情况，时间轴组件可以帮助快速分析可疑人脉、财务转账关系，定位嫌疑人。

## 常见类型

### 趋势图时间轴

该时间轴包括但不限于折线图、面积图、柱状图中的一种或多种组合用来表示某种数据属性趋势的时间轴组件，[查看演示 Demo](https://g6-v4.antv.vision/examples/tool/timebar#timebar)。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*bET1QI0dleEAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YvmWQ4EVumMAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

### 简版时间轴

相对于趋势图时间轴而言，去掉了表示数据趋势的图表，使用更为简洁的线条来表示时间范围，[查看演示 Demo](https://g6-v4.antv.vision/examples/tool/timebar#simple-timebar)。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yTC2RKh3-U8AAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

### 时间刻度时间轴

指表示时间刻度的时间轴组件，[查看演示 Demo](https://g6-v4.antv.vision/examples/tool/timebar#slice-timebar)。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*-hESSqWf8h4AAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

## 构成元素

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*_bi2RLRxYJUAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>
<br/>

时间轴组件主体分为三部分，2、3 部分需同时出现或隐藏。

1. 缩略轴：可配置成趋势图时间轴、简版时间轴、时间刻度时间轴；
2. 播放器：播放时间动画，可配置是否显示；
3. 时间配置：可配置播放速度、是否只看单一时间点；

## 出现位置

时间轴作为辅助组件，建议放在图形区下方。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XZvSSIWD5PkAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

## 交互说明

### 缩略轴

支持拖拽、点击、平移改变时间范围。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*sJuoSJsyDyUAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>
<br/>

简版时间轴、时间刻度时间轴交互操作同上。鼠标滚轮滚动时，左右平移已选定区间，暂不支持触控版操作。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*yHTGQZJcAWUAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>
<br/>

轴上数值文本内置自动躲避规则。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*kPW5SaNRVPEAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>

### 播放器

播放器主要包括三部分，其中播放、暂停按钮动作及状态相互切换。

<br/>
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*YvRrSKt_SHAAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>
<br/>
播放方式，分两种：
- 累计时间段数据：开始时间不变，结束时间持续增加，适合查看从一个时间点开始，持续观察累计变化趋势；
- 区间时间段数据：开始到结束时间的区间段固定不变，播放时该时间段水平移动，适合查看固定时间段内的数据变化趋势；

### 时间配置

时间配置主要包括两部分，单一时间开关、播放速度设置。

- 单一时间开关，默认不开启。 <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*7EHHSqJOsbkAAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’> <br/>
- 播放速度设置，默认配速为最慢速 1，最大速为 5。支持滚轮（触控板）滑动切换配速，每次增减值为 1。 <br/> <img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eo3pTbknf98AAAAAAAAAAAAAARQnAQ' width='95%' alt=‘img’>
