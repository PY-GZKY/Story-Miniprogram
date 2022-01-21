App({
  globalData: {
    slides: {},
    vehicles: {}

  },
  onLaunch() {
    this.vehicles();
    this.slides();
  },

  slides() {
    wx.request({
      url: 'http://127.0.0.1:8000/slides',
      success: (response) => {
        Object.assign(this.globalData.slides, response.data)
        // console.log("slides: ", this.globalData.slides);
        const currentPages = getCurrentPages()
        if (currentPages.length !== 0) {
          currentPages[currentPages.length - 1].onLoad()
        }
      }
    })
  },

  vehicles() {
    wx.request({
      url: 'http://127.0.0.1:8000/vehicles',
      success: (response) => {
        Object.assign(this.globalData.vehicles, response.data)
        // console.log("vehicles: ", this.globalData.vehicles);
        const currentPages = getCurrentPages()
        if (currentPages.length !== 0) {
          currentPages[currentPages.length - 1].onLoad()
        }
      }
    })
  }
})
