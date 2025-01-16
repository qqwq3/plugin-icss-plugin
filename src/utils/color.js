// 转Rgb
// .colorRgb("#fff");  // rgb(255,255,255)
// .colorRgb("#ffffff");  // rgb(255,255,255)
export function colorRgba(color, alpha = 1) {
  // 16进制颜色值的正则
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  color = color.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      let colorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return 'rgba(' + colorChange.join(',') + ',' + alpha + ')'
  } else {
    return color
  }
}

// 转Rgb
// .colorHex("rgb(255,255,255)");  // #ffffff
export function colorHex(color) {
  // RGB颜色值的正则
  const reg = /^(rgb|RGB)/
  if (reg.test(color)) {
    let strHex = '#'
    // 把RGB的3个数值变成数组
    const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    // 转成16进制
    for (const item of colorArr) {
      let hex = Number(item).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}

