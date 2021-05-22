import Base from './base'
import Databus from './databus'

const databus = new Databus()

const IMAGE_MINER_SRC = "../../images/hook.png"
const HOOK_WIDTH = 25
const HOOK_HEIGHT = 26
const MAX_ANGLE_NUM = 180
const MIN_ANGLE_NUM = 1
const MIN_ROPE_LENGTH = 30

export default class Miner extends Base {
  constructor(canvas) {
    super(canvas,IMAGE_MINER_SRC, HOOK_WIDTH, HOOK_HEIGHT)
    this.screenHeight = canvas.screenHeight
    this.screenWidth = canvas.screenWidth
    this.angleNum = 1
    this.angleFlag = true
    this.length = MIN_ROPE_LENGTH
    this.angle = Math.PI * this.angleNum / 180
  }
  ropeLengthUpdate() {
    let x = this.screenWidth/2 - this.length * Math.cos(this.angle)
    let y = this.screenHeight/5 - 10 + this.length * Math.sin(this.angle)
    if (x <= 0 || x >= this.screenWidth) {
        console.log("从而产生")
        databus.hookStatus = 2
    }
    if (y >= this.screenHeight) {
        console.log("从而产生2")
        databus.hookStatus = 2
    }
    if (this.length < MIN_ROPE_LENGTH) {
        this.length = MIN_ROPE_LENGTH
        databus.hookStatus = 0
    }
    if (databus.hookStatus == 1) {
        this.length += 5
    } else if (databus.hookStatus == 2) {
        this.length -= 5
    } else {
        return true
    }
    return false
  }
  angleUpdate() {
    // 钩子摇摆角度变化
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
    return true
  }
  update() {

    // 钩子长度变化
    if (!this.ropeLengthUpdate()) {
        return
    }
    if (!this.angleUpdate()) {
        return
    }
  }
  render(ctx, canvas) {
    
    let startX = this.screenWidth/2
    let startY = this.screenHeight/5 - 22
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