import testDrive from '../../modules/test-drive'
const app = getApp()

Page({
  data: {
    entity: null
  },
  testDrive,

  preview(event) {
    const slidesName = event.target.dataset.slides
    const index = event.target.dataset.index

    // console.log("slidesName: ", slidesName);
    // console.log("index: ", index);

    const slides = this.data.entity[slidesName]
    const images = []

    slides.map((item) => {
      images.push(item.image)
    })

    wx.previewImage({
      urls: images,
      current: images[index]
    })
  },

  onLoad(options) {
    // console.log(options);
    const id = options.id
    const entity = app.globalData.vehicles.filter((item) => {
      return item.id == id
    })
    // console.log("entity: ", entity);
    this.setData({
      entity: entity[0],
    })
    wx.setNavigationBarTitle({
      title: this.data.entity.header
    })
  },

  onShareAppMessage: function (options) {
    // console.log("options: ", options);
    console.log("share_title: ", this.data.entity.header);
    return {
      title: this.data.entity.header,
      desc: this.data.entity.header,
      path: 'pages/vehicles/show?id=' + this.data.entity.id
    }
  },
  onShareTimeline: function () {
    return {
      title: this.data.entity.header,
      query: 'id=' + this.data.entity.id
    }
  },
})