import Base from './base'
import Gold from './gold'
import Miner from './miner'
import Hook from './hook'

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