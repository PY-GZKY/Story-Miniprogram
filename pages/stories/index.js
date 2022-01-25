const app = getApp()

Page({
  data: {
    stories: null,
    page: 2,
    theEnd: false
  },

  /**
   * 查看更多
   */
  readMore() {
    console.log(this.data.page);
    wx.showLoading({
      title: '加载中'
    });
    wx.request({
      url: `${app.globalData.bash_api}/stories/?page=${this.data.page}`,
      success: (response) => {
        console.log(response);
        if (response.statusCode == 404) {
          wx.showToast({
            title: '到底了',
            duration: 1500
          });
          this.data.theEnd = true;
          return
        };

        app.globalData.stories = app.globalData.stories.concat(response.data.results);
        this.setData({
          stories: app.globalData.stories
        });
        this.setData({
          page: this.data.page + 1
        });
        //隐藏loading 提示框
        wx.hideLoading();
      },
      fail: () => {
        wx.showToast({
          title: '未知错误',
          duration: 1500
        })
      }
    })
  },

  onLoad() {
    wx.request({
      url: `${app.globalData.bash_api}/stories`,
      success: (response) => {
        app.globalData.stories =  response.data.results;
        this.setData({
          stories: app.globalData.stories 
        });
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.readMore();
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    return {
      title: '蓝青集',
      path: 'pages/stories/index',
      imageUrl: this.data.stories[0].image
    }
  },
  onShareTimeline: function () {
    return {
      title: '蓝青集、故事合集'
    }
  },
})