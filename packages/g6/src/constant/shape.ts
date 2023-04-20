export const RESERVED_SHAPE_IDS = ['keyShape', 'labelShape', 'iconShape'];
export const OTHER_SHAPES_FIELD_NAME = 'otherShapes';

export const DEFAULT_LABEL_BG_PADDING = [4, 4, 4, 4];
/** Default shape style to avoid shape value missing */
export const DEFAULT_SHAPE_STYLE = {
  opacity: 1,
  fillOpacity: 1,
  shadowColor: undefined,
  shadowBlur: 0,
  lineDash: undefined,
};
/** Default text style to avoid shape value missing */
export const DEFAULT_TEXT_STYLE = {
  ...DEFAULT_SHAPE_STYLE,
  fontSize: 12,
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  fontVariant: 'normal',
  fontStyle: 'normal',
  // textBaseline: 'middle',
  // textAlign: 'center',
  lineWidth: 0,
};
