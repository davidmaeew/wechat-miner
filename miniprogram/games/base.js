


export class MImage {
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
export default class Base {
  constructor(canvas, src, width, height) {
    let image = canvas.createImage()
    image.src = src
    this.image = image
    this.width = width
    this.height = height
  }

  /**
   * 更新数据专用
   */
  update() {

  }

  /**
   * 更新canvas专用
   */
  render(ctx, canvas) {

  }

  /**
   * 测试方法
   */
  show() {
  }
}