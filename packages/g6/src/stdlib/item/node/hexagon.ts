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

type Vertices = [number, number];
interface IVertices {
    [key: string]: Vertices
}
export class HexagonNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            r: 20,
            x: 0,
            y: 0,
            direction: 'horizontal',
        },
    };
    vertices: IVertices = {

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
                points: this.getHexagonVPoints(keyShapeStyle.r, keyShapeStyle.direction)
            },
            shapeMap,
            model,
        );
    }
    private getHexagonVPoints(r: number, direction: string): [number, number][] {
        const v = [];
        const positionHorizontal = ['right', 'rightbottom', 'leftbottom', 'left', 'lefttop', 'righttop'];
        const positionVertical = ['bottom', 'leftbottom', 'lefttop', 'top', 'righttop', 'rightbottom'];
        const flag: boolean = direction === 'horizontal';
        const angleIncrement = Math.PI / 3; //The angle increment between vertices. 
        for (let i = 0; i < 6; i++) {
            const angle = i * angleIncrement + (flag ? 0 : Math.PI / 2);
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            v.push([vx, vy]);
            this.vertices[flag ? positionHorizontal[i] : positionVertical[i]] = [vx, vy];
        }
        return v;
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

        const shapes = {};
        individualConfigs.forEach((config, i) => {
            const { position, fill = keyShapeStyle.fill, ...style } = config;
            const id = `anchorShape${i}`;
            const [cx, cy] = this.getAnchorPosition(position);
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

    private getAnchorPosition(position: string | [number, number]): [number, number] {
        if (position instanceof Array) {
            const keyShapeBBox = this.boundsCache.keyShapeLocal
            const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
            const keyShapeHeight = keyShapeBBox.max[1] - keyShapeBBox.min[1];
            return [keyShapeWidth * (position[0] - 0.5), keyShapeHeight * (position[1] - 0.5),]
        }
        return this.vertices[position] ? this.vertices[position] : this.vertices['right'] || this.vertices['righttop'];
    }
}
