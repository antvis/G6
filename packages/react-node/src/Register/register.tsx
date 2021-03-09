import React, { ReactElement } from 'react';
import { Item, ModelConfig, ShapeOptions } from '@antv/g6-core/lib';
import { IGroup } from '@antv/g-base';
import getShapeFromReact from '@/Register/getDataFromReactNode';
import getPositionUsingYoga, {
  LayoutedNode,
} from '@/Layout/getPositionsUsingYoga';

export const registerNodeReact = (el: ReactElement) => {
  const result = getShapeFromReact(el);
  const target = getPositionUsingYoga(result);
  return target;
};

const renderTarget = (target: LayoutedNode, group: any) => {
  let g = group;
  let keyshape = group;
  const { attrs = {}, boundaryBox, type, children, props } = target;
  if (target.type !== 'group') {
    const shape = group.addShape(target.type, {
      attrs,
      origin: {
        boundaryBox,
        type,
        children,
      },
      ...props,
    });
    keyshape = shape;
  } else {
    g = group.addGroup(props);
    keyshape = g;
  }

  if (target.children) {
    const keyshapes = target.children
      .map((n) => renderTarget(n, g))
      .filter((e) => e);
    if (keyshapes.length) {
      keyshape = keyshapes.pop();
    }
  }
  return keyshape;
};

const getRealStructure = (target: LayoutedNode): LayoutedNode[] => {
  const { children } = target;
  target.children = [];
  let realChildren: LayoutedNode[] = [];
  for (let i = 0; i < children.length; i += 1) {
    const result = getRealStructure(children[i]);
    realChildren = realChildren.concat(result);
  }
  if (target.type !== 'group') {
    return [target, ...realChildren];
  } else {
    target.children = realChildren;
    return [target];
  }
};

const diffTarget = (container: IGroup, shapeArr: LayoutedNode[]) => {
  const childrenList = [...container.getChildren()];

  for (let i = 0; i < childrenList.length; i += 1) {
    const lastShape = childrenList[i];
    const nowShape = shapeArr[i];

    if (!nowShape) {
      container.removeChild(lastShape, true);
    } else if (!lastShape) {
      renderTarget(nowShape, container);
    } else if (lastShape.cfg.type !== nowShape.type) {
      container.removeChild(lastShape, true);
      renderTarget(nowShape, container);
    } else {
      if (nowShape.props) {
        lastShape.cfg = {
          ...lastShape.cfg,
          ...nowShape.props,
        };
      }
      if (nowShape.attrs && lastShape.attr) {
        lastShape.attr(nowShape.attrs);
      }
      if (nowShape.type === 'group') {
        diffTarget(lastShape as IGroup, nowShape.children);
      }
    }
  }
};

export function createNodeFromReact(Component: React.FC<{ cfg: ModelConfig }>) {
  const compileXML = (cfg: ModelConfig) =>
    registerNodeReact(<Component cfg={cfg} />);

  return {
    draw(cfg: ModelConfig, fatherGroup: any) {
      const resultTarget = compileXML(cfg || {});
      let keyshape = fatherGroup;
      keyshape = renderTarget(resultTarget, fatherGroup);
      return keyshape;
    },
    update(cfg: ModelConfig, node: Item) {
      const resultTarget = compileXML(cfg || {});
      const nodeGroup = node.getContainer();
      const realTarget = getRealStructure(resultTarget);

      diffTarget(nodeGroup, realTarget);
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
        [0.5, 1],
        [0.5, 0],
      ];
    },
  } as ShapeOptions;
}
