/* 
传入一个时间对象，返回任何格式的时间
如fmtDate(new Date(), 'yyyy-MM-dd')
*/

const fmtDate = (date, fmt) => {
  if (date !== null && date !== '' && date !== undefined) {
    if (/(y+)/.test(fmt)) { //匹配到参数里面的yyyy
      /*将其替换成date对象里的四位年，RegExp.$1就是yyyy，4-RegExp.$1.length,就是0，即substr从第0位开始截取*/
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    /* 年以外的其他替换都是两位，都是一样的方法 ,所以定义一个正则表达式对象*/
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    /*遍历正则对象*/
    for (var k in o) {
      /*使用new RegExp 将对象内元素构造成正则表达式*/
      if (new RegExp(`(${k})`).test(fmt)) {
        var str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
    }
    return fmt;
  }else{
    return ''
  }
}

const padLeftZero = (str) => {
  /*将00拼接到str的前面,从str的length位截取返回值,如果length为1,则从第二个0开始,为2,则完全抛弃00,这样就能得到2位数的日期  精妙*/
  return ('00' + str).substr(str.length);
}

module.exports =  fmtDate;