概述 / [模块](modules.zh.md) 

 ````jsx 
 从 '@antv/g6' 导入 { Graph, Util }; 
 const data = Util.mock(6).circle(); 

 常量图 = 新图({ 
   容器：'容器'， 
   宽度：500， 
   高度：500， 
   数据， 
   布局： { 
     类型：'网格'， 
   }, 
   插件：[ 
     { 
       key: '小地图', 
       类型：'小地图'， 
       大小：[300, 200], 
       模式：“委托”， 
       委托样式：{ 
         填充：'红色'， 
       }, 
       类名: 'g6-minimap-2', 
       viewportClassName: 'g6-minimap-viewport-2', 
     }, 
   ], 
 }); 

 const 节点 = graph.getAllNodesData(); 
 const 节点 = graph.getAllNodesData(); 

 graph.on('节点：点击', (e) => {}); 
 ```` 

 ＃ 介绍 

 在上面的代码片段中，我们可能想更多地了解 G6 所提供的功能，在这种情况下，我们将需要 G6 API 文档 

 #### “@antv/g6”包中导出了哪些类型、方法和类？ 

 - [图](./classes/graph.Graph.zh.md) 
 - [Util](./module/utils.zh.md) 

 #### `new Graph(Specification)`中的Specification是什么？ 

 - [规范](./interfaces/types.Specification.zh.md) 

 #### 插件的详细参数是什么？ 

 - [插件](./modules/plugins.zh.md)