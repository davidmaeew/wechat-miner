import Base, {MImage} from './base'

import Databus, { goldWOri } from './databus'
const databus = new Databus()
// import { randomArrayPick } from './databus'

const IMAGE_BG_SRC = "../../images/num.png"
export const IMAGE_NUMBER_WIDHT = 48
export const IMAGE_NUMBER_HEIGHT = 48
const NUMBER_WIDTH = 20
const ARRAY0 = [0, 350, 500, 700]
export default class Score  {
  constructor(canvas) {
    this.imagePool = {}
    for (let i = 0; i <= 9; i++) {
      this.imagePool[i] = new MImage(canvas, `../../images/${i}.png`, IMAGE_NUMBER_WIDHT, IMAGE_NUMBER_HEIGHT)
    }
    this.scoreBG = new MImage(canvas, "../../images/score-bg.png", 150, 53)
  }
  update() {

  }

  render(ctx, canvas, score) {
    // let percent = per
    // if (!per) {
    //   percent = 1
    // }
    ctx.drawImage(this.scoreBG.image, canvas.screenWidth - 4 * NUMBER_WIDTH, canvas.screenHeight / 14 - 5, IMAGE_NUMBER_WIDHT * 1.5, IMAGE_NUMBER_HEIGHT * 2 / 3)
    let index = 0
    do {
      let num = score % 10
      // console.log("测试", num)
      ctx.drawImage(this.imagePool[num].image, canvas.screenWidth * 9 / 10 - index * NUMBER_WIDTH - 10, canvas.screenHeight / 14, IMAGE_NUMBER_WIDHT/ 2, IMAGE_NUMBER_HEIGHT/2)
      index++
      score = Math.floor(score / 10)
    } while(score != 0)
  }
}