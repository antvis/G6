```js | ob { pin: false }
createGraph(
  {
    data: { nodes: [{ id: 'node-1' }, { id: 'node-2' }], edges: [{ source: 'node-1', target: 'node-2' }] },
    node: { style: { fill: '#7e3feb', width: 30, height: 30 } },
    edge: { style: { stroke: '#8b9baf', strokeWidth: 2 } },
    layout: { type: 'force', center: [300, 150] },
    behaviors: ['drag-canvas', 'drag-node'],
    plugins: [
      {
        type: 'fullscreen',
        key: 'fullscreen',
        enabled: false,
      },
      function () {
        const graph = this;
        return {
          type: 'toolbar',
          key: 'toolbar',
          position: 'top-left',
          onClick: (item) => {
            const fullscreenPlugin = graph.getPluginInstance('fullscreen');
            if (item === 'request-fullscreen') {
              fullscreenPlugin.request();
            }
            if (item === 'exit-fullscreen') {
              fullscreenPlugin.exit();
            }
          },
          getItems: () => {
            return [
              { id: 'request-fullscreen', value: 'request-fullscreen' },
              { id: 'exit-fullscreen', value: 'exit-fullscreen' },
            ];
          },
        };
      },
    ],
  },
  { width: 600, height: 300 },
  (gui, graph) => {
    const KEY_OPTIONS = ['f11', 'ctrl+f', 'meta+f']; // 常见全屏快捷键
    const options = {
      type: 'fullscreen',
      enabled: true,
      triggerKey: 'f11', // 触发全屏的快捷键
      closeOnEscape: true, // 按ESC键退出全屏
    };

    const optionFolder = gui.addFolder('Fullscreen Options');
    optionFolder.add(options, 'type').disable(true); // 固定插件类型
    optionFolder.add(options, 'enabled').name('启用全屏'); // 开关选项
    optionFolder.add(options, 'triggerKey', KEY_OPTIONS).name('触发快捷键'); // 快捷键选择
    optionFolder.add(options, 'closeOnEscape').name('ESC键退出'); // 退出全屏方式

    optionFolder.onChange(({ property, value }) => {
      // 更新插件配置
      graph.updatePlugin({
        key: 'fullscreen', // 对应插件的key
        [property]: property === 'triggerKey' ? value : value, // 直接赋值对应属性
      });

      // 特殊处理：如果启用状态变化，直接触发全屏切换
      if (property === 'enabled') {
        value ? graph.plugins['fullscreen'].enter() : graph.plugins['fullscreen'].exit();
      }

      graph.render();
    });
  },
);
```
