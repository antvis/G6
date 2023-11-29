import { Group } from '@antv/g';
import { clone, throttle } from '@antv/util';
import { EdgeDisplayModel, EdgeModel, ID, IGraph, Point } from '../types';
import { EdgeModelData } from '../types/edge';
import { DisplayMapper, State, LodLevelRanges } from '../types/item';
import { updateShapes } from '../util/shape';
import { animateShapes } from '../util/animate';
import { EdgeStyleSet } from '../types/theme';
import { isSamePoint, getNearestPoint } from '../util/point';
import { isPolylineWithObstacleAvoidance } from '../util/polyline';
import Item from './item';
import Node from './node';
import Combo from './combo';

interface IProps {
  graph: IGraph;
  model: EdgeModel;
  renderExtensions: any; // TODO: type
  containerGroup: Group;
  labelContainerGroup?: Group; // TODO: optional?
  mapper?: DisplayMapper;
  stateMapper?: {
    [stateName: string]: DisplayMapper;
  };
  sourceItem: Node | Combo;
  targetItem: Node | Combo;
  zoom?: number;
  theme: {
    styles: EdgeStyleSet;
    lodLevels: LodLevelRanges;
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

  /** Caches to avoid unnecessary calculations. */
  private cache: {
    sourcePositionCache?: Point;
    targetPositionCache?: Point;
    controlPointsCache?: Point;
    sourcePointCache?: Point;
    targetPointCache?: Point;
  } = {};

  constructor(props: IProps) {
    super(props);
    this.init({ ...props, type: 'edge' });
    const { sourceItem, targetItem, nodeMap } = props;
    this.sourceItem = sourceItem;
    this.targetItem = targetItem;
    this.nodeMap = nodeMap;
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
    const { sourcePoint, targetPoint } = this.getEndPoints(displayModel);
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
    if (this.shapeMap.labelShape) {
      this.shapeMap.labelShape.attributes.dataIsLabel = true;
    }
    if (this.shapeMap.labelBackgroundShape) {
      this.shapeMap.labelBackgroundShape.attributes.dataIsLabelBackground =
        true;
    }

    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(
      this.shapeMap,
      { ...shapeMap, ...this.afterDrawShapeMap },
      this.group,
      this.labelGroup,
    );

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
      const { current = [], previous = [] } = diffState || {};
      this.animations = animateShapes(
        usingAnimates,
        targetStyles, // targetStylesMap
        this.shapeMap, // shapeMap
        undefined,
        [this.group, this.labelGroup],
        firstRendering ? 'buildIn' : 'update',
        current.concat(previous).map((state) => state.name) ||
          this.changedStates,
        this.animateFrameListener,
        (canceled) => onfinish(displayModel.id, canceled),
      );
    }

    if (firstRendering && !this.visible) {
      this.visible = true;
      this.hide(false);
    }
    this.changedStates = [];
    this.updateLabelPosition(true);
  }

  /**
   * Sometimes no changes on edge data, but need to re-draw it
   * e.g. source and target nodes' position changed
   * @param force bypass the nodes position change check and force to re-draw
   */
  public forceUpdate() {
    if (this.destroyed || !this.shapeMap.keyShape) return;
    const force = isPolylineWithObstacleAvoidance(this.displayModel);
    const { sourcePoint, targetPoint, changed } = this.getEndPoints(
      this.displayModel,
    );
    if (!force && !changed) return;
    this.renderExt.setSourcePoint(sourcePoint);
    this.renderExt.setTargetPoint(targetPoint);
    const shapeMap = this.renderExt.draw(
      this.displayModel,
      sourcePoint,
      targetPoint,
      this.shapeMap,
    );
    if (shapeMap.labelShape) {
      shapeMap.labelShape.attributes.dataIsLabel = true;
    }
    if (shapeMap.labelBackgroundShape) {
      shapeMap.labelBackgroundShape.attributes.dataIsLabelBackground = true;
    }
    // add shapes to group, and update shapeMap
    this.shapeMap = updateShapes(
      this.shapeMap,
      shapeMap,
      this.group,
      this.labelGroup,
    );
    this.labelGroup.children
      .filter((element) => element.attributes.dataIsLabel)
      .forEach((shape) => (shape.attributes.dataOriginPosition = ''));
    this.updateLabelPosition();
  }

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

  /**
   * Calculate the source and target points according to the source and target nodes and the anchorPoints and controlPoints.
   * @param displayModel
   * @returns
   */
  private getEndPoints(displayModel: EdgeDisplayModel) {
    // get the point near the other end
    const { sourceAnchor, targetAnchor, keyShape } = displayModel.data;
    const sourcePosition = this.sourceItem.getPosition();
    const targetPosition = this.targetItem.getPosition();

    if (
      !this.shouldUpdatePoints(
        sourcePosition,
        targetPosition,
        // @ts-ignore
        keyShape?.controlPoints,
      )
    ) {
      return {
        sourcePoint: this.cache.sourcePointCache,
        targetPoint: this.cache.targetPointCache,
        changed: false,
      };
    }

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
    this.cache.sourcePointCache = this.sourceItem.getAnchorPoint(
      sourcePrevious,
      sourceAnchor,
    );
    this.cache.targetPointCache = this.targetItem.getAnchorPoint(
      targetPrevious,
      targetAnchor,
    );
    return {
      sourcePoint: this.cache.sourcePointCache,
      targetPoint: this.cache.targetPointCache,
      changed: true,
    };
  }

