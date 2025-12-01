import type * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { Root } from 'react-dom/client';

type ContainerType = (Element | DocumentFragment) & {
  __rc_react_root__?: Root;
};

const MARK = '__rc_react_root__';

let ReactDOMClientPromise: Promise<typeof import('react-dom/client') | null> | null = null;

/**
 * <zh/> 初始化 React 18+ 的 createRoot
 *
 * <en/> Initialize React 18+ createRoot
 * @returns ReactDOMClient
 */
function initReactDOMClient() {
  if (ReactDOMClientPromise === null) {
    ReactDOMClientPromise = import('react-dom/client').catch(() => null);
  }
  return ReactDOMClientPromise;
}

/**
 * <zh/> 切换警告
 *
 * <en/> Toggle warning
 * @param skip <zh/> 是否跳过警告 | <en/> Whether to skip the warning
 */
function toggleWarning(skip: boolean) {
  try {
    const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = ReactDOM as typeof ReactDOM & {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: {
        usingClientEntryPoint?: boolean;
      };
    };

    if (
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED &&
      typeof __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === 'object'
    ) {
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.usingClientEntryPoint = skip;
    }
  } catch {
    // Silent error
  }
}

/**
 * <zh/> 渲染 React 节点(React 18/19)
 *
 * <en/> Render React node(React 18/19)
 * @param node - <zh/> React 节点 | <en/> React node
 * @param container - <zh/> 容器 | <en/> Container
 */
export async function render(node: React.ReactNode, container: ContainerType) {
  const client = await initReactDOMClient();
  if (!client?.createRoot) {
    throw new Error('React 18+ createRoot not available');
  }

  toggleWarning(true);
  const root = container[MARK] || client.createRoot(container);
  toggleWarning(false);

  root.render(node);
  container[MARK] = root;
}

/**
 * <zh/> 卸载 React 节点(React 18/19)
 *
 * <en/> Unmount React node(React 18/19)
 * @param container - <zh/> 容器 | <en/> Container
 * @returns <zh/> Promise | <en/> Promise
 */
export async function unmount(container: ContainerType) {
  // Delay to unmount to avoid React 18 sync warning
  return Promise.resolve().then(() => {
    container[MARK]?.unmount();
    delete container[MARK];
  });
}
