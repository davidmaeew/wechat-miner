
const IMAGE_MINER_SRC = "../../images/miner1.png"
const IMAGE_MINER_WIDHT = 100
const IMAGE_MINER_HEIGHT = 92
const FRAME_TIME = 20

class MImage {
  constructor(canvas, src, width, height) {

    let image = canvas.createImage()
    image.onload = () => {
      console.log("加载成功")
    }
    image.onerror = () => {
      console.log("加载失败")
    }
    image.src = src
    this.image = image
    this.width = width
    this.height = height
  }
}

export default class Miner  {
  constructor(ctx, canvas) {
    this.showImage = []
    this.showImage.push(new MImage(canvas, IMAGE_MINER_SRC, IMAGE_MINER_WIDHT, IMAGE_MINER_HEIGHT))
    this.frameTime = FRAME_TIME // 每帧绘制次数
    this.frameIndex = 0 // 绘制帧图像下标

    this.screenHeight = canvas.screenHeight
    this.screenWidth = canvas.screenWidth
    this.ctx = ctx
  }
  update() {

  }
  getFrameImageIndex() {
    if (this.frameTime <= 0) {
      this.frameIndex = (this.frameIndex + 1) % this.showImage.length
      this.frameTime = FRAME_TIME
    } else {
      this.frameTime--
    }
    return this.frameIndex
  }
  render(ctx, canvas) {
    let index = this.getFrameImageIndex()
    let mImage = this.showImage[index]
    console.log(mImage.image)
    ctx.drawImage(mImage.image, this.screenWidth / 2 - this.width / 2, this.screenHeight / 4 - mImage.height - 30, mImage.width, mImage.height)
  }
}