const app = getApp()

Page({
  data: {
    entity: null
  },

  preview(event) {
    const storiesName = event.target.dataset.stories
    const index = event.target.dataset.index
    // console.log("this.data.entity ==== ",  this.data.entity.stories);
    const stories = this.data.entity.stories;
    const images = []

    stories.map((item) => {
      images.push(item.image)
    })

    wx.previewImage({
      urls: images,
      current: images[index]
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
  },

    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    return {
      title: this.data.entity.header,
      path: 'pages/stories/show?id=' + this.data.entity.id,
      imageUrl: this.data.entity.image
    }
  },

  onShareTimeline: function () {
    return {
      title: this.data.entity.header,
      query: 'id=' + this.data.entity.id
    }
  },
})