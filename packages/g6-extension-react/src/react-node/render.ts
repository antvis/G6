import type * as React from 'react';
import * as ReactDOM from 'react-dom';

type ContainerType = Element | DocumentFragment;

const { version } = ReactDOM;

/**
 * <zh/> 获取 React 主版本号
 *
 * <en/> Get React major version
 * @returns <zh/> 主版本号 | <en/> Major version
 */
function getReactMajorVersion(): number {
  return Number((version || '').split('.')[0]);
}

const getRenderer = (() => {
  let rendererPromise: Promise<{
    render: (node: React.ReactElement, container: ContainerType) => unknown;
    unmount: (container: ContainerType) => unknown;
  }>;

  return () => {
    if (!rendererPromise) {
      const majorVersion = getReactMajorVersion();
      if (majorVersion >= 18) {
        rendererPromise = import('./render18');
      } else {
        rendererPromise = import('./render16');
      }
    }
    return rendererPromise;
  };
})();

/**
 * <zh/> 渲染 React 节点(兼容 React 16 ~ 19)
 *
 * <en/> Render React node(Compatible with React 16 ~ 19)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function render(node: React.ReactElement, container: ContainerType) {
  const { render } = await getRenderer();
  return render(node, container);
}

/**
 * <zh/> 卸载 React 节点(兼容 React 16 ~ 19)
 *
 * <en/> Unmount React node(Compatible with React 16 ~ 19)
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function unmount(container: ContainerType) {
  const { unmount } = await getRenderer();
  return unmount(container);
}
