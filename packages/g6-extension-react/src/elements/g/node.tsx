import type { DisplayObjectConfig } from '@antv/g';
import { Group } from '@antv/g';
import type { BaseNodeStyleProps } from '@antv/g6';
import { Rect } from '@antv/g6';
import { render } from '@antv/react-g';
import type { FC, ReactNode } from 'react';

export interface GNodeStyleProps extends BaseNodeStyleProps {
  /**
   * <zh/> React 组件
   *
   * <en/> React component
   */
  component: FC;
}

export class GNode extends Rect {
  static defaultStyleProps: Partial<GNodeStyleProps> = {
    halo: false,
    label: false,
    icon: false,
  };

  constructor(options: DisplayObjectConfig<GNodeStyleProps>) {
    super({ ...options, style: { ...GNode.defaultStyleProps, ...options.style } });
  }

  protected drawKeyShape(attributes: Required<GNodeStyleProps>, container: Group): Group | undefined {
    const { component } = attributes;
    const [width, height] = this.getSize();

    return this.upsert('key', Group, { width, height }, container, {
      afterCreate: (dom) => {
        render(component as unknown as ReactNode, dom);
      },
      afterUpdate: (dom) => {
        render(component as unknown as ReactNode, dom);
      },
    });
  }
}
