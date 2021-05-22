import Base from './base'
import Gold from './gold'
import Miner from './miner'
import Hook from './hook'
import Databus from './databus'

const databus = new Databus()

export default class Main {
  constructor(ctx, canvas) {
    // canvas上下文
    this.ctx = ctx
    this.miner = new Miner(canvas)
    this.hook = new Hook(canvas)
    this.gold = new Gold(canvas)
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

  showGold(ctx, canvas, prize1Array) {
    // 大奖显示逻辑
    const prize1StartPoint = [0, canvas.screenHeight * 0.8]
    for (let i = 0; i < prize1Array.length; i++) {
      const x = (prize1StartPoint[0] + prize1Array[i].x)
      const y = prize1StartPoint[1] + prize1Array[i].y
      this.gold.render(ctx, canvas, prize1Array[i].s, x, y)
    }
  }

  render(ctx, canvas, prize1Array) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
    this.showGold(ctx, canvas, prize1Array)
  }
}