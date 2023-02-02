---
title: GPU 图布局
order: 12
---

G6 4.0 推出两种支持 GPU 布局：

- gforce：全新内置布局，实现了经典的力导向算法；
- fruchterman：另一种力导向的变种算法，CPU 版本在之前的版本就已经存在，G6 4.0 支持使用 GPU 并行计算该算法。

由于 GPU 与 CPU 通信的拷贝效率原因，在小规模图上 GPU 版本的布局提升不大，甚至可能更慢。但在较大、大规模图上，计算性能大大提升，升至超过 CPU 的百倍。下面两张表格对比了两个算法在不同数据规模、不同算法下 GPU 与 CPU 的计算时间：

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*4ogTQKrWhIkAAAAAAAAAAAAAARQnAQ' width='80%' alt=''/>
