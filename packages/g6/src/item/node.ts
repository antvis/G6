import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { Point } from '../types/common';
import { ComboDisplayModel, ComboModel, NodeModel } from '../types';
import { DisplayMapper, State, LodStrategyObj } from '../types/item';
import { NodeDisplayModel, NodeModelData } from '../types/node';
import type { ComboStyleSet, NodeStyleSet } from '../types/theme';
import { updateShapes } from '../util/shape';
import { animateShapes, getAnimatesExcludePosition } from '../util/animate';
import {
  getCircleIntersectByPoint,
  getEllipseIntersectByPoint,
  getNearestPoint,
  getRectIntersectByPoint,
} from '../util/point';
import { ComboModelData } from '../types/combo';
import Item from './item';

interface IProps {
  model: NodeModel | ComboModel;
  renderExtensions: any;
  containerGroup: Group;
  mapper?: DisplayMapper;
  stateMapper?: {
    [stateName: string]: DisplayMapper;
  };
  zoom?: number;
  theme: {
    styles: NodeStyleSet | ComboStyleSet;
    lodStrategy: LodStrategyObj;
  };
  device?: any; // for 3d shapes
  onframe?: Function;
  onfinish?: Function;
  type?: 'node' | 'combo';
}
export default class Node extends Item {
  public type: 'node' | 'combo';
  private anchorPointsCache: Point[] | undefined;

  constructor(props: IProps) {
    super(props);
    this.init({ ...props, type: props.type || 'node' });
    this.draw(
      this.displayModel as NodeDisplayModel | ComboDisplayModel,
      undefined,
      undefined,
      props.onfinish,
    );
  }
  public draw(
    displayModel: NodeDisplayModel | ComboDisplayModel,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    diffState?: { previous: State[]; current: State[] },
    onfinish: Function = () => {},
  ) {
    const { group, renderExt, shapeMap: prevShapeMap, model } = this;
    renderExt.mergeStyles(displayModel);

    const firstRendering = !this.shapeMap?.keyShape;
    const shapeMap = renderExt.draw(
      displayModel,
      this.shapeMap,
      diffData,
      diffState,
    );

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(prevShapeMap, shapeMap, group);

    const { animates, disableAnimate, x = 0, y = 0, z = 0 } = displayModel.data;
    if (firstRendering) {
      // first rendering, move the group
      group.setLocalPosition(x, y, z);
    } else {
      // terminate previous animations
      this.stopAnimations();
      this.updatePosition(displayModel, diffData, onfinish);
    }

    const { haloShape } = this.shapeMap;
    haloShape?.toBack();

    super.draw(displayModel, diffData, diffState, onfinish);
    this.anchorPointsCache = undefined;
    renderExt.updateCache(this.shapeMap);

    if (firstRendering) {
      // update the transform
      renderExt.onZoom(this.shapeMap, this.zoom);
    }

    // handle shape's and group's animate
    if (!disableAnimate && animates) {
      const animatesExcludePosition = getAnimatesExcludePosition(animates);
      this.animations = animateShapes(
        animatesExcludePosition, // animates
        renderExt.mergedStyles, // targetStylesMap
        this.shapeMap, // shapeMap
        group,
        firstRendering ? 'buildIn' : 'update',
        this.changedStates,
        this.animateFrameListener,
        () => onfinish(model.id),
      );
    }
  }

  public update(
    model: NodeModel,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    isReplace?: boolean,
    theme?: {
      styles: NodeStyleSet;
      lodStrategy: LodStrategyObj;
    },
    onlyMove?: boolean,
    onfinish?: Function,
  ) {
    super.update(model, diffData, isReplace, theme, onlyMove, onfinish);
  }

  /**
   * Update the node's position,
   * do not update other styles which leads to better performance than updating position by updateData.
   */
  public updatePosition(
    displayModel: NodeDisplayModel | ComboDisplayModel,
    diffData?: {
      previous: NodeModelData | ComboModelData;
      current: NodeModelData | ComboModelData;
    },
    onfinish: Function = () => {},
  ) {
    const { group } = this;
    const { x, y, z = 0, animates, disableAnimate } = displayModel.data;
    if (isNaN(x as number) || isNaN(y as number) || isNaN(z)) return;
    if (!disableAnimate && animates?.update) {
      const groupAnimates = animates.update.filter(
        ({ shapeId, fields = [] }) =>
          (!shapeId || shapeId === 'group') &&
          (fields.includes('x') || fields.includes('y')),
      );
      if (groupAnimates.length) {
        animateShapes(
          { update: groupAnimates },
          { group: { x, y, z } } as any, // targetStylesMap
          this.shapeMap, // shapeMap
          group,
          'update',
          [],
          this.animateFrameListener,
          () => onfinish(displayModel.id),
        );
        return;
      }
    }
    group.setLocalPosition(x, y, z);
  }

