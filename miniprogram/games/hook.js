import Base from './base'

const IMAGE_MINER_SRC = "../../images/hook.png"
const HOOK_WIDTH = 25
const HOOK_HEIGHT = 26
const MAX_ANGLE_NUM = 180
const MIN_ANGLE_NUM = 1

export default class Miner extends Base {
  constructor(canvas) {
    super(canvas,IMAGE_MINER_SRC, HOOK_WIDTH, HOOK_HEIGHT)
    this.screenHeight = canvas.screenHeight
    this.screenWidth = canvas.screenWidth
    this.angleNum = 1
    this.angleFlag = true
    this.length = 30
    this.angle = Math.PI * this.angleNum / 180
  }
  update() {
    if (this.angleNum >= MAX_ANGLE_NUM) {
        this.angleFlag = false
    }
    if (this.angleNum <= MIN_ANGLE_NUM)  {
        this.angleFlag = true
    }
    if (this.angleFlag) {
        this.angleNum++
    } else {
        this.angleNum--
    }
    this.angle = Math.PI * this.angleNum / 180
  }
  render(ctx, canvas) {
    
    let startX = this.screenWidth/2
    let startY = this.screenHeight/5 - 10
    ctx.save()
    ctx.translate(startX, startY)
    ctx.rotate(this.angle - Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, this.length + 5)
    ctx.closePath()
    ctx.fillStyle = 'yellow';
    ctx.stroke();

    
    ctx.drawImage(
        this.image,
        -HOOK_WIDTH / 2,
        this.length,
        20,
        20
    )
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(
        this.image,
        -HOOK_WIDTH / 2,
        this.length,
        20,
        20
    )
    ctx.restore()
    ctx.restore()
  }
}