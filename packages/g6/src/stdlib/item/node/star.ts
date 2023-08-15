import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';

export class StarNode extends BaseNode {
    private defaultSize = 20;
    override defaultStyles = {
        keyShape: {
            size: this.defaultSize,
            innerR: (this.defaultSize * 3) / 8,
            x: 0,
            y: 0,
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

        const path = this.getStarPath(
            keyShapeStyle.size,
            keyShapeStyle.innerR
        );
        return this.upsertShape(
            'path',
            'keyShape',
            {
                ...keyShapeStyle,
                path,
            },
            shapeMap,
            model,
        );
    }

    public getStarPath(outerR: number, innerR: number) {
        const path = [];
        for (let i = 0; i < 5; i++) {
            const x1 = Math.cos(((18 + 72 * i) / 180) * Math.PI) * outerR;
            const y1 = Math.sin(((18 + 72 * i) / 180) * Math.PI) * outerR;
            const x2 = Math.cos(((54 + 72 * i) / 180) * Math.PI) * innerR;
            const y2 = Math.sin(((54 + 72 * i) / 180) * Math.PI) * innerR;
            if (i === 0) {
                path.push(['M', x1, -y1]);
            } else {
                path.push(['L', x1, -y1]);
            }
            path.push(['L', x2, -y2]);
        }

        path.push(['Z']);
        return path;
    }

}
