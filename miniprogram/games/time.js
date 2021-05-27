import {MImage} from './base'

import Databus from './databus'
const databus = new Databus()


export const IMAGE_NUMBER_WIDHT = 48
export const IMAGE_NUMBER_HEIGHT = 48
const NUMBER_WIDTH = 20

export default class Time  {
  constructor(canvas) {
    this.imagePool = {}
    for (let i = 0; i <= 9; i++) {
      this.imagePool[i] = new MImage(canvas, `../../images/${i}.png`, IMAGE_NUMBER_WIDHT, IMAGE_NUMBER_HEIGHT)
    }
    this.scoreBG = new MImage(canvas, "../../images/score-bg.png", 150, 53)
    this.Second = databus.time
  }
  update() {

  }
  // 定时器调用方法
  tick() {
    this.Second--
    if (this.Second <= 0) {
      this.Second = 0
      // 像databus发送结束信息
    }
  }

  render(ctx, canvas) {
    // // let percent = per
    // // if (!per) {
    // //   percent = 1
    // // }
    let second = this.Second
    ctx.drawImage(this.scoreBG.image, canvas.screenWidth / 30, canvas.screenHeight / 14 - 5, IMAGE_NUMBER_WIDHT * 1.5, IMAGE_NUMBER_HEIGHT * 2 / 3)
    let index = 0
    do {
      let num = second % 10
      // console.log("测试", num)
      ctx.drawImage(this.imagePool[num].image, canvas.screenWidth / 6 - index * NUMBER_WIDTH - 10, canvas.screenHeight / 14, IMAGE_NUMBER_WIDHT/ 2, IMAGE_NUMBER_HEIGHT/2)
      index++
      second = Math.floor(second / 10)
    } while(second != 0)
  }
}