---
title: API
---
#### direction
**类型**：String<br />**可选值**：'LR' | 'RL' | 'TB' | 'BT' | 'H' | 'V'<br />**默认值**：'LR'<br />**是否必须**：false<br />**说明**：树布局的方向，默认为，其他选项说明

- TB —— 根节点在上，往下布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832831947-89713eef-7898-446b-9edc-604ed63b77d4.png#align=left&display=inline&height=48&name=image.png&originHeight=760&originWidth=1784&search=&size=518414&status=done&width=112)

- BT —— 根节点在下，往上布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832849059-ada0d199-ca15-4ce0-83e0-de00f9482c0b.png#align=left&display=inline&height=50&name=image.png&originHeight=786&originWidth=1814&search=&size=517688&status=done&width=115)

- LR —— 根节点在左，往右布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832767625-ad86a4b6-dabb-4f53-9800-31bb3fef88c6.png#align=left&display=inline&height=114&name=image.png&originHeight=896&originWidth=408&search=&size=214689&status=done&width=52)

- RL —— 根节点在右，往左布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832804357-6b4c6e65-22fe-45b1-ab9f-bf954cdb0b13.png#align=left&display=inline&height=116&name=image.png&originHeight=912&originWidth=410&search=&size=213061&status=done&width=52)

- H —— 根节点在中间，水平对称布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832893099-55fa98c8-30f2-49c6-b582-76dd69de7b4a.png#align=left&display=inline&height=104&name=image.png&originHeight=892&originWidth=712&search=&size=279079&status=done&width=83)

- V —— 根节点在中间，垂直对称布局

![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571832910720-f3d479c3-b822-4123-b207-a81e22fad324.png#align=left&display=inline&height=91&name=image.png&originHeight=922&originWidth=1172&search=&size=366086&status=done&width=116)

#### nodeSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：节点间距

#### rankSep
**类型**：Number<br />**默认值**：0<br />**是否必须**：false<br />**说明**：层与层之间的间距

#### radial
**类型**：Boolean<br />**默认值**：false<br />**是否必须**：false<br />**说明**：是否按照辐射状布局。若 `radial` 为 `true`，建议 `direction` 设置为 `'LR'` 或 `'RL'`：<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/156681/1571833294684-7874d71d-fb44-4340-95d0-c03b56c67a18.png#align=left&display=inline&height=172&name=image.png&originHeight=926&originWidth=922&search=&size=286654&status=done&width=171)