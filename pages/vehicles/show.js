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
    const id = options.id
    // console.log("options: ", options);
    const entity = app.globalData.vehicles.results.filter((item) => {
      return item.id == id
    })
    // console.log("entity: ", entity);
    this.setData({
      entity: entity[0]
    })

    wx.setNavigationBarTitle({
      title: this.data.entity.header
    })
  }
})