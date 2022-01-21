const app = getApp()

Page({
  data: {
    entity: null
  },
  onLoad(options) {
    // console.log("options: ", options)
    const id = options.id
    const entity = this.stories.results.filter((item) => {
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
