// pages/chooseLib/chooseLib.js

import Main from '../../games/main'
import Gold, { IMAGE_BG_WIDHT, IMAGE_BG_HEIGHT } from '../../games/gold'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvas: undefined,
    ctx: undefined,
    width: 0,
    height: 0,
    main: undefined
  },
  initEvent() {
    console.log("点击")
    // this.ctx.
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },

  init(res) {
    const width = res[0].width
    const height = res[0].height
    const canvas = res[0].node
    const ctx = canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)
    canvas.screenHeight = wx.getSystemInfoSync().windowHeight
    canvas.screenWidth = wx.getSystemInfoSync().windowWidth
    this.ctx = ctx
    this.canvas = canvas

    let main = new Main(ctx, canvas)
    // 数据初始化,在父级一次性初始化完成
    let prize1Array = [];

    function initPrize1() {
      const prize1Num = 3 // 一等奖数量为3，大奖分布区域为-1\5，比例固定为1
      const area = 0.2
      const goldW = IMAGE_BG_WIDHT
      const goldY = IMAGE_BG_HEIGHT
      const offSetX = goldW + 10
      const offSetY = 8
      // 生成一等奖渲染初始点数组
      let xArr = []
      let yArr = []

      for (let i = 0; i < canvas.screenWidth; i = i + offSetX) {
        if (i + goldW > canvas.screenWidth) {
          // 去除边界条件
          break
        }
        xArr.push(i)
      }

      for (let i = 0; i < canvas.screenHeight * area; i = i + offSetY) {
        if (i + goldY > canvas.screenHeight * area) {
          // 去除边界条件
          break
        }
        yArr.push(i)
      }

      for (let i = 0; i < prize1Num; i++) {
        const x = randomArrayPick(xArr)
        const y = randomArrayPick(yArr)

        xArr.splice(getResetArrayIndex(x, xArr), 1) // 重置数组
        prize1Array.push({
          x: x,
          y: y,
          s: 1
        })
      }
    }

    function getResetArrayIndex(val, array) {
      const index = array.indexOf(val)
      return index
    }

    function randomArrayPick(array) {
      const values = array;

      let num = pickUp(values);

      function pickUp(values) {
        var index = randomNumber(0, values.length - 1);
        return values[index];
      }

      function randomNumber(lowIndex, highIndex) {
        return Math.floor(Math.random() * (highIndex - lowIndex + 1) + lowIndex); //选取0到‘数组长度减一’任意一整数
      }

      return num
    }

    initPrize1() // 执行一等奖初始化函数

    const renderLoop = () => {
      main.render(ctx, canvas, prize1Array)

      main.update()
      canvas.requestAnimationFrame(renderLoop)
    }
    canvas.requestAnimationFrame(renderLoop)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   * 在页面初次渲染完成后,设置canvas对象为本页面全局变量
   */
  onReady: function () {
  },

  /**
   * 初始化屏高/屏宽等参数
   */
  initData: function () {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
