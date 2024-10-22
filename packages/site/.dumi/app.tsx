import { notification } from 'antd';
import React from 'react';

if (typeof window !== 'undefined') {
  window.onresize = () => {
    const { graph, container, widthOffset = 0, heightOffset = 0 } = window as any;

    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth + widthOffset, container.scrollHeight + heightOffset]);
  };
}

notification.info({
  message: '提示',
  description: (
    <>
      您目前访问的是 G6 最新版本，旧版已迁移至:
      <a href="https://g6-v4.antv.vision" target="_blank">
        g6-v4.antv.vision
      </a>
    </>
  ),
  placement: 'topRight',
  duration: 30,
  style: {
    margin: 0,
  },
});
