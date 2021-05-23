// pages/chooseLib/chooseLib.js

import Main from '../../games/main'
import Databus, { prize1, prize2, randomArrayPick } from '../../games/databus'

const databus = new Databus()

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
    if (databus.hookStatus == 0) {
      console.log("设置值")
      databus.hookStatus = 1
      databus.minerStatus = 1
    }
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
    let prize2Array = [];

    function initPrize(num, area, goldW, goldY, offSetX, offSetY, size, dNum) {
      // 生成奖品渲染初始点数组
      let resultPosition = []
      let xArr = []
      let yArr = []
      let X_ARR = [] // 记录原始X数组
      let Y_ARR = [] // 记录原始Y数组
      let curSize = 0
      let type1Num = 0
      let type2Num = 0

      if (size.length > 1) {
        curSize = size[1]
      } else {
        curSize = size[0]
        // 大奖分隔
        type1Num = dNum[0]
        type2Num = dNum[1]
      }

      for (let i = 0; i < canvas.screenWidth; i = i + (offSetX * curSize)) {
        if (i + (goldW * curSize) > canvas.screenWidth) {
          // 去除边界条件
          break
        }
        xArr.push(i)
      }

      for (let i = 0; i < canvas.screenHeight * area; i = i + offSetY) {
        if (i + (goldY * curSize) > canvas.screenHeight * area) {
          // 去除边界条件
          break
        }
        yArr.push(i)
      }

      X_ARR = [...xArr]
      Y_ARR = [...yArr]

      for (let i = 0; i < num; i++) {
        const x = randomArrayPick(xArr)
        const y = randomArrayPick(yArr)

        xArr.splice(getResetArrayIndex(x, xArr), 1) // 重置数组
        yArr.splice(getResetArrayIndex(y, yArr), 1) // 重置数组

        // 为0时还原坐标数组
        if (xArr.length === 0) {
          xArr = [...X_ARR]
        }
        if (yArr.length === 0) {
          yArr = [...Y_ARR]
        }

        const obj = {
          x: x,
          y: y,
          s: size.length > 1 ? randomArrayPick(size) : curSize,
          type: dNum? dNum.indexOf(randomArrayPick(dNum)) : undefined
        }
        // 大奖处理分隔逻辑
        if (dNum && type1Num === 0) {
          obj.type = 1
        }
        if (dNum && type2Num === 0) {
          obj.type = 0
        }

        if (dNum) {
          if (obj.type === 0) {
            type1Num --
          } else {
            type2Num --
          }
        }

        const resetObj = resetSame(obj, resultPosition, Y_ARR, goldY)
        resultPosition.push(resetObj)
      }

      console.log(resultPosition)

      return resultPosition
    }

    function resetSame(val, array, Y_ARR, goldY) {
      // 去重
      let flag = 0
      let newVal = {}
      for (let i = 0; i < array.length; i++) {
        // if (array[i].x === val.x && (val.y < array[i].y + goldY * array[i].s || val.y + goldY * val.s > array[i].y)) {
        //   flag++
        //   break
        // }
        if (array[i].x === val.x && val.y === array[i].y) {
          flag++
          break
        }
      }
      if (flag) {
        newVal = {...val}
        newVal.y = randomArrayPick(Y_ARR)
        newVal = resetSame(newVal, array, Y_ARR, goldY)
        return newVal
      }

      return val
    }

    function getResetArrayIndex(val, array) {
      const index = array.indexOf(val)
      return index
    }

    prize1Array = initPrize(prize1.num, prize1.area, prize1.goldW, prize1.goldY, prize1.offSetX, prize1.offSetY, prize1.size, prize1.dNum)

    prize2Array = initPrize(prize2.num, prize2.area, prize2.goldW, prize2.goldY, prize2.offSetX, prize2.offSetY, prize2.size)

    main.init()
    const renderLoop = () => {
      main.render(ctx, canvas, prize1Array, prize2Array)
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
