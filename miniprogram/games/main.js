import Base from './base'
import Background from './background'
import Miner from './miner'
import Hook from './hook'
import Databus from './databus'

const databus = new Databus()

export default class Main {
  constructor(ctx, canvas) {
    // canvas上下文
    this.ctx = ctx
    // 背景图
    this.bg = new Background(ctx, canvas)
    this.miner = new Miner(ctx, canvas)
    this.hook = new Hook(ctx, canvas)
  }

  update() {
    this.hook.update()
  }
  init() {
    // 老人钩子状态， 
    // 当值为0时， 钩子摇摆状态
    // 当值为1时， 钩子伸长状态
    // 当值为2时， 钩子缩短状态
    databus.hookStatus = 0 
    console.log("初始化全局变量", this.ctx)
  }

  render(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.bg.render(ctx, canvas)
    console.log("画图")
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
  }
}