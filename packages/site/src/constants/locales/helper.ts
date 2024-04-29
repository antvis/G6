import { getIntl } from './index';

export const helpers = {
  prefixHelper: [
    'More about `Prefix` generic usage, please check [here]',
    '更多关于 `Prefix` 泛型的使用信息，请查看[这里]',
  ],
  basePropsStyleHelper: ['More about base style configuration, please check [here]', '了解通用样式配置，请点击[这里]'],
  includes: ['Includes', '其中的'],
  excludes: ['Excludes', '除了'],
};

export const getHelperIntl = getIntl(helpers);
