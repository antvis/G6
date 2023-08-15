import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';

export class HexagonNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            r: 20,
            x: 0,
            y: 0,
            rotate: 0,//rotation angle
        },
    };
    mergedStyles: NodeShapeStyles;
    constructor(props) {
        super(props);
        // suggest to merge default styles like this to avoid style value missing
        // this.defaultStyles = mergeStyles([this.baseDefaultStyles, this.defaultStyles]);
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
        shapes.keyShape = this.drawKeyShape(model, shapeMap, diffData);

        // haloShape
        if (data.haloShape && this.drawHaloShape) {
            shapes.haloShape = this.drawHaloShape(model, shapeMap, diffData);
        }

        // labelShape
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
            shapes.iconShape = this.drawIconShape(model, shapeMap, diffData);
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

        // otherShapes
        if (data.otherShapes && this.drawOtherShapes) {
            shapes = {
                ...shapes,
                ...this.drawOtherShapes(model, shapeMap, diffData),
            };
        }
        return shapes;
    }

    public drawKeyShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { keyShape: keyShapeStyle } = this.mergedStyles as any;

        return this.upsertShape(
            'polygon',
            'keyShape',
            {
                ...this.mergedStyles.keyShape,
                points: this.getHexagonVPoints(keyShapeStyle.r, keyShapeStyle.rotate)
            },
            shapeMap,
            model,
        );
    }
    private getHexagonVPoints(r: number, rotation: number): [number, number][] {
        const v = [];
        const angleIncrement = Math.PI / 3; //The angle increment between vertices. 
        for (let i = 0; i < 6; i++) {
            const angle = i * angleIncrement + rotation;
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            v.push([vx, vy]);

        }
        return v;
    }
}
