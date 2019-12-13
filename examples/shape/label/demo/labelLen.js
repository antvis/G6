
/**
   * 该案例演示当label太长时候，指定多少个字符后显示省略号。
   * 有两种方式进行处理：
   * 1、从数据中处理，处理完以后再进行渲染；
   * 2、自定义节点或边时，进行处理：
   *  group.addShape('text', {
   *     attrs: {
   *       text: fittingString(cfg.label, 50, 12),
   *       ...
   *     }
   *  })
   *
   */
  import G6 from '@antv/g6';

/**
 * 计算字符串的长度
 * @param {string} str 指定的字符串
 * @return {number} 字符串长度
 */
  const calcStrLen = str => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  };

/**
 * 计算显示的字符串
 * @param {string} str 要裁剪的字符串
 * @param {number} maxWidth 最大宽度
 * @param {number} fontSize 字体大小
 * @return {string} 处理后的字符串
 */
  const fittingString = (str, maxWidth, fontSize) => {
    const fontWidth = fontSize * 1.3; // 字号+边距
    maxWidth = maxWidth * 2; // 需要根据自己项目调整
    const width = calcStrLen(str) * fontWidth;
    const ellipsis = '…';
    if (width > maxWidth) {
      const actualLen = Math.floor((maxWidth - 10) / fontWidth);
      const result = str.substring(0, actualLen) + ellipsis;
      return result;
    }
    return str;
  };

  const data = {
    nodes: [{
      x: 100,
      y: 100,
      label: '这个文案有点长',
      id: 'node1',
      labelCfg: {
        position: 'bottom'
      },
      anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
    }, {
      x: 300,
      y: 100,
      label: '这个文案也有点长',
      id: 'node2',
      labelCfg: {
        position: 'bottom'
      },
      anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]]
    }],
    edges: [{
      source: 'node1',
      target: 'node2',
      label: 'label上面这个文本太长了我需要换行',
      labelCfg: {
        refY: 20
      },
      style: {
        endArrow: true
      }
    }]
  };

  const width = document.getElementById('container').scrollWidth;
  const height = document.getElementById('container').scrollHeight || 500;
  const graph = new G6.Graph({
    container: 'container',
    width,
    height,
    defaultNode: {
      style: {
        fill: '#DEE9FF',
        stroke: '#5B8FF9'
      }
    },
    defaultEdge: {
      color: '#F6BD16'
    }
  });

// 直接修改原生数据中的label字段
  data.nodes.forEach(function(node) {
    node.label = fittingString(node.label, 25, 12);
  });
  data.edges.forEach(function(edge) {
    edge.label = fittingString(edge.label, 100, 12);
  });

  graph.data(data);
  graph.render();
