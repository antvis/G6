const { get } = require('lodash');
const { SETGLOBAL } = require('./global');

const SIGN = '-FN-';
const startRegex = new RegExp(`"${SIGN}`, 'g');
const endRegex = new RegExp(`${SIGN}"`, 'g');

/**
 * new表达式
 * @param {*} node
 */
const isNewExpression = (node) => {
  return get(node, 'callee.name') === 'Graph';
};

/**
 * Is function
 * @param {string} nodeType
 */
const isFunction = (nodeType) => {
  return /FunctionExpression|ArrowFunctionExpression/.test(nodeType);
};

/**
 * Use single
 * @param {string} str
 */
const useSign = (str) => {
  return replaceEnter(`${SIGN}${str}${SIGN}`);
};

/**
 * Replace enter
 * @param {*} str
 */
const replaceEnter = (str) => {
  return str.replace(/\n/g, ' ');
};

/**
 * transform sign
 * @param {string} str
 * @description 解析 meta 时，去掉 SIGN
 */
const transformSign = (str) => {
  return str.replace(startRegex, '').replace(endRegex, '');
};

/**
 * Get loop object
 * @param {*} node
 * @param {string} code  code
 */
const getObjectValue = (node, code) => {
  const { properties } = node;
  const obj = {};
  properties.forEach((item) => {
    const { key, value } = item;
    if (!['container', 'width', 'height', 'data'].includes(key.name)) {
      if (isFunction(value.type)) {
        const { start, end } = value;
        SETGLOBAL([start, end]);
        obj[key.name] = useSign(code.slice(start, end));
      } else if (value.type === 'ArrayExpression') {
        const { start, end } = value;
        SETGLOBAL([start, end]);
        obj[key.name] = useSign(code.slice(start, end));
      } else if (value.type === 'ObjectExpression') {
        // recursive
        obj[key.name] = getObjectValue(value, code);
      } else {
        obj[key.name] = getValue(value);
      }
    }
  });
  return obj;
};

/**
 * Get node value
 * @param {*} arg
 * @param {string} code
 */
const getValue = (arg, code = '') => {
  const { start, end } = arg;

  // .encode('y', 'frequency')
  if (arg.type === 'StringLiteral') {
    return arg.value;
  }
  // .encode('y', EPSILON)
  if (arg.type === 'Identifier') {
    return useSign(arg.name);
  }
  // .scale('y', { nice: true)
  if (arg.type === 'ObjectExpression') {
    return getObjectValue(arg, code);
  }
  // .encode('y', (d) => (d.sex === 1 ? -d.people : d.people))
  if (isFunction(arg.type)) {
    SETGLOBAL([start, end]);
    return useSign(code.slice(start, end));
  }
  /**
   * .data({
   *  transform: [
   *    {
   *      type: 'filter',
   *      callback: (d) => d.year === 2000,
   *    },
   *  ],
   * })
   */
  if (arg.type === 'ArrayExpression') {
    SETGLOBAL([start, end]);
    return useSign(code.slice(start, end));
  }
  return arg.value;
};

module.exports = {
  isNewExpression,
  isFunction,
  useSign,
  replaceEnter,
  getObjectValue,
  transformSign,
};
