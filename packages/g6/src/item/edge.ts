import { Group } from '@antv/g';
import { clone, throttle } from '@antv/util';
import { EdgeDisplayModel, EdgeModel, NodeModelData } from '../types';
import { EdgeModelData } from '../types/edge';
import { DisplayMapper, State, LodStrategyObj } from '../types/item';
import { updateShapes } from '../util/shape';
import { animateShapes } from '../util/animate';
import { EdgeStyleSet } from '../types/theme';
import Item from './item';
import Node from './node';

interface IProps {
  model: EdgeModel;
  renderExtensions: any; // TODO: type
  containerGroup: Group;
  mapper: DisplayMapper;
  stateMapper: {
    [stateName: string]: DisplayMapper;
  };
  sourceItem: Node;
  targetItem: Node;
  zoom?: number;
  theme: {
    styles: EdgeStyleSet;
    lodStrategy: LodStrategyObj;
  };
  onframe?: Function;
}

export default class Edge extends Item {
  public destroyed = false;
  // inner data model
  public model: EdgeModel;
  // display data model
  public displayModel: EdgeDisplayModel;
  /** Set to different value in implements */
  public type: 'edge' = 'edge';
  public sourceItem: Node;
  public targetItem: Node;

  constructor(props: IProps) {
    super(props);
    this.init({ ...props, type: 'edge' });
    const { sourceItem, targetItem } = props;
    this.sourceItem = sourceItem;
    this.targetItem = targetItem;
    this.draw(this.displayModel);
  }
  public draw(
    displayModel: EdgeDisplayModel,
    diffData?: { previous: EdgeModelData; current: EdgeModelData },
    diffState?: { previous: State[]; current: State[] },
    onfinish: Function = () => {},
  ) {
    // get the end points
    const { x: sx, y: sy, z: sz } = this.sourceItem.getPosition();
    const { x: tx, y: ty, z: tz } = this.targetItem.getPosition();
    const sourcePoint = this.sourceItem.getAnchorPoint({ x: tx, y: ty, z: tz });
    const targetPoint = this.targetItem.getAnchorPoint({ x: sx, y: sy, z: sz });
    this.renderExt.mergeStyles(displayModel);
    const firstRendering = !this.shapeMap?.keyShape;
    this.renderExt.setSourcePoint(sourcePoint);
    this.renderExt.setTargetPoint(targetPoint);
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
    if (!disableAnimate && usingAnimates[timing]?.length) {
      this.animations = animateShapes(
        usingAnimates,
        targetStyles, // targetStylesMap
        this.shapeMap, // shapeMap
        this.group,
        firstRendering ? 'buildIn' : 'update',
        this.changedStates,
        this.animateFrameListener,
        () => onfinish(displayModel.id),
      );
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
    sourceItem: Node,
    targetItem: Node,
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
