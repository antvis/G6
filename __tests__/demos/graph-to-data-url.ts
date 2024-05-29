import icon from '@@/assets/user.svg';
import { Graph } from '@antv/g6';

export const graphToDataURL: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    background: '#f4df4d',
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50, fill: 'purple', halo: true, labelText: 'node-1' } },
        { id: 'node-2', style: { x: 100, y: 50, fill: 'pink', halo: true, labelText: 'node-2' } },
        { id: 'node-3', style: { x: 150, y: 50, iconSrc: icon, iconWidth: 30, iconHeight: 30, labelText: 'node-2' } },
      ],
      edges: [{ id: 'edge-1', source: 'node-1', target: 'node-2', style: { stroke: 'orange', lineWidth: 2 } }],
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element'],
  });

  graphToDataURL.form = (panel) => {
    const config = {
      toDataURL: () => {
        graph.toDataURL({ mode: config.mode } as any).then((url) => {
          navigator.clipboard.writeText(url);
          alert('The data URL has been copied to the clipboard');
        });
      },
      mode: 'viewport',
      download: async () => {
        const dataURL = await graph.toDataURL({ mode: config.mode } as any);
        const [head, content] = dataURL.split(',');
        const contentType = head.match(/:(.*?);/)![1];

        const bstr = atob(content);
        let length = bstr.length;
        const u8arr = new Uint8Array(length);

        while (length--) {
          u8arr[length] = bstr.charCodeAt(length);
        }

        const blob = new Blob([u8arr], { type: contentType });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'graph.png';
        a.click();
      },
    };
    return [
      panel.add(config, 'toDataURL'),
      panel.add(config, 'mode', ['viewport', 'overall']),
      panel.add(config, 'download').name('Download'),
    ];
  };

  await graph.render();
  return graph;
};
