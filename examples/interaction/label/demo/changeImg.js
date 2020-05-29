import G6 from '@antv/g6';

/**
 * 本示例演示以下功能：
 * 1、如何使用图片作为节点背景；
 * 2、点击切换节点背景图片。
 *
 */

const img = new Image();
img.src = 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg';

// 点击图片节点，切换背景图片
const img2 = new Image();
img2.src = 'https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wAmHQJbNVdwAAAAAAAAAAABkARQnAQ';
const data = {
  nodes: [
    {
      x: 150,
      y: 100,
      type: 'circleNode',
      label: 'circle',
      id: 'node1',
      labelCfg: {
        position: 'center',
      },
    },
    {
      x: 350,
      y: 100,
      type: 'image',
      id: 'node2',
      img: img.src,
      size: [120, 60],
      label: 'avatar',
      style: {
        cursor: 'pointer',
      },
      labelCfg: {
        position: 'bottom',
      },
    },
  ],
  edges: [
    {
      source: 'node1',
      target: 'node2',
      label: 'line',
      labelCfg: {
        refY: 10,
      },
    },
  ],
};
// 避免拖动过程中闪烁：使用加载已经LOAD好的图片
img.onload = function () {
  const width = document.getElementById('container').scrollWidth;
  const height = document.getElementById('container').scrollHeight || 500;
  const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    defaultNode: {
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9',
      },
    },
    defaultEdge: {
      color: '#e2e2e2',
    },
    modes: {
      default: [
        'drag-node',
        {
          type: 'drag-node',
        },
      ],
    },
  });
  graph.data(data);
  graph.render();

  graph.on('node:click', function (evt) {
    const target = evt.target;

    const type = target.get('type');
    const hasChangeBg = target.get('hasChangeBg');
    if (type === 'image') {
      if (!hasChangeBg) {
        // 点击图片节点时，切换背景图片
        target.attr('img', img2);
        target.attr('imgSrc', 'http://seopic.699pic.com/photo/50055/5642.jpg_wh1200.jpg');
        target.set('hasChangeBg', true);
      } else {
        target.attr('img', img);
        target.attr(
          'imgSrc',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566553535233&di=b0b17eeea7bd7356a6f42ebfd48e9441&imgtype=0&src=http%3A%2F%2Fa2.att.hudong.com%2F64%2F29%2F01300543361379145388299988437_s.jpg',
        );
        target.set('hasChangeBg', false);
      }
      graph.paint();
    }
  });
};
