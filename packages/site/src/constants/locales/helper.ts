import { getIntl } from './index';

export const helpers = {
  prefixHelper: ['More about `Prefix` generic usage, see [Prefix]', '关于 `Prefix` 泛型的使用信息，见 [Prefix]'],
  basePropsStyleHelper: ['More about base style configuration, please check [here]', '了解通用样式配置，请点击[这里]'],
  advancedPropsHelper: [
    'Except for the properties explicitly listed below, other supported properties are seen',
    '除了下面显式列出的属性，其他支持属性见',
  ],
  includes: ['Includes', '其中的'],
  excludes: ['Excludes', '除了'],
  remarks: ['Remarks', '说明'],
};

export const getHelperIntl = getIntl(helpers);
