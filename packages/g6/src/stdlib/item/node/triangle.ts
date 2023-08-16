import { DisplayObject } from '@antv/g';
import type { PathArray } from '@antv/g-lite/node_modules/@antv/util';
import {
    ComboDisplayModel,
    ComboModelData,
    ComboShapeMap,
} from '../../../types/combo';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import { BaseNode } from './base';
import { keys } from '@antv/util';

export class TriangleNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            size: 20,
            x: 0,
            y: 0,
            direction: 'up',  //'up'|'left'|'right'|'down'
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
            'path',
            'keyShape',
            {
                ...this.mergedStyles.keyShape,
                path: this.getTrianglePath(keyShapeStyle.size, keyShapeStyle.direction)
            },
            shapeMap,
            model,
        );
    }

    private getTrianglePath(size: number, direction: 'up' | 'down' | 'left' | 'right'): PathArray {
        const diffY = size * Math.sin((1 / 3) * Math.PI);
        const r = diffY;
        let path: PathArray = [
            ['M', -r, diffY],
            ['L', 0, -diffY],
            ['L', r, diffY],
            ['Z'],
        ];//top
        if (direction === 'down') {
            path = [
                ['M', -r, -diffY],
                ['L', r, -diffY],
                ['L', 0, diffY],
                ['Z'],
            ];
        } else if (direction === 'left') {
            path = [
                ['M', -r, r - diffY],
                ['L', r, -r],
                ['L', r, r],
                ['Z'],
            ];
        } else if (direction === 'right') {
            path = [
                ['M', r, r - diffY],
                ['L', -r, r],
                ['L', -r, -r],
                ['Z'],
            ];
        }
        return path;
    }

    public override drawIconShape(
        model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap,
        diffData?: {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
        },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { keyShape: keyShapeStyle } = this.mergedStyles as any;
        const { iconShape: shapeStyle } = this.mergedStyles;
        let defaultOffsetX = 0;
        let defaultOffsetY = keyShapeStyle.size / 4;

        if (keyShapeStyle.direction === 'right') {
            defaultOffsetX = -keyShapeStyle.size / 4;
            defaultOffsetY = 0;
        } else if (keyShapeStyle.direction === 'left') {
            defaultOffsetX = keyShapeStyle.size / 4;
            defaultOffsetY = 0;
        } else if (keyShapeStyle.direction === 'down') {
            defaultOffsetX = 0;
            defaultOffsetY = -keyShapeStyle.size / 4;
        }
        const {
            width,
            height,
            fontSize,
            text,
            offsetX,
            offsetY
        } = shapeStyle;
        const w = (width || fontSize) as number;
        const h = (height || fontSize) as number;
        const iconShapeType = text ? 'text' : 'image';
        if (iconShapeType === 'image') {
            shapeStyle.x = -w / 2 + (offsetX ? offsetX : 0) + defaultOffsetX;
            shapeStyle.y = -h / 2 + (offsetY ? offsetY : 0) + defaultOffsetY;
            shapeStyle.width = w;
            shapeStyle.height = h;
        } else {
            shapeStyle.textAlign = 'center';
            shapeStyle.textBaseline = 'middle';
            shapeStyle.x = (offsetX ? offsetX : 0) + defaultOffsetX;
            shapeStyle.y = (offsetY ? offsetY : 0) + defaultOffsetY;
            shapeStyle.fontSize = w;
        }

        return this.upsertShape(
            iconShapeType,
            'iconShape',
            shapeStyle as GShapeStyle,
            shapeMap,
            model,
        );
    }

}