  public clone(
    containerGroup: Group,
    onlyKeyShape?: boolean,
    disableAnimate?: boolean,
  ) {
    if (onlyKeyShape) {
      const clonedKeyShape = this.shapeMap.keyShape.cloneNode();
      const { x, y } = this.group.attributes;
      const clonedGroup = new Group();
      clonedGroup.setPosition([x, y]);
      clonedGroup.appendChild(clonedKeyShape);
      containerGroup.appendChild(clonedGroup);
      return clonedGroup;
    }
    const clonedModel = clone(this.model);
    clonedModel.data.disableAnimate = disableAnimate;
    const clonedNode = new Node({
      model: clonedModel,
      renderExtensions: this.renderExtensions,
      containerGroup,
      mapper: this.mapper,
      stateMapper: this.stateMapper,
      zoom: this.zoom,
      theme: {
        styles: this.themeStyles,
        lodStrategy: this.lodStrategy,
      },
    });
    Object.keys(this.shapeMap).forEach((shapeId) => {
      if (!this.shapeMap[shapeId].isVisible())
        clonedNode.shapeMap[shapeId].hide();
    });
    return clonedNode;
  }

  public getAnchorPoint(point: Point) {
    const { anchorPoints = [] } = this.model.data as
      | NodeModelData
      | ComboModelData;

    return this.getIntersectPoint(point, this.getPosition(), anchorPoints);
  }

  public getIntersectPoint(
    point: Point,
    innerPoint: Point,
    anchorPoints: number[][],
  ) {
    const { keyShape } = this.shapeMap;
    const shapeType = keyShape.nodeName;
    const { x, y, z } = innerPoint;
    let intersectPoint: Point | null;
    switch (shapeType) {
      case 'circle':
        intersectPoint = getCircleIntersectByPoint(
          {
            x,
            y,
            r: keyShape.attributes.r,
          },
          point,
        );
        break;
      case 'ellipse':
        intersectPoint = getEllipseIntersectByPoint(
          {
            x,
            y,
            rx: keyShape.attributes.rx,
            ry: keyShape.attributes.ry,
          },
          point,
        );
        break;
      case 'mesh':
        intersectPoint = innerPoint;
        break;
      default: {
        const bbox =
          this.renderExt.boundsCache?.keyShapeLocal ||
          keyShape.getLocalBounds();
        intersectPoint = getRectIntersectByPoint(
          {
            x: x + bbox.min[0],
            y: y + bbox.min[1],
            width: bbox.max[0] - bbox.min[0],
            height: bbox.max[1] - bbox.min[1],
          },
          point,
        );
      }
    }

    let anchorPointsPositions = this.anchorPointsCache;
    if (!anchorPointsPositions) {
      const keyShapeBBox =
        this.renderExt.boundsCache?.keyShapeLocal ||
        this.shapeMap.keyShape.getLocalBounds();
      const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
      const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
      anchorPointsPositions = anchorPoints.map((pointRatio) => {
        const [xRatio, yRatio] = pointRatio;
        return {
          x: keyShapeWidth * (xRatio - 0.5) + x,
          y: keyShapeHeight * (yRatio - 0.5) + y,
        };
      });
      this.anchorPointsCache = anchorPointsPositions;
    }

    let linkPoint = intersectPoint;
    // If the node has anchorPoints in the data, find the nearest anchor point.
    if (anchorPoints.length) {
      if (!linkPoint) {
        // If the linkPoint is failed to calculate.
        linkPoint = point;
      }
      linkPoint = getNearestPoint(
        anchorPointsPositions,
        linkPoint,
      ).nearestPoint;
    }
    if (!linkPoint) {
      // If the calculations above are all failed, return the data's position
      return { x, y };
    }
    return linkPoint;
  }

  public getPosition(): Point {
    const { x = 0, y = 0, z = 0 } = this.model.data;
    return { x: x as number, y: y as number, z: z as number };
  }
}
