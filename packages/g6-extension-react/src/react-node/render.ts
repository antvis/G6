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

/**
 * <zh/> 渲染 React 节点(兼容 React 16 ~ 19)
 *
 * <en/> Render React node(Compatible with React 16 ~ 19)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function render(node: React.ReactElement, container: ContainerType) {
  const majorVersion = getReactMajorVersion();

  if (majorVersion >= 18) {
    // React 18/19
    const { render: render18 } = await import('./render18');
    return render18(node, container);
  } else {
    // React 16/17
    const { render: render16 } = await import('./render16');
    return render16(node, container);
  }
}

/**
 * <zh/> 卸载 React 节点(兼容 React 16 ~ 19)
 *
 * <en/> Unmount React node(Compatible with React 16 ~ 19)
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function unmount(container: ContainerType) {
  const majorVersion = getReactMajorVersion();

  if (majorVersion >= 18) {
    // React 18/19
    const { unmount: unmount18 } = await import('./render18');
    return unmount18(container);
  } else {
    // React 16/17
    const { unmount: unmount16 } = await import('./render16');
    return unmount16(container);
  }
}
