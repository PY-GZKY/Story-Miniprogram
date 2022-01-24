const app = getApp()

Page({
  data: {
    entity: null
  },
  storieDetail() {
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
  onLoad(options) {
    // console.log("options: ", options)
    const id = options.id
    const entity = app.globalData.stories.filter((item) => {
      return item.id == id
    })

    this.setData({
      entity: entity[0]
    })

    wx.setNavigationBarTitle({
      title: this.data.entity.header
    })
  }
})