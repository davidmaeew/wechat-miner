import Base from './base'

const IMAGE_BG_SRC = "../../images/land.png"
const IMAGE_BG_WIDHT = 550
const IMAGE_BG_HEIGHT = 133

export default class Background extends Base {
  constructor(canvas) {
    super(canvas,IMAGE_BG_SRC, IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT)
  }
  update() {

  }
  render(ctx, canvas) {
    // console.log(this.width, this.height, this.that.data.width, this.that.data.height)
    // console.log(canvas.screenWidth, canvas.screenHeight)
    ctx.drawImage(this.image, 0, 0, this.width, this.height, 0, 0, canvas.screenWidth, canvas.screenHeight / 5)
  }
}