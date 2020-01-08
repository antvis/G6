---
title: 圣诞推文可视化
order: 0
---

该案例展示了圣诞夜与圣诞节网友们在 Tweeter 上发送的推文中，出现频率 top 100 的单词。可以通过拖拽、点击等交互，查看单词的上下文。

**”彩蛋“**：别人家的彩蛋是彩蛋，而我们的"彩蛋"是个课堂作业：

实现了该 demo 后，我们发现了一个小 Bug：由于 ’christmas‘ 的上下文节点众多，展开它后，在布局即将收敛时出现了疯狂的抖动鬼畜。欢迎在 <a href='https://github.com/antvis/G6' target='_blank'>GitHub</a> 上提 PR 修复它。