  /**
   * Returns false if the source, target, controlPoints are not changed, avoiding unnecessary computations.
   * @param sourcePosition
   * @param targetPosition
   * @param controlPoints
   * @returns
   */
  private shouldUpdatePoints(sourcePosition, targetPosition, controlPoints) {
    const isComboEnd =
      this.sourceItem.type === 'combo' || this.targetItem.type === 'combo';
    const changed =
      !(
        isSamePoint(sourcePosition, this.cache.sourcePositionCache) &&
        isSamePoint(targetPosition, this.cache.targetPositionCache) &&
        controlPoints === this.cache.controlPointsCache
      ) || isComboEnd;
    if (changed) {
      this.cache.sourcePositionCache = sourcePosition;
      this.cache.targetPositionCache = targetPosition;
      this.cache.controlPointsCache = controlPoints;
    }
    return changed;
  }

  /**
   * Update label positions on label canvas by getting viewport position from transformed canvas position.
   */
  public updateLabelPosition(ignoreVisibility?: boolean) {
    const { graph, labelGroup } = this;
    if (!ignoreVisibility && this.labelGroup.style.visibility === 'hidden') {
      return;
    }
    const zoom = graph.getZoom();
    labelGroup.children.forEach((shape) => {
      if (shape.attributes.dataIsLabelBackground) {
        this.renderExt.drawLabelBackgroundShape(
          this.displayModel,
          this.shapeMap,
        );
        return;
      }
      if (shape.attributes.dataIsLabel) {
        const { maxWidth } = this.renderExt.mergedStyles[shape.id] || {};
        if (maxWidth) {
          if (!shape.attributes.dataOriginWordWrapWidth) {
            shape.attributes.dataOriginWordWrapWidth =
              shape.style.wordWrapWidth;
          }
          shape.style.wordWrapWidth =
            shape.attributes.dataOriginWordWrapWidth * zoom;
        }
      }
      if (!shape.attributes.dataOriginPosition) {
        shape.attributes.dataOriginPosition = {
          x: shape.style.x,
          y: shape.style.y,
          z: shape.style.z,
        };
      }
      const viewportPosition = graph.getViewportByCanvas(
        shape.attributes.dataOriginPosition,
      );
      shape.style.x = viewportPosition.x;
      shape.style.y = viewportPosition.y;
      shape.style.z = viewportPosition.z;
    });
  }

  private throttleUpdateWordWidth = throttle(
    (zoom, shape) => {
      const { maxWidth } = this.renderExt.mergedStyles[shape.id] || {};
      if (maxWidth) {
        if (!shape.attributes.dataOriginWordWrapWidth) {
          shape.attributes.dataOriginWordWrapWidth = shape.style.wordWrapWidth;
        }
        shape.style.wordWrapWidth =
          shape.attributes.dataOriginWordWrapWidth * zoom;
      }
    },
    50,
    {
      leading: false,
      trailing: true,
    },
  );

  public clone(
    containerGroup: Group,
    labelContainerGroup: Group,
    sourceItem: Node | Combo,
    targetItem: Node | Combo,
    shapeIds?: string[],
    disableAnimate?: boolean,
    visible?: boolean,
    transientItemMap?: Map<ID, Node | Edge | Combo | Group>,
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
      containerGroup.appendChild(group);
      return group;
    }
    const clonedModel = clone(this.model);
    clonedModel.data.disableAnimate = disableAnimate;

    // `nodeMap` stores real nodes and transient nodes
    if (transientItemMap) {
      this.nodeMap.forEach((node, id) => {
        const transientItem = transientItemMap.get(id) as Node;
        if (
          !transientItem ||
          !transientItem.isVisible() ||
          transientItem.type !== 'node'
        )
          return;
        this.nodeMap.set(id, transientItem);
      });
    }

    const clonedEdge = new Edge({
      model: clonedModel,
      graph: this.graph,
      renderExtensions: this.renderExtensions,
      sourceItem,
      targetItem,
      nodeMap: this.nodeMap,
      containerGroup,
      labelContainerGroup,
      mapper: this.mapper,
      stateMapper: this.stateMapper,
      zoom: this.zoom,
      theme: {
        styles: this.themeStyles,
        lodLevels: this.lodLevels,
      },
    });
    if (visible) return clonedEdge;
    Object.keys(this.shapeMap).forEach((shapeId) => {
      if (!this.shapeMap[shapeId].isVisible()) {
        clonedEdge.shapeMap[shapeId].hide();
      } else {
        clonedEdge.shapeMap[shapeId].show();
      }
    });
    return clonedEdge;
  }
}
