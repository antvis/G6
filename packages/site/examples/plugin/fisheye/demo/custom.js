import { Graph, iconfont } from '@antv/g6';

const style = document.createElement('style');
style.innerHTML = `@import url('${iconfont.css}');`;
document.head.appendChild(style);

fetch('https://assets.antv.antgroup.com/g6/relations.json')
  .then((res) => res.json())
  .then((data) => {
    const graph = new Graph({
      container: 'container',
      autoFit: 'view',
      data,
      node: {
        style: {
          size: (datum) => datum.id.length * 2 + 10,
          label: false,
          labelText: (datum) => datum.id,
          labelBackground: true,
          icon: false,
          iconFontFamily: 'iconfont',
          iconText: '\ue6f6',
          iconFill: '#fff',
        },
        palette: {
          type: 'group',
          field: (datum) => datum.id,
          color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
        },
      },
      edge: {
        style: {
          stroke: '#e2e2e2',
        },
      },
      plugins: [
        {
          key: 'fisheye',
          type: 'fisheye',
          trigger: 'click',
          scaleRBy: 'wheel',
          scaleDBy: 'drag',
          style: { fill: '#F08F56', stroke: '#666', lineDash: [5, 5] },
          nodeStyle: { label: true, icon: true },
        },
      ],
    });
    graph.render();

    const config = {
      trigger: 'click',
      scaleRBy: 'wheel',
      scaleDBy: 'drag',
      showDPercent: true,
      borderless: true,
    };

    window.addPanel((gui) => {
      gui
        .add(config, 'trigger', ['pointermove', 'click', 'drag'])
        .name('Trigger')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            trigger: value,
          });
        });
      gui
        .add(config, 'scaleRBy', ['wheel', 'drag', 'unset'])
        .name('Scale R by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            scaleRBy: value,
          });
        });
      gui
        .add(config, 'scaleDBy', ['wheel', 'drag', 'unset'])
        .name('Scale D by')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            scaleDBy: value,
          });
        });
      gui
        .add(config, 'showDPercent')
        .name('Show D Percent')
        .onChange((value) => {
          graph.updatePlugin({
            key: 'fisheye',
            showDPercent: value,
          });
        });
      gui
        .add(config, 'borderless')
        .name('Borderless')
        .onChange((value) => {
          const style = value
            ? { fill: 'transparent', lineDash: 0, stroke: 'transparent' }
            : { fill: '#F08F56', lineDash: [5, 5], stroke: '#666' };
          graph.updatePlugin({
            key: 'fisheye',
            style,
          });
        });
    });
  });
