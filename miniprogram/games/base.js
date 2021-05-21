

export default class Base {
  constructor(canvas, src, width, height) {
    console.log("初始化")
    let image = canvas.createImage()
    image.src = src
    this.image = image
    console.log("Base构造", this.image)
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
    console.log("test")
  }
}