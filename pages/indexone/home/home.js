// pages/indexone/indexone.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    sHeight: { // 属性名
      type: Number,
      value: 0
    },
    sTop: { // 属性名
      type: Number,
      value: 0
    },
    sWidth: { // 属性名
      type: Number,
      value: 0
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 1,
    searchValue:'',
    searchHolder:'请输入关键词',
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },
  methods: {
    changeTab(event) {
      wx.showToast({
        title: `切换到标签 ${event.detail.index + 1}`,
        icon: 'none'
      });
    },
  },
})