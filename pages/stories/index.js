const app = getApp()

Page({
  data: {
    stories: null,
    currentVid: null,
    currentVideo: null,
    vDuration: null,
    page: 1,
    theEnd: false
  },

  // 获取视频时长
  getLength(e) {
    e.detail.duration = parseInt(e.detail.duration)
    //处理时间格式并存放到data中
    this.setData({
      vDuration: parseInt(e.detail.duration / 60) + ":" + e.detail.duration % 60
    })

  },
  play(event) {
    // console.log("event", event)
    if (this.data.currentVid !== null) {
      this.data.currentVideo.pause()
    }
    const currentVideo = wx.createVideoContext(`${ event.target.dataset.vid }`)
    currentVideo.play()

    this.setData({
      currentVideo,
      currentVid: event.target.dataset.vid
    })
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
      url: 'https://tplan.cc/stories/?page=' + this.data.page,
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
      url: 'https://tplan.cc/stories',
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
      desc: '蓝青集、故事合集',
      path: 'pages/stories/index'
    }
  },
})