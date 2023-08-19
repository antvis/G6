import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State, GShapeStyle } from '../../../types/item';
import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import {
    ComboDisplayModel,
    ComboModelData,
    ComboShapeMap,
} from '../../../types/combo';
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


    public override drawAnchorShapes(
        model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap,
        diffData?: {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
        },
        diffState?: { previous: State[]; current: State[] },
    ): {
        [shapeId: string]: DisplayObject;
    } {
        const { anchorShapes: commonStyle, keyShape: keyShapeStyle } =
            this.mergedStyles;

        const individualConfigs = Object.values(this.mergedStyles).filter(
            (style) => style.tag === 'anchorShape',
        );
        if (!individualConfigs.length) return;
        this.boundsCache.keyShapeLocal =
            this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
        const keyShapeBBox = this.boundsCache.keyShapeLocal;
        const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
        const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];

        const shapes = {};
        individualConfigs.forEach((config, i) => {
            const { position, fill = keyShapeStyle.fill, ...style } = config;
            const id = `anchorShape${i}`;
            const [cx, cy] = this.getAnchorShape(config.position);
            shapes[id] = this.upsertShape(
                'circle',
                id,
                {
                    cx,
                    cy,
                    fill,
                    ...commonStyle,
                    ...style,
                } as GShapeStyle,
                shapeMap,
                model,
            );
        });
        return shapes;
    }

    private getAnchorShape(position: string | [number, number]): [number, number] {
        const { keyShape: keyShapeStyle } = this.mergedStyles as any;
        const outerR = keyShapeStyle.size;
        let x: number, y: number;
        if (position instanceof Array) {
            const keyShapeBBox = this.boundsCache.keyShapeLocal
            const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
            const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
            return [keyShapeWidth * (position[0] - 0.5), keyShapeHeight * (position[1] - 0.5),]
        } else {
            position = position.toLowerCase();
        }
        if (position == 'top') {
            x = Math.cos(((18 + 72 * 1) / 180) * Math.PI) * outerR;
            y = Math.sin(((18 + 72 * 1) / 180) * Math.PI) * outerR;
        } else if (position == 'left') {
            x = Math.cos(((18 + 72 * 2) / 180) * Math.PI) * outerR;
            y = Math.sin(((18 + 72 * 2) / 180) * Math.PI) * outerR;
        } else if (position == 'leftbottom') {
            x = Math.cos(((18 + 72 * 3) / 180) * Math.PI) * outerR;
            y = Math.sin(((18 + 72 * 3) / 180) * Math.PI) * outerR;
        } else if (position == 'rightbottom') {
            x = Math.cos(((18 + 72 * 4) / 180) * Math.PI) * outerR;
            y = Math.sin(((18 + 72 * 4) / 180) * Math.PI) * outerR;
        } else {
            //right
            x = Math.cos(((18 + 72 * 0) / 180) * Math.PI) * outerR;
            y = Math.sin(((18 + 72 * 0) / 180) * Math.PI) * outerR;
        }
        return [x, -y];
    }
}
