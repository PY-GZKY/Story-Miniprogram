import testDrive from '../../modules/test-drive'
const app = getApp()

Page({
  data: {
    slides: {},
    entities: {},
    page: 1,
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
      url: 'https://tplan.cc/slides',
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
      url: 'https://tplan.cc/vehicles',
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
      desc: '蓝青集、记录生活轶事',
      path: 'pages/index/index'
    }
  },

  onShareTimeline: function () {
    return {
      title: '蓝青集、记录生活轶事',
      // imageUrl: 'https://tplan.cc/media/images/2022/01/21/关二.jpg'
    }
  },
})