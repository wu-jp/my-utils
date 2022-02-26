/**
 * 数据类型判断
 * @param {*} target 需要判断类型的数据
 * @returns 数据类型
 */
const type = target => {
  let template = {
    "[object Array]": "array",
    "[object Object]": "object",
    "[object String]": "string - object",
    "[object Number]": "number - object",
    "[object Boolean]": "boolean - object",
  }

  if (target == null) {
    return "null"
  } else if (typeof target == "object") {
    return template[Object.prototype.toString.call(target)]
  } else {
    return typeof target
  }
}

export { type }
