import Base from './base'
import Databus from './databus'

const IMAGE_MINER_SRC = "../../images/"
const IMAGE_MINER_WIDHT = 100
const IMAGE_MINER_HEIGHT = 92
const FRAME_TIME = 20
const databus = new Databus()

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
    this.showImage.push(new MImage(canvas, IMAGE_MINER_SRC + "miner.png", IMAGE_MINER_WIDHT, IMAGE_MINER_HEIGHT))
    this.framesPool = {} // 不同状态对应的帧内容池
    this.frameTime = FRAME_TIME // 每帧绘制次数
    this.frameIndex = 0 // 绘制帧图像下标
    this.screenHeight = canvas.screenHeight
    this.screenWidth = canvas.screenWidth
    this.minerStatus = 0
    this.ctx = ctx
    this.initFramesPool(canvas)
  }
  initFramesPool(canvas) {
    // 钩子摇摆准备放下时任务状态
    this.framesPool[0] = this.showImage

    // 放下钩子帧数组
    let takeHook = []
    takeHook.push(new MImage(canvas, IMAGE_MINER_SRC + "miner1.png", IMAGE_MINER_WIDHT, IMAGE_MINER_HEIGHT))
    this.framesPool[1] = takeHook

    // 收起钩子帧数组
    let getHook = []
    for (let i = 0; i < 2; i++) {
      getHook.push(new MImage(canvas, IMAGE_MINER_SRC + `miner-dig-${i}.png`, IMAGE_MINER_WIDHT, IMAGE_MINER_HEIGHT))
    }
    this.framesPool[2] = getHook
  }
  update() {
    if (this.minerStatus != databus.minerStatus) {
      this.showImage = this.framesPool[databus.minerStatus]
      this.frameIndex = 0
      this.frameTime = FRAME_TIME
      this.minerStatus = databus.minerStatus
    }

  }

  getFrameImageIndex() {
    if (this.frameTime <= 0) {
      this.frameIndex = (this.frameIndex + 1) % this.showImage.length
      this.frameTime = FRAME_TIME
    } else {
      this.frameTime = this.frameTime - 1
    }
    return this.frameIndex
  }
  render(ctx, canvas) {
    let index = this.getFrameImageIndex()
    let mImage = this.showImage[index]

    ctx.drawImage(mImage.image, this.screenWidth / 2 - mImage.width / 2, this.screenHeight / 4 - mImage.height - 30, mImage.width, mImage.height)
  }
}