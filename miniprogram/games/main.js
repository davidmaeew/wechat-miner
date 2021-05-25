import Base from './base'
import Gold from './gold'
import Miner from './miner'
import Score from './score'
import Hook from './hook'
import Prize1Img from './prize1'
import Prize2Img from './prize2'
import Databus from './databus'

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
    this.score = new Score(canvas)
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

  showGold(ctx, canvas, prizeInfo) {
    // 金块渲染逻辑
    for (let i = 0; i < prizeInfo.length; i++) {
      this.gold.render(ctx, canvas, prizeInfo[i].s, prizeInfo[i].x, prizeInfo[i].y)
      // 奖品渲染逻辑
      if (prizeInfo[i].type === 0) {
        this.prize1Img.render(ctx, canvas, prizeInfo[i].s, prizeInfo[i].x + 15, prizeInfo[i].y + 10)
      } else if (prizeInfo[i].type === 1) {
        this.prize2Img.render(ctx, canvas, prizeInfo[i].s, prizeInfo[i].x + 15, prizeInfo[i].y + 10)
      }
    }
  }

  render(ctx, canvas, databus) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.score.render(ctx, canvas, databus.score)
    this.miner.render(ctx, canvas)
    this.hook.render(ctx, canvas)
    this.showGold(ctx, canvas, databus.prizeInfo)
  }
}