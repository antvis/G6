import { Point } from '../../../types/common';
import {
    EdgeDisplayModel,
    EdgeModelData,
    EdgeShapeMap,
} from '../../../types/edge';
import { State } from '../../../types/item';
import { BaseEdge } from './base';

export class Quadratic extends BaseEdge {
    public type = 'line-edge';
    public defaultStyles = {
        keyShape: {
            controlPoints: [0, 0], //precise x-axis, y-axis coordinates of control points
            curvePosition: 0,  //control point coordinates described by percentage,range 0 to 1
            curveOffset: [0, 0], //a point coordinate that quadratic curve to
            stroke: '#000000',
            isBillboard: true,
        },
    };
    constructor(props) {
        super(props);
        // suggest to merge default styles like this to avoid style value missing
        // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
    }
    public draw(
        model: EdgeDisplayModel,
        sourcePoint: Point,
        targetPoint: Point,
        shapeMap: EdgeShapeMap,
        diffData?: { previous: EdgeModelData; current: EdgeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): EdgeShapeMap {
        const { data = {} } = model;

        const shapes: EdgeShapeMap = { keyShape: undefined };

        shapes.keyShape = this.drawKeyShape(
            model,
            sourcePoint,
            targetPoint,
            shapeMap,
            diffData,
        );

        if (data.haloShape) {
            shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
        }

        if (data.labelShape) {
            shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
        }

        // labelBackgroundShape
        if (data.labelBackgroundShape) {
            shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
                model,
                shapeMap,
                diffData,
            );
        }

        if (data.iconShape) {
            shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
        }

        // TODO: other shapes
        return shapes;
    }

    public drawKeyShape(
        model: EdgeDisplayModel,
        sourcePoint: Point,
        targetPoint: Point,
        shapeMap: EdgeShapeMap,
        diffData?: { previous: EdgeModelData; current: EdgeModelData },
        diffState?: { previous: State[]; current: State[] },
    ) {
        const { keyShape: keyShapeStyle } = this.mergedStyles as any;

        const controlPoint = this.getControlPoint(sourcePoint, targetPoint, keyShapeStyle.curvePosition, keyShapeStyle.controlPoints, keyShapeStyle.curveOffset);
        return this.upsertShape(
            'path',
            'keyShape',
            {
                ...keyShapeStyle,
                path: [['M', sourcePoint.x, sourcePoint.y], ['Q', controlPoint.x, controlPoint.y, targetPoint.x, targetPoint.y]],
            },
            shapeMap,
            model,
        );
    }

    /**
     * calculate the control point by curvePosition|controlPoints|curveOffset
     * @param startPoint: source point position of edge
     * @param endPoint target point position of edge
     * @param percent the proportion of control points' in the segment, Range 0 to 1
     * @param controlPoints the control point position 
     * @param offset the curveOffset
     * @returns control points
     */
    private getControlPoint: (startPoint: Point,
        endPoint: Point,
        percent: number,
        controlPoints: number[],
        offset: number[]
    ) => Point = (
        startPoint: Point,
        endPoint: Point,
        percent = 0,
        controlPoints,
        offset,
    ) => ({
        x: (1 - percent) * startPoint.x + percent * endPoint.x + controlPoints[0] + offset[0],
        y: (1 - percent) * startPoint.y + percent * endPoint.y + controlPoints[1] + offset[1],
    })

}
