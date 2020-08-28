// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    searchValue:'',
    searchHolder:'请输入关键词',

    bgTextStyle: 'dark',
    scrollTop: '200rpx',
    bgColor: '#ff0000',
    bgColorTop: '#00ff00',
    bgColorBottom: '#0000ff',
    nbTitle: '标题',
    nbLoading: false,
    nbFrontColor: '#000000',
    nbBackgroundColor: '#ffffff',

    sHeight:0,
    sTop:0,
    sRight:0,
  },

  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
    this.setData({
      active:event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let position = wx.getMenuButtonBoundingClientRect()
    console.log(position)
    this.setData({
      sHeight:position.height,
      sTop: position.top,
      sRight: position.left-30
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