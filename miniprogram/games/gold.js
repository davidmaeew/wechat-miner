import Base from './base'

const IMAGE_BG_SRC = "../../images/gold.png"
export const IMAGE_BG_WIDHT = 80
export const IMAGE_BG_HEIGHT = 73

export default class Gold extends Base {
  constructor(canvas) {
    super(canvas, IMAGE_BG_SRC, IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT)
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