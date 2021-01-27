import { ReactElement } from 'react';
import { LayoutAttrs } from '../Layout/LayoutEnums';

export interface RawNode {
  type: string;
  attrs: { [key: string]: any } & Partial<LayoutAttrs>;
  children: RawNode[];
  props: { [key: string]: any };
}

const getShapeFromReact = (REl: ReactElement): RawNode => {
  if (typeof REl === 'string') {
    return REl;
  }
  if (typeof REl.type === 'string') {
    const data = REl.props['data-attr'] || {};
    const { style: attrs = {}, type, ...props } = data;
    const { children: ochildren } = REl.props;
    if (type === 'text') {
      attrs.text = ochildren.join ? ochildren.join('') : ochildren;
      return {
        type,
        attrs,
        props,
        children: [],
      };
    }
    let children = [];
    if (typeof ochildren === 'object' && ochildren?.length) {
      children = ochildren
        .filter((e: any) => !!e)
        .map((e: ReactElement) => getShapeFromReact(e));
    } else if (ochildren) {
      children = [getShapeFromReact(ochildren)];
    }

    return {
      type,
      attrs,
      props,
      children,
    };
  } else {
    const Element = REl.type as any;
    try {
      return getShapeFromReact(new Element({ ...REl.props }));
    } catch (e) {
      return getShapeFromReact(Element({ ...REl.props }));
    }
  }
};

export default getShapeFromReact;
