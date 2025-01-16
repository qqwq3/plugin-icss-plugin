let timeout1
let timeout2
let last

export function debounce(func, wait = 300, immediate = false) {
  // 清除定时器
  if (timeout1 !== null) clearTimeout(timeout1)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout1
    timeout1 = setTimeout(function() {
      timeout1 = null
    }, wait)
    if (callNow) typeof func === 'function' && func()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout1 = setTimeout(function() {
      typeof func === 'function' && func()
    }, wait)
  }
}

export function throttle(func, interval = 300) {
  const now = new Date().getTime()
  if (last && now - last < interval) {
    clearTimeout(timeout2)
    timeout2 = setTimeout(function() {
      last = now
      typeof func === 'function' && func()
    }, interval)
  } else {
    last = now
    typeof func === 'function' && func()
  }
}
