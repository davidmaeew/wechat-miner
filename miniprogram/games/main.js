import Base from './base'
import Background from './background'

export default class Main {
  constructor(ctx, that) {
    // canvas上下文
    this.ctx = ctx
    // 页面上下文, 全局变量存放在this.that的data中
    this.that = that
    // 背景图
    this.bg = new Background(that)
  }

  update() {

  }

  render(ctx) {
    this.bg.render(ctx)
  }
}