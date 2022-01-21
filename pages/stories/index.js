const app = getApp()

Page({
  data: {
    entities: null,
    currentVid: null,
    currentVideo: null,
    vDuration: null
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
  onLoad() {
    wx.request({
      url: 'https://tplan.cc/stories',
      success: (response) => {
        // console.log("stories: ", response.data);
        this.setData({
          entities: response.data.results
        });
      }
    });

  }
})