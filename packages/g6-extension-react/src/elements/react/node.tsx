import type { HTMLStyleProps as GHTMLStyleProps } from '@antv/g';
import type { BaseNodeStyleProps, HTMLStyleProps } from '@antv/g6';
import { HTML } from '@antv/g6';
import type { FC, ReactNode as IReactNode } from 'react';
import type { Root } from 'react-dom/client';
import { createRoot } from 'react-dom/client';

export type ReactNodeStyleProps = BaseNodeStyleProps<{ component: FC }>;

export class ReactNode extends HTML {
  private root!: Root;

  protected getKeyStyle(attributes: Required<HTMLStyleProps>): GHTMLStyleProps {
    return { ...super.getKeyStyle(attributes) };
  }

  public connectedCallback() {
    super.connectedCallback();
    this.root = createRoot(this.getDomElement());
    const { component } = this.attributes as unknown as ReactNodeStyleProps;
    // component 已经被回调机制自动创建为 ReactNode
    // component has been automatically created as ReactNode by the callback mechanism
    this.root.render(component as unknown as IReactNode);
  }

  public attributeChangedCallback(name: any, oldValue: any, newValue: any) {
    if (name === 'component' && oldValue !== newValue) {
      this.root.render((this.attributes as unknown as ReactNodeStyleProps).component as unknown as IReactNode);
    }
  }

  public onDestroy() {
    this.root.unmount();
    super.onDestroy();
  }
}
