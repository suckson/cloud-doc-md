/*
 * @Descripttion: 
 * @version: 
 * @Author: suckson
 * @Date: 2019-11-08 10:51:59
 * @LastEditors: suckson
 * @LastEditTime: 2019-12-03 16:22:54
 */
export const flattenArr = (arr) => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = (obj) => {
  const Arr = Object.keys(obj).map(key => obj[key])
  console.log(Arr)
  return Arr
}