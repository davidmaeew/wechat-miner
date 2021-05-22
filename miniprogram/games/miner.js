import Base from './base'

const IMAGE_MINER_SRC = "../../images/miner1.png"
const IMAGE_MINER_WIDHT = 64
const IMAGE_MINER_HEIGHT = 58

export default class Miner extends Base {
  constructor(ctx, canvas) {
    super(canvas,IMAGE_MINER_SRC, IMAGE_MINER_WIDHT, IMAGE_MINER_HEIGHT)
    this.screenHeight = canvas.screenHeight
    this.screenWidth = canvas.screenWidth
    this.ctx = ctx
  }
  update() {

  }
  render(ctx, canvas) {
    ctx.drawImage(this.image, this.screenWidth / 2 - this.width / 2 + 15, this.screenHeight / 5 - this.height - 10, this.width, this.height)
  }
}