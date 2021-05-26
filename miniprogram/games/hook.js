import Base from './base'
import Databus, { goldWOri, goldHOri } from './databus'

const databus = new Databus()

const IMAGE_MINER_SRC = "../../images/hook.png"
const HOOK_WIDTH = 25
const HOOK_HEIGHT = 26
const MAX_ANGLE_NUM = 180
const MIN_ANGLE_NUM = 1
const MIN_ROPE_LENGTH = 30
const HOOK_HEIGHT_OFFSET = 22 // 钩子纵向偏移量
const HOOK_LENGTH_OFFSET = 15 // 钩子长度补全偏移量

export default class Hook extends Base {
    constructor(canvas) {
        super(canvas, IMAGE_MINER_SRC, HOOK_WIDTH, HOOK_HEIGHT)
        this.screenHeight = canvas.screenHeight
        this.screenWidth = canvas.screenWidth
        this.angleNum = 1
        this.angleFlag = true
        this.length = MIN_ROPE_LENGTH
        this.angle = Math.PI * this.angleNum / 180
    }
    ropeLengthUpdate() {
        let x = this.screenWidth / 2 + (this.length + HOOK_LENGTH_OFFSET) * Math.cos(this.angle)
        let y = this.screenHeight / 5 - HOOK_HEIGHT_OFFSET + (this.length + HOOK_LENGTH_OFFSET) * Math.sin(this.angle)
        const positionArray = databus.prizeInfo.map(val => {
            return {
                x: val.x,
                y: val.y,
                offsetx: goldWOri * val.s,
                offsety: goldHOri * val.s
            }
        })
        for (let i = 0; i < positionArray.length; i++) {
            const x1Flag = x >= positionArray[i].x ? true : false
            const x2Flag = x <= positionArray[i].x + positionArray[i].offsetx ? true : false
            const y1Flag = y >= positionArray[i].y ? true : false
            const y2Flag = y <= positionArray[i].y + positionArray[i].offsety ? true : false
            if ((x1Flag && x2Flag) && (y1Flag && y2Flag)) {
                databus.hookStatus = 2
                databus.minerStatus = 2
                databus.currentIndex = i
            }
        }
        if (x <= 0 || x >= this.screenWidth) {
            databus.hookStatus = 2
            databus.minerStatus = 2
            databus.currentIndex = null
        }
        if (y >= this.screenHeight) {
            databus.hookStatus = 2
            databus.minerStatus = 2
            databus.currentIndex = null
        }

        // 收回后恢复初始状态
        if (this.length < MIN_ROPE_LENGTH) {
            this.length = MIN_ROPE_LENGTH
            databus.hookStatus = 3
            databus.minerStatus = 3
            // 勾起后回调
            if (databus.currentIndex !== null) {
                databus.prizeInfo.splice(databus.currentIndex, 1)
                databus.currentIndex = null
                databus.score += 1
            }
        }

        if (databus.hookStatus == 1) {
            // 钩子伸出动画
            this.length += 5
        } else if (databus.hookStatus == 2) {
            // 钩子回收动画
            const speed = 0.5
            // 拉取效果添加
            if (databus.currentIndex !== null) {
                const i = databus.currentIndex
                const current = { ...databus.prizeInfo[i] }
                // 以x,y为中心点拉取
                current.x = x - current.s * goldWOri / 2
                current.y = y
                this.length -= speed / current.s
                databus.prizeInfo.splice(i, 1, current)
            } else {
                this.length -= 5
            }
        } else if (databus.hookStatus == 3) {
            // 矿工兴奋状态
            return false
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
        if (this.angleNum <= MIN_ANGLE_NUM) {
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

        let startX = this.screenWidth / 2
        let startY = this.screenHeight / 5 - HOOK_HEIGHT_OFFSET
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

        // 辅助工具
        // let x = this.screenWidth / 2 + (this.length + HOOK_LENGTH_OFFSET) * Math.cos(this.angle)
        // let y = this.screenHeight / 5 - HOOK_HEIGHT_OFFSET + (this.length + HOOK_LENGTH_OFFSET) * Math.sin(this.angle)
        // ctx.fillRect(x, y, 2, 2)
    }
}