import { Group } from '@antv/g';
import { clone } from '@antv/util';
import { Point } from '../types/common';
import { NodeModel } from '../types';
import { DisplayMapper, State } from '../types/item';
import { NodeDisplayModel, NodeModelData } from '../types/node';
import { NodeStyleSet } from '../types/theme';
import { updateShapes } from '../util/shape';
import Item from './item';
import {
  getCircleIntersectByPoint,
  getEllipseIntersectByPoint,
  getNearestPoint,
  getRectIntersectByPoint,
} from 'util/point';

interface IProps {
  model: NodeModel;
  renderExtensions: any;
  containerGroup: Group;
  mapper: DisplayMapper;
  stateMapper: {
    [stateName: string]: DisplayMapper;
  };
  themeStyles: NodeStyleSet;
  device?: any; // for 3d shapes
}
export default class Node extends Item {
  public type: 'node';
  private anchorPointsCache: Point[];

  constructor(props: IProps) {
    super(props);
    this.type = 'node';
    this.init(props);
    this.draw(this.displayModel as NodeDisplayModel);
  }
  public draw(
    displayModel: NodeDisplayModel,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ) {
    const { group, renderExt, shapeMap: prevShapeMap, model } = this;
    const { data } = displayModel;
    const { x = 0, y = 0, z = 0 } = data;
    group.setPosition(x as number, y as number, z as number);
    this.group.setAttribute('data-item-type', 'node');
    this.group.setAttribute('data-item-id', model.id);
    renderExt.mergeStyles(displayModel);
    const shapeMap = renderExt.draw(
      displayModel,
      this.shapeMap,
      diffData,
      diffState,
    );

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(prevShapeMap, shapeMap, group);
    const { haloShape, labelShape, labelBackgroundShape } = this.shapeMap;
    haloShape?.toBack();
    labelShape?.toFront();
    labelBackgroundShape?.toBack();

    super.draw(displayModel, diffData, diffState);
    this.anchorPointsCache = undefined;
  }

  public update(
    model: NodeModel,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    isReplace?: boolean,
    themeStyles?: NodeStyleSet,
  ) {
    super.update(model, diffData, isReplace, themeStyles);
    const { data } = this.displayModel;
    const { x = 0, y = 0 } = data;
    this.group.style.x = x;
    this.group.style.y = y;
  }

  public clone(containerGroup: Group, onlyKeyShape?: boolean) {
    if (onlyKeyShape) {
      const clonedKeyShape = this.shapeMap.keyShape.cloneNode();
      const { x, y } = this.group.attributes;
      const clonedGroup = new Group();
      clonedGroup.setPosition([x, y]);
      clonedGroup.appendChild(clonedKeyShape);
      containerGroup.appendChild(clonedGroup);
      return clonedGroup;
    }
    return new Node({
      model: clone(this.model),
      renderExtensions: this.renderExtensions,
      containerGroup,
      mapper: this.mapper,
      stateMapper: this.stateMapper,
      themeStyles: clone(this.themeStyles),
    });
  }

  public getAnchorPoint(point: Point) {
    const { keyShape } = this.shapeMap;
    const shapeType = keyShape.nodeName;
    const { x, y, anchorPoints = [] } = this.model.data as NodeModelData;

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
      default:
        const bbox =
          this.renderExt.boundsCache?.keyShapeLocal ||
          keyShape.getLocalBounds();
        intersectPoint = getRectIntersectByPoint(
          {
            x: bbox.halfExtents[0],
            y: bbox.halfExtents[1],
            width: bbox.max[0] - bbox.min[0],
            height: bbox.max[1] - bbox.min[1],
          },
          point,
        );
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
}
