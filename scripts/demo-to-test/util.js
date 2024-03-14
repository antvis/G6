const camelToKebab = (str) => {
  return str.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase());
};

const kebabToCamel = (str) => {
  return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

const removeFirstAndLastTwoChars = (text) => {
  if (text.length < 4) {
    return '';
  }

  // 删除首尾 2 个字符
  return text.substring(2, text.length - 2);
};

module.exports = {
  camelToKebab,
  kebabToCamel,
  removeFirstAndLastTwoChars,
};
