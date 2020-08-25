// pages/login/login.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录
    userName:'',
    userPlaceholder:'请输入用户账号',
    passName:'',
    passPlaceholder:'请输入用户密码',
    // 注册
    regUserName:'',
    regUserPlaceholder: '请输入手机号',
    regPassName:'',
    regPassPlaceholder:'请输入6到18位密码',
    regPassNameAgn:'',
    regPassPlaceholderAgn:'请再次输入密码',
    // 分割线
    vanDivider:{ color: '#FFF', borderColor: '#F00', padding: '0 16px' },

  },
  /**
   * 微信登陆小程序
   */
  userChange:function(event){
    this.data.userName=event.detail;
  },
  pwdChange:function(event){
    this.data.passName=event.detail;
  },
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
  dologin:function(){
    if(this.data.userName===''){
      Toast.fail('请输入账号');
      return;
    }else if(this.data.passName===''){
      Toast.fail('请输入密码');
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:888/login',
      data:{
        phone:this.data.userName,
        upwd:this.data.passName
      },
      success:res=>{
        if(res.data.code==-1){
          console.log(res)
          // Toast.fail(res.data.msg);
          // Notify("\n\n"+res.data.msg+"\n");
          Notify({
            message:"\n\n"+res.data.msg+"\n",
            color: '#ad0000',
            background: '#ffe1e1',
            duration: 2500,
          });
          return;
        }else if(res.data.code==1){
          // Toast.fail(res.data.msg);
          Toast.fail({
            type:'success',
            message:res.data.msg,
            duration:2000
          });
        }
      },
      fail:err=>{
        console.log(err)
      }
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