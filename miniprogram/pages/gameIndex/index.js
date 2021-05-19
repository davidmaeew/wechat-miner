// pages/chooseLib/chooseLib.js

import Main from '../../games/main'

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 在页面初次渲染完成后,设置canvas对象为本页面全局变量
   */
  onReady: function () {
    this.initData()
    this.loadCtx()
    console.log(this.data.ctx)
    
    setInterval(() => {
      console.log("测试", this.data.ctx, this.data.main)
      if (this.data.ctx != undefined && this.data.main == undefined) {
        this.setData({
          main: new Main(this.data.ctx, this)
        })
      } else if (this.data.ctx != undefined) {
        console.log("render")
        this.data.main.render(this.data.ctx)
      }
    }, 1000)

  },

  /**
   * 初始化屏高/屏宽等参数
   */
  initData: function() {
    this.setData({
      width: wx.getSystemInfoSync().windowWidth,
      height: wx.getSystemInfoSync().windowHeight
    })
  },

  loadCtx: function() {
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        this.setData({
          canvas: canvas,
          ctx: ctx,
        })

        // let img = canvas.createImage()
        // img.src = "head.png"
        // img.onload = function() {
        //   console.log("加载完成")
        //   ctx.drawImage(img, 100, 100, 500, 500)
        // }
        // img.onerror = function() {
        //   console.log("加载失败")
        // }
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
