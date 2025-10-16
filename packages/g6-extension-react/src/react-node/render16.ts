import type * as React from 'react';
import * as ReactDOM from 'react-dom';

type ContainerType = Element | DocumentFragment;

const { render: reactRender, unmountComponentAtNode } = ReactDOM as any;

/**
 * <zh/> 渲染 React 节点(React 16/17)
 *
 * <en/> Render React node(React 16/17)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 */
export function render(node: React.ReactElement, container: ContainerType) {
  reactRender(node, container);
}

/**
 * <zh/> 卸载 React 节点(React 16/17)
 *
 * <en/> Unmount React node(React 16/17)
 * @param container - <zh/> 容器 | <en/> Container
 */
export function unmount(container: ContainerType) {
  unmountComponentAtNode(container);
}
