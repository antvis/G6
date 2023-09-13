import { ComboDisplayModel, ComboModel } from 'types';
import { Group, Tuple3Number } from '@antv/g';
import { clone, throttle } from '@antv/util';
import { DisplayMapper, LodStrategyObj, State } from '../types/item';
import { ComboStyleSet } from '../types/theme';
import { ComboModelData, ComboUserModelData } from '../types/combo';
import { Point } from '../types/common';
import {
  getCircleIntersectByPoint,
  getNearestPoint,
  getRectIntersectByPoint,
} from '../util/point';
import Node from './node';

interface IProps {
  model: ComboModel;
  renderExtensions: any;
  containerGroup: Group;
  mapper?: DisplayMapper;
  stateMapper?: {
    [stateName: string]: DisplayMapper;
  };
  zoom?: number;
  theme: {
    styles: ComboStyleSet;
    lodStrategy: LodStrategyObj;
  };
  device?: any; // for 3d shapes
  onframe?: Function;
  onfinish?: Function;
  getCombinedBounds?: () =>
    | {
        center: Tuple3Number;
        min: Tuple3Number;
        max: Tuple3Number;
        size: Tuple3Number;
      }
    | false;
  getChildren?: () => (Node | Combo)[];
}
export default class Combo extends Node {
  public type: 'combo';
  private anchorPointsCache: Point[] | undefined;

  private cacheCombinedBounds?:
    | {
        center: Tuple3Number;
        min: Tuple3Number;
        max: Tuple3Number;
        size: Tuple3Number;
      }
    | false;

  public getCombinedBounds: () =>
    | {
        center: Tuple3Number;
        min: Tuple3Number;
        max: Tuple3Number;
        size: Tuple3Number;
      }
    | false;

  public getChildren: () => (Combo | Node)[];

  constructor(props: IProps) {
    super({ ...props, type: 'combo' });
  }

  public init(props) {
    this.getCombinedBounds = props.getCombinedBounds;
    this.getChildren = props.getChildren;
    super.init(props);
  }

  public draw(
    displayModel: ComboDisplayModel,
    diffData?: { previous: ComboUserModelData; current: ComboUserModelData },
    diffState?: { previous: State[]; current: State[] },
    animate = true,
    onfinish: Function = () => {},
  ) {
    if (displayModel.data.collapsed) {
      Object.keys(this.themeStyles.collapsed).forEach((shapeId) => {
        displayModel.data[shapeId] = displayModel.data[shapeId] || {};
        displayModel.data[shapeId] = {
          ...(displayModel.data[shapeId] as object),
          ...this.themeStyles.collapsed[shapeId],
        };
        if (this.themeStyles.collapsed[shapeId].contentType === 'childCount') {
          (displayModel.data[shapeId] as any).text = `${
            this.getChildren().length || 0
          }`;
        }
      });
    }
    super.draw(displayModel, diffData, diffState, animate, onfinish);
  }

  /**
   * Sometimes no changes on edge data, but need to re-draw it
   * e.g. source and target nodes' position changed
   */
  public forceUpdate = throttle(
    () => {
      this.updateModelByBounds(this.displayModel as ComboDisplayModel);
      if (!this.destroyed) this.draw(this.displayModel as ComboDisplayModel);
    },
    16,
    {
      leading: true,
      trailing: true,
    },
  );

  /**
   * Maps (mapper will be function, value, or encode format) model to displayModel and find out the shapes to be update for incremental updating.
   * @param model inner model
   * @param diffData changes from graphCore changed event
   * @param isReplace whether replace the whole data or partial update
   * @returns
   */
  public getDisplayModelAndChanges(
    innerModel: ComboModel,
    diffData?: { previous: ComboModelData; current: ComboModelData },
    isReplace?: boolean,
  ): {
    model: ComboDisplayModel;
    typeChange?: boolean;
  } {
    const superResult = super.getDisplayModelAndChanges(
      innerModel,
      diffData,
      isReplace,
    );
    const model = superResult.model as ComboDisplayModel;
    return {
      model: this.updateModelByBounds(model),
      typeChange: superResult.typeChange,
    };
  }

