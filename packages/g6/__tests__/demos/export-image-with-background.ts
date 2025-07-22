import { Graph } from '@antv/g6';

export const exportImageWithBackground: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    width: 500,
    height: 400,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 100, y: 100, fill: '#ff6b6b', labelText: 'Node 1' } },
        { id: 'node-2', style: { x: 200, y: 200, fill: '#4ecdc4', labelText: 'Node 2' } },
        { id: 'node-3', style: { x: 300, y: 150, fill: '#45b7d1', labelText: 'Node 3' } },
      ],
      edges: [
        { id: 'edge-1', source: 'node-1', target: 'node-2', style: { stroke: '#666' } },
        { id: 'edge-2', source: 'node-2', target: 'node-3', style: { stroke: '#666' } },
      ],
    },
    plugins: [
      {
        type: 'background',
        key: 'background',
        backgroundImage:
          'url(https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0Qq0ToQm1rEAAAAAAAAAAAAADmJ7AQ/original)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.5,
      },
    ],
    behaviors: ['drag-canvas', 'drag-element'],
  });

  await graph.render();

  exportImageWithBackground.form = (panel: any) => {
    const config = {
      exportImage: async () => {
        try {
          const dataURL = await graph.toDataURL({ mode: 'viewport' });
          // 下载图片
          const link = document.createElement('a');
          link.download = 'graph-with-background.png';
          link.href = dataURL;
          link.click();
          alert('图片导出成功！背景应该包含在内。');
        } catch (error) {
          alert('导出失败：' + (error instanceof Error ? error.message : String(error)));
        }
      },
      copyToClipboard: async () => {
        try {
          const dataURL = await graph.toDataURL({ mode: 'viewport' });
          await navigator.clipboard.writeText(dataURL);
          alert('DataURL已复制到剪贴板');
        } catch (error) {
          alert('复制失败：' + (error instanceof Error ? error.message : String(error)));
        }
      },
      updateBackground: () => {
        graph.updatePlugin({
          key: 'background',
          backgroundSize: config.backgroundSize,
          backgroundPosition: config.backgroundPosition,
        });
      },
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return [
      panel.add(config, 'exportImage').name('导出图片(含背景)'),
      panel.add(config, 'copyToClipboard').name('复制DataURL'),
      panel
        .add(config, 'backgroundSize', {
          填充: 'cover',
          适应: 'contain',
          原始: 'auto',
        })
        .onChange(config.updateBackground),
      panel
        .add(config, 'backgroundPosition', {
          居中: 'center',
          左上: 'left top',
          右下: 'right bottom',
        })
        .onChange(config.updateBackground),
    ];
  };

  return graph;
};
