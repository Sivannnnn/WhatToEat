const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    username: ''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },
  getNickName(e) {
    this.setData({ username: e.detail.value })
  },
  handleConfirm() {
    let {avatarUrl,username} = this.data;
    if(username !== ''){
        wx.setStorageSync('avatarUrl', avatarUrl);
        wx.setStorageSync('username', username);
        wx.showLoading({
          title: '登陆中',
          mask: true,
          success: (res) => {
              wx.navigateBack({
                delta: 1
              })
          },
        })
    }else{
        wx.showToast({
          title: '请输入昵称',
          duration: 1000,
          icon: 'error',
          mask: true,
        })
    }
  }
})