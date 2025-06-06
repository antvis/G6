import type { Component } from 'solid-js';
import { render as solidRender } from 'solid-js/web';

// Track disposal functions for cleanup
const MARK = '__solid_dispose__';

type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: () => void;
};

/**
 * <zh/> 渲染 SolidJS 组件
 *
 * <en/> Render SolidJS component
 * @param component - <zh/> SolidJS 组件 | <en/> SolidJS component
 * @param container - <zh/> 容器 | <en/> Container
 */
export function render(component: Component, container: ContainerType) {
  // Clean up any existing component first
  if (container[MARK]) {
    container[MARK]();
    delete container[MARK];
  }

  // Render the new component and store the disposal function
  const dispose = solidRender(component, container);
  container[MARK] = dispose;
}

/**
 * <zh/> 卸载 SolidJS 组件
 *
 * <en/> Unmount SolidJS component
 * @param container - <zh/> 容器 | <en/> Container
 */
export function unmount(container: ContainerType) {
  if (container[MARK]) {
    container[MARK]();
    delete container[MARK];
  }
}
