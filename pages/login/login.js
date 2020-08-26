// pages/login/login.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    // 登录
    userName:'',
    userPlaceholder: '请输入手机号',
    passName:'',
    passPlaceholder:'请输入密码',
    // 注册
    regUserName:'',
    regUserPlaceholder: '请输入手机号',
    regVerify:'',
    regVerUserPlaceholder:'请填写6位验证码',
    regPassName:'',
    regPassPlaceholder:'请输入6到18位密码',
    regPassNameAgn:'',
    regPassPlaceholderAgn:'请再次输入密码',
    // 分割线
    vanDivider:{ color: '#FFF', borderColor: '#F00', padding: '0 16px' },
    // 胶囊高度
    topVal:0,
    heightVal:0,
    // 验证码按钮内容
    verifyButtenText:'发送验证码',
    sending:true,
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
  dologin:function(){
    if(this.data.userName===''){
      Toast.fail('请输入手机号');
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
  // 注册手机号
  regUserFocus: function () {
    this.setData({
      regUserPlaceholder: ''
    })
  },
  regUserBlur: function () {
    if (this.data.regUserName === '') {
      this.setData({
        regUserPlaceholder: '请输入手机号'
      })
    }
  },
  // 注册验证码
  regVerUserFocus: function () {
    this.setData({
      regVerUserPlaceholder: ''
    })
  },
  regVerUserBlur: function () {
    if (this.data.regVerify === '') {
      this.setData({
        regVerUserPlaceholder: '请填写6位验证码'
      })
    }
  },
  // 注册密码
  regPassFocus: function () {
    this.setData({
      regPassPlaceholder: ''
    })
  },
  regPassBlur: function () {
    if (this.data.regPassName === '') {
      this.setData({
        regPassPlaceholder: '请输入6到18位密码'
      })
    }
  },
  // 注册确认密码
  regPassFocusAgn: function () {
    this.setData({
      regPassPlaceholderAgn: ''
    })
  },
  regPassBlurAgn: function () {
    if (this.data.regPassNameAgn === '') {
      this.setData({
        regPassPlaceholderAgn: '请再次输入密码'
      })
    }
  },
  doReg:function(){
    if (this.data.regUserName === '') {
      Toast.fail('请输入手机号');
      return;
    } else if (this.data.regVerify === '') {
      Toast.fail('请输入验证码');
      return;
    } else if (this.data.regPassName === '') {
      Toast.fail('请输入密码');
      return;
    } else if (this.data.regPassNameAgn === '') {
      Toast.fail('请确认密码');
      return;
    } else if (this.data.regPassNameAgn !== this.data.regPassName) {
      Toast.fail('两次输入密码不一致');
      return;
    }
    wx.request({
      url: 'http://127.0.0.1:888/reg',
      data: {
        phone: this.data.regUserName,
        upwd: this.data.regPassName,
        email: this.data.regVerify,
        uname: '测试用户'
      },
      success: res => {
        if (res.data.code == -1) {
          console.log(res)
          // Toast.fail(res.data.msg);
          // Notify("\n\n"+res.data.msg+"\n");
          Notify({
            message: "\n\n" + res.data.msg + "\n",
            color: '#ad0000',
            background: '#ffe1e1',
            duration: 2500,
          });
          return;
        } else if (res.data.code == 1) {
          // Toast.fail(res.data.msg);
          Toast.fail({
            type: 'success',
            message: res.data.msg,
            duration: 2000
          });
          this.setData({
            isLogin: true
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  goReg:function(){
    this.setData({
      isLogin:false
    })
  },
  goLogin: function () {
    this.setData({
      isLogin: true
    })
  },
  // 发送验证码
  sendVerify:function(){
    let me=this;
    if (this.data.sending){
      this.setData({
        sending: false
      });
      let text=61;
      let sendInt=setInterval(() => {
        if (text>1){
          text--
          me.setData({
            verifyButtenText: text
          })
        }else{
          clearInterval(sendInt)
          me.setData({
            verifyButtenText: '发送验证码',
            sending:true
          })
        }
      }, 1000);

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
    let position= wx.getMenuButtonBoundingClientRect()
    console.log(wx.getMenuButtonBoundingClientRect())
    this.setData({
      topVal: position.top,
      heightVal: position.height-10
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