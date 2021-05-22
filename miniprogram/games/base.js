

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