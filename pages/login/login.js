// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPlaceholder:'请输入用户账号',
    passName:'',
    passPlaceholder:'请输入用户密码',
    vanDivider:{ color: '#FFF', borderColor: '#F00', padding: '0 16px' },
  },
  /**
   * 微信登陆小程序
   */
  loginByWX:function(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  loginByQQ:function() {
    wx.checkSession({
      success (res) {
        //session_key 未过期，并且在本生命周期一直有效
        console.log(res)
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  },
  userFocus:function(){
    this.setData({
      userPlaceholder:''
    })
  },
  userBlur:function(){
    if(this.data.userName===''){
      this.setData({
        userPlaceholder:'请输入用户账号'
      })
    }
  },
  passFocus:function(){
    this.setData({
      passPlaceholder:''
    })
  },
  passBlur:function(){
    if(this.data.passName===''){
      this.setData({
        passPlaceholder:'请输入用户账号'
      })
    }
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