  private updateModelByBounds(model: ComboDisplayModel): ComboDisplayModel {
    const bounds = this.getCombinedBounds();
    this.cacheCombinedBounds = bounds;
    if (bounds) {
      const { size, center } = bounds;
      model.data.x = center[0];
      model.data.y = center[1];
      model.data.z = center[2];
      if (!model.data.collapsed) {
        model.data.keyShape = model.data.keyShape || {};
        const { padding = [0, 0, 0, 0] } = model.data.keyShape;
        const width = size[0] + padding[1] + padding[3];
        const height = size[1] + padding[0] + padding[2];
        model.data.keyShape.width = width;
        model.data.keyShape.height = height;
        model.data.keyShape.r = Math.sqrt(width * width + height * height) / 2;
      }
    }
    return model;
  }

  public getPosition(): Point {
    const { x = 0, y = 0, z = 0 } = this.model.data;
    this.cacheCombinedBounds =
      this.cacheCombinedBounds || this.getCombinedBounds();
    const { center } = this.cacheCombinedBounds || {};
    return center
      ? {
          x: center[0],
          y: center[1],
          z: center[2],
        }
      : {
          x: x as number,
          y: y as number,
          z: z as number,
        };
  }

  public getIntersectPoint(
    point: Point,
    innerPoint: Point,
    anchorPoints: number[][],
  ) {
    const { keyShape } = this.shapeMap;
    const shapeType = keyShape.nodeName;
    const { collapsed, keyShape: keyShapeStyle } = this.displayModel.data;
    const { x, y, z } = innerPoint;
    let intersectPoint: Point | null;
    switch (shapeType) {
      case 'circle':
        intersectPoint = getCircleIntersectByPoint(
          {
            x,
            y,
            r:
              (collapsed ? keyShapeStyle?.r : keyShape.attributes.r) ||
              keyShape.attributes.r,
          },
          point,
        );
        break;
      default: {
        const bbox =
          this.renderExt.boundsCache?.keyShapeLocal ||
          keyShape.getLocalBounds();

        intersectPoint = getRectIntersectByPoint(
          collapsed
            ? {
                x: x - keyShapeStyle.width / 2,
                y: y - keyShapeStyle.height / 2,
                width: keyShapeStyle.width,
                height: keyShapeStyle.height,
              }
            : {
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

  // @ts-ignore
  public clone(
    containerGroup: Group,
    shapeIds?: string[],
    disableAnimate?: boolean,
    getCombinedBounds?: () =>
      | {
          center: Tuple3Number;
          min: Tuple3Number;
          max: Tuple3Number;
          size: Tuple3Number;
        }
      | false,
    getChildren?: () => (Node | Combo)[],
  ) {
    if (shapeIds?.length) {
      const group = new Group();
      shapeIds.forEach((shapeId) => {
        if (!this.shapeMap[shapeId] || this.shapeMap[shapeId].destroyed) return;
        const clonedKeyShape = this.shapeMap[shapeId].cloneNode();
        // TODO: other animating attributes?
        clonedKeyShape.style.opacity =
          this.renderExt.mergedStyles[shapeId]?.opacity || 1;
        group.appendChild(clonedKeyShape);
      });
      group.setPosition(this.group.getPosition());
      containerGroup.appendChild(group);
      return group;
    }
    const clonedModel = clone(this.model);
    clonedModel.data.disableAnimate = disableAnimate;
    const clonedNode = new Combo({
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
      getCombinedBounds: getCombinedBounds || this.getCombinedBounds,
      getChildren: getChildren || this.getChildren,
    });
    Object.keys(this.shapeMap).forEach((shapeId) => {
      if (!this.shapeMap[shapeId].isVisible())
        clonedNode.shapeMap[shapeId].hide();
    });
    return clonedNode;
  }
}
