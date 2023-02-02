---
title: GPU Layout
order: 12
---

G6 4.0 provides two kinds of GPU layout:

- gforce: a new built-in layout that support CPU and GPU calculation, it implements the classical force-directed algorithm;
- fruchterman: anoher force-directed algorithm whose CPU version is supported in previous version, and G6 4.0 support GPU version fruchterman.

Since the mechanism of the memory copy between GPU and CPU, the improvement is not obviouse in small graph, sometimes GPU version even performs worse than CPU. But in middle and large graph, the calculation speed of GPU might be hundreds times of CPU. The two table below shows the comparison on different scale datasets:

<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*3rScQqqfpAAAAAAAAAAAAAAAARQnAQ' width='80%'/>
