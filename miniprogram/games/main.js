import Base from './base'
import Gold from './gold'
import Miner from './miner'
import Hook from './hook'
import Prize1Img from './prize1'
import Prize2Img from './prize2'
import Databus, { prize1, prize2, borderOffset } from './databus'

// const IMAGE_BG_SRC = "../images/gold.png"
// const IMAGE_BG_RE_SRC = "../images/gold-re.png"
const databus = new Databus()

export default class Main {
  constructor(ctx, canvas) {
    // canvas上下文
    this.ctx = ctx
    this.miner = new Miner(canvas)
    this.hook = new Hook(canvas)
    this.gold = new Gold(canvas)
    this.prize1Img = new Prize1Img(canvas)
    this.prize2Img = new Prize2Img(canvas)
  }

  update() {
    this.hook.update()
    this.miner.update()
  }
  init() {
    // 老人钩子状态， 
    // 当值为0时， 钩子摇摆状态
    // 当值为1时， 钩子伸长状态
    // 当值为2时， 钩子缩短状态
    databus.hookStatus = 0
    databus.minerStatus = 0
  }

  showGold(ctx, canvas, prize1Array, prize2Array) {
    // 其他奖显示逻辑
    const prize2StartPoint = [borderOffset, canvas.screenHeight * (1 - prize1.area - prize2.area)]
    for (let i = 0; i < prize2Array.length; i++) {
      const x = prize2StartPoint[0] + prize2Array[i].x
      const y = prize2StartPoint[1] + prize2Array[i].y
      this.gold.render(ctx, canvas, prize2Array[i].s, x, y)
    }

    // 大奖显示逻辑
    const prize1StartPoint = [borderOffset, canvas.screenHeight * (1 - prize1.area)]
    for (let i = 0; i < prize1Array.length; i++) {
      const x = prize1StartPoint[0] + prize1Array[i].x
      const y = prize1StartPoint[1] + prize1Array[i].y
      this.gold.render(ctx, canvas, prize1Array[i].s, x, y)
      if (prize1Array[i].type === 0) {
        this.prize1Img.render(ctx, canvas, prize1Array[i].s, x + 15, y + 10)
      } else {
        this.prize2Img.render(ctx, canvas, prize1Array[i].s, x + 15, y + 10)
      }
    }
  }

  render(ctx, canvas, prize1Array, prize2Array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
    this.showGold(ctx, canvas, prize1Array, prize2Array)
  }
}