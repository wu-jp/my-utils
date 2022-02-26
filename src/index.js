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

/**
 * 保留指定小数位
 * @param {*} n 原数据
 * @param {*} fixed 保留小数点位数
 * @returns 处理后的指定位小数
 */
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)

/**
 * 防抖函数
 * @param {*} func 回调函数, function
 * @param {*} wait 防抖时间, number
 * @param {*} immediate 是否立即执行，Boolean
 * @returns {*} 处理后的防抖函数和取消防抖函数cancel
 */
const debounce = (func, wait, immediate) => {
  let timeout, result
  let debounced = function () {
    let context = this,
      args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
  // 取消防抖：静态方法
  debounced.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}

/**
 *
 * @param {*} func 回调函数, function
 * @param {*} wait 防抖时间, number
 * @param {*} options 非必填   leading：false 表示禁用第一次执行; trailing: false 表示禁用停止触发的回调（不能同时设置这两个）
 * @returns {*} 处理后的节流函数和取消节流函数cancel
 */
const throttle = (func, wait, options) => {
  let timeout,
    context,
    args,
    previous = 0
  if (!options) options = {}

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }
  let throttled = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    // 下次触发 func 剩余的时间
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果没有剩余的时间了或者你改了系统时间
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }
  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }
  return throttled
}

export { type, toFixed, debounce, throttle }
