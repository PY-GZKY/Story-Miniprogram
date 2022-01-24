import testDrive from '../../modules/test-drive'
const app = getApp()

Page({
  data: {
    slides: null,
    entities: null
  },
  testDrive,
  readMore(event) {
    wx.navigateTo({
      url: `/pages/vehicles/show?id=${ event.target.dataset.id }`
    })
  },
  onLoad() {
    this.setData({
      slides: app.globalData.slides,
      entities: app.globalData.vehicles
    })
  },

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