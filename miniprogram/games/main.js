import Base from './base'
import Background from './background'
import Miner from './miner'
import Hook from './hook'

export default class Main {
  constructor(ctx, canvas) {
    // canvas上下文
    this.ctx = ctx
    this.miner = new Miner(canvas)
    this.hook = new Hook(canvas)
  }

  update() {
    this.hook.update()
  }

  render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
  }
}