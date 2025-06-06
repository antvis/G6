import type { DisplayObjectConfig, HTMLStyleProps as GHTMLStyleProps } from '@antv/g';
import type { BaseNodeStyleProps, HTMLStyleProps } from '@antv/g6';
import { HTML } from '@antv/g6';
import type { Component, JSX } from 'solid-js';
import { render, unmount } from './render';

export interface SolidNodeStyleProps extends BaseNodeStyleProps {
  /**
   * <zh/> SolidJS 组件
   *
   * <en/> SolidJS component
   */
  component: Component;
}

export class SolidNode extends HTML {
  

  protected getKeyStyle(attributes: Required<HTMLStyleProps>): GHTMLStyleProps {
    return { ...super.getKeyStyle(attributes) };
  }

  constructor(options: DisplayObjectConfig<SolidNodeStyleProps>) {
    super(options as any);
  }

  public update(attr?: Partial<SolidNodeStyleProps> | undefined): void {
    super.update(attr);
  }

  public connectedCallback() {
    super.connectedCallback();
    const { component } = this.attributes as unknown as SolidNodeStyleProps;
    // component 已经被回调机制自动创建为 SolidNode
    // component has been automatically created as SolidNode by the callback mechanism
    render(component, this.getDomElement());
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'component' && oldValue !== newValue) {
      render(
        (this.attributes as unknown as SolidNodeStyleProps).component,
        this.getDomElement(),
      );
    }
  }

  public destroy(): void {
    unmount(this.getDomElement());
    super.destroy();
  }
}
