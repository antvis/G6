import { AABB, DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State, GShapeStyle } from '../../../types/item';
import {
    getShapeLocalBoundsByStyle,
    LOCAL_BOUNDS_DIRTY_FLAG_KEY
} from '../../../util/shape';

import {
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
} from '../../../types/node';
import { getWordWrapWidthByBox } from '../../../util/text';
import { CircleNode } from './circle';
import { BaseNode } from './base';

export class RectNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            r: 16,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
        },
    };
    labelDefaultPadding = 3;
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
            this.mergedStyles.keyShape,
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

    public override drawLabelShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { keyShape } = shapeMap;
        this.boundsCache.keyShapeLocal =
            this.boundsCache.keyShapeLocal || keyShape.getLocalBounds();
        const keyShapeBox = getShapeLocalBoundsByStyle(
            keyShape,
            this.mergedStyles.keyShape,
            this.boundsCache.keyShapeLocal,
        );
        const { labelShape: shapeStyle } = this.mergedStyles;
        const {
            position,
            offsetX: propsOffsetX,
            offsetY: propsOffsetY,
            offsetZ: propsOffsetZ,
            maxWidth,
            ...otherStyle
        } = shapeStyle;

        const wordWrapWidth = getWordWrapWidthByBox(
            keyShapeBox as AABB,
            maxWidth,
            this.zoomCache.zoom,
        );

        const positionPreset = {
            x: keyShapeBox.center[0],
            y: keyShapeBox.max[1],
            z: keyShapeBox.center[2],
            textBaseline: 'top',
            textAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0,
            wordWrapWidth,
        };
        const itemHeight = shapeMap.keyShape.config.style.height;
        const itemWidth = shapeMap.keyShape.config.style.width;

        switch (position) {
            case 'center':
                positionPreset.textBaseline = 'middle'
                positionPreset.y = keyShapeBox.max[1];
                positionPreset.x = keyShapeBox.max[0];
                break;
            case 'top':
                positionPreset.x = keyShapeBox.max[0];
                positionPreset.y = 0
                positionPreset.textBaseline = 'bottom';
                break;
            case 'left':
                positionPreset.y = keyShapeBox.max[1];
                positionPreset.x = keyShapeBox.center[0];
                positionPreset.textAlign = 'right'
                positionPreset.textBaseline = 'middle';
                positionPreset.offsetX = -this.labelDefaultPadding;
                break;
            case 'right':
                positionPreset.y = keyShapeBox.max[1];
                positionPreset.x = keyShapeBox.max[0] + itemWidth / 2;
                positionPreset.textBaseline = 'middle';
                positionPreset.textAlign = 'left'
                positionPreset.offsetX = this.labelDefaultPadding;
                break;
            default: // at bottom by default
                positionPreset.y = keyShapeBox.max[1] + itemHeight / 2;
                positionPreset.x = keyShapeBox.max[0];
                positionPreset.textBaseline = 'top'
                break;
        }
        const offsetX = (
            propsOffsetX === undefined ? positionPreset.offsetX : propsOffsetX
        ) as number;
        const offsetY = (
            propsOffsetY === undefined ? positionPreset.offsetY : propsOffsetY
        ) as number;
        const offsetZ = (
            propsOffsetZ === undefined ? positionPreset.offsetZ : propsOffsetZ
        ) as number;
        positionPreset.x += offsetX;
        positionPreset.y += offsetY;
        positionPreset.z += offsetZ;

        const style: any = {
            ...this.mergedStyles.labelShape,
            ...positionPreset,
            ...otherStyle,
        };
        return this.upsertShape('text', 'labelShape', style, shapeMap, model);
    }

    public override drawIconShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { iconShape: shapeStyle } = this.mergedStyles;
        const {
            width,
            height,
            fontSize,
            text,
            offsetX = 0,
            offsetY = 0,
        } = shapeStyle;

        const w = (width || fontSize) as number;
        const h = (height || fontSize) as number;
        const iconShapeType = text ? 'text' : 'image';
        const keyShapeBox = getShapeLocalBoundsByStyle(
            shapeMap.keyShape,
            this.mergedStyles.keyShape,
            this.boundsCache.keyShapeLocal,
        );

        if (iconShapeType === 'image') {
            shapeStyle.x = -w / 2 + keyShapeBox.max[0] + offsetX;
            shapeStyle.y = -h / 2 + keyShapeBox.max[1] + offsetY;
            shapeStyle.width = w;
            shapeStyle.height = h;
        } else {
            shapeStyle.textAlign = 'center';
            shapeStyle.textBaseline = 'middle';
            shapeStyle.x = offsetX + keyShapeBox.max[0];
            shapeStyle.y = offsetY + keyShapeBox.max[1];
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

    //pos
    public override drawBadgeShapes(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): {
        [shapeId: string]: DisplayObject;
    } {
        const { badgeShapes: commonStyle, keyShape: keyShapeStyle } =
            this.mergedStyles;
        const individualConfigs = Object.values(this.mergedStyles).filter(
            (style) => style.tag === 'badgeShape',
        );
        if (!individualConfigs.length) return {};
        this.boundsCache.keyShapeLocal =
            this.boundsCache.keyShapeLocal || shapeMap.keyShape.getLocalBounds();
        const keyShapeBBox = getShapeLocalBoundsByStyle(
            shapeMap.keyShape,
            keyShapeStyle,
            this.boundsCache.keyShapeLocal,
        );
        const keyShapeWidth = keyShapeBBox.max[0] - keyShapeBBox.min[0];
        const shapes = {};
        individualConfigs.forEach((config) => {
            const { position, ...individualStyle } = config;

            const id = `${position}BadgeShape`;
            const style = {
                ...commonStyle,
                ...individualStyle,
            };
            const defaultColor = "#8392B2"; //与设计稿相同
            const {
                text = ' ', //设置为一个空格，如果为空字符串会出现偏移
                type,
                color = defaultColor,
                size = keyShapeWidth / 3, //是设计稿吗？感觉25%会更好些
                textColor,
                zIndex = 2,
                offsetX = 0,
                offsetY = 0,
                ...otherStyles
            } = style;

            const bgHeight = size as number;
            const pos = { x: 0, y: 0 };

            //TODO: 如果能拿到文字的宽度，这里可以再优化位置,如果不能的话，似乎只能让用户自己调整, 或着有什么其他好的办法吗？
            const textWidth = 0;
            switch (position) {
                case 'rightTop':
                case 'topRight':
                    pos.x = keyShapeWidth - bgHeight / 2 + offsetX;
                    pos.y = offsetY;
                    break;
                case 'right':
                    pos.x = keyShapeWidth - bgHeight / 2 + offsetX;
                    pos.y = keyShapeBBox.max[1] + offsetY;
                    break;
                case 'rightBottom':
                case 'bottomRight':
                    pos.x = keyShapeWidth - bgHeight / 2 + offsetX;
                    pos.y = keyShapeBBox.max[1] - keyShapeBBox.min[1];
                    break;
                case 'leftTop':
                case 'topLeft':
                    pos.x = offsetX + bgHeight / 2;
                    pos.y = offsetY;
                    break;
                case 'left':
                    pos.x = offsetX + bgHeight / 2;
                    pos.y = keyShapeBBox.max[1] + offsetY;
                    break;
                case 'leftBottom':
                case 'bottomLeft':
                    pos.x = offsetX + bgHeight / 2;
                    pos.y = keyShapeBBox.max[1] - keyShapeBBox.min[1];
                    break;
                case 'top':
                    pos.x = keyShapeBBox.max[1];
                    pos.y = offsetY;
                    break;
                default:
                    // bottom
                    pos.x = keyShapeBBox.max[1];
                    pos.y = keyShapeBBox.max[1] - keyShapeBBox.min[1];
                    break;
            }
            this.labelDefaultPadding += offsetX;//labelBackground同步
            let textAlign: string;
            if (position.toLowerCase().includes('right')) {
                textAlign = 'left';
            } else if (position.toLowerCase().includes('left')) {
                textAlign = 'right';
            } else {
                textAlign = 'middle';
            }

            // a radius rect (as container) + a text / icon
            shapes[id] = this.upsertShape(
                'text',
                id,
                {
                    text,
                    fill: textColor,
                    fontSize: bgHeight - 3,
                    x: pos.x,
                    y: pos.y,
                    ...otherStyles,
                    // textAlign: position.toLowerCase().includes('right') ? 'left' : 'right',
                    textAlign,
                    textBaseline: 'middle',
                    zIndex: (zIndex as number) + 1,
                } as GShapeStyle,
                shapeMap,
                model,
            );
            this.boundsCache[`${id}Local`] = shapes[id].getLocalBounds();
            const bbox = this.boundsCache[`${id}Local`];

            const bgShapeId = `${position}BadgeBackgroundShape`;
            const bgWidth =
                (text as string).length <= 1
                    ? bgHeight
                    : Math.max(bgHeight, bbox.max[0] - bbox.min[0]) + 8;
            shapes[bgShapeId] = this.upsertShape(
                'rect',
                bgShapeId,
                {
                    text,
                    fill: color,
                    height: bgHeight,
                    width: bgWidth,
                    x: bbox.min[0] - 3, // begin at the border, minus half height
                    y: bbox.min[1],
                    radius: bgHeight / 2,
                    zIndex,
                    ...otherStyles,
                } as GShapeStyle,
                shapeMap,
                model,
            );
        });
        return shapes;
    }

    //modify pos
    public override drawLabelBackgroundShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { oldState: State[]; newState: State[] },
    ): DisplayObject {
        const { labelShape } = shapeMap;
        if (!labelShape || !model.data.labelShape) return;
        if (
            !this.boundsCache.labelShapeLocal ||
            labelShape.getAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY)
        ) {
            this.boundsCache.labelShapeLocal = labelShape.getGeometryBounds();
            labelShape.setAttribute(LOCAL_BOUNDS_DIRTY_FLAG_KEY, false);
        }
        // label's local bounds, will take scale into acount

        const { labelShapeLocal: textBBox } = this.boundsCache;
        const labelWidth = Math.min(
            textBBox.max[0] - textBBox.min[0],
            labelShape.attributes.wordWrapWidth,
        );
        const height = textBBox.max[1] - textBBox.min[1];
        const labelAspectRatio = labelWidth / (textBBox.max[1] - textBBox.min[1]);
        const width = labelAspectRatio * height;

        const { padding, ...backgroundStyle } =
            this.mergedStyles.labelBackgroundShape;
        const pos = {
            y: labelShape.attributes.y - (height / 2 + padding[0]),
            x: labelShape.attributes.x - (width / 2 + padding[1])
        };
        switch (labelShape.attributes.position) {
            case 'center':
                pos.y = labelShape.attributes.y - height / 2;
                break;
            case 'top':
                pos.y = labelShape.attributes.y - height; //textBaseline 为bottom，要减去整个高度
                break;
            case 'left':
                pos.x = labelShape.attributes.x - width - this.labelDefaultPadding - padding[1] / 2;
                break;
            case 'right':
                pos.x = labelShape.attributes.x - padding[1] / 2 - this.labelDefaultPadding;
                break;
            default: // at bottom by default
                pos.y = labelShape.attributes.y - padding[0]
                break;
        }

        const bgStyle: any = {
            fill: '#fff',
            ...backgroundStyle,
            x: pos.x,
            y: pos.y,
            width: width + padding[1] + padding[3],
            height: height + padding[0] + padding[2],
        };

        return this.upsertShape(
            'rect',
            'labelBackgroundShape',
            bgStyle,
            shapeMap,
            model,
        );
    }

    //modify cx , cy
    public override drawAnchorShapes(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
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
            shapes[id] = this.upsertShape(
                'circle',
                id,
                {
                    cx: keyShapeWidth * position[0],
                    cy: keyShapeHeight * position[1],
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

}