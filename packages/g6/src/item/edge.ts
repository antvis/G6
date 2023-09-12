import { Circle, Group } from '@antv/g';
import { clone, throttle } from '@antv/util';
import { EdgeDisplayModel, EdgeModel, ID } from '../types';
import { EdgeModelData } from '../types/edge';
import { DisplayMapper, State, LodStrategyObj } from '../types/item';
import { updateShapes } from '../util/shape';
import { animateShapes } from '../util/animate';
import { EdgeStyleSet } from '../types/theme';
import { isSamePoint, getNearestPoint } from '../util/point';
import Item from './item';
import Node from './node';
import Combo from './combo';

interface IProps {
  model: EdgeModel;
  renderExtensions: any; // TODO: type
  containerGroup: Group;
  mapper?: DisplayMapper;
  stateMapper?: {
    [stateName: string]: DisplayMapper;
  };
  sourceItem: Node | Combo;
  targetItem: Node | Combo;
  zoom?: number;
  theme: {
    styles: EdgeStyleSet;
    lodStrategy: LodStrategyObj;
  };
  onframe?: Function;
  nodeMap?: Map<ID, Node>;
  delayFirstDraw?: boolean;
}

export default class Edge extends Item {
  public destroyed = false;
  // inner data model
  public model: EdgeModel;
  // display data model
  public displayModel: EdgeDisplayModel;
  /** Set to different value in implements */
  public type = 'edge' as const;
  public nodeMap: Map<ID, Node>;
  public sourceItem: Node | Combo;
  public targetItem: Node | Combo;

  constructor(props: IProps) {
    super(props);
    this.init({ ...props, type: 'edge' });
    const { sourceItem, targetItem, nodeMap } = props;
    this.sourceItem = sourceItem;
    this.targetItem = targetItem;
    this.nodeMap = nodeMap;
    // todo: combo
    if (sourceItem.getType() === 'node') {
      this.nodeMap.set(sourceItem.getID(), sourceItem as Node);
    }
    if (sourceItem.getType() === 'node') {
      this.nodeMap.set(targetItem.getID(), targetItem as Node);
    }
    if (!props.delayFirstDraw) {
      this.draw(this.displayModel);
    }
  }
  public draw(
    displayModel: EdgeDisplayModel,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
    animate = true,
    onfinish: Function = () => {},
  ) {
    // get the point near the other end
    const { sourceAnchor, targetAnchor, keyShape } = displayModel.data;
    const sourcePosition = this.sourceItem.getPosition();
    const targetPosition = this.targetItem.getPosition();

    let targetPrevious = sourcePosition;
    let sourcePrevious = targetPosition;

    // TODO: type
    // @ts-ignore
    if (keyShape?.controlPoints?.length) {
      // @ts-ignore
      const controlPointsBesideEnds = keyShape.controlPoints.filter(
        (point) =>
          !isSamePoint(point, sourcePosition) &&
          !isSamePoint(point, targetPosition),
      );
      sourcePrevious = getNearestPoint(
        controlPointsBesideEnds,
        sourcePosition,
      ).nearestPoint;
      targetPrevious = getNearestPoint(
        controlPointsBesideEnds,
        targetPosition,
      ).nearestPoint;
    }
    const sourcePoint = this.sourceItem.getAnchorPoint(
      sourcePrevious,
      sourceAnchor,
    );
    const targetPoint = this.targetItem.getAnchorPoint(
      targetPrevious,
      targetAnchor,
    );
    this.renderExt.mergeStyles(displayModel);
    const firstRendering = !this.shapeMap?.keyShape;
    this.renderExt.setSourcePoint(sourcePoint);
    this.renderExt.setTargetPoint(targetPoint);
    this.renderExt.setNodeMap(this.nodeMap);

    const shapeMap = this.renderExt.draw(
      displayModel,
      sourcePoint,
      targetPoint,
      this.shapeMap,
      diffData,
      diffState,
    );

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(this.shapeMap, shapeMap, this.group);

    // handle shape's and group's animate
    const { animates, disableAnimate } = displayModel.data;
    const usingAnimates = { ...animates };
    const targetStyles = this.renderExt.mergedStyles;
    const { haloShape, labelShape } = this.shapeMap;
    haloShape?.toBack();
    labelShape?.toFront();

    super.draw(displayModel, diffData, diffState);
    this.renderExt.updateCache(this.shapeMap);

    if (firstRendering) {
      // update the transform
      this.renderExt.onZoom(this.shapeMap, this.zoom);
    } else {
      // terminate previous animations
      this.stopAnimations();
    }

    const timing = firstRendering ? 'buildIn' : 'update';
    // handle shape's animate
    if (animate && !disableAnimate && usingAnimates[timing]?.length) {
      this.animations = animateShapes(
        usingAnimates,
        targetStyles, // targetStylesMap
        this.shapeMap, // shapeMap
        this.group,
        firstRendering ? 'buildIn' : 'update',
        this.changedStates,
        this.animateFrameListener,
        (canceled) => onfinish(displayModel.id, canceled),
      );
    }

    if (firstRendering && !this.visible) {
      this.visible = true;
      this.hide(false);
    }
  }

  /**
   * Sometimes no changes on edge data, but need to re-draw it
   * e.g. source and target nodes' position changed
   */
  public forceUpdate = throttle(
    () => {
      if (!this.destroyed) this.draw(this.displayModel);
    },
    16,
    {
      leading: true,
      trailing: true,
    },
  );

  /**
   * Update end item for item and re-draw the edge
   * @param type update source or target
   * @param endItem new item to ended
   */
  public updateEnd(type: 'source' | 'target', endItem: Node) {
    if (type === 'source') this.sourceItem = endItem;
    else if (type === 'target') this.targetItem = endItem;
    this.draw(this.displayModel);
  }

  // public update(model: EdgeModel) {
  //   super.update(model);
  // }

  public clone(
    containerGroup: Group,
    sourceItem: Node | Combo,
    targetItem: Node | Combo,
    onlyKeyShape?: boolean,
    disableAnimate?: boolean,
  ) {
    if (onlyKeyShape) {
      const clonedKeyShape = this.shapeMap.keyShape.cloneNode();
      const clonedGroup = new Group();
      clonedGroup.appendChild(clonedKeyShape);
      containerGroup.appendChild(clonedGroup);
      return clonedGroup;
    }
    const clonedModel = clone(this.model);
    clonedModel.data.disableAnimate = disableAnimate;
    const clonedEdge = new Edge({
      model: clonedModel,
      renderExtensions: this.renderExtensions,
      sourceItem,
      targetItem,
      nodeMap: this.nodeMap,
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
        clonedEdge.shapeMap[shapeId]?.hide();
    });
    return clonedEdge;
  }
}
