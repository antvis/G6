---
title: 设计原则
order: 1
redirect_from:
  - /zh/docs/design
---

AntV 的设计原则是基于 Ant Design 设计体系衍生的，它在遵循 Ant Design 设计价值观的同时，对数据可视化领域的进一步解读，如色板、字体的指引。

G6 作为 AntV 图可视化技术栈，在设计上依然遵循 AntV 的四条核心原则：准确、清晰、有效、美，这四条原则按重要等级先后排序，相辅相成且呈递进关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*0i8-Q7EBF7AAAAAAAAAAAAAAARQnAQ' width='90%'>

### 准确
可视表达时不歪曲，不误导，不遗漏，精准如实反应数据的特征信息。

例如：关系图的箭头指向必须清晰、明确，否则在大数据展示时容易辨识不清。在图形上，我们对三角形进行一定的裁剪，让其像指南针一样有明确的指向性，比较下面两图，左侧的箭头能清晰辨别指向性，而右侧的箭头在识别时会有些困惑。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*fzlWS788IIgAAAAAAAAAAAAAARQnAQ' width='90%'>

### 清晰
清晰包括两个层面，结构清晰 与 内容清晰。

结构清晰：数据可视化呈现的是一幅作品，它是制作者分析思路的呈现，其布局决定阅读者的浏览顺序。清晰的平面布局能很好的帮助阅读者获取信息。下图展现的是同一组数据下不同布局的关系图，例如环状布局可用于突出数据结构中的环；辐射状布局是辐射状树布局的扩展，可突出关注点与其他节点的最短路径关系；格子布局可以让图看起来十分规整，利于探索。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*eRd5RK2_mQkAAAAAAAAAAAAAARQnAQ' width='90%'>

内容清晰：

不让用户带着疑惑看图是我们始终不变的追求。例如在 G6 中经常会出现成千上万个节点，为了让用户能对所有节点感受的更直观，我们设计了鱼眼功能，同时查看图的全貌和局部，可以清晰地描绘出焦点所在节点与其邻居之间的直接关系。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*9YtyR6mMM_4AAAAAAAAAAAAAARQnAQ' width='90%'>

### 有效
信息传达有重点，克制不冗余，避免信息过载，用最适量的数据-油墨比（Data-ink Ratio）表达对用户最有用的信息。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wwBqR4StRboAAAAAAAAAAAAAARQnAQ' width='90%'>

### 美
美是一种克制，合理利用视觉元素进行映射，运用格式塔原理对数据进行分组，既能帮助用户更快的获取信息，也能在一定程度上建立一种秩序美、规律美。

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ATzJQZzP8vYAAAAAAAAAAAAAARQnAQ' width='90%'>
