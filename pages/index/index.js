import testDrive from '../../modules/test-drive'
const app = getApp()

Page({
  data: {
    slides: {},
    entities: {},
    page: 2,
    theEnd: false
  },
  testDrive,
  /**
   * 查看更多
   */
  readMore() {
    console.log(this.data.page);

    wx.showLoading({
      title: '加载中'
    });

    wx.request({
      url: 'https://tplan.cc/vehicles/?page=' + this.data.page,
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

        app.globalData.vehicles = app.globalData.vehicles.concat(response.data.results);
        this.setData({
          entities: app.globalData.vehicles
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
    this.slides();
    this.vehicles();
  },
  /**
   * 首页获取数据列表接口
   */
  slides() {
    wx.request({
      url: `${app.globalData.bash_api}/slides`,
      success: (response) => {
        app.globalData.slides = response.data.results;
        this.setData({
          slides: app.globalData.slides
        });
      }
    })
  },

  vehicles() {
    wx.request({
      url: `${app.globalData.bash_api}/vehicles`,
      success: (response) => {
        app.globalData.vehicles = response.data.results;
        this.setData({
          entities: app.globalData.vehicles
        });
      }
    })
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
  onShareAppMessage: function () {
    return {
      title: '蓝青集',
      path: 'pages/index/index',
      imageUrl: this.data.slides[0].image
    }
  },

  onShareTimeline: function () {
    return {
      title: '蓝青集、记录生活轶事',
    }
  },
})