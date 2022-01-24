App({
  globalData: {
    slides: {},
    vehicles: {}

  },
  onLaunch() {
    this.vehicles();
    this.slides();
  },

  //刷新
  // onRefresh() {
  //   //在当前页面显示导航条加载动画
  //   wx.showNavigationBarLoading();
  //   //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  //   wx.showLoading({
  //     title: '刷新中'
  //   });
  //   //隐藏loading 提示框
  //   wx.hideLoading();
  //   //隐藏导航条加载动画
  //   wx.hideNavigationBarLoading();
  //   //停止下拉刷新
  //   wx.stopPullDownRefresh();
  // },

  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {
  //   //调用刷新时将执行的方法
  //   console.log("开始刷新！！");
  //   this.onRefresh();
  // },

  slides() {
    wx.request({
      url: 'https://tplan.cc/slides',
      success: (response) => {
        Object.assign(this.globalData.slides, response.data)
        // console.log("slides: ", this.globalData.slides);
        const currentPages = getCurrentPages()
        if (currentPages.length !== 0) {
          currentPages[currentPages.length - 1].onLoad()
        }
      }
    })
  },

  vehicles() {
    wx.request({
      url: 'https://tplan.cc/vehicles',
      success: (response) => {
        Object.assign(this.globalData.vehicles, response.data)
        // console.log("vehicles: ", this.globalData.vehicles);
        const currentPages = getCurrentPages()
        if (currentPages.length !== 0) {
          currentPages[currentPages.length - 1].onLoad()
        }
      }
    })
  }
})