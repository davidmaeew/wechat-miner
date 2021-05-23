import Base from './base'
// import { randomArrayPick } from './databus'

const PRIZE_2 = "../../images/prize1.png"
// const IMAGE_BG_RE_SRC = "../../images/gold-re.png"
export const IMAGE_BG_WIDHT = 50
export const IMAGE_BG_HEIGHT = 50

export default class Prize extends Base {
  constructor(canvas) {
    super(canvas, PRIZE_2, IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT)
  }
  update() {

  }

  render(ctx, canvas, per, w, h) {
    let percent = per
    if (!per) {
      percent = 1
    }
    ctx.drawImage(this.image, w, h, this.width * percent, this.height * percent)
  }
}