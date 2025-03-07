import type { DisplayObjectConfig, HTMLStyleProps as GHTMLStyleProps } from '@antv/g';
import type { BaseNodeStyleProps, HTMLStyleProps } from '@antv/g6';
import { HTML } from '@antv/g6';
import type { FC, ReactElement } from 'react';
import { render, unmount } from './render';

export interface ReactNodeStyleProps extends BaseNodeStyleProps {
  /**
   * <zh/> React 组件
   *
   * <en/> React component
   */
  component: FC;
}

export class ReactNode extends HTML {
  protected getKeyStyle(attributes: Required<HTMLStyleProps>): GHTMLStyleProps {
    return { ...super.getKeyStyle(attributes) };
  }

  constructor(options: DisplayObjectConfig<ReactNodeStyleProps>) {
    super(options as any);
  }

  public update(attr?: Partial<ReactNodeStyleProps> | undefined): void {
    super.update(attr);
  }

  public connectedCallback() {
    super.connectedCallback();
    // this.root = createRoot(this.getDomElement());
    const { component } = this.attributes as unknown as ReactNodeStyleProps;
    // component 已经被回调机制自动创建为 ReactNode
    // component has been automatically created as ReactNode by the callback mechanism
    render(component as unknown as ReactElement, this.getDomElement());
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'component' && oldValue !== newValue) {
      render(
        (this.attributes as unknown as ReactNodeStyleProps).component as unknown as ReactElement,
        this.getDomElement(),
      );
    }
  }

  public destroy(): void {
    unmount(this.getDomElement());
    super.destroy();
  }
}
