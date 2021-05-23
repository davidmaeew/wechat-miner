import { IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT } from './gold'

let instance
export const prize1 = {
  num: 3, // 一等奖数量为3，大奖分布区域为0.25，比例固定为1
  dNum: [1, 2], // 详细分布比例为1、2，加起来需要等于总数量
  area: 0.25,
  size: [1],
  goldW: IMAGE_BG_WIDHT,
  goldY: IMAGE_BG_HEIGHT,
  offSetX: IMAGE_BG_WIDHT + 10,
  offSetY: 30
}

export const prize2 = {
  num: 15, // 其它奖数量为15，分布区域为0.75 -0.2 -0.1，比例固定为0.2、0.4
  area: 0.45,
  goldW: IMAGE_BG_WIDHT,
  goldY: IMAGE_BG_HEIGHT,
  offSetX: IMAGE_BG_WIDHT + 10,
  offSetY: 20,
  size: [0.25, 0.5]
}

export function randomArrayPick(array) {
  const values = array;

  let result = pickUp(values);

  function pickUp(values) {
    const index = randomNumber(0, values.length - 1);
    return values[index];
  }

  function randomNumber(lowIndex, highIndex) {
    return Math.floor(Math.random() * (highIndex - lowIndex + 1) + lowIndex); //选取0到‘数组长度减一’任意一整数
  }

  return result
}

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if (instance) return instance

    instance = this
    this.reset()
  }

  reset() {
    this.status = 0
  }


}
