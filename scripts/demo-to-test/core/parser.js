const fs = require('fs');
const babel = require('@babel/core');
const chalk = require('chalk');
const { get } = require('lodash');
const { isNewExpression, getObjectValue, transformSign } = require('./utils');

const meta = {
  config: {}, // 图表配置项
  code: '', // 原始代码
};

/**
 * @param {string} params
 * @param {string} type
 * @description 解析代码，提取 config
 */
const parser = (params, type) => {
  try {
    meta.code = fs.readFileSync(params, 'utf-8');
    const visitorExpressions = {
      // new Chart
      NewExpression(path) {
        const { node } = path;
        if (isNewExpression(node)) {
          meta.config = getObjectValue(get(node, 'arguments.0'), meta.code);
        }
      },
    };
    const vistorPlugins = {
      visitor: visitorExpressions,
    };
    babel.transform(fs.readFileSync(params, 'utf-8'), {
      plugins: [vistorPlugins, '@babel/plugin-transform-typescript'],
    });

    console.log(chalk.green(`解析成功：${params}`));

    return {
      success: true,
      config: meta.config,
    };
  } catch (err) {
    console.log(chalk.red(`解析出错：params: ${params}; type: ${type}`));
    console.log(chalk.red(`出错信息：${err}`));
    return {
      success: false,
      errMessage: err,
      errPath: params,
    };
  }
};

module.exports = { parser, transformSign };
