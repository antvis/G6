import { DisplayObject } from '@antv/g';
import { NodeDisplayModel } from '../../../types';
import { State } from '../../../types/item';
import {
    IAnchorPositionMap,
    NodeModelData,
    NodeShapeMap,
    NodeShapeStyles,
    NodeUserModelData,
} from '../../../types/node';
import {
    ComboDisplayModel,
    ComboModelData,
    ComboShapeMap,
} from '../../../types/combo';
import { convertToNumber } from '../../../util/type';
import { BaseNode } from './base';


export class ModelRectNode extends BaseNode {
    override defaultStyles = {
        keyShape: {
            x: 0,
            y: 0,
            width: 185,
            height: 70,
            stroke: '#C0DCEA',
            strokeWidth: '2',
            radius: 2,
            fill: 'white'
        },
    };
    mergedStyles: NodeShapeStyles;
    logoX: number; //The x-coordinate of logoIcon
    logoY: number; //The y-coordinate of logoIcon
    logoWidth: number; //The width of logoIcon
    logoHeight: number; //The height of logoIcon
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
        // otherShapes
        if (data.otherShapes && this.drawOtherShapes) {
            shapes = {
                ...shapes,
                ...this.drawOtherShapes(model, shapeMap, diffData),
            };
        }

        // labelShape (after drawOtherShapes)
        if (data.labelShape) {
            shapes.labelShape = this.drawLabelShape(model, shapeMap, diffData);
        }
        return shapes;
    }

    public drawKeyShape(
        model: NodeDisplayModel,
        shapeMap: NodeShapeMap,
        diffData?: { previous: NodeModelData; current: NodeModelData },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { x, y, height, width } = this.mergedStyles.keyShape;
        return this.upsertShape(
            'rect',
            'keyShape',
            {
                ...this.mergedStyles.keyShape,
                x:
                    convertToNumber(x) -
                    convertToNumber(width) / 2,
                y:
                    convertToNumber(y) -
                    convertToNumber(height) / 2,
            },
            shapeMap,
            model,
        );
    }

    public override calculateAnchorPosition(keyShapeStyle: any): IAnchorPositionMap {
        const x = convertToNumber(keyShapeStyle.x);
        const y = convertToNumber(keyShapeStyle.y);
        const height = keyShapeStyle.height;
        const width = keyShapeStyle.width;
        const leftX = x - width / 2 - ((this.mergedStyles as any).preRect ? 5 : 0);
        const anchorPositionMap = {};
        anchorPositionMap['top'] = [x, y - height / 2];
        anchorPositionMap['left'] = [leftX, y];
        anchorPositionMap['right'] = anchorPositionMap['default'] = [
            x + width / 2,
            y,
        ];
        anchorPositionMap['bottom'] = [x, y + height / 2];
        return anchorPositionMap;
    }

    public override drawLabelShape(
        model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap,
        diffData?: {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
        },
        diffState?: { previous: State[]; current: State[] },
    ): DisplayObject {
        const { labelShape: labelShapeStyle, description: descriptionStyle, keyShape: keyShapeStyle } = this.mergedStyles as any;
        if (!labelShapeStyle) return;
        const { width, height, x, y } = keyShapeStyle;
        const {
            text: labelText,
            offsetX: labelOffsetX = 0,
            offsetY: labelOffsetY = 0,
        } = labelShapeStyle;
        const mixDisplay = (labelShapeStyle && descriptionStyle) ? true : false;//false: only display label
        const defaultLabelFontSize = mixDisplay ? Math.min(height, width) / 5 : Math.min(height, width) / 6;//match with keyShape
        const defaultLabelX = mixDisplay ? this.logoX + this.logoWidth + width / 20 : 0;
        const defaultLabelY = mixDisplay ? 0 - (height / 7) : 0;
        const defaultWordWrapWidth = width / 2 - defaultLabelX - defaultLabelFontSize * 2;
        return this.upsertShape(
            'text',
            'labelShape',
            {
                wordWrap: true,
                textOverflow: 'ellipsis',
                textBaseline: 'middle',
                textAlign: mixDisplay ? 'left' : 'middle',
                x: defaultLabelX + labelOffsetX,
                y: defaultLabelY + labelOffsetY,
                wordWrapWidth: defaultWordWrapWidth,
                maxLines: 1,
                ...labelShapeStyle,
            },
            shapeMap,
            model,
        );
    }

    public override drawOtherShapes(model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap,
        diffData?: {
            previous: NodeModelData | ComboModelData;
            current: NodeModelData | ComboModelData;
        },
        diffState?: { previous: State[]; current: State[] },): { [id: string]: DisplayObject } {
        const { logoIcon: logoIconStyle, preRect: preRectStyle, stateIcon: stateIconStyle, description: descriptionStyle, label: labelStyle, keyShape: keyShapeStyle } = this.mergedStyles as any;
        return {
            ...this.drawPreRectShape(preRectStyle, keyShapeStyle, model, shapeMap),
            ...this.drawLogoIconShape(logoIconStyle, keyShapeStyle, model, shapeMap),
            ...this.drawDescriptionShape(descriptionStyle, keyShapeStyle, model, shapeMap),
            ...this.drawStateIcon(stateIconStyle, keyShapeStyle, model, shapeMap),
        };
    }

    private drawPreRectShape(preRectStyle, keyShapeStyle, model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap) {
        if (!preRectStyle) return;
        const { x, y, height, width } = keyShapeStyle;
        const { width: preRectWidth = 5,
            fill = '#5CAAF8',
        } = preRectStyle;
        const shapes = {};
        shapes['otherShapePreRect'] = this.upsertShape(
            'rect',
            'otherShapePreRect',
            {
                width: preRectWidth,
                height,
                x:
                    convertToNumber(x) -
                    convertToNumber(width) / 2 - preRectWidth,
                y:
                    convertToNumber(y) -
                    convertToNumber(height) / 2,
                fill,
                radius: 2,
            },
            shapeMap,
            model,
        );
        return shapes;
    }

    private drawLogoIconShape(logoIconStyle, keyShapeStyle, model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap) {
        const { x, y, width } = keyShapeStyle;
        if (!logoIconStyle) return;
        const {
            width: logoIconWidth = 16,
            height: logoIconHeight = 16,
            fontSize: logoIconFontSize,
            text: logoIconText,
            offsetX: logoIconOffsetX = 0,
            offsetY: logoIconOffsetY = 0,
        } = logoIconStyle;
        const logoWidth = this.logoWidth = convertToNumber(logoIconWidth || logoIconFontSize);
        const logoHeight = this.logoHeight = convertToNumber(logoIconWidth || logoIconFontSize);
        const logoIconShapeType = logoIconText ? 'text' : 'image';
        //calculate logo position
        const logoX = this.logoX = convertToNumber(x) - convertToNumber(width) / 2 + logoIconOffsetX + width / 10 - logoIconWidth / 2;
        const logoY = this.logoY = logoIconText ? logoIconOffsetY : convertToNumber(y) - convertToNumber(logoIconHeight) / 2 + logoIconOffsetY;

        if (logoIconText) {
            logoIconStyle.textAlign = 'center';
            logoIconStyle.textBaseline = 'middle';
        }
        const shapes = {};
        shapes['otherShapeLogoIcon'] = this.upsertShape(
            logoIconShapeType,
            'otherShapeLogoIcon',
            {
                width: logoWidth,
                height: logoHeight,
                x: logoX,
                y: logoY,
                ...logoIconStyle,
            },
            shapeMap,
            model,
        );
        return shapes;
    }

    private drawDescriptionShape(descriptionStyle, keyShapeStyle, model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap) {
        if (!descriptionStyle) return;
        const { width, height } = keyShapeStyle;
        const {
            text: descriptionText,
            fontSize,
            offsetX: descriptionOffsetX = 0,
            offsetY: descriptionOffsetY = 0,
        } = descriptionStyle;
        const defaultLabelFontSize = Math.min(height, width) / 5;//match with keyShape
        const defaultDescriptionX = this.logoX + this.logoWidth + width / 20;
        const defaultWordWrapWidth = width / 2 - defaultDescriptionX - defaultLabelFontSize * 2;
        const defaultDescriptionFontSize = defaultLabelFontSize / 2;
        const shapes = {}
        shapes['otherShapeDescription'] = this.upsertShape(
            'text',
            'otherShapeDescription',
            {
                textBaseline: 'middle',
                textAlign: 'left',
                fontSize: defaultDescriptionFontSize,
                x: defaultDescriptionX + descriptionOffsetX,
                y: 0 + (height / 6) + descriptionOffsetY,
                wordWrap: true,
                wordWrapWidth: defaultWordWrapWidth,
                maxLines: 1,
                textOverflow: 'ellipsis',
                fill: '#C2C2C2',
                ...descriptionStyle,
            },
            shapeMap,
            model,
        ); //When the label isn't displayed, the description isn't displayed neither.
        return shapes;

    }

    private drawStateIcon(stateIconStyle, keyShapeStyle, model: NodeDisplayModel | ComboDisplayModel,
        shapeMap: NodeShapeMap | ComboShapeMap) {
        if (!stateIconStyle) return;
        const { x, y, width } = keyShapeStyle;
        const {
            width: stateIconWidth = 16,
            height: stateIconHeight = 16,
            fontSize: stateIconFontSize,
            text: stateIconText,
            offsetX: stateIconOffsetX = 0,
            offsetY: stateIconOffsetY = 0,
        } = stateIconStyle;
        const stateWidth = convertToNumber(stateIconWidth || stateIconFontSize);
        const stateHeight = convertToNumber(stateIconWidth || stateIconFontSize);
        const stateIconShapeType = stateIconText ? 'text' : 'image';
        //calculate state position
        const stateX = convertToNumber(x) + convertToNumber(width) / 2 - width / 10 + stateIconOffsetX;
        const stateY = stateIconText ? stateIconOffsetY : convertToNumber(y) - convertToNumber(stateIconHeight || stateIconFontSize) / 2 + stateIconOffsetY;
        if (stateIconText) {
            stateIconStyle.textAlign = 'center';
            stateIconStyle.textBaseline = 'middle';
        }
        const shapes = {};
        shapes['otherShapestateIcon'] = this.upsertShape(
            stateIconShapeType,
            'otherShapestateIcon',
            {
                width: stateWidth,
                height: stateHeight,
                x: stateX,
                y: stateY,
                ...stateIconStyle,
            },
            shapeMap,
            model,
        );
        return shapes;
    }

}
