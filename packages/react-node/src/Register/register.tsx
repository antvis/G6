import React, { ReactElement } from 'react';
import {
  INode,
  IEdge,
  ICombo,
  ModelConfig,
  ShapeOptions,
} from '@antv/g6-core/lib';
import { IGroup, IShape } from '@antv/g-base';
import getShapeFromReact from '@/Register/getDataFromReactNode';
import getPositionUsingYoga, {
  LayoutedNode,
} from '@/Layout/getPositionsUsingYoga';
import { animateShapeWithConfig } from '@/Animation/animate';

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
    if (props.keyShape) {
      keyshape = shape;
    }
    animateShapeWithConfig(shape, props.animation);
  } else {
    g = group.addGroup(props);
    if (!keyshape) {
      keyshape = g;
    }
  }

  if (target.children) {
    const keyshapes = target.children
      .map(n => renderTarget(n, g))
      .filter(e => e);
    keyshape = keyshapes.find(shape => !shape.isGroup()) || keyshape;
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

export function createNodeFromReact(
  Component: React.FC<{ cfg: ModelConfig }>,
): { [key: string]: any } {
  const compileXML = (cfg: ModelConfig) =>
    registerNodeReact(<Component cfg={cfg} />);

  return {
    draw(cfg: ModelConfig | undefined, fatherGroup: IGroup | undefined) {
      const resultTarget = compileXML(cfg || {});
      const keyshape: IShape = renderTarget(resultTarget, fatherGroup);
      return keyshape;
    },
    update(cfg: ModelConfig, node: INode | IEdge | ICombo | undefined) {
      const resultTarget = compileXML(cfg || {});
      if (node) {
        const nodeGroup = node.getContainer();
        const realTarget = getRealStructure(resultTarget);

        diffTarget(nodeGroup, realTarget);
      }
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
        [0.5, 1],
        [0.5, 0],
      ];
    },
  };
}
