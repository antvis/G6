---
title: Layout
order: 0
---

Configure the `layout` when instantiating a Graph:
```javascript
const graph = new G6.Graph({
  ...                      // Other configurations
  layout: {                // Object, configuration for layout. random by default
    type: 'force',
    preventOverlap: true,
    nodeSize: 30,
    ...                    // Other layout configurations
  }
});
```

The configurations of each layout algorithms are different. Please refer to corresponding API of each layout in this directory.
<br />When `layout` is not assigned on graph:

- If there are `x` and `y` in node data, the graph will render with these information;
- If there is no positions information in node data, the graph will arrange nodes with Random Layout by default.

The following functions are used for register a new type of layout. If you are using built-in layouts, you do not need to controll the functions below, which are called by graph automatically.


## Initialize

### init(data)
Initialize the layout.


**Paramter**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Object | true | The data for the layout |



### getDefaultCfg()
Get the default configurations of the layout.

**Return**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cfg | Object | true | The default configurations |



## Layout

### execute()
Execute the layout.


### layout(data)
Execute layout according to the data.


**Paramter**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| data | Object | true | The data to be arranged |



## Update

### updateCfg(cfg)
Update the configurations for layout.


**Paramter**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| cfg | Object | true | New configurations |



## Destroy

### destroy()
Destroy the layout.
