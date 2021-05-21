import Base from './base'
import Background from './background'
import Miner from './miner'
import Hook from './hook'

export default class Main {
  constructor(ctx, canvas) {
    // canvas上下文
    this.ctx = ctx
    // 背景图
    this.bg = new Background(canvas)
    this.miner = new Miner(canvas)
    this.hook = new Hook(canvas)
    this.initEvent(canvas)
  }
  initEvent(canvas) {
  //   this.canvas.addEventListener("touchend", ((e) => {
  //     e.preventDefault()
  //     // databus.status = 1
  //     console.log("老人收🐕")
  //     this.touched = true
  // }))
  }

  update() {
    this.hook.update()
  }

  render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx, canvas)
    console.log("画图")
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
  }
}