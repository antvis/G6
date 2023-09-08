/**
 * 递归进行深拷贝. 模拟还原 JSON.parse + JSON.stringify
 */
function traverseClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj;

  // 对象分为两种，一种是数组一种是普通的对象
  if (hash.get(obj)) return hash.get(obj);
  let cloneObj = Array.isArray(obj) ? [] : {};
  // 找到的是所属于自己的属性才拷贝
  hash.set(obj, cloneObj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
      // 实现一个递归拷贝
      cloneObj[key] = traverseClone(obj[key], hash);
    }
  }
  return cloneObj;
}

export function deepClone(data) {
  try {
    return structuredClone(data);
  } catch (err) {
    return traverseClone(data);
  }
}
