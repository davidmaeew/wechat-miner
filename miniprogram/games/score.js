import Base from './base'
// import { randomArrayPick } from './databus'

const IMAGE_BG_SRC = "../../images/num.png"
export const IMAGE_BG_WIDHT = 50
export const IMAGE_BG_HEIGHT = 70
const ARRAY0 = [0, 350, 500, 700]
export default class Prize extends Base {
  constructor(canvas) {
    super(canvas, IMAGE_BG_SRC, IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT)
  }
  update() {

  }

  render(ctx, canvas, score) {
    // let percent = per
    // if (!per) {
    //   percent = 1
    // }
    ctx.drawImage(this.image, ARRAY0[0],  ARRAY0[1],  ARRAY0[2],  ARRAY0[3], canvas.screenWidth / 2, 10, IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT)
  }
}