import { DisplayObject } from '@antv/g';
import { each } from '@antv/util';
import { NodeDisplayModel } from '../../../types';
import { ShapeStyle, State } from '../../../types/item';
import {
  NodeModelData,
  NodeShapeMap,
  NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';

const defaultDonutPalette = [
  '#61DDAA',
  '#65789B',
  '#F6BD16',
  '#7262FD',
  '#78D3F8',
  '#9661BC',
  '#F6903D',
  '#008685',
  '#F08BB4',
];

type DonutAttrs = {
  [propKey: string]: number;
};

type DonutColorMap = {
  [propKey: string]: string;
};

type DonutNodeDisplayModel = NodeDisplayModel & {
  donutShapes: ShapeStyle & {
    innerSize: number;
    attrs: DonutAttrs;
    colorMap: DonutColorMap;
  };
};

type DonutSegmentValue = {
  key: string; // key of the fan, came from the key of corresponding property of donutAttrs
  value: number; // format number value of the single fan
  color: string; // color from corresponding position of donutColorMap
};

type DonutSegmentConfig = {
  arcR: number; // the radius of the fan
  beginAngle: number; // the beginning angle of the arc
  config: DonutSegmentValue; // value and color of the fan
  index: number; // the index of the fan at the donut fans array
  lineWidth: number; // width of the segment determining the inner size
  zIndex: number; // shape zIndex
  totalValue: number; // the total value of the donut configs
  drawWhole?: boolean; // whether draw a arc with radius 2*PI to represent a circle
};

export class DonutNode extends BaseNode {
  override defaultStyles = {
    keyShape: {
      r: 16,
      x: 0,
      y: 0,
    },
    donutShapes: {
      innerSize: 0.6,
      attrs: {},
      colorMap: {},
      zIndex: 1,
    },
  };
  mergedStyles: NodeShapeStyles;
  constructor(props) {
    super(props);
    // suggest to merge default styles like this to avoid style value missing
    // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
  }
  public draw(
    model: DonutNodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): NodeShapeMap {
    const { data = {} } = model;
    let shapes: NodeShapeMap = { keyShape: undefined };

    // keyShape
    shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData, diffState);

    // haloShape
    if (data.haloShape && this.drawHaloShape) {
      shapes.haloShape = this.drawHaloShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // labelShape
    if (data.labelShape) {
      shapes.labelShape = this.drawLabelShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // labelBackgroundShape
    if (data.labelBackgroundShape) {
      shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // anchor shapes
    if (data.anchorShapes) {
      const anchorShapes = this.drawAnchorShapes(
        model,
        shapeMap,
        diffData,
        diffState,
      );
      shapes = {
        ...shapes,
        ...anchorShapes,
      };
    }

    // iconShape
    if (data.iconShape) {
      shapes.iconShape = this.drawIconShape(
        model,
        shapeMap,
        diffData,
        diffState,
      );
    }

    // badgeShape
    if (data.badgeShapes) {
      const badgeShapes = this.drawBadgeShapes(
        model,
        shapeMap,
        diffData,
        diffState,
      );
      shapes = {
        ...shapes,
        ...badgeShapes,
      };
    }

    // donutShapes
    if (data.donutShapes) {
      const donutShapes = this.drawDonutShapes(
        model,
        shapeMap,
        diffData,
        diffState,
      );
      shapes = {
        ...shapes,
        ...donutShapes,
      };
    }

    // otherShapes
    if (data.otherShapes && this.drawOtherShapes) {
      shapes = {
        ...shapes,
        ...this.drawOtherShapes(model, shapeMap, diffData, diffState),
      };
    }
    return shapes;
  }

  /**
   * Draw a complete donut composed of several segments
   * @param model
   * @param shapeMap
   * @param diffData
   * @param diffState
   * @returns
   */
  private drawDonutShapes(
    model: DonutNodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    [shapeId: string]: DisplayObject;
  } {
    const {
      donutShapes: { innerSize, attrs, colorMap, zIndex },
    } = this.mergedStyles as DonutNodeDisplayModel;

    const attrNum = Object.keys(attrs).length;
    if (!attrNum) return;

    const { configs, totalValue } = getDonutConfig(attrs, colorMap);
    if (!totalValue) return;

    const { lineWidth, arcR } = getDonutSize(shapeMap.keyShape, innerSize);
    let beginAngle = 0;

    const shapes = {};

    each(configs, (config, index) => {
      const result = this.drawDonutSegment(
        {
          arcR,
          beginAngle,
          config,
          index,
          lineWidth,
          zIndex,
          totalValue,
          drawWhole: attrNum === 1,
        },
        shapes,
        model,
        shapeMap,
        diffData,
        diffState,
      );
      if (result.shouldEnd) return;
      beginAngle = result.beginAngle;
    });

    return shapes;
  }

  /**
   * Draw a single donut segment
   * @param cfg The configurations of donut segments
   * @param shapes The collections of donut segment shapes
   * @param model
   * @param shapeMap
   * @param diffData
   * @param diffState
   * @returns
   */
  private drawDonutSegment = (
    cfg: DonutSegmentConfig,
    shapes: { [shapeId: string]: DisplayObject },
    model: DonutNodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): {
    beginAngle: number; // next begin iangle
    shouldEnd: boolean; // finish fans drawing
  } => {
    const {
      arcR,
      beginAngle,
      config,
      index,
      lineWidth,
      zIndex,
      totalValue,
      drawWhole = false,
    } = cfg;
    const id = `donutShape${index}`;
    const percent = config.value / totalValue;
    if (percent < 0.001) {
      // too small to add a fan
      return {
        beginAngle,
        shouldEnd: false,
      };
    }
    let arcEnd, endAngle, isLargeArc;
    const arcBegin = calculateArcEndpoint(arcR, beginAngle);
    // draw a path represents the whole circle, or the percentage is close to 1
    if (drawWhole || percent > 0.999) {
      arcEnd = [arcR, 0.0001]; // [arcR * cos(2 * PI), -arcR * sin(2 * PI)]
      isLargeArc = 1;
    } else {
      const angle = percent * Math.PI * 2;
      endAngle = beginAngle + angle;
      arcEnd = calculateArcEndpoint(arcR, endAngle);
      isLargeArc = angle > Math.PI ? 1 : 0;
    }
    const style = {
      path: [
        ['M', arcBegin[0], arcBegin[1]],
        ['A', arcR, arcR, 0, isLargeArc, 0, arcEnd[0], arcEnd[1]],
      ],
      stroke:
        config.color || defaultDonutPalette[index % defaultDonutPalette.length],
      lineWidth,
      zIndex,
    } as ShapeStyle;
    shapes[id] = this.upsertShape('path', id, style, {
      model,
      shapeMap,
      diffData,
      diffState,
    }) as DisplayObject;

    return {
      beginAngle: endAngle,
      shouldEnd: drawWhole || percent > 0.999,
    };
  };

  public drawKeyShape(
    model: DonutNodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?: { previous: NodeModelData; current: NodeModelData },
    diffState?: { previous: State[]; current: State[] },
  ): DisplayObject {
    return this.upsertShape('circle', 'keyShape', this.mergedStyles.keyShape, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }
}

/**
 * Calculate the endpoint of an arc segment.
 * @param arcR Radius of the arc.
 * @param angle angle in degrees subtended by arc.
 */
const calculateArcEndpoint = (arcR: number, angle: number): number[] => [
  arcR * Math.cos(angle),
  -arcR * Math.sin(angle),
];

/**
 * calculate the total value and format single value for each fan
 * @param donutAttrs
 * @param donutColorMap
 * @returns
 */
const getDonutConfig = (
  donutAttrs: DonutAttrs,
  donutColorMap: DonutColorMap,
): {
  totalValue: number;
  configs: DonutSegmentValue[];
} => {
  let totalValue = 0;
  const configs = [];
  Object.keys(donutAttrs).forEach((name) => {
    const value = +donutAttrs[name];
    if (isNaN(value)) return;
    configs.push({
      key: name,
      value,
      color: donutColorMap[name],
    });
    totalValue += value;
  });
  return { totalValue, configs };
};

/**
 * calculate the lineWidth and radius for fan shapes according to the keyShape's radius
 * @param keyShape
 * @returns
 */
const getDonutSize = (
  keyShape,
  innerSize: number,
): {
  lineWidth: number;
  arcR: number;
} => {
  const keyShapeR = keyShape.attr('r');
  const innerR = innerSize * keyShapeR; // The radius of the inner ring of the donut
  const arcR = (keyShapeR + innerR) / 2; // The average of the radius of the inner ring and the radius of the outer ring
  const lineWidth = keyShapeR - innerR;
  return { lineWidth, arcR };
};
