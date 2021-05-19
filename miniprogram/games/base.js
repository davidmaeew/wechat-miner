

export default class Base {
  constructor(that, src, width, height) {
    this.that = that
    console.log("初始化")
    this.image = new Promise((resolve) => {
      let image = that.data.canvas.createImage()
      image.src = src
      image.onload = function() {
        resolve(image)
      }      
    })
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
  render(ctx) {

  }

  /**
   * 测试方法
   */
  show() {
    console.log("test")
  }
}