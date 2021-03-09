import * as Yoga from 'yoga-layout-prebuilt';

export const LayoutAlignMap = {
  auto: Yoga.ALIGN_AUTO,
  baseline: Yoga.ALIGN_BASELINE,
  center: Yoga.ALIGN_CENTER,
  'flex-end': Yoga.ALIGN_FLEX_END,
  'flex-start': Yoga.ALIGN_FLEX_START,
  'space-around': Yoga.ALIGN_SPACE_AROUND,
  'space-between': Yoga.ALIGN_SPACE_BETWEEN,
  stretch: Yoga.ALIGN_STRETCH,
};

export const DisplayMap = {
  none: Yoga.DISPLAY_NONE,
  flex: Yoga.DISPLAY_FLEX,
};

export const FlexDirectionMap = {
  column: Yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  row: Yoga.FLEX_DIRECTION_ROW,
  'row-reverse': Yoga.FLEX_DIRECTION_ROW_REVERSE,
};

export const FlexWrapMap = {
  'no-wrap': Yoga.WRAP_NO_WRAP,
  wrap: Yoga.WRAP_WRAP,
  'wrap-reverse': Yoga.WRAP_WRAP_REVERSE,
};

export const JustifyContentMap = {
  center: Yoga.JUSTIFY_CENTER,
  'flex-end': Yoga.JUSTIFY_FLEX_END,
  'flex-start': Yoga.JUSTIFY_FLEX_START,
  'space-around': Yoga.JUSTIFY_SPACE_AROUND,
  'space-between': Yoga.JUSTIFY_SPACE_BETWEEN,
  'space-evenly': Yoga.JUSTIFY_SPACE_EVENLY,
};

export type NumberOrAuto = number | string | 'auto';

export interface LayoutAttrs {
  alignContent: keyof typeof LayoutAlignMap;
  alignItems: keyof typeof LayoutAlignMap;
  alignSelf: keyof typeof LayoutAlignMap;
  display: keyof typeof DisplayMap;
  flex: number;
  flexBasis: number | string;
  flexGrow: number;
  flexShrink: number;
  flexDirection: keyof typeof FlexDirectionMap;
  flexWrap: keyof typeof FlexWrapMap;
  height: NumberOrAuto;
  width: NumberOrAuto;
  justifyContent: keyof typeof JustifyContentMap;
  margin: NumberOrAuto | NumberOrAuto[];
  padding: number | string | (number | string)[];
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
  minWidth: number;
  onClick: (e: Event) => void;
}
