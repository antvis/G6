import type * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';

// Let compiler not to search module usage
const fullClone = {
  ...ReactDOM,
} as typeof ReactDOM & {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
    usingClientEntryPoint?: boolean;
  };
  createRoot?: CreateRoot;
};

type CreateRoot = (container: ContainerType) => Root;

const { version, render: reactRender, unmountComponentAtNode } = fullClone;

let createRoot: CreateRoot | undefined;
try {
  const mainVersion = Number((version || '').split('.')[0]);
  if (mainVersion >= 18 && fullClone.createRoot) {
    ({ createRoot } = fullClone);
  }
} catch (e) {
  // Do nothing;
}

/**
 * <zh/> 切换警告
 *
 * <en/> Toggle warning
 * @param skip <zh/> 是否跳过警告 | <en/> Whether to skip the warning
 */
function toggleWarning(skip: boolean) {
  const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = fullClone;

  if (
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
    typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
  ) {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
  }
}

const MARK = '__rc_react_root__';

// ========================== Render ==========================
type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root;
};

/**
 * <zh/> 渲染 React 节点(React >= 18)
 *
 * <en/> Render React node(React >= 18)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 */
function modernRender(node: React.ReactNode, container: ContainerType) {
  toggleWarning(true);
  const root = container[MARK] || createRoot!(container);
  toggleWarning(false);

  root.render(node);

  container[MARK] = root;
}

/**
 * <zh/> 使用旧的 React 渲染
 *
 * <en/> Use old React render
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 */
function legacyRender(node: React.ReactElement, container: ContainerType) {
  reactRender(node, container);
}

/**
 * <zh/> 渲染 React 节点(兼容 React 16 ~ 18)
 *
 * <en/> Render React node(Compatible with React 16 ~ 18)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 */
export function render(node: React.ReactElement, container: ContainerType) {
  if (createRoot) modernRender(node, container);
  else legacyRender(node, container);
}

/**
 * <zh/> 卸载 React 节点(React >= 18)
 *
 * <en/> Unmount React node(React >= 18)
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
async function modernUnmount(container: ContainerType) {
  // Delay to unmount to avoid React 18 sync warning
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();
    delete container[MARK];
  });
}

/**
 * <zh/> 卸载 React 节点(React < 18)
 *
 * <en/> Unmount React node(React < 18)
 * @param container - <zh/> 容器 | <en/> Container
 */
function legacyUnmount(container: ContainerType) {
  unmountComponentAtNode(container);
}

/**
 * <zh/> 卸载 React 节点(兼容 React 16 ~ 18)
 *
 * <en/> Unmount React node(Compatible with React 16 ~ 18)
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function unmount(container: ContainerType) {
  if (createRoot) {
    // Delay to unmount to avoid React 18 sync warning
    return modernUnmount(container);
  }

  legacyUnmount(container);
}
