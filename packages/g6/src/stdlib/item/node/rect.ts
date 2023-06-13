import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';

import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';

export class RectNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            x: 0,
            y: 0,
            width: 32,
            height: 32,
        },
    };
    mergedStyles: NodeShapeStyles;
    constructor(props) {
        super(props);
        // suggest to merge default styles like this to avoid style value missing
        // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
    }

    public override drawKeyShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        return this.upsertShape(
            'rect',
            'keyShape',
            {
                ...this.mergedStyles.keyShape,
                x: this.mergedStyles.keyShape.x as number - this.mergedStyles.keyShape.width / 2,
                y: this.mergedStyles.keyShape.y as number - this.mergedStyles.keyShape.height / 2
            },
            shapeMap,
            model,
        );
    }

    public draw(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): NodeShapeMap {
        const { data = {} } = model;
        let shapes: NodeShapeMap = { keyShape: undefined };

        // keyShape
        //Done
        shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);

        // labelShape
        //Done
        if (data.labelShape) {
            shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
        }

        // haloShape
        //Done
        if (data.haloShape && this.drawHaloShape) {
            shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
        }

        // labelBackgroundShape
        //Done
        if (data.labelBackgroundShape) {
            shapes.labelBackgroundShape = this.drawLabelBackgroundShape(
                model,
                shapeMap,
                diffData,
            );
        }

        // anchor shapes
        //BUG
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
        //Done
        if (data.iconShape) {
            shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
        }

        // badgeShape
        //Done
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

        // otherShapes
        if (data.otherShapes && this.drawOtherShapes) {
            shapes = {
                ...shapes,
                ...this.drawOtherShapes(model, shapeMap, diffData),
            };
        }
        return shapes;
    }

}