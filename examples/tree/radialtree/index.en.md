---
title: Radial Tree
order: 4
---

In radial tree layout, root node will be placed on the center. the branches will be placed in radial around the root. Dendrogram and CompactBox can be transformed into radial tree by configuration. 
<br />
<img src='https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*UTm2T67HcFkAAAAAAAAAAABkARQnAQ' alt='radialtree' width='250'/>

## Usage
Radial tree layout is a deformation of Dendrogram and CompactBox. It is an appropriate layout method for tree data structure. Please use it with TreeGraph. As the demo below, you can deploy it in `layout` while instantiating Graph.

Same as Dendrogram and CompactBox, only set the `radial` to  `true`. We recommend to set `direction` to `LR` or `RL` while using radial tree layout.